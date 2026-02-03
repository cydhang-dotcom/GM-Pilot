
# 业务需求: 员工管理 (Employee)

> **入口 ID**: `hr-emp`
> **优先级**: P1
> **设计核心**: 档案完整 (Integrity)、检索高效 (Efficiency)、隐私合规 (Privacy)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 人才档案速查 (Profile Access)
*   **故事**: 作为总经理，我需要随时查看员工的合同到期日和基本信息，以便决定人才留存策略。
*   **数据业务逻辑**:
    *   **搜索算法**: 采用 `Fuzzy_Match(Keyword, [Name, Dept, Role])`，权重：姓名(1.0) > 部门(0.6) > 职位(0.4)。
    *   **隐私处理**: 身份证号仅展示前 3 位 and 后 4 位，中间以 `*` 屏蔽。
    *   **状态维护**: 实时根据 `Join_Date` 计算司龄，并自动判定 `Probation/Official` 状态。

### US2: 动态增员与合同发起 (Onboarding & Contract)
*   **故事**: 我需要在手机上快速录入新入职人员信息，同时确定其薪资标准、社保基数，并一键发起电子合同签订。
*   **数据业务需求**:
    *   **全流程录入 (5步法)**:
        1.  **员工信息**: 姓名/身份证/手机 + **部门/岗位/入职日期**。
            *   **逻辑联动**: 当“薪酬核定”开启 **或** “发起合同签订”开启时，部门、岗位、入职日期变为**必填项**；均关闭时为选填项。
        2.  **薪酬核定**: 
            *   **核定薪酬标准 (开关)**: **默认开启**。
            *   开启时显示月薪输入框（必填）；关闭时隐藏。
        3.  **合同信息**: 
            *   **发起合同签订**: **默认关闭**。
            *   **合同期限**: 选择固定期限（如3年）。
            *   **试用期**: 设置试用期时长。
        4.  **个税申报**: 
            *   默认勾选“申报个税”。
            *   **智能联动**: “个税核定基数”默认等于“核定月薪”。
            *   **交互创新**: 基数以蓝色链接展示，点击后弹出 **Modal** 进行手动修改。支持“恢复同步”一键还原。
        5.  **社保公积金**: 
            *   默认勾选“办理参保”。
            *   **智能联动**: “社保基数”与“公积金基数”默认等于“核定月薪”。
            *   **交互创新**: 基数以蓝色链接展示，点击后弹出 **Modal** 同时编辑两项基数。支持“恢复同步”一键还原。
    *   **触发器**: 点击保存后，自动创建 Employee 记录，并同步触发 `Contract_Sign_Workflow` 和 `Social_Add_Workflow`。

## 2. 界面行为规范 (UI Behaviors)

*   **新增入口 (Add Entry)**: 
    *   采用 **Extended FAB (悬浮扩展按钮)**，位于屏幕右下角 `bottom-24` 位置。
    *   按钮配色为 `Indigo-600`，带有 Indigo 阴影，标签为“新增员工”。
*   **视觉对齐**: 
    *   列表卡片的“姓名+职位”组合需相对于左侧头像垂直居中。
*   **录入表单**:
    *   采用 **分段式卡片 (Sectioned Cards)** 布局，明确区分 1-5 步骤。
    *   底部固定按钮文案为“**确认入职**”。
    *   必填项在标签后显示红色 `*`。
*   **Overlay 规范**: 
    *   员工档案页采用全屏 Overlay，顶部带有毛玻璃背景的导航栏。
*   **基数编辑**: 采用中心位浮层 Modal，背景应用 `backdrop-blur`，确保 GM 在修改敏感数据时的专注度。

## 3. 验收标准 (Acceptance Criteria)

- [x] 列表页通过右下角悬浮按钮发起新增操作。
- [x] 录入页面必须包含独立的“个税申报”和“社保公积金”模块。
- [x] 个税、社保、公积金基数初始值必须跟随月薪自动变动。
- [x] 点击基数文本必须唤起对应的编辑 Modal。
- [x] Modal 内必须包含“恢复同步月薪”按钮。
- [x] “薪酬核定”开关默认处于开启状态，“发起合同”开关默认处于关闭状态。
- [x] 只要开启“薪酬核定”或“发起合同”中的任何一个，岗位/部门/入职日期即强制校验。

## 4. API 接口 (API Interfaces)

### 4.1 新增员工 (Add Employee)
*   **Endpoint**: `POST /api/hr/employees`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `name` | 姓名 | String | Required | - |
| `id_card` | 身份证 | String | Required | - |
| `mobile` | 手机号 | String | Required | - |
| `is_salary_determined` | 核定薪酬 | Boolean | Default: true | - |
| `salary` | 薪资 | Decimal | Conditional Required | - |
| `is_contract_initiated` | 发起合同 | Boolean | Default: false | - |
| `tax_base` | 个税基数 | Decimal | Optional | 链接式 Modal 编辑 |
| `social_base` | 社保基数 | Decimal | Optional | 链接式 Modal 编辑 |
| `fund_base` | 公积金基数 | Decimal | Optional | 链接式 Modal 编辑 |
| `is_tax_customized` | 是否自定义个税 | Boolean | - | 用于记录是否脱离月薪联动 |
| `is_social_customized` | 是否自定义社保公积金 | Boolean | - | 用于记录是否脱离月薪联动 |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `id` | 员工ID | String | - |
| `contract_id` | 关联合同ID | String | 自动发起的合同流程 |

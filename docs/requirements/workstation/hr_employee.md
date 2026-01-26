
# 业务需求: 员工管理 (Employee)

> **入口 ID**: `hr-emp`
> **优先级**: P1
> **设计核心**: 档案完整 (Integrity)、检索高效 (Efficiency)、隐私合规 (Privacy)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 人才档案速查 (Profile Access)
*   **故事**: 作为总经理，我需要随时查看员工的合同到期日和基本信息，以便决定人才留存策略。
*   **数据业务逻辑**:
    *   **搜索算法**: 采用 `Fuzzy_Match(Keyword, [Name, Dept, Role])`，权重：姓名(1.0) > 部门(0.6) > 职位(0.4)。
    *   **隐私处理**: 身份证号仅展示前 3 位和后 4 位，中间以 `*` 屏蔽。
    *   **状态维护**: 实时根据 `Join_Date` 计算司龄，并自动判定 `Probation/Official` 状态。

### US2: 动态增员 (Onboarding Action)
*   **故事**: 我需要在手机上快速录入新入职高管的信息，并同步发起入职任务流。
*   **数据业务需求**:
    *   **触发器**: 成功录入新员工后，自动向 `Inbox` 推送一条“新员工入职确认”任务。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐**: 
    *   列表卡片的“姓名+职位”组合需相对于左侧头像垂直居中。
*   **加载逻辑**: 
    *   搜索框输入时，列表应用 `Fade-out/Fade-in` 过滤动画，延迟 200ms 触发。
*   **Overlay 规范**: 
    *   员工档案页采用全屏 Overlay，顶部带有毛玻璃背景的导航栏。

## 3. 验收标准 (Acceptance Criteria)

- [x] 搜索功能必须支持按姓名首字母模糊查询。
- [x] 详情页的身份证号必须执行脱敏算法。
- [x] 试用期员工的标签颜色必须与正式员工有视觉区分（Blue vs Emerald）。
- [x] 点击“呼叫”按钮必须能正确拉起系统拨号盘。

## 4. API 接口 (API Interfaces)

### 4.1 新增员工 (Add Employee)
*   **Endpoint**: `POST /api/hr/employees`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `name` | 姓名 | String | Required, 2-10 chars | - |
| `department` | 部门 | String | Required | - |
| `role` | 职位 | String | Required | - |
| `mobile` | 手机号 | String | Required, Phone Regex | - |
| `join_date` | 入职日期 | String | Required, YYYY-MM-DD | - |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `id` | 员工ID | String | - |
| `task_id` | 关联入职任务ID | String | 自动创建的入职流程ID |

### 4.2 获取员工档案 (Get Profile)
*   **Endpoint**: `GET /api/hr/employees/{id}`
*   **输入参数 (Request)**:
    *   `id`: 员工 ID (Required)
*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `name` | 姓名 | String | - |
| `id_card_masked` | 身份证(脱敏) | String | 如 310*********1234 |
| `contract_end` | 合同截止日 | String | YYYY-MM-DD |
| `status` | 状态 | Enum | 'PROBATION', 'REGULAR' |

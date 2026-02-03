
# 业务需求: 员工管理 - 档案列表 (Employee List)

> **入口 ID**: `hr-emp`
> **优先级**: P1
> **设计核心**: 档案完整 (Integrity)、检索高效 (Efficiency)、隐私合规 (Privacy)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 人才档案速查 (Profile Access)
*   **故事**: 作为总经理，我需要随时查看员工的合同到期日和基本信息，以便决定人才留存策略。
*   **数据业务逻辑**:
    *   **数据来源**: 
        *   `Manual`: 通过 `EmployeeAdd` 手动录入。
        *   `QR`: 通过 `OnboardingProcess` 扫码入职并经 GM 补全信息后自动归档。
    *   **搜索算法**: 采用 `Fuzzy_Match(Keyword, [Name, Dept, Role])`，权重：姓名(1.0) > 部门(0.6) > 职位(0.4)。
    *   **隐私处理**: 身份证号仅展示前 3 位 and 后 4 位，中间以 `*` 屏蔽。
    *   **状态维护**: 实时根据 `Join_Date` 计算司龄，并自动判定 `Probation/Official` 状态。

## 2. 界面行为规范 (UI Behaviors)

*   **新增入口 (Add Entry)**: 
    *   采用 **Extended FAB (悬浮扩展按钮)**，位于屏幕右下角 `bottom-24` 位置。
    *   按钮配色为 `Indigo-600`，带有 Indigo 阴影，标签为“新增员工”。
*   **视觉对齐**: 
    *   列表卡片的“姓名+职位”组合需相对于左侧头像垂直居中。
*   **Overlay 规范**: 
    *   员工档案详情页采用全屏 Overlay，由 `EmployeeDetail.tsx` 独立承载。

## 3. 验收标准 (Acceptance Criteria)

- [x] 列表页通过右下角悬浮按钮发起新增操作。
- [x] 支持通过姓名、部门进行模糊检索。
- [x] 列表展示在职人数统计、本月入职及离职统计。
- [x] 点击员工条目平滑跳转至详情 Overlay。

## 4. API 接口 (API Interfaces)

### 4.1 获取员工列表 (Get Employees)
*   **Endpoint**: `GET /api/hr/employees`
*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `list` | 员工列表 | Array | - |
| `stats` | 统计信息 | Object | 在职/入职/离职 |

# 业务需求: 薪酬管理 (Payroll)

> **入口 ID**: `hr-1`
> **优先级**: P1
> **设计核心**: 成本透明 (Cost Transparency)、发放闭环 (Payment Loop)、安全审计 (Security Audit)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 薪资构成透视 (Salary Breakdown)
*   **故事**: 作为总经理，在确认发放前，我需要清晰看到基本工资、绩效、社保扣除和个税的占比，确保成本符合预期。
*   **数据业务逻辑**:
    *   **核心算法**: 
        *   `Gross_Pay = Base_Salary + Performance_Bonus + Allowances`
        *   `Net_Pay = Gross_Pay - Social_Insurance_Personal - Housing_Fund_Personal - Individual_Income_Tax`
    *   **状态触发器 (State Trigger)**: 
        *   若 `Current_Month_Total > Last_Month_Total * 1.1`：高亮显示差异，并标记为“薪资总额异动”。
        *   若员工状态为 `Probation` (试用期)：在明细行显示橙色“试用”标签。

### US2: 发放确认闭环 (Confirmation Loop)
*   **故事**: 我需要一键确认发放，并能随时导出加密的 Excel 工资条给财务存档。
*   **数据业务需求**:
    *   **导出逻辑**: 导出文件需包含 `AES-256` 加密，文件名格式 `Payroll_{Month}_{Company_ShortName}.xlsx`。
    *   **隐私策略**: 详情页中的个税额度默认打码。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐 (Axis Lock)**: 
    *   薪资详情列表的人员头像中心点需对齐左侧 **20px 轴线**。
*   **交互动效**: 
    *   饼图加载采用 `Rotate-in` 动效，时长 800ms。
    *   确认按钮点击后，需展示 `Processing` 状态 1.5s 以模拟银行链路通讯。

## 3. 验收标准 (Acceptance Criteria)

- [x] 详情页必须准确计算并展示实发总额（Net Pay Total）。
- [x] 试用期员工在列表中必须有显著区分标识。
- [x] 点击“确认并提交”后，对应的 Inbox 任务状态需同步更新为已完成。
- [x] 导出按钮在“已发放”状态下必须变为可见。
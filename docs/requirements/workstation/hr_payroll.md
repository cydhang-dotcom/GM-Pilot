# 业务需求: 薪酬管理 (Payroll)

> **入口 ID**: `hr-1`  
> **优先级**: P1  
> **设计核心**: 成本透明 (Cost Transparency)、穿透审计 (Drill-down Audit)、安全确认 (Secure Confirm)

## 1. 用户故事 与 数据逻辑

### US1: 薪酬全表确认 (Payroll Confirmation)
*   **逻辑**: 展示实发总额、发放人数及部门占比。

### US2: 个人薪资明细穿透 (Individual Drill-down)
*   **故事**: 作为 GM，在审核工资表时，我需要点进具体的人员查看其工资是如何构成的，个税扣了多少。
*   **数据业务逻辑**:
    *   **应发工资 (Earnings)**: 基本工资 + 绩效/奖金。
    *   **代扣代缴 (Deductions)**: 五险一金 (个人) + 个人所得税。
    *   **实发金额 (Net Pay)**: `Net_Pay = Earnings - Deductions`。
*   **状态标识**: 试用期员工在明细中必须展示“试用”标签。

## 2. 界面行为规范 (UI Behaviors)

*   **交互逻辑**: 
    *   从 `PayrollDetail` 的人员名单点击，平滑推入 `StaffSalaryDetail` Overlay。
    *   明细页顶部展示实发大字，底部展示“应发”与“扣除”两个独立的分段卡片。
*   **视觉细节**: 扣除项（个税/社保）金额字体色固定为 `rose-600`。

## 3. 验收标准

- [x] 点击人员行必须进入个人薪资明细页。
- [x] 明细页必须分别展示应发项、代扣项及最终实发金额。
- [x] 必须包含“下载电子工资条”的入口。
- [x] 个税已申报状态必须有明确的视觉反馈。

## 4. API 接口

| 接口描述 | Endpoint |
| :--- | :--- |
| 获取人员薪资构成明细 | `/api/hr/payroll/employee/{id}` |
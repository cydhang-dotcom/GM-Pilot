# 业务需求: 五险一金 (Social Security & Fund)

> **入口 ID**: `hr-4`
> **优先级**: P2
> **设计核心**: 成本预测 (Cost Projection)、变动敏感 (Change Sensitivity)、合规校验 (Compliance)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 雇主负担测算 (Employer Cost Projection)
*   **故事**: 作为总经理，我需要知道本月公司为员工额外承担了多少五险一金成本，以便进行精确的人力预算评估。
*   **数据业务逻辑**:
    *   **核心算法**: 
        *   `Company_Total = SUM(Staff_Social_Company_Part + Staff_Fund_Company_Part)`。
        *   `Change_Impact = Company_Total_Current - Company_Total_Last`。
    *   **自动统计**: 系统根据本月 `Payroll_Structure` 中的 `Social_Base` 字段，实时计算并更新首页看板的“公司承担”数值。

### US2: 异动人员监控 (Change Tracking)
*   **故事**: 我需要清晰看到本月谁新开了社保，谁停交了，确保与入离职情况完全吻合。
*   **数据业务逻辑**:
    *   **触发器**: 当 `Employee_Status` 变更或 `Insurance_Enrollment` 状态变化时，自动将名单推送到“增减员明细” Overlay。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐 (20px Axis)**: 
    *   增减员列表中，人员头像的中轴线必须严格对齐左侧 **20px** 轴线。
*   **交互动效**: 
    *   缴纳总额采用 `CountUp` 动效，时长 1000ms。
    *   PDF 凭证预览采用“拟物纸质”阴影效果。

## 3. 验收标准 (Acceptance Criteria)

- [x] 首页看板必须拆分显示“公司承担”与“个人承担”金额。
- [x] 增员 (Add) 需使用蓝色标识，减员 (Remove) 需使用灰色标识。
- [x] 缴纳记录必须包含“回单下载”入口。
- [x] 详情页必须展示该账期的缴费基数明细。
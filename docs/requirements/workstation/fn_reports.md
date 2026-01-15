# 业务需求: 财税报表 (Reports)

> **入口 ID**: `fn-5`
> **优先级**: P1
> **设计核心**: 趋势预判 (Trend Forecasting)、离线可用 (Offline Access)、格式兼容 (Format Support)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 经营健康趋势 (Operating Trend)
*   **故事**: 我需要看过去半年收入和支出的开口大小，判断公司利润是否在良性扩张。
*   **数据业务逻辑**:
    *   **聚合算法**: 
        *   `Dataset = Map(Months, { Revenue, Expense })`。
        *   `Profit_Gap_Area = Revenue_Line - Expense_Line`。
    *   **数据频率**: 每月结账完成后更新一次数据点。

### US2: 报表包下载 (Exporting Packages)
*   **故事**: 融资或贷款时，我需要将资产负债表和利润表一键发送给对方。
*   **数据业务逻辑**:
    *   **安全性**: 下载链接需具备 10 分钟时效，且文件名自动包含 `CONFIDENTIAL` 后缀。

## 2. 界面行为规范 (UI Behaviors)

*   **图表交互**: 
    *   面积图支持 Tooltip 交互，滑动时显示该月份的具体净利润数值。
*   **视觉对齐**: 
    *   报表列表的文件图标左边缘严格锁定在 20px 轴线。

## 3. 验收标准 (Acceptance Criteria)

- [x] 趋势图必须能够正确渲染近 6 个月的数据点。
- [x] 报表预览页必须模拟纸质文件在桌面的阴影效果。
- [x] 所有的报表文件必须提供 PDF 和 Excel 两种下载格式。
- [x] 点击报表详情必须能够跳转至对应的“凭证管理”进行明细审计。
# 业务需求: 资金流水 (Cash Flow)

> **入口 ID**: `fn-flow`
> **优先级**: P1
> **设计核心**: 流转透明 (Flow Visibility)、智能分类 (Smart Classification)、隐私脱敏 (Privacy)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 流水用途补全 (Explain the Flow)
*   **故事**: 代理会计在后台无法确认某些大额支出的用途，我需要快速标记它们属于“研发费”还是“房租”。
*   **数据业务逻辑**:
    *   **映射逻辑**: 
        *   `Category_Options = ['销售回款', '服务费', '往来款', '报销', '工资', '税费']`。
        *   用户选择后，调用 `PUT /classification` 接口同步至 ERP 系统。
    *   **状态触发器**: 若流水金额 > 5w 且未关联发票/报销单，自动标记为 `Warning: Pending Explanation`。

### US2: 电子回单直达 (Voucher Link)
*   **故事**: 当审计需要看某笔交易的银行原件时，我需要能直接点开 PDF 回单。
*   **数据业务需求**:
    *   **文件逻辑**: 回单附件按 `yyyyMMdd_{BankID}_{Amount}.pdf` 索引。

## 2. 界面行为规范 (UI Behaviors)

*   **隐私模式标准**: 
    *   页面加载时金额列默认 `blur(8px)`，直到用户在 Company 页开启隐私解除。
*   **视觉对齐**: 
    *   “收/支”图标左边缘锁定在 20px 轴线。

## 3. 验收标准 (Acceptance Criteria)

- [x] 收入金额显示为 Emerald 绿色，支出金额显示为 Slate 深色。
- [x] 点击“补充用途”标签后，必须弹出快捷分类选择器。
- [x] 搜索功能必须能按“交易对手”名称进行实时匹配。
- [x] 流水列表必须支持按“待解释/待确认”状态进行置顶过滤。
# 功能需求: 账单置顶卡片 (Pinned Bill)

> **所属模块**: Inbox
> **优先级**: P0
> **设计核心**: 强力触达 (Forced Notification)、快速支付 (Fast Pay)

## 1. 用户故事 (User Story) 与 数据逻辑

### US1: 欠费停服风险防控
*   **数据业务逻辑**:
    *   **置顶逻辑**: 存在 `Status = UNPAID` 记录时强制置顶。
    *   **风险升级**: 距离截止日 < 48 小时，背景切换为 Amber 渐变。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉规格**: 背景采用 `Indigo-50` 到 `White` 的对角线渐变。
*   **详情 Overlay**: 详情页必须列出：1. 费用构成；2. 收款方账号一键复制；3. 发票状态。

## 3. 验收标准 (Acceptance Criteria)

- [x] 支付完成后返回 Inbox，该卡片必须立即消失。
- [x] 卡片上的金额字体必须使用 `font-mono`。
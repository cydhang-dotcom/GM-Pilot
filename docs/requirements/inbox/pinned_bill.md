
# 功能需求: 账单置顶卡片 (Pinned Bill)

> **所属模块**: Inbox
> **优先级**: P0
> **设计核心**: 成果导向 (Result Oriented)、心理账户 (Mental Accounting)、强力触达 (Forced Notification)

## 1. 用户故事 (User Story) 与 数据逻辑

### US1: 支付阻力消解 (Frictionless Payment)
*   **故事**: 作为总经理，我不希望把服务费看作一种“损失”，而是一种“对经营成果的投资”。
*   **数据业务逻辑**:
    *   **置顶逻辑**: 存在 `Status = UNPAID` 记录时强制置顶。
    *   **状态映射**: 
        *   `Pending`: 默认状态，显示金额与支付入口。
        *   `Processing`: 点击支付后，显示 Loading 动效 (1.5s)。
        *   `Paid`: 支付成功，显示绿色对勾并自动移除卡片。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉色彩心理学**: 
    *   **翡翠绿主题 (Emerald)**: 卡片背景弃用常规的警告色（橙/红），转而使用与 Dashboard “净利润”同源的 **Emerald Green** (`from-white to-emerald-50/60`)。
    *   **暗示**: 暗示“支付此账单 = 获得经营成果”，利用颜色语义降低用户对支出的心理防御。
*   **核心元素**:
    *   **图标**: 使用 `ReceiptText` (带明细收据)，容器为半透明翡翠绿 (`bg-emerald-500/10`)，避免视觉过重。
    *   **金额**: 使用 `font-mono` 等宽字体，颜色锁定为 `text-emerald-600`。
    *   **CTA 按钮**: 右侧必须放置 **“立即支付”** 实色按钮 (`bg-emerald-600`)，替代单一的箭头图标，强化行动暗示。
*   **交互细节**:
    *   卡片需具备 `active:scale-[0.99]` 的微触感。
    *   按钮在 `group-hover` 时可有轻微的背景色加深或位移反馈。

## 3. 验收标准 (Acceptance Criteria)

- [x] 卡片主色调必须为翡翠绿（Emerald），严禁使用红色或橙色作为主背景（除非逾期严重）。
- [x] 支付完成后，必须显示“资金指令已发出”的反馈 Overlay。
- [x] 卡片图标必须为 `ReceiptText` 而非通用的 `CreditCard`。
- [x] 金额文字颜色必须与 Dashboard 的“盈利”颜色保持一致。
- [x] 卡片必须包含“立即支付”按钮，文案清晰可见。

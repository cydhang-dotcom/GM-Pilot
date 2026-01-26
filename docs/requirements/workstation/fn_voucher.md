
# 业务需求: 凭证管理 (Voucher)

> **入口 ID**: `fn-3`
> **优先级**: P2
> **设计核心**: 审计穿透 (Audit Drill-down)、月结锁定 (Closing Lock)、拟物体验 (Skeuomorphic)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 凭证审计穿透 (Voucher Traceability)
*   **故事**: 看到一张“记账凭证”时，我需要点一下就能看到它背后的发票和银行流水。
*   **数据业务逻辑**:
    *   **分录校验**: `SUM(Debit_Amount) === SUM(Credit_Amount)`。若不平，凭证状态标记为 `Error`。
    *   **穿透层级**: `Voucher (L3) -> Source_Detail (L4) -> Original_Image (L5)`。

### US2: 月结验收锁版 (Period Closing)
*   **故事**: 我确认本月账目无误后进行“数字签名”，防止代理会计再随意修改。
*   **数据业务逻辑**:
    *   **锁版算法**: 验收完成后，调用 `POST /accounting/lock`，将该账期所有 `is_locked` 标记设为 `true`，禁止任何 `CRUD` 操作。

## 2. 界面行为规范 (UI Behaviors)

*   **拟物设计标准**: 
    *   凭证卡片背景需使用 `#FAFAFA` 略带纹理感的背景。
    *   会计分录表格需采用经典的红/黑细线布局。
*   **进度可视化 (Visual Stepper)**:
    *   页面顶部需展示 5 步月结进度：`智能做账` -> `人工复核` -> `纳税申报` -> `月结验收` -> `归档锁定`。
    *   当前步骤需高亮显示，步骤之间需有连线进度条。
*   **影像预览交互**: 
    *   Level 5 影像预览必须全屏且背景为黑色（沉浸式）。

## 3. 验收标准 (Acceptance Criteria)

- [x] 凭证详情必须清晰展示借贷平衡表。
- [x] 顶部月结进度条必须根据 API 返回状态自动高亮当前节点。
- [x] 附件列表必须区分显示发票、流水、回单等不同图标。
- [x] 月结验收流程必须包含“资金平衡”与“附件齐套”两个强制校验项。
- [x] 已锁定的账期，页面顶部必须显示灰色的“已归档”水印标签。

## 4. API 接口 (API Interfaces)

### 4.1 获取凭证详情 (Get Voucher)
*   **Endpoint**: `GET /api/finance/vouchers/{id}`
*   **输入参数 (Request)**:
    *   `id`: 凭证 ID (Required)
*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `code` | 凭证字号 | String | 如 '记-001' |
| `summary` | 摘要 | String | - |
| `entries` | 会计分录 | Array<Object> | - |
| `entries[].subject` | 科目名称 | String | - |
| `entries[].debit` | 借方金额 | Decimal | - |
| `entries[].credit` | 贷方金额 | Decimal | - |
| `attachments` | 附件列表 | Array<Object> | 原始单据 |

### 4.2 执行月结锁版 (Lock Period)
*   **Endpoint**: `POST /api/finance/accounting/period/{month}/lock`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `month` | 会计期间 | String | Required, YYYY-MM | - |
| `sign_hash` | 验收签名 | String | Required | 数字签名Hash |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `success` | 锁版结果 | Boolean | - |
| `locked_at` | 锁定时间 | String | ISO 8601 |

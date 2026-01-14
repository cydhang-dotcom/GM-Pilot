# 业务需求: 发票管理 (Invoice)

## 1. 核心元数据
*   **入口 ID**: `fn-4`
*   **优先级**: P1
*   **设计核心**: 进销一体 (Unified In/Out), 状态实时 (Real-time Status)

## 2. 用户故事 (User Story)
*   **故事**: 我要随时用手机拍发票报销（进项），或者发起开票申请让财务开发票给客户（销项）。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 进销项模型
*   **Direction**: `IN` (收票/进项) vs `OUT` (开票/销项).
*   **Status**: 
    *   IN: `COLLECTED` (已采集) -> `VERIFIED` (已验真) -> `BOOKED` (已入账).
    *   OUT: `REQUESTED` (已申请) -> `ISSUED` (已开具) -> `SENT` (已发送).

### 3.2 OCR 流程
*   `Upload Image` -> `OCR Service` -> `Extract(Code, Num, Amount, Date)` -> `Verify API` -> `Result`.

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 列表区分
*   **收 (IN)**: 绿色标签 `bg-emerald-50 text-emerald-600`。
*   **开 (OUT)**: 蓝色标签 `bg-indigo-50 text-indigo-600`。
*   **金额**: 收票显示负数/黑色（成本），开票显示正数/蓝色（收入）。

### 4.2 拟物票据
*   详情页模拟增值税发票样式，包含票头、购买方、销售方、金额区。
*   顶部边缘可做锯齿处理（CSS `mask-image` 或 SVG）。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 扫描上传的发票应自动填入金额和日期，并允许手动修正。
*   **Then** 待开票的申请应支持“催办”操作。

# 业务需求: 税款缴纳 (Tax)

## 1. 核心元数据
*   **入口 ID**: `fn-2`
*   **优先级**: P1
*   **设计核心**: 期限感知 (Deadline Awareness), 支付确认 (Payment Confirmation)

## 2. 用户故事 (User Story)
*   **故事**: 每月申报期（通常 15 号前），我要看到还剩几天，并确认税金扣款成功，避免滞纳金。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 申报倒计时
```python
Deadline = GetTaxDeadline(CurrentMonth) // e.g., 15th
Days_Remaining = DateDiff(Deadline, Today)
Alert_Level = Days_Remaining <= 3 ? 'URGENT' : 'NORMAL'
```

### 3.2 状态流转
*   `PENDING` (未申报) -> `DECLARED` (已申报/待扣款) -> `PAID` (已扣款/完税).

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 倒计时卡片
*   顶部显示大卡片：“距离申报截止还有 X 天”。
*   若 `URGENT`，背景色使用 `bg-orange-50`，文字 `text-orange-600`。

### 4.2 明细列表
*   列出各税种（增值税、个税、附加税）的金额和状态。
*   已缴款项显示“完税凭证”下载入口。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 超过申报截止日且未完成的，必须显示红色“已逾期”警告。
*   **Then** 各税种加总金额应与账户扣款金额一致。

# 业务需求: 凭证管理 (Voucher)

## 1. 核心元数据
*   **入口 ID**: `fn-3`
*   **优先级**: P2
*   **设计核心**: 审计穿透 (Audit Drill-down), 月结锁定 (Closing Lock)

## 2. 用户故事 (User Story)
*   **故事**: 我要看某笔账是怎么记的，并且在月底确认所有凭证无误后，锁定账本（月结），防止被随意篡改。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 借贷平衡校验
```python
Debit_Sum = Sum(Entries.filter(dir='DEBIT').amount)
Credit_Sum = Sum(Entries.filter(dir='CREDIT').amount)
Is_Balanced = (Debit_Sum == Credit_Sum)
```

### 3.2 锁版机制
*   **Action**: `LockPeriod(Year, Month)`
*   **Effect**: 该账期下所有 Voucher 的 `readOnly` 属性设为 `true`，禁止增删改。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 拟物凭证
*   详情页模仿纸质凭证样式：
    *   顶部：标题、日期、字号。
    *   中部：表格（摘要、科目、借方、贷方）。
    *   底部：制单人、审核人签名。
*   **金额线**: 表格内金额列可选用虚线分割千分位（可选）。

### 4.2 附件挂载
*   凭证下方显示关联的原始单据（发票、回单）缩略图，点击可全屏预览。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 每一张凭证的借方合计必须等于贷方合计。
*   **Then** 已锁定的账期，页面应有明显的“已归档/Locked”水印或标记。

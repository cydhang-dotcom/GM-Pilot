# 业务需求: 费用报销 (Reimbursement)

## 1. 核心元数据
*   **入口 ID**: `fn-reim`
*   **优先级**: P1
*   **设计核心**: 流程合规 (Compliance), 证据闭环 (Evidence Loop)

## 2. 用户故事 (User Story)
*   **故事**: 员工报销时，系统要自动检查发票、支付记录齐不齐，别等财务退回了才补。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 证据链完整性
*   **Rule**: `Evidence_Score = (Has_Invoice ? 1 : 0) + (Has_Payment_Record ? 1 : 0) + (Has_Reason ? 1 : 0)`
*   **Status**: `Score < 3` -> `EVIDENCE_MISSING` (提示补全).

### 3.2 OCR 辅助
*   上传图片后自动识别金额，并累加至总报销额。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 状态反馈
*   **Evidence Missing**: 卡片底部显示红色提示条：“缺支付记录”。
*   **Approved**: 绿色状态标签。

### 4.2 发起页
*   支持多张发票连拍，自动生成明细列表。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 如果缺少支付凭证，提交时应弹出阻断性或警告性提示。
*   **Then** 报销总额应自动等于所有明细金额之和。

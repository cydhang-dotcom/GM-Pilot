# 财务模块数据接口清单 (Finance API List)

> **适用范围**: 移动端 App 财务模块 (`fn-*`)
> **状态**: Draft
> **更新时间**: 2023-12

本文档列出了前端页面所需的后端数据接口，用于指导前后端联调。

## 1. 对账中心 (Reconciliation / `fn-rec`)
*负责处理流水与单据的差异、异常沟通。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/reconciliation/summary` | 获取对账健康度评分、最后同步时间及待处理计数。 | - |
| `POST` | `/api/finance/reconciliation/sync` | 触发银行/税局数据手动同步。 | - |
| `GET` | `/api/finance/reconciliation/discrepancies` | 获取差异处理清单。 | `{ status: 'pending' }` |
| `GET` | `/api/finance/reconciliation/items/{id}` | 获取单笔差异详情 (含关联的流水/单据快照)。 | - |
| `GET` | `/api/finance/reconciliation/items/{id}/timeline` | 获取异常事项的沟通记录 (Chat History)。 | - |
| `POST` | `/api/finance/reconciliation/items/{id}/reply` | 发送回复消息。 | `{ content: string }` |
| `POST` | `/api/finance/reconciliation/items/{id}/resolve` | 标记差异已处理。 | `{ resolution: string }` |

## 2. 资金流水 (Cash Flow / `fn-flow`)
*查看银行日记账，补充业务用途。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/cashflow` | 获取流水列表。 | `{ filter: 'all'|'income'|'expense'|'pending', page: number }` |
| `GET` | `/api/finance/cashflow/trend` | 获取本月vs上月现金流对比趋势数据 (Dashboard用)。 | - |
| `GET` | `/api/finance/cashflow/{id}` | 获取流水详情及电子回单信息。 | - |
| `PUT` | `/api/finance/cashflow/{id}/classification` | 更新流水业务用途 (如"补充用途")。 | `{ tag: string, desc?: string }` |
| `POST` | `/api/finance/cashflow/{id}/match` | 确认流水与单据的匹配关系。 | `{ targetId: string }` |

## 3. 发票管理 (Invoice / `fn-4`)
*管理进项发票采集与销项开票申请。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/invoices` | 获取发票统一列表 (含进项与销项)。 | `{ page: number }` |
| `GET` | `/api/finance/invoices/{id}` | 获取发票详情 (票面信息、流转状态)。 | - |
| `POST` | `/api/finance/invoices/scan` | 上传发票扫描件/照片进行OCR识别。 | `{ file: Blob }` |
| `POST` | `/api/finance/invoices/issue-request` | 提交开票申请。 | `{ customer: string, amount: number, content: string, ... }` |

## 4. 费用报销 (Reimbursement / `fn-reim`)
*员工报销申请与合规性检查。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/reimbursements` | 获取我的报销单列表。 | - |
| `GET` | `/api/finance/reimbursements/{id}` | 获取报销单详情 (含明细、证据链状态)。 | - |
| `POST` | `/api/finance/reimbursements` | 发起新的报销申请。 | `{ amount: number, desc: string, items: [] }` |
| `POST` | `/api/finance/reimbursements/{id}/evidence` | 补充缺失的影像材料。 | `{ file: Blob, type: string }` |

## 5. 凭证管理 (Voucher / `fn-3`)
*查看会计分录与原始单据，执行月结验收。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/accounting/period/{month}` | 获取指定月份的关账进度 (Stepper Status)。 | - |
| `GET` | `/api/finance/vouchers` | 获取凭证列表。 | `{ month: string, page: number }` |
| `GET` | `/api/finance/vouchers/{id}` | 获取凭证详情 (会计分录、挂载附件列表)。 | - |
| `GET` | `/api/finance/attachments/{id}/url` | 获取原始单据的预览地址。 | - |
| `POST` | `/api/finance/accounting/period/{month}/lock` | 执行月结验收锁版操作。 | `{ acceptedItems: string[] }` |

## 6. 财税报表 (Reports / `fn-5`)
*查看经营报表与下载文件。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/reports/overview` | 获取经营趋势图数据 (收入/支出)。 | `{ months: 6 }` |
| `GET` | `/api/finance/reports/files` | 获取月度报表文件列表 (BS/PL)。 | `{ month: string }` |
| `GET` | `/api/finance/reports/files/{id}/download` | 获取文件下载链接。 | - |

## 7. 税款缴纳 (Tax / `fn-2`)
*监控纳税申报状态。*

| Method | Endpoint | Description | Payload/Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/finance/tax/current-period` | 获取本期申报概况 (倒计时、应缴总额)。 | - |
| `GET` | `/api/finance/tax/records` | 获取纳税记录列表。 | `{ year: string }` |
| `POST` | `/api/finance/tax/{id}/confirm` | 确认申报并授权扣款。 | - |
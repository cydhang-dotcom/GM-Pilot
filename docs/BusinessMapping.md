# 业务映射索引 (Business & Code Mapping Index)

> **同步原则**: 任何页面 (.tsx) 的新增或修改，必须同步更新对应的需求文档 (.md) 及本索引。

## 1. 核心导航模块 (Core Navigation)

| 模块 | 业务描述 | 需求文档 (.md) | 实现页面 (.tsx) |
| :--- | :--- | :--- | :--- |
| **经营总览** | 企业盈利看板、AI 诊断、现金流对比、支出构成 | [`01_Dashboard.md`](./requirements/01_Dashboard.md) | [`Dashboard.tsx`](../pages/Dashboard.tsx) |
| **智能待办** | 交付进度时间轴、任务聚合、高优账单支付 | [`02_Inbox.md`](./requirements/02_Inbox.md) | [`Inbox.tsx`](../pages/Inbox.tsx) |
| **事务工作台** | 人事/财务业务入口集合，四宫格/分类布局 | [`03_Workstation.md`](./requirements/03_Workstation.md) | [`Work.tsx`](../pages/Work.tsx) |
| **企业中心** | 企业数字名片、隐私模式对公账户、资料管家 | [`04_Company.md`](./requirements/04_Company.md) | [`Company.tsx`](../pages/Company.tsx) |

## 2. 深度业务子模块 (Sub-Modules)

### 2.1 经营看板组件 (Dashboard Components)
| 业务项 | 业务描述 | 需求文档 | 实现/关联代码 |
| :--- | :--- | :--- | :--- |
| 现金流走势 | 本月 vs 上月日对齐余额走势对比图 | [`cash_flow_trend.md`](./requirements/dashboard/cash_flow_trend.md) | [`CashFlowComparisonChart.tsx`](../components/charts/CashFlowComparisonChart.tsx) |
| 支出结构分析 | 四大科目线性进度条展示与穿透逻辑 | [`expenditure.md`](./requirements/dashboard/expenditure.md) | [`Dashboard.tsx`](../pages/Dashboard.tsx) |
| 交付进度轴 | 20px 轴心锁定、拟物化节点的状态时间轴 | [`timeline.md`](./requirements/dashboard/timeline.md) | [`Inbox.tsx`](../pages/Inbox.tsx) |
| 人员规模趋势 | 在职人数大字与近 4 个月流动性变化 | [`personnel_trend.md`](./requirements/dashboard/personnel_trend.md) | [`Dashboard.tsx`](../pages/Dashboard.tsx) |

### 2.2 人事管理 (Human Resources)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **HR-1** | 薪酬管理：薪资构成、历史发放、工资条导出 | [`hr_payroll.md`](./requirements/workstation/hr_payroll.md) | [`Payroll.tsx`](../pages/workstation/hr/Payroll.tsx) |
| **HR-EMP** | 员工管理：在职统计、入职添加、员工档案 Overlay | [`hr_employee.md`](./requirements/workstation/hr_employee.md) | [`Employee.tsx`](../pages/workstation/hr/Employee.tsx) |
| **HR-4** | 五险一金：增减员明细、月度缴纳汇总、凭证下载 | [`hr_social.md`](./requirements/workstation/hr_social.md) | [`SocialSecurity.tsx`](../pages/workstation/hr/SocialSecurity.tsx) |
| **HR-6** | 合同管理：到期预警、续签决策、倒计时展示 | [`hr_contract.md`](./requirements/workstation/hr_contract.md) | [`Contract.tsx`](../pages/workstation/hr/Contract.tsx) |

### 2.3 财务与税务 (Finance & Tax)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **FN-REC** | 对账中心：健康度监控、差异处理、代理沟通 | [`finance_reconciliation.md`](./requirements/workstation/finance_reconciliation.md) | [`Reconciliation.tsx`](../pages/workstation/finance/Reconciliation.tsx) |
| **FN-FLOW** | 资金流水：银行日记账、待解释用途补充 | [`fn_cashflow.md`](./requirements/workstation/fn_cashflow.md) | [`CashFlow.tsx`](../pages/workstation/finance/CashFlow.tsx) |
| **FN-4** | 发票管理：进项扫码、销项申请、流转状态 | [`fn_invoice.md`](./requirements/workstation/fn_invoice.md) | [`Invoice.tsx`](../pages/workstation/finance/Invoice.tsx) |
| **FN-REIM** | 费用报销：智能拍票、合规预检、证据链补齐 | [`finance_reimbursement.md`](./requirements/workstation/finance_reimbursement.md) | [`Reimbursement.tsx`](../pages/workstation/finance/Reimbursement.tsx) |
| **FN-3** | 凭证管理：月结进度、拟物凭证、单据穿透 | [`fn_voucher.md`](./requirements/workstation/fn_voucher.md) | [`VoucherManager.tsx`](../pages/workstation/finance/VoucherManager.tsx) |
| **FN-5** | 财税报表：经营趋势面积图、BS/PL 报表预览 | [`fn_reports.md`](./requirements/workstation/fn_reports.md) | [`FinancialReports.tsx`](../pages/workstation/finance/FinancialReports.tsx) |
| **FN-2** | 税款缴纳：申报倒计时、多税种详情、扣款确认 | [`fn_tax.md`](./requirements/workstation/fn_tax.md) | [`Tax.tsx`](../pages/workstation/finance/Tax.tsx) |

---
*Version: v1.6.0-SYNC | Code and Doc are Soulmates.*
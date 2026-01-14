# 业务映射索引 (Business & Code Mapping Index)

> **同步原则**: 任何页面 (.tsx) 的新增或修改，必须同步更新对应的需求文档 (.md) 及本索引。

## 1. 核心导航模块 (Core Navigation)

| 模块 | 业务描述 | 需求文档 (.md) | 实现页面 (.tsx) |
| :--- | :--- | :--- | :--- |
| **经营总览** | 企业盈利看板、AI 诊断、现金流对比、支出构成 | `docs/requirements/01_Dashboard.md` | `pages/Dashboard.tsx` |
| **智能待办** | 交付进度时间轴、任务聚合、高优账单支付 | `docs/requirements/02_Inbox.md` | `pages/Inbox.tsx` |
| **事务工作台** | 人事/财务业务入口集合，四宫格/分类布局 | `docs/requirements/03_Workstation.md` | `pages/Work.tsx` |
| **企业中心** | 企业数字名片、隐私模式对公账户、资料管家 | `docs/requirements/04_Company.md` | `pages/Company.tsx` |

## 2. 深度业务子模块 (Sub-Modules)

### 2.1 经营看板组件 (Dashboard Components)
| 业务项 | 业务描述 | 需求文档 | 实现/关联代码 |
| :--- | :--- | :--- | :--- |
| 现金流走势 | 本月 vs 上月日对齐余额走势对比图 | `docs/requirements/dashboard/cash_flow_trend.md` | `components/charts/CashFlowComparisonChart.tsx` |
| 支出结构分析 | 四大科目线性进度条展示与穿透逻辑 | `docs/requirements/dashboard/expenditure.md` | `pages/Dashboard.tsx` |
| 交付进度轴 | 20px 轴心锁定、拟物化节点的状态时间轴 | `docs/requirements/dashboard/timeline.md` | `pages/Inbox.tsx` |
| 人员规模趋势 | 在职人数大字与近 4 个月流动性变化 | `docs/requirements/dashboard/personnel_trend.md` | `pages/Dashboard.tsx` |

### 2.2 人事管理 (Human Resources)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **HR-1** | 薪酬管理：薪资构成、历史发放、工资条导出 | `docs/requirements/workstation/hr_payroll.md` | `pages/workstation/hr/Payroll.tsx` |
| **HR-EMP** | 员工管理：在职统计、入职添加、员工档案 Overlay | `docs/requirements/workstation/hr_employee.md` | `pages/workstation/hr/Employee.tsx` |
| **HR-4** | 五险一金：增减员明细、月度缴纳汇总、凭证下载 | `docs/requirements/workstation/hr_social.md` | `pages/workstation/hr/SocialSecurity.tsx` |
| **HR-6** | 合同管理：到期预警、续签决策、倒计时展示 | `docs/requirements/workstation/hr_contract.md` | `pages/workstation/hr/Contract.tsx` |

### 2.3 财务与税务 (Finance & Tax)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **FN-REC** | 对账中心：健康度监控、差异处理、代理沟通 | `docs/requirements/workstation/finance_reconciliation.md` | `pages/workstation/finance/Reconciliation.tsx` |
| **FN-FLOW** | 资金流水：银行日记账、待解释用途补充 | `docs/requirements/workstation/fn_cashflow.md` | `pages/workstation/finance/CashFlow.tsx` |
| **FN-4** | 发票管理：进项扫码、销项申请、流转状态 | `docs/requirements/workstation/fn_invoice.md` | `pages/workstation/finance/Invoice.tsx` |
| **FN-REIM** | 费用报销：智能拍票、合规预检、证据链补齐 | `docs/requirements/workstation/finance_reimbursement.md` | `pages/workstation/finance/Reimbursement.tsx` |
| **FN-3** | 凭证管理：月结进度、拟物凭证、单据穿透 | `docs/requirements/workstation/fn_voucher.md` | `pages/workstation/finance/VoucherManager.tsx` |
| **FN-5** | 财税报表：经营趋势面积图、BS/PL 报表预览 | `docs/requirements/workstation/fn_reports.md` | `pages/workstation/finance/FinancialReports.tsx` |
| **FN-2** | 税款缴纳：申报倒计时、多税种详情、扣款确认 | `docs/requirements/workstation/fn_tax.md` | `pages/workstation/finance/Tax.tsx` |

---
*Version: v1.6.0-SYNC | Code and Doc are Soulmates.*
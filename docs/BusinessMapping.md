# 业务映射索引 (Business & Code Mapping Index)

## 1. 核心导航模块 (Core Navigation)

| 模块 | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **经营总览** | 企业盈利、AI 诊断、现金流、支出构成 | [01_Dashboard.md](requirements/01_Dashboard.md) | [Dashboard.tsx](../pages/Dashboard.tsx) |
| **智能待办** | 交付进度时间轴、任务聚合、高优账单支付 | [02_Inbox.md](requirements/02_Inbox.md) | [Inbox.tsx](../pages/Inbox.tsx) |
| **事务工作台** | 人事/财务业务入口集合 | [03_Workstation.md](requirements/03_Workstation.md) | [Work.tsx](../pages/Work.tsx) |
| **企业中心** | 企业数字名片、隐私模式对公账户 | [04_Company.md](requirements/04_Company.md) | [Company.tsx](../pages/Company.tsx) |

## 2. 深度业务子模块 (Sub-Modules)

### 2.1 人事管理 (Human Resources)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **HR-PAY-LIST** | 月度薪资总表确认与历史记录 | [hr_payroll.md](requirements/workstation/hr_payroll.md) | [Payroll.tsx](../pages/workstation/hr/Payroll.tsx) |
| **HR-PAY-IND** | **个人薪资明细穿透 (应发/代扣/实发)** | [hr_payroll.md](requirements/workstation/hr_payroll.md) | [PayrollDetail.tsx](../pages/workstation/hr/PayrollDetail.tsx) |
| **HR-SOC-DYN** | **增减员动态：含办理日期与进度状态** | [hr_social.md](requirements/workstation/hr_social.md) | [SocialSecurity.tsx](../pages/workstation/hr/SocialSecurity.tsx) |
| **HR-EMP-PROF** | **员工档案：全景档案预览、原位脱敏及编辑** | [hr_employee.md](requirements/workstation/hr_employee.md) | [EmployeeDetail.tsx](../pages/workstation/hr/EmployeeDetail.tsx) |
| **HR-EMP-ADD** | **员工入职：5步法录入、参数化配置** | [hr_employee_add.md](requirements/workstation/hr_employee_add.md) | [EmployeeAdd.tsx](../pages/workstation/hr/EmployeeAdd.tsx) |

### 2.2 财务管理 (Finance Ops)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **FN-REC-MAIN** | **对账中心：异常沟通、健康度评估** | [fn_reconciliation.md](requirements/workstation/fn_reconciliation.md) | [Reconciliation.tsx](../pages/workstation/finance/Reconciliation.tsx) |
| **FN-FLOW** | 资金流水：补充用途与电子回单 | [fn_cashflow.md](requirements/workstation/fn_cashflow.md) | [CashFlow.tsx](../pages/workstation/finance/CashFlow.tsx) |
| **FN-VOUCHER** | **凭证管理：5步关账进度、拟物化分录** | [fn_voucher.md](requirements/workstation/fn_voucher.md) | [VoucherManager.tsx](../pages/workstation/finance/VoucherManager.tsx) |
| **FN-REPORTS** | 经营趋势图与月度报表下载 | [fn_reports.md](requirements/workstation/fn_reports.md) | [FinancialReports.tsx](../pages/workstation/finance/FinancialReports.tsx) |

### 2.3 综合服务 (Services)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **SRV-TICKETS** | 服务台：工单流、专属顾问 | [srv_consultant.md](requirements/workstation/srv_consultant.md) | [ServiceRequest.tsx](../pages/workstation/services/ServiceRequest.tsx) |
| **SRV-SUBSIDY** | 政府补助：年度收益看板、进度追踪 | [srv_subsidy.md](requirements/workstation/srv_subsidy.md) | [GovernmentSubsidy.tsx](../pages/workstation/services/GovernmentSubsidy.tsx) |
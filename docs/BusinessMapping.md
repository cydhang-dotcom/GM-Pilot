
# 业务映射索引 (Business & Code Mapping Index)

> **同步原则**: 任何页面 (.tsx) 的新增或修改，必须同步更新对应的需求文档 (.md) 及本索引。

## 1. 核心导航模块 (Core Navigation)

| 模块 | 业务描述 | 需求文档 (.md) | 实现页面 (.tsx) |
| :--- | :--- | :--- | :--- |
| **经营总览** | 企业盈利看板、AI 诊断、现金流对比、支出构成 | [01_Dashboard.md](requirements/01_Dashboard.md) | [Dashboard.tsx](../pages/Dashboard.tsx) |
| **智能待办** | 交付进度时间轴、任务聚合、高优账单支付 | [02_Inbox.md](requirements/02_Inbox.md) | [Inbox.tsx](../pages/Inbox.tsx) |
| **事务工作台** | 人事/财务业务入口集合，四宫格/分类布局 | [03_Workstation.md](requirements/03_Workstation.md) | [Work.tsx](../pages/Work.tsx) |
| **企业中心** | 企业数字名片、隐私模式对公账户、资料管家 | [04_Company.md](requirements/04_Company.md) | [Company.tsx](../pages/Company.tsx) |

## 2. 深度业务子模块 (Sub-Modules)

### 2.1 人事管理 (Human Resources)
| 业务 ID | 业务描述 | 需求文档 | 实现页面 |
| :--- | :--- | :--- | :--- |
| **HR-PAY-LIST** | 薪酬列表：历史发放、构成预览 | [hr_payroll.md](requirements/workstation/hr_payroll.md) | [Payroll.tsx](../pages/workstation/hr/Payroll.tsx) |
| **HR-PAY-DTL** | 薪酬明细：部门核算、实发金额 | [hr_payroll.md](requirements/workstation/hr_payroll.md) | [PayrollDetail.tsx](../pages/workstation/hr/PayrollDetail.tsx) |
| **HR-EMP** | 员工列表：在职统计、搜索检索 | [hr_employee.md](requirements/workstation/hr_employee.md) | [Employee.tsx](../pages/workstation/hr/Employee.tsx) |
| **HR-ONBOARDING** | 入职流程：全节点跟踪、参数化办理、补全向导 | [onboarding_process.md](requirements/inbox/onboarding_process.md) | [OnboardingProcess.tsx](../pages/inbox/OnboardingProcess.tsx)<br/>[OnboardingDetail.tsx](../pages/inbox/OnboardingDetail.tsx) |
| **HR-EMP-ADD** | 员工录入：5步录入法、强制薪资、合同/社保联动 | [hr_employee_add.md](requirements/workstation/hr_employee_add.md) | [EmployeeAdd.tsx](../pages/workstation/hr/EmployeeAdd.tsx) |
| **HR-EMP-DTL** | 员工档案：包含薪酬社保隐私数据、档案穿透 | [hr_employee.md](requirements/workstation/hr_employee.md) | [EmployeeDetail.tsx](../pages/workstation/hr/EmployeeDetail.tsx) |

# GM Pilot 移动端 App 功能清单 (Feature Checklist)

> 版本: v1.1.0
> 更新时间: 2023-12
> 关联文档: [Master PRD](./PRD.md)

## 1. 核心看板 (Dashboard)
> 详情: [01_Dashboard.md](./requirements/01_Dashboard.md)

### 1.1 交付进度时间轴 (Timeline)
> [需求文档](./requirements/dashboard/timeline.md)
- [x] **节点状态展示**: Completed (绿), Active (蓝), Pending (灰), Risk (橙)。
- [x] **默认折叠**: 仅展示进行中或风险节点。
- [x] **展开全部**: 支持展开查看完整时间轴。
- [x] **进度概览**: 显示整体进度百分比。
- [x] **操作内嵌**: 节点支持跳转 Inbox。

### 1.2 支出构成分析 (Expenditure)
> [需求文档](./requirements/dashboard/expenditure.md)
- [x] **总额展示**: 显示本月支出合计。
- [x] **饼图可视化**: 工资、社保、税费、服务费占比。
- [x] **跳转入口**: 跳转至财税报表详情。

### 1.3 税前扣除限额监控 (Tax Limits)
> [需求文档](./requirements/dashboard/tax_limits.md)
- [x] **科目卡片**: 展示招待费、福利费等科目。
- [x] **进度条**: 可视化已用金额/限额标准。
- [x] **状态预警**: Safe, Warning, Critical (需纳税调整)。

### 1.4 人员规模趋势 (Personnel)
> [需求文档](./requirements/dashboard/personnel_trend.md)
- [x] **核心指标**: 在职人数及入离职变动。
- [x] **趋势图**: 近4个月人数变化面积图。

## 2. 智能待办 (Inbox)
> 详情: [02_Inbox.md](./requirements/02_Inbox.md)

### 2.1 账单置顶卡片 (Pinned Bill)
> [需求文档](./requirements/inbox/pinned_bill.md)
- [x] **触发条件**: 服务费账单等 CONFIRM 类型任务。
- [x] **视觉强调**: 独立卡片样式。
- [x] **快捷操作**: “立即支付”按钮。

### 2.2 任务聚合与列表 (Task Grouping)
> [需求文档](./requirements/inbox/task_grouping.md)
- [x] **任务聚合**: 入职任务组、OA 审批组。
- [x] **列表展示**: 高优任务平铺，普通任务排序。
- [x] **优先级视觉**: 红点或高亮标识。

### 2.3 OA 审批详情 (OA Workflow)
> [需求文档](./requirements/inbox/oa_workflow.md)
- [x] **角色切换**: 待我审批 / 我发起的。
- [x] **状态筛选**: 待处理/已处理; 审批中/通过/驳回/撤销。
- [x] **审批卡片**: 显示耗时、摘要。
- [x] **流程节点**: 显示当前审批节点。

## 3. 事务工作台 (Workstation)
> 详情: [03_Workstation.md](./requirements/03_Workstation.md)

### 3.1 人事管理 (HR)
- **薪酬管理** [📄](./requirements/workstation/hr_payroll.md):
  - [x] 本月支出卡片 (实发/社保/个税)。
  - [x] 构成饼图。
  - [x] 发放记录列表。
- **员工管理** [📄](./requirements/workstation/hr_employee.md):
  - [x] 在职/入离职统计。
  - [x] 状态筛选 (试用/离职中)。
  - [x] 人员列表卡片。
- **社保公积金** [📄](./requirements/workstation/hr_social.md):
  - [x] 缴纳总额 (公司/个人)。
  - [x] 增减员统计与明细。
- **合同管理** [📄](./requirements/workstation/hr_contract.md):
  - [x] 到期预警 (30天/已过期)。
  - [x] 合同列表。

### 3.2 财务税务 (Finance)
- **资金流水** [📄](./requirements/workstation/fn_cashflow.md):
  - [x] 实时余额与本月收支。
  - [x] 收入/支出/转账筛选。
  - [x] 交易明细列表。
- **税款缴纳** [📄](./requirements/workstation/fn_tax.md):
  - [x] 纳税信用评级。
  - [x] 申报倒计时。
  - [x] 历史税单列表。
- **电子凭证** [📄](./requirements/workstation/fn_voucher.md):
  - [x] 凭证列表与状态。
- **发票管理** [📄](./requirements/workstation/fn_invoice.md):
  - [x] 进项发票统计。
  - [x] 扫码/录入入口。
- **财税报表** [📄](./requirements/workstation/fn_reports.md):
  - [x] 收支趋势图。
  - [x] 报表下载列表。

### 3.3 综合服务 (Services)
> [需求文档](./requirements/workstation/services.md)
- [x] **服务工单**: 政策咨询、证明开具、异常处理。
- [x] **进度追踪**: 历史记录与状态更新。

## 4. 我的企业 (Company)
> 详情: [04_Company.md](./requirements/04_Company.md)

### 4.1 企业数字名片 (Identity)
> [需求文档](./requirements/company/identity.md)
- [x] **基础信息**: Logo、认证状态。
- [x] **快捷操作**: 税号一键复制。

### 4.2 对公账户卡片 (Bank Account)
> [需求文档](./requirements/company/bank_account.md)
- [x] **视觉设计**: 拟态银行卡。
- [x] **隐私模式**: 隐藏余额与敏感数字。
- [x] **核心数据**: 余额、收支统计。

### 4.3 常用功能菜单 (Menu Groups)
> [需求文档](./requirements/company/menu_groups.md)
- [x] **业务资料**: 开票信息、收件地址。
- [x] **权益资产**: 印章、证书、签约版本。
- [x] **管理配置**: 成员、日志。
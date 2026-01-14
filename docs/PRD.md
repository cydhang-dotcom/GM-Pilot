# GM Pilot 产品需求文档 (Master PRD)

> **版本**: v1.6.0-PRO
> **状态**: Released (Internal Pilot)
> **更新日期**: 2024-01
> **同步原则**: 本文档遵循 `memory.md` 规范，作为项目的“宪法”，任何代码变更必须在此有迹可循。

## 1. 项目愿景 (Vision)
**GM Pilot** 是为中小企业总经理（GM）量身打造的移动端“数字副官”。它不追求大而全的操作功能，而是通过**聚合**人事与财务外包服务数据，将复杂的专业账目转化为 GM **听得懂、看得见、防得住**的经营指标与决策节点。

## 2. 核心设计原则 (Design Principles)

### 2.1 上帝视角 (God Mode)
*   **原则**: 隐藏过程，只呈结果。
*   **落地**: 首页不展示凭证录入入口，只展示“盈亏结果”和“风险诊断”。

### 2.2 隐私默认 (Privacy by Default)
*   **原则**: 假定所有移动端使用场景（电梯、咖啡馆）均不安全。
*   **落地**: 对公账户余额、员工薪资等敏感数据在 UI 上默认处于 **高斯模糊/打码** 状态，需主动点击“眼睛”图标并在短时间内查看。

### 2.3 20px 轴心法则 (The 20px Axis)
*   **原则**: 建立极致的视觉秩序感。
*   **落地**: 所有时间轴节点、列表图标、关键文本的左边缘中心点，必须严格锁定在距离屏幕左侧 **20px** 的垂直辅助线上。

## 3. 需求优先级矩阵 (Prioritization)

| 优先级 | 定义 | 关键功能模块 |
| :--- | :--- | :--- |
| **P0 (Blocker)** | **决策闭环** | 经营盈亏看板、AI 风险诊断、交付进度时间轴 (Timeline)、对公账户隐私卡片 |
| **P1 (Core)** | **业务穿透** | 薪酬明细查询、资金流水用途补充、发票进销管理、对账差异沟通 |
| **P2 (Nice to have)** | **辅助增强** | 政府补助追踪、操作日志、消息通知配置、服务顾问工单 |

## 4. 详细需求规范索引 (Detailed Requirements Index)

> 所有子文档均遵循 `memory.md` 定义的“六段式”标准（元数据、用户故事、逻辑、UI规范、异常处理、验收标准）。

### 4.1 经营总览 (Dashboard)
*   **[01_Dashboard.md](./requirements/01_Dashboard.md)**: 模块主文档。
*   **[支出构成分析](./requirements/dashboard/expenditure.md)**: 线性进度条 (Linear Progress) 替代饼图的设计规范。
*   **[现金流走势环比](./requirements/dashboard/cash_flow_trend.md)**: 本月 vs 上月日对齐趋势图算法。
*   **[人员规模趋势](./requirements/dashboard/personnel_trend.md)**: 核心人力指标监控。

### 4.2 智能待办 (Inbox)
*   **[02_Inbox.md](./requirements/02_Inbox.md)**: 模块主文档。
*   **[交付进度时间轴](./requirements/dashboard/timeline.md)**: 20px 轴心锁定的拟物化节点规范。
*   **[账单置顶卡片](./requirements/inbox/pinned_bill.md)**: 紧急待支付任务的强提醒逻辑。
*   **[任务聚合](./requirements/inbox/task_grouping.md)**: OA 审批与入职任务的降噪聚合。
*   **[OA 审批流](./requirements/inbox/oa_workflow.md)**: 极简审批交互。

### 4.3 事务工作台 (Workstation)
*   **[03_Workstation.md](./requirements/03_Workstation.md)**: 模块主文档 (Grid 布局与搜索)。
*   **财务运营**:
    *   [对账中心](./requirements/workstation/finance_reconciliation.md) (Health Dashboard)
    *   [资金流水](./requirements/workstation/fn_cashflow.md) (Smart Match)
    *   [发票管理](./requirements/workstation/fn_invoice.md) (In/Out Unified)
    *   [费用报销](./requirements/workstation/finance_reimbursement.md) (Evidence Check)
    *   [凭证管理](./requirements/workstation/fn_voucher.md) (Closing Workflow)
    *   [财税报表](./requirements/workstation/fn_reports.md) (Data Drill-down)
    *   [税款缴纳](./requirements/workstation/fn_tax.md) (Payment Alert)
*   **人事管理**:
    *   [薪酬管理](./requirements/workstation/hr_payroll.md) (Cost Analysis)
    *   [员工档案](./requirements/workstation/hr_employee.md) (Search & Detail)
    *   [五险一金](./requirements/workstation/hr_social.md) (Change Monitor)
    *   [合同管理](./requirements/workstation/hr_contract.md) (Risk Alert)
*   **企业服务**:
    *   [综合服务](./requirements/workstation/services.md) (Consultant & Ticket)
    *   [政府补助](./requirements/workstation/srv_subsidy.md) (Milestone Tracker)

### 4.4 企业中心 (Company)
*   **[04_Company.md](./requirements/04_Company.md)**: 模块主文档。
*   **[数字名片](./requirements/company/identity.md)**: 开票信息一键复制逻辑。
*   **[银行账户](./requirements/company/bank_account.md)**: 隐私模式状态机与交互。
*   **[菜单组](./requirements/company/menu_groups.md)**: 信息层级定义。

---
*关联标准: [设计规范](./DesignStandards.md) | [业务映射索引](./BusinessMapping.md)*

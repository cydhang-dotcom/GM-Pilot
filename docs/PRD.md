
# GM Pilot 产品需求文档 (Master PRD)

> **版本**: v1.6.2
> **状态**: 内部试运行 (Internal Pilot)  
> **更新日期**: 2024-01  
> **同步原则**: 遵循 `memory.md` 规范，任何功能变动均需同步此文档。

## 1. 项目愿景 (Vision)
**GM Pilot** 是为中小企业总经理打造的“数字副官”。通过聚合人事财务外包数据，将复杂的专业账目转化为 GM 听得懂、看得见的经营指标。

## 2. 核心设计原则 (Design Principles)
- **上帝视角**: 所有的复杂逻辑隐藏在后台，GM 只看结果。
- **隐私保护**: 财务数据默认打码，隐私是第一优先级。
- **20px 轴心**: 极致的秩序感，所有列表与轴线像素级对齐。

## 3. 需求优先级矩阵 (Prioritization)

| 优先级 | 功能范畴 | 关键点 |
| :--- | :--- | :--- |
| **P0 (高)** | **核心决策闭环** | 经营盈亏看板、AI 风险诊断、交付进度时间轴、对公账户隐私卡片 |
| **P1 (中)** | **业务穿透能力** | 入职办理(扫码/补全)、薪酬明细查询、资金流水解释、发票管理 |
| **P2 (低)** | **辅助与增强** | 政府补助追踪、操作日志、消息通知配置 |

## 4. 详细需求规范索引 (Detailed Requirements)

### 4.1 经营总览 (Dashboard)
- [01_Dashboard.md](./requirements/01_Dashboard.md)
- [支出构成分析](./requirements/dashboard/expenditure.md)
- [现金流走势环比](./requirements/dashboard/cash_flow_trend.md)

### 4.2 智能待办 (Inbox)
- [02_Inbox.md](./requirements/02_Inbox.md)
- [交付进度时间轴](./requirements/dashboard/timeline.md)
- [账单置顶卡片](./requirements/inbox/pinned_bill.md)
- [入职办理流程](./requirements/inbox/onboarding_process.md) (含扫码识别与参数化办理)

### 4.3 事务工作台 (Workstation)
- [03_Workstation.md](./requirements/03_Workstation.md)
- [财务明细 (流水/发票/报销/凭证)](./requirements/workstation/)
- [人事明细 (薪酬/员工/社保/合同)](./requirements/workstation/)

### 4.4 企业中心 (Company)
- [04_Company.md](./requirements/04_Company.md)
- [对公账户隐私逻辑](./requirements/company/bank_account.md)

---
*关联标准: [设计规范](./DesignStandards.md) | [业务映射索引](./BusinessMapping.md)*

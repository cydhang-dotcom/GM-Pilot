# 功能需求: 税前扣除限额监控 (Tax Limits)

> **所属模块**: Dashboard (已迁移)
> **状态**: ⏸️ 已挂起 (Archived)
> **设计核心**: 合规合规 (Compliance Monitoring)

## 1. 业务逻辑变更
该功能已从 Dashboard 首屏移除，数据全量迁移至 `WorkDetail/fn-5` (财税报表) 的“税务合规分析”子项。

## 2. 界面行为规范
*   **归档标记**: 在历史报表中以 `Tax_Adjustment_Alert` 形式展示。
*   **AC**: 报表端需准确计算业务招待费、职工教育经费的超支数额。
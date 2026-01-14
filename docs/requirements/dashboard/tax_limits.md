# 功能需求: 税前扣除限额监控 (Tax Limits)

## 1. 核心元数据 (Header & Meta)
*   **所属模块**: Dashboard -> Migrated to Reports
*   **优先级**: P2
*   **状态**: **Archived (已归档)**
*   **设计核心**: 合规合规 (Compliance Monitoring)

## 2. 变更说明 (Change Log)
*   **原定位置**: Dashboard 首页底部。
*   **当前状态**: 该功能模块已从 Dashboard 移除，相关数据逻辑已全量迁移至 **财税报表 (Workstation/fn-5)** 的“税务合规分析”子项中。
*   **原因**: 属于低频深度分析需求，不适合占据首页高频决策区。

## 3. 详细业务逻辑 (Legacy Logic for Reference)

### 3.1 限额计算公式
```python
# 业务招待费
Limit_Entertainment = Revenue * 0.005 // 收入的 千分之五
Actual_Entertainment = Sum(Subject_6602_BusinessEntertainment)
Over_Limit = Max(0, Actual_Entertainment - Limit_Entertainment)

# 职工教育经费
Limit_Education = Total_Salary * 0.08 // 工资总额的 8%
```

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 归档占位 (若需展示)
*   如果在历史版本或某些特定视图需展示，统一使用 **Alert Banner** 样式。
*   **样式**: `bg-gray-50 border border-gray-200 text-gray-500`。
*   **文案**: "税务限额分析已移至报表中心"。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** Dashboard 页面不应出现独立的“税前扣除限额”卡片。
*   **Then** 在“财税报表”详情页应能找到同等逻辑的数据展示。

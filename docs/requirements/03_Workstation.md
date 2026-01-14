# 模块需求: 事务工作台 (Workstation)

> **优先级**: P1
> **设计核心**: 业务分类 (Categorized)、数据穿透 (Drill-down)、极简入口 (Minimal Entry)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 业务快速定位 (Fast Navigation)
*   **故事**: 我需要一个逻辑清晰的业务分类入口，能快速找到对应的事务处理。
*   **数据业务逻辑**:
    *   **实时角标 (Badge Logic)**: `Badge_Value = count(Pending_Tasks_by_BusinessID)`。
    *   **搜索算法**: 支持对 `ServiceItem.label` 进行模糊匹配。

## 2. 界面行为规范 (UI Behaviors)

*   **四宫格布局标准**: 
    *   图标容器统一采用 `w-14 h-14` 圆角矩形。
    *   文字标签下方必须保留至少 12px 的呼吸空间。
*   **视觉对齐**: 图标中心的水平对齐线必须贯穿同排的所有图标。

## 3. 验收标准 (Acceptance Criteria)

- [x] 搜索框在输入 1 个字符后必须触发过滤。
- [x] 所有业务图标必须带有对应的 Badge 计数（若有待办）。
- [x] 业务分类标题左侧必须有对应的品牌色装饰块。
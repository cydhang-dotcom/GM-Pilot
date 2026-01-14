# 功能需求: 支出构成分析 (Expenditure Breakdown)

> **所属模块**: Dashboard
> **优先级**: P1
> **设计核心**: 线性透视 (Linear Perspective)、颜色语义 (Color Semantics)

## 1. 用户故事 (User Story) 与 数据逻辑

### US1: 成本透视
*   **数据业务逻辑**:
    *   **核心映射**: `R&D`, `Admin`, `Ops`, `Tax` 四大科目强制聚合。
    *   **算法**: `Percentage = (Category_Amount / Total_Cost) * 100`。

## 2. 界面行为规范 (UI Behaviors)

*   **线性进度条规范**: 高度锁定 `h-1.5`，动画时长 `1200ms`。
*   **20px 轴心对齐**: 进度条左侧的类别色点（Circle）中心必须对齐 Dashboard 的 **20px 全局轴线**。

## 3. 验收标准 (Acceptance Criteria)

- [x] 四个分类的百分比总和必须为 100%。
- [x] 进度条颜色必须严格对应：研发(Indigo), 行政(Purple), 运营(Amber), 税金(Slate)。
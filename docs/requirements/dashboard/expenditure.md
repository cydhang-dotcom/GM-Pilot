# 功能需求: 支出构成分析 (Expenditure Breakdown)

## 1. 核心元数据
*   **所属模块**: Dashboard (01_Dashboard.md)
*   **优先级**: P1
*   **设计核心**: 线性透视 (Linear Perspective), 颜色语义 (Color Semantics)

## 2. 用户故事 (User Story)
*   **故事**: 我希望直观看到本月钱主要花哪了（研发、管理、运营还是税），饼图太占地方，我更喜欢清单式的进度条。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 聚合算法
```python
# 科目映射表
Mapping = {
  '6601': 'Ops',   // 销售费用
  '6602': 'Admin', // 管理费用 -> 研发需从中拆分或单独科目
  'R&D_Code': 'R&D', // 研发支出
  '2221': 'Tax'    // 税金
}

Total = Sum(All_Cost_Items)
Item['R&D'].percent = (Item['R&D'].amount / Total) * 100
```

### 3.2 排序逻辑
*   按金额 `Amount` 降序排列 (DESC)，确保占比最大的条目在最上方。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 线性进度条 (Linear Progress)
*   **轨道**: `h-1.5` (6px)，背景色 `bg-slate-50`，圆角 `rounded-full`。
*   **填充**: 宽度根据百分比动态计算，使用 `transition-all duration-1000` 实现加载动画。
*   **颜色映射**:
    *   R&D: `bg-indigo-500`
    *   Admin: `bg-purple-500`
    *   Ops: `bg-amber-500`
    *   Tax: `bg-slate-500`

### 4.2 20px 轴心对齐
*   虽然位于 Card 内部，但左侧的 **分类色点 (Dot)** 的中心线，建议与 Dashboard 全局的 20px 轴线保持某种视觉韵律（或在 Card 内部建立新的 20px 缩进体系）。
*   **内部规范**: Card Padding `p-5`，内部元素左边缘对齐。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 所有进度条的百分比之和理论上应接近 100%。
*   **Then** 进度条加载时应从 0 宽度平滑过渡到目标宽度。

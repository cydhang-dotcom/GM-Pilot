# 业务需求: 人员规模趋势 (Personnel Trend)

## 1. 核心元数据
*   **所属模块**: Dashboard (01_Dashboard.md)
*   **优先级**: P2
*   **设计核心**: 规模感知 (Scale Awareness), 流动性监控 (Mobility Monitoring)

## 2. 用户故事 (User Story)
*   **故事**: 我需要一眼看到公司现在的总人数，以及最近几个月是扩张还是收缩。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 核心指标计算
*   **当前在职 (Headcount)**:
    ```sql
    SELECT COUNT(*) FROM employees WHERE status = 'Active' AND join_date <= NOW();
    ```
*   **环比变动 (MoM Delta)**:
    ```python
    Delta = Current_Month_Headcount - Last_Month_Headcount
    Trend = Delta > 0 ? 'Positive' : (Delta < 0 ? 'Negative' : 'Neutral')
    ```

### 3.2 趋势图数据结构
```typescript
interface TrendPoint {
  month: string; // '2023-10'
  count: number;
}
// Data source: Last 6 months
```

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 数字大卡
*   **主数值**: `text-2xl font-black font-mono`，强调当前规模。
*   **变动标签**: 
    *   增长: `bg-emerald-100 text-emerald-600`，图标 `UserPlus`。
    *   减少: `bg-rose-100 text-rose-600`，图标 `TrendingDown`。

### 4.2 迷你趋势图 (Sparkline)
*   使用 `recharts` 的 `AreaChart`。
*   **隐藏坐标轴**: 去除 X/Y 轴线及刻度，仅保留曲线走势。
*   **渐变填充**: 区域填充色使用 `from-emerald-500/20 to-transparent`。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 如果本月入职 3 人离职 1 人，环比变动应显示 `+2`。
*   **Then** 趋势图应能响应点击，Tooltip 显示具体月份人数。

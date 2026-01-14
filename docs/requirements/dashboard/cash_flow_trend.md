# 功能需求: 现金流走势环比 (Cash Flow Trend)

## 1. 核心元数据 (Header & Meta)
*   **所属模块**: Dashboard (01_Dashboard.md)
*   **优先级**: P0
*   **状态**: Approved
*   **设计核心**: 基准对比 (Benchmarking), 风险预警 (Risk Alert), 趋势可视 (Trend Viz)

## 2. 用户故事 (User Story)
*   **场景**: 月中（15号）查看账户余额，想知道比上个月这时候是多了还是少了。
*   **故事**: 作为总经理，我需要将本月的资金曲线叠加在上个月的曲线上（日对日），直观判断“烧钱”速度是否异常。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 环比对齐算法
```python
FUNCTION GetTrendData(CurrentMonth, LastMonth):
  # 1. 获取本月每日余额 (截至今日)
  CurrentSeries = QueryDailyBalance(CurrentMonth).map(d => { day: d.day, val: d.balance })
  
  # 2. 获取上月每日余额 (全月)
  LastSeries = QueryDailyBalance(LastMonth).map(d => { day: d.day, val: d.balance })
  
  # 3. 合并数据源 (按天对齐)
  MergedData = []
  FOR i FROM 1 TO 31:
      MergedData.push({
          day: i,
          current: CurrentSeries.find(d => d.day == i)?.val || null,
          last: LastSeries.find(d => d.day == i)?.val || 0
      })
  RETURN MergedData
```

### 3.2 差额计算逻辑 (Tooltip)
*   **Delta**: `Current_Val - Last_Val`
*   **Percent**: `(Delta / Last_Val) * 100`
*   **Privacy**: 若全局隐私开关开启，Tooltip 中的数值需替换为 `****`，百分比保留。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 面积图样式
*   **本月曲线 (Current)**:
    *   Stroke: `#3B82F6` (Blue-500), 宽度 2.5px。
    *   Fill: 线性渐变 `from-blue-500/20 to-transparent`。
    *   ActiveDot: 蓝色实心点，外圈白色描边。
*   **上月曲线 (Last)**:
    *   Stroke: `#D1D5DB` (Gray-300), 宽度 1.5px。
    *   LineType: `strokeDasharray="4 4"` (虚线)。
    *   Fill: 无 (transparent)。

### 4.2 交互反馈
*   **手指滑动**: 触发 Tooltip，Tooltip 需跟随手指位置，但不遮挡当前数据点。
*   **吸附**: 触摸释放后，Tooltip 自动吸附到最近的有数据日期（通常是 Today）。

## 5. 异常与边界处理 (Edge Cases)

*   **月初空白**: 若本月刚开始（如 1 号），Current 线只有一个点，显示为点状，不连线。
*   **大小月**: 若上月 30 天，本月 31 天，第 31 天对比数据处理为 `null` 或延用第 30 天数据（需在配置中定义，默认 `null`）。

## 6. 验收标准 (Acceptance Criteria)

*   **Given** 今天是 15 号
    *   **Then** 蓝色实线应只绘制到 X 轴的 15 位置，15 之后为空白。
    *   **And** 灰色虚线应绘制完整的 1-30/31 日走势。
*   **When** 开启隐私模式
    *   **Then** 曲线走势保持不变，但点击查看数值时显示脱敏字符。

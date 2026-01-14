# 业务需求: 财税报表 (Reports)

## 1. 核心元数据
*   **入口 ID**: `fn-5`
*   **优先级**: P1
*   **设计核心**: 趋势预判 (Trend Forecasting), 格式兼容 (Format Support)

## 2. 用户故事 (User Story)
*   **故事**: 融资或汇报时，我需要看过去半年的营收利润走势，并下载资产负债表和利润表。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 数据聚合
*   **趋势图数据**:
    ```sql
    SELECT month, sum(revenue), sum(profit) FROM monthly_reports GROUP BY month ORDER BY month DESC LIMIT 6;
    ```
*   **报表文件**: PDF (用于阅读), Excel (用于加工).

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 趋势面积图
*   **Chart**: 收入曲线（蓝色填充），利润曲线（绿色/橙色线）。
*   **Tooltip**: 手指滑动时显示当月具体数值及环比增长。

### 4.2 文件列表
*   图标区分文件类型（PDF vs Excel）。
*   提供“一键打包下载”功能。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 图表必须展示至少近 6 个月的数据。
*   **Then** 点击报表项应进入预览模式（如果是 PDF）或触发下载（如果是 Excel）。

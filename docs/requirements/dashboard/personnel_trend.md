# 业务需求: 人员规模趋势 (Personnel Trend)

> **所属模块**: Dashboard
> **优先级**: P2
> **设计核心**: 规模感知 (Scale Awareness)、流动性监控 (Mobility Monitoring)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 规模变动感知 (Mobility Sense)
*   **故事**: 作为 GM，我需要知道公司现在一共多少人，这个月是扩招了还是流失了。
*   **数据业务逻辑**:
    *   **核心指标**: 
        *   `Current_Headcount = count(Employee_Status == 'Active')`。
        *   `Headcount_Delta = Current_Count - Last_Month_Count`。
    *   **趋势预测**: 基于近 4 个月的数据生成 `Personnel_Area_Chart`。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   趋势图下方的指标文字左边缘锁定在 **20px** 轴线。
*   **颜色语义**: 
    *   入职增量 (+N) 使用 `Emerald-500`。
    *   离职减量 (-N) 使用 `Rose-500`。

## 3. 验收标准 (Acceptance Criteria)

- [x] 首页卡片必须显示具体的在职人数大字。
- [x] 必须具备入职/离职的环比变动数值。
- [x] 趋势图必须展示近 4 个月的数据点且支持 Tooltip 交互。
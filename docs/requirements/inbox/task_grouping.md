# 业务需求: 任务聚合与列表 (Task Grouping)

> **所属模块**: Inbox
> **优先级**: P1
> **设计核心**: 降噪 (Noise Reduction)、分类索引 (Categorized Index)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 智能任务降噪 (Smart Aggregation)
*   **故事**: 我不想被 10 个入职确认刷屏，我需要它们自动合并成一个“入职任务包”。
*   **数据业务逻辑**:
    *   **聚合算法**: 
        *   `Group_By(Type, Provider)`。
        *   `Display_Card = { Title: "Type", Count: N, Summary: "Latest_Task_Desc" }`。
    *   **红点触发**: 角标 `Badge_Value` 必须严格等于二级列表中的 `Status == 'Pending'` 数量。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   聚合卡片左侧图标容器中心锁定在 **20px** 轴线。
*   **二级视图进入**: 
    *   采用 `Slide-in-Right` 动效进入分层任务列表，原首页执行淡出效果。

## 3. 验收标准 (Acceptance Criteria)

- [x] 同类型的多个任务在首页必须呈现为单个聚合卡片。
- [x] 聚合卡片的角标数字必须实时更新。
- [x] 点击聚合卡片必须能进入对应的详情子列表。
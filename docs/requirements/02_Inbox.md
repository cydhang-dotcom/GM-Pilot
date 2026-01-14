# 模块需求: 智能待办 (Inbox)

## 1. 核心元数据 (Header & Meta)
*   **优先级**: P0 (Blocker)
*   **状态**: Approved
*   **设计核心**: 决策高效 (Efficiency), 进度透明 (Transparency), 轴心锁定 (Axis Alignment)

## 2. 用户故事 (User Stories)

### US1: 履约透明化 (Oversight)
*   **场景**: 月初至月中，各类申报和发薪密集期。
*   **故事**: 作为总经理，我需要实时掌握外包服务商的交付进度（如工资是否发了、税是否报了），确保关键节点不延误。

### US2: 任务噪音过滤 (Task Grouping)
*   **场景**: 入职季，同时有 5 个新员工入职，Inbox 里全是入职确认任务。
*   **故事**: 我不想被琐碎的任务刷屏，我需要分类聚合后的极简视图，一键批处理或分层查看。

## 3. 详细业务逻辑 (Business Logic & Algorithms)

### 3.1 数据结构
```typescript
interface TimelineItem {
  id: string;
  type: 'PAYROLL' | 'TAX' | 'SOCIAL' | 'BILL' | 'TASK_GROUP';
  title: string;
  deadline: string; // ISO8601
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'OVERDUE';
  
  // 聚合逻辑字段
  groupId?: string; // 若存在，则属于聚合任务
  subItems?: Array<TaskItem>; // 聚合子项
  
  // 进度指标
  metrics?: {
    label: string;
    value: string;
    trend?: 'UP' | 'DOWN';
  }[];
}
```

### 3.2 核心算法
*   **节点状态判定 (Status Determination)**:
    ```python
    IF item.completionDate IS NOT NULL:
        RETURN 'COMPLETED'
    ELSE IF Now() > item.deadline:
        RETURN 'OVERDUE'
    ELSE IF Now() >= item.startDate AND Now() <= item.deadline:
        RETURN 'ACTIVE'
    ELSE:
        RETURN 'PENDING'
    ```
*   **任务聚合 (Grouping Logic)**:
    ```python
    # 对原始任务列表进行归约
    GroupedList = []
    Map<GroupId, AggregateItem> groups = {}

    FOR task IN RawTasks:
        IF task.groupId IS NULL:
            GroupedList.push(task)
        ELSE:
            IF groups[task.groupId] IS NULL:
                groups[task.groupId] = CreateAggregate(task.type)
            groups[task.groupId].subItems.push(task)
            groups[task.groupId].count += 1
            
    GroupedList.addAll(groups.values())
    Sort(GroupedList, by: Status Priority, then: Deadline)
    ```

### 3.3 状态机 (Timeline Interaction)
*   **State: Folded (Default)**
    *   **Condition**: `Items.length > 5`
    *   **UI**: 仅显示 `Active` 及之后未完成的节点，已完成节点折叠。
*   **State: Expanded**
    *   **Trigger**: 用户点击“查看完整节点”或下拉 Chevron。
    *   **UI**: 展开所有 `Completed` 历史节点，Timeline 高度撑开。

## 4. UI/UX 交互与视觉规范 (UI/UX Specifications)

### 4.1 20px 轴心锁定 (Critical)
*   **时间轴线**: 垂直连接线 (1.5px width) 的 X 轴中心必须严格位于 **20px**。
*   **Marker 定位**: 
    *   状态图标 (Check/Clock) 容器大小 40x40 (w-10 h-10)。
    *   容器绝对定位 `left: 0`，确保其几何中心准确落在 20px 轴线上。
*   **内容缩进**: 卡片内容容器 `margin-left: 48px` (12rem)，确保不遮挡轴线。

### 4.2 视觉样式
*   **Marker 状态色**:
    *   `COMPLETED`: `bg-emerald-500` (实心绿圆 + 白色勾)。
    *   `ACTIVE`: `border-indigo-600` (空心蓝环 + 呼吸动画)。
    *   `PENDING`: `border-slate-200` (灰色圆环)。
    *   `OVERDUE`: `bg-rose-500` (实心红圆 + 感叹号)。

## 5. 异常与边界处理 (Edge Cases)

*   **逾期任务**: 若 `Status == 'OVERDUE'`，卡片背景变为淡红色 (`bg-rose-50`)，并置顶显示。
*   **空状态**: 若本月无任务，显示插画“本月履约轻松，暂无待办”。

## 6. 验收标准 (Acceptance Criteria)

*   **Given** 有 3 个未完成的入职任务
    *   **When** 进入 Inbox 页面
    *   **Then** 应看到一个“入职任务”聚合卡片，角标显示“3”，而不是 3 个散列卡片。
*   **Given** 时间轴
    *   **Then** 测量屏幕左边缘到连接线的距离，必须精确为 20px。

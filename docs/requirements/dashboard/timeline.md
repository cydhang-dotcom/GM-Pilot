# 功能需求: 交付进度时间轴 (Timeline)

## 1. 核心元数据
*   **所属模块**: Inbox (02_Inbox.md)
*   **优先级**: P0
*   **设计核心**: 轴心锁定 (Pixel Axis), 拟物状态 (Skeuomorphic Status)

## 2. 用户故事 (User Story)
*   **故事**: 我需要按时间顺序查看本月的关键交付节点，已完成的自动沉底或折叠，未完成的按截止时间排序。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 排序算法
```python
FUNCTION SortTimeline(items):
  # 1. 未完成的优先 (Active > Pending)
  # 2. 已完成的沉底 (Completed)
  # 3. 内部按日期排序
  
  ActiveItems = items.filter(status != 'COMPLETED').sortBy(deadline ASC)
  CompletedItems = items.filter(status == 'COMPLETED').sortBy(completedDate DESC)
  
  RETURN [...ActiveItems, ...CompletedItems]
```

### 3.2 节点状态映射
| 状态 (Status) | 触发条件 (Condition) | 视觉表现 (Visual) |
| :--- | :--- | :--- |
| **COMPLETED** | `task.done == true` | 绿色实心圆 + 勾 |
| **ACTIVE** | `Now() >= start` && `!done` | 蓝色空心圆 + 呼吸光环 |
| **PENDING** | `Now() < start` | 灰色空心圆 |
| **OVERDUE** | `Now() > deadline` && `!done` | 红色实心圆 + 叹号 |

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 20px 轴心锁定标准
*   **基准线**: 屏幕左边缘向右 **20px** 处为绝对中轴。
*   **连接线**: 宽度 `1.5px`，颜色 `slate-100`，居中于 20px。
*   **Marker**: 
    *   尺寸 `20px * 20px` (w-5 h-5)。
    *   绝对定位 `left: 10px` (20px - 10px)，确保中心对齐。

### 4.2 卡片容器
*   **左边距**: `pl-12` (48px)，留出足够空间给 Marker。
*   **交互**: 点击卡片区域（非 Marker）进入详情 Overlay。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 连接线在视觉上必须贯穿所有 Marker 的圆心。
*   **Then** 已完成的任务节点在列表中应位于未完成任务的下方（除非按时间轴严格排序，视具体配置而定，此处按 US 逻辑为沉底）。

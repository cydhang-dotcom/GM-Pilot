# 功能需求: 账单置顶卡片 (Pinned Bill)

## 1. 核心元数据
*   **所属模块**: Inbox (02_Inbox.md)
*   **优先级**: P0
*   **设计核心**: 强力触达 (Forced Notification), 快速支付 (Fast Pay)

## 2. 用户故事 (User Story)
*   **故事**: 服务费、房租等必须支付的账单，不能被淹没在普通审批任务里，必须置顶直到我支付完成。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 置顶算法
```python
FUNCTION GetPinnedItems(tasks):
  # 筛选条件：类型为账单 AND 状态为未支付 AND (优先级高 OR 快到期)
  Pinned = tasks.filter(t => 
    t.type == 'BILL' AND 
    t.status == 'UNPAID' AND 
    (t.priority == 'HIGH' OR DaysUntil(t.deadline) <= 3)
  )
  RETURN Pinned.sortBy(deadline ASC)
```

### 3.2 支付状态流转
*   `UNPAID` -> (Click Pay) -> `PROCESSING` -> (Callback Success) -> `PAID` -> (Remove from Pinned).

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 渐变卡片
*   **背景**: `bg-gradient-to-br from-indigo-50 to-white`。
*   **边框**: `border-indigo-100`。
*   **阴影**: `shadow-sm`，Hover 时 `shadow-md`。

### 4.2 关键信息
*   **金额**: `text-indigo-600 font-mono font-black`。
*   **倒计时**: 若剩余时间 < 24h，显示红色文字 `即将逾期`。

## 5. 验收标准 (Acceptance Criteria)

*   **Given** 有一笔未支付的服务费账单
    *   **Then** 它必须出现在 Inbox 列表的最顶部，位于普通时间轴之上。
*   **When** 点击“去支付”并模拟成功
    *   **Then** 该卡片应立即从置顶区消失。

# 业务需求: 对账中心 (Reconciliation)

## 1. 核心元数据
*   **入口 ID**: `fn-rec`
*   **优先级**: P0
*   **设计核心**: 差异透明 (Discrepancy Visibility), 高效沟通 (Chat-Sync)

## 2. 用户故事 (User Story)
*   **故事**: 账如果不平，我要知道差在哪，能不能直接跟会计在系统里说清楚，别老发微信语音。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 健康度算法
```python
Diff_Count = Count(Unmatched_Items)
Health_Score = 100 - (Diff_Count * 5)
Status = Score >= 90 ? 'HEALTHY' : (Score >= 60 ? 'WARNING' : 'DANGER')
```

### 3.2 沟通上下文
*   **Context**: 聊天窗口顶部必须悬浮显示当前讨论的异常条目（金额、时间、摘要），防止“驴唇不对马嘴”。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 概览卡片
*   **分数**: 大字号展示健康度（e.g., 92%）。
*   **颜色**: 
    *   Healthy: `bg-emerald-600`
    *   Warning: `bg-orange-500`
    *   Danger: `bg-rose-600`

### 4.2 差异列表
*   紧急差异（如大额未解释支出）加红色 `URGENT` 标签。
*   每行提供“处理”按钮，点击进入详情/沟通页。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 发送消息后，消息列表应实时更新。
*   **Then** 当所有差异都标记为已处理，健康度应恢复为 100%。

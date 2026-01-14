# 业务需求: 合同管理 (Contract)

## 1. 核心元数据
*   **入口 ID**: `hr-6`
*   **优先级**: P2
*   **设计核心**: 法律风控 (Legal Risk Control), 期限感知 (Deadline Awareness)

## 2. 用户故事 (User Story)
*   **故事**: 防止合同到期忘记续签产生赔偿风险，我需要提前 30 天收到提醒。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 倒计时算法
```python
Days_Left = DateDiff(Contract_End_Date, Today)
Status = 
  Days_Left < 0 ? 'EXPIRED' :
  Days_Left <= 30 ? 'EXPIRING_SOON' :
  'NORMAL'
```

### 3.2 预警触发
*   当 `Status == EXPIRING_SOON` 时，Dashboard 或 Inbox 应有红点提示。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 列表状态条
*   在卡片左边缘设置 4px 宽的彩色状态条：
    *   橙色: 即将到期。
    *   红色: 已过期。
    *   蓝色: 正常。
*   **倒计时 Badge**: 右侧显著位置显示“剩余 XX 天”。

### 4.2 续签操作
*   详情页底部提供“发起续签”按钮，点击后触发工作流（通知 HR 准备文书）。

## 5. 验收标准 (Acceptance Criteria)

*   **Given** 合同还有 5 天到期
    *   **Then** 列表卡片应显示橙色状态条，并提示“剩余 5 天”。
*   **Then** 点击“不再续签”应弹出二次确认警示框。

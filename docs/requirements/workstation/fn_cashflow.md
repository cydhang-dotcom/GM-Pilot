# 业务需求: 资金流水 (Cash Flow)

## 1. 核心元数据
*   **入口 ID**: `fn-flow`
*   **优先级**: P1
*   **设计核心**: 流转透明 (Flow Visibility), 智能分类 (Smart Classification)

## 2. 用户故事 (User Story)
*   **故事**: 银行账上进出每一笔钱，我都要知道是干嘛的。如果有“待解释”的支出，我要能快速标记用途。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 自动匹配
```python
IF flow.amount == invoice.amount AND flow.counterparty similar_to invoice.seller:
    flow.match_status = 'MATCHED'
    flow.related_doc = invoice.id
ELSE:
    flow.match_status = 'UNMATCHED'
```

### 3.2 标签体系
*   收入: `主营业务`, `其他业务`, `投资收益`.
*   支出: `采购`, `报销`, `税费`, `房租`, `工资`.

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 收支符号
*   **收入**: 绿色 `+` 号，金额 `text-emerald-600`。
*   **支出**: 黑色 `-` 号，金额 `text-gray-900`。
*   **图标**: 左侧圆形图标容器，收(绿)/支(灰)区分。

### 4.2 待办高亮
*   状态为 `需解释` 或 `需确认` 的条目，左边缘显示橙色指示条，或背景微黄。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 每一笔流水必须有明确的收/支方向标识。
*   **When** 点击“补充用途”并选择标签
    *   **Then** 该条目的状态应立即变为“已分类”或“待财务确认”。

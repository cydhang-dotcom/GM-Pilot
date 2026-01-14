# 业务需求: 任务聚合与列表 (Task Grouping)

## 1. 核心元数据
*   **所属模块**: Inbox (02_Inbox.md)
*   **优先级**: P1
*   **设计核心**: 降噪 (Noise Reduction), 分类索引 (Categorized Index)

## 2. 用户故事 (User Story)
*   **故事**: 当有 10 个入职审批时，不要刷屏，请把它们合并成一个“入职任务包”，点进去再看详情。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 聚合判定
*   **触发阈值**: 同类型任务数量 `>= 2` 时触发聚合。
*   **分组键 (Group Key)**: `TaskType` (e.g., 'ONBOARDING', 'OA_APPROVAL').

### 3.2 摘要生成
```typescript
interface AggregateSummary {
  title: string; // "入职任务"
  count: number; // 3
  desc: string;  // "3 人待确认 · 材料核验" (动态生成)
  urgentCount: number; // 红点数
}
```

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 聚合卡片
*   **右侧指示**: 必须包含 `ChevronRight` 图标，暗示可进入二级页。
*   **Badge**: 若 `urgentCount > 0`，显示红底白字圆形角标。
*   **轴心对齐**: 卡片左侧图标中心对齐 20px 轴线。

### 4.2 二级列表页
*   **进入动效**: `Slide-in-Right` (从右侧滑入覆盖)。
*   **头部导航**: 包含“返回”按钮及聚合标题。

## 5. 验收标准 (Acceptance Criteria)

*   **Given** 3 个入职任务，2 个 OA 任务
    *   **Then** Inbox 列表中应只有 2 个卡片：一个“入职任务(3)”，一个“OA审批(2)”。
*   **When** 点击聚合卡片
    *   **Then** 应平滑进入二级详情列表。

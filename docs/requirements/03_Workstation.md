# 模块需求: 事务工作台 (Workstation)

## 1. 核心元数据 (Header & Meta)
*   **优先级**: P1 (Core)
*   **状态**: Approved
*   **设计核心**: 业务分类 (Categorized), 数据穿透 (Drill-down), 极简入口 (Minimal Entry)

## 2. 用户故事 (User Stories)

### US1: 业务快速定位 (Fast Navigation)
*   **场景**: 总经理需要查找某个不常用的功能（如“下载凭证”）。
*   **故事**: 我需要一个逻辑清晰、分类明确的图标阵列，或者通过搜索关键词直接找到入口。

### US2: 待办红点透视 (Badge Visibility)
*   **场景**: 即使不进 Inbox，我也想在工作台看到哪些模块有积压事项。
*   **故事**: 业务图标右上角应直接显示待办数量（如“4待办”），引导我点击处理。

## 3. 详细业务逻辑 (Business Logic & Algorithms)

### 3.1 数据结构
```typescript
interface ServiceGroup {
  title: string; // e.g., '财务运营'
  themeColor: 'emerald' | 'blue' | 'purple';
  items: ServiceItem[];
}

interface ServiceItem {
  id: string; // e.g., 'fn-rec'
  label: string;
  icon: string;
  route: string;
  badgeSource?: string; // 关联的 API 字段，用于获取红点数
}
```

### 3.2 核心算法
*   **角标聚合 (Badge Aggregation)**:
    ```python
    FUNCTION GetBadge(itemId):
      SWITCH itemId:
        CASE 'fn-rec': RETURN Count(Unresolved_Discrepancies)
        CASE 'hr-emp': RETURN Count(Probation_Staff)
        CASE 'hr-contract': RETURN Count(Expiring_Contracts_30Days)
        DEFAULT: RETURN 0
    ```
*   **搜索匹配 (Fuzzy Search)**:
    ```python
    Input: query (string)
    Result = ServiceGroups.flatMap(g => g.items)
              .filter(item => item.label.contains(query) OR item.pinyin.contains(query))
    ```

## 4. UI/UX 交互与视觉规范 (UI/UX Specifications)

### 4.1 四宫格布局标准
*   **Grid 系统**: `grid-cols-4` (一行四个)。
*   **图标容器**: 
    *   尺寸: `w-14 h-14` (56px)。
    *   圆角: `rounded-2xl` (16px)。
    *   状态: 默认 `bg-[theme]-50`，点击态 `scale-95`。
*   **文字排版**:
    *   `text-xs` (12px)，`font-medium`。
    *   行高 `leading-tight`，距图标 `mt-2`。

### 4.2 视觉对齐
*   **对齐轴**: 同一行图标的中心点必须水平对齐。
*   **Badge 位置**: 绝对定位 `top: -8px`, `right: -16px`，确保不遮挡图标主体。

## 5. 异常与边界处理 (Edge Cases)

*   **搜索无结果**: 显示空状态插画及“换个关键词试试”。
*   **长文本标签**: 超过 4 个字的标签，缩小字号至 `text-[10px]` 或换行，禁止截断。

## 6. 验收标准 (Acceptance Criteria)

*   **Given** 财务对账模块有 4 个未处理差异
    *   **Then** “对账”图标右上角应显示红底白字的“4待办”角标。
*   **Given** 搜索框输入 "shui"
    *   **Then** 应过滤出“税款”相关的入口。

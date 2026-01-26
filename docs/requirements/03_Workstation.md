
# 模块需求: 事务工作台 (Workstation)

> **优先级**: P1
> **设计核心**: 业务分类 (Categorized)、数据穿透 (Drill-down)、极简入口 (Minimal Entry)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 业务快速定位 (Fast Navigation)
*   **故事**: 我需要一个逻辑清晰的业务分类入口，能快速找到对应的事务处理。
*   **数据业务逻辑**:
    *   **实时角标 (Badge Logic)**: `Badge_Value = count(Pending_Tasks_by_BusinessID)`。
    *   **搜索算法**: 支持对 `ServiceItem.label` 进行模糊匹配。

## 2. 界面行为规范 (UI Behaviors)

*   **四宫格布局标准**: 
    *   图标容器统一采用 `w-14 h-14` 圆角矩形。
    *   文字标签下方必须保留至少 12px 的呼吸空间。
*   **视觉对齐**: 图标中心的水平对齐线必须贯穿同排的所有图标。

## 3. 验收标准 (Acceptance Criteria)

- [x] 搜索框在输入 1 个字符后必须触发过滤。
- [x] 所有业务图标必须带有对应的 Badge 计数（若有待办）。
- [x] 业务分类标题左侧必须有对应的品牌色装饰块。

## 4. API 接口 (API Interfaces)

### 4.1 获取工作台菜单及角标 (Menu & Badges)
*   **Endpoint**: `GET /api/workstation/menu`
*   **输入参数 (Request)**:
    *   无 (None)
*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `groups` | 菜单分组 | Array<Object> | 财务/人事/服务 |
| `groups[].items` | 菜单项 | Array<Object> | - |
| `groups[].items[].badge_count` | 待办数 | Integer | 0 则不显示 |
| `groups[].items[].badge_color` | 角标颜色 | String | Hex Code |

### 4.2 全局搜索 (Global Search)
*   **Endpoint**: `GET /api/workstation/search`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `keyword` | 关键词 | String | Required, Min 1 char | - |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `results` | 结果列表 | Array<Object> | - |
| `results[].type` | 结果类型 | Enum | 'FUNCTION', 'TASK', 'EMPLOYEE' | - |
| `results[].link` | 跳转链接 | String | - |

# 业务需求: 常用业务菜单 (Menu Groups)

## 1. 核心元数据
*   **所属模块**: Company (04_Company.md)
*   **优先级**: P1
*   **设计核心**: 信息层级 (Hierarchy), 资料中心 (Doc Hub)

## 2. 用户故事 (User Story)
*   **故事**: 把开票信息、印章管理、收件地址这些乱七八糟的资料整理好，让我好找。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 菜单结构
```typescript
Groups = [
  { 
    title: '常用业务资料', 
    items: ['InvInfo', 'Address'] 
  },
  { 
    title: '权益与资产', 
    items: ['Seals', 'Certificates', 'Contracts'] 
  },
  { 
    title: '企业管理', 
    items: ['Permissions', 'Logs'] 
  }
]
```

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 列表项
*   **高度**: `h-14` (56px) 或自适应。
*   **图标**: 左侧彩色背景方圆图标 (`rounded-xl`)。
*   **右侧信息**: 可选显示状态值（如“3枚”、“有效期至...”）。

### 4.2 20px 轴心
*   图标中心对齐 20px 轴线。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 点击菜单项应滑出对应的详情 Overlay。
*   **Then** 菜单分组标题应清晰区分不同类别的入口。

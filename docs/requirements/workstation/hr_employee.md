# 业务需求: 员工管理 (Employee)

## 1. 核心元数据
*   **入口 ID**: `hr-emp`
*   **优先级**: P1
*   **设计核心**: 档案完整 (Integrity), 检索高效 (Efficiency)

## 2. 用户故事 (User Story)
*   **故事**: 我需要随时查找员工的入职时间、合同到期日，或者直接拨打电话。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 搜索算法
```python
FUNCTION Search(query):
  targets = ['name', 'department', 'role', 'phone']
  results = employees.filter(emp => 
    targets.some(key => emp[key].contains(query))
  )
  RETURN results
```

### 3.2 隐私脱敏
*   **身份证**: `idCard.replace(/^(.{6})(?:\d+)(.{4})$/, "$1********$2")`。
*   **手机号**: 视权限而定，通常 GM 权限可见明文，或点击后显示。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 列表项
*   **布局**: 左侧头像，中间[姓名/职位/部门]，右侧状态标签。
*   **状态标签**:
    *   正式: `bg-emerald-50 text-emerald-600`。
    *   试用: `bg-blue-50 text-blue-600`。
    *   离职: `bg-gray-100 text-gray-400`。

### 4.2 档案 Overlay
*   **头部**: 大头像居中，下方跟随快捷操作栏（呼叫、邮件、微信）。

## 5. 验收标准 (Acceptance Criteria)

*   **Given** 搜索框输入 "技术"
    *   **Then** 列表应只显示技术部的员工。
*   **Then** 详情页的身份证号中间 8 位必须显示为星号。

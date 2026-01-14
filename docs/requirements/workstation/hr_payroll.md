# 业务需求: 薪酬管理 (Payroll)

## 1. 核心元数据
*   **入口 ID**: `hr-1`
*   **优先级**: P1
*   **设计核心**: 成本透明 (Cost Transparency), 发放闭环 (Payment Loop)

## 2. 用户故事 (User Story)
*   **故事**: 发工资前，我要确认实发总额、公司承担的社保成本，并能导出 Excel 给财务存档。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 核心公式
```python
Gross_Pay = Base + Merit + Allowance + Overtime
Personal_Deduction = Social_Personal + Fund_Personal + Tax
Net_Pay = Gross_Pay - Personal_Deduction
Company_Cost = Gross_Pay + Social_Company + Fund_Company
```

### 3.2 发放状态机
*   `DRAFT` (草稿/计算中) -> `WAITING_CONFIRM` (待GM确认) -> `PROCESSING` (银行处理中) -> `PAID` (已发放).

### 3.3 导出逻辑
*   **文件名**: `Payroll_{YYYYMM}_{Timestamp}.xlsx`
*   **加密**: 既然涉及薪资，导出的 Excel 最好提示“文件已加密，密码为...”（视需求而定，App 端通常直接下载）。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 详情页布局
*   **顶部卡片**: 
    *   背景: `bg-gradient-to-br from-indigo-600 to-blue-700`。
    *   内容: 实发总额 (大字)，人数，余额充足性提示。
*   **列表对齐**:
    *   员工头像中心对齐 20px 轴线。
    *   金额列右对齐，使用 `font-mono`。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 实发总额必须等于列表所有员工 `Net_Pay` 之和。
*   **Then** 点击“确认发放”后，Inbox 中的对应任务应同步标记为完成。

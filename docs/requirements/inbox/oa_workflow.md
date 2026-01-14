# 业务需求: OA 审批工作流 (OA Workflow)

## 1. 核心元数据
*   **所属模块**: Inbox (02_Inbox.md)
*   **优先级**: P1
*   **设计核心**: 极简审批 (Minimalist Approval), 上下文感知 (Context Aware)

## 2. 用户故事 (User Story)
*   **故事**: 员工请假或报销，我需要在手机上快速看一眼事由和金额，直接点“同意”或“驳回”。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 审批动作
*   **API**: `POST /api/oa/approve`
    *   Params: `{ taskId: string, action: 'APPROVE' | 'REJECT', comment?: string }`
*   **乐观更新 (Optimistic UI)**:
    *   点击按钮后，立即从列表中移除该任务（UI 层面）。
    *   若 API 失败，Toast 提示并回滚（恢复任务显示）。

### 3.2 字段映射
*   显示核心字段：`Applicant` (申请人), `Type` (类型: 年假/报销), `Amount/Duration` (数值), `Reason` (事由)。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 列表卡片
*   **头像**: 显示申请人头像或首字，圆角 `rounded-full`。
*   **操作区**: 卡片右侧直接提供“审批”按钮（进入详情）或快捷操作。

### 4.2 详情 Overlay
*   **底部固定栏**: 
    *   左侧“驳回” (白底红字/灰字)。
    *   右侧“同意” (蓝底白字，权重更高)。
    *   使用 `pb-safe` 适配全面屏底部。

## 5. 验收标准 (Acceptance Criteria)

*   **When** 点击“同意”按钮
    *   **Then** 按钮应立即进入 Loading 态，随后页面自动返回或切换至下一条。
*   **Then** 详情页必须完整展示申请理由，不可截断。

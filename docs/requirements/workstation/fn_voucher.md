# 业务需求: 凭证管理 (Voucher)

> **入口 ID**: `fn-3`  
> **优先级**: P2  
> **设计核心**: 审计穿透 (Audit Drill-down)、月结锁定 (Closing Lock)、拟物体验 (Skeuomorphic)

## 1. 业务流程：月结五步法 (Closing Process)

页面顶部固定展示关账进度条，严格映射 ERP 状态机：
1.  **智能做账 (Accounting)**: AI 自动归集原始单据。
2.  **人工复核 (Review)**: 代理会计完成分录校验。
3.  **纳税申报 (Tax)**: 完成本期税金确认。
4.  **月结验收 (Acceptance)**: **GM 操作点**，核对资产平衡。
5.  **归档锁定 (Locked)**: 生成不可篡改的账期版本。

## 2. 界面行为规范 (UI Behaviors)

### 2.1 凭证卡片拟物化
- **背景**: 使用 `#FFFFFF` 配合轻微投影。
- **分割线**: 凭证详情中段采用 **左右圆角切口 + 虚线** 设计，模拟纸质单据撕裂线。
- **分录表**: 表格背景使用 `slate-50`，Dr/Cr (借贷) 金额列使用 `font-mono`。

### 2.2 审计穿透 (Traceability)
- **附件关联**: 凭证卡片下方必须列出所有“原始单据”（发票、流水回单）。
- **影像预览**: 点击附件进入 **沉浸式黑色背景预览 (V5)**。

## 3. 验收标准 (Acceptance Criteria)

- [x] 关账进度条必须实时高亮当前业务节点。
- [x] 凭证金额大字展示，且分录平衡（借=贷）。
- [x] 已归档账期必须显示“数据已归档”且锁定所有编辑入口。
- [x] “开始验收锁版”按钮仅在 `ACCEPTANCE` 阶段出现。

## 4. API 接口

| 接口描述 | Endpoint |
| :--- | :--- |
| 获取账期关账进度 | `/api/finance/accounting/period/{month}` |
| 提交月结验收指令 | `/api/finance/accounting/period/{month}/lock` |
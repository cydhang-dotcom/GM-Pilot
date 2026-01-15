# 模块需求: 我的企业 (Company)

> **优先级**: P1
> **设计核心**: 资产安全 (Asset Security)、隐私默认 (Privacy by Default)、资料管家 (Document Steward)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 隐私心脏 (Privacy Heart)
*   **故事**: 我需要在公共场合查看对公余额，但绝对不希望旁边的人窥探。
*   **数据业务逻辑**:
    *   **状态维护**: `Global_Privacy_State` 默认值为 `TRUE`。页面 `onMount` 时强制重置。

### US2: 资料管家 (One-tap Assets)
*   **故事**: 我需要能一键复制完整的开票资料。
*   **数据业务逻辑**:
    *   **复制模板**: 聚合 [抬头 + 税号 + 开户行 + 账号]。

## 2. 界面行为规范 (UI Behaviors)

*   **拟态银行卡 (Skeuomorphic)**: 余额打码采用 `backdrop-filter: blur(12px)`。
*   **Overlay 架构**: 所有三级页面必须使用 `DetailLayout` 组件，以全屏 Overlay 形式 Slide-up 进入。

## 3. 验收标准 (Acceptance Criteria)

- [x] 余额在页面加载后 100% 处于模糊状态。
- [x] 点击“复制全部”按钮后，剪贴板内容必须包含换行符分隔的四项核心资料。
- [x] 电子印章列表必须显示当前“正常”或“异常”的状态标签。
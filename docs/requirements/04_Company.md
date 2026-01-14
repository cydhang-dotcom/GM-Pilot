# 模块需求: 我的企业 (Company)

## 1. 核心元数据 (Header & Meta)
*   **优先级**: P1 (Core)
*   **状态**: Approved
*   **设计核心**: 资产安全 (Asset Security), 隐私默认 (Privacy by Default), 资料管家 (Document Steward)

## 2. 用户故事 (User Stories)

### US1: 隐私心脏 (Privacy Heart)
*   **场景**: 在公共咖啡馆或多人会议室打开 App。
*   **故事**: 对公账户余额必须默认打码，防止商业机密被旁人窥探，只有我确认环境安全后点击才能查看。

### US2: 资料管家 (One-tap Assets)
*   **场景**: 合作伙伴索要开票信息或银行账号。
*   **故事**: 我需要能一键复制完整的[抬头+税号+开户行+账号]文本块，而不是一个个字段去复制。

## 3. 详细业务逻辑 (Business Logic & Algorithms)

### 3.1 数据结构
```typescript
interface CompanyAsset {
  bankAccounts: {
    bankName: string;
    accountNo: string; // Masked: 6227 **** **** 8888
    balance: number; // Sensitive
    currency: 'CNY' | 'USD';
  }[];
  
  identity: {
    name: string;
    taxId: string;
    address: string;
    phone: string;
  };
}
```

### 3.2 隐私状态机 (Privacy State Machine)
*   **State: Protected (Default)**
    *   **Trigger**: App Launch / Tab Change / Background Resume.
    *   **UI**: 余额显示为 `••••••` 或 `blur(12px)`，复制按钮禁用或仅复制脱敏信息。
*   **State: Revealed**
    *   **Trigger**: User clicks "Eye" icon.
    *   **UI**: 余额显示真实数值，维持 60秒后自动回退至 Protected 状态 (可选)。

### 3.3 复制逻辑
*   **一键复制算法**:
    ```javascript
    ClipboardText = `
    名称：${data.name}
    税号：${data.taxId}
    地址：${data.address}
    电话：${data.phone}
    开户行：${data.bankName}
    账号：${data.accountNo}
    `.trim();
    ```

## 4. UI/UX 交互与视觉规范 (UI/UX Specifications)

### 4.1 拟态银行卡 (Skeuomorphic)
*   **背景**: 品牌色渐变 (e.g., `from-indigo-900 to-blue-800`)。
*   **磨砂玻璃**: 余额区域使用 `backdrop-filter: blur(10px)` 配合 `bg-white/10`。
*   **阴影**: `shadow-[0_8px_30px_rgba(0,0,0,0.12)]`，制造悬浮感。

### 4.2 Overlay 架构
*   **层级**: 所有三级页面（开票信息、印章管理）必须使用 `DetailLayout` 组件。
*   **进入动效**: `Slide-up` (从底部升起) 或 `Slide-in-Right` (从右侧滑入)。

## 5. 异常与边界处理 (Edge Cases)

*   **数据加载失败**: 若银行接口超时，余额区域显示 “--”，并提供重试按钮，不可显示 0.00。
*   **多账户**: 若企业有多个对公账户，卡片区支持横向 Swiper 滑动切换。

## 6. 验收标准 (Acceptance Criteria)

*   **Given** 刚打开 App 进入 Company 页面
    *   **Then** 对公余额必须处于模糊/隐藏状态。
*   **Given** 点击“开票信息”中的“复制全部”
    *   **Then** 剪贴板中应包含格式化好的完整开票资料，且无乱码。

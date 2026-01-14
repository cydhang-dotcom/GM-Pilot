# 业务需求: 企业数字名片 (Identity)

## 1. 核心元数据
*   **所属模块**: Company (04_Company.md)
*   **优先级**: P1
*   **设计核心**: 品牌识别 (Branding), 快速传递 (Swift Sharing)

## 2. 用户故事 (User Story)
*   **故事**: 别人问我公司税号和开票地址，我要能一秒钟复制给他。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 复制格式
```javascript
Template = `
公司名称：${Name}
税号：${TaxID}
单位地址：${Address}
电话号码：${Phone}
开户银行：${Bank}
银行账号：${Account}
`
```

### 3.2 状态维护
*   从工商接口同步“经营状态”（存续/异常）和“核准日期”。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 名片卡样式
*   **高度**: 固定 `200px`。
*   **背景**: 品牌色渐变，右上角可叠加 Logo 水印。
*   **Logo**: 左上角显示企业 Logo。
*   **20px 轴心**: 关键信息左对齐于 20px 轴线（相对卡片内部）。

## 5. 验收标准 (Acceptance Criteria)

*   **When** 点击“复制全部信息”
    *   **Then** 剪贴板内容应包含完整的开票所需 6 要素。
*   **Then** 税号显示应支持脱敏（默认）和明文切换。

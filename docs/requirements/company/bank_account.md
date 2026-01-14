# 业务需求: 对公账户卡片 (Bank Account)

## 1. 核心元数据
*   **所属模块**: Company (04_Company.md)
*   **优先级**: P0
*   **设计核心**: 资产安全 (Security), 拟态交互 (Skeuomorphic)

## 2. 用户故事 (User Story)
*   **故事**: 查看余额时必须默认打码，只有我点开小眼睛才能看，看完得自动或者手动关上。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 隐私逻辑
*   **Default**: `Masked` (e.g., `¥ ****`).
*   **Toggle**: Click `Eye Icon` -> `Visible`.
*   **Reset**: Leave Page -> `Masked`.

### 3.2 数据刷新
*   进入页面时静默刷新余额 (`Silent Refresh`)，若失败显示缓存值并提示“更新失败”。

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 模糊效果
*   使用 CSS `filter: blur(8px)` 或替换为 `••••` 字符。
*   切换时要有 `transition-opacity` 渐变动效。

### 4.2 卡片布局
*   左上角：银行 Logo + 名称。
*   中间：大字号余额。
*   底部：账号（脱敏） + 复制图标。

## 5. 验收标准 (Acceptance Criteria)

*   **Given** 离开 Company 页面再回来
    *   **Then** 余额应恢复为隐藏状态。
*   **Then** 账号应只显示后 4 位。

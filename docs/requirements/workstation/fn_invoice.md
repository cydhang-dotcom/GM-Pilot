
# 业务需求: 发票管理 (Invoice)

> **入口 ID**: `fn-4`
> **优先级**: P1
> **设计核心**: 进销一体 (Unified In/Out)、状态实时 (Real-time Status)、拟物预览 (Skeuomorphic)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 进项票据采集 (Invoice Collection)
*   **故事**: 我收到一张纸质发票，需要立即通过扫码上传并让系统自动识别金额和税号。
*   **数据业务逻辑**:
    *   **识别流程**: `Image_Upload -> OCR_API -> Metadata_Extraction -> Compliance_Check`。
    *   **合规规则**: 校验 `Tax_ID` 是否与当前企业匹配，校验 `Total_Amount` 是否与发票章区域重合。

### US2: 销项开票催办 (Speed up Issuance)
*   **故事**: 我发起的开票申请已提交 3 天还没动静，我需要一键催促会计尽快开具并推送给客户。
*   **数据业务逻辑**:
    *   **触发器**: 状态为 `Pending_Issue` 且持续时长 > 48h，开启“催办”按钮。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐**: 
    *   发票状态胶囊（Capsule）的右边缘必须对齐卡片内容的右边界。
*   **拟物设计**: 
    *   发票详情 Overlay 顶部必须包含模拟发票边缘的彩色波纹或锯齿装饰。

## 3. 验收标准 (Acceptance Criteria)

- [x] 进项发票与销项申请必须在一个统一的时间轴列表中展示。
- [x] OCR 识别后的字段必须支持手动修正。
- [x] 状态为“处理中”的项目必须具备蓝色呼吸动效（Pulse Animation）。
- [x] 详情页必须展示该票据的完整流转历史（采集 -> 验真 -> 归档）。

## 4. API 接口 (API Interfaces)

### 4.1 提交开票申请 (Issue Request)
*   **Endpoint**: `POST /api/finance/invoices/issue-request`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `customer_name`| 客户名称 | String | Required | - |
| `amount` | 开票金额 | Decimal | Required, > 0 | - |
| `type` | 发票类型 | Enum | 'SPECIAL', 'NORMAL' (专/普) | - |
| `content` | 开票内容 | String | Required | 如 '技术服务费' |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `request_id` | 申请单ID | String | - |
| `status` | 初始状态 | String | 'PENDING' |

### 4.2 OCR 发票识别 (Scan Invoice)
*   **Endpoint**: `POST /api/finance/invoices/scan`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `image_file` | 发票影像 | Blob/File | Required, Max 5MB | JPG/PNG/PDF |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `code` | 发票代码 | String | 识别结果 |
| `number` | 发票号码 | String | 识别结果 |
| `amount` | 金额 | Decimal | 识别结果 |
| `date` | 开票日期 | String | YYYY-MM-DD |

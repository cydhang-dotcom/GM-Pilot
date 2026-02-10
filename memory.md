
# GM Pilot Project Memory

核心决策与文档标准备忘录：统一项目的写作规范、文档结构与质量门槛，确保跨角色协作可追溯、可度量、可复用。

## 0. 如何使用 (How To Use)
- 新建或更新任何文档前，先选对“文档类型”，并按“最佳内容要求”组织章节。
- 首段添加元信息头（Title、Owner、Version、Status、Last-Updated、Links）。
- 每次代码或需求变更，必须同步更新对应文档，并在“变更记录/Changelog”中记一行。

## 1. 文档体系与职责 (Documentation Index)

顶层职责划分：
- README.md：项目门户与快速开始。
- memory.md（本文件）：文档类型标准、质量门槛、模板与链接策略。
- docs/PRD.md：主 PRD，包含愿景、优先级矩阵与子模块索引。
- docs/DesignStandards.md：设计系统与交互标准。
- docs/FeatureList.md：功能与验收状态清单。
- docs/BusinessMapping.md：模块-文档-代码-接口-数据的映射索引。
- docs/requirements/**：每个业务模块的规范与验收标准。
- OpenAPI/接口规范：集中于 `docs/requirements/finance_api_list.md` 或 `openapi.yaml`。

## 2. 通用写作原则 (General Writing)
- 一页一责：每个文档只解决一个清晰问题，避免“大杂烩”。
- 结构先行：使用稳定的 H2/H3 标题骨架；先列目录后填充。
- 可度量：目标、SLO、验收标准均量化到可复核的条目。
- 可追溯：每个关键断言附来源或链接（PRD/接口/代码路径）。
- 元信息头：Title / Owner / Version / Status / Last-Updated / Related-Links。
- 术语一致：统一术语表（可在 PRD 或专门 Glossary 维护）。
- 面向读者：写给 GM/设计/工程/运营的不同视角，尽量“先结论，后细节”。
- 图可复现：截图需标注数据来源与生成步骤；流程图推荐 mermaid。

## 3. 文档类型与最佳内容要求 (Per-Doc Best Practices)

以下每种文档给出“必须章节 + 可选章节”。如无特别说明，均需在首段包含元信息头。

### 3.1 README.md（项目门户）
- 必须：一句话电梯介绍、在线预览/演示、快速开始（安装/运行/构建）、目录结构、技术栈、环境变量、常用脚本、故障排查。
- 可选：贡献指南、代码规范链接、安全说明、许可证、联系渠道/看板链接。

### 3.2 主 PRD（docs/PRD.md）
- 必须：愿景与目标、设计原则、优先级矩阵、范围内/外、用户画像与旅程、里程碑与发布计划、风险与依赖、指标/KPI、详细需求索引。
- 可选：成功判定标准、商业假设与验证计划、A/B 策略、数据口径说明。

### 3.3 业务需求规格（docs/requirements/<module>.md）
- Header：模块名、优先级(P0/1/2)、设计核心（3 个关键词）、Owner、状态、入口路径、相关 API。
- 用户故事与用例：主要场景、前置条件、成功路径、失败路径、边界条件。
- 数据与状态：数据结构、状态机、口径与聚合、触发器与定时任务、权限矩阵。
- UI/UX 行为：信息架构、关键交互、动效、空状态/错误状态、无障碍/可访问性。
- 性能与稳定性：SLO（渲染/交互/接口时延）、加载策略、缓存/离线、降级与重试。
- 验收标准：勾选式条目，覆盖正反/边界/隐私/安全/权限。
- 埋点与可观测：事件、属性、来源页面、验收查询方式。

### 3.4 设计规范（docs/DesignStandards.md）
- 布局与栅格、色彩语义、字体与排版、组件库、动效、可访问性、文案风格、国际化规范、示例与代码片段。

### 3.5 功能清单（docs/FeatureList.md）
- 字段：ID、名称、模块、优先级、状态（Planned/Doing/Done）、需求链接、负责人、里程碑、验收人/日期、上线版本。

### 3.6 业务映射（docs/BusinessMapping.md）
- 映射字段：模块、需求文档、前端路由/组件路径、接口（方法/URL）、后端服务/表、数据字典/指标口径、测试用例。

### 3.7 API 契约（OpenAPI 或 Markdown）
- 总则：Base URL、鉴权方式、权限模型、速率限制、错误码规范、幂等策略、版本策略，且遵循 RESTful 资源风格（资源化 URL、HTTP 动词、无动作动词）。
- 逐接口：方法、路径、请求参数/体、响应体、状态码、示例（请求/响应）、字段约束、去标识化与脱敏、重试与超时、缓存与分页。
- 产物：OpenAPI 文件链接、Mock 方式、契约测试入口。

### 3.8 ADR 架构决策记录（Architecture Decision Record）
- 背景与上下文、问题陈述、决策（结论一句话）、选项与权衡、影响（正负面）、迁移/回滚计划、后续行动与 Owner。

### 3.9 RFC 提案（Request For Comments）
- 摘要与动机、方案细节、兼容性/迁移、性能/安全/隐私影响、替代方案、未决问题、评审记录与结论。

### 3.10 Runbook / SOP（运行手册/标准作业）
- 场景与适用范围、前置条件、分步操作（含命令/截图/回显期望）、验证步骤、回退方案、常见故障排查。

### 3.11 Incident Report（事故复盘）
- 事件摘要、影响范围、时间线（检测—缓解—恢复）、根因（技术/流程/组织）、修复措施、预防改进、行动项（Owner/DDL）。

### 3.12 Test Plan / Test Cases（测试计划与用例）
- 范围与目标、测试类型（单元/集成/E2E/回归/性能/安全）、环境与数据、用例表（ID/步骤/期望/实际）、自动化覆盖、准入/退出标准、缺陷归档链接。

### 3.13 Release Notes / Changelog（发布说明/变更日志）
- 版本号、日期、类型（新增/优化/修复/破坏性变更）、迁移指南、已知问题、回滚提示、相关 PR/Issue 链接。

### 3.14 Onboarding（角色入门指南）
- 角色与目标、设备与账号准备、环境搭建、常用命令与脚本、关键文档清单、30/60/90 天目标。

### 3.15 Data Spec / Dictionary（数据规范/字典）
- 实体与字段（名称/类型/约束/含义）、来源与去向（血缘）、统计口径、时间窗与刷新频率、隐私分级与脱敏规则、口径变更记录。

### 3.16 Dashboard Spec（指标与看板）
- 业务问题、指标定义（公式/口径/单位/取值范围）、维度与切片、刷新频率、空值与异常处理、示例截图、验收查询语句或接口。

### 3.17 Security & Privacy（安全与隐私）
- 数据分类与分级、权限矩阵、PII 处理与脱敏、传输与存储加密、密钥管理、审计与留痕、合规（如 GDPR/本地法规）、安全应急流程。

### 3.18 Localization / i18n（本地化）
- 语言范围、文案占位与格式化、RTL 支持、日期/货币/数值本地化规则、长度与截断策略、翻译工作流与验收。

### 3.19 Analytics Tracking Plan（埋点计划）
- 事件名、触发条件、事件属性、用户属性、埋点位置、验收查询方式、隐私合规（采集最小化/可删除）。

## 4. 模板速用区（可复制粘贴）

### PRD 模板
---
Title: <项目/版本>
Owner: <负责人>
Version: vX.Y.Z
Status: Draft/Review/Approved
Last-Updated: YYYY-MM-DD
Related: <需求索引/Design/Mapping>

1. 愿景与目标
2. 设计原则
3. 优先级矩阵
4. 范围内/范围外
5. 用户画像与旅程
6. 里程碑与发布计划
7. 指标/KPI 与成功标准
8. 风险与依赖
9. 详细需求索引
10. 变更记录

### 业务需求规格模板（Module Spec）
---
Title: <模块名>
Priority: P0/P1/P2
DesignCore: <3 个关键词>
Owner: <负责人>
Status: Draft/Ready/In Dev/Done
Entry: <App 路径/路由>
APIs: <接口清单>
Last-Updated: YYYY-MM-DD

1. 用户故事与用例
2. 数据与状态（结构/状态机/口径/权限）
3. UI/UX 行为（信息架构/动效/空态/错误）
4. 性能与稳定性（SLO/缓存/降级/重试）
5. 验收标准（可勾选）
6. 埋点与监控
7. 风险与依赖
8. 变更记录

### API 契约模板（单接口）
---
Resource: <名称>  Method: GET|POST|...
Path: /v1/...  Auth: <方式>
Rate Limit: <速率>
Idempotency: <策略>

Request
- Query: key(type, required, rule)
- Body: schema 引用或内联字段

Response
- 200: schema + 示例
- 4xx/5xx: 统一错误结构（code/message/details）

Notes
- 字段约束/敏感信息处理/缓存分页/重试超时

### ADR 模板
---
Context
Decision
Options & Trade-offs
Consequences
Migration/Rollback Plan
Follow-ups & Owners

### Incident 模板
---
Summary
Impact
Timeline
Root Cause
Fix & Mitigation
Prevention Actions (Owner/DDL)

### Runbook/SOP 模板
---
Scope
Prerequisites
Steps
Verification
Rollback
Troubleshooting

### Test Case 模板
---
ID
Preconditions
Steps
Expected Result
Actual Result
Notes/Links

### Changelog 片段
---
## vX.Y.Z - YYYY-MM-DD
- Added: ...
- Changed: ...
- Fixed: ...
- Breaking: ... (含迁移指南链接)

## 5. 命名与目录规范 (Naming & Layout)
- 文件命名：中文可读 + 英文后缀或纯英文 kebab_case，示例：`hr_employee.md`、`cash_flow_trend.md`。
- 目录组织：`docs/requirements/<domain>/<topic>.md`，避免单目录过载；按业务域聚类（dashboard/inbox/workstation/company）。
- 链接标签：显示“文件名”而非描述性长句，保证映射一致性。

## 6. 质量门槛清单（PR 前自检）
- 包含元信息头并更新 Last-Updated。
- 章节齐全且满足对应“最佳内容要求”。
- 验收标准可被逐条验证（包含边界/异常/权限/隐私）。
- 所有断言附来源链接（PRD/API/代码路径/数据口径）。
- 涉及 UI 的文档有示意（图/录屏/原型链接）。
- 涉及数据的文档有口径与刷新频率；埋点有查询验收方式。
- 变更已记录在文档或项目 Changelog 中，并更新 BusinessMapping。

## 7. 链接策略（Traceability）
- 需求 ↔ 代码：文档中附前端路由/组件路径与后端服务/接口；代码注释或 README 指回文档。
- 需求 ↔ 数据：指标/报表指向数据字典/SQL/接口；标注口径与刷新频率。
- 需求 ↔ 测试：每个验收条目链接到对应测试用例或 E2E 脚本。

## 8. 架构与交互原则（摘要）
- 三级导航：App Shell → 业务看板 → 全屏覆盖层。
- 页面拆分：查询与录入/编辑分离为独立页面与文档。
- 布局约束：`max-w-md mx-auto`，拇指操作区优化，20px 轴心对齐。
- 隐私默认：敏感数据（余额/薪资）默认模糊，权限最小化。

## 9. 关键组件提示
- 智能诊断（SmartDiagnosisChat）：打字机 40ms/char，容器高度锁定，避免抖动。
- 统一列表：`h-1.5` 进度条；图标/色点与 20px 轴心对齐。

—— 本文件为强约束标准。新增文档类型或结构变更，请先提交 ADR 与 RFC。 

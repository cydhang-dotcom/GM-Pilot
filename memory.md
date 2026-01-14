# GM Pilot Project Memory

> **核心决策备忘录**: 记录关键技术选型、架构决策、文档标准以及强制性的开发规范。

## 1. 文档体系架构与作用索引 (Documentation Index)

为了确保项目长期可维护性，所有 `.md` 文件承载特定的管理职责，分工如下：

### 1.1 顶层管理文档 (Root Level)
| 文件名 | 职责 / 作用 |
| :--- | :--- |
| **README.md** | **项目门户**：包含项目简介、在线预览链接、快速启动指南及目录结构说明。 |
| **memory.md** | **开发备忘录 (本文件)**：记录核心技术选型、架构决策、文档标准以及强制性的开发规范。 |

### 1.2 核心标准与状态 (Docs Root)
| 文件名 | 职责 / 作用 |
| :--- | :--- |
| **docs/PRD.md** | **主需求文档**：定义项目愿景、优先级矩阵及所有子模块需求的总体索引。 |
| **docs/DesignStandards.md** | **设计规范**：像素级 UI 准则、隐私脱敏逻辑、AI 交互动效标准。 |
| **docs/FeatureList.md** | **功能清单**：记录所有功能的开发与验收状态。 |
| **docs/BusinessMapping.md** | **业务映射索引**：维护 [模块 - 需求文件 - 业务代码 - 业务描述] 的对应关系。 |

### 1.3 业务需求规格撰写标准 (Requirements Content Standards)
**所有业务需求子文档 (如 `docs/requirements/*.md`) 必须严格遵循以下“六段式”深度结构，拒绝任何模糊描述。我们要求文档即代码的伪代码实现。**

#### 1. 核心元数据 (Header & Meta)
*   **优先级**: P0 (Blocker) / P1 (Core) / P2 (Nice to have).
*   **状态**: Draft / Review / Approved.
*   **设计核心**: 3 个关键词定义模块灵魂 (e.g., 隐私默认, 决策闭环, 20px轴心)。

#### 2. 用户故事 (User Stories)
*   **标准格式**: “作为[角色]，我希望[功能]，以便于[价值]”。
*   **场景描述**: 必须补充具体的业务场景（Context），例如“在电梯弱网环境下查看报表”。

#### 3. 详细业务逻辑 (Business Logic & Algorithms) - 核心重中之重
*   **数据结构与字段映射**:
    *   定义核心数据模型 (Interface)，列出关键字段及其类型。
    *   *示例*: `Interface Transaction { id: string, amount: decimal(18,2), ... }`
*   **计算逻辑与公式**:
    *   所有衍生指标必须提供精确的数学公式或伪代码。
    *   *示例*: `Net_Profit = Revenue (科目6001) - Cost (科目6401) - Tax (科目6801)`。
*   **状态机 (State Machine)**:
    *   绘制或描述完整的状态流转图。
    *   明确每个状态转换的 **Trigger** (动作)、**Condition** (前置校验) 和 **Side Effect** (副作用/后续动作)。
    *   *示例*: `Pending` -> (Action: Verify) -> `Verified` -> (Side Effect: Send Notify)。

#### 4. UI/UX 交互与视觉规范 (UI/UX Specifications)
*   **布局与排版**:
    *   容器结构、Padding/Margin 数值、Flex/Grid 布局策略。
    *   **20px 轴心锁定**: 明确哪些视觉元素（图标、文字左缘）需要对齐全局 20px 轴线。
*   **视觉样式**:
    *   颜色语义 (Tailwind Class): 明确成功、失败、警告、信息的具体色值。
    *   字体规范: 金额/日期强制使用 `font-mono`，正文使用 `font-sans`。
*   **交互动效**:
    *   定义组件的进入/退出动画 (Entry/Exit Transition)。
    *   定义点击反馈 (Active State) 和加载状态 (Skeleton)。

#### 5. 异常与边界处理 (Edge Cases & Error Handling)
*   **空状态 (Empty State)**: 无数据时的插画与引导文案。
*   **异常状态**: 网络失败、权限不足、数据校验错误的 UI 表现。
*   **极端数据**: 超长文本截断策略、极大金额显示策略。

#### 6. 验收标准 (Acceptance Criteria - AC)
*   **Gherkin 风格**: Given (前置条件) -> When (操作) -> Then (预期结果)。
*   覆盖正常路径、异常路径及视觉还原度。

## 2. 核心架构与交互原则 (Architecture)
- **三级导航架构**: App Shell -> 业务看板 -> 全屏覆盖层 (Overlay)。
- **布局约束**: 全局容器限制 `max-w-md mx-auto`，拇指操作区优化。

## 3. 开发习惯与工程化规范 (Engineering Standards)
- **需求变更全量同步 (Requirement Change Sync)**: 
  - **强制要求**: 任何代码 (.tsx) 的变动或需求变更，必须同步更新对应的所有 .md 文档。
  - 严禁出现“代码已改但文档未更”的情况，文档即代码的灵魂。
- **隐私保护 (Privacy by Default)**: 敏感数据（余额/薪资）默认高斯模糊。
- **UI 轴心锁定**: Marker 中心点严格锁定在左侧 **20px** 垂直轴线上。
- **版本号维护**: 每次部署需递增 `pages/Company.tsx` 底部版本号。

## 4. 关键组件逻辑 (Core Components)
### AI 智能诊断 (SmartDiagnosisChat)
- **打字机动效**: 40ms/char。
- **高度锁定**: 固定容器高度防止抖动。
- **轻量展开**: 文末闪烁省略号 `...` 触发。

### 结构化列表 (Unified Lists)
- **线性进度条**: 统一采用 `h-1.5` 圆角进度条。
- **视觉对齐**: 列表图标/色点与 20px 轴心重合。
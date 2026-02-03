
# GM Pilot Project Memory

> **核心决策备忘录**: 记录关键技术选型、核心组件逻辑及文档体系索引。

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
| **docs/requirements/finance_api_list.md** | **API 契约**：财务模块后端接口定义与数据结构规范。 |

### 1.3 业务需求规格撰写标准 (Requirements Content Standards)
**所有业务需求子文档 (如 `docs/requirements/*.md`) ，都需包含以下核心章节：**

1.  **Header (模块基本信息)**:
    *   **优先级**: P0/P1/P2。
    *   **设计核心**: 三个关键词定义该模块的视觉或业务重心。
2.  **User Stories & Data Logic (用户故事与数据逻辑)**:
    *   **User Story**: GM 视角的故事背景。
    *   **数据业务需求 (Data Requirements)**: 数据聚合、核心算法、状态触发器。
3.  **UI/UX Behaviors (界面行为规范)**:
    *   加载/动效逻辑、手势、像素级标准（如 20px 轴心）。
4.  **Acceptance Criteria (验收标准)**: 量化的 Checkbox 清单。

## 2. 核心架构与交互原则 (Architecture)
- **三级导航架构**: App Shell -> 业务看板 -> 全屏覆盖层 (Overlay)。
- **页面拆分准则 (Separation Principle)**: 
  - **强制要求**: 任何业务的功能扩展（如：查询列表 vs 发起录入）必须拆分为独立的页面组件 (.tsx) 和需求文档 (.md)。
  - 严禁在单个文件中通过复杂的内部状态切换承载两个截然不同的业务流。
- **布局约束**: 全局容器限制 `max-w-md mx-auto`，拇指操作区优化。

## 3. 开发习惯与工程化规范 (Engineering Standards)
- **需求变更全量同步 (Requirement Change Sync)**: 
  - **强制要求**: 任何代码 (.tsx) 的变动或需求变更，必须同步更新对应的所有 .md 文档。
- **业务映射索引规范 (Business Mapping Standard)**:
  - 链接显示文本（Label）必须**仅显示文件名**。
- **API 设计与文档规范 (API Design & Documentation)**:
  - **RESTful 原则**: 所有后端接口交互必须遵循 RESTful 风格设计。
- **隐私保护 (Privacy by Default)**: 敏感数据（余额/薪资）默认高斯模糊。
- **UI 轴心锁定**: Marker 中心点严格锁定在左侧 **20px** 垂直轴线上。

## 4. 关键组件逻辑 (Core Components)
### AI 智能诊断 (SmartDiagnosisChat)
- **打字机动效**: 40ms/char。
- **高度锁定**: 固定容器高度防止抖动。

### 结构化列表 (Unified Lists)
- **线性进度条**: 统一采用 `h-1.5` 圆角进度条。
- **视觉对齐**: 列表图标/色点与 20px 轴心重合。

# 模块需求: 经营总览 (Dashboard)

## 1. 核心元数据 (Header & Meta)
*   **优先级**: P0 (Blocker)
*   **状态**: Approved
*   **设计核心**: 盈亏视角 (P&L Perspective), 风险驱动 (Risk-Driven), 隐私保护 (Privacy First)

## 2. 用户故事 (User Stories)

### US1: 盈利掌控 (Profit & Loss Control)
*   **场景**: 总经理在电梯里利用碎片时间快速查看公司经营状况。
*   **故事**: 作为总经理，我希望一进 App 就看到本月是赚是亏以及利润率水平，以便于我瞬间判断公司经营健康度。

### US2: 智能洞察 (Smart AI Diagnosis)
*   **场景**: 月度经营分析会前，需要快速了解账目背后的隐患。
*   **故事**: 作为总经理，我希望 AI 直接用自然语言指出账目背后的合规风险和异常支出，而不需要我逐行去翻看财务报表。

### US3: 隐私敏感度管理 (Privacy Management)
*   **场景**: 在公共咖啡馆或多人会议室展示手机屏幕。
*   **故事**: 作为总经理，我需要银行账户余额和敏感薪资数据默认处于隐藏（打码）状态，只有在我主动点击时才显示，防止商业机密泄露。

## 3. 详细业务逻辑 (Business Logic & Algorithms)

### 3.1 数据结构与字段映射
```typescript
interface DashboardData {
  month: string;           // 账期 'YYYY-MM'
  revenue: number;         // 营业收入 (科目 6001 + 6051)
  cost: number;            // 经营成本 (科目 6401 + 管理/销售/财务费用)
  headcount: number;       // 期末在职人数
  lastMonthHeadcount: number; // 上月期末人数
  bankBalance: number;     // 银行日记账实时余额
  
  // 收入构成
  revenueSources: Array<{
    name: string;
    amount: number;
    status: '已入账' | '待入账'; // 待入账通常指已开票未回款
    date: string;
  }>;
  
  // 成本构成 (聚合后)
  costStructure: Array<{
    category: 'R&D' | 'Admin' | 'Ops' | 'Tax';
    amount: number;
    items: string[]; // Top 3 具体科目名称，如 ["研发工资", "服务器"]
  }>;
  
  diagnosis: string; // AI 生成的诊断文本 (Markdown格式)
}
```

### 3.2 核心计算逻辑
*   **净利润 (Net Profit)**:
    ```
    Net_Profit = Data.revenue - Data.cost
    ```
*   **净利率 (Profit Margin)**:
    ```
    IF Data.revenue > 0 THEN
        Margin = (Net_Profit / Data.revenue) * 100
    ELSE
        Margin = 0.0
    ```
*   **人员流动 (Headcount Delta)**:
    ```
    Delta = Data.headcount - Data.lastMonthHeadcount
    Trend = Delta >= 0 ? 'Growth' : 'Shrink'
    ```

### 3.3 状态机 (State Machines)

#### A. 盈亏主题状态机 (Theme State)
*   **Condition**: `Net_Profit >= 0`
    *   **State**: `PROFIT`
    *   **UI Effect**: 全局主题色设为 `Emerald` (绿/青)，Hero Card 背景显示绿色渐变，图标使用 `TrendingUp`。
*   **Condition**: `Net_Profit < 0`
    *   **State**: `LOSS`
    *   **UI Effect**: 全局主题色设为 `Rose` (红/粉)，Hero Card 背景显示红色渐变，图标使用 `BarChart3` (警示态)。

#### B. AI 诊断加载状态机 (Diagnosis Lifecycle)
*   **State: Idle** -> (Event: Component Mount / Month Change) -> **State: Thinking**
    *   UI: 显示“深度扫描账务数据中...”及 Loading 骨架屏。
*   **State: Thinking** -> (Event: API Response) -> **State: Typing**
    *   UI: 执行打字机动效 (30ms/char)，光标闪烁。
*   **State: Typing** -> (Event: Text Complete) -> **State: Done**
    *   UI: 显示“诊断就绪”绿色角标。

## 4. UI/UX 交互与视觉规范 (UI/UX Specifications)

### 4.1 布局与轴心锁定
*   **容器约束**: 全局 `max-w-md`，左右 Padding `px-5` (20px)。
*   **20px 轴心锁定 (Critical)**:
    *   Dashboard 中所有卡片的左侧关键视觉元素（如：支出结构的类别圆点、收入列表的状态图标、时间轴 Marker）的几何中心点，必须严格对其屏幕左边缘向内 **20px** 的垂直辅助线。

### 4.2 视觉样式
*   **金额显示**:
    *   字体: `font-mono` (等宽), `font-black` (极粗)。
    *   脱敏态: 使用 `••••••` 或 `blur(8px)`，禁止使用 `****`。
*   **颜色语义 (Tailwind)**:
    *   盈利/收入: `text-emerald-600`, `bg-emerald-50`, `border-emerald-100`。
    *   亏损/支出: `text-rose-600`, `bg-rose-50`, `border-rose-100`。
    *   预警/风险: `text-orange-600`, `bg-orange-50`。

### 4.3 交互动效
*   **Hero Card 切换**: 当切换月份导致盈亏状态改变时，背景色需执行 `duration-700` 的平滑过渡，避免闪烁。
*   **AI 折叠**:
    *   **高度锁定**: 默认高度 `h-[88px]` (约 4 行)。
    *   **展开交互**: 不使用“展开”按钮，而是通过文末的 **闪烁省略号 (...)** 作为隐喻点击入口。

## 5. 异常与边界处理 (Edge Cases)

*   **空数据状态 (Start of Month)**:
    *   若 `Revenue == 0` 且 `Cost == 0`：
    *   Hero Card 显示 0.00，主题色默认为 `Slate` (灰色)。
    *   AI 诊断显示：“本月暂无经营数据，请稍后查看。”
*   **隐私模式初始化**:
    *   App 每次冷启动或从后台切回前台时，`showBalance` 状态必须重置为 `false` (打码)。
*   **超长文本**:
    *   收入来源名称超过 1 行时，使用 `truncate` 截断，不换行，保持列表紧凑。

## 6. 验收标准 (Acceptance Criteria)

*   **Given** 本月净利润为 -5000 元
    *   **When** 进入 Dashboard 页面
    *   **Then** 顶部大卡片背景应为浅红色，金额前显示负号，净利率标签为红色。
*   **Given** 页面刚刚加载完成
    *   **When** 观察“银行账户余额”区域
    *   **Then** 数值应被隐藏或模糊，直到我点击“眼睛”图标。
*   **Given** AI 正在输出诊断建议
    *   **When** 文字逐字显示时
    *   **Then** 诊断卡片的高度应保持固定，页面下方内容不得发生抖动。
*   **Given** 查看“支出构成”列表
    *   **Then** 进度条左侧的彩色圆点中心，应与下方“收入回款”列表的图标中心在同一垂直线上 (20px)。

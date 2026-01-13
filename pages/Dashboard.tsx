import React, { useState } from 'react';
import { 
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Briefcase,
  Zap,
  Calendar,
  ChevronDown,
  ShieldAlert,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  CheckCircle2,
  Bot,
  Sparkles,
  PieChart as PieIcon,
  Banknote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import CashFlowComparisonChart from '../components/charts/CashFlowComparisonChart';

// --- Types & Mock Data ---

type MonthKey = '2023-12' | '2024-01';

interface FinancialData {
  revenue: number;
  cost: number;
  headcount: number;
  lastMonthHeadcount: number;
  bankBalance: number; // Added for Cash Flow card
  revenueSources: { name: string; amount: number; date: string; status: 'settled' | 'pending' }[];
  costStructure: { category: 'R&D' | 'Admin' | 'Ops' | 'Tax'; amount: number; items: string[] }[];
  risks: { level: 'danger' | 'warning'; message: string; tag: string }[];
}

const MOCK_DATA: Record<MonthKey, FinancialData> = {
  '2023-12': {
    revenue: 850000,
    cost: 480000,
    headcount: 32,
    lastMonthHeadcount: 30,
    bankBalance: 1425900,
    revenueSources: [
      { name: '主营业务收入-技术服务', amount: 620000, date: '12-15', status: 'settled' },
      { name: '外包服务费收入', amount: 180000, date: '12-20', status: 'settled' },
      { name: '技术维护费', amount: 50000, date: '12-25', status: 'pending' },
    ],
    costStructure: [
      { category: 'R&D', amount: 280000, items: ['研发人员薪资', '云服务器租赁'] },
      { category: 'Tax', amount: 85000, items: ['增值税', '附加税'] },
      { category: 'Ops', amount: 65000, items: ['市场推广', '差旅费'] },
      { category: 'Admin', amount: 50000, items: ['办公室租金', '行政杂项'] },
    ],
    risks: [
      { level: 'warning', message: '业务招待费占比接近红线 (4.8%)', tag: '合规预警' },
      { level: 'danger', message: '大额无票支出: 渠道推广费 (¥45,000)', tag: '税务风险' }
    ]
  },
  '2024-01': {
    revenue: 420000, // Lower revenue, might show loss or low margin
    cost: 450000,
    headcount: 35,
    lastMonthHeadcount: 32,
    bankBalance: 1280000,
    revenueSources: [
      { name: '主营业务收入-技术服务', amount: 400000, date: '01-15', status: 'pending' },
      { name: '零星技术咨询', amount: 20000, date: '01-10', status: 'settled' },
    ],
    costStructure: [
      { category: 'R&D', amount: 300000, items: ['研发人员薪资(扩招)', '软件授权'] },
      { category: 'Admin', amount: 80000, items: ['年会筹备', '年终奖计提'] },
      { category: 'Tax', amount: 40000, items: ['增值税'] },
      { category: 'Ops', amount: 30000, items: ['团建费'] },
    ],
    risks: [
      { level: 'danger', message: '本月预计亏损，请关注现金流', tag: '经营预警' },
      { level: 'warning', message: '团建餐饮费超过房租支出', tag: '异常支出' }
    ]
  }
};

const formatCurrency = (val: number) => {
  if (val >= 10000) return `¥${(val / 10000).toFixed(1)}w`;
  return `¥${val.toLocaleString()}`;
};

// Colors for Chart
const CATEGORY_COLORS: Record<string, string> = {
    'R&D': '#6366f1',   // Indigo 500
    'Admin': '#a855f7', // Purple 500
    'Ops': '#f97316',   // Orange 500
    'Tax': '#94a3b8'    // Slate 400
};

const CATEGORY_NAMES: Record<string, string> = {
    'R&D': '研发成本',
    'Admin': '管理成本',
    'Ops': '运营杂项',
    'Tax': '税金附加'
};

const Dashboard: React.FC = () => {
  const [month, setMonth] = useState<MonthKey>('2023-12');

  const currentData = MOCK_DATA[month];
  const netProfit = currentData.revenue - currentData.cost;
  const isProfit = netProfit >= 0;
  const margin = (netProfit / currentData.revenue) * 100;
  const revPerCapita = currentData.revenue / currentData.headcount;
  const headcountDiff = currentData.headcount - currentData.lastMonthHeadcount;

  return (
    <div className="min-h-full bg-[#F8F9FB] pb-8 animate-fade-in">
      
      {/* 1. Header & Month Selector */}
      <header className="sticky top-0 z-30 px-5 pt-12 pb-4 bg-[#F8F9FB]/90 backdrop-blur-md border-b border-slate-100/50 flex justify-between items-end">
        <div>
           <div className="flex items-center gap-1.5 mb-1 opacity-60">
              <Calendar size={12} className="text-slate-500"/>
              <span className="text-xs font-bold text-slate-500 font-mono tracking-wide">FINANCIAL PILOT</span>
           </div>
           <h1 className="text-xl font-bold text-slate-900 tracking-tight">经营概览</h1>
        </div>
        
        {/* Month Toggle */}
        <div className="bg-white rounded-lg p-1 flex shadow-sm border border-slate-200">
            {(['2023-12', '2024-01'] as MonthKey[]).map((m) => (
                <button
                    key={m}
                    onClick={() => setMonth(m)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                        month === m 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {m}
                </button>
            ))}
        </div>
      </header>

      <div className="px-5 space-y-6 mt-4">
        
        {/* 2. Core Profit Dashboard (Hero Card) - Light/Elegant Theme */}
        <div className={`rounded-[24px] p-6 shadow-sm border relative overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-[180px] group ${
            isProfit 
            ? 'bg-gradient-to-br from-emerald-50 via-[#f0fdf4] to-teal-50 border-emerald-100 shadow-emerald-100/50' 
            : 'bg-gradient-to-br from-rose-50 via-[#fff1f2] to-orange-50 border-rose-100 shadow-rose-100/50'
        }`}>
            {/* Background Pattern */}
            <div className={`absolute top-0 right-0 p-6 opacity-[0.06] transform group-hover:scale-110 transition-transform duration-700 ${
                isProfit ? 'text-emerald-600' : 'text-rose-600'
            }`}>
                <Landmark size={140} />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">本月净利润 (Net Profit)</p>
                        <h2 className={`text-4xl font-bold font-mono tracking-tighter ${
                            isProfit ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                            {isProfit ? '+' : ''}{formatCurrency(netProfit)}
                        </h2>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 backdrop-blur-sm ${
                        isProfit 
                        ? 'bg-white/60 border-emerald-200 text-emerald-700' 
                        : 'bg-white/60 border-rose-200 text-rose-700'
                    }`}>
                        {isProfit ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                        <span className="text-xs font-bold font-mono">{margin.toFixed(1)}%</span>
                    </div>
                </div>

                {/* Mini Stats Row */}
                <div className={`flex gap-6 border-t pt-4 ${
                    isProfit ? 'border-emerald-100' : 'border-rose-100'
                }`}>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-0.5 font-medium">总收入 (Revenue)</p>
                        <p className="text-sm font-bold font-mono text-slate-700">{formatCurrency(currentData.revenue)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-0.5 font-medium">总支出 (Cost)</p>
                        <p className="text-sm font-bold font-mono text-slate-700">{formatCurrency(currentData.cost)}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Cash Flow Trend (Spacious Chart) */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center relative z-10 mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Wallet size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">银行结余走势</h3>
                        <p className="text-[10px] text-slate-400 font-medium">近30天资金水位</p>
                    </div>
                </div>
                <Link to="/work/fn-flow" className="p-2 rounded-full hover:bg-slate-50 text-slate-300 transition-colors -mr-2">
                    <ChevronRight size={20} />
                </Link>
            </div>

            {/* Chart taking up remaining space - Increased to h-36 for spacious look */}
            <div className="h-36 w-full -ml-2 -mb-4 mt-2 relative">
                <CashFlowComparisonChart className="h-full" />
            </div>
        </div>

        {/* 4. Smart Risk & Insights (Chat AI Style) */}
        <div className="flex items-start gap-3 px-1">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0 mt-2">
                <Bot size={20} className="text-white" />
            </div>
            
            {/* Chat Bubble */}
            <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex-1 relative">
                {/* Triangle */}
                <div className="absolute top-4 -left-2 w-4 h-4 bg-white border-l border-b border-slate-100 transform rotate-45"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} className="text-purple-500 fill-purple-100" />
                        <span className="text-xs font-bold text-purple-700">智能经营诊断</span>
                    </div>
                    
                    {currentData.risks.length > 0 ? (
                        <div className="space-y-3">
                            <p className="text-xs text-slate-600 leading-relaxed">
                                GM 您好，基于本月财务数据，我发现了 <span className="font-bold text-slate-900">{currentData.risks.length}</span> 项需要关注的经营风险：
                            </p>
                            <div className="space-y-2">
                                {currentData.risks.map((risk, idx) => (
                                    <div key={idx} className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                                        risk.level === 'danger' 
                                        ? 'bg-rose-50/50 border-rose-100' 
                                        : 'bg-amber-50/50 border-amber-100'
                                    }`}>
                                        <AlertTriangle size={14} className={`shrink-0 mt-0.5 ${
                                            risk.level === 'danger' ? 'text-rose-500' : 'text-amber-500'
                                        }`} />
                                        <p className={`text-xs font-medium leading-relaxed ${
                                            risk.level === 'danger' ? 'text-rose-800' : 'text-amber-800'
                                        }`}>
                                            {risk.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-xs text-slate-600 leading-relaxed">
                                GM 您好，本月经营数据 <span className="font-bold text-emerald-600">健康稳定</span>，未发现明显异常风险。
                            </p>
                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg w-fit">
                                <CheckCircle2 size={14} />
                                <span className="text-xs font-bold">各项指标正常</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* 5. Cost Structure (Card A) */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
                        <PieIcon size={16} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">成本结构 (Cost)</h3>
                </div>
                <Link to="/work/fn-5" className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 px-2 py-1 rounded-lg transition-colors">
                    财税报表 <ArrowUpRight size={10} />
                </Link>
            </div>

            <div className="flex items-center justify-between gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={currentData.costStructure}
                                dataKey="amount"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={5}
                                stroke="none"
                            >
                                {currentData.costStructure.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category]} />
                                ))}
                            </Pie>
                        </PieChart>
                        </ResponsiveContainer>
                        {/* Center Label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] text-gray-400">总支出</span>
                            <span className="text-xs font-bold text-gray-900 font-mono">{formatCurrency(currentData.cost)}</span>
                        </div>
                </div>

                {/* Legend List */}
                <div className="flex-1 space-y-3 min-w-0">
                    {[...currentData.costStructure].sort((a,b) => b.amount - a.amount).map((item, idx) => {
                        const percent = ((item.amount / currentData.cost) * 100).toFixed(1);
                        return (
                            <div key={idx} className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span 
                                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                                        style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                                    ></span>
                                    <span className="text-xs font-medium text-gray-600 truncate">
                                        {CATEGORY_NAMES[item.category]}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-xs font-bold font-mono text-gray-900">{formatCurrency(item.amount)}</span>
                                    <span className="text-[10px] text-gray-400 font-mono w-8 text-right">{percent}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* 6. Revenue Sources (Card B) */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <Banknote size={16} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">收入构成 (Revenue)</h3>
                </div>
                <Link to="/work/fn-flow" className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 px-2 py-1 rounded-lg transition-colors">
                    资金流水 <ArrowUpRight size={10} />
                </Link>
            </div>

            <div className="space-y-3">
                {currentData.revenueSources.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                    item.status === 'settled' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                    {item.status === 'settled' ? '已入账' : '待结算'}
                                </span>
                                <p className="text-[10px] text-slate-400 font-mono">入账日: {item.date}</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold font-mono text-slate-900">{formatCurrency(item.amount)}</span>
                    </div>
                ))}
                {currentData.revenueSources.length === 0 && (
                    <div className="text-center py-6">
                        <p className="text-xs text-slate-400">本月暂无收入记录</p>
                    </div>
                )}
            </div>
        </div>

        {/* 7. Efficiency & Ops Indicators (Moved to Bottom) */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 grid grid-cols-2 gap-4 relative overflow-hidden">
            {/* Left: Headcount */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Users size={14} />
                    <span className="text-xs font-bold">团队规模</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 font-mono">{currentData.headcount}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${
                        headcountDiff >= 0 
                        ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                        : 'text-rose-600 bg-rose-50 border-rose-100'
                    }`}>
                        {headcountDiff >= 0 ? <ArrowUpRight size={8} strokeWidth={3}/> : <ArrowDownRight size={8} strokeWidth={3}/>}
                        {Math.abs(headcountDiff)}
                    </span>
                </div>
                <p className="text-[10px] text-slate-300 pl-0.5">人</p>
            </div>

            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-100"></div>

            {/* Right: Revenue Per Capita */}
            <div className="pl-4 space-y-1">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Zap size={14} />
                    <span className="text-xs font-bold">人均产出</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900 font-mono">
                        ¥{(revPerCapita / 10000).toFixed(1)}w
                    </span>
                </div>
                <p className="text-[10px] text-slate-300 pl-0.5">/ 人 / 月</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
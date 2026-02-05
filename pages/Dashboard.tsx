
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  BarChart3,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  Bot,
  UserPlus,
  ShieldAlert,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import CashFlowComparisonChart from '../components/charts/CashFlowComparisonChart';

// --- Types & Mock Data ---

type MonthKey = '2023-11' | '2023-12' | '2024-01';

interface FinancialData {
  revenue: number;
  cost: number;
  headcount: number;
  lastMonthHeadcount: number;
  bankBalance: number;
  revenueSources: { name: string; amount: number; date: string; status: '已入账' | '待入账'; category: 'main' | 'service' | 'other' }[];
  costStructure: { category: 'R&D' | 'Admin' | 'Ops' | 'Tax'; amount: number; items: string[] }[];
  diagnosis: string; 
}

const MOCK_DATA: Record<MonthKey, FinancialData> = {
  '2023-11': {
    revenue: 780000,
    cost: 460000,
    headcount: 30,
    lastMonthHeadcount: 28,
    bankBalance: 1050000,
    revenueSources: [],
    costStructure: [],
    diagnosis: "数据历史归档"
  },
  '2023-12': {
    revenue: 850000,
    cost: 480000,
    headcount: 32,
    lastMonthHeadcount: 30,
    bankBalance: 1425900,
    revenueSources: [
      { name: '主营业务收入-技术服务', amount: 620000, date: '12-15', status: '已入账', category: 'main' },
      { name: '外包服务费收入', amount: 180000, date: '12-20', status: '已入账', category: 'service' },
      { name: '技术维护费', amount: 50000, date: '12-25', status: '待入账', category: 'other' },
    ],
    costStructure: [
      { category: 'R&D', amount: 280000, items: ['研发'] },
      { category: 'Tax', amount: 85000, items: ['增值税'] },
      { category: 'Ops', amount: 65000, items: ['市场'] },
      { category: 'Admin', amount: 50000, items: ['办公'] },
    ],
    diagnosis: "[资金安全] 余额充足，本月净流入 ¥37w，预计可覆盖未来 4 个月运营开支。\n[合规风险] 发现 1 笔 ¥4.5w 渠道推广费缺失合法票据，可能导致年终纳税调整。\n[人效预警] 研发投入占比上升 12%，但人均产出环比持平，需关注项目交付效率。\n[税务建议] 建议在本月 25 日前完成进项税额抵扣确认，预计可减少 ¥1.2w 税费支出。\n[经营提效] 当前管理费用占比略高，建议通过数字化报销流程减少 15% 的人工审计成本。"
  },
  '2024-01': {
    revenue: 420000,
    cost: 450000,
    headcount: 35,
    lastMonthHeadcount: 32,
    bankBalance: 1280000,
    revenueSources: [
      { name: '主营业务收入-技术服务', amount: 400000, date: '01-15', status: '待入账', category: 'main' },
      { name: '零星技术咨询', amount: 20000, date: '01-10', status: '已入账', category: 'other' },
    ],
    costStructure: [
      { category: 'R&D', amount: 300000, items: ['扩招'] },
      { category: 'Admin', amount: 80000, items: ['奖金'] },
      { category: 'Tax', amount: 40000, items: ['税收'] },
      { category: 'Ops', amount: 30000, items: ['年会'] },
    ],
    diagnosis: "[亏损预警] 本月预计产生净亏损 ¥3w，收入侧波动剧烈，建议收紧非必要行政开支。\n[异常支出] 员工团建费用环比激增 160%，已超出年度管理预算。\n[流动性] 建议关注 01-15 待入账的 ¥40w 服务费，若逾期将面临现金周转压力。\n[成本分析] 扩招后人力成本增长 20%，需同步建立项目产出评估模型。\n[财税合规] 跨年发票报销已进入倒计时，请督促财务部尽快完成账务封账。"
  }
};

const formatCurrency = (val: number, isVisible: boolean = true) => {
  if (!isVisible) return '••••••';
  if (val >= 10000) return `¥${(val / 10000).toFixed(1)}w`;
  return `¥${val.toLocaleString()}`;
};

// --- Sub-Component: SmartDiagnosisChat ---

interface HistoryData {
    month: string;
    revenue: number;
    cost: number;
    profit: number;
}

const SmartDiagnosisChat: React.FC<{ 
    data: FinancialData; 
    month: string; 
    history: HistoryData[];
}> = ({ data, month, history }) => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'thinking' | 'typing' | 'done'>('thinking');
  const [isExpanded, setIsExpanded] = useState(false);
  const streamActive = useRef(false);
  const typeInterval = useRef<any>(null);

  const clearTypeInterval = () => {
    if (typeInterval.current) {
        clearInterval(typeInterval.current);
        typeInterval.current = null;
    }
  };

  useEffect(() => {
    setDisplayText('');
    setPhase('thinking');
    setIsExpanded(false);
    streamActive.current = true;
    clearTypeInterval();

    const generateWithAI = async () => {
        try {
            if (!process.env.API_KEY) throw new Error("API Key missing");

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const historyContext = history.length > 0 
                ? history.map(h => `- ${h.month}: Rev ${h.revenue}, Cost ${h.cost}, Profit ${h.profit}`).join('\n')
                : "No historical data available.";

            const prompt = `
              You are a CFO assistant for a SME. 
              Current Month (${month}): Revenue ${data.revenue}, Cost ${data.cost}, Profit ${data.revenue - data.cost}.
              History: ${historyContext}.
              Generate 4-5 concise insights. 
              Format: "[Tag] Content". Tags: 资金安全, 趋势分析, 盈利对比, 成本控制, 经营提效.
              Language: Chinese (Simplified).
            `;

            const response = await ai.models.generateContentStream({
                model: 'gemini-3-flash-preview',
                contents: prompt,
            });

            setPhase('typing');
            
            for await (const chunk of response) {
                if (!streamActive.current) break;
                const text = chunk.text;
                if (text) {
                    setDisplayText(prev => prev + text);
                }
            }
            if (streamActive.current) setPhase('done');

        } catch (error) {
            console.warn("AI Stream failed, using fallback mock data.", error);
            simulateTyping(data.diagnosis);
        }
    };

    const simulateTyping = (content: string) => {
        setPhase('typing');
        let index = 0;
        clearTypeInterval();
        typeInterval.current = setInterval(() => {
            if (!streamActive.current) return;
            if (index < content.length) {
                setDisplayText(content.substring(0, index + 1));
                index++;
            } else {
                setPhase('done');
                clearTypeInterval();
            }
        }, 30);
    };

    const timer = setTimeout(() => {
        generateWithAI();
    }, 800);

    return () => {
        clearTimeout(timer);
        clearTypeInterval();
        streamActive.current = false;
    };
  }, [data, month, history]); 

  const renderFormattedText = (text: string) => {
    const danger = ['合规风险', '亏损预警', '资金风险', '下降趋势'];
    const warning = ['人效预警', '异常支出', '流动性', '成本分析', '趋势分析', '盈利对比'];

    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, i) => {
      const parts = line.match(/^\[(.*?)\](.*)/);
      if (parts) {
        const tag = parts[1];
        const isDanger = danger.some(d => tag.includes(d));
        const isWarning = warning.some(w => tag.includes(w));
        const colorClass = isDanger ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600';
        const bgClass = isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';
        
        return (
          <div key={i} className="mb-3 last:mb-0 flex items-start gap-2.5 animate-fade-in">
            <div className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${bgClass}`}></div>
            <p className="text-[13px] leading-relaxed text-slate-700">
                <span className={`font-black mr-1 ${colorClass}`}>[{tag}]</span>
                {parts[2].trim()}
            </p>
          </div>
        );
      }
      return <p key={i} className="mb-2 last:mb-0 text-[13px] leading-relaxed text-slate-600 pl-4">{line}</p>;
    });
  };

  const needsTruncation = displayText.split('\n').length > 4 || displayText.length > 120;

  return (
    <div className="flex items-start gap-4 pl-1 pr-2 mt-4">
        <div className="shrink-0 pt-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200 border border-slate-800 relative">
                <Bot size={22} className="text-white" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm transition-colors duration-500 ${phase === 'thinking' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 pl-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI 智能经营诊断</span>
                {phase === 'done' && <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-md animate-fade-in"><CheckCircle2 size={8} className="text-emerald-500"/><span className="text-[9px] text-emerald-600 font-bold uppercase">诊断就绪</span></div>}
            </div>
            
            <div className={`bg-white rounded-[24px] rounded-tl-none p-5 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden transition-all duration-500`}>
                {phase === 'thinking' ? (
                    <div className="flex items-center gap-2 py-1 h-[88px]">
                        <span className="text-xs text-slate-400 font-medium">对比历史账期数据中</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <div className={`transition-all duration-500 ease-in-out relative ${!isExpanded ? 'h-[100px] overflow-hidden' : 'min-h-[100px]'}`}>
                            {renderFormattedText(displayText)}
                            
                            {phase === 'typing' && (
                                <span className="inline-block w-1.5 h-3.5 bg-indigo-500/50 ml-1 animate-pulse rounded-full align-middle"></span>
                            )}

                            {!isExpanded && needsTruncation && (
                                <div 
                                    onClick={() => setIsExpanded(true)}
                                    className="absolute bottom-0 right-0 h-16 w-full bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-center cursor-pointer group z-10"
                                >
                                    <div className="flex items-center justify-center gap-1 mb-2 text-indigo-500 font-bold text-xs group-hover:scale-105 transition-transform">
                                        <span>展开更多</span>
                                        <ChevronRight size={12} className="rotate-90" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [month, setMonth] = useState<MonthKey>('2023-12');
  const [showBalance, setShowBalance] = useState<boolean>(false); 

  const currentData = MOCK_DATA[month];
  const netProfit = currentData.revenue - currentData.cost;
  const isProfit = netProfit >= 0;
  const margin = (netProfit / currentData.revenue) * 100;
  const headcountDiff = currentData.headcount - currentData.lastMonthHeadcount;

  const getHistoryData = (currentKey: string): HistoryData[] => {
      const keys = Object.keys(MOCK_DATA).sort();
      const currentIndex = keys.indexOf(currentKey);
      if (currentIndex <= 0) return [];
      
      const historyKeys = keys.slice(Math.max(0, currentIndex - 2), currentIndex);
      return historyKeys.map(k => {
          const d = MOCK_DATA[k as MonthKey];
          return {
              month: k,
              revenue: d.revenue,
              cost: d.cost,
              profit: d.revenue - d.cost
          };
      });
  };

  const historyData = getHistoryData(month);

  return (
    <div className="min-h-full bg-[#F8F9FB] pb-12 animate-fade-in font-sans">
      
      {/* 驾驶舱 Header */}
      <header className="sticky top-0 z-40 px-6 pt-12 pb-5 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-100/50 flex justify-between items-end">
        <div>
           <div className="flex items-center gap-1.5 mb-1 opacity-60">
              <Target size={14} className="text-slate-400"/>
              <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">CEO Cockpit Control</span>
           </div>
           <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">经营总览</h1>
           </div>
        </div>
        
        <div className="bg-white rounded-2xl p-1 flex shadow-sm border border-slate-100 ring-4 ring-slate-50">
            {(['2023-12', '2024-01'] as MonthKey[]).map((m) => (
                <button
                    key={m}
                    onClick={() => setMonth(m)}
                    className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all duration-300 ${
                        month === m 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {m}
                </button>
            ))}
        </div>
      </header>

      <div className="px-6 space-y-8 mt-6">
        
        {/* 1. 核心经营看板 (Hero Card) */}
        <div className={`rounded-[32px] p-[1.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative transition-all duration-700 overflow-hidden border ${
            isProfit ? 'bg-emerald-200/40 border-emerald-100' : 'bg-rose-200/40 border-rose-100'
        }`}>
            <div className={`absolute inset-0 transition-colors duration-700 opacity-60 ${
              isProfit ? 'bg-gradient-to-br from-emerald-50 via-emerald-100/20 to-teal-50/20' : 'bg-gradient-to-br from-rose-50 via-rose-100/20 to-orange-50/20'
            }`}></div>

            <div className="relative z-10 p-7 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 size={16} className={isProfit ? 'text-emerald-500' : 'text-rose-500'} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">本月经营净成果</p>
                        </div>
                        <h2 className={`text-[40px] font-black font-mono tracking-tighter leading-none transition-colors duration-500 ${
                          isProfit ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                            {isProfit ? '+' : ''}{formatCurrency(netProfit)}
                        </h2>
                    </div>
                    <div className={`rounded-2xl px-3 py-1.5 border flex flex-col items-center shadow-sm backdrop-blur-md transition-all duration-500 ${
                      isProfit ? 'bg-emerald-500/10 border-emerald-200/50' : 'bg-rose-500/10 border-rose-200/50'
                    }`}>
                        <p className={`text-[9px] font-bold uppercase mb-0.5 tracking-wider ${isProfit ? 'text-emerald-600' : 'text-rose-600'}`}>净利率</p>
                        <span className={`text-xs font-black font-mono ${isProfit ? 'text-emerald-700' : 'text-rose-700'}`}>{margin.toFixed(1)}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                        <div className="flex justify-between items-center opacity-80">
                            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">财务运营</span>
                            <TrendingUp size={14} className="text-slate-400" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-slate-400">营收</span>
                                <span className="text-sm font-black text-slate-900 font-mono tracking-tight">{formatCurrency(currentData.revenue)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-slate-400">支出</span>
                                <span className="text-sm font-black text-slate-900 font-mono tracking-tight">{formatCurrency(currentData.cost)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                        <div className="flex justify-between items-center opacity-80">
                            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">人资规模</span>
                            <Users size={14} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col justify-end h-full">
                            <div className="flex items-baseline justify-between">
                                <span className="text-2xl font-black text-slate-900 font-mono tracking-tighter">{currentData.headcount}</span>
                                <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 ${
                                    headcountDiff >= 0 ? 'bg-emerald-100/50 text-emerald-600' : 'bg-rose-100/50 text-rose-600'
                                }`}>
                                    {headcountDiff >= 0 ? <UserPlus size={10}/> : <TrendingDown size={10}/>}
                                    {headcountDiff >= 0 ? '+' : ''}{headcountDiff}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. 智能诊断 AI 顾问 */}
        <SmartDiagnosisChat data={currentData} month={month} history={historyData} />

        {/* 3. 银行结余走势 (资金心脏) */}
        <section className="bg-gradient-to-br from-white via-[#f8fbff] to-[#eef6ff] rounded-[32px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white text-blue-500 flex items-center justify-center border border-blue-100 shadow-sm">
                        <Wallet size={20} strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 tracking-tight">银行账户余额走势</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cash Flow MoM Trend</p>
                    </div>
                </div>
                <Link to="/work/fn-flow" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 border border-slate-100 shadow-sm transition-all">
                    <ChevronRight size={20} />
                </Link>
            </div>
            
            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <span className={`text-[32px] font-black text-slate-900 font-mono tracking-tighter transition-all duration-300 ${!showBalance ? 'blur-[8px] opacity-25 select-none' : ''}`}>
                      {showBalance ? `¥${(currentData.bankBalance/10000).toFixed(1)}w` : '••••••'}
                    </span>
                    <button 
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-2 rounded-full hover:bg-white text-slate-300 transition-all active:scale-90"
                    >
                      {showBalance ? <Eye size={18} /> : <EyeOff size={18} className="text-indigo-500" />}
                    </button>
                </div>
                <CashFlowComparisonChart className="h-48" />
            </div>
        </section>

        {/* 4. 经营支出结构 */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
             <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 shadow-sm">
                        <Zap size={20} strokeWidth={2} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900">经营总支出构成</h3>
                </div>
                <Link to="/work/fn-5" className="text-[10px] font-black text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100/50 hover:bg-indigo-100 transition-colors active:scale-95">
                    数据报表 <ArrowUpRight size={12} />
                </Link>
             </div>
             
             {/* List Container with 20px Axis */}
             <div className="relative mt-2">
                {/* Axis Line aligned with header icon center */}
                <div className="absolute left-[21px] top-2 bottom-4 w-0.5 bg-slate-100/80 rounded-full"></div>

                <div className="space-y-6">
                    {currentData.costStructure.map((item, idx) => {
                        const percentage = (item.amount / currentData.cost) * 100;
                        const colors: Record<string, string> = { 'R&D': 'bg-indigo-500', 'Admin': 'bg-purple-500', 'Ops': 'bg-amber-500', 'Tax': 'bg-slate-400' };
                        const labels: Record<string, string> = { 'R&D': '研发人力', 'Admin': '管理费用', 'Ops': '运营杂项', 'Tax': '税金附加' };
                        
                        return (
                            <div key={idx} className="relative pl-[52px]">
                                {/* Dot aligned with axis */}
                                <div className={`absolute left-[16px] top-1.5 w-3 h-3 rounded-full ring-4 ring-white z-10 shadow-sm ${colors[item.category]}`}></div>
                                
                                <div className="flex justify-between items-end mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-700">{labels[item.category]}</span>
                                        <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded">
                                            {item.items[0]}
                                        </span>
                                    </div>
                                    <span className="text-sm font-black font-mono text-slate-900">{formatCurrency(item.amount)}</span>
                                </div>
                                
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${colors[item.category]}`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <div className="text-[9px] font-bold text-slate-300 text-right mt-0.5">
                                    {percentage.toFixed(1)}%
                                </div>
                            </div>
                        );
                    })}
                </div>
             </div>
        </div>

        {/* 5. 收入回款明细 */}
        <div className="bg-white rounded-[32px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="flex justify-between items-center mb-7">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
                        <TrendingUp size={20} strokeWidth={2} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900">收入回款构成</h3>
                </div>
                <div className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded-lg">共 {currentData.revenueSources.length} 笔</div>
            </div>

            <div className="space-y-4">
                {currentData.revenueSources.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-[24px] bg-slate-50/50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 group">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                                source.status === '已入账' 
                                ? 'bg-white border-emerald-100 text-emerald-500 shadow-sm' 
                                : 'bg-white border-amber-100 text-amber-500 shadow-sm'
                            }`}>
                                {source.status === '已入账' ? <CheckCircle2 size={20} strokeWidth={2.5}/> : <Clock size={20} strokeWidth={2.5}/>}
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm font-black text-slate-800 truncate leading-tight group-hover:text-emerald-800 transition-colors">{source.name}</h4>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{source.date}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                    <span className={`text-[10px] font-bold uppercase ${source.status === '已入账' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {source.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-base font-black font-mono text-slate-800 group-hover:text-emerald-700 transition-colors">{formatCurrency(source.amount)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 底部品牌标示 */}
        <footer className="pt-12 pb-16 text-center">
             <div className="flex items-center justify-center gap-2 mb-2 opacity-30 group">
                 <ShieldAlert size={14} className="text-slate-900 group-hover:text-indigo-600 transition-colors"/>
                 <span className="text-[11px] font-black tracking-[0.3em] text-slate-900 uppercase">GM Pilot Insight</span>
             </div>
             <p className="text-[9px] font-black text-slate-300 font-mono tracking-widest">VERSION 2.0.0-PRO</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;

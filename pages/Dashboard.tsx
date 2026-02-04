
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  BarChart3,
  Search,
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

  // Clear typing interval helper
  const clearTypeInterval = () => {
    if (typeInterval.current) {
        clearInterval(typeInterval.current);
        typeInterval.current = null;
    }
  };

  useEffect(() => {
    // Reset state
    setDisplayText('');
    setPhase('thinking');
    setIsExpanded(false);
    streamActive.current = true;
    clearTypeInterval();

    const generateWithAI = async () => {
        try {
            if (!process.env.API_KEY) throw new Error("API Key missing");

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Construct History Context String
            const historyContext = history.length > 0 
                ? history.map(h => `- ${h.month}: Rev ${h.revenue}, Cost ${h.cost}, Profit ${h.profit}`).join('\n')
                : "No historical data available.";

            const prompt = `
              You are a CFO assistant for a SME. 
              
              Current Month (${month}):
              - Revenue: ${data.revenue}
              - Cost: ${data.cost}
              - Net Profit: ${data.revenue - data.cost}
              - Bank Balance: ${data.bankBalance}
              - Headcount: ${data.headcount} (Prev: ${data.lastMonthHeadcount})
              - Cost Breakdown: ${data.costStructure.map(c => `${c.category}: ${c.amount}`).join(', ')}

              Previous 2 Months History (For Trend Analysis):
              ${historyContext}

              Task: Generate 4-5 concise, high-value business insights.
              Requirement:
              1. **Must include specific comparative analysis** (e.g., "Compared to last month...", "Continuing the 3-month trend...").
              2. Strictly use the format "[Tag] Content" for each line.
              3. Tags must be 4 Chinese chars like: 资金安全, 趋势分析, 盈利对比, 成本控制, 经营提效.
              
              Language: Chinese (Simplified).
              Tone: Professional, direct, actionable.
              DO NOT use markdown code blocks. Just return the lines.
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

    // Fallback simulation
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

    // Start with a small delay for "thinking" effect
    const timer = setTimeout(() => {
        generateWithAI();
    }, 800);

    return () => {
        clearTimeout(timer);
        clearTypeInterval();
        streamActive.current = false;
    };
  }, [data, month, history]); // Re-run if month or history changes

  const renderFormattedText = (text: string) => {
    const danger = ['合规风险', '亏损预警', '资金风险', '下降趋势'];
    const warning = ['人效预警', '异常支出', '流动性', '成本分析', '趋势分析', '盈利对比'];

    // Handle partial streaming lines cleanly
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
          <div key={i} className="mb-2.5 last:mb-0 flex items-start gap-2 animate-fade-in">
            <div className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${bgClass}`}></div>
            <p className="text-[12px] leading-relaxed text-slate-700">
                <span className={`font-bold mr-1 ${colorClass}`}>[{tag}]</span>
                {parts[2].trim()}
            </p>
          </div>
        );
      }
      // Fallback for plain text or thinking phase partials
      return <p key={i} className="mb-1.5 last:mb-0 text-[12px] leading-relaxed text-slate-600 pl-3.5">{line}</p>;
    });
  };

  // Keep strictly 4 lines (approx 88px) initially
  const needsTruncation = displayText.split('\n').length > 4 || displayText.length > 120;

  return (
    <div className="flex items-start gap-3 px-1">
        <div className="shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200 border border-slate-800 relative">
                <Bot size={22} className="text-white" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm transition-colors duration-500 ${phase === 'thinking' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 pl-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI 智能经营诊断</span>
                {phase === 'done' && <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-md animate-fade-in"><CheckCircle2 size={8} className="text-emerald-500"/><span className="text-[9px] text-emerald-600 font-bold uppercase">诊断就绪</span></div>}
            </div>
            
            <div className={`bg-white rounded-[24px] rounded-tl-none p-5 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden transition-all duration-500`}>
                {phase === 'thinking' ? (
                    <div className="flex items-center gap-2 py-1 h-[88px]">
                        <span className="text-[12px] text-slate-400 font-medium">对比历史账期数据中</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Height Lock / Expansion Logic */}
                        <div className={`transition-all duration-500 ease-in-out relative ${!isExpanded ? 'h-[88px] overflow-hidden' : 'min-h-[88px]'}`}>
                            {renderFormattedText(displayText)}
                            
                            {/* Cursor */}
                            {phase === 'typing' && (
                                <span className="inline-block w-1.5 h-3.5 bg-indigo-500/50 ml-1 animate-pulse rounded-full align-middle"></span>
                            )}

                            {/* Expand Trigger - Flashing Ellipsis */}
                            {!isExpanded && needsTruncation && (
                                <div 
                                    onClick={() => setIsExpanded(true)}
                                    className="absolute bottom-0 right-0 h-12 pl-20 pr-2 bg-gradient-to-l from-white via-white/95 to-transparent flex items-end justify-end cursor-pointer group z-10"
                                >
                                    <div className="flex items-center justify-center w-8 h-6 mb-1 rounded text-indigo-500 group-hover:scale-125 transition-transform origin-bottom">
                                        <span className="text-2xl leading-none font-bold animate-pulse pb-2">...</span>
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
  const [showBalance, setShowBalance] = useState<boolean>(false); // 默认打码

  const currentData = MOCK_DATA[month];
  const netProfit = currentData.revenue - currentData.cost;
  const isProfit = netProfit >= 0;
  const margin = (netProfit / currentData.revenue) * 100;
  const headcountDiff = currentData.headcount - currentData.lastMonthHeadcount;

  // Retrieve History (Previous 2 Months)
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
      <header className="sticky top-0 z-40 px-6 pt-12 pb-5 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-100 flex justify-between items-end">
        <div>
           <div className="flex items-center gap-1.5 mb-1.5 opacity-60">
              <Target size={14} className="text-slate-400"/>
              <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">CEO Cockpit Control</span>
           </div>
           <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">经营总览</h1>
           </div>
        </div>
        
        <div className="bg-white rounded-2xl p-1 flex shadow-sm border border-slate-200/60 ring-4 ring-slate-100/30">
            {(['2023-12', '2024-01'] as MonthKey[]).map((m) => (
                <button
                    key={m}
                    onClick={() => setMonth(m)}
                    className={`px-4 py-1.5 text-[11px] font-black rounded-xl transition-all duration-300 ${
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

      <div className="px-5 space-y-6 mt-6">
        
        {/* 1. 核心经营看板 (Hero Card) */}
        <div className={`rounded-[32px] p-[1.5px] shadow-2xl shadow-slate-200/50 relative transition-all duration-700 overflow-hidden border ${
            isProfit ? 'bg-emerald-200/40 border-emerald-100' : 'bg-rose-200/40 border-rose-100'
        }`}>
            <div className={`absolute inset-0 transition-colors duration-700 opacity-60 ${
              isProfit ? 'bg-gradient-to-br from-emerald-50 via-emerald-100/30 to-teal-100/20' : 'bg-gradient-to-br from-rose-50 via-rose-100/30 to-orange-100/20'
            }`}></div>

            <div className="relative z-10 p-7 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 size={14} className={isProfit ? 'text-emerald-500' : 'text-rose-500'} />
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">本月经营净成果</p>
                        </div>
                        <h2 className={`text-4xl font-black font-mono tracking-tighter transition-colors duration-500 ${
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
                    <div className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between items-center opacity-80">
                            <span className="text-[10px] font-bold text-slate-500 tracking-wider">财务运营</span>
                            <TrendingUp size={12} className="text-slate-400" />
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-slate-400">营收</span>
                                <span className="text-[13px] font-black text-slate-900 font-mono">{formatCurrency(currentData.revenue)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-slate-400">支出</span>
                                <span className="text-[13px] font-black text-slate-900 font-mono">{formatCurrency(currentData.cost)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between items-center opacity-80">
                            <span className="text-[10px] font-bold text-slate-500 tracking-wider">人资规模</span>
                            <Users size={12} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col gap-1.5 justify-center h-full">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-slate-900 font-mono tracking-tighter">{currentData.headcount}</span>
                                <span className="text-[10px] font-bold text-slate-400">在职人数</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 ${
                                    headcountDiff >= 0 ? 'bg-emerald-100/50 text-emerald-600' : 'bg-rose-100/50 text-rose-600'
                                }`}>
                                    {headcountDiff >= 0 ? <UserPlus size={10}/> : <TrendingDown size={10}/>}
                                    {headcountDiff >= 0 ? '+' : ''}{headcountDiff}
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">环比变动</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. 智能诊断 AI 顾问 (Stream Enabled + History Aware) */}
        <SmartDiagnosisChat data={currentData} month={month} history={historyData} />

        {/* 3. 银行结余走势 (资金心脏) */}
        <section className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 shadow-sm">
                        <Wallet size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 tracking-tight">银行账户余额走势</h3>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Cash Flow MoM Trend</p>
                    </div>
                </div>
                <Link to="/work/fn-flow" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    <ChevronRight size={22} />
                </Link>
            </div>
            
            <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className={`text-3xl font-black text-slate-900 font-mono tracking-tighter transition-all duration-300 ${!showBalance ? 'blur-[8px] opacity-25 select-none' : ''}`}>
                      {showBalance ? `¥${(currentData.bankBalance/10000).toFixed(1)}w` : '••••••'}
                    </span>
                    <button 
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-300 transition-all active:scale-90"
                    >
                      {showBalance ? <Eye size={18} /> : <EyeOff size={18} className="text-indigo-500" />}
                    </button>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-auto">账户总余额</span>
                </div>
                <CashFlowComparisonChart className="h-44" />
            </div>
        </section>

        {/* 4. 经营支出结构 */}
        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 shadow-sm">
                        <Zap size={18} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900">经营总支出构成</h3>
                </div>
                <Link to="/work/fn-5" className="text-[10px] font-black text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100/50 hover:bg-indigo-100 transition-colors">
                    数据报表 <ArrowUpRight size={12} />
                </Link>
             </div>
             
             <div className="space-y-6">
                {currentData.costStructure.map((item, idx) => {
                    const percentage = (item.amount / currentData.cost) * 100;
                    const colors: Record<string, string> = {
                        'R&D': 'bg-indigo-400',
                        'Admin': 'bg-purple-400',
                        'Ops': 'bg-amber-400',
                        'Tax': 'bg-slate-400'
                    };
                    const labels: Record<string, string> = {
                        'R&D': '研发人力',
                        'Admin': '管理费用',
                        'Ops': '运营杂项',
                        'Tax': '税金附加'
                    };
                    return (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${colors[item.category]}`}></div>
                                    <span className="text-xs font-bold text-slate-600">{labels[item.category]}</span>
                                    <span className="text-[10px] text-slate-400/80 font-medium">({item.items[0]}等)</span>
                                </div>
                                <span className="text-sm font-black font-mono text-slate-700">{formatCurrency(item.amount)}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 shadow-sm ${colors[item.category]}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
             </div>
        </div>

        {/* 5. 收入回款明细 */}
        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-7">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
                        <TrendingUp size={18} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900">收入回款构成</h3>
                </div>
                <div className="text-[10px] font-bold text-slate-300">本月累计 {currentData.revenueSources.length} 笔</div>
            </div>

            <div className="space-y-4">
                {currentData.revenueSources.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/10 transition-all duration-300 group">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                                source.status === '已入账' 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-500 group-hover:bg-emerald-100 group-hover:border-emerald-200' 
                                : 'bg-amber-50 border-amber-100 text-amber-500 group-hover:bg-amber-100 group-hover:border-amber-200'
                            }`}>
                                {source.status === '已入账' ? <CheckCircle2 size={18} strokeWidth={2.5}/> : <Clock size={18} strokeWidth={2.5}/>}
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm font-black text-slate-700 truncate leading-tight group-hover:text-emerald-700 transition-colors">{source.name}</h4>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{source.date}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                    <span className={`text-[10px] font-bold uppercase ${source.status === '已入账' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {source.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-base font-black font-mono text-slate-700 group-hover:text-emerald-600 transition-colors">{formatCurrency(source.amount)}</p>
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
             <p className="text-[9px] font-black text-slate-300 font-mono tracking-widest">VERSION 1.8.0-PRO-NAV · ENCRYPTED DATA LINK</p>
             <div className="mt-6 flex justify-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
             </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;

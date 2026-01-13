import React, { useState } from 'react';
import ExpenditureBreakdownChart from '../components/charts/ExpenditureBreakdownChart';
import PersonnelChart from '../components/charts/PersonnelChart';
import CashFlowComparisonChart from '../components/charts/CashFlowComparisonChart';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  BarChart3,
  Loader2,
  Minus,
  Calendar,
  MoreHorizontal,
  Wallet,
  TrendingUp,
  PieChart,
  ChevronDown,
  Hourglass
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---

interface Alert {
  type: 'action' | 'risk';
  text: string;
  link: string;
}

interface SubItem {
  label: string;
  statusText?: string;
  statusTheme: 'blue' | 'orange' | 'green' | 'gray';
}

interface Metric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface TimelineItem {
  id: string;
  title: string;
  tag?: string; 
  status: 'completed' | 'active' | 'pending';
  dateLabel: string;
  detail: string;
  metrics?: Metric[];
  subItems?: SubItem[];
  alerts?: Alert[];
  link?: string;
}

// --- Data ---
const timelineData: TimelineItem[] = [
  { 
    id: '1', 
    title: '薪酬发放', 
    tag: '11月',
    status: 'completed', 
    dateLabel: '12-10', 
    detail: '',
    metrics: [
      { label: '实发总额', value: '¥425k', trend: 'up', trendValue: '1.2%' },
      { label: '发放人数', value: '32人', trend: 'up', trendValue: '2' }
    ],
    link: '/work/hr-1'
  },
  { 
    id: '2', 
    title: '税务申报', 
    tag: '11月',
    status: 'active', 
    dateLabel: '12-15', 
    detail: '',
    subItems: [
      { label: '增值税', statusTheme: 'green', statusText: '已缴款' },
      { label: '个税', statusTheme: 'blue', statusText: '申报中' }, 
    ],
    link: '/work/fn-2'
  },
  { 
    id: '3', 
    title: '五险一金', 
    tag: '12月',
    status: 'active', 
    dateLabel: '12-15', 
    detail: '',
    metrics: [
        { label: '预计缴纳', value: '¥98.5k', trend: 'up', trendValue: '1.2%' }
    ],
    link: '/work/hr-4'
  },
  { 
    id: '4', 
    title: '增减员', 
    tag: '12月',
    status: 'pending', 
    dateLabel: '12-25', 
    detail: '',
    metrics: [
        { label: '本月增员', value: '3人' },
        { label: '本月减员', value: '1人' }
    ],
    link: '/work/hr-emp'
  },
  { 
    id: '5', 
    title: '政府补助', 
    tag: '12月',
    status: 'pending', 
    dateLabel: '12-30', 
    detail: '',
    subItems: [
      { label: '稳岗补贴', statusTheme: 'green', statusText: '已到账' },
      { label: '高新认定', statusTheme: 'blue', statusText: '审核中' }
    ],
    link: '/work/srv-subsidy'
  },
];

const Dashboard: React.FC = () => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  // Filter items
  const activeItems = timelineData.filter(item => item.status === 'active' || item.alerts?.some(a => a.type === 'risk'));
  const collapsedViewItems = activeItems.length > 0 ? activeItems : [timelineData[timelineData.length - 1]];

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean, isCompact: boolean) => {
    const hasRisk = item.alerts?.some(a => a.type === 'risk');
    const isActive = item.status === 'active';
    const isCompleted = item.status === 'completed';
    
    return (
      <div key={item.id} className="relative pl-6 pb-6">
        {/* Connector Line */}
        {!isLast && (
          <div className={`absolute left-[9px] top-6 -bottom-1 w-[2px] ${isCompleted ? 'bg-emerald-100' : isActive ? 'bg-blue-100' : 'bg-slate-100'}`}></div>
        )}

        {/* Status Icon */}
        <div className={`absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-all duration-300 ${
            isCompleted ? 'border-emerald-500 text-emerald-500' :
            hasRisk ? 'border-orange-500 text-orange-500' :
            isActive ? 'border-blue-500 text-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' :
            'border-slate-200 text-slate-300'
        }`}>
            {isCompleted ? <CheckCircle2 size={12} fill="currentColor" className="text-white" /> :
            hasRisk ? <AlertTriangle size={10} fill="currentColor" className="text-white" /> :
            isActive ? <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> :
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>}
        </div>

        {/* Content Card */}
        <div className={`group`}>
            {/* Header Line */}
            <div className="flex justify-between items-center mb-2 pl-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-medium text-slate-400">{item.dateLabel}</span>
                <h3 className={`text-sm font-bold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                    {item.title}
                </h3>
                {item.tag && (
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {item.tag}
                    </span>
                )}
              </div>
              
              {isActive && <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">进行中</span>}
            </div>

            {/* Detail Box */}
            <Link to={item.link || '#'} className={`block rounded-2xl p-4 border transition-all active:scale-[0.99] ${
                hasRisk ? 'bg-orange-50/50 border-orange-100' : 
                isActive ? 'bg-white border-blue-100 shadow-[0_4px_12px_-2px_rgba(59,130,246,0.08)]' : 
                'bg-white border-slate-100'
            }`}>
                {/* Metrics Grid */}
                {item.metrics && (
                   <div className="flex items-center gap-6">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                           <p className="text-[10px] text-slate-400 mb-0.5">{m.label}</p>
                           <div className="flex items-end gap-1.5">
                              <span className="text-base font-bold text-slate-900 leading-none font-mono">{m.value}</span>
                              {m.trend && (
                                <div className={`flex items-center text-[9px] font-bold mb-0.5 ${
                                   m.trend === 'up' ? 'text-rose-500' : m.trend === 'down' ? 'text-emerald-500' : 'text-slate-400'
                                }`}>
                                   {m.trend === 'up' ? <ArrowUpRight size={10} strokeWidth={3} /> : 
                                    m.trend === 'down' ? <ArrowDownLeft size={10} strokeWidth={3} /> : 
                                    <Minus size={10} />}
                                   {m.trendValue}
                                </div>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                )}

                {/* Sub Items */}
                {item.subItems && (
                   <div className="space-y-2">
                      {item.subItems.map((sub, sIdx) => {
                         let themeClass = 'text-slate-500';
                         
                         // Icon Selection
                         let Icon = Circle;
                         let iconColor = 'text-slate-300';
                         
                         if (sub.statusTheme === 'green') {
                            themeClass = 'text-emerald-700';
                            Icon = CheckCircle2;
                            iconColor = 'text-emerald-500';
                         } else if (sub.statusTheme === 'blue') {
                            themeClass = 'text-blue-700';
                            Icon = Clock; // Or Loader2 for active
                            iconColor = 'text-blue-500';
                         } else if (sub.statusTheme === 'orange') {
                            themeClass = 'text-orange-700';
                            Icon = AlertCircle;
                            iconColor = 'text-orange-500';
                         }
                         
                         return (
                           <div key={sIdx} className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-2">
                                <Icon size={12} className={iconColor} />
                                <span className={`${themeClass} font-medium`}>{sub.label}</span>
                              </div>
                              {sub.statusText && (
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold bg-white border border-slate-100 flex items-center gap-1 ${themeClass}`}>
                                   {sub.statusTheme === 'blue' && <Loader2 size={8} className="animate-spin"/>}
                                   {sub.statusText}
                                </span>
                              )}
                           </div>
                         )
                      })}
                   </div>
                )}
            </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-[#F8F9FB] pb-8">
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-30 px-6 pt-12 pb-4 bg-[#F8F9FB]/90 backdrop-blur-md border-b border-slate-100/50 transition-all">
        <div className="flex justify-between items-end">
          <div>
             <div className="flex items-center gap-1.5 mb-1 opacity-60">
                <Calendar size={12} className="text-slate-500"/>
                <span className="text-xs font-bold text-slate-500 font-mono tracking-wide">DEC 15, FRI</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">下午好，总经理</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
             <Users size={20} />
          </div>
        </div>
      </header>

      <div className="px-5 space-y-6 mt-6">
        
        {/* 2. Timeline Card */}
        <section className="bg-white rounded-[20px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            {/* Header */}
            <div 
                className="px-6 py-4 border-b border-slate-50 flex justify-between items-center cursor-pointer active:bg-slate-50 transition-colors group"
                onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            >
                <div className="flex items-center gap-4">
                    {/* Circular Progress (Left Aligned with Timeline) */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="#F1F5F9"
                                strokeWidth="3"
                                fill="none"
                            />
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="#3B82F6"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={2 * Math.PI * 16}
                                strokeDashoffset={2 * Math.PI * 16 * (1 - 0.25)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <span className="absolute text-[9px] font-bold text-slate-700 font-mono">25%</span>
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-900 text-base">本月交付进度</h2>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                            <span className="text-blue-600 font-bold">2</span> 项进行中
                        </p>
                    </div>
                </div>
                
                <ChevronDown 
                    size={18} 
                    className={`text-slate-300 transition-transform duration-300 ${isTimelineExpanded ? 'rotate-180' : ''}`} 
                />
            </div>

            {/* Body */}
            <div className="p-6 pb-4">
                {/* Add pl-2.5 to align w-5 icons with w-10 header icon (center to center) */}
                <div className="pl-2.5">
                    {isTimelineExpanded ? (
                        timelineData.map((item, index) => renderTimelineItem(item, index, index === timelineData.length - 1, false))
                    ) : (
                        collapsedViewItems.map((item, index) => renderTimelineItem(item, index, index === collapsedViewItems.length - 1, true))
                    )}
                    
                    {!isTimelineExpanded && collapsedViewItems.length < timelineData.length && (
                         <div className="pl-6">
                            <div className="text-center -mt-2 mb-2 pt-4 border-t border-dashed border-slate-100">
                                <button 
                                    onClick={() => setIsTimelineExpanded(true)}
                                    className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center justify-center gap-1 mx-auto py-2 transition-colors"
                                >
                                    展开剩余节点 <MoreHorizontal size={12}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* 3. Metrics Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1 mb-2">
              <BarChart3 size={18} className="text-slate-400" />
              <h2 className="font-bold text-slate-800 text-sm">经营数据透视</h2>
          </div>

          {/* Cash Flow Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                           <Wallet size={20} strokeWidth={2} />
                       </div>
                       <div>
                           <p className="text-xs text-slate-400 font-medium mb-0.5">现金流监控</p>
                           <div className="flex items-center gap-2">
                               <h3 className="text-sm font-bold text-slate-900">银行结余走势</h3>
                               <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                                   <TrendingUp size={10} /> -2.3%
                               </div>
                           </div>
                       </div>
                   </div>
                   <Link to="/work/fn-flow" className="p-2 rounded-full hover:bg-slate-50 text-slate-300 transition-colors">
                      <ChevronRight size={20} />
                   </Link>
              </div>

              <div className="h-32 -mx-2">
                <CashFlowComparisonChart />
              </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
              {/* Expenditure Card */}
              <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-2">
                           <PieChart size={16} className="text-slate-400"/> 
                           <h3 className="text-sm font-bold text-slate-900">12月支出构成</h3>
                       </div>
                       <Link to="/work/fn-5" className="text-xs font-bold text-blue-600">详情</Link>
                  </div>
                  <ExpenditureBreakdownChart />
              </div>

              {/* Personnel Card */}
              <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                       <div>
                          <p className="text-xs text-slate-400 font-medium">在职人员</p>
                          <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xl font-bold text-slate-900 font-mono">32</span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <ArrowUpRight size={10} strokeWidth={3} /> 净增 2
                              </span>
                          </div>
                       </div>
                       <Link to="/work/hr-emp" className="text-slate-300 hover:text-blue-600 transition-colors">
                          <ChevronRight size={20} />
                       </Link>
                  </div>
                  <PersonnelChart />
              </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
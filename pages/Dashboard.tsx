import React, { useState } from 'react';
import ExpenditureBreakdownChart from '../components/charts/ExpenditureBreakdownChart';
import PersonnelChart from '../components/charts/PersonnelChart';
import CashFlowComparisonChart from '../components/charts/CashFlowComparisonChart';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowRight, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown,
  ChevronUp,
  Users,
  BarChart3,
  AlertOctagon,
  Info,
  PieChart,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Loader2,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Alert {
  type: 'action' | 'risk';
  text: string;
  link: string;
}

interface SubItem {
  label: string;
  statusText?: string; // Optional now
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
  tag?: string; // Service Month Tag
  status: 'completed' | 'active' | 'pending';
  dateLabel: string; // Deadline Date
  detail: string; // Main description text
  metrics?: Metric[]; // New: For structured numerical data
  subItems?: SubItem[]; // Optional list for structured data like subsidies
  alerts?: Alert[];
  link?: string; // Target for "View Detail"
}

// Updated Timeline Data
const timelineData: TimelineItem[] = [
  { 
    id: '1', 
    title: '薪酬发放', 
    tag: '11月',
    status: 'completed', 
    dateLabel: '12月10日', 
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
    dateLabel: '12月15日', 
    detail: '',
    subItems: [
      { label: '增值税', statusTheme: 'green' },
      { label: '城建及教育附加', statusTheme: 'gray' },
      { label: '印花税', statusTheme: 'orange' }, 
      { label: '个人所得税', statusTheme: 'blue' }, 
    ],
    link: '/work/fn-2'
  },
  { 
    id: '3', 
    title: '五险一金缴纳', 
    tag: '12月',
    status: 'active', 
    dateLabel: '12月15日', 
    detail: '',
    metrics: [
        { label: '五险缴纳', value: '¥72.5k', trend: 'up', trendValue: '1.2%' },
        { label: '一金缴纳', value: '¥26.0k', trend: 'neutral', trendValue: '0%' }
    ],
    link: '/work/hr-4'
  },
  { 
    id: '4', 
    title: '增减员与招退工', 
    tag: '12月',
    status: 'pending', 
    dateLabel: '12月25日', 
    detail: '',
    metrics: [
        { label: '本月增员', value: '3人', trend: 'neutral', trendValue: '' },
        { label: '本月减员', value: '1人', trend: 'neutral', trendValue: '' }
    ],
    subItems: [
      { label: '招退工办理', statusTheme: 'gray' },
      { label: '五险一金增减员申报', statusTheme: 'gray' }
    ],
    link: '/work/hr-emp'
  },
  { 
    id: '5', 
    title: '政府补助申请', 
    tag: '12月',
    status: 'pending', 
    dateLabel: '12月30日', 
    detail: '',
    subItems: [
      { label: '稳岗补贴', statusTheme: 'green' },
      { label: '高新认定', statusTheme: 'orange' }
    ],
    link: '/work/srv-subsidy'
  },
];

const Dashboard: React.FC = () => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  // Filter items for collapsed view: Only show Active or Risky items
  const activeItems = timelineData.filter(item => item.status === 'active' || item.alerts?.some(a => a.type === 'risk'));
  // If no active items, show the first pending, or just the last completed
  const collapsedViewItems = activeItems.length > 0 ? activeItems : [timelineData[timelineData.length - 1]];

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean, isCompact: boolean) => {
    const hasRisk = item.alerts?.some(a => a.type === 'risk');
    const hasAction = item.alerts?.some(a => a.type === 'action');
    const isActive = item.status === 'active';
    
    return (
      <div key={item.id} className={`relative pl-8 ${isLast ? '' : 'pb-8'}`}>
        {/* Connector Line */}
        {!isLast && (
          <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gray-100"></div>
        )}

        {/* Status Icon */}
        <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-[2px] z-10 bg-white ${
            item.status === 'completed' ? 'border-emerald-500 text-emerald-500' :
            hasRisk ? 'border-orange-500 text-orange-500' :
            hasAction ? 'border-rose-500 text-rose-500' :
            isActive ? 'border-blue-500 text-blue-500' :
            'border-gray-200 text-gray-300'
        }`}>
            {item.status === 'completed' ? <CheckCircle2 size={14} fill="currentColor" className="text-white" /> :
            hasRisk ? <AlertTriangle size={12} fill="currentColor" className="text-white" /> :
            hasAction ? <FileText size={12} fill="currentColor" className="text-white" /> :
            isActive ? <Clock size={14} /> :
            <Circle size={8} fill="currentColor" className="text-gray-100" />}
        </div>

        {/* Content */}
        <div>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">
                    {item.title}
                </h3>
                {item.tag && (
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                        {item.tag}
                    </span>
                )}
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  item.status === 'completed' ? 'text-emerald-700 bg-emerald-50' :
                  hasAction ? 'text-rose-600 bg-rose-50' :
                  hasRisk ? 'text-orange-600 bg-orange-50' :
                  isActive ? 'text-blue-600 bg-blue-50' :
                  'text-gray-400 bg-gray-50'
              }`}>
                  <CalendarDays size={10} />
                  {item.dateLabel}
              </span>
            </div>

            <div className={`rounded-xl p-3.5 border transition-colors ${
                hasRisk ? 'bg-orange-50 border-orange-200' : 
                isActive ? 'bg-blue-50 border-blue-200 shadow-sm' : 
                'bg-gray-50/50 border-gray-100'
            }`}>
                {item.detail && (
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {item.detail}
                  </p>
                )}

                {/* Metrics Row (Redesigned: No containers, clean typography) */}
                {item.metrics && (
                   <div className="flex items-center gap-6 mt-2 mb-3">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                           <p className="text-[10px] text-gray-400 mb-0.5">{m.label}</p>
                           <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-bold text-gray-900 leading-none font-mono tracking-tight">{m.value}</span>
                              {m.trend && (
                                <div className={`flex items-center text-[10px] font-bold ${
                                   m.trend === 'up' ? 'text-rose-600' : m.trend === 'down' ? 'text-emerald-600' : 'text-gray-400'
                                }`}>
                                   {m.trend === 'up' ? <ArrowUpRight size={12} strokeWidth={3} /> : 
                                    m.trend === 'down' ? <ArrowDownLeft size={12} strokeWidth={3} /> : 
                                    <Minus size={12} />}
                                   {m.trendValue}
                                </div>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                )}

                {/* Sub Items (e.g. Tax Status / Subsidy List) */}
                {item.subItems && (
                   <div className="mt-2 space-y-2 mb-3">
                      {item.subItems.map((sub, sIdx) => {
                         let StatusIcon = Circle;
                         let themeClass = 'bg-gray-100 text-gray-400 border-gray-200';
                         let iconClass = '';

                         if (sub.statusTheme === 'green') {
                            themeClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
                            StatusIcon = CheckCircle2;
                         } else if (sub.statusTheme === 'blue') {
                            themeClass = 'bg-blue-100 text-blue-600 border-blue-200';
                            StatusIcon = Loader2;
                            iconClass = 'animate-spin';
                         } else if (sub.statusTheme === 'orange') {
                            themeClass = 'bg-orange-50 text-orange-600 border-orange-100';
                            StatusIcon = AlertCircle;
                         } else {
                            // gray
                            StatusIcon = Clock;
                         }
                         
                         return (
                           <div key={sIdx} className={`flex justify-between items-center text-xs pl-2 border-l-2 ${isActive ? 'border-blue-200' : 'border-gray-100'}`}>
                              <span className="text-gray-700 font-medium">{sub.label}</span>
                              
                              {/* If statusText exists, show badge with text. If NOT, show icon only (as requested for Tax) */}
                              {sub.statusText ? (
                                <span className={`text-[10px] px-2 py-0.5 rounded border ${themeClass} flex items-center gap-1.5`}>
                                   <StatusIcon size={10} className={iconClass} />
                                   {sub.statusText}
                                </span>
                              ) : (
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${themeClass} ${isActive && sub.statusTheme === 'blue' ? 'bg-white' : ''}`}>
                                   <StatusIcon size={12} className={iconClass} strokeWidth={2.5} />
                                </div>
                              )}
                           </div>
                         )
                      })}
                   </div>
                )}

                {/* Alerts Integration */}
                {item.alerts && item.alerts.length > 0 && (
                    <div className="space-y-2 mb-2">
                    {item.alerts.map((alert, idx) => (
                        <Link to={alert.link} key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                            alert.type === 'risk' 
                            ? 'bg-white border-orange-200 text-orange-700 shadow-sm' 
                            : 'bg-white border-rose-200 text-rose-600 shadow-sm'
                        }`}>
                            <div className="flex items-center gap-2">
                              {alert.type === 'risk' ? <AlertTriangle size={14} /> : <AlertCircle size={14} />}
                              <span>{alert.text}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-40" />
                        </Link>
                    ))}
                    </div>
                )}

                {/* Generic View Link (Replaces Primary Button) */}
                {item.link && (
                    <div className={`flex justify-end mt-2 pt-2 border-t border-dashed ${isActive ? 'border-blue-200' : 'border-gray-100/50'}`}>
                       <Link to={item.link} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 active:opacity-60 transition-colors">
                          查看详情 <ChevronRight size={12} />
                       </Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-[#f8f9fa] pb-8">
      {/* 1. Header: Clean White */}
      <header className="bg-white sticky top-0 z-20 px-5 pt-10 pb-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border-b border-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5 active:opacity-60 transition-opacity cursor-pointer text-gray-900">
              <h1 className="text-lg font-bold tracking-tight">千机科技</h1>
              <ChevronDown size={18} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5 ml-0.5">下午好，总经理</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
             <Users size={18} />
          </div>
        </div>
      </header>

      <div className="px-5 space-y-6 mt-6">
        
        {/* 2. Timeline: Cleaner Container */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div 
            className="px-5 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer active:bg-gray-50 transition-colors"
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              <h2 className="font-bold text-gray-900 text-sm">本月交付进度</h2>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right">
                  <span className="text-xs text-gray-400 mr-2 font-medium">整体进度</span>
                  <span className="text-lg font-bold text-blue-600 font-mono">25%</span>
               </div>
               {isTimelineExpanded ? <ChevronUp size={16} className="text-gray-300"/> : <ChevronDown size={16} className="text-gray-300"/>}
            </div>
          </div>
          
          {/* Subtle Progress Bar */}
          <div className="h-[2px] w-full bg-gray-50">
               <div className="h-full bg-blue-600 w-1/4 shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
          </div>

          <div className="p-6">
             {isTimelineExpanded ? (
                 timelineData.map((item, index) => renderTimelineItem(item, index, index === timelineData.length - 1, false))
             ) : (
                 <>
                   <div className="text-xs text-gray-400 mb-5 font-medium flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-orange-500"/> 
                      <span className="text-gray-600">当前需关注事项</span>
                   </div>
                   {collapsedViewItems.map((item, index) => renderTimelineItem(item, index, index === collapsedViewItems.length - 1, true))}
                   {collapsedViewItems.length < timelineData.length && (
                      <div 
                          className="mt-2 text-center"
                          onClick={() => setIsTimelineExpanded(true)}
                      >
                          <span className="text-xs text-blue-600 font-medium cursor-pointer py-1.5 px-4 bg-blue-50/50 rounded-full hover:bg-blue-50 transition-colors">
                            查看全部节点
                          </span>
                      </div>
                   )}
                 </>
             )}
          </div>
        </section>

        {/* 3. Reports Area */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
              <BarChart3 size={18} className="text-gray-500" />
              <h2 className="font-bold text-gray-800 text-sm">经营数据透视</h2>
          </div>

          <div className="grid gap-4">

              {/* NEW: Cash Flow Comparison Chart */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-2">
                           <TrendingUp size={18} className="text-gray-700"/> 
                           <h3 className="text-base font-bold text-gray-900">银行现金环比走势</h3>
                       </div>
                       <Link to="/work/fn-flow" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                          <ChevronRight size={16} />
                       </Link>
                  </div>
                  
                  {/* Comparison Summary */}
                  <div className="flex items-center gap-3 mb-2 px-1">
                       <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-rose-600 tracking-tight">-2.3%</span>
                       </div>
                       <span className="text-xs text-gray-400">较上月同期 (15日)</span>
                  </div>

                  <CashFlowComparisonChart />
                  <div className="flex gap-4 mt-2 justify-center">
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> 本月 (实线)
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span> 上月 (虚线)
                    </p>
                  </div>
              </div>
              
              {/* Card 1: Expenditure Breakdown */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-2">
                           <PieChart size={18} className="text-gray-700"/> 
                           <h3 className="text-base font-bold text-gray-900">12月支出构成</h3>
                       </div>
                       <Link to="/work/fn-5" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                          <ChevronRight size={16} />
                       </Link>
                  </div>
                  <ExpenditureBreakdownChart />
              </div>

              {/* Tax Limit Monitoring Removed as requested */}

              {/* Card 3: Personnel Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                       <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">当前在职人员</p>
                          <div className="flex items-baseline gap-2">
                              <p className="text-xl font-bold text-gray-900 tracking-tight">32 <span className="text-sm font-normal text-gray-400">人</span></p>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                <ArrowUpRight size={10} strokeWidth={3} /> 3
                              </span>
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 flex items-center gap-0.5">
                                <ArrowDownLeft size={10} strokeWidth={3} /> 1
                              </span>
                          </div>
                       </div>
                       <Link to="/work/hr-emp" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                          <ChevronRight size={16} />
                       </Link>
                  </div>
                  
                  <PersonnelChart />
                  <p className="text-center text-[10px] text-gray-300 mt-2 font-medium">近4个月人员规模趋势</p>
              </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;

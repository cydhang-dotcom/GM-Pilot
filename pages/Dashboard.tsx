import React, { useState } from 'react';
import ExpenditureBreakdownChart from '../components/charts/ExpenditureBreakdownChart';
import PersonnelChart from '../components/charts/PersonnelChart';
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
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Alert {
  type: 'action' | 'risk';
  text: string;
  link: string;
}

interface TimelineItem {
  id: string;
  title: string;
  tag?: string;
  status: 'completed' | 'active' | 'pending';
  dateLabel: string;
  detail: string;
  alerts?: Alert[];
  primaryAction?: {
    label: string;
    link: string;
  };
}

// --- Tax Limit Data & Helpers ---
interface LimitItem {
  id: string;
  name: string;
  status: 'critical' | 'warning' | 'safe';
  percent: number;
  used: string;
  limit: string;
  desc: string;
}

const taxLimitData: LimitItem[] = [
  {
    id: '1',
    name: '业务招待费',
    status: 'critical',
    percent: 105,
    used: '48k',
    limit: '45.6k',
    desc: '已超限额，需纳税调整'
  },
  {
    id: '2',
    name: '职工福利费',
    status: 'warning',
    percent: 98,
    used: '138k',
    limit: '140k',
    desc: '接近工资总额 14% 红线'
  },
  {
    id: '3',
    name: '广告宣传费',
    status: 'safe',
    percent: 25,
    used: '120k',
    limit: '450k',
    desc: '额度充足'
  },
  {
    id: '4',
    name: '职工教育经费',
    status: 'safe',
    percent: 15,
    used: '12k',
    limit: '80k',
    desc: '额度充足'
  }
];

const timelineData: TimelineItem[] = [
  { 
    id: '1', 
    title: '社保公积金', 
    status: 'completed', 
    dateLabel: '已验收', 
    detail: '本月增员 3 人，减员 1 人，外包已办理完毕。',
  },
  { 
    id: '2', 
    title: '薪酬发放', 
    tag: '12月',
    status: 'active', 
    dateLabel: '截止今日 18:00', 
    detail: '总额 ¥425,000.00，涉及 32 人。请核对发放明细。',
    primaryAction: {
      label: '去确认发放',
      link: '/inbox'
    }
  },
  { 
    id: '3', 
    title: '个税申报', 
    status: 'active', 
    dateLabel: '申报中', 
    detail: '正计算专项附加扣除，预计明日出结果。',
  },
  { 
    id: '4', 
    title: '本期报税', 
    status: 'pending', 
    dateLabel: '预计 12/15 开启', 
    detail: '等待财务上传月度费用单据。',
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
            item.status === 'active' ? 'border-blue-500 text-blue-500' :
            'border-gray-200 text-gray-300'
        }`}>
            {item.status === 'completed' ? <CheckCircle2 size={14} fill="currentColor" className="text-white" /> :
            hasRisk ? <AlertTriangle size={12} fill="currentColor" className="text-white" /> :
            hasAction ? <FileText size={12} fill="currentColor" className="text-white" /> :
            item.status === 'active' ? <Clock size={14} /> :
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
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                        {item.tag}
                    </span>
                )}
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  item.status === 'completed' ? 'text-emerald-700 bg-emerald-50' :
                  hasAction ? 'text-rose-600 bg-rose-50' :
                  hasRisk ? 'text-orange-600 bg-orange-50' :
                  item.status === 'active' ? 'text-blue-600 bg-blue-50' :
                  'text-gray-400 bg-gray-50'
              }`}>
                  {item.dateLabel}
              </span>
            </div>

            <div className={`rounded-xl p-3.5 border transition-colors ${
                hasRisk ? 'bg-orange-50/50 border-orange-100' : 'bg-gray-50/50 border-gray-100'
            }`}>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {item.detail}
                </p>

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

                {item.primaryAction && (
                    <Link to={item.primaryAction.link} className="inline-flex w-full items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg shadow-sm shadow-blue-200 active:bg-blue-700 transition-colors mt-1">
                      {item.primaryAction.label} <ArrowRight size={12} />
                    </Link>
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
              
              {/* Card 1: Expenditure Breakdown */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                       <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">本月支出合计</p>
                          <p className="text-3xl font-bold text-gray-900 tracking-tight font-mono">¥ 482,000</p>
                       </div>
                       <Link to="/work/fn-5" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                          <ChevronRight size={16} />
                       </Link>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                       <PieChart size={16} className="text-gray-400"/> 
                       <h3 className="text-sm font-bold text-gray-800">支出构成</h3>
                  </div>
                  <ExpenditureBreakdownChart />
              </div>

              {/* Card 2: Tax Limit Monitoring (Refined) */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                          <AlertOctagon size={16} className="text-gray-500"/> 税前扣除限额监控
                      </h3>
                      <Link to="/work/ot-1" className="text-xs font-medium text-gray-400 hover:text-blue-600 flex items-center transition-colors">
                          政策解读 <ChevronRight size={14}/>
                      </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                      {taxLimitData.map((item) => {
                         const isCritical = item.status === 'critical';
                         const isWarning = item.status === 'warning';
                         
                         const barColor = isCritical ? 'bg-rose-500' : isWarning ? 'bg-orange-500' : 'bg-emerald-500';
                         const textColor = isCritical ? 'text-rose-600' : isWarning ? 'text-orange-600' : 'text-emerald-600';
                         // Subtle background only for alerts to keep it clean
                         const containerClass = isCritical 
                           ? 'bg-rose-50/40 border-rose-100' 
                           : isWarning 
                           ? 'bg-orange-50/40 border-orange-100' 
                           : 'bg-white border-gray-100';

                         return (
                           <div key={item.id} className={`rounded-xl border p-3 flex flex-col justify-between h-24 ${containerClass}`}>
                              {/* Header */}
                              <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs font-bold text-gray-700 leading-tight">{item.name}</span>
                                  <span className={`text-xs font-bold font-mono ${textColor}`}>{item.percent}%</span>
                              </div>
                              
                              {/* Progress & Stats */}
                              <div className="mt-auto">
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                                    <div 
                                      className={`h-full rounded-full ${barColor}`} 
                                      style={{ width: `${Math.min(item.percent, 100)}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                     <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-gray-400">已用</span>
                                        <span className="text-[10px] font-bold text-gray-600 font-mono">{item.used}</span>
                                     </div>
                                     <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-gray-400">/</span>
                                        <span className="text-[10px] font-medium text-gray-400 font-mono">{item.limit}</span>
                                     </div>
                                </div>
                              </div>
                           </div>
                         );
                      })}
                  </div>
              </div>

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
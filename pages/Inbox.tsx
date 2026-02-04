
import React, { useState } from 'react';
import { Task, TaskType } from '../types';
import InboxSalaryDetail from './inbox/InboxSalaryDetail';
import OnboardingProcess from './inbox/OnboardingProcess';
import { 
  CheckCircle2, Clock, Banknote, 
  ChevronRight, Play, Activity, ArrowRight,
  ChevronDown, MoreHorizontal, UserPlus, Stamp, ReceiptText, ArrowUpRight, QrCode
} from 'lucide-react';

const SALARY_TASK: Task = { 
  id: 'u_salary', 
  title: '12月工资发放确认', 
  description: '总额 ¥425,000.00', 
  deadline: '今天 18:00', 
  type: TaskType.SUBMIT_DATA, 
  priority: 'HIGH', 
  source: 'Finance Outsourcing' 
};

const mockTasks: Task[] = [
  { id: 'b_service', title: '12月 platform 服务费', description: '待支付 ¥ 5,800.00', deadline: '2023-12-25', type: TaskType.CONFIRM, priority: 'HIGH', source: 'HR Outsourcing' },
];

interface SubItem {
  label: string;
  statusText?: string;
  statusTheme: 'blue' | 'orange' | 'green' | 'gray';
}

interface Metric {
  label: string;
  value: string;
}

interface TimelineItem {
  id: string;
  title: string;
  monthTag?: string;
  status: 'completed' | 'active' | 'pending';
  dateLabel: string;
  metrics?: Metric[];
  subItems?: SubItem[];
  taskData?: Task; 
}

const timelineData: TimelineItem[] = [
  { id: '1', title: '薪酬发放', monthTag: '12月', status: 'active', dateLabel: '12-10', metrics: [{ label: '实发总额', value: '¥425k' }, { label: '发放人数', value: '32人' }], taskData: SALARY_TASK },
  { id: '2', title: '税务申报', monthTag: '12月', status: 'active', dateLabel: '12-15', subItems: [{ label: '增值税', statusTheme: 'green', statusText: '已缴款' }, { label: '个税', statusTheme: 'blue', statusText: '申报中' }] },
  { id: '3', title: '五险一金', monthTag: '12月', status: 'pending', dateLabel: '12-15', metrics: [{ label: '社保缴纳', value: '¥68.5k' }, { label: '公积金', value: '¥30.0k' }] },
  { id: 'subsidy', title: '政府补贴', monthTag: 'Q4', status: 'pending', dateLabel: '12-20', metrics: [{ label: '稳岗补贴', value: '¥12.5k' }], subItems: [{ label: '申请进度', statusTheme: 'orange', statusText: '公示中' }] },
  { id: '4', title: '增减员', monthTag: '12月', status: 'pending', dateLabel: '12-25', metrics: [{ label: '本月增员', value: '3人' }] }
];

const Inbox: React.FC = () => {
    const [viewMode, setViewMode] = useState<'main' | 'salary' | 'onboarding'>('main');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

    const handleOpenSalary = (task: Task) => {
        setSelectedTask(task);
        setViewMode('salary');
    };

    if (viewMode === 'salary' && selectedTask) return <InboxSalaryDetail task={selectedTask} onBack={() => setViewMode('main')} />;
    if (viewMode === 'onboarding') return <OnboardingProcess onBack={() => setViewMode('main')} />;

    const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean) => {
        const isActive = item.status === 'active';
        const isCompleted = item.status === 'completed';
        const hasTask = !!item.taskData;

        return (
          <div key={item.id} className="relative pb-10">
            {/* Timeline Vertical Line - Thinner & Lighter */}
            {!isLast && <div className={`absolute left-5 top-8 bottom-0 w-[1.5px] -translate-x-1/2 ${isCompleted ? 'bg-emerald-100' : isActive ? 'bg-indigo-50' : 'bg-slate-100'}`}></div>}
            
            {/* Marker - Refined & Lighter */}
            <div className="absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center z-10">
                {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm"><CheckCircle2 size={12} strokeWidth={2.5} /></div>
                ) : isActive ? (
                    <div className="relative flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border border-indigo-100 bg-white shadow-sm"></div>
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-100 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div></div>
                )}
            </div>

            <div className="pl-14">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 tracking-tight">{item.dateLabel}</span>
                    <h3 className={`text-sm font-bold ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{item.title}</h3>
                    {item.monthTag && <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium border ${isActive ? 'bg-indigo-50/50 text-indigo-500 border-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{item.monthTag}</span>}
                  </div>
                  {hasTask && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50/80 px-2 py-1 rounded-lg flex items-center gap-1 border border-emerald-100/50 shadow-sm"><Play size={8} fill="currentColor"/> 待确认</span>}
                </div>

                {/* Card Section - Updated: Removed colored borders, using deep shadows for pop */}
                <div onClick={() => hasTask ? handleOpenSalary(item.taskData!) : null} className={`rounded-[24px] p-5 border transition-all duration-500 active:scale-[0.98] cursor-pointer relative overflow-hidden group ${
                    hasTask 
                    ? 'bg-white border-slate-100 shadow-[0_16px_40px_-12px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_48px_-12px_rgba(16,185,129,0.25)]' 
                    : isActive 
                    ? 'bg-white border-slate-100 shadow-[0_12px_32px_-8px_rgba(148,163,184,0.15)] hover:shadow-[0_16px_40px_-8px_rgba(148,163,184,0.2)]' 
                    : 'bg-slate-50/40 border-slate-50 opacity-60 grayscale-[0.5]'
                }`}>
                    <div className="flex justify-between items-center relative z-10">
                        {item.metrics && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-5">
                                    {item.metrics.map((m, idx) => (
                                        <div key={idx} className="flex flex-col justify-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{m.label}</p>
                                            <p className={`text-base font-bold font-mono tracking-tight ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>{m.value}</p>
                                        </div>
                                    ))}
                                </div>
                                {hasTask && <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg shadow-emerald-200/50 flex items-center gap-1 hover:bg-emerald-600 transition-colors">确认发放<ArrowRight size={10} strokeWidth={2.5} /></div>}
                            </div>
                        )}
                        {item.subItems && (
                            <div className="flex flex-col gap-2.5 w-full">
                                {item.subItems.map((sub, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${sub.statusTheme === 'green' ? 'bg-emerald-400' : sub.statusTheme === 'blue' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
                                            <span className="text-slate-600 font-bold">{sub.label}</span>
                                        </div>
                                        <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded-md ${sub.statusTheme === 'green' ? 'text-emerald-600 bg-emerald-50' : sub.statusTheme === 'blue' ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50'}`}>{sub.statusText}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {(!item.metrics && !item.subItems) && <ChevronRight size={16} className="text-slate-300" />}
                    </div>
                </div>
            </div>
          </div>
        );
      };

    return (
        <div className="flex flex-col h-full bg-[#F8F9FB]">
            <header className="sticky top-0 z-40 px-6 pt-12 pb-5 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-100 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-1.5 mb-1.5 opacity-60">
                        <Clock size={14} className="text-slate-400"/><span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">Execution Timeline</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tighter">本月任务</h1>
                </div>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-slate-200/60 shadow-sm text-slate-400"><MoreHorizontal size={18} /></div>
            </header>
            
            <div className="px-5 space-y-5 mt-6 pb-24 no-scrollbar overflow-y-auto">
                 {/* Timeline Section */}
                 <section className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors" onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100/50"><Activity size={18} strokeWidth={2.5} /></div>
                            <div><h2 className="font-bold text-slate-800 text-sm tracking-tight">交付履约进度</h2><p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Service Milestones</p></div>
                        </div>
                        <div className={`p-1.5 rounded-full transition-all duration-300 ${isTimelineExpanded ? 'rotate-180 bg-slate-100 text-slate-600' : 'text-slate-300'}`}><ChevronDown size={16} /></div>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="pt-4">{(isTimelineExpanded ? timelineData : timelineData.filter(i => i.status === 'active' || i.taskData)).map((item, index, arr) => renderTimelineItem(item, index, index === arr.length - 1))}</div>
                    </div>
                 </section>
                 
                 {/* Bill Card - Cleaner Look */}
                 <div onClick={() => handleOpenSalary(mockTasks[0])} className="bg-gradient-to-br from-white via-white to-emerald-50/30 border border-emerald-100 rounded-[32px] p-5 shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-between gap-3 group transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/20">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100/50"><ReceiptText size={20} strokeWidth={2}/></div>
                          <div className="min-w-0">
                              <h3 className="font-bold text-slate-800 text-sm truncate">12月平台服务费</h3>
                              <div className="flex items-center gap-2 mt-1"><span className="text-xs font-bold text-emerald-600 font-mono tracking-tight">¥5,800.00</span><div className="w-1 h-1 rounded-full bg-emerald-200"></div><p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">待支付</p></div>
                          </div>
                      </div>
                      <div className="bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-[11px] font-bold shadow-lg shadow-emerald-200/50 flex items-center gap-1 shrink-0 group-hover:bg-emerald-600 transition-colors">立即支付<ArrowUpRight size={12} strokeWidth={2.5}/></div>
                 </div>

                 {/* Onboarding Card */}
                 <div onClick={() => setViewMode('onboarding')} className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer active:scale-[0.99] transition-all group hover:border-indigo-100">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0 border border-indigo-100/50"><UserPlus size={20} strokeWidth={2}/></div>
                      <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-800">入职流程 (Onboarding)</h4>
                          <div className="flex items-center gap-3 mt-1.5">
                              <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> 普通: <span className="text-slate-600 font-bold">2</span></p>
                              <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 扫码: <span className="text-slate-600 font-bold">1</span></p>
                          </div>
                      </div>
                      <div className="flex items-center -space-x-2">
                        <div className="w-7 h-7 rounded-xl bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md border-2 border-white relative z-10">2</div>
                        <div className="w-7 h-7 rounded-xl bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md border-2 border-white relative z-20 flex items-center gap-0.5"><QrCode size={8} />1</div>
                      </div>
                 </div>

                 {/* OA Card */}
                 <div className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer group hover:border-purple-100 active:scale-[0.99] transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 border border-purple-100/50"><Stamp size={20} strokeWidth={2}/></div>
                      <div className="flex-1"><h4 className="text-sm font-bold text-slate-800">OA 流程审批</h4><p className="text-[10px] font-medium text-slate-400 mt-1">1 笔待处理 · 张伟 (年假)</p></div>
                      <div className="w-7 h-7 rounded-xl bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md shadow-rose-200 border-2 border-white animate-pulse">1</div>
                 </div>
            </div>
        </div>
    );
};

export default Inbox;

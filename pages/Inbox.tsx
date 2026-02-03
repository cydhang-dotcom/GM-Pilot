
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
            {!isLast && <div className={`absolute left-5 top-8 bottom-0 w-[1.5px] -translate-x-1/2 ${isCompleted ? 'bg-emerald-200' : isActive ? 'bg-indigo-100' : 'bg-slate-100'}`}></div>}
            <div className="absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center z-10">
                {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center text-white"><CheckCircle2 size={12} strokeWidth={3} /></div>
                ) : isActive ? (
                    <div className="relative flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-indigo-600 bg-white"></div>
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div></div>
                )}
            </div>
            <div className="pl-14">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-mono font-black text-slate-400 tracking-tighter">{item.dateLabel}</span>
                    <h3 className={`text-base font-black ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{item.title}</h3>
                    {item.monthTag && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${isActive ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{item.monthTag}</span>}
                  </div>
                  {hasTask && <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1 border border-emerald-100/50"><Play size={8} fill="currentColor"/> 待确认</span>}
                </div>
                <div onClick={() => hasTask ? handleOpenSalary(item.taskData!) : null} className={`rounded-[28px] p-5 border transition-all active:scale-[0.98] cursor-pointer ${hasTask ? 'bg-white border-emerald-200/60 shadow-lg' : isActive ? 'bg-white border-slate-100 shadow-sm' : 'bg-white/50 border-slate-50 opacity-60'}`}>
                    <div className="flex justify-between items-center">
                        {item.metrics && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-4">
                                    {item.metrics.map((m, idx) => (
                                        <div key={idx} className="flex flex-col justify-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">{m.label}</p>
                                            <p className={`text-lg font-black font-mono tracking-tighter ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{m.value}</p>
                                        </div>
                                    ))}
                                </div>
                                {hasTask && <div className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow-md flex items-center gap-1">确认发放<ArrowRight size={12} strokeWidth={2.5} /></div>}
                            </div>
                        )}
                        {item.subItems && (
                            <div className="flex flex-col gap-2.5 w-full">
                                {item.subItems.map((sub, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${sub.statusTheme === 'green' ? 'bg-emerald-500' : sub.statusTheme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                            <span className="text-slate-700 font-black">{sub.label}</span>
                                        </div>
                                        <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded-md ${sub.statusTheme === 'green' ? 'text-emerald-500 bg-emerald-50' : sub.statusTheme === 'blue' ? 'text-blue-500 bg-blue-50' : 'text-orange-500 bg-orange-50'}`}>{sub.statusText}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {(!item.metrics && !item.subItems) && <ChevronRight size={18} className="text-gray-300" />}
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
                        <Clock size={14} className="text-slate-500"/><span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">Execution Timeline</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter">本月任务</h1>
                </div>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><MoreHorizontal size={18} className="text-slate-400" /></div>
            </header>
            <div className="px-5 space-y-6 mt-6 pb-24 no-scrollbar overflow-y-auto">
                 <section className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-6 flex justify-between items-center cursor-pointer" onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><Activity size={18} strokeWidth={2.5} /></div>
                            <div><h2 className="font-black text-slate-900 text-sm tracking-tight">交付履约进度</h2><p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Service Milestones</p></div>
                        </div>
                        <div className={`p-1 rounded-full transition-transform ${isTimelineExpanded ? 'rotate-180 bg-slate-50' : ''}`}><ChevronDown size={18} className="text-slate-300" /></div>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="pt-2">{(isTimelineExpanded ? timelineData : timelineData.filter(i => i.status === 'active' || i.taskData)).map((item, index, arr) => renderTimelineItem(item, index, index === arr.length - 1))}</div>
                    </div>
                 </section>
                 
                 <div onClick={() => handleOpenSalary(mockTasks[0])} className="bg-gradient-to-b from-white to-emerald-50/60 border border-emerald-100 rounded-[32px] p-6 shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-between gap-3 group">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0"><ReceiptText size={24} /></div>
                          <div className="min-w-0">
                              <h3 className="font-black text-slate-900 text-sm truncate">12月平台服务费</h3>
                              <div className="flex items-center gap-2 mt-1"><span className="text-xs font-black text-emerald-600 font-mono tracking-tighter">¥5,800.00</span><div className="w-1 h-1 rounded-full bg-emerald-200"></div><p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">待支付</p></div>
                          </div>
                      </div>
                      <div className="bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-[11px] font-black shadow-lg flex items-center gap-1 shrink-0">立即支付<ArrowUpRight size={12} /></div>
                 </div>

                 <div onClick={() => setViewMode('onboarding')} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer active:scale-[0.99] transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><UserPlus size={20}/></div>
                      <div className="flex-1">
                          <h4 className="text-sm font-black text-slate-900">入职流程 (Onboarding)</h4>
                          <div className="flex items-center gap-3 mt-1">
                              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 普通: 2</p>
                              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> 扫码: 1</p>
                          </div>
                      </div>
                      <div className="flex items-center -space-x-2">
                        <div className="w-7 h-7 rounded-xl bg-blue-500 text-white text-[11px] flex items-center justify-center font-black shadow-lg border-2 border-white relative z-10">2</div>
                        <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-[11px] flex items-center justify-center font-black shadow-lg border-2 border-white relative z-20 flex items-center gap-0.5"><QrCode size={8} />1</div>
                      </div>
                 </div>

                 <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Stamp size={20}/></div>
                      <div className="flex-1"><h4 className="text-sm font-black text-slate-900">OA 流程审批</h4><p className="text-[10px] font-bold text-slate-400 mt-0.5">1 笔待处理 · 张伟 (年假)</p></div>
                      <div className="w-7 h-7 rounded-xl bg-rose-500 text-white text-[11px] flex items-center justify-center font-black shadow-lg animate-pulse">1</div>
                 </div>
            </div>
        </div>
    );
};

export default Inbox;

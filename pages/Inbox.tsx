
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Task, TaskType } from '../types';
import { DetailLayout } from '../components/DetailLayout';
import { 
  CheckCircle2, Clock, CreditCard, Stamp, Banknote, 
  ArrowLeft, ChevronRight, UserPlus, FileCheck, Briefcase,
  AlertTriangle, Wallet, Circle, AlertCircle, Loader2,
  ArrowUpRight, ArrowDownLeft, Minus, MoreHorizontal, ChevronDown,
  Play, Activity, ArrowRight, ShieldCheck, Users, Info, Landmark, Gift,
  ReceiptText
} from 'lucide-react';

// --- TASK CONSTANTS ---

const SALARY_TASK: Task = { 
  id: 'u_salary', 
  title: '12月工资发放确认', 
  description: '总额 ¥425,000.00', 
  deadline: '今天 18:00', 
  type: TaskType.SUBMIT_DATA, 
  priority: 'HIGH', 
  source: 'Finance Outsourcing' 
};

// --- MOCK TASKS DATA ---
const mockTasks: Task[] = [
  { id: 'b_service', title: '12月平台服务费', description: '待支付 ¥ 5,800.00', deadline: '2023-12-25', type: TaskType.CONFIRM, priority: 'HIGH', source: 'HR Outsourcing' },
];

// --- TIMELINE TYPES & DATA ---

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
  taskData?: Task; 
  link?: string;
  icon?: any;
}

const timelineData: TimelineItem[] = [
  { 
    id: '1', 
    title: '薪酬发放', 
    status: 'active', 
    dateLabel: '12-10', 
    detail: '',
    metrics: [
      { label: '实发总额', value: '¥425k' },
      { label: '发放人数', value: '32人' }
    ],
    taskData: SALARY_TASK 
  },
  { 
    id: '2', 
    title: '税务申报', 
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
    status: 'pending', 
    dateLabel: '12-15', 
    detail: '',
    metrics: [
        { label: '社保缴纳', value: '¥68.5k' },
        { label: '公积金', value: '¥30.0k' }
    ],
    link: '/work/hr-4'
  },
  { 
    id: 'subsidy', 
    title: '政府补贴', 
    status: 'pending', 
    dateLabel: '12-20', 
    detail: '',
    metrics: [
        { label: '稳岗补贴', value: '¥12.5k' }
    ],
    subItems: [
        { label: '申请进度', statusTheme: 'orange', statusText: '公示中' }
    ],
    link: '/work/srv-subsidy'
  },
  { 
    id: '4', 
    title: '增减员', 
    status: 'pending', 
    dateLabel: '12-25', 
    detail: '',
    metrics: [
        { label: '本月增员', value: '3人' }
    ],
    link: '/work/hr-emp'
  }
];

// --- Detail Components ---

const SalaryDetail = ({ task, onBack }: { task: Task, onBack: () => void }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 1500);
    };

    if (isPaid) {
        return (
            <DetailLayout title="支付成功" onBack={onBack}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2">薪酬发放指令已发出</h2>
                    <p className="text-sm text-slate-400 max-w-[240px] leading-relaxed">银行处理中，预计 2 小时内到账。</p>
                    <button onClick={onBack} className="mt-10 px-8 py-3 bg-slate-900 text-white font-black rounded-xl">返回任务中心</button>
                </div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout 
            title="工资发放确认" 
            onBack={onBack}
            tag={{ label: '12月核算', color: 'text-rose-600', bg: 'bg-rose-50' }}
        >
            <div className="space-y-6">
                <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <Banknote size={180} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 mb-2">12月实发工资总额</p>
                        <h2 className="text-4xl font-black font-mono tracking-tighter">¥425,000.00</h2>
                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">覆盖人数</p>
                                <span className="text-lg font-black font-mono">32 人</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">支付账户</p>
                                <span className="text-xs font-black truncate block">招商银行 (8888)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">部门核算明细</h3>
                    <div className="space-y-5">
                        {[
                            { label: '技术部', amount: '280,000.00', percent: 65, color: 'bg-indigo-500' },
                            { label: '市场部', amount: '85,000.00', percent: 20, color: 'bg-emerald-500' },
                            { label: '行政部', amount: '60,000.00', percent: 15, color: 'bg-slate-400' }
                        ].map((dept, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-700">{dept.label}</span>
                                    <span className="text-sm font-black font-mono">¥{dept.amount}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${dept.color}`} style={{ width: `${dept.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto">
                <button 
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl font-black text-sm bg-emerald-600 text-white shadow-xl shadow-emerald-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                    {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <ShieldCheck size={20} />}
                    {isProcessing ? '正在处理指令...' : '确认薪酬发放'}
                </button>
            </div>
        </DetailLayout>
    );
};

// --- Inbox Main Component ---

const Inbox: React.FC = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [activeGroup, setActiveGroup] = useState<'ENTRY' | 'OA' | null>(null);
    const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

    if (selectedTask) return <SalaryDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;

    const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean) => {
        const isActive = item.status === 'active';
        const isCompleted = item.status === 'completed';
        const hasTask = !!item.taskData;

        return (
          <div key={item.id} className="relative pb-10">
            {/* Connector Line - 20px Axis Alignment */}
            {!isLast && (
              <div className={`absolute left-5 top-8 bottom-0 w-[1.5px] -translate-x-1/2 ${
                isCompleted ? 'bg-emerald-200' : isActive ? 'bg-indigo-100' : 'bg-slate-100'
              }`}></div>
            )}
    
            {/* Status Marker - 20px Axis Alignment */}
            <div className="absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center z-10">
                {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] flex items-center justify-center text-white">
                        <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                ) : isActive ? (
                    <div className="relative flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-indigo-600 bg-white shadow-[0_0_12px_rgba(79,70,229,0.25)]"></div>
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
                        <div className="absolute w-10 h-10 rounded-full bg-indigo-400/10 animate-ping"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
                    </div>
                )}
            </div>
    
            {/* Content Body */}
            <div className="pl-14 group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-mono font-black text-slate-400 tracking-tighter">{item.dateLabel}</span>
                    <h3 className={`text-base font-black ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{item.title}</h3>
                  </div>
                  {hasTask && (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1 border border-emerald-100/50">
                        <Play size={8} fill="currentColor"/> 待确认
                    </span>
                  )}
                </div>
    
                {/* Unified Item Card */}
                <div 
                    onClick={() => hasTask ? setSelectedTask(item.taskData!) : null}
                    className={`block rounded-[28px] p-5 border transition-all active:scale-[0.98] cursor-pointer ${
                        hasTask ? 'bg-white border-emerald-200/60 shadow-[0_4px_24px_rgba(16,185,129,0.08)]' : 
                        isActive ? 'bg-white border-slate-100 shadow-sm' : 
                        'bg-white/50 border-slate-50 opacity-60'
                    }`}
                >
                    <div className="flex justify-between items-center">
                        {item.metrics && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-8">
                                    {item.metrics.map((m, idx) => (
                                        <div key={idx}>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{m.label}</p>
                                            <p className={`text-xl font-black font-mono tracking-tighter ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{m.value}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Right Side Action (Salary specific style as per visual prompt) */}
                                {hasTask && (
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center justify-center bg-emerald-600 text-white px-5 py-3 rounded-2xl text-[13px] font-black shadow-[0_8px_20px_rgba(16,185,129,0.25)] active:scale-95 transition-all">
                                            确认发放
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* SubItems (Tax & Subsidy detail style) */}
                        {item.subItems && (
                            <div className="flex flex-col gap-2.5 w-full">
                                {item.subItems.map((sub, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${sub.statusTheme === 'green' ? 'bg-emerald-500' : sub.statusTheme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                            <span className="text-slate-700 font-black">{sub.label}</span>
                                        </div>
                                        <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded-md ${
                                            sub.statusTheme === 'green' ? 'text-emerald-500 bg-emerald-50' : 
                                            sub.statusTheme === 'blue' ? 'text-blue-500 bg-blue-50' : 
                                            'text-orange-500 bg-orange-50'
                                        }`}>{sub.statusText}</span>
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
                        <Clock size={14} className="text-slate-500"/>
                        <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">Execution Timeline</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter">本月任务</h1>
                </div>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <MoreHorizontal size={18} className="text-slate-400" />
                </div>
            </header>
            
            <div className="px-5 space-y-6 mt-6 pb-24 no-scrollbar overflow-y-auto">
                 {/* 1. Milestone Timeline Container */}
                 <section className="bg-white rounded-[32px] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
                    <div 
                        className="px-6 py-6 flex justify-between items-center cursor-pointer"
                        onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                                <Activity size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="font-black text-slate-900 text-sm tracking-tight">交付履约进度</h2>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Service Milestones</p>
                            </div>
                        </div>
                        <div className={`p-1 rounded-full transition-transform ${isTimelineExpanded ? 'rotate-180 bg-slate-50' : ''}`}>
                            <ChevronDown size={18} className="text-slate-300" />
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="pt-2">
                            {(isTimelineExpanded ? timelineData : timelineData.filter(i => i.status === 'active' || i.taskData)).map((item, index, arr) => 
                                renderTimelineItem(item, index, index === arr.length - 1)
                            )}
                        </div>
                    </div>
                 </section>

                 {/* 2. Pinned Bill Card - 高优账单卡片 (采用 Dashboard 翡翠绿配色强化成果感) */}
                 <div onClick={() => setSelectedTask(mockTasks[0])} className="bg-gradient-to-b from-white to-emerald-50/60 border border-emerald-100 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(16,185,129,0.08)] active:scale-[0.99] cursor-pointer flex items-center gap-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-200/50 shrink-0 group-hover:rotate-6 transition-transform">
                        <ReceiptText size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                          <h3 className="font-black text-slate-900 text-sm truncate">12月平台服务费</h3>
                          <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-black text-emerald-600 font-mono tracking-tighter">¥5,800.00</span>
                              <div className="w-1 h-1 rounded-full bg-emerald-200"></div>
                              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">PENDING</p>
                          </div>
                      </div>
                      <ArrowUpRight size={20} className="text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                 </div>

                 {/* 3. Grouped Entry Tasks */}
                 <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-5 active:scale-[0.99] cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <UserPlus size={20}/>
                      </div>
                      <div className="flex-1">
                          <h4 className="text-sm font-black text-slate-900">入职确认任务包</h4>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">3 人待核验 · 技术部/设计部</p>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-blue-600 text-white text-[11px] flex items-center justify-center font-black shadow-lg shadow-blue-100">3</div>
                 </div>

                 {/* 4. Grouped OA Tasks */}
                 <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-5 active:scale-[0.99] cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                        <Stamp size={20}/>
                      </div>
                      <div className="flex-1">
                          <h4 className="text-sm font-black text-slate-900">OA 流程审批</h4>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">1 笔待处理 · 张伟 (年假)</p>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-rose-500 text-white text-[11px] flex items-center justify-center font-black shadow-lg shadow-rose-100 animate-pulse">1</div>
                 </div>
            </div>
        </div>
    );
};

export default Inbox;

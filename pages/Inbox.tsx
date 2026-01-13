import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Task, TaskType } from '../types';
import { DetailLayout } from '../components/DetailLayout';
import { 
  CheckCircle2, Clock, CreditCard, Stamp, Banknote, 
  ArrowLeft, ChevronRight, UserPlus, FileCheck, Briefcase,
  AlertTriangle, Wallet, Circle, AlertCircle, Loader2,
  ArrowUpRight, ArrowDownLeft, Minus, MoreHorizontal, ChevronDown
} from 'lucide-react';

// --- TIMELINE TYPES & DATA (Moved from Dashboard) ---

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

// --- MOCK TASKS DATA ---
const mockTasks: Task[] = [
  // BILLS
  { id: 'b_service', title: '12月平台服务费', description: '待支付 ¥ 5,800.00', deadline: '2023-12-25', type: TaskType.CONFIRM, priority: 'HIGH', source: 'HR Outsourcing' },
  // FINANCE (Salary)
  { id: 'u_salary', title: '12月工资发放确认', description: '总额 ¥425,000.00，涉及 32 人', deadline: '今天 18:00', type: TaskType.SUBMIT_DATA, priority: 'HIGH', source: 'Finance Outsourcing' },
  // OA
  { id: 'o1', title: '报销: 市场部-李娜', description: '11月北京出差差旅费', deadline: '无', type: TaskType.PROGRESS, priority: 'LOW', source: 'Internal OA' },
];

const mockOAApprovals = [
  { id: 'o1', title: '报销: 市场部-李娜', type: '报销', amount: '3,240.00', desc: '11月北京出差差旅费', user: '李娜', date: '2023-12-05', status: 'PENDING' },
  { id: 'o2', title: '请假: 技术部-张伟', type: '年假', amount: '2.0天', desc: '处理家里私事', user: '张伟', date: '2023-12-06', status: 'PENDING' },
];

const mockEntryTasks = [
  { id: 'e1', candidate: '王强', dept: '技术部', role: '高级工程师', date: '2023-12-12', status: 'WAITING_SIGN', progress: '合同签署中' },
  { id: 'e2', candidate: '陈杰', dept: '设计部', role: 'UI设计师', date: '2023-12-15', status: 'WAITING_DOCS', progress: '材料待归档' },
  { id: 'e3', candidate: '刘思思', dept: '运营部', role: '运营专员', date: '2023-12-20', status: 'WAITING_Review', progress: 'Offer待确认' },
];

// --- Level 3: Task Detail Views ---

// 1. Bill Detail
const BillDetail = ({ task, onBack }: { task: Task, onBack: () => void }) => (
    <DetailLayout title="账单详情" onBack={onBack} tag={{ label: '待支付', color: 'text-orange-600', bg: 'bg-orange-50' }}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
             <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                 <CreditCard size={32} />
             </div>
             <p className="text-xs text-gray-400 mb-2">待支付金额</p>
             <h2 className="text-4xl font-bold font-mono text-gray-900 mb-6">¥5,800.00</h2>
             
             <div className="space-y-4 text-left">
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">账单项目</span>
                     <span className="text-xs font-bold text-gray-900">平台基础服务费</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">服务周期</span>
                     <span className="text-xs font-bold text-gray-900">2023年12月</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">收款方</span>
                     <span className="text-xs font-bold text-gray-900">千机网络科技有限公司</span>
                 </div>
             </div>
        </div>
        <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">
            立即支付
        </button>
    </DetailLayout>
);

// 2. Salary Confirmation Detail (New)
const SalaryDetail = ({ task, onBack }: { task: Task, onBack: () => void }) => (
    <DetailLayout title="工资发放确认" onBack={onBack} tag={{ label: '需确认', color: 'text-orange-600', bg: 'bg-orange-50' }}>
        {/* Main Amount Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mb-4">
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-indigo-200 mb-1">本月实发总额 (32人)</p>
                        <h2 className="text-3xl font-bold font-mono tracking-tight mb-2">¥425,000.00</h2>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Banknote size={20} className="text-white" />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="bg-emerald-500/20 text-emerald-100 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">
                        账户余额充足
                    </span>
                    <span className="text-[10px] text-indigo-200 font-mono">余额: ¥1,240,000.00</span>
                </div>
            </div>
            <Wallet className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">资金构成明细</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">基本工资 & 绩效</span>
                    <span className="text-sm font-bold text-gray-900 font-mono">¥365,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">五险一金 (个人部分)</span>
                    <span className="text-sm font-bold text-gray-900 font-mono">-¥50,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">个人所得税 (代扣)</span>
                    <span className="text-sm font-bold text-gray-900 font-mono">-¥10,000.00</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">企业用工总成本</span>
                    <span className="text-xs font-bold text-gray-400 font-mono">¥485,000.00</span>
                </div>
            </div>
        </div>

        {/* Warning/Notes */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex items-start gap-3">
            <AlertTriangle size={18} className="text-orange-600 shrink-0 mt-0.5" />
            <div>
                <h4 className="text-xs font-bold text-orange-800">风险提示</h4>
                <p className="text-[10px] text-orange-700 mt-1 leading-relaxed">
                    本月有 3 名新入职员工处于试用期，请重点核对薪资基数。
                </p>
                <button className="text-[10px] font-bold text-orange-600 mt-2 underline">
                    查看试用期人员名单
                </button>
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-white text-gray-700 font-bold py-3.5 rounded-xl border border-gray-200 shadow-sm active:scale-[0.98]">
                退回修改
            </button>
            <button className="flex-[2] bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2">
                <CheckCircle2 size={18} /> 确认并发放
            </button>
        </div>
    </DetailLayout>
);

// 3. OA Detail
const OADetail = ({ item, onBack }: { item: any, onBack: () => void }) => (
    <DetailLayout title="审批详情" onBack={onBack}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                     {item.user.charAt(0)}
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-gray-900">{item.user}</h3>
                     <p className="text-xs text-gray-400">发起于 {item.date}</p>
                 </div>
             </div>
             <div className="py-4 border-t border-gray-50">
                 <p className="text-xs text-gray-400 mb-1">申请类型</p>
                 <p className="text-sm font-bold text-gray-900 mb-4">{item.type}</p>
                 <p className="text-xs text-gray-400 mb-1">申请内容</p>
                 <p className="text-2xl font-bold font-mono text-gray-900 mb-4">{item.amount}</p>
                 <p className="text-xs text-gray-400 mb-1">事由</p>
                 <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{item.desc}</p>
             </div>
        </div>
        <div className="flex gap-3">
             <button className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl active:bg-gray-50">驳回</button>
             <button className="flex-[2] py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">同意</button>
        </div>
    </DetailLayout>
);

// 4. Entry Detail
const EntryDetail = ({ item, onBack }: { item: any, onBack: () => void }) => (
    <DetailLayout title="入职确认" onBack={onBack} tag={{ label: '待归档', color: 'text-blue-600', bg: 'bg-blue-50' }}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex items-center gap-4 mb-6 relative z-10">
                 <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold border-4 border-white shadow-sm">
                     {item.candidate.charAt(0)}
                 </div>
                 <div>
                     <h2 className="text-xl font-bold text-gray-900">{item.candidate}</h2>
                     <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <Briefcase size={12}/> {item.dept} · {item.role}
                     </p>
                 </div>
             </div>
             
             <div className="space-y-4 relative z-10">
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">预计入职日期</span>
                     <span className="text-xs font-bold text-gray-900">{item.date}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">合同类型</span>
                     <span className="text-xs font-bold text-gray-900">固定期限 (3年)</span>
                 </div>
             </div>

             <div className="mt-6 bg-gray-50 rounded-xl p-4">
                 <h4 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileCheck size={14} className="text-gray-400"/> 材料核验
                 </h4>
                 <div className="space-y-2">
                     {['Offer 签署件', '身份证复印件', '学历证书', '离职证明'].map((doc, i) => (
                         <div key={i} className="flex items-center justify-between text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-100">
                             <span>{doc}</span>
                             <CheckCircle2 size={14} className="text-emerald-500" />
                         </div>
                     ))}
                 </div>
             </div>
        </div>
        <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">
            确认并归档
        </button>
    </DetailLayout>
);

// --- Level 2: List Views ---

type GroupType = 'ENTRY' | 'OA' | null;

const Inbox: React.FC = () => {
    const [activeGroup, setActiveGroup] = useState<GroupType>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedOA, setSelectedOA] = useState<any>(null);
    const [selectedEntry, setSelectedEntry] = useState<any>(null);
    
    // Timeline State
    const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

    // Detail Navigation Logic
    if (selectedTask) {
        if (selectedTask.id.startsWith('b_')) {
            return <BillDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
        }
        if (selectedTask.id === 'u_salary') {
            return <SalaryDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
        }
        return <BillDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
    }
    
    if (selectedOA) return <OADetail item={selectedOA} onBack={() => setSelectedOA(null)} />;
    if (selectedEntry) return <EntryDetail item={selectedEntry} onBack={() => setSelectedEntry(null)} />;

    // Group Navigation: OA
    if (activeGroup === 'OA') {
        return (
            <div className="flex flex-col h-full bg-[#FAFAFA] animate-slide-in-right">
                <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-3">
                    <button onClick={() => setActiveGroup(null)} className="hover:bg-gray-100 rounded-full p-1"><ArrowLeft size={20}/></button>
                    <h1 className="text-lg font-bold text-gray-900">OA 审批</h1>
                </div>
                <div className="p-5 space-y-3 overflow-y-auto">
                    {mockOAApprovals.map(oa => (
                        <div key={oa.id} onClick={() => setSelectedOA(oa)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99]">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h4 className="text-sm font-bold text-gray-900">{oa.title}</h4>
                                     <p className="text-xs text-gray-400 mt-1">{oa.desc}</p>
                                 </div>
                                 <button className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">审批</button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Group Navigation: Entry (Onboarding)
    if (activeGroup === 'ENTRY') {
        return (
            <div className="flex flex-col h-full bg-[#FAFAFA] animate-slide-in-right">
                <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-3">
                    <button onClick={() => setActiveGroup(null)} className="hover:bg-gray-100 rounded-full p-1"><ArrowLeft size={20}/></button>
                    <h1 className="text-lg font-bold text-gray-900">入职任务</h1>
                </div>
                <div className="p-5 space-y-3 overflow-y-auto">
                    {mockEntryTasks.map(entry => (
                        <div key={entry.id} onClick={() => setSelectedEntry(entry)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99]">
                             <div className="flex justify-between items-center mb-2">
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                         {entry.candidate.charAt(0)}
                                     </div>
                                     <div>
                                         <h4 className="text-sm font-bold text-gray-900">{entry.candidate}</h4>
                                         <p className="text-xs text-gray-400 mt-0.5">{entry.dept} · {entry.role}</p>
                                     </div>
                                 </div>
                                 <ChevronRight size={16} className="text-gray-300"/>
                             </div>
                             <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
                                 <span className="text-xs text-gray-400">预计入职: {entry.date}</span>
                                 <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                     {entry.progress}
                                 </span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // --- TIMELINE RENDER HELPER ---
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

    // Main Inbox
    return (
        <div className="flex flex-col h-full bg-[#FAFAFA]">
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-5 pt-12 pb-4 border-b border-gray-100/50">
                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">待办事项</h1>
            </div>
            
            <div className="p-5 space-y-6 overflow-y-auto pb-20">
                 
                 {/* 1. TIMELINE SECTION (Moved here) */}
                 <section className="bg-white rounded-[20px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div 
                        className="px-6 py-4 border-b border-slate-50 flex justify-between items-center cursor-pointer active:bg-slate-50 transition-colors group"
                        onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                    >
                        <div className="flex items-center gap-4">
                            {/* Circular Progress */}
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                                    <circle cx="20" cy="20" r="16" stroke="#F1F5F9" strokeWidth="3" fill="none" />
                                    <circle
                                        cx="20" cy="20" r="16" stroke="#3B82F6" strokeWidth="3" fill="none"
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

                 {/* 2. Bill Card (Pinned) - Compact Version */}
                 <div onClick={() => setSelectedTask(mockTasks[0])} className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer flex items-center gap-4 relative overflow-hidden group">
                      <div className="w-12 h-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-sm shrink-0">
                          <CreditCard size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm truncate">{mockTasks[0].title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-xs text-gray-500">2023-12</p>
                              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">¥5,800.00</span>
                          </div>
                      </div>
                      <button className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-200 shrink-0">
                          去支付
                      </button>
                 </div>

                 {/* 3. Group Card (Onboarding) */}
                 <div onClick={() => setActiveGroup('ENTRY')} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><UserPlus size={20}/></div>
                      <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900">入职任务</h4>
                          <p className="text-xs text-gray-400 mt-1">3 人待入职 · 归档、确认</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">3</div>
                      <ChevronRight size={18} className="text-gray-300"/>
                 </div>

                 {/* 4. Group Card (OA) */}
                 <div onClick={() => setActiveGroup('OA')} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center"><Stamp size={20}/></div>
                      <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900">OA 审批</h4>
                          <p className="text-xs text-gray-400 mt-1">2 个待处理 · 报销、请假</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">2</div>
                      <ChevronRight size={18} className="text-gray-300"/>
                 </div>

                 {/* 5. Other Tasks List */}
                 {mockTasks.slice(1).map(task => {
                     if (task.source === 'Internal OA') return null; // Filter out OA as it is in group
                     
                     // Determine icon based on type/id
                     let Icon = Banknote;
                     let colorClass = 'bg-emerald-50 text-emerald-600';
                     if (task.id === 'u_salary') {
                         Icon = Wallet;
                         colorClass = 'bg-indigo-50 text-indigo-600';
                     } else if (task.type === TaskType.ACCEPT) {
                         Icon = UserPlus;
                         colorClass = 'bg-blue-50 text-blue-600';
                     }

                     return (
                        <div key={task.id} onClick={() => setSelectedTask(task)} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex justify-between items-center active:scale-[0.99] cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                                    <Icon size={18}/>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{task.title}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{task.deadline}</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200">处理</button>
                        </div>
                     );
                 })}
            </div>
        </div>
    );
};

export default Inbox;
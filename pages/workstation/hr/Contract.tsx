
import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, FileSignature, ChevronRight, History, Calendar, Award, AlertCircle, FileWarning } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Mock Data ---

const MOCK_CONTRACTS = [
    { 
        id: 1, 
        name: '王强', 
        dept: '技术部',
        joinDate: '2021-03-15',
        tenure: '2年9个月',
        type: '劳动合同', 
        endDate: '2023-12-31', 
        status: 'expiring', 
        daysLeft: 5,
        history: [
            { id: 'h1', type: '劳动合同 (续签)', period: '2021-03-15 ~ 2023-12-31', status: '履行中', current: true },
            { id: 'h2', type: '试用期合同', period: '2020-12-15 ~ 2021-03-15', status: '已转正', current: false }
        ]
    },
    { 
        id: 2, 
        name: '张伟', 
        dept: '技术部',
        joinDate: '2019-06-01',
        tenure: '4年6个月',
        type: '劳动合同', 
        endDate: '2024-03-15', 
        status: 'normal', 
        daysLeft: 85,
        history: [
            { id: 'h3', type: '劳动合同 (二签)', period: '2022-03-16 ~ 2024-03-15', status: '履行中', current: true },
            { id: 'h4', type: '劳动合同 (首签)', period: '2019-06-01 ~ 2022-03-15', status: '已续签', current: false }
        ]
    },
    { 
        id: 3, 
        name: '李娜', 
        dept: '市场部',
        joinDate: '2022-05-10',
        tenure: '1年7个月',
        type: '劳动合同', 
        endDate: '2025-06-01', 
        status: 'normal', 
        daysLeft: 520,
        history: [
            { id: 'h5', type: '劳动合同', period: '2022-05-10 ~ 2025-06-01', status: '履行中', current: true }
        ]
    },
    { 
        id: 4, 
        name: '陈杰', 
        dept: '设计部',
        joinDate: '2020-09-01',
        tenure: '3年3个月',
        type: '劳动合同', 
        endDate: '2023-11-30', 
        status: 'overdue', 
        daysLeft: -12,
        history: [
            { id: 'h6', type: '劳动合同', period: '2020-09-01 ~ 2023-11-30', status: '已逾期', current: true }
        ]
    },
];

// --- Level 3 Detail ---
const ContractDetail = ({ employee, onBack }: { employee: typeof MOCK_CONTRACTS[0], onBack: () => void }) => {
    const isExpiring = employee.status === 'expiring';
    const isOverdue = employee.status === 'overdue';

    return (
        <DetailLayout
            title="合同全景档案"
            onBack={onBack}
            tag={{ 
                label: isOverdue ? '已逾期' : isExpiring ? '即将到期' : '生效中',
                color: isOverdue ? 'text-rose-600' : isExpiring ? 'text-orange-600' : 'text-emerald-600',
                bg: isOverdue ? 'bg-rose-50' : isExpiring ? 'bg-orange-50' : 'bg-emerald-50'
            }}
            bgColor="bg-[#F8F9FB]"
        >
             {/* Header Profile Card */}
             <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
                 {/* Decorative Tenure Badge */}
                 <div className="absolute -top-2 -right-2 w-24 h-24 bg-indigo-50/50 rounded-full flex items-center justify-center -rotate-12 border border-indigo-100/50">
                    <div className="text-center">
                        <p className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">Tenure</p>
                        <p className="text-xs font-black text-indigo-600">{employee.tenure}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-5 mb-8">
                     <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg border-2 border-white">
                         {employee.name.charAt(0)}
                     </div>
                     <div>
                         <h2 className="text-xl font-black text-slate-900">{employee.name}</h2>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{employee.dept} · 在职员工</p>
                     </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                     <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                         <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">入职日期</p>
                         <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            <p className="text-sm font-black font-mono text-slate-900">{employee.joinDate}</p>
                         </div>
                     </div>
                     <div className={`p-4 rounded-2xl border ${isOverdue ? 'bg-rose-50 border-rose-100' : isExpiring ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'}`}>
                         <p className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${isOverdue ? 'text-rose-600' : isExpiring ? 'text-orange-600' : 'text-emerald-600'}`}>
                             {isOverdue ? '逾期天数' : isExpiring ? '剩余天数' : '到期日期'}
                         </p>
                         <div className="flex items-center gap-2">
                            <Clock size={14} className={isOverdue ? 'text-rose-400' : isExpiring ? 'text-orange-400' : 'text-emerald-400'} />
                            <p className={`text-sm font-black font-mono ${isOverdue ? 'text-rose-700' : isExpiring ? 'text-orange-700' : 'text-emerald-700'}`}>
                                {isOverdue ? `${Math.abs(employee.daysLeft)} 天` : isExpiring ? `${employee.daysLeft} 天` : employee.endDate}
                            </p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Action Reminder for Expiring/Overdue */}
             {(isExpiring || isOverdue) && (
                 <div className={`border rounded-[24px] p-5 flex items-start gap-4 shadow-sm animate-pulse ${isOverdue ? 'bg-rose-50 border-rose-100' : 'bg-orange-50 border-orange-100'}`}>
                     <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border ${isOverdue ? 'text-rose-600 border-rose-100' : 'text-orange-600 border-orange-100'}`}>
                        <AlertTriangle size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                         <h4 className={`text-sm font-black ${isOverdue ? 'text-rose-800' : 'text-orange-800'}`}>
                            {isOverdue ? '合同已过期警告' : '合同续签紧急提醒'}
                         </h4>
                         <p className={`text-xs font-medium mt-1 leading-relaxed ${isOverdue ? 'text-rose-700/80' : 'text-orange-700/80'}`}>
                             {isOverdue ? `该员工合同已于 ${employee.endDate} 到期，目前处于无合同用工状态，法律风险极高。` : `当前合同即将于 ${employee.endDate} 到期。请尽快发起续签意向确认。`}
                         </p>
                     </div>
                 </div>
             )}
             
             {/* Contract History Timeline */}
             <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                     <History size={14} strokeWidth={2.5} /> 合同演进历史 (Timeline)
                 </h3>
                 
                 <div className="relative pl-2">
                     <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-100 rounded-full"></div>
                     <div className="space-y-8">
                         {employee.history.map((h, idx) => (
                             <div key={h.id} className="relative pl-8">
                                 <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2 bg-white z-10 flex items-center justify-center shadow-sm ${h.current ? (isOverdue ? 'border-rose-500' : 'border-indigo-500') : 'border-slate-200'}`}>
                                     <div className={`w-2 h-2 rounded-full ${h.current ? (isOverdue ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500 animate-pulse') : 'bg-slate-200'}`}></div>
                                 </div>
                                 
                                 <div className={`p-4 rounded-2xl border transition-all ${h.current ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-white border-transparent opacity-60'}`}>
                                     <div className="flex justify-between items-center mb-1">
                                         <h4 className="text-xs font-black text-slate-900">{h.type}</h4>
                                         <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                                             h.status === '履行中' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                             h.status === '已逾期' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                             'bg-slate-100 text-slate-500 border-slate-200'
                                         }`}>{h.status}</span>
                                     </div>
                                     <p className="text-[10px] font-mono font-bold text-slate-400">{h.period}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

             {/* Footer Actions */}
             <div className="flex gap-3 pt-2">
                 <button className="flex-1 py-4 rounded-2xl border border-slate-200 bg-white font-black text-xs text-slate-500 active:bg-slate-50 transition-all shadow-sm">
                     不再续签
                 </button>
                 <button className={`flex-[2] py-4 rounded-2xl font-black text-xs text-white shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 ${isOverdue ? 'bg-rose-600 shadow-rose-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
                     <FileSignature size={18} /> {isOverdue ? '立即补签合同' : '发起合同续签'}
                 </button>
             </div>
        </DetailLayout>
    );
};

// --- Level 2 Dashboard ---

const Contract: React.FC = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_CONTRACTS[0] | null>(null);
    
    if (selectedEmployee) return <ContractDetail employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;

    const normalCount = MOCK_CONTRACTS.filter(c => c.status === 'normal').length;
    const expiringCount = MOCK_CONTRACTS.filter(c => c.status === 'expiring').length;
    const overdueCount = MOCK_CONTRACTS.filter(c => c.status === 'overdue').length;
    const totalCount = MOCK_CONTRACTS.length;

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Integrated Stats Card (Matching HR Overview Style) */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-indigo-900 pointer-events-none transform rotate-12">
                    <FileSignature size={140} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                            <FileSignature size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-900">合同管理概览</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contract Management</p>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-8 pl-1">
                        <span className="text-5xl font-black font-mono text-slate-900 tracking-tighter">{totalCount}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">合同总数 (份)</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-emerald-600"><CheckCircle2 size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-emerald-800/70 uppercase">生效中</p>
                            <p className="text-base font-black font-mono text-emerald-700">{normalCount}</p>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-orange-600"><Clock size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-orange-800/70 uppercase">即将到期</p>
                            <p className="text-base font-black font-mono text-orange-700">{expiringCount}</p>
                        </div>
                        <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-rose-600"><AlertCircle size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-rose-800/70 uppercase">已逾期</p>
                            <p className="text-base font-black font-mono text-rose-700">{overdueCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contract List */}
            <div>
                 <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1 h-3.5 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">合同管理名单</h3>
                 </div>
                 
                 <div className="space-y-4">
                     {MOCK_CONTRACTS.map(emp => (
                         <div 
                             key={emp.id} 
                             onClick={() => setSelectedEmployee(emp)}
                             className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer group hover:border-indigo-100"
                         >
                             {/* Status Indicator Bar */}
                             <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                emp.status === 'overdue' ? 'bg-rose-500' :
                                emp.status === 'expiring' ? 'bg-orange-500' : 
                                'bg-emerald-500'
                             }`}></div>
                             
                             <div className="pl-3">
                                 <div className="flex items-center gap-2 mb-1.5">
                                     <h4 className="text-sm font-black text-slate-900">{emp.name}</h4>
                                     <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{emp.dept}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <Award size={10} className="text-indigo-400" />
                                        <p className="text-[10px] font-bold text-slate-400">司龄: {emp.tenure}</p>
                                    </div>
                                    <div className="flex items-center gap-1 border-l border-slate-100 pl-3">
                                        <Clock size={10} className="text-slate-300" />
                                        <p className="text-[10px] font-mono font-bold text-slate-400">{emp.endDate} 到期</p>
                                    </div>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-4">
                                 {emp.status === 'overdue' ? (
                                     <div className="text-right">
                                         <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-1 rounded-lg font-black border border-rose-100 animate-pulse shadow-sm flex items-center gap-1">
                                             <FileWarning size={10} /> 逾期 {Math.abs(emp.daysLeft)} 天
                                         </span>
                                     </div>
                                 ) : emp.status === 'expiring' ? (
                                     <div className="text-right">
                                         <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-1 rounded-lg font-black border border-orange-100 animate-pulse shadow-sm">剩余 {emp.daysLeft} 天</span>
                                     </div>
                                 ) : (
                                     <div className="text-right">
                                         <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg font-black border border-emerald-100 flex items-center gap-1 shadow-sm">
                                             <CheckCircle2 size={10} strokeWidth={3} /> 履行中
                                         </span>
                                     </div>
                                 )}
                                 <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
            
            {/* Footer Legend */}
            <div className="text-center py-4 opacity-30">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">GM Pilot Contract Insight v2.0</p>
            </div>
        </div>
    );
};

export default Contract;

import React, { useState } from 'react';
import { User, Briefcase, Calendar, ChevronRight, CheckCircle2, Clock, Check, X, FileText, LocateFixed } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const RoleChange = ({ employee, onBack }: { employee: any, onBack: () => void }) => {
    const [step, setStep] = useState<'form' | 'process'>('form');
    
    // Form state
    const [newDept, setNewDept] = useState(employee.dept || '');
    const [newRole, setNewRole] = useState(employee.role || '');
    const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState('组织架构调整');

    const [tasks, setTasks] = useState({ approval: 'pending', notify: 'pending' });

    const handleConfirm = () => {
        setStep('process');
    };

    if (step === 'form') {
        return (
            <DetailLayout title="发起岗位调整" onBack={onBack} bgColor="bg-[#F8F9FB]">
                <div className="space-y-5 pb-24">
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 text-center">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                            <Briefcase size={28} strokeWidth={2} />
                        </div>
                        <h3 className="font-black text-slate-900 text-lg">调整 {employee.name} 当前岗位</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{employee.dept} · {employee.role}</p>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-5">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">调整原因</label>
                            <div className="relative">
                                <select 
                                    value={reason} 
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 appearance-none"
                                >
                                    <option>组织架构调整</option>
                                    <option>个人能力匹配</option>
                                    <option>项目需要</option>
                                    <option>其他原因</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">调入部门</label>
                            <div className="relative">
                                <select 
                                    value={newDept} 
                                    onChange={(e) => setNewDept(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 appearance-none"
                                >
                                    <option>人力资源部</option>
                                    <option>财务部</option>
                                    <option>技术研发部</option>
                                    <option>产品设计部</option>
                                    <option>市场营销部</option>
                                    <option>销售部</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">调入岗位</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={newRole} 
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="输入新岗位名称"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">生效日期</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={effectiveDate} 
                                    onChange={(e) => setEffectiveDate(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-indigo-500 transition-colors text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 max-w-md mx-auto z-50 pb-8">
                    <button 
                        onClick={handleConfirm}
                        className="w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] bg-indigo-600 text-white shadow-indigo-200"
                    >
                        发起调岗审批 <ChevronRight size={18} strokeWidth={2.5}/>
                    </button>
                </div>
            </DetailLayout>
        );
    }

    const isCompleted = tasks.approval === 'done' && tasks.notify === 'done';

    return (
        <DetailLayout title="岗位调整办理" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5 pb-24">
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                            {isCompleted ? <CheckCircle2 size={28} strokeWidth={2} /> : <Clock size={28} strokeWidth={2} />}
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 text-lg mb-1">{employee.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 ${isCompleted ? 'text-emerald-600 bg-emerald-50' : 'text-indigo-600 bg-indigo-50'}`}>
                                    {isCompleted ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                    {isCompleted ? '调岗完成' : '调岗中'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">原: {employee.dept}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-sm font-black text-slate-900">岗位调整信息</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">调整原因</span>
                            <span className="text-sm font-black text-slate-900">{reason}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">新部门</span>
                            <span className="text-sm font-black text-slate-900">{newDept}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">新岗位</span>
                            <span className="text-sm font-black text-slate-900">{newRole}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-bold">生效日期</span>
                            <span className="text-sm font-black text-slate-900 font-mono">{effectiveDate}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                            <h3 className="text-sm font-black text-slate-900">调整任务</h3>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                            {isCompleted ? '办理完成' : '办理中'}
                        </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                        <div className={`p-4 rounded-xl transition-all border ${tasks.approval === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tasks.approval === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <FileText size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">部门审批</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">需新老部门负责人同意</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setTasks(prev => ({ ...prev, approval: prev.approval === 'done' ? 'pending' : 'done' }))}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${tasks.approval === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                                >
                                    {tasks.approval === 'done' ? '已审批' : '一键通过'}
                                </button>
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl transition-all border ${tasks.notify === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tasks.notify === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <LocateFixed size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">合同主体变更</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">确认是否需要重签合同</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setTasks(prev => ({ ...prev, notify: prev.notify === 'done' ? 'pending' : 'done' }))}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${tasks.notify === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                                >
                                    {tasks.notify === 'done' ? '已处理' : '无需变更'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DetailLayout>
    );
};

export default RoleChange;

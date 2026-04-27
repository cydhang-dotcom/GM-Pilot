import React, { useState } from 'react';
import { ShieldCheck, Calendar, ChevronRight, CheckCircle2, Clock, Check, X, Building2 } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const SocialChange = ({ employee, onBack }: { employee: any, onBack: () => void }) => {
    const [step, setStep] = useState<'form' | 'process'>('form');
    
    // Form state
    const [newSocialBase, setNewSocialBase] = useState('');
    const [newFundBase, setNewFundBase] = useState('');
    const [effectiveMonth, setEffectiveMonth] = useState(new Date().toISOString().substring(0, 7));
    const [reason, setReason] = useState('年度基数调整');

    const [tasks, setTasks] = useState({ update: 'pending', notify: 'pending' });

    const handleConfirm = () => {
        setStep('process');
    };

    if (step === 'form') {
        return (
            <DetailLayout title="发起社保调整" onBack={onBack} bgColor="bg-[#F8F9FB]">
                <div className="space-y-5 pb-24">
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 text-center">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                            <ShieldCheck size={28} strokeWidth={2} />
                        </div>
                        <h3 className="font-black text-slate-900 text-lg">社保公积金调整</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{employee.name} · {employee.dept}</p>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-5">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">调整类型</label>
                            <div className="relative">
                                <select 
                                    value={reason} 
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 appearance-none"
                                >
                                    <option>年度基数调整</option>
                                    <option>缴纳地变更</option>
                                    <option>参保方案变更</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                            </div>
                        </div>

                         <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">新社保基数 (元)</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    value={newSocialBase} 
                                    onChange={(e) => setNewSocialBase(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="输入调整后社保基数"
                                />
                            </div>
                        </div>

                         <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">新公积金基数 (元)</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    value={newFundBase} 
                                    onChange={(e) => setNewFundBase(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="输入调整后公积金基数"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">生效月份</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="month" 
                                    value={effectiveMonth} 
                                    onChange={(e) => setEffectiveMonth(e.target.value)}
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
                        确认发起办理 <ChevronRight size={18} strokeWidth={2.5}/>
                    </button>
                </div>
            </DetailLayout>
        );
    }

    const isCompleted = tasks.update === 'done' && tasks.notify === 'done';

    return (
        <DetailLayout title="社保调整办理" onBack={onBack} bgColor="bg-[#F8F9FB]">
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
                                    {isCompleted ? '办理完成' : '变动中'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">调整类型</span>
                            <span className="text-sm font-black text-slate-900">{reason}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">新社保基数</span>
                            <span className="text-sm font-black text-slate-900">{newSocialBase ? `¥ ${newSocialBase}` : '--'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">新公积金基数</span>
                            <span className="text-sm font-black text-slate-900">{newFundBase ? `¥ ${newFundBase}` : '--'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-bold">生效月份</span>
                            <span className="text-sm font-black text-slate-900 font-mono">{effectiveMonth}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                            <h3 className="text-sm font-black text-slate-900">变动任务</h3>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                            {isCompleted ? '已完成' : '待处理'}
                        </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                        <div className={`p-4 rounded-xl transition-all border ${tasks.update === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tasks.update === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <Building2 size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">局端系统申报</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">前往人社局网站操作基数调整</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setTasks(prev => ({ ...prev, update: prev.update === 'done' ? 'pending' : 'done' }))}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${tasks.update === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                                >
                                    {tasks.update === 'done' ? '已申报' : '确认办理'}
                                </button>
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl transition-all border ${tasks.notify === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tasks.notify === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">系统数据生效</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">当月社保差额将自动生成</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setTasks(prev => ({ ...prev, notify: prev.notify === 'done' ? 'pending' : 'done' }))}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${tasks.notify === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                                >
                                    {tasks.notify === 'done' ? '已生效' : '确认生效'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DetailLayout>
    );
};

export default SocialChange;

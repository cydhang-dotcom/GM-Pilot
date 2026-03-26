
import React, { useState } from 'react';
import { UserX, Calendar, AlertCircle, FileCheck, Check, ChevronRight, FileText, Download, Briefcase, FileSignature, ShieldCheck, CheckCircle2, Circle, Clock, Pencil, X } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';
import EmployeeDetail from './EmployeeDetail';

const EmployeeOffboarding = ({ employee, onBack, initialStep = 'confirm', onStatusChange, onTaskStatusChange }: { employee: any, onBack: () => void, initialStep?: 'confirm' | 'process', onStatusChange?: (status: 'pending' | 'processing' | 'done') => void, onTaskStatusChange?: (task: 'social' | 'fund', status: 'pending' | 'processing' | 'done') => void }) => {
    const [step, setStep] = useState<'confirm' | 'process'>(initialStep);
    const [showDetail, setShowDetail] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    // Confirm Step State
    const [offboardType, setOffboardType] = useState('员工辞职');
    const [reason, setReason] = useState('个人原因');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [remarks, setRemarks] = useState('');

    // Process Step State
    const [initDate] = useState(new Date().toISOString().split('T')[0]);
    const [socialEndMonth, setSocialEndMonth] = useState(date.substring(0, 7)); // YYYY-MM
    const [salaryEndDate, setSalaryEndDate] = useState(date);
    
    const [initiateModal, setInitiateModal] = useState<{ isOpen: boolean, taskType: 'social' | 'fund' | null }>({ isOpen: false, taskType: null });
    const [tempEndMonth, setTempEndMonth] = useState('');
    const [confirmedSocialMonth, setConfirmedSocialMonth] = useState('');
    const [confirmedFundMonth, setConfirmedFundMonth] = useState('');
    
    // Use employee tasks directly or local state if not provided
    const [localTasks, setLocalTasks] = useState(employee?.tasks || { social: 'pending', fund: 'pending' });
    const tasks = onTaskStatusChange && employee?.tasks ? employee.tasks : localTasks;

    const handleTaskChange = (task: 'social' | 'fund', status: 'pending' | 'processing' | 'done') => {
        if (onTaskStatusChange) {
            onTaskStatusChange(task, status);
        } else {
            setLocalTasks(prev => ({ ...prev, [task]: status }));
        }
    };

    const [editModal, setEditModal] = useState<{
        isOpen: boolean;
        field: 'date' | 'social' | 'salary' | null;
        value: string;
    }>({ isOpen: false, field: null, value: '' });

    const getReasonsByType = (type: string) => {
        switch(type) {
            case '员工辞职': return ['个人原因', '职业发展', '薪资福利', '家庭原因', '其他'];
            case '协商解除': return ['双方协商一致'];
            case '公司解除': return ['试用期不合格', '严重违纪', '组织架构调整', '绩效不达标', '其他'];
            case '合同到期终止': return ['合同到期不续签'];
            default: return ['个人原因'];
        }
    };

    // Update reason when type changes
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setOffboardType(newType);
        setReason(getReasonsByType(newType)[0]);
    };

    const handleConfirm = () => {
        setShowConfirmModal(true);
    };

    const proceedToProcess = () => {
        setShowConfirmModal(false);
        setStep('process');
    };

    if (showDetail) {
        return <EmployeeDetail employee={employee} onBack={() => setShowDetail(false)} />;
    }

    if (step === 'confirm') {
        return (
            <DetailLayout title="确认离职信息" onBack={onBack} bgColor="bg-[#F8F9FB]">
                <div className="space-y-5 pb-24">
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 text-center">
                        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-rose-100">
                            <UserX size={28} strokeWidth={2} />
                        </div>
                        <h3 className="font-black text-slate-900 text-lg">发起 {employee.name} 离职</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{employee.dept} · {employee.role}</p>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-5">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">离职类型</label>
                            <div className="relative">
                                <select 
                                    value={offboardType} 
                                    onChange={handleTypeChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-rose-500 appearance-none"
                                >
                                    <option>员工辞职</option>
                                    <option>协商解除</option>
                                    <option>公司解除</option>
                                    <option>合同到期终止</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">离职原因</label>
                            <div className="relative">
                                <select 
                                    value={reason} 
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-rose-500 appearance-none"
                                >
                                    {getReasonsByType(offboardType).map(r => <option key={r}>{r}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">离职日期 (最后工作日)</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={date} 
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setDate(newDate);
                                        setSocialEndMonth(newDate.substring(0, 7));
                                        setSalaryEndDate(newDate);
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-rose-500 transition-colors text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">五险一金截止月</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="month" 
                                        value={socialEndMonth} 
                                        onChange={(e) => setSocialEndMonth(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-rose-500 transition-colors text-slate-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">工资结算截止日</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="date" 
                                        value={salaryEndDate} 
                                        onChange={(e) => setSalaryEndDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-rose-500 transition-colors text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">备注说明</label>
                            <textarea 
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="请输入离职备注信息..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:border-rose-500 transition-colors min-h-[80px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 max-w-md mx-auto z-50 pb-8">
                    <button 
                        onClick={handleConfirm}
                        className="w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] bg-rose-600 text-white shadow-rose-200"
                    >
                        确认办理离职 <ChevronRight size={18} strokeWidth={2.5}/>
                    </button>
                </div>

                {/* Confirm Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
                        <div className="bg-white w-full rounded-[32px] p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 max-w-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-900 text-lg">确认办理离职</h3>
                                <button onClick={() => setShowConfirmModal(false)} className="text-slate-400 p-1 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <p className="text-sm text-slate-600 font-medium">
                                    确认要为 <span className="font-black text-slate-900">{employee.name}</span> 办理离职吗？
                                </p>
                                
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-bold">离职日期</span>
                                        <span className="text-sm font-black text-slate-900 font-mono">{date}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-bold">五险一金截止</span>
                                        <span className="text-sm font-black text-slate-900 font-mono">{socialEndMonth}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-bold">工资结算截止</span>
                                        <span className="text-sm font-black text-slate-900 font-mono">{salaryEndDate}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-2 text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">
                                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                    <p className="text-xs font-bold leading-relaxed">
                                        确认后将生成离职任务并通知相关人员，该操作不可撤销。
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowConfirmModal(false)} 
                                    className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-600 active:scale-[0.98] transition-all"
                                >
                                    取消
                                </button>
                                <button 
                                    onClick={proceedToProcess} 
                                    className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-rose-600 text-white shadow-lg shadow-rose-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    确认办理 <Check size={16} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </DetailLayout>
        );
    }

    // Process Step
    const isCompleted = tasks.social === 'done' && tasks.fund === 'done';

    return (
        <DetailLayout title="离职办理" onBack={() => initialStep === 'process' ? onBack() : setStep('confirm')} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5 pb-24">
                
                {/* Status Header */}
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
                                    {isCompleted ? '离职完成' : '离职中'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{employee.dept}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 员工信息模块 */}
                <div 
                    onClick={() => setShowDetail(true)}
                    className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 cursor-pointer hover:border-indigo-100 transition-colors group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                            <h3 className="text-sm font-black text-slate-900">员工信息</h3>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-600 transition-colors">
                            <span className="text-[10px] font-bold">查看详情</span>
                            <ChevronRight size={14} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-baseline border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">员工姓名</span>
                            <span className="text-sm font-black text-slate-900">{employee.name}</span>
                        </div>
                        <div className="flex justify-between items-baseline border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">部门 / 岗位</span>
                            <span className="text-sm font-black text-slate-900">{employee.dept} / {employee.role}</span>
                        </div>
                        <div className="flex justify-between items-baseline border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">入职日期</span>
                            <span className="text-sm font-black text-slate-900 font-mono">{employee.joinDate || '2021-03-15'}</span>
                        </div>
                        <div className="flex justify-between items-baseline border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">用工类型</span>
                            <span className="text-sm font-black text-slate-900">全职</span>
                        </div>
                        <div className="pt-2">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs text-slate-400 font-bold block">劳动合同记录</span>
                                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">总司龄 2.9年</span>
                            </div>
                            <div className="pl-4 space-y-4">
                                {/* 首次合同 */}
                                <div className="relative pl-8">
                                    {/* Axis Marker */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[2px] bg-white z-10 flex items-center justify-center shadow-sm border-slate-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                    </div>
                                    
                                    <div className="p-4 rounded-2xl border bg-slate-50/50 border-transparent opacity-60">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-xs font-black text-slate-900">固定期限劳动合同 (首次)</h4>
                                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md border bg-slate-100 text-slate-500 border-slate-200">已到期</span>
                                        </div>
                                        <p className="text-[10px] font-mono font-bold text-slate-400">2021.03.15 - 2024.03.14</p>
                                    </div>
                                </div>

                                {/* 续签合同 */}
                                <div className="relative pl-8">
                                    {/* Axis Marker */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[2px] bg-white z-10 flex items-center justify-center shadow-sm border-indigo-500 shadow-indigo-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                                    </div>
                                    
                                    <div className="p-4 rounded-2xl border bg-white border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] scale-[1.01]">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-xs font-black text-slate-900">固定期限劳动合同 (续签)</h4>
                                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md border bg-emerald-50 text-emerald-600 border-emerald-100">生效中</span>
                                        </div>
                                        <p className="text-[10px] font-mono font-bold text-slate-400">2024.03.15 - 2027.03.14</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 离职信息模块 */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                        <h3 className="text-sm font-black text-slate-900">离职信息</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">离职类型</span>
                            <span className="text-sm font-black text-slate-900">{offboardType}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-xs text-slate-400 font-bold">离职原因</span>
                            <span className="text-sm font-black text-slate-900">{reason}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-bold">离职日期</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-slate-900 font-mono">{date}</span>
                                <button onClick={() => setEditModal({ isOpen: true, field: 'date', value: date })} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <Pencil size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 任务模块 */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                            <h3 className="text-sm font-black text-slate-900">退出办理任务</h3>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            tasks.social === 'done' && tasks.fund === 'done' ? 'bg-emerald-100 text-emerald-700' :
                            tasks.social === 'pending' && tasks.fund === 'pending' ? 'bg-slate-100 text-slate-500' :
                            'bg-amber-100 text-amber-700'
                        }`}>
                            {tasks.social === 'done' && tasks.fund === 'done' ? '办理完成' :
                             tasks.social === 'pending' && tasks.fund === 'pending' ? '待发起' :
                             '办理中'}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div 
                            className={`p-4 rounded-xl transition-all flex items-center justify-between border ${
                                tasks.social === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 
                                tasks.social === 'processing' ? 'bg-slate-50 border-slate-100' : 
                                'bg-rose-50 border-rose-200 shadow-sm'
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold block ${
                                        tasks.social === 'done' ? 'text-emerald-800' : 
                                        tasks.social === 'processing' ? 'text-slate-700' : 
                                        'text-rose-900'
                                    }`}>社保减员</span>
                                    {tasks.social === 'pending' && (
                                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-600">待发起</span>
                                    )}
                                </div>
                                {tasks.social !== 'pending' && confirmedSocialMonth ? (
                                    <span className={`text-[11px] font-medium mt-1 block ${tasks.social === 'done' ? 'text-emerald-600/70' : 'text-slate-500'}`}>缴纳截止月: <span className="font-mono">{confirmedSocialMonth}</span></span>
                                ) : (
                                    <span className="text-[11px] font-medium mt-1 block text-rose-500/80">缴纳截止月: <span className="font-mono">{socialEndMonth}</span></span>
                                )}
                            </div>
                            <button 
                                onClick={() => {
                                    if (tasks.social === 'pending') {
                                        setTempEndMonth(socialEndMonth || date.substring(0, 7));
                                        setInitiateModal({ isOpen: true, taskType: 'social' });
                                    } else if (tasks.social === 'processing') {
                                        handleTaskChange('social', 'done');
                                    } else {
                                        handleTaskChange('social', 'pending');
                                    }
                                }}
                                className="focus:outline-none"
                            >
                                {tasks.social === 'done' ? (
                                    <div className="flex items-center gap-1.5 bg-emerald-100/80 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-200/80 transition-colors">
                                        <CheckCircle2 size={14} strokeWidth={2.5} />
                                        <span className="text-xs font-bold">办理完成</span>
                                    </div>
                                ) : tasks.social === 'processing' ? (
                                    <div className="flex items-center gap-1.5 bg-amber-100/80 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-200/80 transition-colors">
                                        <Clock size={14} strokeWidth={2.5} />
                                        <span className="text-xs font-bold">办理中</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-lg shadow-md shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95">
                                        <span className="text-xs font-bold">发起办理</span>
                                    </div>
                                )}
                            </button>
                        </div>
                        <div 
                            className={`p-4 rounded-xl transition-all flex items-center justify-between border ${
                                tasks.fund === 'done' ? 'bg-emerald-50/50 border-emerald-100' : 
                                tasks.fund === 'processing' ? 'bg-slate-50 border-slate-100' : 
                                'bg-rose-50 border-rose-200 shadow-sm'
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold block ${
                                        tasks.fund === 'done' ? 'text-emerald-800' : 
                                        tasks.fund === 'processing' ? 'text-slate-700' : 
                                        'text-rose-900'
                                    }`}>公积金减员</span>
                                    {tasks.fund === 'pending' && (
                                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-600">待发起</span>
                                    )}
                                </div>
                                {tasks.fund !== 'pending' && confirmedFundMonth ? (
                                    <span className={`text-[11px] font-medium mt-1 block ${tasks.fund === 'done' ? 'text-emerald-600/70' : 'text-slate-500'}`}>缴纳截止月: <span className="font-mono">{confirmedFundMonth}</span></span>
                                ) : (
                                    <span className="text-[11px] font-medium mt-1 block text-rose-500/80">缴纳截止月: <span className="font-mono">{socialEndMonth}</span></span>
                                )}
                            </div>
                            <button 
                                onClick={() => {
                                    if (tasks.fund === 'pending') {
                                        setTempEndMonth(socialEndMonth || date.substring(0, 7));
                                        setInitiateModal({ isOpen: true, taskType: 'fund' });
                                    } else if (tasks.fund === 'processing') {
                                        handleTaskChange('fund', 'done');
                                    } else {
                                        handleTaskChange('fund', 'pending');
                                    }
                                }}
                                className="focus:outline-none"
                            >
                                {tasks.fund === 'done' ? (
                                    <div className="flex items-center gap-1.5 bg-emerald-100/80 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-200/80 transition-colors">
                                        <CheckCircle2 size={14} strokeWidth={2.5} />
                                        <span className="text-xs font-bold">办理完成</span>
                                    </div>
                                ) : tasks.fund === 'processing' ? (
                                    <div className="flex items-center gap-1.5 bg-amber-100/80 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-200/80 transition-colors">
                                        <Clock size={14} strokeWidth={2.5} />
                                        <span className="text-xs font-bold">办理中</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-lg shadow-md shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95">
                                        <span className="text-xs font-bold">发起办理</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 文件模块 */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                        <h3 className="text-sm font-black text-slate-900">离职文件</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-2 active:bg-slate-100 cursor-pointer transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-slate-200">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800">离职交接单</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">模板下载</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-2 active:bg-slate-100 cursor-pointer transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-slate-200">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800">协商解除协议</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">模板下载</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-2 active:bg-slate-100 cursor-pointer transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-slate-200">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800">离职面谈表</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">模板下载</p>
                            </div>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col items-center text-center gap-2 active:bg-indigo-100 cursor-pointer transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
                                <Download size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-indigo-800">退工单</p>
                                <p className="text-[9px] text-indigo-500 mt-0.5">系统生成</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Initiate Task Modal */}
            {initiateModal.isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setInitiateModal({ isOpen: false, taskType: null })}></div>
                    <div className="bg-white w-full rounded-[32px] p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 max-w-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-900 text-lg">
                                发起{initiateModal.taskType === 'social' ? '社保' : '公积金'}减员
                            </h3>
                            <button onClick={() => setInitiateModal({ isOpen: false, taskType: null })} className="text-slate-400 p-1 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">确认缴纳截止月</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="month" 
                                        value={tempEndMonth}
                                        onChange={(e) => setTempEndMonth(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-indigo-500 transition-colors text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-indigo-500 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                <p className="text-xs font-bold leading-relaxed">
                                    确认后将变更为“办理中”状态，请及时在对应系统完成减员操作。
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setInitiateModal({ isOpen: false, taskType: null })} 
                                className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-600 active:scale-[0.98] transition-all"
                            >
                                取消
                            </button>
                            <button 
                                onClick={() => {
                                    if (initiateModal.taskType === 'social') {
                                        setConfirmedSocialMonth(tempEndMonth);
                                        handleTaskChange('social', 'processing');
                                    } else if (initiateModal.taskType === 'fund') {
                                        setConfirmedFundMonth(tempEndMonth);
                                        handleTaskChange('fund', 'processing');
                                    }
                                    setInitiateModal({ isOpen: false, taskType: null });
                                }} 
                                className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                确认发起 <Check size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6">
                    <div className="bg-white rounded-[32px] w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-base font-black text-slate-800">
                                {editModal.field === 'date' ? '修改离职日期' : editModal.field === 'social' ? '修改五险一金截止月' : '修改工资结算截止日'}
                            </h3>
                            <button onClick={() => setEditModal({ ...editModal, isOpen: false })} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6">
                            <input 
                                type={editModal.field === 'social' ? 'month' : 'date'}
                                value={editModal.value}
                                onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-black font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 transition-all"
                            />
                            <button 
                                onClick={() => {
                                    if (editModal.field === 'date') setDate(editModal.value);
                                    if (editModal.field === 'social') setSocialEndMonth(editModal.value);
                                    if (editModal.field === 'salary') setSalaryEndDate(editModal.value);
                                    setEditModal({ ...editModal, isOpen: false });
                                }}
                                className="w-full mt-6 bg-indigo-600 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
                            >
                                确认修改
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
};

export default EmployeeOffboarding;

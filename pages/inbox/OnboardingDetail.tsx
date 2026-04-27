import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Banknote, FileSignature, CheckCircle2, ChevronRight, Play, Loader2, Eye, EyeOff, Circle, User, Edit3, Save, X, QrCode, AlertCircle, Calculator, Check, Calendar, FileText, XCircle, MapPin, Building2, Clock, Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';
import { OnboardingEmployee, StepStatus } from './OnboardingProcess';

interface OnboardingDetailProps {
    employee: OnboardingEmployee;
    onBack: () => void;
    onUpdate: (emp: OnboardingEmployee) => void;
}

const InfoSection = ({ title, children, onEdit, isUrgent }: { title: string, children?: React.ReactNode, onEdit?: () => void, isUrgent?: boolean }) => (
    <div className={`bg-white rounded-[24px] p-6 shadow-sm border transition-colors ${isUrgent ? 'border-rose-200 ring-4 ring-rose-50' : 'border-slate-100'}`}>
        <div className="flex justify-between items-center mb-4 ml-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
            {onEdit && (
                <button 
                    onClick={onEdit}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all active:scale-95 ${
                        isUrgent ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}
                >
                    <Edit3 size={10} /> {isUrgent ? '立即补充资料' : '修改资料'}
                </button>
            )}
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const InfoRow = ({ label, value, isMono = false, isSensitive = false, defaultShowSensitive = false }: any) => {
    const [showSensitive, setShowSensitive] = React.useState(defaultShowSensitive);
    
    return (
        <div className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0 group">
            <span className="text-xs text-slate-400 font-bold">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-black text-slate-900 ${isMono ? 'font-mono' : ''} ${isSensitive && !showSensitive ? 'blur-sm select-none opacity-50' : ''}`}>
                    {value ? (isSensitive && !showSensitive ? value?.replace(/./g, '*') || '********' : value) : <span className="text-rose-500 font-bold flex items-center gap-1 animate-pulse"><AlertCircle size={10}/>待补充</span>}
                </span>
                {isSensitive && value && (
                    <button 
                        onClick={() => setShowSensitive(!showSensitive)}
                        className="text-slate-300 hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100"
                        title={showSensitive ? '隐藏信息' : '查看完整信息'}
                    >
                        {showSensitive ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                )}
            </div>
        </div>
    );
};

const OnboardingDetail: React.FC<OnboardingDetailProps> = ({ employee, onBack, onUpdate }) => {
    const navigate = useNavigate();
    const [loadingStep, setLoadingStep] = useState<string | null>(null);
    const [showSalary, setShowSalary] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Modals state
    const [modalType, setModalType] = useState<'none' | 'contract' | 'tax' | 'social' | 'company_confirm' | 'contract_confirm'>('none');

    // Company Info State (Simulating saved enterprise info)
    const [companyInfo, setCompanyInfo] = useState({
        address: '上海市浦东新区张江高科技园区',
        workLocation: '上海',
        payDay: '10',
        payMonth: '本月'
    });
    const [hasConfirmedCompanyInfo, setHasConfirmedCompanyInfo] = useState(false);

    // Modal Form States
    const [contractForm, setContractForm] = useState({ 
        position: employee.role || '',
        salary: employee.salary || '',
        startDate: employee.joinDate || new Date().toISOString().split('T')[0],
        term: 3, 
        probation: 3,
        template: '标准劳动合同 (2024版)'
    });
    const [isSalaryModified, setIsSalaryModified] = useState(false);
    const [showPositionInput, setShowPositionInput] = useState(false);
    const [newPosition, setNewPosition] = useState('');
    const [positions, setPositions] = useState(['前端开发', '后端开发', 'UI设计师', '产品经理', '市场经理']);

    const [taxForm, setTaxForm] = useState({ base: '' });
    const [socialForm, setSocialForm] = useState({ socialBase: '', fundBase: '' });

    const isQR = employee.source === 'qr';
    const isMissingInfo = isQR && (!employee.dept || !employee.salary);

    // Form state for editing
    const [formData, setFormData] = useState({
        dept: employee.dept,
        role: employee.role,
        salary: employee.salary,
        joinDate: employee.joinDate || new Date().toISOString().split('T')[0],
        phone: employee.phone
    });

    useEffect(() => {
        if (employee.role && !positions.includes(employee.role)) {
            setPositions(prev => [...prev, employee.role]);
        }
    }, [employee.role]);

    useEffect(() => {
        if(modalType === 'tax' && !taxForm.base) setTaxForm({ base: employee.salary });
        if(modalType === 'social' && !socialForm.socialBase) setSocialForm({ socialBase: employee.salary, fundBase: employee.salary });
    }, [modalType, employee.salary]);

    const handleStepClick = (stepKey: 'contract' | 'tax' | 'social') => {
        if (isMissingInfo) {
            setIsEditing(true);
            return;
        }
        
        if (stepKey === 'contract' && !hasConfirmedCompanyInfo) {
            setModalType('company_confirm');
        } else {
            setModalType(stepKey);
        }
    };

    const handleSalaryChange = (val: string) => {
        setContractForm({ ...contractForm, salary: val });
        setIsSalaryModified(val !== employee.salary);
    };

    const handleAddPosition = () => {
        if (newPosition && !positions.includes(newPosition)) {
            setPositions([...positions, newPosition]);
            setContractForm({ ...contractForm, position: newPosition });
            setNewPosition('');
            setShowPositionInput(false);
        }
    };

    const handleUpdateStatus = (stepKey: keyof typeof employee.steps, status: StepStatus) => {
        const updatedSteps = { ...employee.steps, [stepKey]: status };
        onUpdate({ ...employee, steps: updatedSteps });
    };

    const confirmAction = () => {
        if (modalType === 'none') return;
        
        setLoadingStep(modalType);
        setModalType('none');
        
        setTimeout(() => {
            let nextStatus: StepStatus = 'done';
            
            // Logic for specific flows
            if (modalType === 'contract') nextStatus = 'processing'; // To "Signing"
            if (modalType === 'social') nextStatus = 'processing'; // To "Declaring"
            if (modalType === 'tax') nextStatus = 'done'; // To "Submitted"

            handleUpdateStatus(modalType, nextStatus);
            setLoadingStep(null);
        }, 1200);
    };

    const handleSaveInfo = () => {
        if (!formData.dept || !formData.role || !formData.salary || !formData.joinDate) {
            alert('请填写所有必填项');
            return;
        }
        onUpdate({
            ...employee,
            ...formData,
            steps: { ...employee.steps, info: 'done' }
        });
        setIsEditing(false);
    };

    const StatusCard = ({ icon: Icon, title, desc, status, stepKey }: { icon: any, title: string, desc: string, status: StepStatus, stepKey: string }) => {
        const isPending = status === 'pending';
        const isProcessing = status === 'processing';
        const isDone = status === 'done';

        // Custom Labels based on context
        let statusLabel = '待办理';
        let statusColor = 'text-amber-600 bg-amber-50 border-amber-100';
        let statusIcon = <Circle size={8} fill="currentColor" />;

        if (isDone) {
            statusLabel = '已办结';
            statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-100';
            statusIcon = <CheckCircle2 size={10} strokeWidth={3} />;
            
            if (stepKey === 'contract') statusLabel = '签署完成';
            if (stepKey === 'tax') statusLabel = '已提交';
            if (stepKey === 'social') statusLabel = '申报完成';
        } else if (isProcessing) {
            statusLabel = '处理中';
            statusColor = 'text-blue-600 bg-blue-50 border-blue-100';
            statusIcon = <Loader2 size={10} className="animate-spin" />;

            if (stepKey === 'contract') statusLabel = '签署中';
            if (stepKey === 'social') statusLabel = '申报中';
        }

        return (
            <div className={`bg-white rounded-[24px] p-5 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all ${isDone ? 'border-emerald-100' : isProcessing ? 'border-blue-100' : 'border-slate-100'} ${isPending && isMissingInfo && stepKey !== 'info' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                        isDone ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        isProcessing ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <h5 className="text-sm font-black text-slate-900">{title}</h5>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 border ${statusColor}`}>
                                {statusIcon}
                                {statusLabel}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{desc}</p>
                        
                        {/* Action Buttons */}
                        {isPending && stepKey !== 'info' && (
                            <button 
                                onClick={() => handleStepClick(stepKey as any)}
                                disabled={!!loadingStep}
                                className={`mt-4 w-full py-3 rounded-xl text-[10px] font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all ${
                                    isMissingInfo 
                                    ? 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white shadow-indigo-100'
                                }`}
                            >
                                {loadingStep === stepKey ? <Loader2 size={14} className="animate-spin" /> : 
                                 isMissingInfo ? <span className="flex items-center gap-1"><AlertCircle size={12}/> 请先补全档案</span> : 
                                 <>立即发起办理 <ChevronRight size={12} strokeWidth={3} /></>
                                }
                            </button>
                        )}

                        {/* Contract Processing Actions */}
                        {stepKey === 'contract' && isProcessing && (
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl text-[10px] font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5">
                                    <FileText size={12} /> 查看签署文件
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus('contract', 'pending')}
                                    className="px-3 bg-white border border-rose-100 text-rose-500 py-2.5 rounded-xl text-[10px] font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                                >
                                    <XCircle size={12} /> 取消签署
                                </button>
                            </div>
                        )}

                        {/* Contract Done Actions */}
                        {stepKey === 'contract' && isDone && (
                            <div className="mt-4">
                                <button className="w-full bg-emerald-50 border border-emerald-100 text-emerald-700 py-2.5 rounded-xl text-[10px] font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5">
                                    <FileText size={12} /> 查看签署结果
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (isEditing) {
        return (
            <DetailLayout title="完善核心档案" onBack={() => setIsEditing(false)} bgColor="bg-[#F8F9FB]">
                <div className="space-y-6 pb-24">
                    {/* Read-Only Info */}
                    <div className="bg-slate-100 rounded-[28px] p-6 border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck size={16} className="text-slate-400" />
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">已验证身份信息 (不可修改)</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                                <span className="text-xs font-bold text-slate-400">姓名</span>
                                <span className="text-sm font-black text-slate-700">{employee.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                                <span className="text-xs font-bold text-slate-400">身份证号</span>
                                <span className="text-sm font-black font-mono text-slate-700">{employee.idCard}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs font-bold text-slate-400">手机号码</span>
                                <span className="text-sm font-black font-mono text-slate-700">{employee.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Editable Form */}
                    <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-5">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                            <h3 className="text-sm font-black text-slate-900">核心经营信息补足</h3>
                        </div>
                        
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">所属部门 <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                value={formData.dept}
                                onChange={(e) => setFormData({...formData, dept: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all placeholder-slate-300"
                                placeholder="请输入部门名称"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">岗位职称 <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all placeholder-slate-300"
                                placeholder="请输入职位名称"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">核定月薪 (税前) <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                <input 
                                    type="text" 
                                    value={formData.salary}
                                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-8 pr-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all placeholder-slate-300"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">拟入职日期 <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={formData.joinDate}
                                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto flex gap-3 pb-8">
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-500 active:scale-[0.98] transition-all"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleSaveInfo}
                        className="flex-[2] py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> 保存并更新
                    </button>
                </div>
            </DetailLayout>
        );
    }

    return (
        <>
            <DetailLayout 
                title="入职办理详情" 
                onBack={onBack}
                bgColor="bg-[#F8F9FB]"
                tag={{ label: '拟入职核验', color: 'text-indigo-600', bg: 'bg-indigo-50' }}
            >
                <div className="space-y-5 pb-24">
                    {isMissingInfo && (
                        <div className="bg-rose-50 border border-rose-200 rounded-[24px] p-4 flex gap-3 items-start animate-pulse shadow-sm">
                            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
                            <div>
                                <h4 className="text-xs font-black text-rose-700">扫码入职：核心信息缺失</h4>
                                <p className="text-[10px] text-rose-600/80 leading-relaxed mt-1 font-bold">该员工通过二维码自主完善了基础信息，请您核实并补足其部门、岗位及核定薪资标准。</p>
                            </div>
                        </div>
                    )}

                    {/* Employee Header */}
                    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                        <div className="absolute right-0 top-0 opacity-[0.03] transform translate-x-1/4 -translate-y-1/4 text-indigo-900">
                            {isQR ? <QrCode size={160} /> : <User size={160} />}
                        </div>
                        <div className={`absolute top-0 left-0 w-full h-1 ${isQR ? 'bg-gradient-to-r from-indigo-600 to-indigo-400' : 'bg-gradient-to-r from-indigo-500 to-blue-400'}`}></div>
                        
                        <div className="relative z-10 flex items-center gap-4 mb-6 pt-2">
                            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl font-black shadow-inner transition-colors ${
                                isQR ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                            }`}>
                                {employee.name.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-black text-slate-900">{employee.name}</h3>
                                    {isQR && <span className="text-[9px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm shadow-indigo-100"><QrCode size={10} /> 扫码自助</span>}
                                </div>
                                <p className="text-xs font-bold text-slate-400">{employee.dept || '待分配部门'} · {employee.role || '待确定岗位'}</p>
                            </div>
                        </div>
                        {!isMissingInfo && (
                            <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-slate-50 pt-5">
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">拟入职日期</p>
                                    <p className="text-sm font-black font-mono text-slate-900">{employee.joinDate}</p>
                                </div>
                                <div className="text-right">
                                    <button 
                                        onClick={() => setShowSalary(!showSalary)}
                                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 active:scale-95 transition-transform"
                                    >
                                        {showSalary ? <EyeOff size={10}/> : <Eye size={10}/>} {showSalary ? '隐藏薪资' : '查看薪资'}
                                    </button>
                                    <p className={`text-sm font-black font-mono mt-1 text-slate-900 ${!showSalary ? 'blur-sm opacity-50' : ''}`}>
                                        {employee.salary ? `¥ ${employee.salary}` : <span className="text-rose-500 font-bold">¥ 待补足</span>}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Personal Info */}
                    <InfoSection title="档案信息确认" onEdit={!isMissingInfo ? () => setIsEditing(true) : undefined} isUrgent={isMissingInfo}>
                        <InfoRow label="身份证号" value={employee.idCard} isMono isSensitive />
                        <InfoRow label="手机号码" value={employee.phone} isMono />
                        {isQR && (
                            <>
                                <InfoRow label="所属部门" value={employee.dept} />
                                <InfoRow label="岗位职称" value={employee.role} />
                            </>
                        )}
                    </InfoSection>

                    {/* Checklist Section */}
                    {!isMissingInfo && (
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">办理事项 (Action Required)</h4>
                            <StatusCard 
                                icon={ShieldCheck} 
                                title="基础资料核验" 
                                desc="包含实名认证、证件采集、银行卡信息核对。" 
                                status={employee.steps.info} 
                                stepKey="info"
                            />
                            <StatusCard 
                                icon={FileSignature} 
                                title="劳动合同签署" 
                                desc="发起电子劳动合同签署流程。" 
                                status={employee.steps.contract} 
                                stepKey="contract"
                            />
                            <StatusCard 
                                icon={Calculator} 
                                title="个税申报设置" 
                                desc="确认个税专项附加扣除及核定基数。" 
                                status={employee.steps.tax} 
                                stepKey="tax"
                            />
                            <StatusCard 
                                icon={Banknote} 
                                title="社保公积金办理" 
                                desc="五险一金本月增员申报及基数核定确认。" 
                                status={employee.steps.social} 
                                stepKey="social"
                            />
                        </div>
                    )}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto pb-8 flex flex-col gap-3">
                     {isMissingInfo && (
                         <button 
                            onClick={() => navigate('/work/hr-emp', { state: { action: 'add' } })}
                            className="w-full py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                         >
                            <User size={18} /> 新增员工
                         </button>
                     )}
                     <button 
                        onClick={onBack}
                        className="w-full py-3.5 rounded-2xl font-black text-sm bg-gray-900 text-white shadow-xl active:scale-[0.98] transition-all"
                     >
                        不再显示
                     </button>
                </div>
            </DetailLayout>

            {/* Modals Layer */}
            {modalType !== 'none' && (
                <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalType('none')}></div>
                    <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative z-10 animate-slide-up sm:animate-scale-up mb-safe sm:mb-0 max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-900">
                                {modalType === 'company_confirm' && '完善公司合同信息'}
                                {modalType === 'contract' && '完善合同细节'}
                                {modalType === 'contract_confirm' && '确认合同信息'}
                                {modalType === 'tax' && '个税申报设置'}
                                {modalType === 'social' && '社保增员办理'}
                            </h3>
                            <button onClick={() => setModalType('none')} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"><X size={18}/></button>
                        </div>

                        <div className="space-y-5">
                            {modalType === 'company_confirm' && (
                                <div className="space-y-4">
                                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 items-start mb-2">
                                        <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                                        <p className="text-[11px] text-amber-700 font-bold leading-relaxed">请确认企业基础信息，确认后将作为后续合同默认值。</p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">公司地址</label>
                                        <div className="relative">
                                            <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input 
                                                type="text" 
                                                value={companyInfo.address}
                                                onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">工作所在地</label>
                                        <div className="relative">
                                            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input 
                                                type="text" 
                                                value={companyInfo.workLocation}
                                                onChange={(e) => setCompanyInfo({...companyInfo, workLocation: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">发薪日</label>
                                            <div className="relative">
                                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input 
                                                    type="number" 
                                                    value={companyInfo.payDay}
                                                    onChange={(e) => setCompanyInfo({...companyInfo, payDay: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                                    placeholder="10"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">发薪月份</label>
                                            <select 
                                                value={companyInfo.payMonth}
                                                onChange={(e) => setCompanyInfo({...companyInfo, payMonth: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none"
                                            >
                                                <option value="上月">上月</option>
                                                <option value="本月">本月</option>
                                                <option value="下月">下月</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            setHasConfirmedCompanyInfo(true);
                                            setModalType('contract');
                                        }}
                                        className="w-full mt-4 bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        {hasConfirmedCompanyInfo ? '保存并返回' : '确认并下一步'} <ChevronRight size={16} strokeWidth={3} />
                                    </button>
                                </div>
                            )}

                            {modalType === 'contract' && (
                                <div className="space-y-5">
                                    {/* Company Info Link */}
                                    <div onClick={() => setModalType('company_confirm')} className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:bg-indigo-50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                                <Building2 size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">公司合同信息</p>
                                                <p className="text-xs font-black text-slate-700">{companyInfo.workLocation} · {companyInfo.payDay}日发薪</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600">
                                            修改 <ChevronRight size={12} strokeWidth={3} />
                                        </div>
                                    </div>

                                    {/* Position */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">岗位</label>
                                            <button 
                                                onClick={() => setShowPositionInput(!showPositionInput)}
                                                className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5"
                                            >
                                                {showPositionInput ? '取消新增' : <><Plus size={10}/> 新增岗位</>}
                                            </button>
                                        </div>
                                        {showPositionInput ? (
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    value={newPosition}
                                                    onChange={(e) => setNewPosition(e.target.value)}
                                                    placeholder="输入新岗位"
                                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                                />
                                                <button 
                                                    onClick={handleAddPosition}
                                                    className="bg-indigo-600 text-white px-3 rounded-xl active:scale-95 transition-all"
                                                >
                                                    <Check size={16} strokeWidth={3} />
                                                </button>
                                            </div>
                                        ) : (
                                            <select 
                                                value={contractForm.position}
                                                onChange={(e) => setContractForm({...contractForm, position: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none"
                                            >
                                                {positions.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        )}
                                    </div>

                                    {/* Salary */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">薪酬 (税前)</label>
                                            {isSalaryModified && (
                                                <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 animate-pulse">已修改</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                            <input 
                                                type="text" 
                                                value={contractForm.salary}
                                                onChange={(e) => handleSalaryChange(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-8 pr-4 text-xs font-black font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Start Date */}
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">合同开始日期</label>
                                        <div className="relative">
                                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input 
                                                type="date" 
                                                value={contractForm.startDate}
                                                onChange={(e) => setContractForm({...contractForm, startDate: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Term & Probation */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">合同年限 (年)</label>
                                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                                                <button 
                                                    onClick={() => setContractForm({...contractForm, term: Math.max(1, contractForm.term - 1)})}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <div className="flex-1 text-center text-xs font-black text-slate-700">{contractForm.term}</div>
                                                <button 
                                                    onClick={() => setContractForm({...contractForm, term: contractForm.term + 1})}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">试用期 (月)</label>
                                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                                                <button 
                                                    onClick={() => setContractForm({...contractForm, probation: Math.max(0, contractForm.probation - 1)})}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <div className="flex-1 text-center text-xs font-black text-slate-700">{contractForm.probation}</div>
                                                <button 
                                                    onClick={() => setContractForm({...contractForm, probation: contractForm.probation + 1})}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template */}
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">合同模版</label>
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-indigo-600">
                                                <FileText size={20} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-slate-800">{contractForm.template}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">点击切换模版</p>
                                            </div>
                                            <ChevronRight size={16} className="text-slate-300" />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            setModalType('contract_confirm');
                                        }}
                                        className="w-full mt-4 bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        下一步：确认并签署 <ChevronRight size={16} strokeWidth={3} />
                                    </button>
                                </div>
                            )}

                            {modalType === 'contract_confirm' && (
                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">签署人</p>
                                                <p className="text-sm font-black text-slate-800">{employee.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">岗位</p>
                                                <p className="text-sm font-black text-slate-800">{contractForm.position}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">薪酬 (税前)</p>
                                                <p className="text-sm font-black font-mono text-slate-800">¥ {contractForm.salary}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">开始日期</p>
                                                <p className="text-sm font-black font-mono text-slate-800">{contractForm.startDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">合同期限</p>
                                                <p className="text-sm font-black text-slate-800">{contractForm.term} 年</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">试用期</p>
                                                <p className="text-sm font-black text-slate-800">{contractForm.probation} 个月</p>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-slate-200">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">签署模版</p>
                                            <div className="flex items-center gap-2.5 text-sm font-black text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                <FileText size={16} className="text-indigo-500" />
                                                {contractForm.template}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setModalType('contract')}
                                            className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-500 active:scale-[0.98] transition-all"
                                        >
                                            返回修改
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setModalType('contract'); // Set back to contract for confirmAction logic
                                                confirmAction();
                                            }}
                                            className="flex-[2] py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            确认发起签署 <ChevronRight size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {modalType === 'tax' && (
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">个税核定基数 (月)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                        <input 
                                            type="number" 
                                            value={taxForm.base}
                                            onChange={(e) => setTaxForm({...taxForm, base: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-8 pr-4 text-lg font-black font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 ml-1">* 默认为核定月薪，如有差异请修改。</p>
                                    
                                    <button 
                                        onClick={confirmAction}
                                        className="w-full mt-8 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} strokeWidth={3} /> 确认并办理
                                    </button>
                                </div>
                            )}

                            {modalType === 'social' && (
                                <>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">社保缴费基数</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                            <input 
                                                type="number" 
                                                value={socialForm.socialBase}
                                                onChange={(e) => setSocialForm({...socialForm, socialBase: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-8 pr-4 text-sm font-black font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">公积金缴费基数</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                            <input 
                                                type="number" 
                                                value={socialForm.fundBase}
                                                onChange={(e) => setSocialForm({...socialForm, fundBase: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-8 pr-4 text-sm font-black font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={confirmAction}
                                        className="w-full mt-8 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} strokeWidth={3} /> 确认并办理
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OnboardingDetail;
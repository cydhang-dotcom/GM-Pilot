
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Banknote, FileSignature, CheckCircle2, ChevronRight, Play, Loader2, Eye, EyeOff, Circle, User, Edit3, Save, X, QrCode, AlertCircle, Calculator, Check, Calendar } from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';
import { OnboardingEmployee } from './OnboardingProcess';

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

const InfoRow = ({ label, value, isMono = false, isSensitive = false, showSensitive = true }: any) => (
    <div className="flex justify-between items-baseline border-b border-slate-50 pb-3 last:border-0 last:pb-0">
        <span className="text-xs text-slate-400 font-bold">{label}</span>
        <span className={`text-xs font-black text-slate-900 ${isMono ? 'font-mono' : ''} ${isSensitive && !showSensitive ? 'blur-md opacity-30 select-none' : ''}`}>
            {value || <span className="text-rose-500 font-bold flex items-center gap-1 animate-pulse"><AlertCircle size={10}/>待补充</span>}
        </span>
    </div>
);

const OnboardingDetail: React.FC<OnboardingDetailProps> = ({ employee, onBack, onUpdate }) => {
    const [loadingStep, setLoadingStep] = useState<string | null>(null);
    const [showSalary, setShowSalary] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Modals state
    const [modalType, setModalType] = useState<'none' | 'contract' | 'tax' | 'social'>('none');

    // Modal Form States
    const [contractForm, setContractForm] = useState({ term: '3', probation: '3' });
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
        if(modalType === 'tax' && !taxForm.base) setTaxForm({ base: employee.salary });
        if(modalType === 'social' && !socialForm.socialBase) setSocialForm({ socialBase: employee.salary, fundBase: employee.salary });
    }, [modalType, employee.salary]);

    const handleStepClick = (stepKey: 'contract' | 'tax' | 'social') => {
        if (isMissingInfo) {
            setIsEditing(true);
            return;
        }
        setModalType(stepKey);
    };

    const confirmAction = () => {
        if (modalType === 'none') return;
        
        setLoadingStep(modalType);
        setModalType('none');
        
        setTimeout(() => {
            const updatedSteps = { ...employee.steps, [modalType]: true };
            onUpdate({ ...employee, steps: updatedSteps });
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
            // Assuming once saved, info step is done
            steps: { ...employee.steps, info: true }
        });
        setIsEditing(false);
    };

    const StatusCard = ({ icon: Icon, title, desc, done, stepKey }: any) => (
        <div className={`bg-white rounded-[24px] p-5 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all ${done ? 'border-emerald-100' : 'border-slate-100'} ${!done && isMissingInfo && stepKey !== 'info' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
            <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                    done ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h5 className="text-sm font-black text-slate-900">{title}</h5>
                        {done ? (
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100">
                                <CheckCircle2 size={10} strokeWidth={3} /> 已办结
                            </span>
                        ) : (
                            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-100">
                                <Circle size={8} fill="currentColor" /> 待办理
                            </span>
                        )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{desc}</p>
                    
                    {!done && stepKey !== 'info' && (
                        <button 
                            onClick={() => handleStepClick(stepKey)}
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
                </div>
            </div>
        </div>
    );

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
                        <div className="bg-rose-50 border border-rose-200 rounded-[24px] p-4 flex gap-3 items-start animate-pulse shadow-sm cursor-pointer" onClick={() => setIsEditing(true)}>
                            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
                            <div>
                                <h4 className="text-xs font-black text-rose-700">扫码入职：核心信息缺失</h4>
                                <p className="text-[10px] text-rose-600/80 leading-relaxed mt-1 font-bold">该员工通过二维码自主完善了基础信息，请您核实并补足其部门、岗位及核定薪资标准。点击此处立即补充。</p>
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
                    </div>

                    {/* Personal Info */}
                    <InfoSection title="档案信息确认" onEdit={() => setIsEditing(true)} isUrgent={isMissingInfo}>
                        <InfoRow label="身份证号" value={employee.idCard} isMono />
                        <InfoRow label="手机号码" value={employee.phone} isMono />
                        {isQR && (
                            <>
                                <InfoRow label="所属部门" value={employee.dept} />
                                <InfoRow label="岗位职称" value={employee.role} />
                            </>
                        )}
                    </InfoSection>

                    {/* Checklist Section */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">办理事项 (Action Required)</h4>
                        <StatusCard 
                            icon={ShieldCheck} 
                            title="基础资料核验" 
                            desc="包含实名认证、证件采集、银行卡信息核对。" 
                            done={employee.steps.info} 
                            stepKey="info"
                        />
                        <StatusCard 
                            icon={FileSignature} 
                            title="劳动合同签署" 
                            desc="发起电子劳动合同签署流程。" 
                            done={employee.steps.contract} 
                            stepKey="contract"
                        />
                        <StatusCard 
                            icon={Calculator} 
                            title="个税申报设置" 
                            desc="确认个税专项附加扣除及核定基数。" 
                            done={employee.steps.tax} 
                            stepKey="tax"
                        />
                        <StatusCard 
                            icon={Banknote} 
                            title="社保公积金办理" 
                            desc="五险一金本月增员申报及基数核定确认。" 
                            done={employee.steps.social} 
                            stepKey="social"
                        />
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto pb-8">
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
                    <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative z-10 animate-slide-up sm:animate-scale-up mb-safe sm:mb-0">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-900">
                                {modalType === 'contract' && '发起电子合同'}
                                {modalType === 'tax' && '个税申报设置'}
                                {modalType === 'social' && '社保增员办理'}
                            </h3>
                            <button onClick={() => setModalType('none')} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"><X size={18}/></button>
                        </div>

                        <div className="space-y-5">
                            {modalType === 'contract' && (
                                <>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">合同期限</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['1年', '3年', '5年'].map(t => (
                                                <button key={t} onClick={() => setContractForm({...contractForm, term: t.replace('年', '')})} className={`py-3 rounded-2xl text-xs font-bold border transition-all ${contractForm.term === t.replace('年', '') ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">试用期</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['无', '3个月', '6个月'].map(t => (
                                                <button key={t} onClick={() => setContractForm({...contractForm, probation: t === '无' ? '0' : t.replace('个月', '')})} className={`py-3 rounded-2xl text-xs font-bold border transition-all ${contractForm.probation === (t === '无' ? '0' : t.replace('个月', '')) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                </>
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
                                </>
                            )}
                        </div>

                        <button 
                            onClick={confirmAction}
                            className="w-full mt-8 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Check size={18} strokeWidth={3} /> 确认并办理
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default OnboardingDetail;

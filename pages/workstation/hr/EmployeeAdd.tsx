
import React, { useState, useEffect } from 'react';
import { Briefcase, Banknote, FileSignature, Calculator, ShieldCheck, Check, X, ChevronRight, UserPlus, QrCode, Smartphone, Building2, MapPin, Clock, FileText, Plus, Minus, AlertCircle } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const SectionHeader = ({ icon: Icon, title, extra }: { icon: any, title: string, extra?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-4 pl-1">
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <Icon size={16} strokeWidth={2.5} />
            </div>
            <h4 className="text-sm font-black text-slate-900">{title}</h4>
        </div>
        {extra}
    </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text", prefix, required }: any) => (
    <div className="mb-4 last:mb-0">
        <label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase tracking-wide ml-1">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="relative">
            {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{prefix}</span>}
            <input 
                type={type}
                value={value} 
                onChange={onChange}
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder-slate-300 shadow-sm ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
                placeholder={placeholder}
            />
        </div>
    </div>
);

const ToggleRow = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div 
        onClick={onChange}
        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.99] ${checked ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'}`}
    >
        <span className={`text-xs font-bold ${checked ? 'text-indigo-700' : 'text-slate-600'}`}>{label}</span>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}>
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`}></div>
        </div>
    </div>
);

interface EmployeeAddProps {
    onBack: () => void;
    onSave: (emp: any) => void;
}

const EmployeeAdd: React.FC<EmployeeAddProps> = ({ onBack, onSave }) => {
    const [name, setName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [phone, setPhone] = useState('');
    const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);
    const [dept, setDept] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');

    const [isContractInitiated, setIsContractInitiated] = useState(false);
    const [contractTerm, setContractTerm] = useState(3); 
    const [probation, setProbation] = useState(3); 
    const [contractTemplate, setContractTemplate] = useState('标准劳动合同 (2024版)');

    const [companyInfo, setCompanyInfo] = useState({
        address: '上海市浦东新区张江高科技园区',
        workLocation: '上海',
        payDay: '10',
        payMonth: '本月'
    });
    const [hasConfirmedCompanyInfo, setHasConfirmedCompanyInfo] = useState(false);
    const [contractModalType, setContractModalType] = useState<'none' | 'contract'>('none');
    const [positions] = useState(['高级工程师', '产品经理', '运营专家', '人事主管', '财务经理']);
    const [showPositionInput, setShowPositionInput] = useState(false);
    const [newPosition, setNewPosition] = useState('');

    const [isDeptRoleRequired, setIsDeptRoleRequired] = useState(false);
    const [validationAlert, setValidationAlert] = useState('');

    const handleToggleContract = () => {
        const nextState = !isContractInitiated;
        if (nextState) {
            if (!dept || !role) {
                setValidationAlert("请先输入部门和岗位，再录入合同信息");
                setIsDeptRoleRequired(true);
                return;
            }
            setContractModalType('contract');
        } else {
            setContractModalType('none');
        }
        setIsContractInitiated(nextState);
    }; 

    const [isTaxDeclared, setIsTaxDeclared] = useState(true);
    const [taxBase, setTaxBase] = useState('');
    const [isTaxBaseCustomized, setIsTaxBaseCustomized] = useState(false);
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [tempTaxBase, setTempTaxBase] = useState('');

    const [isInsured, setIsInsured] = useState(true);
    const [socialBase, setSocialBase] = useState('');
    const [fundBase, setFundBase] = useState('');
    const [isSocialFundCustomized, setIsSocialFundCustomized] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [tempSocialBase, setTempSocialBase] = useState('');
    const [tempFundBase, setTempFundBase] = useState('');

    const [showQrModal, setShowQrModal] = useState(false);

    useEffect(() => { if (!isTaxBaseCustomized) setTaxBase(salary); }, [salary, isTaxBaseCustomized]);
    useEffect(() => { if (!isSocialFundCustomized) { setSocialBase(salary); setFundBase(salary); } }, [salary, isSocialFundCustomized]);

    const handleSave = () => {
        if (!name || !dept || !role || !joinDate || !salary) {
            setValidationAlert("请完整填写姓名、部门、岗位、入职日期及核定月薪");
            return;
        }
        onSave({
            id: Date.now(),
            name, dept, role, phone, joinDate,
            status: '试用',
            email: `${name || 'user'}@company.com`,
            idCard: idCard || '310XXXXXXXXXXXXX',
            contractEnd: '2026-01-01'
        });
    };

    return (
        <DetailLayout title="员工入职录入" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5 pb-24">
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <SectionHeader 
                        icon={Briefcase} 
                        title="1. 员工信息" 
                        extra={
                            <button 
                                onClick={() => setShowQrModal(true)}
                                className="flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100 active:scale-95 transition-all shadow-sm"
                            >
                                <QrCode size={12} strokeWidth={2.5} /> 员工自助扫码
                            </button>
                        }
                    />
                    <InputField label="姓名" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="请输入真实姓名" required />
                    <InputField label="身份证号" value={idCard} onChange={(e: any) => setIdCard(e.target.value)} placeholder="18位身份证号码" />
                    <InputField label="手机号码" value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder="用于接收电子合同" type="tel" />
                    <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-4 mt-2">
                        <InputField label="部门" value={dept} onChange={(e: any) => setDept(e.target.value)} placeholder="如：技术部" required={isDeptRoleRequired} />
                        <InputField label="岗位" value={role} onChange={(e: any) => setRole(e.target.value)} placeholder="如：高级工程师" required={isDeptRoleRequired} />
                    </div>
                    <InputField label="入职日期" value={joinDate} onChange={(e: any) => setJoinDate(e.target.value)} type="date" required />
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <SectionHeader icon={Banknote} title="2. 薪酬核定" />
                    <InputField label="核定月薪 (税前)" value={salary} onChange={(e: any) => setSalary(e.target.value)} placeholder="0.00" prefix="¥" required />
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <SectionHeader icon={FileSignature} title="3. 合同信息" />
                    <ToggleRow label="录入合同信息" checked={isContractInitiated} onChange={handleToggleContract} />
                    {isContractInitiated && (
                        <div 
                            onClick={() => setContractModalType('contract')}
                            className="mt-4 animate-fade-in bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 cursor-pointer hover:bg-slate-100 transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">合同详情</p>
                                    <p className="text-sm font-black text-slate-900 leading-relaxed">
                                        {contractTerm === 0 ? '无固定期限' : `${contractTerm}年期`} · 试用期{probation}个月
                                    </p>
                                </div>
                                <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5">
                                    修改 <ChevronRight size={12} strokeWidth={3} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <SectionHeader icon={Calculator} title="4. 个税申报" />
                    <ToggleRow label="申报个人所得税" checked={isTaxDeclared} onChange={() => setIsTaxDeclared(!isTaxDeclared)} />
                    {isTaxDeclared && (
                        <div className="mt-4 animate-fade-in bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 flex justify-between items-center">
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">个税核定基数</p><button onClick={() => { setTempTaxBase(taxBase || salary); setShowTaxModal(true); }} className="text-lg font-black font-mono text-indigo-600 border-b border-indigo-200 border-dashed flex items-center gap-1.5">¥ {taxBase || '0.00'}<ChevronRight size={14} strokeWidth={3} /></button></div>
                            <span className={`text-[9px] px-2 py-1 rounded-lg font-bold ${isTaxBaseCustomized ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>{isTaxBaseCustomized ? '已手动自定义' : '默认同月薪'}</span>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <SectionHeader icon={ShieldCheck} title="5. 社保公积金" />
                    <ToggleRow label="办理参保 (五险一金)" checked={isInsured} onChange={() => setIsInsured(!isInsured)} />
                    {isInsured && (
                        <div className="mt-4 animate-fade-in bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200">
                            <div className="flex justify-between items-center mb-3">
                                <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">社保/公积金基数</p><button onClick={() => { setTempSocialBase(socialBase || salary); setTempFundBase(fundBase || salary); setShowSocialModal(true); }} className="text-lg font-black font-mono text-indigo-600 border-b border-indigo-200 border-dashed flex items-center gap-1.5">¥ {socialBase || '0.00'}<ChevronRight size={14} strokeWidth={3} /></button></div>
                                <span className={`text-[9px] px-2 py-1 rounded-lg font-bold ${isSocialFundCustomized ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>{isSocialFundCustomized ? '已手动自定义' : '默认同月薪'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Modal */}
            {showQrModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowQrModal(false)}></div>
                    <div className="bg-white w-full rounded-[32px] p-8 shadow-2xl relative z-10 animate-scale-up max-w-sm text-center">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <Smartphone size={20} className="text-indigo-600" />
                                <h3 className="font-black text-slate-900">员工自助入职</h3>
                            </div>
                            <button onClick={() => setShowQrModal(false)} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={24}/></button>
                        </div>
                        
                        <div className="bg-indigo-50/50 rounded-3xl p-6 mb-6 border border-indigo-100 relative">
                            {/* Company Info Header */}
                            <div className="flex flex-col items-center mb-5">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50 mb-2">
                                    <Building2 size={24} className="text-indigo-600" />
                                </div>
                                <h4 className="text-sm font-black text-slate-900">上海千机网络科技有限公司</h4>
                                <span className="text-[10px] text-indigo-400 font-bold mt-0.5">入职登记 · 身份核验</span>
                            </div>

                            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 w-fit mx-auto">
                                <QrCode size={160} className="text-indigo-900" strokeWidth={1.5} />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                有效期 24 小时
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-900">让员工扫描上方二维码</p>
                            <p className="text-xs text-slate-400 leading-relaxed">员工可自行完善个人基本资料、上传证件照片并核对入职信息。</p>
                        </div>

                        <button 
                            onClick={() => setShowQrModal(false)}
                            className="w-full mt-8 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all text-sm"
                        >
                            完成分享
                        </button>
                    </div>
                </div>
            )}

            {showTaxModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowTaxModal(false)}></div>
                    <div className="bg-white w-full rounded-[32px] p-6 shadow-2xl relative z-10 animate-scale-up max-w-sm">
                        <div className="flex justify-between items-center mb-6"><h3 className="font-black text-slate-900">修改个税基数</h3><button onClick={() => setShowTaxModal(false)} className="text-slate-400 p-1"><X size={20}/></button></div>
                        <div className="mb-6"><p className="text-xs text-slate-500 mb-3">当前核定月薪：<span className="font-mono font-black text-slate-900">¥ {salary || '0.00'}</span></p><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span><input type="number" value={tempTaxBase} onChange={(e) => setTempTaxBase(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-8 pr-4 text-xl font-black font-mono outline-none" /></div></div>
                        <button onClick={() => { setTaxBase(tempTaxBase); setIsTaxBaseCustomized(true); setShowTaxModal(false); }} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 mb-2"><Check size={18} /> 确认修改</button>
                        <button onClick={() => { setTaxBase(salary); setIsTaxBaseCustomized(false); setShowTaxModal(false); }} className="w-full text-slate-500 text-sm font-bold py-2">恢复同步月薪</button>
                    </div>
                </div>
            )}

            {showSocialModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSocialModal(false)}></div>
                    <div className="bg-white w-full rounded-[32px] p-6 shadow-2xl relative z-10 animate-scale-up max-w-sm">
                        <div className="flex justify-between items-center mb-6"><h3 className="font-black text-slate-900">修改参保基数</h3><button onClick={() => setShowSocialModal(false)} className="text-slate-400 p-1"><X size={20}/></button></div>
                        <div className="space-y-4 mb-6"><p className="text-xs text-slate-500">当前核定月薪：<span className="font-mono font-black text-slate-900">¥ {salary || '0.00'}</span></p><div><label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase ml-1">社保基数</label><input type="number" value={tempSocialBase} onChange={(e) => setTempSocialBase(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-mono font-black text-slate-900" /></div><div><label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase ml-1">公积金基数</label><input type="number" value={tempFundBase} onChange={(e) => setTempFundBase(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-mono font-black text-slate-900" /></div></div>
                        <button onClick={() => { setSocialBase(tempSocialBase); setFundBase(tempFundBase); setIsSocialFundCustomized(true); setShowSocialModal(false); }} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 mb-2"><Check size={18} /> 确认修改</button>
                        <button onClick={() => { setSocialBase(salary); setFundBase(salary); setIsSocialFundCustomized(false); setShowSocialModal(false); }} className="w-full text-slate-500 text-sm font-bold py-2">恢复同步月薪</button>
                    </div>
                </div>
            )}

            {contractModalType !== 'none' && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setContractModalType('none')}></div>
                    <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative z-10 animate-slide-up sm:animate-scale-up mb-safe sm:mb-0 max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-900">
                                完善合同细节
                            </h3>
                            <button onClick={() => setContractModalType('none')} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"><X size={18}/></button>
                        </div>

                        <div className="space-y-5">
                            {contractModalType === 'contract' && (
                                <div className="space-y-5">
                                    {/* Position & Salary */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">部门</label>
                                            <input 
                                                type="text"
                                                value={dept}
                                                onChange={(e) => setDept(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-xs font-black text-slate-700 outline-none focus:border-indigo-300 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">岗位</label>
                                            <input 
                                                type="text"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-xs font-black text-slate-700 outline-none focus:border-indigo-300 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 flex items-center justify-between">
                                            核定月薪 (税前)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">¥</span>
                                            <input 
                                                type="number"
                                                value={salary}
                                                onChange={(e) => setSalary(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-7 pr-3 text-xs font-black text-slate-700 outline-none focus:border-indigo-300 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Start Date */}
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">合同开始日期</label>
                                        <div className="relative">
                                            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input 
                                                type="date"
                                                value={joinDate}
                                                onChange={(e) => setJoinDate(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-3 text-xs font-black text-slate-700 outline-none focus:border-indigo-300 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Term & Probation */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">合同年限 (年)</label>
                                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                                                <button 
                                                    onClick={() => setContractTerm(Math.max(1, contractTerm - 1))}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <div className="flex-1 text-center text-xs font-black text-slate-700">{contractTerm}</div>
                                                <button 
                                                    onClick={() => setContractTerm(contractTerm + 1)}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">试用期 (月)</label>
                                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                                                <button 
                                                    onClick={() => setProbation(Math.max(0, probation - 1))}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <div className="flex-1 text-center text-xs font-black text-slate-700">{probation}</div>
                                                <button 
                                                    onClick={() => setProbation(probation + 1)}
                                                    className="p-2.5 text-slate-400 hover:bg-slate-100 active:bg-slate-200"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setContractModalType('none')}
                                        className="w-full mt-4 bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        保存合同信息
                                    </button>
                                </div>
                            )}

                            {contractModalType === 'contract_confirm' && (
                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">签署人</p>
                                                <p className="text-sm font-black text-slate-800">{name || '待输入'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">岗位</p>
                                                <p className="text-sm font-black text-slate-800">{role || '待输入'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">薪酬 (税前)</p>
                                                <p className="text-sm font-black font-mono text-slate-800">¥ {salary || '0.00'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">开始日期</p>
                                                <p className="text-sm font-black font-mono text-slate-800">{joinDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">合同期限</p>
                                                <p className="text-sm font-black text-slate-800">{contractTerm === 0 ? '无固定期限' : `${contractTerm}年`}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">试用期</p>
                                                <p className="text-sm font-black text-slate-800">{probation} 个月</p>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-slate-200">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">签署模版</p>
                                            <div className="flex items-center gap-2.5 text-sm font-black text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                <FileText size={16} className="text-indigo-500" />
                                                {contractTemplate}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setContractModalType('contract')}
                                            className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-500 active:scale-[0.98] transition-all"
                                        >
                                            返回修改
                                        </button>
                                        <button 
                                            onClick={() => setContractModalType('none')}
                                            className="flex-[2] py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            确认并保存 <Check size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50 pb-8">
                <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"><UserPlus size={18} strokeWidth={2.5}/> 确认入职</button>
            </div>

            {validationAlert && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setValidationAlert('')}></div>
                    <div className="bg-white w-full rounded-[32px] p-6 shadow-2xl relative z-10 animate-scale-up max-w-sm text-center">
                        <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">提示</h3>
                        <p className="text-sm text-slate-500 mb-6">{validationAlert}</p>
                        <button 
                            onClick={() => setValidationAlert('')}
                            className="w-full bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-xl active:scale-[0.98] transition-all"
                        >
                            我知道了
                        </button>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
};

export default EmployeeAdd;


import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Briefcase, Calendar, ChevronRight, UserPlus, FileSignature, CreditCard, ShieldCheck, Banknote, Calculator, X, Check, Plus } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Types & Data ---

const MOCK_EMPLOYEES = [
  { id: 1, name: '张伟', dept: '技术部', role: '高级工程师', status: '正式', joinDate: '2021-03-15', phone: '13812345678', email: 'zhangwei@company.com', idCard: '31010419900101****', contractEnd: '2024-03-15' },
  { id: 2, name: '李娜', dept: '市场部', role: '市场经理', status: '正式', joinDate: '2022-06-01', phone: '13987654321', email: 'lina@company.com', idCard: '31010419920505****', contractEnd: '2025-06-01' },
  { id: 3, name: '王强', dept: '技术部', role: '前端开发', status: '试用', joinDate: '2023-11-10', phone: '15000000000', email: 'wangqiang@company.com', idCard: '32050119950808****', contractEnd: '2026-11-10' },
  { id: 4, name: '陈杰', dept: '设计部', role: 'UI设计师', status: '正式', joinDate: '2022-09-01', phone: '13711112222', email: 'chenjie@company.com', idCard: '31011519961212****', contractEnd: '2025-09-01' },
];

// --- Components ---

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-3 px-1">
        <Icon size={16} className="text-indigo-600" />
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
    </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text", prefix, required }: any) => (
    <div className="mb-3 last:mb-0">
        <label className="text-[10px] font-bold text-gray-400 mb-1.5 block uppercase tracking-wide">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="relative">
            {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">{prefix}</span>}
            <input 
                type={type}
                value={value} 
                onChange={onChange}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-colors font-medium text-gray-900 ${prefix ? 'pl-7 pr-3' : 'px-3'}`}
                placeholder={placeholder}
            />
        </div>
    </div>
);

const ToggleRow = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div 
        onClick={onChange}
        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'}`}
    >
        <span className={`text-xs font-bold ${checked ? 'text-indigo-700' : 'text-gray-600'}`}>{label}</span>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}>
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`}></div>
        </div>
    </div>
);

// --- Level 3: Add Employee View ---

const AddEmployeeView = ({ onBack, onSave }: { onBack: () => void, onSave: (emp: any) => void }) => {
    // 1. Employee Info
    const [name, setName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [phone, setPhone] = useState('');
    const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);
    const [dept, setDept] = useState('');
    const [role, setRole] = useState('');
    
    // 2. Salary (DEFAULT ON)
    const [isSalaryDetermined, setIsSalaryDetermined] = useState(true);
    const [salary, setSalary] = useState('');

    // 3. Contract Info (DEFAULT OFF)
    const [isContractInitiated, setIsContractInitiated] = useState(false);
    const [contractTerm, setContractTerm] = useState('3'); 
    const [probation, setProbation] = useState('3'); 

    // 4. Tax
    const [isTaxDeclared, setIsTaxDeclared] = useState(true);
    const [taxBase, setTaxBase] = useState('');
    const [isTaxBaseCustomized, setIsTaxBaseCustomized] = useState(false);
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [tempTaxBase, setTempTaxBase] = useState('');

    // 5. Social Security & Fund
    const [isInsured, setIsInsured] = useState(true);
    const [socialBase, setSocialBase] = useState('');
    const [fundBase, setFundBase] = useState('');
    const [isSocialFundCustomized, setIsSocialFundCustomized] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [tempSocialBase, setTempSocialBase] = useState('');
    const [tempFundBase, setTempFundBase] = useState('');

    // Composite Mandatory Logic: Dept/Role/JoinDate are required if either Salary or Contract toggle is ON
    const isJobInfoRequired = isSalaryDetermined || isContractInitiated;

    // Sync tax base logic
    useEffect(() => {
        if (!isTaxBaseCustomized) {
            setTaxBase(salary);
        }
    }, [salary, isTaxBaseCustomized]);

    // Sync social & fund base logic
    useEffect(() => {
        if (!isSocialFundCustomized) {
            setSocialBase(salary);
            setFundBase(salary);
        }
    }, [salary, isSocialFundCustomized]);

    // Handlers for Tax Modal
    const openTaxEdit = () => {
        setTempTaxBase(taxBase || salary);
        setShowTaxModal(true);
    };
    const confirmTaxBase = () => {
        setTaxBase(tempTaxBase);
        setIsTaxBaseCustomized(true);
        setShowTaxModal(false);
    };
    const resetTaxBase = () => {
        setTaxBase(salary);
        setIsTaxBaseCustomized(false);
        setShowTaxModal(false);
    };

    // Handlers for Social Modal
    const openSocialEdit = () => {
        setTempSocialBase(socialBase || salary);
        setTempFundBase(fundBase || salary);
        setShowSocialModal(true);
    };
    const confirmSocialBase = () => {
        setSocialBase(tempSocialBase);
        setFundBase(tempFundBase);
        setIsSocialFundCustomized(true);
        setShowSocialModal(false);
    };
    const resetSocialBase = () => {
        setSocialBase(salary);
        setFundBase(salary);
        setIsSocialFundCustomized(false);
        setShowSocialModal(false);
    };

    const handleSave = () => {
        if (!name) {
            alert("请输入姓名");
            return;
        }
        
        // Composite Validation
        if (isJobInfoRequired) {
            if (!dept || !role || !joinDate) {
                alert("开启核定薪酬或发起合同时，部门、岗位、入职日期为必填项");
                return;
            }
        }
        
        if (isSalaryDetermined && !salary) {
            alert("请填写核定月薪");
            return;
        }

        const newEmp = {
            id: Date.now(),
            name,
            dept: dept || '未定岗',
            role: role || '待定',
            phone: phone || '',
            joinDate: joinDate || new Date().toISOString().split('T')[0],
            status: isSalaryDetermined ? '试用' : '待入职',
            email: `${name || 'user'}@company.com`,
            idCard: idCard || '310XXXXXXXXXXXXX',
            contractEnd: '2026-01-01'
        };
        onSave(newEmp);
    };

    return (
        <DetailLayout title="员工入职录入" onBack={onBack} bgColor="bg-gray-50">
            <div className="space-y-4 pb-24">
                
                {/* 1. Employee Info */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <SectionHeader icon={Briefcase} title="1. 员工信息" />
                    <div className="space-y-3 mb-4">
                        <InputField label="姓名" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="请输入真实姓名" required />
                        <InputField label="身份证号" value={idCard} onChange={(e: any) => setIdCard(e.target.value)} placeholder="18位身份证号码" />
                        <InputField label="手机号码" value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder="用于接收电子合同" type="tel" />
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <InputField 
                                label="部门" 
                                value={dept} 
                                onChange={(e: any) => setDept(e.target.value)} 
                                placeholder="如：技术部" 
                                required={isJobInfoRequired} 
                            />
                            <InputField 
                                label="岗位" 
                                value={role} 
                                onChange={(e: any) => setRole(e.target.value)} 
                                placeholder="如：高级工程师" 
                                required={isJobInfoRequired} 
                            />
                        </div>
                        <InputField 
                            label="入职日期" 
                            value={joinDate} 
                            onChange={(e: any) => setJoinDate(e.target.value)} 
                            type="date" 
                            required={isJobInfoRequired} 
                        />
                    </div>
                </div>

                {/* 2. Salary */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <SectionHeader icon={Banknote} title="2. 薪酬核定" />
                    <div className="mb-4">
                        <ToggleRow label="核定薪酬标准" checked={isSalaryDetermined} onChange={() => setIsSalaryDetermined(!isSalaryDetermined)} />
                    </div>
                    {isSalaryDetermined && (
                        <div className="animate-fade-in">
                            <InputField label="核定月薪 (税前)" value={salary} onChange={(e: any) => setSalary(e.target.value)} placeholder="0.00" prefix="¥" required />
                        </div>
                    )}
                </div>

                {/* 3. Contract Info */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <SectionHeader icon={FileSignature} title="3. 合同信息" />
                    <div className="mb-4">
                        <ToggleRow label="发起合同签订" checked={isContractInitiated} onChange={() => setIsContractInitiated(!isContractInitiated)} />
                    </div>
                    {isContractInitiated && (
                        <div className="grid grid-cols-2 gap-3 animate-fade-in">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 mb-1.5 block uppercase tracking-wide">合同期限</label>
                                <select value={contractTerm} onChange={(e) => setContractTerm(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm outline-none transition-colors font-medium text-gray-900 appearance-none"><option value="3">3年 (标准)</option><option value="1">1年</option><option value="5">5年</option><option value="0">无固定期限</option></select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 mb-1.5 block uppercase tracking-wide">试用期</label>
                                <select value={probation} onChange={(e) => setProbation(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm outline-none transition-colors font-medium text-gray-900 appearance-none"><option value="3">3个月</option><option value="6">6个月</option><option value="1">1个月</option><option value="0">无试用期</option></select>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Tax */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <SectionHeader icon={Calculator} title="4. 个税申报" />
                    <div className="mb-4">
                        <ToggleRow label="申报个人所得税" checked={isTaxDeclared} onChange={() => setIsTaxDeclared(!isTaxDeclared)} />
                    </div>
                    {isTaxDeclared && (
                        <div className="animate-fade-in bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">个税核定基数</p>
                                    <button 
                                        onClick={openTaxEdit}
                                        className="text-lg font-bold font-mono text-indigo-600 border-b border-indigo-200 border-dashed hover:text-indigo-700 transition-all flex items-center gap-1.5"
                                    >
                                        ¥ {taxBase || '0.00'}
                                        <ChevronRight size={14} className="text-indigo-400" />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${isTaxBaseCustomized ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                        {isTaxBaseCustomized ? '已手动自定义' : '默认同月薪'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 5. Social Security & Fund */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <SectionHeader icon={ShieldCheck} title="5. 社保公积金" />
                    <div className="mb-4">
                        <ToggleRow label="办理参保 (五险一金)" checked={isInsured} onChange={() => setIsInsured(!isInsured)} />
                    </div>
                    {isInsured && (
                        <div className="animate-fade-in bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">社保/公积金基数</p>
                                    <button 
                                        onClick={openSocialEdit}
                                        className="text-lg font-bold font-mono text-indigo-600 border-b border-indigo-200 border-dashed hover:text-indigo-700 transition-all flex items-center gap-1.5"
                                    >
                                        ¥ {socialBase || '0.00'}
                                        <ChevronRight size={14} className="text-indigo-400" />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${isSocialFundCustomized ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                        {isSocialFundCustomized ? '已手动自定义' : '默认同月薪'}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                                <div>
                                    <span className="text-[9px] text-gray-400 block mb-0.5">社保基数</span>
                                    <span className="text-xs font-bold font-mono text-gray-700">¥ {socialBase || '0.00'}</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-400 block mb-0.5">公积金基数</span>
                                    <span className="text-xs font-bold font-mono text-gray-700">¥ {fundBase || '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tax Edit Modal */}
            {showTaxModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowTaxModal(false)}></div>
                    <div className="bg-white w-full rounded-[24px] p-6 shadow-2xl relative z-10 animate-scale-up max-w-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900">修改个税基数</h3>
                            <button onClick={() => setShowTaxModal(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={20}/></button>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-500 mb-3">当前核定月薪：<span className="font-mono font-bold text-gray-900">¥ {salary || '0.00'}</span></p>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                                <input type="number" value={tempTaxBase} onChange={(e) => setTempTaxBase(e.target.value)} autoFocus className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-8 pr-4 text-xl font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={confirmTaxBase} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"><Check size={18} /> 确认修改</button>
                            <button onClick={resetTaxBase} className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">恢复同步月薪</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Social & Fund Edit Modal */}
            {showSocialModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSocialModal(false)}></div>
                    <div className="bg-white w-full rounded-[24px] p-6 shadow-2xl relative z-10 animate-scale-up max-w-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900">修改参保基数</h3>
                            <button onClick={() => setShowSocialModal(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={20}/></button>
                        </div>
                        <div className="mb-6 space-y-4">
                            <p className="text-xs text-gray-500">当前核定月薪：<span className="font-mono font-bold text-gray-900">¥ {salary || '0.00'}</span></p>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase">社保核定基数</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                                    <input type="number" value={tempSocialBase} onChange={(e) => setTempSocialBase(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-8 pr-4 text-lg font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase">公积金核定基数</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                                    <input type="number" value={tempFundBase} onChange={(e) => setTempFundBase(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-8 pr-4 text-lg font-bold font-mono outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={confirmSocialBase} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"><Check size={18} /> 确认修改</button>
                            <button onClick={resetSocialBase} className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">恢复同步月薪</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-50">
                <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"><UserPlus size={18} /> 确认入职</button>
            </div>
        </DetailLayout>
    );
};

// --- Level 3: Detail View ---

const EmployeeDetail = ({ employee, onBack }: { employee: typeof MOCK_EMPLOYEES[0], onBack: () => void }) => {
    return (
        <DetailLayout
            title="员工档案"
            onBack={onBack}
            tag={{ 
                label: employee.status, 
                color: employee.status === '正式' ? 'text-emerald-600' : 'text-blue-600',
                bg: employee.status === '正式' ? 'bg-emerald-50' : 'bg-blue-50'
            }}
            bgColor="bg-gray-50"
        >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-50 to-white -z-10"></div>
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-md border-4 border-white mb-3">{employee.name.charAt(0)}</div>
                <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-sm text-gray-500 mt-1 mb-4">{employee.dept} · {employee.role}</p>
                <div className="flex gap-3 w-full">
                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"><Phone size={14} /> 呼叫</button>
                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"><Mail size={14} /> 邮件</button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-5 py-2">
                <div className="py-3 border-b border-gray-50 flex items-center gap-2"><Briefcase size={16} className="text-gray-400" /><span className="text-sm font-bold text-gray-900">基本信息</span></div>
                <div className="py-3 flex justify-between"><span className="text-xs text-gray-500">工号</span><span className="text-xs font-bold text-gray-900">EMP-{String(employee.id).padStart(3, '0')}</span></div>
                <div className="py-3 flex justify-between border-t border-gray-50"><span className="text-xs text-gray-500">入职日期</span><span className="text-xs font-bold text-gray-900">{employee.joinDate}</span></div>
                <div className="py-3 flex justify-between border-t border-gray-50"><span className="text-xs text-gray-500">身份证号</span><span className="text-xs font-bold text-gray-900 font-mono">{employee.idCard}</span></div>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Dashboard View ---

const Employee: React.FC = () => {
    const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
    const [selectedEmp, setSelectedEmp] = useState<any | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddEmployee = (newEmp: any) => {
        setEmployees([newEmp, ...employees]);
        setIsAdding(false);
    };

    if (isAdding) return <AddEmployeeView onBack={() => setIsAdding(false)} onSave={handleAddEmployee} />;
    if (selectedEmp) return <EmployeeDetail employee={selectedEmp} onBack={() => setSelectedEmp(null)} />;

    return (
        <div className="space-y-4 animate-fade-in pb-20">
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center"><p className="text-[10px] text-gray-400 mb-1">在职员工</p><p className="text-lg font-bold text-gray-900">{employees.length}</p></div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center"><p className="text-[10px] text-gray-400 mb-1">本月入职</p><p className="text-lg font-bold text-emerald-600">+{3 + (employees.length - MOCK_EMPLOYEES.length)}</p></div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center"><p className="text-[10px] text-gray-400 mb-1">本月离职</p><p className="text-lg font-bold text-rose-600">-1</p></div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2"><Search size={16} className="text-gray-400" /><input type="text" placeholder="搜索姓名、部门..." className="flex-1 text-xs outline-none text-gray-700 placeholder-gray-300"/></div>
            </div>

            <div className="space-y-3 pb-4">
                {employees.map(emp => (
                    <div key={emp.id} onClick={() => setSelectedEmp(emp)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] transition-transform cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">{emp.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start"><h4 className="text-sm font-bold text-gray-900">{emp.name}</h4><span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${emp.status === '正式' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{emp.status}</span></div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{emp.dept} · {emp.role}</p>
                            <p className="text-xs text-gray-300 mt-1 font-mono">{emp.phone}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                ))}
            </div>

            {/* Extended FAB - Floating Action Button for Add Employee */}
            <div className="fixed bottom-24 right-6 z-40">
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-indigo-600 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 shadow-2xl shadow-indigo-400/40 active:scale-95 transition-all group"
                >
                    <div className="bg-white/20 p-1 rounded-full">
                        <Plus size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black tracking-tight">新增员工</span>
                </button>
            </div>
        </div>
    );
};

export default Employee;

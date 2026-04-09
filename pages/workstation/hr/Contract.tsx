import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle2, FileSignature, ChevronRight, History, Calendar, Award, AlertCircle, FileWarning, XCircle, Filter, Check, Plus, Minus, Building2, MapPin, X, Loader2, FileText } from 'lucide-react';
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

// --- Level 4 Detail (劳动合同详情) ---
const Field = ({ label, value, isEditing, onChange }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5 border-b border-slate-50 last:border-0">
        <span className="text-xs font-bold text-slate-400 w-24 shrink-0">{label}</span>
        {isEditing ? (
            <input 
                type="text" 
                value={value} 
                onChange={e => onChange(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-slate-900 outline-none focus:border-indigo-500 transition-colors"
            />
        ) : (
            <span className="text-sm font-black text-slate-900 text-right flex-1">{value}</span>
        )}
    </div>
);

const ContractHistoryDetail = ({ employee, contract, onBack }: { employee: typeof MOCK_CONTRACTS[0], contract: typeof MOCK_CONTRACTS[0]['history'][0], onBack: () => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        contractName: contract.type,
        partyA: '某某科技有限公司',
        partyB: employee.name,
        period: contract.period,
        probation: (contract.type.includes('首签') || contract.type.includes('试用期')) ? '3个月' : '无',
        signType: contract.type.includes('首签') || contract.type.includes('试用期') ? '首次签订' : 
                  contract.type.includes('无固定期限') ? '无固定期限' : '续约',
        position: employee.dept + ' 核心岗位',
        salary: '18000',
        partyASignTime: '2022-03-14 11:49:08',
        partyBSignTime: '2022-03-14 11:44:35'
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <DetailLayout title="劳动合同详情" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="p-6 space-y-6 pb-32">
                <div className="mb-2">
                    <h2 className="text-2xl font-black text-slate-900">合同信息</h2>
                    <p className="text-xs font-bold text-slate-400 mt-1">查看或修改当前合同的详细条款</p>
                </div>

                <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">主体信息</h3>
                    <Field label="合同名称" value={formData.contractName} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, contractName: v})} />
                    <Field label="合同甲方" value={formData.partyA} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, partyA: v})} />
                    <Field label="合同乙方" value={formData.partyB} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, partyB: v})} />
                    <Field label="签订类型" value={formData.signType} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, signType: v})} />
                </div>

                <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">条款明细</h3>
                    <Field label="合同期限" value={formData.period} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, period: v})} />
                    <Field label="试用期" value={formData.probation} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, probation: v})} />
                    <Field label="岗位" value={formData.position} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, position: v})} />
                    <Field label="合同薪酬" value={formData.salary} isEditing={isEditing} onChange={(v: string) => setFormData({...formData, salary: v})} />
                </div>

                <div className="flex flex-col items-center justify-center gap-1.5 pt-4 pb-8 opacity-50">
                    <p className="text-[10px] font-bold font-mono text-slate-400">甲方签署于 {formData.partyASignTime}</p>
                    <p className="text-[10px] font-bold font-mono text-slate-400">乙方签署于 {formData.partyBSignTime}</p>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto pb-8">
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`w-full py-4 rounded-2xl font-black text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                        isEditing ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                    }`}
                >
                    {isEditing ? <><CheckCircle2 size={18} /> 保存修改</> : <><FileSignature size={18} /> 编辑信息</>}
                </button>
            </div>
        </DetailLayout>
    );
};

// --- Level 3 Detail (完美还原图片中的“合同全景档案”) ---
const ContractDetail = ({ employee, onBack }: { employee: typeof MOCK_CONTRACTS[0], onBack: () => void }) => {
    const navigate = useNavigate();
    const isExpiring = employee.status === 'expiring';
    const isOverdue = employee.status === 'overdue';

    // --- Renewal Flow States ---
    const [modalType, setModalType] = useState<'none' | 'company_confirm' | 'contract' | 'contract_confirm' | 'not_renew'>('none');
    const [viewingContract, setViewingContract] = useState<typeof MOCK_CONTRACTS[0]['history'][0] | null>(null);
    const [companyInfo, setCompanyInfo] = useState({
        address: '上海市浦东新区张江高科技园区',
        workLocation: '上海',
        payDay: '10',
        payMonth: '本月'
    });
    const [hasConfirmedCompanyInfo, setHasConfirmedCompanyInfo] = useState(false);
    const [contractForm, setContractForm] = useState({ 
        position: employee.dept + ' 核心岗位',
        salary: '18000',
        startDate: new Date().toISOString().split('T')[0],
        term: 3, 
        signingType: '续约', // 续约 / 无固定
        template: '标准劳动合同 (2024版)'
    });
    const [loadingAction, setLoadingAction] = useState(false);

    const handleInitiateRenewal = () => {
        if (!hasConfirmedCompanyInfo) {
            setModalType('company_confirm');
        } else {
            setModalType('contract');
        }
    };

    const confirmAction = () => {
        setLoadingAction(true);
        setModalType('none');
        
        setTimeout(() => {
            alert('合同续签流程已发起！');
            setLoadingAction(false);
            onBack(); // Return to list
        }, 1500);
    };

    if (viewingContract) {
        return <ContractHistoryDetail employee={employee} contract={viewingContract} onBack={() => setViewingContract(null)} />;
    }

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
             <div className="bg-white rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
                 {/* Decorative Tenure Circle (图片中的右侧勋章) */}
                 <div className="absolute top-6 right-6 w-24 h-24 bg-indigo-50/40 rounded-full flex items-center justify-center border border-indigo-100/50 shadow-inner">
                    <div className="text-center">
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Tenure</p>
                        <p className="text-xs font-black text-indigo-600">{employee.tenure}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 mb-10">
                     <div className="w-16 h-16 bg-slate-900 text-white rounded-[20px] flex items-center justify-center text-xl font-black shadow-xl border-4 border-white">
                         {employee.name.charAt(0)}
                     </div>
                     <div>
                         <h2 className="text-2xl font-black text-slate-900 tracking-tight">{employee.name}</h2>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{employee.dept} · 在职员工</p>
                     </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-8">
                     <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 group hover:bg-white transition-all">
                         <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">入职日期</p>
                         <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-300" />
                            <p className="text-sm font-black font-mono text-slate-900">{employee.joinDate}</p>
                         </div>
                     </div>
                     <div className={`p-5 rounded-3xl border transition-all ${
                         isOverdue ? 'bg-rose-50 border-rose-100' : 
                         isExpiring ? 'bg-orange-50 border-orange-100' : 
                         'bg-emerald-50/50 border-emerald-100 group hover:bg-emerald-50'
                     }`}>
                         <p className={`text-[10px] font-black mb-2 uppercase tracking-widest ${
                             isOverdue ? 'text-rose-600' : 
                             isExpiring ? 'text-orange-600' : 
                             'text-emerald-600'
                         }`}>
                             {isOverdue ? '逾期天数' : isExpiring ? '剩余天数' : '到期日期'}
                         </p>
                         <div className="flex items-center gap-2">
                            <Clock size={16} className={isOverdue ? 'text-rose-400' : isExpiring ? 'text-orange-400' : 'text-emerald-400'} />
                            <p className={`text-sm font-black font-mono ${
                                isOverdue ? 'text-rose-700' : 
                                isExpiring ? 'text-orange-700' : 
                                'text-emerald-700'
                            }`}>
                                {isOverdue ? `${Math.abs(employee.daysLeft)} 天` : isExpiring ? `${employee.daysLeft} 天` : employee.endDate}
                            </p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Contract Evolution History (图片中的 Timeline 部分) */}
             <div className="bg-white rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100">
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-10 flex items-center gap-3">
                     <History size={16} strokeWidth={2.5} className="text-slate-300" /> 合同演进历史 (Timeline)
                 </h3>
                 
                 <div className="relative pl-2">
                     {/* 20px Axis Connector */}
                     <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100 rounded-full"></div>
                     
                     <div className="space-y-10">
                         {employee.history.map((h, idx) => (
                             <div key={h.id} className="relative pl-10">
                                 {/* 20px Axis Marker */}
                                 <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-[3px] bg-white z-10 flex items-center justify-center shadow-sm ${
                                     h.current ? (isOverdue ? 'border-rose-500' : 'border-indigo-500 shadow-indigo-100') : 'border-slate-200'
                                 }`}>
                                     <div className={`w-2 h-2 rounded-full ${
                                         h.current ? (isOverdue ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500 animate-pulse') : 'bg-slate-200'
                                     }`}></div>
                                 </div>
                                 
                                 <div 
                                     onClick={() => {
                                         setViewingContract(h);
                                     }}
                                     className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                                     h.current 
                                     ? 'bg-white border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] scale-[1.02] hover:border-indigo-200' 
                                     : 'bg-slate-50/50 border-transparent opacity-60 hover:opacity-100 hover:bg-white hover:border-slate-200 hover:shadow-sm'
                                 }`}>
                                     <div className="flex justify-between items-center mb-2">
                                         <h4 className="text-sm font-black text-slate-900">{h.type}</h4>
                                         <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                                             h.status === '履行中' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                             h.status === '已逾期' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                             'bg-slate-100 text-slate-500 border-slate-200'
                                         }`}>{h.status}</span>
                                     </div>
                                     <p className="text-[11px] font-mono font-bold text-slate-400">{h.period}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

             {/* Footer Actions */}
             <div className="flex gap-4 pt-4">
                 <button 
                    onClick={() => setModalType('not_renew')}
                    className="flex-1 py-4 rounded-2xl border border-slate-200 bg-white font-black text-sm text-slate-500 active:bg-slate-50 transition-all shadow-sm"
                 >
                     不再续签
                 </button>
                 <button 
                    onClick={handleInitiateRenewal}
                    disabled={loadingAction}
                    className={`flex-[2.5] py-4 rounded-2xl font-black text-sm text-white shadow-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 ${
                        isOverdue ? 'bg-rose-600 shadow-rose-200' : 'bg-indigo-600 shadow-indigo-300'
                    }`}
                 >
                    {loadingAction ? <Loader2 size={20} className="animate-spin" /> : <><FileSignature size={20} /> {isOverdue ? '立即补签合同' : '发起合同续签'}</>}
                 </button>
             </div>

             {/* Modals Layer */}
             {modalType !== 'none' && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalType('none')}></div>
                    <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative z-10 animate-slide-up sm:animate-scale-up mb-safe sm:mb-0 max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-900">
                                {modalType === 'not_renew' && '不再续签确认'}
                                {modalType === 'company_confirm' && '完善公司合同信息'}
                                {modalType === 'contract' && '完善合同细节'}
                                {modalType === 'contract_confirm' && '确认合同信息'}
                            </h3>
                            <button onClick={() => setModalType('none')} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"><X size={18}/></button>
                        </div>

                        <div className="space-y-5">
                            {modalType === 'not_renew' && (
                                <div className="space-y-6">
                                    <div className="text-center py-4">
                                        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <AlertCircle size={32} />
                                        </div>
                                        <h4 className="text-lg font-black text-slate-900 mb-2">确认不再续签？</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                                            确认后将停止该员工的合同续签流程。是否需要立即跳转至离职办理流程？
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setModalType('none')}
                                            className="flex-1 py-3.5 rounded-2xl font-black text-sm bg-white border border-slate-200 text-slate-500 active:scale-[0.98] transition-all"
                                        >
                                            取消
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setModalType('none');
                                                navigate('/work/hr-emp', { state: { action: 'offboarding', employeeId: employee.id } });
                                            }}
                                            className="flex-[2] py-3.5 rounded-2xl font-black text-sm bg-rose-600 text-white shadow-xl shadow-rose-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            去办理离职 <ChevronRight size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}

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
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">岗位</label>
                                        <input 
                                            type="text" 
                                            value={contractForm.position}
                                            onChange={(e) => setContractForm({...contractForm, position: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                                        />
                                    </div>

                                    {/* Salary */}
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">薪酬 (税前)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                                            <input 
                                                type="text" 
                                                value={contractForm.salary}
                                                onChange={(e) => setContractForm({...contractForm, salary: e.target.value})}
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

                                    {/* Term & Signing Type */}
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
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">合同签订类型</label>
                                            <select 
                                                value={contractForm.signingType}
                                                onChange={(e) => setContractForm({...contractForm, signingType: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none"
                                            >
                                                <option value="续约">续约</option>
                                                <option value="无固定">无固定</option>
                                            </select>
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
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">签订类型</p>
                                                <p className="text-sm font-black text-slate-800">{contractForm.signingType}</p>
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
                                            onClick={confirmAction}
                                            className="flex-[2] py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            确认发起签署 <ChevronRight size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
             )}
        </DetailLayout>
    );
};

// --- Level 2 Dashboard ---

const Contract: React.FC = () => {
    const location = useLocation();
    const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_CONTRACTS[0] | null>(null);
    const [filterMode, setFilterMode] = useState<'all' | 'normal' | 'expiring' | 'overdue'>('all');
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
    
    // 处理深度链接逻辑
    useEffect(() => {
        if (location.state?.employeeId) {
            const emp = MOCK_CONTRACTS.find(c => c.id === location.state.employeeId);
            if (emp) setSelectedEmployee(emp);
        }
    }, [location.state]);

    const filteredContracts = useMemo(() => {
        if (filterMode === 'all') return MOCK_CONTRACTS;
        return MOCK_CONTRACTS.filter(c => c.status === filterMode);
    }, [filterMode]);

    if (selectedEmployee) return <ContractDetail employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;

    const normalCount = MOCK_CONTRACTS.filter(c => c.status === 'normal').length;
    const expiringCount = MOCK_CONTRACTS.filter(c => c.status === 'expiring').length;
    const overdueCount = MOCK_CONTRACTS.filter(c => c.status === 'overdue').length;
    const totalCount = MOCK_CONTRACTS.length;

    const filterLabels: Record<string, string> = {
        'all': '全部合同',
        'normal': '生效中合同',
        'expiring': '即将到期合同',
        'overdue': '已逾期合同'
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Integrated Stats Card */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
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

                    <div 
                        onClick={() => setFilterMode('all')}
                        className={`flex items-baseline gap-2 mb-8 pl-1 cursor-pointer transition-all active:scale-95 ${filterMode === 'all' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                    >
                        <span className="text-5xl font-black font-mono text-slate-900 tracking-tighter">{totalCount}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">合同总数 (份)</span>
                        {filterMode === 'all' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse ml-1 mb-2"></div>}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div 
                            onClick={() => setFilterMode('normal')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'normal' 
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}
                        >
                            <div className={filterMode === 'normal' ? 'text-white' : 'text-emerald-600'}><CheckCircle2 size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'normal' ? 'text-emerald-50' : 'text-emerald-800/70'}`}>生效中</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'normal' ? 'text-white' : 'text-emerald-700'}`}>{normalCount}</p>
                        </div>
                        <div 
                            onClick={() => setFilterMode('expiring')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'expiring' 
                                ? 'bg-orange-500 text-white border-orange-600 shadow-lg shadow-orange-100' 
                                : 'bg-orange-50 text-orange-600 border-orange-100'
                            }`}
                        >
                            <div className={filterMode === 'expiring' ? 'text-white' : 'text-orange-600'}><Clock size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'expiring' ? 'text-orange-50' : 'text-orange-800/70'}`}>即将到期</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'expiring' ? 'text-white' : 'text-orange-700'}`}>{expiringCount}</p>
                        </div>
                        <div 
                            onClick={() => setFilterMode('overdue')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'overdue' 
                                ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-100' 
                                : 'bg-rose-50 text-rose-600 border-rose-100'
                            }`}
                        >
                            <div className={filterMode === 'overdue' ? 'text-white' : 'text-rose-600'}><AlertCircle size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'overdue' ? 'text-rose-50' : 'text-rose-800/70'}`}>已逾期</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'overdue' ? 'text-white' : 'text-rose-700'}`}>{overdueCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Result Header */}
            {filterMode !== 'all' && (
                <div className="px-2 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">正在查看:</span>
                        <span className={`text-xs font-black px-2 py-1 rounded-lg border shadow-sm ${
                            filterMode === 'normal' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            filterMode === 'expiring' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                            {filterLabels[filterMode]} ({filteredContracts.length})
                        </span>
                    </div>
                    <button 
                        onClick={() => setFilterMode('all')}
                        className="text-[10px] font-black text-slate-400 flex items-center gap-1 hover:text-slate-600 transition-colors"
                    >
                        <XCircle size={12} /> 清空筛选
                    </button>
                </div>
            )}

            {/* Contract List */}
            <div>
                 <div className="flex justify-between items-center mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3.5 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">合同管理名单</h3>
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                            className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                                isYearPickerOpen 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                                : 'bg-white text-slate-400 border-slate-200 shadow-sm active:scale-95'
                            }`}
                        >
                            <Filter size={14} strokeWidth={2.5} />
                        </button>

                        {isYearPickerOpen && (
                            <>
                                <div className="fixed inset-0 z-[80]" onClick={() => setIsYearPickerOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-slate-100 p-1.5 z-[90] animate-scale-up origin-top-right overflow-hidden">
                                    <div className="text-[9px] font-black text-slate-400 uppercase px-3 py-2 border-b border-slate-50 mb-1 tracking-widest">选择年份</div>
                                    {[2024, 2023, 2022].map(y => (
                                        <button 
                                            key={y}
                                            onClick={() => { setSelectedYear(y); setIsYearPickerOpen(false); }}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                                                selectedYear === y 
                                                ? 'bg-indigo-50 text-indigo-600' 
                                                : 'text-slate-500 hover:bg-slate-50'
                                            }`}
                                        >
                                            {y}年
                                            {selectedYear === y && <Check size={14} strokeWidth={3} />}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                     {filteredContracts.length > 0 ? filteredContracts.map(emp => (
                         <div 
                             key={emp.id} 
                             onClick={() => setSelectedEmployee(emp)}
                             className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer group hover:border-indigo-100"
                         >
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
                     )) : (
                        <div className="py-20 text-center space-y-3 opacity-30">
                            <div className="flex justify-center"><FileSignature size={48} className="text-slate-300" /></div>
                            <p className="text-sm font-bold text-slate-400">暂无符合条件的合同</p>
                        </div>
                     )}
                 </div>
            </div>
            
            <div className="text-center py-4 opacity-30">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">GM Pilot Contract Insight v2.0</p>
            </div>
        </div>
    );
};

export default Contract;
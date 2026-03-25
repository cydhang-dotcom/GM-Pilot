import React, { useState } from 'react';
import { X, Calendar, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

interface Props {
    onClose: () => void;
    onNext: (data: any) => void;
}

const ContractInitiation: React.FC<Props> = ({ onClose, onNext }) => {
    const [step, setStep] = useState(1);
    const [companyInfo, setCompanyInfo] = useState({
        address: '上海市徐汇区漕河泾科技园A座',
        location: '上海市',
        payDay: '15',
        payMonth: '上月'
    });
    const [contractInfo, setContractInfo] = useState({
        position: '前端工程师',
        salary: 25000,
        startDate: '2026-04-01',
        years: 3,
        probation: 3,
        template: '标准劳动合同'
    });
    const [salaryModified, setSalaryModified] = useState(false);

    const handleSalaryChange = (val: number) => {
        setContractInfo(prev => ({ ...prev, salary: val }));
        setSalaryModified(true);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <button onClick={onClose} className="text-slate-400"><X size={24} /></button>
                <h2 className="text-lg font-black text-slate-900">发起合同签署</h2>
                <div className="w-6"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {step === 1 ? (
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-slate-900">一、公司信息</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">公司地址</label>
                                <input className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={companyInfo.address} onChange={e => setCompanyInfo({...companyInfo, address: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">工作所在地</label>
                                <input className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={companyInfo.location} onChange={e => setCompanyInfo({...companyInfo, location: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">发薪日</label>
                                    <input className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={companyInfo.payDay} onChange={e => setCompanyInfo({...companyInfo, payDay: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">发薪月份</label>
                                    <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={companyInfo.payMonth} onChange={e => setCompanyInfo({...companyInfo, payMonth: e.target.value})}>
                                        <option>上月</option>
                                        <option>本月</option>
                                        <option>下月</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-slate-900">二、员工合同信息</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">岗位</label>
                                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={contractInfo.position} onChange={e => setContractInfo({...contractInfo, position: e.target.value})}>
                                    <option>前端工程师</option>
                                    <option>后端工程师</option>
                                    <option>产品经理</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">薪酬</label>
                                <input type="number" className={`w-full p-3 rounded-xl bg-slate-50 border ${salaryModified ? 'border-amber-300' : 'border-slate-200'}`} value={contractInfo.salary} onChange={e => handleSalaryChange(Number(e.target.value))} />
                                {salaryModified && <p className="text-[10px] text-amber-600 mt-1 font-bold">提示：薪酬金额已被修改</p>}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">合同开始日期</label>
                                <div className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                    <Calendar size={18} className="text-slate-400 mr-2" />
                                    <input type="date" className="bg-transparent w-full outline-none" value={contractInfo.startDate} onChange={e => setContractInfo({...contractInfo, startDate: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">合同年限 (年)</label>
                                    <div className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                        <input type="number" className="bg-transparent w-full outline-none" value={contractInfo.years} onChange={e => setContractInfo({...contractInfo, years: Number(e.target.value)})} />
                                        <div className="flex flex-col">
                                            <button onClick={() => setContractInfo({...contractInfo, years: contractInfo.years + 1})}><ChevronUp size={14} /></button>
                                            <button onClick={() => setContractInfo({...contractInfo, years: Math.max(1, contractInfo.years - 1)})}><ChevronDown size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">试用期 (月)</label>
                                    <div className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                        <input type="number" className="bg-transparent w-full outline-none" value={contractInfo.probation} onChange={e => setContractInfo({...contractInfo, probation: Number(e.target.value)})} />
                                        <div className="flex flex-col">
                                            <button onClick={() => setContractInfo({...contractInfo, probation: contractInfo.probation + 1})}><ChevronUp size={14} /></button>
                                            <button onClick={() => setContractInfo({...contractInfo, probation: Math.max(0, contractInfo.probation - 1)})}><ChevronDown size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">合同模版</label>
                                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" value={contractInfo.template} onChange={e => setContractInfo({...contractInfo, template: e.target.value})}>
                                    <option>标准劳动合同</option>
                                    <option>高管劳动合同</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-slate-100">
                {step === 1 ? (
                    <button onClick={() => setStep(2)} className="w-full p-4 bg-indigo-600 text-white font-black rounded-2xl">下一步</button>
                ) : (
                    <button onClick={() => onNext({companyInfo, contractInfo})} className="w-full p-4 bg-indigo-600 text-white font-black rounded-2xl">完成发起</button>
                )}
            </div>
        </div>
    );
};

export default ContractInitiation;

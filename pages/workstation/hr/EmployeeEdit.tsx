import React, { useState } from 'react';
import { Save, X, Briefcase, Banknote, User, Home, GraduationCap, History, Phone, AlertCircle, CreditCard, Check, ShieldCheck } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

interface EmployeeEditProps {
    employee: any;
    section?: string;
    onBack: () => void;
}

const InputField = ({ label, value, onChange, placeholder, type = "text", required, isMono = false }: any) => (
    <div className="mb-5 last:mb-0">
        <label className="text-[10px] font-black text-slate-400 mb-2 block uppercase tracking-widest ml-1">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <input 
            type={type}
            value={value} 
            onChange={onChange}
            className={`w-full bg-slate-50 border border-slate-200 rounded-[18px] py-3.5 px-4 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all font-black text-slate-900 placeholder-slate-300 ${isMono ? 'font-mono' : ''}`}
            placeholder={placeholder}
        />
    </div>
);

const EmployeeEdit: React.FC<EmployeeEditProps> = ({ employee, section, onBack }) => {
    // 简单的模拟保存逻辑
    const handleSave = () => {
        console.log(`Saving ${section} for employee ${employee.name}`);
        onBack();
    };

    const getSectionConfig = () => {
        switch(section) {
            case 'appointment': return { title: '修改任职信息', icon: Briefcase };
            case 'basic': return { title: '修改基本资料', icon: User };
            case 'residence': return { title: '修改户籍居住', icon: Home };
            case 'education': return { title: '修改教育背景', icon: GraduationCap };
            case 'workExp': return { title: '修改工作履历', icon: History };
            case 'contact': return { title: '修改联系方式', icon: Phone };
            case 'emergency': return { title: '修改紧急联系', icon: AlertCircle };
            case 'finance': return { title: '修改发放账户', icon: CreditCard };
            default: return { title: '编辑档案', icon: ShieldCheck };
        }
    };

    const config = getSectionConfig();

    return (
        <DetailLayout title={config.title} onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-6 pb-24">
                {/* Section Context Header */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                        <config.icon size={28} strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900">{employee.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{employee.dept} · {employee.role}</p>
                    </div>
                </div>

                {/* Dynamic Form Area - Simplified Mockup */}
                <div className="bg-white rounded-[32px] p-7 shadow-xl shadow-slate-200/50 border border-slate-100">
                    {section === 'appointment' && (
                        <>
                            <InputField label="所属部门" value={employee.dept} required />
                            <InputField label="岗位职称" value={employee.role} required />
                            <InputField label="入职日期" type="date" value={employee.joinDate} isMono required />
                        </>
                    )}
                    
                    {section === 'basic' && (
                        <>
                            <InputField label="姓名" value={employee.name} required />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="性别" value="男" />
                                <InputField label="出生日期" type="date" value="1995-08-08" />
                            </div>
                            <InputField label="证件号码" value={employee.idCard} isMono />
                            <InputField label="国籍" value="中国" />
                        </>
                    )}

                    {section === 'finance' && (
                        <>
                            <InputField label="银行卡号" value="6222 0038 **** 8891" isMono />
                            <InputField label="所属银行" value="招商银行" />
                            <InputField label="开户支行" value="上海科技园支行" />
                        </>
                    )}

                    {/* Fallback placeholder for other sections */}
                    {['residence', 'education', 'workExp', 'contact', 'emergency'].includes(section || '') && (
                        <div className="py-10 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <config.icon className="text-slate-300" />
                            </div>
                            <p className="text-xs font-bold text-slate-400 px-6">此模块的精细化表单正在适配中，目前可点击下方保存模拟提交动作。</p>
                        </div>
                    )}
                </div>

                <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex gap-3">
                    <ShieldCheck size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-indigo-700 leading-relaxed font-bold">
                        安全提示：档案修改将实时触发版本审计。薪资或岗位的变更可能会引起下个月社保及个税的自动补差计算。
                    </p>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50 pb-8 flex gap-3">
                <button onClick={onBack} className="flex-1 bg-white text-slate-500 font-black py-4 rounded-2xl border border-slate-200 active:bg-slate-50">取消</button>
                <button onClick={handleSave} className="flex-[2] bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <Check size={18} strokeWidth={3}/> 确认保存
                </button>
            </div>
        </DetailLayout>
    );
};

export default EmployeeEdit;
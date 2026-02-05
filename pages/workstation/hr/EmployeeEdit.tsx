
import React, { useState } from 'react';
import { Save, X, Briefcase, Banknote } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const InputField = ({ label, value, onChange, placeholder, type = "text", required }: any) => (
    <div className="mb-4">
        <label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase tracking-wide ml-1">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <input 
            type={type}
            value={value} 
            onChange={onChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder-slate-300"
            placeholder={placeholder}
        />
    </div>
);

const EmployeeEdit = ({ employee, onBack }: { employee: any, onBack: () => void }) => {
    const [form, setForm] = useState({
        name: employee.name,
        dept: employee.dept,
        role: employee.role,
        phone: employee.phone,
        salary: employee.salary || '25000',
    });

    const handleSave = () => {
        // Simple validation
        if (!form.name || !form.dept || !form.role) {
            alert("请完整填写必要信息");
            return;
        }
        console.log("Saving changes:", form);
        onBack(); // In mock, just return
    };

    return (
        <DetailLayout title="修改员工资料" onBack={onBack} bgColor="bg-white">
            <div className="space-y-6 pb-24">
                <div className="p-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                        <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide">核心信息修改</h3>
                    </div>
                    
                    <InputField label="姓名" value={form.name} onChange={(e: any) => setForm({...form, name: e.target.value})} required />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="部门" value={form.dept} onChange={(e: any) => setForm({...form, dept: e.target.value})} required />
                        <InputField label="岗位" value={form.role} onChange={(e: any) => setForm({...form, role: e.target.value})} required />
                    </div>

                    <InputField label="手机号" value={form.phone} onChange={(e: any) => setForm({...form, phone: e.target.value})} type="tel" />
                    
                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Banknote size={18} className="text-slate-400" />
                            <h4 className="text-sm font-black text-slate-700">薪资核定</h4>
                        </div>
                        <InputField label="核定月薪 (税前)" value={form.salary} onChange={(e: any) => setForm({...form, salary: e.target.value})} required type="number" />
                        <p className="text-[10px] text-slate-400 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed font-medium">
                            注：修改月薪将同步影响该员工下个账期的个税及社保预扣缴基数。如需进行特殊差额调整，请在“事务-财务中心”进行。
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 max-w-md mx-auto z-50 pb-8">
                <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                    <Save size={18} strokeWidth={2.5}/> 保存修改
                </button>
            </div>
        </DetailLayout>
    );
};

export default EmployeeEdit;

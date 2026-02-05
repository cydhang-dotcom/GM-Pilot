
import React, { useState } from 'react';
import { UserX, Calendar, AlertCircle, FileCheck, Check } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const EmployeeOffboarding = ({ employee, onBack }: { employee: any, onBack: () => void }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState('个人原因');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        if (!isConfirmed) {
            alert("请先勾选“完成工作交接”确认项");
            return;
        }
        alert(`${employee.name} 的离职手续已发起，档案将移入离职库。`);
        onBack();
    };

    return (
        <DetailLayout title="离职手续办理" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5 pb-24">
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 text-center">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-rose-100">
                        <UserX size={28} strokeWidth={2} />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">办理 {employee.name} 离职</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{employee.dept} · {employee.role}</p>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-5">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">最后工作日</label>
                        <div className="relative">
                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono outline-none focus:border-rose-500 transition-colors text-slate-900"
                            />
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
                                <option>个人原因</option>
                                <option>合同到期不再续签</option>
                                <option>试用期未通过</option>
                                <option>公司裁员/优化</option>
                                <option>纪律处分/开除</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-5 flex gap-4">
                    <AlertCircle size={20} className="text-amber-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div className="text-xs text-amber-800 leading-relaxed font-medium">
                        <p className="font-black mb-1 uppercase tracking-tight text-amber-900">后续影响说明</p>
                        确认离职后，系统将自动：
                        <ul className="list-disc ml-4 mt-2 space-y-1 opacity-90">
                            <li>停止下月社保/公积金缴纳申报</li>
                            <li>核算本月考勤并生成最后一份工资条</li>
                            <li>注销该员工的企业内网/OA 访问权限</li>
                        </ul>
                    </div>
                </div>

                <div 
                    onClick={() => setIsConfirmed(!isConfirmed)}
                    className={`p-5 rounded-[24px] border-2 cursor-pointer transition-all flex items-center gap-4 active:scale-[0.98] ${isConfirmed ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200'}`}
                >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${isConfirmed ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-300'}`}>
                        {isConfirmed && <Check size={14} strokeWidth={4} />}
                    </div>
                    <span className={`text-xs font-bold ${isConfirmed ? 'text-indigo-700' : 'text-slate-500'}`}>确认该员工已完成全部工作交接</span>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 max-w-md mx-auto z-50 pb-8">
                <button 
                    onClick={handleConfirm}
                    disabled={!isConfirmed}
                    className={`w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                        isConfirmed ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    <UserX size={18} strokeWidth={2.5}/> 确认办理离职
                </button>
            </div>
        </DetailLayout>
    );
};

export default EmployeeOffboarding;

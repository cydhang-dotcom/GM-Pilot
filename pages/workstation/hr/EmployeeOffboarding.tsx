
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
        <DetailLayout title="离职手续办理" onBack={onBack} bgColor="bg-gray-50">
            <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UserX size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">办理 {employee.name} 离职</h3>
                    <p className="text-xs text-gray-400 mt-1">{employee.dept} · {employee.role}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase">最后工作日</label>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold font-mono outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase">离职原因</label>
                        <select 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-rose-500 appearance-none"
                        >
                            <option>个人原因</option>
                            <option>合同到期不再续签</option>
                            <option>试用期未通过</option>
                            <option>公司裁员/优化</option>
                            <option>纪律处分/开除</option>
                        </select>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
                    <AlertCircle size={20} className="text-amber-600 shrink-0 mt-1" />
                    <div className="text-xs text-amber-800 leading-relaxed">
                        <p className="font-bold mb-1 uppercase tracking-tight">后续影响说明</p>
                        确认离职后，系统将自动：
                        <ul className="list-disc ml-4 mt-2 space-y-1 opacity-80">
                            <li>停止下月社保/公积金缴纳申报</li>
                            <li>核算本月考勤并生成最后一份工资条</li>
                            <li>注销该员工的企业内网/OA 访问权限</li>
                        </ul>
                    </div>
                </div>

                <div 
                    onClick={() => setIsConfirmed(!isConfirmed)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${isConfirmed ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-gray-100'}`}
                >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isConfirmed ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-gray-50 border-gray-200'}`}>
                        {isConfirmed && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-bold ${isConfirmed ? 'text-indigo-700' : 'text-gray-500'}`}>确认该员工已完成全部工作交接</span>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-50">
                <button 
                    onClick={handleConfirm}
                    disabled={!isConfirmed}
                    className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                        isConfirmed ? 'bg-rose-600 text-white shadow-rose-200 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <UserX size={18} /> 确认办理离职
                </button>
            </div>
        </DetailLayout>
    );
};

export default EmployeeOffboarding;

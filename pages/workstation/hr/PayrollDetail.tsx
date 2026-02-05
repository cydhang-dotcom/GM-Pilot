
import React, { useState } from 'react';
import { Download, Banknote, ShieldCheck } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const MOCK_EMPLOYEE_PAYROLL = [
    { id: 1, name: '张伟', dept: '技术部', base: '25,000', bonus: '5,000', tax: '1,200', total: '28,800', status: '正常' },
    { id: 2, name: '李娜', dept: '市场部', base: '18,000', bonus: '8,000', tax: '900', total: '25,100', status: '正常' },
    { id: 3, name: '王强', dept: '技术部', base: '12,000', bonus: '1,000', tax: '300', total: '12,700', status: '试用期' },
    { id: 4, name: '陈杰', dept: '设计部', base: '15,000', bonus: '2,000', tax: '450', total: '16,550', status: '正常' },
    { id: 5, name: '刘思思', dept: '运营部', base: '14,000', bonus: '3,000', tax: '400', total: '16,600', status: '正常' },
];

const PayrollDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    return (
        <DetailLayout
            title={`${item.month} 薪资表`}
            tag={{ 
                label: item.status, 
                color: item.status === '已发放' ? 'text-emerald-600' : 'text-orange-600',
                bg: item.status === '已发放' ? 'bg-emerald-50' : 'bg-orange-50'
            }}
            onBack={onBack}
            actions={item.status === '待确认' ? (
                <div className="flex gap-3">
                    <button className="flex-1 bg-white text-slate-700 font-bold py-3.5 rounded-2xl border border-slate-200 shadow-sm active:scale-[0.98] transition-all">
                        反馈异议
                    </button>
                    <button className="flex-[2] bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <ShieldCheck size={18} /> 确认并发放
                    </button>
                </div>
            ) : (
                <button className="w-full bg-white text-indigo-600 font-bold py-3.5 rounded-2xl border border-indigo-100 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
                    <Download size={18} /> 下载工资条 (Excel)
                </button>
            )}
        >
            {/* Header Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-[32px] p-7 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
                <div className="absolute right-0 top-0 p-6 opacity-10 transform translate-x-4 -translate-y-4">
                    <Banknote size={140} />
                </div>
                
                <div className="relative z-10">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">实发总额 ({item.count}人)</p>
                    <h3 className="text-4xl font-black font-mono tracking-tighter mb-5">¥{item.amount}</h3>
                    <div className="flex gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 五险一金已扣除
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 个税已申报
                        </span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">人员明细</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">按部门</span>
                </div>
                <div>
                    {MOCK_EMPLOYEE_PAYROLL.map((emp) => (
                        <div key={emp.id} className="p-5 border-b border-slate-50 last:border-0 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 border border-indigo-100">
                                    {emp.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h5 className="text-sm font-black text-slate-900">{emp.name}</h5>
                                        {emp.status === '试用期' && <span className="text-[9px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-md font-bold border border-orange-100">试用</span>}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400">{emp.dept}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black font-mono text-slate-900">¥{emp.total}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">税: ¥{emp.tax}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

export default PayrollDetail;

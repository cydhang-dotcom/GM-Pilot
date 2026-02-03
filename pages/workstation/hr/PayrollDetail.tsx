
import React, { useState } from 'react';
import { Download, Banknote } from 'lucide-react';
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
                    <button className="flex-1 bg-white text-gray-700 font-bold py-3.5 rounded-xl border border-gray-200 shadow-sm active:scale-[0.98]">
                        反馈异议
                    </button>
                    <button className="flex-[2] bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">
                        确认并发放
                    </button>
                </div>
            ) : (
                <button className="w-full bg-white text-indigo-600 font-bold py-3.5 rounded-xl border border-indigo-100 flex items-center justify-center gap-2 active:scale-[0.98]">
                    <Download size={18} /> 下载工资条 (Excel)
                </button>
            )}
        >
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-xs text-indigo-200 mb-1">实发总额 ({item.count}人)</p>
                    <h3 className="text-3xl font-bold font-mono tracking-tight mb-4">¥{item.amount}</h3>
                    <div className="flex gap-4 text-xs text-indigo-100/80">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 五险一金已扣除</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 个税已申报</span>
                    </div>
                </div>
                <Banknote className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h4 className="text-xs font-bold text-gray-700">人员明细</h4>
                    <span className="text-[10px] text-gray-400">按部门排序</span>
                </div>
                <div>
                    {MOCK_EMPLOYEE_PAYROLL.map((emp) => (
                        <div key={emp.id} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{emp.name.charAt(0)}</div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h5 className="text-sm font-bold text-gray-900">{emp.name}</h5>
                                        {emp.status === '试用期' && <span className="text-[9px] bg-orange-50 text-orange-600 px-1 py-0.5 rounded">试用</span>}
                                    </div>
                                    <p className="text-xs text-gray-400">{emp.dept}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold font-mono text-gray-900">¥{emp.total}</p>
                                <p className="text-[10px] text-gray-400">税: ¥{emp.tax}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

export default PayrollDetail;

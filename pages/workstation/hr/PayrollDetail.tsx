import React, { useState } from 'react';
import { Download, Banknote, ShieldCheck, ChevronRight, User, Calculator, PieChart, ReceiptText, Info } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Mock Data ---

const MOCK_EMPLOYEE_PAYROLL = [
    { id: 1, name: '张伟', dept: '技术部', base: '25,000', bonus: '5,000', tax: '1,200', social: '2,650', total: '26,150', status: '正常', change: '+1,500', changeType: 'up' },
    { id: 2, name: '李娜', dept: '市场部', base: '18,000', bonus: '8,000', tax: '900', social: '1,908', total: '23,192', status: '正常', change: '+2,000', changeType: 'up' },
    { id: 3, name: '王强', dept: '技术部', base: '12,000', bonus: '1,000', tax: '300', social: '1,272', total: '11,428', status: '试用期', change: '0', changeType: 'none' },
    { id: 4, name: '陈杰', dept: '设计部', base: '15,000', bonus: '2,000', tax: '450', social: '1,590', total: '14,960', status: '正常', change: '-500', changeType: 'down' },
    { id: 5, name: '刘思思', dept: '运营部', base: '14,000', bonus: '3,000', tax: '400', social: '1,484', total: '15,116', status: '正常', change: '+800', changeType: 'up' },
];

// --- Sub-Component: Individual Salary Detail ---

const StaffSalaryDetail = ({ employee, onBack }: { employee: any, onBack: () => void }) => {
    const grossSalary = parseFloat(employee.base.replace(',', '')) + parseFloat(employee.bonus.replace(',', ''));
    
    return (
        <DetailLayout 
            title={`${employee.name} 薪资明细`} 
            onBack={onBack}
            tag={{ label: '12月账期', color: 'text-indigo-600', bg: 'bg-indigo-50' }}
            bgColor="bg-[#F8F9FB]"
        >
            <div className="space-y-6 pb-24">
                {/* Net Pay Header Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black mb-4 shadow-lg shadow-indigo-100">
                        {employee.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{employee.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{employee.dept}</span>
                        {employee.status === '试用期' ? (
                            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">试用期</span>
                        ) : (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">正式</span>
                        )}
                    </div>
                    
                    <div className="w-full mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">本月实发金额 (Net Pay)</p>
                        <h2 className="text-4xl font-black font-mono text-indigo-600 tracking-tighter">¥{employee.total}</h2>
                        {employee.changeType !== 'none' && (
                            <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                employee.changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                                {employee.changeType === 'up' ? '↑' : '↓'} 较上月 {employee.change}
                            </div>
                        )}
                        {employee.changeType === 'none' && (
                            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-50 text-slate-500">
                                - 与上月持平
                            </div>
                        )}
                    </div>
                </div>

                {/* Breakdown Sections */}
                <div className="space-y-4">
                    {/* 1. Earnings */}
                    <div className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                            <Calculator size={14} className="text-indigo-500" />
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">应发工资 (Earnings)</h4>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">基本工资</span>
                                <span className="text-sm font-black font-mono text-slate-900">¥{employee.base}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">绩效/奖金</span>
                                <span className="text-sm font-black font-mono text-slate-900">¥{employee.bonus}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                                <span className="text-xs font-black text-slate-900">应发合计</span>
                                <span className="text-sm font-black font-mono text-slate-900">¥{grossSalary.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Deductions */}
                    <div className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                            <ReceiptText size={14} className="text-rose-500" />
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">代扣代缴 (Deductions)</h4>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">五险一金 (个人)</span>
                                <span className="text-sm font-black font-mono text-rose-600">-¥{employee.social}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">个人所得税</span>
                                <span className="text-sm font-black font-mono text-rose-600">-¥{employee.tax}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                                <span className="text-xs font-black text-rose-600">扣除合计</span>
                                <span className="text-sm font-black font-mono text-rose-600">
                                    -¥{(parseFloat(employee.social.replace(',', '')) + parseFloat(employee.tax.replace(',', ''))).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Tip */}
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex gap-3">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-700 leading-relaxed font-bold">
                        说明：社保与公积金扣除基于该员工核定的缴纳基数及当地最新比例。个税已自动计算专项附加扣除。
                    </p>
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-20 pb-8">
                <button className="w-full py-4 rounded-2xl font-black text-sm bg-slate-900 text-white shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Download size={18} /> 下载电子工资条
                </button>
            </div>
        </DetailLayout>
    );
};

// --- Main Component ---

const PayrollDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

    if (selectedStaff) {
        return <StaffSalaryDetail employee={selectedStaff} onBack={() => setSelectedStaff(null)} />;
    }

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
                    <Download size={18} /> 下载工资总表 (Excel)
                </button>
            )}
        >
            {/* Header Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                {/* Subtle background pattern/glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs font-medium text-slate-400 mb-1">本月实发总额</p>
                            <h3 className="text-4xl font-light tracking-tight font-mono">¥{item.amount}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-medium text-slate-400 mb-1">发放人数</p>
                            <p className="text-xl font-light font-mono">{item.count}<span className="text-sm text-slate-500 ml-1">人</span></p>
                        </div>
                    </div>

                    {/* Change Rate Pill */}
                    {item.change && (
                        <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className={`text-xs font-medium ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {item.change.startsWith('+') ? '↑' : '↓'} 较上月 {item.change.replace(/[+-]/, '')}
                            </span>
                            <span className="text-xs text-slate-400 border-l border-white/10 pl-1.5">{item.changeRate}</span>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 五险一金已扣除
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 个税已申报
                        </span>
                    </div>
                </div>
            </div>

            {/* Department Breakdown */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-5">
                    <h4 className="text-sm font-semibold text-slate-900">部门薪资占比</h4>
                    <PieChart size={16} className="text-slate-400" />
                </div>
                
                {/* Stacked Bar */}
                <div className="h-2.5 w-full flex rounded-full overflow-hidden mb-6 gap-0.5">
                    <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: '40%' }}></div>
                    <div className="bg-blue-400 h-full transition-all duration-500" style={{ width: '25%' }}></div>
                    <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: '20%' }}></div>
                    <div className="bg-orange-400 h-full transition-all duration-500" style={{ width: '15%' }}></div>
                </div>

                {/* Legend Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span className="text-xs font-medium text-slate-600">技术部</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-900">40%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-xs font-medium text-slate-600">市场部</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-900">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-xs font-medium text-slate-600">运营部</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-900">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-xs font-medium text-slate-600">设计部</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-900">15%</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">人员明细</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">点击查看详情</span>
                </div>
                <div>
                    {MOCK_EMPLOYEE_PAYROLL.map((emp) => (
                        <div 
                            key={emp.id} 
                            onClick={() => setSelectedStaff(emp)}
                            className="p-5 border-b border-slate-50 last:border-0 flex justify-between items-center group active:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
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
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-black font-mono text-slate-900">¥{emp.total}</p>
                                    <div className="flex items-center justify-end gap-1 mt-0.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">本月实发</p>
                                        {emp.changeType !== 'none' && (
                                            <span className={`text-[10px] font-bold font-mono ${emp.changeType === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {emp.changeType === 'up' ? '↑' : '↓'}{emp.change.replace(/[+-]/, '')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

export default PayrollDetail;
import React, { useState } from 'react';
import { Download, ChevronRight, Banknote, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Types & Data ---

const MOCK_PAYROLL_HISTORY = [
  { id: 'p1', month: '2023-12', amount: '425,000.00', status: '待确认', count: 32, date: '12-05', urgent: true },
  { id: 'p2', month: '2023-11', amount: '418,200.00', status: '已发放', count: 32, date: '11-05', urgent: false },
  { id: 'p3', month: '2023-10', amount: '415,000.00', status: '已发放', count: 31, date: '10-05', urgent: false },
];

const MOCK_PAYROLL_BREAKDOWN = [
  { name: '基本工资', value: 280000, color: '#3B82F6' },
  { name: '绩效奖金', value: 85000, color: '#8B5CF6' },
  { name: '五险一金', value: 50000, color: '#10B981' },
  { name: '个税', value: 10000, color: '#F59E0B' },
];

const MOCK_EMPLOYEE_PAYROLL = [
    { id: 1, name: '张伟', dept: '技术部', base: '25,000', bonus: '5,000', tax: '1,200', total: '28,800', status: '正常' },
    { id: 2, name: '李娜', dept: '市场部', base: '18,000', bonus: '8,000', tax: '900', total: '25,100', status: '正常' },
    { id: 3, name: '王强', dept: '技术部', base: '12,000', bonus: '1,000', tax: '300', total: '12,700', status: '试用期' },
    { id: 4, name: '陈杰', dept: '设计部', base: '15,000', bonus: '2,000', tax: '450', total: '16,550', status: '正常' },
    { id: 5, name: '刘思思', dept: '运营部', base: '14,000', bonus: '3,000', tax: '400', total: '16,600', status: '正常' },
];

// --- Level 3: Detail View ---

const PayrollDetail = ({ item, onBack }: { item: typeof MOCK_PAYROLL_HISTORY[0], onBack: () => void }) => {
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
            {/* Summary Card */}
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

            {/* Employee List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h4 className="text-xs font-bold text-gray-700">人员明细</h4>
                    <span className="text-[10px] text-gray-400">按部门排序</span>
                </div>
                <div>
                    {MOCK_EMPLOYEE_PAYROLL.map((emp, idx) => (
                        <div key={emp.id} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                    {emp.name.charAt(0)}
                                </div>
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
                <div className="p-3 text-center border-t border-gray-50">
                    <span className="text-xs text-gray-400">已显示全部 {item.count} 人</span>
                </div>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Dashboard View ---

const Payroll: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<typeof MOCK_PAYROLL_HISTORY[0] | null>(null);

    if (selectedItem) return <PayrollDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">12月薪资构成预览</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={MOCK_PAYROLL_BREAKDOWN}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {MOCK_PAYROLL_BREAKDOWN.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>
                                ))}
                            </Pie>
                            <Legend iconSize={8} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize:'10px'}}/>
                            <RechartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-3">
                     <span className="text-xs text-gray-500">本月预计发放</span>
                     <span className="text-xl font-bold font-mono text-gray-900">¥425,000.00</span>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="text-sm font-bold text-gray-900">历史发放记录</h3>
                    <button className="text-xs text-blue-600 flex items-center gap-1 font-medium bg-blue-50 px-2 py-1 rounded-lg">
                        <Download size={12}/> 导出报表
                    </button>
                </div>
                <div className="space-y-3">
                    {MOCK_PAYROLL_HISTORY.map((item, idx) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between items-center active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden"
                        >
                             {item.urgent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>}
                             <div>
                                 <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                     {item.month} 工资表
                                     {item.urgent && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>}
                                 </h4>
                                 <p className="text-xs text-gray-400 mt-1">{item.date} · {item.count}人</p>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="text-right">
                                     <p className="font-mono font-bold text-gray-900 text-sm">¥{item.amount}</p>
                                     <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                         item.status === '已发放' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                     }`}>{item.status}</span>
                                 </div>
                                 <ChevronRight size={16} className="text-gray-300" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payroll;

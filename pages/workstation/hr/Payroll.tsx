
import React, { useState } from 'react';
import { Download, ChevronRight, Banknote } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import PayrollDetail from './PayrollDetail';
import PayrollExport from './PayrollExport';

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

const Payroll: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<typeof MOCK_PAYROLL_HISTORY[0] | null>(null);
    const [showExport, setShowExport] = useState(false);

    if (selectedItem) return <PayrollDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    if (showExport) return <PayrollExport onBack={() => setShowExport(false)} />;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">12月薪资构成预览</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={MOCK_PAYROLL_BREAKDOWN} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                                {MOCK_PAYROLL_BREAKDOWN.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>)}
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
                    <button onClick={() => setShowExport(true)} className="text-xs text-blue-600 flex items-center gap-1 font-medium bg-blue-50 px-2 py-1 rounded-lg"><Download size={12}/> 导出报表</button>
                </div>
                <div className="space-y-3">
                    {MOCK_PAYROLL_HISTORY.map((item) => (
                        <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between items-center active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden">
                             {item.urgent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>}
                             <div>
                                 <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">{item.month} 工资表{item.urgent && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>}</h4>
                                 <p className="text-xs text-gray-400 mt-1">{item.date} · {item.count}人</p>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="text-right">
                                     <p className="font-mono font-bold text-gray-900 text-sm">¥{item.amount}</p>
                                     <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.status === '已发放' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>{item.status}</span>
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

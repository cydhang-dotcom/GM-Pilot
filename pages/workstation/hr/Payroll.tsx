import React, { useState } from 'react';
import { Download, ChevronRight, Banknote, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import PayrollDetail from './PayrollDetail';
import PayrollExport from './PayrollExport';

const MOCK_PAYROLL_HISTORY = [
  { id: 'p1', month: '2023-12', amount: '425,000.00', status: '待确认', count: 32, date: '12-05', urgent: true, change: '+6,800.00', changeRate: '+1.6%' },
  { id: 'p2', month: '2023-11', amount: '418,200.00', status: '已发放', count: 32, date: '11-05', urgent: false, change: '+3,200.00', changeRate: '+0.8%' },
  { id: 'p3', month: '2023-10', amount: '415,000.00', status: '已发放', count: 31, date: '10-05', urgent: false, change: '+10,000.00', changeRate: '+2.5%' },
];

const MOCK_SALARY_TREND = [
  { month: '7月', value: 385000 },
  { month: '8月', value: 392000 },
  { month: '9月', value: 405000 },
  { month: '10月', value: 415000 },
  { month: '11月', value: 418200 },
  { month: '12月', value: 425000 },
];

const Payroll: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<typeof MOCK_PAYROLL_HISTORY[0] | null>(null);
    const [showExport, setShowExport] = useState(false);

    if (selectedItem) return <PayrollDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    if (showExport) return <PayrollExport onBack={() => setShowExport(false)} />;

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Hero Card - Airy Gradient */}
            <div className="bg-gradient-to-br from-white via-white to-indigo-50/50 rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute -right-6 -top-6 opacity-[0.03] text-indigo-900 pointer-events-none transform rotate-12">
                    <TrendingUp size={180} />
                </div>

                <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                                <Banknote size={16} strokeWidth={2.5}/>
                            </div>
                            薪资总额变动
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">本月预计发放</p>
                        <p className="text-2xl font-black font-mono text-slate-900 tracking-tight">¥425,000.00</p>
                    </div>
                </div>

                <div className="h-48 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_SALARY_TREND} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="month" 
                                tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} 
                                axisLine={false} 
                                tickLine={false} 
                                dy={10}
                            />
                            <RechartsTooltip 
                                cursor={{fill: '#f1f5f9'}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                formatter={(value: number) => [`¥${(value/10000).toFixed(2)}w`, '薪资总额']}
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[6, 6, 0, 0]} 
                                barSize={24}
                                animationDuration={1500}
                            >
                                {MOCK_SALARY_TREND.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={index === MOCK_SALARY_TREND.length - 1 ? '#4f46e5' : '#cbd5e1'} 
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* History List */}
            <div>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-900">历史发放记录</h3>
                    <button onClick={() => setShowExport(true)} className="text-[10px] font-bold text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 active:scale-95 transition-all">
                        <Download size={12} strokeWidth={2.5}/> 导出报表
                    </button>
                </div>
                <div className="space-y-4">
                    {MOCK_PAYROLL_HISTORY.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedItem(item)} 
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden group hover:border-indigo-100"
                        >
                             {item.urgent && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>}
                             <div>
                                 <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                     {item.month} 工资表
                                     {item.urgent && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-sm shadow-orange-200"></span>}
                                 </h4>
                                 <p className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-2">
                                     <span className="font-mono">{item.date}</span>
                                     <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                     <span>{item.count}人</span>
                                 </p>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="text-right">
                                     <p className="font-black font-mono text-slate-900 text-base tracking-tight">¥{item.amount}</p>
                                     <div className="flex items-center justify-end gap-1.5 mt-1">
                                         {item.change && (
                                             <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${item.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                                 {item.change.startsWith('+') ? '↑' : '↓'} {item.change.replace(/[+-]/, '')}
                                             </span>
                                         )}
                                         <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                             item.status === '已发放' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-orange-50 text-orange-600 border-orange-100'
                                         }`}>
                                             {item.status}
                                         </span>
                                     </div>
                                 </div>
                                 <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payroll;
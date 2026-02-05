
import React, { useState } from 'react';
import { Download, ChevronRight, Banknote, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import PayrollDetail from './PayrollDetail';
import PayrollExport from './PayrollExport';

const MOCK_PAYROLL_HISTORY = [
  { id: 'p1', month: '2023-12', amount: '425,000.00', status: '待确认', count: 32, date: '12-05', urgent: true },
  { id: 'p2', month: '2023-11', amount: '418,200.00', status: '已发放', count: 32, date: '11-05', urgent: false },
  { id: 'p3', month: '2023-10', amount: '415,000.00', status: '已发放', count: 31, date: '10-05', urgent: false },
];

const MOCK_PAYROLL_BREAKDOWN = [
  { name: '基本工资', value: 280000, color: '#6366f1' }, // Indigo
  { name: '绩效奖金', value: 85000, color: '#8b5cf6' }, // Violet
  { name: '五险一金', value: 50000, color: '#10b981' }, // Emerald
  { name: '个税', value: 10000, color: '#f59e0b' }, // Amber
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
                    <PieChartIcon size={180} />
                </div>

                <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                                <Banknote size={16} strokeWidth={2.5}/>
                            </div>
                            本月薪资预览
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">预计发放</p>
                        <p className="text-2xl font-black font-mono text-slate-900 tracking-tight">¥425,000.00</p>
                    </div>
                </div>

                <div className="h-48 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={MOCK_PAYROLL_BREAKDOWN} 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={4} 
                                dataKey="value"
                                cornerRadius={6}
                            >
                                {MOCK_PAYROLL_BREAKDOWN.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>)}
                            </Pie>
                            <Legend 
                                iconType="circle" 
                                iconSize={6} 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right" 
                                wrapperStyle={{fontSize:'10px', fontWeight: 700, color: '#64748b'}}
                            />
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                            />
                        </PieChart>
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
                                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-1 ${
                                         item.status === '已发放' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                     }`}>
                                         {item.status}
                                     </span>
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


import React, { useState } from 'react';
import { FileBarChart, Search, FileText, ChevronRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ReportDetail } from './FinanceDetails';

const MOCK_FINANCIAL_REPORTS = [
    { id: 1, name: '2023年11月 资产负债表', type: 'PDF', size: '1.2MB', date: '12-05' },
    { id: 2, name: '2023年11月 利润表', type: 'Excel', size: '0.8MB', date: '12-05' },
];

const FinancialReports: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <ReportDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Trend Chart Card */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileBarChart size={16} /></div>
                         经营概况趋势
                     </h3>
                     <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                         近6个月
                     </span>
                 </div>
                 
                 <div className="h-48 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            {name: '7月', income: 45, expense: 38},
                            {name: '8月', income: 52, expense: 40},
                            {name: '9月', income: 48, expense: 42},
                            {name: '10月', income: 60, expense: 45},
                            {name: '11月', income: 55, expense: 43},
                            {name: '12月', income: 62, expense: 29},
                        ]} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="name" tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} dy={10}/>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                            <Area type="monotone" dataKey="income" name="收入" stroke="#3B82F6" strokeWidth={3} fill="url(#colorIncome)" />
                            <Area type="monotone" dataKey="expense" name="支出" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                        </AreaChart>
                    </ResponsiveContainer>
                 </div>
            </div>

            {/* Report Files */}
            <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 px-1">月度报表归档</h3>
                <div className="space-y-4">
                    {MOCK_FINANCIAL_REPORTS.map((file) => (
                        <div 
                            key={file.id} 
                            onClick={() => setSelectedItem(file)}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all hover:border-indigo-100 group"
                        >
                             <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                                     file.type === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                 }`}>
                                     <FileText size={22} strokeWidth={2} />
                                 </div>
                                 <div>
                                     <p className="text-sm font-black text-slate-900 line-clamp-1 mb-1">{file.name}</p>
                                     <p className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                                         <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">{file.type}</span>
                                         <span>{file.date} 上传</span>
                                         <span>{file.size}</span>
                                     </p>
                                 </div>
                             </div>
                             <div className="text-slate-300 group-hover:text-indigo-400 transition-colors">
                                 <Download size={20} strokeWidth={2} />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialReports;

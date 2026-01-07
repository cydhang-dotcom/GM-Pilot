import React, { useState } from 'react';
import { FileBarChart, Search, FileText, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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
        <div className="space-y-6">
            {/* Trend Chart */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                         <FileBarChart size={16} className="text-indigo-600"/> 经营概况
                     </h3>
                     <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">穿透模式: 开启</span>
                 </div>
                 <div className="h-40 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            {name: '7月', income: 45, expense: 38},
                            {name: '8月', income: 52, expense: 40},
                            {name: '9月', income: 48, expense: 42},
                            {name: '10月', income: 60, expense: 45},
                            {name: '11月', income: 55, expense: 43},
                            {name: '12月', income: 62, expense: 29},
                        ]}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                            <XAxis dataKey="name" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false}/>
                            <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} fill="url(#colorIncome)" />
                            <Area type="monotone" dataKey="expense" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                        </AreaChart>
                    </ResponsiveContainer>
                    
                    {/* Visual cue for drill down */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-blue-600 border border-blue-100 shadow-sm pointer-events-none flex items-center gap-1">
                        <Search size={10} /> 点击节点穿透
                    </div>
                 </div>
            </div>

            {/* Report Files */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">月度报表下载</h3>
                <div className="space-y-3">
                    {MOCK_FINANCIAL_REPORTS.map((file) => (
                        <div 
                            key={file.id} 
                            onClick={() => setSelectedItem(file)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
                        >
                             <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                     file.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                 }`}>
                                     <FileText size={20} />
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-gray-900 line-clamp-1">{file.name}</p>
                                     <p className="text-[10px] text-gray-400 mt-0.5">{file.date} 上传 · {file.size}</p>
                                 </div>
                             </div>
                             <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition-colors">
                                 <Download size={18} />
                             </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialReports;

import React, { useState } from 'react';
import { TaxDetail } from './FinanceDetails';
import { Clock, Calendar, ChevronRight } from 'lucide-react';

const MOCK_TAX_RECORDS = [
  { id: 1, title: '2023年11月 增值税及附加', amount: '12,500.00', status: '已缴款', type: '增值税', date: '2023-12-10' },
  { id: 2, title: '2023年11月 个人所得税', amount: '8,230.00', status: '申报中', type: '个税', date: '2023-12-08' },
];

const Tax: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <TaxDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Hero Card - Deadline */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-[32px] p-7 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                     <Calendar size={120} />
                 </div>
                 
                 <div className="relative z-10 flex justify-between items-end">
                     <div>
                         <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">本期申报倒计时</p>
                         <h2 className="text-4xl font-black font-mono tracking-tighter">5 <span className="text-lg font-bold text-indigo-300">天</span></h2>
                         <p className="text-xs font-medium text-indigo-100 mt-2 flex items-center gap-1.5 opacity-80">
                             <Clock size={12} /> 截止日期: 12月15日
                         </p>
                     </div>
                     <button className="bg-white text-indigo-900 px-5 py-3 rounded-xl text-xs font-black shadow-lg active:scale-95 transition-all hover:bg-indigo-50">
                         立即申报
                     </button>
                 </div>
            </div>

            {/* List */}
            <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 px-1">本期税单</h3>
                <div className="space-y-4">
                    {MOCK_TAX_RECORDS.map(r => (
                        <div 
                            key={r.id} 
                            onClick={() => setSelectedItem(r)}
                            className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center active:scale-[0.99] transition-all cursor-pointer group hover:border-indigo-100"
                        >
                            <div>
                                <h4 className="font-black text-sm text-slate-900 mb-1">{r.title}</h4>
                                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                                    <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-500 font-bold">{r.type}</span>
                                    <span>{r.date}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-black font-mono text-base text-slate-900">¥{r.amount}</p>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-1 inline-block ${
                                    r.status === '已缴款' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                    {r.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tax;

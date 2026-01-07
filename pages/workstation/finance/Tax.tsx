import React, { useState } from 'react';
import { TaxDetail } from './FinanceDetails';

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
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                 <div><p className="text-xs text-gray-400">本期申报倒计时</p><p className="font-bold text-gray-900 mt-1">剩余 5 天</p></div>
                 <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold">立即申报</button>
            </div>
            <div className="space-y-2">
                {MOCK_TAX_RECORDS.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => setSelectedItem(r)}
                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between cursor-pointer active:scale-[0.99] transition-transform"
                    >
                        <div><h4 className="font-bold text-sm">{r.title}</h4><p className="text-xs text-gray-400 mt-1">{r.type} · {r.date}</p></div>
                        <div className="text-right"><p className="font-mono font-bold">¥{r.amount}</p><span className="text-[10px] text-gray-500 bg-gray-100 px-1 rounded">{r.status}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tax;
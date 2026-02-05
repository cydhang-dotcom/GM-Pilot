
import React, { useState } from 'react';
import { Plus, Paperclip, ChevronRight } from 'lucide-react';
import { ReimbursementDetail } from './FinanceDetails';

const MOCK_REIMBURSEMENTS = [
    { id: 'rb1', user: '李娜', amount: '3,240.00', date: '12-05', status: 'Evidence Missing', desc: '11月北京出差', missing: '支付凭证' },
    { id: 'rb2', user: '张伟', amount: '580.00', date: '12-10', status: 'Approved', desc: '客户招待', missing: '' },
];

const Reimbursement: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <ReimbursementDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Create Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200 flex justify-between items-center group cursor-pointer active:scale-[0.98] transition-all">
                <div>
                    <h3 className="font-black text-lg mb-1 tracking-tight">发起报销</h3>
                    <p className="text-xs text-indigo-100 font-medium opacity-90">拍票据 · 自动识别 · 智能归集</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                    <Plus size={24} strokeWidth={3} />
                </div>
            </div>

            {/* List */}
            <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 px-1 flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                    我的报销单
                </h3>
                <div className="space-y-4">
                    {MOCK_REIMBURSEMENTS.map(rb => {
                        const isError = rb.status === 'Evidence Missing';
                        return (
                            <div 
                                key={rb.id} 
                                onClick={() => setSelectedItem(rb)}
                                className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer active:scale-[0.99] transition-all hover:border-indigo-100 group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900">{rb.desc}</h4>
                                        <p className="text-[11px] text-slate-400 mt-1 font-medium">{rb.date} · {rb.user}</p>
                                    </div>
                                    <p className="font-black font-mono text-slate-900 text-lg tracking-tight">¥{rb.amount}</p>
                                </div>
                                
                                {/* Evidence Package Status */}
                                <div className={`mt-4 p-3 rounded-xl text-xs flex justify-between items-center border ${
                                    isError ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <Paperclip size={14}/>
                                        <span className="font-bold">证据包: {isError ? '不齐套' : '完整'}</span>
                                    </div>
                                    {isError ? (
                                        <span className="font-black underline decoration-2 underline-offset-2 cursor-pointer flex items-center gap-1">
                                            补: {rb.missing} <ChevronRight size={10} />
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded text-slate-400 border border-slate-200">
                                            共 3 件
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-3 text-right">
                                    <span className={`text-[10px] px-2 py-1 rounded-lg font-black ${
                                        isError ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                        {isError ? '待补充' : '审批通过'}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Reimbursement;

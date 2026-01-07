import React, { useState } from 'react';
import { Plus, Paperclip } from 'lucide-react';
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
        <div className="space-y-4">
            {/* Create Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg mb-1">发起报销</h3>
                    <p className="text-xs text-blue-100 opacity-90">拍票据 · 自动识别 · 智能归集</p>
                </div>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 active:scale-95 transition-transform">
                    <Plus size={24} />
                </button>
            </div>

            {/* List */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">我的报销单</h3>
                <div className="space-y-3">
                    {MOCK_REIMBURSEMENTS.map(rb => {
                        const isError = rb.status === 'Evidence Missing';
                        return (
                            <div 
                                key={rb.id} 
                                onClick={() => setSelectedItem(rb)}
                                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{rb.desc}</h4>
                                        <p className="text-xs text-gray-400 mt-0.5">{rb.date} · {rb.user}</p>
                                    </div>
                                    <p className="font-mono font-bold text-gray-900">¥{rb.amount}</p>
                                </div>
                                
                                {/* Evidence Package Status */}
                                <div className={`mt-3 p-2 rounded-lg text-xs flex justify-between items-center ${
                                    isError ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 text-gray-500'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <Paperclip size={12}/>
                                        <span className="font-medium">证据包: {isError ? '不齐套' : '完整'}</span>
                                    </div>
                                    {isError && (
                                        <span className="font-bold underline cursor-pointer">
                                            补: {rb.missing}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-2 text-right">
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                        isError ? 'bg-gray-100 text-gray-400' : 'bg-emerald-50 text-emerald-600'
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
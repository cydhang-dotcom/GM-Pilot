import React, { useState } from 'react';
import { Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { CashFlowDetail } from './FinanceDetails';

const MOCK_FLOWS = [
    { id: 'f1', title: '上海某某科技有限公司', summary: '收到技术服务费', amount: '120,000.00', type: 'in', date: '12-12', status: '已匹配', match: '发票 #001', tag: '回款' },
    { id: 'f2', title: '上海物业管理有限公司', summary: '支付办公室租金', amount: '45,000.00', type: 'out', date: '12-01', status: '需解释', tag: '待分类' },
    { id: 'f3', title: '阿里云计算有限公司', summary: '支付云资源费', amount: '12,000.00', type: 'out', date: '12-05', status: '已匹配', match: '发票 #111', tag: '采购付款' },
    { id: 'f4', title: '基本户提现', summary: '备用金', amount: '5,000.00', type: 'out', date: '12-08', status: '需确认', match: '建议匹配: 报销单 #B01', tag: '借款往来' },
];

const CashFlow: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <CashFlowDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['全部', '待解释', '待确认', '收入', '支出'].map((f, i) => (
                    <button key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                        f === '待解释' || f === '待确认' 
                        ? 'bg-orange-50 text-orange-600 border-orange-100'
                        : i===0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
                    }`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-3">
                {MOCK_FLOWS.map((flow) => {
                    const isWarning = flow.status === '需解释' || flow.status === '需确认';
                    return (
                        <div 
                            key={flow.id} 
                            onClick={() => setSelectedItem(flow)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            {isWarning && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>}
                            
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div className="flex items-center gap-2">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                        flow.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                                    }`}>
                                        {flow.type === 'in' ? '收' : '支'}
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{flow.title}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">{flow.date} · {flow.summary}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-base font-bold font-mono ${
                                        flow.type === 'in' ? 'text-emerald-600' : 'text-gray-900'
                                    }`}>
                                        {flow.type === 'in' ? '+' : '-'}{flow.amount}
                                    </p>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="mt-3 pl-2 flex items-center justify-between border-t border-gray-50 pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{flow.tag}</span>
                                    {flow.match && (
                                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded flex items-center gap-1">
                                            <LinkIcon size={8} /> {flow.match}
                                        </span>
                                    )}
                                </div>
                                
                                {flow.status === '需解释' ? (
                                    <button className="text-[10px] font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full animate-pulse border border-orange-100">
                                        补充用途
                                    </button>
                                ) : flow.status === '需确认' ? (
                                    <div className="flex gap-2">
                                        <button className="text-[10px] font-bold text-gray-400 px-2" onClick={(e) => e.stopPropagation()}>否认</button>
                                        <button className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100">
                                            确认匹配
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-[10px] text-gray-300 flex items-center gap-1">
                                        <CheckCircle2 size={10}/> 已完成
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-4">只显示最近30天流水，更早记录请使用筛选</p>
        </div>
    );
};

export default CashFlow;
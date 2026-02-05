
import React, { useState } from 'react';
import { Link as LinkIcon, CheckCircle2, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';
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
        <div className="space-y-5 animate-fade-in pb-20">
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-[20px] border border-slate-200 shadow-sm flex items-center gap-2 px-4">
                <Search size={18} className="text-slate-300" />
                <input 
                    type="text" 
                    placeholder="搜索交易对手或金额..." 
                    className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300 h-10 font-medium"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pl-1">
                {['全部', '待解释', '待确认', '收入', '支出'].map((f, i) => (
                    <button key={i} className={`px-4 py-2 rounded-xl text-[11px] font-black whitespace-nowrap border transition-all active:scale-95 ${
                        f === '待解释' || f === '待确认' 
                        ? 'bg-orange-50 text-orange-600 border-orange-100 shadow-sm'
                        : i===0 ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 shadow-sm'
                    }`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {MOCK_FLOWS.map((flow) => {
                    const isWarning = flow.status === '需解释' || flow.status === '需确认';
                    const isIncome = flow.type === 'in';
                    return (
                        <div 
                            key={flow.id} 
                            onClick={() => setSelectedItem(flow)}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden active:scale-[0.99] transition-all cursor-pointer group hover:border-indigo-100"
                        >
                            {isWarning && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400"></div>}
                            
                            <div className="flex justify-between items-start mb-3 pl-2">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shadow-sm shrink-0 border ${
                                        isIncome ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                                    }`}>
                                        {isIncome ? <ArrowDownLeft size={18} strokeWidth={2.5} /> : <ArrowUpRight size={18} strokeWidth={2.5} />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-black text-slate-900 truncate pr-2">{flow.title}</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{flow.date} · {flow.summary}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className={`text-base font-black font-mono tracking-tight ${
                                        isIncome ? 'text-emerald-600' : 'text-slate-900'
                                    }`}>
                                        {isIncome ? '+' : '-'}{flow.amount}
                                    </p>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="mt-3 pl-2 flex items-center justify-between border-t border-slate-50 pt-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-lg">{flow.tag}</span>
                                    {flow.match && (
                                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-1 border border-blue-100">
                                            <LinkIcon size={10} /> {flow.match}
                                        </span>
                                    )}
                                </div>
                                
                                {flow.status === '需解释' ? (
                                    <button className="text-[10px] font-black bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg animate-pulse border border-orange-100 shadow-sm hover:bg-orange-100 transition-colors">
                                        补充用途
                                    </button>
                                ) : flow.status === '需确认' ? (
                                    <div className="flex gap-2">
                                        <button className="text-[10px] font-bold text-slate-400 px-2 py-1.5 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>否认</button>
                                        <button className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm hover:bg-blue-100 transition-colors">
                                            确认匹配
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                                        <CheckCircle2 size={12}/> 已完成
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-center text-[10px] text-slate-300 font-bold mt-6 tracking-widest uppercase">END OF 30 DAYS RECORD</p>
        </div>
    );
};

export default CashFlow;


import React, { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { ReconciliationDetail } from './FinanceDetails';

const MOCK_REC_ITEMS = [
    { id: 'r1', type: '流水未解释', count: 2, urgent: true, desc: '请补充大额支出用途' },
    { id: 'r2', type: '发票待归属', count: 1, urgent: true, desc: '需关联项目/部门' },
    { id: 'r3', type: '报销证据缺失', count: 1, urgent: false, desc: '李娜-差旅费缺支付截图' },
    { id: 'r4', type: '代理反馈差异', count: 0, urgent: false, desc: '暂无新反馈' },
];

const Reconciliation: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <ReconciliationDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Overview Card - Dark Tech Theme */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 rounded-[32px] p-7 text-white shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 transform rotate-12 transition-transform duration-700 group-hover:scale-110">
                    <RefreshCw size={140} />
                </div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                     <div>
                         <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-2">对账同步健康度</p>
                         <div className="flex items-center gap-3">
                            <h2 className="text-5xl font-black font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">92%</h2>
                            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 backdrop-blur-md">
                                <CheckCircle2 size={10} /> 正常
                            </span>
                         </div>
                     </div>
                     <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg active:scale-95 transition-transform cursor-pointer">
                         <RefreshCw size={20} className="text-white"/>
                     </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-md border border-white/5">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">本月流水</p>
                        <p className="text-lg font-black font-mono tracking-tight">142 笔</p>
                    </div>
                    <div className="bg-rose-500/10 rounded-2xl p-4 backdrop-blur-md border border-rose-500/20">
                        <p className="text-[10px] text-rose-300 font-bold uppercase mb-1">待处理差异</p>
                        <p className="text-lg font-black font-mono text-rose-400 tracking-tight">4 项</p>
                    </div>
                </div>
                <p className="text-[9px] text-slate-500 font-mono mt-4 text-center opacity-60">LAST SYNC: TODAY 10:30 AM</p>
            </div>

            {/* Action List */}
            <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 px-1 flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                    差异处理清单
                </h3>
                <div className="space-y-3">
                    {MOCK_REC_ITEMS.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center group active:scale-[0.99] transition-all cursor-pointer hover:border-indigo-100 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                 {/* Icon Box - 20px Axis Alignment visually handled by container padding */}
                                 <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center relative shrink-0 border ${
                                     item.urgent ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                 }`}>
                                     <AlertCircle size={22} strokeWidth={2} />
                                     {item.count > 0 && (
                                         <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm px-1">
                                             {item.count}
                                         </span>
                                     )}
                                 </div>
                                 <div>
                                     <h4 className="text-sm font-black text-slate-900">{item.type}</h4>
                                     <p className="text-xs text-slate-400 font-medium mt-1">{item.desc}</p>
                                 </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="text-[10px] font-black bg-slate-50 text-indigo-600 px-3 py-2 rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                    处理
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reconciliation;

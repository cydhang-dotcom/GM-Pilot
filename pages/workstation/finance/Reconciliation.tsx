import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
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
        <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                     <div>
                         <p className="text-indigo-200 text-xs font-medium mb-1">对账同步健康度</p>
                         <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-bold font-mono tracking-tight">92%</h2>
                            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30">正常</span>
                         </div>
                         <p className="text-[10px] text-indigo-300 mt-1">最后同步: 今天 10:30</p>
                     </div>
                     <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                         <RefreshCw size={20} className="text-indigo-100"/>
                     </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                        <p className="text-[10px] text-indigo-200">本月流水</p>
                        <p className="text-lg font-bold font-mono">142 笔</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                        <p className="text-[10px] text-indigo-200">待处理差异</p>
                        <p className="text-lg font-bold font-mono text-rose-300">4 项</p>
                    </div>
                </div>
            </div>

            {/* Action List */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">差异处理清单</h3>
                <div className="space-y-3">
                    {MOCK_REC_ITEMS.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between items-center group active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center relative ${
                                     item.urgent ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'
                                 }`}>
                                     <AlertCircle size={18} />
                                     {item.count > 0 && (
                                         <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center border border-white">
                                             {item.count}
                                         </span>
                                     )}
                                 </div>
                                 <div>
                                     <h4 className="text-sm font-bold text-gray-900">{item.type}</h4>
                                     <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                                 </div>
                            </div>
                            <button className="text-xs font-bold bg-gray-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-gray-200 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                处理
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reconciliation;
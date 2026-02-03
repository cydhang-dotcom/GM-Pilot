
import React, { useState } from 'react';
import { X, ScrollText, CheckCircle2, FileCheck, ArrowRightLeft, AlertCircle, Lock, CheckSquare } from 'lucide-react';

const VoucherAcceptance = ({ onBack, onConfirm }: { onBack: () => void, onConfirm: () => void }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const items = [
        { id: 'i1', icon: FileCheck, color: 'text-emerald-500', title: '交付物齐套性确认', desc: '本月共产生凭证 142 张，附件 305 份。纳税申报表已上传。' },
        { id: 'i2', icon: ArrowRightLeft, color: 'text-emerald-500', title: '资金调节表平衡', desc: '银行日记账余额与网银对账单余额一致，无未达账项。' },
        { id: 'i3', icon: AlertCircle, color: 'text-orange-500', title: '挂起事项确认', desc: '当前有 1 笔大额报销缺发票，已确认挂起至下月处理。', theme: 'orange' }
    ];

    const isAllChecked = items.every(i => checkedItems[i.id]);

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white max-w-md mx-auto w-full h-full border-x border-gray-200 overflow-hidden animate-fade-in-up">
             <div className="px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 -ml-1 hover:bg-gray-50 rounded-full text-gray-500"><X size={24} /></button>
                    <h2 className="text-lg font-bold text-gray-900">月结验收</h2>
                </div>
                <div className="text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">2023-12</div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                 <div className="mb-10 text-center">
                     <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-indigo-100">
                         <ScrollText size={32} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">财务关账确认</h3>
                     <p className="text-sm text-gray-500 leading-relaxed px-4">请总经理确认以下关键交付事项。验收后数据将锁定为 <span className="font-mono text-gray-900 font-bold">V1.0</span> 版本并归档。</p>
                 </div>
                 <div className="space-y-4 mb-8">
                     {items.map(item => (
                        <div key={item.id} onClick={() => setCheckedItems(prev => ({...prev, [item.id]: !prev[item.id]}))} className={`p-4 rounded-2xl flex gap-4 border-2 transition-all cursor-pointer select-none relative overflow-hidden group ${checkedItems[item.id] ? 'bg-blue-50/30 border-blue-500' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                            <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${checkedItems[item.id] ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-200'}`}>
                                {checkedItems[item.id] && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold mb-1 ${item.theme === 'orange' ? 'text-orange-900' : 'text-gray-900'}`}>{item.title}</h4>
                                <p className={`text-xs leading-relaxed ${item.theme === 'orange' ? 'text-orange-700/70' : 'text-gray-400'}`}>{item.desc}</p>
                            </div>
                        </div>
                     ))}
                 </div>
                 <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                     <Lock size={16} className="text-gray-400 shrink-0 mt-0.5" />
                     <div className="text-xs text-gray-500 leading-relaxed"><span className="font-bold text-gray-700 block mb-1">数据不可篡改</span>一旦确认验收，所有凭证将被加盖电子时间戳。</div>
                 </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white pb-8">
                <button onClick={isAllChecked ? onConfirm : undefined} className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${isAllChecked ? 'bg-indigo-600 text-white shadow-indigo-200 active:scale-[0.98]' : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'}`}>
                    <CheckSquare size={18} /> {isAllChecked ? '确认验收并锁版' : `请确认 (${Object.values(checkedItems).filter(Boolean).length}/${items.length})`}
                </button>
            </div>
        </div>
    )
}

export default VoucherAcceptance;

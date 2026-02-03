
import React, { useState } from 'react';
import { ArrowLeft, Share2, Printer, Paperclip, ChevronRight, Link as LinkIcon, Receipt, Activity, Wallet, FileText } from 'lucide-react';
import { Voucher, Attachment } from './VoucherManager';
import VoucherFilePreview from './VoucherFilePreview';

const VoucherDetail = ({ voucher, onBack }: { voucher: Voucher, onBack: () => void }) => {
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
    const isPosted = voucher.status === 'posted';

    if (selectedAttachment) {
        return <VoucherFilePreview attachment={selectedAttachment} onBack={() => setSelectedAttachment(null)} />;
    }

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#F3F4F6] max-w-md mx-auto w-full h-full border-x border-gray-200 overflow-hidden">
            <div className="bg-white px-4 pt-10 pb-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft size={20} /></button>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">{voucher.code}
                            {isPosted ? <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100">已记账</span> : <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">审核中</span>}
                        </h2>
                    </div>
                </div>
                <div className="flex gap-2 text-gray-500"><button className="p-2 hover:bg-gray-100 rounded-full"><Share2 size={18} /></button><button className="p-2 hover:bg-gray-100 rounded-full"><Printer size={18} /></button></div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative overflow-hidden">
                    <div className="h-1.5 bg-indigo-600 w-full"></div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-6">
                            <div><p className="text-xs text-gray-400">凭证摘要</p><h3 className="text-lg font-bold text-gray-900 mt-1">{voucher.summary}</h3><div className="flex items-center gap-3 mt-2 text-xs text-gray-500"><span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{voucher.period}</span><span>{voucher.date}</span></div></div>
                            <div className="text-right"><p className="text-xs text-gray-400">总金额</p><p className="text-2xl font-bold font-mono text-gray-900 mt-0.5 tracking-tight">¥{voucher.amount}</p></div>
                        </div>
                        <div className="relative flex items-center justify-center my-6"><div className="absolute left-0 right-0 border-t border-dashed border-gray-200"></div><div className="absolute -left-6 w-3 h-6 bg-[#F3F4F6] rounded-r-full"></div><div className="absolute -right-6 w-3 h-6 bg-[#F3F4F6] rounded-l-full"></div></div>
                        <div>
                             <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">会计分录</h4>
                             <div className="bg-gray-50 rounded-lg border border-gray-200 text-xs overflow-hidden">
                                 <div className="flex bg-gray-100/50 border-b border-gray-200 py-2 px-3 text-gray-400">
                                     <div className="flex-1">科目 (Subject)</div><div className="w-20 text-right">借 (Dr)</div><div className="w-20 text-right">贷 (Cr)</div>
                                 </div>
                                 {voucher.entries.map((entry, idx) => (
                                     <div key={idx} className="flex border-b border-gray-100 last:border-0 py-3 px-3">
                                         <div className="flex-1 pr-2"><div className="font-bold text-gray-800 break-all">{entry.subject}</div><div className="font-mono text-[10px] text-gray-400 mt-0.5">{entry.code}</div></div>
                                         <div className="w-20 text-right font-mono text-gray-900">{entry.direction === 'debit' ? entry.amount : ''}</div>
                                         <div className="w-20 text-right font-mono text-gray-900">{entry.direction === 'credit' ? entry.amount : ''}</div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4"><h4 className="text-sm font-bold text-gray-900 flex items-center gap-2"><LinkIcon size={14} className="text-blue-600"/> 原始单据</h4></div>
                    <div className="space-y-3">
                        {voucher.attachments.map((att) => (
                            <div key={att.id} onClick={() => setSelectedAttachment(att)} className="bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-start gap-3 active:bg-gray-100 transition-all cursor-pointer group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-black/5 shadow-sm group-hover:bg-white transition-colors ${att.type === 'invoice' ? 'bg-orange-50 text-orange-500' : att.type === 'flow' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-500'}`}>
                                    {att.type === 'invoice' ? <Receipt size={20}/> : att.type === 'flow' ? <Activity size={20}/> : <FileText size={20}/>}
                                </div>
                                <div className="flex-1 min-w-0"><div className="flex items-center justify-between"><h5 className="text-sm font-bold text-gray-900 truncate">{att.title}</h5><ChevronRight size={14} className="text-gray-300"/></div><p className="text-xs text-gray-500 mt-0.5 truncate">{att.fileName}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherDetail;

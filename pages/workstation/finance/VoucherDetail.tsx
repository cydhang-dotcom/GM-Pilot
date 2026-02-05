
import React, { useState } from 'react';
import { ArrowLeft, Share2, Printer, Paperclip, ChevronRight, Link as LinkIcon, Receipt, Activity, FileText } from 'lucide-react';
import { Voucher, Attachment } from './VoucherManager';
import VoucherFilePreview from './VoucherFilePreview';

const VoucherDetail = ({ voucher, onBack }: { voucher: Voucher, onBack: () => void }) => {
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
    const isPosted = voucher.status === 'posted';

    if (selectedAttachment) {
        return <VoucherFilePreview attachment={selectedAttachment} onBack={() => setSelectedAttachment(null)} />;
    }

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#F8F9FB] max-w-md mx-auto w-full h-full border-x border-slate-100 overflow-hidden animate-slide-in-right">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-800 active:scale-90">
                        <ArrowLeft size={24} strokeWidth={2.5} />
                    </button>
                    <div>
                        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            {voucher.code}
                            {isPosted ? 
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-100 font-bold">已记账</span> : 
                                <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md border border-orange-100 font-bold">审核中</span>
                            }
                        </h2>
                    </div>
                </div>
                <div className="flex gap-1 text-slate-400">
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors"><Share2 size={20} strokeWidth={2} /></button>
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors"><Printer size={20} strokeWidth={2} /></button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                {/* Main Voucher Card */}
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="h-1.5 bg-indigo-600 w-full"></div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">凭证摘要</p>
                                <h3 className="text-lg font-black text-slate-900 leading-snug">{voucher.summary}</h3>
                                <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 font-medium">
                                    <span className="bg-slate-100 px-2 py-1 rounded-lg font-mono">{voucher.period}</span>
                                    <span>{voucher.date}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">总金额</p>
                                <p className="text-2xl font-black font-mono text-slate-900 tracking-tight">¥{voucher.amount}</p>
                            </div>
                        </div>
                        
                        {/* Skeuomorphic Splitter */}
                        <div className="relative flex items-center justify-center my-8">
                            <div className="absolute left-0 right-0 border-t border-dashed border-slate-200"></div>
                            <div className="absolute -left-9 w-6 h-12 bg-[#F8F9FB] rounded-r-full shadow-inner"></div>
                            <div className="absolute -right-9 w-6 h-12 bg-[#F8F9FB] rounded-l-full shadow-inner"></div>
                        </div>
                        
                        <div>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">会计分录 (Entries)</h4>
                             <div className="bg-slate-50 rounded-2xl border border-slate-100 text-xs overflow-hidden">
                                 <div className="flex bg-slate-100/50 border-b border-slate-200 py-3 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                     <div className="flex-1">科目</div>
                                     <div className="w-20 text-right">借 (Dr)</div>
                                     <div className="w-20 text-right">贷 (Cr)</div>
                                 </div>
                                 {voucher.entries.map((entry, idx) => (
                                     <div key={idx} className="flex border-b border-slate-100 last:border-0 py-4 px-4 hover:bg-white transition-colors">
                                         <div className="flex-1 pr-3">
                                             <div className="font-bold text-slate-800 break-all leading-tight">{entry.subject}</div>
                                             <div className="font-mono text-[10px] text-slate-400 mt-1 font-bold">{entry.code}</div>
                                         </div>
                                         <div className="w-20 text-right font-mono font-bold text-slate-900">{entry.direction === 'debit' ? entry.amount : ''}</div>
                                         <div className="w-20 text-right font-mono font-bold text-slate-900">{entry.direction === 'credit' ? entry.amount : ''}</div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Attachments Card */}
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <LinkIcon size={16} className="text-indigo-600"/> 原始单据
                        </h4>
                    </div>
                    <div className="space-y-3">
                        {voucher.attachments.map((att) => (
                            <div key={att.id} onClick={() => setSelectedAttachment(att)} className="bg-slate-50 rounded-2xl border border-slate-200 p-3 flex items-center gap-4 active:bg-slate-100 transition-all cursor-pointer group">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-sm group-hover:bg-white transition-colors ${att.type === 'invoice' ? 'bg-orange-50 text-orange-500' : att.type === 'flow' ? 'bg-blue-50 text-blue-500' : 'bg-white text-slate-500'}`}>
                                    {att.type === 'invoice' ? <Receipt size={24} strokeWidth={1.5}/> : att.type === 'flow' ? <Activity size={24} strokeWidth={1.5}/> : <FileText size={24} strokeWidth={1.5}/>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-sm font-bold text-slate-900 truncate mb-0.5">{att.title}</h5>
                                        <ChevronRight size={16} className="text-slate-300"/>
                                    </div>
                                    <p className="text-[10px] text-slate-500 truncate font-mono">{att.fileName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherDetail;

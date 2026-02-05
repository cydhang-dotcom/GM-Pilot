
import React, { useState } from 'react';
import { 
  Printer, Download, MessageSquare, Send, 
  CheckCircle2, AlertCircle, FileText, Clock, Building2, 
  Activity, Landmark, Receipt, Info, Paperclip, 
  FileImage, AlertTriangle, ChevronRight,
  ArrowUpRight, ScanLine, User, Car, Coffee, BedDouble,
  Calendar, CreditCard
} from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Shared Helpers ---

const DetailRow = ({ label, value, isMono = false, isBold = false, subValue }: { label: string, value: string | React.ReactNode, isMono?: boolean, isBold?: boolean, subValue?: string }) => (
    <div className="flex justify-between items-start py-3.5 border-b border-slate-50 last:border-0 group">
        <span className="text-xs text-slate-400 font-bold shrink-0">{label}</span>
        <div className="text-right max-w-[70%]">
            <div className={`text-sm text-slate-900 leading-tight ${isMono ? 'font-mono' : ''} ${isBold ? 'font-black' : 'font-medium'}`}>
                {value}
            </div>
            {subValue && <div className="text-[10px] text-slate-400 mt-1">{subValue}</div>}
        </div>
    </div>
);

const AttachmentThumb = ({ type, name, size }: { type: string, name: string, size?: string }) => (
    <div className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer w-full shadow-sm group hover:border-indigo-100">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm transition-colors ${
            type === 'pdf' ? 'bg-rose-50 text-rose-500' : 
            type === 'img' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
        }`}>
            {type === 'pdf' ? <FileText size={20} strokeWidth={2}/> : 
             type === 'img' ? <FileImage size={20} strokeWidth={2}/> : 
             <Paperclip size={20} strokeWidth={2}/>}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate mb-0.5">{name}</p>
            <p className="text-[10px] text-slate-400 font-bold">{size || '未知大小'}</p>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400" />
    </div>
);

// --- 1. Reconciliation Detail ---

export const ReconciliationDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const chatHistory = [
        { id: 1, role: 'agent', name: '代理会计', time: '10:30', content: '这笔大额支出是支付给谁的？系统里没找到对应的合同，请确认是否为预付款。' },
        { id: 2, role: 'user', name: '我', time: '10:35', content: '这是预付给上海千机科技的技术服务费，合同还在走流程，下周补上。' },
        { id: 3, role: 'agent', name: '代理会计', time: '10:36', content: '收到，那我先挂账在预付账款科目，等发票和合同到了再转结。' },
    ];

    return (
        <DetailLayout 
            title="差异处理" 
            tag={item.urgent ? { label: '需处理', color: 'text-rose-600', bg: 'bg-rose-50' } : undefined}
            onBack={onBack}
            actions={
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all text-sm">
                    标记已处理
                </button>
            }
        >
            <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] transform rotate-12 pointer-events-none">
                    <AlertTriangle size={140} className="text-orange-900" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-sm">
                            <AlertTriangle size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-black text-orange-700">
                            {item.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3 leading-relaxed">{item.desc}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                        系统在自动对账过程中发现该笔记录存在异常，需要您补充相关信息或确认处理方式。
                    </p>
                </div>
            </div>

            {/* Context Data */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                     关联流水数据
                 </h4>
                 <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <div className="flex justify-between items-start mb-3">
                         <div>
                            <p className="text-sm font-black text-slate-900">招商银行</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-mono font-bold">基本户 8888</p>
                         </div>
                         <p className="text-lg font-mono font-black text-slate-900 tracking-tight">-45,000.00</p>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 border-t border-slate-200/50 pt-3 mt-2">
                         <Clock size={12} /> 2023-12-01 14:30:22
                     </div>
                 </div>
            </div>

            {/* Communication Record */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                 <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={14} /> 沟通记录
                     </h4>
                 </div>
                 <div className="p-5 space-y-5">
                     {chatHistory.map(msg => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-600 border-slate-100'}`}>
                                {msg.role === 'user' ? <User size={16}/> : '代'}
                            </div>
                            <div className={`rounded-2xl p-3.5 text-xs font-medium leading-relaxed max-w-[85%] shadow-sm border ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-600' : 'bg-slate-50 text-slate-700 rounded-tl-none border-slate-100'}`}>
                                <div className={`flex justify-between items-baseline mb-1.5 gap-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                    <span className="font-bold text-[10px] uppercase">{msg.name}</span>
                                    <span className="text-[9px] font-mono opacity-80">{msg.time}</span>
                                </div>
                                {msg.content}
                            </div>
                        </div>
                     ))}
                 </div>
                 <div className="p-4 border-t border-slate-50 flex gap-3">
                     <input className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all placeholder-slate-400 border border-transparent focus:border-indigo-100" placeholder="输入回复内容..." />
                     <button className="bg-indigo-600 text-white rounded-xl w-12 flex items-center justify-center shadow-lg shadow-indigo-200 active:scale-95 transition-transform"><Send size={18} strokeWidth={2.5}/></button>
                 </div>
            </div>
        </DetailLayout>
    );
}

// --- 2. Cash Flow Detail ---

export const CashFlowDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const isIncome = item.type === 'in';
    const amountColor = isIncome ? 'text-emerald-600' : 'text-slate-900';
    const amountSign = isIncome ? '+' : '-';

    return (
        <DetailLayout 
            title="资金流水详情" 
            onBack={onBack}
        >
            {/* Header Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${isIncome ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                
                <div className="w-16 h-16 rounded-2xl bg-slate-50 shadow-inner flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <Landmark size={32} className={isIncome ? 'text-emerald-600' : 'text-slate-700'} strokeWidth={1.5} />
                </div>
                
                <h3 className={`text-4xl font-black font-mono tracking-tighter mb-3 ${amountColor}`}>
                    {amountSign}{item.amount}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 mb-6">
                     <span className={`w-2 h-2 rounded-full ${isIncome ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                     <span className="text-xs font-bold text-slate-600">{isIncome ? '银行收入' : '银行支出'}</span>
                </div>
                
                <p className="text-sm font-black text-slate-900 mb-1.5 line-clamp-2">{item.title}</p>
                <p className="text-xs text-slate-400 font-medium">{item.summary}</p>
            </div>

            {/* Details List */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden px-6 py-2">
                <DetailRow label="交易时间" value={`${item.date} 14:30:00`} />
                <DetailRow label="对方账号" value="6222 **** **** 9928" isMono />
                <DetailRow label="交易单号" value="TXN20231201000283" isMono />
                <div className="py-4 flex justify-between items-center cursor-pointer group border-t border-slate-50 mt-1">
                    <span className="text-sm text-slate-500 font-bold flex items-center gap-2">
                        <FileText size={16} /> 电子回单
                    </span>
                    <div className="flex items-center gap-1 text-xs text-indigo-600 font-black group-hover:underline">
                        查看附件 <ChevronRight size={14} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-5">
                    <h4 className="text-sm font-black text-slate-900">业务处理</h4>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                        item.status === '需解释' ? 'bg-orange-50 text-orange-600' : 
                        item.status === '需确认' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                        {item.status}
                    </span>
                </div>

                {item.status === '需解释' ? (
                    <div className="space-y-4">
                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-xs font-medium text-orange-800 flex gap-3 leading-relaxed">
                             <Info size={18} className="shrink-0 mt-0.5 text-orange-600" />
                             请选择该笔资金的业务用途，以便财务进行入账处理。
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {['销售回款', '服务费', '往来款', '报销', '工资', '税费'].map(t => (
                                <button key={t} className="py-3 text-xs font-bold border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all bg-white text-slate-600 shadow-sm active:scale-95">
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 shadow-sm">
                             <CheckCircle2 size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">已智能匹配</p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">关联单据: <span className="font-mono text-slate-700 font-bold">{item.match || '自动入账'}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </DetailLayout>
    );
}

// --- 3. Invoice Detail (The "Ticket" Look) ---

export const InvoiceDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    return (
        <DetailLayout 
            title="发票详情" 
            onBack={onBack}
            actions={item.status === '待归属' ? (
                <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98]">
                    补充归属信息
                </button>
            ) : undefined}
        >
            {/* Invoice Ticket */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 relative overflow-hidden">
                {/* Visual Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="p-7 relative pb-8">
                     {/* Watermark */}
                     <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none transform rotate-12">
                         <Receipt size={140} className="text-indigo-900" />
                     </div>

                     <div className="flex justify-between items-start mb-8 relative z-10">
                         <div className="flex-1 pr-4">
                             <span className={`text-[10px] font-black px-2 py-1 rounded-lg border mb-3 inline-block shadow-sm ${
                                 item.type.includes('专') ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                             }`}>
                                 {item.type}
                             </span>
                             <h3 className="text-lg font-black text-slate-900 leading-snug break-words">{item.name}</h3>
                         </div>
                         <div className="text-right shrink-0">
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Total Amount</p>
                             <p className="text-2xl font-black font-mono text-slate-900 tracking-tight">¥{item.amount}</p>
                         </div>
                     </div>

                     <div className="space-y-1 relative z-10">
                         <DetailRow label="开票日期" value={item.date} isMono />
                         <DetailRow label="发票代码" value={item.code || '031002300XXX'} isMono />
                         <DetailRow label="发票号码" value={item.number || '88888888'} isMono />
                         <DetailRow label="服务项目" value={item.project || item.content} />
                     </div>
                </div>

                {/* Dashed Line Separator with Punch Holes */}
                <div className="relative flex items-center justify-center -my-3 z-20">
                    <div className="absolute left-0 right-0 border-t-2 border-dashed border-slate-100"></div>
                    <div className="absolute -left-3 w-6 h-6 bg-[#F8F9FB] rounded-full shadow-inner border border-slate-100/50"></div>
                    <div className="absolute -right-3 w-6 h-6 bg-[#F8F9FB] rounded-full shadow-inner border border-slate-100/50"></div>
                </div>

                <div className="p-7 bg-slate-50/50">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">流转状态</h4>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm border border-white">
                            <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-black text-slate-900">{item.status}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{item.source} · {item.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DetailLayout>
    );
};

// --- 4. Reimbursement Detail ---

export const ReimbursementDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const isError = item.status === 'Evidence Missing';
    
    return (
        <DetailLayout 
            title="报销详情" 
            onBack={onBack}
            actions={isError ? (
                <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                    <ScanLine size={18} /> 立即补全影像
                </button>
            ) : undefined}
        >
            <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">报销总额</p>
                        <h3 className="text-3xl font-black font-mono tracking-tight text-slate-900">¥{item.amount}</h3>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl border text-xs font-black ${
                        isError ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                        {item.status}
                    </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                    <DetailRow label="报销事由" value={item.desc} />
                    <DetailRow label="申请人" value={item.user} />
                    <DetailRow label="提交日期" value={item.date} isMono />
                </div>
            </div>

            {/* Evidence Checklist */}
            <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">报销明细与证据链</h4>
                <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                    {/* Item 1 */}
                    <div className="p-5 border-b border-slate-50 relative">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Car size={18} strokeWidth={2.5}/>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">市内交通费</p>
                                    <p className="text-xs text-slate-400 font-mono">2023-11-15</p>
                                </div>
                            </div>
                            <span className="text-sm font-black font-mono">¥240.00</span>
                        </div>
                        
                        {/* Evidence Status */}
                        <div className="flex gap-2">
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                                <CheckCircle2 size={10} /> 发票
                            </span>
                            <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100 flex items-center gap-1 animate-pulse">
                                <AlertCircle size={10} /> 缺支付凭证
                            </span>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <Coffee size={18} strokeWidth={2.5}/>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">业务招待费</p>
                                    <p className="text-xs text-slate-400 font-mono">2023-11-16</p>
                                </div>
                            </div>
                            <span className="text-sm font-black font-mono">¥3,000.00</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                                <CheckCircle2 size={10} /> 发票
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                                <CheckCircle2 size={10} /> 支付截图
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </DetailLayout>
    );
};

// --- 5. Report Detail ---

export const ReportDetail = ({ item, onBack }: { item: any, onBack: () => void }) => (
    <DetailLayout 
        title="报表详情" 
        onBack={onBack}
        actions={
            <div className="flex gap-3">
                <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98]">
                    发送至邮箱
                </button>
                <button className="flex-[2] bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                    <Download size={18} /> 下载原文件
                </button>
            </div>
        }
    >
        <div className="flex flex-col items-center py-10">
            <div className="w-32 h-40 bg-white shadow-2xl border border-slate-100 rounded-lg relative mb-8 flex flex-col items-center justify-center group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
                <FileText size={48} className="text-slate-200 mb-2" strokeWidth={1} />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Preview</p>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <ArrowUpRight size={20} className="text-slate-400" />
                </div>
            </div>
            
            <h3 className="text-lg font-black text-slate-900 text-center px-8">{item.name}</h3>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-100 px-3 py-1 rounded-full">{item.size} · {item.type}</p>
        </div>

        <div className="bg-white rounded-[28px] border border-slate-100 p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 mb-4">关键数据摘要</h4>
            <div className="space-y-4">
                <DetailRow label="资产总计" value="¥ 1,250,000.00" isMono isBold />
                <DetailRow label="负债总计" value="¥ 450,000.00" isMono isBold />
                <DetailRow label="所有者权益" value="¥ 800,000.00" isMono isBold />
            </div>
        </div>
    </DetailLayout>
);

// --- 6. Tax Detail ---

export const TaxDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const isPaid = item.status === '已缴款';
    
    return (
        <DetailLayout 
            title="税单详情" 
            onBack={onBack}
            actions={!isPaid ? (
                <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                    <CreditCard size={18} /> 确认并缴款
                </button>
            ) : (
                <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98] flex items-center justify-center gap-2">
                    <Printer size={18} /> 下载完税证明
                </button>
            )}
        >
            <div className={`rounded-[32px] p-8 text-center relative overflow-hidden shadow-lg ${isPaid ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-indigo-600 text-white shadow-indigo-200'}`}>
                <div className="relative z-10">
                    <p className="text-xs font-bold opacity-80 mb-2">{item.title}</p>
                    <h3 className="text-4xl font-black font-mono tracking-tighter mb-6">¥{item.amount}</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20">
                         {isPaid ? <CheckCircle2 size={14} strokeWidth={3}/> : <Clock size={14} strokeWidth={3}/>}
                         <span className="text-xs font-black">{item.status}</span>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -right-10 -bottom-10 opacity-10">
                    <Building2 size={200} />
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm mt-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">税种明细</h4>
                <div className="space-y-1">
                    {item.type === '增值税' ? (
                        <>
                            <DetailRow label="增值税 (6%)" value="¥ 11,800.00" isMono />
                            <DetailRow label="城建税 (7%)" value="¥ 826.00" isMono />
                            <DetailRow label="教育费附加 (3%)" value="¥ 354.00" isMono />
                            <DetailRow label="地方教育附加 (2%)" value="¥ 236.00" isMono />
                        </>
                    ) : (
                        <>
                            <DetailRow label="工资薪金个税" value="¥ 8,000.00" isMono />
                            <DetailRow label="劳务报酬个税" value="¥ 230.00" isMono />
                        </>
                    )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between text-xs text-slate-400 font-bold">
                    <span>申报日期: {item.date}</span>
                    <span>主管税务局: 徐汇区税务局</span>
                </div>
            </div>
        </DetailLayout>
    );
};

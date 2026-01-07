import React from 'react';
import { 
  Printer, Download, MessageSquare, Send, 
  CheckCircle2, AlertCircle, FileText, Clock, Building2, 
  Activity, Landmark, Receipt, Info, Paperclip, 
  FileImage, AlertTriangle, ChevronRight,
  ArrowUpRight, ScanLine
} from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Shared Helpers ---

const DetailRow = ({ label, value, isMono = false, isBold = false, subValue }: { label: string, value: string | React.ReactNode, isMono?: boolean, isBold?: boolean, subValue?: string }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-50 last:border-0 group">
        <span className="text-sm text-gray-500 shrink-0">{label}</span>
        <div className="text-right max-w-[70%]">
            <div className={`text-sm text-gray-900 leading-tight ${isMono ? 'font-mono' : ''} ${isBold ? 'font-bold' : ''}`}>
                {value}
            </div>
            {subValue && <div className="text-[10px] text-gray-400 mt-1">{subValue}</div>}
        </div>
    </div>
);

const AttachmentThumb = ({ type, name, size }: { type: string, name: string, size?: string }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 active:bg-gray-50 transition-colors cursor-pointer w-full shadow-sm group">
        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
            {type === 'pdf' ? <FileText size={24} className="text-rose-500" strokeWidth={1.5}/> : 
             type === 'img' ? <FileImage size={24} className="text-blue-500" strokeWidth={1.5}/> : 
             <Paperclip size={24} className="text-gray-400" strokeWidth={1.5}/>}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate mb-0.5">{name}</p>
            <p className="text-[10px] text-gray-400 font-medium">{size || '未知大小'}</p>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
    </div>
);

// --- 1. Reconciliation Detail ---

export const ReconciliationDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                    <AlertTriangle size={120} className="text-orange-900" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-100">
                            <AlertTriangle size={20} />
                        </div>
                        <span className="text-sm font-bold text-orange-700">
                            {item.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-relaxed">{item.desc}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        系统在自动对账过程中发现该笔记录存在异常，需要您补充相关信息或确认处理方式。
                    </p>
                </div>
            </div>

            {/* Context Data */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                 <h4 className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                     关联流水数据
                 </h4>
                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                     <div className="flex justify-between items-start mb-3">
                         <div>
                            <p className="text-sm font-bold text-gray-900">招商银行</p>
                            <p className="text-xs text-gray-400 mt-0.5 font-mono">基本户 8888</p>
                         </div>
                         <p className="text-lg font-mono font-bold text-gray-900">-45,000.00</p>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] text-gray-400 border-t border-gray-200 pt-2 mt-2">
                         <Clock size={12} /> 2023-12-01 14:30:22
                     </div>
                 </div>
            </div>

            {/* Communication */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                     <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2">
                        <MessageSquare size={14} /> 沟通记录
                     </h4>
                 </div>
                 <div className="p-5 space-y-4">
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0 border border-indigo-100">
                             代
                         </div>
                         <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-700 leading-relaxed max-w-[85%]">
                             <p className="font-bold text-gray-900 mb-1">代理会计</p>
                             这笔大额支出是支付给谁的？系统里没找到对应的合同，请确认是否为预付款。
                         </div>
                     </div>
                 </div>
                 <div className="p-3 border-t border-gray-100 flex gap-2">
                     <input className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400" placeholder="输入回复内容..." />
                     <button className="bg-indigo-600 text-white rounded-xl px-4 flex items-center justify-center font-bold text-xs"><Send size={16} /></button>
                 </div>
            </div>
        </DetailLayout>
    );
}

// --- 2. Cash Flow Detail ---

export const CashFlowDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const isIncome = item.type === 'in';
    const amountColor = isIncome ? 'text-emerald-600' : 'text-gray-900';
    const amountSign = isIncome ? '+' : '-';

    return (
        <DetailLayout 
            title="资金流水详情" 
            onBack={onBack}
        >
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${isIncome ? 'bg-emerald-500' : 'bg-gray-800'}`}></div>
                
                <div className="w-16 h-16 rounded-2xl bg-gray-50 shadow-inner flex items-center justify-center mx-auto mb-5 border border-gray-100">
                    <Landmark size={32} className={isIncome ? 'text-emerald-600' : 'text-gray-700'} strokeWidth={1.5} />
                </div>
                
                <h3 className={`text-4xl font-bold font-mono tracking-tighter mb-2 ${amountColor}`}>
                    {amountSign}{item.amount}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4">
                     <span className={`w-2 h-2 rounded-full ${isIncome ? 'bg-emerald-500' : 'bg-gray-700'}`}></span>
                     <span className="text-xs font-bold text-gray-600">{isIncome ? '银行收入' : '银行支出'}</span>
                </div>
                
                <p className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-400">{item.summary}</p>
            </div>

            {/* Details List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-6 py-2">
                <DetailRow label="交易时间" value={`${item.date} 14:30:00`} />
                <DetailRow label="对方账号" value="6222 **** **** 9928" isMono />
                <DetailRow label="交易单号" value="TXN20231201000283" isMono />
                <div className="py-4 flex justify-between items-center cursor-pointer group border-t border-gray-50 mt-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                        <FileText size={16} /> 电子回单
                    </span>
                    <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold group-hover:underline">
                        查看附件 <ChevronRight size={14} />
                    </div>
                </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h4 className="text-sm font-bold text-gray-900">业务处理</h4>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                        item.status === '需解释' ? 'bg-orange-50 text-orange-600' : 
                        item.status === '需确认' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                        {item.status}
                    </span>
                </div>

                {item.status === '需解释' ? (
                    <div className="space-y-4">
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-xs text-orange-800 flex gap-3 leading-relaxed">
                             <Info size={18} className="shrink-0 mt-0.5 text-orange-600" />
                             请选择该笔资金的业务用途，以便财务进行入账处理。
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {['销售回款', '服务费', '往来款', '报销', '工资', '税费'].map(t => (
                                <button key={t} className="py-3 text-xs font-bold border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all bg-gray-50 text-gray-600">
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                             <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">已智能匹配</p>
                            <p className="text-xs text-gray-500 mt-1">关联单据: <span className="font-mono text-gray-700 font-medium">{item.match || '自动入账'}</span></p>
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
        >
            {/* Invoice Ticket */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden">
                {/* Visual Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="p-6 relative pb-8">
                     {/* Watermark */}
                     <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none transform rotate-12">
                         <Receipt size={140} className="text-indigo-900" />
                     </div>

                     <div className="flex justify-between items-start mb-8 relative z-10">
                         <div className="flex-1 pr-4">
                             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-3 inline-block">
                                 {item.type}
                             </span>
                             <h3 className="text-lg font-bold text-gray-900 leading-snug break-words">{item.name}</h3>
                         </div>
                         <div className="text-right shrink-0">
                             <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Total</p>
                             <p className="text-2xl font-bold font-mono text-gray-900 tracking-tight">¥{item.amount}</p>
                         </div>
                     </div>

                     {/* Dashed Line Separator with Punch Holes */}
                     <div className="relative flex items-center justify-center my-6">
                        <div className="w-full border-t-2 border-dashed border-gray-100"></div>
                        <div className="absolute -left-9 w-6 h-6 bg-[#F9FAFB] rounded-full shadow-[inset_-1px_0_2px_rgba(0,0,0,0.05)]"></div>
                        <div className="absolute -right-9 w-6 h-6 bg-[#F9FAFB] rounded-full shadow-[inset_1px_0_2px_rgba(0,0,0,0.05)]"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Invoice Code</p>
                            <p className="text-sm font-mono font-medium text-gray-800">{item.code || '031002300111'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Issued Date</p>
                            <p className="text-sm font-mono font-medium text-gray-800">{item.date}</p>
                        </div>
                        <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Project / Service</p>
                             <p className="text-sm font-bold text-gray-900">{item.project || '技术服务费'}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {item.status}
                    </span>
                    <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors">
                        查看原件 <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                 <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">流转进度</h4>
                 <div className="flex items-start gap-4 relative pb-8 border-l-2 border-emerald-100 ml-2 pl-6">
                     <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm"></div>
                     <div>
                         <p className="text-sm font-bold text-gray-900">发票采集</p>
                         <p className="text-xs text-gray-400 mt-1">12-01 10:00 · 系统自动同步</p>
                     </div>
                 </div>
                 <div className="flex items-start gap-4 relative ml-2 pl-6">
                     <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white shadow-sm"></div>
                     <div>
                         <p className="text-sm font-bold text-gray-900">等待归档</p>
                         <p className="text-xs text-gray-400 mt-1">预计月结时完成</p>
                     </div>
                 </div>
            </div>
        </DetailLayout>
    );
}

// --- 4. Reimbursement Detail ---

export const ReimbursementDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    const isError = item.status === 'Evidence Missing';

    return (
        <DetailLayout 
            title="报销单详情" 
            onBack={onBack}
            tag={{ 
              label: isError ? '证据缺失' : '审批通过', 
              color: isError ? 'text-rose-600' : 'text-emerald-600', 
              bg: isError ? 'bg-rose-50' : 'bg-emerald-50' 
            }}
            actions={isError ? (
                <button className="w-full bg-rose-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-200 active:scale-[0.98] transition-all text-sm">
                    补充缺失材料
                </button>
            ) : undefined}
        >
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.desc}</h3>
                        <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">
                                <span className="w-5 h-5 rounded-full bg-white text-gray-600 flex items-center justify-center text-[10px] font-bold border border-gray-200">
                                    {item.user.charAt(0)}
                                </span>
                                <span className="text-xs font-bold text-gray-600">{item.user}</span>
                             </div>
                             <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">{item.date}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <span className="text-xs font-medium text-gray-400">报销总金额</span>
                    <p className="text-3xl font-bold font-mono text-gray-900 tracking-tight">¥{item.amount}</p>
                </div>
                
                {item.missing && (
                    <div className="mt-5 bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-full shadow-sm text-rose-500 mt-0.5 border border-rose-100">
                            <AlertCircle size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-rose-700 mb-1">证据链缺失</p>
                            <p className="text-xs text-rose-600 leading-relaxed">
                                系统检测到缺少 <span className="font-bold underline cursor-pointer">{item.missing}</span>。请尽快补齐，否则可能无法入账或被驳回。
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Expenses List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">费用明细</h4>
                    <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-100">2 笔</span>
                </div>
                <div className="p-2 space-y-1">
                    <div className="p-4 flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                                <Activity size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">交通费</p>
                                <p className="text-xs text-gray-400 mt-0.5">滴滴出行 x 4</p>
                            </div>
                        </div>
                        <span className="text-sm font-mono font-bold text-gray-900">¥128.00</span>
                    </div>
                    <div className="p-4 flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 group-hover:scale-110 transition-transform">
                                <Building2 size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">住宿费</p>
                                <p className="text-xs text-gray-400 mt-0.5">全季酒店 x 2晚</p>
                            </div>
                        </div>
                        <span className="text-sm font-mono font-bold text-gray-900">¥890.00</span>
                    </div>
                </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Paperclip size={14} /> 附件证据
                </h4>
                <div className="space-y-3">
                    <AttachmentThumb type="pdf" name="滴滴出行行程单.pdf" size="1.2MB" />
                    <AttachmentThumb type="img" name="全季酒店发票.jpg" size="2.4MB" />
                    <AttachmentThumb type="img" name="支付记录截图.png" size="0.8MB" />
                </div>
            </div>
        </DetailLayout>
    );
}

// --- 5. Tax Detail ---

export const TaxDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    return (
        <DetailLayout 
            title="税款详情" 
            onBack={onBack}
            actions={item.status === '申报中' ? (
                <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all text-sm">
                    确认申报并扣款
                </button>
            ) : undefined}
        >
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 shadow-xl shadow-indigo-200 text-white relative overflow-hidden">
                 <div className="absolute right-0 top-0 p-8 opacity-10 transform rotate-12">
                     <Building2 size={120} />
                 </div>
                 <div className="relative z-10">
                     <p className="text-xs font-bold text-indigo-200 mb-2 uppercase tracking-wider">本期应缴总额</p>
                     <h3 className="text-4xl font-bold font-mono tracking-tight mb-6">¥{item.amount}</h3>
                     <div className="flex items-center gap-3">
                         <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/10 backdrop-blur-md">
                             {item.type}
                         </span>
                         <span className="text-xs text-indigo-100 font-medium opacity-80">所属期: 2023-11</span>
                     </div>
                 </div>
            </div>

            {/* Tax Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-6 py-2">
                <DetailRow label="增值税 (小规模)" value="¥12,000.00" isMono isBold />
                <DetailRow label="城市维护建设税 (7%)" value="¥840.00" isMono />
                <DetailRow label="教育费附加 (3%)" value="¥360.00" isMono />
                <div className="py-4 mt-2 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">合计</span>
                    <span className="text-lg font-bold font-mono text-gray-900">¥13,200.00</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                 <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">申报进度</h4>
                 <div className="space-y-8 pl-2 border-l-2 border-gray-100 ml-2">
                     <div className="relative">
                         <div className="absolute -left-[13px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm"></div>
                         <p className="text-sm font-bold text-gray-900">生成申报表</p>
                         <p className="text-xs text-gray-400 mt-1 font-medium">12-10 09:00 · 系统自动</p>
                     </div>
                     <div className="relative">
                         <div className={`absolute -left-[13px] top-0 w-3 h-3 rounded-full ring-4 ring-white shadow-sm ${item.status === '已缴款' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                         <p className="text-sm font-bold text-gray-900">{item.status === '已缴款' ? '扣款成功' : '等待确认'}</p>
                         <p className="text-xs text-gray-400 mt-1 font-medium">{item.status === '已缴款' ? '12-10 14:00' : '待处理'}</p>
                     </div>
                 </div>
            </div>
        </DetailLayout>
    );
}

// --- 6. Report Detail (File Preview) ---

export const ReportDetail = ({ item, onBack }: { item: any, onBack: () => void }) => {
    return (
        <DetailLayout 
            title={item.name}
            tag={{ label: item.type, color: 'text-gray-600', bg: 'bg-gray-100' }}
            onBack={onBack}
            actions={
                <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 transition-all text-sm">
                    <Download size={18} /> 下载文件
                </button>
            }
        >
            <div className="flex-1 flex flex-col items-center justify-center py-8">
                 <div className="w-64 aspect-[3/4] bg-white shadow-2xl border border-gray-200 rounded-lg flex flex-col items-center justify-center mb-8 relative overflow-hidden group transition-transform hover:scale-105 duration-500">
                     {/* Paper Texture */}
                     <div className="absolute inset-0 bg-[#FAFAFA] opacity-50"></div>
                     <ScanLine size={64} className="text-gray-200 relative z-10" strokeWidth={1} />
                     <p className="text-xs text-gray-300 mt-4 font-bold relative z-10 tracking-[0.2em]">PREVIEW</p>
                     
                     {/* Skeleton Lines */}
                     <div className="absolute top-12 left-8 right-8 h-3 bg-gray-100 rounded-sm"></div>
                     <div className="absolute top-24 left-8 right-8 space-y-3">
                         <div className="h-1.5 bg-gray-100 rounded-full w-full"></div>
                         <div className="h-1.5 bg-gray-100 rounded-full w-3/4"></div>
                         <div className="h-1.5 bg-gray-100 rounded-full w-5/6"></div>
                         <div className="h-1.5 bg-gray-100 rounded-full w-full"></div>
                         <div className="h-1.5 bg-gray-100 rounded-full w-2/3"></div>
                     </div>
                 </div>
                 
                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full overflow-hidden px-6 py-2">
                     <DetailRow label="文件大小" value={item.size} isMono isBold />
                     <DetailRow label="上传时间" value={item.date} isMono />
                     <DetailRow label="生成方式" value="系统自动生成" />
                 </div>
            </div>
        </DetailLayout>
    );
}

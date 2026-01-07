import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Search, 
  Filter, 
  CheckSquare, 
  Lock, 
  MessageSquare, 
  Paperclip, 
  ChevronRight, 
  Link as LinkIcon, 
  FileText, 
  Activity, 
  Receipt, 
  FileImage, 
  Wallet, 
  FileType, 
  HelpCircle, 
  Send, 
  X, 
  ScrollText, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Download,
  ArrowRightLeft,
  Printer,
  Share2,
  FileCheck,
  Eye,
  Building2,
  Maximize2
} from 'lucide-react';

// --- Types & Realistic Mock Data ---

interface VoucherEntry {
    code: string; // Accounting Subject Code (e.g. 6602)
    subject: string;
    direction: 'debit' | 'credit';
    amount: string;
}

interface Attachment {
    id: string;
    type: 'invoice' | 'flow' | 'receipt' | 'other';
    title: string;
    fileName: string;
    meta?: string; // Additional info like "Invoice No."
}

interface Voucher {
    id: string;
    code: string; // Voucher ID (e.g. 记-001)
    summary: string;
    amount: string;
    date: string;
    period: string;
    status: 'posted' | 'draft' | 'auditing'; // Posted = 已记账
    feedbackStatus: 'none' | 'pending' | 'resolved';
    related: string;
    creator: string;
    entries: VoucherEntry[];
    attachments: Attachment[]; // New array for multiple attachments
}

const MOCK_VOUCHERS: Voucher[] = [
    { 
        id: 'v1', 
        code: '记-001', 
        summary: '支付12月办公室租金', 
        amount: '45,000.00', 
        date: '2023-12-01', 
        period: '2023-12',
        status: 'posted',
        feedbackStatus: 'none', 
        related: '上海物业管理有限公司',
        creator: '系统自动生成',
        entries: [
            { code: '6602.01', subject: '管理费用_租赁费', direction: 'debit', amount: '42,857.14' },
            { code: '2221.01.01', subject: '应交税费_应交增值税(进项税额)', direction: 'debit', amount: '2,142.86' },
            { code: '1002.01', subject: '银行存款_招商银行', direction: 'credit', amount: '45,000.00' }
        ],
        attachments: [
            { id: 'a1', type: 'flow', title: '银行电子回单', fileName: '20231201_招商银行_回单.pdf', meta: '流水号: 202312010001' },
            { id: 'a2', type: 'invoice', title: '增值税专用发票', fileName: '租赁费发票.pdf', meta: '发票号: 83729102' },
            { id: 'a3', type: 'other', title: '租赁合同附件', fileName: '2023租赁合同补充协议.pdf', meta: '合同编号: ZL-2023-001' }
        ]
    },
    { 
        id: 'v2', 
        code: '记-002', 
        summary: '确认技术服务收入', 
        amount: '120,000.00', 
        date: '2023-12-12', 
        period: '2023-12',
        status: 'posted',
        feedbackStatus: 'resolved', 
        related: '上海某某科技',
        creator: '系统自动生成',
        entries: [
            { code: '1122.01', subject: '应收账款_上海某某科技', direction: 'debit', amount: '120,000.00' },
            { code: '6001.01', subject: '主营业务收入_技术服务', direction: 'credit', amount: '113,207.55' },
            { code: '2221.01.05', subject: '应交税费_应交增值税(销项税额)', direction: 'credit', amount: '6,792.45' }
        ],
        attachments: [
            { id: 'a4', type: 'invoice', title: '全面数字化的电子发票', fileName: '数电票_031002300111.pdf', meta: '号码: 031002300111' }
        ]
    },
    { 
        id: 'v3', 
        code: '记-003', 
        summary: '李娜北京差旅报销', 
        amount: '3,240.00', 
        date: '2023-12-15', 
        period: '2023-12',
        status: 'auditing',
        feedbackStatus: 'pending', 
        related: '李娜',
        creator: '会计-王芳',
        entries: [
            { code: '6602.03', subject: '管理费用_差旅费', direction: 'debit', amount: '3,240.00' },
            { code: '2241.01', subject: '其他应付款_李娜', direction: 'credit', amount: '3,240.00' }
        ],
        attachments: [
            { id: 'a5', type: 'receipt', title: '差旅费报销单', fileName: '报销单_李娜_202312.pdf', meta: '单号: BX-2023-12-05' },
            { id: 'a6', type: 'invoice', title: '机票行程单', fileName: '行程单_北京往返.pdf', meta: '票号: 781-2312312' },
            { id: 'a7', type: 'invoice', title: '住宿费发票', fileName: '全季酒店发票.pdf', meta: '发票号: 12388122' },
            { id: 'a8', type: 'flow', title: '打车费电子票据', fileName: '滴滴出行行程单.pdf', meta: '共 4 张' },
            { id: 'a9', type: 'other', title: '出差审批单', fileName: 'OA_审批_出差申请.pdf', meta: '审批编号: OA-2023-999' }
        ]
    },
    { 
        id: 'v4', 
        code: '记-004', 
        summary: '餐费报销 (无票)', 
        amount: '580.00', 
        date: '2023-12-20', 
        period: '2023-12',
        status: 'posted',
        feedbackStatus: 'none', 
        related: '张伟',
        creator: '会计-王芳',
        entries: [
            { code: '6601.04', subject: '销售费用_业务招待费', direction: 'debit', amount: '580.00' },
            { code: '1001', subject: '库存现金', direction: 'credit', amount: '580.00' }
        ],
        attachments: [
             { id: 'a10', type: 'receipt', title: '费用报销单', fileName: '报销单_张伟.pdf', meta: '单号: BX-2023-12-08' },
             { id: 'a11', type: 'other', title: '无票说明', fileName: '情况说明书.jpg', meta: '签批人: 总经理' }
        ]
    },
    { 
        id: 'v5', 
        code: '记-005', 
        summary: '计提本月折旧', 
        amount: '2,400.00', 
        date: '2023-12-31', 
        period: '2023-12',
        status: 'posted',
        feedbackStatus: 'none', 
        related: '内部核算',
        creator: '系统自动生成',
        entries: [
            { code: '6602.09', subject: '管理费用_折旧费', direction: 'debit', amount: '2,400.00' },
            { code: '1602', subject: '累计折旧', direction: 'credit', amount: '2,400.00' }
        ],
        attachments: [
             { id: 'a12', type: 'other', title: '折旧计算表', fileName: '固定资产折旧表_202312.xlsx', meta: '资产总数: 15' }
        ]
    },
];

// Explicit Status Definition
type ClosingStatus = 'ACCOUNTING' | 'REVIEW' | 'TAX' | 'ACCEPTANCE' | 'LOCKED';

const CLOSING_STEPS: { id: ClosingStatus; label: string }[] = [
    { id: 'ACCOUNTING', label: '智能做账' },
    { id: 'REVIEW', label: '人工复核' },
    { id: 'TAX', label: '纳税申报' },
    { id: 'ACCEPTANCE', label: '月结验收' },
    { id: 'LOCKED', label: '归档锁定' }
];

// --- Level 5: Original Document Preview (File Viewer) ---

const FilePreviewView = ({ attachment, onBack }: { attachment: Attachment, onBack: () => void }) => {
    return (
        <div className="fixed inset-0 z-[70] bg-black flex flex-col animate-fade-in">
            {/* Toolbar */}
            <div className="flex justify-between items-center px-4 py-4 bg-black/50 backdrop-blur-sm absolute top-0 w-full z-10">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <X size={20} />
                </button>
                <span className="text-white text-sm font-bold truncate max-w-[200px]">{attachment.fileName}</span>
                <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Download size={20} />
                </button>
            </div>

            {/* Content Placeholder */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-sm aspect-[3/4] rounded-sm shadow-2xl flex flex-col items-center justify-center relative">
                    {/* Mock Document Look */}
                    <div className="absolute inset-0 border-[16px] border-white bg-gray-50 flex items-center justify-center overflow-hidden">
                        <div className="text-center opacity-20 transform -rotate-45">
                            <p className="text-4xl font-bold uppercase tracking-widest text-gray-900">Original</p>
                            <p className="text-xl font-bold uppercase tracking-widest text-gray-900 mt-2">Document</p>
                        </div>
                        <FileText size={64} className="text-gray-300 absolute" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Level 4: Source Detail View (System Structured Data) ---

const SourceDetailView = ({ attachment, voucher, onBack, onViewOriginal }: { attachment: Attachment, voucher: Voucher, onBack: () => void, onViewOriginal: () => void }) => {
    // Mocking structured data based on type
    const isInvoice = attachment.type === 'invoice';
    const isFlow = attachment.type === 'flow';

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#F3F4F6] max-w-md mx-auto w-full h-full animate-slide-in-right">
             {/* Header */}
             <div className="bg-white px-4 pt-10 pb-3 border-b border-gray-200 flex items-center gap-3 sticky top-0 z-20">
                <button onClick={onBack} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-sm font-bold text-gray-900">{attachment.title}详情</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* 1. Original File Thumbnail (Entry to Level 5) */}
                <div 
                    onClick={onViewOriginal}
                    className="bg-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                    <div className="relative z-10 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                                 <FileImage size={20} className="text-white"/>
                             </div>
                             <div>
                                 <p className="text-xs text-gray-300 font-medium">原始单据影像</p>
                                 <p className="text-sm font-bold text-white mt-0.5">{attachment.fileName}</p>
                             </div>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                             <Maximize2 size={16} />
                         </div>
                    </div>
                </div>

                {/* 2. Structured Data Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2">
                            <Activity size={14} className="text-blue-600"/> 系统结构化数据
                        </h3>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">已验真</span>
                    </div>
                    
                    <div className="p-4 space-y-4">
                        {/* Dynamic Fields based on Type */}
                        {isInvoice ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-1">发票代码</p>
                                        <p className="text-xs font-medium text-gray-900 font-mono">031002300111</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-1">发票号码</p>
                                        <p className="text-xs font-medium text-gray-900 font-mono">12839922</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">开票日期</p>
                                    <p className="text-xs font-medium text-gray-900 font-mono">{voucher.date}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                        <p className="text-[10px] font-bold text-gray-500">购买方</p>
                                    </div>
                                    <p className="text-xs font-bold text-gray-900 pl-3.5">上海千机网络科技有限公司</p>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                        <p className="text-[10px] font-bold text-gray-500">销售方</p>
                                    </div>
                                    <p className="text-xs font-bold text-gray-900 pl-3.5">{voucher.related}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-400">税额: ¥{(parseFloat(voucher.amount.replace(/,/g, '')) * 0.06).toFixed(2)}</p>
                                        <p className="text-[10px] text-gray-400">不含税: ¥{(parseFloat(voucher.amount.replace(/,/g, '')) * 0.94).toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 mb-0.5">价税合计</p>
                                        <p className="text-xl font-bold font-mono text-gray-900">¥{voucher.amount}</p>
                                    </div>
                                </div>
                            </>
                        ) : isFlow ? (
                            <>
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">交易流水号</p>
                                    <p className="text-xs font-medium text-gray-900 font-mono">2023120199928371</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-1">付款人户名</p>
                                        <p className="text-xs font-medium text-gray-900">上海千机网络科技...</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-1">收款人户名</p>
                                        <p className="text-xs font-medium text-gray-900">{voucher.related}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">摘要</p>
                                    <p className="text-xs font-medium text-gray-900">{voucher.summary}</p>
                                </div>
                                <div className="text-right pt-2 border-t border-gray-100">
                                    <p className="text-[10px] text-gray-400 mb-0.5">交易金额</p>
                                    <p className="text-xl font-bold font-mono text-gray-900">¥{voucher.amount}</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <FileText size={32} className="text-gray-300 mx-auto mb-2"/>
                                <p className="text-xs text-gray-400">该类型单据暂无结构化字段展示</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Level 3: Voucher Detail View (Professional) ---

const VoucherDetailView = ({ voucher, onBack }: { voucher: Voucher, onBack: () => void }) => {
    // Navigation States
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Render Sub-Views
    if (showPreview && selectedAttachment) {
        return <FilePreviewView attachment={selectedAttachment} onBack={() => setShowPreview(false)} />;
    }

    if (selectedAttachment) {
        return (
            <SourceDetailView 
                attachment={selectedAttachment} 
                voucher={voucher}
                onBack={() => setSelectedAttachment(null)}
                onViewOriginal={() => setShowPreview(true)}
            />
        );
    }

    const isPosted = voucher.status === 'posted';

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#F3F4F6] max-w-md mx-auto w-full h-full border-x border-gray-200 overflow-hidden">
            {/* 1. Top Navigation */}
            <div className="bg-white px-4 pt-10 pb-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            {voucher.code}
                            {isPosted ? (
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100 font-medium">已记账</span>
                            ) : (
                                <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100 font-medium">审核中</span>
                            )}
                        </h2>
                    </div>
                </div>
                <div className="flex gap-2 text-gray-500">
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Share2 size={18} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Printer size={18} /></button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
                
                {/* 2. Voucher Card (The "Ticket") */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative overflow-hidden">
                    {/* Top Stripe */}
                    <div className="h-1.5 bg-indigo-600 w-full"></div>
                    
                    <div className="p-5">
                        {/* Header Info */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs text-gray-400 font-medium">凭证摘要</p>
                                <h3 className="text-lg font-bold text-gray-900 mt-1 leading-snug">{voucher.summary}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">{voucher.period}</span>
                                    <span>{voucher.date}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-medium">总金额</p>
                                <p className="text-2xl font-bold font-mono text-gray-900 mt-0.5 tracking-tight">¥{voucher.amount}</p>
                            </div>
                        </div>

                        {/* Dashed Separator */}
                        <div className="relative flex items-center justify-center my-6">
                            <div className="absolute left-0 right-0 border-t border-dashed border-gray-200"></div>
                            <div className="absolute -left-6 w-3 h-6 bg-[#F3F4F6] rounded-r-full"></div>
                            <div className="absolute -right-6 w-3 h-6 bg-[#F3F4F6] rounded-l-full"></div>
                        </div>

                        {/* Accounting Entries (Ledger Style) */}
                        <div>
                             <div className="flex justify-between items-center mb-3">
                                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">会计分录</h4>
                             </div>
                             <div className="bg-gray-50 rounded-lg border border-gray-200 text-xs overflow-hidden">
                                 {/* Table Header */}
                                 <div className="flex bg-gray-100/50 border-b border-gray-200 py-2 px-3 text-gray-400 font-medium">
                                     <div className="flex-1">科目 (Subject)</div>
                                     <div className="w-20 text-right">借 (Dr)</div>
                                     <div className="w-20 text-right">贷 (Cr)</div>
                                 </div>
                                 
                                 {/* Table Rows */}
                                 {voucher.entries.map((entry, idx) => (
                                     <div key={idx} className="flex border-b border-gray-100 last:border-0 py-3 px-3">
                                         <div className="flex-1 pr-2">
                                             <div className="font-bold text-gray-800 break-all">{entry.subject}</div>
                                             <div className="font-mono text-[10px] text-gray-400 mt-0.5">{entry.code}</div>
                                         </div>
                                         <div className="w-20 text-right font-mono text-gray-900">
                                             {entry.direction === 'debit' ? entry.amount : ''}
                                         </div>
                                         <div className="w-20 text-right font-mono text-gray-900">
                                             {entry.direction === 'credit' ? entry.amount : ''}
                                         </div>
                                     </div>
                                 ))}
                                 
                                 {/* Table Footer (Total) */}
                                 <div className="flex bg-indigo-50/30 border-t border-gray-200 py-2 px-3 font-bold text-gray-900">
                                     <div className="flex-1 text-gray-500">合计</div>
                                     <div className="w-20 text-right font-mono">{voucher.amount}</div>
                                     <div className="w-20 text-right font-mono">{voucher.amount}</div>
                                 </div>
                             </div>
                        </div>

                        {/* Creator Info */}
                        <div className="mt-5 flex items-center justify-between text-[10px] text-gray-400">
                            <span>制单: {voucher.creator}</span>
                            <span>关联方: {voucher.related}</span>
                        </div>
                    </div>
                </div>

                {/* 3. Source Attachments List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <LinkIcon size={14} className="text-blue-600"/> 原始单据
                        </h4>
                        <span className="text-[10px] text-gray-400">{voucher.attachments.length} 个附件</span>
                    </div>

                    <div className="space-y-3">
                        {voucher.attachments.map((att, idx) => {
                            // Icon mapping
                            let Icon = FileText;
                            let color = 'text-gray-500';
                            let bg = 'bg-gray-50';
                            
                            if (att.type === 'invoice') { Icon = Receipt; color = 'text-orange-500'; bg = 'bg-orange-50'; }
                            else if (att.type === 'flow') { Icon = Activity; color = 'text-blue-500'; bg = 'bg-blue-50'; }
                            else if (att.type === 'receipt') { Icon = Wallet; color = 'text-emerald-500'; bg = 'bg-emerald-50'; }

                            return (
                                <div 
                                    key={att.id} 
                                    onClick={() => setSelectedAttachment(att)}
                                    className="bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-start gap-3 active:bg-gray-100 active:scale-[0.99] transition-all cursor-pointer group"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-black/5 shadow-sm group-hover:bg-white transition-colors ${bg} ${color}`}>
                                        <Icon size={20} />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                         <div className="flex items-center justify-between">
                                             <h5 className="text-sm font-bold text-gray-900 truncate">{att.title}</h5>
                                             <ChevronRight size={14} className="text-gray-300"/>
                                         </div>
                                         <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{att.fileName}</p>
                                         {att.meta && (
                                             <span className="text-[10px] text-gray-400 mt-1 block font-mono">{att.meta}</span>
                                         )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="h-6"></div>
            </div>
        </div>
    );
}

// --- Level 3: Acceptance View (Polished) ---

const AcceptanceView = ({ onBack, onConfirm }: { onBack: () => void, onConfirm: () => void }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const items = [
        { id: 'i1', icon: FileCheck, color: 'text-emerald-500', title: '交付物齐套性确认', desc: '本月共产生凭证 142 张，附件 305 份。纳税申报表已上传。' },
        { id: 'i2', icon: ArrowRightLeft, color: 'text-emerald-500', title: '资金调节表平衡', desc: '银行日记账余额与网银对账单余额一致，无未达账项。' },
        { id: 'i3', icon: AlertCircle, color: 'text-orange-500', title: '挂起事项确认', desc: '当前有 1 笔大额报销缺发票（李娜），已确认挂起至下月处理。', theme: 'orange' }
    ];

    const toggleItem = (id: string) => {
        setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
    };

    const isAllChecked = items.every(i => checkedItems[i.id]);

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white max-w-md mx-auto w-full h-full border-x border-gray-200 overflow-hidden animate-fade-in-up">
             {/* Header */}
             <div className="px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 -ml-1 hover:bg-gray-50 rounded-full text-gray-500 transition-colors"><X size={24} /></button>
                    <h2 className="text-lg font-bold text-gray-900">月结验收</h2>
                </div>
                <div className="text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                    2023-12
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                 {/* Visual Hero */}
                 <div className="mb-10 text-center">
                     <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-indigo-100">
                         <ScrollText size={32} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">财务关账确认</h3>
                     <p className="text-sm text-gray-500 leading-relaxed px-4">
                        请总经理确认以下关键交付事项。<br/>验收后数据将锁定为 <span className="font-mono text-gray-900 font-bold">V1.0</span> 版本并归档。
                     </p>
                 </div>

                 {/* Checklist */}
                 <div className="space-y-4 mb-8">
                     {items.map(item => {
                         const isChecked = checkedItems[item.id];
                         return (
                            <div 
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-4 rounded-2xl flex gap-4 border-2 transition-all cursor-pointer select-none relative overflow-hidden group ${
                                    isChecked 
                                    ? 'bg-blue-50/30 border-blue-500 shadow-sm' 
                                    : item.theme === 'orange' ? 'bg-white border-orange-100 hover:border-orange-200' : 'bg-white border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                {/* Checkbox Circle */}
                                <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    isChecked 
                                    ? 'bg-blue-500 border-blue-500' 
                                    : 'bg-white border-gray-200 group-hover:border-gray-300'
                                }`}>
                                    {isChecked && <CheckCircle2 size={14} className="text-white" />}
                                </div>

                                <div>
                                    <h4 className={`text-sm font-bold mb-1 ${item.theme === 'orange' ? 'text-orange-900' : 'text-gray-900'}`}>{item.title}</h4>
                                    <p className={`text-xs leading-relaxed ${item.theme === 'orange' ? 'text-orange-700/70' : 'text-gray-400'}`}>{item.desc}</p>
                                </div>
                            </div>
                         );
                     })}
                 </div>

                 {/* Security Note */}
                 <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                     <Lock size={16} className="text-gray-400 shrink-0 mt-0.5" />
                     <div className="text-xs text-gray-500 leading-relaxed">
                        <span className="font-bold text-gray-700 block mb-1">数据不可篡改</span>
                        一旦确认验收，所有凭证、报表将被加盖电子时间戳。如需调整，必须由代理会计发起“反结账”申请。
                     </div>
                 </div>
            </div>

            {/* Sticky Bottom Action */}
            <div className="p-4 border-t border-gray-100 bg-white pb-8">
                <button 
                    onClick={isAllChecked ? onConfirm : undefined} 
                    className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
                        isAllChecked 
                        ? 'bg-indigo-600 text-white shadow-indigo-200 active:scale-[0.98] hover:bg-indigo-700' 
                        : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
                    }`}
                >
                    <CheckSquare size={18} /> {isAllChecked ? '确认验收并锁版' : `请确认 (${Object.values(checkedItems).filter(Boolean).length}/${items.length})`}
                </button>
            </div>
        </div>
    )
}

// --- Level 2: Voucher List Manager ---

const VoucherManager = () => {
    const [viewMode, setViewMode] = useState<'list' | 'detail' | 'acceptance'>('list');
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [activeMonth, setActiveMonth] = useState('2023-12');
    
    // Explicit Status State
    const [currentStatus, setCurrentStatus] = useState<ClosingStatus>('ACCEPTANCE'); // Default to 'ACCEPTANCE' for demo

    const handleVoucherClick = (v: Voucher) => {
        setSelectedVoucher(v);
        setViewMode('detail');
    };

    const handleAcceptance = () => {
        setCurrentStatus('LOCKED');
        setViewMode('list');
    };

    const currentStepIndex = CLOSING_STEPS.findIndex(s => s.id === currentStatus);

    return (
        <div className="h-full relative">
            {/* View Switching */}
            {viewMode === 'detail' && selectedVoucher && (
                <VoucherDetailView voucher={selectedVoucher} onBack={() => setViewMode('list')} />
            )}
            {viewMode === 'acceptance' && (
                <AcceptanceView onBack={() => setViewMode('list')} onConfirm={handleAcceptance} />
            )}

            {/* Main List View */}
            <div className={`space-y-6 ${viewMode !== 'list' ? 'hidden' : 'block'}`}>
                
                {/* 1. Status Dashboard */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <Calendar size={14} className="text-gray-500"/>
                            <span className="text-sm font-bold text-gray-900 font-mono">{activeMonth}</span>
                            <MoreHorizontal size={14} className="text-gray-300 ml-1"/>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                            currentStatus === 'LOCKED' 
                            ? 'bg-gray-100 text-gray-500 border-gray-200' 
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${currentStatus === 'LOCKED' ? 'bg-gray-400' : 'bg-blue-600 animate-pulse'}`}></div>
                            {CLOSING_STEPS[currentStepIndex].label}
                        </div>
                    </div>

                    {/* Explicit Horizontal Stepper */}
                    <div className="relative mb-6 px-1">
                        {/* Connecting Line Background */}
                        <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-gray-100 -z-10"></div>
                        {/* Active Progress Line */}
                        <div 
                            className="absolute top-2.5 left-0 h-0.5 bg-blue-500 -z-10 transition-all duration-700 ease-out" 
                            style={{width: `${(currentStepIndex / (CLOSING_STEPS.length - 1)) * 100}%`}}
                        ></div>

                        <div className="flex justify-between items-start">
                            {CLOSING_STEPS.map((step, idx) => {
                                const isCompleted = idx <= currentStepIndex;
                                const isCurrent = idx === currentStepIndex;
                                
                                return (
                                    <div key={idx} className="flex flex-col items-center group relative cursor-default">
                                        {/* Step Circle */}
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 z-10 ${
                                            isCompleted 
                                            ? 'bg-white border-blue-500 text-blue-500' 
                                            : 'bg-white border-gray-200 text-transparent'
                                        }`}>
                                            {isCompleted && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                        </div>
                                        
                                        {/* Step Label - Explicitly Always Visible */}
                                        <div className={`text-[9px] mt-2 font-medium text-center absolute top-full w-14 -left-1/2 translate-x-[9px] leading-tight transition-colors ${
                                            isCurrent ? 'text-blue-600 font-bold' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                                        }`}>
                                            {step.label}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Primary Action Button Area - Add margin to clear labels */}
                    <div className="mt-8 pt-4 border-t border-gray-50">
                        {currentStatus === 'ACCEPTANCE' ? (
                            <button 
                                onClick={() => setViewMode('acceptance')}
                                className="w-full bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                            >
                                <CheckSquare size={16} /> 开始验收锁版 (V1.0)
                            </button>
                        ) : currentStatus === 'LOCKED' ? (
                            <div className="w-full bg-gray-50 text-gray-400 text-xs font-bold py-3 rounded-xl border border-dashed border-gray-200 flex items-center justify-center gap-2">
                                <Lock size={14} /> 本月数据已归档 (V1.0)
                            </div>
                        ) : (
                            <div className="w-full bg-blue-50 text-blue-400 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-wait">
                                <Activity size={14} className="animate-spin" /> 数据处理中...
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Voucher List */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-900">凭证清单</h3>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-mono">{MOCK_VOUCHERS.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 shadow-sm"><Search size={14}/></button>
                            <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 shadow-sm"><Filter size={14}/></button>
                        </div>
                    </div>

                    <div className="space-y-3 pb-8">
                        {MOCK_VOUCHERS.map((voucher) => (
                            <div 
                                key={voucher.id} 
                                onClick={() => handleVoucherClick(voucher)}
                                className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-[0.99] active:bg-gray-50 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 group-hover:bg-white transition-colors">{voucher.code}</span>
                                        {voucher.feedbackStatus !== 'none' && (
                                            <span className={`text-[10px] flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold ${
                                                voucher.feedbackStatus === 'pending' 
                                                ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            }`}>
                                                <MessageSquare size={10} /> 
                                                {voucher.feedbackStatus === 'pending' ? '待回复' : '已回复'}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                                </div>
                                
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h3 className="text-sm font-bold text-gray-900 truncate">{voucher.summary}</h3>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Paperclip size={10} /> {voucher.attachments.length}
                                            </span>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1 truncate max-w-[120px]">
                                                <LinkIcon size={10} /> {voucher.related}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-base font-mono font-bold text-gray-900 shrink-0">¥{voucher.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherManager;
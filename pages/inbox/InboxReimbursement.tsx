
import React, { useState } from 'react';
import { 
    Check, X, FileText, Image as ImageIcon, User, Calendar, 
    MapPin, Coffee, Car, Plane, AlertCircle, ChevronRight, 
    Receipt, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';

// --- Mock Data ---

const MOCK_APPROVALS = [
    { 
        id: 'r1', 
        applicant: '张伟', 
        dept: '技术部', 
        avatar: 'ZW',
        type: '差旅费', 
        categoryIcon: Plane,
        amount: '3,240.00', 
        date: '2023-12-12', 
        desc: '12月北京技术峰会出差，含往返机票及3晚住宿。',
        attachments: [
            { type: 'pdf', name: '机票行程单.pdf', size: '240KB' },
            { type: 'img', name: '住宿发票.jpg', size: '1.2MB' },
            { type: 'img', name: '滴滴行程单.jpg', size: '800KB' }
        ],
        risk: null
    },
    { 
        id: 'r2', 
        applicant: '李娜', 
        dept: '市场部', 
        avatar: 'LN',
        type: '业务招待', 
        categoryIcon: Coffee,
        amount: '850.00', 
        date: '2023-12-14', 
        desc: '招待潜在客户（某某科技）CTO用餐。',
        attachments: [
            { type: 'img', name: '餐饮发票.jpg', size: '1.5MB' },
            { type: 'img', name: '支付截图.jpg', size: '500KB' }
        ],
        risk: '非工作日消费'
    }
];

// --- Components ---

const AttachmentItem: React.FC<{ file: any }> = ({ file }) => (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 active:bg-slate-100 transition-colors cursor-pointer group">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            file.type === 'pdf' ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-blue-50 border-blue-100 text-blue-500'
        }`}>
            {file.type === 'pdf' ? <FileText size={18} strokeWidth={2}/> : <ImageIcon size={18} strokeWidth={2}/>}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
            <p className="text-[10px] font-bold text-slate-400">{file.size}</p>
        </div>
    </div>
);

// --- Level 3: Detail View ---

const ApprovalDetail = ({ item, onBack }: { item: typeof MOCK_APPROVALS[0], onBack: () => void }) => {
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const handleApprove = () => {
        setStatus('approved');
        setTimeout(onBack, 1500);
    };

    if (status === 'approved') {
        return (
            <DetailLayout title="审批完成" onBack={onBack}>
                <div className="flex flex-col items-center justify-center h-[60vh] animate-scale-up">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-200/50">
                        <CheckCircle2 size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2">已同意报销</h2>
                    <p className="text-sm text-slate-400 font-medium">单据已流转至财务支付队列</p>
                </div>
            </DetailLayout>
        )
    }

    return (
        <DetailLayout 
            title="审批详情" 
            onBack={onBack} 
            tag={{ label: '待我审批', color: 'text-orange-600', bg: 'bg-orange-50' }}
            bgColor="bg-[#F8F9FB]"
        >
            <div className="space-y-6 pb-28">
                {/* Header Card (Redesigned & Compact) */}
                <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-[32px] p-7 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
                    {/* Watermark */}
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-emerald-900 pointer-events-none transform rotate-12">
                        <Receipt size={140} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white text-indigo-600 flex items-center justify-center text-lg font-black shadow-sm border border-indigo-50">
                                {item.avatar}
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 leading-tight">{item.applicant}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.dept}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                    <span className="text-[10px] font-black text-emerald-600">申请报销</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 pl-1 opacity-80">报销总额 (Total Amount)</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-black text-slate-900 mb-2">¥</span>
                                <span className="text-4xl font-black font-mono tracking-tighter text-slate-900">{item.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Warning */}
                {item.risk && (
                    <div className="bg-rose-50 border border-rose-100 rounded-[24px] p-4 flex gap-3 items-start animate-pulse">
                        <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" strokeWidth={2.5}/>
                        <div>
                            <h4 className="text-xs font-black text-rose-700">系统合规预警</h4>
                            <p className="text-[10px] font-bold text-rose-600/80 mt-0.5">{item.risk}，建议核实具体情况。</p>
                        </div>
                    </div>
                )}

                {/* Details */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileText size={12} /> 报销明细
                    </h4>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                                <item.categoryIcon size={20} strokeWidth={2}/>
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">{item.type}</p>
                                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{item.desc}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-50">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Receipt size={12} /> 附件证据 ({item.attachments.length})
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                            {item.attachments.map((file, idx) => (
                                <AttachmentItem key={idx} file={file} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50 pb-8 flex gap-3">
                <button className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <X size={18} strokeWidth={2.5} /> 驳回
                </button>
                <button 
                    onClick={handleApprove}
                    className="flex-[2] py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Check size={18} strokeWidth={3} /> 同意报销
                </button>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: List View ---

const InboxReimbursement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedItem, setSelectedItem] = useState<typeof MOCK_APPROVALS[0] | null>(null);

    if (selectedItem) return <ApprovalDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;

    return (
        <DetailLayout title="OA 流程审批" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-4 pb-20">
                <div className="flex items-center gap-2 ml-1 mb-2">
                    <div className="w-1 h-3.5 bg-orange-500 rounded-full"></div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">待我审批 ({MOCK_APPROVALS.length})</h3>
                </div>

                {MOCK_APPROVALS.map(item => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden hover:border-indigo-100"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-4">
                                {/* 20px Axis Alignment */}
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-sm shrink-0 border border-slate-200">
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black text-slate-900">{item.applicant}</h4>
                                        <span className="text-[10px] font-bold bg-slate-50 px-1.5 py-0.5 rounded text-slate-500 border border-slate-100">{item.type}</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-400 mt-1 line-clamp-1">{item.desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-base font-black font-mono text-emerald-600 tracking-tight">¥{item.amount}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                            <div className="flex items-center gap-2">
                                {item.risk ? (
                                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-lg flex items-center gap-1 border border-rose-100 animate-pulse">
                                        <AlertCircle size={10} /> {item.risk}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black text-slate-400 flex items-center gap-1">
                                        <ShieldCheck size={10} /> 机器审核通过
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 group-hover:underline">
                                去审批 <ChevronRight size={12} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="p-6 text-center opacity-40">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End of List</p>
                </div>
            </div>
        </DetailLayout>
    );
};

export default InboxReimbursement;

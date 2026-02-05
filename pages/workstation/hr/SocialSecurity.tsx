
import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, UserPlus, UserMinus, FileText, Download, Umbrella } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Data ---

const MOCK_SOCIAL_DATA = {
    total: '98,500.00',
    companyPart: '68,500.00', 
    personalPart: '30,000.00',
    month: '2023-12',
    changes: { add: 3, remove: 1 },
    records: [
        { id: 1, name: '王强', type: '新增', base: '12,000', company: '3,800', personal: '1,200', date: '12-05' },
        { id: 2, name: '张三', type: '新增', base: '15,000', company: '4,750', personal: '1,500', date: '12-05' },
        { id: 3, name: '李四', type: '新增', base: '10,000', company: '3,100', personal: '1,000', date: '12-05' },
        { id: 4, name: '赵六', type: '减少', base: '18,000', company: '5,700', personal: '1,800', date: '12-02' },
    ]
};

const MOCK_DOCS = [
    { id: 'd1', title: '11月社保缴纳回单', size: '1.2MB', date: '2023-12-10' },
    { id: 'd2', title: '11月公积金汇缴书', size: '0.8MB', date: '2023-12-10' }
];

// --- Level 3 Details ---

const SocialDocDetail = ({ doc, onBack }: { doc: any, onBack: () => void }) => {
    return (
        <DetailLayout title={doc.title} onBack={onBack} tag={{ label: 'PDF', color: 'text-slate-500', bg: 'bg-slate-100' }}>
             <div className="flex-1 flex flex-col items-center justify-center py-8">
                 <div className="w-48 aspect-[3/4] bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl flex flex-col items-center justify-center mb-8 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50"></div>
                     <FileText size={48} className="text-slate-300 relative z-10" strokeWidth={1.5} />
                     <p className="text-xs font-black text-slate-300 mt-3 relative z-10 tracking-widest">PREVIEW</p>
                 </div>
                 
                 <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 w-full overflow-hidden px-6 py-2 mb-6">
                     <div className="flex justify-between py-4 border-b border-slate-50">
                        <span className="text-xs font-bold text-slate-400">文件大小</span>
                        <span className="text-sm font-black font-mono text-slate-900">{doc.size}</span>
                     </div>
                     <div className="flex justify-between py-4">
                        <span className="text-xs font-bold text-slate-400">生成时间</span>
                        <span className="text-sm font-black font-mono text-slate-900">{doc.date}</span>
                     </div>
                 </div>

                 <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Download size={18} strokeWidth={2.5} /> 下载文件
                 </button>
            </div>
        </DetailLayout>
    )
};

const SocialChangeDetail = ({ onBack }: { onBack: () => void }) => {
    return (
        <DetailLayout
            title="本月社保变动明细"
            onBack={onBack}
            bgColor="bg-[#F8F9FB]"
        >
            <div className="flex gap-4 mb-4">
                 <div className="flex-1 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                         <UserPlus size={22} strokeWidth={2} />
                     </div>
                     <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">本月新增</p>
                         <p className="text-xl font-black text-slate-900">{MOCK_SOCIAL_DATA.changes.add} 人</p>
                     </div>
                 </div>
                 <div className="flex-1 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                         <UserMinus size={22} strokeWidth={2} />
                     </div>
                     <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">本月减少</p>
                         <p className="text-xl font-black text-slate-900">{MOCK_SOCIAL_DATA.changes.remove} 人</p>
                     </div>
                 </div>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">变动人员清单</h4>
                </div>
                <div>
                    {MOCK_SOCIAL_DATA.records.map((item) => (
                        <div key={item.id} className="p-5 border-b border-slate-50 last:border-0">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-slate-900">{item.name}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black ${
                                        item.type === '新增' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                                    }`}>{item.type}</span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-slate-400">申报日: {item.date}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <span className="font-mono">基数: {item.base}</span>
                                <span className="font-mono">公司: ¥{item.company}</span>
                                <span className="font-mono">个人: ¥{item.personal}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Dashboard ---

const SocialSecurity: React.FC = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    if (showDetail) return <SocialChangeDetail onBack={() => setShowDetail(false)} />;
    if (selectedDoc) return <SocialDocDetail doc={selectedDoc} onBack={() => setSelectedDoc(null)} />;

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Main Card - Airy Gradient */}
            <div className="bg-gradient-to-br from-white via-white to-indigo-50/60 rounded-[32px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">12月缴纳总额 (预计)</p>
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100/50">
                            <Umbrella size={16} strokeWidth={2.5}/>
                        </div>
                    </div>
                    
                    <h2 className="text-4xl font-black font-mono tracking-tighter mb-8 text-slate-900">¥{MOCK_SOCIAL_DATA.total}</h2>
                    
                    <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-5">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">公司承担</p>
                            <p className="text-base font-black font-mono text-indigo-600">¥{MOCK_SOCIAL_DATA.companyPart}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">个人承担</p>
                            <p className="text-base font-black font-mono text-slate-900">¥{MOCK_SOCIAL_DATA.personalPart}</p>
                        </div>
                    </div>
                 </div>
                 {/* Watermark */}
                 <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-indigo-900 pointer-events-none transform -rotate-12">
                     <Umbrella size={160} />
                 </div>
            </div>

            {/* Changes Trigger */}
            <div 
                onClick={() => setShowDetail(true)}
                className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all group hover:border-indigo-100"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                        <ArrowUpRight size={22} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900">本月增减员变动</h4>
                        <p className="text-[11px] font-bold text-slate-400 mt-1">
                            新增 <span className="text-blue-600">{MOCK_SOCIAL_DATA.changes.add}</span> 人，
                            减少 <span className="text-slate-600">{MOCK_SOCIAL_DATA.changes.remove}</span> 人
                        </p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </div>

            {/* Docs List */}
            <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 px-1">缴纳回单</h3>
                <div className="space-y-4">
                    {MOCK_DOCS.map(doc => (
                        <div 
                            key={doc.id} 
                            onClick={() => setSelectedDoc(doc)}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all group hover:border-indigo-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
                                    <FileText size={22} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 line-clamp-1">{doc.title}</h4>
                                    <p className="text-[11px] font-bold text-slate-400 mt-1">{doc.date} · {doc.size}</p>
                                </div>
                            </div>
                            <Download size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialSecurity;

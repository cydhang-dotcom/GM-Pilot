import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, UserPlus, UserMinus, FileText } from 'lucide-react';
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

// --- Level 3: Change Details ---

const SocialChangeDetail = ({ onBack }: { onBack: () => void }) => {
    return (
        <DetailLayout
            title="本月社保变动明细"
            onBack={onBack}
            bgColor="bg-gray-50"
        >
            <div className="flex gap-3 mb-4">
                 <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                         <UserPlus size={20} />
                     </div>
                     <div>
                         <p className="text-xs text-gray-400">本月新增</p>
                         <p className="text-lg font-bold text-gray-900">{MOCK_SOCIAL_DATA.changes.add} 人</p>
                     </div>
                 </div>
                 <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                         <UserMinus size={20} />
                     </div>
                     <div>
                         <p className="text-xs text-gray-400">本月减少</p>
                         <p className="text-lg font-bold text-gray-900">{MOCK_SOCIAL_DATA.changes.remove} 人</p>
                     </div>
                 </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                    <h4 className="text-xs font-bold text-gray-700">变动人员清单</h4>
                </div>
                <div>
                    {MOCK_SOCIAL_DATA.records.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-50 last:border-0">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900">{item.name}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                        item.type === '新增' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                                    }`}>{item.type}</span>
                                </div>
                                <span className="text-xs font-mono text-gray-400">申报日: {item.date}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
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

    if (showDetail) return <SocialChangeDetail onBack={() => setShowDetail(false)} />;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Main Card */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                 <div className="relative z-10">
                    <p className="text-xs text-indigo-100 mb-1">12月缴纳总额 (预计)</p>
                    <h2 className="text-4xl font-bold font-mono tracking-tight mb-6">¥{MOCK_SOCIAL_DATA.total}</h2>
                    <div className="grid grid-cols-2 gap-4 border-t border-indigo-500/30 pt-4">
                        <div>
                            <p className="text-[10px] text-indigo-200 mb-0.5">公司承担</p>
                            <p className="text-sm font-bold font-mono">¥{MOCK_SOCIAL_DATA.companyPart}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-indigo-200 mb-0.5">个人承担</p>
                            <p className="text-sm font-bold font-mono">¥{MOCK_SOCIAL_DATA.personalPart}</p>
                        </div>
                    </div>
                 </div>
                 {/* Decorative */}
                 <div className="absolute -right-4 top-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-50"></div>
                 <div className="absolute -left-4 bottom-4 w-32 h-32 bg-indigo-400 rounded-full blur-2xl opacity-20"></div>
            </div>

            {/* Changes Trigger */}
            <div 
                onClick={() => setShowDetail(true)}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <ArrowUpRight size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">本月人员变动</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            新增 <span className="text-blue-600 font-bold">{MOCK_SOCIAL_DATA.changes.add}</span> 人，
                            减少 <span className="text-gray-600 font-bold">{MOCK_SOCIAL_DATA.changes.remove}</span> 人
                        </p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <ChevronRight size={18} className="text-gray-400" />
                </div>
            </div>

            {/* Documents */}
            <div>
                 <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">缴纳凭证</h3>
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                     {[
                         { title: '11月社保缴纳回单', size: '1.2MB' },
                         { title: '11月公积金汇缴书', size: '0.8MB' }
                     ].map((doc, idx) => (
                         <div key={idx} className="p-4 border-b border-gray-50 last:border-0 flex items-center justify-between active:bg-gray-50 transition-colors">
                             <div className="flex items-center gap-3">
                                 <FileText size={18} className="text-gray-400" />
                                 <div>
                                     <p className="text-sm font-medium text-gray-700">{doc.title}</p>
                                     <p className="text-[10px] text-gray-400">{doc.size}</p>
                                 </div>
                             </div>
                             <span className="text-xs font-bold text-indigo-600">下载</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default SocialSecurity;

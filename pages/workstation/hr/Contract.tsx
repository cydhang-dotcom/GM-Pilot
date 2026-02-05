
import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, FileSignature, ChevronRight } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const MOCK_CONTRACTS = [
    { id: 1, name: '王强', type: '劳动合同', endDate: '2023-12-31', status: 'expiring', daysLeft: 5 },
    { id: 2, name: '张伟', type: '劳动合同', endDate: '2024-03-15', status: 'normal', daysLeft: 85 },
    { id: 3, name: '李娜', type: '劳动合同', endDate: '2025-06-01', status: 'normal', daysLeft: 520 },
];

// --- Level 3 Detail ---
const ContractDetail = ({ contract, onBack }: { contract: typeof MOCK_CONTRACTS[0], onBack: () => void }) => {
    return (
        <DetailLayout
            title="合同详情"
            onBack={onBack}
            tag={{ 
                label: contract.status === 'expiring' ? '即将到期' : '生效中',
                color: contract.status === 'expiring' ? 'text-orange-600' : 'text-emerald-600',
                bg: contract.status === 'expiring' ? 'bg-orange-50' : 'bg-emerald-50'
            }}
        >
             <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-inner">
                     <FileSignature size={32} className="text-slate-700" strokeWidth={1.5} />
                 </div>
                 <h2 className="text-xl font-black text-slate-900">{contract.name}</h2>
                 <p className="text-xs font-bold text-slate-400 mt-1">{contract.type}</p>
                 
                 <div className="mt-8 flex justify-center gap-8 border-t border-slate-50 pt-6">
                     <div>
                         <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">剩余天数</p>
                         <p className={`text-2xl font-black font-mono tracking-tight ${contract.status === 'expiring' ? 'text-orange-600' : 'text-slate-900'}`}>
                             {contract.daysLeft}
                         </p>
                     </div>
                     <div>
                         <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">到期日期</p>
                         <p className="text-2xl font-black font-mono tracking-tight text-slate-900">{contract.endDate}</p>
                     </div>
                 </div>
             </div>

             {contract.status === 'expiring' && (
                 <div className="bg-orange-50 border border-orange-100 rounded-[24px] p-5 flex items-start gap-3 shadow-sm animate-pulse">
                     <AlertTriangle size={20} className="text-orange-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                     <div>
                         <h4 className="text-sm font-black text-orange-800">续签提醒</h4>
                         <p className="text-xs font-medium text-orange-700/80 mt-1 leading-relaxed">
                             该员工合同即将于5天后到期，请尽快确认是否续签。
                         </p>
                     </div>
                 </div>
             )}
             
             <div className="flex gap-3 pt-4">
                 <button className="flex-1 py-3.5 rounded-2xl border border-slate-200 bg-white font-bold text-slate-700 active:bg-slate-50 transition-colors shadow-sm">
                     不再续签
                 </button>
                 <button className="flex-[2] py-3.5 rounded-2xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform">
                     发起续签
                 </button>
             </div>
        </DetailLayout>
    );
};

// --- Level 2 Dashboard ---

const Contract: React.FC = () => {
    const [selectedContract, setSelectedContract] = useState<typeof MOCK_CONTRACTS[0] | null>(null);
    
    if (selectedContract) return <ContractDetail contract={selectedContract} onBack={() => setSelectedContract(null)} />;

    const expiringCount = MOCK_CONTRACTS.filter(c => c.status === 'expiring').length;

    return (
        <div className="space-y-5 animate-fade-in pb-20">
            {/* Overview */}
            <div className="flex gap-3">
                 <div className="flex-1 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">有效合同</p>
                     <p className="text-3xl font-black text-slate-900 font-mono tracking-tight">32</p>
                 </div>
                 <div className={`flex-1 p-5 rounded-[24px] border shadow-sm ${expiringCount > 0 ? 'bg-orange-50 border-orange-100' : 'bg-white border-slate-100'}`}>
                     <p className={`text-[10px] font-bold mb-1 uppercase ${expiringCount > 0 ? 'text-orange-600' : 'text-slate-400'}`}>即将到期 (30天)</p>
                     <p className={`text-3xl font-black font-mono tracking-tight ${expiringCount > 0 ? 'text-orange-600' : 'text-slate-900'}`}>{expiringCount}</p>
                 </div>
            </div>

            {/* List */}
            <div>
                 <h3 className="text-sm font-black text-slate-900 mb-4 px-1">合同列表</h3>
                 <div className="space-y-4">
                     {MOCK_CONTRACTS.map(c => (
                         <div 
                             key={c.id} 
                             onClick={() => setSelectedContract(c)}
                             className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-center relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer group hover:border-indigo-100"
                         >
                             {/* Status Indicator Bar */}
                             <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${c.status === 'expiring' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                             
                             <div className="pl-2">
                                 <div className="flex items-center gap-2 mb-1">
                                     <h4 className="text-sm font-black text-slate-900">{c.name}</h4>
                                     <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{c.type}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <Clock size={12} className="text-slate-400" />
                                    <p className="text-xs font-mono font-bold text-slate-400">{c.endDate} 到期</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-4">
                                 {c.status === 'expiring' ? (
                                     <span className="text-[10px] text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg font-black border border-orange-100 animate-pulse shadow-sm">剩余 {c.daysLeft} 天</span>
                                 ) : (
                                     <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg font-black border border-emerald-100 flex items-center gap-1 shadow-sm">
                                         <CheckCircle2 size={10} strokeWidth={3} /> 正常
                                     </span>
                                 )}
                                 <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default Contract;

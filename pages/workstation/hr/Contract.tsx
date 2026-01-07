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
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                     <FileSignature size={32} className="text-gray-700" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900">{contract.name}</h2>
                 <p className="text-sm text-gray-500 mt-1">{contract.type}</p>
                 
                 <div className="mt-6 flex justify-center gap-8 border-t border-gray-50 pt-6">
                     <div>
                         <p className="text-xs text-gray-400 mb-1">剩余天数</p>
                         <p className={`text-xl font-bold font-mono ${contract.status === 'expiring' ? 'text-orange-600' : 'text-gray-900'}`}>
                             {contract.daysLeft}
                         </p>
                     </div>
                     <div>
                         <p className="text-xs text-gray-400 mb-1">到期日期</p>
                         <p className="text-xl font-bold font-mono text-gray-900">{contract.endDate}</p>
                     </div>
                 </div>
             </div>

             {contract.status === 'expiring' && (
                 <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                     <AlertTriangle size={20} className="text-orange-600 shrink-0" />
                     <div>
                         <h4 className="text-sm font-bold text-orange-800">续签提醒</h4>
                         <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                             该员工合同即将于5天后到期，请尽快确认是否续签。
                         </p>
                     </div>
                 </div>
             )}
             
             <div className="flex gap-3 pt-4">
                 <button className="flex-1 py-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 active:bg-gray-50 transition-colors">
                     不再续签
                 </button>
                 <button className="flex-[2] py-3 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform">
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
        <div className="space-y-4 animate-fade-in">
            {/* Overview */}
            <div className="flex gap-3">
                 <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <p className="text-[10px] text-gray-400 mb-1">有效合同</p>
                     <p className="text-2xl font-bold text-gray-900 font-mono">32</p>
                 </div>
                 <div className={`flex-1 p-4 rounded-xl border shadow-sm ${expiringCount > 0 ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100'}`}>
                     <p className={`text-[10px] mb-1 ${expiringCount > 0 ? 'text-orange-600' : 'text-gray-400'}`}>即将到期 (30天)</p>
                     <p className={`text-2xl font-bold font-mono ${expiringCount > 0 ? 'text-orange-600' : 'text-gray-900'}`}>{expiringCount}</p>
                 </div>
            </div>

            {/* List */}
            <div>
                 <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">合同列表</h3>
                 <div className="space-y-3">
                     {MOCK_CONTRACTS.map(c => (
                         <div 
                             key={c.id} 
                             onClick={() => setSelectedContract(c)}
                             className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                         >
                             {c.status === 'expiring' ? (
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                             ) : (
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                             )}
                             
                             <div>
                                 <div className="flex items-center gap-2">
                                     <h4 className="text-sm font-bold text-gray-900">{c.name}</h4>
                                     <span className="text-xs text-gray-400">{c.type}</span>
                                 </div>
                                 <div className="flex items-center gap-2 mt-1">
                                    <Clock size={12} className="text-gray-400" />
                                    <p className="text-xs text-gray-400">{c.endDate} 到期</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-3">
                                 {c.status === 'expiring' ? (
                                     <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-bold animate-pulse">剩余 {c.daysLeft} 天</span>
                                 ) : (
                                     <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                         <CheckCircle2 size={10} /> 正常
                                     </span>
                                 )}
                                 <ChevronRight size={16} className="text-gray-300" />
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default Contract;

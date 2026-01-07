import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, Clock, AlertCircle, ChevronRight, 
  FileText, Download, Wallet, ArrowUpRight 
} from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const MOCK_SUBSIDIES = [
    { 
        id: 's1', 
        title: '2023年度稳岗补贴', 
        amount: '12,500.00', 
        date: '2023-12-10', 
        status: '已到账', 
        type: '就业补贴',
        desc: '根据社保缴纳人数核定，旨在减轻企业负担。',
        progress: [
            { label: '提交申请', date: '11-15', done: true },
            { label: '审核通过', date: '11-20', done: true },
            { label: '资金拨付', date: '12-10', done: true },
        ]
    },
    { 
        id: 's2', 
        title: '高新技术企业认定奖励', 
        amount: '200,000.00', 
        date: '2023-12-01', 
        status: '审核中', 
        type: '资质认定',
        desc: '市级高新技术企业首次认定奖励资金。',
        progress: [
            { label: '材料提交', date: '10-10', done: true },
            { label: '专家评审', date: '12-01', done: true },
            { label: '公示', date: '', done: false },
        ]
    },
    { 
        id: 's3', 
        title: '扩岗补助', 
        amount: '4,500.00', 
        date: '', 
        status: '待申请', 
        type: '就业补贴',
        desc: '招用毕业年度高校毕业生，每人发放1500元。',
        progress: []
    }
];

// Detail View for a single subsidy
const SubsidyDetail = ({ item, onBack }: { item: any, onBack: () => void }) => (
    <DetailLayout 
        title="补助详情" 
        onBack={onBack}
        tag={{
            label: item.status,
            color: item.status === '已到账' ? 'text-emerald-600' : item.status === '审核中' ? 'text-blue-600' : 'text-gray-500',
            bg: item.status === '已到账' ? 'bg-emerald-50' : item.status === '审核中' ? 'bg-blue-50' : 'bg-gray-100'
        }}
    >
        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                         <Wallet size={20} />
                     </div>
                     <div>
                         <p className="text-xs text-gray-500">补贴项目</p>
                         <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                     </div>
                </div>
                
                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">预计/实发金额</p>
                        <p className="text-2xl font-bold font-mono text-gray-900">¥{item.amount}</p>
                    </div>
                    {item.status === '已到账' && (
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            <CheckCircle2 size={12} /> 已入账
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Progress Timeline */}
        {item.progress.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-900 mb-6">申请进度</h4>
                <div className="space-y-6 relative pl-2 border-l-2 border-gray-100 ml-2">
                    {item.progress.map((step: any, idx: number) => (
                        <div key={idx} className="relative pl-6">
                            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                                step.done ? 'border-blue-500 text-blue-500' : 'border-gray-200 text-gray-200'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className={`text-sm font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                                {step.date && <span className="text-xs text-gray-400 font-mono">{step.date}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h4 className="text-xs font-bold text-gray-900 mb-3">政策说明</h4>
             <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                 {item.desc}
             </p>
             <div className="mt-4 flex gap-3">
                 <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                     <FileText size={14} /> 查看政策原文
                 </button>
             </div>
        </div>
    </DetailLayout>
);

const GovernmentSubsidy: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) return <SubsidyDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;

    return (
        <div className="space-y-4">
             {/* Summary */}
             <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                     <p className="text-xs text-indigo-200 mb-1">2023年累计获批补助</p>
                     <h2 className="text-3xl font-bold font-mono">¥217,000.00</h2>
                     <div className="mt-4 flex gap-4">
                         <div>
                             <p className="text-[10px] text-indigo-300">已到账</p>
                             <p className="text-sm font-bold font-mono">¥12,500.00</p>
                         </div>
                         <div>
                             <p className="text-[10px] text-indigo-300">审核中</p>
                             <p className="text-sm font-bold font-mono">¥204,500.00</p>
                         </div>
                     </div>
                 </div>
                 <Building2 className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
             </div>

             {/* List */}
             <div>
                 <div className="flex justify-between items-center mb-3 px-1">
                     <h3 className="text-sm font-bold text-gray-900">申报记录</h3>
                 </div>
                 <div className="space-y-3">
                     {MOCK_SUBSIDIES.map(item => (
                         <div 
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.99] transition-transform cursor-pointer"
                         >
                             <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                     item.status === '已到账' ? 'bg-emerald-50 text-emerald-600' :
                                     item.status === '审核中' ? 'bg-blue-50 text-blue-600' :
                                     'bg-gray-100 text-gray-500'
                                 }`}>
                                     {item.status === '已到账' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                                 </div>
                                 <div>
                                     <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                                     <p className="text-xs text-gray-400 mt-0.5">{item.type} · {item.status}</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <p className="text-sm font-mono font-bold text-gray-900">¥{item.amount}</p>
                                 <ChevronRight size={16} className="text-gray-300 inline-block mt-0.5" />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};

export default GovernmentSubsidy;

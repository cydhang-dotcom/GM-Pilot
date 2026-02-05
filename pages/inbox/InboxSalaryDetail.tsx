
import React, { useState } from 'react';
import { CheckCircle2, Banknote, Loader2, ShieldCheck } from 'lucide-react';
import { Task } from '../../types';
import { DetailLayout } from '../../components/DetailLayout';

interface InboxSalaryDetailProps {
    task: Task;
    onBack: () => void;
}

const InboxSalaryDetail: React.FC<InboxSalaryDetailProps> = ({ task, onBack }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 1500);
    };

    if (isPaid) {
        return (
            <DetailLayout title="支付成功" onBack={onBack}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-200/50 animate-scale-up">
                        <CheckCircle2 size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">薪酬发放指令已发出</h2>
                    <p className="text-sm text-slate-400 max-w-[240px] font-medium leading-relaxed">银行处理中，预计 2 小时内到账。</p>
                    <button onClick={onBack} className="mt-10 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">返回任务中心</button>
                </div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout 
            title="工资发放确认" 
            onBack={onBack}
            tag={{ label: '12月核算', color: 'text-rose-600', bg: 'bg-rose-50' }}
        >
            <div className="space-y-6 pb-24">
                {/* Immersive Dark Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-[0.08] transform translate-x-1/4 -translate-y-1/4">
                        <Banknote size={180} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">12月实发工资总额</p>
                        <h2 className="text-4xl font-black font-mono tracking-tighter mb-8">¥425,000.00</h2>
                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">覆盖人数</p>
                                <span className="text-lg font-black font-mono">32 人</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">支付账户</p>
                                <span className="text-xs font-black truncate block">招商银行 (8888)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breakdown Card */}
                <div className="bg-white rounded-[32px] p-7 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                        部门核算明细
                    </h3>
                    <div className="space-y-5">
                        {[
                            { label: '技术部', amount: '280,000.00', percent: 65, color: 'bg-indigo-500' },
                            { label: '市场部', amount: '85,000.00', percent: 20, color: 'bg-emerald-500' },
                            { label: '行政部', amount: '60,000.00', percent: 15, color: 'bg-slate-400' }
                        ].map((dept, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-700">{dept.label}</span>
                                    <span className="text-sm font-black font-mono text-slate-900">¥{dept.amount}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${dept.color} shadow-sm`} style={{ width: `${dept.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-20">
                <button 
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl font-black text-sm bg-emerald-600 text-white shadow-xl shadow-emerald-200/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                    {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <ShieldCheck size={20} strokeWidth={2.5} />}
                    {isProcessing ? '正在处理指令...' : '确认薪酬发放'}
                </button>
            </div>
        </DetailLayout>
    );
};

export default InboxSalaryDetail;

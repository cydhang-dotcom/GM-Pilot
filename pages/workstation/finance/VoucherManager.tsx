
import React, { useState } from 'react';
import { Calendar, Search, Filter, CheckSquare, Lock, MessageSquare, Paperclip, ChevronRight, Link as LinkIcon, MoreHorizontal, Activity, Layers } from 'lucide-react';
import VoucherDetail from './VoucherDetail';
import VoucherAcceptance from './VoucherAcceptance';

export interface VoucherEntry { code: string; subject: string; direction: 'debit' | 'credit'; amount: string; }
export interface Attachment { id: string; type: 'invoice' | 'flow' | 'receipt' | 'other'; title: string; fileName: string; meta?: string; }
export interface Voucher { id: string; code: string; summary: string; amount: string; date: string; period: string; status: 'posted' | 'draft' | 'auditing'; feedbackStatus: 'none' | 'pending' | 'resolved'; related: string; creator: string; entries: VoucherEntry[]; attachments: Attachment[]; }

const MOCK_VOUCHERS: Voucher[] = [
    { id: 'v1', code: '记-001', summary: '支付12月办公室租金', amount: '45,000.00', date: '2023-12-01', period: '2023-12', status: 'posted', feedbackStatus: 'none', related: '上海物业管理有限公司', creator: '系统自动生成', entries: [{ code: '6602.01', subject: '管理费用_租赁费', direction: 'debit', amount: '42,857.14' }, { code: '2221.01.01', subject: '应交税费_应交增值税(进项税额)', direction: 'debit', amount: '2,142.86' }, { code: '1002.01', subject: '银行存款_招商银行', direction: 'credit', amount: '45,000.00' }], attachments: [{ id: 'a1', type: 'flow', title: '银行电子回单', fileName: '20231201_招商银行_回单.pdf', meta: '流水号: 202312010001' }] },
    { id: 'v2', code: '记-002', summary: '确认技术服务收入', amount: '120,000.00', date: '2023-12-12', period: '2023-12', status: 'posted', feedbackStatus: 'resolved', related: '上海某某科技', creator: '系统自动生成', entries: [{ code: '1122.01', subject: '应收账款_上海某某科技', direction: 'debit', amount: '120,000.00' }, { code: '6001.01', subject: '主营业务收入_技术服务', direction: 'credit', amount: '113,207.55' }, { code: '2221.01.05', subject: '应交税费_应交增值税(销项税额)', direction: 'credit', amount: '6,792.45' }], attachments: [{ id: 'a4', type: 'invoice', title: '全面数字化的电子发票', fileName: '数电票_031002300111.pdf' }] },
];

export type ClosingStatus = 'ACCOUNTING' | 'REVIEW' | 'TAX' | 'ACCEPTANCE' | 'LOCKED';
const CLOSING_STEPS: { id: ClosingStatus; label: string }[] = [{ id: 'ACCOUNTING', label: '智能做账' }, { id: 'REVIEW', label: '人工复核' }, { id: 'TAX', label: '纳税申报' }, { id: 'ACCEPTANCE', label: '月结验收' }, { id: 'LOCKED', label: '归档锁定' }];

const VoucherManager = () => {
    const [viewMode, setViewMode] = useState<'list' | 'detail' | 'acceptance'>('list');
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [currentStatus, setCurrentStatus] = useState<ClosingStatus>('ACCEPTANCE');

    if (viewMode === 'detail' && selectedVoucher) return <VoucherDetail voucher={selectedVoucher} onBack={() => setViewMode('list')} />;
    if (viewMode === 'acceptance') return <VoucherAcceptance onBack={() => setViewMode('list')} onConfirm={() => { setCurrentStatus('LOCKED'); setViewMode('list'); }} />;

    const currentStepIndex = CLOSING_STEPS.findIndex(s => s.id === currentStatus);

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Header Card with Stepper */}
            <div className="bg-gradient-to-br from-white via-white to-blue-50/50 rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                        <Calendar size={14} className="text-slate-400"/>
                        <span className="text-sm font-black text-slate-900 font-mono tracking-tight">2023-12</span>
                        <MoreHorizontal size={14} className="text-slate-300 ml-1"/>
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1.5 rounded-xl border flex items-center gap-2 ${currentStatus === 'LOCKED' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${currentStatus === 'LOCKED' ? 'bg-slate-400' : 'bg-blue-600 animate-pulse'}`}></div>
                        {CLOSING_STEPS[currentStepIndex].label}
                    </div>
                </div>
                
                <div className="relative mb-8 px-2">
                    <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-slate-100 -z-10 rounded-full"></div>
                    <div className="absolute top-2.5 left-0 h-0.5 bg-blue-500 -z-10 transition-all duration-700 rounded-full" style={{width: `${(currentStepIndex / (CLOSING_STEPS.length - 1)) * 100}%`}}></div>
                    <div className="flex justify-between items-start">
                        {CLOSING_STEPS.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center group relative cursor-default">
                                <div className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-colors bg-white ${idx <= currentStepIndex ? 'border-blue-500' : 'border-slate-200'}`}>
                                    {idx <= currentStepIndex && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                                </div>
                                <div className={`text-[9px] mt-2 font-bold text-center absolute top-full w-14 -left-1/2 translate-x-[9px] tracking-tight ${idx === currentStepIndex ? 'text-blue-600' : idx <= currentStepIndex ? 'text-slate-500' : 'text-slate-300'}`}>
                                    {step.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="pt-4 border-t border-slate-50">
                    {currentStatus === 'ACCEPTANCE' ? (
                        <button 
                            onClick={() => setViewMode('acceptance')} 
                            className="w-full bg-blue-600 text-white text-sm font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                        >
                            <CheckSquare size={18} /> 开始验收锁版 (V1.0)
                        </button>
                    ) : currentStatus === 'LOCKED' ? (
                        <div className="w-full bg-slate-50 text-slate-400 text-xs font-bold py-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-2">
                            <Lock size={14} /> 本月数据已归档 (V1.0)
                        </div>
                    ) : (
                        <div className="w-full bg-blue-50 text-blue-400 text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                            <Activity size={14} className="animate-spin" /> 数据处理中...
                        </div>
                    )}
                </div>
            </div>

            {/* Voucher List */}
            <div>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Layers size={16} className="text-slate-400" />
                        凭证清单
                    </h3>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 shadow-sm active:scale-95"><Search size={16}/></button>
                        <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 shadow-sm active:scale-95"><Filter size={16}/></button>
                    </div>
                </div>
                <div className="space-y-4">
                    {MOCK_VOUCHERS.map((voucher) => (
                        <div 
                            key={voucher.id} 
                            onClick={() => { setSelectedVoucher(voucher); setViewMode('detail'); }} 
                            className="group bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden hover:border-indigo-100"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                                        {voucher.code}
                                    </span>
                                    {voucher.feedbackStatus !== 'none' && (
                                        <span className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded-lg font-black border ${
                                            voucher.feedbackStatus === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                            <MessageSquare size={10} />
                                            {voucher.feedbackStatus === 'pending' ? '待回复' : '已回复'}
                                        </span>
                                    )}
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-sm font-black text-slate-900 truncate mb-1">{voucher.summary}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium bg-slate-50 px-1.5 py-0.5 rounded">
                                            <Paperclip size={10} /> {voucher.attachments.length}
                                        </span>
                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate max-w-[120px] font-medium">
                                            <LinkIcon size={10} /> {voucher.related}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-lg font-black font-mono text-slate-900 shrink-0 tracking-tight">¥{voucher.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VoucherManager;

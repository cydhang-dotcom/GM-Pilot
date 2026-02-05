
import React, { useState } from 'react';
import { QrCode, FilePlus, Filter, Clock, ArrowUpRight, MessageSquare, ScanLine } from 'lucide-react';
import { InvoiceDetail } from './FinanceDetails';

const MOCK_INVOICES = [
    { id: 'i1', code: '031002300111', name: '阿里云计算有限公司', amount: '12,000.00', date: '12-01', type: '专票', status: '已归属', source: '税务同步', project: 'SaaS平台' },
    { id: 'i2', code: '031002300222', name: '京东商城', amount: '4,500.00', date: '12-02', type: '普票', status: '待归属', source: '扫描上传', project: '' },
];
const MOCK_INVOICE_APPS = [
    { id: 'a0', customer: '杭州某电商公司', amount: '28,000.00', date: '12-20', status: '待开票', type: '专票', content: '软件开发服务' },
    { id: 'a3', customer: '苏州某制造企业', amount: '15,600.00', date: '12-19', status: '待开票', type: '普票', content: '技术咨询' },
    { id: 'a1', customer: '上海某某科技', amount: '120,000.00', date: '12-12', status: '已开具', type: '专票', content: '技术服务费' },
    { id: 'a2', customer: '北京某某集团', amount: '50,000.00', date: '12-14', status: '待补充', type: '普票', content: '咨询费' },
];

const Invoice: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (selectedItem) {
        return <InvoiceDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    const unifiedInvoices = [
        ...MOCK_INVOICES.map(i => ({...i, direction: 'IN', actionLabel: i.status === '待归属' ? '补归属' : ''})),
        ...MOCK_INVOICE_APPS.map(i => ({
            id: i.id,
            name: i.customer, 
            amount: i.amount,
            date: i.date,
            type: i.type,
            status: i.status, 
            source: '开票申请',
            project: i.content, 
            direction: 'OUT',
            actionLabel: i.status === '待补充' ? '补资料' : (i.status === '已开具' ? '查看' : i.status === '待开票' ? '催办' : '')
        }))
    ].sort((a, b) => {
        if (a.status === '待开票' && b.status !== '待开票') return -1;
        if (a.status !== '待开票' && b.status === '待开票') return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div className="space-y-6 animate-fade-in pb-20">
             {/* Functional Actions */}
             <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center gap-3 bg-white border border-slate-100 py-6 rounded-[32px] shadow-sm hover:shadow-md hover:border-indigo-100 active:scale-[0.98] transition-all group">
                     <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <QrCode size={24} strokeWidth={2} />
                     </div>
                     <span className="text-xs font-black text-slate-700">扫码收票</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-3 bg-white border border-slate-100 py-6 rounded-[32px] shadow-sm hover:shadow-md hover:border-indigo-100 active:scale-[0.98] transition-all group">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                        <FilePlus size={24} strokeWidth={2} />
                     </div>
                     <span className="text-xs font-black text-slate-700">发起开票</span>
                 </button>
             </div>

             {/* Header */}
             <div className="flex justify-between items-center px-1">
                 <h3 className="text-sm font-black text-slate-900">发票记录</h3>
                 <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl active:bg-slate-50">
                     <Filter size={12} /> 筛选
                 </button>
             </div>

             {/* Unified List */}
             <div className="space-y-4">
                {unifiedInvoices.map((inv) => {
                    const isPendingIssue = inv.status === '待开票';
                    return (
                        <div 
                            key={inv.id} 
                            onClick={() => setSelectedItem(inv)}
                            className={`rounded-[24px] p-5 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative cursor-pointer active:scale-[0.99] transition-all ${
                                isPendingIssue 
                                ? 'bg-blue-50/40 border-blue-200 ring-1 ring-blue-100' 
                                : 'bg-white border-slate-100 hover:border-indigo-100'
                            }`}
                        >
                            {/* Header: Source & Amount */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-1 rounded-lg font-black border ${
                                        inv.direction === 'IN' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                    }`}>
                                        {inv.direction === 'IN' ? '进项' : '销项'}
                                    </span>
                                    {isPendingIssue ? (
                                        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-lg font-bold animate-pulse flex items-center gap-1">
                                            <Clock size={10} /> 处理中
                                        </span>
                                    ) : (
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-bold">
                                            {inv.source}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-lg font-black font-mono tracking-tight ${inv.direction === 'IN' ? 'text-slate-900' : 'text-indigo-600'}`}>
                                    {inv.direction === 'IN' ? '-' : '+'}{inv.amount}
                                </span>
                            </div>
                            
                            {/* Body: Name & Meta */}
                            <h3 className="text-sm font-black text-slate-900 mb-1.5">{inv.name}</h3>
                            <p className="text-[11px] text-slate-400 font-medium mb-4 flex items-center gap-2">
                                <span className="font-mono">{inv.date}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>{inv.type}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>{inv.project}</span>
                            </p>
                            
                            {/* Footer: Status & Action */}
                            <div className={`border-t pt-3 flex justify-between items-center ${isPendingIssue ? 'border-blue-100' : 'border-slate-50'}`}>
                                <span className={`text-[10px] font-black ${
                                    inv.status === '已开具' || inv.status === '已归属' || inv.status === '已匹配' ? 'text-emerald-600' : 
                                    inv.status.includes('待') || inv.status.includes('补') ? 'text-orange-600' : 'text-slate-400'
                                }`}>
                                    {isPendingIssue ? '等待税务接口返回...' : inv.status}
                                </span>
                                
                                {inv.actionLabel && (
                                    <button className={`text-[10px] font-black px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                                        inv.actionLabel.includes('补') 
                                        ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse shadow-sm' 
                                        : 'bg-white text-indigo-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-100'
                                    }`}>
                                        {inv.actionLabel}
                                        {inv.actionLabel === '查看' ? <ArrowUpRight size={10} strokeWidth={3} /> : 
                                         inv.actionLabel === '催办' ? <MessageSquare size={10} strokeWidth={3} /> :
                                         <ScanLine size={10} strokeWidth={3} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
             </div>
        </div>
    );
};

export default Invoice;

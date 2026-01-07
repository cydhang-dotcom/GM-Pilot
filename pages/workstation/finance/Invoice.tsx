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

    // Merged mock data for demonstration: Combining Received (Input) and Issued (Output/Application) invoices
    const unifiedInvoices = [
        ...MOCK_INVOICES.map(i => ({...i, direction: 'IN', actionLabel: i.status === '待归属' ? '补归属' : ''})),
        ...MOCK_INVOICE_APPS.map(i => ({
            id: i.id,
            name: i.customer, // Map customer to name for unified display
            amount: i.amount,
            date: i.date,
            type: i.type,
            status: i.status, // e.g. '待开票', '已开具', '待补充'
            source: '开票申请',
            project: i.content, // reuse field or map appropriately
            direction: 'OUT',
            actionLabel: i.status === '待补充' ? '补资料' : (i.status === '已开具' ? '查看' : i.status === '待开票' ? '催办' : '')
        }))
    ].sort((a, b) => {
        // Priority: 待开票 > others
        if (a.status === '待开票' && b.status !== '待开票') return -1;
        if (a.status !== '待开票' && b.status === '待开票') return 1;
        // Secondary: Date Desc
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div className="space-y-4">
             {/* Functional Actions */}
             <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl shadow-sm hover:bg-gray-50 active:scale-[0.99] transition-all">
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <QrCode size={20} />
                     </div>
                     <span className="text-xs font-bold">扫码收票</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl shadow-sm hover:bg-gray-50 active:scale-[0.99] transition-all">
                     <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FilePlus size={20} />
                     </div>
                     <span className="text-xs font-bold">发起开票</span>
                 </button>
             </div>

             {/* Filter/Header */}
             <div className="flex justify-between items-center px-1">
                 <h3 className="text-sm font-bold text-gray-900">发票记录</h3>
                 <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                     <Filter size={12} /> 筛选
                 </button>
             </div>

             {/* Unified List */}
             <div className="space-y-3">
                {unifiedInvoices.map((inv) => {
                    const isPendingIssue = inv.status === '待开票';
                    return (
                        <div 
                            key={inv.id} 
                            onClick={() => setSelectedItem(inv)}
                            className={`rounded-xl p-4 border shadow-sm relative cursor-pointer active:scale-[0.99] transition-transform ${
                                isPendingIssue 
                                ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-100' 
                                : 'bg-white border-gray-100'
                            }`}
                        >
                            {/* Header: Source & Amount */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                                        inv.direction === 'IN' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                    }`}>
                                        {inv.direction === 'IN' ? '收' : '开'}
                                    </span>
                                    {isPendingIssue ? (
                                        <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                            处理中
                                        </span>
                                    ) : (
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                                            {inv.source}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-lg font-mono font-bold ${inv.direction === 'IN' ? 'text-gray-900' : 'text-indigo-600'}`}>
                                    {inv.direction === 'IN' ? '-' : '+'}{inv.amount}
                                </span>
                            </div>
                            
                            {/* Body: Name & Meta */}
                            <h3 className="text-sm font-bold text-gray-900 mb-1">{inv.name}</h3>
                            <p className="text-xs text-gray-400 mb-3">{inv.date} · {inv.type} · {inv.project}</p>
                            
                            {/* Footer: Status & Action */}
                            <div className={`border-t pt-2 flex justify-between items-center ${isPendingIssue ? 'border-blue-100' : 'border-gray-50'}`}>
                                <span className={`text-[10px] font-medium ${
                                    inv.status === '已开具' || inv.status === '已归属' || inv.status === '已匹配' ? 'text-emerald-600' : 
                                    inv.status.includes('待') || inv.status.includes('补') ? 'text-orange-600' : 'text-gray-400'
                                }`}>
                                    {isPendingIssue ? (
                                        <span className="flex items-center gap-1 text-blue-600 font-bold">
                                            <Clock size={10} className="animate-spin-slow" /> 待开票
                                        </span>
                                    ) : inv.status}
                                </span>
                                
                                {inv.actionLabel && (
                                    <button className={`text-[10px] font-bold px-2 py-1 rounded border flex items-center gap-1 ${
                                        inv.actionLabel.includes('补') 
                                        ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' 
                                        : 'bg-white text-blue-600 border-gray-200'
                                    }`}>
                                        {inv.actionLabel}
                                        {inv.actionLabel === '查看' ? <ArrowUpRight size={10} /> : 
                                         inv.actionLabel === '催办' ? <MessageSquare size={10} /> :
                                         <ScanLine size={10} />}
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
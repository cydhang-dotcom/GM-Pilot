
import React from 'react';
import { FileSpreadsheet, FileText, Banknote, ChevronRight } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const PayrollExport = ({ onBack }: { onBack: () => void }) => (
    <DetailLayout 
        title="薪资报表导出" 
        onBack={onBack}
        tag={{ label: '多格式', color: 'text-blue-600', bg: 'bg-blue-50' }}
    >
        <div className="space-y-4">
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-blue-200 cursor-pointer transition-all group active:scale-[0.99] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors border border-blue-100">
                        <FileText size={22} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 text-sm">薪资汇总表 (PDF)</h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">适用于签字归档，包含部门汇总数据</p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400" />
            </div>
            
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-emerald-200 cursor-pointer transition-all group active:scale-[0.99] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors border border-emerald-100">
                        <FileSpreadsheet size={22} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 text-sm">薪资明细表 (Excel)</h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">适用于财务核算，包含完整计算公式</p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-400" />
            </div>
            
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-orange-200 cursor-pointer transition-all group active:scale-[0.99] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors border border-orange-100">
                        <Banknote size={22} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 text-sm">银行代发文件 (TXT)</h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">招商银行通用代发格式</p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-400" />
            </div>
        </div>
    </DetailLayout>
);

export default PayrollExport;

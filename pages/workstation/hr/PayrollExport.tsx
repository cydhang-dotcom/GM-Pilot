
import React from 'react';
import { FileSpreadsheet, FileText, Banknote } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

const PayrollExport = ({ onBack }: { onBack: () => void }) => (
    <DetailLayout 
        title="薪资报表导出" 
        onBack={onBack}
        tag={{ label: '多格式', color: 'text-blue-600', bg: 'bg-blue-50' }}
    >
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">薪资汇总表 (PDF)</h4>
                        <p className="text-xs text-gray-400 mt-1">适用于签字归档，包含部门汇总数据</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100">
                        <FileSpreadsheet size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">薪资明细表 (Excel)</h4>
                        <p className="text-xs text-gray-400 mt-1">适用于财务核算，包含完整计算公式</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-100">
                        <Banknote size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">银行代发文件 (TXT)</h4>
                        <p className="text-xs text-gray-400 mt-1">招商银行通用代发格式</p>
                    </div>
                </div>
            </div>
        </div>
    </DetailLayout>
);

export default PayrollExport;

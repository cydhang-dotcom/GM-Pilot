
import React from 'react';
import { FileText, Copy, Check, Settings, Stamp, ShieldCheck } from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';

const CompanyDetails = ({ type, onBack }: { type: string, onBack: () => void }) => {
    if (type === 'inv') return (
        <DetailLayout title="开票信息" onBack={onBack}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                <div className="relative z-10 text-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-3"><FileText size={32} /></div>
                    <h2 className="text-lg font-bold text-gray-900">上海千机网络科技有限公司</h2>
                </div>
                <div className="space-y-4">
                    {[
                        { label: '税号', value: '91310000XXXXXXXXXX' },
                        { label: '单位地址', value: '上海市徐汇区田林路888号科技园' },
                        { label: '电话号码', value: '021-66668888' },
                        { label: '开户银行', value: '招商银行上海科技园支行' },
                        { label: '银行账户', value: '6227 0038 1234 8888' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-xl flex justify-between items-start group active:bg-blue-50 transition-colors cursor-pointer relative">
                            <div><p className="text-xs text-gray-400 mb-1">{item.label}</p><p className="text-sm font-medium text-gray-900 break-all select-all">{item.value}</p></div>
                            <Copy size={14} className="text-gray-300 mt-1 group-hover:text-blue-500" />
                        </div>
                    ))}
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg mt-4 active:scale-[0.98]">复制全部信息</button>
            </div>
        </DetailLayout>
    );

    if (type === 'addr') return (
        <DetailLayout title="收件地址" onBack={onBack}>
            <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-sm relative">
                    <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><span className="font-bold text-gray-900">公司前台</span><span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">默认</span></div><button className="text-gray-400"><Settings size={16}/></button></div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">上海市徐汇区田林路888号科技园 16号楼 301室</p>
                    <p className="text-xs text-gray-400">行政部 (收) 138-0000-0000</p>
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-blue-500 border-l-[40px] border-l-transparent"></div>
                    <Check size={14} className="text-white absolute top-1 right-1" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm opacity-60">
                    <div className="flex justify-between items-start mb-2"><span className="font-bold text-gray-900">财务部</span></div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">上海市徐汇区田林路888号科技园 16号楼 305室</p>
                    <p className="text-xs text-gray-400">张会计 (收) 139-0000-0000</p>
                </div>
            </div>
            <button className="w-full mt-4 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">+ 新增地址</button>
        </DetailLayout>
    );

    if (type === 'seal' || type === 'cert') return (
        <DetailLayout title="企业资产与权益" onBack={onBack}>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-sm text-gray-700">电子印章 (3)</div>
                {[{ name: '公章', id: 'ES-001', status: '正常' }, { name: '财务专用章', id: 'ES-002', status: '正常' }, { name: '法人章', id: 'ES-003', status: '正常' }].map((seal, i) => (
                    <div key={i} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100"><Stamp size={20} /></div><div><p className="text-sm font-bold text-gray-900">{seal.name}</p><p className="text-xs text-gray-400 font-mono">{seal.id}</p></div></div>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded">{seal.status}</span>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-4">
                 <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-sm text-gray-700">数字证书</div>
                 <div className="p-4"><div className="flex items-center gap-3 mb-2"><ShieldCheck size={20} className="text-emerald-600" /><span className="text-sm font-bold text-gray-900">企业数字证书 (UKey)</span></div><p className="text-xs text-gray-400 ml-8">有效期至: 2024-12-31</p></div>
            </div>
        </DetailLayout>
    );

    return <DetailLayout title="详情" onBack={onBack}><div className="text-center py-20 text-gray-400">功能开发中</div></DetailLayout>;
};

export default CompanyDetails;

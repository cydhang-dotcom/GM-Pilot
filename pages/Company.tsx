
import React, { useState } from 'react';
import { Building2, ChevronRight, ShieldCheck, Stamp, Users, FileText, Landmark, QrCode, Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Copy, History, Bell, MapPin, ScrollText } from 'lucide-react';
import CompanyDetails from './company/CompanyDetails';

const Company: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  
  if (activeDetail) return <CompanyDetails type={activeDetail} onBack={() => setActiveDetail(null)} />;

  const menuGroups = [
    { title: '常用业务资料', items: [{ id: 'inv', icon: FileText, label: '开票信息', desc: '税号、地址电话、开户行', iconTheme: 'bg-blue-50 text-blue-600' }, { id: 'addr', icon: MapPin, label: '收件地址', desc: '上海市徐汇区...', iconTheme: 'bg-orange-50 text-orange-600' }] },
    { title: '权益与资产', items: [{ id: 'seal', icon: Stamp, label: '电子印章', value: '3枚', iconTheme: 'bg-rose-50 text-rose-600' }, { id: 'cert', icon: ShieldCheck, label: '数字证书', value: '有效期至 2024', iconTheme: 'bg-emerald-50 text-emerald-600' }, { id: 'contract', icon: ScrollText, label: '签约服务', value: '尊享版', iconTheme: 'bg-purple-50 text-purple-600' }] },
    { title: '企业管理', items: [{ id: 'admin', icon: Users, label: '成员权限', value: '2人', iconTheme: 'bg-gray-100 text-gray-600' }, { id: 'log', icon: History, label: '操作日志', value: '', iconTheme: 'bg-gray-100 text-gray-600' }, { id: 'notify', icon: Bell, label: '消息通知', value: '已开启', iconTheme: 'bg-gray-100 text-gray-600' }] }
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-8 animate-fade-in">
      <div className="bg-white px-5 pt-10 pb-4 sticky top-0 z-10 border-b border-gray-100 shadow-sm"><h1 className="text-xl font-bold text-gray-900">我的企业</h1></div>
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex items-start gap-4">
                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200"><Building2 size={28} /></div>
                 <div className="pt-0.5 flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1"><h2 className="text-lg font-bold text-gray-900 truncate">千机科技</h2><QrCode size={18} className="text-gray-400" /></div>
                     <div className="flex items-center gap-2 mb-3"><span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">已实名认证</span><span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 shrink-0">存续</span></div>
                     <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <div className="flex flex-col"><span className="text-[10px] text-gray-400 mb-0.5">统一社会信用代码</span><span className="text-xs font-mono font-medium text-gray-700">91310000XXXXXXXX</span></div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><Copy size={14} className="text-gray-400 cursor-pointer active:text-gray-600"/></div>
                     </div>
                 </div>
             </div>
        </div>
        <div>
            <div className="flex justify-between items-center mb-2 ml-1"><h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">对公账户 (Assets)</h3></div>
            <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-3xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg border border-indigo-500"><Landmark size={20} className="text-white"/></div>
                            <div><h4 className="text-sm font-bold text-slate-900 tracking-tight">招商银行</h4><p className="text-[10px] text-slate-400 font-medium">基本存款账户</p></div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setShowBalance(!showBalance); }} className="text-slate-300 hover:text-indigo-600 transition-colors p-2 -mr-2">{showBalance ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                    </div>
                    <div className="mb-6"><div className={`text-3xl font-bold font-mono tracking-tight mb-2 transition-all duration-300 ${showBalance ? 'text-slate-900' : 'text-slate-200 blur-md select-none'}`}>{showBalance ? '¥ 142,590.00' : '¥ 888,888.88'}</div><div className="flex items-center gap-2 text-slate-400"><span className="text-xs font-mono tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{showBalance ? '6227 0038 **** 8888' : '•••• •••• •••• 8888'}</span><Copy size={12} className="hover:text-indigo-600 transition-colors cursor-pointer" /></div></div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4"><div className="flex items-center gap-4"><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100"><ArrowDownLeft size={10} className="text-emerald-50" /></div><span className={`text-xs font-bold font-mono text-emerald-600 ${!showBalance && 'blur-sm'}`}>{showBalance ? '62,000' : '00,000'}</span></div><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100"><ArrowUpRight size={10} className="text-rose-500" /></div><span className={`text-xs font-bold font-mono text-rose-600 ${!showBalance && 'blur-sm'}`}>{showBalance ? '29,500' : '00,000'}</span></div></div><div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium"><MapPin size={10} /><span>科技园支行</span></div></div>
                </div>
            </div>
        </div>
        <div className="space-y-6">
            {menuGroups.map((group) => (
                <div key={group.title}>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">{group.title}</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {group.items.map((item, idx) => (
                            <div key={item.id} onClick={() => setActiveDetail(item.id)} className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer ${idx !== group.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <div className="flex items-center gap-3 overflow-hidden"><div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconTheme}`}><item.icon size={18} /></div><div className="min-w-0"><span className="text-sm font-bold text-gray-800 block">{item.label}</span>{item.desc && (<span className="text-xs text-gray-400 truncate block mt-0.5">{item.desc}</span>)}</div></div>
                                <div className="flex items-center gap-2 shrink-0">{item.value && (<span className="text-xs text-gray-400 font-medium">{item.value}</span>)}<ChevronRight size={16} className="text-gray-300" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center pt-2 pb-8"><div className="flex items-center justify-center gap-1.5 mb-2"><ShieldCheck size={12} className="text-gray-300"/><span className="text-[10px] text-gray-300">数据已加密保护</span></div><p className="text-[10px] text-gray-300 font-mono">GM Pilot v1.0.14.225</p></div>
      </div>
    </div>
  );
};

export default Company;

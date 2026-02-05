
import React, { useState } from 'react';
import { Building2, ChevronRight, ShieldCheck, Stamp, Users, FileText, Landmark, QrCode, Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Copy, History, Bell, MapPin, ScrollText } from 'lucide-react';
import CompanyDetails from './company/CompanyDetails';

const Company: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  
  if (activeDetail) return <CompanyDetails type={activeDetail} onBack={() => setActiveDetail(null)} />;

  const menuGroups = [
    { title: '常用业务资料', items: [{ id: 'inv', icon: FileText, label: '开票信息', desc: '税号、地址电话、开户行', iconTheme: 'text-blue-500' }, { id: 'addr', icon: MapPin, label: '收件地址', desc: '上海市徐汇区...', iconTheme: 'text-orange-500' }] },
    { title: '权益与资产', items: [{ id: 'seal', icon: Stamp, label: '电子印章', value: '3枚', iconTheme: 'text-rose-500' }, { id: 'cert', icon: ShieldCheck, label: '数字证书', value: '有效期至 2024', iconTheme: 'text-emerald-500' }, { id: 'contract', icon: ScrollText, label: '签约服务', value: '尊享版', iconTheme: 'text-purple-500' }] },
    { title: '企业管理', items: [{ id: 'admin', icon: Users, label: '成员权限', value: '2人', iconTheme: 'text-slate-500' }, { id: 'log', icon: History, label: '操作日志', value: '', iconTheme: 'text-slate-500' }, { id: 'notify', icon: Bell, label: '消息通知', value: '已开启', iconTheme: 'text-slate-500' }] }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB]">
      <header className="sticky top-0 z-40 px-6 pt-12 pb-5 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-100/50 flex justify-between items-end">
          <div>
              <div className="flex items-center gap-1.5 mb-1.5 opacity-60">
                  <Building2 size={14} className="text-slate-400"/>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">Enterprise Center</span>
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">我的企业</h1>
          </div>
      </header>

      <div className="px-6 space-y-6 mt-6 pb-24 overflow-y-auto no-scrollbar">
        {/* Identity Card - Airy Gradient */}
        <div className="bg-gradient-to-br from-white via-white to-indigo-50/60 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-indigo-50/50 relative overflow-hidden group">
             <div className="flex items-start gap-5">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200 border-2 border-white">
                    <Building2 size={28} strokeWidth={1.5} />
                 </div>
                 <div className="pt-1 flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1.5">
                        <h2 className="text-lg font-black text-slate-900 truncate tracking-tight">千机科技</h2>
                        <QrCode size={20} className="text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer" />
                     </div>
                     <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50 shrink-0">已实名认证</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100/50 shrink-0">存续</span>
                     </div>
                     <div className="flex items-center justify-between bg-white/60 px-4 py-3 rounded-xl border border-slate-100/50 group-hover:border-indigo-100 transition-colors backdrop-blur-sm">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">统一社会信用代码</span>
                            <span className="text-xs font-mono font-bold text-slate-700 tracking-wide">91310000XXXXXXXX</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all cursor-pointer text-slate-400 hover:text-indigo-600">
                            <Copy size={14} />
                        </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Bank Account Card - Morning Mist Gradient */}
        <div className="relative">
            <div className="flex justify-between items-center mb-3 ml-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">对公账户 (Assets)</h3>
            </div>
            <div className="bg-gradient-to-br from-white via-[#f8fbff] to-[#eef6ff] rounded-[32px] p-6 shadow-[0_20px_40px_-12px_rgba(59,130,246,0.1)] relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer border border-blue-100/60">
                {/* Watermark */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-4 -translate-y-4 pointer-events-none">
                    <Landmark size={140} className="text-indigo-900" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-rose-100 text-rose-600 shadow-sm">
                                <Landmark size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 tracking-tight">招商银行</h4>
                                <p className="text-[10px] text-slate-400 font-bold tracking-wide">基本存款账户</p>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowBalance(!showBalance); }} 
                            className="text-slate-300 hover:text-indigo-600 transition-colors p-2 -mr-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                        >
                            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    
                    <div className="mb-8 text-center">
                        <div className={`text-4xl font-black font-mono tracking-tighter mb-3 text-slate-800 transition-all duration-500 ${showBalance ? 'opacity-100 blur-0' : 'opacity-40 blur-md select-none'}`}>
                            {showBalance ? '¥ 142,590.00' : '¥ 888,888.88'}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                            <span className="text-xs font-mono font-bold tracking-widest bg-white/60 px-3 py-1 rounded-lg border border-blue-50/50 shadow-sm">
                                {showBalance ? '6227 0038 **** 8888' : '•••• •••• •••• 8888'}
                            </span>
                            <Copy size={14} className="hover:text-indigo-600 transition-colors cursor-pointer" />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-5">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">本月收入</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                                        <ArrowDownLeft size={10} strokeWidth={3} />
                                    </div>
                                    <span className={`text-sm font-bold font-mono text-emerald-600 ${!showBalance && 'blur-[2px] opacity-60'}`}>{showBalance ? '62,000' : '00,000'}</span>
                                </div>
                            </div>
                            <div className="w-[1px] h-8 bg-slate-200/50"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">本月支出</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-orange-100/50 flex items-center justify-center text-orange-600">
                                        <ArrowUpRight size={10} strokeWidth={3} />
                                    </div>
                                    <span className={`text-sm font-bold font-mono text-orange-600 ${!showBalance && 'blur-[2px] opacity-60'}`}>{showBalance ? '29,500' : '00,000'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold bg-white/60 px-2.5 py-1.5 rounded-lg border border-slate-50/50 shadow-sm backdrop-blur-md">
                            <MapPin size={10} /><span>科技园支行</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Menu Groups - Rounded L2 Cards */}
        <div className="space-y-6">
            {menuGroups.map((group) => (
                <div key={group.title}>
                    <h3 className="text-xs font-bold text-slate-400 mb-3 ml-2 uppercase tracking-wider">{group.title}</h3>
                    <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                        {group.items.map((item, idx) => (
                            <div 
                                key={item.id} 
                                onClick={() => setActiveDetail(item.id)} 
                                className={`flex items-center justify-between p-5 active:bg-slate-50 transition-colors cursor-pointer group ${idx !== group.items.length - 1 ? 'border-b border-slate-50' : ''}`}
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 bg-slate-50 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-100 transition-all ${item.iconTheme}`}>
                                        <item.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="min-w-0 flex flex-col justify-center">
                                        <span className="text-sm font-bold text-slate-700 block mb-0.5">{item.label}</span>
                                        {item.desc && (<span className="text-xs text-slate-400 truncate block font-medium">{item.desc}</span>)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    {item.value && (<span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{item.value}</span>)}
                                    <ChevronRight size={18} className="text-slate-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        {/* Footer */}
        <div className="text-center pt-4 pb-8 opacity-40">
            <div className="flex items-center justify-center gap-1.5 mb-2">
                <ShieldCheck size={12} className="text-slate-500"/>
                <span className="text-[10px] font-bold text-slate-500">数据已加密保护</span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono">GM Pilot v2.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Company;

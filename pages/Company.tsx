import React, { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  Settings,
  ShieldCheck, 
  Stamp, 
  Users, 
  FileText, 
  CreditCard,
  Wallet,
  ScrollText,
  History,
  Bell,
  Briefcase,
  Copy,
  Landmark,
  MapPin,
  QrCode,
  Eye,
  EyeOff,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';

const Company: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  const menuGroups = [
    {
      title: '常用业务资料',
      items: [
        { 
          id: 'inv', 
          icon: FileText, 
          label: '开票信息', 
          desc: '税号、地址电话、开户行',
          iconTheme: 'bg-blue-50 text-blue-600'
        },
        { 
          id: 'addr', 
          icon: MapPin, 
          label: '收件地址', 
          desc: '上海市徐汇区...',
          iconTheme: 'bg-orange-50 text-orange-600'
        },
      ]
    },
    {
      title: '权益与资产',
      items: [
        { 
          id: 'seal', 
          icon: Stamp, 
          label: '电子印章', 
          value: '3枚', 
          iconTheme: 'bg-rose-50 text-rose-600'
        },
        { 
          id: 'cert', 
          icon: ShieldCheck, 
          label: '数字证书', 
          value: '有效期至 2024', 
          iconTheme: 'bg-emerald-50 text-emerald-600'
        },
        { 
          id: 'contract', 
          icon: ScrollText, 
          label: '签约服务', 
          value: '尊享版', 
          iconTheme: 'bg-purple-50 text-purple-600'
        },
      ]
    },
    {
      title: '企业管理',
      items: [
        { 
          id: 'admin', 
          icon: Users, 
          label: '成员权限', 
          value: '2人', 
          iconTheme: 'bg-gray-100 text-gray-600'
        },
        { 
          id: 'log', 
          icon: History, 
          label: '操作日志', 
          value: '', 
          iconTheme: 'bg-gray-100 text-gray-600'
        },
        { 
          id: 'notify', 
          icon: Bell, 
          label: '消息通知', 
          value: '已开启', 
          iconTheme: 'bg-gray-100 text-gray-600'
        },
      ]
    }
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-8">
      
      {/* 1. Header */}
      <div className="bg-white px-5 pt-10 pb-4 sticky top-0 z-10 border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
         <h1 className="text-xl font-bold text-gray-900">我的企业</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* 2. Corporate Identity Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex items-start gap-4">
                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
                     <Building2 size={28} />
                 </div>
                 <div className="pt-0.5 flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-bold text-gray-900 truncate">千机科技</h2>
                        <QrCode size={18} className="text-gray-400" />
                     </div>
                     <div className="flex items-center gap-2 mb-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                            已实名认证
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                            存续
                        </span>
                     </div>
                     <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 mb-0.5">统一社会信用代码</span>
                            <span className="text-xs font-mono font-medium text-gray-700">91310000XXXXXXXX</span>
                        </div>
                        <Copy size={14} className="text-gray-400 cursor-pointer active:text-gray-600"/>
                     </div>
                 </div>
             </div>
        </div>

        {/* 3. Bank Account Card (Compact Redesign) */}
        <div>
            <div className="flex justify-between items-center mb-2 ml-1">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">对公账户</h3>
            </div>
            
            <div className="bg-gradient-to-r from-[#172554] to-[#1e40af] rounded-xl p-4 text-white shadow-md relative overflow-hidden group active:scale-[0.99] transition-transform cursor-pointer">
                {/* Subtle Background Art */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                    {/* Top Row: Bank Info & Toggle */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/5">
                                <Landmark size={16} className="text-blue-100"/>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold tracking-tight">招商银行</h4>
                                <p className="text-[10px] text-blue-200/80 font-medium">基本存款账户</p>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowBalance(!showBalance);
                            }}
                            className="text-blue-200/60 hover:text-white transition-colors p-1"
                        >
                            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                    </div>

                    {/* Middle Row: Balance & Number */}
                    <div className="mb-4 pl-0.5">
                         <div className="text-2xl font-bold font-mono tracking-tight mb-1">
                            {showBalance ? '¥ 142,590.00' : '******'}
                         </div>
                         <div className="flex items-center gap-2 text-blue-200/60">
                            <span className="text-xs font-mono tracking-wider">
                                {showBalance ? '6227 0038 **** 8888' : '**** **** **** 8888'}
                            </span>
                            <Copy size={11} className="hover:text-white transition-colors" />
                         </div>
                    </div>

                    {/* Bottom Row: Stats & Branch */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                   <ArrowDownLeft size={9} className="text-emerald-400" />
                                </div>
                                <span className="text-xs font-mono font-medium text-blue-100">
                                    {showBalance ? '62,000' : '***'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                   <ArrowUpRight size={9} className="text-rose-400" />
                                </div>
                                <span className="text-xs font-mono font-medium text-blue-100">
                                    {showBalance ? '29,500' : '***'}
                                </span>
                            </div>
                        </div>
                        <span className="text-[10px] text-blue-300/60 truncate max-w-[100px]">
                            科技园支行
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. Categorized Menu Lists */}
        <div className="space-y-6">
            {menuGroups.map((group) => (
                <div key={group.title}>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">{group.title}</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {group.items.map((item, idx) => (
                            <div 
                                key={item.id}
                                className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer ${
                                    idx !== group.items.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconTheme}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-sm font-bold text-gray-800 block">{item.label}</span>
                                        {item.desc && (
                                            <span className="text-xs text-gray-400 truncate block mt-0.5">{item.desc}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {item.value && (
                                        <span className="text-xs text-gray-400 font-medium">
                                            {item.value}
                                        </span>
                                    )}
                                    <ChevronRight size={16} className="text-gray-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        {/* Footer Info */}
        <div className="text-center pt-2 pb-8">
             <div className="flex items-center justify-center gap-1.5 mb-2">
                 <ShieldCheck size={12} className="text-gray-300"/>
                 <span className="text-[10px] text-gray-300">数据已加密保护</span>
             </div>
             <p className="text-[10px] text-gray-300 font-mono">GM Pilot v1.0.2</p>
        </div>

      </div>
    </div>
  );
};

export default Company;
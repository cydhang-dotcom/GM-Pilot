
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Banknote, 
  FileCheck, 
  UserPlus, 
  TrendingUp, 
  Receipt, 
  Calculator, 
  FileUp, 
  MessageSquare, 
  AlertOctagon, 
  Search,
  BarChart3,
  HelpCircle,
  FileBadge,
  Contact,
  FileSignature,
  Ticket,
  CreditCard,
  History,
  Users,
  Activity,
  Scale,
  Wallet2,
  HeartHandshake,
  Briefcase
} from 'lucide-react';

// Define the structure for categorized menu items
interface ServiceItem {
  id: string;
  label: string;
  iconName: string;
  badge?: {
    text: string;
    color: string;
  };
}

interface ServiceGroup {
  title: string;
  themeColor: 'blue' | 'emerald' | 'purple';
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    title: '财务运营 (Finance Ops)',
    themeColor: 'emerald',
    items: [
      { 
        id: 'fn-rec', 
        label: '对账', 
        iconName: 'Scale',
        badge: { text: '4待办', color: 'bg-rose-500 text-white' }
      },
      { id: 'fn-flow', label: '流水', iconName: 'Activity' }, 
      { id: 'fn-4', label: '发票', iconName: 'Ticket' }, 
      { id: 'fn-reim', label: '报销', iconName: 'Wallet2' },
      { id: 'fn-3', label: '凭证', iconName: 'FileUp' }, 
      { id: 'fn-5', label: '报表', iconName: 'BarChart3' }, 
      // Tax (fn-2) kept as it was in previous version, though distinct from ops
      { id: 'fn-2', label: '税款', iconName: 'Calculator' }, 
    ]
  },
  {
    title: '人事管理 (HR)',
    themeColor: 'blue',
    items: [
      { 
        id: 'hr-emp', 
        label: '员工', 
        iconName: 'Users',
        badge: { text: '32人', color: 'bg-blue-600 text-white' }
      }, 
      { id: 'hr-1', label: '薪酬', iconName: 'Banknote' }, 
      { id: 'hr-4', label: '五险一金', iconName: 'CreditCard' }, 
      { id: 'hr-6', label: '合同', iconName: 'FileSignature' }, 
    ]
  },
  {
    title: '综合服务 (Services)',
    themeColor: 'purple',
    items: [
      { id: 'ot-1', label: '政策咨询', iconName: 'HelpCircle' },
      { id: 'ot-5', label: '员工服务', iconName: 'HeartHandshake' }, // Replaced Proof with Employee Service
      { id: 'ot-3', label: '口径确认', iconName: 'MessageSquare' },
      { id: 'ot-4', label: '异常处理', iconName: 'AlertOctagon' },
    ]
  }
];

const Work: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/work/${id}`);
  };

  const renderIcon = (name: string, size: number = 24) => {
    const props = { size, strokeWidth: 1.5 }; // Lighter stroke
    switch (name) {
      case 'Banknote': return <Banknote {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'UserPlus': return <UserPlus {...props} />;
      case 'Users': return <Users {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Receipt': return <Receipt {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'FileUp': return <FileUp {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'HelpCircle': return <HelpCircle {...props} />;
      case 'FileBadge': return <FileBadge {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'AlertOctagon': return <AlertOctagon {...props} />;
      case 'Contact': return <Contact {...props} />;
      case 'FileSignature': return <FileSignature {...props} />;
      case 'Ticket': return <Ticket {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'History': return <History {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Wallet2': return <Wallet2 {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      default: return <FileCheck {...props} />;
    }
  };

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'blue': return { text: 'text-blue-600', shadow: 'shadow-blue-100', border: 'border-blue-50 hover:border-blue-200' };
      case 'emerald': return { text: 'text-emerald-600', shadow: 'shadow-emerald-100', border: 'border-emerald-50 hover:border-emerald-200' };
      case 'purple': return { text: 'text-purple-600', shadow: 'shadow-purple-100', border: 'border-purple-50 hover:border-purple-200' };
      default: return { text: 'text-slate-600', shadow: 'shadow-slate-100', border: 'border-slate-50 hover:border-slate-200' };
    }
  };

  // Filter Logic
  const filteredGroups = serviceGroups.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 pt-12 pb-4 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-100/50">
        <div className="flex items-center gap-2 mb-2 opacity-60">
            <Briefcase size={16} className="text-slate-400"/>
            <span className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">Workspace & Tools</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-4">事务工作台</h1>
        
        {/* Search Bar - Larger Font & Height */}
        <div className="relative group">
            <input 
                type="text" 
                placeholder="查找功能或事务..." 
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50/50 transition-all text-base shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} strokeWidth={2} />
        </div>
      </header>

      <div className="px-6 py-6 space-y-8 pb-24 overflow-y-auto no-scrollbar">
        {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => {
                const theme = getThemeStyles(group.themeColor);
                return (
                    <section key={group.title}>
                        <div className="flex items-center gap-2 mb-5">
                            <div className={`w-1 h-3.5 rounded-full ${group.themeColor === 'blue' ? 'bg-blue-400' : group.themeColor === 'emerald' ? 'bg-emerald-400' : 'bg-purple-400'}`}></div>
                            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">{group.title}</h2>
                        </div>
                        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                            {group.items.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleItemClick(item.id)}
                                    className="flex flex-col items-center gap-3 cursor-pointer active:opacity-60 transition-opacity group relative"
                                >
                                    <div className={`w-[64px] h-[64px] rounded-[26px] bg-white flex items-center justify-center border shadow-sm group-hover:-translate-y-1 transition-all duration-300 ${theme.border} ${theme.text} ${theme.shadow}`}>
                                        {renderIcon(item.iconName, 28)}
                                        {item.badge && (
                                          <div className={`absolute -top-1.5 -right-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm border-2 border-white ${item.badge.color}`}>
                                            {item.badge.text}
                                          </div>
                                        )}
                                    </div>
                                    <div className="text-xs font-medium text-slate-700 text-center leading-tight group-hover:text-slate-900 transition-colors">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search size={36} className="mb-3 opacity-20" />
                <p className="text-sm">未找到相关功能</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Work;

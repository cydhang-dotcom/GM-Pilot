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
  HeartHandshake
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
        label: '员工管理', 
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
    const props = { size };
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
      case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-50' };
      case 'emerald': return { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-50' };
      case 'purple': return { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-50' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', iconBg: 'bg-gray-50' };
    }
  };

  return (
    <div className="pb-8 bg-white min-h-full">
      {/* Search Header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 mb-3">工作台</h1>
        <div className="relative">
            <input 
                type="text" 
                placeholder="查找功能或事务..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 border-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="px-4 py-2 space-y-8">
        
        {/* Service Groups - 4 Column Grid */}
        {serviceGroups.map((group) => {
            const theme = getThemeStyles(group.themeColor);
            return (
                <section key={group.title}>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-sm font-bold text-gray-800">{group.title}</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {group.items.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => handleItemClick(item.id)}
                                className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60 transition-opacity group relative"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 ${theme.iconBg} ${theme.text} group-hover:scale-105 transition-transform relative`}>
                                    {renderIcon(item.iconName, 26)}
                                    {item.badge && (
                                      <div className={`absolute -top-2 -right-4 px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm border border-white ${item.badge.color}`}>
                                        {item.badge.text}
                                      </div>
                                    )}
                                </div>
                                <div className="text-xs font-medium text-gray-700 text-center leading-tight">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );
        })}
      </div>
    </div>
  );
};

export default Work;
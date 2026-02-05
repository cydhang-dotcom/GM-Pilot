
import React, { useState } from 'react';
import { User, Phone, HelpCircle, HeartHandshake, MessageSquare, AlertOctagon, ChevronRight, Clock, CheckCircle2, Star, Send, Paperclip, MoreHorizontal } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Mock Data ---

const CONSULTANT = {
    name: 'Jessica Chen',
    role: '资深客户成功经理',
    phone: '138-1234-5678',
    company: '千机网络',
    avatar: 'JC'
};

const MOCK_SERVICE_TICKETS = [
    { 
        id: 't1', 
        title: '关于高新技术企业认定政策咨询', 
        type: '政策咨询', 
        date: '12-10 14:30', 
        status: '已回复', 
        desc: '咨询最新的税收优惠政策及申报条件，特别是关于研发费用加计扣除的比例变化。',
        history: [
            { role: 'user', content: '请问最新的高新认定中，研发费用占比要求是否有变化？', time: '12-10 14:30' },
            { role: 'agent', content: '您好，根据2023年最新指引，占比要求保持不变，但在核算口径上更加严格。具体文件我已发送至您的邮箱，请查收。', time: '12-10 14:45' }
        ]
    },
    { 
        id: 't2', 
        title: '11月薪资计算口径差异确认', 
        type: '口径确认', 
        date: '12-05 09:20', 
        status: '处理中', 
        desc: '关于技术部王强加班费基数核算的疑问，系统计算值与手工表不一致。',
        history: [
            { role: 'user', content: '王强的加班基数系统显示为25000，但我们约定是按基本工资18000核算的。', time: '12-05 09:20' },
            { role: 'agent', content: '收到，正在核对系统配置，稍后回复。', time: '12-05 09:25' }
        ]
    },
    { 
        id: 't3', 
        title: '员工居住证积分协助', 
        type: '员工服务', 
        date: '12-01 16:00', 
        status: '处理中', 
        desc: '协助办理积分申请相关材料盖章。',
        history: []
    },
    { 
        id: 't4', 
        title: '9月个税申报数据异常修正', 
        type: '异常处理', 
        date: '11-20 10:00', 
        status: '已办结', 
        desc: '修正系统导入错误导致的申报差异，需重新申报。',
        history: []
    },
];

// --- Level 3: Ticket Detail ---

const ServiceTicketDetail = ({ ticket, onBack }: { ticket: any, onBack: () => void }) => {
    const isClosed = ticket.status === '已办结';
    
    return (
        <DetailLayout 
            title="服务工单详情" 
            onBack={onBack}
            tag={{ 
                label: ticket.status, 
                color: ticket.status === '已办结' ? 'text-slate-500' : 'text-indigo-600',
                bg: ticket.status === '已办结' ? 'bg-slate-100' : 'bg-indigo-50'
            }}
            bgColor="bg-[#F8F9FB]"
        >
            <div className="space-y-6 pb-24">
                {/* Ticket Info Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                             ticket.type === '政策咨询' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                             ticket.type === '员工服务' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                             'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                            {ticket.type}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{ticket.date}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{ticket.title}</h3>
                    <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                        {ticket.desc}
                    </p>
                </div>

                {/* Timeline / Chat Area */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-3.5 bg-indigo-500 rounded-full"></div>
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">处理进度</h4>
                    </div>
                    
                    <div className="space-y-5">
                        {/* Initial User Request */}
                        <div className="flex flex-row-reverse gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                <User size={16} className="text-slate-500"/>
                            </div>
                            <div className="bg-indigo-600 text-white p-3.5 rounded-2xl rounded-tr-sm shadow-md shadow-indigo-100 max-w-[80%]">
                                <p className="text-xs font-medium leading-relaxed">工单已提交：{ticket.desc}</p>
                            </div>
                        </div>

                        {/* History */}
                        {ticket.history.map((msg: any, idx: number) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm shrink-0 ${
                                    msg.role === 'agent' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {msg.role === 'agent' ? <span className="text-[9px] font-black">CS</span> : <User size={16}/>}
                                </div>
                                <div className={`p-3.5 rounded-2xl shadow-sm max-w-[80%] text-xs font-medium leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-100' 
                                    : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'
                                }`}>
                                    {msg.content}
                                    <p className={`text-[9px] mt-1.5 opacity-60 ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}

                        {/* Status Marker */}
                        {isClosed && (
                            <div className="flex justify-center py-4">
                                <span className="bg-slate-100 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200">
                                    工单已于 11-25 14:00 办结
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50">
                {isClosed ? (
                    <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <Star size={16} className="text-orange-400 fill-orange-400" /> 服务评价
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button className="p-3.5 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 active:bg-slate-100 transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="输入回复内容..." 
                                className="w-full h-full bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-12 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 active:scale-90 transition-transform">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Service Request Board ---

const ServiceRequest: React.FC<{ type: string }> = ({ type }) => {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(type || 'ot-1');

    if (selectedTicket) return <ServiceTicketDetail ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />;

    // Helper to filter tickets, in reality this would be API driven
    const getFilteredTickets = () => {
        const typeMap: Record<string, string> = { 'ot-1': '政策咨询', 'ot-3': '口径确认', 'ot-4': '异常处理', 'ot-5': '员工服务' };
        const label = typeMap[activeTab];
        if (!label) return MOCK_SERVICE_TICKETS;
        return MOCK_SERVICE_TICKETS.filter(t => t.type === label);
    };

    const filteredTickets = getFilteredTickets();

    const ServiceCard = ({ id, icon: Icon, label, color, bg }: any) => {
        const isActive = activeTab === id;
        return (
            <button 
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center p-4 rounded-[24px] border transition-all active:scale-[0.96] relative overflow-hidden group ${
                    isActive 
                    ? 'bg-white border-indigo-200 shadow-md ring-2 ring-indigo-50' 
                    : 'bg-white border-slate-100 shadow-sm hover:border-indigo-100'
                }`}
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-colors ${
                    isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : `${bg} ${color}`
                }`}>
                    <Icon size={22} strokeWidth={2} />
                </div>
                <span className={`text-xs font-black ${isActive ? 'text-indigo-900' : 'text-slate-600'}`}>{label}</span>
                {isActive && <div className="absolute top-0 right-0 p-3 opacity-[0.05] text-indigo-900 pointer-events-none transform rotate-12"><Icon size={60} /></div>}
            </button>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* Consultant Card - V2.0 Airy Gradient */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                
                <div className="relative z-10 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[24px] border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-lg font-black shadow-inner">
                        {CONSULTANT.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold bg-indigo-500/30 border border-indigo-400/30 px-2 py-0.5 rounded-lg text-indigo-100 backdrop-blur-sm">
                                专属顾问
                            </span>
                        </div>
                        <h3 className="text-xl font-black tracking-tight">{CONSULTANT.name}</h3>
                        <p className="text-xs text-indigo-200 mt-0.5 font-medium">{CONSULTANT.role}</p>
                    </div>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono text-indigo-100">
                        <Phone size={14} /> {CONSULTANT.phone}
                    </div>
                    <button className="bg-white text-indigo-900 text-[10px] font-black px-4 py-2 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center gap-1.5">
                        <MessageSquare size={12} strokeWidth={2.5}/> 立即联系
                    </button>
                </div>
            </div>

            {/* Service Matrix */}
            <div>
                 <h3 className="text-sm font-black text-slate-900 mb-4 px-1 flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                    服务类型
                 </h3>
                 <div className="grid grid-cols-2 gap-3">
                     <ServiceCard id="ot-1" label="政策咨询" icon={HelpCircle} color="text-blue-600" bg="bg-blue-50" />
                     <ServiceCard id="ot-5" label="员工服务" icon={HeartHandshake} color="text-rose-600" bg="bg-rose-50" />
                     <ServiceCard id="ot-3" label="口径确认" icon={MessageSquare} color="text-emerald-600" bg="bg-emerald-50" />
                     <ServiceCard id="ot-4" label="异常处理" icon={AlertOctagon} color="text-orange-600" bg="bg-orange-50" />
                 </div>
            </div>

            {/* History List */}
            <div>
                 <div className="flex justify-between items-center mb-4 px-1">
                     <h3 className="text-sm font-black text-slate-900">服务记录</h3>
                     <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 active:scale-95 transition-transform">
                         + 新建工单
                     </button>
                 </div>
                 
                 <div className="space-y-3">
                     {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                         <div 
                            key={ticket.id} 
                            onClick={() => setSelectedTicket(ticket)}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-all cursor-pointer group hover:border-indigo-100"
                         >
                             <div className="flex justify-between items-start mb-2">
                                 <div className="flex items-center gap-2">
                                     {/* 20px Axis: The badge aligns with the title below roughly, but let's make it structured */}
                                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                         ticket.type === '政策咨询' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                         ticket.type === '员工服务' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                         ticket.type === '异常处理' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                         'bg-emerald-50 text-emerald-600 border-emerald-100'
                                     }`}>
                                         {ticket.type}
                                     </span>
                                     <span className="text-[10px] font-mono font-bold text-slate-300">{ticket.date}</span>
                                 </div>
                                 <div className="flex items-center gap-1">
                                     <span className={`text-[10px] font-black ${
                                         ticket.status === '已办结' || ticket.status === '已回复' ? 'text-slate-400' : 'text-indigo-600 animate-pulse'
                                     }`}>
                                         {ticket.status}
                                     </span>
                                     <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                 </div>
                             </div>
                             
                             <h4 className="text-sm font-black text-slate-900 line-clamp-1 mb-1">{ticket.title}</h4>
                             <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
                                 {ticket.desc}
                             </p>
                         </div>
                     )) : (
                         <div className="text-center py-12">
                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                 <MessageSquare size={24} className="text-slate-300" />
                             </div>
                             <p className="text-xs font-bold text-slate-400">暂无相关服务记录</p>
                         </div>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default ServiceRequest;

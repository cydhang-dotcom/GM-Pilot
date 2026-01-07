import React from 'react';
import { User, Phone, HelpCircle, HeartHandshake, MessageSquare, AlertOctagon } from 'lucide-react';

const MOCK_SERVICE_TICKETS = [
    { id: 't1', title: '关于高新技术企业认定政策咨询', type: '政策咨询', date: '12-10', status: '已回复', desc: '咨询最新的税收优惠政策及申报条件...' },
    { id: 't2', title: '11月薪资计算口径差异确认', type: '口径确认', date: '12-05', status: '处理中', desc: '关于加班费基数核算的疑问...' },
    { id: 't3', title: '员工王强居住证积分协助', type: '员工服务', date: '12-01', status: '处理中', desc: '协助办理积分申请相关材料盖章...' },
    { id: 't4', title: '9月个税申报数据异常修正', type: '异常处理', date: '11-20', status: '已办结', desc: '修正系统导入错误导致的申报差异...' },
];

const ServiceRequest: React.FC<{ type: string }> = ({ type }) => {
    // Map URL param to specific highlighted service
    const activeService = 
        type === 'ot-1' ? '政策咨询' :
        type === 'ot-3' ? '口径确认' :
        type === 'ot-4' ? '异常处理' :
        type === 'ot-5' ? '员工服务' : '全部';
    
    // Simple filter logic
    const filteredTickets = activeService === '全部' 
        ? MOCK_SERVICE_TICKETS 
        : MOCK_SERVICE_TICKETS.filter(t => t.type === activeService);

    return (
        <div className="space-y-6">
            {/* Consultant Card */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/20 flex items-center justify-center">
                        <User size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-purple-200 mb-0.5">您的专属服务顾问</p>
                        <h3 className="text-lg font-bold">Jessica Chen</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded flex items-center gap-1">
                                <Phone size={10} /> 138-0000-8888
                            </span>
                        </div>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
            </div>

            {/* Service Menu */}
            <div>
                 <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">发起服务请求</h3>
                 <div className="grid grid-cols-2 gap-3">
                     {[
                         { id: 'ot-1', label: '政策咨询', icon: HelpCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
                         { id: 'ot-5', label: '员工服务', icon: HeartHandshake, color: 'text-rose-600', bg: 'bg-rose-50' },
                         { id: 'ot-3', label: '口径确认', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                         { id: 'ot-4', label: '异常处理', icon: AlertOctagon, color: 'text-orange-600', bg: 'bg-orange-50' },
                     ].map(item => (
                         <button key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
                             type === item.id ? 'bg-white border-purple-500 ring-1 ring-purple-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm'
                         }`}>
                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}>
                                 <item.icon size={20} />
                             </div>
                             <span className="text-xs font-bold text-gray-700">{item.label}</span>
                         </button>
                     ))}
                 </div>
            </div>

            {/* Service Tickets History */}
            <div>
                 <div className="flex justify-between items-center mb-3 px-1">
                     <h3 className="text-sm font-bold text-gray-900">服务记录</h3>
                     <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                         {activeService !== '全部' ? `筛选: ${activeService}` : '全部类型'}
                     </span>
                 </div>
                 <div className="space-y-3">
                     {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                         <div key={ticket.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                             ticket.type === '政策咨询' ? 'bg-blue-50 text-blue-600' :
                                             ticket.type === '员工服务' ? 'bg-rose-50 text-rose-600' :
                                             ticket.type === '异常处理' ? 'bg-orange-50 text-orange-600' :
                                             'bg-emerald-50 text-emerald-600'
                                         }`}>
                                             {ticket.type}
                                         </span>
                                         <span className="text-[10px] text-gray-400">{ticket.date}</span>
                                     </div>
                                     <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{ticket.title}</h4>
                                 </div>
                                 <span className={`text-[10px] font-bold ${
                                     ticket.status === '已办结' || ticket.status === '已回复' ? 'text-gray-400' : 'text-purple-600'
                                 }`}>
                                     {ticket.status}
                                 </span>
                             </div>
                             <p className="text-xs text-gray-500 line-clamp-2 bg-gray-50 p-2 rounded-lg">
                                 {ticket.desc}
                             </p>
                             {ticket.status !== '已办结' && (
                                 <div className="mt-3 text-right">
                                     <button className="text-[10px] text-purple-600 font-bold border border-purple-200 px-3 py-1 rounded-full bg-purple-50">
                                         查看进度
                                     </button>
                                 </div>
                             )}
                         </div>
                     )) : (
                         <div className="text-center py-8 text-gray-400 text-xs">暂无相关记录</div>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default ServiceRequest;
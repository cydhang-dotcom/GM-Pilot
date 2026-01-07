import React, { useState } from 'react';
import { Task, TaskType } from '../types';
import { DetailLayout } from '../components/DetailLayout';
import { 
  CheckCircle2, Clock, CreditCard, Briefcase, Stamp, Banknote, AlertCircle, 
  Wallet, Filter, Users, Files, ArrowLeft, ChevronRight, FileText, User, 
  Check, XCircle, History, Ban, Download, FileSignature
} from 'lucide-react';

// --- MOCK DATA ---
const mockTasks: Task[] = [
  // BILLS
  { id: 'b_service', title: '12月平台服务费账单', description: '待支付 ¥ 5,800.00', deadline: '2023-12-25', type: TaskType.CONFIRM, priority: 'HIGH', source: 'HR Outsourcing' },
  // FINANCE
  { id: 'u_salary', title: '12月工资发放确认', description: '总额 ¥425,000.00，涉及 32 人', deadline: '今天 18:00', type: TaskType.SUBMIT_DATA, priority: 'HIGH', source: 'Finance Outsourcing' },
  // HR GROUP
  { id: 'h1', title: '入职: 技术部-王强', description: '合同签署与材料归档', deadline: '明天', type: TaskType.ACCEPT, priority: 'MEDIUM', source: 'HR Outsourcing' },
  // OA
  { id: 'o1', title: '报销: 市场部-李娜', description: '11月北京出差差旅费', deadline: '无', type: TaskType.PROGRESS, priority: 'LOW', source: 'Internal OA' },
];

const mockOAApprovals = [
  { id: 'o1', title: '报销: 市场部-李娜', type: '报销', amount: '3,240.00', desc: '11月北京出差差旅费', user: '李娜', date: '2023-12-05', status: 'PENDING' },
];

// --- Level 3: Task Detail Views ---

// 1. Bill Detail
const BillDetail = ({ task, onBack }: { task: Task, onBack: () => void }) => (
    <DetailLayout title="账单详情" onBack={onBack} tag={{ label: '待支付', color: 'text-orange-600', bg: 'bg-orange-50' }}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
             <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                 <CreditCard size={32} />
             </div>
             <p className="text-xs text-gray-400 mb-2">待支付金额</p>
             <h2 className="text-4xl font-bold font-mono text-gray-900 mb-6">¥5,800.00</h2>
             
             <div className="space-y-4 text-left">
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">账单项目</span>
                     <span className="text-xs font-bold text-gray-900">平台基础服务费</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">服务周期</span>
                     <span className="text-xs font-bold text-gray-900">2023年12月</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                     <span className="text-xs text-gray-500">收款方</span>
                     <span className="text-xs font-bold text-gray-900">千机网络科技有限公司</span>
                 </div>
             </div>
        </div>
        <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">
            立即支付
        </button>
    </DetailLayout>
);

// 2. OA Detail
const OADetail = ({ item, onBack }: { item: any, onBack: () => void }) => (
    <DetailLayout title="审批详情" onBack={onBack}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                     {item.user.charAt(0)}
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-gray-900">{item.user}</h3>
                     <p className="text-xs text-gray-400">发起于 {item.date}</p>
                 </div>
             </div>
             <div className="py-4 border-t border-gray-50">
                 <p className="text-xs text-gray-400 mb-1">申请类型</p>
                 <p className="text-sm font-bold text-gray-900 mb-4">{item.type}</p>
                 <p className="text-xs text-gray-400 mb-1">申请金额</p>
                 <p className="text-2xl font-bold font-mono text-gray-900 mb-4">¥{item.amount}</p>
                 <p className="text-xs text-gray-400 mb-1">事由</p>
                 <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{item.desc}</p>
             </div>
        </div>
        <div className="flex gap-3">
             <button className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl active:bg-gray-50">驳回</button>
             <button className="flex-[2] py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98]">同意</button>
        </div>
    </DetailLayout>
);

// --- Level 2: List Views ---

type GroupType = 'ENTRY' | 'OA' | null;

const Inbox: React.FC = () => {
    const [activeGroup, setActiveGroup] = useState<GroupType>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedOA, setSelectedOA] = useState<any>(null);

    // Detail Navigation
    if (selectedTask) return <BillDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
    if (selectedOA) return <OADetail item={selectedOA} onBack={() => setSelectedOA(null)} />;

    // Group Navigation
    if (activeGroup === 'OA') {
        return (
            <div className="flex flex-col h-full bg-[#FAFAFA] animate-slide-in-right">
                <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-3">
                    <button onClick={() => setActiveGroup(null)} className="hover:bg-gray-100 rounded-full p-1"><ArrowLeft size={20}/></button>
                    <h1 className="text-lg font-bold text-gray-900">OA 审批</h1>
                </div>
                <div className="p-5 space-y-3 overflow-y-auto">
                    {mockOAApprovals.map(oa => (
                        <div key={oa.id} onClick={() => setSelectedOA(oa)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99]">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h4 className="text-sm font-bold text-gray-900">{oa.title}</h4>
                                     <p className="text-xs text-gray-400 mt-1">{oa.desc}</p>
                                 </div>
                                 <button className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">审批</button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Main Inbox
    return (
        <div className="flex flex-col h-full bg-[#FAFAFA]">
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-5 pt-12 pb-4 border-b border-gray-100/50">
                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">待办事项</h1>
            </div>
            <div className="p-5 space-y-4 overflow-y-auto pb-20">
                 {/* Bill Card */}
                 <div onClick={() => setSelectedTask(mockTasks[0])} className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm"><CreditCard size={20} /></div>
                              <div><h3 className="font-bold text-gray-900 text-sm">{mockTasks[0].title}</h3><p className="text-xs text-gray-500">2023-12</p></div>
                          </div>
                      </div>
                      <div className="flex justify-between items-end">
                          <div><p className="text-xs text-gray-400">待支付</p><p className="text-2xl font-bold text-gray-900">¥5,800</p></div>
                          <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg group-active:bg-indigo-700">去支付</button>
                      </div>
                 </div>

                 {/* Group Card (OA) */}
                 <div onClick={() => setActiveGroup('OA')} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center"><Stamp size={20}/></div>
                      <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900">OA 审批</h4>
                          <p className="text-xs text-gray-400 mt-1">1 个待处理 · 报销、请假</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">1</div>
                      <ChevronRight size={18} className="text-gray-300"/>
                 </div>

                 {/* Other Tasks List */}
                 {mockTasks.slice(1).map(task => {
                     if (task.source === 'Internal OA') return null; // Filter out OA as it is in group
                     return (
                        <div key={task.id} onClick={() => setSelectedTask(task)} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex justify-between items-center active:scale-[0.99] cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    task.type === TaskType.ACCEPT ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                    {task.type === TaskType.ACCEPT ? <FileSignature size={18}/> : <Banknote size={18}/>}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{task.title}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{task.deadline}</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200">处理</button>
                        </div>
                     );
                 })}
            </div>
        </div>
    );
};

export default Inbox;
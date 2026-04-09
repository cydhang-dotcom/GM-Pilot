import React, { useState } from 'react';
import { UserMinus, Search, Filter, ChevronRight, AlertCircle, Clock, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';
import EmployeeOffboarding from '../workstation/hr/EmployeeOffboarding';
import EmployeeDetail from '../workstation/hr/EmployeeDetail';

export type StepStatus = 'pending' | 'processing' | 'done';

interface OffboardingEmployee {
    id: string;
    name: string;
    dept: string;
    role: string;
    offboardDate: string;
    status: StepStatus;
    tasks: {
        social: StepStatus;
        fund: StepStatus;
    };
}

const initialEmployees: OffboardingEmployee[] = [
    { id: '1', name: '王五', dept: '设计部', role: 'UI设计师', offboardDate: '2023-12-20', status: 'pending', tasks: { social: 'pending', fund: 'pending' } },
    { id: '2', name: '赵六', dept: '研发部', role: '前端工程师', offboardDate: '2023-12-25', status: 'processing', tasks: { social: 'processing', fund: 'processing' } },
    { id: '3', name: '孙七', dept: '市场部', role: '营销总监', offboardDate: '2023-12-28', status: 'done', tasks: { social: 'done', fund: 'done' } },
];

const StatusTag = ({ label, status }: { label: string, status: StepStatus }) => (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border transition-colors ${
        status === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
        status === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
        'bg-slate-50 text-slate-400 border-slate-100'
    }`}>
        {status === 'done' ? <CheckCircle2 size={10} strokeWidth={3} /> : 
         status === 'processing' ? <Clock size={10} strokeWidth={3} /> :
         <Circle size={10} strokeWidth={3} />}
        {label}: {status === 'done' ? '办理完成' : status === 'processing' ? '办理中' : '待处理'}
    </div>
);

const OffboardingProcess = ({ onBack }: { onBack: () => void }) => {
    const [employees, setEmployees] = useState<OffboardingEmployee[]>(initialEmployees);
    const [selectedEmp, setSelectedEmp] = useState<OffboardingEmployee | null>(null);
    const [viewEmployeeDetail, setViewEmployeeDetail] = useState<OffboardingEmployee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusChange = (id: string, newStatus: 'pending' | 'processing' | 'done') => {
        setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp));
        if (selectedEmp && selectedEmp.id === id) {
            setSelectedEmp(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    const handleTaskStatusChange = (id: string, task: 'social' | 'fund', newStatus: StepStatus) => {
        setEmployees(prev => prev.map(emp => {
            if (emp.id === id) {
                const updatedTasks = { ...emp.tasks, [task]: newStatus };
                const overallStatus = (updatedTasks.social === 'done' && updatedTasks.fund === 'done') ? 'done' : 
                                      (updatedTasks.social === 'pending' && updatedTasks.fund === 'pending') ? 'pending' : 'processing';
                return { ...emp, tasks: updatedTasks, status: overallStatus };
            }
            return emp;
        }));
        if (selectedEmp && selectedEmp.id === id) {
            setSelectedEmp(prev => {
                if (!prev) return prev;
                const updatedTasks = { ...prev.tasks, [task]: newStatus };
                const overallStatus = (updatedTasks.social === 'done' && updatedTasks.fund === 'done') ? 'done' : 
                                      (updatedTasks.social === 'pending' && updatedTasks.fund === 'pending') ? 'pending' : 'processing';
                return { ...prev, tasks: updatedTasks, status: overallStatus };
            });
        }
    };

    const handleSelectEmp = (emp: OffboardingEmployee) => {
        if (emp.status === 'pending') {
            // Don't auto-update to processing just by clicking, let task changes drive it
            setSelectedEmp(emp);
        } else {
            setSelectedEmp(emp);
        }
    };

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emp.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (viewEmployeeDetail) {
        return <EmployeeDetail employee={viewEmployeeDetail} onBack={() => setViewEmployeeDetail(null)} />;
    }

    if (selectedEmp) {
        // Mock full employee data for the detail view
        const fullEmployee = {
            ...selectedEmp,
            joinDate: '2021-05-10',
            idCard: '310105199001011234',
            phone: '13800138000',
            email: 'wangwu@example.com'
        };
        return <EmployeeOffboarding 
            employee={fullEmployee} 
            onBack={() => setSelectedEmp(null)} 
            initialStep="process" 
            onStatusChange={(status) => handleStatusChange(selectedEmp.id, status)}
            onTaskStatusChange={(task, status) => handleTaskStatusChange(selectedEmp.id, task, status)}
        />;
    }

    const pendingCount = employees.filter(e => e.status === 'pending').length;
    const processingCount = employees.filter(e => e.status === 'processing').length;

    return (
        <DetailLayout title="离职办理" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5">
                {/* Search */}
                <div className="bg-white p-2 rounded-[20px] border border-slate-200 shadow-sm flex items-center gap-2 px-4">
                    <Search size={18} className="text-slate-300" />
                    <input 
                        type="text" 
                        placeholder="搜索离职中员工..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300 h-10 font-bold" 
                    />
                </div>

                {/* List */}
                <div className="space-y-4 pb-20">
                    <div className="flex items-center gap-2 ml-1 mb-2">
                        <div className="w-1 h-3.5 bg-rose-500 rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">当前离职办理 ({filteredEmployees.length})</h3>
                    </div>

                    {filteredEmployees.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm font-bold">
                            没有找到匹配的员工
                        </div>
                    ) : (
                        filteredEmployees.map(emp => (
                            <div 
                                key={emp.id}
                                onClick={() => handleSelectEmp(emp)}
                                className="rounded-[24px] p-5 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden bg-white border-slate-100 hover:border-slate-200"
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div 
                                        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setViewEmployeeDetail(emp);
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border shadow-sm bg-slate-50 text-slate-600 border-slate-200">
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-black text-slate-900">{emp.name}</h4>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-black border ${
                                                    emp.status === 'done' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                                    emp.status === 'pending' ? 'bg-white text-slate-600 border-slate-200' :
                                                    'bg-amber-100 text-amber-700 border-amber-200'
                                                }`}>
                                                    {emp.status === 'done' ? '办理完成' :
                                                     emp.status === 'pending' ? '待处理' :
                                                     '办理中'}
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 mt-0.5">{emp.dept} · {emp.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mb-0.5">离职日期</p>
                                        <p className="text-xs font-black font-mono text-slate-700">{emp.offboardDate}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50 relative z-10">
                                    <StatusTag label="社保" status={emp.tasks.social} />
                                    <StatusTag label="公积金" status={emp.tasks.fund} />
                                </div>

                                <div className="absolute right-4 bottom-4 text-slate-200">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto flex items-center justify-center pb-8">
                 <p className="text-[10px] font-bold text-slate-300">点击员工卡片查看详细办理情况并执行操作</p>
            </div>
        </DetailLayout>
    );
};

export default OffboardingProcess;

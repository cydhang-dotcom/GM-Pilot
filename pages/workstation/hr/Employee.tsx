
import React, { useState } from 'react';
import { Search, ChevronRight, Plus, Users, UserPlus, UserMinus, Filter, Briefcase } from 'lucide-react';
import EmployeeAdd from './EmployeeAdd';
import EmployeeDetail from './EmployeeDetail';

// --- Mock Data ---

export const MOCK_EMPLOYEES = [
  { id: 1, name: '张伟', dept: '技术部', role: '高级工程师', status: '正式', joinDate: '2021-03-15', phone: '13812345678', email: 'zhangwei@company.com', idCard: '31010419900101****', contractEnd: '2024-03-15' },
  { id: 2, name: '李娜', dept: '市场部', role: '市场经理', status: '正式', joinDate: '2022-06-01', phone: '13987654321', email: 'lina@company.com', idCard: '31010419920505****', contractEnd: '2025-06-01' },
  { id: 3, name: '王强', dept: '技术部', role: '前端开发', status: '试用', joinDate: '2023-11-10', phone: '15000000000', email: 'wangqiang@company.com', idCard: '32050119950808****', contractEnd: '2026-11-10' },
  { id: 4, name: '陈杰', dept: '设计部', role: 'UI设计师', status: '正式', joinDate: '2022-09-01', phone: '13711112222', email: 'chenjie@company.com', idCard: '31011519961212****', contractEnd: '2025-09-01' },
];

// --- Level 2: Dashboard View ---

const Employee: React.FC = () => {
    const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
    const [selectedEmp, setSelectedEmp] = useState<any | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddEmployee = (newEmp: any) => {
        setEmployees([newEmp, ...employees]);
        setIsAdding(false);
    };

    const probationCount = employees.filter(e => e.status === '试用').length;

    if (isAdding) return <EmployeeAdd onBack={() => setIsAdding(false)} onSave={handleAddEmployee} />;
    if (selectedEmp) return <EmployeeDetail employee={selectedEmp} onBack={() => setSelectedEmp(null)} />;

    return (
        <div className="space-y-6 animate-fade-in pb-24">
            {/* 1. Stats Overview Card (Redesigned) */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-indigo-900 pointer-events-none transform rotate-12">
                    <Users size={140} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                            <Briefcase size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-900">人力资源概览</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Human Resources</p>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-8 pl-1">
                        <span className="text-5xl font-black font-mono text-slate-900 tracking-tighter">{employees.length}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">在职员工 (人)</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-emerald-600"><UserPlus size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-emerald-800/70 uppercase">本月入职</p>
                            <p className="text-base font-black font-mono text-emerald-700">+3</p>
                        </div>
                        <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-rose-600"><UserMinus size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-rose-800/70 uppercase">本月离职</p>
                            <p className="text-base font-black font-mono text-rose-700">-1</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100 flex flex-col items-center justify-center gap-1">
                            <div className="text-blue-600"><Users size={16} strokeWidth={2.5}/></div>
                            <p className="text-[10px] font-bold text-blue-800/70 uppercase">试用期</p>
                            <p className="text-base font-black font-mono text-blue-700">{probationCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Search & Filter Bar */}
            <div className="flex gap-3 px-1">
                <div className="bg-white flex-1 p-3 rounded-[20px] border border-slate-200 shadow-sm flex items-center gap-3 transition-all focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50/50">
                    <Search size={18} className="text-slate-300 ml-1" strokeWidth={2.5} />
                    <input 
                        type="text" 
                        placeholder="搜索姓名、部门..." 
                        className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300 font-bold bg-transparent"
                    />
                </div>
                <button className="bg-white w-12 rounded-[20px] border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 active:scale-95 active:bg-slate-50 transition-all">
                    <Filter size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* 3. Employee List */}
            <div className="space-y-3">
                {employees.map(emp => (
                    <div 
                        key={emp.id} 
                        onClick={() => setSelectedEmp(emp)} 
                        className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group hover:border-indigo-100 relative overflow-hidden"
                    >
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border shadow-sm transition-colors ${
                            emp.status === '正式' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                            {emp.name.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-black text-slate-900 truncate">{emp.name}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-black border ${
                                    emp.status === '正式' 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                    : 'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {emp.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-xs font-bold text-slate-500 truncate">{emp.dept} · {emp.role}</p>
                                <p className="text-[10px] font-bold font-mono text-slate-300 flex items-center gap-2">
                                    <span>{emp.phone}</span>
                                    <span className="w-0.5 h-2 bg-slate-200 rounded-full"></span>
                                    <span>{emp.joinDate} 入职</span>
                                </p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                ))}
            </div>

            {/* Extended FAB */}
            <div className="fixed bottom-24 right-6 z-40">
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-indigo-600 text-white pl-5 pr-6 py-4 rounded-full flex items-center gap-3 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all group hover:bg-indigo-700 hover:shadow-indigo-600/40"
                >
                    <div className="bg-white/20 p-1 rounded-full backdrop-blur-md">
                        <Plus size={18} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black tracking-tight">新增员工</span>
                </button>
            </div>
        </div>
    );
};

export default Employee;


import React, { useState } from 'react';
import { Search, ChevronRight, Plus } from 'lucide-react';
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

    if (isAdding) return <EmployeeAdd onBack={() => setIsAdding(false)} onSave={handleAddEmployee} />;
    if (selectedEmp) return <EmployeeDetail employee={selectedEmp} onBack={() => setSelectedEmp(null)} />;

    return (
        <div className="space-y-5 animate-fade-in pb-20">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm text-center flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">在职员工</p>
                    <p className="text-2xl font-black font-mono text-slate-900">{employees.length}</p>
                </div>
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm text-center flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">本月入职</p>
                    <p className="text-2xl font-black font-mono text-emerald-600">+{3 + (employees.length - MOCK_EMPLOYEES.length)}</p>
                </div>
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm text-center flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">本月离职</p>
                    <p className="text-2xl font-black font-mono text-rose-600">-1</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3">
                <Search size={18} className="text-slate-300" />
                <input type="text" placeholder="搜索姓名、部门..." className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300 font-medium"/>
            </div>

            {/* List */}
            <div className="space-y-3 pb-4">
                {employees.map(emp => (
                    <div key={emp.id} onClick={() => setSelectedEmp(emp)} className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.99] transition-all cursor-pointer group hover:border-indigo-100">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shrink-0 border border-indigo-100 shadow-sm">
                            {emp.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                                <h4 className="text-sm font-black text-slate-900">{emp.name}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-black ${emp.status === '正式' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {emp.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-xs font-bold text-slate-400 truncate">{emp.dept} · {emp.role}</p>
                                <p className="text-[10px] font-bold font-mono text-slate-300">{emp.phone}</p>
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
                    className="bg-indigo-600 text-white pl-4 pr-6 py-3.5 rounded-full flex items-center gap-3 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all group hover:bg-indigo-700"
                >
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                        <Plus size={18} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black tracking-tight">新增员工</span>
                </button>
            </div>
        </div>
    );
};

export default Employee;

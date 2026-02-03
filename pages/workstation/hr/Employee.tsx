
import React, { useState } from 'react';
import { Search, ChevronRight, UserPlus, Plus } from 'lucide-react';
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
        <div className="space-y-4 animate-fade-in pb-20">
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">在职员工</p>
                    <p className="text-lg font-bold text-gray-900">{employees.length}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">本月入职</p>
                    <p className="text-lg font-bold text-emerald-600">+{3 + (employees.length - MOCK_EMPLOYEES.length)}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">本月离职</p>
                    <p className="text-lg font-bold text-rose-600">-1</p>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="搜索姓名、部门..." className="flex-1 text-xs outline-none text-gray-700 placeholder-gray-300"/>
                </div>
            </div>

            <div className="space-y-3 pb-4">
                {employees.map(emp => (
                    <div key={emp.id} onClick={() => setSelectedEmp(emp)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] transition-transform cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">{emp.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-gray-900">{emp.name}</h4>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${emp.status === '正式' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{emp.status}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{emp.dept} · {emp.role}</p>
                            <p className="text-xs text-gray-300 mt-1 font-mono">{emp.phone}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                ))}
            </div>

            {/* Extended FAB - Floating Action Button for Add Employee */}
            <div className="fixed bottom-24 right-6 z-40">
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-indigo-600 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 shadow-2xl shadow-indigo-400/40 active:scale-95 transition-all group"
                >
                    <div className="bg-white/20 p-1 rounded-full">
                        <Plus size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black tracking-tight">新增员工</span>
                </button>
            </div>
        </div>
    );
};

export default Employee;

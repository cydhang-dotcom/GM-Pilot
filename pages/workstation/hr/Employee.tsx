import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Types & Data ---

const MOCK_EMPLOYEES = [
  { id: 1, name: '张伟', dept: '技术部', role: '高级工程师', status: '正式', joinDate: '2021-03-15', phone: '13812345678', email: 'zhangwei@company.com', idCard: '31010419900101****', contractEnd: '2024-03-15' },
  { id: 2, name: '李娜', dept: '市场部', role: '市场经理', status: '正式', joinDate: '2022-06-01', phone: '13987654321', email: 'lina@company.com', idCard: '31010419920505****', contractEnd: '2025-06-01' },
  { id: 3, name: '王强', dept: '技术部', role: '前端开发', status: '试用', joinDate: '2023-11-10', phone: '15000000000', email: 'wangqiang@company.com', idCard: '32050119950808****', contractEnd: '2026-11-10' },
  { id: 4, name: '陈杰', dept: '设计部', role: 'UI设计师', status: '正式', joinDate: '2022-09-01', phone: '13711112222', email: 'chenjie@company.com', idCard: '31011519961212****', contractEnd: '2025-09-01' },
];

// --- Level 3: Detail View ---

const EmployeeDetail = ({ employee, onBack }: { employee: typeof MOCK_EMPLOYEES[0], onBack: () => void }) => {
    return (
        <DetailLayout
            title="员工档案"
            onBack={onBack}
            tag={{ 
                label: employee.status, 
                color: employee.status === '正式' ? 'text-emerald-600' : 'text-blue-600',
                bg: employee.status === '正式' ? 'bg-emerald-50' : 'bg-blue-50'
            }}
            bgColor="bg-gray-50"
        >
            {/* Header Profile */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-50 to-white -z-10"></div>
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-md border-4 border-white mb-3">
                    {employee.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-sm text-gray-500 mt-1 mb-4">{employee.dept} · {employee.role}</p>
                <div className="flex gap-3 w-full">
                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <Phone size={14} /> 呼叫
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <Mail size={14} /> 邮件
                    </button>
                </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-5 py-2">
                <div className="py-3 border-b border-gray-50 flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="text-sm font-bold text-gray-900">基本信息</span>
                </div>
                <div className="py-3 flex justify-between">
                    <span className="text-xs text-gray-500">工号</span>
                    <span className="text-xs font-bold text-gray-900">EMP-{String(employee.id).padStart(3, '0')}</span>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-50">
                    <span className="text-xs text-gray-500">入职日期</span>
                    <span className="text-xs font-bold text-gray-900">{employee.joinDate}</span>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-50">
                    <span className="text-xs text-gray-500">身份证号</span>
                    <span className="text-xs font-bold text-gray-900 font-mono">{employee.idCard}</span>
                </div>
            </div>

            {/* Contract Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-5 py-2">
                <div className="py-3 border-b border-gray-50 flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm font-bold text-gray-900">合同信息</span>
                </div>
                <div className="py-3 flex justify-between">
                    <span className="text-xs text-gray-500">合同类型</span>
                    <span className="text-xs font-bold text-gray-900">固定期限劳动合同</span>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-50">
                    <span className="text-xs text-gray-500">合同到期日</span>
                    <span className="text-xs font-bold text-gray-900">{employee.contractEnd}</span>
                </div>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Dashboard View ---

const Employee: React.FC = () => {
    const [selectedEmp, setSelectedEmp] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);

    if (selectedEmp) return <EmployeeDetail employee={selectedEmp} onBack={() => setSelectedEmp(null)} />;

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">在职员工</p>
                    <p className="text-lg font-bold text-gray-900">32</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">本月入职</p>
                    <p className="text-lg font-bold text-emerald-600">+3</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[10px] text-gray-400 mb-1">本月离职</p>
                    <p className="text-lg font-bold text-rose-600">-1</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="搜索姓名、部门..." className="flex-1 text-xs outline-none text-gray-700 placeholder-gray-300"/>
            </div>

            {/* List */}
            <div className="space-y-3 pb-4">
                {MOCK_EMPLOYEES.map(emp => (
                    <div 
                        key={emp.id} 
                        onClick={() => setSelectedEmp(emp)}
                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.99] transition-transform cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                            {emp.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                 <h4 className="text-sm font-bold text-gray-900">{emp.name}</h4>
                                 <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                     emp.status === '正式' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                 }`}>{emp.status}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{emp.dept} · {emp.role}</p>
                            <p className="text-[10px] text-gray-300 mt-1">入职: {emp.joinDate}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employee;

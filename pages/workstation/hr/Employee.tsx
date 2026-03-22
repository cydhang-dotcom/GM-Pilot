import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronRight, Plus, Users, UserPlus, UserMinus, Filter, Briefcase, XCircle } from 'lucide-react';
import EmployeeAdd from './EmployeeAdd';
import EmployeeDetail from './EmployeeDetail';

// --- Mock Data ---

export const MOCK_EMPLOYEES = [
  { id: 1, name: '张伟', dept: '技术部', role: '高级工程师', status: '正式', joinDate: '2021-03-15', phone: '13812345678', email: 'zhangwei@company.com', idCard: '31010419900101****', contractEnd: '2024-03-15', tasks: { social: 'done', fund: 'done' } },
  { id: 2, name: '李娜', dept: '市场部', role: '市场经理', status: '正式', joinDate: '2022-06-01', phone: '13987654321', email: 'lina@company.com', idCard: '31010419920505****', contractEnd: '2025-06-01', tasks: { social: 'pending', fund: 'pending' } },
  { id: 3, name: '王强', dept: '技术部', role: '前端开发', status: '试用', joinDate: '2023-11-10', phone: '15000000000', email: 'wangqiang@company.com', idCard: '32050119950808****', contractEnd: '2026-11-10', tasks: { social: 'processing', fund: 'pending' } },
  { id: 4, name: '陈杰', dept: '设计部', role: 'UI设计师', status: '正式', joinDate: '2022-09-01', phone: '13711112222', email: 'chenjie@company.com', idCard: '31011519961212****', contractEnd: '2025-09-01', tasks: { social: 'done', fund: 'processing' } },
  { id: 5, name: '赵六', dept: '行政部', role: '行政主管', status: '离职', joinDate: '2020-05-20', phone: '13599998888', email: 'zhaoliu@company.com', idCard: '31010419880101****', contractEnd: '2023-12-05', tasks: { social: 'processing', fund: 'processing' } },
  { id: 6, name: '周晓', dept: '技术部', role: '测试工程师', status: '正式', joinDate: '2023-12-01', phone: '18800001111', email: 'zhouxiao@company.com', idCard: '31010419980101****', contractEnd: '2026-12-01', tasks: { social: 'pending', fund: 'pending' } },
  { id: 7, name: '孙七', dept: '技术部', role: '后端开发', status: '正式', joinDate: '2022-01-01', phone: '13300001111', email: 'sunqi@company.com', idCard: '31010419950101****', contractEnd: '2025-01-01', tasks: { social: 'done', fund: 'done' } },
  { id: 8, name: '王五', dept: '市场部', role: '市场专员', status: '正式', joinDate: '2023-01-01', phone: '13300002222', email: 'wangwu@company.com', idCard: '31010419960101****', contractEnd: '2026-01-01', tasks: { social: 'pending', fund: 'pending' } },
];

// --- Level 2: Dashboard View ---

const Employee: React.FC = () => {
    const location = useLocation();
    const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
    const [selectedEmp, setSelectedEmp] = useState<any | null>(null);
    const [isAdding, setIsAdding] = useState(location.state?.action === 'add');
    const [filterMode, setFilterMode] = useState<'all' | 'new' | 'leaving' | 'probation'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (location.state?.action === 'add') {
            setIsAdding(true);
        }
    }, [location.state]);

    const handleAddEmployee = (newEmp: any) => {
        setEmployees([newEmp, ...employees]);
        setIsAdding(false);
    };

    // Derived Data
    const stats = useMemo(() => {
        const inService = employees.filter(e => e.status !== '离职');
        const newThisMonth = employees.filter(e => e.joinDate.startsWith('2023-12') || e.joinDate.startsWith('2024-01'));
        const leaving = employees.filter(e => e.status === '离职');
        const probation = employees.filter(e => e.status === '试用');
        return {
            total: inService.length,
            new: newThisMonth.length,
            leaving: leaving.length,
            probation: probation.length
        };
    }, [employees]);

    const filteredEmployees = useMemo(() => {
        let result = [...employees];
        
        // 1. Category Filter from Header Cards
        if (filterMode === 'all') {
            result = result.filter(e => e.status !== '离职');
        } else if (filterMode === 'new') {
            result = result.filter(e => e.joinDate.startsWith('2023-12') || e.joinDate.startsWith('2024-01'));
        } else if (filterMode === 'leaving') {
            result = result.filter(e => e.status === '离职');
        } else if (filterMode === 'probation') {
            result = result.filter(e => e.status === '试用');
        }

        // 2. Search Query
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(e => 
                e.name.toLowerCase().includes(q) || 
                e.dept.toLowerCase().includes(q) || 
                e.role.toLowerCase().includes(q)
            );
        }

        return result;
    }, [employees, filterMode, searchQuery]);

    if (isAdding) return <EmployeeAdd onBack={() => setIsAdding(false)} onSave={handleAddEmployee} />;
    if (selectedEmp) return <EmployeeDetail employee={selectedEmp} onBack={() => setSelectedEmp(null)} />;

    const filterLabels: Record<string, string> = {
        'all': '在职员工',
        'new': '本月入职',
        'leaving': '本月离职',
        'probation': '试用期人员'
    };

    return (
        <div className="space-y-6 animate-fade-in pb-24">
            {/* 1. Stats Overview Card (Clickable Filters) */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
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

                    <div 
                        onClick={() => setFilterMode('all')}
                        className={`inline-flex items-baseline gap-2 mb-8 pl-1 cursor-pointer transition-all active:scale-95 ${filterMode === 'all' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                    >
                        <span className="text-5xl font-black font-mono text-slate-900 tracking-tighter">{stats.total}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">在职员工 (人)</span>
                        {filterMode === 'all' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse ml-1 mb-2"></div>}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div 
                            onClick={() => setFilterMode('new')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'new' 
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}
                        >
                            <div className={filterMode === 'new' ? 'text-white' : 'text-emerald-600'}><UserPlus size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'new' ? 'text-emerald-50' : 'text-emerald-800/70'}`}>本月入职</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'new' ? 'text-white' : 'text-emerald-700'}`}>+{stats.new}</p>
                        </div>
                        
                        <div 
                            onClick={() => setFilterMode('leaving')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'leaving' 
                                ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-100' 
                                : 'bg-rose-50 text-rose-600 border-rose-100'
                            }`}
                        >
                            <div className={filterMode === 'leaving' ? 'text-white' : 'text-rose-600'}><UserMinus size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'leaving' ? 'text-rose-50' : 'text-rose-800/70'}`}>本月离职</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'leaving' ? 'text-white' : 'text-rose-700'}`}>-{stats.leaving}</p>
                        </div>

                        <div 
                            onClick={() => setFilterMode('probation')}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                                filterMode === 'probation' 
                                ? 'bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-100' 
                                : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}
                        >
                            <div className={filterMode === 'probation' ? 'text-white' : 'text-blue-600'}><Users size={16} strokeWidth={2.5}/></div>
                            <p className={`text-[10px] font-bold uppercase ${filterMode === 'probation' ? 'text-blue-50' : 'text-blue-800/70'}`}>试用期</p>
                            <p className={`text-base font-black font-mono ${filterMode === 'probation' ? 'text-white' : 'text-blue-700'}`}>{stats.probation}</p>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="bg-white w-12 rounded-[20px] border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 active:scale-95 active:bg-slate-50 transition-all">
                    <Filter size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* 3. Filter Result Header */}
            {filterMode !== 'all' && (
                <div className="px-2 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">正在查看:</span>
                        <span className={`text-xs font-black px-2 py-1 rounded-lg border shadow-sm ${
                            filterMode === 'new' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            filterMode === 'leaving' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                            {filterLabels[filterMode]} ({filteredEmployees.length})
                        </span>
                    </div>
                    <button 
                        onClick={() => setFilterMode('all')}
                        className="text-[10px] font-black text-slate-400 flex items-center gap-1 hover:text-slate-600 transition-colors"
                    >
                        <XCircle size={12} /> 清空筛选
                    </button>
                </div>
            )}

            {/* 4. Employee List */}
            <div className="space-y-3">
                {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
                    <div 
                        key={emp.id} 
                        onClick={() => setSelectedEmp(emp)} 
                        className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group hover:border-indigo-100 relative overflow-hidden"
                    >
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border shadow-sm transition-colors ${
                            emp.status === '正式' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : emp.status === '试用'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                            {emp.name.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-black text-slate-900 truncate">{emp.name}</h4>
                                <div className="flex items-center gap-2">
                                    {emp.tasks && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-black border ${
                                            emp.tasks.social === 'done' && emp.tasks.fund === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            emp.tasks.social === 'pending' && emp.tasks.fund === 'pending' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {emp.tasks.social === 'done' && emp.tasks.fund === 'done' ? '办理完成' :
                                             emp.tasks.social === 'pending' && emp.tasks.fund === 'pending' ? '待处理' :
                                             '办理中'}
                                        </span>
                                    )}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black border ${
                                        emp.status === '正式' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : emp.status === '试用'
                                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                                        : 'bg-slate-50 text-slate-500 border-slate-200'
                                    }`}>
                                        {emp.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-xs font-bold text-slate-500 truncate">{emp.dept} · {emp.role}</p>
                                <p className="text-[10px] font-bold font-mono text-slate-300 flex items-center gap-2">
                                    <span>{emp.phone}</span>
                                    <span className="w-0.5 h-2 bg-slate-200 rounded-full"></span>
                                    <span>{emp.status === '离职' ? '离职日期' : '入职日期'}: {emp.status === '离职' ? emp.contractEnd : emp.joinDate}</span>
                                </p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                )) : (
                    <div className="py-20 text-center space-y-3 opacity-30">
                        <div className="flex justify-center"><Users size={48} className="text-slate-300" /></div>
                        <p className="text-sm font-bold text-slate-400">暂无符合条件的员工</p>
                    </div>
                )}
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
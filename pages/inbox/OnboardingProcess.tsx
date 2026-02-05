
import React, { useState } from 'react';
import { Search, CheckCircle2, Circle, AlertCircle, QrCode, ChevronRight } from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';
import OnboardingDetail from './OnboardingDetail';

export interface OnboardingEmployee {
    id: string;
    name: string;
    dept: string;
    role: string;
    joinDate: string;
    idCard: string;
    phone: string;
    salary: string;
    source: 'qr' | 'manual';
    steps: {
        info: boolean;
        contract: boolean;
        tax: boolean;
        social: boolean;
    };
}

const MOCK_ONBOARDING_LIST: OnboardingEmployee[] = [
    { id: 'o1', name: '王强', dept: '技术部', role: '前端开发', joinDate: '2023-12-15', idCard: '32050119950808****', phone: '15000000000', salary: '25,000.00', source: 'manual', steps: { info: true, contract: false, tax: false, social: false } },
    { id: 'o2', name: '张三', dept: '设计部', role: 'UI设计师', joinDate: '2023-12-20', idCard: '31011519961212****', phone: '13711112222', salary: '18,000.00', source: 'manual', steps: { info: true, contract: false, tax: true, social: true } },
    { id: 'o3', name: '李四', dept: '', role: '', joinDate: '2023-12-25', idCard: '31010419900101****', phone: '13812345678', salary: '', source: 'qr', steps: { info: false, contract: false, tax: false, social: false } },
];

const StatusTag = ({ label, done }: { label: string, done: boolean }) => (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border transition-colors ${
        done ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
    }`}>
        {done ? <CheckCircle2 size={10} strokeWidth={3} /> : <Circle size={10} strokeWidth={3} />}
        {label}
    </div>
);

const OnboardingProcess: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [employees, setEmployees] = useState(MOCK_ONBOARDING_LIST);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleUpdate = (updated: OnboardingEmployee) => {
        setEmployees(employees.map(e => e.id === updated.id ? updated : e));
    };

    if (selectedId) {
        const emp = employees.find(e => e.id === selectedId);
        if (emp) return <OnboardingDetail employee={emp} onBack={() => setSelectedId(null)} onUpdate={handleUpdate} />;
    }

    return (
        <DetailLayout title="入职办理中心" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-5">
                {/* Search */}
                <div className="bg-white p-2 rounded-[20px] border border-slate-200 shadow-sm flex items-center gap-2 px-4">
                    <Search size={18} className="text-slate-300" />
                    <input type="text" placeholder="搜索入职中员工..." className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300 h-10 font-bold" />
                </div>

                {/* List */}
                <div className="space-y-4 pb-20">
                    <div className="flex items-center gap-2 ml-1 mb-2">
                        <div className="w-1 h-3.5 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">当前入职中 ({employees.length})</h3>
                    </div>
                    
                    {employees.map(emp => {
                        const allDone = emp.steps.info && emp.steps.contract && emp.steps.tax && emp.steps.social;
                        const isQR = emp.source === 'qr';
                        const isMissingInfo = isQR && (!emp.dept || !emp.salary);

                        return (
                            <div key={emp.id} onClick={() => setSelectedId(emp.id)} className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden hover:border-indigo-100">
                                {isQR && (
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-indigo-900 pointer-events-none transform rotate-12">
                                        <QrCode size={80} />
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar aligned to 20px axis visually */}
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border shadow-sm ${
                                            isQR ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                        }`}>
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="text-sm font-black text-slate-900">{emp.name}</h4>
                                                {isQR && <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 flex items-center gap-0.5"><QrCode size={10} /> 扫码</span>}
                                            </div>
                                            {isMissingInfo ? (
                                                <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded w-fit mt-1 border border-rose-100 animate-pulse"><AlertCircle size={10} /> 待补齐岗职及薪资</p>
                                            ) : (
                                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{emp.dept} · {emp.role}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mb-0.5">拟入职</p>
                                        <p className="text-xs font-black font-mono text-slate-700">{emp.joinDate}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50 relative z-10">
                                    <StatusTag label="资料" done={emp.steps.info} />
                                    <StatusTag label="合同" done={emp.steps.contract} />
                                    <StatusTag label="个税" done={emp.steps.tax} />
                                    <StatusTag label="社保" done={emp.steps.social} />
                                </div>
                                
                                <div className="absolute right-4 bottom-4 text-slate-200">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto flex items-center justify-center pb-8">
                 <p className="text-[10px] font-bold text-slate-300">点击员工卡片查看详细办理情况并执行操作</p>
            </div>
        </DetailLayout>
    );
};

export default OnboardingProcess;

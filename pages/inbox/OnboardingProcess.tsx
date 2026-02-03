
import React, { useState } from 'react';
import { Search, CheckCircle2, Circle, AlertCircle, QrCode } from 'lucide-react';
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
    <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold border transition-colors ${
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
        <DetailLayout title="入职办理中心" onBack={onBack} bgColor="bg-gray-50">
            <div className="space-y-4">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Search size={16} className="text-gray-300" />
                    <input type="text" placeholder="搜索入职中员工..." className="text-xs outline-none flex-1 text-gray-700" />
                </div>

                <div className="space-y-3 pb-20">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">当前入职中 ({employees.length})</h3>
                    {employees.map(emp => {
                        const allDone = emp.steps.info && emp.steps.contract && emp.steps.tax && emp.steps.social;
                        const isQR = emp.source === 'qr';
                        const isMissingInfo = isQR && (!emp.dept || !emp.salary);

                        return (
                            <div key={emp.id} onClick={() => setSelectedId(emp.id)} className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden">
                                {isQR && <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/5 -mr-4 -mt-4 rounded-full flex items-end justify-start p-3 text-indigo-600/30"><QrCode size={16} /></div>}
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shrink-0 border shadow-sm ${
                                            isQR ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                        }`}>
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h4 className="text-sm font-black text-gray-900">{emp.name}</h4>
                                                {isQR && <span className="text-[9px] font-black bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded flex items-center gap-0.5"><QrCode size={8} /> 扫码入职</span>}
                                            </div>
                                            {isMissingInfo ? (
                                                <p className="text-[10px] font-bold text-rose-500 mt-0.5 flex items-center gap-1"><AlertCircle size={10} /> 待补齐岗职及薪资</p>
                                            ) : (
                                                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{emp.dept} · {emp.role}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">拟入职</p>
                                        <p className="text-xs font-black font-mono text-slate-900">{emp.joinDate}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">
                                    <StatusTag label="资料采集" done={emp.steps.info} />
                                    <StatusTag label="合同签署" done={emp.steps.contract} />
                                    <StatusTag label="个税申报" done={emp.steps.tax} />
                                    <StatusTag label="社保缴纳" done={emp.steps.social} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto flex items-center justify-center">
                 <p className="text-[10px] font-bold text-gray-400">点击员工卡片查看详细办理情况并执行操作</p>
            </div>
        </DetailLayout>
    );
};

export default OnboardingProcess;

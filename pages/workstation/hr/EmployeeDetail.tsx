
import React, { useState } from 'react';
import { Phone, Mail, Briefcase, ChevronRight, Eye, EyeOff, ShieldCheck, Banknote, FileSignature, UserX, UserCheck, Edit3 } from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';
import EmployeeEdit from './EmployeeEdit';
import EmployeeOffboarding from './EmployeeOffboarding';

interface EmployeeDetailProps {
    employee: any;
    onBack: () => void;
}

const InfoSection = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/30 flex items-center gap-2">
            <Icon size={14} className="text-indigo-500" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{title}</span>
        </div>
        <div className="px-5 py-2">{children}</div>
    </div>
);

const DetailRow = ({ label, value, isMono = false, isSensitive = false, isVisible = true }: any) => (
    <div className="py-3 flex justify-between items-baseline border-b border-gray-50 last:border-0">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`text-xs font-bold text-gray-900 ${isMono ? 'font-mono' : ''} ${isSensitive && !isVisible ? 'blur-md select-none opacity-40' : ''}`}>
            {value || '--'}
        </span>
    </div>
);

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onBack }) => {
    const [showSensitive, setShowSensitive] = useState(false);
    const [viewMode, setViewMode] = useState<'detail' | 'edit' | 'offboarding'>('detail');

    if (viewMode === 'edit') return <EmployeeEdit employee={employee} onBack={() => setViewMode('detail')} />;
    if (viewMode === 'offboarding') return <EmployeeOffboarding employee={employee} onBack={() => setViewMode('detail')} />;

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
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-50 to-white -z-0"></div>
                <div className="relative z-10 w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-md border-4 border-white mb-3">
                    {employee.name.charAt(0)}
                </div>
                <h2 className="relative z-10 text-xl font-bold text-gray-900">{employee.name}</h2>
                <p className="relative z-10 text-sm text-gray-500 mt-1 mb-6">{employee.dept} · {employee.role}</p>
                <div className="relative z-10 flex gap-3 w-full">
                    <button className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-gray-200">
                        <Phone size={14} /> 呼叫
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-white text-gray-700 font-bold text-xs flex items-center justify-center gap-2 border border-gray-200 active:scale-95 transition-all">
                        <Mail size={14} /> 邮件
                    </button>
                </div>
            </div>

            {/* Basic Info */}
            <InfoSection title="基本资料" icon={ShieldCheck}>
                <DetailRow label="工号" value={`EMP-${String(employee.id).slice(-4)}`} isMono />
                <DetailRow label="身份证号" value={employee.idCard} isMono />
                <DetailRow label="手机号码" value={employee.phone} isMono />
            </InfoSection>

            {/* Job Info */}
            <InfoSection title="岗职信息" icon={Briefcase}>
                <DetailRow label="部门" value={employee.dept} />
                <DetailRow label="岗位" value={employee.role} />
                <DetailRow label="入职日期" value={employee.joinDate} isMono />
                <DetailRow label="当前状态" value={employee.status} />
            </InfoSection>

            {/* Salary & Benefits - Privacy Mode */}
            <InfoSection title="薪酬福利" icon={Banknote}>
                <div className="flex justify-end mb-1">
                    <button 
                        onClick={() => setShowSensitive(!showSensitive)}
                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded"
                    >
                        {showSensitive ? <EyeOff size={10}/> : <Eye size={10}/>}
                        {showSensitive ? '隐藏敏感信息' : '显示薪资数据'}
                    </button>
                </div>
                <DetailRow label="核定月薪" value={`¥ ${employee.salary || '25,000.00'}`} isMono isSensitive isVisible={showSensitive} />
                <DetailRow label="个税基数" value={`¥ ${employee.taxBase || '25,000.00'}`} isMono isSensitive isVisible={showSensitive} />
                <DetailRow label="社保基数" value={`¥ ${employee.socialBase || '25,000.00'}`} isMono isSensitive isVisible={showSensitive} />
            </InfoSection>

            {/* Contract Info */}
            <InfoSection title="合同信息" icon={FileSignature}>
                <DetailRow label="合同期限" value="3年" />
                <DetailRow label="试用期限" value="3个月" />
                <DetailRow label="到期日期" value={employee.contractEnd} isMono />
            </InfoSection>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8 mb-12">
                <button 
                    onClick={() => setViewMode('edit')}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors gap-2"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Edit3 size={20}/></div>
                    <span className="text-xs font-bold text-gray-700">修改资料</span>
                </button>
                <button 
                    onClick={() => setViewMode('offboarding')}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors gap-2"
                >
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><UserX size={20}/></div>
                    <span className="text-xs font-bold text-gray-700">办理离职</span>
                </button>
            </div>

            <div className="text-center pb-10 opacity-30">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Archive updated at {new Date().toLocaleDateString()}</p>
            </div>
        </DetailLayout>
    );
};

export default EmployeeDetail;

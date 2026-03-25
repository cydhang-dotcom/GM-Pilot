import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Phone, Mail, Briefcase, ChevronRight, Eye, EyeOff, ShieldCheck, 
    UserX, Edit3, User, MapPin, CreditCard, GraduationCap, History, 
    AlertCircle, Fingerprint, Home, Landmark, X, Check, Calendar, 
    PhoneCall, UserSquare2, FileSignature, ExternalLink, Award, Clock,
    RotateCcw, LayoutList, History as HistoryIcon, Layers, MoveRight
} from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';
import EmployeeOffboarding from './EmployeeOffboarding';
import ContractInitiation from './ContractInitiation';

interface EmployeeDetailProps {
    employee: any;
    onBack: () => void;
}

// 统一弹窗组件
const SectionModal = ({ title, isOpen, onClose, onSave, isEditing, setIsEditing, children, viewContent }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-t-[32px] shadow-2xl relative z-10 animate-slide-up flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center shrink-0">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        {isEditing ? `修改${title}` : `${title}详情`}
                    </h3>
                    <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 active:scale-90"><X size={20}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32">
                    {isEditing ? children : viewContent}
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 sticky bottom-0 flex gap-3">
                    {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-500 font-black text-sm">返回预览</button>
                            <button onClick={onSave} className="flex-[2] py-4 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2">
                                <Check size={18} strokeWidth={3} /> 确认并保存
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95">
                            <Edit3 size={18} /> 编辑资料内容
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// 弹窗内专用输入框
const ModalInput = ({ label, value, placeholder, isMono = false, type = "text" }: any) => (
    <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">{label}</label>
        <input 
            type={type}
            defaultValue={value}
            className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-black text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all ${isMono ? 'font-mono' : ''}`}
            placeholder={placeholder}
        />
    </div>
);

// 详情行组件
const InfoRow = ({ label, value, isMono = false, isSensitive = false, showSensitive = true }: any) => (
    <div className="flex justify-between items-baseline py-3.5 border-b border-slate-50 last:border-0">
        <span className="text-xs font-bold text-slate-400 shrink-0">{label}</span>
        <span className={`text-sm font-black text-slate-900 text-right ${isMono ? 'font-mono' : ''} ${isSensitive && !showSensitive ? 'blur-md opacity-30 select-none' : ''}`}>
            {value || '--'}
        </span>
    </div>
);

// 统一卡片容器
const InfoSection = ({ title, icon: Icon, children, badge, onView, paddingClass = "px-6 py-5" }: any) => (
    <div 
        onClick={onView}
        className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-5 transition-all active:scale-[0.98] cursor-pointer hover:border-indigo-100"
    >
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-xl bg-white shadow-sm border border-slate-100 text-indigo-500">
                    <Icon size={16} strokeWidth={2.5}/>
                </div>
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{title}</span>
            </div>
            <div className="flex items-center gap-3">
                {badge && <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg border border-indigo-100/50 shadow-sm">{badge}</span>}
                <ChevronRight size={14} className="text-slate-300" />
            </div>
        </div>
        <div className={paddingClass}>{children}</div>
    </div>
);

// 时间轴子项
const ExperienceItem = ({ title, sub, time, isLast }: any) => (
    <div className="relative pl-8 pb-6 last:pb-2">
        {!isLast && <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-slate-100"></div>}
        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10 shadow-sm"></div>
        <div className="flex justify-between items-start mb-1 gap-2">
            <h5 className="text-sm font-black text-slate-800 leading-tight flex-1">{title}</h5>
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{time}</span>
        </div>
        <p className="text-xs font-bold text-slate-500">{sub}</p>
    </div>
);

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onBack }) => {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [viewMode, setViewMode] = useState<'detail' | 'offboarding' | 'contract'>('detail');
    const [showFirstTimeAlert, setShowFirstTimeAlert] = useState(false);

    if (viewMode === 'offboarding') return <EmployeeOffboarding employee={employee} onBack={() => setViewMode('detail')} />;
    if (viewMode === 'contract') return <ContractInitiation onClose={() => setViewMode('detail')} onNext={(data) => { console.log(data); setViewMode('detail'); }} />;

    const handleContractInitiation = () => {
        setShowFirstTimeAlert(true);
    };

    // 数据模型
    const data = {
        appointment: { dept: employee.dept, role: employee.role, joinDate: employee.joinDate, probation: '3个月' },
        contract: {
            type: '固定期限劳动合同', term: '3年',
            startDate: '2021-03-15', endDate: '2024-03-15',
            status: '生效中', id: 'CT-2023-0881',
            tenure: '2.9', // 司龄 2.9年
            signCount: 2 
        },
        basic: { 
            name: employee.name,
            idCard: employee.idCard,
            gender: '男', 
            birthday: '1995-08-08', 
            nationality: '中国', 
            nativePlace: '江苏苏州', 
            highestDegree: '本科',
            politics: '党员', 
            isVeteran: '否',
            isParent: '是',
            hukouAddress: '江苏省苏州市姑苏区幸福路88号',
            marital: '已婚', 
            hukouType: '城镇',
            hasResPermit: '是',
            resPermitNo: '3101XXXXXXXXX881',
            bloodType: 'O型',
            firstWorkDate: '2017-07-01' 
        },
        residence: { type: '城镇', regAddr: '苏州姑苏区...', currentAddr: '上海浦东张江...', hasPermit: '是', permitNo: '3101XXXXXXXXX881' },
        education: [{ school: '复旦大学', major: '软件工程', degree: '本科', period: '2013.09 - 2017.06' }],
        workExp: [{ company: '字节跳动', role: '资深前端', period: '2020.06 - 2023.11', referee: '张三' }],
        emergency: { name: '林某某', relation: '配偶', phone: '139-XXXX-XXXX' },
        finance: { bankCard: '6222 0038 **** 8891', bankName: '招商银行', branch: '上海科技园支行' }
    };

    const handleOpenModal = (key: string) => {
        setIsEditing(false);
        setActiveModal(key);
    };

    const handleGoToContractArchive = () => {
        navigate('/work/hr-6', { state: { employeeId: employee.id } });
    };

    return (
        <DetailLayout
            title="员工档案全景"
            onBack={onBack}
            tag={{ label: employee.status, color: 'text-emerald-600', bg: 'bg-emerald-50' }}
            bgColor="bg-[#F8F9FB]"
        >
            {/* Header Profile */}
            <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden mb-6">
                {showFirstTimeAlert && (
                    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-6">
                        <div className="bg-white p-8 rounded-3xl text-center">
                            <p className="text-lg font-black mb-6">首次需完善合同信息</p>
                            <button onClick={() => { setShowFirstTimeAlert(false); setViewMode('contract'); }} className="w-full p-4 bg-indigo-600 text-white font-black rounded-2xl">确定</button>
                        </div>
                    </div>
                )}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400"></div>
                <div className="w-20 h-20 rounded-[28px] bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg border-4 border-white mt-2 relative">
                    {employee.name.charAt(0)}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm"><ShieldCheck size={14} strokeWidth={3} /></div>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-4">{employee.name}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{employee.dept} · {employee.role}</p>
                <div className="flex gap-2 w-full mt-6">
                    <button onClick={handleContractInitiation} className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all">立即发起办理</button>
                    <button className="flex-1 py-3 rounded-2xl bg-white text-slate-600 font-black text-xs flex items-center justify-center gap-1.5 border border-slate-200 active:scale-95 transition-all"><Mail size={14}/> 邮件</button>
                </div>
            </div>

            {/* 1. 任职信息 */}
            <InfoSection title="任职信息" icon={Briefcase} onView={() => handleOpenModal('appointment')}>
                <InfoRow label="所属部门" value={employee.dept} />
                <InfoRow label="当前岗位" value={employee.role} />
                <InfoRow label="入职日期" value={employee.joinDate} isMono />
            </InfoSection>

            {/* 2. 劳动合同 */}
            <InfoSection 
                title="劳动合同" 
                icon={FileSignature} 
                badge={data.contract.status}
                onView={handleGoToContractArchive}
            >
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-slate-900 font-mono tracking-tighter">{data.contract.tenure}</span>
                                <span className="text-xs font-black text-indigo-500">YEARS</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-0.5">在职司龄</span>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-100"></div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100/50">累计签署 {data.contract.signCount} 次</span>
                            </div>
                            <p className="text-xs font-bold font-mono text-slate-400 tracking-tight truncate">{data.contract.id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 pt-4 border-t border-slate-50">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">开始日期</span>
                            <span className="text-sm font-black font-mono text-slate-600">{data.contract.startDate}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">到期日期</span>
                            <span className="text-sm font-black font-mono text-indigo-600">{data.contract.endDate}</span>
                        </div>
                    </div>
                </div>
            </InfoSection>

            {/* 3. 基本信息 */}
            <InfoSection title="基本信息" icon={Fingerprint} onView={() => handleOpenModal('basic')}>
                <InfoRow label="性别" value={data.basic.gender} />
                <InfoRow label="证件号码" value={employee.idCard} isMono isSensitive showSensitive={false} />
                <InfoRow label="最高学历" value={data.basic.highestDegree} />
                <InfoRow label="政治面貌" value={data.basic.politics} />
            </InfoSection>

            {/* 其他模块维持 */}
            <InfoSection title="户籍居住" icon={Home} onView={() => handleOpenModal('residence')}>
                <InfoRow label="现居住地" value={data.residence.currentAddr} />
                <InfoRow label="户口性质" value={data.residence.type} />
            </InfoSection>

            <InfoSection title="教育信息" icon={GraduationCap} onView={() => handleOpenModal('education')}>
                {data.education.map((edu, i) => (
                    <ExperienceItem key={i} title={edu.school} sub={`${edu.major} · ${edu.degree}`} time={edu.period} isLast={i === data.education.length - 1} />
                ))}
            </InfoSection>

            <InfoSection title="工作履历" icon={HistoryIcon} onView={() => handleOpenModal('workExp')}>
                {data.workExp.map((work, i) => (
                    <ExperienceItem key={i} title={work.company} sub={work.role} time={work.period} isLast={i === data.workExp.length - 1} />
                ))}
            </InfoSection>

            <InfoSection title="联系方式" icon={Phone} onView={() => handleOpenModal('contact')}>
                <InfoRow label="手机号码" value={employee.phone} isMono />
                <InfoRow label="个人邮箱" value={employee.email} />
            </InfoSection>

            <InfoSection title="紧急联系人" icon={AlertCircle} onView={() => handleOpenModal('emergency')}>
                <InfoRow label="姓名" value={data.emergency.name} />
                <InfoRow label="关系" value={data.emergency.relation} />
                <InfoRow label="电话" value={data.emergency.phone} isMono />
            </InfoSection>

            <InfoSection title="薪资发放账户" icon={CreditCard} onView={() => handleOpenModal('finance')}>
                <InfoRow label="开户银行" value={data.finance.bankName} />
                <InfoRow label="银行卡号" value={data.finance.bankCard} isMono isSensitive showSensitive={false} />
            </InfoSection>

            {/* 离职入口 */}
            <div className="mt-10 mb-16 px-2">
                <button onClick={() => setViewMode('offboarding')} className="w-full flex items-center justify-center gap-3 p-5 bg-white rounded-[28px] border border-rose-100 shadow-sm active:bg-rose-50 group">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100"><UserX size={20} /></div>
                    <div className="text-left flex-1"><p className="text-sm font-black text-rose-600">办理员工离职</p><p className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter">Exit Formalities</p></div>
                    <ChevronRight size={18} className="text-rose-200" />
                </button>
            </div>

            {/* 统一弹窗逻辑 */}
            <SectionModal title="任职信息" isOpen={activeModal === 'appointment'} onClose={() => setActiveModal(null)} isEditing={isEditing} setIsEditing={setIsEditing} onSave={() => setActiveModal(null)} viewContent={<><InfoRow label="部门" value={data.appointment.dept} /><InfoRow label="岗位" value={data.appointment.role} /><InfoRow label="入职" value={data.appointment.joinDate} isMono /><InfoRow label="试用期" value={data.appointment.probation} /></>}><ModalInput label="部门" value={data.appointment.dept} /><ModalInput label="岗位" value={data.appointment.role} /><ModalInput label="入职" value={data.appointment.joinDate} type="date" isMono /></SectionModal>
            
            <SectionModal 
                title="基本信息" 
                isOpen={activeModal === 'basic'} 
                onClose={() => setActiveModal(null)} 
                isEditing={isEditing} 
                setIsEditing={setIsEditing} 
                onSave={() => setActiveModal(null)} 
                viewContent={
                    <div className="space-y-1">
                        <InfoRow label="姓名" value={data.basic.name} />
                        <InfoRow label="证件号码" value={data.basic.idCard} isMono />
                        <InfoRow label="性别" value={data.basic.gender} />
                        <InfoRow label="出生日期" value={data.basic.birthday} isMono />
                        <InfoRow label="国籍" value={data.basic.nationality} />
                        <InfoRow label="籍贯" value={data.basic.nativePlace} />
                        <InfoRow label="最高学历" value={data.basic.highestDegree} />
                        <InfoRow label="政治面貌" value={data.basic.politics} />
                        <InfoRow label="是否退伍军人" value={data.basic.isVeteran} />
                        <InfoRow label="是否已育" value={data.basic.isParent} />
                        <InfoRow label="户籍地址" value={data.basic.hukouAddress} />
                        <InfoRow label="婚姻状况" value={data.basic.marital} />
                        <InfoRow label="户口性质" value={data.basic.hukouType} />
                        <InfoRow label="是否有居住证" value={data.basic.hasResPermit} />
                        <InfoRow label="居住证编号" value={data.basic.resPermitNo} isMono />
                        <InfoRow label="血型" value={data.basic.bloodType} />
                        <InfoRow label="首次参加工作" value={data.basic.firstWorkDate} isMono />
                    </div>
                }
            >
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="姓名" value={data.basic.name} />
                    <ModalInput label="性别" value={data.basic.gender} />
                </div>
                <ModalInput label="证件号码" value={data.basic.idCard} isMono />
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="出生日期" value={data.basic.birthday} type="date" isMono />
                    <ModalInput label="国籍" value={data.basic.nationality} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="籍贯" value={data.basic.nativePlace} />
                    <ModalInput label="最高学历" value={data.basic.highestDegree} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="政治面貌" value={data.basic.politics} />
                    <ModalInput label="血型" value={data.basic.bloodType} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="是否退伍军人" value={data.basic.isVeteran} />
                    <ModalInput label="是否已育" value={data.basic.isParent} />
                </div>
                <ModalInput label="户籍地址" value={data.basic.hukouAddress} />
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="婚姻状况" value={data.basic.marital} />
                    <ModalInput label="户口性质" value={data.basic.hukouType} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="是否有居住证" value={data.basic.hasResPermit} />
                    <ModalInput label="居住证编号" value={data.basic.resPermitNo} isMono />
                </div>
                <ModalInput label="首次参加工作时间" value={data.basic.firstWorkDate} type="date" isMono />
            </SectionModal>

            <SectionModal title="联系方式" isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} isEditing={isEditing} setIsEditing={setIsEditing} onSave={() => setActiveModal(null)} viewContent={<><InfoRow label="手机号" value={employee.phone} isMono /><InfoRow label="邮箱" value={employee.email} /></>}><ModalInput label="手机号" value={employee.phone} isMono /><ModalInput label="邮箱" value={employee.email} /></SectionModal>

            <SectionModal title="薪资账户" isOpen={activeModal === 'finance'} onClose={() => setActiveModal(null)} isEditing={isEditing} setIsEditing={setIsEditing} onSave={() => setActiveModal(null)} viewContent={<><InfoRow label="银行" value={data.finance.bankName} /><InfoRow label="支行" value={data.finance.branch} /><InfoRow label="卡号" value={data.finance.bankCard} isMono /></>}><ModalInput label="卡号" value={data.finance.bankCard} isMono /><ModalInput label="银行" value={data.finance.bankName} /></SectionModal>

            <div className="text-center pb-12 opacity-10"><p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">GM Pilot Archive • Elegant Edition</p></div>
        </DetailLayout>
    );
};

export default EmployeeDetail;
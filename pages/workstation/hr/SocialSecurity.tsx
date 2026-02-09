import React, { useState } from 'react';
import { 
    ArrowUpRight, ChevronRight, UserPlus, UserMinus, FileText, 
    Download, Umbrella, Users, ShieldCheck, PieChart, Info, Landmark,
    Calendar, Eye, Filter, CheckCircle2, History, Search, ArrowLeft, X, Check, Clock
} from 'lucide-react';
import { DetailLayout } from '../../../components/DetailLayout';

// --- Mock Data ---

const MOCK_SOCIAL_HISTORY = [
    { month: '2023-12', total: '98,500.00', count: 32, status: '已缴纳', company: '68,500.00', personal: '30,000.00' },
    { month: '2023-11', total: '92,400.00', count: 30, status: '已缴纳', company: '64,200.00', personal: '28,200.00' },
    { month: '2023-10', total: '92,400.00', count: 30, status: '已缴纳', company: '64,200.00', personal: '28,200.00' },
    { month: '2023-09', total: '91,200.00', count: 29, status: '已缴纳', company: '63,500.00', personal: '27,700.00' },
];

const MOCK_CHANGES = [
    { id: 'c1', name: '王强', type: '新增', dept: '技术部', date: '12-05', base: '12,000', status: '已完成', processDate: '2023-12-05' },
    { id: 'c2', name: '李静', type: '新增', dept: '市场部', date: '12-10', base: '15,000', status: '办理中', processDate: '预计12-18' },
    { id: 'c3', name: '陈晨', type: '新增', dept: '设计部', date: '12-12', base: '18,000', status: '已完成', processDate: '2023-12-12' },
    { id: 'c4', name: '赵六', type: '减少', dept: '行政部', date: '12-02', base: '8,000', status: '已完成', processDate: '2023-12-02' },
];

const MOCK_STAFF_LIST = [
    { id: 1, name: '张伟', dept: '技术部', base: '25,000', total: '8,250', company: '5,500', personal: '2,750' },
    { id: 2, name: '李娜', dept: '市场部', base: '18,000', total: '5,940', company: '3,960', personal: '1,980' },
    { id: 3, name: '王强', dept: '技术部', base: '12,000', total: '3,960', company: '2,640', personal: '1,320' },
    { id: 4, name: '陈杰', dept: '设计部', base: '15,000', total: '4,950', company: '3,300', personal: '1,650' },
    { id: 5, name: '刘思思', dept: '运营部', base: '14,000', total: '4,620', company: '3,080', personal: '1,540' },
];

const MOCK_DOCS = [
    { id: 'd1', title: '12月社保缴纳回单', size: '1.2MB', date: '2023-12-15', bank: '招商银行' },
    { id: 'd2', title: '12月公积金汇缴书', size: '0.8MB', date: '2023-12-15', bank: '公积金中心' }
];

// --- Sub-Components ---

const StaffSocialDetail = ({ staff, onBack }: { staff: any, onBack: () => void }) => {
    const breakdown = [
        { label: '养老保险', rate: '16% / 8%', company: '4000.00', personal: '2000.00' },
        { label: '医疗保险', rate: '10% / 2%', company: '2500.00', personal: '500.00' },
        { label: '失业保险', rate: '0.5% / 0.5%', company: '125.00', personal: '125.00' },
        { label: '工伤保险', rate: '0.2% / 0%', company: '50.00', personal: '0.00' },
        { label: '生育保险', rate: '1% / 0%', company: '250.00', personal: '0.00' },
        { label: '住房公积金', rate: '7% / 7%', company: '1750.00', personal: '1750.00' },
    ];

    return (
        <DetailLayout title={`${staff.name} 缴纳明细`} onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black mb-4 shadow-lg shadow-indigo-100">
                    {staff.name.charAt(0)}
                </div>
                <h3 className="text-lg font-black text-slate-900">{staff.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{staff.dept} · 在职</p>
                <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                    <div className="text-center border-r border-slate-50">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">缴纳基数</p>
                        <p className="text-lg font-black font-mono text-slate-900">¥{staff.base}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">本月合计</p>
                        <p className="text-lg font-black font-mono text-indigo-600">¥{staff.total}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden px-6 py-2">
                <div className="flex bg-slate-50/50 -mx-6 px-6 py-3 border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    <div className="flex-1">缴费项目 (比例)</div>
                    <div className="w-20 text-right">单位</div>
                    <div className="w-20 text-right">个人</div>
                </div>
                {breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center py-4 border-b border-slate-50 last:border-0">
                        <div className="flex-1 pr-2">
                            <p className="text-xs font-black text-slate-800">{item.label}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5">{item.rate}</p>
                        </div>
                        <div className="w-20 text-right text-xs font-black font-mono text-slate-900">¥{item.company}</div>
                        <div className="w-20 text-right text-xs font-black font-mono text-slate-500">¥{item.personal}</div>
                    </div>
                ))}
            </div>
        </DetailLayout>
    );
};

const SocialDocDetail = ({ doc, onBack }: { doc: any, onBack: () => void }) => (
    <DetailLayout title={doc.title} onBack={onBack} tag={{ label: 'PDF回单', color: 'text-rose-600', bg: 'bg-rose-50' }}>
        <div className="flex-1 flex flex-col items-center justify-center py-8">
            <div className="w-48 aspect-[3/4] bg-white shadow-2xl border border-slate-200 rounded-xl flex flex-col items-center justify-center mb-10 relative overflow-hidden">
                <FileText size={56} className="text-rose-500 relative z-10" strokeWidth={1.5} />
                <p className="text-[10px] font-black text-slate-400 mt-4 relative z-10 tracking-[0.2em]">ORIGINAL DOC</p>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-40"><Landmark size={80} className="text-slate-200"/></div>
            </div>
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 w-full overflow-hidden px-8 py-2 mb-8">
                <div className="flex justify-between py-4 border-b border-slate-50"><span className="text-[10px] font-black text-slate-400 uppercase">开具银行</span><span className="text-sm font-black text-slate-900">{doc.bank}</span></div>
                <div className="flex justify-between py-4"><span className="text-[10px] font-black text-slate-400 uppercase">生成日期</span><span className="text-sm font-black font-mono text-slate-900">{doc.date}</span></div>
            </div>
            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm">
                <Download size={20} strokeWidth={3} /> 下载回单原件
            </button>
        </div>
    </DetailLayout>
);

const ChangeListDetail = ({ onBack }: { onBack: () => void }) => (
    <DetailLayout title="本月增减员名单" onBack={onBack} bgColor="bg-[#F8F9FB]">
        <div className="space-y-4">
            {MOCK_CHANGES.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.type === '新增' ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                    <div className="flex justify-between items-start mb-4 pl-2">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ${item.type === '新增' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[15px] font-black text-slate-900">{item.name}</h4>
                                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${item.type === '新增' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                        {item.type}
                                    </span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{item.dept}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className={`flex items-center gap-1 text-[10px] font-black ${item.status === '已完成' ? 'text-emerald-600' : 'text-orange-600 animate-pulse'}`}>
                                {item.status === '已完成' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                {item.status}
                             </div>
                             <p className="text-[10px] font-mono text-slate-400 mt-1">
                                {item.status === '已完成' ? '办理日期' : '预计办理'}: {item.processDate}
                             </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pl-2 pt-3 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">缴纳基数</span>
                            <span className="text-xs font-black font-mono text-slate-900">¥{item.base}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-300">申报日期: {item.date}</span>
                    </div>
                </div>
            ))}
        </div>
    </DetailLayout>
);

const MonthlySocialDetail = ({ data, onBack }: { data: any, onBack: () => void }) => {
    const [selectedStaff, setSelectedStaff] = useState<any>(null);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    if (selectedStaff) return <StaffSocialDetail staff={selectedStaff} onBack={() => setSelectedStaff(null)} />;
    if (selectedDoc) return <SocialDocDetail doc={selectedDoc} onBack={() => setSelectedDoc(null)} />;

    return (
        <DetailLayout title={`${data.month} 缴纳明细`} onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">回单凭证</h4>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {MOCK_DOCS.map(doc => (
                        <div key={doc.id} onClick={() => setSelectedDoc(doc)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 shrink-0 active:scale-95 transition-all cursor-pointer group">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm"><FileText size={16} /></div>
                            <span className="text-xs font-black text-slate-700">{doc.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden pb-4">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">全员名单 ({data.count}人)</h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 bg-white px-2 py-1 rounded-lg border border-indigo-100/50 cursor-pointer active:scale-95 transition-all">
                        <History size={10} /> 导出报表
                    </div>
                </div>
                <div>
                    {MOCK_STAFF_LIST.map(staff => (
                        <div key={staff.id} onClick={() => setSelectedStaff(staff)} className="p-5 border-b border-slate-50 last:border-0 flex items-center justify-between active:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black border border-indigo-100">
                                    {staff.name.charAt(0)}
                                </div>
                                <div><h5 className="text-sm font-black text-slate-900">{staff.name}</h5><p className="text-[10px] font-bold text-slate-400 mt-0.5">基数: ¥{staff.base}</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right"><p className="text-sm font-black font-mono text-slate-900">¥{staff.total}</p><p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">本月合计</p></div>
                                <ChevronRight size={16} className="text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

// --- Level 2: Main Module Dashboard ---

const SocialSecurity: React.FC = () => {
    const [viewMode, setViewMode] = useState<'dashboard' | 'monthly-detail' | 'change-list'>('dashboard');
    const [selectedMonthData, setSelectedMonthData] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

    if (viewMode === 'monthly-detail' && selectedMonthData) {
        return <MonthlySocialDetail data={selectedMonthData} onBack={() => setViewMode('dashboard')} />;
    }

    if (viewMode === 'change-list') {
        return <ChangeListDetail onBack={() => setViewMode('dashboard')} />;
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* 1. 总览卡片 */}
            <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-[40px] p-8 shadow-[0_12px_40px_rgba(79,70,229,0.12)] border border-white/5 relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">12月预计缴纳总额</p>
                            <h2 className="text-[40px] font-black font-mono tracking-tighter text-white leading-none">¥98,500.00</h2>
                        </div>
                        <div className="w-12 h-12 rounded-[20px] bg-white/5 text-indigo-200 flex items-center justify-center border border-white/10 backdrop-blur-lg">
                            <Umbrella size={24} strokeWidth={2}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                                <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest opacity-80">公司承担</p>
                            </div>
                            <p className="text-xl font-black font-mono text-white">¥68,500.00</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                                <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest opacity-80">个人承担</p>
                            </div>
                            <p className="text-xl font-black font-mono text-indigo-100/60">¥30,000.00</p>
                        </div>
                    </div>
                 </div>
                 <div className="absolute -right-12 -bottom-12 opacity-[0.05] text-white pointer-events-none transform -rotate-12 group-hover:scale-110 transition-transform duration-[2s]"><Umbrella size={260} /></div>
            </div>

            {/* 2. 本月人员增减变动 - 增加最近办理详情显示 */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative transition-all">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-1 h-3.5 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-[15px] font-black text-slate-800 tracking-tight">本月增减员动态</h3>
                    </div>
                    <button 
                        onClick={() => setViewMode('change-list')}
                        className="flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-100/30 hover:bg-indigo-50 transition-colors active:scale-95"
                    >
                        查看名单 <ChevronRight size={10} strokeWidth={3} />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/30 p-5 rounded-[28px] border border-slate-100 flex flex-col gap-3 group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-[18px] bg-white text-blue-600 flex items-center justify-center border border-blue-50 shadow-sm">
                                <UserPlus size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 mb-0.5">本月新增</p>
                                <p className="text-[22px] font-black text-slate-900 font-mono tracking-tight">+3</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-1 pt-2 border-t border-slate-100/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                            <p className="text-[9px] font-bold text-slate-500 whitespace-nowrap">最近：12-18 办理中</p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50/30 p-5 rounded-[28px] border border-slate-100 flex flex-col gap-3 group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-[18px] bg-white text-slate-400 flex items-center justify-center border border-slate-100 shadow-sm">
                                <UserMinus size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 mb-0.5">本月减少</p>
                                <p className="text-[22px] font-black text-slate-900 font-mono tracking-tight">-1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-1 pt-2 border-t border-slate-100/50">
                            <CheckCircle2 size={10} className="text-emerald-500" />
                            <p className="text-[9px] font-bold text-slate-500 whitespace-nowrap">12-02 已办理完成</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. 社保缴纳清单 */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <div>
                        <h3 className="text-sm font-black text-slate-900">社保缴纳清单</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Payment Ledger · {selectedYear}年</p>
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                                isYearPickerOpen 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                                : 'bg-white text-slate-400 border-slate-200 shadow-sm active:scale-95'
                            }`}
                        >
                            <Filter size={18} strokeWidth={2.5} />
                        </button>

                        {isYearPickerOpen && (
                            <>
                                <div className="fixed inset-0 z-[80]" onClick={() => setIsYearPickerOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-slate-100 p-1.5 z-[90] animate-scale-up origin-top-right overflow-hidden">
                                    <div className="text-[9px] font-black text-slate-400 uppercase px-3 py-2 border-b border-slate-50 mb-1 tracking-widest">选择年份</div>
                                    {[2024, 2023, 2022].map(y => (
                                        <button 
                                            key={y}
                                            onClick={() => { setSelectedYear(y); setIsYearPickerOpen(false); }}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                                                selectedYear === y 
                                                ? 'bg-indigo-50 text-indigo-600' 
                                                : 'text-slate-500 hover:bg-slate-50'
                                            }`}
                                        >
                                            {y}年
                                            {selectedYear === y && <Check size={14} strokeWidth={3} />}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    {MOCK_SOCIAL_HISTORY.map((item) => (
                        <div 
                            key={item.month} 
                            onClick={() => { setSelectedMonthData(item); setViewMode('monthly-detail'); }}
                            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex justify-between items-center group active:scale-[0.99] transition-all cursor-pointer hover:border-indigo-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[20px] bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                                    <Calendar size={22} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 font-mono tracking-tight">{item.month} 账期</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400">{item.count}人 缴纳</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                        <span className="text-[9px] font-black text-emerald-600 opacity-80 uppercase">{item.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-[15px] font-black font-mono text-slate-900 tracking-tight">¥{item.total}</p>
                                    <p className="text-[9px] font-bold text-slate-300 mt-0.5 uppercase tracking-tighter">Total</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="text-center pt-12 opacity-10 pb-8">
                <p className="text-[8px] font-black text-slate-900 uppercase tracking-[0.5em]">Pilot Core • Data Transparency</p>
            </div>
        </div>
    );
};

export default SocialSecurity;
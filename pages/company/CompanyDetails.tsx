
import React, { useState } from 'react';
import { 
    FileText, Copy, Check, Settings, Stamp, ShieldCheck, MapPin, Plus, Trash2, 
    User, Phone, Map, Briefcase, Home, CheckCircle2, Crown, 
    Clock, Smartphone, Bell, ChevronRight, Search, Lock, UserPlus, LogOut,
    AlertCircle, FileSignature, History, Fingerprint, Landmark, Building2, Wallet
} from 'lucide-react';
import { DetailLayout } from '../../components/DetailLayout';

// --- 1. Address Manager (Existing) ---

const AddressManager = ({ onBack }: { onBack: () => void }) => {
    const [mode, setMode] = useState<'list' | 'add'>('list');
    const [addresses, setAddresses] = useState([
        { id: 1, label: '公司前台', tag: '公司', address: '上海市徐汇区田林路888号科技园 16号楼 301室', contact: '行政部', phone: '138-0000-0000', isDefault: true },
        { id: 2, label: '财务部', tag: '部门', address: '上海市徐汇区田林路888号科技园 16号楼 305室', contact: '张会计', phone: '139-0000-0000', isDefault: false },
    ]);

    // Form State
    const [formData, setFormData] = useState({
        contact: '',
        phone: '',
        region: '',
        detail: '',
        label: '公司',
        isDefault: false
    });

    const handleSave = () => {
        if (!formData.contact || !formData.phone || !formData.detail) {
            alert('请完善收件人、手机号及详细地址');
            return;
        }
        
        const newAddr = {
            id: Date.now(),
            label: formData.label,
            tag: formData.label,
            address: `${formData.region} ${formData.detail}`,
            contact: formData.contact,
            phone: formData.phone,
            isDefault: formData.isDefault
        };

        let updatedList = [...addresses];
        if (newAddr.isDefault) {
            updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
        }
        updatedList.push(newAddr);
        setAddresses(updatedList);
        setFormData({ contact: '', phone: '', region: '', detail: '', label: '公司', isDefault: false });
        setMode('list');
    };

    const handleDelete = (id: number) => {
        if (confirm('确定删除该地址吗？')) {
            setAddresses(addresses.filter(a => a.id !== id));
        }
    };

    const handleSetDefault = (id: number) => {
        const updated = addresses.map(a => ({
            ...a,
            isDefault: a.id === id
        }));
        setAddresses(updated);
    };

    if (mode === 'add') {
        return (
            <DetailLayout title="新增收件地址" onBack={() => setMode('list')} bgColor="bg-[#F8F9FB]">
                <div className="space-y-6 pb-24">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-[24px] p-4 flex gap-3 items-start">
                        <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm shrink-0">
                            <MapPin size={18} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-black text-indigo-900 mb-1">智能填写</h4>
                            <textarea placeholder="粘贴地址信息，自动识别姓名、电话和地址..." className="w-full bg-transparent text-xs font-bold text-indigo-800 placeholder-indigo-400/70 outline-none resize-none h-12 leading-relaxed" />
                            <div className="flex justify-end"><button className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all">识别</button></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-5">
                        <div><label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase ml-1">收件人</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="名字" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-500 transition-all placeholder-slate-300" /></div></div>
                        <div><label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase ml-1">手机号码</label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="11位手机号" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black font-mono text-slate-900 outline-none focus:border-indigo-500 transition-all placeholder-slate-300" /></div></div>
                        <div><label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase ml-1">所在地区</label><div className="relative"><Map size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} placeholder="省市区县、乡镇等" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-500 transition-all placeholder-slate-300" /></div></div>
                        <div><label className="text-[10px] font-bold text-slate-400 mb-1.5 block uppercase ml-1">详细地址</label><textarea value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} placeholder="街道、楼牌号等" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-500 transition-all placeholder-slate-300 resize-none h-24" /></div>
                    </div>
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                        <div className="mb-4"><label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase ml-1">地址标签</label><div className="flex gap-2">{['公司', '家', '学校', '其他'].map(tag => (<button key={tag} onClick={() => setFormData({...formData, label: tag})} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${formData.label === tag ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200'}`}>{tag}</button>))}</div></div>
                        <div onClick={() => setFormData({...formData, isDefault: !formData.isDefault})} className="flex items-center justify-between pt-4 border-t border-slate-50 cursor-pointer group"><span className="text-sm font-black text-slate-900">设为默认收件地址</span><div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${formData.isDefault ? 'bg-indigo-600' : 'bg-slate-200'}`}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${formData.isDefault ? 'left-6' : 'left-1'}`}></div></div></div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50 pb-8"><button onClick={handleSave} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"><Check size={20} strokeWidth={3} /> 保存地址</button></div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout title="收件地址管理" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-4 pb-24">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`bg-white rounded-[24px] p-5 border shadow-sm transition-all group relative overflow-hidden ${addr.isDefault ? 'border-indigo-500 ring-2 ring-indigo-50/50' : 'border-slate-100'}`}>
                        {addr.isDefault && <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl shadow-sm z-10">默认</div>}
                        <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><span className="text-sm font-black text-slate-900">{addr.label}</span><span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold border ${addr.tag === '公司' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{addr.tag}</span></div></div>
                        <p className="text-sm text-slate-700 font-bold leading-relaxed mb-3 pr-8">{addr.address}</p>
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-4"><span className="flex items-center gap-1"><User size={12}/> {addr.contact}</span><span className="flex items-center gap-1 font-mono"><Phone size={12}/> {addr.phone}</span></div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50"><div onClick={() => !addr.isDefault && handleSetDefault(addr.id)} className={`flex items-center gap-2 cursor-pointer ${addr.isDefault ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${addr.isDefault ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>{addr.isDefault && <Check size={10} className="text-white" strokeWidth={4} />}</div><span className="text-[10px] font-bold">设为默认</span></div><div className="flex gap-4"><button className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1"><Settings size={12} /> 编辑</button><button onClick={() => handleDelete(addr.id)} className="text-[10px] font-bold text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"><Trash2 size={12} /> 删除</button></div></div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50 pb-8"><button onClick={() => setMode('add')} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"><Plus size={20} strokeWidth={3} /> 新增收件地址</button></div>
        </DetailLayout>
    );
};

// --- 2. Invoice Info (Refined) ---

const InvoiceInfo = ({ onBack }: { onBack: () => void }) => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (val: string, label: string) => {
        // Mock copy
        setCopied(label);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <DetailLayout title="开票信息" onBack={onBack}>
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="relative z-10 text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 shadow-inner border border-blue-100">
                        <FileText size={32} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 px-4 leading-tight">上海千机网络科技有限公司</h2>
                </div>

                <div className="space-y-3">
                    {[
                        { label: '税号', value: '91310000XXXXXXXXXX', mono: true },
                        { label: '单位地址', value: '上海市徐汇区田林路888号科技园' },
                        { label: '电话号码', value: '021-66668888', mono: true },
                        { label: '开户银行', value: '招商银行上海科技园支行' },
                        { label: '银行账户', value: '6227 0038 1234 8888', mono: true }
                    ].map((item, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => handleCopy(item.value, item.label)}
                            className="bg-slate-50/80 p-4 rounded-2xl flex justify-between items-start group active:bg-blue-50 transition-colors cursor-pointer border border-slate-100 hover:border-blue-200"
                        >
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">{item.label}</p>
                                <p className={`text-sm font-bold text-slate-900 break-all ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                            </div>
                            <div className={`mt-1 transition-all ${copied === item.label ? 'text-emerald-500 scale-110' : 'text-slate-300 group-hover:text-blue-500'}`}>
                                {copied === item.label ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Copy size={18} strokeWidth={2.5} /> 复制全部信息
                </button>
            </div>
        </DetailLayout>
    );
};

// --- 3. Seal Manager ---

const SealManager = ({ onBack }: { onBack: () => void }) => {
    const seals = [
        { id: 'S1', name: '公章', code: '3101040001', status: '正常', usage: 12 },
        { id: 'S2', name: '财务专用章', code: '3101040002', status: '正常', usage: 45 },
        { id: 'S3', name: '法人章', code: '3101040003', status: '正常', usage: 8 },
        { id: 'S4', name: '合同专用章', code: '3101040004', status: '停用', usage: 0 }
    ];

    const logs = [
        { time: '10:30', user: '张伟', action: '加盖 公章', doc: '劳动合同-王强' },
        { time: '09:15', user: '李娜', action: '加盖 财务章', doc: '银行付款指令' },
        { time: '昨天', user: '系统', action: '加盖 发票章', doc: '销项发票 #0023' },
    ];

    return (
        <DetailLayout title="电子印章管理" onBack={onBack}>
            <div className="space-y-6">
                {/* Seal List */}
                <div className="grid grid-cols-2 gap-3">
                    {seals.map(seal => (
                        <div key={seal.id} className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-16 h-16 opacity-[0.05] -mr-4 -mt-4 rounded-full border-4 ${seal.status === '正常' ? 'border-rose-600' : 'border-slate-400'}`}></div>
                            <div className="flex justify-between items-start mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm ${seal.status === '正常' ? 'bg-rose-500 shadow-rose-200' : 'bg-slate-400'}`}>
                                    <Stamp size={18} />
                                </div>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black border ${
                                    seal.status === '正常' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                                }`}>{seal.status}</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900">{seal.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{seal.code}</p>
                            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px]">
                                <span className="text-slate-400 font-bold">本月调用</span>
                                <span className="text-slate-900 font-black font-mono">{seal.usage}次</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Usage Log */}
                <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <History size={14} /> 最近调用记录
                    </h3>
                    <div className="space-y-4 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100 rounded-full"></div>
                        {logs.map((log, idx) => (
                            <div key={idx} className="flex gap-4 relative">
                                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0 z-10 mt-0.5"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-xs font-black text-slate-800">{log.action}</span>
                                        <span className="text-[10px] font-mono text-slate-400 font-bold">{log.time}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1.5 rounded-lg w-fit">
                                        <span className="font-bold text-slate-700">{log.user}</span> 用于 {log.doc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DetailLayout>
    );
};

// --- 4. Authority Manager (Renamed from CertManager) ---

const AddAuthority = ({ onBack }: { onBack: () => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('bank');
    
    const services = [
        { id: 'icbc', name: '中国工商银行', type: 'bank', desc: '银企互联 (API直连)', icon: Landmark, color: 'text-rose-600', bg: 'bg-rose-50' },
        { id: 'ccb', name: '中国建设银行', type: 'bank', desc: '企业网银直连', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'boc', name: '中国银行', type: 'bank', desc: '全球现金管理', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-50' },
        { id: 'alipay', name: '支付宝企业版', type: 'fintech', desc: '资金授权与归集', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'tax', name: '国家税务总局', type: 'gov', desc: '数电票自动同步', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    const filtered = services.filter(s => 
        (activeTab === 'all' || (activeTab === 'bank' && s.type === 'bank') || (activeTab === 'gov' && s.type === 'gov') || (activeTab === 'other' && s.type === 'fintech')) &&
        s.name.includes(searchTerm)
    );

    return (
        <DetailLayout title="新增业务授权" onBack={onBack} bgColor="bg-[#F8F9FB]">
            <div className="space-y-6">
                {/* Search */}
                <div className="bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search size={18} className="text-slate-300 ml-2" />
                    <input 
                        type="text" 
                        placeholder="搜索银行、政务平台..." 
                        className="flex-1 text-sm font-bold text-slate-700 outline-none placeholder-slate-300"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {[{id: 'bank', label: '银行服务'}, {id: 'gov', label: '政务平台'}, {id: 'other', label: '第三方金融'}].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                                activeTab === tab.id 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'bg-white text-slate-500 border border-slate-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-3">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex items-center justify-between group active:scale-[0.99] transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                    <item.icon size={22} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100 active:scale-95 transition-transform">
                                去授权
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 p-5 bg-slate-50 rounded-[24px] border border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 mb-2">未找到需要的服务？</p>
                    <button className="text-xs font-black text-indigo-600 flex items-center justify-center gap-1">
                        联系客服申请接入 <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </DetailLayout>
    );
};

const AuthorityManager = ({ onBack }: { onBack: () => void }) => {
    const [mode, setMode] = useState<'list' | 'add'>('list');
    const [auths, setAuths] = useState([
        { id: '1', name: '招商银行 (银企直连)', icon: Landmark, color: 'text-rose-600', bg: 'bg-rose-50', status: 'active', scopes: ['余额查询', '回单下载'] },
        { id: '2', name: '上海一网通办', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50', status: 'active', scopes: ['社保申报', '公积金办理', '税务查询'] },
        { id: '3', name: '浦发银行 (一般户)', icon: Landmark, color: 'text-indigo-600', bg: 'bg-indigo-50', status: 'paused', scopes: ['余额查询'] },
    ]);

    const toggleAuth = (id: string) => {
        setAuths(prev => prev.map(item => 
            item.id === id ? { ...item, status: item.status === 'active' ? 'paused' : 'active' } : item
        ));
    };

    if (mode === 'add') return <AddAuthority onBack={() => setMode('list')} />;

    return (
        <DetailLayout title="数字权鉴管理" onBack={onBack} bgColor="bg-[#F8F9FB]">
            {/* Auth List */}
            <div className="space-y-4 pb-20 mt-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">已授权服务 (Authorized Services)</h3>
                {auths.map(item => (
                    <div key={item.id} className={`bg-white p-5 rounded-[24px] border transition-all ${item.status === 'active' ? 'border-slate-100 shadow-sm' : 'border-slate-100 opacity-60 grayscale-[0.5]'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                    <item.icon size={20} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                                    <p className={`text-[10px] font-bold mt-0.5 ${item.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {item.status === 'active' ? '● 授权生效中' : '● 已暂停授权'}
                                    </p>
                                </div>
                            </div>
                            <div 
                                onClick={() => toggleAuth(item.id)}
                                className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer ${item.status === 'active' ? 'bg-indigo-600' : 'bg-slate-200'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${item.status === 'active' ? 'left-6' : 'left-1'}`}></div>
                            </div>
                        </div>
                        {/* Scopes */}
                        <div className="flex flex-wrap gap-2">
                            {item.scopes.map(scope => (
                                <span key={scope} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100">
                                    {scope}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                
                <button onClick={() => setMode('add')} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-black text-xs flex items-center justify-center gap-2 hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all active:scale-[0.98]">
                    <Plus size={16} strokeWidth={3} /> 新增业务授权
                </button>
            </div>
        </DetailLayout>
    );
};

// --- 5. Service Contract ---

const ServiceContract = ({ onBack }: { onBack: () => void }) => (
    <DetailLayout title="签约服务" onBack={onBack}>
        {/* Premium Card */}
        <div className="bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-50 rounded-[32px] p-6 shadow-xl shadow-amber-100 border border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <Crown size={120} className="text-amber-600 -rotate-12" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">PRO</span>
                    <span className="text-amber-800 font-black text-xs uppercase tracking-widest">Current Plan</span>
                </div>
                <h2 className="text-2xl font-black text-amber-900 mb-6">GM Pilot 尊享版</h2>
                
                <div className="space-y-2 mb-6">
                    {['人事全模块托管', '财务代理记账 (500凭证/月)', '专属税务顾问通道', '法律合规风险扫描'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-amber-800/80">
                            <CheckCircle2 size={14} className="text-amber-600" /> {feat}
                        </div>
                    ))}
                </div>

                <div className="border-t border-amber-300/30 pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-800">有效期至</span>
                    <span className="text-sm font-black font-mono text-amber-900">2024-12-31</span>
                </div>
            </div>
        </div>

        {/* Service Team */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">专属服务团队</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">JC</div>
                    <div className="flex-1">
                        <h4 className="text-sm font-black text-slate-900">Jessica Chen</h4>
                        <p className="text-[10px] text-slate-400 font-bold">客户成功经理 (CSM)</p>
                    </div>
                    <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Phone size={16}/></button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">LW</div>
                    <div className="flex-1">
                        <h4 className="text-sm font-black text-slate-900">刘伟 (CPA)</h4>
                        <p className="text-[10px] text-slate-400 font-bold">资深财务顾问</p>
                    </div>
                    <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Phone size={16}/></button>
                </div>
            </div>
        </div>
    </DetailLayout>
);

// --- 6. Admin Manager ---

const AdminManager = ({ onBack }: { onBack: () => void }) => {
    const admins = [
        { id: 1, name: '张总经理', role: '超级管理员', avatar: 'GM', isMe: true },
        { id: 2, name: '李财务', role: '财务操作员', avatar: 'FM', isMe: false },
        { id: 3, name: '王人事', role: '人事操作员', avatar: 'HR', isMe: false },
    ];

    return (
        <DetailLayout title="成员权限管理" onBack={onBack}>
            <div className="space-y-4">
                {admins.map(user => (
                    <div key={user.id} className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm border border-slate-200">
                                {user.avatar}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-black text-slate-900">{user.name}</h4>
                                    {user.isMe && <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-bold">我</span>}
                                </div>
                                <p className={`text-[10px] font-bold mt-0.5 ${user.role === '超级管理员' ? 'text-indigo-600' : 'text-slate-400'}`}>{user.role}</p>
                            </div>
                        </div>
                        {!user.isMe && (
                            <button className="text-[10px] font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 bg-slate-50 rounded-lg transition-colors">
                                移除
                            </button>
                        )}
                    </div>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-black text-sm flex items-center justify-center gap-2 hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all">
                    <UserPlus size={18} strokeWidth={2.5} /> 邀请新成员
                </button>
            </div>
        </DetailLayout>
    );
};

// --- 7. Operation Logs ---

const OperationLogs = ({ onBack }: { onBack: () => void }) => {
    const logs = [
        { id: 1, action: '确认薪资发放', module: '薪酬管理', time: '今天 10:30', ip: 'iPhone 14 Pro', urgent: false },
        { id: 2, action: '导出资产负债表', module: '财税报表', time: '昨天 15:45', ip: 'Web PC', urgent: true },
        { id: 3, action: '发起合同续签', module: '合同管理', time: '12-20 09:20', ip: 'iPhone 14 Pro', urgent: false },
        { id: 4, action: '修改员工王强薪资', module: '员工档案', time: '12-18 14:00', ip: 'iPhone 14 Pro', urgent: true },
    ];

    return (
        <DetailLayout title="安全操作日志" onBack={onBack}>
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                <div className="space-y-6 relative ml-2">
                    <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 rounded-full"></div>
                    {logs.map(log => (
                        <div key={log.id} className="relative flex gap-5">
                            <div className={`w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 ${
                                log.urgent ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                                {log.urgent ? <AlertCircle size={14} /> : <div className="w-2 h-2 rounded-full bg-slate-400"></div>}
                            </div>
                            <div className="flex-1 pb-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-black text-slate-900">{log.action}</h4>
                                    <span className="text-[10px] font-mono font-bold text-slate-400">{log.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100 font-bold">{log.module}</span>
                                    <span className="text-[9px] text-slate-300 font-medium flex items-center gap-1"><Smartphone size={8} /> {log.ip}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetailLayout>
    );
};

// --- 8. Notification Settings ---

const NotificationSettings = ({ onBack }: { onBack: () => void }) => {
    const ToggleItem = ({ label, desc, defaultChecked }: any) => {
        const [checked, setChecked] = useState(defaultChecked);
        return (
            <div className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
                <div>
                    <h4 className="text-sm font-black text-slate-900">{label}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{desc}</p>
                </div>
                <div 
                    onClick={() => setChecked(!checked)}
                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 cursor-pointer ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'left-6' : 'left-1'}`}></div>
                </div>
            </div>
        )
    };

    return (
        <DetailLayout title="消息通知设置" onBack={onBack}>
            <div className="bg-white rounded-[32px] px-6 py-2 shadow-sm border border-slate-100">
                <ToggleItem label="重要待办提醒" desc="工资发放、税金申报等紧急任务" defaultChecked={true} />
                <ToggleItem label="进度更新通知" desc="服务工单、入职办理进度流转" defaultChecked={true} />
                <ToggleItem label="经营日报/周报" desc="每日早晨8:30推送经营数据概览" defaultChecked={false} />
                <ToggleItem label="系统安全告警" desc="异地登录、敏感操作验证" defaultChecked={true} />
            </div>
            
            <div className="mt-4 px-2">
                <p className="text-[10px] text-slate-400 font-bold text-center">
                    注：涉及资金安全的验证码短信无法关闭。
                </p>
            </div>
        </DetailLayout>
    );
};

// --- Main Switch Component ---

const CompanyDetails = ({ type, onBack }: { type: string, onBack: () => void }) => {
    switch (type) {
        case 'addr': return <AddressManager onBack={onBack} />;
        case 'inv': return <InvoiceInfo onBack={onBack} />;
        case 'seal': return <SealManager onBack={onBack} />;
        case 'cert': return <AuthorityManager onBack={onBack} />;
        case 'contract': return <ServiceContract onBack={onBack} />;
        case 'admin': return <AdminManager onBack={onBack} />;
        case 'log': return <OperationLogs onBack={onBack} />;
        case 'notify': return <NotificationSettings onBack={onBack} />;
        default: return <DetailLayout title="详情" onBack={onBack}><div className="text-center py-20 text-gray-400">功能建设中</div></DetailLayout>;
    }
};

export default CompanyDetails;

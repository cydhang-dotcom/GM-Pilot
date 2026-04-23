import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Phone, CreditCard, ChevronRight, CheckCircle2, ShieldCheck, Mail, MapPin } from 'lucide-react';

const SelfOnboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    const [formData, setFormData] = useState({
        name: '',
        idCard: '',
        phone: '',
        email: '',
        address: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (!formData.name || !formData.idCard || !formData.phone) {
            alert('请填写必填项（姓名、身份证号、手机号）');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(2);
        }, 1000);
    };

    if (step === 2) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-6 pb-20 max-w-md mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-64 bg-indigo-600 rounded-b-[48px] shadow-lg shadow-indigo-200"></div>
                
                <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 w-full relative z-10 text-center flex flex-col items-center border border-slate-100">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-100 shadow-inner">
                        <CheckCircle2 size={40} strokeWidth={2.5} />
                    </div>
                    
                    <h2 className="text-xl font-black text-slate-800 tracking-tight mb-2">信息提交成功</h2>
                    <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                        您的入职登记信息已发送至公司HR部门。<br/>
                        请等待公司后续的入职材料与合同签署通知。
                    </p>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-400">入职申请公司</span>
                            <span className="text-xs font-black text-slate-700">上海千机网络科技有限公司</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-400">登记时间</span>
                            <span className="text-xs font-mono font-bold text-slate-700">{new Date().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400">当前流程状态</span>
                            <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg border border-blue-200">公司审核中</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 opacity-40 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-500">千机智能 HR 平台提供技术支持</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col max-w-md mx-auto relative">
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-b-[40px] shadow-lg z-0"></div>
            
            <div className="relative z-10 pt-12 px-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 border-2 border-indigo-100">
                        <Building2 size={32} className="text-indigo-600" />
                    </div>
                    <h1 className="text-xl font-black text-white text-center pb-1">上海千机网络科技有限公司</h1>
                    <span className="text-xs font-bold text-indigo-200 bg-indigo-800/40 px-3 py-1 rounded-full border border-indigo-800 border-dashed backdrop-blur-sm">新员工入职登记</span>
                </div>

                <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100">
                    <div className="mb-6">
                        <h2 className="text-lg font-black text-slate-800 tracking-tight">基本身份信息</h2>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">请如实填写您的个人资料，用于办理社保与发薪</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">真实姓名 <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="您的姓名"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-10 pr-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">身份证号 <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="18位身份证号码"
                                    value={formData.idCard}
                                    onChange={e => setFormData({ ...formData, idCard: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-10 pr-4 text-sm font-black font-mono text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:font-sans placeholder:text-slate-300 placeholder:font-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">手机号码 <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="tel" 
                                    placeholder="11位手机号码"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-10 pr-4 text-sm font-black font-mono text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:font-sans placeholder:text-slate-300 placeholder:font-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">联系邮箱</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="email" 
                                    placeholder="用于接收入职文件 (选填)"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-10 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">现居住址</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="详细家庭住址 (选填)"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-10 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-8">
                    <button 
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                    >
                        {isSubmitting ? '提交中...' : '提交信息'}
                    </button>
                    <div className="mt-4 text-center">
                        <button onClick={() => navigate(-1)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 underline underline-offset-4">取消返回</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfOnboarding;

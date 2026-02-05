
import React from 'react';
import { ArrowLeft, Share2, MoreHorizontal } from 'lucide-react';

interface DetailLayoutProps {
  title: string;
  tag?: { label: string; color: string; bg: string };
  onBack: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  themeColor?: string; // Class for header background (e.g., 'bg-white' or 'bg-gray-50')
  bgColor?: string; // Class for page background (e.g., 'bg-[#F9FAFB]')
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({ 
  title, 
  tag, 
  onBack, 
  children, 
  actions, 
  themeColor = "bg-white",
  bgColor = "bg-[#F8F9FB]"
}) => {
  return (
    <div className={`fixed inset-0 z-[60] flex flex-col ${bgColor} max-w-md mx-auto w-full h-full border-x border-gray-200 animate-slide-in-right font-sans overflow-hidden`}>
      {/* Header */}
      <div className={`px-6 pt-12 pb-4 border-b border-slate-100 flex items-center justify-between z-20 shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${themeColor} shrink-0`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-slate-800 active:scale-90">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-1 tracking-tight">{title}</h2>
            {tag && (
              <span className={`text-[10px] font-bold mt-0.5 px-2 py-0.5 rounded-md w-fit uppercase tracking-wider ${tag.bg} ${tag.color}`}>
                {tag.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 text-slate-400">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Share2 size={20} strokeWidth={2} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><MoreHorizontal size={20} strokeWidth={2} /></button>
        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 relative">
        {children}
        <div className="h-12"></div> {/* Bottom spacer */}
      </div>

      {/* Sticky Footer Actions */}
      {actions && (
        <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 p-6 pb-8 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] sticky bottom-0 z-20 shrink-0">
            {actions}
        </div>
      )}
    </div>
  );
};

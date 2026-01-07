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
  bgColor = "bg-[#F9FAFB]"
}) => {
  return (
    <div className={`fixed inset-0 z-[60] flex flex-col ${bgColor} max-w-md mx-auto w-full h-full border-x border-gray-200 animate-slide-in-right font-sans overflow-hidden`}>
      {/* Header */}
      {/* Note: Removed 'sticky' because this is a flex column where header is static and only content scrolls. 
          Added 'shrink-0' to prevent header compression. */}
      <div className={`px-4 pt-10 pb-3 border-b border-gray-200 flex items-center justify-between z-20 shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${themeColor} shrink-0`}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-gray-700 active:scale-90">
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-gray-900 leading-tight line-clamp-1">{title}</h2>
            {tag && (
              <span className={`text-[10px] font-bold mt-0.5 px-1.5 py-0.5 rounded-md w-fit ${tag.bg} ${tag.color}`}>
                {tag.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 text-gray-500">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Share2 size={20} strokeWidth={2} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><MoreHorizontal size={20} strokeWidth={2} /></button>
        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6 relative">
        {children}
        <div className="h-12"></div> {/* Bottom spacer */}
      </div>

      {/* Sticky Footer Actions */}
      {actions && (
        <div className="bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.05)] sticky bottom-0 z-20 shrink-0">
            {actions}
        </div>
      )}
    </div>
  );
};

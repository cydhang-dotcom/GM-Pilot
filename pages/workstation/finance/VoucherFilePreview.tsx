
import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { Attachment } from './VoucherManager';

const VoucherFilePreview = ({ attachment, onBack }: { attachment: Attachment, onBack: () => void }) => {
    return (
        <div className="fixed inset-0 z-[70] bg-black flex flex-col animate-fade-in">
            <div className="flex justify-between items-center px-4 py-4 bg-black/50 backdrop-blur-sm absolute top-0 w-full z-10">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 text-white"><X size={20} /></button>
                <span className="text-white text-sm font-bold truncate max-w-[200px]">{attachment.fileName}</span>
                <button className="p-2 rounded-full bg-white/10 text-white"><Download size={20} /></button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-sm aspect-[3/4] rounded-sm shadow-2xl flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 border-[16px] border-white bg-gray-50 flex items-center justify-center">
                        <div className="text-center opacity-10 transform -rotate-45">
                            <p className="text-4xl font-bold uppercase tracking-widest text-gray-900">Original Document</p>
                        </div>
                        <FileText size={64} className="text-gray-200 absolute" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherFilePreview;

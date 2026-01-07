import React from 'react';
import { Clock } from 'lucide-react';

interface Props {
  title: string;
}

const GenericWorkView: React.FC<Props> = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-8">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Clock size={32} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}功能建设中</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
            该模块正在进行移动端适配开发，请暂时通过 PC 端后台访问完整功能。
        </p>
    </div>
);

export default GenericWorkView;
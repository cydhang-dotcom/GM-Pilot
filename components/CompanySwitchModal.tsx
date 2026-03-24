import React, { useState } from 'react';
import { Search, X, Building2, Check } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

const mockCompanies: Company[] = [
  { id: '1', name: '千机科技' },
  { id: '2', name: '万物互联' },
  { id: '3', name: '星辰大海' },
  { id: '4', name: '未来工厂' },
];

interface Props {
  onClose: () => void;
  onSelect: (company: Company) => void;
  currentCompanyId: string;
}

const CompanySwitchModal: React.FC<Props> = ({ onClose, onSelect, currentCompanyId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (company: Company) => {
    onSelect(company);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[32px] w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">切换企业</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜索企业名称"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              onClick={() => handleSelect(company)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${
                currentCompanyId === company.id ? 'bg-indigo-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <span className={`text-sm font-bold ${currentCompanyId === company.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {company.name}
                </span>
              </div>
              {currentCompanyId === company.id && <Check size={18} className="text-indigo-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySwitchModal;

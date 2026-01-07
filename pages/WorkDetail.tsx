import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';

// Modules
import Payroll from './workstation/hr/Payroll';
import Employee from './workstation/hr/Employee';
import SocialSecurity from './workstation/hr/SocialSecurity';
import Contract from './workstation/hr/Contract';

import Reconciliation from './workstation/finance/Reconciliation';
import CashFlow from './workstation/finance/CashFlow';
import Invoice from './workstation/finance/Invoice';
import Reimbursement from './workstation/finance/Reimbursement';
import VoucherManager from './workstation/finance/VoucherManager';
import FinancialReports from './workstation/finance/FinancialReports';
import Tax from './workstation/finance/Tax';

import ServiceRequest from './workstation/services/ServiceRequest';
import GovernmentSubsidy from './workstation/services/GovernmentSubsidy';
import GenericWorkView from '../components/GenericWorkView';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Map IDs to titles and Views
  const getPageConfig = (id: string | undefined) => {
    switch(id) {
        // Finance Ops
        case 'fn-rec': return { title: '对账中心', component: <Reconciliation /> };
        case 'fn-flow': return { title: '资金流水', component: <CashFlow /> };
        case 'fn-4': return { title: '发票管理', component: <Invoice /> };
        case 'fn-reim': return { title: '费用报销', component: <Reimbursement /> };
        case 'fn-3': return { title: '凭证管理', component: <VoucherManager /> }; 
        case 'fn-5': return { title: '财税报表', component: <FinancialReports /> };
        case 'fn-2': return { title: '税款缴纳', component: <Tax /> };

        // HR
        case 'hr-1': return { title: '薪酬管理', component: <Payroll /> };
        case 'hr-emp': return { title: '员工管理', component: <Employee /> };
        case 'hr-4': return { title: '五险一金', component: <SocialSecurity /> };
        case 'hr-6': return { title: '合同管理', component: <Contract /> };
        
        // Services
        case 'srv-subsidy': return { title: '政府补助', component: <GovernmentSubsidy /> };
        case 'ot-1': 
        case 'ot-3': 
        case 'ot-4':
        case 'ot-5':
             return { title: '企业服务台', component: <ServiceRequest type={id || ''} /> };

        default: return { title: '详情', component: <GenericWorkView title="该" /> };
    }
  };

  const config = getPageConfig(id);

  return (
    <div className="min-h-screen bg-gray-50 pb-8 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-600 transition-colors"
        >
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
            {config.title}
        </h1>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar relative">
        {config.component}
      </div>
    </div>
  );
};

export default WorkDetail;

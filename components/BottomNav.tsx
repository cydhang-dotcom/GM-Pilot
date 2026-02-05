import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, Briefcase, Building2 } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const navItemClass = (active: boolean) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-500'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-lg max-w-md mx-auto">
      <div className="flex h-full">
        <Link to="/" className={navItemClass(isActive('/'))}>
          <LayoutDashboard size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">总览</span>
        </Link>
        <Link to="/inbox" className={navItemClass(isActive('/inbox'))}>
          <div className="relative">
            <Inbox size={24} strokeWidth={2} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </div>
          <span className="text-[10px] font-medium">任务</span>
        </Link>
        <Link to="/work" className={navItemClass(isActive('/work'))}>
          <Briefcase size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">事务</span>
        </Link>
        <Link to="/company" className={navItemClass(isActive('/company'))}>
          <Building2 size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">公司</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
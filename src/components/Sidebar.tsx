import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSidebarState } from '../hooks/useSidebarState';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarState();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
    { icon: ClipboardList, text: 'Onboard Form', path: '/onboard' },
    { icon: Database, text: 'Domain Management', path: '/domain' },
    { icon: Users, text: 'Producers', path: '/producers' },
    { icon: Users, text: 'Consumers', path: '/consumers' },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="h-full px-3 py-4 relative">
        <button
          onClick={toggle}
          className="absolute -right-3 top-10 bg-purple-600 text-white rounded-full p-1 shadow-lg"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                  isActive ? 'bg-purple-100 text-purple-700' : ''
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              {isOpen && <span className="ml-3">{item.text}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
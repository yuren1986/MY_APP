// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Scan, Bell, User, Plus } from 'lucide-react';

const tabs = [{
  id: 'home',
  label: '首页',
  icon: Home
}, {
  id: 'scan',
  label: '扫码',
  icon: Scan
}, {
  id: 'add',
  label: '添加',
  icon: Plus,
  isCenter: true
}, {
  id: 'reminder',
  label: '提醒',
  icon: Bell
}, {
  id: 'settings',
  label: '我的',
  icon: User
}];
function TabBar(props) {
  const {
    activeTab = 'home'
  } = props;
  const handleTabClick = tabId => {
    // 处理添加按钮
    if (tabId === 'add') {
      // 添加按钮逻辑由父组件处理
      return;
    }

    // 页面跳转
    if (tabId === 'home') {
      props.$w.utils.navigateTo('index', {});
    } else if (tabId === 'scan') {
      props.$w.utils.navigateTo('scan', {});
    } else if (tabId === 'reminder') {
      props.$w.utils.navigateTo('reminder', {});
    } else if (tabId === 'settings') {
      props.$w.utils.navigateTo('settings', {});
    }
  };
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DEE2E6] z-30 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        // 中心添加按钮样式
        if (tab.isCenter) {
          return <div key={tab.id} className="flex flex-col items-center -mt-4">
                <button className="w-14 h-14 rounded-full bg-[#E85D04] text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform" style={{
              minWidth: '56px',
              minHeight: '56px'
            }} aria-label="添加物品">
                  <Icon className="w-7 h-7" />
                </button>
              </div>;
        }
        return <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-[#E85D04]' : 'text-[#6C757D]'}`} style={{
          minWidth: '60px',
          minHeight: '56px'
        }} aria-label={tab.label} aria-current={isActive ? 'page' : undefined}>
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>;
      })}
      </div>
      
      {/* 顶部细线强调 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#E85D04] rounded-b-full opacity-80"></div>
    </div>;
}
export default TabBar;
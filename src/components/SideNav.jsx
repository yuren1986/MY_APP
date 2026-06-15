// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, GitBranch, Layers, Users, Smartphone, Grid3X3 } from 'lucide-react';

const navItems = [{
  id: 'overview',
  label: '产品概览',
  icon: Home
}, {
  id: 'architecture',
  label: '系统架构',
  icon: GitBranch
}, {
  id: 'functions',
  label: '功能模块',
  icon: Layers
}, {
  id: 'users',
  label: '目标用户',
  icon: Users
}, {
  id: 'platform',
  label: '支持平台',
  icon: Smartphone
}, {
  id: 'scenarios',
  label: '应用场景',
  icon: Grid3X3
}];
export default function SideNav({
  activeSection,
  onNavigate
}) {
  return <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-[#DEE2E6] p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#6C757D] uppercase tracking-wider mb-3 px-3">导航菜单</h3>
        <nav className="space-y-1">
          {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-[#FFF4ED] text-[#E85D04] font-medium' : 'text-[#2D3436] hover:bg-[#F8F9FA]'}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E85D04]' : 'text-[#6C757D]'}`} />
                {item.label}
              </button>;
        })}
        </nav>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-[#1B4965] to-[#2D5A7B] rounded-xl text-white">
        <h4 className="font-semibold mb-2">快速开始</h4>
        <p className="text-xs text-white/80 mb-3">扫码添加物品，智能管理保质期</p>
        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors">
          查看教程
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-[#A7C957]/10 rounded-xl border border-[#A7C957]/30">
        <h4 className="font-semibold text-[#1B4965] mb-2">数据统计</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#6C757D]">已管理物品</span>
            <span className="font-semibold text-[#1B4965]">128</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6C757D]">本月提醒</span>
            <span className="font-semibold text-[#E85D04]">23</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6C757D]">临期预警</span>
            <span className="font-semibold text-[#A7C957]">5</span>
          </div>
        </div>
      </div>
    </aside>;
}
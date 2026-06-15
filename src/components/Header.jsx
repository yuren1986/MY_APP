// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Scan, Bell, Package } from 'lucide-react';

export default function Header() {
  return <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-[#E85D04] z-50 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#E85D04] to-[#F48C06] rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#1B4965]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            HomeKeeper
          </h1>
          <p className="text-xs text-[#6C757D] -mt-0.5">家庭物品保质期管理</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#overview" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">产品概览</a>
        <a href="#architecture" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">系统架构</a>
        <a href="#functions" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">功能模块</a>
        <a href="#users" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">目标用户</a>
        <a href="#platform" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">支持平台</a>
        <a href="#scenarios" className="text-sm text-[#2D3436] hover:text-[#E85D04] transition-colors">应用场景</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-[#FFF4ED] transition-colors">
          <Bell className="w-5 h-5 text-[#1B4965]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E85D04] rounded-full"></span>
        </button>
        <button className="px-4 py-2 bg-[#E85D04] text-white text-sm font-medium rounded-lg hover:bg-[#F48C06] transition-colors">
          下载 App
        </button>
      </div>
    </header>;
}
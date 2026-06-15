// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Scan, Mic, AlertCircle, Database } from 'lucide-react';

export default function HeroSection() {
  return <section className="relative mb-12 p-8 bg-gradient-to-br from-[#1B4965] via-[#2D5A7B] to-[#1B4965] rounded-3xl overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#A7C957] text-[#1B4965] text-xs font-medium rounded-full">
            v2.0 发布
          </span>
          <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">
            支持离线使用
          </span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          家庭日常用品<br />存储与质保期提醒应用
        </h2>
        
        <p className="text-lg text-white/80 mb-8 max-w-2xl">
          智能管理家庭物品保质期，通过扫码、语音等多种方式快速录入，
          自动提醒临期物品，让生活更健康、更便捷。
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-[#E85D04] hover:bg-[#F48C06] text-white font-medium rounded-xl transition-colors flex items-center gap-2">
            <Scan className="w-5 h-5" />
            立即体验
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/30">
            查看文档
          </button>
        </div>
        
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{
          icon: Scan,
          label: '扫码识别',
          value: '99.5%'
        }, {
          icon: Mic,
          label: '语音交互',
          value: '< 1s'
        }, {
          icon: AlertCircle,
          label: '提醒准确率',
          value: '98%'
        }, {
          icon: Database,
          label: '物品数据库',
          value: '10万+'
        }].map((stat, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <stat.icon className="w-6 h-6 text-[#A7C957] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
}
// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Smartphone, Watch, Car, Tablet, Server, Database, Brain, Bell, Wifi, WifiOff, Users, Shield } from 'lucide-react';

export default function ArchitectureSection() {
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          系统架构
        </h3>
      </div>
      
      {/* 终端层 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#E85D04] text-white text-xs font-medium rounded-full">终端层</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{
          icon: Smartphone,
          name: '手机',
          desc: 'iOS / Android',
          color: '#E85D04'
        }, {
          icon: Watch,
          name: '智能手表',
          desc: 'WatchOS / Wear OS',
          color: '#1B4965'
        }, {
          icon: Tablet,
          name: '平板 PAD',
          desc: 'iPadOS / Android',
          color: '#A7C957'
        }, {
          icon: Car,
          name: '车机系统',
          desc: 'Android Auto / CarPlay',
          color: '#F48C06'
        }].map((device, index) => <div key={index} className="p-4 bg-white rounded-xl border border-[#DEE2E6] hover:shadow-md transition-all group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              backgroundColor: `${device.color}15`
            }}>
                  <device.icon className="w-5 h-5" style={{
                color: device.color
              }} />
                </div>
                <div>
                  <h5 className="font-semibold text-[#1B4965] group-hover:text-[#E85D04] transition-colors">
                    {device.name}
                  </h5>
                  <p className="text-xs text-[#6C757D]">{device.desc}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* 连接箭头 */}
      <div className="flex justify-center my-4">
        <div className="flex flex-col items-center text-[#6C757D]">
          <div className="w-0.5 h-8 bg-[#DEE2E6]"></div>
          <span className="text-xs mt-1">数据传输</span>
        </div>
      </div>
      
      {/* 云服务层 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#1B4965] text-white text-xs font-medium rounded-full">云服务层</span>
        </div>
        <div className="bg-gradient-to-br from-[#1B4965]/5 to-[#1B4965]/10 rounded-2xl p-6 border border-[#1B4965]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{
            icon: Server,
            name: 'API 网关',
            desc: '统一接入 / 负载均衡',
            color: '#1B4965'
          }, {
            icon: Brain,
            name: 'AI 引擎',
            desc: '图像识别 / 语义理解',
            color: '#E85D04'
          }, {
            icon: Database,
            name: '数据服务',
            desc: '用户数据 / 物品数据',
            color: '#A7C957'
          }, {
            icon: Bell,
            name: '推送服务',
            desc: '提醒通知 / 消息触达',
            color: '#F48C06'
          }].map((service, index) => <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                backgroundColor: `${service.color}15`
              }}>
                    <service.icon className="w-4 h-4" style={{
                  color: service.color
                }} />
                  </div>
                  <span className="font-semibold text-[#1B4965]">{service.name}</span>
                </div>
                <p className="text-xs text-[#6C757D]">{service.desc}</p>
              </div>)}
          </div>
        </div>
      </div>
      
      {/* 架构特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{
        icon: Wifi,
        title: '在线模式',
        desc: '实时同步，云端 AI 识别，数据多端共享',
        badge: '推荐',
        badgeColor: '#E85D04'
      }, {
        icon: WifiOff,
        title: '离线模式',
        desc: '本地缓存完整功能，网络恢复后自动同步',
        badge: '必备',
        badgeColor: '#A7C957'
      }, {
        icon: Users,
        title: '家庭共享',
        desc: '多成员协作，统一管理家庭物品清单',
        badge: '特色',
        badgeColor: '#1B4965'
      }].map((feature, index) => <div key={index} className="relative p-5 bg-white rounded-xl border border-[#DEE2E6] hover:shadow-lg transition-all">
            <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium text-white rounded-full" style={{
          backgroundColor: feature.badgeColor
        }}>
              {feature.badge}
            </span>
            <feature.icon className="w-8 h-8 text-[#1B4965] mb-3" />
            <h5 className="font-semibold text-[#1B4965] mb-2">{feature.title}</h5>
            <p className="text-sm text-[#6C757D]">{feature.desc}</p>
          </div>)}
      </div>
    </section>;
}
// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Shield, Zap, Cloud, Wifi, HeartHandshake } from 'lucide-react';

export default function ProductIntro() {
  const features = [{
    icon: Shield,
    title: '安全可靠',
    description: '本地数据加密存储，保护家庭隐私安全',
    color: '#1B4965'
  }, {
    icon: Zap,
    title: '快速便捷',
    description: '扫码即识别，语音即可添加，操作简单',
    color: '#E85D04'
  }, {
    icon: Cloud,
    title: '云端同步',
    description: '多设备数据实时同步，随时随地查看',
    color: '#A7C957'
  }, {
    icon: Wifi,
    title: '离线可用',
    description: '无网络也能正常使用，数据本地保存',
    color: '#F48C06'
  }, {
    icon: HeartHandshake,
    title: '家庭共享',
    description: '家庭成员共同管理，温馨守护每一天',
    color: '#E85D04'
  }];
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          产品介绍
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl border border-[#DEE2E6] hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold text-[#1B4965] mb-3">产品定位</h4>
          <p className="text-[#6C757D] text-sm leading-relaxed">
            HomeKeeper 是一款专注于家庭日常用品保质期管理的智能应用。我们致力于帮助每个家庭科学管理物品存储，
            避免因过期造成的浪费和潜在健康风险。通过 AI 技术和海量数据库，为用户提供精准的存储建议和智能提醒。
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-2xl border border-[#DEE2E6] hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold text-[#1B4965] mb-3">核心价值</h4>
          <ul className="space-y-2 text-sm text-[#6C757D]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full mt-2 flex-shrink-0"></span>
              <span>减少食物和用品浪费，节省家庭开支</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#A7C957] rounded-full mt-2 flex-shrink-0"></span>
              <span>避免使用过期产品，保障家人健康</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#1B4965] rounded-full mt-2 flex-shrink-0"></span>
              <span>智能提醒，再也不会忘记物品有效期</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#F48C06] rounded-full mt-2 flex-shrink-0"></span>
              <span>全家共享，统一管理更省心</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {features.map((feature, index) => <div key={index} className="p-5 bg-white rounded-xl border border-[#DEE2E6] hover:shadow-md hover:border-[#E85D04]/30 transition-all group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
          backgroundColor: `${feature.color}15`
        }}>
              <feature.icon className="w-6 h-6" style={{
            color: feature.color
          }} />
            </div>
            <h5 className="font-semibold text-[#1B4965] mb-1 group-hover:text-[#E85D04] transition-colors">
              {feature.title}
            </h5>
            <p className="text-xs text-[#6C757D] leading-relaxed">
              {feature.description}
            </p>
          </div>)}
      </div>
    </section>;
}
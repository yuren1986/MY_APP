// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Smartphone, Watch, Car, Tablet, Globe, Wifi, WifiOff, Check, ArrowRight } from 'lucide-react';

export default function PlatformSupport() {
  const platforms = [{
    icon: Smartphone,
    name: '手机',
    systems: ['iOS 14+', 'Android 8.0+'],
    features: ['全功能支持', '扫码识别', '语音交互', '拍照录入'],
    status: 'full',
    color: '#E85D04'
  }, {
    icon: Watch,
    name: '智能手表',
    systems: ['WatchOS 8+', 'Wear OS 3.0+'],
    features: ['快捷查看', '震动提醒', '语音输入'],
    status: 'partial',
    color: '#1B4965'
  }, {
    icon: Tablet,
    name: '平板电脑',
    systems: ['iPadOS 15+', 'Android 12L+'],
    features: ['全功能支持', '大屏体验', '分屏操作'],
    status: 'full',
    color: '#A7C957'
  }, {
    icon: Car,
    name: '车机系统',
    systems: ['Android Auto', 'CarPlay'],
    features: ['语音提醒', '简单查看', '驾驶模式'],
    status: 'basic',
    color: '#F48C06'
  }];
  const modes = [{
    icon: Globe,
    name: '在线模式',
    description: '实时同步，云端 AI 识别',
    advantages: ['AI 精准识别', '数据实时同步', '智能推荐'],
    color: '#E85D04'
  }, {
    icon: WifiOff,
    name: '离线模式',
    description: '本地缓存完整功能',
    advantages: ['无网可用', '本地数据安全', '快速响应'],
    color: '#A7C957'
  }];
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          支持平台
        </h3>
      </div>
      
      {/* 平台卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platforms.map((platform, index) => <div key={index} className="bg-white rounded-2xl border border-[#DEE2E6] overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6" style={{
          background: `linear-gradient(135deg, ${platform.color}10 0%, transparent 100%)`
        }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              backgroundColor: `${platform.color}20`
            }}>
                  <platform.icon className="w-6 h-6" style={{
                color: platform.color
              }} />
                </div>
                <span className="px-2 py-1 text-xs rounded-full" style={{
              backgroundColor: platform.status === 'full' ? '#A7C95720' : platform.status === 'partial' ? '#E85D0420' : '#6C757D20',
              color: platform.status === 'full' ? '#A7C957' : platform.status === 'partial' ? '#E85D04' : '#6C757D'
            }}>
                  {platform.status === 'full' ? '完整版' : platform.status === 'partial' ? '精简版' : '基础版'}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1B4965] mb-2">{platform.name}</h4>
              <div className="flex flex-wrap gap-2">
                {platform.systems.map((sys, i) => <span key={i} className="px-2 py-0.5 bg-[#F8F9FA] text-xs text-[#6C757D] rounded">
                    {sys}
                  </span>)}
              </div>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                {platform.features.map((feature, i) => <li key={i} className="flex items-center gap-2 text-sm text-[#6C757D]">
                    <Check className="w-4 h-4 text-[#A7C957] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>)}
              </ul>
            </div>
          </div>)}
      </div>
      
      {/* 使用模式 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode, index) => <div key={index} className="p-6 bg-white rounded-2xl border border-[#DEE2E6] hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{
            backgroundColor: `${mode.color}15`
          }}>
                <mode.icon className="w-7 h-7" style={{
              color: mode.color
            }} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-[#1B4965] mb-1">{mode.name}</h4>
                <p className="text-sm text-[#6C757D] mb-4">{mode.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mode.advantages.map((adv, i) => <span key={i} className="px-3 py-1 text-xs rounded-full" style={{
                backgroundColor: `${mode.color}15`,
                color: mode.color
              }}>
                      {adv}
                    </span>)}
                </div>
              </div>
            </div>
          </div>)}
      </div>
      
      {/* 技术规格 */}
      <div className="mt-8 p-6 bg-[#1B4965]/5 rounded-2xl border border-[#1B4965]/20">
        <h4 className="text-lg font-semibold text-[#1B4965] mb-4">技术规格</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{
          label: '安装包大小',
          value: '< 50MB'
        }, {
          label: '离线数据包',
          value: '< 20MB'
        }, {
          label: '内存占用',
          value: '< 100MB'
        }, {
          label: '电池优化',
          value: '低功耗'
        }].map((spec, index) => <div key={index} className="text-center p-4 bg-white rounded-xl">
              <div className="text-2xl font-bold text-[#1B4965] mb-1">{spec.value}</div>
              <div className="text-xs text-[#6C757D]">{spec.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
}
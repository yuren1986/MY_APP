// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Utensils, Pill, Sparkles, Thermometer, Droplets, Sun, ArrowRight } from 'lucide-react';

export default function UseCaseSection() {
  const scenarios = [{
    icon: Utensils,
    title: '厨房场景',
    subtitle: '调味品 / 食材',
    color: '#E85D04',
    items: [{
      name: '酱油、醋、料酒',
      storage: '阴凉干燥处',
      expire: '12-24个月'
    }, {
      name: '大米、面粉、杂粮',
      storage: '密封容器',
      expire: '6-12个月'
    }, {
      name: '食用油',
      storage: '避光阴凉',
      expire: '18个月'
    }, {
      name: '调味酱料',
      storage: '冷藏保存',
      expire: '6-12个月'
    }, {
      name: '干制食材',
      storage: '干燥通风',
      expire: '12-36个月'
    }]
  }, {
    icon: Sparkles,
    title: '日常用品',
    subtitle: '牙膏 / 牙刷 / 洗漱',
    color: '#1B4965',
    items: [{
      name: '牙膏',
      storage: '常温避光',
      expire: '12个月'
    }, {
      name: '牙刷',
      storage: '直立通风',
      expire: '3-4个月'
    }, {
      name: '洗发水/沐浴露',
      storage: '常温避光',
      expire: '12-36个月'
    }, {
      name: '护肤品',
      storage: '阴凉干燥',
      expire: '6-24个月'
    }, {
      name: '化妆品',
      storage: '避光常温',
      expire: '12个月'
    }]
  }, {
    icon: Pill,
    title: '医药场景',
    subtitle: '药品 / 保健品',
    color: '#A7C957',
    items: [{
      name: '口服药品',
      storage: '阴凉干燥',
      expire: '详见包装'
    }, {
      name: '外用药膏',
      storage: '室温保存',
      expire: '12-24个月'
    }, {
      name: '保健品',
      storage: '避光密封',
      expire: '24个月'
    }, {
      name: '创可贴',
      storage: '干燥通风',
      expire: '36个月'
    }, {
      name: '体温计',
      storage: '常温保存',
      expire: '长期'
    }]
  }];
  const storageIcons = [{
    icon: Thermometer,
    label: '温度控制',
    desc: '2-25°C 根据物品'
  }, {
    icon: Droplets,
    label: '湿度管理',
    desc: '保持在 30-60%'
  }, {
    icon: Sun,
    label: '避光存储',
    desc: '远离阳光直射'
  }];
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          应用场景
        </h3>
      </div>
      
      {/* 存储条件 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#A7C957]/10 to-[#E85D04]/10 rounded-2xl">
        <h4 className="text-lg font-semibold text-[#1B4965] mb-4">存储条件建议</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {storageIcons.map((item, index) => <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-[#A7C957]/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#A7C957]" />
              </div>
              <div>
                <h5 className="font-semibold text-[#1B4965]">{item.label}</h5>
                <p className="text-sm text-[#6C757D]">{item.desc}</p>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* 场景卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => <div key={index} className="bg-white rounded-2xl border border-[#DEE2E6] overflow-hidden hover:shadow-lg transition-all">
            {/* 场景头部 */}
            <div className="p-6" style={{
          background: `linear-gradient(135deg, ${scenario.color}15 0%, ${scenario.color}05 100%)`
        }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
              backgroundColor: `${scenario.color}20`
            }}>
                  <scenario.icon className="w-7 h-7" style={{
                color: scenario.color
              }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1B4965]">{scenario.title}</h4>
                  <p className="text-sm" style={{
                color: scenario.color
              }}>{scenario.subtitle}</p>
                </div>
              </div>
            </div>
            
            {/* 物品列表 */}
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-[#6C757D] border-b border-[#DEE2E6]">
                    <th className="text-left py-2 font-medium">物品</th>
                    <th className="text-left py-2 font-medium hidden sm:table-cell">存储</th>
                    <th className="text-right py-2 font-medium">保质期</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.items.map((item, i) => <tr key={i} className="border-b border-[#DEE2E6]/50 last:border-0">
                      <td className="py-2.5 text-sm text-[#1B4965] font-medium">{item.name}</td>
                      <td className="py-2.5 text-xs text-[#6C757D] hidden sm:table-cell">{item.storage}</td>
                      <td className="py-2.5 text-xs text-right" style={{
                  color: scenario.color
                }}>
                        {item.expire}
                      </td>
                    </tr>)}
                </tbody>
              </table>
              
              <button className="mt-4 w-full py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-[#FFF4ED]" style={{
            color: scenario.color
          }}>
                查看更多物品
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>)}
      </div>
      
      {/* 智能提醒设置 */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-[#DEE2E6]">
        <h4 className="text-lg font-semibold text-[#1B4965] mb-6">智能提醒策略</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{
          period: '7天前',
          desc: '提前预警',
          color: '#A7C957',
          count: '5件'
        }, {
          period: '3天前',
          desc: '即将到期',
          color: '#F48C06',
          count: '3件'
        }, {
          period: '1天前',
          desc: '紧急提醒',
          color: '#E85D04',
          count: '2件'
        }, {
          period: '当天',
          desc: '立即处理',
          color: '#DC3545',
          count: '1件'
        }].map((alert, index) => <div key={index} className="relative p-4 rounded-xl border-2 transition-all hover:shadow-md" style={{
          borderColor: `${alert.color}40`
        }}>
              <div className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-bold text-white rounded-full" style={{
            backgroundColor: alert.color
          }}>
                {alert.period}
              </div>
              <div className="pt-2 text-center">
                <div className="text-2xl font-bold mb-1" style={{
              color: alert.color
            }}>{alert.count}</div>
                <div className="text-xs text-[#6C757D]">{alert.desc}</div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}
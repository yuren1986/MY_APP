// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Scan, Mic, Search, Database, Bell, Settings, Camera, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const functions = [{
  id: 'scan',
  icon: Scan,
  title: '扫码识别',
  subtitle: '二维码/生产日期识别',
  description: '支持扫描商品二维码自动识别产品信息，也可拍照识别生产日期和保质期',
  color: '#E85D04',
  tags: ['AI 识别', '批量录入'],
  stats: '识别准确率 99.5%'
}, {
  id: 'voice',
  icon: Mic,
  title: '语音交互',
  subtitle: '语音输入与智能对话',
  description: '支持语音快速添加物品，说出物品名称即可智能识别并录入',
  color: '#1B4965',
  tags: ['NLP', '语音识别'],
  stats: '响应时间 < 1s'
}, {
  id: 'search',
  icon: Search,
  title: '存储查询',
  subtitle: '产品存储方式查询',
  description: '输入物品名称，快速查询最佳存储方式、温度、湿度等条件建议',
  color: '#A7C957',
  tags: ['知识库', '智能推荐'],
  stats: '覆盖 10万+ 物品'
}, {
  id: 'database',
  icon: Database,
  title: '时效建议',
  subtitle: '大数据存储时效建议',
  description: '基于海量数据分析和 AI 算法，为每种物品提供科学合理的保质期建议',
  color: '#F48C06',
  tags: ['大数据', 'AI 分析'],
  stats: '专业建议 98% 准确'
}, {
  id: 'bell',
  icon: Bell,
  title: '到期提醒',
  subtitle: '临期/到期提醒功能',
  description: '支持自定义提醒时间和频率，临近过期时主动推送通知，避免浪费',
  color: '#E85D04',
  tags: ['智能提醒', '多端推送'],
  stats: '提醒到达率 100%'
}, {
  id: 'settings',
  icon: Settings,
  title: '家庭管理',
  subtitle: '家庭成员与权限管理',
  description: '支持家庭成员添加、角色权限设置，多人协同管理家庭物品',
  color: '#1B4965',
  tags: ['多用户', '权限控制'],
  stats: '支持 10+ 成员'
}];
export default function FunctionGrid() {
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          功能模块
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {functions.map(func => <div key={func.id} className="group bg-white rounded-2xl border border-[#DEE2E6] overflow-hidden hover:shadow-xl hover:border-[#E85D04]/30 transition-all duration-300">
            {/* 卡片头部 */}
            <div className="p-6 relative" style={{
          background: `linear-gradient(135deg, ${func.color}10 0%, transparent 100%)`
        }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm" style={{
              backgroundColor: `${func.color}20`
            }}>
                  <func.icon className="w-7 h-7" style={{
                color: func.color
              }} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {func.tags.map((tag, index) => <span key={index} className="px-2 py-0.5 text-xs rounded-full" style={{
                backgroundColor: `${func.color}15`,
                color: func.color
              }}>
                      {tag}
                    </span>)}
                </div>
              </div>
              <h4 className="text-lg font-bold text-[#1B4965] mb-1 group-hover:text-[#E85D04] transition-colors">
                {func.title}
              </h4>
              <p className="text-sm font-medium" style={{
            color: func.color
          }}>
                {func.subtitle}
              </p>
            </div>
            
            {/* 卡片内容 */}
            <div className="p-6 pt-0">
              <p className="text-sm text-[#6C757D] mb-4 leading-relaxed">
                {func.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#DEE2E6]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A7C957]" />
                  <span className="text-xs text-[#6C757D]">{func.stats}</span>
                </div>
                <button className="text-sm font-medium hover:underline" style={{
              color: func.color
            }}>
                  了解更多 →
                </button>
              </div>
            </div>
          </div>)}
      </div>
      
      {/* 功能流程图 */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-[#DEE2E6]">
        <h4 className="text-lg font-semibold text-[#1B4965] mb-6 text-center">核心功能流程</h4>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {[{
          icon: Camera,
          label: '扫码/拍照',
          color: '#E85D04'
        }, {
          icon: Scan,
          label: 'AI 识别',
          color: '#1B4965'
        }, {
          icon: Database,
          label: '数据匹配',
          color: '#A7C957'
        }, {
          icon: Bell,
          label: '提醒设置',
          color: '#F48C06'
        }, {
          icon: AlertTriangle,
          label: '临期提醒',
          color: '#E85D04'
        }, {
          icon: CheckCircle,
          label: '安全使用',
          color: '#A7C957'
        }].map((step, index) => <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm" style={{
              backgroundColor: `${step.color}15`
            }}>
                  <step.icon className="w-7 h-7" style={{
                color: step.color
              }} />
                </div>
                <span className="mt-2 text-xs font-medium text-[#1B4965]">{step.label}</span>
              </div>
              {index < 5 && <div className="hidden md:block text-[#DEE2E6] text-2xl">→</div>}
            </div>)}
        </div>
      </div>
    </section>;
}
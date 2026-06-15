// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Heart, Baby, User, GraduationCap } from 'lucide-react';

export default function UserTarget() {
  const users = [{
    icon: Baby,
    name: '老年人',
    age: '60岁+',
    color: '#1B4965',
    needs: ['大字号显示，操作简单', '语音输入，无需打字', '子女远程协助功能', '用药提醒贴心关怀'],
    highlight: '子女远程协助'
  }, {
    icon: User,
    name: '成年人',
    age: '25-59岁',
    color: '#E85D04',
    needs: ['家庭物品全面管理', '批量扫码高效录入', '自定义提醒规则', '数据统计与分析'],
    highlight: '批量高效管理'
  }, {
    icon: GraduationCap,
    name: '青少年',
    age: '12-24岁',
    color: '#A7C957',
    needs: ['学习用品保质期管理', '个人护理提醒', '简洁有趣的界面', '社交分享功能'],
    highlight: '学习与成长'
  }, {
    icon: Heart,
    name: '儿童',
    age: '4-12岁',
    color: '#F48C06',
    needs: ['食品安全启蒙', '简单直观的操作', '亲子互动游戏', '健康生活习惯'],
    highlight: '健康启蒙教育'
  }];
  return <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E85D04] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          目标用户
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user, index) => <div key={index} className="relative bg-white rounded-2xl border border-[#DEE2E6] overflow-hidden hover:shadow-lg transition-all group">
            {/* 用户头像 */}
            <div className="h-24 flex items-center justify-center" style={{
          background: `linear-gradient(135deg, ${user.color}20 0%, ${user.color}05 100%)`
        }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg" style={{
            backgroundColor: `${user.color}20`
          }}>
                <user.icon className="w-10 h-10" style={{
              color: user.color
            }} />
              </div>
            </div>
            
            {/* 用户信息 */}
            <div className="p-5 text-center">
              <h4 className="text-lg font-bold text-[#1B4965] mb-1">{user.name}</h4>
              <p className="text-sm text-[#6C757D] mb-3">{user.age}</p>
              
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4" style={{
            backgroundColor: user.color
          }}>
                {user.highlight}
              </div>
              
              <ul className="space-y-2 text-left">
                {user.needs.map((need, i) => <li key={i} className="flex items-start gap-2 text-sm text-[#6C757D]">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{
                backgroundColor: user.color
              }}></span>
                    <span>{need}</span>
                  </li>)}
              </ul>
            </div>
          </div>)}
      </div>
      
      {/* 用户分布 */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-[#DEE2E6]">
        <h4 className="text-lg font-semibold text-[#1B4965] mb-6 text-center">用户年龄分布</h4>
        <div className="flex items-end justify-center gap-8 h-40">
          {[{
          label: '60岁+',
          value: 35,
          color: '#1B4965'
        }, {
          label: '25-59岁',
          value: 45,
          color: '#E85D04'
        }, {
          label: '12-24岁',
          value: 15,
          color: '#A7C957'
        }, {
          label: '4-12岁',
          value: 5,
          color: '#F48C06'
        }].map((item, index) => <div key={index} className="flex flex-col items-center">
              <div className="w-16 rounded-t-lg transition-all hover:opacity-80" style={{
            height: `${item.value * 0.7}px`,
            backgroundColor: item.color
          }}>
                <div className="h-full flex items-end justify-center pb-2">
                  <span className="text-white text-sm font-bold">{item.value}%</span>
                </div>
              </div>
              <span className="mt-2 text-xs text-[#6C757D]">{item.label}</span>
            </div>)}
        </div>
      </div>
    </section>;
}
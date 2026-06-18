// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Bell, CheckCircle, Clock, Calendar, ChevronRight, Trash2, Volume2, VolumeX, Eye } from 'lucide-react';

import TabBar from '@/components/TabBar';
import { mockReminders } from '@/components/mockData';
function ReminderPage(props) {
  const {
    toast
  } = useToast();
  const [reminders, setReminders] = useState(mockReminders);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // 处理提醒项
  const handleReminderClick = reminder => {
    toast({
      title: '查看详情',
      description: `正在打开 ${reminder.productName} 的详情页`,
      duration: 2000
    });
    props.$w.utils.navigateTo({
      pageId: 'detail',
      params: {
        id: reminder.productId
      }
    });
  };

  // 删除提醒
  const handleDeleteReminder = (reminderId, e) => {
    e.stopPropagation();
    setReminders(prev => prev.filter(r => r.id !== reminderId));
    toast({
      title: '删除成功',
      description: '提醒已从列表中移除',
      duration: 2000
    });
  };

  // 标记已处理
  const handleMarkAsDone = (reminderId, e) => {
    e.stopPropagation();
    setReminders(prev => prev.map(r => r.id === reminderId ? {
      ...r,
      done: true
    } : r));
    toast({
      title: '已标记处理',
      description: '提醒已标记为已处理',
      duration: 2000
    });
  };

  // 获取状态标签
  const getStatusBadge = reminder => {
    if (reminder.done) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#A7C957] text-white">已处理</span>;
    }
    if (reminder.daysLeft <= 0) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#DC3545] text-white">已过期</span>;
    }
    if (reminder.daysLeft <= 3) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#F48C06] text-white">紧急</span>;
    }
    if (reminder.daysLeft <= 7) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#F48C06]/70 text-white">临期</span>;
    }
    return <span className="px-2 py-1 rounded-full text-xs bg-[#1B4965] text-white">正常</span>;
  };

  // 按状态分组
  const groupedReminders = {
    urgent: reminders.filter(r => !r.done && r.daysLeft <= 3),
    expiring: reminders.filter(r => !r.done && r.daysLeft > 3 && r.daysLeft <= 7),
    normal: reminders.filter(r => !r.done && r.daysLeft > 7),
    done: reminders.filter(r => r.done)
  };

  // 渲染提醒列表
  const renderReminderList = (items, title, emptyText) => {
    if (items.length === 0) return null;
    return <div className="mb-6">
        <h3 className="text-sm font-bold text-[#1B4965] mb-3 flex items-center gap-2">
          {title}
          <span className="bg-[#E85D04] text-white text-xs px-2 py-0.5 rounded-full">{items.length}</span>
        </h3>
        <div className="space-y-2">
          {items.map(reminder => <div key={reminder.id} onClick={() => handleReminderClick(reminder)} className={`bg-white rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all active:scale-[0.98] ${reminder.done ? 'opacity-60' : ''}`} style={{
          minHeight: '80px'
        }}>
              <div className="text-3xl">{reminder.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold text-[#1B4965] ${reminder.done ? 'line-through' : ''}`}>
                    {reminder.productName}
                  </span>
                  {getStatusBadge(reminder)}
                </div>
                <p className="text-sm text-[#6C757D]">
                  {reminder.daysLeft > 0 ? `还有 ${reminder.daysLeft} 天到期` : reminder.daysLeft === 0 ? '今天到期！' : `已过期 ${Math.abs(reminder.daysLeft)} 天`}
                </p>
                <p className="text-xs text-[#6C757D] mt-1">
                  {reminder.remindTime} · {reminder.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!reminder.done && <>
                    <button onClick={e => handleMarkAsDone(reminder.id, e)} className="w-10 h-10 rounded-full bg-[#A7C957]/10 flex items-center justify-center active:bg-[#A7C957]/20" aria-label="标记已处理">
                      <CheckCircle className="w-5 h-5 text-[#A7C957]" />
                    </button>
                    <button onClick={e => handleDeleteReminder(reminder.id, e)} className="w-10 h-10 rounded-full bg-[#DC3545]/10 flex items-center justify-center active:bg-[#DC3545]/20" aria-label="删除">
                      <Trash2 className="w-5 h-5 text-[#DC3545]" />
                    </button>
                  </>}
                <ChevronRight className="w-5 h-5 text-[#6C757D]" />
              </div>
            </div>)}
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* 顶部导航 */}
      <header className="bg-[#1B4965] text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            <Bell className="inline-block w-6 h-6 mr-2" />
            提醒管理
          </h1>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {reminders.filter(r => !r.done).length} 条待处理
          </span>
        </div>
      </header>

      {/* 提醒设置 */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-[#1B4965] mb-4">提醒设置</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E85D04]/10 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-[#E85D04]" />
                </div>
                <div>
                  <p className="font-medium text-[#1B4965]">声音提醒</p>
                  <p className="text-xs text-[#6C757D]">到期前播放提示音</p>
                </div>
              </div>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`w-12 h-7 rounded-full relative transition-colors ${soundEnabled ? 'bg-[#E85D04]' : 'bg-[#DEE2E6]'}`} aria-label="开关声音提醒">
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${soundEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B4965]/10 flex items-center justify-center">
                  <VolumeX className="w-5 h-5 text-[#1B4965]" />
                </div>
                <div>
                  <p className="font-medium text-[#1B4965]">震动提醒</p>
                  <p className="text-xs text-[#6C757D]">配合声音震动提示</p>
                </div>
              </div>
              <button onClick={() => setVibrationEnabled(!vibrationEnabled)} className={`w-12 h-7 rounded-full relative transition-colors ${vibrationEnabled ? 'bg-[#E85D04]' : 'bg-[#DEE2E6]'}`} aria-label="开关震动提醒">
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${vibrationEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 提醒列表 */}
      <div className="px-4">
        {reminders.length === 0 ? <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-[#DEE2E6] mb-4" />
            <p className="text-[#6C757D] text-lg">暂无提醒</p>
            <p className="text-[#6C757D] text-sm mt-2">添加产品后会自动生成提醒</p>
          </div> : <>
            {renderReminderList(groupedReminders.urgent, '⚠️ 紧急提醒', '暂无紧急提醒')}
            {renderReminderList(groupedReminders.expiring, '📅 即将到期', '暂无临期提醒')}
            {renderReminderList(groupedReminders.normal, '✅ 正常提醒', '暂无正常提醒')}
            {renderReminderList(groupedReminders.done, '✓ 已处理', '暂无已处理项')}
          </>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab="reminder" />
    </div>;
}
export default ReminderPage;
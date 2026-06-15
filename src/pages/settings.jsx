// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { User, ChevronRight, Moon, Sun, Globe, Bell, Shield, HelpCircle, Info, LogOut, Smartphone, Tablet, Watch, Car, Phone, Mail, MapPin, Calendar, Edit3, Save, X, Camera } from 'lucide-react';

import TabBar from '@/components/TabBar';
import { loadUserInfo, saveUserInfo } from '@/lib/storage';
function SettingsPage(props) {
  const {
    toast
  } = useToast();

  // 用户信息状态
  const [userInfo, setUserInfo] = useState({
    id: 'user_001',
    nickname: '家庭用户',
    phone: '138****8888',
    gender: 'unknown',
    birthday: '',
    address: '',
    email: '',
    bio: '健康生活，从家庭物品管理开始',
    avatar: ''
  });

  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // 模拟设备信息
  const devices = [{
    id: 'phone',
    name: '小米 13',
    icon: Smartphone,
    online: true
  }, {
    id: 'watch',
    name: 'Apple Watch',
    icon: Watch,
    online: false
  }, {
    id: 'pad',
    name: 'iPad Pro',
    icon: Tablet,
    online: true
  }];

  // 菜单项
  const menuItems = [{
    id: 'profile',
    icon: User,
    label: '个人资料',
    desc: '头像、昵称、联系方式'
  }, {
    id: 'family',
    icon: User,
    label: '家庭成员',
    desc: '管理家庭成员和权限'
  }, {
    id: 'devices',
    icon: Smartphone,
    label: '同步设备',
    desc: '管理已登录的设备'
  }];
  const preferenceItems = [{
    id: 'darkMode',
    icon: Moon,
    label: '深色模式',
    desc: '开启后界面变为深色',
    toggle: true,
    value: darkMode,
    onChange: setDarkMode
  }, {
    id: 'largeFont',
    icon: Globe,
    label: '大字号模式',
    desc: '适合老年人和视力不佳用户',
    toggle: true,
    value: largeFont,
    onChange: setLargeFont
  }, {
    id: 'highContrast',
    icon: Sun,
    label: '高对比度',
    desc: '增强文字和背景对比度',
    toggle: true,
    value: highContrast,
    onChange: setHighContrast
  }, {
    id: 'notifications',
    icon: Bell,
    label: '通知设置',
    desc: '管理推送通知权限'
  }];
  const aboutItems = [{
    id: 'privacy',
    icon: Shield,
    label: '隐私政策',
    desc: '了解我们如何保护您的隐私'
  }, {
    id: 'terms',
    icon: Info,
    label: '使用条款',
    desc: '应用使用协议'
  }, {
    id: 'help',
    icon: HelpCircle,
    label: '帮助中心',
    desc: '常见问题和使用指南'
  }, {
    id: 'about',
    icon: Info,
    label: '关于我们',
    desc: '版本信息 v1.0.0'
  }];

  // 通用点击处理
  const handleMenuClick = item => {
    if (item.toggle) {
      item.onChange(!item.value);
      toast({
        title: item.label,
        description: item.value ? '已关闭' : '已开启',
        duration: 1500
      });
    } else {
      toast({
        title: item.label,
        description: item.desc,
        duration: 2000
      });
    }
  };

  // 退出登录
  const handleLogout = () => {
    toast({
      title: '退出登录',
      description: '确定要退出当前账号吗？',
      duration: 3000
    });
  };

  // 加载用户信息
  useEffect(() => {
    const info = loadUserInfo();
    setUserInfo(info);
    setEditForm(info);
  }, []);

  // 开始编辑
  const handleStartEdit = () => {
    setEditForm(userInfo);
    setIsEditing(true);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  // 保存编辑
  const handleSaveEdit = () => {
    saveUserInfo(editForm);
    setUserInfo(editForm);
    setIsEditing(false);
    toast({
      title: '保存成功',
      description: '个人信息已更新',
      duration: 2000
    });
  };

  // 处理表单输入变化
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 性别选项
  const genderOptions = [{
    value: 'unknown',
    label: '未设置',
    icon: '⚧️'
  }, {
    value: 'male',
    label: '男',
    icon: '👨'
  }, {
    value: 'female',
    label: '女',
    icon: '👩'
  }];

  // 获取性别显示文本
  const getGenderText = gender => {
    const option = genderOptions.find(g => g.value === gender);
    return option ? option.label : '未设置';
  };
  return <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* 顶部导航 */}
      <header className="bg-[#1B4965] text-white px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          设置
        </h1>
      </header>

      {/* 用户信息卡片 */}
      <div className="px-4 py-4">
        {isEditing ?
      // 编辑模式
      <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1B4965]">编辑个人信息</h2>
              <div className="flex gap-2">
                <button onClick={handleCancelEdit} className="p-2 text-[#6C757D] hover:bg-[#F8F9FA] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
                <button onClick={handleSaveEdit} className="p-2 text-[#E85D04] hover:bg-[#E85D04]/10 rounded-lg">
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* 头像编辑 */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#E85D04]/20 flex items-center justify-center overflow-hidden">
                  {editForm.avatar ? <img src={editForm.avatar} alt="头像" className="w-full h-full object-cover" /> : <span className="text-5xl">👤</span>}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#E85D04] rounded-full flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#6C757D] mt-2">点击更换头像</p>
            </div>

            {/* 表单 */}
            <div className="space-y-4">
              {/* 昵称 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">昵称</label>
                <input type="text" value={editForm.nickname || ''} onChange={e => handleInputChange('nickname', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965]" placeholder="请输入昵称" />
              </div>

              {/* 手机号 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">手机号码</label>
                <input type="tel" value={editForm.phone || ''} onChange={e => handleInputChange('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965]" placeholder="请输入手机号码" />
              </div>

              {/* 性别 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-2 block">性别</label>
                <div className="flex gap-3">
                  {genderOptions.map(option => <button key={option.value} onClick={() => handleInputChange('gender', option.value)} className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${editForm.gender === option.value ? 'border-[#E85D04] bg-[#E85D04]/10 text-[#E85D04]' : 'border-[#DEE2E6] text-[#6C757D]'}`}>
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>)}
                </div>
              </div>

              {/* 生日 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">生日</label>
                <input type="date" value={editForm.birthday || ''} onChange={e => handleInputChange('birthday', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965]" />
              </div>

              {/* 邮箱 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">邮箱</label>
                <input type="email" value={editForm.email || ''} onChange={e => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965]" placeholder="请输入邮箱" />
              </div>

              {/* 地址 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">收货地址</label>
                <input type="text" value={editForm.address || ''} onChange={e => handleInputChange('address', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965]" placeholder="请输入收货地址" />
              </div>

              {/* 个人简介 */}
              <div>
                <label className="text-sm text-[#6C757D] mb-1 block">个人简介</label>
                <textarea value={editForm.bio || ''} onChange={e => handleInputChange('bio', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] focus:border-[#E85D04] focus:outline-none text-[#1B4965] resize-none" rows="3" placeholder="介绍一下自己吧" />
              </div>
            </div>
          </div> :
      // 展示模式
      <div className="bg-white rounded-2xl p-4 shadow-sm">
            {/* 头部信息 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-[#E85D04]/20 flex items-center justify-center overflow-hidden">
                {userInfo.avatar ? <img src={userInfo.avatar} alt="头像" className="w-full h-full object-cover" /> : <span className="text-4xl">👤</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#1B4965]">{userInfo.nickname}</h2>
                  <span className="px-2 py-0.5 bg-[#E85D04]/20 text-[#E85D04] text-xs rounded-full">
                    {getGenderText(userInfo.gender)}
                  </span>
                </div>
                <p className="text-sm text-[#6C757D] mt-1 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {userInfo.phone || '未设置'}
                </p>
                <p className="text-xs text-[#A7C957] mt-1">⭐ 会员</p>
              </div>
              <button onClick={handleStartEdit} className="p-2 text-[#E85D04] hover:bg-[#E85D04]/10 rounded-lg transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            {/* 个人简介 */}
            {userInfo.bio && <div className="px-2 py-2 bg-[#F8F9FA] rounded-xl mb-4">
                <p className="text-sm text-[#6C757D]">{userInfo.bio}</p>
              </div>}

            {/* 详细信息列表 */}
            <div className="space-y-3">
              {/* 邮箱 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4965]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#1B4965]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#6C757D]">邮箱</p>
                  <p className="text-sm text-[#1B4965]">{userInfo.email || '未设置'}</p>
                </div>
              </div>

              {/* 生日 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E85D04]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#E85D04]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#6C757D]">生日</p>
                  <p className="text-sm text-[#1B4965]">{userInfo.birthday || '未设置'}</p>
                </div>
              </div>

              {/* 地址 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#A7C957]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#A7C957]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#6C757D]">收货地址</p>
                  <p className="text-sm text-[#1B4965]">{userInfo.address || '未设置'}</p>
                </div>
              </div>
            </div>
          </div>}
      </div>

      {/* 同步设备 */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-[#1B4965] mb-3 px-1">同步设备</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {devices.map((device, index) => <div key={device.id} className={`flex items-center gap-3 p-4 ${index !== devices.length - 1 ? 'border-b border-[#DEE2E6]' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-[#1B4965]/10 flex items-center justify-center">
                <device.icon className="w-5 h-5 text-[#1B4965]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1B4965]">{device.name}</p>
                <p className={`text-xs ${device.online ? 'text-[#A7C957]' : 'text-[#6C757D]'}`}>
                  {device.online ? '在线' : '离线'}
                </p>
              </div>
              {device.online && <span className="w-2 h-2 rounded-full bg-[#A7C957]"></span>}
            </div>)}
          <button className="w-full p-4 text-[#E85D04] font-medium text-center flex items-center justify-center gap-2">
            <span>+</span> 添加新设备
          </button>
        </div>
      </div>

      {/* 通用设置 */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-[#1B4965] mb-3 px-1">通用设置</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {menuItems.map((item, index) => <div key={item.id} onClick={() => handleMenuClick(item)} className={`flex items-center gap-3 p-4 cursor-pointer active:bg-[#F8F9FA] ${index !== menuItems.length - 1 ? 'border-b border-[#DEE2E6]' : ''}`} style={{
          minHeight: '64px'
        }}>
              <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#E85D04]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1B4965]">{item.label}</p>
                <p className="text-xs text-[#6C757D]">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6C757D]" />
            </div>)}
        </div>
      </div>

      {/* 无障碍与辅助功能 */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-[#1B4965] mb-3 px-1">🧒👴 适老化与无障碍</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {preferenceItems.map((item, index) => <div key={item.id} className={`flex items-center gap-3 p-4 ${index !== preferenceItems.length - 1 ? 'border-b border-[#DEE2E6]' : ''}`} style={{
          minHeight: '64px'
        }}>
              <div className="w-10 h-10 rounded-xl bg-[#1B4965]/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#1B4965]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1B4965]">{item.label}</p>
                <p className="text-xs text-[#6C757D]">{item.desc}</p>
              </div>
              {item.toggle ? <button onClick={() => handleMenuClick(item)} className={`w-12 h-7 rounded-full relative transition-colors ${item.value ? 'bg-[#E85D04]' : 'bg-[#DEE2E6]'}`} aria-label={item.label}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.value ? 'right-1' : 'left-1'}`}></div>
                </button> : <ChevronRight className="w-5 h-5 text-[#6C757D]" />}
            </div>)}
        </div>
      </div>

      {/* 关于 */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-[#1B4965] mb-3 px-1">关于</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {aboutItems.map((item, index) => <div key={item.id} onClick={() => handleMenuClick(item)} className={`flex items-center gap-3 p-4 cursor-pointer active:bg-[#F8F9FA] ${index !== aboutItems.length - 1 ? 'border-b border-[#DEE2E6]' : ''}`} style={{
          minHeight: '64px'
        }}>
              <div className="w-10 h-10 rounded-xl bg-[#6C757D]/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#6C757D]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1B4965]">{item.label}</p>
                <p className="text-xs text-[#6C757D]">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6C757D]" />
            </div>)}
        </div>
      </div>

      {/* 退出登录 */}
      <div className="px-4 mb-4">
        <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-[#DC3545]/10 text-[#DC3545] font-bold flex items-center justify-center gap-2" style={{
        minHeight: '52px',
        fontSize: '16px'
      }}>
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>

      {/* 版本信息 */}
      <div className="text-center pb-4">
        <p className="text-xs text-[#6C757D]">家庭物品管家 v1.0.0</p>
        <p className="text-xs text-[#6C757D] mt-1">© 2026 家庭健康科技有限公司</p>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab="settings" />
    </div>;
}
export default SettingsPage;
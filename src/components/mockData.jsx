// @ts-ignore;
import React from 'react';

// 模拟产品数据
export const mockProducts = [{
  id: '1',
  name: '蒙牛纯牛奶',
  brand: '蒙牛',
  category: '乳制品',
  icon: '🥛',
  productionDate: '2026-05-01',
  expiryDate: '2026-08-01',
  daysLeft: 46,
  totalDays: 90,
  status: 'fresh',
  storageType: 'cold',
  storage: '冷藏',
  storageTip: '2-6°C冷藏保存，开启后需冷藏并在24小时内饮用',
  reminderDays: 7,
  reminderEnabled: true
}, {
  id: '2',
  name: '鸡蛋',
  brand: '正大',
  category: '禽蛋',
  icon: '🥚',
  productionDate: '2026-06-01',
  expiryDate: '2026-07-16',
  daysLeft: 30,
  totalDays: 45,
  status: 'fresh',
  storageType: 'cold',
  storage: '冷藏',
  storageTip: '大头朝上冷藏保存，建议2周内食用完毕',
  reminderDays: 3,
  reminderEnabled: true
}, {
  id: '3',
  name: '金龙鱼调和油',
  brand: '金龙鱼',
  category: '调味品',
  icon: '🫒',
  productionDate: '2026-01-15',
  expiryDate: '2026-06-20',
  daysLeft: 4,
  totalDays: 180,
  status: 'expiring',
  storageType: 'room',
  storage: '常温',
  storageTip: '避光保存，开封后建议3个月内食用完毕',
  reminderDays: 7,
  reminderEnabled: true
}, {
  id: '4',
  name: '云南白药牙膏',
  brand: '云南白药',
  category: '日用品',
  icon: '🪥',
  productionDate: '2026-03-01',
  expiryDate: '2027-03-01',
  daysLeft: 289,
  totalDays: 365,
  status: 'fresh',
  storageType: 'room',
  storage: '常温',
  storageTip: '阴凉干燥处保存，避免阳光直射',
  reminderDays: 30,
  reminderEnabled: false
}, {
  id: '5',
  name: '康恩贝维生素C',
  brand: '康恩贝',
  category: '保健品',
  icon: '💊',
  productionDate: '2025-12-01',
  expiryDate: '2026-06-10',
  daysLeft: -6,
  totalDays: 180,
  status: 'expired',
  storageType: 'room',
  storage: '常温',
  storageTip: '密封保存于25°C以下干燥处',
  reminderDays: 7,
  reminderEnabled: true
}, {
  id: '6',
  name: '三全水饺',
  brand: '三全',
  category: '速冻食品',
  icon: '🥟',
  productionDate: '2026-05-20',
  expiryDate: '2026-11-20',
  daysLeft: 157,
  totalDays: 180,
  status: 'fresh',
  storageType: 'frozen',
  storage: '冷冻',
  storageTip: '-18°C以下冷冻保存，生制品可保存12个月',
  reminderDays: 14,
  reminderEnabled: true
}, {
  id: '7',
  name: '海天酱油',
  brand: '海天',
  category: '调味品',
  icon: '🧂',
  productionDate: '2026-04-01',
  expiryDate: '2027-04-01',
  daysLeft: 289,
  totalDays: 365,
  status: 'fresh',
  storageType: 'room',
  storage: '常温',
  storageTip: '开封后请冷藏保存，开启后建议60天内食用',
  reminderDays: 30,
  reminderEnabled: false
}, {
  id: '8',
  name: '农夫山泉',
  brand: '农夫山泉',
  category: '饮料',
  icon: '💧',
  productionDate: '2026-05-01',
  expiryDate: '2027-05-01',
  daysLeft: 289,
  totalDays: 365,
  status: 'fresh',
  storageType: 'room',
  storage: '常温',
  storageTip: '避免阳光直射，防冻。建议开封后24小时内饮用',
  reminderDays: 30,
  reminderEnabled: false
}];

// 模拟提醒数据
export const mockReminders = [{
  id: 'r1',
  productId: '3',
  productName: '金龙鱼调和油',
  icon: '🫒',
  daysLeft: 4,
  remindTime: '09:00',
  location: '厨房',
  done: false
}, {
  id: 'r2',
  productId: '5',
  productName: '康恩贝维生素C',
  icon: '💊',
  daysLeft: -6,
  remindTime: '20:00',
  location: '客厅',
  done: false
}, {
  id: 'r3',
  productId: '1',
  productName: '蒙牛纯牛奶',
  icon: '🥛',
  daysLeft: 7,
  remindTime: '08:00',
  location: '厨房',
  done: false
}, {
  id: 'r4',
  productId: '2',
  productName: '鸡蛋',
  icon: '🥚',
  daysLeft: 14,
  remindTime: '10:00',
  location: '厨房',
  done: false
}, {
  id: 'r5',
  productId: '6',
  productName: '三全水饺',
  icon: '🥟',
  daysLeft: 30,
  remindTime: '09:00',
  location: '冰箱',
  done: true
}];

// 分类统计数据
export const categoryStats = {
  '调味品': {
    count: 2,
    color: '#F48C06'
  },
  '乳制品': {
    count: 1,
    color: '#E85D04'
  },
  '禽蛋': {
    count: 1,
    color: '#F5A623'
  },
  '日用品': {
    count: 1,
    color: '#1B4965'
  },
  '保健品': {
    count: 1,
    color: '#DC3545'
  },
  '速冻食品': {
    count: 1,
    color: '#00BCD4'
  },
  '饮料': {
    count: 1,
    color: '#4FC3F7'
  }
};

// 应用场景数据
export const scenarioData = [{
  id: 'kitchen',
  name: '厨房',
  icon: '🍳',
  items: ['调味品', '食材', '饮料', '速冻食品'],
  tip: '注意调味品开瓶后冷藏，食材注意保质期'
}, {
  id: 'bathroom',
  name: '浴室/洗漱',
  icon: '🚿',
  items: ['牙膏', '牙刷', '洗发水', '沐浴露'],
  tip: '注意洗漱用品开瓶后的使用期限'
}, {
  id: 'medicine',
  name: '医药箱',
  icon: '💊',
  items: ['常备药', '创可贴', '保健品'],
  tip: '定期检查药品有效期，及时处理过期药品'
}];
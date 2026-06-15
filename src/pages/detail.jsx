// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Calendar, Clock, Thermometer, Droplets, Sun, Trash2, Edit2, Bell, CheckCircle, AlertTriangle, X } from 'lucide-react';

import TabBar from '@/components/TabBar';
import { loadProducts, updateProduct, deleteProduct } from '@/lib/storage';
function DetailPage(props) {
  const {
    toast
  } = useToast();
  const productId = props.$w.page.dataset.params.id;
  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [reminderDays, setReminderDays] = useState(7);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    brand: '',
    expiryDate: ''
  });

  // 加载产品数据
  useEffect(() => {
    const products = loadProducts() || [];
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setReminderDays(foundProduct.reminderDays || 7);
      setReminderEnabled(foundProduct.reminderEnabled !== false);
      setEditForm({
        name: foundProduct.name,
        brand: foundProduct.brand,
        expiryDate: foundProduct.expiryDate
      });
    }
  }, [productId]);

  // 返回
  const handleBack = () => {
    // 返回首页并刷新数据
    props.$w.utils.navigateTo({
      pageId: 'index',
      params: {
        _refresh: Date.now()
      }
    });
  };

  // 保存修改
  const handleSave = () => {
    if (!product) return;

    // 计算新的保质期
    const today = new Date();
    const expDate = new Date(editForm.expiryDate);
    const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const updates = {
      ...editForm,
      daysLeft,
      status: daysLeft <= 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'fresh',
      reminderDays,
      reminderEnabled
    };
    const updated = updateProduct(product.id, updates);
    if (updated) {
      setProduct(updated);
      setEditing(false);
      toast({
        title: '保存成功',
        description: '产品信息已更新',
        duration: 2000
      });
    } else {
      toast({
        title: '保存失败',
        description: '请稍后重试',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  // 删除产品
  const confirmDelete = () => {
    const success = deleteProduct(product.id);
    if (success) {
      toast({
        title: '删除成功',
        description: '产品已从列表中移除',
        duration: 2000
      });
      setShowDeleteConfirm(false);
      props.$w.utils.navigateTo({
        pageId: 'index',
        params: {
          _refresh: Date.now()
        }
      });
    } else {
      toast({
        title: '删除失败',
        description: '请稍后重试',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  // 取消删除
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // 设置提醒
  const handleReminderChange = days => {
    setReminderDays(days);
    // 实时保存提醒设置
    updateProduct(product.id, {
      reminderDays: days
    });
    toast({
      title: '提醒设置已更新',
      description: `将在到期前 ${days} 天提醒您`,
      duration: 2000
    });
  };

  // 切换提醒开关
  const toggleReminder = () => {
    const newValue = !reminderEnabled;
    setReminderEnabled(newValue);
    updateProduct(product.id, {
      reminderEnabled: newValue
    });
    toast({
      title: newValue ? '提醒已开启' : '提醒已关闭',
      description: newValue ? '将在到期前提醒您' : '已取消到期提醒',
      duration: 2000
    });
  };

  // 获取存储图标
  const getStorageIcon = storageType => {
    switch (storageType) {
      case 'cold':
        return <Thermometer className="w-5 h-5" />;
      case 'frozen':
        return <Droplets className="w-5 h-5" />;
      case 'room':
        return <Sun className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  // 获取存储标签
  const getStorageLabel = storageType => {
    switch (storageType) {
      case 'cold':
        return '冷藏保存';
      case 'frozen':
        return '冷冻保存';
      case 'room':
        return '常温保存';
      default:
        return '常温保存';
    }
  };
  if (!product) {
    return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-[#6C757D]">加载中...</p>
      </div>;
  }
  return <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* 顶部导航 */}
      <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={handleBack} className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center active:bg-[#DEE2E6]" aria-label="返回">
          <ArrowLeft className="w-5 h-5 text-[#1B4965]" />
        </button>
        <h1 className="text-lg font-bold text-[#1B4965]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          {editing ? '编辑产品' : '产品详情'}
        </h1>
        <button onClick={() => setEditing(!editing)} className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center active:bg-[#DEE2E6]" aria-label="编辑">
          <Edit2 className="w-5 h-5 text-[#1B4965]" />
        </button>
      </header>

      {/* 产品主图和状态 */}
      <div className="relative">
        <div className={`h-40 flex items-center justify-center ${product.status === 'fresh' ? 'bg-gradient-to-br from-[#A7C957]/20 to-[#A7C957]/5' : product.status === 'expiring' ? 'bg-gradient-to-br from-[#F48C06]/20 to-[#F48C06]/5' : 'bg-gradient-to-br from-[#DC3545]/20 to-[#DC3545]/5'}`}>
          <div className="text-6xl">{product.icon}</div>
        </div>
        
        {/* 状态标签 */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.status === 'fresh' ? 'bg-[#A7C957] text-white' : product.status === 'expiring' ? 'bg-[#F48C06] text-white' : 'bg-[#DC3545] text-white'}`}>
            {product.status === 'fresh' ? '✓ 新鲜' : product.status === 'expiring' ? '⚠ 临期' : '✗ 已过期'}
          </span>
        </div>
      </div>

      {/* 产品基本信息 */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#DEE2E6]">
            {editing ? <div className="space-y-3">
                <input type="text" value={editForm.name} onChange={e => setEditForm({
              ...editForm,
              name: e.target.value
            })} className="w-full px-3 py-2 rounded-lg border border-[#DEE2E6] text-xl font-bold text-[#1B4965] focus:outline-none focus:border-[#E85D04]" style={{
              fontFamily: 'Playfair Display, serif'
            }} />
                <input type="text" value={editForm.brand} onChange={e => setEditForm({
              ...editForm,
              brand: e.target.value
            })} placeholder="品牌（可选）" className="w-full px-3 py-2 rounded-lg border border-[#DEE2E6] text-sm text-[#6C757D] focus:outline-none focus:border-[#E85D04]" />
              </div> : <>
                <h2 className="text-xl font-bold text-[#1B4965]" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                  {product.name}
                </h2>
                <p className="text-sm text-[#6C757D] mt-1">{product.category} · {product.brand}</p>
              </>}
          </div>
          
          <div className="p-4 space-y-4">
            {/* 日期信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8F9FA] rounded-xl p-3">
                <div className="flex items-center gap-2 text-[#6C757D] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">生产日期</span>
                </div>
                {editing ? <input type="date" value={product.productionDate} disabled className="text-sm font-bold text-[#1B4965] bg-transparent" /> : <p className="text-sm font-bold text-[#1B4965]">{product.productionDate}</p>}
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-3">
                <div className="flex items-center gap-2 text-[#6C757D] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">到期日期</span>
                </div>
                {editing ? <input type="date" value={editForm.expiryDate} onChange={e => setEditForm({
                ...editForm,
                expiryDate: e.target.value
              })} className="text-sm font-bold text-[#DC3545] bg-white rounded border border-[#DEE2E6] px-1" /> : <p className="text-sm font-bold text-[#DC3545]">{product.expiryDate}</p>}
              </div>
            </div>

            {/* 剩余天数 */}
            <div className={`rounded-xl p-4 ${product.status === 'fresh' ? 'bg-[#A7C957]/10' : product.status === 'expiring' ? 'bg-[#F48C06]/10' : 'bg-[#DC3545]/10'}`}>
              <div className="flex items-center justify-between">
                <span className="text-[#6C757D]">剩余保质期</span>
                <span className="text-2xl font-bold">
                  {product.daysLeft > 0 ? `${product.daysLeft}天` : '已过期'}
                </span>
              </div>
              <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${product.status === 'fresh' ? 'bg-[#A7C957]' : product.status === 'expiring' ? 'bg-[#F48C06]' : 'bg-[#DC3545]'}`} style={{
                width: `${Math.max(0, Math.min(100, product.daysLeft / product.totalDays * 100))}%`
              }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 存储方式 */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
          <h3 className="text-sm font-bold text-[#1B4965] mb-3">存储方式</h3>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${product.storageType === 'cold' ? 'bg-blue-100 text-blue-500' : product.storageType === 'frozen' ? 'bg-cyan-100 text-cyan-500' : 'bg-amber-100 text-amber-500'}`}>
              {getStorageIcon(product.storageType)}
            </div>
            <div>
              <p className="font-bold text-[#1B4965]">{getStorageLabel(product.storageType)}</p>
              <p className="text-sm text-[#6C757D]">{product.storageTip}</p>
            </div>
          </div>
        </div>

        {/* 提醒设置 */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1B4965]">到期提醒</h3>
            <button onClick={toggleReminder} className={`w-12 h-7 rounded-full relative transition-colors ${reminderEnabled ? 'bg-[#E85D04]' : 'bg-[#DEE2E6]'}`} aria-label="开关提醒">
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${reminderEnabled ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
          
          {reminderEnabled && <div className="space-y-3">
              <p className="text-sm text-[#6C757D]">提前提醒时间</p>
              <div className="flex gap-2 flex-wrap">
                {[1, 3, 7, 14, 30].map(days => <button key={days} onClick={() => handleReminderChange(days)} className={`px-4 py-2 rounded-full transition-colors ${reminderDays === days ? 'bg-[#E85D04] text-white' : 'bg-[#F8F9FA] text-[#1B4965]'}`} style={{
              minHeight: '44px',
              fontSize: '14px'
            }}>
                    {days}天
                  </button>)}
              </div>
            </div>}
        </div>

        {/* 操作按钮 */}
        <div className="mt-6 space-y-3">
          {editing ? <>
              <button onClick={handleSave} className="w-full py-3 rounded-xl bg-[#E85D04] text-white font-bold" style={{
            minHeight: '52px',
            fontSize: '16px'
          }}>
                保存修改
              </button>
              <button onClick={() => setEditing(false)} className="w-full py-3 rounded-xl bg-[#DEE2E6] text-[#1B4965] font-medium" style={{
            minHeight: '48px',
            fontSize: '16px'
          }}>
                取消编辑
              </button>
            </> : <button onClick={() => setShowDeleteConfirm(true)} className="w-full py-3 rounded-xl bg-white border border-[#DC3545] text-[#DC3545] font-medium flex items-center justify-center gap-2" style={{
          minHeight: '52px',
          fontSize: '16px'
        }}>
              <Trash2 className="w-5 h-5" />
              删除此产品
            </button>}
        </div>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#DC3545]/10 flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-[#DC3545]" />
            </div>
            <h3 className="text-xl font-bold text-[#1B4965] mb-2" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
              确认删除
            </h3>
            <p className="text-sm text-[#6C757D] mb-6">
              确定要删除「{product.name}」吗？此操作无法撤销。
            </p>
            <div className="flex gap-3">
              <button onClick={cancelDelete} className="flex-1 py-3 rounded-xl bg-[#DEE2E6] text-[#1B4965] font-medium" style={{
            minHeight: '48px',
            fontSize: '16px'
          }}>
                取消
              </button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-[#DC3545] text-white font-bold" style={{
            minHeight: '48px',
            fontSize: '16px'
          }}>
                确认删除
              </button>
            </div>
          </div>
        </div>}

      {/* 底部导航栏 */}
      <TabBar activeTab="home" />
    </div>;
}
export default DetailPage;
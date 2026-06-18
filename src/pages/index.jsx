// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Scan, Mic, Plus, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, Package, X, Keyboard, Sun, Thermometer, Droplets } from 'lucide-react';

import TabBar from '@/components/TabBar';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/components/mockData';
import { loadProducts, saveProducts, addProduct } from '@/lib/storage';
function HomePage(props) {
  const {
    toast
  } = useToast();

  // 初始化产品数据（优先从本地存储加载，否则使用模拟数据）
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, expiring, expired, fresh
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: '',
    brand: '',
    category: '调味品',
    expiryDate: '',
    storageType: 'room'
  });
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // 加载数据（监听 dataVersion 变化重新加载）
  useEffect(() => {
    const storedProducts = loadProducts();
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      // 首次使用，使用模拟数据并保存
      setProducts(mockProducts);
      saveProducts(mockProducts);
    }
  }, [props.dataVersion]);

  // 过滤产品
  const filteredProducts = products.filter(product => {
    // 搜索过滤
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // 状态过滤
    if (filter === 'expiring') return product.status === 'expiring';
    if (filter === 'expired') return product.status === 'expired';
    if (filter === 'fresh') return product.status === 'fresh';
    return true;
  });

  // 统计数据
  const stats = {
    total: products.length,
    fresh: products.filter(p => p.status === 'fresh').length,
    expiring: products.filter(p => p.status === 'expiring').length,
    expired: products.filter(p => p.status === 'expired').length
  };

  // 跳转到扫码页面
  const handleScanAdd = () => {
    setShowAddModal(false);
    props.$w.utils.navigateTo({
      pageId: 'scan',
      params: {}
    });
  };

  // 语音添加
  const handleVoiceAdd = () => {
    setShowAddModal(false);
    setShowVoiceModal(true);
    setIsListening(true);

    // 模拟语音识别
    setTimeout(() => {
      setIsListening(false);
      setVoiceText('金龙鱼调和油 2027-06-01');
      toast({
        title: '识别成功',
        description: '已识别语音内容，请确认信息',
        duration: 2000
      });
    }, 2000);
  };

  // 保存语音添加的产品
  const handleVoiceSave = () => {
    if (!voiceText.trim()) {
      toast({
        title: '请输入产品信息',
        description: '请说出产品名称和到期日期',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // 解析语音内容（简化处理）
    const parts = voiceText.split(/\s+/);
    const name = parts[0] || '未知产品';
    const expiryDate = parts[1] || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // 计算保质期
    const today = new Date();
    const expDate = new Date(expiryDate);
    const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const totalDays = 180;
    const newProduct = {
      id: Date.now().toString(),
      name,
      brand: '未知品牌',
      category: '其他',
      icon: '📦',
      productionDate: today.toISOString().split('T')[0],
      expiryDate,
      daysLeft,
      totalDays,
      status: daysLeft <= 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'fresh',
      storageType: 'room',
      storage: '常温',
      storageTip: '请按产品说明存储',
      reminderDays: 7,
      reminderEnabled: true
    };
    const savedProduct = addProduct(newProduct);
    setProducts(prev => [savedProduct, ...prev]);
    setShowVoiceModal(false);
    setVoiceText('');
    toast({
      title: '添加成功',
      description: `${name} 已添加到列表`,
      duration: 2000
    });
  };

  // 手动添加 - 打开弹窗
  const handleManualAdd = () => {
    setShowAddModal(false);
    setShowManualModal(true);
    // 设置默认到期日期为6个月后
    const defaultDate = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setManualForm({
      name: '',
      brand: '',
      category: '调味品',
      expiryDate: defaultDate,
      storageType: 'room'
    });
  };

  // 保存手动添加的产品
  const handleManualSave = () => {
    if (!manualForm.name.trim()) {
      toast({
        title: '请输入产品名称',
        description: '产品名称不能为空',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }
    if (!manualForm.expiryDate) {
      toast({
        title: '请选择到期日期',
        description: '到期日期不能为空',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // 计算保质期
    const today = new Date();
    const expDate = new Date(manualForm.expiryDate);
    const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const totalDays = 180;

    // 获取分类图标
    const categoryIcons = {
      '调味品': '🧂',
      '乳制品': '🥛',
      '禽蛋': '🥚',
      '日用品': '🪥',
      '保健品': '💊',
      '速冻食品': '🥟',
      '饮料': '💧',
      '其他': '📦'
    };
    const newProduct = {
      id: Date.now().toString(),
      name: manualForm.name,
      brand: manualForm.brand || '未知品牌',
      category: manualForm.category,
      icon: categoryIcons[manualForm.category] || '📦',
      productionDate: today.toISOString().split('T')[0],
      expiryDate: manualForm.expiryDate,
      daysLeft,
      totalDays,
      status: daysLeft <= 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'fresh',
      storageType: manualForm.storageType,
      storage: manualForm.storageType === 'cold' ? '冷藏' : manualForm.storageType === 'frozen' ? '冷冻' : '常温',
      storageTip: manualForm.storageType === 'cold' ? '2-6°C冷藏保存' : manualForm.storageType === 'frozen' ? '-18°C以下冷冻保存' : '阴凉干燥处保存',
      reminderDays: 7,
      reminderEnabled: true
    };
    const savedProduct = addProduct(newProduct);
    setProducts(prev => [savedProduct, ...prev]);
    setShowManualModal(false);
    toast({
      title: '添加成功',
      description: `${manualForm.name} 已添加到列表`,
      duration: 2000
    });
  };

  // 查看产品详情
  const handleProductClick = product => {
    props.$w.utils.navigateTo({
      pageId: 'detail',
      params: {
        id: product.id
      }
    });
  };

  // 删除产品（仅内存操作，实际删除由详情页处理）
  const handleDeleteProduct = productId => {
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
    setProducts(updatedProducts);
    toast({
      title: '删除成功',
      description: '产品已从列表中移除',
      duration: 2000
    });
  };
  return <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* 顶部标题栏 */}
      <header className="bg-[#1B4965] text-white px-4 py-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            🏠 家庭物品管家
          </h1>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30" aria-label="搜索">
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {/* 统计数据 */}
        <div className="flex justify-around mt-4 bg-white/10 rounded-xl p-3">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs opacity-80">全部</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#A7C957]">{stats.fresh}</div>
            <div className="text-xs opacity-80">新鲜</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#F48C06]">{stats.expiring}</div>
            <div className="text-xs opacity-80">临期</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#DC3545]">{stats.expired}</div>
            <div className="text-xs opacity-80">过期</div>
          </div>
        </div>
      </header>

      {/* 搜索栏 */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
          <input type="text" placeholder="搜索物品名称..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#DEE2E6] text-[#2D3436] placeholder-[#6C757D] focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20" style={{
          fontSize: '16px'
        }} />
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="px-4 py-2 overflow-x-auto">
        <div className="flex gap-2">
          {[{
          key: 'all',
          label: '全部',
          icon: Package,
          color: '#1B4965'
        }, {
          key: 'fresh',
          label: '新鲜',
          icon: CheckCircle,
          color: '#A7C957'
        }, {
          key: 'expiring',
          label: '临期',
          icon: AlertTriangle,
          color: '#F48C06'
        }, {
          key: 'expired',
          label: '过期',
          icon: Clock,
          color: '#DC3545'
        }].map(item => <button key={item.key} onClick={() => setFilter(item.key)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${filter === item.key ? 'bg-[#E85D04] text-white shadow-md' : 'bg-white text-[#1B4965] border border-[#DEE2E6]'}`} style={{
          minHeight: '44px',
          fontSize: '14px'
        }} aria-pressed={filter === item.key}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>)}
        </div>
      </div>

      {/* 产品列表 */}
      <div className="px-4 py-3">
        {filteredProducts.length === 0 ? <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-[#DEE2E6] mb-4" />
            <p className="text-[#6C757D] text-lg">暂无物品</p>
            <p className="text-[#6C757D] text-sm mt-2">点击下方按钮添加物品</p>
          </div> : <div className="space-y-3">
            {filteredProducts.map(product => <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} onDelete={() => handleDeleteProduct(product.id)} />)}
          </div>}
      </div>

      {/* 悬浮添加按钮 */}
      <div className="fixed bottom-24 right-4 z-20">
        <button onClick={() => setShowAddModal(true)} className="w-14 h-14 rounded-full bg-[#E85D04] text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform" style={{
        minWidth: '56px',
        minHeight: '56px'
      }} aria-label="添加物品">
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* 添加方式弹窗 */}
      {showAddModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-[#DEE2E6] rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-[#1B4965] mb-6 text-center" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
              添加物品
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <button onClick={handleScanAdd} className="flex flex-col items-center p-4 rounded-2xl bg-[#E85D04]/10 hover:bg-[#E85D04]/20 transition-colors" style={{
            minHeight: '100px'
          }}>
                <div className="w-12 h-12 rounded-full bg-[#E85D04] flex items-center justify-center mb-2">
                  <Scan className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-[#1B4965]">扫码添加</span>
              </button>
              
              <button onClick={handleVoiceAdd} className="flex flex-col items-center p-4 rounded-2xl bg-[#1B4965]/10 hover:bg-[#1B4965]/20 transition-colors" style={{
            minHeight: '100px'
          }}>
                <div className="w-12 h-12 rounded-full bg-[#1B4965] flex items-center justify-center mb-2">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-[#1B4965]">语音添加</span>
              </button>
              
              <button onClick={handleManualAdd} className="flex flex-col items-center p-4 rounded-2xl bg-[#A7C957]/10 hover:bg-[#A7C957]/20 transition-colors" style={{
            minHeight: '100px'
          }}>
                <div className="w-12 h-12 rounded-full bg-[#A7C957] flex items-center justify-center mb-2">
                  <Keyboard className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-[#1B4965]">手动添加</span>
              </button>
            </div>
            
            <button onClick={() => setShowAddModal(false)} className="w-full mt-6 py-3 rounded-xl bg-[#DEE2E6] text-[#1B4965] font-medium" style={{
          minHeight: '48px',
          fontSize: '16px'
        }}>
              取消
            </button>
          </div>
        </div>}

      {/* 手动添加弹窗 */}
      {showManualModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowManualModal(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1B4965]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
                手动添加物品
              </h3>
              <button onClick={() => setShowManualModal(false)} className="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center">
                <X className="w-5 h-5 text-[#6C757D]" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* 产品名称 */}
              <div>
                <label className="block text-sm font-medium text-[#1B4965] mb-1">产品名称 *</label>
                <input type="text" placeholder="请输入产品名称" value={manualForm.name} onChange={e => setManualForm({
              ...manualForm,
              name: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] text-[#2D3436] placeholder-[#6C757D] focus:outline-none focus:border-[#E85D04]" style={{
              fontSize: '16px',
              minHeight: '48px'
            }} />
              </div>
              
              {/* 品牌 */}
              <div>
                <label className="block text-sm font-medium text-[#1B4965] mb-1">品牌</label>
                <input type="text" placeholder="请输入品牌（可选）" value={manualForm.brand} onChange={e => setManualForm({
              ...manualForm,
              brand: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] text-[#2D3436] placeholder-[#6C757D] focus:outline-none focus:border-[#E85D04]" style={{
              fontSize: '16px',
              minHeight: '48px'
            }} />
              </div>
              
              {/* 分类 */}
              <div>
                <label className="block text-sm font-medium text-[#1B4965] mb-1">分类</label>
                <div className="grid grid-cols-4 gap-2">
                  {['调味品', '乳制品', '禽蛋', '日用品', '保健品', '速冻食品', '饮料', '其他'].map(cat => <button key={cat} onClick={() => setManualForm({
                ...manualForm,
                category: cat
              })} className={`py-2 px-2 rounded-lg text-sm transition-colors ${manualForm.category === cat ? 'bg-[#E85D04] text-white' : 'bg-[#F8F9FA] text-[#1B4965]'}`} style={{
                minHeight: '44px'
              }}>
                      {cat}
                    </button>)}
                </div>
              </div>
              
              {/* 到期日期 */}
              <div>
                <label className="block text-sm font-medium text-[#1B4965] mb-1">到期日期 *</label>
                <input type="date" value={manualForm.expiryDate} onChange={e => setManualForm({
              ...manualForm,
              expiryDate: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] text-[#2D3436] focus:outline-none focus:border-[#E85D04]" style={{
              fontSize: '16px',
              minHeight: '48px'
            }} />
              </div>
              
              {/* 存储方式 */}
              <div>
                <label className="block text-sm font-medium text-[#1B4965] mb-1">存储方式</label>
                <div className="flex gap-2">
                  {[{
                key: 'room',
                label: '常温',
                icon: Sun
              }, {
                key: 'cold',
                label: '冷藏',
                icon: Thermometer
              }, {
                key: 'frozen',
                label: '冷冻',
                icon: Droplets
              }].map(item => <button key={item.key} onClick={() => setManualForm({
                ...manualForm,
                storageType: item.key
              })} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${manualForm.storageType === item.key ? 'bg-[#E85D04] text-white' : 'bg-[#F8F9FA] text-[#1B4965]'}`} style={{
                minHeight: '48px'
              }}>
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>)}
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button onClick={handleManualSave} className="w-full py-3 rounded-xl bg-[#E85D04] text-white font-bold" style={{
            minHeight: '52px',
            fontSize: '16px'
          }}>
                保存添加
              </button>
              <button onClick={() => setShowManualModal(false)} className="w-full py-3 rounded-xl bg-[#DEE2E6] text-[#1B4965] font-medium" style={{
            minHeight: '48px',
            fontSize: '16px'
          }}>
                取消
              </button>
            </div>
          </div>
        </div>}

      {/* 语音添加弹窗 */}
      {showVoiceModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
      setShowVoiceModal(false);
      setIsListening(false);
    }}>
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${isListening ? 'bg-[#E85D04] animate-pulse' : 'bg-[#1B4965]'}`}>
              <Mic className={`w-12 h-12 text-white ${isListening ? 'animate-bounce' : ''}`} />
            </div>
            
            <h3 className="text-xl font-bold text-[#1B4965] mb-2" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
              {isListening ? '正在聆听...' : '语音识别结果'}
            </h3>
            <p className="text-sm text-[#6C757D] mb-4">
              {isListening ? '请说出产品名称和到期日期' : '请确认或修改识别结果'}
            </p>
            
            <input type="text" placeholder="例如：金龙鱼调和油 2027-06-01" value={voiceText} onChange={e => setVoiceText(e.target.value)} disabled={isListening} className="w-full px-4 py-3 rounded-xl border border-[#DEE2E6] text-[#2D3436] placeholder-[#6C757D] focus:outline-none focus:border-[#E85D04] mb-4" style={{
          fontSize: '16px',
          minHeight: '48px'
        }} />
            
            <div className="space-y-3">
              <button onClick={handleVoiceSave} disabled={isListening} className="w-full py-3 rounded-xl bg-[#E85D04] text-white font-bold disabled:opacity-50" style={{
            minHeight: '52px',
            fontSize: '16px'
          }}>
                {isListening ? '识别中...' : '确认添加'}
              </button>
              <button onClick={() => {
            setShowVoiceModal(false);
            setIsListening(false);
          }} className="w-full py-3 rounded-xl bg-[#DEE2E6] text-[#1B4965] font-medium" style={{
            minHeight: '48px',
            fontSize: '16px'
          }}>
                取消
              </button>
            </div>
          </div>
        </div>}

      {/* 底部导航栏 */}
      <TabBar activeTab="home" />
    </div>;
}
export default HomePage;
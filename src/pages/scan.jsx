// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Flashlight, FlashlightOff, RotateCcw, CheckCircle, X, ArrowLeft, Keyboard } from 'lucide-react';

import TabBar from '@/components/TabBar';
import { addProduct } from '@/lib/storage';
function ScanPage(props) {
  const {
    toast
  } = useToast();
  const [isScanning, setIsScanning] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 模拟扫码结果
  const mockScanResults = [{
    name: '蒙牛纯牛奶',
    brand: '蒙牛',
    barcode: '6923648732012',
    productionDate: '2026-05-01',
    expiryDate: '2026-08-01',
    category: '乳制品',
    icon: '🥛',
    storage: '冷藏保存，开启后需冷藏并在24小时内饮用',
    shelfLife: '180天',
    storageType: 'cold'
  }, {
    name: '金龙鱼调和油',
    brand: '金龙鱼',
    barcode: '6923648732029',
    productionDate: '2026-06-01',
    expiryDate: '2026-07-20',
    category: '调味品',
    icon: '🫒',
    storage: '避光保存，开封后建议3个月内食用完毕',
    shelfLife: '180天',
    storageType: 'room'
  }, {
    name: '康恩贝维生素C',
    brand: '康恩贝',
    barcode: '6923648732036',
    productionDate: '2025-12-01',
    expiryDate: '2026-06-10',
    category: '保健品',
    icon: '💊',
    storage: '密封保存于25°C以下干燥处',
    shelfLife: '180天',
    storageType: 'room'
  }];

  // 开始扫描
  const startScanning = () => {
    setIsScanning(true);
    setScanResult(null);
    toast({
      title: '扫描中',
      description: '请将二维码对准扫描框',
      duration: 1500
    });
  };

  // 模拟扫码
  const simulateScan = () => {
    const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];

    // 计算保质期
    const today = new Date();
    const expDate = new Date(randomResult.expiryDate);
    const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const totalDays = parseInt(randomResult.shelfLife) || 180;
    const resultWithStatus = {
      ...randomResult,
      daysLeft,
      totalDays,
      status: daysLeft <= 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'fresh'
    };
    setIsScanning(false);
    setScanResult(resultWithStatus);
    toast({
      title: '识别成功',
      description: `已识别：${randomResult.name}`,
      duration: 2000
    });
  };

  // 手动输入查询
  const handleManualQuery = () => {
    if (!manualBarcode.trim()) {
      toast({
        title: '请输入条码',
        description: '请输入商品条码进行查询',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // 模拟查询
    const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
    const resultWithBarcode = {
      ...randomResult,
      barcode: manualBarcode
    };

    // 计算保质期
    const today = new Date();
    const expDate = new Date(resultWithBarcode.expiryDate);
    const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    const totalDays = parseInt(resultWithBarcode.shelfLife) || 180;
    const finalResult = {
      ...resultWithBarcode,
      daysLeft,
      totalDays,
      status: daysLeft <= 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'fresh'
    };
    setScanResult(finalResult);
    toast({
      title: '查询成功',
      description: `已找到：${randomResult.name}`,
      duration: 2000
    });
  };

  // 保存产品
  const handleSave = () => {
    if (!scanResult) return;

    // 构建完整的产品数据
    const newProduct = {
      name: scanResult.name,
      brand: scanResult.brand,
      category: scanResult.category,
      icon: scanResult.icon,
      productionDate: scanResult.productionDate,
      expiryDate: scanResult.expiryDate,
      daysLeft: scanResult.daysLeft,
      totalDays: scanResult.totalDays,
      status: scanResult.status,
      storageType: scanResult.storageType,
      storage: scanResult.storageType === 'cold' ? '冷藏' : scanResult.storageType === 'frozen' ? '冷冻' : '常温',
      storageTip: scanResult.storage,
      reminderDays: 7,
      reminderEnabled: true
    };

    // 保存到本地存储
    const saved = addProduct(newProduct);
    if (saved) {
      toast({
        title: '保存成功',
        description: `${scanResult.name} 已添加到物品列表`,
        duration: 2000
      });

      // 关闭弹窗，返回首页并刷新数据
      setScanResult(null);
      props.$w.utils.navigateTo('index', {
        _refresh: Date.now()
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

  // 返回
  const handleBack = () => {
    props.$w.utils.navigateTo('index', {
      _refresh: Date.now()
    });
  };
  return <div className="min-h-screen bg-black flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-black/80 text-white px-4 py-4 flex items-center justify-between z-20">
        <button onClick={handleBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30" aria-label="返回">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          扫码添加
        </h1>
        <button onClick={() => setManualMode(!manualMode)} className="text-sm px-3 py-1 rounded-full bg-white/20 flex items-center gap-1">
          <Keyboard className="w-4 h-4" />
          {manualMode ? '扫码模式' : '手动输入'}
        </button>
      </header>

      {/* 扫描区域 */}
      <div className="flex-1 relative flex items-center justify-center">
        {manualMode ?
      // 手动输入模式
      <div className="w-full max-w-sm p-6">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1B4965] mb-4 text-center">
                手动输入条码
              </h3>
              <input type="text" placeholder="请输入商品条码" value={manualBarcode} onChange={e => setManualBarcode(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#DEE2E6] text-center text-xl tracking-widest focus:outline-none focus:border-[#E85D04]" style={{
            fontSize: '18px',
            minHeight: '56px'
          }} />
              <button onClick={handleManualQuery} className="w-full mt-4 py-3 rounded-xl bg-[#E85D04] text-white font-bold" style={{
            minHeight: '52px',
            fontSize: '16px'
          }}>
                查询
              </button>
            </div>
          </div> :
      // 扫码模式
      <>
            {/* 模拟摄像头画面 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B4965] to-[#0D2A3A]">
              {/* 扫描框 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 relative">
                  {/* 四角装饰 */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#E85D04] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#E85D04] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#E85D04] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#E85D04] rounded-br-lg"></div>
                  
                  {/* 扫描线动画 */}
                  {isScanning && <div className="absolute left-2 right-2 h-1 bg-[#E85D04] animate-scan-line rounded-full shadow-lg shadow-[#E85D04]/50"></div>}
                </div>
              </div>
              
              {/* 提示文字 */}
              <div className="absolute top-1/2 -translate-y-1/2 mt-40 text-center text-white">
                <p className="text-lg font-medium mb-2">将二维码放入框内</p>
                <p className="text-sm opacity-70">自动扫描识别</p>
              </div>
            </div>

            {/* 底部操作区 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <div className="flex justify-center gap-8">
                <button onClick={() => setFlashOn(!flashOn)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${flashOn ? 'bg-[#F48C06]' : 'bg-white/20'}`} aria-label="闪光灯">
                  {flashOn ? <FlashlightOff className="w-6 h-6 text-white" /> : <Flashlight className="w-6 h-6 text-white" />}
                </button>
                
                <button onClick={simulateScan} className="w-20 h-20 rounded-full bg-[#E85D04] flex items-center justify-center shadow-lg" aria-label="手动触发扫描">
                  <Camera className="w-10 h-10 text-white" />
                </button>
                
                <button onClick={startScanning} className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center" aria-label="重试">
                  <RotateCcw className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </>}
      </div>

      {/* 扫描结果弹窗 */}
      {scanResult && <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden">
            {/* 头部 */}
            <div className="bg-[#A7C957] p-4 text-white text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-bold">识别成功</h3>
            </div>
            
            {/* 产品信息 */}
            <div className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl flex items-center justify-center">
                  <span className="text-3xl">{scanResult.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#1B4965]">{scanResult.name}</h4>
                  <p className="text-sm text-[#6C757D]">{scanResult.brand}</p>
                  <p className="text-xs text-[#6C757D] mt-1">条码: {scanResult.barcode}</p>
                </div>
                <button onClick={() => setScanResult(null)} className="text-[#6C757D]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[#DEE2E6]">
                  <span className="text-[#6C757D]">生产日期</span>
                  <span className="text-[#2D3436] font-medium">{scanResult.productionDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#DEE2E6]">
                  <span className="text-[#6C757D]">保质期</span>
                  <span className="text-[#2D3436] font-medium">{scanResult.shelfLife}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#DEE2E6]">
                  <span className="text-[#6C757D]">到期日期</span>
                  <span className="text-[#DC3545] font-bold">{scanResult.expiryDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#6C757D]">存储方式</span>
                  <span className="text-[#1B4965] font-medium text-right flex-1 ml-4">{scanResult.storage}</span>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="p-4 bg-[#F8F9FA] flex gap-3">
              <button onClick={() => setScanResult(null)} className="flex-1 py-3 rounded-xl bg-white border border-[#DEE2E6] text-[#1B4965] font-medium" style={{
            minHeight: '48px'
          }}>
                取消
              </button>
              <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-[#E85D04] text-white font-bold" style={{
            minHeight: '48px'
          }}>
                保存
              </button>
            </div>
          </div>
        </div>}

      {/* 底部导航栏 */}
      <div className="bg-white">
        <TabBar activeTab="scan" />
      </div>
    </div>;
}
export default ScanPage;
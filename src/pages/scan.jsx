// @ts-ignore;
import React, { useState, useRef, useEffect, useCallback } from 'react';
// @ts-ignore;
import { useToast, Input, Button } from '@/components/ui';
// @ts-ignore;
import { Camera, Flashlight, FlashlightOff, RotateCcw, CheckCircle, X, ArrowLeft, Keyboard, Mic, MicOff, Loader2 } from 'lucide-react';

import TabBar from '@/components/TabBar';
import { addProduct } from '@/lib/storage';
function ScanPage(props) {
  const {
    toast
  } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [cameraMode, setCameraMode] = useState(false); // 是否启用摄像头
  const [isRecording, setIsRecording] = useState(false); // 是否正在录音
  const [voiceInput, setVoiceInput] = useState(''); // 语音输入结果
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);

  // 模拟扫码结果数据
  const mockScanResults = [{
    name: '蒙牛纯牛奶',
    brand: '蒙牛',
    barcode: '6923648732012',
    productionDate: '2026-05-01',
    expiryDate: '2026-08-01',
    category: '乳制品',
    icon: '🥛',
    storage: '冷藏保存，开启后需冷藏并在24小时内饮用',
    shelfLife: '90天',
    storageType: 'cold'
  }, {
    name: '金龙鱼调和油',
    brand: '金龙鱼',
    barcode: '6923648732029',
    productionDate: '2026-06-01',
    expiryDate: '2027-01-01',
    category: '调味品',
    icon: '🫒',
    storage: '避光保存，开封后建议3个月内食用完毕',
    shelfLife: '540天',
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

  // 清理函数 - 页面卸载时关闭摄像头和语音
  useEffect(() => {
    return () => {
      stopCamera();
      stopVoiceInput();
    };
  }, []);

  // 启动摄像头
  const startCamera = useCallback(async () => {
    try {
      // 检查浏览器是否支持 MediaDevices API
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          title: '不支持摄像头',
          description: '您的浏览器不支持摄像头功能，请使用手动输入模式',
          variant: 'destructive',
          duration: 3000
        });
        return;
      }

      // 请求摄像头权限
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          // 后置摄像头
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        },
        audio: false
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraMode(true);
      setIsScanning(true);
      toast({
        title: '摄像头已启动',
        description: '请将商品条码对准摄像头',
        duration: 2000
      });
    } catch (err) {
      console.error('摄像头启动失败:', err);
      let errorMessage = '无法访问摄像头';
      if (err.name === 'NotAllowedError') {
        errorMessage = '请允许访问摄像头权限';
      } else if (err.name === 'NotFoundError') {
        errorMessage = '未找到可用摄像头';
      } else if (err.name === 'NotReadableError') {
        errorMessage = '摄像头被其他应用占用';
      }
      toast({
        title: '摄像头启动失败',
        description: errorMessage,
        variant: 'destructive',
        duration: 3000
      });
    }
  }, [toast]);

  // 停止摄像头
  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraMode(false);
    setIsScanning(false);
  }, []);

  // 拍照识别
  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 绘制视频帧到画布
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 获取图片数据（这里可以添加 OCR 识别逻辑）
    // 目前使用模拟方式
    simulateScan();
  }, []);

  // 模拟扫码（暂时用模拟数据）
  const simulateScan = useCallback(() => {
    const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
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
  }, [toast]);

  // 开始扫描
  const handleStartScan = useCallback(() => {
    startCamera();
  }, [startCamera]);

  // 手动输入查询
  const handleManualQuery = useCallback(() => {
    if (!manualBarcode.trim()) {
      toast({
        title: '请输入条码',
        description: '请输入商品条码进行查询',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // 模拟查询结果
    const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
    const resultWithBarcode = {
      ...randomResult,
      barcode: manualBarcode
    };
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
  }, [manualBarcode, toast]);

  // 语音输入功能
  const startVoiceInput = useCallback(() => {
    // 检查浏览器是否支持语音识别
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: '不支持语音输入',
        description: '您的浏览器不支持语音识别功能',
        variant: 'destructive',
        duration: 3000
      });
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN'; // 设置中文

      recognition.onstart = () => {
        setIsRecording(true);
        toast({
          title: '正在聆听',
          description: '请说出商品名称或条码',
          duration: 2000
        });
      };
      recognition.onresult = event => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        const currentInput = finalTranscript || interimTranscript;
        setVoiceInput(currentInput);
        setManualBarcode(currentInput); // 自动填入输入框
      };
      recognition.onerror = event => {
        console.error('语音识别错误:', event.error);
        setIsRecording(false);
        let errorMessage = '语音识别失败';
        if (event.error === 'no-speech') {
          errorMessage = '未检测到语音，请重试';
        } else if (event.error === 'audio-capture') {
          errorMessage = '无法访问麦克风';
        } else if (event.error === 'not-allowed') {
          errorMessage = '请允许访问麦克风权限';
        } else if (event.error === 'network') {
          errorMessage = '网络错误，请检查网络连接';
        }
        toast({
          title: '语音输入失败',
          description: errorMessage,
          variant: 'destructive',
          duration: 3000
        });
      };
      recognition.onend = () => {
        setIsRecording(false);
        // 如果有识别结果，自动执行查询
        if (voiceInput.trim()) {
          handleManualQuery();
        }
      };
      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('语音识别初始化失败:', err);
      toast({
        title: '语音输入失败',
        description: '无法启动语音识别，请重试',
        variant: 'destructive',
        duration: 3000
      });
    }
  }, [toast, voiceInput, handleManualQuery]);

  // 停止语音输入
  const stopVoiceInput = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  // 保存产品
  const handleSave = useCallback(() => {
    if (!scanResult) return;
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
    const saved = addProduct(newProduct);
    if (saved) {
      toast({
        title: '保存成功',
        description: `${scanResult.name} 已添加到物品列表`,
        duration: 2000
      });

      // 停止摄像头
      stopCamera();
      stopVoiceInput();
      setScanResult(null);
      setManualBarcode('');
      setVoiceInput('');
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
  }, [scanResult, toast, stopCamera, stopVoiceInput, props.$w.utils]);

  // 返回
  const handleBack = useCallback(() => {
    stopCamera();
    stopVoiceInput();
    props.$w.utils.navigateTo('index', {
      _refresh: Date.now()
    });
  }, [stopCamera, stopVoiceInput, props.$w.utils]);

  // 切换手动模式
  const toggleManualMode = useCallback(() => {
    // 如果正在使用摄像头，先停止
    if (cameraMode) {
      stopCamera();
    }
    // 如果正在录音，先停止
    if (isRecording) {
      stopVoiceInput();
    }
    setManualMode(!manualMode);
  }, [cameraMode, isRecording, manualMode, stopCamera, stopVoiceInput]);

  // 切换闪光灯
  const toggleFlash = useCallback(() => {
    if (mediaStreamRef.current) {
      const track = mediaStreamRef.current.getVideoTracks()[0];
      if (track && track.getCapabilities().torch) {
        track.applyConstraints({
          advanced: [{
            torch: !flashOn
          }]
        }).then(() => {
          setFlashOn(!flashOn);
        }).catch(err => {
          console.error('闪光灯切换失败:', err);
          toast({
            title: '闪光灯切换失败',
            description: '当前设备不支持闪光灯',
            variant: 'destructive',
            duration: 2000
          });
        });
      }
    }
  }, [flashOn, toast]);
  return <div className="min-h-screen bg-black flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-black/80 text-white px-4 py-4 flex items-center justify-between z-20 backdrop-blur-lg">
        <button onClick={handleBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors" aria-label="返回">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          扫码添加
        </h1>
        <button onClick={toggleManualMode} className="text-sm px-3 py-1 rounded-full bg-white/20 flex items-center gap-1 active:bg-white/30 transition-colors">
          <Keyboard className="w-4 h-4" />
          {manualMode ? '扫码模式' : '手动输入'}
        </button>
      </header>

      {/* 主内容区域 */}
      <div className="flex-1 relative flex items-center justify-center">
        {manualMode ?
      // ========== 手动输入模式 ==========
      <div className="w-full max-w-sm p-6">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-[#1B4965] mb-4 text-center">
                输入商品条码或名称
              </h3>
              
              {/* 输入框 + 语音按钮 */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input type="text" placeholder="请输入条码或名称" value={manualBarcode} onChange={e => {
                setManualBarcode(e.target.value);
                setVoiceInput(e.target.value);
              }} className="w-full px-4 py-3 rounded-xl border-2 border-[#DEE2E6] text-center text-lg focus:outline-none focus:border-[#E85D04] transition-colors" style={{
                minHeight: '52px'
              }} />
                  {/* 语音输入状态指示 */}
                  {isRecording && <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-red-500">录音中</span>
                    </div>}
                </div>
                
                {/* 语音输入按钮 */}
                <button onClick={isRecording ? stopVoiceInput : startVoiceInput} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-[#E85D04]'}`} aria-label={isRecording ? '停止语音输入' : '开始语音输入'}>
                  {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                </button>
              </div>

              {/* 语音输入提示 */}
              {isRecording && <p className="text-sm text-[#6C757D] mt-2 text-center">
                  请说出商品名称或条码...
                </p>}
              {voiceInput && !isRecording && <p className="text-sm text-[#6C757D] mt-2 text-center">
                  识别结果：{voiceInput}
                </p>}

              {/* 查询按钮 */}
              <Button onClick={handleManualQuery} disabled={!manualBarcode.trim()} className="w-full mt-4 rounded-xl bg-[#E85D04] hover:bg-[#E85D04]/90 text-white font-bold disabled:opacity-50" style={{
            minHeight: '52px',
            fontSize: '16px'
          }}>
                查询
              </Button>

              {/* 分隔线 */}
              <div className="flex items-center gap-4 mt-6 mb-4">
                <div className="flex-1 h-px bg-[#DEE2E6]"></div>
                <span className="text-sm text-[#6C757D]">或</span>
                <div className="flex-1 h-px bg-[#DEE2E6]"></div>
              </div>

              {/* 切换到扫码模式 */}
              <button onClick={toggleManualMode} className="w-full py-3 rounded-xl bg-[#F8F9FA] text-[#1B4965] font-medium flex items-center justify-center gap-2 active:bg-[#E9ECEF] transition-colors">
                <Camera className="w-5 h-5" />
                使用摄像头扫码
              </button>
            </div>
          </div> :
      // ========== 扫码模式 ==========
      <>
            {cameraMode ?
        // ========== 摄像头画面 ==========
        <div className="absolute inset-0">
                {/* 视频画面 */}
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
                
                {/* 扫描框覆盖层 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* 半透明遮罩 */}
                  <div className="absolute inset-0 bg-black/50"></div>
                  
                  {/* 扫描框 */}
                  <div className="relative z-10">
                    <div className="w-64 h-64 relative">
                      {/* 透明区域 */}
                      <div className="absolute inset-0 bg-transparent" style={{
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                }}></div>
                      
                      {/* 四角装饰 */}
                      <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#E85D04] rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#E85D04] rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#E85D04] rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#E85D04] rounded-br-lg"></div>
                      
                      {/* 扫描线动画 */}
                      {isScanning && <div className="absolute left-2 right-2 h-1 bg-[#E85D04] animate-scan-line rounded-full shadow-lg shadow-[#E85D04]/50"></div>}
                    </div>
                  </div>
                </div>
                
                {/* 提示文字 */}
                <div className="absolute top-1/2 -translate-y-1/2 mt-40 text-center text-white z-20">
                  <p className="text-lg font-medium mb-2">将条码放入框内</p>
                  <p className="text-sm opacity-70">自动扫描识别</p>
                </div>
              </div> :
        // ========== 模拟摄像头画面 ==========
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
                  <p className="text-lg font-medium mb-2">点击下方按钮启动摄像头</p>
                  <p className="text-sm opacity-70">或使用手动输入模式</p>
                </div>
              </div>}

            {/* 底部操作区 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <div className="flex justify-center items-end gap-8">
                {/* 闪光灯按钮 */}
                <button onClick={toggleFlash} disabled={!cameraMode} className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${!cameraMode ? 'opacity-30' : flashOn ? 'bg-[#F48C06]' : 'bg-white/20'}`} aria-label="闪光灯">
                  {flashOn ? <FlashlightOff className="w-6 h-6 text-white" /> : <Flashlight className="w-6 h-6 text-white" />}
                </button>
                
                {/* 主拍照/模拟扫描按钮 */}
                {cameraMode ? <button onClick={takePhoto} className="w-20 h-20 rounded-full bg-[#E85D04] flex items-center justify-center shadow-lg active:scale-95 transition-transform" aria-label="拍照识别">
                    <Camera className="w-10 h-10 text-white" />
                  </button> : <button onClick={handleStartScan} className="w-20 h-20 rounded-full bg-[#E85D04] flex items-center justify-center shadow-lg active:scale-95 transition-transform" aria-label="启动摄像头">
                    <Camera className="w-10 h-10 text-white" />
                  </button>}
                
                {/* 重新开始/关闭摄像头按钮 */}
                <button onClick={cameraMode ? stopCamera : () => setIsScanning(!isScanning)} className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center transition-colors active:bg-white/30" aria-label={cameraMode ? '关闭摄像头' : '重新开始'}>
                  {cameraMode ? <X className="w-6 h-6 text-white" /> : <RotateCcw className="w-6 h-6 text-white" />}
                </button>
              </div>

              {/* 模式提示 */}
              <p className="text-center text-white/70 text-sm mt-4">
                {cameraMode ? '点击拍照按钮进行识别' : '点击启动摄像头扫描'}
              </p>
            </div>
          </>}
      </div>

      {/* 隐藏的 Canvas 用于拍照 */}
      <canvas ref={canvasRef} className="hidden" />

      {/* 扫描结果弹窗 */}
      {scanResult && <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
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
                <button onClick={() => setScanResult(null)} className="text-[#6C757D] active:text-[#495057] transition-colors">
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
                  <span className="text-[#1B4965] font-medium">{scanResult.storage}</span>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="p-4 bg-[#F8F9FA] flex gap-3">
              <Button onClick={() => setScanResult(null)} variant="outline" className="flex-1 rounded-xl" style={{
            minHeight: '48px'
          }}>
                取消
              </Button>
              <Button onClick={handleSave} className="flex-1 rounded-xl bg-[#E85D04] hover:bg-[#E85D04]/90 text-white" style={{
            minHeight: '48px'
          }}>
                保存
              </Button>
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
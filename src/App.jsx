// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';

import HomePage from './pages/index';
import ScanPage from './pages/scan';
import DetailPage from './pages/detail';
import ReminderPage from './pages/reminder';
import SettingsPage from './pages/settings';

// 页面名称映射（兼容 home 和 index）
const PAGE_MAP = {
  'home': 'index',
  'index': 'index',
  'scan': 'scan',
  'detail': 'detail',
  'reminder': 'reminder',
  'settings': 'settings'
};

// 简单的路由管理
function App() {
  const [currentPage, setCurrentPage] = useState('index');
  const [pageParams, setPageParams] = useState({});
  const [dataVersion, setDataVersion] = useState(0);

  // 解析 hash 并更新路由状态
  const parseHash = useCallback(() => {
    const hash = window.location.hash.slice(1) || 'home';
    const [page, paramsStr] = hash.split('?');
    const mappedPage = PAGE_MAP[page] || 'index';
    setCurrentPage(mappedPage);

    // 解析 URL 参数
    if (paramsStr) {
      const params = {};
      paramsStr.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) params[key] = decodeURIComponent(value);
      });
      setPageParams(params);
    } else {
      setPageParams({});
    }
  }, []);

  // 首次加载和 hash 变化监听
  useEffect(() => {
    parseHash();

    // 监听 hash 变化
    const handleHashChange = () => {
      parseHash();
      // 数据版本更新，触发页面重新加载数据
      setDataVersion(Date.now());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [parseHash]);

  // 全局导航函数 - 支持两种调用方式
  const navigateTo = (pageIdOrOptions, params = {}) => {
    // 支持对象形式调用：navigateTo({ pageId: 'xxx', params: {} })
    // 也支持直接调用：navigateTo('xxx', {})
    let pageId = pageIdOrOptions;
    let extraParams = params;
    if (typeof pageIdOrOptions === 'object' && pageIdOrOptions !== null) {
      pageId = pageIdOrOptions.pageId;
      extraParams = pageIdOrOptions.params || {};
    }
    const paramString = Object.keys(extraParams).length > 0 ? '?' + Object.entries(extraParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&') : '';
    window.location.hash = `#${pageId}${paramString}`;
    // 立即更新状态，不等待 hashchange 事件
    const mappedPage = PAGE_MAP[pageId] || pageId;
    setCurrentPage(mappedPage);
    if (Object.keys(extraParams).length > 0) {
      setPageParams(extraParams);
    } else {
      setPageParams({});
    }
    // 触发数据版本更新
    setDataVersion(Date.now());
  };

  // 全局返回函数
  const navigateBack = () => {
    window.history.back();
    // 触发数据版本更新
    setDataVersion(Date.now());
  };

  // 模拟 $w 对象
  const $w = {
    utils: {
      navigateTo,
      navigateBack,
      redirectTo: navigateTo
    },
    page: {
      dataset: {
        params: pageParams
      }
    }
  };

  // 渲染对应页面
  const renderPage = () => {
    const props = {
      $w,
      dataVersion // 传递给页面用于重新加载数据
    };
    switch (currentPage) {
      case 'index':
        return <HomePage {...props} />;
      case 'scan':
        return <ScanPage {...props} />;
      case 'detail':
        return <DetailPage {...props} />;
      case 'reminder':
        return <ReminderPage {...props} />;
      case 'settings':
        return <SettingsPage {...props} />;
      default:
        return <HomePage {...props} />;
    }
  };
  return renderPage();
}
export default App;
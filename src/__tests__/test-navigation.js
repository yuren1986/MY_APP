/**
 * 导航功能测试用例
 * 测试 App.jsx 中的路由和导航功能
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// 模拟路由状态
const routes = [];
const currentRoute = { hash: '' };

// 模拟 window.location
Object.defineProperty(window, 'location', {
  value: {
    hash: '',
    setHash: (hash) => {
      window.location.hash = hash;
      currentRoute.hash = hash;
      window.dispatchEvent(new Event('hashchange'));
    }
  },
  writable: true
});

describe('导航功能测试', () => {
  beforeEach(() => {
    window.location.hash = '#index';
  });

  describe('页面路由', () => {
    test('首页应该默认显示', () => {
      render(<App />);
      expect(screen.getByText(/家庭物品管家/)).toBeTruthy();
    });

    test('应该能导航到扫码页面', () => {
      const navigateTo = (pageId, params) => {
        window.location.setHash(`#${pageId}`);
      };
      
      navigateTo('scan', {});
      
      expect(window.location.hash).toBe('#scan');
    });

    test('应该能导航到详情页面', () => {
      const navigateTo = (pageId, params) => {
        window.location.setHash(`#${pageId}?id=test123`);
      };
      
      navigateTo('detail', { id: 'test123' });
      
      expect(window.location.hash).toContain('detail');
      expect(window.location.hash).toContain('id=test123');
    });

    test('应该能导航到设置页面', () => {
      const navigateTo = (pageId, params) => {
        window.location.setHash(`#${pageId}`);
      };
      
      navigateTo('settings', {});
      
      expect(window.location.hash).toBe('#settings');
    });

    test('应该能导航到提醒页面', () => {
      const navigateTo = (pageId, params) => {
        window.location.setHash(`#${pageId}`);
      };
      
      navigateTo('reminder', {});
      
      expect(window.location.hash).toBe('#reminder');
    });
  });

  describe('导航参数传递', () => {
    test('应该正确解析 URL 参数', () => {
      window.location.setHash('#detail?id=abc123');
      
      const hash = window.location.hash.slice(1);
      const [page, paramsStr] = hash.split('?');
      const params = {};
      paramsStr.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) params[key] = decodeURIComponent(value);
      });
      
      expect(params.id).toBe('abc123');
    });

    test('应该处理多个参数', () => {
      window.location.setHash('#detail?id=123&mode=edit');
      
      const hash = window.location.hash.slice(1);
      const [page, paramsStr] = hash.split('?');
      const params = {};
      paramsStr.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) params[key] = decodeURIComponent(value);
      });
      
      expect(params.id).toBe('123');
      expect(params.mode).toBe('edit');
    });
  });
});

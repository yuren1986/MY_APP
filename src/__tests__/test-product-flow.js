/**
 * 产品流程测试用例
 * 测试添加、编辑、删除产品的完整流程
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../pages/index';
import DetailPage from '../pages/detail';
import ScanPage from '../pages/scan';

// Mock storage
jest.mock('../lib/storage', () => {
  let products = [];
  return {
    loadProducts: () => products,
    saveProducts: (data) => { products = data; return true; },
    addProduct: (product) => {
      const newProduct = { ...product, id: Date.now().toString() };
      products.unshift(newProduct);
      return newProduct;
    },
    updateProduct: (id, updates) => {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        return products[index];
      }
      return null;
    },
    deleteProduct: (id) => {
      products = products.filter(p => p.id !== id);
      return true;
    },
    getProduct: (id) => products.find(p => p.id === id) || null,
    loadUserInfo: () => ({ id: 'test', nickname: '测试' }),
    saveUserInfo: () => true
  };
});

describe('产品流程测试', () => {
  describe('首页产品管理', () => {
    test('应该显示空状态提示', () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      expect(screen.getByText(/暂无物品/)).toBeTruthy();
    });

    test('应该能打开添加弹窗', async () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      const addButton = screen.getByRole('button', { name: /添加物品/i });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('添加物品')).toBeTruthy();
      });
    });

    test('应该能搜索产品', async () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      const searchInput = screen.getByPlaceholderText(/搜索物品名称/);
      fireEvent.change(searchInput, { target: { value: '牛奶' } });
      
      expect(searchInput.value).toBe('牛奶');
    });

    test('应该能切换筛选条件', async () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      const filterButton = screen.getByRole('button', { name: /新鲜/i });
      fireEvent.click(filterButton);
      
      expect(filterButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('手动添加产品', () => {
    test('应该能填写产品表单', async () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      // 打开添加弹窗
      fireEvent.click(screen.getByRole('button', { name: /添加物品/i }));
      
      await waitFor(() => {
        expect(screen.getByText('添加物品')).toBeTruthy();
      });

      // 点击手动添加
      fireEvent.click(screen.getByText('手动添加'));
      
      await waitFor(() => {
        expect(screen.getByText('手动添加物品')).toBeTruthy();
      });

      // 填写表单
      const nameInput = screen.getByPlaceholderText(/请输入产品名称/);
      fireEvent.change(nameInput, { target: { value: '测试产品' } });
      
      expect(nameInput.value).toBe('测试产品');
    });

    test('产品名称为空时应该显示错误', async () => {
      render(<HomePage $w={{ utils: { navigateTo: () => {} }, page: { dataset: { params: {} } } }} />);
      
      // 打开手动添加
      fireEvent.click(screen.getByRole('button', { name: /添加物品/i }));
      await waitFor(() => screen.getByText('手动添加'));
      fireEvent.click(screen.getByText('手动添加'));
      
      await waitFor(() => screen.getByText('手动添加物品'));
      
      // 点击保存
      fireEvent.click(screen.getByText('保存添加'));
      
      await waitFor(() => {
        expect(screen.getByText(/请输入产品名称/)).toBeTruthy();
      });
    });
  });

  describe('产品详情页', () => {
    test('应该能打开编辑模式', async () => {
      render(
        <DetailPage 
          $w={{ 
            utils: { navigateTo: () => {} }, 
            page: { dataset: { params: { id: '1' } } } 
          }}
        />
      );
      
      await waitFor(() => {
        const editButton = screen.getByRole('button', { name: /编辑/i });
        fireEvent.click(editButton);
      });
      
      expect(screen.getByText('编辑产品')).toBeTruthy();
    });

    test('应该能切换提醒设置', async () => {
      render(
        <DetailPage 
          $w={{ 
            utils: { navigateTo: () => {} }, 
            page: { dataset: { params: { id: '1' } } } 
          }}
        />
      );
      
      await waitFor(() => {
        const reminderToggle = screen.getByRole('button', { name: /开关提醒/i });
        fireEvent.click(reminderToggle);
      });
      
      // 验证提醒设置已切换
      expect(screen.getByText(/提醒已关闭|提醒已开启/)).toBeTruthy();
    });

    test('应该能打开删除确认弹窗', async () => {
      render(
        <DetailPage 
          $w={{ 
            utils: { navigateTo: () => {} }, 
            page: { dataset: { params: { id: '1' } } } 
          }}
        />
      );
      
      await waitFor(() => {
        const deleteButton = screen.getByRole('button', { name: /删除此产品/i });
        fireEvent.click(deleteButton);
      });
      
      expect(screen.getByText('确认删除')).toBeTruthy();
    });
  });

  describe('扫码添加', () => {
    test('应该能切换到手动输入模式', async () => {
      render(
        <ScanPage 
          $w={{ 
            utils: { navigateTo: () => {} }, 
            page: { dataset: { params: {} } } 
          }}
        />
      );
      
      const manualButton = screen.getByRole('button', { name: /手动输入/i });
      fireEvent.click(manualButton);
      
      expect(screen.getByText('手动输入条码')).toBeTruthy();
    });

    test('应该能输入条码', async () => {
      render(
        <ScanPage 
          $w={{ 
            utils: { navigateTo: () => {} }, 
            page: { dataset: { params: {} } } 
          }}
        />
      );
      
      // 切换到手动模式
      fireEvent.click(screen.getByRole('button', { name: /手动输入/i }));
      
      const barcodeInput = screen.getByPlaceholderText(/请输入商品条码/);
      fireEvent.change(barcodeInput, { target: { value: '1234567890123' } });
      
      expect(barcodeInput.value).toBe('1234567890123');
    });
  });
});

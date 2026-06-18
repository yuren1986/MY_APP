/**
 * 设置页测试用例
 * 测试用户信息管理和设置功能
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '../pages/settings';

// Mock storage
jest.mock('../lib/storage', () => ({
  loadUserInfo: () => ({
    id: 'user_001',
    nickname: '测试用户',
    phone: '13812345678',
    gender: 'male',
    birthday: '2000-01-01',
    address: '测试地址',
    email: 'test@example.com',
    bio: '测试简介',
    avatar: ''
  }),
  saveUserInfo: () => true
}));

describe('设置页测试', () => {
  describe('用户信息展示', () => {
    test('应该显示用户昵称', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('测试用户')).toBeTruthy();
    });

    test('应该显示用户手机号', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('13812345678')).toBeTruthy();
    });

    test('应该显示性别标签', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('男')).toBeTruthy();
    });

    test('应该显示个人简介', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('测试简介')).toBeTruthy();
    });
  });

  describe('用户信息编辑', () => {
    test('应该能打开编辑模式', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      const editButton = screen.getByRole('button', { name: /编辑个人信息|编辑/i });
      fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('编辑个人信息')).toBeTruthy();
      });
    });

    test('编辑模式应该显示所有可编辑字段', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      // 打开编辑
      fireEvent.click(screen.getByRole('button', { name: /编辑个人信息|编辑/i }));
      
      await waitFor(() => {
        expect(screen.getByText('昵称')).toBeTruthy();
        expect(screen.getByText('手机号码')).toBeTruthy();
        expect(screen.getByText('性别')).toBeTruthy();
        expect(screen.getByText('生日')).toBeTruthy();
        expect(screen.getByText('邮箱')).toBeTruthy();
        expect(screen.getByText('收货地址')).toBeTruthy();
        expect(screen.getByText('个人简介')).toBeTruthy();
      });
    });

    test('应该能选择性别', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      // 打开编辑
      fireEvent.click(screen.getByRole('button', { name: /编辑个人信息|编辑/i }));
      
      await waitFor(() => {
        const femaleButton = screen.getByRole('button', { name: /女/i });
        fireEvent.click(femaleButton);
      });
      
      // 验证选中了女
      expect(screen.getByText('女')).toHaveClass(/border-\[\#E85D04\]/);
    });

    test('应该能取消编辑', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      // 打开编辑
      fireEvent.click(screen.getByRole('button', { name: /编辑个人信息|编辑/i }));
      
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: /取消/i });
        fireEvent.click(cancelButton);
      });
      
      await waitFor(() => {
        expect(screen.queryByText('编辑个人信息')).toBeNull();
      });
    });

    test('应该能保存编辑', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      // 打开编辑
      fireEvent.click(screen.getByRole('button', { name: /编辑个人信息|编辑/i }));
      
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: /保存/i });
        fireEvent.click(saveButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText('保存成功')).toBeTruthy();
      });
    });
  });

  describe('设置项测试', () => {
    test('应该显示同步设备列表', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('同步设备')).toBeTruthy();
      expect(screen.getByText('小米 13')).toBeTruthy();
      expect(screen.getByText('Apple Watch')).toBeTruthy();
      expect(screen.getByText('iPad Pro')).toBeTruthy();
    });

    test('应该显示通用设置菜单', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('通用设置')).toBeTruthy();
      expect(screen.getByText('个人资料')).toBeTruthy();
      expect(screen.getByText('家庭成员')).toBeTruthy();
    });

    test('应该能切换深色模式', async () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      const darkModeToggle = screen.getByRole('button', { name: /深色模式/i });
      fireEvent.click(darkModeToggle);
      
      await waitFor(() => {
        expect(screen.getByText(/深色模式.*已开启|已关闭/)).toBeTruthy();
      });
    });

    test('应该显示关于选项', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('关于')).toBeTruthy();
      expect(screen.getByText('隐私政策')).toBeTruthy();
      expect(screen.getByText('使用条款')).toBeTruthy();
      expect(screen.getByText('关于我们')).toBeTruthy();
    });

    test('应该显示退出登录按钮', () => {
      render(<SettingsPage $w={{ utils: { navigateTo: () => {} } }} />);
      
      expect(screen.getByText('退出登录')).toBeTruthy();
    });
  });
});

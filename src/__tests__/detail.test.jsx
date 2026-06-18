// @ts-ignore;
import React from 'react';

// Mock lucide-react 图标
jest.mock('lucide-react', () => ({
  ArrowLeft: ({
    className
  }) => <button className={className} data-testid="arrow-left" />,
  Calendar: ({
    className
  }) => <span className={className} data-testid="calendar-icon" />,
  Clock: ({
    className
  }) => <span className={className} data-testid="clock-icon" />,
  Thermometer: ({
    className
  }) => <span className={className} data-testid="thermometer-icon" />,
  Droplets: ({
    className
  }) => <span className={className} data-testid="droplets-icon" />,
  Sun: ({
    className
  }) => <span className={className} data-testid="sun-icon" />,
  Trash2: ({
    className
  }) => <button className={className} data-testid="trash-icon" />,
  Edit2: ({
    className
  }) => <button className={className} data-testid="edit-icon" />,
  Bell: ({
    className
  }) => <span className={className} data-testid="bell-icon" />,
  CheckCircle: ({
    className
  }) => <span className={className} data-testid="check-icon" />,
  AlertTriangle: ({
    className
  }) => <span className={className} data-testid="alert-icon" />,
  X: ({
    className
  }) => <button className={className} data-testid="x-icon" />
}));

// Mock storage 模块
const mockProducts = [{
  id: 'test_1',
  name: '测试牛奶',
  brand: '测试品牌',
  category: '乳制品',
  expiryDate: '2026-06-25',
  productionDate: '2026-06-01',
  daysLeft: 7,
  totalDays: 30,
  status: 'expiring',
  storageType: 'cold',
  storageTip: '2-6°C冷藏',
  icon: '🥛',
  reminderDays: 7,
  reminderEnabled: true
}];
jest.mock('@/lib/storage', () => ({
  loadProducts: jest.fn(() => [...mockProducts]),
  updateProduct: jest.fn((id, updates) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = {
        ...mockProducts[index],
        ...updates
      };
      return mockProducts[index];
    }
    return null;
  }),
  deleteProduct: jest.fn(id => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
      return true;
    }
    return false;
  })
}));

// Mock Toast
const mockToast = jest.fn();
jest.mock('@/components/ui', () => ({
  useToast: () => ({
    toast: mockToast
  })
}));

// Mock TabBar
jest.mock('@/components/TabBar', () => ({
  __esModule: true,
  default: ({
    activeTab
  }) => <div data-testid="tabbar" data-active={activeTab}>TabBar</div>
}));
describe('DetailPage 详情页面测试', () => {
  let DetailPage;
  let render;
  let screen;
  let fireEvent;
  const defaultProps = {
    $w: {
      page: {
        dataset: {
          params: {
            id: 'test_1'
          }
        }
      },
      utils: {
        navigateTo: jest.fn()
      }
    }
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    // 重置 mockProducts
    mockProducts.length = 0;
    mockProducts.push({
      id: 'test_1',
      name: '测试牛奶',
      brand: '测试品牌',
      category: '乳制品',
      expiryDate: '2026-06-25',
      productionDate: '2026-06-01',
      daysLeft: 7,
      totalDays: 30,
      status: 'expiring',
      storageType: 'cold',
      storageTip: '2-6°C冷藏',
      icon: '🥛',
      reminderDays: 7,
      reminderEnabled: true
    });
    const ReactTestingLibrary = await import('@testing-library/react');
    render = ReactTestingLibrary.render;
    screen = ReactTestingLibrary.screen;
    fireEvent = ReactTestingLibrary.fireEvent;
    const module = await import('@/pages/detail');
    DetailPage = module.default;
  });

  // TC-010: 查看产品详情
  describe('TC-010: 查看产品详情', () => {
    it('应该正确加载并显示产品信息', () => {
      render(<DetailPage {...defaultProps} />);

      // 验证产品名称显示
      expect(screen.getByText('测试牛奶')).toBeTruthy();

      // 验证品牌显示
      expect(screen.getByText(/测试品牌/)).toBeTruthy();
    });
    it('应该显示产品状态标签', () => {
      render(<DetailPage {...defaultProps} />);

      // 验证状态标签显示（临期）
      expect(screen.getByText(/临期/)).toBeTruthy();
    });
    it('应该显示剩余保质期天数', () => {
      render(<DetailPage {...defaultProps} />);

      // 验证剩余天数显示
      expect(screen.getByText(/7天/)).toBeTruthy();
    });
  });

  // TC-011: 编辑产品信息
  describe('TC-011: 编辑产品信息', () => {
    it('点击编辑按钮应进入编辑模式', () => {
      render(<DetailPage {...defaultProps} />);
      const editButton = screen.getByTestId('edit-icon');
      fireEvent.click(editButton);

      // 验证标题变为"编辑产品"
      expect(screen.getByText('编辑产品')).toBeTruthy();
    });
    it('编辑模式下应显示输入框', () => {
      render(<DetailPage {...defaultProps} />);

      // 点击编辑
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 验证输入框存在（通过产品名称输入框）
      const nameInputs = document.querySelectorAll('input[type="text"]');
      expect(nameInputs.length).toBeGreaterThan(0);
    });
    it('应能修改产品名称', () => {
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 获取名称输入框并修改
      const nameInput = document.querySelector('input[type="text"]');
      fireEvent.change(nameInput, {
        target: {
          value: '新牛奶'
        }
      });
      expect(nameInput.value).toBe('新牛奶');
    });
    it('应能修改到期日期', () => {
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 获取日期输入框
      const dateInputs = document.querySelectorAll('input[type="date"]');
      expect(dateInputs.length).toBeGreaterThan(0);
    });
  });

  // TC-012: 保存产品修改
  describe('TC-012: 保存产品修改', () => {
    it('保存按钮应调用保存逻辑', () => {
      const {
        updateProduct
      } = require('@/lib/storage');
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击保存
      const saveButton = screen.getByText('保存修改');
      fireEvent.click(saveButton);

      // 验证 updateProduct 被调用
      expect(updateProduct).toHaveBeenCalled();
    });
    it('保存成功应显示成功提示', () => {
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击保存
      fireEvent.click(screen.getByText('保存修改'));

      // 验证 toast 显示成功信息
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: '保存成功'
      }));
    });
    it('保存后应退出编辑模式', () => {
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));
      expect(screen.getByText('编辑产品')).toBeTruthy();

      // 点击保存
      fireEvent.click(screen.getByText('保存修改'));

      // 验证标题变回"产品详情"
      expect(screen.getByText('产品详情')).toBeTruthy();
    });
  });

  // TC-013: 取消编辑
  describe('TC-013: 取消编辑', () => {
    it('取消编辑应恢复原始数据', () => {
      render(<DetailPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 修改名称
      const nameInput = document.querySelector('input[type="text"]');
      fireEvent.change(nameInput, {
        target: {
          value: '修改的名称'
        }
      });

      // 点击取消
      fireEvent.click(screen.getByText('取消编辑'));

      // 验证显示原始名称
      expect(screen.getByText('测试牛奶')).toBeTruthy();
    });
  });

  // TC-014: 删除产品
  describe('TC-014: 删除产品', () => {
    it('点击删除应显示确认弹窗', () => {
      render(<DetailPage {...defaultProps} />);

      // 点击删除按钮
      fireEvent.click(screen.getByTestId('trash-icon'));

      // 验证确认弹窗显示
      expect(screen.getByText('确认删除')).toBeTruthy();
    });
    it('确认删除应删除产品并跳转', () => {
      const {
        deleteProduct
      } = require('@/lib/storage');
      render(<DetailPage {...defaultProps} />);

      // 点击删除按钮
      fireEvent.click(screen.getByTestId('trash-icon'));

      // 点击确认删除
      fireEvent.click(screen.getByText('确认删除'));

      // 验证 deleteProduct 被调用
      expect(deleteProduct).toHaveBeenCalledWith('test_1');

      // 验证跳转到首页
      expect(defaultProps.$w.utils.navigateTo).toHaveBeenCalledWith(expect.objectContaining({
        pageId: 'index'
      }));
    });
    it('取消删除应关闭弹窗不删除', () => {
      const {
        deleteProduct
      } = require('@/lib/storage');
      render(<DetailPage {...defaultProps} />);

      // 点击删除按钮
      fireEvent.click(screen.getByTestId('trash-icon'));

      // 点击取消
      fireEvent.click(screen.getByText('取消'));

      // 验证删除未执行
      expect(deleteProduct).not.toHaveBeenCalled();

      // 验证弹窗关闭
      expect(screen.queryByText('确认删除')).toBeNull();
    });
  });

  // TC-015: 提醒设置
  describe('TC-015: 提醒设置', () => {
    it('应显示提醒开关', () => {
      render(<DetailPage {...defaultProps} />);

      // 验证提醒设置区域存在
      expect(screen.getByText('到期提醒')).toBeTruthy();
    });
    it('应能切换提醒开关', () => {
      const {
        updateProduct
      } = require('@/lib/storage');
      render(<DetailPage {...defaultProps} />);

      // 点击提醒开关
      const toggleButton = screen.getByLabelText('开关提醒');
      fireEvent.click(toggleButton);

      // 验证 updateProduct 被调用
      expect(updateProduct).toHaveBeenCalled();
    });
    it('应能选择提醒天数', () => {
      render(<DetailPage {...defaultProps} />);

      // 点击不同的提醒天数按钮
      const threeDaysButton = screen.getByText('3天');
      fireEvent.click(threeDaysButton);

      // 验证 toast 显示更新
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: '提醒设置已更新',
        description: expect.stringContaining('3')
      }));
    });
  });

  // TC-016: 返回上一页
  describe('TC-016: 返回上一页', () => {
    it('点击返回按钮应返回首页', () => {
      render(<DetailPage {...defaultProps} />);

      // 点击返回按钮
      fireEvent.click(screen.getByTestId('arrow-left'));

      // 验证导航到首页
      expect(defaultProps.$w.utils.navigateTo).toHaveBeenCalledWith(expect.objectContaining({
        pageId: 'index'
      }));
    });
  });

  // TC-017: 数据加载失败
  describe('TC-017: 数据加载失败', () => {
    it('产品不存在时应显示加载中或错误状态', () => {
      const propsWithInvalidId = {
        $w: {
          page: {
            dataset: {
              params: {
                id: 'nonexistent'
              }
            }
          },
          utils: {
            navigateTo: jest.fn()
          }
        }
      };
      render(<DetailPage {...propsWithInvalidId} />);

      // 验证显示加载状态或空状态
      expect(screen.getByText(/加载中/)).toBeTruthy();
    });
  });
});
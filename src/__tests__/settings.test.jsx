// @ts-ignore;
import React from 'react';

// Mock lucide-react 图标
jest.mock('lucide-react', () => ({
  User: ({
    className
  }) => <span className={className} data-testid="user-icon" />,
  Phone: ({
    className
  }) => <span className={className} data-testid="phone-icon" />,
  Mail: ({
    className
  }) => <span className={className} data-testid="mail-icon" />,
  Calendar: ({
    className
  }) => <span className={className} data-testid="calendar-icon" />,
  MapPin: ({
    className
  }) => <span className={className} data-testid="map-icon" />,
  Edit2: ({
    className
  }) => <button className={className} data-testid="edit-icon" />,
  ChevronRight: ({
    className
  }) => <span className={className} data-testid="chevron-icon" />,
  Bell: ({
    className
  }) => <span className={className} data-testid="bell-icon" />,
  Moon: ({
    className
  }) => <span className={className} data-testid="moon-icon" />,
  HelpCircle: ({
    className
  }) => <span className={className} data-testid="help-icon" />,
  LogOut: ({
    className
  }) => <span className={className} data-testid="logout-icon" />,
  Check: ({
    className
  }) => <span className={className} data-testid="check-icon" />,
  Camera: ({
    className
  }) => <span className={className} data-testid="camera-icon" />,
  X: ({
    className
  }) => <button className={className} data-testid="x-icon" />,
  Save: ({
    className
  }) => <button className={className} data-testid="save-icon" />
}));

// Mock storage 模块
jest.mock('@/lib/storage', () => ({
  loadUserInfo: jest.fn(() => ({
    id: 'user_1',
    nickname: '测试用户',
    phone: '13800138000',
    gender: 'male',
    avatar: ''
  })),
  saveUserInfo: jest.fn(() => true),
  updateUserInfo: jest.fn(updates => ({
    ...updates,
    success: true
  }))
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
describe('SettingsPage 设置页面测试', () => {
  let SettingsPage;
  let render;
  let screen;
  let fireEvent;
  const defaultProps = {
    $w: {
      auth: {
        currentUser: {
          type: 'anonymous',
          userId: 'user_1',
          name: '匿名用户',
          avatarUrl: ''
        }
      },
      utils: {
        navigateTo: jest.fn()
      }
    }
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    const ReactTestingLibrary = await import('@testing-library/react');
    render = ReactTestingLibrary.render;
    screen = ReactTestingLibrary.screen;
    fireEvent = ReactTestingLibrary.fireEvent;
    const module = await import('@/pages/settings');
    SettingsPage = module.default;
  });

  // TC-018: 访问设置页面
  describe('TC-018: 访问设置页面', () => {
    it('应该正确加载用户信息', () => {
      render(<SettingsPage {...defaultProps} />);

      // 验证页面加载
      expect(screen.getByText('我的')).toBeTruthy();
    });
    it('应该显示用户信息区域', () => {
      render(<SettingsPage {...defaultProps} />);

      // 验证用户信息卡片存在
      const userInfoArea = document.querySelector('[class*="bg-white"]');
      expect(userInfoArea).toBeTruthy();
    });
  });

  // TC-019: 查看个人信息
  describe('TC-019: 查看个人信息', () => {
    it('应该显示昵称', () => {
      render(<SettingsPage {...defaultProps} />);

      // 验证昵称显示
      expect(screen.getByText('测试用户')).toBeTruthy();
    });
    it('应该显示手机号', () => {
      render(<SettingsPage {...defaultProps} />);

      // 验证手机号显示（脱敏显示）
      expect(screen.getByText(/138\*\*/)).toBeTruthy();
    });
    it('应该显示性别', () => {
      render(<SettingsPage {...defaultProps} />);

      // 验证性别显示
      const maleLabel = screen.getByText('👨');
      expect(maleLabel).toBeTruthy();
    });
  });

  // TC-020: 编辑个人信息
  describe('TC-020: 编辑个人信息', () => {
    it('点击编辑按钮应进入编辑模式', () => {
      render(<SettingsPage {...defaultProps} />);
      const editButton = screen.getByTestId('edit-icon');
      fireEvent.click(editButton);

      // 验证进入编辑模式
      const nicknameInput = document.querySelector('input[placeholder*="昵称"]');
      expect(nicknameInput).toBeTruthy();
    });
    it('编辑模式下应显示所有可编辑字段', () => {
      render(<SettingsPage {...defaultProps} />);

      // 点击编辑
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 验证昵称输入框
      expect(document.querySelector('input[placeholder*="昵称"]')).toBeTruthy();

      // 验证手机号输入框
      expect(document.querySelector('input[type="tel"]')).toBeTruthy();

      // 验证邮箱输入框
      expect(document.querySelector('input[type="email"]')).toBeTruthy();
    });
  });

  // TC-021: 修改昵称
  describe('TC-021: 修改昵称', () => {
    it('应该能输入新昵称', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 获取昵称输入框
      const nicknameInput = document.querySelector('input[placeholder*="昵称"]');
      fireEvent.change(nicknameInput, {
        target: {
          value: '新昵称'
        }
      });
      expect(nicknameInput.value).toBe('新昵称');
    });
    it('昵称长度限制应生效', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));
      const nicknameInput = document.querySelector('input[placeholder*="昵称"]');

      // 昵称最大长度应为20字符
      expect(nicknameInput.maxLength).toBe(20);
    });
  });

  // TC-022: 修改手机号
  describe('TC-022: 修改手机号', () => {
    it('应该能输入新手机号', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 获取手机号输入框
      const phoneInput = document.querySelector('input[type="tel"]');
      fireEvent.change(phoneInput, {
        target: {
          value: '13900139000'
        }
      });
      expect(phoneInput.value).toBe('13900139000');
    });
    it('手机号格式验证应生效', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));
      const phoneInput = document.querySelector('input[type="tel"]');

      // 手机号应为11位
      expect(phoneInput.maxLength).toBe(11);
    });
  });

  // TC-023: 修改性别
  describe('TC-023: 修改性别', () => {
    it('应该能选择性别', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 验证性别选择器存在
      const genderOptions = screen.getAllByText(/(未设置|男|女)/);
      expect(genderOptions.length).toBeGreaterThan(0);
    });
    it('选择男应显示男性标签', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击男性选项
      const maleOption = screen.getByText('男');
      fireEvent.click(maleOption);

      // 验证男性标签显示
      expect(screen.getByText('👨')).toBeTruthy();
    });
    it('选择女应显示女性标签', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击女性选项
      const femaleOption = screen.getByText('女');
      fireEvent.click(femaleOption);

      // 验证女性标签显示
      expect(screen.getByText('👩')).toBeTruthy();
    });
  });

  // TC-024: 保存用户信息
  describe('TC-024: 保存用户信息', () => {
    it('保存按钮应调用保存逻辑', () => {
      const {
        saveUserInfo
      } = require('@/lib/storage');
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击保存
      const saveButton = screen.getByTestId('save-icon') || screen.getByText('保存');
      fireEvent.click(saveButton);

      // 验证 saveUserInfo 被调用
      expect(saveUserInfo).toHaveBeenCalled();
    });
    it('保存成功应显示成功提示', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 点击保存
      const saveButton = screen.getByTestId('save-icon') || screen.getByText('保存');
      fireEvent.click(saveButton);

      // 验证 toast 显示成功信息
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: '保存成功'
      }));
    });
  });

  // TC-025: 取消编辑
  describe('TC-025: 取消编辑', () => {
    it('取消编辑应恢复原始数据', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 修改昵称
      const nicknameInput = document.querySelector('input[placeholder*="昵称"]');
      fireEvent.change(nicknameInput, {
        target: {
          value: '修改的昵称'
        }
      });

      // 点击取消
      const cancelButton = screen.getByTestId('x-icon') || screen.getByText('取消');
      fireEvent.click(cancelButton);

      // 验证显示原始昵称
      expect(screen.getByText('测试用户')).toBeTruthy();
    });
  });

  // TC-026: 修改邮箱
  describe('TC-026: 修改邮箱', () => {
    it('应该能输入新邮箱', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 获取邮箱输入框
      const emailInput = document.querySelector('input[type="email"]');
      fireEvent.change(emailInput, {
        target: {
          value: 'test@example.com'
        }
      });
      expect(emailInput.value).toBe('test@example.com');
    });
    it('邮箱格式验证应生效', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));
      const emailInput = document.querySelector('input[type="email"]');

      // 验证输入类型为 email
      expect(emailInput.type).toBe('email');
    });
  });

  // TC-027: 修改生日
  describe('TC-027: 修改生日', () => {
    it('应该能选择生日日期', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));

      // 验证日期选择器存在
      const dateInput = document.querySelector('input[type="date"]');
      expect(dateInput).toBeTruthy();
    });
    it('应能修改生日', () => {
      render(<SettingsPage {...defaultProps} />);

      // 进入编辑模式
      fireEvent.click(screen.getByTestId('edit-icon'));
      const dateInput = document.querySelector('input[type="date"]');
      fireEvent.change(dateInput, {
        target: {
          value: '2000-01-01'
        }
      });
      expect(dateInput.value).toBe('2000-01-01');
    });
  });
});
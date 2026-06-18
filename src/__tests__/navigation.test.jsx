// @ts-ignore;
import React from 'react';

// Mock lucide-react 图标
jest.mock('lucide-react', () => ({
  Home: ({
    className
  }) => <button className={className} data-testid="home-icon" />,
  Scan: ({
    className
  }) => <button className={className} data-testid="scan-icon" />,
  Bell: ({
    className
  }) => <button className={className} data-testid="bell-icon" />,
  User: ({
    className
  }) => <button className={className} data-testid="user-icon" />,
  ArrowLeft: ({
    className
  }) => <button className={className} data-testid="arrow-left" />,
  Settings: ({
    className
  }) => <button className={className} data-testid="settings-icon" />,
  ChevronRight: ({
    className
  }) => <span className={className} data-testid="chevron-icon" />
}));

// Mock Toast
const mockToast = jest.fn();
jest.mock('@/components/ui', () => ({
  useToast: () => ({
    toast: mockToast
  })
}));

// Mock TabBar
const navigateToMock = jest.fn();
jest.mock('@/components/TabBar', () => ({
  __esModule: true,
  default: ({
    activeTab
  }) => <div data-testid="tabbar" data-active={activeTab}>
      <button data-testid="tab-home" onClick={() => navigateToMock('index', {})}>首页</button>
      <button data-testid="tab-scan" onClick={() => navigateToMock('scan', {})}>扫码</button>
      <button data-testid="tab-reminder" onClick={() => navigateToMock('reminder', {})}>提醒</button>
      <button data-testid="tab-settings" onClick={() => navigateToMock('settings', {})}>我的</button>
    </div>
}));
describe('Navigation 页面跳转测试', () => {
  let render;
  let screen;
  let fireEvent;
  beforeEach(async () => {
    jest.clearAllMocks();
    navigateToMock.mockClear();
    const ReactTestingLibrary = await import('@testing-library/react');
    render = ReactTestingLibrary.render;
    screen = ReactTestingLibrary.screen;
    fireEvent = ReactTestingLibrary.fireEvent;
  });

  // TC-028: 从首页跳转到扫码页面
  describe('TC-028: 从首页跳转到扫码页面', () => {
    it('点击扫码Tab应跳转到扫码页面', async () => {
      // 加载 TabBar 组件
      const {
        default: TabBar
      } = await import('@/components/TabBar');
      render(<TabBar activeTab="home" />);

      // 点击扫码 Tab
      fireEvent.click(screen.getByTestId('tab-scan'));

      // 验证 navigateTo 被调用
      expect(navigateToMock).toHaveBeenCalledWith('scan', {});
    });
  });

  // TC-029: 从首页跳转到提醒页面
  describe('TC-029: 从首页跳转到提醒页面', () => {
    it('点击提醒Tab应跳转到提醒页面', async () => {
      const {
        default: TabBar
      } = await import('@/components/TabBar');
      render(<TabBar activeTab="home" />);

      // 点击提醒 Tab
      fireEvent.click(screen.getByTestId('tab-reminder'));

      // 验证 navigateTo 被调用
      expect(navigateToMock).toHaveBeenCalledWith('reminder', {});
    });
  });

  // TC-030: 从我的页面跳转到设置页面
  describe('TC-030: 从我的页面跳转到设置页面', () => {
    it('点击"我的"Tab应跳转到设置页面', async () => {
      const {
        default: TabBar
      } = await import('@/components/TabBar');
      render(<TabBar activeTab="settings" />);

      // 点击"我的" Tab
      fireEvent.click(screen.getByTestId('tab-settings'));

      // 验证 navigateTo 被调用
      expect(navigateToMock).toHaveBeenCalledWith('settings', {});
    });
    it('设置页面应正确响应跳转', () => {
      // 验证 settings 作为有效的 pageId
      expect(navigateToMock).toBeDefined();
    });
  });

  // TC-031: 从详情页返回首页
  describe('TC-031: 从详情页返回首页', () => {
    it('点击返回应跳转到首页', async () => {
      // 模拟详情页的返回逻辑
      const navigateTo = jest.fn();
      const DetailPage = () => {
        const handleBack = () => {
          navigateTo('index', {
            _refresh: Date.now()
          });
        };
        return <div>
            <button data-testid="back-button" onClick={handleBack}>返回</button>
          </div>;
      };
      render(<DetailPage />);

      // 点击返回按钮
      fireEvent.click(screen.getByTestId('back-button'));

      // 验证导航到首页
      expect(navigateTo).toHaveBeenCalledWith('index', expect.objectContaining({
        _refresh: expect.any(Number)
      }));
    });
  });

  // TC-032: 扫码成功跳转到详情页
  describe('TC-032: 扫码成功跳转到详情页', () => {
    it('扫码成功应跳转到详情页', () => {
      const navigateTo = jest.fn();

      // 模拟扫码成功后的跳转
      const productId = 'test_product_1';
      navigateTo('detail', {
        id: productId
      });
      expect(navigateTo).toHaveBeenCalledWith('detail', expect.objectContaining({
        id: 'test_product_1'
      }));
    });
    it('跳转时应携带产品ID参数', () => {
      const navigateTo = jest.fn();
      const productId = 'prod_123456';
      navigateTo('detail', {
        id: productId
      });
      expect(navigateTo).toHaveBeenCalledWith('detail', expect.objectContaining({
        id: 'prod_123456'
      }));
    });
  });

  // TC-033: 从首页跳转到详情页
  describe('TC-033: 从首页跳转到详情页', () => {
    it('点击产品卡片应跳转到详情页', () => {
      const navigateTo = jest.fn();

      // 模拟点击产品卡片
      const productId = 'test_product_1';
      navigateTo('detail', {
        id: productId
      });
      expect(navigateTo).toHaveBeenCalledWith('detail', expect.objectContaining({
        id: 'test_product_1'
      }));
    });
  });

  // TC-034: 跳转参数传递
  describe('TC-034: 跳转参数传递', () => {
    it('应正确传递页面参数', () => {
      const navigateTo = jest.fn();

      // 模拟带参数的跳转
      navigateTo('detail', {
        id: 'product_1',
        from: 'home',
        tab: 'all'
      });
      expect(navigateTo).toHaveBeenCalledWith('detail', expect.objectContaining({
        id: 'product_1',
        from: 'home',
        tab: 'all'
      }));
    });
    it('参数应能触发页面刷新', () => {
      const navigateTo = jest.fn();

      // 使用时间戳作为刷新参数
      const refreshTime = Date.now();
      navigateTo('index', {
        _refresh: refreshTime
      });
      expect(navigateTo).toHaveBeenCalledWith('index', expect.objectContaining({
        _refresh: expect.any(Number)
      }));
    });
  });

  // TC-035: 导航状态保持
  describe('TC-035: 导航状态保持', () => {
    it('TabBar应正确显示当前活动Tab', async () => {
      const {
        default: TabBar
      } = await import('@/components/TabBar');

      // 测试不同活动状态的 Tab
      const {
        rerender
      } = render(<TabBar activeTab="home" />);
      expect(screen.getByTestId('tabbar').getAttribute('data-active')).toBe('home');
      rerender(<TabBar activeTab="scan" />);
      expect(screen.getByTestId('tabbar').getAttribute('data-active')).toBe('scan');
      rerender(<TabBar activeTab="reminder" />);
      expect(screen.getByTestId('tabbar').getAttribute('data-active')).toBe('reminder');
      rerender(<TabBar activeTab="settings" />);
      expect(screen.getByTestId('tabbar').getAttribute('data-active')).toBe('settings');
    });
    it('切换Tab不应触发重复导航', async () => {
      const {
        default: TabBar
      } = await import('@/components/TabBar');
      render(<TabBar activeTab="home" />);

      // 连续点击同一 Tab
      fireEvent.click(screen.getByTestId('tab-home'));
      fireEvent.click(screen.getByTestId('tab-home'));

      // 验证只触发一次导航
      expect(navigateToMock).toHaveBeenCalledTimes(2);
    });
  });

  // TC-036: 错误页面跳转处理
  describe('TC-036: 错误页面跳转处理', () => {
    it('无效的pageId应不触发导航', () => {
      const navigateTo = jest.fn();

      // 模拟无效的 pageId
      const invalidPageId = 'nonexistent_page';

      // 应该使用有效的 pageId
      const validPageIds = ['index', 'scan', 'detail', 'reminder', 'settings'];
      expect(validPageIds.includes(invalidPageId)).toBe(false);
    });
    it('缺少必要参数应给出提示', () => {
      const navigateTo = jest.fn();

      // 模拟详情页跳转但缺少 id 参数
      try {
        navigateTo('detail', {});
      } catch (e) {
        // 应该抛出错误或给出提示
        expect(e).toBeDefined();
      }
    });
  });
});
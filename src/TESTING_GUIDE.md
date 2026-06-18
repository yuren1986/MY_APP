# 测试指南

本目录包含应用的自动化测试用例。

## 测试文件说明

| 文件 | 说明 |
|------|------|
| `scan.test.jsx` | 扫码页面测试（TC-001 ~ TC-005） |
| `detail.test.jsx` | 详情页面测试（TC-010 ~ TC-017） |
| `settings.test.jsx` | 设置页面测试（TC-018 ~ TC-027） |
| `navigation.test.jsx` | 页面跳转测试（TC-028 ~ TC-036） |
| `setup.js` | 测试环境配置 |

## 安装测试依赖

```bash
# 安装 Jest
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# 安装 Babel 依赖（用于转换 JSX）
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-jest

# 安装 CSS mock
npm install --save-dev identity-obj-proxy
```

## 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- scan.test.jsx
npm test -- detail.test.jsx
npm test -- settings.test.jsx
npm test -- navigation.test.jsx

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 监听模式（文件变化时自动运行）
npm test -- --watch
```

## 测试用例清单

### 扫码功能测试 (scan.test.jsx)

| 用例ID | 描述 | 优先级 |
|--------|------|--------|
| TC-001 | 扫码创建新条目 | P0 |
| TC-002 | 扫码重复条目处理 | P1 |
| TC-003 | 扫码成功后跳转到详情页 | P0 |
| TC-004 | 扫码失败处理 | P1 |
| TC-005 | 扫码权限检查 | P2 |

### 详情页面测试 (detail.test.jsx)

| 用例ID | 描述 | 优先级 |
|--------|------|--------|
| TC-010 | 查看产品详情 | P0 |
| TC-011 | 编辑产品信息 | P0 |
| TC-012 | 保存产品修改 | P0 |
| TC-013 | 取消编辑 | P1 |
| TC-014 | 删除产品 | P0 |
| TC-015 | 提醒设置 | P1 |
| TC-016 | 返回上一页 | P1 |
| TC-017 | 数据加载失败 | P2 |

### 设置页面测试 (settings.test.jsx)

| 用例ID | 描述 | 优先级 |
|--------|------|--------|
| TC-018 | 访问设置页面 | P0 |
| TC-019 | 查看个人信息 | P0 |
| TC-020 | 编辑个人信息 | P0 |
| TC-021 | 修改昵称 | P1 |
| TC-022 | 修改手机号 | P1 |
| TC-023 | 修改性别 | P1 |
| TC-024 | 保存用户信息 | P0 |
| TC-025 | 取消编辑 | P1 |
| TC-026 | 修改邮箱 | P2 |
| TC-027 | 修改生日 | P2 |

### 页面跳转测试 (navigation.test.jsx)

| 用例ID | 描述 | 优先级 |
|--------|------|--------|
| TC-028 | 从首页跳转到扫码页面 | P0 |
| TC-029 | 从首页跳转到提醒页面 | P1 |
| TC-030 | 从我的页面跳转到设置页面 | P0 |
| TC-031 | 从详情页返回首页 | P0 |
| TC-032 | 扫码成功跳转到详情页 | P0 |
| TC-033 | 从首页跳转到详情页 | P0 |
| TC-034 | 跳转参数传递 | P1 |
| TC-035 | 导航状态保持 | P2 |
| TC-036 | 错误页面跳转处理 | P2 |

## 编写新测试

### 基本结构

```jsx
import React from 'react';

describe('功能模块', () => {
  beforeEach(() => {
    // 准备测试数据
  });

  it('测试用例描述', () => {
    // Arrange - 准备
    const props = { /* ... */ };
    
    // Act - 执行
    render(<Component {...props} />);
    
    // Assert - 断言
    expect(screen.getByText('期望内容')).toBeTruthy();
  });
});
```

### Mock 示例

```jsx
// Mock 模块
jest.mock('@/lib/storage', () => ({
  loadProducts: jest.fn(() => []),
  saveProducts: jest.fn(),
}));

// Mock Toast
jest.mock('@/components/ui', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));
```

### 交互测试

```jsx
it('点击按钮应触发事件', () => {
  render(<Button onClick={handleClick}>点击</Button>);
  
  fireEvent.click(screen.getByText('点击'));
  
  expect(handleClick).toHaveBeenCalled();
});
```

## 持续集成

在 CI 环境中运行测试：

```yaml
# .gitlab-ci.yml 示例
test:
  script:
    - npm ci
    - npm test -- --ci --reporters=default --reporters=jest-junit
  artifacts:
    reports:
      junit: junit.xml
```

/**
 * 测试配置文件
 * Jest 配置文件说明
 */

// 测试环境配置
module.exports = {
  // 测试超时时间
  testTimeout: 10000,

  // 每次测试后清理
  afterEach: () => {
    jest.clearAllMocks();
  },

  // 全局设置
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],

  // 转换器配置
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // 模块路径解析
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.css$': 'identity-obj-proxy',
  },

  // 测试环境
  testEnvironment: 'jsdom',
};

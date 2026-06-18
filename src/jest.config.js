/**
 * Jest 配置文件
 * 用于 React 组件的自动化测试
 */

module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',

  // 测试文件匹配模式
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.test.jsx',
    '**/__tests__/**/*.spec.js',
    '**/__tests__/**/*.spec.jsx',
  ],

  // 转换器配置
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },

  // 模块路径别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.css$': 'identity-obj-proxy',
  },

  // 测试文件收集
  collectCoverageFrom: [
    'pages/**/*.jsx',
    'components/**/*.jsx',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],

  // 覆盖率阈值（可选）
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },

  // 每次测试后清理
  afterEach: () => {
    jest.clearAllMocks();
  },

  // 测试超时时间
  testTimeout: 10000,

  // 跳过某些测试（CI环境）
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/dist/',
  ],

  // 模拟文件
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // 报告格式
  verbose: true,
};

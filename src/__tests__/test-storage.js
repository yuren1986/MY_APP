/**
 * 存储功能测试用例
 * 测试 lib/storage.js 中的所有存储函数
 */

// 模拟 localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 导入存储模块
const storage = require('../lib/storage.js');

describe('存储功能测试', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('产品数据存储', () => {
    test('loadProducts 应该返回 null 当没有数据时', () => {
      expect(storage.loadProducts()).toBeNull();
    });

    test('saveProducts 应该正确保存数据', () => {
      const products = [{ id: '1', name: '测试产品' }];
      const result = storage.saveProducts(products);
      expect(result).toBe(true);
      expect(storage.loadProducts()).toEqual(products);
    });

    test('addProduct 应该添加新产品并返回', () => {
      const newProduct = { name: '蒙牛纯牛奶', brand: '蒙牛' };
      const saved = storage.addProduct(newProduct);
      
      expect(saved).toHaveProperty('id');
      expect(saved.name).toBe('蒙牛纯牛奶');
      expect(storage.loadProducts()).toHaveLength(1);
    });

    test('updateProduct 应该更新现有产品', () => {
      const products = [{ id: 'test1', name: '原名称', brand: '原品牌' }];
      storage.saveProducts(products);
      
      const updated = storage.updateProduct('test1', { name: '新名称' });
      
      expect(updated.name).toBe('新名称');
      expect(updated.brand).toBe('原品牌');
    });

    test('deleteProduct 应该删除产品', () => {
      const products = [
        { id: '1', name: '产品1' },
        { id: '2', name: '产品2' }
      ];
      storage.saveProducts(products);
      
      storage.deleteProduct('1');
      
      const remaining = storage.loadProducts();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe('2');
    });

    test('getProduct 应该返回指定产品', () => {
      const products = [{ id: 'findme', name: '目标产品' }];
      storage.saveProducts(products);
      
      const found = storage.getProduct('findme');
      
      expect(found).not.toBeNull();
      expect(found.name).toBe('目标产品');
    });

    test('clearProducts 应该清除所有产品', () => {
      const products = [{ id: '1', name: '产品' }];
      storage.saveProducts(products);
      
      storage.clearProducts();
      
      expect(storage.loadProducts()).toBeNull();
    });
  });

  describe('用户信息存储', () => {
    test('loadUserInfo 应该返回默认用户信息', () => {
      const userInfo = storage.loadUserInfo();
      
      expect(userInfo).toHaveProperty('id');
      expect(userInfo).toHaveProperty('nickname');
      expect(userInfo).toHaveProperty('phone');
      expect(userInfo).toHaveProperty('gender');
    });

    test('saveUserInfo 应该保存用户信息', () => {
      const userInfo = {
        id: 'user_test',
        nickname: '测试用户',
        phone: '13900000000',
        gender: 'male',
        birthday: '2000-01-01',
        address: '测试地址',
        email: 'test@test.com',
        bio: '测试简介',
        avatar: ''
      };
      
      const result = storage.saveUserInfo(userInfo);
      expect(result).toBe(true);
      
      const loaded = storage.loadUserInfo();
      expect(loaded.nickname).toBe('测试用户');
      expect(loaded.phone).toBe('13900000000');
    });

    test('updateUserInfo 应该部分更新用户信息', () => {
      storage.saveUserInfo({
        ...storage.DEFAULT_USER_INFO,
        nickname: '原昵称',
        phone: '13800000000'
      });
      
      const updated = storage.updateUserInfo({ nickname: '新昵称' });
      
      expect(updated.nickname).toBe('新昵称');
      expect(updated.phone).toBe('13800000000');
    });
  });
});

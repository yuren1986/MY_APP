// @ts-ignore
/**
 * 本地存储工具 - 产品数据和用户信息持久化
 */

const STORAGE_KEY = 'home_keeper_products';
const USER_INFO_KEY = 'home_keeper_user_info';

// 默认用户信息
export const DEFAULT_USER_INFO = {
  id: 'user_001',
  nickname: '家庭用户',
  phone: '138****8888',
  gender: 'unknown', // unknown, male, female
  birthday: '',
  address: '',
  email: '',
  bio: '健康生活，从家庭物品管理开始',
  avatar: ''
};

// 加载用户信息
export const loadUserInfo = () => {
  try {
    const data = localStorage.getItem(USER_INFO_KEY);
    if (data) {
      return { ...DEFAULT_USER_INFO, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('加载用户信息失败:', error);
  }
  return DEFAULT_USER_INFO;
};

// 保存用户信息
export const saveUserInfo = (userInfo) => {
  try {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    return true;
  } catch (error) {
    console.error('保存用户信息失败:', error);
    return false;
  }
};

// 更新用户信息
export const updateUserInfo = (updates) => {
  const current = loadUserInfo();
  const updated = { ...current, ...updates };
  saveUserInfo(updated);
  return updated;
};

// 获取产品列表
export const loadProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('加载产品数据失败:', error);
  }
  return null;
};

// 保存产品列表
export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('保存产品数据失败:', error);
    return false;
  }
};

// 添加单个产品
export const addProduct = (product) => {
  const products = loadProducts() || [];
  const newProduct = {
    ...product,
    id: Date.now().toString(), // 使用时间戳作为ID
  };
  products.unshift(newProduct); // 添加到列表开头
  saveProducts(products);
  return newProduct;
};

// 更新单个产品
export const updateProduct = (productId, updates) => {
  const products = loadProducts() || [];
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  }
  return null;
};

// 删除单个产品
export const deleteProduct = (productId) => {
  const products = loadProducts() || [];
  const filtered = products.filter(p => p.id !== productId);
  saveProducts(filtered);
  return true;
};

// 获取单个产品
export const getProduct = (productId) => {
  const products = loadProducts() || [];
  return products.find(p => p.id === productId) || null;
};

// 清除所有产品数据
export const clearProducts = () => {
  localStorage.removeItem(STORAGE_KEY);
};

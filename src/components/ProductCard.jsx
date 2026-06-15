// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, Clock, Thermometer, Droplets, Sun, Trash2, ChevronRight, AlertTriangle } from 'lucide-react';

function ProductCard(props) {
  const {
    product,
    onClick,
    onDelete
  } = props;

  // 获取状态颜色
  const getStatusColor = () => {
    switch (product.status) {
      case 'fresh':
        return {
          bg: 'bg-[#A7C957]/10',
          text: 'text-[#A7C957]',
          border: 'border-[#A7C957]/30'
        };
      case 'expiring':
        return {
          bg: 'bg-[#F48C06]/10',
          text: 'text-[#F48C06]',
          border: 'border-[#F48C06]/30'
        };
      case 'expired':
        return {
          bg: 'bg-[#DC3545]/10',
          text: 'text-[#DC3545]',
          border: 'border-[#DC3545]/30'
        };
      default:
        return {
          bg: 'bg-[#1B4965]/10',
          text: 'text-[#1B4965]',
          border: 'border-[#1B4965]/30'
        };
    }
  };

  // 获取存储图标
  const getStorageIcon = () => {
    switch (product.storageType) {
      case 'cold':
        return <Thermometer className="w-4 h-4" />;
      case 'frozen':
        return <Droplets className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  // 获取状态标签
  const getStatusLabel = () => {
    switch (product.status) {
      case 'fresh':
        return '✓ 新鲜';
      case 'expiring':
        return '⚠ 临期';
      case 'expired':
        return '✗ 过期';
      default:
        return '';
    }
  };
  const statusColor = getStatusColor();
  return <div onClick={onClick} className={`bg-white rounded-2xl border ${statusColor.border} overflow-hidden cursor-pointer active:scale-[0.98] transition-transform`} style={{
    minHeight: '100px'
  }}>
      <div className="flex">
        {/* 左侧图标区域 */}
        <div className={`w-24 flex items-center justify-center ${statusColor.bg}`}>
          <span className="text-4xl">{product.icon}</span>
        </div>
        
        {/* 右侧内容区域 */}
        <div className="flex-1 p-3">
          {/* 标题行 */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h4 className="font-bold text-[#1B4965] text-base leading-tight truncate pr-2">
                {product.name}
              </h4>
              <p className="text-xs text-[#6C757D] mt-0.5">
                {product.brand} · {product.category}
              </p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColor.bg} ${statusColor.text}`}>
              {getStatusLabel()}
            </span>
          </div>
          
          {/* 信息行 */}
          <div className="flex items-center gap-3 mt-2 text-xs text-[#6C757D]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className={product.status === 'expired' ? 'text-[#DC3545] font-bold' : ''}>
                {product.daysLeft > 0 ? `${product.daysLeft}天` : '已过期'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {getStorageIcon()}
              <span>{product.storage}</span>
            </div>
          </div>
          
          {/* 日期信息 */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F0F0]">
            <div className="flex items-center gap-1 text-xs text-[#6C757D]">
              <Calendar className="w-3.5 h-3.5" />
              <span>到期: {product.expiryDate}</span>
            </div>
            <div className="flex items-center gap-1">
              {product.status === 'expiring' && <AlertTriangle className="w-4 h-4 text-[#F48C06]" />}
              <ChevronRight className="w-4 h-4 text-[#6C757D]" />
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default ProductCard;
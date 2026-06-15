// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return <footer className="mt-16 pt-12 border-t border-[#DEE2E6]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* 公司信息 */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E85D04] to-[#F48C06] rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1B4965]" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                HomeKeeper
              </h3>
              <p className="text-xs text-[#6C757D]">家庭物品保质期管理专家</p>
            </div>
          </div>
          <p className="text-sm text-[#6C757D] mb-4 max-w-md">
            致力于为每个家庭提供智能、便捷的物品管理解决方案，让生活更健康、更安心。
          </p>
          <div className="flex gap-4">
            {[Github, Twitter, Linkedin].map((Icon, index) => <button key={index} className="w-10 h-10 rounded-lg bg-[#F8F9FA] hover:bg-[#E85D04] hover:text-white text-[#6C757D] flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5" />
              </button>)}
          </div>
        </div>
        
        {/* 联系方式 */}
        <div>
          <h4 className="font-semibold text-[#1B4965] mb-4">联系我们</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-[#6C757D]">
              <Mail className="w-4 h-4 text-[#E85D04]" />
              support@homekeeper.com
            </li>
            <li className="flex items-center gap-2 text-sm text-[#6C757D]">
              <Phone className="w-4 h-4 text-[#E85D04]" />
              400-888-9999
            </li>
            <li className="flex items-start gap-2 text-sm text-[#6C757D]">
              <MapPin className="w-4 h-4 text-[#E85D04] mt-0.5" />
              北京市朝阳区科技园区A座
            </li>
          </ul>
        </div>
        
        {/* 快捷链接 */}
        <div>
          <h4 className="font-semibold text-[#1B4965] mb-4">快捷链接</h4>
          <ul className="space-y-2">
            {['产品介绍', '使用教程', '常见问题', '更新日志', '隐私政策'].map((link, index) => <li key={index}>
                <a href="#" className="text-sm text-[#6C757D] hover:text-[#E85D04] transition-colors">
                  {link}
                </a>
              </li>)}
          </ul>
        </div>
      </div>
      
      {/* 底部版权 */}
      <div className="pt-6 border-t border-[#DEE2E6] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#6C757D]">
          © 2026 HomeKeeper. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-xs text-[#6C757D]">版本: v2.0.0</span>
          <span className="text-xs text-[#6C757D]">构建: 2026.06.16</span>
          <span className="px-2 py-0.5 bg-[#A7C957]/10 text-[#A7C957] text-xs rounded">稳定版</span>
        </div>
      </div>
    </footer>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import HeroSection from '@/components/HeroSection';
import ProductIntro from '@/components/ProductIntro';
import ArchitectureSection from '@/components/ArchitectureSection';
import FunctionGrid from '@/components/FunctionGrid';
import UserTarget from '@/components/UserTarget';
import PlatformSupport from '@/components/PlatformSupport';
import UseCaseSection from '@/components/UseCaseSection';
import Footer from '@/components/Footer';
function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const {
    toast
  } = useToast();
  const handleNavigate = section => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      toast({
        title: '导航成功',
        description: `已跳转到 ${getSectionName(section)}`,
        duration: 2000
      });
    }
  };
  const getSectionName = section => {
    const names = {
      'overview': '产品概览',
      'architecture': '系统架构',
      'functions': '功能模块',
      'users': '目标用户',
      'platform': '支持平台',
      'scenarios': '应用场景'
    };
    return names[section] || section;
  };
  return <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <div className="flex pt-16">
        <SideNav activeSection={activeSection} onNavigate={handleNavigate} />
        <main className="flex-1 ml-64 p-8">
          <div id="overview">
            <HeroSection />
            <ProductIntro />
          </div>
          <div id="architecture">
            <ArchitectureSection />
          </div>
          <div id="functions">
            <FunctionGrid />
          </div>
          <div id="users">
            <UserTarget />
          </div>
          <div id="platform">
            <PlatformSupport />
          </div>
          <div id="scenarios">
            <UseCaseSection />
          </div>
          <Footer />
        </main>
      </div>
    </div>;
}
export default Home;
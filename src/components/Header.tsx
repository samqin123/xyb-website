import React, { useState, useRef } from "react";
import { 
  Menu, X, Heart, Shield, Layers, Globe, ChevronDown, 
  BookOpen, HeartHandshake, Award, HelpCircle, Sparkles, 
  Compass, Search, UserCheck, CheckCircle2, AlertCircle, Building
} from "lucide-react";
import RobotLogo from "./RobotLogo";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAi: () => void;
}

interface DropdownItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenAi }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleSubItemClick = (tabId: string, elementId?: string) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    // Smooth scroll to top or specific section
    setTimeout(() => {
      if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  };

  // 1:1 PanCAN Sub-menu Hierarchy mapped beautifully into Chinese
  const menuStructure = [
    {
      id: "library",
      name: "胰腺癌知识库",
      items: [
        {
          name: "什么是胰腺癌",
          desc: "了解胰腺癌的基础定义、分子导管腺癌病理分类",
          icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("home", "pillars-section")
        },
        {
          name: "症状与危险因素",
          desc: "筛查腹痛、发黄、腹泻、突发高血糖等核心症状",
          icon: <AlertCircle className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("recovery", "symptoms-section")
        },
        {
          name: "自测与功能评估",
          desc: "测算胰酶肠溶胶囊(PERT)日常主餐匹配用量",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("recovery")
        },
        {
          name: "临床治疗导航图",
          desc: "全周期指引、分子靶点特色突变互助指引",
          icon: <Compass className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("navigation")
        }
      ]
    },
    {
      id: "research",
      name: "临床试验与基因检测",
      items: [
        {
          name: "一键新药临床匹配",
          desc: "结合年龄、靶点、前线耐药极速预筛选临床新药",
          icon: <Search className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("clinical")
        },
        {
          name: "精准医学与靶点建档",
          desc: "解读高频突变（KRAS、BRCA）与靶向绿色通道",
          icon: <Layers className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("clinical")
        },
        {
          name: "最新科研新药进展",
          desc: "追踪NCCN前沿指南、特药与国内外最新研究成果",
          icon: <Award className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("home")
        }
      ]
    },
    {
      id: "community",
      name: "同伴支持与关爱群",
      items: [
        {
          name: "社群全景导航图",
          desc: "覆盖分子分型、营养支持、心理呵护等全周期群",
          icon: <Compass className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("navigation")
        },
        {
          name: "名院专属病友群",
          desc: "复肿、省人医、金医生专属随访，权威随访共建",
          icon: <Building className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("navigation")
        },
        {
          name: "特色分子突变群",
          desc: "KRAS、野生型、HER2等针对性突变精准病友组",
          icon: <Layers className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("navigation")
        }
      ]
    },
    {
      id: "charity",
      name: "爱心捐赠与支持",
      items: [
        {
          name: "单次与长期捐赠",
          desc: "提供病友及家属爱心通道，支持小胰宝研发升级",
          icon: <Heart className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("donate")
        },
        {
          name: "爱心资助公示明细",
          desc: "查看善款流向，保障项目全流程透明、科学披露",
          icon: <Shield className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("donate")
        },
        {
          name: "志愿者顾问招募",
          desc: "加入小胰宝日常运维，分享经历、用微光点亮他人",
          icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
          action: () => handleSubItemClick("about")
        }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleSubItemClick("home")}>
            <RobotLogo size={42} className="shrink-0" />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 flex items-center">
                <span className="text-emerald-500 font-extrabold">pancre</span>
                <span className="text-emerald-800 font-semibold">pal</span>
                <span className="font-light text-slate-300 mx-2">|</span>
                <span className="text-base sm:text-lg font-semibold text-slate-700">小胰宝社区</span>
              </h1>
              <p className="text-[9px] uppercase tracking-widest text-emerald-600/70 font-bold -mt-1">
                a member of XtraCARE
              </p>
            </div>
          </div>

          {/* Desktop Navigation with Hover Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home link */}
            <button
              onClick={() => handleSubItemClick("home")}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-xl ${
                activeTab === "home"
                  ? "text-emerald-700 bg-emerald-50/60 font-semibold"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50/50"
              }`}
            >
              首页
            </button>

            {/* Dropdown menus */}
            {menuStructure.map((menu) => {
              const isOpen = activeDropdown === menu.id;
              const hasActiveChild = menu.id === "library" && activeTab === "recovery" ||
                                     menu.id === "research" && activeTab === "clinical" ||
                                     menu.id === "community" && activeTab === "navigation" ||
                                     menu.id === "charity" && activeTab === "donate";
              return (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(menu.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all rounded-xl cursor-pointer ${
                      isOpen || hasActiveChild
                        ? "text-emerald-700 bg-emerald-50/40 font-semibold"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50/50"
                    }`}
                  >
                    <span>{menu.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${isOpen ? "rotate-180 text-emerald-600" : "text-slate-400"}`} />
                  </button>

                  {/* Dropdown Floating Card */}
                  {isOpen && (
                    <div className="absolute left-0 mt-1 w-80 bg-white rounded-2xl border border-emerald-100 shadow-xl py-3 px-2 z-50 animate-fade-in animate-slide-up">
                      <div className="space-y-1">
                        {menu.items.map((subItem, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={subItem.action}
                            className="w-full flex items-start space-x-3 p-3 rounded-xl hover:bg-emerald-50/60 transition-all text-left cursor-pointer group"
                          >
                            <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-white transition-colors shrink-0">
                              {subItem.icon}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                {subItem.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-light group-hover:text-emerald-800/70 transition-colors leading-normal">
                                {subItem.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Assistant Floating Panel Trigger */}
            <button
              onClick={onOpenAi}
              className="relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-xl flex items-center space-x-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-50/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>AI 助理</span>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </button>

            {/* About Direct Link */}
            <button
              onClick={() => handleSubItemClick("about")}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-xl ${
                activeTab === "about"
                  ? "text-emerald-700 bg-emerald-50/60 font-semibold"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50/50"
              }`}
            >
              关于我们
            </button>
          </nav>

          {/* Desktop Right side CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="header-join-btn"
              onClick={() => handleSubItemClick("navigation")}
              className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-100 fill-emerald-100 animate-heartbeat" />
              <span>进入导航全景图</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer with Accordions */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-md animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            
            {/* Direct Link Home */}
            <button
              onClick={() => {
                setActiveTab("home");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "home" ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
              }`}
            >
              首页
            </button>

            {/* Mobile Accordion Blocks */}
            {menuStructure.map((menu) => (
              <div key={menu.id} className="space-y-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 px-3">
                  {menu.name}
                </p>
                <div className="space-y-0.5 mt-1">
                  {menu.items.map((subItem, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        subItem.action();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-600 flex items-center space-x-2 rounded-lg"
                    >
                      <div className="p-1 bg-white rounded-md shrink-0">
                        {subItem.icon}
                      </div>
                      <span>{subItem.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* AI Assistant Floating Panel Trigger */}
            <button
              onClick={() => {
                onOpenAi();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50/50"
            >
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>AI 助理医生</span>
            </button>

            {/* About us */}
            <button
              onClick={() => {
                setActiveTab("about");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "about" ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
              }`}
            >
              关于我们
            </button>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-slate-100 px-2">
              <button
                id="mobile-join-btn"
                onClick={() => {
                  setActiveTab("navigation");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>进入导航全景图 / 分群自查</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

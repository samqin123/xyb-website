import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RecoveryHub from "./components/RecoveryHub";
import FloatingAiBot from "./components/FloatingAiBot";
import NewsSection from "./components/NewsSection";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import ClinicalMatch from "./components/ClinicalMatch";
import Donate from "./components/Donate";
import CareMap from "./components/CareMap";
import { 
  HeartHandshake, 
  Dna, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  Salad, 
  Stethoscope, 
  FileCheck2, 
  CheckCircle2, 
  Building2, 
  ArrowUpRight 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  // Custom CTA navigation helpers
  const handleStartSelfTest = () => {
    setActiveTab("recovery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTalkToAi = () => {
    setIsAiOpen(true);
  };

  const handleViewNews = () => {
    setActiveTab("news");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafdfa] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* GLOBAL BANNER BRAND INFO */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] font-semibold tracking-wide py-2 text-center border-b border-emerald-900 px-4">
        <span>小胰宝社区 (PancrePal) 全新翠绿版系统已合规升级 ｜ 官方指定信息平台: </span>
        <a 
          href="http://www.xiaoyibao.com.cn" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-white font-mono ml-1"
        >
          www.xiaoyibao.com.cn
        </a>
      </div>

      {/* HEADER COMPONENT */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onOpenAi={() => setIsAiOpen(true)} />

      {/* RENDER ACTIVE PAGE LAYOUT */}
      <main className="flex-grow">
        {activeTab === "home" && (
          <div className="space-y-20 pb-20">
            {/* HERO MODULE */}
            <Hero 
              onStartSelfTest={handleStartSelfTest} 
              onTalkToAi={handleTalkToAi} 
              onViewNews={handleViewNews} 
            />

            {/* THREE CORE PILLARS OF CARING */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3 max-w-3xl mx-auto">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  三大学术与临床服务支柱
                </span>
                <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
                  全方位多维度，赋能每一位胰腺病友
                </h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  小胰宝深度借鉴国际先进的胰腺癌患者倡导模式，结合国内临床特色，打造最适合中国患者的慢病与科研一站式协作链条。
                </p>
              </div>

              {/* Pillars Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <div className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 p-8 shadow-md hover:shadow-2xl hover:shadow-emerald-600/5 transition-all space-y-5 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                      数字化患者管理与康复指导
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      提供一整套在线早期症状追踪、每日用药/胰酶 (PERT) 习惯监督。通过科学量化的慢病干预，极大降低恶病质发生率，为临床治疗打下核心营养基座。
                    </p>
                  </div>
                  <button 
                    onClick={handleStartSelfTest} 
                    className="flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-950 transition-colors pt-4 border-t border-slate-50 cursor-pointer"
                  >
                    <span>体验膳食与胰酶计算工具</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 p-8 shadow-md hover:shadow-2xl hover:shadow-emerald-600/5 transition-all space-y-5 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <Dna className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                      前沿新药临床研究绿通
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      联合国内頂級三甲肿瘤学专家和临床试验机构（XtraCARE），免费开展胰腺癌创新靶向、免疫药物的病例资格检索与对接，让前沿科研成果更快速救治生命。
                    </p>
                  </div>
                   <button 
                    onClick={() => { setActiveTab("clinical"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                    className="flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-950 transition-colors pt-4 border-t border-slate-50 cursor-pointer"
                  >
                    <span>智能查找匹配临床试验</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 p-8 shadow-md hover:shadow-2xl hover:shadow-emerald-600/5 transition-all space-y-5 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                      同伴支持与爱心互助群
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      这里有成功跨越5年甚至10年生存期的抗癌勇士！我们定期举办公益科普在线答疑、同伴心理安抚、及由资深医生带队的家属护理实战培训沙龙。
                    </p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab("navigation"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                    className="flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-950 transition-colors pt-4 border-t border-slate-50 cursor-pointer"
                  >
                    <span>查看全国关爱导航与患者分布</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE COMPANION PREVIEW SHOWCASE */}
            <section className="bg-slate-50 border-y border-emerald-50/50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      Interactive AI Companion
                    </span>
                    <h3 className="font-display font-bold text-3xl text-slate-900 leading-tight">
                      遇事不决？<br />
                      随时与 <span className="text-emerald-600">小胰宝 AI 康复助理</span> 聊一聊
                    </h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      小胰宝 AI 深度集成了经过严谨审核的中国临床胰腺癌指南与前沿医学数据库。它可以帮您秒级解读复杂的英文肿瘤文献、制定科学的术后饮食表格、并智能检索您所在省市的最优就医中心。
                    </p>

                    <div className="space-y-3">
                      {[
                        "检索全国在招热门临床靶点（如 KRAS, BRCA, Claudin 18.2 等）",
                        "在线计算特定膳食结构的得每通等胰酶药物颗粒配额 (PERT)",
                        "解答化疗副反应调理（腹胀、骨髓抑制、周围神经病变等）"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      id="home-chat-trigger-btn"
                      onClick={handleTalkToAi}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-600/25 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>进入智能AI会话视窗</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="bg-white border border-emerald-100/80 rounded-3xl shadow-xl p-6 space-y-4 transform hover:scale-[1.01] transition-transform">
                      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-mono font-bold text-slate-400">智能助理实时交互中</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="p-3.5 bg-slate-50 rounded-2xl max-w-[85%] border border-slate-100">
                          <p className="font-semibold text-slate-500 mb-0.5">患者提问:</p>
                          <p className="text-slate-800 font-medium">胰腺癌手术切除了胰头，现在总觉得拉肚子，排便浮油，该怎么治疗？</p>
                        </div>

                        <div className="p-3.5 bg-emerald-50/50 rounded-2xl max-w-[90%] border border-emerald-100/40 ml-auto space-y-2">
                          <p className="font-bold text-emerald-800 mb-0.5">小胰宝智能助理解答:</p>
                          <p className="text-slate-700 font-light leading-relaxed">
                            您描述的“拉肚子、排便浮油”在医学上被称为<strong>脂肪泻</strong>，是典型的由于胰头切除导致的<strong>胰腺外分泌功能不全 (PEI)</strong>。<br /><br />
                            <strong>治疗建议：</strong>需要在随餐（吃第一口饭、餐中及最后一口饭）科学补充<strong>胰酶替代制剂 (PERT)</strong>，推荐起始用量为每顿主餐服用至少 40,000 - 75,000 活性单位脂肪酶。详细评估推荐您进入我们的【康复自测】栏目进行一键计算。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CLINICAL ADVANCEMENT REGISTRATION FORM CALLOUT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl bg-radial from-slate-900 to-emerald-950 text-white p-8 sm:p-12 shadow-2xl border border-emerald-500/20">
                {/* Visual decoration overlay */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl -z-10" />

                <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-widest bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
                      Free Navigation Service
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                      新药研发与临床入组导航通道
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      小胰宝 (www.xiaoyibao.com.cn) 联合 XtraCARE 全力打造全国最专业的胰腺癌临床招募体系。无论您的基因靶点结果如何，医学协调助理都会为您全面匹配在研的领先方案，助您跑赢时间。
                    </p>
                  </div>
                  
                  <div className="lg:col-span-4 flex justify-center lg:justify-end">
                    <button
                      id="home-register-btn"
                      onClick={() => { setActiveTab("clinical"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-sm rounded-full shadow-xl shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>开始一键智能新药筛选</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CLINICAL TRIAL FINDER */}
        {activeTab === "clinical" && <ClinicalMatch />}

        {/* RECOVERY HUB TAB */}
        {activeTab === "recovery" && <RecoveryHub />}

        {/* PATIENT JOURNEY & CARE STATISTICS */}
        {activeTab === "navigation" && <CareMap setActiveTab={setActiveTab} />}



        {/* DONATION PORTAL */}
        {activeTab === "donate" && <Donate />}

        {/* NEWS & INSIGHTS TAB */}
        {activeTab === "news" && <NewsSection />}

        {/* ABOUT US TAB */}
        {activeTab === "about" && <AboutUs setActiveTab={setActiveTab} />}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer setActiveTab={setActiveTab} />

      {/* FLOATING AI BOT PANEL */}
      <FloatingAiBot 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        onOpen={() => setIsAiOpen(true)}
        activeTab={activeTab}
      />
    </div>
  );
}

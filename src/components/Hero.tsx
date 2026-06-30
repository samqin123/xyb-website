import React from "react";
import { ShieldCheck, HeartPulse, Sparkles, BookOpen, Search, ArrowRight } from "lucide-react";

interface HeroProps {
  onStartSelfTest: () => void;
  onTalkToAi: () => void;
  onViewNews: () => void;
}

export default function Hero({ onStartSelfTest, onTalkToAi, onViewNews }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-radial from-emerald-50 via-white to-slate-50/50 pt-12 pb-20 border-b border-emerald-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-100/30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute -bottom-20 left-10 w-[30rem] h-[30rem] bg-teal-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>守护生命・向绿而行｜小胰宝社区全新改版</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.15]">
              面对胰腺癌，<br />
              <span className="text-emerald-600 relative inline-block">
                您绝不孤单
                <span className="absolute left-0 bottom-1.5 w-full h-2 bg-emerald-200/50 -z-10 rounded-sm" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              小胰宝社区 (PancrePal) 作为 <strong className="text-slate-800 font-semibold">XtraCARE 关爱联盟</strong> 的核心数字化平台，专注于为国内胰腺癌患者及家属提供个性化医学支持。通过智能AI随访、前沿新药临床招募、专家导航与专属营养膳食指导，打破重重障碍，重铸生命绿洲。
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-ai-chat-btn"
                onClick={onTalkToAi}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>小胰宝 AI 康复助理</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              
              <button
                id="hero-test-btn"
                onClick={onStartSelfTest}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <HeartPulse className="w-4.5 h-4.5 text-emerald-600" />
                <span>胰腺症状与风险评估</span>
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500 pt-4">
              <span className="font-medium text-slate-400 uppercase tracking-wider">核心合作:</span>
              <div className="flex items-center space-x-1.5 hover:text-emerald-600 transition-colors cursor-pointer" onClick={onViewNews}>
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>胰腺癌临床试验导航</span>
              </div>
              <div className="flex items-center space-x-1.5 hover:text-emerald-600 transition-colors cursor-pointer" onClick={onStartSelfTest}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>胰酶营养计算 (PERT)</span>
              </div>
            </div>
          </div>

          {/* Graphical Dashboard Panel (Visual Representative) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Background geometric design patterns */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 rounded-br-xl" />
            
            <div className="bg-white/95 rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">PancrePal Community Stats</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">数据实时更新</span>
              </div>

              {/* Stats Layout */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <p className="text-[11px] font-medium text-slate-500">累计服务中国患者</p>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-emerald-600">5,430+</p>
                  <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="space-y-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-500">合作三甲医院及中心</p>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-slate-800">42家</p>
                  <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

                <div className="space-y-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-500">在招创新药临床试验</p>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-slate-800">25项</p>
                  <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-600 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div className="space-y-1 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 animate-pulse-slow">
                  <p className="text-[11px] font-medium text-slate-500">1对1全天候AI咨询</p>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-emerald-600">24 / 7</p>
                  <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Informational Warning / Prompt */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-amber-900 text-xs flex items-start space-x-2.5">
                <span className="text-lg leading-none mt-0.5">⚠️</span>
                <p className="leading-relaxed">
                  <strong>温馨提示：</strong>胰腺癌起病隐匿，若出现原因不明的皮肤黄疸、上腹痛、体重骤降、新发糖尿病，请务必及时前往肝胆胰外科或肿瘤科就诊。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

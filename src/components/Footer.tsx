import React from "react";
import { Ribbon, ShieldAlert, Heart, Info, Landmark } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t-2 border-emerald-500 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info block */}
          <div className="md:col-span-1.5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                <Ribbon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">小胰宝社区</h4>
                <p className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-semibold">a member of XtraCARE</p>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed font-light text-slate-400 max-w-sm">
              小胰宝社区 (PancrePal) 作为 XtraCARE 关爱联盟旗下垂直慢病品牌，专注于胰腺癌全流程管理与科研对接，携手中国广大患者跨越疾病难关。
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-widest border-l-2 border-emerald-500 pl-2">快速导航</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button onClick={() => setActiveTab("home")} className="text-left hover:text-emerald-400 transition-colors cursor-pointer">平台首页</button>
              <button onClick={() => setActiveTab("recovery")} className="text-left hover:text-emerald-400 transition-colors cursor-pointer">康复评测 & 膳食胰酶计算</button>
              <button onClick={() => setActiveTab("ai")} className="text-left hover:text-emerald-400 transition-colors cursor-pointer">小胰宝 AI 智能咨询</button>
              <button onClick={() => setActiveTab("news")} className="text-left hover:text-emerald-400 transition-colors cursor-pointer">关爱前沿动态</button>
              <button onClick={() => setActiveTab("about")} className="text-left hover:text-emerald-400 transition-colors cursor-pointer">联系随访助手</button>
            </div>
          </div>

          {/* Official WeChat Account & Website details */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-widest border-l-2 border-emerald-500 pl-2">官方服务平台</h4>
            <div className="space-y-3 text-xs">
              <p className="leading-relaxed font-light text-slate-400">
                请搜索或扫码关注官方公众号 <strong className="text-white font-semibold">“小胰宝助手”</strong>，并访问官方地址进行患者建档与病情评估：
              </p>
              
              <div className="flex items-center space-x-3.5 bg-slate-800/40 p-2.5 rounded-2xl border border-emerald-500/10 max-w-[280px]">
                {/* QR Code Placeholder Box */}
                <div className="w-14 h-14 bg-white rounded-lg flex flex-col items-center justify-center p-1 relative shrink-0 border border-slate-700 shadow-inner overflow-hidden group">
                  {/* Mock QR Code Pattern using CSS/div elements */}
                  <div className="w-full h-full border border-slate-100 flex flex-col justify-between p-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between">
                      <div className="w-3 h-3 border-2 border-slate-800 bg-slate-800" />
                      <div className="w-3 h-3 border-2 border-slate-800 bg-slate-800" />
                    </div>
                    <div className="w-2.5 h-2.5 bg-slate-600 mx-auto" />
                    <div className="flex justify-between items-end">
                      <div className="w-3 h-3 border-2 border-slate-800 bg-slate-800" />
                      {/* Logo center dot */}
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    </div>
                  </div>
                  {/* Laser Scanning line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 animate-bounce" />
                </div>
                
                <div className="space-y-0.5">
                  <p className="font-semibold text-white text-[11px]">扫码关注公众号</p>
                  <p className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded-sm inline-block">小胰宝助手</p>
                  <p className="text-[9px] text-slate-500 leading-none">微信公众号搜索即可关注</p>
                </div>
              </div>

              <a
                href="http://www.xiaoyibao.com.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-[11px] font-semibold font-mono text-emerald-300 hover:text-white transition-all"
              >
                <span>官方网址: www.xiaoyibao.com.cn</span>
              </a>
            </div>
          </div>

          {/* Medical disclaimer */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-widest border-l-2 border-rose-500 pl-2 flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>医学免责声明</span>
            </h4>
            <p className="text-[10px] leading-relaxed font-light text-slate-500">
              小胰宝社区 (PancrePal) 及智能AI随访工具所提供的所有科普、药物资讯、用酶及膳食评估仅供参考，不作为正式临床医学诊断或用药处方。所有医学决定及实际治疗，必须严格遵循患者主治医生的医嘱。
            </p>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 小胰宝社区 pancrepal. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>沪ICP备XXXXXX号</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1">
              <Landmark className="w-3 h-3 text-slate-600" />
              <span>XtraCARE 关爱联盟・大健康赋能项目</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-medium text-slate-600">守护翠绿</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-heartbeat" />
            <span className="font-medium text-slate-600">守护生命</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

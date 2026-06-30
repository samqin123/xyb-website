import React, { useState } from "react";
import { 
  Compass, Users, MapPin, Building, ChevronRight, HelpCircle, ArrowRight, 
  ShieldCheck, CheckCircle2, MessageSquare, Flame, Info, ExternalLink, 
  QrCode, Search, Heart, Share2, Clipboard, Smartphone, BookOpen, Layers, Sparkles
} from "lucide-react";
import RobotLogo from "./RobotLogo";

// Custom crisp SVG-based deterministic QR Code generator component
function CrispQRCode({ 
  seed = "default", 
  size = 72, 
  color = "#009b82" 
}: { 
  seed?: string; 
  size?: number; 
  color?: string; 
}) {
  const matrixSize = 21;
  const grid = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(false));

  // A simple deterministic hash function
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Draw 7x7 corner finder patterns
  const drawFinder = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
          if (r + i < matrixSize && c + j < matrixSize) {
            grid[r + i][c + j] = true;
          }
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, 14);
  drawFinder(14, 0);

  // Center cutout area for logo (5x5)
  const cStart = 8;
  const cEnd = 13;

  // Fill in rest of grid with pseudorandom pattern
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const isFinder = (r < 7 && c < 7) || (r < 7 && c >= 14) || (r >= 14 && c < 7);
      const isCenter = r >= cStart && r < cEnd && c >= cStart && c < cEnd;
      if (!isFinder && !isCenter) {
        const val = Math.abs(Math.sin(hash + r * 17 + c * 31));
        grid[r][c] = val > 0.42;
      }
    }
  }

  return (
    <div className="relative flex items-center justify-center bg-white p-1.5 rounded-lg border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all duration-300">
      <svg width={size} height={size} viewBox={`0 0 ${matrixSize} ${matrixSize}`} className="shape-rendering-crisp">
        {grid.map((row, r) => 
          row.map((active, c) => {
            if (active) {
              return (
                <rect 
                  key={`${r}-${c}`} 
                  x={c} 
                  y={r} 
                  width={1} 
                  height={1} 
                  fill={color} 
                />
              );
            }
            return null;
          })
        )}
      </svg>
      {/* Tiny robot face in center */}
      <div className="absolute w-[22%] h-[22%] bg-white rounded-md border border-slate-100 flex items-center justify-center p-0.5">
        <div className="bg-emerald-500 rounded-xs w-full h-full flex items-center justify-center">
          <span className="text-[5px] text-white font-extrabold select-none">宝</span>
        </div>
      </div>
    </div>
  );
}

export default function CareMap({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // Modal for Enlarged QR Code details
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    title: string;
    subTitle: string;
    category: string;
    accentColor: string;
  } | null>(null);

  const openQrModal = (title: string, subTitle: string, category: string, accentColor: string = "#009b82") => {
    setModalData({ title, subTitle, category, accentColor });
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Visual Header Grid */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#009b82] bg-[#009b82]/10 border border-[#009b82]/20 px-3 py-1 rounded-full">
          XtraCARE COMMUNITY MAP ｜ 胰腺肿瘤全程科学随访地铁图
        </span>
        <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          胰腺癌全程关爱网络导航 (地铁图版)
        </h2>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          我们根据真实患者临床治疗路径、特药使用经验及家属高维日常护理，首创了<strong className="text-emerald-700 font-semibold">“1:1地铁换乘网络导航图”</strong>。四条健康轨道深度联动，精准解决就医与康复死角。请点击下方站点，一键放大保存对应群组的微信二维码。
        </p>
      </div>

      {/* METRO MAP LEGEND (地铁线网图例) */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-xs max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
        <div className="flex items-center space-x-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-600/30 shrink-0" />
          <div>
            <p className="font-bold text-slate-800">🟢 临床诊疗1号线</p>
            <p className="text-[10px] text-slate-400 font-light">首诊复筛、防复发及临床招募</p>
          </div>
        </div>
        <div className="flex items-center space-x-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white ring-2 ring-teal-600/30 shrink-0" />
          <div>
            <p className="font-bold text-slate-800">🟣 精准分子分型线</p>
            <p className="text-[10px] text-slate-400 font-light">特药抗突变与基因测序建档</p>
          </div>
        </div>
        <div className="flex items-center space-x-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-500/30 shrink-0" />
          <div>
            <p className="font-bold text-slate-800">🟠 膳食营养2号线</p>
            <p className="text-[10px] text-slate-400 font-light">胰酶补充(PERT)与餐配指导</p>
          </div>
        </div>
        <div className="flex items-center space-x-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white ring-2 ring-pink-500/30 shrink-0" />
          <div>
            <p className="font-bold text-slate-800">🔴 人文陪伴与关爱线</p>
            <p className="text-[10px] text-slate-400 font-light">地域互助与舒适安宁支持</p>
          </div>
        </div>
      </div>

      {/* METRO MAP INNER AREA */}
      <div className="bg-[#f2f6f5] rounded-3xl border border-slate-200 p-4 md:p-8 shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Subtle Map Grid Grid Overlay Lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.03]">
          {Array(144).fill(0).map((_, i) => (
            <div key={i} className="border border-slate-900" />
          ))}
        </div>

        {/* METRO CONTAINER */}
        <div className="relative z-10 space-y-8">
          
          {/* Top Subway Box: 🟢 LINE 1 (Clinical Diagnosis Line - 5 Interconnected Train Stations) */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-5 md:p-6 shadow-md relative">
            <div className="absolute -top-3.5 left-6 bg-emerald-600 text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span>🟢 临床诊疗核心干线 (CLINICAL MAIN LINE)</span>
            </div>

            {/* Subway Connection Tracks drawn in background via SVG */}
            <div className="absolute top-[68px] left-[10%] right-[10%] h-1 bg-emerald-600 hidden md:block pointer-events-none" />

            <div className="grid md:grid-cols-5 gap-6 pt-4 relative">
              {[
                { name: "首诊筛查站", desc: "复筛指南、首诊CT分析", seed: "screen", color: "#10b981", num: "01", category: "临床诊疗1号线" },
                { name: "术后随访站", desc: "术后指标跟踪防复发", seed: "recur", color: "#10b981", num: "02", category: "临床诊疗1号线" },
                { name: "标准化疗站", desc: "一线/二线特药化疗咨询", seed: "chemo", color: "#10b981", num: "03", category: "临床诊疗1号线" },
                { name: "急症会诊站", desc: "MDT会诊、黄疸疼痛管理", seed: "advanced", color: "#10b981", num: "04", category: "临床诊疗1号线" },
                { name: "新药匹配站 (枢纽)", desc: "在招靶点新药临床通道", seed: "clinical_match", color: "#10b981", num: "05", category: "临床诊疗1号线" }
              ].map((station, sIdx) => (
                <div key={sIdx} className="relative flex flex-col items-center group">
                  {/* Metro Station Number Badge */}
                  <div className="absolute top-0 right-4 text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md font-bold">
                    {station.num}
                  </div>

                  <div 
                    onClick={() => openQrModal(station.name, `微信扫描进入${station.name}，提供小胰宝全程学术指导、病史登记与绿通转诊方案。`, station.category, station.color)}
                    className="cursor-pointer w-full bg-slate-50 border border-slate-100 p-4 rounded-xl hover:bg-emerald-50/50 hover:border-emerald-500 transition-all duration-300 flex flex-col items-center text-center space-y-3 relative hover:-translate-y-1 shadow-xs"
                  >
                    {/* Station Dot Indicator */}
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-emerald-600 flex items-center justify-center shadow-xs">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    </div>

                    <CrispQRCode seed={station.seed} size={56} color={station.color} />
                    
                    <div>
                      <p className="text-xs font-bold text-slate-800">{station.name}</p>
                      <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">
                        {station.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Row Box: 🟣 LINE 2 (Precision Typing Line - 8 Interconnected Stations with Transfer curves) */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-teal-500/20 p-5 md:p-6 shadow-md relative">
            <div className="absolute -top-3.5 left-6 bg-teal-700 text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span>🟣 精准基因分子靶点分线 (PRECISION TARGET ROUTE)</span>
            </div>

            {/* Metro Track Lines */}
            <div className="absolute top-[68px] left-[5%] right-[5%] h-1 bg-teal-600 hidden lg:block pointer-events-none" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-4 relative">
              {[
                { name: "KRAS-G12D站", seed: "g12d", color: "#0d9488", num: "P1", desc: "精准特药群" },
                { name: "KRAS-G12V站", seed: "g12v", color: "#0d9488", num: "P2", desc: "临床方案匹配" },
                { name: "KRAS-12R站", seed: "g12r", color: "#0d9488", num: "P3", desc: "前沿联合疗法" },
                { name: "KRAS非常规站", seed: "kras_un", color: "#0d9488", num: "P4", desc: "少见靶点探索" },
                { name: "KRAS野生型站", seed: "kras_wild", color: "#0d9488", num: "P5", desc: "免疫与化疗优化" },
                { name: "HER2/3分型站", seed: "her23", color: "#0d9488", num: "P6", desc: "ADC抗体抗癌群" },
                { name: "MTAP缺失站", seed: "mtap", color: "#0d9488", num: "P7", desc: "PRMT5抑制剂群" },
                { name: "ATM胚系突变站", seed: "germline", color: "#0d9488", num: "P8", desc: "PARP抑制剂指南" }
              ].map((station, sIdx) => (
                <div 
                  key={sIdx} 
                  onClick={() => openQrModal(station.name, `精准肿瘤治疗方案。微信扫描进入${station.name}，对接国内一流基因特药组套及临床学术库。`, "精准分子分型分支", station.color)}
                  className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 flex flex-col items-center text-center space-y-2 cursor-pointer hover:bg-teal-50/60 hover:border-teal-500 transition-all hover:-translate-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between w-full text-[8px] font-mono text-teal-700">
                    <span className="font-extrabold">{station.num}</span>
                    <span className="bg-teal-50 px-1 py-0.2 rounded">特药群</span>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-white border-4 border-teal-600 flex items-center justify-center shadow-xs">
                    <div className="w-1.2 h-1.2 bg-teal-600 rounded-full" />
                  </div>

                  <CrispQRCode seed={station.seed} size={46} color={station.color} />
                  
                  <div>
                    <p className="text-[10px] font-bold text-slate-800 leading-tight">{station.name}</p>
                    <p className="text-[8px] text-slate-400 font-light mt-0.5">{station.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid: 🟠 LINE 3 (Nutrition) & 🔴 LINE 4 (Support & Warmth) side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* 3. Orange Line (膳食营养二号线) */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-orange-500/20 p-5 md:p-6 shadow-md relative flex flex-col justify-between">
              <div>
                <div className="absolute -top-3.5 left-6 bg-orange-600 text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <span>🟠 膳食营养二号线 (DIET & PEI ROUTE)</span>
                </div>

                <p className="text-[11px] text-slate-400 font-light mt-2 pl-1 mb-4">
                  胰腺核心外分泌PEI、恶病质消瘦、拉肚子浮油等PERT精确补充与调理站。
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "营养筛查站", seed: "nut_scr", desc: "日常体重、血脂、电解质评估", label: "01" },
                    { name: "胰酶替代PERT站", seed: "nut_pert", desc: "得每通胶囊剂量合理化测算", label: "02" },
                    { name: "治疗期支持站", seed: "nut_treat", desc: "高热量流质配方与膳食建议", label: "03" },
                    { name: "控糖糖尿病站", seed: "nut_sugar", desc: "新发糖尿病、皮下胰岛素匹配", label: "04" }
                  ].map((station, sIdx) => (
                    <div 
                      key={sIdx}
                      onClick={() => openQrModal(station.name, `胰腺癌餐后脂肪泻、疼痛应对、恶病质消瘦营养自查与得每通计算。请扫码进入${station.name}。`, "日常营养管理线", "#ea580c")}
                      className="bg-slate-50 hover:bg-orange-50/50 border border-slate-100 hover:border-orange-500 rounded-xl p-3 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all hover:-translate-y-1 shadow-xs"
                    >
                      <div className="flex items-center justify-between w-full text-[8px] font-mono text-orange-700">
                        <span className="font-extrabold">N{station.label}</span>
                        <span className="bg-orange-50 px-1 py-0.2 rounded">PEI专属</span>
                      </div>

                      <div className="w-4 h-4 rounded-full bg-white border-4 border-orange-500 flex items-center justify-center shadow-xs">
                        <div className="w-1.2 h-1.2 bg-orange-500 rounded-full" />
                      </div>

                      <CrispQRCode seed={station.seed} size={46} color="#ea580c" />
                      
                      <div>
                        <p className="text-[10px] font-bold text-slate-800 leading-tight">{station.name}</p>
                        <p className="text-[8px] text-slate-400 font-light mt-1">{station.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant calculation link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 font-normal">胰酶调配辅助:</span>
                <button 
                  onClick={() => { setActiveTab("recovery"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="text-orange-600 hover:text-orange-800 flex items-center space-x-1 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <span>在线胰酶剂量计算器</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Pink Line (人文陪伴与关爱线) */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-500/20 p-5 md:p-6 shadow-md relative flex flex-col justify-between">
              <div>
                <div className="absolute -top-3.5 left-6 bg-pink-600 text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <span>🔴 人文陪伴与关爱线 (HUMANITARIAN COMPASSION)</span>
                </div>

                <p className="text-[11px] text-slate-400 font-light mt-2 pl-1 mb-4">
                  全国各地域实名互助支持，缓解重度恐慌情绪，抗癌路上温度陪伴。
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "地域病友交流站", seed: "com_reg", desc: "按省份就医绿通与社保购药", label: "01" },
                    { name: "飞书病情知识站", seed: "com_doc", desc: "结构化靶点树、病友自检百科", label: "02" },
                    { name: "舒适镇痛小队", seed: "com_pain", desc: "三阶梯镇痛自查、副反应控制", label: "03" },
                    { name: "安宁尊严守护站", seed: "com_care", desc: "晚期病友舒适关怀及心理支持", label: "04" }
                  ].map((station, sIdx) => (
                    <div 
                      key={sIdx}
                      onClick={() => openQrModal(station.name, `提供全家照护、社群心声支持及名医科普。请扫码进入${station.name}。`, "人文陪伴关爱线", "#db2777")}
                      className="bg-slate-50 hover:bg-pink-50/50 border border-slate-100 hover:border-pink-500 rounded-xl p-3 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all hover:-translate-y-1 shadow-xs"
                    >
                      <div className="flex items-center justify-between w-full text-[8px] font-mono text-pink-700">
                        <span className="font-extrabold">H{station.label}</span>
                        <span className="bg-pink-50 px-1 py-0.2 rounded">关爱群</span>
                      </div>

                      <div className="w-4 h-4 rounded-full bg-white border-4 border-pink-500 flex items-center justify-center shadow-xs">
                        <div className="w-1.2 h-1.2 bg-pink-500 rounded-full" />
                      </div>

                      <CrispQRCode seed={station.seed} size={46} color="#db2777" />
                      
                      <div>
                        <p className="text-[10px] font-bold text-slate-800 leading-tight">{station.name}</p>
                        <p className="text-[8px] text-slate-400 font-light mt-1">{station.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* High-definition download instructions */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-slate-400 text-[10px] flex items-center justify-between">
                <span>🔔 支持扫码下载完整版PDF地图</span>
                <span className="text-pink-600 font-semibold cursor-pointer hover:underline" onClick={() => alert("地图PDF正在生成中，请扫描任意群主二维码直接获取高清源文件。")}>获取打印源文件</span>
              </div>
            </div>

          </div>

          {/* 5. Blue Row Box:合作三甲医院与专家随访 */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-blue-500/20 p-5 md:p-6 shadow-md relative">
            <div className="absolute -top-3.5 left-6 bg-blue-700 text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span>🏥 XtraCARE 联盟合作三甲大中心官方公益站</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
              {[
                { name: "复肿&小胰宝 公益1群", seed: "fudan1" },
                { name: "复肿&小胰宝 公益2群", seed: "fudan2" },
                { name: "复肿&小胰宝 公益3群", seed: "fudan3" },
                { name: "金医生随访公益群", seed: "doctor_jin" },
                { name: "江苏省人医公益群", seed: "jsph" }
              ].map((hosp, hIdx) => (
                <div 
                  key={hIdx} 
                  onClick={() => openQrModal(hosp.name, "名院共建专属群：由合作三甲大中心知名专家联合发起，提供出院后随访打卡、检验报告自查及学术公益沙龙答疑。", "三甲大中心官方站", "#2563eb")}
                  className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex flex-col items-center space-y-2 cursor-pointer hover:-translate-y-1 shadow-xs"
                >
                  <CrispQRCode seed={hosp.seed} size={44} color="#2563eb" />
                  <span className="text-[10px] font-bold text-slate-800 text-center leading-tight tracking-tight min-h-6 flex items-center justify-center">
                    {hosp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Utility Grid Portals (Feishu, QQ, Welfare) */}
          <div className="grid md:grid-cols-3 gap-4 pt-2">
            
            {/* Feishu */}
            <div 
              onClick={() => openQrModal("病情互助飞书1群", "飞书高维文档，涵盖多重患者指南、突变靶点自检树及营养库知识库", "结构化文档库", "#059669")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer shadow-sm relative overflow-hidden"
            >
              <div className="space-y-1">
                <span className="text-[8px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-extrabold uppercase">高维结构化</span>
                <h4 className="font-bold text-xs">病情互助飞书1群</h4>
                <p className="text-[9px] text-emerald-100 font-light">内含万字患者自查百科与医学树</p>
              </div>
              <CrispQRCode seed="feishu" size={40} color="#059669" />
            </div>

            {/* QQ */}
            <div 
              onClick={() => openQrModal("社区QQ官方群 (1062580994)", "社区QQ文件共享群，支持快速大文件病历、基因报告及指南打包高速下载", "官方QQ群", "#1e40af")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer shadow-sm relative overflow-hidden"
            >
              <div className="space-y-1">
                <span className="text-[8px] bg-blue-800 text-blue-100 px-2 py-0.5 rounded font-extrabold uppercase">群号 1062580994</span>
                <h4 className="font-bold text-xs">QQ 病友资料共享群</h4>
                <p className="text-[9px] text-blue-100 font-light">支持超大病历及学术指南包极速下载</p>
              </div>
              <CrispQRCode seed="qq" size={40} color="#1e40af" />
            </div>

            {/* Welfare */}
            <div 
              onClick={() => openQrModal("品质生活福利群", "提供高纯度营养补充剂、专业胰酶制剂、医用营养配方的特殊公益福利采购渠道", "社区福利", "#6d28d9")}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer shadow-sm relative overflow-hidden"
            >
              <div className="space-y-1">
                <span className="text-[8px] bg-purple-800 text-purple-100 px-2 py-0.5 rounded font-extrabold uppercase">品质正品餐配</span>
                <h4 className="font-bold text-xs">品质生活福利购群</h4>
                <p className="text-[9px] text-purple-100 font-light">高纯营养粉、自费特等胰酶绿色采购渠道</p>
              </div>
              <CrispQRCode seed="welfare" size={40} color="#6d28d9" />
            </div>

          </div>

        </div>

      </div>

      {/* ----------------- MODAL OVERLAY: Crystallized High-definition Vector QR-Code ----------------- */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100 overflow-hidden transform transition-all scale-100">
            {/* Header banner */}
            <div 
              className="p-5 text-white flex flex-col items-center text-center space-y-1 relative"
              style={{ backgroundColor: modalData.accentColor }}
            >
              <div className="absolute top-3 right-3">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <span className="text-[9px] uppercase tracking-widest bg-white/25 px-2 py-0.5 rounded font-extrabold">
                {modalData.category}
              </span>
              <h3 className="font-display font-extrabold text-base tracking-tight">{modalData.title}</h3>
              <p className="text-[11px] text-white/90 font-light leading-snug">{modalData.subTitle}</p>
            </div>

            {/* Main content: crystal clear QR code */}
            <div className="p-8 flex flex-col items-center space-y-6 text-center">
              <div className="p-4 bg-slate-50/60 rounded-3xl border border-slate-200/50 flex items-center justify-center">
                <CrispQRCode seed={modalData.title} size={180} color={modalData.accentColor} />
              </div>

              {/* Instructions */}
              <div className="space-y-3.5 text-xs text-slate-600 font-light text-left w-full max-w-[260px] mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>微信扫码/长按或截图保存上方高清二维码</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>添加官方助理微信，备注说明：「申请加入{modalData.title}」</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span>病情审核通过后，管理员将发送邀请链接拉您入群</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                确定，返回导航图
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

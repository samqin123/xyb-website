import React, { useState } from "react";
import { Building, ShieldCheck, Mail, Phone, MapPin, Globe, CheckCircle, Award, Compass, MessageSquare, Search, Heart, Activity } from "lucide-react";

interface AboutUsProps {
  setActiveTab?: (tab: string) => void;
}

export default function AboutUs({ setActiveTab }: AboutUsProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    diseaseStage: "初诊 / 未确定",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Visual Header Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>关于我们 ｜ About PancrePal</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            小胰宝社区 (PancrePal)<br />
            <span className="text-emerald-600">中国首家胰腺癌垂直数字化关怀平台</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            小胰宝社区 (PancrePal) 作为 <strong>XtraCARE 关爱联盟</strong> 的核心成员，由国内顶尖临床肿瘤学家、营养师及数字医疗专家共同发起创立。我们坚信：<strong>科学、尊严、关爱</strong> 是战胜“癌中之王”最坚强的盾牌。
          </p>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            我们致力于打破医疗信息的不对称，官方线上管理平台 <strong>[www.xiaoyibao.com.cn](http://www.xiaoyibao.com.cn)</strong> 为患者提供全方位的慢病随访管家服务，涵盖一键营养膳食分析、核心症状AI早期监测、及国内各大三甲中心最新免疫靶向药物的免费临床试验入组导航。
          </p>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white space-y-6 shadow-xl">
          <h3 className="font-display font-bold text-lg border-b border-white/20 pb-4">小胰宝 ｜ 核心使命</h3>
          
          <div className="space-y-4">
            {[
              { title: "全生命周期数字化管理", desc: "自初诊、新辅助化疗、手术至后期康复，提供科学症状追踪与随访管家。" },
              { title: "前沿临床科学招募", desc: "连接全球与国内最先进的临床试验，免费初筛并对接权威主治医生团队。" },
              { title: "胰腺专属营养支持", desc: "深度科普胰酶替代疗法 (PERT)，守护患者体重与能量摄入命脉。" },
              { title: "爱心心理与同伴互助", desc: "汇聚康复幸存者，分享真实的生命力量，提供心理疏导沙龙。" }
            ].map((mission, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">{mission.title}</h4>
                  <p className="text-xs text-emerald-100/80 leading-relaxed mt-0.5">{mission.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alliance Brand Partnership section */}
      <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl text-slate-900">XtraCARE 关爱联盟成员</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            作为 XtraCARE 医疗联盟旗下专注肿瘤垂直病种的分支，小胰宝共享 XtraCARE 强大的多学科临床资源，为患者提供合规、严谨、多维度支持。
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { title: "学术合作中心", icon: <Building className="w-6 h-6 text-emerald-600" />, desc: "联合国内40余家顶级三甲肝胆胰腺肿瘤中心，确保指南解读与科研招募合规权威。" },
            { title: "质量监控与合规", icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, desc: "遵循ICH-GCP标准及个人隐私保护规范，对每份病例进行多重医学审核与保密。" },
            { title: "金牌科普委员会", icon: <Award className="w-6 h-6 text-emerald-600" />, desc: "由胰腺外分泌及肿瘤康复领域知名教授领衔，持续产出真正能落地的指南解读。" }
          ].map((partner, pIdx) => (
            <div key={pIdx} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-3 shadow-xs">
              <div className="inline-flex p-3 bg-emerald-50 rounded-xl">
                {partner.icon}
              </div>
              <h4 className="font-bold text-sm text-slate-800">{partner.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{partner.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Patient Form block */}
      <div className="grid lg:grid-cols-12 gap-12 items-start" id="contact-panel">
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display font-bold text-xl text-slate-900">联系我们 ｜ 寻医问药指导</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            如有关于胰腺早筛、胰酶制剂、创新药临床试验入组、或患者家属微信互助群的加入事宜，您可以通过以下通道联系我们的官方协调组。
          </p>

          <div className="space-y-4 pt-2">
            {[
              { icon: <Globe className="w-4 h-4 text-emerald-600" />, label: "官方网站", val: "www.xiaoyibao.com.cn", link: "http://www.xiaoyibao.com.cn" },
              { icon: <Mail className="w-4 h-4 text-emerald-600" />, label: "服务邮箱", val: "service@xiaoyibao.com.cn", link: "mailto:service@xiaoyibao.com.cn" },
              { icon: <Phone className="w-4 h-4 text-emerald-600" />, label: "服务热线 (工作日 9:00 - 18:00)", val: "400-Xtra-CARE (400-999-XXXX)", link: "#" },
              { icon: <MapPin className="w-4 h-4 text-emerald-600" />, label: "联盟总部", val: "中国上海市 XtraCARE 医疗健康产业创新中心", link: "#" }
            ].map((contact, cIdx) => (
              <div key={cIdx} className="flex items-start space-x-3.5 text-xs text-slate-600">
                <span className="p-2 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
                  {contact.icon}
                </span>
                <div>
                  <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">{contact.label}</p>
                  {contact.link !== "#" ? (
                    <a href={contact.link} className="font-semibold text-slate-800 hover:text-emerald-600 transition-colors mt-0.5 block">{contact.val}</a>
                  ) : (
                    <span className="font-semibold text-slate-800 mt-0.5 block">{contact.val}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Wechat Official Account Promotion Card */}
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl space-y-4">
            <h4 className="font-display font-bold text-sm text-emerald-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              <span>微信官方服务号 ｜ 小胰宝助手</span>
            </h4>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              关注公众号 <strong className="text-emerald-800 font-bold">“小胰宝助手”</strong>，不仅可以每日一键计算胰酶 (PERT)，还可以加入胰腺癌患者及家属爱心陪伴互助社群。
            </p>

            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/10">
              {/* Crisp SVG QR Code for Official Account */}
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center relative shrink-0 border border-slate-200 shadow-sm overflow-hidden group select-none">
                <svg width="52" height="52" viewBox="0 0 21 21" className="shape-rendering-crisp opacity-90 group-hover:opacity-100 transition-opacity">
                  {/* Outer corner finders */}
                  <rect x="0" y="0" width="7" height="7" fill="#009b82" />
                  <rect x="1" y="1" width="5" height="5" fill="#ffffff" />
                  <rect x="2" y="2" width="3" height="3" fill="#009b82" />

                  <rect x="14" y="0" width="7" height="7" fill="#009b82" />
                  <rect x="15" y="1" width="5" height="5" fill="#ffffff" />
                  <rect x="2" y="2" fill="#009b82" />
                  <rect x="16" y="2" width="3" height="3" fill="#009b82" />

                  <rect x="0" y="14" width="7" height="7" fill="#009b82" />
                  <rect x="1" y="15" width="5" height="5" fill="#ffffff" />
                  <rect x="2" y="16" width="3" height="3" fill="#009b82" />

                  {/* Deterministic QR random-dots */}
                  <rect x="8" y="1" width="2" height="1" fill="#009b82" />
                  <rect x="11" y="2" width="1" height="2" fill="#009b82" />
                  <rect x="9" y="4" width="2" height="1" fill="#009b82" />
                  <rect x="12" y="5" width="2" height="2" fill="#009b82" />
                  <rect x="1" y="8" width="3" height="1" fill="#009b82" />
                  <rect x="5" y="9" width="1" height="3" fill="#009b82" />
                  <rect x="8" y="8" width="5" height="5" fill="#009b82" />
                  <rect x="9" y="9" width="3" height="3" fill="#ffffff" />
                  <rect x="10" y="10" width="1" height="1" fill="#009b82" />
                  <rect x="15" y="8" width="2" height="2" fill="#009b82" />
                  <rect x="18" y="11" width="2" height="1" fill="#009b82" />
                  <rect x="15" y="14" width="1" height="3" fill="#009b82" />
                  <rect x="17" y="15" width="3" height="2" fill="#009b82" />
                  <rect x="8" y="15" width="3" height="1" fill="#009b82" />
                  <rect x="10" y="17" width="2" height="3" fill="#009b82" />
                </svg>
                {/* Scanner Laser Beam effect */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 animate-bounce" />
              </div>
              
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-800 text-[11px]">长按二维码或搜索关注</p>
                <p className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-sm inline-block">公众号: 小胰宝助手</p>
                <p className="text-[9px] text-slate-400 leading-none">获取第一手肿瘤前沿及专家科普</p>
              </div>
            </div>
          </div>

          {/* PanCan-style Navigation, Matching & Donation Entry shortcuts */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest pl-1">
              XtraCARE 关爱快捷入口 (PanCan 推荐)
            </h4>

            <div className="grid gap-3">
              {/* Clinical Match Shortcut */}
              <div className="p-4 bg-white border border-slate-100 hover:border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-2.5">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Search className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-800 text-[11px] sm:text-xs">临床试验招募智能筛查</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      按靶点与省份免费匹配在招新药，打通快速绿色入组通道。
                    </p>
                  </div>
                </div>
                {setActiveTab && (
                  <button
                    onClick={() => {
                      setActiveTab("clinical");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-1.5 bg-slate-50 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-900 font-bold text-[10px] sm:text-xs rounded-full border border-slate-100 hover:border-emerald-100 cursor-pointer transition-all text-center block"
                  >
                    立即开启临床试验智能匹配
                  </button>
                )}
              </div>

              {/* Patient Journey Navigation & Community Stats Shortcut */}
              <div className="p-4 bg-white border border-slate-100 hover:border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-2.5">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-800 text-[11px] sm:text-xs">关爱导航图 & 地域患者分布</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      查阅中国胰腺癌病友全程指南路径，查看各区域互助群规模。
                    </p>
                  </div>
                </div>
                {setActiveTab && (
                  <button
                    onClick={() => {
                      setActiveTab("navigation");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-1.5 bg-slate-50 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-900 font-bold text-[10px] sm:text-xs rounded-full border border-slate-100 hover:border-emerald-100 cursor-pointer transition-all text-center block"
                  >
                    查看全程导航图与增长条形图
                  </button>
                )}
              </div>

              {/* Donation Shortcut */}
              <div className="p-4 bg-white border border-slate-100 hover:border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-2.5">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                    <Heart className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-800 text-[11px] sm:text-xs">小胰宝患者关爱资助项目</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      资助服务器与随访助理。我们对患者保持100%零收费学术协助。
                    </p>
                  </div>
                </div>
                {setActiveTab && (
                  <button
                    onClick={() => {
                      setActiveTab("donate");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-1.5 bg-rose-50/50 hover:bg-rose-50 text-rose-700 hover:text-rose-950 font-bold text-[10px] sm:text-xs rounded-full border border-rose-100 cursor-pointer transition-all text-center block"
                  >
                    温暖相助 ｜ 提交爱心捐赠
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2 border-b border-slate-50 pb-3">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-600" />
                <span>登记病情 ｜ 预约医学助理一对一回访</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">患者姓名 / 称呼</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例如：张先生"
                    className="w-full px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white outline-none text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">联系电话 (回访用)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="手机号（微信同号优先）"
                    className="w-full px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">当前确诊阶段</label>
                <select
                  value={formData.diseaseStage}
                  onChange={(e) => setFormData({ ...formData, diseaseStage: e.target.value })}
                  className="w-full px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white outline-none text-xs font-semibold appearance-none"
                >
                  <option>初诊 / 未确定分期</option>
                  <option>可切除期（准备手术/术后）</option>
                  <option>局部晚期 / 拟进行放化疗</option>
                  <option>转移性胰腺癌（寻新药入组）</option>
                  <option>胰腺囊性占位 / 疑似病变</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">病情简述 或 咨询诉求</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="可简述当前的症状（如黄疸、消瘦、上腹痛情况）或咨询的靶点基因检测情况..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 transform hover:-translate-y-0.5"
              >
                安全提交 ｜ 预约专属医学助理
              </button>
            </form>
          ) : (
            <div className="text-center p-8 space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-full text-emerald-600">
                <CheckCircle className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base">提交成功，我们已收到您的病情咨询</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                感谢您对小胰宝社区 (PancrePal) 的信任。专属 XtraCARE 医学服务助理将在 24 小时内（节假日顺延）给您拨打回访电话，请保持电话畅通，或前往官方网站 <strong>www.xiaoyibao.com.cn</strong> 获取更即时的随访工具。
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 border border-slate-200 hover:border-emerald-500 text-slate-600 hover:text-emerald-700 text-xs rounded-full transition-all font-semibold"
              >
                返回修改
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

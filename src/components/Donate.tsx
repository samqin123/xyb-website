import React, { useState } from "react";
import { Heart, ShieldCheck, Award, MessageCircle, HelpCircle, ArrowRight, UserCheck, Check, Sparkles, Coins, HelpCircle as HelpIcon } from "lucide-react";

interface DonationTier {
  id: string;
  amount: number;
  name: string;
  impact: string;
}

interface Pledge {
  id: string;
  donor: string;
  amount: number;
  date: string;
  msg: string;
}

export default function Donate() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedTier, setSelectedTier] = useState<string>("tier-2");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [pledges, setPledges] = useState<Pledge[]>([
    { id: "p-1", donor: "王*华", amount: 100, date: "10分钟前", msg: "感谢小胰宝的计算器！让我们家属终于算明白了一顿饭到底该吃多少颗得每通，太救命了！" },
    { id: "p-2", donor: "爱心家属林女士", amount: 50, date: "2小时前", msg: "吉西他滨耐药后在这里成功匹配到了高选择性KRAS突变药物。感谢学术助手的热心初筛！" },
    { id: "p-3", donor: "匿名抗癌勇士", amount: 500, date: "5小时前", msg: "科学与关爱是战胜癌王最强大的底气。守护我们的体重，祝所有病友无痛抗癌！" },
    { id: "p-4", donor: "赵*萍", amount: 200, date: "1天前", msg: "作为XtraCARE爱心见证者，这个平台不收一分钱广告。我自愿资助服务器日常运营。" }
  ]);

  const [newPledge, setNewPledge] = useState({
    donor: "",
    msg: ""
  });

  const donationTiers: DonationTier[] = [
    { id: "tier-1", amount: 20, name: "微光点亮", impact: "资助1名病友家庭获取一份由顶级三甲专家审阅编写的《胰腺癌PERT及营养膳食电子宝典》" },
    { id: "tier-2", amount: 50, name: "温暖支持", impact: "资助1名家境困难的病友享受全天候“慢病数字化管理助理”1个月的病情/营养随访监督" },
    { id: "tier-3", amount: 150, name: "守护前沿", impact: "资助支持1期“小胰宝学术委员会”联合上海/北京顶级教授的线上患者一对一公益科普问诊" },
    { id: "tier-4", amount: 500, name: "生命绿洲", impact: "全额补贴1名晚期极难治病友进行多中心临床绿通极速匹配、影像评估与病例资料复核" }
  ];

  const activeAmount = selectedTier === "custom" ? Number(customAmount) || 0 : donationTiers.find(t => t.id === selectedTier)?.amount || 0;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) {
      alert("请输入有效的捐赠金额。");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentDone(true);
      
      // Add pledge dynamically
      const newlyCreated: Pledge = {
        id: `p-${Date.now()}`,
        donor: newPledge.donor.trim() || "匿名善心人士",
        amount: activeAmount,
        date: "刚刚",
        msg: newPledge.msg.trim() || "向绿而行，守护生命！"
      };
      setPledges([newlyCreated, ...pledges]);
    }, 2200);
  };

  const resetPayment = () => {
    setPaymentDone(false);
    setNewPledge({ donor: "", msg: "" });
    setSelectedTier("tier-2");
    setCustomAmount("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Title Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          PATIENT SUPPORT FUND ｜ 胰腺关爱捐赠
        </span>
        <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          守护生命 ｜ 小胰宝公益患者支持项目
        </h2>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          小胰宝社区 (www.xiaoyibao.com.cn) 始终坚持对所有患者及家属<strong>提供100%免费的学术支持、营养自评及新药入组导航</strong>。您的善意捐款将直接用于数字化服务器托管及资助重症患者，让希望之火永不熄灭。
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: Donation Action Wizard */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2">
              <Coins className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>爱心助航 ｜ 提交捐赠项目</span>
            </h3>

            {/* Once vs Monthly Tab Toggle */}
            <div className="bg-slate-100 p-1 rounded-full flex space-x-1">
              <button
                onClick={() => setFrequency("once")}
                className={`px-4 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${frequency === "once" ? "bg-white text-emerald-800 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                单次捐赠
              </button>
              <button
                onClick={() => setFrequency("monthly")}
                className={`px-4 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${frequency === "monthly" ? "bg-white text-emerald-800 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                每月定额
              </button>
            </div>
          </div>

          {!paymentDone ? (
            <form onSubmit={handleStartPayment} className="space-y-6">
              {/* Tiers Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {donationTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all relative cursor-pointer ${selectedTier === tier.id ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"}`}
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tier.name}</p>
                      <p className="text-xs text-slate-500 leading-normal line-clamp-3 font-light pt-1">{tier.impact}</p>
                    </div>

                    <div className="flex justify-between items-end w-full pt-2">
                      <p className="font-display font-bold text-slate-800 text-lg">
                        ¥{tier.amount}
                        {frequency === "monthly" && <span className="text-[10px] text-slate-400 font-light"> / 月</span>}
                      </p>
                      {selectedTier === tier.id && (
                        <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center p-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Input Block */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTier("custom")}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${selectedTier === "custom" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}
                  >
                    自定义金额
                  </button>
                  {selectedTier === "custom" && (
                    <div className="relative flex-1 max-w-[160px]">
                      <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-400">¥</span>
                      <input
                        type="number"
                        min="1"
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="输入任意金额"
                      />
                    </div>
                  )}
                </div>

                {/* Info Text of the active level */}
                <div className="p-4 bg-emerald-50/40 border border-emerald-500/10 rounded-2xl flex items-start space-x-3 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-bold text-emerald-800">您即将资助：¥{activeAmount}元 {frequency === "monthly" ? " (每月定期)" : " (单次支持)"}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                      小胰宝受 XtraCARE 基金监督，所有款项流转公开，定期通过【关爱动态】向全社会发布审计报告。每位爱心伙伴均可获得【小胰宝社区电子捐赠证书】及病例库进展季报。
                    </p>
                  </div>
                </div>
              </div>

              {/* Donor Custom Info for Pledge Feed */}
              <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">爱心人士 / 称呼</label>
                  <input
                    type="text"
                    value={newPledge.donor}
                    onChange={(e) => setNewPledge({ ...newPledge, donor: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none font-semibold text-slate-700"
                    placeholder="例如: 张*强先生"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">爱心寄语 ｜ 默默支持</label>
                  <input
                    type="text"
                    value={newPledge.msg}
                    onChange={(e) => setNewPledge({ ...newPledge, msg: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none font-medium text-slate-600"
                    placeholder="例如: 愿天下无癌，守护体重！"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              {!isPaying ? (
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg shadow-emerald-600/25 transition-all text-center cursor-pointer uppercase tracking-wider"
                >
                  确认捐赠 ¥{activeAmount} 元并索取爱心书证
                </button>
              ) : (
                <div className="w-full bg-slate-100/80 rounded-full h-12 flex items-center justify-center space-x-3 border border-slate-200">
                  <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-bold text-slate-500">正在生成微信/支付宝安全二维码...</p>
                </div>
              )}
            </form>
          ) : (
            /* Mock QR Code Payment Interface */
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="max-w-[200px] mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-inner">
                {/* Visual Fake QR Code */}
                <div className="w-full aspect-square bg-white rounded-lg p-2 flex flex-col justify-between relative overflow-hidden group border border-slate-100 shadow">
                  <div className="w-full h-full border border-dashed border-slate-200/80 flex flex-col justify-between p-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 border-4 border-slate-900 bg-slate-900" />
                      <div className="w-6 h-6 border-4 border-slate-900 bg-slate-900" />
                    </div>
                    <div className="w-4 h-4 bg-emerald-600 rounded-full mx-auto" />
                    <div className="flex justify-between items-end">
                      <div className="w-6 h-6 border-4 border-slate-900 bg-slate-900" />
                      <div className="w-4 h-4 border border-slate-400" />
                    </div>
                  </div>
                  {/* Mock scanner line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 animate-bounce" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800">
                  请使用 微信 或 支付宝 扫码
                </h4>
                <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  爱心捐赠金额: ¥{activeAmount}
                </p>
                <p className="text-[10px] text-slate-400 pt-2 leading-relaxed max-w-xs mx-auto">
                  扫码付款成功后，页面将自动升级您的爱心会籍并向邮箱/短信下发官方电子书证。
                </p>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => {
                    // Simulate payment success callback
                    setIsPaying(true);
                    setTimeout(() => {
                      setIsPaying(false);
                      setPaymentDone(false);
                      alert(`感谢您的捐赠！我们已在下方的爱心功德簿中记录您的善举。愿健康与您一路随行。`);
                    }, 1200);
                  }}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow transition-all cursor-pointer"
                >
                  我已扫码支付成功
                </button>
                <button
                  onClick={resetPayment}
                  className="px-6 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-full transition-all cursor-pointer"
                >
                  取消/重新选择
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Pledge Wall & Transparency Breakdown */}
        <div className="lg:col-span-5 space-y-8">
          {/* Recent Pledges Feed */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest border-l-2 border-emerald-600 pl-2">
              爱心功德簿 ｜ 滚动见证
            </h3>
            
            <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
              {pledges.map((pledge) => (
                <div key={pledge.id} className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-1.5 animate-fade-in text-[11px]">
                  <div className="flex justify-between items-center text-slate-400 font-medium">
                    <span className="font-bold text-slate-700">{pledge.donor}</span>
                    <span className="font-semibold text-emerald-700 font-mono">¥{pledge.amount}</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed font-light bg-slate-50/50 p-2 rounded-lg border border-slate-100/50">
                    “{pledge.msg}”
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono text-right">{pledge.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Breakdown */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-6 text-white space-y-5 shadow-lg">
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-emerald-300">
                善款使用流向及百分比
              </h3>
              <p className="text-[10px] text-emerald-100/60 font-light mt-0.5">XtraCARE学术监督委员会全程严审</p>
            </div>

            <div className="space-y-3.5">
              {[
                { name: "患者随访系统维护 & 免费AI算力租用", pct: 40, color: "bg-emerald-400" },
                { name: "贫困及晚期病友绿色临床前筛查与资料核对补贴", pct: 35, color: "bg-teal-400" },
                { name: "胰腺专属名医多学科义诊沙龙及宣教物料印制", pct: 15, color: "bg-emerald-300" },
                { name: "服务器日常维护托管与短信网关费用", pct: 10, color: "bg-slate-300" }
              ].map((item, index) => (
                <div key={index} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium text-[11px]">
                    <span className="text-emerald-100/90 leading-tight pr-4">{item.name}</span>
                    <span className="font-bold shrink-0">{item.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

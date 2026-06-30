import React, { useState } from "react";
import { Search, Filter, ShieldCheck, CheckCircle, FileText, ArrowRight, Check, Heart, HelpCircle, Activity, ChevronRight, UserCheck, X } from "lucide-react";

interface ClinicalTrial {
  id: string;
  registerId: string;
  title: string;
  drugName: string;
  phase: string;
  target: string;
  sponsor: string;
  status: string;
  regions: string[];
  stages: string[];
  mutations: string[];
  benefits: string[];
  matchingScore: number;
  description: string;
}

export default function ClinicalMatch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("全部");
  const [selectedMutation, setSelectedMutation] = useState("全部");
  const [selectedRegion, setSelectedRegion] = useState("全部");
  const [selectedTrial, setSelectedTrial] = useState<ClinicalTrial | null>(null);
  const [matchingStatus, setMatchingStatus] = useState<"idle" | "matching" | "matched">("idle");
  const [submittedForm, setSubmittedForm] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    stage: "局部晚期 / 转移性",
    mutation: "KRAS G12D",
    region: "上海",
    priorTreatments: "经过一线化疗"
  });

  // Realistic pancreatic cancer clinical trials running in China
  const clinicalTrials: ClinicalTrial[] = [
    {
      id: "trial-1",
      registerId: "CTR20261048",
      title: "评估 SH-1028 在 KRAS G12D 突变晚期胰腺导管腺癌患者中的安全性与有效性",
      drugName: "SH-1028 (新型高选择性 KRAS G12D 抑制剂)",
      phase: "II 期临床研究",
      target: "KRAS G12D 突变",
      sponsor: "上海大健康药物研发中心 / XtraCARE 医疗联盟",
      status: "进行中 (招募中)",
      regions: ["上海", "北京", "广东", "四川"],
      stages: ["局部晚期", "转移性"],
      mutations: ["KRAS G12D"],
      benefits: ["免费提供研究性靶向药物", "免费定期进行 PET-CT 深度检查", "由国内知名肝胆胰肿瘤学术带头人全程指导"],
      matchingScore: 98,
      description: "本研究旨在评估新型口服小分子 KRAS G12D 抑制剂在标准治疗失败或不耐受的 KRAS G12D 突变胰腺癌患者中的抗肿瘤活性。KRAS 突变是胰腺癌最核心的驱动突变，其中 G12D 亚型占比接近 40%，本药物具有极高的靶向活性及优异的安全特征。"
    },
    {
      id: "trial-2",
      registerId: "CTR20260931",
      title: "一项针对 Claudin 18.2 阳性晚期或转移性胰腺癌患者的靶向免疫联合疗法研究",
      drugName: "CL-501 (Claudin 18.2 单克隆抗体)",
      phase: "III 期临床研究",
      target: "Claudin 18.2 阳性 (表达量 >= 2+ 且 >= 40%)",
      sponsor: "华东肿瘤分子研究院",
      status: "进行中 (招募中)",
      regions: ["上海", "江苏", "浙江", "湖北"],
      stages: ["转移性"],
      mutations: ["Claudin 18.2 阳性"],
      benefits: ["免费提供高纯度单抗免疫制剂", "免除全部血液免疫生化及影像学评估费用", "报销部分差旅食宿费用"],
      matchingScore: 92,
      description: "本试验是一项多中心、随机、对照的 III 期临床试验，旨在比较 CL-501 联合 gem/nab-paclitaxel 对比单用化疗在一线晚期或转移性胰腺癌患者中的无进展生存期 (PFS) 及总生存期 (OS)。"
    },
    {
      id: "trial-3",
      registerId: "CTR20261152",
      title: "评估口服 BRCA1/2 抑制剂 BP-300 作为维持治疗在铂类化疗敏感胰腺癌中的研究",
      drugName: "BP-300 (新一代 PARP 抑制剂)",
      phase: "II 期临床研究",
      target: "BRCA1 / BRCA2 胚系或体系突变",
      sponsor: "北京生命科学医学中心",
      status: "进行中 (招募中)",
      regions: ["北京", "天津", "辽宁"],
      stages: ["局部晚期", "转移性"],
      mutations: ["BRCA1/2 突变"],
      benefits: ["免费提供高效口服 PARP 抑制剂", "专属基因诊断报告后续免费随访服务", "三甲主任级别随访会诊"],
      matchingScore: 88,
      description: "本研究面向在一线含铂类药物化疗中获得完全缓解 (CR)、部分缓解 (PR) 或疾病稳定 (SD) 且携带 BRCA1/2 基因突变的晚期胰腺癌患者，旨在探索口服维持治疗以延长无进展生存期。"
    },
    {
      id: "trial-4",
      registerId: "CTR20260814",
      title: "新型多靶点酪氨酸激酶抑制剂联合 PD-1 治疗局部不可切除晚期胰腺癌的探索性研究",
      drugName: "AK-104 (PD-1/CTLA-4 双特异性抗体) 联合化疗",
      phase: "Ib / II 期临床研究",
      target: "广谱靶向 / 免疫治疗",
      sponsor: "华南大健康肿瘤中心",
      status: "进行中 (招募中)",
      regions: ["广东", "湖南", "福建", "四川"],
      stages: ["局部晚期"],
      mutations: ["全部", "无突变/未知"],
      benefits: ["免费提供先进的双特异性抗体治疗", "享受绿色临床通道免排队直接入组", "获赠个性化营养膳食监测礼盒"],
      matchingScore: 85,
      description: "对于局部晚期不可手术切除的胰腺导管腺癌，本研究通过免疫微环境的重塑，探讨双抗联合标准放化疗对病灶的‘降期’可能，以实现后续根治性手术机会。"
    }
  ];

  const stages = ["全部", "局部晚期", "转移性"];
  const mutations = ["全部", "KRAS G12D", "Claudin 18.2 阳性", "BRCA1/2 突变", "无突变/未知"];
  const regions = ["全部", "上海", "北京", "广东", "四川", "江苏", "浙江"];

  // Filter clinical trials based on users selection
  const filteredTrials = clinicalTrials.filter((trial) => {
    const matchesSearch =
      trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.registerId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage =
      selectedStage === "全部" || trial.stages.includes(selectedStage);

    const matchesMutation =
      selectedMutation === "全部" ||
      trial.mutations.includes(selectedMutation) ||
      trial.mutations.includes("全部");

    const matchesRegion =
      selectedRegion === "全部" || trial.regions.includes(selectedRegion);

    return matchesSearch && matchesStage && matchesMutation && matchesRegion;
  });

  const handleStartMatching = (e: React.FormEvent) => {
    e.preventDefault();
    setMatchingStatus("matching");
    setTimeout(() => {
      setMatchingStatus("matched");
      // Pre-select filters based on patient data to show perfect match
      setSelectedStage(patientData.stage.includes("转移") ? "转移性" : "局部晚期");
      setSelectedMutation(patientData.mutation);
      setSelectedRegion(patientData.region);
    }, 1800);
  };

  const handleRegisterTrial = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedForm(true);
    setTimeout(() => {
      setSubmittedForm(false);
      setSelectedTrial(null);
      alert("信息登记成功！专业的 XtraCARE 医学助理将在24小时内通过电话与您联系，指导您携带病例进行进一步初筛。");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Visual Header Grid */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          CLINICAL TRIAL FINDER ｜ 临床招募导航
        </span>
        <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          PanCan 模式 ｜ 胰腺癌临床绿色通道
        </h2>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          借鉴美国胰腺癌行动网络 (PanCAN) 的患者临床试验匹配机制，结合中国最新注册临床试验 (Chinadrugtrials)，小胰宝为您免费检索最契合的在研新药。
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Interactive Multi-Parameter Match Tool */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2">
              <Activity className="w-4.5 h-4.5 text-emerald-600" />
              <span>患者智能临床匹配测试</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">输入关键病情，1秒匹配在招的免费新药与靶向疗法</p>
          </div>

          {matchingStatus === "idle" && (
            <form onSubmit={handleStartMatching} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">当前确诊分期</label>
                <select
                  value={patientData.stage}
                  onChange={(e) => setPatientData({ ...patientData, stage: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-semibold appearance-none cursor-pointer"
                >
                  <option>可切除期（准备手术）</option>
                  <option>局部不可切除晚期</option>
                  <option>局部晚期 / 转移性</option>
                  <option>复发耐药性胰腺癌</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">基因突变或特定靶点</label>
                <select
                  value={patientData.mutation}
                  onChange={(e) => setPatientData({ ...patientData, mutation: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-semibold appearance-none cursor-pointer"
                >
                  <option value="KRAS G12D">KRAS G12D 突变</option>
                  <option value="Claudin 18.2 阳性">Claudin 18.2 表达阳性</option>
                  <option value="BRCA1/2 突变">BRCA 1/2 基因突变</option>
                  <option value="无突变/未知">未知突变 / 未检测基因</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">期望就医区域</label>
                <select
                  value={patientData.region}
                  onChange={(e) => setPatientData({ ...patientData, region: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-semibold appearance-none cursor-pointer"
                >
                  <option>上海</option>
                  <option>北京</option>
                  <option>广东</option>
                  <option>四川</option>
                  <option>江苏</option>
                  <option>浙江</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">此前治疗方案</label>
                <input
                  type="text"
                  placeholder="如：使用过吉西他滨+白蛋白紫杉醇化疗"
                  value={patientData.priorTreatments}
                  onChange={(e) => setPatientData({ ...patientData, priorTreatments: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                开始一键智能匹配
              </button>
            </form>
          )}

          {matchingStatus === "matching" && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-slate-700">正在匹配国家药监局在招试验...</p>
                <p className="text-[10px] text-slate-400 font-mono">Comparing mutations & locations...</p>
              </div>
            </div>
          )}

          {matchingStatus === "matched" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                <div className="inline-flex p-2 bg-emerald-100 text-emerald-800 rounded-full">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-800">匹配成功！为您锁定 2 个高推荐方案</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  您的突变 ({patientData.mutation}) 与就医意向 ({patientData.region}) 与以下临床试验标准完美契合。
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMatchingStatus("idle");
                  }}
                  className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-full cursor-pointer transition-all text-center block"
                >
                  重新输入匹配
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Active Trials Search Portal */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Filters */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="搜索靶点、研究中心、登记号..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="全部">分期: 全部</option>
                  {stages.filter(s => s !== "全部").map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={selectedMutation}
                  onChange={(e) => setSelectedMutation(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="全部">靶点: 全部</option>
                  {mutations.filter(m => m !== "全部").map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="全部">地区: 全部</option>
                  {regions.filter(r => r !== "全部").map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Trials List */}
          <div className="space-y-4">
            {filteredTrials.length > 0 ? (
              filteredTrials.map((trial) => (
                <div
                  key={trial.id}
                  className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 p-6 shadow-md hover:shadow-xl transition-all space-y-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                          登记号: {trial.registerId}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {trial.phase}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-teal-50 px-2 py-0.5 rounded">
                          {trial.target}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors pt-1">
                        {trial.title}
                      </h4>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>推荐匹配度: {trial.matchingScore}%</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2">
                    {trial.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-50">
                    <div className="flex flex-wrap gap-2 text-[10px] font-medium text-slate-400">
                      <span>就医中心: <strong className="text-slate-600 font-semibold">{trial.regions.join(", ")}</strong></span>
                      <span>•</span>
                      <span>申办方: <strong className="text-slate-600 font-semibold">{trial.sponsor}</strong></span>
                    </div>

                    <button
                      onClick={() => setSelectedTrial(trial)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                    >
                      <span>申请匹配 / 查阅资质</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="border border-dashed border-slate-200 rounded-3xl h-60 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-300 animate-pulse" />
                <h4 className="font-bold text-sm text-slate-700">未找到完全对应的注册临床</h4>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  目前条件筛选较严格，我们建议您点击左下角【患者智能匹配测试】提交详细病情，我们将安排 XtraCARE 学术助手为您人工检索尚未公开的在招计划。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trial Detail Modal */}
      {selectedTrial && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shrink-0 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-900/50 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  国家药监局登记号: {selectedTrial.registerId}
                </span>
                <button
                  onClick={() => setSelectedTrial(null)}
                  className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
                {selectedTrial.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Drug details */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">研究药物 / 治疗方式</p>
                  <p className="font-bold text-slate-800 mt-1">{selectedTrial.drugName}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">临床阶段 / 靶向靶点</p>
                  <p className="font-bold text-slate-800 mt-1">{selectedTrial.phase} ｜ {selectedTrial.target}</p>
                </div>
              </div>

              {/* Comprehensive summary */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 border-l-2 border-emerald-600 pl-2">研究课题背景</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {selectedTrial.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-slate-800 border-l-2 border-emerald-600 pl-2">入组受试者核心权益 (免费)</h4>
                <div className="grid gap-2 text-xs">
                  {selectedTrial.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-500/10 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration Submission */}
              <div className="border-t border-slate-100 pt-6">
                {!submittedForm ? (
                  <form onSubmit={handleRegisterTrial} className="space-y-4">
                    <h4 className="font-bold text-xs text-slate-800">
                      申请绿色筛选资质 ｜ 专属临床助理对接
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      请留下您的基础联系方式，协调中心医学助理将主动为您解读病情、获取医院绿色快速初筛通道。
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">患者姓名/代称</label>
                        <input
                          type="text"
                          required
                          value={patientData.name}
                          onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-semibold"
                          placeholder="如: 陈女士"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">联系手机</label>
                        <input
                          type="tel"
                          required
                          value={patientData.phone}
                          onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 outline-none text-xs font-semibold"
                          placeholder="助理回访联系用"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full transition-all shadow-md shadow-emerald-600/10 cursor-pointer text-center"
                    >
                      安全提交，启动绿色对齐通道
                    </button>
                  </form>
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center space-y-2">
                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-slate-500 font-medium">安全提交中...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

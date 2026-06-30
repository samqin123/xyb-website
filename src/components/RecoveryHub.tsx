import React, { useState } from "react";
import { ShieldAlert, Info, Calculator, FileText, CheckCircle2, RotateCcw, HelpCircle, Activity, Salad, ChevronRight, Apple } from "lucide-react";
import { SymptomQuestion, NutritionResult } from "../types";

export default function RecoveryHub() {
  const [activeSubTab, setActiveSubTab] = useState<"screener" | "pert">("screener");

  // --- RISK SCREENER STATE ---
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [screenerCompleted, setScreenerCompleted] = useState(false);

  // --- NUTRITION CALCULATOR STATE ---
  const [weight, setWeight] = useState<number>(60);
  const [activity, setActivity] = useState<"sedentary" | "moderate" | "active">("moderate");
  const [mealType, setMealType] = useState<"standard" | "snack" | "highfat">("standard");
  const [nutritionResult, setNutritionResult] = useState<NutritionResult | null>(null);

  const symptomQuestions: SymptomQuestion[] = [
    {
      id: "jaundice",
      text: "1. 巩膜（眼白）或皮肤是否有发黄迹象，同时伴有尿液呈浓茶色或大便颜色变浅（陶土色）？",
      category: "primary",
      options: [
        { label: "是，症状明显", points: 15 },
        { label: "偶尔，有轻微疑似", points: 8 },
        { label: "否，完全没有", points: 0 }
      ]
    },
    {
      id: "pain",
      text: "2. 是否有上腹部（心窝下方）隐痛、胀痛，并向中背部放射，且在平卧时加重、身体前倾时稍有缓解？",
      category: "primary",
      options: [
        { label: "经常出现，疼痛明显", points: 10 },
        { label: "偶尔有轻度胀痛", points: 4 },
        { label: "否，完全没有", points: 0 }
      ]
    },
    {
      id: "weight",
      text: "3. 过去半年内，在没有刻意节食或运动减肥的情况下，体重是否出现不明原因的骤降（如减少超过10%）？",
      category: "primary",
      options: [
        { label: "是，体重下降极为显著（超过10%）", points: 12 },
        { label: "有轻微下降（3% - 10%）", points: 6 },
        { label: "否，体重保持稳定", points: 0 }
      ]
    },
    {
      id: "diabetes",
      text: "4. 近期（1-2年内）是否新确诊糖尿病，或者作为长期糖尿病患者，原本稳定的血糖近期突然无诱因急剧恶化？",
      category: "secondary",
      options: [
        { label: "是，新发糖尿病且血糖极难控制", points: 8 },
        { label: "是长期糖尿病，血糖近期波动增大", points: 4 },
        { label: "否，血糖一切正常", points: 0 }
      ]
    },
    {
      id: "history",
      text: "5. 是否有慢性胰腺炎病史，或直系亲属中（父母、兄弟姐妹）有确诊胰腺癌、乳腺癌等家族遗传性肿瘤史？",
      category: "risk_factor",
      options: [
        { label: "有明确家族史 或 慢性胰腺炎病史", points: 8 },
        { label: "不清楚家族遗传史", points: 2 },
        { label: "否，无相关病史与家族史", points: 0 }
      ]
    }
  ];

  // Handle Screener Answer selection
  const handleAnswerSelection = (points: number) => {
    const questionId = symptomQuestions[currentQuestionIdx].id;
    setAnswers({ ...answers, [questionId]: points });

    if (currentQuestionIdx < symptomQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setScreenerCompleted(true);
    }
  };

  const resetScreener = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setScreenerCompleted(false);
  };

  const getScreenerScore = (): number => {
    return (Object.values(answers) as number[]).reduce((sum: number, curr: number) => sum + curr, 0);
  };

  const getScreenerEvaluation = (score: number) => {
    if (score >= 25) {
      return {
        level: "高危预警 (High Risk Alert)",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        icon: <ShieldAlert className="w-8 h-8 text-rose-500 animate-bounce" />,
        desc: "您有多个与胰腺病变高度吻合的核心指征（特别是黄疸、显著腹背痛、以及消瘦）。",
        action: "强烈建议：请立即前往大型三甲医院的【肝胆胰外科】或【肿瘤科】进行胰腺增强CT、MRI或超声内镜检查。胰腺疾病进展极快，切勿拖延。小胰宝提供专属的一对一绿通就医指导。"
      };
    } else if (score >= 12) {
      return {
        level: "中度风险 (Moderate Concern)",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        icon: <Info className="w-8 h-8 text-amber-500" />,
        desc: "您目前伴随某些胰腺健康早期预警信号（如血糖波动、轻度腹痛或不明消瘦）。",
        action: "建议：前往医院进行血液淀粉酶、脂肪酶以及肿瘤标志物（CA19-9、CEA）筛查，并进行腹部超声检查。小胰宝建议您保持日常饮食记录并配合随访。"
      };
    } else {
      return {
        level: "低风险 / 日常随访 (Routine Tracking)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
        desc: "您目前的症状与典型的胰腺癌前驱特征无明显关联。",
        action: "建议：保持健康的生活方式，避免长期高脂肪膳食与重度抽烟饮酒。小胰宝支持日常健康饮食自评，每年定期体检。若出现任何消化异常症状，请及时咨询。"
      };
    }
  };

  // --- NUTRITION CALCULATIONS ---
  const handleCalculateNutrition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || weight <= 0) return;

    // ESPEN Guidelines for cancer patients: 30-35 kcal/kg, 1.2-1.5g protein/kg
    const baseCal = activity === "sedentary" ? 30 : activity === "moderate" ? 33 : 35;
    const dailyCalories = Math.round(weight * baseCal);
    
    const baseProt = activity === "sedentary" ? 1.2 : activity === "moderate" ? 1.35 : 1.5;
    const dailyProtein = Math.round(weight * baseProt);

    // Pancreatic Enzyme Replacement Therapy (PERT) general dosage:
    // 40,000 - 75,000 USP Lipase per main meal, 20,000 - 36,000 per snack
    // Adjust based on weight and standard meals
    let minMealEnzyme = 40000;
    let maxMealEnzyme = 75000;
    let minSnackEnzyme = 20000;
    let maxSnackEnzyme = 36000;

    if (weight < 50) {
      minMealEnzyme = 25000;
      maxMealEnzyme = 50000;
      minSnackEnzyme = 15000;
      maxSnackEnzyme = 25000;
    } else if (weight > 75) {
      minMealEnzyme = 50000;
      maxMealEnzyme = 90000;
      minSnackEnzyme = 25000;
      maxSnackEnzyme = 45000;
    }

    // High fat increases enzyme demand
    if (mealType === "highfat") {
      minMealEnzyme = Math.round(minMealEnzyme * 1.5);
      maxMealEnzyme = Math.round(maxMealEnzyme * 1.5);
    }

    const tips = [
      "【分餐制】采取少食多餐原则，每日安排5-6餐，减轻受损胰腺的消化负担。",
      "【服酶时间】胰酶制剂（如得每通）必须随餐服用。可在吃第一口食物时服下一半，餐中服下另一半，切勿空腹或饭后半小时服用。",
      "【避免高膳食纤维】虽然一般膳食提倡高纤维，但胰腺外分泌不足的患者应减少粗粮、韭菜等，因为过量膳食纤维会吸附消化酶，降低药效。",
      "【油脂选择】推荐使用中链甘油三酯（MCT油）作为主要烹调油，其不依赖胰酶即可被肠道直接吸收。"
    ];

    setNutritionResult({
      dailyCalories,
      dailyProtein,
      minEnzymesPerMainMeal: minMealEnzyme,
      maxEnzymesPerMainMeal: maxMealEnzyme,
      minEnzymesPerSnack: minSnackEnzyme,
      maxEnzymesPerSnack: maxSnackEnzyme,
      dietTips: tips
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-emerald-50 p-1.5 rounded-full border border-emerald-100/80">
          <button
            id="subtab-screener"
            onClick={() => setActiveSubTab("screener")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeSubTab === "screener"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/50"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>早期症状与风险评估</span>
          </button>
          
          <button
            id="subtab-pert"
            onClick={() => setActiveSubTab("pert")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeSubTab === "pert"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/50"
            }`}
          >
            <Salad className="w-4 h-4" />
            <span>膳食胰酶剂量计算 (PERT)</span>
          </button>
        </div>
      </div>

      {/* --- CONTENT 1: RISK SCREENER --- */}
      {activeSubTab === "screener" && (
        <div className="max-w-3xl mx-auto">
          {!screenerCompleted ? (
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden">
              {/* Progress bar */}
              <div className="bg-emerald-50 h-2 w-full">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / symptomQuestions.length) * 100}%` }}
                />
              </div>

              <div className="p-8 sm:p-10 space-y-8">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                      <FileText className="w-5 h-5" />
                    </span>
                    <span className="font-display font-bold text-lg text-slate-800">胰腺癌警示症状自评</span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                    第 {currentQuestionIdx + 1} / {symptomQuestions.length} 题
                  </span>
                </div>

                {/* Question */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {symptomQuestions[currentQuestionIdx].text}
                  </h3>
                  
                  {/* Category description */}
                  {symptomQuestions[currentQuestionIdx].category === "primary" && (
                    <span className="inline-block text-[11px] font-bold bg-rose-50 text-rose-600 px-3 py-1 rounded-full">
                      核心症状 (Primary Symptom) - 临床高相关
                    </span>
                  )}
                  {symptomQuestions[currentQuestionIdx].category === "secondary" && (
                    <span className="inline-block text-[11px] font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                      伴随指征 (Secondary Symptom) - 新发/特异
                    </span>
                  )}
                  {symptomQuestions[currentQuestionIdx].category === "risk_factor" && (
                    <span className="inline-block text-[11px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      危险因素 & 家族史 (Risk & Family History)
                    </span>
                  )}
                </div>

                {/* Options list */}
                <div className="space-y-3 pt-2">
                  {symptomQuestions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      id={`screener-opt-${idx}`}
                      onClick={() => handleAnswerSelection(option.points)}
                      className="w-full text-left px-5 py-4 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-full text-sm font-medium text-slate-700 hover:text-emerald-950 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <span>{option.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Info Card */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-500 flex items-start space-x-2.5">
                  <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed">
                    本自测系统依据《中国胰腺癌诊疗指南》建立。主要评估是否存在可能与胰腺占位性病变相关的早期消化道或全身表现，不具备临床诊断效力。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* SCREENER COMPLETED - SHOW RESULTS */
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden p-8 sm:p-10 space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-emerald-600 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">自测评估已完成</h2>
                <p className="text-xs text-slate-400">评估得分: <span className="font-mono font-bold text-emerald-600 text-sm">{getScreenerScore()} / 53</span></p>
              </div>

              {/* Evaluation Card */}
              {(() => {
                const evalInfo = getScreenerEvaluation(getScreenerScore());
                return (
                  <div className={`p-6 sm:p-8 rounded-3xl border ${evalInfo.color} space-y-4`}>
                    <div className="flex items-center space-x-3.5">
                      {evalInfo.icon}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">风险分级</p>
                        <h4 className="font-bold text-lg sm:text-xl text-slate-950">{evalInfo.level}</h4>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-800 leading-relaxed border-t border-slate-200/50 pt-3">
                      {evalInfo.desc}
                    </p>
                    
                    <p className="text-sm font-semibold text-slate-950 bg-white/70 p-4 rounded-2xl border border-white leading-relaxed">
                      {evalInfo.action}
                    </p>
                  </div>
                );
              })()}

              {/* Follow up CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="screener-reset-btn"
                  onClick={resetScreener}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-full transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>重新测试</span>
                </button>
                <a
                  href="http://www.xiaoyibao.com.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/10 transition-all"
                >
                  <span>立即咨询小胰宝医学绿通助手</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- CONTENT 2: PERT CALCULATOR --- */}
      {activeSubTab === "pert" && (
        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Input Form Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-emerald-100 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-lg text-slate-800">患者临床营养输入</h3>
            </div>

            <form onSubmit={handleCalculateNutrition} className="space-y-5">
              {/* Weight input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  患者当前体重 (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-semibold"
                    required
                  />
                  <span className="absolute right-5 top-3.5 text-xs text-slate-400 font-semibold">KG</span>
                </div>
                <p className="text-[10px] text-slate-400">体重变化是胰腺外分泌功能的重要指标。</p>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  患者日常体力活动量
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "sedentary", label: "卧床或轻微" },
                    { id: "moderate", label: "日常自理/散步" },
                    { id: "active", label: "正常体力活动" }
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setActivity(act.id as any)}
                      className={`py-2 px-3 border rounded-full text-xs font-medium transition-all cursor-pointer ${
                        activity === act.id
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  拟摄入膳食类型 (脂质含量)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "普通正餐" },
                    { id: "snack", label: "点心/加餐" },
                    { id: "highfat", label: "高脂大餐" }
                  ].map((meal) => (
                    <button
                      key={meal.id}
                      type="button"
                      onClick={() => setMealType(meal.id as any)}
                      className={`py-2 px-3 border rounded-full text-xs font-medium transition-all cursor-pointer ${
                        mealType === meal.id
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {meal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                id="pert-calc-btn"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-full shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                开始生成科学膳食与用酶建议
              </button>
            </form>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-7 space-y-6">
            {nutritionResult ? (
              <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
                  <Apple className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-display font-bold text-lg text-slate-800">个性化营养与胰酶处方参考</h3>
                </div>

                {/* Main Metrics block */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-2xl text-center space-y-1">
                    <p className="text-xs text-slate-500">每日热量推荐上限</p>
                    <p className="font-display font-bold text-2xl text-emerald-700">{nutritionResult.dailyCalories} <span className="text-xs font-sans font-medium">千卡 (kcal)</span></p>
                    <p className="text-[10px] text-slate-400">基于 30-35 kcal/kg 标准</p>
                  </div>
                  
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-2xl text-center space-y-1">
                    <p className="text-xs text-slate-500">每日优质蛋白质需求</p>
                    <p className="font-display font-bold text-2xl text-emerald-700">{nutritionResult.dailyProtein} <span className="text-xs font-sans font-medium">克 (g)</span></p>
                    <p className="text-[10px] text-slate-400">基于 1.2-1.5 g/kg 标准</p>
                  </div>
                </div>

                {/* Enzyme dosage advice */}
                <div className="p-5 bg-teal-50 border border-teal-200/60 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 px-2.5 bg-teal-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">Enzyme dosage</span>
                    <h4 className="font-bold text-sm text-teal-950">胰腺外分泌不足 (PEI) 推荐用酶量 (脂肪酶单位)</h4>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 border-t border-teal-100 pt-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-slate-600">正餐用量 (主食饭菜):</p>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        {nutritionResult.minEnzymesPerMainMeal.toLocaleString()} - {nutritionResult.maxEnzymesPerMainMeal.toLocaleString()} 单位 (U)
                      </p>
                      <p className="text-[10px] text-slate-400">相当于 1.5 - 3 粒得每通 25000U</p>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs text-slate-600">点心/加餐用量:</p>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        {nutritionResult.minEnzymesPerSnack.toLocaleString()} - {nutritionResult.maxEnzymesPerSnack.toLocaleString()} 单位 (U)
                      </p>
                      <p className="text-[10px] text-slate-400">相当于 1 粒得每通 10000U - 25000U</p>
                    </div>
                  </div>
                </div>

                {/* Diet Tips */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">临床核心康复提示:</h4>
                  <ul className="space-y-2">
                    {nutritionResult.dietTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-slate-700 leading-relaxed flex items-start space-x-2">
                        <span className="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center justify-center space-y-3">
                <Salad className="w-12 h-12 text-slate-300" />
                <h4 className="font-bold text-slate-700">暂无计算结果</h4>
                <p className="text-xs text-slate-400 max-w-sm">请在左侧表单输入患者体重及日常活动、餐食类型，点击按钮即可为您一键测算符合临床膳食规范的热量与胰酶参考剂量。</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

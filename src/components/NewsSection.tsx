import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, User, Tag, Search, ArrowRight, X, Loader2, Link2, Globe } from "lucide-react";
import { NewsArticle } from "../types";

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Fetch news from our robust backend API
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else {
          throw new Error("Failed to load news");
        }
      } catch (error) {
        console.error("Error loading news, using static fallback", error);
        // Robust fallback data in case of unexpected network failure
        setNews([
          {
            id: "1",
            title: "小胰宝社区 (PancrePal) 数字化患者关怀平台正式上线",
            summary: "作为 XtraCARE 联盟的核心成员，小胰宝 (www.xiaoyibao.com.cn) 致力于为中国胰腺癌患者提供一站式全生命周期管理，涵盖智能症状监控、个性化营养膳食及权威临床试验导航服务。",
            date: "2026-06-25",
            author: "小胰宝健康联盟",
            category: "社区动态",
            image: "https://picsum.photos/seed/xiaoyibao-news1/800/600",
            content: "小胰宝社区 (PancrePal) 作为国内首家专注于胰腺癌垂直领域的数字化关怀社区，由 XtraCARE 医疗关怀联盟倾力打造。官方平台 (www.xiaoyibao.com.cn) 整合了国内外前沿医学资源与数字化AI随访系统，旨在解决胰腺癌患者‘发现晚、进展快、营养差、治疗繁’的痛点。通过‘小胰宝’小程序和网页端，患者可获取每日个性化胰酶补充计算、智能症状自评，并获得专属医学助手的全天候指导。这一平台的上线，标志着我国胰腺癌慢病化、数字化管理迈出了关键一步。"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const categories = ["全部", "社区动态", "科研临床", "患者指南", "关爱公益"];

  // Filter logic
  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "全部" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Search & Category Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <h2 className="font-display font-bold text-3xl text-slate-900 flex items-center space-x-2">
            <span className="p-1.5 bg-emerald-50 rounded-xl text-emerald-600">
              <BookOpen className="w-6 h-6" />
            </span>
            <span>关爱前沿 & 新闻内容</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">关注小胰宝 (xiaoyibao.com.cn) 动态与胰腺健康科普</p>
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="搜索文章、新药、临床试验..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-medium transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid content list */}
      {loading ? (
        <div className="h-60 flex flex-col items-center justify-center space-y-2">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-xs text-slate-400">正在从小胰宝服务器加载最新资讯...</p>
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 shadow-lg hover:shadow-2xl hover:shadow-emerald-600/5 transition-all overflow-hidden flex flex-col group"
            >
              {/* Image Banner wrapper */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-emerald-800 border border-emerald-100 rounded-full shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{article.author}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Read Full Article CTA */}
                <button
                  id={`read-article-${article.id}`}
                  onClick={() => setSelectedArticle(article)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-emerald-700 hover:text-emerald-900 pt-2 border-t border-slate-50 group/btn cursor-pointer"
                >
                  <span>阅读全文 / 临床指导</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-60 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-2 text-center p-6">
          <BookOpen className="w-10 h-10 text-slate-300" />
          <h4 className="font-bold text-slate-600 text-sm">未搜寻到匹配资讯</h4>
          <p className="text-xs text-slate-400">试试其他关键词，或者选择【全部】分类标签查看。</p>
        </div>
      )}

      {/* --- DETAIL MODAL --- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in border border-emerald-100">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              
              {/* Close Button */}
              <button
                id="close-modal-btn"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/40 hover:bg-slate-950/60 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & category on image overlay */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="px-3 py-1 bg-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Article Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100 font-medium">
                <span className="flex items-center space-x-1 bg-slate-50 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>发布时间: {selectedArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1 bg-slate-50 px-3 py-1 rounded-full">
                  <User className="w-4 h-4 text-emerald-500" />
                  <span>作者/来源: {selectedArticle.author}</span>
                </span>
                <span className="flex items-center space-x-1 bg-slate-50 px-3 py-1 rounded-full">
                  <Link2 className="w-4 h-4 text-emerald-500" />
                  <span>核心归属: XtraCARE</span>
                </span>
              </div>

              {/* Body Content */}
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap font-light space-y-4">
                {selectedArticle.content}
              </div>

              {/* External Link Callout Box */}
              <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wider flex items-center justify-center sm:justify-start space-x-1">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>访问小胰宝官网获取更多服务</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    一站式登记临床试验、获取胰酶代购咨询与专业医学随访
                  </p>
                </div>
                <a
                  href="http://www.xiaoyibao.com.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-full transition-all text-center shadow-md shadow-emerald-600/10"
                >
                  进入官方网站 www.xiaoyibao.com.cn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, MessageSquare, RefreshCw, AlertCircle, Globe, HelpCircle, 
  Check, Loader2, X, Paperclip, Download, Share2, Clipboard, ArrowRight,
  ChevronDown, BookOpen, ChevronRight, Minimize2, FileText, Trash2, CheckCircle, Info
} from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface FloatingAiBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  activeTab: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: string;
}

export default function FloatingAiBot({ isOpen, onClose, onOpen, activeTab }: FloatingAiBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "您好！我是小胰宝社区 (PancrePal) 的智能AI康复顾问。作为 XtraCARE 联盟的一员，我接受过专业的胰腺健康、营养膳食（如胰酶替代疗法 PERT）和临床试验招募知识培训。\n\n我可以帮您解答关于胰腺癌症状、术后饮食、专家绿色通道以及临床前沿新药的疑问。请问有什么我可以帮您的？",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [currentThinkingSteps, setCurrentThinkingSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.5-flash");
  const [sendPageContext, setSendPageContext] = useState(true);
  
  // Attachments State
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    dataUrl: string;
  } | null>(null);
  
  // Chat History / Saved Sessions
  const [savedSessions, setSavedSessions] = useState<ChatSession[]>([]);
  const [showSessionsMenu, setShowSessionsMenu] = useState(false);
  
  // Share Card state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareText, setShareText] = useState("");
  const [copied, setCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Translate tab ID to a friendly Chinese name for Context Display
  const getTabFriendlyName = (tab: string) => {
    switch (tab) {
      case "home": return "首页 / 康复支柱";
      case "clinical": return "临床试验一键匹配";
      case "recovery": return "康复自测 & 膳食计算器";
      case "navigation": return "患者全景关爱导航图";
      case "donate": return "爱心捐赠与社会公益";
      case "news": return "最新科普与社区动态";
      case "about": return "关于小胰宝与 XtraCARE";
      default: return "小胰宝社区";
    }
  };

  const currentContextName = getTabFriendlyName(activeTab);

  const steps = [
    "正在查阅最新胰腺癌临床指南...",
    "正在整合 XtraCARE 专家数据库...",
    "正在通过 Google 检索相关科研成果...",
    "正在分析最适合患者的营养与膳食建议...",
    "正在生成专业回复，请稍候..."
  ];

  // Load saved sessions on mount
  useEffect(() => {
    const cached = localStorage.getItem("pancrepal_chat_sessions");
    if (cached) {
      try {
        setSavedSessions(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to load saved chat sessions", e);
      }
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const quickQuestions = [
    "胰腺癌早期有哪些核心警戒症状？",
    "什么是胰酶替代治疗(PERT)及如何合理服药？",
    "如何登记小胰宝(xiaoyibao.com.cn)新药临床试验？",
    "胰腺术后患者脂肪泻与消瘦该如何调理？"
  ];

  // File Upload Handlers
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("为了医疗辅助诊断，目前仅支持上传图片格式（如CT、血检报告截图、饮食照片等）");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("上传文件不能超过 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedFile({
          name: file.name,
          type: file.type,
          dataUrl: event.target.result as string
        });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value to allow uploading same file
    e.target.value = "";
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() && !selectedFile) return;

    const queryText = textToSend.trim();
    const currentAttachment = selectedFile;
    
    // Create User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: queryText || "发送了图片附件",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      // Optional fields for custom metadata
      ...(currentAttachment ? {
        attachment: {
          name: currentAttachment.name,
          url: currentAttachment.dataUrl
        }
      } : {})
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSelectedFile(null);
    setLoading(true);
    setError(null);
    setCurrentThinkingSteps([]);

    // Simulate real-time thinking step rotation
    let stepIdx = 0;
    setLoadingStep(steps[0]);
    setCurrentThinkingSteps([steps[0]]);
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
        setCurrentThinkingSteps(prev => [...prev, steps[stepIdx]]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    try {
      // Collect history
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Injected context if enabled
      let finalMessage = queryText;
      if (sendPageContext) {
        finalMessage = `【网页上下文提示：用户正在浏览小胰宝网站的「${currentContextName}」板块。如果合适，请结合此板块的内容进行解答，提供更精准的就医与康复指引。】\n\n用户问题：${queryText}`;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: finalMessage,
          history: history,
          model: selectedModel,
          attachment: currentAttachment ? {
            mimeType: currentAttachment.type,
            data: currentAttachment.dataUrl
          } : undefined
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error("与小胰宝服务器通信失败，请稍后重试。");
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        // Save the steps we went through
        thinkingSteps: [...currentThinkingSteps, "完成！整理出专业、科学且有同理心的诊断与调理意见。"]
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err.message || "请求失败，请稍后再试。");
      
      const fallbackMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "对不起，当前AI线路有些繁忙。由于胰腺健康需要高度精准的个性化医学指导，建议您直接访问我们的官方微信小程序、或访问 **小胰宝官方网站：[www.xiaoyibao.com.cn](http://www.xiaoyibao.com.cn)**。在那里您可以一键联系我们的临床护士和医学协调员，获得免费的一对一人工医学初筛与就医导航服务。",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingSteps: ["通信异常，自动执行安全保护与本地官方指引推荐。"]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "您好！我是小胰宝社区 (PancrePal) 的智能AI康复顾问。作为 XtraCARE 联盟的一员，我接受过专业的胰腺健康、营养膳食（如胰酶替代疗法 PERT）和临床试验招募知识培训。\n\n我可以帮您解答关于胰腺癌症状、术后饮食、专家绿色通道以及临床前沿新药 of 疑问。请问有什么我可以帮您的？",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setError(null);
    setSelectedFile(null);
  };

  // Save conversation to local storage history list
  const handleSaveSession = () => {
    if (messages.length <= 1) return;
    
    // Create a simple snippet of user's first message as title
    const firstUserMsg = messages.find(m => m.role === 'user')?.content || "未命名会话";
    const title = firstUserMsg.length > 18 ? firstUserMsg.slice(0, 18) + "..." : firstUserMsg;
    
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: title,
      messages: [...messages],
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newSession, ...savedSessions];
    setSavedSessions(updated);
    localStorage.setItem("pancrepal_chat_sessions", JSON.stringify(updated));
    alert("会话已成功保存到小胰宝本地历史！您可以通过顶部的“历史记录”随时查阅。");
  };

  const handleLoadSession = (session: ChatSession) => {
    setMessages(session.messages);
    setShowSessionsMenu(false);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedSessions.filter(s => s.id !== sessionId);
    setSavedSessions(updated);
    localStorage.setItem("pancrepal_chat_sessions", JSON.stringify(updated));
  };

  // Export as Markdown File
  const handleExportMarkdown = () => {
    let md = `# 小胰宝 AI 智能康复会话记录\n`;
    md += `*导出日期: ${new Date().toLocaleString()}*\n`;
    md += `*运行模型: ${selectedModel}*\n\n`;
    md += `---\n\n`;

    messages.forEach(m => {
      const roleName = m.role === 'user' ? '患者提问' : '小胰宝助理解答';
      md += `### 💬 [${m.timestamp}] ${roleName}\n`;
      md += `${m.content}\n\n`;
      if (m.sources && m.sources.length > 0) {
        md += `**引用医学文献与临床研究:**\n`;
        m.sources.forEach(s => {
          md += `- [${s.title}](${s.url})\n`;
        });
        md += `\n`;
      }
      md += `\n`;
    });

    md += `---\n`;
    md += `*免责声明：小胰宝智能助理提供学术支持与康复指南参考，不代表专业医生临床诊断。官方网站：www.xiaoyibao.com.cn*`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `xiaoyibao-chat-${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Share card popup
  const handleOpenShare = () => {
    // Generate text transcript for sharing
    const lastAssistantAnswer = [...messages].reverse().find(m => m.role === 'assistant' && m.id !== 'welcome');
    const contentToShare = lastAssistantAnswer 
      ? `【小胰宝 AI 康复助理智能解答】\n\n问：${messages.find(m => m.role === 'user')?.content || "咨询胰腺癌调理"}\n\n答：${lastAssistantAnswer.content.slice(0, 150)}...\n\n访问小胰宝专业社区获取完整版：www.xiaoyibao.com.cn`
      : `我在小胰宝社区 (www.xiaoyibao.com.cn) 体验了专业的胰腺癌 AI 康复助理，涵盖得每通/胰酶替代治疗 (PERT) 的精确剂量推荐、前沿临床招募匹配，诚挚推荐给大家！`;

    setShareText(contentToShare);
    setShowShareModal(true);
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. Persistent Floating Trigger Button with pulsing badge */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="global-floating-ai-trigger"
              onClick={onOpen}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-700/30 border border-emerald-500/20 cursor-pointer flex items-center justify-center"
            >
              <Sparkles className="w-6.5 h-6.5 animate-pulse" />
              
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white animate-bounce">
                1
              </span>
              
              {/* Ripple Ring Effect */}
              <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping pointer-events-none" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Floating Sliding Panel (takes right side half screen on Desktop, full screen on Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Backdrop on Mobile */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-xs md:bg-transparent pointer-events-auto"
              onClick={onClose}
            />

            <motion.div
              id="floating-ai-bot-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-full md:w-[480px] lg:w-[560px] xl:w-[640px] bg-white border-l border-emerald-100 shadow-2xl flex flex-col pointer-events-auto z-10"
            >
              {/* A. Bot Header */}
              <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-5 py-4 text-white shadow-md flex justify-between items-center relative">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center border border-white/20 animate-pulse">
                    <Sparkles className="w-5 h-5 text-emerald-100 fill-emerald-100/20" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-display font-bold text-sm tracking-tight">小胰宝 AI 智能助理</h3>
                      <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.2 bg-emerald-500/40 text-emerald-100 rounded-full">XtraCARE</span>
                    </div>
                    
                    {/* Model Selector Element */}
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="text-[9px] text-emerald-200">运行模型:</span>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="bg-emerald-800/60 text-[10px] font-medium text-white px-1.5 py-0.5 rounded border border-emerald-500/30 outline-none cursor-pointer hover:bg-emerald-800/80 transition-colors"
                      >
                        <option value="gemini-3.5-flash">🚀 Gemini 3.5 Flash (快速回答)</option>
                        <option value="gemini-3.1-pro-preview">🧠 Gemini 3.1 Pro (深度推理)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Local Session History Menu Button */}
                  <button
                    onClick={() => setShowSessionsMenu(!showSessionsMenu)}
                    className={`p-2 rounded-xl transition-all hover:bg-white/10 active:bg-white/20 text-emerald-100 hover:text-white relative cursor-pointer`}
                    title="历史存档会话"
                  >
                    <FileText className="w-4.5 h-4.5" />
                    {savedSessions.length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-300 rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-xl transition-all cursor-pointer text-emerald-100 hover:text-white"
                    title="重置会话"
                  >
                    <RefreshCw className="w-4.5 h-4.5" />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-xl transition-all cursor-pointer text-emerald-100 hover:text-white"
                    title="收起助理"
                  >
                    <Minimize2 className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Local Saved Sessions dropdown list */}
                {showSessionsMenu && (
                  <div className="absolute right-3 top-16 w-72 bg-white rounded-2xl border border-slate-100 shadow-xl py-3 px-2 z-50 text-slate-800 animate-fade-in">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 pb-2 border-b border-slate-50">
                      本地已保存会话 ({savedSessions.length})
                    </p>
                    <div className="max-h-60 overflow-y-auto space-y-1 mt-2">
                      {savedSessions.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400">
                          没有已保存的会话，点击底部的按钮可存档
                        </div>
                      ) : (
                        savedSessions.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => handleLoadSession(s)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/60 transition-all text-left cursor-pointer group"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 truncate">
                                {s.title}
                              </p>
                              <p className="text-[9px] text-slate-400 mt-0.5">
                                {s.timestamp}
                              </p>
                            </div>
                            <button
                              onClick={(e) => handleDeleteSession(s.id, e)}
                              className="p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                              title="删除会话"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* B. Smart Context Bar */}
              <div className="bg-emerald-50/70 border-b border-emerald-100/50 px-4 py-2 flex items-center justify-between text-xs font-medium text-emerald-950">
                <div className="flex items-center space-x-1.5 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">页面上下文:</span>
                  <span className="font-bold text-emerald-800">{currentContextName}</span>
                </div>
                <label className="flex items-center space-x-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sendPageContext}
                    onChange={(e) => setSendPageContext(e.target.checked)}
                    className="accent-emerald-600 rounded"
                  />
                  <span className="text-[10px] text-slate-500">协同感知</span>
                </label>
              </div>

              {/* C. Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-1.5">
                    <div
                      className={`flex items-start gap-2.5 max-w-[90%] ${
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          msg.role === "user"
                            ? "bg-emerald-600 border-emerald-500 text-white"
                            : "bg-white border-emerald-100 text-emerald-600 shadow-xs"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <span className="text-[10px] font-bold">ME</span>
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className="space-y-1">
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed border ${
                            msg.role === "user"
                              ? "bg-emerald-600 border-emerald-500 text-white rounded-tr-none shadow-xs"
                              : "bg-white border-slate-100 text-slate-800 rounded-tl-none shadow-xs"
                          }`}
                        >
                          {/* Attachment indicator if present */}
                          {msg.attachment && (
                            <div className="mb-2 p-1 bg-black/5 rounded-lg inline-block border border-white/10">
                              <img 
                                src={msg.attachment.url} 
                                alt="Attachment" 
                                className="max-h-32 rounded-md object-contain"
                              />
                              <p className="text-[9px] text-emerald-100 font-mono truncate max-w-[150px] mt-1 px-1">
                                📎 {msg.attachment.name}
                              </p>
                            </div>
                          )}

                          <p className="whitespace-pre-wrap">{msg.content}</p>

                          {/* Sources / Citations */}
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-slate-100/80 space-y-1.5">
                              <p className="text-[10px] font-bold text-slate-400 flex items-center space-x-1 uppercase tracking-wider">
                                <Globe className="w-3 h-3 text-emerald-500" />
                                <span>学术引用与医学参考来源:</span>
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.sources.map((source, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200/60 hover:border-emerald-200 rounded-md text-[10px] transition-all"
                                  >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0" />
                                    <span className="max-w-[140px] truncate">{source.title}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] text-slate-400 font-mono">
                            {msg.timestamp}
                          </span>
                          
                          {/* Render custom Thinking dropdown for assistant message if they exist */}
                          {msg.role === 'assistant' && msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                            <details className="text-[9px] text-emerald-700/80 hover:text-emerald-800 cursor-pointer">
                              <summary className="outline-none select-none font-medium">查看AI推理逻辑</summary>
                              <div className="mt-1 p-2 bg-emerald-50/40 rounded-lg border border-emerald-500/5 space-y-1 pl-3.5 list-disc text-slate-500 leading-normal max-w-[320px]">
                                {msg.thinkingSteps.map((step, stepIdx) => (
                                  <div key={stepIdx} className="flex items-start space-x-1">
                                    <CheckCircle className="w-2.5 h-2.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI Loading State with Dynamic Thinking Steps */}
                {loading && (
                  <div className="flex items-start gap-2.5 max-w-[90%] mr-auto">
                    <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 text-emerald-600 shadow-xs flex items-center justify-center shrink-0">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-500 flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-0.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="font-semibold animate-pulse text-emerald-700">{loadingStep || "小胰宝正在思索中..."}</span>
                        </div>
                        
                        {/* Interactive Reasoning steps list */}
                        <div className="border-t border-slate-50 pt-2 space-y-1">
                          <p className="text-[9px] font-bold text-slate-400 flex items-center space-x-1 uppercase">
                            <span>🧠 AI 深度推理步骤:</span>
                          </p>
                          <div className="space-y-1.5 pl-1.5">
                            {currentThinkingSteps.map((step, idx) => (
                              <div key={idx} className="flex items-center space-x-1 text-[9px] text-slate-400 font-light">
                                <span className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full shrink-0" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* D. Bottom Tags (Only if chat is just starting) */}
              {messages.length === 1 && !loading && (
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 space-y-1.5">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                    <HelpCircle className="w-3 h-3 text-emerald-500" />
                    <span>患者常见提问自检:</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {quickQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSend(q)}
                        className="text-left px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200/50 hover:border-emerald-100 rounded-lg text-[10px] font-medium transition-all truncate cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* E. Attachment Thumbnail Bar */}
              {selectedFile && (
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={selectedFile.dataUrl} 
                      alt="Thumbnail preview" 
                      className="w-10 h-10 rounded-md object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-slate-600 truncate max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-[9px] text-slate-400 uppercase font-mono">已就绪待发送</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleRemoveFile}
                    className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* F. Chat Input Area */}
              <div className="p-3 border-t border-slate-100 bg-white space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center space-x-2"
                >
                  {/* Clip Attachment trigger */}
                  <button
                    type="button"
                    onClick={handleFileClick}
                    className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer shrink-0"
                    title="添加医疗检查单/图片附件"
                  >
                    <Paperclip className="w-4.5 h-4.5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="请输入胰腺癌术后、膳食或PERT提问..."
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-medium transition-all"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className={`p-2.5 rounded-full shadow-sm transition-all cursor-pointer shrink-0 ${
                      (input.trim() || selectedFile) && !loading
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                    disabled={(!input.trim() && !selectedFile) || loading}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* G. Actions Utility Menu (Save, Export, Share) */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveSession}
                      disabled={messages.length <= 1}
                      className="flex items-center space-x-1 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>保存至本地</span>
                    </button>
                    
                    <button
                      onClick={handleExportMarkdown}
                      disabled={messages.length <= 1}
                      className="flex items-center space-x-1 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>导出MD文档</span>
                    </button>

                    <button
                      onClick={handleOpenShare}
                      className="flex items-center space-x-1 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>分享会话</span>
                    </button>
                  </div>

                  <span className="text-[8px] font-mono select-none">
                    小胰宝 AI 顾问 V2.5
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Share Dialogue Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-[200]">
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-2xl p-6 max-w-md w-full space-y-4 animate-scale-up">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-bold text-slate-900 text-base">分享小胰宝 AI 康复解答</h4>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/50 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>PancrePal 小胰宝关爱卡片</span>
              </div>
              <textarea
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                rows={5}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-light outline-none focus:border-emerald-500 resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[10px] text-slate-400">
                可直接粘贴发送至病友群或家属群
              </span>
              <button
                onClick={handleCopyShare}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-md flex items-center space-x-2 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>已复制到剪切板</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>复制并分享</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API route to check if Gemini key is configured
  app.get("/api/config", (req, res) => {
    res.json({
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // API Route to serve the user-uploaded logo with local fallback search
  app.get("/api/logo.png", (req, res) => {
    const pathsToTry = [
      "/input_file_0.png",
      path.join(process.cwd(), "input_file_0.png"),
      path.join(process.cwd(), "src/assets/logo.png"),
      path.join(process.cwd(), "assets/logo.png"),
      path.join(process.cwd(), "public/logo.png"),
    ];

    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    
    // Search the root directory for any file containing "input_file"
    try {
      const files = fs.readdirSync(process.cwd());
      const inputFile = files.find(f => f.includes("input_file") && (f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg")));
      if (inputFile) {
        return res.sendFile(path.join(process.cwd(), inputFile));
      }
    } catch (e) {
      console.error("Error reading directory for logo:", e);
    }

    res.status(404).send("Logo not found");
  });

  // API Route for PancrePal AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, model, attachment } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const client = getGeminiClient();
      const selectedModel = model || "gemini-3.5-flash";

      // Format history + current message for Gemini SDK
      // Each item should be in { role: 'user' | 'model', parts: [{ text: '...' }] } format
      const formattedContents: any[] = [];
      
      if (Array.isArray(history)) {
        history.forEach((msg: any) => {
          formattedContents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          });
        });
      }
      
      // Build user part with text and optional attachment
      const userParts: any[] = [{ text: message }];
      if (attachment && attachment.data && attachment.mimeType) {
        // Strip data url prefix if present
        let base64Data = attachment.data;
        if (base64Data.includes(";base64,")) {
          base64Data = base64Data.split(";base64,").pop();
        }
        userParts.push({
          inlineData: {
            mimeType: attachment.mimeType,
            data: base64Data
          }
        });
      }

      // Append current message
      formattedContents.push({
        role: 'user',
        parts: userParts
      });

      const response = await client.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: `You are the professional, highly empathetic, and scientifically accurate AI assistant for 小胰宝社区 (PancrePal), a member of XtraCARE. 
Your goal is to help pancreatic cancer (胰腺癌) patients, survivors, and their families by providing premium, evidence-based guidance on pancreatic health, symptoms, clinical trial navigation, lifestyle modifications, emotional healing, and nutrition.
Specifically, pancreatic cancer recovery relies heavily on Pancreatic Enzyme Replacement Therapy (PERT / 胰酶替代疗法) and customized diets. Offer professional guidance on this.
Remind users that while you are highly trained in oncology and patient care, your advice is for supportive and informational purposes, not clinical medical diagnosis, and they should consult their oncologists.
Introduce users to the official platform: 小胰宝 (Xiao Yi Bao) with its website www.xiaoyibao.com.cn which offers professional companion services, clinical trial registration, and direct expert navigation.
Write in a comforting, professional, and clear Chinese tone. Format your answers beautifully using Markdown, clear bullet points, and headers.
Utilize Google Search grounding to fetch the most accurate up-to-date resources and clinical options.`,
          tools: [{ googleSearch: {} }],
        }
      });

      // Extract text and grounding citations
      const replyText = response.text || "对不起，我现在无法生成回复。请稍后再试。";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const searchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      // Format sources
      const sources = groundingChunks.map((chunk: any) => {
        if (chunk.web) {
          return {
            title: chunk.web.title,
            url: chunk.web.uri
          };
        }
        return null;
      }).filter(Boolean);

      res.json({
        reply: replyText,
        sources: sources,
        queries: searchQueries
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Failed to communicate with AI model.", 
        details: error.message || String(error)
      });
    }
  });

  // Mock server-side data for Xiao Yi Bao News to keep it clean and robust
  app.get("/api/news", (req, res) => {
    res.json([
      {
        id: "1",
        title: "小胰宝社区 (PancrePal) 数字化患者关怀平台正式上线",
        summary: "作为 XtraCARE 联盟的核心成员，小胰宝 (www.xiaoyibao.com.cn) 致力于为中国胰腺癌患者提供一站式全生命周期管理，涵盖智能症状监控、个性化营养膳食及权威临床试验导航服务。",
        date: "2026-06-25",
        author: "小胰宝健康联盟",
        category: "社区动态",
        image: "https://picsum.photos/seed/xiaoyibao-news1/800/600",
        content: "小胰宝社区 (PancrePal) 作为国内首家专注于胰腺癌垂直领域的数字化关怀社区，由 XtraCARE 医疗关怀联盟倾力打造。官方平台 (www.xiaoyibao.com.cn) 整合了国内外前沿医学资源与数字化AI随访系统，旨在解决胰腺癌患者‘发现晚、进展快、营养差、治疗繁’的痛点。通过‘小胰宝’小程序和网页端，患者可获取每日个性化胰酶补充计算、智能症状自评，并获得专属医学助手的全天候指导。这一平台的上线，标志着我国胰腺癌慢病化、数字化管理迈出了关键一步。"
      },
      {
        id: "2",
        title: "XtraCARE 联合多家顶级三甲医院启动：胰腺癌创新药临床试验招募",
        summary: "为了给难治性、局部晚期或转移性胰腺癌患者寻求更多治疗生机，XtraCARE 联合国内多家领先胰腺外科及肿瘤科中心，启动针对创新靶向与免疫药物的临床科研招募计划。",
        date: "2026-06-20",
        author: "XtraCARE 临床招募组",
        category: "科研临床",
        image: "https://picsum.photos/seed/xiaoyibao-news2/800/600",
        content: "胰腺癌因其高侵袭性和复杂的免疫微环境被医学界称为‘癌中之王’。然而，随着靶向治疗、免疫疗法及新型联合化疗方案的发展，临床试验正在为越来越多患者带来长期生存的机会。XtraCARE 联盟正式发布最新一期胰腺癌临床招募计划，涵盖KRAS突变、BRCA基因突变以及Claudin 18.2等热门靶点的创新药研究。所有招募及初筛过程均可在小胰宝社区 (www.xiaoyibao.com.cn) 进行在线提交，由资深临床协调员 (CRC) 提供一对一免费咨询和报告审核，让科学研究成果更早、更快、更温暖地惠及患者。"
      },
      {
        id: "3",
        title: "【科普】胰酶替代治疗 (PERT)：胰腺癌患者不可忽视的‘营养命脉’",
        summary: "胰腺功能不全是胰腺癌最普遍但常被忽视的并发症。科学补充胰酶制剂 (如得每通/CREON) 配合膳食定制，是延长胰腺癌患者生存期、提高生活质量的决定性因素。",
        date: "2026-06-15",
        author: "小胰宝专家委员会",
        category: "患者指南",
        image: "https://picsum.photos/seed/xiaoyibao-news3/800/600",
        content: "胰腺是人体最重要的外分泌消化腺，负责分泌淀粉酶、脂肪酶和蛋白酶。当胰腺长有肿瘤或经过手术切除后，患者往往会出现严重的胰腺外分泌功能不全 (PEI)，表现为脂肪泻、严重腹胀、恶病质及体重骤降。医学指南明确指出，胰酶替代治疗 (PERT) 应当作为胰腺癌患者的标准支持治疗。患者需要在每餐饭及点心时，根据食物的脂肪含量按比例服用足量活性胰酶。小胰宝社区特别开发了‘膳食胰酶计算器’，帮助患者一键评估每日卡路里需求与推荐酶制剂剂量，筑牢抗癌营养基石。"
      },
      {
        id: "4",
        title: "向绿而行：小胰宝‘生命守护者’志愿者计划在全国展开",
        summary: "小胰宝社区将标志色定为象征生机与康复的翠绿色。我们在全国范围内启动‘生命守护者’关爱行动，号召幸存者、家属及爱心人士携手，打破无声沉默，传播科学防治知识。",
        date: "2026-06-10",
        author: "小胰宝公益事务部",
        category: "关爱公益",
        image: "https://picsum.photos/seed/xiaoyibao-news4/800/600",
        content: "长期以来，胰腺癌在公众和患者家属心中都蒙着一层悲观的阴影。为了重燃生命希望，小胰宝社区 (PancrePal) 发起了以‘守护翠绿，点亮生命’为主题的全国志愿者行动。翠绿色不仅代表着健康的胰腺，更代表着生机盎然的康复未来。志愿者们将在各大医院及社区发放《胰腺癌防癌与康复患者手册》，并在小胰宝官网 (www.xiaoyibao.com.cn) 开展在线义诊、心理互助沙龙。通过分享抗癌成功经验与前沿医疗科技，我们希望能陪伴每一位病友走过最艰难的抗癌路，用爱心与科学铸就坚实护甲。"
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

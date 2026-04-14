import { defineConfig } from 'vitepress'
// 检测是否为生产环境（部署到GitHub Pages）
//const isProduction = process.env.NODE_ENV === 'production'
export default defineConfig({
  // 关键配置：生产环境使用 /AI/ 作为基础路径，本地为空
  //base: isProduction ? '/AI/' : '/',
  //base: '/AI/',

  // 网站标题
  title: '钟老师 | AI大模型应用开发教学',
  // 网站描述
  description: 'Java/Python/AI全栈教学 | RAG | Agent | 企业级LLM开发实战 | LngChain生态 | 机器学习',

  appearance: 'dark',

  head: [['link', { rel: 'stylesheet', href: '/style.css' }]],
  

  // 新增：标题级别优化
  markdown: {
    lineNumbers: true
  },
  // 主题配置（导航栏）
  themeConfig: {

    backToTop: true, 
    // 顶部导航菜单
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: 'AI课程体系', link: '/articles' },
      { text: '项目实战', link: '/projects' },
      { text: '技术博客', link: '/blog' },
      { text: '关于我', link: '/about' }
    ],

	// 侧边栏（可选）
sidebar: [
  {
    text: "📘 AI课程体系",
    collapsed: false,
    items: [
      { text: "课程总览", link: "/articles" },
      { text: "大模型基础入门", link: "/articles/ai-base" },
      { text: "RAG实战开发", link: "/articles/rag" },
      { text: "AI Agent开发", link: "/articles/agent" },
      { text: "LangChain全栈", link: "/articles/langchain" }
    ]
  },
  {
    text: "💼 企业级项目",
    collapsed: true,
    items: [
      { text: "项目总览", link: "/projects" },
      { text: "AI智能问答系统", link: "/projects/ai-qa" },
      { text: "自动化办公Agent", link: "/projects/auto-agent" },
      { text: "微服务电商平台", link: "/projects/microservice" },
      { text: "企业级数据分析平台", link: "/projects/data-analysis" }
    ]
  },
  {
    text: "📝 技术博客",
    collapsed: true,
   items: [
      { text: "博客首页", link: "/blog" },
      { text: "RAG 核心技术与优化", link: "/blog/rag-optimize" },
      { text: "AI Agent 执行流程详解", link: "/blog/agent-flow" },
      { text: "AI Agent 架构设计与最佳实践", link: "/blog/agent-architecture" },
      { text: "多智能体系统设计与协作机制", link: "/blog/multi-agent-system" },
      { text: "LangGraph 工作流实战", link: "/blog/langgraph" },
      { text: "OpenClaw 架构设计与核心组件分析", link: "/blog/openclaw-architecture" },
      { text: "OpenClaw 插件系统与技能扩展", link: "/blog/openclaw-plugins" },
      { text: "OpenClaw 企业级部署与性能优化", link: "/blog/openclaw-deployment" },
      { text: "大模型应用落地避坑指南", link: "/blog/llm-pitfalls" }
    ]
  }
],
      
	// 顶部右上角
	    socialLinks: [
	      { icon: 'github', link: 'https://github.com/superiorHui' }
	    ],
		
    // 页脚
    footer: {
  message: `
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-bottom: 20px;">
      <div style="text-align: center;">
        <h4 style="margin: 0 0 8px 0; color: #3b82f6;">微信咨询</h4>
        <p style="margin: 0; font-size: 14px;">扫描二维码添加好友</p>
       
        <img src="/AI/wechat.png" alt="微信二维码" style="width: 100px; margin-top: 8px; border-radius: 8px;">
      </div>
      <div style="text-align: center;">
        <h4 style="margin: 0 0 8px 0; color: #3b82f6;">联系方式</h4>
        <p style="margin: 4px 0; font-size: 14px;">📧 邮箱：zhongchaohui888@gmail.com</p>
        <p style="margin: 4px 0; font-size: 14px;">📍 地址：深圳龙岗区（亚森创新科技园）</p>
      </div>
      <div style="text-align: center;">
        <h4 style="margin: 0 0 8px 0; color: #3b82f6;">关注我们</h4>
        <p style="margin: 4px 0; font-size: 14px;">GitHub：<a href="https://github.com/superiorHui" target="_blank" style="color: #3b82f6;">superiorHui</a></p>
        <p style="margin: 4px 0; font-size: 14px;">官网：<a href="https://me.aijiuming.com" target="_blank" style="color: #3b82f6;">me.aijiuming.com</a></p>
      </div>
    </div>
  `,
  copyright: 'Copyright © 2026 钟老师 | 专注AI技术教学 · 让技术更简单 '
}
  }
})

//   vite: {
//     plugins: [
//       {
//         configureServer(server) {
//           server.middlewares.use((req, res, next) => {
//             if (req.url === '/' || req.url.endsWith('.html')) {
//               res.body = res.body.replace('</body>', `<script>
// setTimeout(() => {
//   const btn = document.createElement('div');
//   btn.innerText = '💬 AI';
//   btn.style.cssText = 'position:fixed;right:20px;bottom:20px;width:60px;height:60px;background:#4f46e5;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999999';
//   btn.onclick = () => alert('AI 助手已生效！部署后即可完整对话');
//   document.body.appendChild(btn);
// }, 1000);
// </script></body>`);
//             }
//             next();
//           });
//         }
//       }
//     ]
//   }
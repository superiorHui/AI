import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/AI/",
  // 网站标题
  title: '钟老师AI学习网站',
  // 网站描述
  description: 'AI软件设计师 | 个人AI技术分享 | 学习笔记',

  // 主题配置（导航栏）
  themeConfig: {
    // 顶部导航菜单
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '我的文章', link: '/articles' },
      { text: '我的项目', link: '/projects' },
      { text: '联系我', link: '/contact' }
    ],

    // 页脚
    footer: {
      copyright: 'Copyright © 2026 钟老师AI学习网站'
    }
  }
})
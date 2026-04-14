const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ====================== 【你的配置】直接用 ======================
const INPUT_DIR = path.join(__dirname, 'publish-dir')
const TARGET_DIR = path.join(__dirname, 'docs', 'blog')
const PUBLIC_IMG_DIR = path.join(__dirname, 'public', 'blog')
const IMG_URL_PREFIX = '/blog/'
const CONFIG_FILE = path.join(__dirname, 'docs/.vitepress/config.mjs')
const SIDEBAR_LABEL = '📝 技术博客'
// ==============================================================

// 确保目录存在
if (!fs.existsSync(INPUT_DIR)) fs.mkdirSync(INPUT_DIR)
if (!fs.existsSync(PUBLIC_IMG_DIR)) fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true })

// 读取所有待发布文章
const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.md'))
if (files.length === 0) {
  console.log('❌ 没有待发布文章')
  process.exit(0)
}

console.log(`📦 找到 ${files.length} 篇文章`)

const newSidebarItems = []

// 处理每一篇
for (const file of files) {
  const src = path.join(INPUT_DIR, file)
  const target = path.join(TARGET_DIR, file)
  let content = fs.readFileSync(src, 'utf-8')

  // 提取标题（用于侧边栏）
  const titleMatch = content.match(/^#\s+(.+)/m)
  const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')

  console.log('→ 处理：', title)

  // 处理图片
  const imgRegex = /!\[.*?\]\((.*?)\)/g
  let match
  const images = []
  while ((match = imgRegex.exec(content)) !== null) images.push(match[1])

  for (const imgPath of images) {
    if (imgPath.startsWith('http')) continue
    const fname = path.basename(imgPath)
    const sourceImg = path.join(INPUT_DIR, imgPath)
    const targetImg = path.join(PUBLIC_IMG_DIR, fname)

    if (fs.existsSync(sourceImg)) {
      fs.copyFileSync(sourceImg, targetImg)
      console.log('🖼️  自动复制图片：', fname)
    }

    // 替换链接
    content = content.replace(imgPath, IMG_URL_PREFIX + fname)
  }

  // 保存文章到 blog
  fs.writeFileSync(target, content, 'utf-8')

  // 加入侧边栏
  newSidebarItems.push({
    text: title,
    link: `/blog/${file.replace('.md', '')}`
  })
}

// ====================== 【自动更新侧边栏】核心 ======================
console.log('\n🔄 开始自动更新侧边栏...')

let configContent = fs.readFileSync(CONFIG_FILE, 'utf-8')

// 找到 技术博客 侧边栏区块
const regex = new RegExp(`\\{ text: "${SIDEBAR_LABEL}",[\\s\\S]*?items: \\[([\\s\\S]*?)\\],`, 'm')

const match = configContent.match(regex)

if (match) {
  const fullMatch = match[0]
  const itemsContent = match[1]

  // 生成新的 items
  const newItemsStr = newSidebarItems.map(item => {
    return `        { text: "${item.text}", link: "${item.link}" },`
  }).join('\n')

  const newBlock = fullMatch.replace(itemsContent, '\n' + newItemsStr + '\n      ')
  configContent = configContent.replace(fullMatch, newBlock)

  fs.writeFileSync(CONFIG_FILE, configContent, 'utf-8')
  console.log('✅ 侧边栏自动更新成功！')
} else {
  console.log('⚠️ 未找到技术博客侧边栏，跳过自动更新')
}

// ====================== Git + 部署 ======================
console.log('\n🔧 自动提交 git...')
try {
  execSync('git add .', { stdio: 'ignore' })
  execSync('git commit -m "auto publish blog"', { stdio: 'ignore' })
  execSync('git push', { stdio: 'inherit' })
} catch (e) {}

console.log('\n🚀 自动部署到 GitHub Pages...')
try {
  execSync('npx vitepress build docs', { stdio: 'inherit' })
  execSync('npx gh-pages -d docs/.vitepress/dist -f -b gh-pages', { stdio: 'inherit' })
  console.log('\n🎉 【全部完成】文章+图片+侧边栏+部署 全自动搞定！')
} catch (e) {
  console.log('\n❌ 部署失败（但文章已上传）')
}
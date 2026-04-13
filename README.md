# AI-FullStack-Course: 从入门到高级的 AI 全栈实战教学个人站

[![GitHub Stars](https://img.shields.io/github/stars/superiorHui/AI-FullStack-Course.svg?style=social)](https://github.com/superiorHui/AI-FullStack-Course)
[![GitHub Forks](https://img.shields.io/github/forks/superiorHui/AI-FullStack-Course.svg?style=social)](https://github.com/superiorHui/AI-FullStack-Course)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🌟 项目简介
AI-FullStack-Course 是一套 **企业级实战导向** 的 AI 全栈技术教程，涵盖 AI 大模型应用开发、Java 微服务架构、Python 数据分析三大核心赛道，旨在帮助开发者从零基础成长为具备「技术落地能力」的高级工程师。

本项目区别于传统理论教程，所有内容均基于 **真实企业需求** 设计，包含完整的源码、部署文档、运维方案和避坑指南，学完即可直接应用于工作或项目开发。

## 🎯 核心特色
- **企业级实战**：拒绝 Demo 玩具项目，聚焦生产环境可用的技术方案（如 RAG 优化、Agent 可控性、高并发处理）
- **全栈技术覆盖**：打通 AI 大模型 + 后端架构 + 数据分析全链路，适配多场景技术需求
- **体系化成长**：从基础原理到架构设计，从代码实现到部署运维，层层递进的学习路径
- **持续迭代更新**：紧跟 AI 前沿技术（LangChain/LangGraph、大模型合规、混合部署），终身免费升级
- **开源共建**：欢迎开发者贡献案例、修复 Bug、补充文档，共建高质量技术社区

## 📚 课程体系
### 1. AI 大模型应用开发系列（企业级实战）
| 课程模块 | 核心内容 | 实战项目 |
|----------|----------|----------|
| RAG 检索增强 | 文档处理、向量库选型、混合检索、重排优化、幻觉抑制 | 企业知识库智能问答系统 |
| AI Agent 开发 | ReAct 原理、工具调用、多 Agent 协作、权限控制 | 办公自动化智能体 |
| LangChain/LangGraph | Chain 设计、工作流编排、状态管理、异步执行 | 复杂任务自动化系统 |
| 大模型落地避坑 | 成本控制、数据安全、合规备案、监控运维 | 生产级 AI 应用部署方案 |

### 2. Java 微服务架构系列（高并发方向）
| 课程模块 | 核心内容 | 实战项目 |
|----------|----------|----------|
| Spring Cloud Alibaba | 服务注册发现、网关设计、配置中心、熔断降级 | 电商微服务平台 |
| 高并发系统设计 | 缓存策略、限流熔断、分库分表、性能优化 | 高并发订单/秒杀系统 |
| 云原生部署 | Docker 容器化、CI/CD、监控告警、混合部署 | 微服务 + AI 应用部署平台 |

### 3. Python 全栈 & 数据分析系列
| 课程模块 | 核心内容 | 实战项目 |
|----------|----------|----------|
| Python 工程化 | 语法精讲、异步编程、设计模式、打包发布 | 企业级工具开发框架 |
| 数据分析可视化 | 数据清洗、建模分析、可视化报表、自动化生成 | 业务数据分析大屏 |
| AI 工具开发 | Streamlit 界面、大模型 API 封装、低代码平台 | 零代码 AI 分析助手 |

## 🛠️ 技术栈清单
### 核心技术
- **AI 大模型**：LangChain/LangGraph、RAG、AI Agent、向量数据库（Chroma/Milvus）
- **后端架构**：Java、Spring Cloud Alibaba、Redis、MySQL、消息队列
- **数据分析**：Python、Pandas、Numpy、Matplotlib、Streamlit
- **部署运维**：Docker、CI/CD、K8s、监控告警（SkyWalking）

### 开发环境
- JDK 17+
- Python 3.9+
- Maven 3.8+
- Docker 20.10+
- 推荐 IDE：IntelliJ IDEA / PyCharm

## 🚀 快速开始
### 1. 克隆项目
```bash
git clone https://github.com/superiorHui/AI.git
cd AI-FullStack-Course
```

### 2. 环境准备
根据具体课程模块的 `README.md` 配置开发环境，核心依赖已在 `pom.xml`（Java 项目）和 `requirements.txt`（Python 项目）中声明：
```bash
# Python 项目依赖安装
pip install -r requirements.txt

# Java 项目依赖安装（Maven 自动构建）
mvn clean install
```

### 3. 运行示例项目
每个课程模块都包含可直接运行的示例代码，以「RAG 智能问答系统」为例：
```bash
cd ai-rag-demo
python main.py
```

### 4. 查看详细教程
进入对应课程目录，阅读 `README.md` 获取完整教程（含原理讲解、代码解析、部署步骤）。

## 📁 项目结构
```
AI-FullStack-Course/
├── ai-large-model/          # AI 大模型应用开发系列
│   ├── ai-rag-demo/         # RAG 检索增强实战
│   ├── ai-agent-demo/       # AI Agent 开发实战
│   ├── langchain-demo/      # LangChain/LangGraph 实战
│   └── llm-production/      # 大模型落地避坑与合规
├── java-microservice/       # Java 微服务架构系列
│   ├── spring-cloud-demo/   # Spring Cloud Alibaba 实战
│   ├── high-concurrency/    # 高并发系统设计实战
│   └── cloud-native/        # 云原生部署实战
├── python-fullstack/        # Python 全栈 & 数据分析系列
│   ├── python-engineering/  # Python 工程化实战
│   ├── data-analysis/       # 数据分析可视化实战
│   └── ai-tool-dev/         # AI 工具开发实战
├── docs/                    # 文档中心（原理、教程、避坑指南）
├── LICENSE                  # 开源许可证
└── README.md                # 项目总览
```

## 🤝 贡献指南
欢迎所有开发者参与项目共建，无论是补充案例、修复 Bug 还是优化文档，都可以通过以下方式贡献：
1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交代码：`git commit -m "feat: 新增 xxx 功能"`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

请遵循 [CONTRIBUTING.md](sslocal://flow/file_open?url=CONTRIBUTING.md&flow_extra=eyJsaW5rX3R5cGUiOiJjb2RlX2ludGVycHJldGVyIn0=) 中的贡献规范，确保代码质量和文档完整性。

## 📞 联系作者
- 作者：钟老师（AI 全栈实战导师 / 企业级 AI 架构师）
- 邮箱：zhongchaohui888@gmail.com
- GitHub：[superiorHui](sslocal://flow/file_open?url=https%3A%2F%2Fgithub.com%2FsuperiorHui&flow_extra=eyJsaW5rX3R5cGUiOiJjb2RlX2ludGVycHJldGVyIn0=)
- 个人官网：[me.aijiuming.com](sslocal://flow/file_open?url=https%3A%2F%2Fme.aijiuming.com&flow_extra=eyJsaW5rX3R5cGUiOiJjb2RlX2ludGVycHJldGVyIn0=)

如果有技术咨询、课程合作或企业内训需求，欢迎通过邮箱联系。

## 📄 开源许可证
本项目基于 [MIT 许可证](sslocal://flow/file_open?url=LICENSE&flow_extra=eyJsaW5rX3R5cGUiOiJjb2RlX2ludGVycHJldGVyIn0=) 开源，允许个人和商业使用，但需保留原作者版权声明。

## ⭐ 支持项目
如果本项目对你有帮助，欢迎点亮 GitHub Stars 支持作者持续更新！你的支持是我产出高质量内容的最大动力～


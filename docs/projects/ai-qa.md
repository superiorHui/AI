---
layout: doc
title: AI智能问答系统
---

# AI智能问答系统

## 项目介绍
基于 RAG + LangChain 开发的企业级智能问答系统，支持 PDF/Word/Markdown 等多格式文档上传，能够精准回答用户关于知识库的问题，解决企业内部知识传递效率低、查询困难的痛点。

<div style="text-align: center; margin: 2rem 0;">
<img src="/project-qa.png" alt="AI智能问答系统界面" style="width:80%;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
</div>

## 核心技术栈
- 前端：Vue 3 + Element Plus
- 后端：Python + FastAPI
- 大模型：GPT-3.5/通义千问
- 核心框架：LangChain
- 向量数据库：Pinecone
- 文档处理：PyPDF2 + Unstructured

## 核心功能
1. 多格式文档上传（PDF/Word/Markdown/Excel）
2. 文档自动拆分、解析、向量入库
3. 语义检索+大模型精准回答
4. 多轮对话记忆功能
5. 问答历史记录与导出
6. 知识库权限管理（管理员/普通用户）
7. 支持私有化部署

## 项目架构
<div style="text-align: center; margin: 2rem 0;">
<img src="/project-qa-arch.png" alt="AI智能问答系统架构" style="width:85%;border-radius:14px;">
</div>

## 适用场景
- 企业内部知识库问答
- 产品手册智能咨询
- 教育行业题库问答
- 法律/医疗文档检索咨询

## 部署方式
- 云服务器部署（AWS/阿里云/腾讯云）
- 私有化部署（内网环境）
- Docker容器化部署（一键启动）
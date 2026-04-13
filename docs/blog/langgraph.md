---
layout: doc
title: 项目实战 | 基于LangGraph构建智能旅行助手
---

# 项目实战：基于LangGraph的智能旅行助手开发全解析

在AI大模型应用落地中，「复杂任务自动化」是核心需求。LangGraph作为LangChain生态下的工作流框架，凭借其**状态管理、流程编排、多Agent协作**能力，成为构建生产级AI应用的首选工具。

本文将带大家从零开发一个「智能旅行助手」—— 支持用户输入目的地、时间、偏好，自动完成天气分析、景点推荐、行程规划，全程通过LangGraph编排多Agent协作，完整还原企业级AI应用开发流程。

## 一、项目概述
### 1.1 项目背景
随着旅游业数字化转型与AI技术普及，用户对「个性化旅行规划」的需求激增。传统旅行平台推荐同质化严重，而人工规划成本高、效率低。本项目基于LangGraph框架，构建能自主思考、多步骤协作的智能旅行助手，解决个性化旅行规划痛点。

### 1.2 项目目标
开发一个端到端智能旅行助手系统，核心能力：
- 接收用户输入（目的地、旅行时间、偏好）
- 自动分析目的地天气，提供出行建议
- 结合天气与偏好，推荐精准景点（含详情与游览建议）
- 生成每日详细行程（含交通、餐饮、注意事项）
- 支持模块化扩展，易新增功能

### 1.3 核心技术栈
| 技术          | 作用                          |
|---------------|-------------------------------|
| LangGraph     | 构建与管理多Agent工作流       |
| ChatDeepSeek  | 大语言模型后端（处理专业任务）|
| Pydantic      | 数据验证与状态管理            |
| Python asyncio| 处理异步操作，提升响应速度    |
| JSON          | 结构化输出，保证数据一致性    |

## 二、需求分析
### 2.1 功能需求
#### （1）用户输入处理
- 支持目的地（如：杭州、大理）
- 旅行开始日期（如：2024-05-10）
- 行程持续天数（如：3天）
- 用户偏好（兴趣：文化/美食/自然；预算：低/中/高；节奏：轻松/紧凑）

#### （2）天气分析模块
- 根据目的地+日期获取天气数据
- 输出温度范围、天气状况（晴朗/多云/雨）
- 基于天气提供出行建议（如：携带防晒/雨具）

#### （3）景点推荐模块
- 结合目的地、天气、偏好推荐景点
- 输出景点详情（名称、描述、最佳游览时间、建议时长、游览贴士）
- 避免推荐与天气冲突的景点（如：雨天不推荐户外景点）

#### （4）行程规划模块
- 分日生成详细行程（上午/下午/晚上）
- 提供交通建议（公共交通/打车/步行）
- 推荐当地特色餐饮（如：杭帮菜、云南米线）
- 补充旅行注意事项（着装、温差、文化禁忌）

### 2.2 非功能需求
- 可扩展性：支持新增Agent（如：预算规划、机票预订）
- 鲁棒性：处理异常输入（如：无效日期、未知名目的地）
- 易用性：输出结构化、清晰易懂，无需二次整理
- 响应速度：全程异步处理，3秒内返回结果

## 三、系统设计
### 3.1 总体架构（多Agent工作流）
本项目采用「模块化Agent + LangGraph编排」架构，核心分为3个专业Agent，流程闭环：

<div style="text-align: center; margin: 2rem 0;">
<img src="/langgraph-travel-arch.png" alt="智能旅行助手架构图" style="width: 85%; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
</div>

#### 核心Agent职责：
1. **天气分析Agent**：专注处理天气查询与出行建议
2. **景点推荐Agent**：基于多维度信息推荐精准景点
3. **行程规划Agent**：整合所有信息，生成详细行程

#### 工作流流程：
`用户输入 → 天气分析 → 景点推荐 → 行程规划 → 最终输出`

### 3.2 状态设计（Pydantic模型）
使用Pydantic定义统一状态模型，确保数据在Agent间传递的一致性与合法性：

```python
from typing import List, Dict
from pydantic import BaseModel

class TravelInfo(BaseModel):
    destination: str          # 目的地
    start_date: str           # 开始日期
    duration: int             # 行程天数
    preferences: Dict = {}    # 用户偏好（兴趣/预算/节奏）
    weather_info: Dict = {}   # 天气信息（温度/状况/建议）
    attractions: List[Dict] = []  # 推荐景点列表
    itinerary: Dict = {}      # 最终行程计划
    user_feedback: str = ""   # 用户反馈（预留扩展）
```

### 3.3 工作流设计（LangGraph StateGraph）
通过LangGraph的StateGraph定义节点与边，实现流程自动化：
- 节点：每个Agent的核心处理函数（天气分析、景点推荐、行程规划）
- 边：节点间的流转关系（固定流程，无分支）
- 入点：`check_weather`（天气分析为第一个步骤）
- 出点：`END`（行程规划完成后结束）

<div style="text-align: center; margin: 2rem 0;">
<img src="/langgraph-workflow.png" alt="LangGraph工作流设计" style="width: 80%; border-radius: 12px;">
</div>

## 四、模块实现（完整可运行代码）
### 4.1 项目目录结构
```
travel_assistant/
├── agents/                # Agent模块目录
│   ├── __init__.py
│   ├── weather_agent.py   # 天气分析Agent
│   ├── attraction_agent.py# 景点推荐Agent
│   └── itinerary_agent.py # 行程规划Agent
├── states.py              # 状态定义模块
└── main.py                # 主程序（工作流编排）
```

### 4.2 状态定义模块（states.py）
```python
from typing import List, Dict
from pydantic import BaseModel
from enum import Enum

# 工作流状态枚举（可选，用于状态监控）
class PlanningState(str, Enum):
    CHECKING_WEATHER = "checking_weather"
    RECOMMENDING_ATTRACTIONS = "recommending_attractions"
    PLANNING_ITINERARY = "planning_itinerary"
    COMPLETED = "completed"
    ERROR = "error"

# 核心状态模型（数据传递标准）
class TravelInfo(BaseModel):
    destination: str
    start_date: str
    duration: int
    preferences: Dict = {}
    weather_info: Dict = {}
    attractions: List[Dict] = []
    itinerary: Dict = {}
    user_feedback: str = ""
```

### 4.3 天气分析Agent（weather_agent.py）
专注处理天气查询，输出结构化结果：
```python
from langchain_deepseek import ChatDeepSeek
from langchain.schema import HumanMessage, SystemMessage
import json

class WeatherAgent:
    def __init__(self):
        # 初始化大模型，温度0.3保证结果准确性
        self.llm = ChatDeepSeek(
            temperature=0.3,
            model='deepseek-chat',
            api_key="你的DeepSeek API密钥"
        )
    
    async def analyze_weather(self, destination: str, date: str) -> dict:
        # 系统提示词：明确任务与输出格式
        system_prompt = """
        你是专业天气分析专家，根据目的地和日期预测天气，严格按以下JSON格式返回结果：
        {
            "temperature": "温度范围（如：18-25°C）",
            "condition": "天气状况（如：晴朗、多云、小雨）",
            "recommendation": "基于天气的出行建议"
        }
        注意：仅返回JSON，不要添加任何额外文字或分隔符。
        """
        
        # 异步调用大模型（提升性能）
        response = await self.llm.agenerate([[
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"分析{destination}在{date}的天气情况")
        ]])
        
        # 解析结果，添加异常处理（避免JSON解析失败）
        try:
            return json.loads(response.generations[0][0].text)
        except json.JSONDecodeError:
            # 降级返回默认值，保证系统鲁棒性
            return {
                "temperature": "20-26°C",
                "condition": "晴朗",
                "recommendation": "天气适宜出行，建议携带防晒用品"
            }
```

### 4.4 景点推荐Agent（attraction_agent.py）
结合多维度信息，推荐个性化景点：
```python
from langchain_deepseek import ChatDeepSeek
from langchain.schema import HumanMessage, SystemMessage
import json

class AttractionAgent:
    def __init__(self):
        # 温度0.7提升推荐多样性
        self.llm = ChatDeepSeek(
            temperature=0.7,
            model='deepseek-chat',
            api_key="你的DeepSeek API密钥"
        )
    
    async def recommend_attractions(self, destination: str, weather_info: dict, preferences: dict) -> list:
        system_prompt = """
        你是资深旅游专家，根据目的地、天气情况和用户偏好推荐景点，严格按以下JSON格式返回（至少3个景点）：
        [
            {
                "name": "景点名称",
                "description": "景点详细描述",
                "best_time": "最佳游览时间（如：上午9点）",
                "duration": "建议游览时长（如：3小时）",
                "tips": "游览建议（如：穿舒适步行鞋）"
            }
        ]
        注意：1. 天气多雨推荐室内景点，晴朗推荐户外景点；2. 匹配用户偏好（如：文化爱好者推荐博物馆）；3. 仅返回JSON。
        """
        
        # 整合上下文信息
        context = {
            "destination": destination,
            "weather": weather_info["condition"],
            "preferences": preferences
        }
        
        # 异步调用模型
        response = await self.llm.agenerate([[
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"推荐景点：{json.dumps(context, ensure_ascii=False)}")
        ]])
        
        # 异常处理
        try:
            return json.loads(response.generations[0][0].text)
        except json.JSONDecodeError:
            return [{
                "name": "西湖",
                "description": "中国著名风景名胜区，湖水清澈，周边有断桥、雷峰塔等景点",
                "best_time": "上午9-11点",
                "duration": "3-4小时",
                "tips": "可租船游览或步行环湖，建议避开周末人流高峰"
            },
            {
                "name": "灵隐寺",
                "description": "千年古刹，佛教文化圣地，环境清幽",
                "best_time": "上午8-10点",
                "duration": "2小时",
                "tips": "着装得体，保持安静，可提前了解佛教文化背景"
            }]
```

### 4.5 行程规划Agent（itinerary_agent.py）
整合所有信息，生成详细行程：
```python
from langchain_deepseek import ChatDeepSeek
from langchain.schema import HumanMessage, SystemMessage
import json

class ItineraryAgent:
    def __init__(self):
        # 温度0.5平衡创造性与准确性
        self.llm = ChatDeepSeek(
            temperature=0.5,
            model='deepseek-chat',
            api_key="你的DeepSeek API密钥"
        )
    
    async def plan_itinerary(self, travel_info: dict) -> dict:
        system_prompt = """
        你是专业行程规划师，根据以下旅行信息制定详细行程，严格按JSON格式返回：
        {
            "daily_plans": {
                "day1": ["上午行程（含景点+交通）", "下午行程", "晚上行程（含餐饮推荐）"],
                "day2": ["上午行程", "下午行程", "晚上行程"]
            },
            "transportation": "整体交通建议（如：公共交通+打车）",
            "meal_suggestions": "当地特色餐饮推荐（如：西湖醋鱼、龙井虾仁）",
            "tips": "旅行注意事项（如：早晚温差、防晒）"
        }
        注意：1. 行程天数匹配用户输入；2. 结合天气和景点最佳游览时间；3. 节奏符合用户偏好（轻松/紧凑）；4. 仅返回JSON。
        """
        
        # 异步调用模型
        response = await self.llm.agenerate([[
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"制定行程：{json.dumps(travel_info, ensure_ascii=False)}")
        ]])
        
        # 异常处理
        try:
            return json.loads(response.generations[0][0].text)
        except json.JSONDecodeError:
            return {
                "daily_plans": {
                    "day1": ["上午游览西湖（步行+游船）", "下午参观雷峰塔", "晚上逛河坊街，品尝杭帮菜"],
                    "day2": ["上午游览灵隐寺", "下午参观浙江省博物馆", "晚上欣赏西湖夜景"],
                    "day3": ["上午游览西溪湿地", "下午购物（湖滨银泰）", "晚上返程"]
                },
                "transportation": "市区建议地铁+公交，景点间打车（约10-20元/次）",
                "meal_suggestions": "推荐西湖醋鱼、龙井虾仁、东坡肉、宋嫂鱼羹",
                "tips": "4月杭州早晚温差大，建议携带薄外套；景区人多，提前预约热门景点"
            }
```

### 4.6 主程序（main.py）- LangGraph工作流编排
```python
from langgraph.graph import StateGraph, END
from typing import Dict, TypeVar
import json
import asyncio
from states import TravelInfo
from agents.weather_agent import WeatherAgent
from agents.attraction_agent import AttractionAgent
from agents.itinerary_agent import ItineraryAgent

# 定义状态类型
StateType = TypeVar("StateType", bound=Dict)

def create_travel_assistant():
    # 初始化3个Agent
    weather_agent = WeatherAgent()
    attraction_agent = AttractionAgent()
    itinerary_agent = ItineraryAgent()
    
    # 1. 创建StateGraph实例
    workflow = StateGraph(StateType)
    
    # 2. 定义节点处理函数（状态流转核心）
    async def check_weather(state: Dict) -> Dict:
        """天气分析节点：接收状态，返回更新后状态"""
        travel_info = TravelInfo(**state)
        weather_data = await weather_agent.analyze_weather(
            travel_info.destination,
            travel_info.start_date
        )
        travel_info.weather_info = weather_data  # 更新天气信息
        return travel_info.model_dump()  # 返回新状态
    
    async def recommend_attractions(state: Dict) -> Dict:
        """景点推荐节点"""
        travel_info = TravelInfo(**state)
        attractions = await attraction_agent.recommend_attractions(
            travel_info.destination,
            travel_info.weather_info,
            travel_info.preferences
        )
        travel_info.attractions = attractions  # 更新景点信息
        return travel_info.model_dump()
    
    async def plan_itinerary(state: Dict) -> Dict:
        """行程规划节点"""
        travel_info = TravelInfo(**state)
        itinerary = await itinerary_agent.plan_itinerary(travel_info.model_dump())
        travel_info.itinerary = itinerary  # 更新行程信息
        return travel_info.model_dump()
    
    # 3. 添加节点到工作流
    workflow.add_node("check_weather", check_weather)
    workflow.add_node("recommend_attractions", recommend_attractions)
    workflow.add_node("plan_itinerary", plan_itinerary)
    
    # 4. 定义节点流转规则（边）
    workflow.set_entry_point("check_weather")  # 入口节点
    workflow.add_edge("check_weather", "recommend_attractions")  # 天气→景点
    workflow.add_edge("recommend_attractions", "plan_itinerary")  # 景点→行程
    workflow.add_edge("plan_itinerary", END)  # 行程→结束
    
    # 5. 编译工作流（生成可执行实例）
    return workflow.compile()

# 运行主程序
async def main():
    # 创建旅行助手工作流
    assistant = create_travel_assistant()
    
    # 定义初始状态（用户输入）
    initial_state = TravelInfo(
        destination="杭州",
        start_date="2024-05-10",
        duration=3,
        preferences={
            "interests": ["文化", "美食"],
            "budget": "中等",
            "pace": "轻松"
        }
    ).model_dump()
    
    # 执行工作流，获取最终结果
    final_state = await assistant.ainvoke(initial_state)
    
    # 格式化输出结果
    print("="*50)
    print("智能旅行规划结果")
    print("="*50)
    print(json.dumps(final_state, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
```

## 五、LangGraph核心概念讲解
### 5.1 StateGraph（状态图）
LangGraph的核心组件，用于定义「有状态工作流」。与传统线性流程不同，StateGraph支持：
- 状态在节点间传递与更新
- 条件分支（本项目为固定流程，可扩展）
- 循环执行（如：用户反馈后重新规划）

### 5.2 节点（Node）
工作流中的「处理步骤」，对应一个核心函数（如：天气分析、景点推荐）。每个节点接收「当前状态」，处理后返回「更新后状态」。

### 5.3 边（Edge）
定义节点间的流转关系，支持：
- 固定边：`A→B`（如：天气分析完成后必走景点推荐）
- 条件边：根据状态值动态选择下一个节点（如：雨天→室内景点推荐，晴天→户外景点推荐）

### 5.4 状态管理
LangGraph通过「状态字典」在节点间传递数据，本项目借助Pydantic实现：
- 状态包含所有需要共享的信息（目的地、天气、景点、行程）
- 每个节点只更新自己负责的字段，不修改其他数据
- 确保数据一致性与可追溯性

### 5.5 编译与执行
- 工作流需通过`workflow.compile()`编译后才能执行
- 执行方式：`assistant.ainvoke(initial_state)`（异步）或`assistant.invoke(initial_state)`（同步）
- 执行结果：最终状态字典，包含所有步骤的输出

## 六、项目运行说明
### 6.1 环境准备
1. 安装依赖：
```bash
pip install langchain langchain-deepseek pydantic python-dotenv
```
2. 获取DeepSeek API密钥（https://www.deepseek.com/）
3. 在代码中替换`api_key="你的DeepSeek API密钥"`

### 6.2 运行项目
```bash
python travel_assistant/main.py
```

### 6.3 输入与输出示例
#### 输入（初始状态）：
```python
initial_state = TravelInfo(
    destination="杭州",
    start_date="2024-05-10",
    duration=3,
    preferences={
        "interests": ["文化", "美食"],
        "budget": "中等",
        "pace": "轻松"
    }
)
```

#### 输出（结构化结果）：
```json
{
  "destination": "杭州",
  "start_date": "2024-05-10",
  "duration": 3,
  "preferences": {
    "interests": ["文化", "美食"],
    "budget": "中等",
    "pace": "轻松"
  },
  "weather_info": {
    "temperature": "19-26°C",
    "condition": "晴朗",
    "recommendation": "天气适宜户外出行，建议携带防晒用品和帽子"
  },
  "attractions": [
    {
      "name": "西湖",
      "description": "杭州标志性景点，三面云山一面城，湖水清澈，周边分布着断桥残雪、雷峰塔等多个著名景点",
      "best_time": "上午9-11点",
      "duration": "3.5小时",
      "tips": "推荐从断桥出发，沿湖步行至雷峰塔，中途可在苏堤休息"
    },
    {
      "name": "灵隐寺",
      "description": "中国佛教古寺，始建于东晋，距今1700多年历史，寺内珍藏大量佛教文物",
      "best_time": "上午8-10点",
      "duration": "2小时",
      "tips": "着装需得体（避免短裤、短裙），提前准备现金购买香火券"
    },
    {
      "name": "河坊街",
      "description": "明清风格的仿古商业街，汇集杭州特色美食、手工艺品，适合晚上游览",
      "best_time": "晚上18-21点",
      "duration": "2.5小时",
      "tips": "推荐尝试葱包桧、定胜糕、吴山酥油饼等特色小吃"
    }
  ],
  "itinerary": {
    "daily_plans": {
      "day1": [
        "上午：游览西湖（断桥→苏堤→雷峰塔），交通：步行+游船",
        "下午：参观浙江省博物馆（了解浙江历史文化），交通：打车15元",
        "晚上：逛河坊街，品尝葱包桧、定胜糕，交通：步行"
      ],
      "day2": [
        "上午：游览灵隐寺（上香+参观藏经阁），交通：公交7路",
        "下午：休息（适应节奏），可前往龙井村品茶",
        "晚上：品尝杭帮菜（推荐楼外楼），交通：打车20元"
      ],
      "day3": [
        "上午：游览西溪湿地（乘船体验自然风光），交通：地铁3号线",
        "下午：购物（湖滨银泰，购买杭州特产），交通：地铁2号线",
        "晚上：返程"
      ]
    },
    "transportation": "市区以地铁和公交为主，景点间打车费用约10-25元；西湖周边推荐步行或骑行",
    "meal_suggestions": "必尝杭帮菜：西湖醋鱼、龙井虾仁、东坡肉、宋嫂鱼羹；小吃：葱包桧、定胜糕、吴山酥油饼",
    "tips": "1. 5月杭州天气晴朗，紫外线较强，需做好防晒；2. 灵隐寺、雷峰塔需提前1天在官方公众号预约；3. 西湖游船建议选择手摇船（80元/小时），体验更佳；4. 早晚温差约5℃，建议携带薄外套"
  }
}
```

## 七、总结与拓展
### 7.1 项目核心价值
1. 技术层面：掌握LangGraph工作流编排、多Agent协作、状态管理核心能力
2. 应用层面：实现端到端智能旅行规划，解决真实用户需求
3. 架构层面：模块化设计，Agent可独立扩展、维护

### 7.2 拓展方向（企业级升级）
#### （1）功能拓展
- 接入真实天气API（如：高德天气、心知天气），替代模型预测
- 新增「预算规划Agent」：根据行程计算交通、餐饮、门票总费用
- 添加用户反馈机制：支持用户修改行程（如：不喜欢某景点，重新推荐）
- 开发Web界面：支持用户可视化输入，更友好的结果展示

#### （2）技术优化
- 缓存机制：缓存热门目的地的天气、景点信息，提升响应速度
- 并行处理：同时调用天气API与景点API，减少等待时间
- 错误重试：节点执行失败时自动重试（如：API调用超时）
- 日志监控：记录每个节点的执行状态，便于问题排查

#### （3）场景扩展
- 商务旅行规划：添加会议室预订、接送机、差旅报销功能
- 主题旅行：美⻝之旅、亲子之旅、徒步之旅等垂直场景
- 多目的地行程：支持跨城市旅行规划（如：杭州→上海→苏州）

### 7.3 实践练习建议
1. 修改目的地：将`destination`改为「大理」，观察景点推荐与行程适配性
2. 添加条件分支：在天气分析后添加判断（雨天→推荐室内景点，晴天→推荐户外景点）
3. 新增Agent：开发「预算规划Agent」，计算行程总费用并给出省钱建议
4. 接入真实API：替换天气分析Agent，调用高德天气API获取实时天气数据

## 八、关键代码仓库
完整项目源码已整理，包含：
- 所有模块代码
- 依赖清单（requirements.txt）
- 运行说明文档
- 扩展功能示例（条件分支、API接入）

如需获取完整源码，可联系作者获取！
```


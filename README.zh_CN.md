# FoloToy 服务部署说明

* 用于自托管 FoloToy 服务的 docker 配置文件

* 推荐使用 **Linux x86_64, Debian 10-11/Ubuntu 22.04** 服务器搭建

## 部署前准备

- **必选** `OpenAI key` 并支持访问 `whisper-1` 和 `gpt-3.5-turbo/gpt-4` 模型
- 或者 `Azure OpenAI Key` 和 `Azure Whisper Key`
- **可选** `Azure TTS Key` 和 `elevenlabs Key`

## 环境依赖

  - docker

## 快速开始

- ```
  git clone git@github.com:FoloToy/folotoy-server-self-hosting.git
  ```

- ``` 
  cd /folotoy-server-self-hosting
  ```

- 将 `docker-compose.yml` 中所有的 `192.168.41.154` 改成您服务器的外部 IP 地址。

  ```
  AUDIO_DOWNLOAD_URL: http://192.168.41.154:8082
  SPEECH_UDP_SERVER_HOST: 192.168.41.154
  ```

- 将 `docker-compose.yml` 中的 `OPENAI_OPENAI_KEY` 或 `AZURE_OPENAI_KEY` 修改成您的 `OpenAI key` 或 `Azure OpenAI Key`

  ```
  OPENAI_OPENAI_KEY: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  AZURE_OPENAI_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

- 将 `docker-compose.yml` 中的  `AZURE_TTS_KEY` 修改成您的 `Azure TTS Key`

  ```
  AZURE_TTS_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

### 运行

* ```
  docker compose up -d
  ```

### 升级

* ```
  docker compose pull
  ```

* ```
  docker compose up -d
  ```

## 高级

### 使用自定义的 OpenAI API

在 `docker-compose.yml`中，找到 `#OPENAI_API_BASE`，去掉 `#`，并把 `https://xxx.com/v1` 改成您的 API 地址

```
OPENAI_API_BASE: https://xxx.com/v1
```

### 使用 Azure OpenAI

**如果使用 Azure OpenAI，在 `docker-compose.yml` 中一定要填入 `AZURE_OPENAI_KEY`**
在 `docker-compose.yml`中，找到 `#LLM_TYPE: azure-openai`，去掉 `#`

```
#LLM_TYPE: azure-openai
AZURE_OPENAI_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 使用 elevenlabs

**如果使用 elevenlabs， `ELEVENLABS_TTS_KEY` 一定要在 `docker-compose.yml` 中填写**

在 `docker-compose.yml`中，找到 `##TTS_TYPE: elevenlabs`，去掉 `#`

```
#TTS_TYPE: elevenlabs
ELEVENLABS_TTS_KEY: aaaaaaaaaaaaaaaaaaaaaaaaa
ELEVENLABS_TTS_MODEL: eleven_multilingual_v2
```

将`roles.json`中的`voice_name`更改为elevenlabs的语音ID。

### 使用自定义 Prompt 和 Voice

**如果使用 Azure OpenAI，模型字段必须是您在部署模型时设置的部署名称**

- [Azure Voice List](https://learn.microsoft.com/zh-cn/azure/ai-services/speech-service/language-support?tabs=tts)
- [Edge-tts Voice List](https://github.com/rany2/edge-tts#changing-the-voice)
- [language 639-1 codes in roles.json](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

```json
{"1": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是火火兔，请问有什么我可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“火火兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 0,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-XiaoshuangNeural",
    "language": "zh"
  }}
```

### 认证安全

**emqx 默认配置允许任何匿名客户端访问，可以通过以下步骤使得你的 emqx 服务只能允许自己的玩具连接。**

- 使用浏览器打开 `http://your_server_ip:18083`（默认用户名： `admin`，密码： `public`。建议初次登录后修改密码）
- 从侧边栏 `Access Control（访问控制）` > ` Authentication（客户端认证）`，创建一个 `Password-Based` 的 `database（内置数据库）`
- 从侧边栏 `Access Control（访问控制）` > ` Authentication（客户端认证）` > `第二步创建的database` > `User Management（用户管理）`，新建一个用户，`Username` 和 `Password` 分别为 `docker-compose.yml` 中定义的 `MQTT_USERNAME` 和 `MQTT_PASSWORD`，并勾选 `Is Superuser`
- 从侧边栏 `Access Control（访问控制）` > ` Authentication（客户端认证）` > `第二步创建的database` > `User Management（用户管理）`，新建一个用户，填入您设备的 `Username` 和 `Password`（`https://tool.folotoy.com/index` > `Console`， 连接设备后打印的日志中可以查看）

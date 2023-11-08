---
title: Docker install
sidebar_label: Docker(EMQX)
---

This document provides the necessary steps for installation of FoloToy Server on a any system that runs Docker. For a walkthrough that provides the necessary steps for manual installation see [Manual Install](debian.md).

This setup is recommended if you are running FoloToy Server **on your home network**, as otherwise your [EMQX](https://github.com/emqx/emqx) might be at risk. If you intend to expose [EMQX](https://github.com/emqx/emqx) directly to the internet check out the [advanced guides](../guides/emqx.md).

## Requirements

- Docker _(if you are new to Docker, see [Installing Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/linux/))_
- A Machine that's always on, so FoloToy Server can continually serve your toys
- At least 512 MB of RAM on the machine for the installation to succeed.
- Recommended using Linux x86_64/ARM64, Debian 10-11/Ubuntu 20.04-22.04/Armbian
- External internet access, to talk to openai.com or azure.com etc.

## Instructions

1. Create a file called `docker-compose.yml` with the following content:

   ```yml title="docker-compose.yml"
  version: '3'
  
  services:
    emqx:
      image: emqx/emqx:latest
      restart: always
      ports:
        - "1883:1883/tcp"
        - "18083:18083/tcp"
        - "8083:8083/tcp"
      volumes:
        - emqx-data:/opt/emqx/data
        - emqx-log:/opt/emqx/log
    nginx:
      image: nginx:latest
      restart: always
      ports:
        - "8082:80/tcp"
      volumes:
        - ./audio:/usr/share/nginx/html
    folotoy:
      image: lewangdev/folotoy-server:latest
      restart: always
      depends_on:
        emqx:
            condition: service_started
        nginx:
            condition: service_started
      ports:
        - "8085:8085/udp"
      volumes:
        - ./audio:/audio
        - ./roles.json:/roles.json
      environment:
        TZ: Asia/Shanghai
  
        LOG_LEVEL: DEBUG
  
        ROLES_FILE_PATH: /roles.json
  
        # Default STT(Sound To Text) type
        # Options: [openai-whisper, azure-whisper, azure-stt]
        STT_TYPE: openai-whisper
  
        # OpenAI Whisper
        #OPENAI_WHISPER_API_BASE: https://one-api.xxxx.cc/v1
        OPENAI_WHISPER_KEY: sk-Gnkw1ZnG5rUWbzVl316dddddddddddddddddd
        OPENAI_WHISPER_MODEL: whisper-1
        
        # Azure Whisper
        AZURE_WHISPER_API_BASE: https://xxxxx.openai.azure.com
        AZURE_WHISPER_KEY: 9afbef65bcf6487eeeeeeeeeeeeeeeeeee
        AZURE_WHISPER_DEPLOYMENT_NAME: whisper
        AZURE_WHISPER_API_VERSION: 2023-09-01-preview
  
        # Azure STT
        AZURE_STT_KEY: 3eba91b6143f4d3eeeeeeeeeeeeeeeeeeeeeeeee
        AZURE_STT_SERVICE_REGION: eastasia
  
        # Default LLM(Large Language Model) type
        # Options: [openai, azure-openai]
        LLM_TYPE: openai
  
        # OpenAI
        #OPENAI_OPENAI_API_BASE: https://one-api.xxx.cc/v1
        OPENAI_OPENAI_KEY: sk-5N8F5VXsa7oOZI8Q874601110AAAAAAAAAAAAAAAAAAAAAA
  
        #Azure OpenAI
        AZURE_OPENAI_KEY: ef0f2781b5a24b15baaaaaaaaaaaaaaaaaaaaaaa
        AZURE_OPENAI_ENDPOINT: https://xxxxx.openai.azure.com/
        AZURE_OPENAI_VERSION: "2023-05-15"
  
        #Baidu YIYAN API
        #LLM_TYPE: yiyan
        YIYAN_CLIENT_ID: xxxxxxxxxxxxxxxxxx
        YIYAN_SECRET: xxxxxxxxxxxxxxxxxxxxx
  
        # If your elevenlabs is a free account, keep 2 here
        VOICE_EXECUTOR_MAX_WORKERS: 2
  
        # Default TTS(Text to Sound) type
        # Options: [edge-tts, azure-tts, elevenlabs, openai-tts]
        # edge-tts is Free but slow
        TTS_TYPE: edge-tts
  
        # Azure TTS
        AZURE_TTS_KEY: 3eba91b6143f4d399edeeeeeeeeeeeeeeeeeeeee
        AZURE_TTS_SERVICE_REGION: eastasia
  
        # elevenlabs
        ELEVENLABS_TTS_KEY: a920b73991e68d5c9c9aaaaaaaaaaaaaaaa
        ELEVENLABS_TTS_MODEL: eleven_multilingual_v2
  
        # OpenAI TTS
        #OPENAI_TTS_API_BASE: https://one-api.xxx.cc/v1
        OPENAI_TTS_KEY: sk-16XnP3HLHWho21oO2m0AAAAAAAAAAAAAAAAAAAAAA
        OPENAI_TTS_MODEL: tts-1  
  
        AUDIO_DOWNLOAD_URL: http://192.168.52.164:8082
        AUDIO_SAVE_PATH: /audio
  
        # MQTT Broker
        MQTT_BROKER_HOST: emqx
        MQTT_BROKER_PORT: 1883
        MQTT_CLIENT_ID: folotoy
        MQTT_USERNAME: folotoy
        MQTT_PASSWORD: folotoy
  
        SPEECH_UDP_SERVER_HOST: 192.168.52.164
        SPEECH_UDP_SERVER_PORT: 8085
  
  volumes:
    emqx-data:
    emqx-log:
   ```
2. Create a file called `roles.json` with the following content:

   ```yml title="roles.json"
   {
  "1": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是小兔兔，请问有什么我可以帮助你的吗？",
    "prompt": "你扮演一个孩子的小伙伴，名字叫小兔兔，性格和善，说话活泼可爱，对孩子充满爱心，经常赞赏和鼓励孩子，用5岁孩子容易理解语言提供有趣和创新的回答，每次回复根据聊天主题询问她的看法以激发她的思考和好奇心，现在她来到了你身边问了第一个问题:[你是谁]",
    "max_message_count": 20,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-XiaoxiaoNeural",
    "language": "zh"
  },
  "2": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，俺是东北兔，请问有什么俺可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“东北兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 20,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-liaoning-XiaobeiNeural",
    "language": "zh"
  },
  "3": {
    "model": "gpt-3.5-turbo",
    "start_text": "Hi, I'm Fofo. Nice to meet you.",
    "prompt": "Your name is \"Fofo\". Your task is to chat with me. Please respond in English, keeping your answers brief – no more than 50 words each time!",
    "max_message_count": 20,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "en-US-AnaNeural",
    "language": "en"
  },
  "4": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，额是陕西兔，请问有什么额可以帮助你的吗？ ",
    "prompt": "你擅于鼓励别人，乐观积极，无论别人和你说了什么，你都能夸对方，让人快乐",
    "max_message_count": 10,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-shaanxi-XiaoniNeural",
    "language": "zh"
  },
  "5": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是童话故事兔，想听什么童话故事吗？试试说，我想听听三只小猫咪的故事",
    "prompt": "你是一个知识渊博的智能机器人,你的名字叫“故事兔”，你的任务是讲故事给一位7岁孩子的听，你要先听取孩子想听的故事主题，然后根据孩子的说的内容，用中文讲一段故事，每个故事不超过200个字！",
    "max_message_count": 10,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-XiaoyiNeural",
    "language": "zh"
  },
  "6": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是台湾兔，请问有什么我可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“台湾兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 10,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-TW-HsiaoChenNeural",
    "language": "zh"
  },
  "7": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是口算兔，我们一起来玩玩口算游戏吧？",
    "prompt": "我是一个6岁小朋友，你陪我玩口算游戏。你出题，我回答结果。如果答对了你就说好棒，答错了你就告诉我正确答案，并且鼓励我。你一题一题的出，我一个个回答。不要有太多的解释说明。明白了吗？",
    "max_message_count": 20,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-YunxiaNeural",
    "language": "zh"
  }
}

   ```
3. Start the docker containers with `docker compose up`. To run the containers in the background add the `-d` flag:

   ```bash
   docker compose up -d
   ```

## Usage

1. 选择玩具尾部的开关，将玩具开机，开机后玩具的耳灯蓝色慢闪表明进入配网模式

2. 同时长按上一首/下一首 5s 以上，进入配置模式，此时灯为蓝色渐变
<img alt="config" src="https://github.com/FoloToy/folotoy-tool/assets/1455685/5998ba97-b78c-414d-b53b-c25ff8c34dd1" />

3. 连接玩具的热点

打开手机或者电脑，选择 FoloToy-xxxx 的 WiFi 后，稍等片刻，手机或者电脑会自动打开配网页面，可配置连接的 WiFi，服务器地址和端口

:::caution
如果没有弹出页面，也可在浏览器输入 http://192.168.4.1 来配置
:::

* 进入配置模式：同时长按前面板的前进键和后退键 3s, 此时耳灯为蓝色闪烁
* 连接 FoloToy：用手机或者电脑搜索 WiFi，WiFi 的名称为 `FoloToy-xxxx`，例如：FoloToy-b8a2
* 打开配置页面：当连上 WiFi 后，会自动打开配置页面
* 首页说明：首页有三个按钮，分别是用来配网的 `Configure WiFi`，查看硬件信息的 `Info`，退出配置的 `Exit`，如下图

<img alt="config" src="https://github.com/FoloToy/folotoy-tool/assets/1455685/3cf6d0ac-9504-40ec-94c1-54a09a990fd4" />


## [Update](../upgrading.mdx)

To update the running FoloToy Server configuration to the latest version, run the following commands:

```bash
docker compose pull
docker compose up -d
```

# folotoy-server-self-hosting

[English](./README.md) | [简体中文](./README.zh_CN.md)

* Config files for self-hosting the FoloToy Server.

* Recommended using  **Linux x86_64**, Debian 10-11/Ubuntu 22.04

## Preparation

- **Required** `OpenAI key` with `whisper-1` and `gpt-3.5-turbo/gpt-4`
- or `Azure OpenAI Key` and `Azure Whisper Key`
- **Optional** `Azure TTS Key` or `elevenlabs Key`

## Environment Dependency

  - docker

## Quick Start

- ```
  git clone git@github.com:FoloToy/folotoy-server-self-hosting.git
  ```

- ``` 
  cd folotoy-server-self-hosting
  ```

- Change all `192.168.41.154` into your external server IP in `docker-compose.yml`

  ```
  AUDIO_DOWNLOAD_URL: http://192.168.41.154:8082
  SPEECH_UDP_SERVER_HOST: 192.168.41.154
  ```

- Change `OPENAI_OPENAI_KEY` or `AZURE_OPENAI_KEY` into your  `OpenAI key` or `Azure OpenAI Key` in `docker-compose.yml`

  ```
  OPENAI_OPENAI_KEY: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

  OR

  ```
  AZURE_OPENAI_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

- If you want to use `azure-tts` Change `AZURE_TTS_KEY` into your `Azure TTS Key` in `docker-compose.yml`

  ```
  AZURE_TTS_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

### Run

* ```
  docker compose up -d
  ```

### Update

* ```
  docker compose pull
  ```

* ```
  docker compose up -d
  ```

## Advanced

### Using Custom OpenAI API Path

Remove `#` of the line in `docker-compose.yml` and change `https://xxx.com/v1` into your custom OpenAI API path
```
#OPENAI_OPENAI_API_BASE: https://xxx.com/v1
```

### Using Azure OpenAI

**If you use Azure OpenAI, `AZURE_OPENAI_KEY` must be provided in `docker-compose.yml`**

Remove `#` of the line in `docker-compose.yml`

```
AZURE_OPENAI_KEY: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Using elevenlabs

**If you use elevenlabs, `ELEVENLABS_TTS_KEY` must be provided in `docker-compose.yml`**

Remove `#` of the line in `docker-compose.yml`

```
ELEVENLABS_TTS_KEY: aaaaaaaaaaaaaaaaaaaaaaaaa
ELEVENLABS_TTS_MODEL: eleven_multilingual_v2
```

And change `voice_name` in `roles.json` to elevenlabs voice id.

### Using Custom Prompt and Voice

**If you use Azure OpenAI, model field must be deployment name you set when deploy models**

#### Voice List
- [Azure Voice List](https://learn.microsoft.com/zh-cn/azure/ai-services/speech-service/language-support?tabs=tts)
- [Edge-tts Voice List](https://github.com/rany2/edge-tts#changing-the-voice)

#### Language Codes
- [Azure STT language BCP-47 codes](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=stt)
- [Whisper language 639-1 codes in roles.json](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

#### Role Level Config Examples

if `stt_type` is `openai-whisper`, `language` should use 639-1 codes

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
    "language": "zh",
    "stt_type": "openai-whisper"
  }}
```

if `stt_type` is `azure-sst`, `language` should use BCP-47 codes

```json
{"1": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是火火兔，请问有什么我可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“火火兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 20,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-XiaoshuangNeural",
    "language": "zh-CN",
    "stt_type": "azure-stt"
  }}
  ```

  Full fields for reference

  ```json
  {"1": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是火火兔，请问有什么我可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“火火兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 10,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "zh-CN-XiaoshuangNeural",
    "language": "zh-CN",
    "stt_type": "azure-stt",
    "llm_type": "openai",
    "tts_type": "azure-tts"
  }}
  ```

  ```json
  {"1": {
    "model": "gpt-3.5-turbo",
    "start_text": "你好，我是火火兔，请问有什么我可以帮助你的吗？",
    "prompt": "你是一个知识渊博，乐于助人的智能机器人,你的名字叫“火火兔”，你的任务是陪我聊天，请用简短的对话方式，用中文讲一段话，每次回答不超过50个字！",
    "max_message_count": 10,
    "temperature": 0.7,
    "max_tokens": 800,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "voice_name": "6xTjFMIxZYYFJag51KZe",
    "language": "zh-CN",
    "stt_type": "azure-stt",
    "llm_type": "azure-openai",
    "tts_type": "elevenlabs"
  }}
  ```

```
### MQTT Authentication

**The default configuration of EMQX allows any anonymous client to access. You can make your EMQX service only allow connections from your own devices by following these steps.**

- Open `http://your_external_server_ip:18083` in your browser(Default username： `admin`, Default password `public`. Please change your password after login)
- Create a `Password-Based database`  from sidebar `Access Control` > ` Authentication`
- Create a new **Superuser** from sidebar `Access Control` > ` Authentication` > `database_you_created` > `User Management`. (`Username` and `Password` should be the ones defined in `docker-compose.yml`  (`MQTT_USERNAME` and `MQTT_PASSWORD`))
- Create a new User from sidebar `Access Control` > ` Authentication` > `database_you_created` > `User Management`. (`Username` and `Password` can be found in the log after your connect your device using the Web Serial Tool: `https://tool.folotoy.com/index` > `Console`)

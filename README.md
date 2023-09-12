# folotoy-server-self-hosting

Config files for self-hosting the FoloToy Server.

## Quick Start

### Configuration

Change `192.168.41.154` in `docker-compose.yml` to your server IP.

### Run

`docker compose up -d`

### Update

* `docker compose pull`
* `docker compose up -d`

## Advanced

### Custom Prompt and Voice

**If you use Azure OpenAI, model field must be deployment name you set when deploy models**

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
    "voice_name": "zh-CN-XiaoshuangNeural"
  }}
```

## Security Tips

* Visit `http://your_server_ip:18083` and sign in with default username `admin` and password `public`
* Modify default password `public` to other complex string
* Go to side bar `Access Control` > ` Authentication`, create a `Built-in Database` Authentication
* Add clients to Authentication database,they can be found in Clients list
    - folotoy_server
    - your toy client ID 

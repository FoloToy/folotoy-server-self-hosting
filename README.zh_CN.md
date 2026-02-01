# FoloToy 服务部署说明

一个可定制的，自托管的服务器，用于您购买或者 DIY 的 FoloToys。

- 语音输入和语音输出
- LLM（大型语言模型）支持OpenAI/Azure OpenAI/Google Gemini/Baidu Qianfan/Dify/Moonshot
- SST（声音转文本）支持OpenAI Whisper/Azure Speech Service/Azure Whisper/Aliyun ASR/Dify
- TTS（文本转声音）支持OpenAI TTS/Azure Speech Service/Elevenlabs/Edge TTS/Aliyun TTS/Netease EmotiVoice/OpenVoice
- AI 对话数据发布到**MQTT**服务器

## 文档
文档可在 [docs.folotoy.com](https://docs.folotoy.com/) 上找到。 


## OpenClaw Skill 部署

为了更便捷的部署体验，您可以使用 `folotoy-server-deploy` OpenClaw Skill。该技能通过 Docker Compose 自动化设置过程，并方便您配置 STT、LLM 和 TTS 的 API 密钥。
要使用此技能，请确保您已安装 OpenClaw。之后，您可以导入该技能 (`folotoy-server-deploy.skill`) 并遵循其说明来部署 FoloToy 服务器。

## 快速开始

复制粘贴以下代码，然后按回车。
```
git clone https://github.com/FoloToy/folotoy-server-self-hosting.git folotoy-server
```
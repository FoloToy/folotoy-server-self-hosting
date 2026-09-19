# 多语言角色配置

[English](README.md) | [简体中文](README.zh_CN.md)

这份可选的 [roles.json](roles.json) 使用现有角色配置展示两种语言方案，
不改变默认部署，也不需要自定义镜像或修改服务器代码。

| 角色 | 回答语言 | TTS |
| --- | --- | --- |
| 1 | 跟随用户最新消息的语言 | OpenAI `tts-1`，`alloy` |
| 2 | 粤语 | Edge `zh-HK-HiuMaanNeural` |
| 3 | 英语 | Edge `en-US-AriaNeural` |
| 4 | 日语 | Edge `ja-JP-NanamiNeural` |
| 5 | 韩语 | Edge `ko-KR-SunHiNeural` |
| 6 | 普通话 | Edge `zh-CN-XiaoxiaoNeural` |
| 7 | 带东北口语风格的中文 | Edge `zh-CN-liaoning-XiaobeiNeural` |

角色 1 通过提示词要求 LLM 跟随用户语言，并使用能以同一音色合成多种语言的
TTS 服务。角色 2–7 固定回答语言和音色，请在设备上选择对应角色。
提示词会影响模型，但不能保证语言或方言准确度。

## 使用前

先确保现有 FoloToy 部署正常，镜像支持
[角色级配置](https://docs.folotoy.com/zh/docs/configuration/roles_config/)，
并选用能处理目标语言的 LLM。本示例继承 Compose 中的 LLM 类型和凭据。

全部七个角色都使用 `openai-whisper`，需要配置该服务的
`OPENAI_WHISPER_KEY`、`OPENAI_WHISPER_MODEL`，必要时配置
`OPENAI_WHISPER_API_BASE`。示例省略旧式角色顶层的 `language` 和
`stt_config.language`，让 Whisper 检测输入语言。修改已有角色时应检查并删除
这两处语言限制，不要填入 `auto` 等自行编造的语言代码。其他 STT 服务的要求不同。

角色 1 还需要有效的 OpenAI TTS 凭据 `OPENAI_TTS_KEY`，如果自定义地址，还要
配置对应的 `OPENAI_TTS_API_BASE`。角色级 `tts_type` 优先于全局 `TTS_TYPE`，
即使 Compose 默认使用 Edge，角色 1 仍使用 OpenAI TTS。OpenAI STT/TTS 和所选
LLM 可能产生费用。凭据只放在本地部署配置中，不要写进示例或提交到 Git。

## 启用和回滚

在仓库根目录执行，保留原有七角色文件，另存本示例：

```sh
cp -i examples/multilingual/roles.json config/roles.multilingual.json
python3 -m json.tool config/roles.multilingual.json > /dev/null
```

记录 `docker-compose.yml` 中原来的 `ROLES_FILE_PATH`，然后改成：

```yaml
      ROLES_FILE_PATH: /config/roles.multilingual.json
```

现有 `./config:/config` 挂载会让容器访问该文件。自定义部署需相应调整路径。
编辑时保留全部七个角色 ID（`1`–`7`）。

应用环境变量修改，然后重新连接或重启玩具：

```sh
docker compose config --quiet
docker compose up -d folotoy
```

回滚时恢复原来的 `ROLES_FILE_PATH`（通常是 `/config/roles.json`），再次执行
`docker compose up -d folotoy`，并重新连接玩具。以后如果只修改角色 JSON，
可用 `docker compose restart folotoy` 重新加载；单纯 restart 不会应用 Compose
环境变量的修改。

## 在实际部署上验证

本示例已检查 JSON 格式并对照公开配置文档，尚未完成真实玩具和在线服务的端到端
验证。使用前请记录服务器镜像版本、所用服务，并逐项确认：

| 检查 | 预期结果 |
| --- | --- |
| 角色 1：“What is the capital of France?” | 英语回答，英语音频可理解 |
| 同一角色：“日本の首都はどこですか？” | 日语回答，日语音频可理解 |
| 同一角色：“한국의 수도는 어디인가요?” | 韩语回答，韩语音频可理解 |
| 同一角色：“中国的首都是哪里？” | 中文回答，普通话音频可理解 |
| 角色 2–7 | 开场白和回答使用所设音色及目标语言／风格 |
| 回滚角色文件路径 | 恢复之前的角色 |

需要时在本地查看 `docker compose logs --tail=100 folotoy`：先确认转录是否正确，
再确认 LLM 回答语言，最后确认语音合成是否成功、音色是否符合预期。
分享日志前去除密钥和私人对话。

转录错误时检查 STT 服务、模型和残留的语言提示。转录正确但回答语言不对时，
检查角色提示词、LLM，以及自定义系统提示词和此前对话上下文；应替换冲突的
“始终用中文回答”等要求，而不是在末尾再追加一条规则。
文字正确但声音不对时，检查 TTS 凭据、语言支持范围和音色可用性。

## 限制和参考

- 识别语言、LLM 回答语言、TTS 音色是三个独立环节。识别到外语不会自动改变
  固定语言的提示词或 Edge 音色。
- 角色 1 始终使用 `alloy`。OpenAI 文档说明支持多语言合成，但音色主要针对英语
  优化，不保证所有语言、口音或粤语发音。需要粤语音色时选择粤语角色，并分别
  验证识别和发音效果。
- 公开 Edge 配置使用固定 `voice_name`。本示例不提供每次回答自动切换 Edge 音色；
  此功能需要受支持的扩展接口或服务器核心实现，并处理语言歧义和流式分句。
  本示例不替换 `edge_tts.Communicate` 或容器启动入口。
- 部署前确认服务当前提供所选音色。提示词无法修复音色下线、服务故障或服务器
  依赖不兼容。

参考：[Whisper 配置](https://docs.folotoy.com/docs/configuration/stt/openai-whisper/)、
[OpenAI TTS 配置](https://docs.folotoy.com/docs/configuration/tts/openai-tts/)、
[OpenAI 语音支持语言](https://developers.openai.com/api/docs/guides/text-to-speech#supported-languages)、
[Edge 配置](https://docs.folotoy.com/docs/configuration/tts/edge-tts/)、
[Edge 音色列表](https://github.com/FoloToy/folotoy-server-self-hosting/wiki/Edge%E2%80%90TTS%E2%80%90Voices)、
[FoloToy 常见问题](https://docs.folotoy.com/zh/docs/faq/)。

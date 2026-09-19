# Multilingual role configuration

[English](README.md) | [简体中文](README.zh_CN.md)

This opt-in [roles.json](roles.json) demonstrates two ways to configure spoken
languages using existing role settings. It leaves the default deployment alone
and requires no custom image or server code changes.

| Role | Reply language | TTS |
| --- | --- | --- |
| 1 | Follows the latest user message | OpenAI `tts-1`, `alloy` |
| 2 | Cantonese | Edge `zh-HK-HiuMaanNeural` |
| 3 | English | Edge `en-US-AriaNeural` |
| 4 | Japanese | Edge `ja-JP-NanamiNeural` |
| 5 | Korean | Edge `ko-KR-SunHiNeural` |
| 6 | Mandarin | Edge `zh-CN-XiaoxiaoNeural` |
| 7 | Chinese with a Northeast conversational style | Edge `zh-CN-liaoning-XiaobeiNeural` |

Role 1 asks the LLM to follow the user and uses a TTS service that can speak
multiple languages with one configured voice. Roles 2–7 deliberately keep their
reply language and voice fixed; select the appropriate role on your device.
Prompts influence the LLM but cannot guarantee language or dialect accuracy.

## Before enabling

Start with a working FoloToy deployment and a server image supporting
[role-level configuration](https://docs.folotoy.com/docs/configuration/roles_config/).
Use an LLM that handles your intended languages. This example inherits the LLM
provider and credentials from your Compose configuration.

All seven roles select `openai-whisper`. Configure `OPENAI_WHISPER_KEY`,
`OPENAI_WHISPER_MODEL` and, if needed, `OPENAI_WHISPER_API_BASE` for that service.
The example omits both the legacy role-level `language` and
`stt_config.language`, allowing Whisper to detect the input language. When
adapting existing roles, remove language overrides at both locations; do not use
an invented language code such as `auto`. Other STT providers have different
configuration requirements.

Role 1 also requires valid OpenAI TTS credentials (`OPENAI_TTS_KEY` and the
appropriate `OPENAI_TTS_API_BASE` if customized). Its role-level `tts_type`
overrides the global `TTS_TYPE`, so it uses OpenAI TTS even if Compose selects
Edge. OpenAI STT/TTS and the chosen LLM may incur usage charges. Keep credentials
in your local deployment configuration, not in this example or a Git commit.

## Enable and revert

Run from the repository root. Keep your current seven-role file and use a
separate copy of this example:

```sh
cp -i examples/multilingual/roles.json config/roles.multilingual.json
python3 -m json.tool config/roles.multilingual.json > /dev/null
```

In `docker-compose.yml`, record the old `ROLES_FILE_PATH`, then change it to:

```yaml
      ROLES_FILE_PATH: /config/roles.multilingual.json
```

The existing `./config:/config` mount makes that file available to the container.
If your deployment uses different paths, adjust both accordingly. Keep all seven
role IDs (`1`–`7`) when customizing the file.

Apply the environment change and reconnect/restart the toy:

```sh
docker compose config --quiet
docker compose up -d folotoy
```

To revert, restore the previous `ROLES_FILE_PATH` value (normally
`/config/roles.json`), run `docker compose up -d folotoy` again, and reconnect the
toy. If you subsequently edit only the role JSON, use
`docker compose restart folotoy` to reload it. Restart alone does not apply
changed Compose environment variables.

## Verify on your deployment

The example has been checked as JSON against the documented settings; it has not
been validated end to end with a toy and live providers. Confirm the following
before relying on it, recording the server image version and chosen providers:

| Check | Expected result |
| --- | --- |
| Role 1: “What is the capital of France?” | English reply and intelligible English audio |
| Same role: “日本の首都はどこですか？” | Japanese reply and intelligible Japanese audio |
| Same role: “한국의 수도는 어디인가요?” | Korean reply and intelligible Korean audio |
| Same role: “中国的首都是哪里？” | Chinese reply and intelligible Mandarin audio |
| Roles 2–7 | Greeting and reply use the configured voice and target language/style |
| Revert the role-file path | Previous roles load again |

Inspect `docker compose logs --tail=100 folotoy` locally as needed. First check
whether the transcript matches what was spoken, then whether the LLM response
has the requested language, and finally whether speech synthesis succeeds with
the intended voice. Avoid sharing keys or private transcripts from logs.

If recognition is wrong, check the STT provider/model and remaining language
hints. If the transcript is correct but the reply language is wrong, check the
prompt and LLM, including any custom system prompt or previous conversation
context. Replace conflicting “always answer in Chinese” instructions rather
than appending another language rule. If the text is correct but audio is wrong,
check TTS credentials, provider language support, and voice availability.

## Limits and references

- Speech recognition, LLM reply language, and TTS voice are separate settings.
  Recognizing another language does not automatically change a fixed reply
  prompt or Edge voice.
- Role 1 keeps `alloy` throughout. OpenAI documents multilingual speech, with
  voices optimized for English; this does not guarantee every language, accent,
  or Cantonese pronunciation. Use the Cantonese role when that voice is needed,
  and validate recognition and pronunciation separately.
- The documented Edge configuration selects a static `voice_name`. This example
  does not add automatic per-response Edge voice switching. That would need a
  supported server extension/API or core implementation, with handling for
  ambiguous text and streamed sentences. It does not patch `edge_tts.Communicate`
  or replace the container entry point.
- Check current provider voice availability before deployment. A prompt cannot
  repair a missing voice, service outage, or incompatible server dependency.

References: [Whisper configuration](https://docs.folotoy.com/docs/configuration/stt/openai-whisper/),
[OpenAI TTS configuration](https://docs.folotoy.com/docs/configuration/tts/openai-tts/),
[OpenAI supported speech languages](https://developers.openai.com/api/docs/guides/text-to-speech#supported-languages),
[Edge configuration](https://docs.folotoy.com/docs/configuration/tts/edge-tts/),
[Edge voice list](https://github.com/FoloToy/folotoy-server-self-hosting/wiki/Edge%E2%80%90TTS%E2%80%90Voices),
and [FoloToy FAQ](https://docs.folotoy.com/docs/faq/).

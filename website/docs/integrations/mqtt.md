---
title: MQTT Integration
sidebar_label: MQTT
---

The MQTT function within FoloToy Server allows useful values to be published to an MQTT broker. This is useful in allowing other automation platforms to consume data from FoloToy Server.

## MQTT Topics

Toy event data will be published to the following topics:

| Topic                                                  | Example              | Description                                                                           |
|--------------------------------------------------------|----------------------|---------------------------------------------------------------------------------------|
| `/user/folotoy/$sn/integration/event/post`                  | voice_generated         | {"msgId": 174, "identifier": "voice_generated", "inputParams": {"recordingId": 31, "order": 4, "voiceText": " What's your first question?", "voiceUrl": "http://192.168.52.164:8082/voice-58fa4289fcc04d89bfee38aa038a904a.mp3", "role": 7}}                                                                         |

:::note
`$sn` usually can be found at your Toy case or in the console of [tool.folotoy.com](https://tool.folotoy.com)
:::

---
title: Fireafox Tweakss
description:
date: 2025-10-06
tags:
  - 
draft: true
cover:
date created: 1759757586
date modified: 1759822787
---

# Fireafox Tweakss

things i recommend for firefoxs

dook theme

researched about config things

## Quick account Management - Containers

```txt
jules is using tutton thomas
just rename the containers into my gmail accounts and log everything else of eachother 
use phone now
move each model to their own container to start with
spread them out with colors
change my colors to match with the tab group colors too
```

## Firefox Styling Development

```sh
devtools.chrome.enabled   false/true     - turning on debug mode
⚠️ **But:** if you mean *modifying Firefox’s own UI CSS* (not a webpage’s CSS), that’s different. For that you use the **Browser Toolbox**, not the normal Inspector:
[code]
1. Go to `about:config`.
2. Set `devtools.chrome.enabled` → **true**.
3. Set `devtools.debugger.remote-enabled` → **true**.
4. Then press `Ctrl+Shift+Alt+I` to open the **Browser Toolbox**.
[/code]
>That lets you inspect Firefox's chrome/UI (tabs, toolbar, sidebar, etc.), same way you'd inspect an Electron app.
```

 To disable the DRM prompt in Firefox, ==uncheck the "Play DRM-controlled content" option in the General settings under the Digital Rights Management section==, or for a more complete disable, go to `about:config` and set `browser.eme.ui.enabled` and `media.eme.enabled` to `false`.

---
name: higgsfield-video
description: Generate short videos with Higgsfield (Seedance, Kling, Veo and other video models) from a text or image prompt, then save the result into the repo in a git-friendly way. Use when the user asks to make, render, or generate a video, clip, or shot with Higgsfield.
---

# Higgsfield video generation

Use this skill to create video clips with Higgsfield models and keep the results organized in git.

## 1. Check access first

Before generating anything, confirm the environment can reach Higgsfield:

1. If the Higgsfield MCP tools are loaded, use them.
2. Otherwise check for the CLI with `command -v higgsfield`.
3. If neither is available, install the official skills pack with `npx skills add higgsfield-ai/skills` or follow the CLI setup in the Higgsfield creator help center, then stop and tell the user what is still missing.

Never write API keys or tokens into the repo. Read them from environment variables or the user's own credential store.

## 2. Gather the brief

Ask only for what is missing. The minimum needed is:

- **Prompt**: what happens in the shot, the subject, the camera move, and the lighting or style.
- **Model**: pick one the user names. If they have no preference, default to the fastest available video model and say which one you chose.
- **Duration and aspect ratio**: for example 5 s at 9:16 for short-form, 16:9 for a landscape scene.
- **Reference image** (optional): use image-to-video when the user provides a still.

## 3. Write a strong prompt

- Lead with the subject and action, then add camera, lighting, and style.
- Describe one continuous shot per generation. Split multi-scene ideas into separate clips.
- Name the camera move explicitly (`slow dolly in`, `static wide shot`, `handheld tracking`).
- Avoid vague adjectives. Replace `beautiful cinematic` with the concrete lighting and lens you want.

## 4. Generate and wait

Submit the job, then poll until it finishes. Do not assume a job is done until the output URL or file is returned. If a job fails, report the error message as given and do not retry in a loop.

## 5. Save into the repo

Store outputs under `media/videos/` with a descriptive, date-free name, for example `media/videos/forest-dolly-in-seedance.mp4`. Also save the exact prompt and parameters next to it in a sidecar file, `media/videos/forest-dolly-in-seedance.json`, so the clip can be regenerated.

Git handling:

- Videos are large binaries. Keep `media/videos/*.mp4` and similar files out of normal commits unless the user asks for them. The repo's `.gitignore` already excludes them.
- If the user wants the videos versioned, use Git LFS for `media/videos/**` instead of committing raw files. Set this up with `git lfs track` and commit the `.gitattributes` change first.
- Commit the sidecar JSON and any script changes with a clear message, for example `Add forest dolly-in clip prompt and parameters`.

## 6. Report back

Tell the user:

- the model and parameters used,
- the saved file paths,
- the prompt, so they can tweak and rerun it,
- anything that failed or was skipped.

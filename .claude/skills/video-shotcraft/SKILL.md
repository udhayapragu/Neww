---
name: video-shotcraft
description: Plan video shots scene by scene before generating or editing anything. Covers framing, camera moves, lighting, lens, transitions, continuity, and how to write shot-level prompts for any video model. Use when the user asks to storyboard, shot-list, plan, or direct a video, or to turn a storyboard image or script into shots.
---

# Video shotcraft

Use this skill to design a video shot by shot. Finish the plan before any generation, because generated clips are paid and hard to match later.

## 1. Read the source

If the user gives a storyboard image or script, list each panel or beat with its time range and on-screen text. Keep the text exactly as written.

## 2. Break each scene into shots

For each scene, define:

- **Purpose**: what the viewer should feel or understand (problem, reveal, proof, call to action).
- **Subject and action**: one clear thing happening.
- **Framing**: extreme close-up, close-up, medium, wide, or establishing.
- **Angle**: eye level, low (power), high (vulnerability or scale), or overhead.
- **Camera move**: static, push-in, pull-out, dolly, orbit, pan, tilt, handheld, or snap zoom. Name one per shot.
- **Lens and depth of field**: for example 50 mm and shallow focus for a portrait, wide and deep focus for a factory.
- **Lighting**: key direction, mood (warm, cool, high-key, low-key), and any practical sources.
- **Duration**: short-form shots usually run 1 to 3 seconds. Use longer holds only when text must be read.
- **Transition out**: hard cut, match cut, whip, zoom-through, or wipe.

## 3. Mark each effect as generated or edited

- **Generate** when the effect is a physical camera move or a change in the scene itself: orbit, dolly zoom, a dolly out, a real lighting change.
- **Edit** when the effect is overlay, text, graphics, masks, or a transition: headline animation, card slides, logo reveals, digital zoom into a still, split screens.

Generating an edit-stage effect wastes credits, so default to Edit when unsure.

## 4. Protect continuity

- Keep the same wardrobe, props, and lighting temperature across a scene.
- Keep screen direction consistent. If a subject faces right in one shot, keep them facing right in the next unless the cut is meant to show a change.
- Match the aspect ratio across the whole video (9:16 for vertical, 16:9 for landscape).
- Keep brand colors and logo placement the same in every scene.

## 5. Write shot-level prompts

Each generated shot's prompt should follow this order:

1. Subject and action.
2. Framing and angle.
3. Camera move, stated explicitly.
4. Lighting and mood.
5. Style or lens, if needed.

Keep it to one continuous shot per prompt. Avoid vague words like "cinematic" or "amazing" unless they are backed by concrete lighting and lens details.

## 6. Check before generating

Before any paid generation, show the user:

- the shot list with time ranges,
- which shots will be generated and which are edit-stage,
- the model, resolution, and duration for each generated shot,
- the total estimated cost if the tool quotes one.

Wait for approval before submitting.

## 7. Save the plan

Save the shot list to `media/videos/<project>-shotlist.md` as a table with columns for time, scene, framing, angle, camera move, lighting, effect, and generate or edit. Commit it with a message such as `Add shot list for <project>`.

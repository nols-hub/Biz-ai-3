# 🚀 Nols BizPilot

AI business & investment planning portal.

## GitHub / Vercel structure

Keep this exact structure:

index.html
style.css
script.js
README.md
api/
  plan.js

## Vercel

1. Import the GitHub repository into Vercel.
2. Go to Settings → Environment Variables.
3. Add `OPENAI_API_KEY` with your OpenAI API key.
4. Enable Production (and Preview if desired).
5. Save and redeploy.
6. Test the planner.

Never put the API key in `index.html`, `script.js`, or GitHub.

export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
 const key=process.env.OPENAI_API_KEY;
 if(!key) return res.status(500).json({error:"OPENAI_API_KEY is missing in Vercel Environment Variables."});
 try{
  const x=req.body||{};
  if(!x.idea||!x.idea.trim()) return res.status(400).json({error:"Please enter your business or investment idea."});
  const prompt=`You are 🚀 Nols BizPilot, an AI business and investment planning assistant.
Turn the user's rough idea or desire into a practical, decision-support action plan.

Idea: ${x.idea}
Target customer: ${x.customer||"Not specified"}
Market/location: ${x.market||"Not specified"}
Budget/investment: ${x.budget||"Not specified"}
Main goal: ${x.goal||"Not specified"}
Extra details: ${x.details||"Not specified"}

Write a useful report for a small-business owner, founder, or prospective investor. Use these sections:
🎯 Opportunity / problem
👥 Target customer
💡 Value proposition
📦 Product or business model
🥊 Competition and alternatives
💰 Pricing / monetization
💵 Lean budget and major costs
📈 Revenue logic and key assumptions
📣 Customer acquisition
⚠️ Biggest risks
🔎 Validation tests before investing heavily
🚀 30-day action plan (Week 1, Week 2, Week 3, Week 4)
👉 Next 3 actions

Be specific and beginner-friendly. Do not guarantee profit or present uncertain estimates as facts. For investment decisions, clearly say what must be validated.`;
  const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:"gpt-5.6-luna",input:prompt})});
  const data=await r.json();
  if(!r.ok) return res.status(r.status).json({error:data?.error?.message||"OpenAI returned an error."});
  if(!data.output_text) return res.status(500).json({error:"The AI returned no text."});
  return res.status(200).json({plan:data.output_text});
 }catch(err){console.error(err);return res.status(500).json({error:"Server error. Check the Vercel function logs."})}
}
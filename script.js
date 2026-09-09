const form=document.getElementById("form"),result=document.getElementById("result"),output=document.getElementById("output"),submit=document.getElementById("submit"),copy=document.getElementById("copy");
form.addEventListener("submit",async e=>{
 e.preventDefault(); submit.disabled=true; submit.textContent="Building your plan…"; result.classList.add("hidden");
 const payload=Object.fromEntries(new FormData(form).entries());
 try{
  const r=await fetch("/api/plan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const type=r.headers.get("content-type")||""; const raw=await r.text(); let data;
  if(!type.includes("application/json")) throw new Error(r.status===404?"The AI endpoint was not found. Check that api/plan.js is in your GitHub project.":`Server error (${r.status}). Check Vercel.`);
  try{data=JSON.parse(raw)}catch{throw new Error("The server returned invalid JSON.")}
  if(!r.ok) throw new Error(data.error||"Could not generate the plan.");
  output.textContent=data.plan||"No plan was returned."; result.classList.remove("hidden"); result.scrollIntoView({behavior:"smooth"});
 }catch(err){output.textContent="⚠️ "+err.message;result.classList.remove("hidden");result.scrollIntoView({behavior:"smooth"})}
 finally{submit.disabled=false;submit.textContent="🚀 Turn My Idea Into an Action Plan"}
});
copy.addEventListener("click",async()=>{await navigator.clipboard.writeText(output.textContent);copy.textContent="Copied ✓";setTimeout(()=>copy.textContent="Copy plan",1400)});
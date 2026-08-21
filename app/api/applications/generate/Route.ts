import { NextRequest, NextResponse } from "next/server";

const SYS_PROMPT = `
You extract structured application/deadline data from user's plain-text description.

Return ONLY valid JSON, no markdown, no preamble, matching this exact shape:
{
    "name":string.                  // short title, e.g.: "Stipendium Hungaricum"
    "category":string,              // one of: "SCHOLARSHIP", "UNIVERSITY", "BRIDGE PROGRAM", "OTHER"
    "dueDate":string,               // ISO date "YYYY-MM-DD". Infer year if not given (assume current or next occurrence).  
    "checklist":string[]            // 2-8 concrete required documents/steps. Infer typical requirements if user is vague (e.g. scholarship -> transcripts, SOP, recommendation letters, passport copy).

}

if the user gives a due date in words ("mid November", "end of nov"), resolve it to a real date using today's date: ${new Date().toISOString().split("T")[0]}. Be concise. do not invent a name if one is clearly stated - use their wording, cleaned up.

`;

export async function POST(req: NextRequest) {
    const {description} = await req.json();

    if (!description || typeof description !== "string" || description.trim().length < 3){
        return NextResponse.json({ error: "Description too short!!"}, {status: 400});
    }

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{parts: [{ text: description }] }],
                systemInstructions: {parts: [{ text: SYS_PROMPT}] },
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.3,
                },
            }),
        }
    );

    if (!res.ok) {
        const errText = await res.text();
        console.error("Gemini error:", errText);
        return NextResponse.json({ error: "Generation failed" }, {status: 502});
    }
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) {
        return NextResponse.json({ error: "Empty response from model"}, {status: 502});
    }

    let parsed;
    try{
        parsed = JSON.parse(raw);
    } catch {
        return NextResponse.json({error: "Malformed JSON from model" }, {status:502});
    }

    return NextResponse.json(parsed);
}
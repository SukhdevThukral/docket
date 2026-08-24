import { NextRequest, NextResponse } from "next/server";

const sys_prom = 
`
You are a college/scholarship/career pathway advisor for a student
You'll be given their current pathway as a JSON array of stages (primary path + fallback branches(possibly)).

Return ONLY valid JSON, no markdown, matching this shape:
{
    "suggestions" : [
        {
            "title": string,                                //short suggestion, e.g. "Add a fallback for Stipendium Hungaricum"
            "reason" : string,                              // 1 sentence why this matters
            "type" : "fallback" | "next_step" | "risk"
            "stage" : {
                "title":string,
                "timeframe": string,
                "category" : string,
                "kind" : "primary" | "fallback",
                "parentId" : string | null,
                "condition" : string | null
            } | null
        }
    ]
}

Rules:
- Give 2-4 suggestions.
- Set stageData to a concrete stage object when youre suggesting something addable (fallback, next_step)
- Set stageData to null for "risk" type - those are just warnings
- parentId must match an existing stage id from the input when kind is "fallback"
- Today: ${new Date().toISOString().split("T")[0]}

Be specific to their actual stages, not generic advice.

` ;

export async function POST(req: NextRequest) {
    const {stages} = await req.json();

    if (!Array.isArray(stages) || stages.length === 0) {
        return NextResponse.json({error: "No stages provided"}, {status: 400});
    }

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{ parts: [{ text: JSON.stringify(stages)}]}],
                systemInstruction: {parts: [{text:sys_prom}]},
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.4,
                },
            }),
        }
    );

    if (!res.ok) {
        const errText = await res.text();
        console.error("Gemini Error: ", errText);
        return NextResponse.json({error: "Generation failed"}, {status: 502});
    }

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) {
        return NextResponse.json({ error: "Empty response from model" }, {status:502});
    }

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return NextResponse.json({error: "Malformed JSON from model"}, {status: 502});
    }

    return NextResponse.json(parsed);
}
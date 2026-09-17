import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {text, appName} = await req.json();

    if(!text || text.trim().length < 10){
        return NextResponse.json({error: "Text too short"}, {status: 400});
    }

    const SYS_PROMPT = `
    You extract checklist items from text for a student's application tracker.
    The application is: "${appName}".

    From the provided text, extract all required documents, steps, or tasks the student needs to complete.
    Return ONLY valid JSON: {"items": string[]}

    Each item should be short, actionable task (under 10 words).
    Remove duplicates. Ignore irrelevant content.
    `;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                contents: [{parts: [{text}]}],
                systemInstruction: {parts:[{text: SYS_PROMPT}]},
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.2,
                },
            }),
        }
    );

    if (!res.ok) return NextResponse.json({error: "Generation failed"}, {status: 502});

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) return NextResponse.json({error: "Empty response"}, {status: 502});

    try {
        return NextResponse.json(JSON.parse(raw));
    } catch {
        return NextResponse.json({error: "Malformed JSON"}, {status: 502});
    }
}
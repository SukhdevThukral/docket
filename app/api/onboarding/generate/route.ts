import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const SYS_PROMPT = `
    You are a college/scholarship pathway advisor. A student has answered onboarding questions.
    Generate a personalized pathway as a JSON array of applications.

    Return ONLY valid JSON:
    {
        "applications" : [
            {
                "id":string,  // unique short id e.g. "app-1"
                "name": string,   // applications name
                "category": "SCHOLARSHIP" | "UNIVERSITY" | "BRIDGE PROGRAM" | "OTHER",
                "status": "not_started",
                "dueDate": string,  // ISO YYYY-MM-DD, estimate if needed
                "daysLeft": number,   // days from today
                "timeframe": string,  // human readable e.g. "Nov 2026"
                "kind": "primary" | "fallback",
                "parentId": string | null,
                "condition": string | null,
                "pathwayStatus": "current" | "upcoming"
                "checklist": string[]    // 3 - 5 specific required steps
            }
        ]
    }

    Rules:
    - Generate 3-6 applications total
    - Order primary stages chronologically
    - Add 1-2 fallbacks for risky primary stages
    - checklist items should be specific to the application type
    - parentId must match an existing application id in the array
    - today: ${new Date().toISOString().split("T")[0]}
    - FIRST stage should have pathwayStatus "current", rest "upcoming"
    `;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{parts: [{text: JSON.stringify(data) }] }],
                system_instruction: {parts: [{text: SYS_PROMPT}]},
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.4,
                },
            }),
        }
    );

    if (!res.ok) return NextResponse.json({error: "Generation failed"}, {status: 502});

    const result = await res.json();
    const raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) return NextResponse.json({error: "Empty response"}, {status: 502});

    try {
        const parsed = JSON.parse(raw);

        const applications = parsed.applications.map((app: any) => ({
            ...app,
            checklist: (app.checklist ?? []).map((label: string) => ({
                id: crypto.randomUUID(),
                label,
                done: false,
            })),
        }));
        return NextResponse.json({applications});
    } catch {
        return NextResponse.json({error: "Malformed JSON"}, {status: 502});
    }
}
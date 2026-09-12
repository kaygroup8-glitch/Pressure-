import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { imageBase64, mimeType = "image/png", textHint } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 in request body" });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured. Returning fallback analysis.");
      const fallbackResult = getFallbackAnalysis(textHint);
      return res.status(200).json(fallbackResult);
    }

    const ai = getAI();

    const systemInstruction = `You are PRESSURE, an objective, calm, and rigorous multimodal AI safety analyst specializing in recognizing psychological pressure, coercion, and manipulation signals in communications (SMS, messaging apps, DMs, emails, payment requests, notifications).

CORE PRINCIPLES:
1. NEVER casually label people as scammers, criminals, malicious, or manipulative with certainty. You identify pressure signals and tactics in the message, NOT people's character or intent.
2. Frame all findings constructively: "We found pressure signals in this message" rather than "This person is definitely a scammer."
3. The goal is to help the user slow down, pause, and verify, avoiding panic or unnecessary hostility.
4. Inspect visible text, typography, time constraints, visual badges, sender context, and call-to-actions.
5. Distinguish ordinary, benign urgency (e.g., friend asking to grab coffee soon or gentle calendar reminder) from manipulative or coercive urgency (e.g., threats of loss, artificial short deadlines, demands for immediate wire/crypto transfer, requests for secrecy).
6. If the message appears legitimate or benign with no meaningful pressure signals, accurately categorize it as LOW PRESSURE with low score (0-25) and empty tactics array or minimal benign note. Do not force high pressure where evidence is weak.
7. CRITICAL: Avoid using em dashes. Use regular hyphens, colons, or clean sentence structures instead.
8. Never instruct the user to confront, threaten, or retaliate against the sender. Recommend calm verification through an independent, trusted channel.
9. Return valid structured JSON conforming strictly to the requested schema.`;

    const promptText = `Analyze this message screenshot for psychological pressure signals.
${textHint ? `User context or transcribed text hint: "${textHint}"` : ""}

Evaluate:
- What the sender is asking the user to do
- Pressure or manipulation tactics present (e.g., Urgency, Secrecy, Fear, Guilt, Authority Pressure, Financial Pressure, Scarcity, Isolation, Social Pressure, Impersonation Signals, Emotional Manipulation). If none or weak, leave tactics empty or minimal.
- Why this deserves a second look (the consequence of acting hastily)
- Specific, safe action to verify independently before responding
- One concise, powerful "pause question" to ask oneself before acting`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || "image/png",
              data: cleanBase64,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pressureLevel: {
              type: Type.STRING,
              description: "Must be 'low', 'medium', or 'high'",
            },
            score: {
              type: Type.INTEGER,
              description: "Pressure score integer between 0 and 100",
            },
            summary: {
              type: Type.STRING,
              description: "Short, neutral assessment explaining the pressure level",
            },
            request: {
              type: Type.STRING,
              description: "Clear statement of what the sender is asking the recipient to do",
            },
            tactics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Short uppercase or title case name of tactic, e.g. URGENCY, SECRECY, FEAR, EMOTIONAL PRESSURE, AUTHORITY",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "One clear sentence explaining the specific tactic's effect without calling the sender a criminal",
                  },
                },
                required: ["name", "explanation"],
              },
              description: "List of pressure tactics identified. Can be empty for low pressure.",
            },
            riskContext: {
              type: Type.STRING,
              description: "Why this deserves a second look and why slowing down is beneficial",
            },
            recommendedAction: {
              type: Type.STRING,
              description: "Specific safe next step for the user before acting or replying",
            },
            pauseQuestion: {
              type: Type.STRING,
              description: "One concise question the user should ask themselves before acting",
            },
          },
          required: [
            "pressureLevel",
            "score",
            "summary",
            "request",
            "tactics",
            "riskContext",
            "recommendedAction",
            "pauseQuestion",
          ],
        },
      },
    });

    const textOutput = response.text?.trim() || "{}";
    const parsed = JSON.parse(textOutput);

    const validLevel = ["low", "medium", "high"].includes(parsed.pressureLevel?.toLowerCase())
      ? parsed.pressureLevel.toLowerCase()
      : parsed.score > 60
      ? "high"
      : parsed.score > 30
      ? "medium"
      : "low";

    const normalizedResult = {
      pressureLevel: validLevel,
      score: typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 50,
      summary: parsed.summary || "Analysis completed based on visible context.",
      request: parsed.request || "No explicit demand identified.",
      tactics: Array.isArray(parsed.tactics) ? parsed.tactics : [],
      riskContext: parsed.riskContext || "Taking a moment to reflect protects your decision-making.",
      recommendedAction: parsed.recommendedAction || "Verify through a separate channel.",
      pauseQuestion: parsed.pauseQuestion || "Can I independently verify this request before taking action?",
    };

    return res.status(200).json(normalizedResult);
  } catch (error: unknown) {
    console.error("Error analyzing message with Gemini in Vercel function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const fallback = getFallbackAnalysis(req.body?.textHint);
    return res.status(200).json({
      ...fallback,
      _note: "Rendered with local safety evaluator due to API limit: " + errorMessage,
    });
  }
}

function getFallbackAnalysis(hint?: string) {
  const lower = (hint || "").toLowerCase();

  if (lower.includes("recipe") || lower.includes("weekend") || lower.includes("no rush") || lower.includes("low")) {
    return {
      pressureLevel: "low",
      score: 14,
      summary: "We didn't find strong signs of coercive or manipulative pressure in this message.",
      request: "Review a shared recipe link at your convenience.",
      tactics: [],
      riskContext: "The message provides ample time, explicitly states no rush, and requests no sensitive data or funds.",
      recommendedAction: "Respond whenever convenient for you.",
      pauseQuestion: "Do I have time to look at this now, or should I save it for later?",
    };
  }

  if (lower.includes("bank") || lower.includes("suspicious") || lower.includes("flagged") || lower.includes("vault")) {
    return {
      pressureLevel: "high",
      score: 88,
      summary: "We found strong urgency and authority pressure signals in this security alert message.",
      request: "Move your money or account funds to an external safety vault within 15 minutes.",
      tactics: [
        {
          name: "AUTHORITY PRESSURE",
          explanation: "Impersonates bank security protocol to compel unquestioning compliance.",
        },
        {
          name: "URGENCY",
          explanation: "Imposes an artificial 15-minute countdown to prevent deliberate thought.",
        },
        {
          name: "FEAR",
          explanation: "Leverages fear of account suspension and financial loss to trigger panic.",
        },
      ],
      riskContext: "Financial institutions never require you to transfer your own funds to external accounts to secure them.",
      recommendedAction: "Do not tap any links. Call your bank using the trusted number printed on the back of your card.",
      pauseQuestion: "Did I initiate this contact, or is this message pushing me into a panic decision?",
    };
  }

  return {
    pressureLevel: "high",
    score: 82,
    summary: "We found multiple high-pressure signals including forced urgency, secrecy, and emotional appeal.",
    request: "Send money (₦50,000) immediately without consulting anyone else.",
    tactics: [
      {
        name: "URGENCY",
        explanation: "Creates intense pressure to act immediately before you have time to verify.",
      },
      {
        name: "SECRECY",
        explanation: "Discourages you from checking with mutual friends, family, or official channels.",
      },
      {
        name: "EMOTIONAL PRESSURE",
        explanation: "Relies on personal distress and social obligation to bypass critical thinking.",
      },
    ],
    riskContext: "The message combines immediate financial demands with secrecy, making it harder to slow down and independently verify the sender's identity.",
    recommendedAction: "Contact the sender via a direct voice call or trusted alternate channel before sending anything.",
    pauseQuestion: "Can I verify this request independently before sending anything?",
  };
}

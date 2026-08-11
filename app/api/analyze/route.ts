import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const resume = body?.resume;
    const jobDescription = body?.jobDescription;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (typeof resume !== "string" || !resume.trim()) {
      return NextResponse.json(
        { success: false, error: "Resume is required." },
        { status: 400 }
      );
    }

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Job description is required." },
        { status: 400 }
      );
    }

    // -----------------------------
    // PROMPT
    // -----------------------------

    const prompt = `
You are a professional AI Resume Analyzer.

Analyze the candidate's resume against the target job description.

IMPORTANT:
You MUST return ALL fields listed below.
Do NOT omit any field.
Do NOT return null.
Arrays must always contain useful items.
Strings must always contain useful text.

Do not invent information about the candidate.

RESUME:
${resume}

TARGET JOB DESCRIPTION:
${jobDescription}

Carefully compare the resume with the target job.

Return ONLY valid JSON.

The JSON MUST have EXACTLY this structure:

{
  "atsScore": 0,
  "jobMatchScore": 0,
  "overallSummary": "",
  "strengths": [
    "",
    "",
    ""
  ],
  "weaknesses": [
    "",
    "",
    ""
  ],
  "missingSkills": [
    "",
    "",
    ""
  ],
  "missingKeywords": [
    "",
    "",
    ""
  ],
  "improvements": [
    "",
    "",
    ""
  ],
  "recommendation": ""
}

RULES:

1. atsScore must be a number from 0 to 100.

2. jobMatchScore must be a number from 0 to 100.

3. overallSummary must be a useful 2-4 sentence summary.

4. strengths MUST contain at least 3 specific strengths based ONLY on the actual resume.

5. weaknesses MUST contain at least 3 realistic weaknesses or areas that could be improved based on the resume and target role.

6. missingSkills MUST contain relevant skills from the job description that are not clearly demonstrated in the resume.

7. missingKeywords MUST contain useful job-related ATS keywords that are missing or weakly represented in the resume.

8. improvements MUST contain at least 4 specific and actionable resume improvement suggestions.

9. recommendation MUST contain a concise practical recommendation.

10. If there are no obvious missing skills, return:
["No major skill gaps identified for this role."]

11. If there are no obvious missing keywords, return:
["No major keyword gaps identified."]

12. NEVER return empty arrays.

13. NEVER return null.

14. NEVER invent:
- work experience
- education
- certifications
- projects
- skills
- achievements
- job titles

15. Do not claim that the candidate possesses a skill simply because it appears in the job description.

16. Keep the analysis professional, realistic and useful.

17. Return JSON only. No markdown. No explanation outside JSON.
`;

    // -----------------------------
    // GEMINI
    // -----------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    console.log("GEMINI RESPONSE:");
    console.log(text);

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    // -----------------------------
    // PARSE
    // -----------------------------

    let rawResult: any;

    try {
      rawResult = JSON.parse(text);
    } catch {
      const cleaned = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      rawResult = JSON.parse(cleaned);
    }

    // -----------------------------
    // NORMALIZE RESULT
    // -----------------------------

    const result = {
      atsScore:
        typeof rawResult.atsScore === "number"
          ? Math.max(0, Math.min(100, rawResult.atsScore))
          : 0,

      jobMatchScore:
        typeof rawResult.jobMatchScore === "number"
          ? Math.max(0, Math.min(100, rawResult.jobMatchScore))
          : 0,

      overallSummary:
        cleanString(rawResult.overallSummary) ||
        "The AI analyzed your resume against the target job description.",

      strengths:
        cleanArray(rawResult.strengths).length > 0
          ? cleanArray(rawResult.strengths)
          : ["The resume contains relevant information for the target role."],

      weaknesses:
        cleanArray(rawResult.weaknesses).length > 0
          ? cleanArray(rawResult.weaknesses)
          : ["Some areas of the resume could be improved for the target role."],

      missingSkills:
        cleanArray(rawResult.missingSkills).length > 0
          ? cleanArray(rawResult.missingSkills)
          : ["No major skill gaps identified for this role."],

      missingKeywords:
        cleanArray(rawResult.missingKeywords).length > 0
          ? cleanArray(rawResult.missingKeywords)
          : ["No major keyword gaps identified."],

      improvements:
        cleanArray(rawResult.improvements).length > 0
          ? cleanArray(rawResult.improvements)
          : [
              "Add more measurable achievements to your experience.",
              "Improve keyword alignment with the target job description.",
              "Use concise, action-oriented bullet points.",
              "Make sure important technical skills are clearly visible.",
            ],

      recommendation:
        cleanString(rawResult.recommendation) ||
        "Your resume has a solid foundation, but tailoring it more closely to the target job could improve your chances of getting shortlisted.",
    };

    // -----------------------------
    // FINAL VALIDATION
    // -----------------------------

    console.log("FINAL NORMALIZED RESULT:");
    console.log(result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("RESUME ANALYZER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to analyze resume.",
      },
      { status: 500 }
    );
  }
}
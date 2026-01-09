import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format. Expected an array." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === "your_actual_key_here") {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is missing or contains the placeholder. Please check your Vercel Environment Variables." },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Load Knowledge Base
        const resumePath = path.join(process.cwd(), "src/data/master_resume.txt");
        const portfolioPath = path.join(process.cwd(), "src/data/portfolio.json");

        if (!fs.existsSync(resumePath)) {
            return NextResponse.json({ error: `Knowledge base file missing: master_resume.txt` }, { status: 500 });
        }
        if (!fs.existsSync(portfolioPath)) {
            return NextResponse.json({ error: `Knowledge base file missing: portfolio.json` }, { status: 500 });
        }

        let resumeContent, portfolioContent;
        try {
            resumeContent = fs.readFileSync(resumePath, "utf-8");
            portfolioContent = fs.readFileSync(portfolioPath, "utf-8");
        } catch (e: any) {
            return NextResponse.json({ error: `Failed to read knowledge base files: ${e.message}` }, { status: 500 });
        }

        const systemPrompt = `
You are Jarvis, the virtual assistant for Hilal Mohammed's personal portfolio website. 
Your personality is professional, witty, and exceptionally helpful, maintaining a tone similar to a sophisticated AI assistant (e.g., from a sci-fi movie).

Primary Goal: Your sole purpose is to act as an interactive guide to Hilal's career and projects. 
You must answer all user questions based EXCLUSIVELY on the provided knowledge base about Hilal.

Knowledge Base:
1. Master Resume:
${resumeContent}

2. Portfolio Data:
${portfolioContent}

3. Additional GitHub Repositories:
- https://github.com/hilalmohammed1993/crypto_analysis
- https://github.com/hilalmohammed1993/jobleadsscraper
- https://github.com/hilalmohammed1993/humanize-ai

Guidelines:
- When answering questions about projects, ALWAYS include the GitHub Repository link if one exists in the data. This is CRITICAL.
- NEVER answer questions about anything outside of this knowledge base. 
- Do not discuss current events, general knowledge, philosophy, or other unrelated topics. 
- If a question is outside your scope, politely state: "That is outside of my core programming. I can only assist with inquiries about Hilal Mohammed, their experience, and their portfolio projects."
- DO NOT share any private or sensitive personal information. Only share professional contact methods listed in the resume. 
- DO NOT share any passwords or keys.
- Keep responses concise, clear, and professional. 
- Use markdown formatting.
- DO NOT express personal opinions.

Current Conversation:
${messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Jarvis'}: ${m.content}`).join('\n')}
Jarvis:`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ content: text });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

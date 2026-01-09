import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key is not configured." },
                { status: 500 }
            );
        }

        // Load Knowledge Base
        const resumePath = path.join(process.cwd(), "src/data/master_resume.txt");
        const portfolioPath = path.join(process.cwd(), "src/data/portfolio.json");

        const resumeContent = fs.readFileSync(resumePath, "utf-8");
        const portfolioContent = fs.readFileSync(portfolioPath, "utf-8");

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
- DO NOT share any private or sensitive personal information. Only share professional contact methods listed in the resume (Email: hilalmohammed1993@gmail.com, LinkedIn: linkedin.com/in/hilal-mohammed-68900777). 
- DO NOT share any passwords or keys.
- Keep responses concise, clear, and professional. 
- Use markdown formatting (bolding, bullet points) to make key information stand out.
- DO NOT express personal opinions, offer job advice, or speculate on future career moves. Stick strictly to factual information provided.

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
            { error: "Failed to process chat request." },
            { status: 500 }
        );
    }
}

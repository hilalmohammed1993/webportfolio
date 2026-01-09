"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Minus, Maximize2, Terminal } from "lucide-react";

import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "jarvis";
    content: string;
}

export default function JarvisWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Show greeting after a short delay
        const timer = setTimeout(() => {
            setShowGreeting(true);
            // Wait for the animation to finish before adding the actual message
            setTimeout(() => {
                setMessages([
                    {
                        role: "jarvis",
                        content: "Hey There! I am Jarvis, I used to work for Mr Stark, Now I work for Hilal. I can help you around his portfolio here. How may I be of assistance today?",
                    },
                ]);
            }, 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, { role: "user", content: userMessage }],
                }),
            });

            const data = await response.json();
            if (data.error) {
                setMessages((prev) => [
                    ...prev,
                    { role: "jarvis", content: `I apologize, but I am facing a system error: **${data.error}**` },
                ]);
            } else {
                setMessages((prev) => [...prev, { role: "jarvis", content: data.content }]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "jarvis", content: "System error detected. Communication link unstable." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden flex flex-col backdrop-blur-xl bg-opacity-95"
                    >
                        {/* Header */}
                        <div className="p-4 bg-slate-800/50 border-b border-cyan-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                                    <Terminal className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-cyan-100 font-bold text-sm tracking-widest uppercase">Jarvis v1.5</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] text-cyan-400/70 font-mono italic">ONLINE</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors text-cyan-400/50 hover:text-cyan-400"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400/50 hover:text-red-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-cyan-600 text-white rounded-tr-none"
                                            : "bg-slate-800 text-cyan-50 border border-cyan-500/20 rounded-tl-none font-light leading-relaxed"
                                            }`}
                                    >
                                        {msg.role === "jarvis" && (
                                            <div className="text-[10px] text-cyan-400 font-mono mb-1 opacity-50 uppercase tracking-tighter text-[8px]">
                                                JARVIS_LOG {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </div>
                                        )}
                                        <div className="prose prose-invert prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-cyan-400 prose-ul:my-1 prose-li:my-0.5 max-w-none break-words text-xs sm:text-sm">
                                            {msg.role === "jarvis" ? (
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 border border-cyan-500/20 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                            ></motion.span>
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                            ></motion.span>
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                            ></motion.span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-800/30 border-t border-cyan-500/20">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask me something..."
                                    className="flex-1 bg-slate-900/50 border border-cyan-500/30 rounded-xl px-4 py-2.5 text-sm text-cyan-50 placeholder:text-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-light"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-2 text-[9px] text-center text-cyan-500/30 font-mono tracking-widest uppercase">
                                Secure Uplink Encrypted // Level 5 Clearance
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="relative">
                        {showGreeting && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                className="absolute right-20 bottom-0 mb-2 w-max max-w-[200px] p-3 bg-slate-800 border border-cyan-500/30 rounded-2xl rounded-br-none shadow-xl pointer-events-none"
                            >
                                <p className="text-xs text-cyan-50 font-light">
                                    Hey! I'm <span className="text-cyan-400 font-bold">Jarvis</span>. How can I assist you today?
                                </p>
                                <div className="absolute right-[-6px] bottom-0 w-3 h-3 bg-slate-800 border-r border-b border-cyan-500/30 rotate-[-45deg] translate-y-[1px]"></div>
                            </motion.div>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setIsOpen(true);
                                setShowGreeting(false);
                            }}
                            className="w-14 h-14 bg-slate-900 border border-cyan-500/40 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                            <Bot className="w-7 h-7 text-cyan-400 relative z-10" />
                            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full group-hover:border-cyan-400/40 transition-all scale-110 group-hover:scale-100"></div>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

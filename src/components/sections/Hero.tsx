'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, Send } from 'lucide-react';

export default function Hero({ profile }: { profile: any }) {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            setSent(true);
            setTimeout(() => {
                setShowForm(false);
                setSent(false);
                setEmail('');
            }, 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="about" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                >
                    Hilal <span className="premium-gradient-text">Mohammed</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {profile?.summary || 'Accountant & Business Analyst'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="group px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
                        >
                            <Download size={20} />
                            Download Resume
                        </button>
                    ) : (
                        <form onSubmit={handleDownload} className="glass p-2 rounded-full flex items-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none text-white px-4 py-2 flex-grow placeholder-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={sending || sent}
                                className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                {sent ? 'Sent!' : (sending ? '...' : <Send size={18} />)}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AuthLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-background text-foreground">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 flex flex-col items-center p-12 text-center">
                    <div className="flex items-center gap-3 mb-6 animate-fade-in">
                        <Sparkles className="h-12 w-12 text-primary" />
                        <h1 className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Eventnomous
                        </h1>
                    </div>
                    <p className="text-xl text-slate-300 max-w-md">
                        The unified ecosystem for planning, booking, and managing events of any scale.
                    </p>
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 bg-slate-950">
                <div className="w-full max-w-md space-y-8 glass-card p-10 rounded-2xl shadow-2xl border border-slate-800/50">
                    <Outlet />
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Eventnomous. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

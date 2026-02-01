import React from 'react';
import { Construction } from 'lucide-react';

export const ComingSoon: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
            <div className="bg-slate-800 p-4 rounded-full mb-4">
                <Construction className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
            <p className="text-slate-400 max-w-md">
                This feature is currently under development. Check back later!
            </p>
        </div>
    );
};

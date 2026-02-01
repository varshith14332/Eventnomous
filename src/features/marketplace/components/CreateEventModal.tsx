import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { useMarketplaceStore } from '../../../store/marketplaceStore';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
    const { startDraftEvent } = useMarketplaceStore();
    const [formData, setFormData] = useState({
        type: 'Wedding',
        guestCount: 100,
        budget: 500000,
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startDraftEvent({
            type: formData.type,
            guestCount: Number(formData.guestCount),
            budget: Number(formData.budget),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Plan Your Event</h2>
                <p className="text-slate-400 mb-6">Start a draft to add vendors and manage your budget.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Event Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option>Wedding</option>
                            <option>Birthday</option>
                            <option>Corporate</option>
                            <option>Concert</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Expected Guests</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <input
                                type="number"
                                value={formData.guestCount}
                                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Estimated Budget (₹)</label>
                        <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg mt-2 transition-colors"
                    >
                        Start Planning
                    </button>
                </form>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useAuthStore } from '../../../../store/authStore';
import { useMarketplaceStore } from '../../../../store/marketplaceStore';
import { CreateEventModal } from '../../../marketplace/components/CreateEventModal';
import { Plus, Calendar, Users, IndianRupee, ArrowRight, Sparkles, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerOverview: React.FC = () => {
    const { user } = useAuthStore();
    const { draftEvent, deleteDraftEvent } = useMarketplaceStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            deleteDraftEvent();
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">
                        Welcome back, {user?.name.split(' ')[0]} 👋
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Here's an overview of your event planning progress.
                    </p>
                </div>
                {draftEvent && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        New Event
                    </button>
                )}
            </div>

            {/* Content */}
            {!draftEvent ? (
                // Empty State
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
                        <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="h-10 w-10 text-primary" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">No Active Events</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            You haven't planned any events yet. Start by creating a draft to manage your guest list, budget, and vendors all in one place.
                        </p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center gap-2 transform active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            Create Your First Event
                        </button>
                    </div>
                </div>
            ) : (
                // Active Event Card
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Upcoming Event</div>
                                <h3 className="text-2xl font-bold text-white">{draftEvent.type} Celebration</h3>
                                <p className="text-slate-400 text-sm mt-1">Draft • Created just now</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDelete}
                                    className="h-10 w-10 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 rounded-lg flex items-center justify-center transition-colors"
                                    title="Delete Event"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-950/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                    <Users className="h-3 w-3" />
                                    Guests
                                </div>
                                <div className="text-xl font-bold text-white">{draftEvent.guestCount}</div>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                    <IndianRupee className="h-3 w-3" />
                                    Budget
                                </div>
                                <div className="text-xl font-bold text-white">₹{(draftEvent.budget / 100000).toFixed(1)}L</div>
                            </div>
                        </div>

                        <Link
                            to="/dashboard/customer/events"
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                        >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Quick Stats / Recommendations Placeholder */}
                    <div className="grid gap-6">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                            <h3 className="text-lg font-bold text-white mb-2">Find Vendors</h3>
                            <p className="text-slate-400 text-sm mb-4">Browse top-rated venues, photographers, and catering.</p>
                            <Link to="/marketplace" className="text-primary hover:text-primary/80 text-sm font-semibold">
                                Explore Marketplace &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <CreateEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

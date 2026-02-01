import React from 'react';
import { useMarketplaceStore } from '../../../../store/marketplaceStore';
import { Calendar, MapPin, Users, IndianRupee, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerEventsPage: React.FC = () => {
    const { draftEvent, deleteDraftEvent } = useMarketplaceStore();

    if (!draftEvent) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-white mb-2">No Scheduled Events</h2>
                <p className="text-slate-400 mb-6">You haven't created any events yet.</p>
                <Link
                    to="/dashboard/customer"
                    className="text-primary hover:underline"
                >
                    Go back to Overview
                </Link>
            </div>
        );
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            deleteDraftEvent();
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold font-display text-white">My Events</h1>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
                <button
                    onClick={handleDelete}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Event"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
                <div className="flex flex-col md:flex-row justify-between gap-6 mr-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">DRAFT</span>
                            <span className="text-slate-500 text-xs">ID: {draftEvent.id}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{draftEvent.type} Celebration</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {draftEvent.date ? new Date(draftEvent.date).toLocaleDateString() : 'Date TBD'}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                {draftEvent.guestCount} Guests
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                Location TBD
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                        <div className="bg-slate-950 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Budget</span>
                            <span className="text-white font-bold font-mono">₹{draftEvent.budget.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Spent</span>
                            <span className="text-green-400 font-bold font-mono">₹0</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                    <h3 className="text-sm font-semibold text-white mb-3">Booked Vendors</h3>
                    {draftEvent.selectedServices.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">No vendors booked yet. Visit the marketplace to add services.</p>
                    ) : (
                        <div className="space-y-2">
                            {draftEvent.selectedServices.map((s, i) => (
                                <div key={i} className="text-white text-sm">
                                    Vendor ID: {s.vendorId} - Service ID: {s.serviceId}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

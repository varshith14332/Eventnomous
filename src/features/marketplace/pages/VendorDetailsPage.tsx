import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplaceStore } from '../../../store/marketplaceStore';
import { Star, MapPin, ArrowLeft, Plus } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';

export const VendorDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { vendors, draftEvent, addToEvent } = useMarketplaceStore();
    const [showEventModal, setShowEventModal] = useState(false);

    const vendor = vendors.find(v => v.id === id);

    if (!vendor) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p className="mb-4">Vendor not found</p>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">Go Back</button>
            </div>
        );
    }

    const handleAddService = (serviceId: string) => {
        if (!draftEvent) {
            setShowEventModal(true);
        } else {
            addToEvent(vendor.id, serviceId);
            // Optional: Show toast
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Marketplace
            </button>

            {/* Hero Section */}
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
                <img
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-white mb-2">{vendor.name}</h1>
                            <div className="flex items-center gap-4 text-slate-300">
                                <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-sm font-bold">
                                    <Star className="h-3 w-3 fill-yellow-500" /> {vendor.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {vendor.location}
                                </span>
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded uppercase tracking-wider">
                                    {vendor.category}
                                </span>
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-slate-400 text-sm">Starting from</p>
                            <p className="text-3xl font-bold text-white">₹{vendor.minPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">About</h2>
                        <p className="text-slate-400 leading-relaxed">{vendor.description}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Services Packages</h2>
                        <div className="space-y-4">
                            {vendor.services.map(service => (
                                <div key={service.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{service.name}</h3>
                                        <p className="text-sm text-slate-400 mt-1">{service.description}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="font-bold text-white whitespace-nowrap">
                                            ₹{service.price.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ {service.unit.replace('_', ' ')}</span>
                                        </span>
                                        <button
                                            onClick={() => handleAddService(service.id)}
                                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" /> Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
                        <h3 className="font-bold text-white mb-4">Vendor Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Response Rate</span>
                                <span className="text-white font-medium">98%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Completed Events</span>
                                <span className="text-white font-medium">{vendor.reviewCount}+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEventModal && (
                <CreateEventModal
                    isOpen={showEventModal}
                    onClose={() => setShowEventModal(false)}
                />
            )}
        </div>
    );
};

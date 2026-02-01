import React from 'react';
import { Star, MapPin } from 'lucide-react';
import type { Vendor } from '../../../types/marketplace';


interface VendorCardProps {
    vendor: Vendor;
    onClick?: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
        >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden relative">
                <img
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {vendor.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg text-white group-hover:text-primary transition-colors">{vendor.name}</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{vendor.category}</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{vendor.location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="text-sm text-slate-400">
                        Starts from
                    </div>
                    <div className="font-bold text-white">
                        ₹{vendor.minPrice.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

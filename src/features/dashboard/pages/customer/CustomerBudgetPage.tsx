import React from 'react';
import { ComingSoon } from '../../../../components/ui/ComingSoon';

export const CustomerBudgetPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold font-display text-white">Event Budget</h1>
            <ComingSoon />
        </div>
    );
};

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    console.log('RequireAuth check:', { isAuthenticated, user, path: location.pathname });

    if (!isAuthenticated) {
        console.warn('RequireAuth: Not authenticated, redirecting to login');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

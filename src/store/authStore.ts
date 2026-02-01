import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (credentials) => {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Login failed');
                }
                const data = await response.json();
                console.log('Store: Login response data:', data);
                set({ user: data.user, token: data.token, isAuthenticated: true });
                console.log('Store: State updated to authenticated');
            },
            signup: async (userData) => {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Signup failed');
                }
                const data = await response.json();
                set({ user: data.user, token: data.token, isAuthenticated: true });
            },
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'eventnomous-auth', // unique name for local storage
        }
    )
);

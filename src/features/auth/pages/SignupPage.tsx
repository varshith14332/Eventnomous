import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import type { UserRole } from '../../../types/auth';
import { Mail, User as UserIcon, Lock, Briefcase, Store, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { sanitizeObject } from '../../../lib/security';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['CUSTOMER', 'MANAGER', 'VENDOR', 'ADMIN']),
});

type SignupForm = z.infer<typeof signupSchema>;

const roles: { id: UserRole; title: string; icon: any; description: string }[] = [
    {
        id: 'CUSTOMER',
        title: 'Customer',
        icon: UserIcon,
        description: 'I want to plan and book events.',
    },
    {
        id: 'MANAGER',
        title: 'Event Manager',
        icon: Briefcase,
        description: 'I organize events for clients.',
    },
    {
        id: 'VENDOR',
        title: 'Venue / Vendor',
        icon: Store,
        description: 'I want to list my services.',
    },
];

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const signup = useAuthStore((state) => state.signup);
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: 'CUSTOMER',
        },
    });

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setValue('role', role);
    };

    const onSubmit = async (data: SignupForm) => {
        console.log('Form submitted:', data);
        setIsLoading(true);

        try {
            let cleanData;
            try {
                cleanData = sanitizeObject(data);
                console.log('Sanitized data:', cleanData);
            } catch (err) {
                console.warn('Sanitization failed, using raw data:', err);
                cleanData = data;
            }

            await signup(cleanData);
            console.log('Signup successful');
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Signup error:', error);
            alert(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-slate-400">
                    {step === 1 ? 'Choose how you want to use Eventnomous' : 'Enter your details to get started'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid gap-4">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRole === role.id;
                                return (
                                    <div
                                        key={role.id}
                                        onClick={() => handleRoleSelect(role.id)}
                                        className={cn(
                                            "cursor-pointer relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                                            isSelected
                                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                                                : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                                        )}
                                    >
                                        <div className={cn("p-3 rounded-full", isSelected ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-400")}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={cn("font-semibold text-lg", isSelected ? "text-white" : "text-slate-300")}>{role.title}</h3>
                                            <p className="text-sm text-slate-400">{role.description}</p>
                                        </div>
                                        {isSelected && <CheckCircle2 className="h-6 w-6 text-primary" />}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            disabled={!selectedRole}
                            onClick={() => setStep(2)}
                            className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-slide-in-right">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                <input
                                    {...register('name')}
                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-slate-400 hover:text-white text-sm mt-2"
                        >
                            Back to Role Selection
                        </button>
                    </div>
                )}
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

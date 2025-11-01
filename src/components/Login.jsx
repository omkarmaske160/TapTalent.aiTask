import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cloud, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { signInWithGoogle } from '../config/firebase';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const handleGoogleLogin = async () => {
        dispatch(loginStart());
        try {
            const result = await signInWithGoogle();
            const user = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            };
            dispatch(loginSuccess(user));
            navigate('/dashboard');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/home')}
                className="absolute top-8 left-8 glass p-3 rounded-2xl text-white hover:bg-white/20 transition-all"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Login Card */}
            <div className="relative glass-card rounded-3xl p-10 w-full max-w-md animate-fadeInUp">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                            <Cloud className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-slate-300 text-lg">Sign in to your weather dashboard</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-slate-300 text-sm font-medium mb-3">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-4 pl-12 glass-card rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-8">
                    <label className="block text-slate-300 text-sm font-medium mb-3">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="w-full px-4 py-4 pl-12 pr-12 glass-card rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    disabled={loading}
                    className="w-full btn-primary py-4 text-lg rounded-xl mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-slate-600"></div>
                    <span className="px-6 text-slate-400 text-sm">or continue with</span>
                    <div className="flex-1 border-t border-slate-600"></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full glass-card border border-slate-600 text-white py-4 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    {loading ? 'Signing In...' : 'Continue with Google'}
                </button>

                {/* Register Link */}
                <div className="text-center">
                    <p className="text-slate-300">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
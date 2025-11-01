import { useNavigate } from 'react-router-dom';
import { Cloud, Sun, CloudRain, ArrowRight, BarChart3, Globe, Shield, Zap } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 text-blue-400/20 animate-float">
                    <Cloud className="w-32 h-32" />
                </div>
                <div className="absolute top-40 right-16 text-yellow-400/20 animate-float" style={{ animationDelay: '1s' }}>
                    <Sun className="w-24 h-24" />
                </div>
                <div className="absolute bottom-32 left-32 text-blue-300/20 animate-float" style={{ animationDelay: '2s' }}>
                    <CloudRain className="w-28 h-28" />
                </div>
                <div className="absolute bottom-20 right-20 text-indigo-400/20 animate-float" style={{ animationDelay: '0.5s' }}>
                    <Cloud className="w-20 h-20" />
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-20 animate-fadeInUp">
                    <div className="flex justify-center mb-8">
                        <div className="glass p-8 rounded-3xl animate-pulse-glow">
                            <Cloud className="w-20 h-20 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
                        Weather
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Pro
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Experience the future of weather analytics with real-time data,
                        AI-powered forecasts, and stunning visualizations
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                        <button
                            onClick={() => navigate('/login')}
                            className="btn-primary flex items-center justify-center gap-3 px-10 py-4 text-lg rounded-2xl transform hover:scale-105"
                        >
                            <Zap className="w-6 h-6" />
                            Get Started
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="btn-secondary flex items-center justify-center gap-3 px-10 py-4 text-lg rounded-2xl"
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="glass-card rounded-3xl p-8 card-hover">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-fit mb-6">
                            <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Smart Analytics
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            Advanced charts and visualizations powered by machine learning to predict weather patterns
                        </p>
                    </div>

                    <div className="glass-card rounded-3xl p-8 card-hover">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl w-fit mb-6">
                            <Globe className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Global Coverage
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            Access weather data from over 200,000 cities worldwide with real-time updates
                        </p>
                    </div>

                    <div className="glass-card rounded-3xl p-8 card-hover">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-fit mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Secure & Fast
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            Enterprise-grade security with lightning-fast performance and 99.9% uptime
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="glass-card rounded-3xl p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                                7-Day
                            </div>
                            <div className="text-slate-300 text-lg">Forecasts</div>
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                                Real-time
                            </div>
                            <div className="text-slate-300 text-lg">Updates</div>
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                                200K+
                            </div>
                            <div className="text-slate-300 text-lg">Cities</div>
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-3">
                                99.9%
                            </div>
                            <div className="text-slate-300 text-lg">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
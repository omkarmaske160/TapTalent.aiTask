import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cloud, LogOut, User } from 'lucide-react';
import { logout as logoutAction } from '../store/authSlice';
import { logout as firebaseLogout } from '../config/firebase';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await firebaseLogout();
            dispatch(logoutAction());
            navigate('/home');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <nav className="glass-card border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-xl">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                            <Cloud className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                WeatherPro
                            </h1>
                            <p className="text-xs text-slate-400">Analytics Dashboard</p>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-6">
                        {/* User Info */}
                        <div className="flex items-center space-x-4">

                            <div className="hidden md:block">
                                <p className="text-lg font-semibold text-white">
                                    {user?.displayName || 'User'}
                                </p>
                                <p className="text-sm text-slate-400">{user?.email}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-6 py-3 glass-card hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-2xl transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="hidden md:inline font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
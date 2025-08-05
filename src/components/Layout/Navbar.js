import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img src="/images/HS_NOVO.svg" alt="Hacker League" className="navbar-logo" />
                    Hacker League
                </Link>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {isAuthenticated && (
                        <>
                            <Link to="/leaderboard" className="navbar-link">
                                Leaderboard
                            </Link>
                            <Link to="/profile" className="navbar-link">
                                Profile
                            </Link>
                            <Link to="/history" className="navbar-link">
                                History
                            </Link>
                            {user?.roles?.includes('admin') && (
                                <Link to="/admin" className="navbar-link">
                                    Admin
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="navbar-auth">
                    {isAuthenticated ? (
                        <div className="user-info">
                            <span className="username">{user?.username}</span>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}
                </div>

                <button 
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 
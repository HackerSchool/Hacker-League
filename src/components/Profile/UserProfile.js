import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUserAPI, mockLeaderboardAPI } from '../../services/mockDataService';
import './Profile.css';

const UserProfile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [teams, setTeams] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [logoUrl, setLogoUrl] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const data = await mockUserAPI.getUser(user.username);
            setProfileData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setMessage('Error loading profile data');
        } finally {
            setLoading(false);
        }
    }, [user?.username]);

    const fetchTeams = useCallback(async () => {
        try {
            const teamsData = await mockLeaderboardAPI.getTeams();
            setTeams(teamsData);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            await mockUserAPI.updateUser(user.username, profileData);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSaving(true);
            
            // Convert file to base64 for localStorage storage
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                
                // Store in localStorage
                localStorage.setItem(`userLogo_${user.username}`, base64String);
                
                // Set the logo URL
                setLogoUrl(base64String);
                
                setMessage('Logo uploaded successfully!');
                setSaving(false);
            };
            
            reader.readAsDataURL(file);
            
        } catch (error) {
            console.error('Error uploading logo:', error);
            setMessage('Error uploading logo');
            setSaving(false);
        }
    };

    const fetchUserLogo = useCallback(async () => {
        try {
            // First try to get from localStorage
            const storedLogo = localStorage.getItem(`userLogo_${user.username}`);
            if (storedLogo) {
                setLogoUrl(storedLogo);
                return;
            }
            
            // Fallback to mock API if no stored logo
            const blob = await mockUserAPI.getUserLogo(user.username);
            const url = URL.createObjectURL(blob);
            setLogoUrl(url);
        } catch (error) {
            console.error('Error fetching user logo:', error);
        }
    }, [user?.username]);

    useEffect(() => {
        if (user?.username) {
            fetchUserData();
            fetchUserLogo();
            fetchTeams();
        }
    }, [user?.username, fetchUserData, fetchUserLogo, fetchTeams]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                
                {message && (
                    <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                        {message}
                    </div>
                )}

                <div className="profile-header">
                    <div className="profile-logo">
                        {logoUrl ? (
                            <img src={logoUrl} alt="User Logo" className="user-logo" />
                        ) : (
                            <div className="user-logo-placeholder">
                                <span>No Logo</span>
                            </div>
                        )}
                        <input
                            type="file"
                            id="logo-upload"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={saving}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="logo-upload" className="btn btn-secondary upload-btn">
                            {saving ? 'Uploading...' : 'Upload Logo'}
                        </label>
                    </div>
                    
                    <div className="profile-info">
                        <h3>{profileData.name || user?.username}</h3>
                        <p className="username">@{user?.username}</p>
                        {profileData.roles && (
                            <p className="roles">Roles: {profileData.roles.join(', ')}</p>
                        )}
                        {profileData.memberNumber && (
                            <p className="member-number">Member #{profileData.memberNumber}</p>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profileData.name || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profileData.email || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <input
                                type="text"
                                id="course"
                                name="course"
                                value={profileData.course || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="team">Teams</label>
                            {isEditing ? (
                                <div className="teams-checkbox-container">
                                    {teams.map((team) => (
                                        <label key={team.name} className="team-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={profileData.teams && profileData.teams.includes(team.name)}
                                                onChange={(e) => {
                                                    const currentTeams = profileData.teams || [];
                                                    if (e.target.checked) {
                                                        setProfileData(prev => ({
                                                            ...prev,
                                                            teams: [...currentTeams, team.name]
                                                        }));
                                                    } else {
                                                        setProfileData(prev => ({
                                                            ...prev,
                                                            teams: currentTeams.filter(t => t !== team.name)
                                                        }));
                                                    }
                                                }}
                                                disabled={saving}
                                            />
                                            <span className="checkbox-label">
                                                {team.name} ({team.members} members)
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="teams-display">
                                    {profileData.teams && profileData.teams.length > 0 
                                        ? profileData.teams.join(', ')
                                        : 'No teams selected'}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="istId">IST ID</label>
                            <input
                                type="text"
                                id="istId"
                                name="istId"
                                value={profileData.istId || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="joinDate">Join Date</label>
                            <input
                                type="date"
                                id="joinDate"
                                name="joinDate"
                                value={profileData.joinDate || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="extra">Extra Info</label>
                        <input
                            type="text"
                            id="extra"
                            name="extra"
                            value={profileData.extra || ''}
                            onChange={handleChange}
                            disabled={!isEditing || saving}
                            placeholder="e.g., CTF champion, Web3 expert"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={profileData.description || ''}
                            onChange={handleChange}
                            disabled={!isEditing || saving}
                            rows="4"
                            placeholder="Tell us about yourself, your interests, and expertise..."
                        />
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setIsEditing(false);
                                        fetchUserData(); // Reset to original data
                                    }}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : null}
                    </div>
                </form>

                {!isEditing && (
                    <div className="profile-actions">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}

                {/* Additional Info Section */}
                <div className="profile-additional-info">
                    <h4>Additional Information</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Member Number:</span>
                            <span className="info-value">{profileData.memberNumber || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Join Date:</span>
                            <span className="info-value">{formatDate(profileData.joinDate)}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">IST ID:</span>
                            <span className="info-value">{profileData.istId || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Roles:</span>
                            <span className="info-value">{profileData.roles ? profileData.roles.join(', ') : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 
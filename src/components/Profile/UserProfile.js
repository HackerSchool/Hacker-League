import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUserAPI, mockLeaderboardAPI } from '../../services/mockDataService';
import './Profile.css';

const UserProfile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [userTeams, setUserTeams] = useState([]);
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

    const fetchUserTeams = useCallback(async () => {
        try {
            // Fetch all teams and filter for user's teams based on profile data
            const allTeams = await mockLeaderboardAPI.getTeams();
            if (profileData.teams) {
                const matchedTeams = allTeams.filter(team => 
                    profileData.teams.includes(team.name)
                );
                setUserTeams(matchedTeams);
            }
        } catch (error) {
            console.error('Error fetching user teams:', error);
        }
    }, [profileData.teams]);

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
        }
    }, [user?.username, fetchUserData, fetchUserLogo]);

    // Fetch teams when profile data changes
    useEffect(() => {
        if (profileData.teams) {
            fetchUserTeams();
        }
    }, [profileData.teams, fetchUserTeams]);

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
                            <div className="teams-display">
                                {userTeams && userTeams.length > 0 
                                    ? userTeams.map(team => (
                                        <span key={team.name} className="team-badge" title={`${team.members} members`}>
                                            {team.name}
                                        </span>
                                    ))
                                    : <span className="no-teams">No teams assigned</span>}
                            </div>
                            <small className="form-help">Teams are managed by administrators</small>
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

                    {/* Social Media Section */}
                    <div className="social-media-section">
                        <h4>🔗 Social Links</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="linkedinUrl">
                                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    id="linkedinUrl"
                                    name="linkedinUrl"
                                    value={profileData.linkedinUrl || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing || saving}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="githubUsername">
                                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                </label>
                                <input
                                    type="text"
                                    id="githubUsername"
                                    name="githubUsername"
                                    value={profileData.githubUsername || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing || saving}
                                    placeholder="yourusername"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="discordUsername">
                                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                                </svg>
                                Discord
                            </label>
                            <input
                                type="text"
                                id="discordUsername"
                                name="discordUsername"
                                value={profileData.discordUsername || ''}
                                onChange={handleChange}
                                disabled={!isEditing || saving}
                                placeholder="username#1234"
                            />
                        </div>
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
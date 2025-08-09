import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLeaderboardAPI } from '../../services/mockDataService';
import './Leaderboard.css';

const LeaderboardTable = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('teams');
    const [sortBy, setSortBy] = useState('totalPoints');
    const [expandedTeams, setExpandedTeams] = useState(new Set());
    const [expandedIndividuals, setExpandedIndividuals] = useState(new Set());
    const [teamHistory, setTeamHistory] = useState({});
    const [individualHistory, setIndividualHistory] = useState({});

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    const fetchLeaderboardData = async () => {
        try {
            setLoading(true);
            const [teamsData, individualsData, statsData] = await Promise.all([
                mockLeaderboardAPI.getTeams(),
                mockLeaderboardAPI.getIndividuals(),
                mockLeaderboardAPI.getStats()
            ]);
            
            // Calculate total points for teams
            const teamsWithCalculatedTotal = teamsData.map(team => ({
                ...team,
                totalPoints: team.pjPoints + team.pccPoints
            }));
            
            // Calculate total points for individuals
            const individualsWithCalculatedTotal = individualsData.map(individual => ({
                ...individual,
                totalPoints: individual.pjPoints + individual.pccPoints
            }));
            
            setTeams(teamsWithCalculatedTotal);
            setIndividuals(individualsWithCalculatedTotal);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setError('Failed to load leaderboard data');
        } finally {
            setLoading(false);
        }
    };

    // Sort data based on sortBy selection
    const getSortedData = (data) => {
        return [...data].sort((a, b) => {
            switch (sortBy) {
                case 'totalPoints':
                    return b.totalPoints - a.totalPoints;
                case 'pjPoints':
                    return b.pjPoints - a.pjPoints;
                case 'pccPoints':
                    return b.pccPoints - a.pccPoints;
                default:
                    return b.totalPoints - a.totalPoints;
            }
        });
    };

    const toggleTeamExpansion = async (teamName) => {
        const newExpandedTeams = new Set(expandedTeams);
        
        if (newExpandedTeams.has(teamName)) {
            newExpandedTeams.delete(teamName);
        } else {
            newExpandedTeams.add(teamName);
            // Fetch history if not already loaded
            if (!teamHistory[teamName]) {
                try {
                    const history = await mockLeaderboardAPI.getTeamHistory(teamName, 3);
                    setTeamHistory(prev => ({
                        ...prev,
                        [teamName]: history
                    }));
                } catch (error) {
                    console.error('Error fetching team history:', error);
                }
            }
        }
        
        setExpandedTeams(newExpandedTeams);
    };

    const toggleIndividualExpansion = async (individualName) => {
        const newExpandedIndividuals = new Set(expandedIndividuals);
        
        if (newExpandedIndividuals.has(individualName)) {
            newExpandedIndividuals.delete(individualName);
        } else {
            newExpandedIndividuals.add(individualName);
            // Fetch history if not already loaded
            if (!individualHistory[individualName]) {
                try {
                    const history = await mockLeaderboardAPI.getIndividualHistory(individualName, 3);
                    setIndividualHistory(prev => ({
                        ...prev,
                        [individualName]: history
                    }));
                } catch (error) {
                    console.error('Error fetching individual history:', error);
                }
            }
        }
        
        setExpandedIndividuals(newExpandedIndividuals);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getPointTypeColor = (type) => {
        return type === 'PJ' ? '#e74c3c' : '#3498db';
    };

    if (loading) {
        return <div className="loading">Loading leaderboard...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Get sorted data
    const sortedTeams = getSortedData(teams);
    const sortedIndividuals = getSortedData(individuals);

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1>Hacker League Leaderboard</h1>
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-number">{stats.totalParticipants || 0}</span>
                        <span className="stat-label">Participants</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.activeTeams || 0}</span>
                        <span className="stat-label">Teams</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.totalPoints || 0}</span>
                        <span className="stat-label">Total Points</span>
                    </div>
                </div>
            </div>



            {activeTab === 'teams' && (
                <div className="leaderboard-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="header-controls">
                                        <span>Rank</span>
                                        <select className="inline-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                            <option value="totalPoints">Total Points</option>
                                            <option value="pjPoints">PJ Points</option>
                                            <option value="pccPoints">PCC Points</option>
                                        </select>
                                    </div>
                                </th>
                                <th>
                                    <div className="header-controls">
                                        <span>Team</span>
                                        <select className="inline-select" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                                            <option value="teams">Teams</option>
                                            <option value="individuals">Individuals</option>
                                        </select>
                                    </div>
                                </th>
                                <th>Members</th>
                                {sortBy === 'pjPoints' ? (
                                    <>
                                        <th>PCC Points</th>
                                        <th>Total Points</th>
                                        <th className="highlighted-column">PJ Points</th>
                                    </>
                                ) : sortBy === 'pccPoints' ? (
                                    <>
                                        <th>PJ Points</th>
                                        <th>Total Points</th>
                                        <th className="highlighted-column">PCC Points</th>
                                    </>
                                ) : (
                                    <>
                                        <th>PJ Points</th>
                                        <th>PCC Points</th>
                                        <th className="highlighted-column">Total Points</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTeams.map((team, index) => (
                                <React.Fragment key={team.name}>
                                    <tr 
                                        className={`${index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : index === 3 ? 'rank-4' : index === 4 ? 'rank-5' : 'top-three'} ${expandedTeams.has(team.name) ? 'expanded' : ''}`}
                                        onClick={() => toggleTeamExpansion(team.name)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="rank">
                                            <div className="rank-content">
                                                {index + 1}
                                                {index === 0 && <span className="medal">🥇</span>}
                                                {index === 1 && <span className="medal">🥈</span>}
                                                {index === 2 && <span className="medal">🥉</span>}
                                                {index === 3 && <span className="medal">🎖️</span>}
                                                {index === 4 && <span className="medal">🎖️</span>}
                                            </div>
                                        </td>
                                        <td className="team-name">
                                            <div className="team-name-content">
                                                {team.name}
                                                <span className="expand-icon">
                                                    {expandedTeams.has(team.name) ? '▼' : '▶'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="members">{team.members}</td>
                                        {sortBy === 'pjPoints' ? (
                                            <>
                                                <td className="pcc-points">{team.pccPoints}</td>
                                                <td className="total-points dimmed">{team.totalPoints}</td>
                                                <td className="pj-points highlighted">{team.pjPoints}</td>
                                            </>
                                        ) : sortBy === 'pccPoints' ? (
                                            <>
                                                <td className="pj-points">{team.pjPoints}</td>
                                                <td className="total-points dimmed">{team.totalPoints}</td>
                                                <td className="pcc-points highlighted">{team.pccPoints}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="pj-points">{team.pjPoints}</td>
                                                <td className="pcc-points">{team.pccPoints}</td>
                                                <td className="total-points highlighted">{team.totalPoints}</td>
                                            </>
                                        )}
                                        
                                    </tr>
                                    {expandedTeams.has(team.name) && (
                                        <tr className="history-row">
                                            <td colSpan="6">
                                                <div className="team-history">
                                                    <h4>Recent Activity</h4>
                                                    {teamHistory[team.name] ? (
                                                        <>
                                                            <div className="history-list">
                                                                {teamHistory[team.name].map((entry, idx) => (
                                                                    <div key={idx} className="history-item">
                                                                        <div className="history-info">
                                                                            <span className="member-name">{entry.membro}</span>
                                                                            <span className="activity-description">{entry.descrição}</span>
                                                                            <span className="activity-date">{formatDate(entry.data)}</span>
                                                                        </div>
                                                                        <div className="history-points">
                                                                            <span 
                                                                                className="point-type"
                                                                                style={{ color: getPointTypeColor(entry.tipo) }}
                                                                            >
                                                                                {entry.tipo}
                                                                            </span>
                                                                            <span className="point-value">+{entry.pontos}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="history-footer">
                                                                <button 
                                                                    className="btn btn-secondary see-more-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate('/history');
                                                                    }}
                                                                >
                                                                    See more...
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="loading-history">Loading history...</div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'individuals' && (
                <div className="leaderboard-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="header-controls">
                                        <span>Rank</span>
                                        <select className="inline-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                            <option value="totalPoints">Total Points</option>
                                            <option value="pjPoints">PJ Points</option>
                                            <option value="pccPoints">PCC Points</option>
                                        </select>
                                    </div>
                                </th>
                                <th>
                                    <div className="header-controls">
                                        <span>Name</span>
                                        <select className="inline-select" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                                            <option value="teams">Teams</option>
                                            <option value="individuals">Individuals</option>
                                        </select>
                                    </div>
                                </th>
                                <th>Team</th>
                                {sortBy === 'pjPoints' ? (
                                    <>
                                        <th>PCC Points</th>
                                        <th>Total Points</th>
                                        <th className="highlighted-column">PJ Points</th>
                                    </>
                                ) : sortBy === 'pccPoints' ? (
                                    <>
                                        <th>PJ Points</th>
                                        <th>Total Points</th>
                                        <th className="highlighted-column">PCC Points</th>
                                    </>
                                ) : (
                                    <>
                                        <th>PJ Points</th>
                                        <th>PCC Points</th>
                                        <th className="highlighted-column">Total Points</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedIndividuals.map((individual, index) => (
                                <React.Fragment key={individual.name}>
                                    <tr 
                                        className={`${index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : index === 3 ? 'rank-4' : index === 4 ? 'rank-5' : 'top-three'} ${expandedIndividuals.has(individual.name) ? 'expanded' : ''}`}
                                        onClick={() => toggleIndividualExpansion(individual.name)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="rank">
                                            <div className="rank-content">
                                                {index + 1}
                                                {index === 0 && <span className="medal">🥇</span>}
                                                {index === 1 && <span className="medal">🥈</span>}
                                                {index === 2 && <span className="medal">🥉</span>}
                                                {index === 3 && <span className="medal">🎖️</span>}
                                                {index === 4 && <span className="medal">🎖️</span>}
                                            </div>
                                        </td>
                                        <td className="individual-name">
                                            <div className="team-name-content">
                                                {individual.name}
                                                <span className="expand-icon">
                                                    {expandedIndividuals.has(individual.name) ? '▼' : '▶'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="team">{individual.team}</td>
                                        {sortBy === 'pjPoints' ? (
                                            <>
                                                <td className="pcc-points">{individual.pccPoints}</td>
                                                <td className="total-points dimmed">{individual.totalPoints}</td>
                                                <td className="pj-points highlighted">{individual.pjPoints}</td>
                                            </>
                                        ) : sortBy === 'pccPoints' ? (
                                            <>
                                                <td className="pj-points">{individual.pjPoints}</td>
                                                <td className="total-points dimmed">{individual.totalPoints}</td>
                                                <td className="pcc-points highlighted">{individual.pccPoints}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="pj-points">{individual.pjPoints}</td>
                                                <td className="pcc-points">{individual.pccPoints}</td>
                                                <td className="total-points highlighted">{individual.totalPoints}</td>
                                            </>
                                        )}
                                    </tr>
                                    {expandedIndividuals.has(individual.name) && (
                                        <tr className="history-row">
                                            <td colSpan="6">
                                                <div className="individual-history">
                                                    <h4>Recent Activity</h4>
                                                    {individualHistory[individual.name] ? (
                                                        <>
                                                            <div className="history-list">
                                                                {individualHistory[individual.name].map((entry, idx) => (
                                                                    <div key={idx} className="history-item">
                                                                        <div className="history-info">
                                                                            <span className="activity-description">{entry.descrição}</span>
                                                                            <span className="activity-date">{formatDate(entry.data)}</span>
                                                                        </div>
                                                                        <div className="history-points">
                                                                            <span 
                                                                                className="point-type"
                                                                                style={{ color: getPointTypeColor(entry.tipo) }}
                                                                            >
                                                                                {entry.tipo}
                                                                            </span>
                                                                            <span className="point-value">+{entry.pontos}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="history-footer">
                                                                <button 
                                                                    className="btn btn-secondary see-more-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate('/history');
                                                                    }}
                                                                >
                                                                    See more...
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="loading-history">Loading history...</div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LeaderboardTable; 
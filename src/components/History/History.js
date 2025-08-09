import React, { useState, useEffect, useCallback } from 'react';
import { mockLeaderboardAPI } from '../../services/mockDataService';
import './History.css';

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [entityType, setEntityType] = useState('teams');
    const [entityFilter, setEntityFilter] = useState('all');
    const [pointsType, setPointsType] = useState('all');
    const [expandedRows, setExpandedRows] = useState(new Set());

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [history, teamsData, individualsData] = await Promise.all([
                mockLeaderboardAPI.getAllHistory(),
                mockLeaderboardAPI.getTeams(),
                mockLeaderboardAPI.getIndividuals()
            ]);
            
            setHistoryData(history);
            setTeams(teamsData);
            setIndividuals(individualsData);
        } catch (error) {
            console.error('Error fetching history data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getFilteredData = () => {
        let filtered = historyData;
        
        // Filter by entity
        if (entityFilter !== 'all') {
            if (entityType === 'teams') {
                filtered = filtered.filter(entry => entry.equipa === entityFilter);
            } else {
                filtered = filtered.filter(entry => entry.membro === entityFilter);
            }
        }
        
        // Filter by points type
        if (pointsType !== 'all') {
            filtered = filtered.filter(entry => entry.tipo === pointsType);
        }
        
        return filtered;
    };

    const getEntityOptions = () => {
        if (entityType === 'teams') {
            return teams.map(team => ({ value: team.name, label: team.name }));
        } else {
            return individuals.map(individual => ({ value: individual.name, label: individual.name }));
        }
    };

    const toggleRowExpansion = (rowId) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(rowId)) {
            newExpandedRows.delete(rowId);
        } else {
            newExpandedRows.add(rowId);
        }
        setExpandedRows(newExpandedRows);
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
        return type === 'PJ' ? '#ff6b6b' : '#4ecdff';
    };

    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    const handleEntityTypeChange = (newType) => {
        setEntityType(newType);
        setEntityFilter('all');
        setCurrentPage(1);
    };

    const handleEntityFilterChange = (newFilter) => {
        setEntityFilter(newFilter);
        setCurrentPage(1);
    };

    const handlePointsTypeChange = (newType) => {
        setPointsType(newType);
        setCurrentPage(1);
    };

    if (loading) {
        return <div className="loading">Loading history...</div>;
    }

    return (
        <div className="history-container">
            <header className="history-header">
                <h1>📊 Points History</h1>
                <p>Track all point activities and achievements</p>
            </header>

            <div className="history-content">
                <div className="history-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>
                                    <div className="header-controls">
                                        <span>{entityType === 'teams' ? 'Team' : 'Member'}</span>
                                        <select 
                                            value={entityType} 
                                            onChange={(e) => handleEntityTypeChange(e.target.value)}
                                            className="inline-select"
                                        >
                                            <option value="teams">Teams</option>
                                            <option value="members">Members</option>
                                        </select>
                                    </div>
                                </th>
                                {entityType === 'members' && <th>Team</th>}
                                <th>
                                    <div className="header-controls">
                                        <span>Type</span>
                                        <select 
                                            value={pointsType} 
                                            onChange={(e) => handlePointsTypeChange(e.target.value)}
                                            className="inline-select"
                                        >
                                            <option value="all">All</option>
                                            <option value="PJ">PJ</option>
                                            <option value="PCC">PCC</option>
                                        </select>
                                    </div>
                                </th>
                                <th>
                                    <div className="header-controls">
                                        <span>Points</span>
                                        <select 
                                            value={entityFilter} 
                                            onChange={(e) => handleEntityFilterChange(e.target.value)}
                                            className="inline-select"
                                        >
                                            <option value="all">All</option>
                                            {getEntityOptions().map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.length === 0 ? (
                                <tr>
                                    <td colSpan={entityType === 'members' ? 5 : 4} className="no-data">
                                        No history entries found for the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                pageData.map((entry, index) => {
                                    const rowId = `history-row-${currentPage}-${index}`;
                                    const isExpanded = expandedRows.has(rowId);
                                    
                                    return (
                                        <React.Fragment key={rowId}>
                                            <tr 
                                                className={`history-row clickable-row ${isExpanded ? 'expanded' : ''}`}
                                                onClick={() => toggleRowExpansion(rowId)}
                                            >
                                                <td className="date-cell">{formatDate(entry.data)}</td>
                                                <td className="entity-cell">
                                                    {entityType === 'teams' ? entry.equipa : entry.membro}
                                                </td>
                                                {entityType === 'members' && (
                                                    <td className="team-cell">{entry.equipa}</td>
                                                )}
                                                <td className="type-cell">
                                                    <span 
                                                        className="points-type"
                                                        style={{ color: getPointTypeColor(entry.tipo) }}
                                                    >
                                                        {entry.tipo}
                                                    </span>
                                                </td>
                                                <td className="points-cell">+{entry.pontos}</td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="description-row">
                                                    <td colSpan={entityType === 'members' ? 5 : 4} className="description-cell">
                                                        <div className="description-content">
                                                            <h4>📝 Activity Description</h4>
                                                            <p>{entry.descrição}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination-controls">
                <button 
                    className="pagination-btn" 
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <span>←</span> Previous
                </button>
                <div className="page-info">
                    <span>{currentPage}</span> of <span>{totalPages}</span>
                </div>
                <button 
                    className="pagination-btn"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next <span>→</span>
                </button>
            </div>
        </div>
    );
};

export default History;
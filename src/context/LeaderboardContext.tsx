import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Player } from '../models/Player';
import { LeaderboardData } from '../models/LeaderboardData';
import { LeaderboardContextType, LeaderboardProviderProps } from '../models/Context';
import { fetchLeaderboardData } from '../services/faceitApi';

interface LeaderboardState extends LeaderboardData {}

type LeaderboardAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Player[] }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: LeaderboardState = {
  players: [],
  loading: false,
  error: null,
};

const leaderboardReducer = (state: LeaderboardState, action: LeaderboardAction): LeaderboardState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, players: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};

export const LeaderboardProvider: React.FC<LeaderboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(leaderboardReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await fetchLeaderboardData();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: 'Unknown error' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    state,
    fetchData,
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};

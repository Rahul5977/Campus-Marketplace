import { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService.js";
import { tokenManager } from "../utils/tokenManager.js";

export const AuthContext = createContext(null);

// TEMPORARY: Set to true for testing, false for production
const TESTING_MODE = true;

// Mock user for testing
const mockUser = {
  id: "12345",
  name: "Test Student",
  email: "student@iitbhilai.ac.in",
  roles: ["student", "user"],
  verified: true,
  institute: "IIT Bhilai",
  studentId: "2024CS123",
  hostel: "Hostel B",
  avatar: "/api/placeholder/100/100"
};

/**
 * AuthProvider Component
 * Manages global authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Check if user is authenticated on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check authentication status
   */
  const checkAuth = async () => {
    try {
      if (TESTING_MODE) {
        // Auto-login for testing
        setUser(mockUser);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      const token = tokenManager.getToken();
      const storedUser = tokenManager.getUser();

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      if (!TESTING_MODE) {
        tokenManager.clearAuth();
      }
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    try {
      if (TESTING_MODE) {
        // Mock successful login
        setUser(mockUser);
        setIsAuthenticated(true);
        return { 
          data: { 
            user: mockUser,
            token: "mock-token-12345" 
          } 
        };
      }

      const response = await authService.login(credentials);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register new user
   * @param {Object} userData - Registration data
   */
  const register = async (userData) => {
    try {
      if (TESTING_MODE) {
        // Mock successful registration
        const newUser = {
          ...mockUser,
          ...userData,
          id: "67890",
        };
        setUser(newUser);
        setIsAuthenticated(true);
        return { 
          data: { 
            user: newUser,
            token: "mock-token-67890" 
          } 
        };
      }

      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      if (!TESTING_MODE) {
        await authService.logout();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (!TESTING_MODE) {
        tokenManager.clearAuth();
      }
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Update user data
   * @param {Object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    if (!TESTING_MODE) {
      tokenManager.setUser(userData);
    }
  };

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  const hasRole = useCallback(
    (role) => {
      return user?.roles?.includes(role) || false;
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   * @param {Array<string>} roles - Roles to check
   * @returns {boolean}
   */
  const hasAnyRole = useCallback(
    (roles) => {
      return roles.some((role) => user?.roles?.includes(role)) || false;
    },
    [user]
  );

  /**
   * Check if user can create listings
   * @returns {boolean}
   */
  const canCreateListing = useCallback(() => {
    const allowedRoles = [
      "student",
      "vendor_admin",
      "club_admin",
      "admin",
      "moderator",
    ];
    return hasAnyRole(allowedRoles);
  }, [hasAnyRole]);

  /**
   * Check if user is admin or moderator
   * @returns {boolean}
   */
  const isAdminOrModerator = useCallback(() => {
    return hasAnyRole(["admin", "moderator"]);
  }, [hasAnyRole]);

  /**
   * Refresh user data from server
   */
  const refreshUser = async () => {
    try {
      if (TESTING_MODE) {
        // Just return mock user in testing mode
        return mockUser;
      }

      const response = await authService.getCurrentUser();
      setUser(response.data.user);
      tokenManager.setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    checkAuth,
    hasRole,
    hasAnyRole,
    canCreateListing,
    isAdminOrModerator,
    // Helper for testing
    isTestMode: TESTING_MODE,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
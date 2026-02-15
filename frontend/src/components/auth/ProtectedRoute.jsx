import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Optionally checks for specific roles
 */
const ProtectedRoute = ({
  children,
  requiredRoles = [],
  requireAuth = true,
  fallbackPath = "/login",
  loadingComponent = null,
}) => {
  const { isAuthenticated, user, loading, isTestMode } = useAuth();
  const location = useLocation();

  // TEMPORARY: Bypass all checks in test mode
  if (isTestMode) {
    return children ? children : <Outlet />;
  }

  // Custom loading component or default spinner
  if (loading) {
    if (loadingComponent) {
      return loadingComponent;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    // Redirect to login, save the attempted location for post-login redirect
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Check if specific roles are required
  if (requiredRoles.length > 0 && isAuthenticated) {
    // Ensure user.roles exists (default to empty array)
    const userRoles = user?.roles || [];
    
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      // User doesn't have required role, redirect to unauthorized page
      return <Navigate to="/unauthorized" state={{ 
        from: location.pathname,
        requiredRoles,
        userRoles 
      }} replace />;
    }
  }

  // If requireAuth is false but user is authenticated, still allow access
  // This is useful for routes that can be accessed by both guests and authenticated users
  if (!requireAuth) {
    return children ? children : <Outlet />;
  }

  // User is authenticated and has required roles (if any)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

import { ThemeProvider } from './hooks/useTheme';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import CollaborationPage from "./pages/CollaborationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIFeaturesPage from "./pages/AIFeaturesPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If still loading, you might want to show a loading spinner
  if (isLoading) {
    return <div className="min-h-screen gradient-bg flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

// Already authenticated route - redirects to dashboard if already logged in
const AlreadyAuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If still loading, show a loading spinner
  if (isLoading) {
    return <div className="min-h-screen gradient-bg flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    
    {/* Public routes - redirect to dashboard if already logged in */}
    <Route element={<AlreadyAuthRoute />}>
      <Route path="/auth" element={<AuthPage />} />
    </Route>
    
    {/* Protected routes - require authentication */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/collaboration" element={<CollaborationPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/ai-features" element={<AIFeaturesPage />} />
    </Route>
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router";
import { Navigation } from "./pages/Navigation";
import { useGetRoot } from "./services/useGetRoot";
import supabase from "./supabaseClient";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Dashboard } from "./pages/DashboardPage";
import { UserProfile } from "./pages/UserProfile";

function App() {
  const { data } = useGetRoot();
  console.log("data", data);

  const [session, setSession] = useState<Session | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        if (session?.user?.identities) {
          setUserDisplayName(
            session.user.identities[0].identity_data?.full_name
          );
        }
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.identities) {
        setUserDisplayName(session.user.identities[0].identity_data?.full_name);
      } else {
        setUserDisplayName(undefined);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div>
        {/* Show navigation only when logged in */}
        {session && <Navigation userDisplayName={userDisplayName} />}
        
        <Routes>
          {/* Login route */}
          <Route 
            path="/login" 
            element={
              session ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute session={session}>
                <Dashboard userDisplayName={userDisplayName} session={session} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute session={session}>
                <UserProfile userDisplayName={userDisplayName} session={session} />
              </ProtectedRoute>
            } 
          />
          
          {/* Default route - redirect based on auth state */}
          <Route 
            path="/" 
            element={
              session ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Catch all route */}
          <Route 
            path="*" 
            element={
              session ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
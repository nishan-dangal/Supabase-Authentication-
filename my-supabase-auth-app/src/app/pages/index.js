// pages/index.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Auth from '../components/Auth';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ProtectedRoute>
      <div>
        {session ? (
          <>
            <p>Welcome, {session.user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </ProtectedRoute>
  );
}

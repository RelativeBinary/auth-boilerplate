import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";
import "./App.css";
import { useGetRoot } from "./services/useGetRoot";
import supabase from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";

function App() {
  const { data, loading, error } = useGetRoot();
  console.log("data", data);

  const [session, setSession] = useState<Session | null>(null); // the right type?
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <div>Logged in!</div>;
  }

  return (
    <>
      <div className="content">Content</div>
    </>
  );
}

export default App;

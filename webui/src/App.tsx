import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared"; // pre-built auth component from supabase
import { useState, useEffect } from "react";
import "./App.css";
import { useGetRoot } from "./services/useGetRoot";
import supabase from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";

/**
 * Flow
 * 0. getSession() checks localStoreage returns null, so we stay on the login form`
 * 1. User fils out login form -> Rendered by <Auth> component
 * 2. User clicks login -> <Auth> component calls supabase auth methods internally
 * 3. Supabase authenticates -> makes api call to supabase servers
 * 4. Supabase stores session -> automatically writes to localStorage
 * 5. Auth state changes -> triggers onAuthStateChange() listener
 * 6. Component updates -> setSession(session)
 * 5. User logs in -> supabase stores session in localStorage
 *
 * Refresh flow
 * 2. User refreshes page -> getSession() reads from localStorage
 * 3. Session found - user stays logged in
 * 4. Session exp / invalid -> returns null, user needs to re-auth
 *
 * Meethod notes
 * - getSession() -> Reads from localStorage
 * - onAuthStateChange() -> listens for changes
 * - setSession() -> Updates React state to trigger re-renders
 */

function App() {
  // this is basically testing that the backend server is working
  const { data } = useGetRoot();
  console.log("data", data);

  const [session, setSession] = useState<Session | null>(null); // the right type?
  const [userDisplayName, setUserDisplayName] = useState<string | undefined>();

  // onMount / onUnmount auth handling
  useEffect(() => {
    // setup authentication
    // get the current auth session and update state with it
    supabase.auth
      .getSession() // gets the curr auth state from localStorage (by default)
      // using cookies requires server side configuration (SSR apps)
      .then(({ data: { session } }) => {
        setSession(session);
        if (session?.user?.identities) {
          setUserDisplayName(
            session.user.identities[0].identity_data?.full_name
          );
        }
      });
    // why localStorage?
    // - persistence - (survives refreses and broweser restarts)
    // - security - more secure(?) than cookes for client-side apps (no auto sendign with reqs)
    // - performance - no network overhead (unlike cookies sent w every req)

    // setup a listener for auth state changes (login / logout) and update session state when changes occur
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // listes to <Auth> component
      setSession(session);
      if (session?.user?.identities) {
        setUserDisplayName(session.user.identities[0].identity_data?.full_name);
      }
    });

    // run cleanup function when component dismounts
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('signout error repsonse', error);
  }

  // if the users session is successful return the 'protected' component
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <div>
        Logged in! Welcome {userDisplayName}
        <div>
          {JSON.stringify(session)}
        </div>
        <div>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
    );
  }
}

export default App;

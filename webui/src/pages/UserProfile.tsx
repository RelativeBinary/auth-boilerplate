
import { Link, useNavigate } from "react-router"
import supabase from "../supabaseClient";

export const UserProfile = ({userDisplayName, session}: {userDisplayName: string | undefined, session: any}) => {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Hello, {userDisplayName}</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Session Details:</h3>
        <pre style={{ 
          background: "#f5f5f5", 
          padding: "10px", 
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "12px"
        }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      
      <div>
        <Link to="/dashboard" style={{ marginRight: "10px" }}>
          Back to Dashboard
        </Link>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}
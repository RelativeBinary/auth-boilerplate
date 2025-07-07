import { Link, useNavigate } from "react-router";
import supabase from "../supabaseClient";

export const Navigation = ({ userDisplayName }: { userDisplayName: string | null | undefined}) => {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  };

  return (
    <nav style={{ 
      padding: "10px", 
      borderBottom: "1px solid #ccc", 
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <span style={{ marginRight: "15px" }}>Hello, {userDisplayName}!</span>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </nav>
  );
}
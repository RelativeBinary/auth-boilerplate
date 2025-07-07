import { Link } from "react-router"

export const Dashboard = ({ userDisplayName, session }: {userDisplayName: string | undefined, session: any}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {userDisplayName}!</p>
      <div>
        <Link to="/profile">View Profile</Link>
      </div>
    </div>
  );
}
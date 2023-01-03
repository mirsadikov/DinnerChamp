import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div>
      <h1>Home Screen</h1>
      <Link to="/auth">Go to Auth Screen</Link>
    </div>
  );
}

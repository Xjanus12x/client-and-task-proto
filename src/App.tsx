import "./App.css";
import AddClientForm from "./components/AddClientForm";
import { useStats } from "./context/DashboardContext";

function App() {
  const { totalTasks } = useStats();
  return (
    <>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ display: "grid", gap: "14px" }}>
          <h2>Total Clients</h2>
          <span>1</span>
        </div>
        <div style={{ display: "grid", gap: "14px" }}>
          <h2>Total Tasks</h2>
          <span>{totalTasks}</span>
        </div>
      </div>
      <AddClientForm />
    </>
  );
}

export default App;

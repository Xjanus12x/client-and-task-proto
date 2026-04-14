import type { Client } from "./AddClientForm";

export function Card({ clientName, goals }: Client) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
        {clientName}
      </h3>
      <ul style={{ paddingLeft: "20px" }}>
        {goals.map((goal, index) => (
          <li key={index} style={{ fontSize: "16px", marginBottom: "4px" }}>
            {goal}
          </li>
        ))}
      </ul>
    </div>
  );
}

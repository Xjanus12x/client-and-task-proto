import { useState } from "react";
import type { Client } from "./AddClientForm";

type DataTableProps = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

export function DataTable({ clients, setClients }: DataTableProps) {
  const [editingData, setEditingData] = useState<Client | null>(null);

  const handleEditingDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editingData) {
      const id = e.target.id as keyof Client;

      setEditingData({
        ...editingData,
        [id]:
          id === "goals"
            ? e.target.value.split("\n") // ← no filter here
            : e.target.value,
      });
    }
  };

  const handleSaveEdit = () => {
    if (!editingData) return;

    const cleaned = {
      ...editingData,
      goals: editingData.goals.filter(Boolean),
    };

    setClients((prev) =>
      prev.map((client) => (client.id === cleaned.id ? cleaned : client)),
    );

    setEditingData(null);
  };

  const handleDeleteData = (data: Client) => {
    setClients((prev) => prev.filter((client) => client.id !== data.id));
  };
  return (
    <div
      style={{
        padding: "20px",

        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "700px",
        margin: "20px auto",
        fontFamily: "sans-serif",
        display: "grid",
        gap: "20px",
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "rgb(17, 24, 39)" }}>
        My Clients
      </h2>
      <div style={{ backgroundColor: "white" }}>
        <input
          type="text"
          placeholder="Enter client name..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "16px",
            outline: "none",
          }}
        />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                Client Name
              </th>
              <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                Goals
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr style={{ borderBottom: "1px solid #eee" }} key={index}>
                <td style={{ padding: "12px" }}>{client.clientName}</td>
                <td style={{ padding: "12px" }}>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {client.goals.map((goal, goalIndex) => (
                      <li key={goalIndex}>{goal}</li>
                    ))}
                  </ul>
                </td>
                <td
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "rgb(59, 130, 246)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => setEditingData(client)}
                    disabled={editingData !== null}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "rgb(246, 59, 59)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteData(client)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingData && (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            backgroundColor: "white",
          }}
        >
          <h3>Edit Client</h3>

          <label>
            Client Name:
            <input
              value={editingData?.clientName}
              type="text"
              placeholder="Client Name"
              id="clientName"
              onChange={handleEditingDataChange}
            />
          </label>
          <label>
            Goals:
            <textarea
              id="goals"
              value={editingData.goals.join("\n")}
              placeholder="Enter goals (one per line)"
              onChange={handleEditingDataChange}
            />
          </label>

          <div>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingData(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

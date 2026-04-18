import { useMemo, useRef, useState } from "react";
import { useStats } from "../context/DashboardContext";
import { DataTable } from "./DataTable";
import { useDebounce } from "../hooks/useDebounce";
import { SearchBar } from "./SearchBar";

export type ClientBaseType = {
  id: string;
  clientName: string;
};

export type AddClientFormData = {
  goals: string;
} & ClientBaseType;

export type Client = {
  goals: string[];
} & ClientBaseType;

export const AddClientForm = () => {
  const [formData, setFormData] = useState<Partial<AddClientFormData>>({});
  const [clients, setClients] = useState<Client[]>([
    { id: "1", clientName: "Acme Corp", goals: ["Increase sales by 20%"] },
  ]);
  const numberOfClients = clients.length;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const [editClient, setEditClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filteredClients = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.clientName.toLowerCase().includes(query) ||
        client.goals.some((goal) => goal.toLowerCase().includes(query)) ||
        client.id.includes(query),
    );
  }, [clients, debouncedSearchQuery]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditingDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editClient) {
      const id = e.target.id as keyof Client;

      setEditClient({
        ...editClient,
        [id]:
          id === "goals"
            ? e.target.value.split("\n") // ← no filter here
            : e.target.value,
      });
    }
  };

  const handleSaveEdit = () => {
    if (!editClient) return;

    const cleaned = {
      ...editClient,
      goals: editClient.goals.filter(Boolean),
    };

    setClients((prev) =>
      prev.map((client) => (client.id === cleaned.id ? cleaned : client)),
    );

    setEditClient(null);
  };

  const handleDeleteData = (data: Client) => {
    setClients((prev) => prev.filter((client) => client.id !== data.id));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setClients((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        clientName: formData.clientName || "",
        goals: formData.goals ? formData.goals.split("\n").filter(Boolean) : [],
      },
    ]);
    setIsSubmitting(false);

    setFormData({});

    closeDialog();
  };

  const isFormValid =
    formData.clientName &&
    formData.clientName.trim() &&
    formData.goals &&
    formData.goals.trim();

  return (
    <div>
      <h2>Clients</h2>
      <button
        style={{
          display: "block",
          marginLeft: "auto",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={openDialog}
      >
        Add Client
      </button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 6px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "rgb(17, 24, 39)",
            }}
          >
            ➕ Add Client
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                placeholder="Acme Corp"
                required
                value={formData.clientName ?? ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid rgb(229, 231, 235)",
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Goals
              </label>
              <textarea
                name="goals"
                placeholder="Increase sales by 20%..."
                rows={3}
                value={formData.goals ?? ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid rgb(229, 231, 235)",
                  borderRadius: "8px",
                  fontSize: "16px",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <button onClick={closeDialog}>Cancel</button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    isFormValid && !isSubmitting
                      ? "rgb(59, 130, 246)"
                      : "rgb(209, 213, 219)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor:
                    isFormValid && !isSubmitting ? "pointer" : "not-allowed",
                  opacity: isFormValid && !isSubmitting ? 1 : 0.6,
                }}
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <div style={{ backgroundColor: "grey", width: "100%" }}>
        {clients.length > 0 ? (
          <div>
            <div>
              <p>Clients {numberOfClients}</p>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <DataTable
              data={filteredClients}
              columns={[
                {
                  header: "Client Name",
                  accessor: "clientName",
                },
                {
                  header: "Goals",
                  accessor: "goals",
                  render: (client) => (
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {client.goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  header: "Actions",
                  render: (client) => {
                    return (
                      <div>
                        <button onClick={() => setEditClient(client)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteData(client)}>
                          Delete
                        </button>
                      </div>
                    );
                  },
                },
              ]}
              getRowKey={(row) => row.id}
            />
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "white" }}>
            No clients added yet.
          </p>
        )}

        {editClient && (
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
                value={editClient?.clientName}
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
                value={editClient.goals.join("\n")}
                placeholder="Enter goals (one per line)"
                onChange={handleEditingDataChange}
              />
            </label>

            <div>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditClient(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClientForm;

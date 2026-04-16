import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { useStats } from "../context/DashboardContext";

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
  const [clients, setClients] = useState<Client[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setTotalTasks } = useStats();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
  };

  const isFormValid =
    formData.clientName &&
    formData.clientName.trim() &&
    formData.goals &&
    formData.goals.trim();

  useEffect(() => {
    setTotalTasks(
      clients.reduce((acc, client) => acc + client.goals.length, 0),
    );
  }, [clients]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
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
              cursor: isFormValid && !isSubmitting ? "pointer" : "not-allowed",
              opacity: isFormValid && !isSubmitting ? 1 : 0.6,
            }}
          >
            {isSubmitting ? "Adding..." : "Add Client"}
          </button>
        </form>
      </div>
      <div style={{ backgroundColor: "grey", width: "100%" }}>
        {clients.length > 0 ? (
          <DataTable clients={clients} setClients={setClients} />
        ) : (
          <p style={{ textAlign: "center", color: "white" }}>
            No clients added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddClientForm;

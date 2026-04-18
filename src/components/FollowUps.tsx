import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { DataTable } from "./DataTable";

type FollowUp = {
  id: string;
  clientName: string;
  action: "Call" | "Email";
  dueDate: Date;
  status: "Pending" | "Completed";
};

export function FollowUps() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: "1",
      clientName: "John Doe",
      action: "Call",
      dueDate: new Date("2024-07-01"),
      status: "Pending",
    },
    {
        id: "2",
        clientName: "Jane Smith",
        action: "Email",
        dueDate: new Date("2024-07-02"),
        status: "Completed",
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filteredFollowUps = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase();
    return followUps.filter(
      (client) =>
        client.clientName.toLowerCase().includes(query) ||
        client.dueDate.toString().toLowerCase().includes(query) ||
        client.status.includes(query) ||
        client.id.includes(query),
    );
  }, [followUps, debouncedSearchQuery]);
  return (
    <div>
      <h2>Follow Ups</h2>

      <div style={{ backgroundColor: "grey", width: "100%" }}>
        <div>
          <p>Follow Ups {followUps.length}</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <DataTable
          data={filteredFollowUps}
          columns={[
            {
              header: "Client Name",
              accessor: "clientName",
            },
            {
              header: "Action",
              accessor: "action",
            },
            {
              header: "Due Date",
              accessor: "dueDate",
              render: (row) => row.dueDate.toLocaleDateString(),
            },
            {
              header: "Status",
              accessor: "status",
              render: (row) => (
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: row.status === "Pending" ? "orange" : "green",
                    color: "white",
                  }}
                >
                  {row.status}
                </span> 
                ),
            },
          ]}
          getRowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}

import { Card } from "./Card";
import type { Client } from "./AddClientForm";

type TaskListProps = {
  clients: Client[];
};

export function Clients({ clients }: TaskListProps) {
  return (
    <ul>
      {clients.map((c, index) => (
        <Card key={index} clientName={c.clientName} goals={c.goals} />
      ))}
    </ul>
  );
}

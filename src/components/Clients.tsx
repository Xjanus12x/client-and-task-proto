import { Card } from "./Card";
import type { Client } from "./AddClientForm";

type ClientsProps = {
  clients: Client[];
};

export function Clients({ clients }: ClientsProps) {
  return (
    <ul>
      {clients.map((c, index) => (
        <li>
          <Card key={index} clientName={c.clientName} goals={c.goals} />
        </li>
      ))}
    </ul>
  );
}

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
};

export function DataTable<T>({
  data,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  return (

    <table style={{ backgroundColor: "white", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="border p-2 text-left">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center p-4">
              No data
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {col.render
                    ? col.render(row)
                    : col.accessor
                      ? String(row[col.accessor])
                      : null}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

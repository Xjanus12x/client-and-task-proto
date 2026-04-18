export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        style={{
          flex: 1,
          display: "flex",
          gap: "8px",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {/* <span className="sr-only">Search clients</span> */}
        <input
          type="text"
          placeholder="Search"
          style={{ width: "100%" }}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </label>
    </div>
  );
}

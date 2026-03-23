import type { Status } from "../types";

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const cls =
    status === "Pending"
      ? "status-pending"
      : status === "Assigned"
        ? "status-assigned"
        : "status-cleaned";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}

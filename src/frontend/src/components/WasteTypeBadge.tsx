import type { WasteType } from "../types";

interface Props {
  type: WasteType;
}

export function WasteTypeBadge({ type }: Props) {
  const styles: Record<WasteType, string> = {
    wet: "bg-blue-100 text-blue-700",
    dry: "bg-amber-100 text-amber-700",
    mixed: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${styles[type]}`}
    >
      {type}
    </span>
  );
}

import { LoaderPinwheel } from "lucide-react";

export default function Loader() {
  return (
    <div
      className="grid place-items-center py-30 lg:py-36"
      aria-label="Spinner"
    >
      <LoaderPinwheel
        size={55}
        className="transition-transform animation animate-spin"
      />
    </div>
  );
}

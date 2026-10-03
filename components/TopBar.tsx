import { MapPin, Church } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#faf8f2] border-b border-[#e8e1d2] text-[#272727]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-2">
          <Church className="h-3.5 w-3.5 text-[#b18a2b]" />

          <span className="font-medium">
            Sunday Gatherings at 9:30 AM & 12:00 PM
          </span>

          

          <span className="hidden sm:inline">
            
          </span>
        </div> 
      </div>
    </div>
  );
}
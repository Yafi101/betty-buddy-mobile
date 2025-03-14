import { Navbar } from "@/components/Navbar";
import { WalletCard } from "@/components/WalletCard";
import { TopEvents } from "@/components/TopEvents";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#ECE8E5] ">
      <Navbar />
      <div className="mt-4 flex flex-col items-center">
        <div className="w-full max-w-md px-4">
          <WalletCard />
        </div>
        <TopEvents />
      </div>
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;

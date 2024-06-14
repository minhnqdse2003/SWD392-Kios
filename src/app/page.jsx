import DashBoardHeader from "./components/DashBoardHeader";
import DashBoardStoreInformation from "./components/DashBoardStoreInformation";

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-100 p-8 overflow-y-scroll scrollbar-custom h-[100vh] flex flex-col gap-4">
      <DashBoardHeader />
      <DashBoardStoreInformation />
    </main>
  );
}

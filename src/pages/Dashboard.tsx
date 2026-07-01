import Header from "../components/dashboard/Header";
import CharacterPanel from "../components/dashboard/CharacterPanel";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import ProfileCard from "../components/dashboard/ProfileCard";
import MenuGrid from "../components/dashboard/MenuGrid";
import Footer from "../components/dashboard/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-kp-bg pb-6">
      <Header />

      <main className="mx-auto mt-4 max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-kp-border bg-kp-panel p-4 lg:grid-cols-[1fr_1.3fr_0.9fr]">
          <CharacterPanel />
          <WelcomeCard />
          <ProfileCard />
        </div>

        <div className="mt-4">
          <MenuGrid />
        </div>

        <Footer />
      </main>
    </div>
  );
}

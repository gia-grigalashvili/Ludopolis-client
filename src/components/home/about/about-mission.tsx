import { useNavigate } from "@tanstack/react-router";

export default function AboutMission() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-purple-100">
          ★ OUR MISSION ★
        </h2>
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-8">
          <p className="text-purple-200 text-xl leading-relaxed mb-6">
            "To preserve the magic of analog gaming and foster real-world
            connections in an age of digital distraction."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-target px-8 py-4 bg-purple-600 hover:bg-purple-700 border-2 border-white font-bold text-lg transition-all transform hover:scale-105">
              EXPLORE GAMES
            </button>
            <button
              className="cursor-target px-8 py-4 border-2 border-purple-400 hover:bg-purple-400/20 font-bold text-lg transition-all"
              onClick={() => navigate({ to: "/contactUs" })}
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

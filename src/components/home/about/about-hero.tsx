import SplitText from "@/components/ui/spllit-text";

export default function AboutHero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <SplitText
            text="ABOUT LUDOPOLIS"
            className="text-5xl md:text-7xl font-black text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 text-purple-200 max-w-2xl mx-auto">
          Your premier destination for classic cardboard gaming experiences
        </p>
      </div>
    </section>
  );
}

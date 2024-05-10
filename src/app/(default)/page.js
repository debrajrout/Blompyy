import Heroc from "@/components/hero";
import Hero from "@/components/hero-text";

export default function Home() {
  return (
    <section className="contr container mt-4  h-[90vh] max-w-4xl  justify-center  pt-4">
      <section className="grid grid-cols-2 gap-6 pt-24">
        <div className="mb-8 max-w-md">
          <h1 className="text-6xl font-semibold">
            Your all links
            <br />
            in one place{" "}
            <div className="mt-4 font-normal">
              <Hero />
            </div>
          </h1>
          <h2 className="mt-6 text-xl text-muted-foreground">
            Share your links, social profiles, <br /> contact info and more on
            one page
          </h2>
        </div>
        <Heroc />
      </section>
    </section>
  );
}

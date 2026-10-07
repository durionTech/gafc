import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    id: "as6P7_r4EPw",
    title: "A Miracle of God's Grace",
    description:
      "A powerful testimony of a person who underwent liver surgery to remove a 5 kg mass, sharing their journey of faith and God's grace.",
    start: 3483, // 58:03
  },

  {
    id: "8BSOTc2iJyw?si=gWEaCNkMl6rStwqy",
    title: "Miraculously Healed",
    description: "A testimony of God's healing and faithfulness.",
  },

  {
    id: "OyIZGr0Nsdo?si=-0p1C37pvNf1w6lT",
    title: "God's Faithfulness",
    description: "A powerful testimony of faith and answered prayer.",
  },

  {
    id: "YOUR_VIDEO_ID_4",
    title: "A Life Changed by God",
    description: "A testimony of God's grace and transformation.",
  },

  {
    id: "YOUR_VIDEO_ID_5",
    title: "God Answered My Prayer",
    description: "A testimony of prayer, faith and God's goodness.",
  },

  {
    id: "YOUR_VIDEO_ID_6",
    title: "Walking in Faith",
    description: "A testimony of hope, faith and God's guidance.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f2]">

      {/* HEADER */}
      <TopBar />
      <Navbar />

      {/* PAGE TITLE */}
      <section className="bg-white px-6 pb-14 pt-16">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm font-semibold tracking-[0.25em] text-[#8b1e1e]">
            TESTIMONIALS
          </p>

          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-[#151512] md:text-5xl">
            உண்மை சாட்சிகள்
          </h1>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-[#8b1e1e]" />

        </div>
      </section>

      {/* TESTIMONIAL VIDEO GRID */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {testimonials.map((video) => {

              const videoUrl = video.start
                ? `https://www.youtube.com/embed/${video.id}?start=${video.start}`
                : `https://www.youtube.com/embed/${video.id}`;

              return (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* VIDEO */}
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      className="h-full w-full"
                      src={videoUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                      {video.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#666158]">
                      {video.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
import { gallery } from "../assets/assets";

const LifeAtLawzra = () => {
  return (
    <section className="border-t border-[#C9A876]/15 bg-[#FAF8F3] px-6 py-24 dark:border-white/10 dark:bg-[#101826]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="font-docket mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
              <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
              Culture
            </div>
            <h2 className="font-display mb-4 text-4xl italic text-[#101826] dark:text-white">
              Life at Lawzra
            </h2>
            <p className="leading-relaxed text-[#4B5262] dark:text-white/60">
              We believe in more than just legal excellence. We foster a
              culture of growth, well-being, and genuine connection. From our
              state-of-the-art office in Lagos to our community outreach in
              Abuja, this is how we work.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 text-center">
              <p className="font-display text-2xl text-[#B08D57] dark:text-[#C9A876]">
                25+
              </p>
              <p className="font-docket text-[10px] uppercase tracking-widest text-[#4B5262] dark:text-white/40">
                Associates
              </p>
            </div>
            <div className="h-10 w-px bg-[#C9A876]/25" />
            <div className="px-4 text-center">
              <p className="font-display text-2xl text-[#B08D57] dark:text-[#C9A876]">
                3
              </p>
              <p className="font-docket text-[10px] uppercase tracking-widest text-[#4B5262] dark:text-white/40">
                Offices
              </p>
            </div>
          </div>
        </div>

        {/* Staggered Photo Grid */}
        <div className="grid h-[600px] grid-cols-2 grid-rows-3 gap-4 md:h-[800px] md:grid-cols-4">
          {gallery.map((img, index) => (
            <div
              key={index}
              className={`${img.size} group relative overflow-hidden rounded-sm border border-[#C9A876]/15 bg-[#0C1420]`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0A0F18]/85 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium tracking-wide text-white">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LifeAtLawzra;

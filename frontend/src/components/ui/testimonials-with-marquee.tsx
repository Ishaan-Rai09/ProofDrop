import { TestimonialAuthor, TestimonialCard } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-background py-16 text-foreground sm:py-24 md:py-28",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
            Social Proof
          </span>
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-[620px] text-base font-medium text-slate-400 sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] [--duration:40s]">
            <div className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) =>
                testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${setIndex}-${index}`}
                    {...testimonial}
                  />
                )),
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}

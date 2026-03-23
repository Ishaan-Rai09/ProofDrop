import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";
  const fallback = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "flex max-w-[320px] flex-col rounded-[28px] border border-white/10",
        "bg-gradient-to-b from-white/10 to-white/[0.03] p-5 text-start backdrop-blur-xl sm:p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:from-white/[0.14] hover:to-white/[0.06]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border border-white/10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-slate-800 text-xs font-semibold text-white">
            {fallback}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold leading-none text-white">
            {author.name}
          </h3>
          <p className="text-sm text-slate-400">{author.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-[15px]">
        {text}
      </p>
    </Card>
  );
}

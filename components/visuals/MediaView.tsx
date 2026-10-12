import Image from "next/image";
import type { Media, Project } from "@/lib/projects";
import { BrowserFrame, TabletFrame } from "./Frames";
import LazyVideo from "./LazyVideo";

function Content({ media, sizes }: { media: Media; sizes: string }) {
  if (media.type === "video")
    return (
      <LazyVideo
        src={media.src}
        poster={media.poster}
        label={media.alt}
        className="block h-auto w-full"
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
      />
    );
  return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} className="block h-auto w-full" />;
}

/** Renders a project image or video inside its device frame. */
export default function MediaView({ media, project, className = "", sizes = "(max-width: 768px) 100vw, 50vw" }: {
  media: Media;
  project: Project;
  className?: string;
  sizes?: string;
}) {
  if (media.frame === "browser")
    return (
      <BrowserFrame url={`${project.slug}.app`} className={className}>
        <Content media={media} sizes={sizes} />
      </BrowserFrame>
    );
  if (media.frame === "tablet")
    return (
      <TabletFrame className={className}>
        <Content media={media} sizes={sizes} />
      </TabletFrame>
    );
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <Content media={media} sizes={sizes} />
    </div>
  );
}

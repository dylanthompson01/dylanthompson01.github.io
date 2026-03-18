import { useState, useEffect, useCallback } from "react";
import type { ProjectImage } from "../../../mocks/projects";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

function isMp4(src: string) {
  return src.includes(".mp4") || src.includes(".webm") || src.includes(".ogg");
}

function isVideo(item: ProjectImage) {
  return item.type === "video";
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentItem = images[selected] ?? images[0];
  const currentIsVideo = currentItem ? isVideo(currentItem) : false;

  const goNext = useCallback(() => {
    setSelected((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goNext, goPrev]);

  useEffect(() => {
    if (currentIsVideo) setLightboxOpen(false);
  }, [currentIsVideo]);

  if (images.length === 0 || !currentItem) return null;

  return (
    <>
      <div>
        {/* Main view */}
        <div className="w-full h-96 rounded-lg overflow-hidden border border-zinc-800 relative group">
          {currentIsVideo ? (
            isMp4(currentItem.src) ? (
              <video
                src={currentItem.src}
                poster={currentItem.thumbnail}
                controls
                className="w-full h-full object-cover bg-zinc-950"
              />
            ) : (
              <iframe
                src={currentItem.src}
                title={currentItem.caption}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <>
              <div
                className="w-full h-full cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-200 flex items-center gap-2">
                    <i className="ri-zoom-in-line" />
                    Click to enlarge
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="absolute bottom-3 right-3 bg-zinc-950/70 rounded-md px-2 py-1 text-xs text-zinc-400 pointer-events-none">
            {selected + 1} / {images.length}
          </div>
        </div>

        {/* Caption */}
        <p className="text-xs text-zinc-500 mt-3 text-center">{currentItem.caption}</p>

        {/* Thumbnails */}
        {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-1 h-20 rounded-md overflow-hidden border transition-all duration-200 cursor-pointer relative ${
                selected === i
                  ? "border-sage-500/60 ring-1 ring-sage-500/30"
                  : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {isVideo(item) ? (
                item.thumbnail ? (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                      <div className="w-7 h-7 flex items-center justify-center">
                        <i className="ri-play-circle-fill text-white text-2xl" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-1">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-play-circle-fill text-zinc-400 text-2xl" />
                    </div>
                    <span className="text-zinc-500 text-[10px]">Video</span>
                  </div>
                )
              ) : (
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
        )}
      </div>

      {/* Lightbox — images only */}
      {lightboxOpen && !currentIsVideo && (
        <div
          className="fixed inset-0 z-[100] bg-zinc-950/95 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <i className="ri-close-line text-2xl" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <i className="ri-arrow-left-s-line text-3xl" />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl max-h-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.src}
              alt={currentItem.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <p className="text-sm text-zinc-400 text-center">{currentItem.caption}</p>
            <div className="flex gap-2 mt-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === selected ? "bg-sage-400 w-5" : "bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <i className="ri-arrow-right-s-line text-3xl" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

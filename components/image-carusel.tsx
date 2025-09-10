"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
    images: Array<{
        id: string
        url: string
        caption?: string | null
    }>
    className?: string
    showThumbnails?: boolean
    showCounter?: boolean
    aspectRatio?: "square" | "video" | "wide" | "tall"
}

export function ImageCarousel({
                                  images,
                                  className,
                                  showThumbnails = true,
                                  showCounter = true,
                                  aspectRatio = "video",
                              }: ImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [thumbsRef, thumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaApi || !thumbsApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi, thumbsApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaApi || !thumbsApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        thumbsApi.scrollTo(emblaApi.selectedScrollSnap())
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi, thumbsApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
    }, [emblaApi, onSelect])

    if (!images || images.length === 0) {
        return (
            <div className={cn("bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center", className)}>
                <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
        )
    }

    if (images.length === 1) {
        return (
            <div className={cn("relative overflow-hidden rounded-lg", className)}>
                <div
                    className={cn("relative", {
                        "aspect-square": aspectRatio === "square",
                        "aspect-video": aspectRatio === "video",
                        "aspect-[21/9]": aspectRatio === "wide",
                        "aspect-[4/5]": aspectRatio === "tall",
                    })}
                >
                    <img
                        src={images[0].url || "/placeholder.svg"}
                        alt={images[0].caption || "Imagen"}
                        className="w-full h-full object-cover"
                    />
                </div>
                {images[0].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                        <p className="text-sm">{images[0].caption}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, index) => (
                        <div key={image.id} className="flex-[0_0_100%] min-w-0">
                            <div
                                className={cn("relative", {
                                    "aspect-square": aspectRatio === "square",
                                    "aspect-video": aspectRatio === "video",
                                    "aspect-[21/9]": aspectRatio === "wide",
                                    "aspect-[4/5]": aspectRatio === "tall",
                                })}
                            >
                                <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.caption || `Imagen ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {image.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                                        <p className="text-sm">{image.caption}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Counter */}
                {showCounter && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {showThumbnails && images.length > 1 && (
                <div className="overflow-hidden" ref={thumbsRef}>
                    <div className="flex gap-2">
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                type="button"
                                className={cn(
                                    "flex-[0_0_auto] w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                                    index === selectedIndex
                                        ? "border-blue-500 opacity-100"
                                        : "border-gray-200 opacity-60 hover:opacity-80",
                                )}
                                onClick={() => onThumbClick(index)}
                            >
                                <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.caption || `Miniatura ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

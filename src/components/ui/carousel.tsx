// import * as React from "react";
// import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// type CarouselApi = UseEmblaCarouselType[1];
// type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
// type CarouselOptions = UseCarouselParameters[0];
// type CarouselPlugin = UseCarouselParameters[1];

// type CarouselProps = {
//   opts?: CarouselOptions;
//   plugins?: CarouselPlugin;
//   orientation?: "horizontal" | "vertical";
//   setApi?: (api: CarouselApi) => void;
// };

// type CarouselContextProps = {
//   carouselRef: ReturnType<typeof useEmblaCarousel>[0];
//   api: ReturnType<typeof useEmblaCarousel>[1];
//   scrollPrev: () => void;
//   scrollNext: () => void;
//   canScrollPrev: boolean;
//   canScrollNext: boolean;
// } & CarouselProps;

// const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// function useCarousel() {
//   const context = React.useContext(CarouselContext);

//   if (!context) {
//     throw new Error("useCarousel must be used within a <Carousel />");
//   }

//   return context;
// }

// const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
//   ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
//     const [carouselRef, api] = useEmblaCarousel(
//       {
//         ...opts,
//         axis: orientation === "horizontal" ? "x" : "y",
//       },
//       plugins,
//     );
//     const [canScrollPrev, setCanScrollPrev] = React.useState(false);
//     const [canScrollNext, setCanScrollNext] = React.useState(false);

//     const onSelect = React.useCallback((api: CarouselApi) => {
//       if (!api) {
//         return;
//       }

//       setCanScrollPrev(api.canScrollPrev());
//       setCanScrollNext(api.canScrollNext());
//     }, []);

//     const scrollPrev = React.useCallback(() => {
//       api?.scrollPrev();
//     }, [api]);

//     const scrollNext = React.useCallback(() => {
//       api?.scrollNext();
//     }, [api]);

//     const handleKeyDown = React.useCallback(
//       (event: React.KeyboardEvent<HTMLDivElement>) => {
//         if (event.key === "ArrowLeft") {
//           event.preventDefault();
//           scrollPrev();
//         } else if (event.key === "ArrowRight") {
//           event.preventDefault();
//           scrollNext();
//         }
//       },
//       [scrollPrev, scrollNext],
//     );

//     React.useEffect(() => {
//       if (!api || !setApi) {
//         return;
//       }

//       setApi(api);
//     }, [api, setApi]);

//     React.useEffect(() => {
//       if (!api) {
//         return;
//       }

//       onSelect(api);
//       api.on("reInit", onSelect);
//       api.on("select", onSelect);

//       return () => {
//         api?.off("select", onSelect);
//       };
//     }, [api, onSelect]);

//     return (
//       <CarouselContext.Provider
//         value={{
//           carouselRef,
//           api: api,
//           opts,
//           orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
//           scrollPrev,
//           scrollNext,
//           canScrollPrev,
//           canScrollNext,
//         }}
//       >
//         <div
//           ref={ref}
//           onKeyDownCapture={handleKeyDown}
//           className={cn("relative", className)}
//           role="region"
//           aria-roledescription="carousel"
//           {...props}
//         >
//           {children}
//         </div>
//       </CarouselContext.Provider>
//     );
//   },
// );
// Carousel.displayName = "Carousel";

// const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => {
//     const { carouselRef, orientation } = useCarousel();

//     return (
//       <div ref={carouselRef} className="overflow-hidden">
//         <div
//           ref={ref}
//           className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
//           {...props}
//         />
//       </div>
//     );
//   },
// );
// CarouselContent.displayName = "CarouselContent";

// const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => {
//     const { orientation } = useCarousel();

//     return (
//       <div
//         ref={ref}
//         role="group"
//         aria-roledescription="slide"
//         className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
//         {...props}
//       />
//     );
//   },
// );
// CarouselItem.displayName = "CarouselItem";

// const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollPrev, canScrollPrev } = useCarousel();

//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute h-8 w-8 rounded-full",
//           orientation === "horizontal"
//             ? "-left-12 top-1/2 -translate-y-1/2"
//             : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
//           className,
//         )}
//         disabled={!canScrollPrev}
//         onClick={scrollPrev}
//         {...props}
//       >
//         <ArrowLeft className="h-4 w-4" />
//         <span className="sr-only">Previous slide</span>
//       </Button>
//     );
//   },
// );
// CarouselPrevious.displayName = "CarouselPrevious";

// const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollNext, canScrollNext } = useCarousel();

//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute h-8 w-8 rounded-full",
//           orientation === "horizontal"
//             ? "-right-12 top-1/2 -translate-y-1/2"
//             : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
//           className,
//         )}
//         disabled={!canScrollNext}
//         onClick={scrollNext}
//         {...props}
//       >
//         <ArrowRight className="h-4 w-4" />
//         <span className="sr-only">Next slide</span>
//       </Button>
//     );
//   },
// );
// CarouselNext.displayName = "CarouselNext";

// export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };





import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  FlatList,
} from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  style?: ViewStyle;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
}

interface CarouselContextProps {
  currentIndex: number;
  totalSlides: number;
  scrollToIndex: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
};

export const Carousel = ({
  children,
  orientation = "horizontal",
  style,
  showArrows = true,
  autoplay = false,
  autoplayInterval = 3000,
  loop = false,
  onSlideChange,
}: CarouselProps) => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  const canScrollPrev = loop ? true : currentIndex > 0;
  const canScrollNext = loop ? true : currentIndex < totalSlides - 1;

  React.useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        scrollNext();
      }, autoplayInterval);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, currentIndex]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(
      orientation === "horizontal"
        ? contentOffset.x / SCREEN_WIDTH
        : contentOffset.y / 300 // Assuming item height of 300
    );
    setCurrentIndex(index);
    onSlideChange?.(index);
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= totalSlides) {
      if (loop) {
        index = index < 0 ? totalSlides - 1 : 0;
      } else {
        return;
      }
    }

    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      [orientation === "horizontal" ? "x" : "y"]: orientation === "horizontal"
        ? index * SCREEN_WIDTH
        : index * 300,
      animated: true,
    });
  };

  const scrollPrev = () => {
    scrollToIndex(currentIndex - 1);
  };

  const scrollNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
        totalSlides,
        scrollToIndex,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <View style={[styles.container, style]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={orientation === "horizontal"}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {childrenArray.map((child, index) => (
            <View
              key={index}
              style={[
                styles.slide,
                orientation === "horizontal"
                  ? { width: SCREEN_WIDTH }
                  : { height: 300, width: '100%' },
              ]}
            >
              {child}
            </View>
          ))}
        </ScrollView>

        {showArrows && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const CarouselItem = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
  return <View style={[styles.item, style]}>{children}</View>;
};

export const CarouselPrevious = () => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  if (!canScrollPrev) return null;

  return (
    <TouchableOpacity
      style={[styles.arrowButton, styles.prevButton]}
      onPress={scrollPrev}
    >
      <ArrowLeft size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export const CarouselNext = () => {
  const { scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <TouchableOpacity
      style={[styles.arrowButton, styles.nextButton]}
      onPress={scrollNext}
    >
      <ArrowRight size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 20,
  },
});

// Export types
export type CarouselApi = {
  scrollToIndex: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  currentIndex: number;
};
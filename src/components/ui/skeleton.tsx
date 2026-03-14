// import { cn } from "@/lib/utils";

// function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
// }

// export { Skeleton };




import React from "react";
import { View, StyleSheet, Animated, Easing, ViewStyle } from "react-native";

interface SkeletonProps {
  style?: ViewStyle;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  children?: React.ReactNode;
}

export const Skeleton = ({ 
  style, 
  width, 
  height, 
  borderRadius = 8, 
  children 
}: SkeletonProps) => {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { opacity },
        width && { width },
        height && { height },
        { borderRadius },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

// Individual skeleton components for common use cases
export const SkeletonText = ({ lines = 1, style }: { lines?: number; style?: ViewStyle }) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          style={[styles.textSkeleton, index < lines - 1 && styles.textSkeletonMargin, style]}
        />
      ))}
    </>
  );
};

export const SkeletonCircle = ({ size = 40, style }: { size?: number; style?: ViewStyle }) => {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={size / 2}
      style={style}
    />
  );
};

export const SkeletonImage = ({ style }: { style?: ViewStyle }) => {
  return <Skeleton width="100%" height={200} style={[styles.imageSkeleton, style]} />;
};

export const SkeletonCard = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[styles.cardSkeleton, style]}>
      <SkeletonImage />
      <View style={styles.cardContent}>
        <SkeletonText lines={2} />
        <Skeleton width="60%" height={16} style={styles.skeletonMargin} />
      </View>
    </View>
  );
};

export const SkeletonAvatar = ({ size = 40, style }: { size?: number; style?: ViewStyle }) => {
  return (
    <View style={[styles.avatarContainer, style]}>
      <SkeletonCircle size={size} />
      <View style={styles.avatarText}>
        <SkeletonText lines={1} />
        <Skeleton width="80%" height={12} style={styles.skeletonMargin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
  },
  textSkeleton: {
    marginVertical: 2,
  },
  textSkeletonMargin: {
    marginBottom: 8,
  },
  imageSkeleton: {
    marginBottom: 8,
  },
  cardSkeleton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginTop: 12,
  },
  skeletonMargin: {
    marginTop: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatarText: {
    flex: 1,
    marginLeft: 12,
  },
});

// Export all components
export default Skeleton;
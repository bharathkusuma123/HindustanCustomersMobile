// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";

// const badgeVariants = cva(
//   "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//   {
//     variants: {
//       variant: {
//         default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
//         secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
//         outline: "text-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

// export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// function Badge({ className, variant, ...props }: BadgeProps) {
//   return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
// }

// export { Badge, badgeVariants };



import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  style?: ViewStyle;
}

export const Badge = ({ children, variant = "default", style }: BadgeProps) => {
  // Get badge styles based on variant
  const getBadgeStyles = () => {
    switch (variant) {
      case "default":
        return styles.badgeDefault;
      case "secondary":
        return styles.badgeSecondary;
      case "destructive":
        return styles.badgeDestructive;
      case "outline":
        return styles.badgeOutline;
      default:
        return styles.badgeDefault;
    }
  };

  // Get text styles based on variant
  const getTextStyles = () => {
    switch (variant) {
      case "default":
        return styles.textDefault;
      case "secondary":
        return styles.textSecondary;
      case "destructive":
        return styles.textDestructive;
      case "outline":
        return styles.textOutline;
      default:
        return styles.textDefault;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyles(), style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.text, getTextStyles()]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  // Default variant
  badgeDefault: {
    backgroundColor: '#2B6B3F',
    borderColor: 'transparent',
  },
  textDefault: {
    color: '#fff',
  },
  // Secondary variant
  badgeSecondary: {
    backgroundColor: '#f3f4f6',
    borderColor: 'transparent',
  },
  textSecondary: {
    color: '#374151',
  },
  // Destructive variant
  badgeDestructive: {
    backgroundColor: '#ef4444',
    borderColor: 'transparent',
  },
  textDestructive: {
    color: '#fff',
  },
  // Outline variant
  badgeOutline: {
    backgroundColor: 'transparent',
    borderColor: '#e5e7eb',
  },
  textOutline: {
    color: '#374151',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

// Export variant types for use in other components
export const badgeVariants = {
  default: "default",
  secondary: "secondary",
  destructive: "destructive",
  outline: "outline",
};
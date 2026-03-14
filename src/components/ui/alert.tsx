// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";

// const alertVariants = cva(
//   "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
//   {
//     variants: {
//       variant: {
//         default: "bg-background text-foreground",
//         destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

// const Alert = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
// >(({ className, variant, ...props }, ref) => (
//   <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
// ));
// Alert.displayName = "Alert";

// const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
//   ({ className, ...props }, ref) => (
//     <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
//   ),
// );
// AlertTitle.displayName = "AlertTitle";

// const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
//   ({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
//   ),
// );
// AlertDescription.displayName = "AlertDescription";

// export { Alert, AlertTitle, AlertDescription };





import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  style?: ViewStyle;
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Alert = ({ children, variant = "default", icon, style }: AlertProps) => {
  return (
    <View style={[
      styles.alert,
      variant === "destructive" ? styles.alertDestructive : styles.alertDefault,
      style,
    ]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={[styles.contentContainer, icon && styles.contentWithIcon]}>
        {children}
      </View>
    </View>
  );
};

export const AlertTitle = ({ children, style }: AlertTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

export const AlertDescription = ({ children, style }: AlertDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  alert: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
  },
  alertDefault: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  alertDestructive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    color: '#991b1b',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  contentWithIcon: {
    marginLeft: 28, // To account for icon width when present
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

// Destructive variant text colors
const destructiveStyles = StyleSheet.create({
  title: {
    color: '#991b1b',
  },
  description: {
    color: '#991b1b',
  },
});
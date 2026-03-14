// import * as React from "react";

// import { cn } from "@/lib/utils";

// const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
// ));
// Card.displayName = "Card";

// const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
//   ),
// );
// CardHeader.displayName = "CardHeader";

// const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
//   ({ className, ...props }, ref) => (
//     <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
//   ),
// );
// CardTitle.displayName = "CardTitle";

// const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
//   ({ className, ...props }, ref) => (
//     <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
//   ),
// );
// CardDescription.displayName = "CardDescription";

// const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
// );
// CardContent.displayName = "CardContent";

// const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
//   ),
// );
// CardFooter.displayName = "CardFooter";

// export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };





import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = ({ children, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export const CardHeader = ({ children, style }: CardHeaderProps) => {
  return (
    <View style={[styles.cardHeader, style]}>
      {children}
    </View>
  );
};

export const CardTitle = ({ children, style }: CardTitleProps) => {
  return (
    <Text style={[styles.cardTitle, style]}>
      {children}
    </Text>
  );
};

export const CardDescription = ({ children, style }: CardDescriptionProps) => {
  return (
    <Text style={[styles.cardDescription, style]}>
      {children}
    </Text>
  );
};

export const CardContent = ({ children, style }: CardContentProps) => {
  return (
    <View style={[styles.cardContent, style]}>
      {children}
    </View>
  );
};

export const CardFooter = ({ children, style }: CardFooterProps) => {
  return (
    <View style={[styles.cardFooter, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#687076',
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
});
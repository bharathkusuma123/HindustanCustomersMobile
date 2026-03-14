// import * as React from "react";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { ChevronDown } from "lucide-react";

// import { cn } from "@/lib/utils";

// const Accordion = AccordionPrimitive.Root;

// const AccordionItem = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
// >(({ className, ...props }, ref) => (
//   <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
// ));
// AccordionItem.displayName = "AccordionItem";

// const AccordionTrigger = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Header className="flex">
//     <AccordionPrimitive.Trigger
//       ref={ref}
//       className={cn(
//         "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//       <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
//     </AccordionPrimitive.Trigger>
//   </AccordionPrimitive.Header>
// ));
// AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// const AccordionContent = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Content
//     ref={ref}
//     className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//     {...props}
//   >
//     <div className={cn("pb-4 pt-0", className)}>{children}</div>
//   </AccordionPrimitive.Content>
// ));

// AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };




import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { ChevronDown } from "lucide-react-native";

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  children: React.ReactNode;
  style?: any;
}

interface AccordionItemProps {
  children: React.ReactNode;
  style?: any;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

interface AccordionContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  style?: any;
}

// Main Accordion Component
export const Accordion = ({ children, style }: AccordionProps) => {
  return <View style={[styles.accordion, style]}>{children}</View>;
};

// Accordion Item Component
export const AccordionItem = ({ children, style }: AccordionItemProps) => {
  return <View style={[styles.item, style]}>{children}</View>;
};

// Accordion Trigger Component
export const AccordionTrigger = ({ children, onPress, style }: AccordionTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      <View style={styles.triggerContent}>
        <Text style={styles.triggerText}>{children}</Text>
        <ChevronDown size={16} color="#666" />
      </View>
    </TouchableOpacity>
  );
};

// Accordion Content Component
export const AccordionContent = ({ children, isOpen, style }: AccordionContentProps) => {
  if (!isOpen) return null;
  
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  accordion: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  trigger: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  content: {
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
});
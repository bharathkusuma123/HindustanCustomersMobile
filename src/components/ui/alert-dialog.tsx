// import * as React from "react";
// import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";

// const AlertDialog = AlertDialogPrimitive.Root;

// const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// const AlertDialogPortal = AlertDialogPrimitive.Portal;

// const AlertDialogOverlay = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Overlay
//     className={cn(
//       "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//       className,
//     )}
//     {...props}
//     ref={ref}
//   />
// ));
// AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// const AlertDialogContent = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPortal>
//     <AlertDialogOverlay />
//     <AlertDialogPrimitive.Content
//       ref={ref}
//       className={cn(
//         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
//         className,
//       )}
//       {...props}
//     />
//   </AlertDialogPortal>
// ));
// AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
// );
// AlertDialogHeader.displayName = "AlertDialogHeader";

// const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
// );
// AlertDialogFooter.displayName = "AlertDialogFooter";

// const AlertDialogTitle = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
// ));
// AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// const AlertDialogDescription = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
// ));
// AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

// const AlertDialogAction = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Action>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
// ));
// AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// const AlertDialogCancel = React.forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Cancel
//     ref={ref}
//     className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
//     {...props}
//   />
// ));
// AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// export {
//   AlertDialog,
//   AlertDialogPortal,
//   AlertDialogOverlay,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogAction,
//   AlertDialogCancel,
// };




import * as React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";

interface AlertDialogProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
}

interface AlertDialogActionProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "default" | "destructive";
}

interface AlertDialogCancelProps {
  onPress: () => void;
  children: React.ReactNode;
}

// Main AlertDialog Component
export const AlertDialog = ({ visible, onClose, children }: AlertDialogProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <View style={styles.modalContent}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

// AlertDialogTrigger - In React Native, you handle this in your component
export const AlertDialogTrigger = ({ 
  onPress, 
  children 
}: { 
  onPress: () => void; 
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {typeof children === 'string' ? (
        <Text style={styles.triggerText}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

// AlertDialogContent
export const AlertDialogContent = ({ children }: AlertDialogContentProps) => {
  return <View style={styles.content}>{children}</View>;
};

// AlertDialogHeader
export const AlertDialogHeader = ({ children }: AlertDialogHeaderProps) => {
  return <View style={styles.header}>{children}</View>;
};

// AlertDialogFooter
export const AlertDialogFooter = ({ children }: AlertDialogFooterProps) => {
  return <View style={styles.footer}>{children}</View>;
};

// AlertDialogTitle
export const AlertDialogTitle = ({ children }: AlertDialogTitleProps) => {
  return <Text style={styles.title}>{children}</Text>;
};

// AlertDialogDescription
export const AlertDialogDescription = ({ children }: AlertDialogDescriptionProps) => {
  return <Text style={styles.description}>{children}</Text>;
};

// AlertDialogAction
export const AlertDialogAction = ({ onPress, children, variant = "default" }: AlertDialogActionProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        variant === "destructive" && styles.destructiveButton,
      ]}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <Text style={[
          styles.actionButtonText,
          variant === "destructive" && styles.destructiveButtonText,
        ]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

// AlertDialogCancel
export const AlertDialogCancel = ({ onPress, children }: AlertDialogCancelProps) => {
  return (
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <Text style={styles.cancelButtonText}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width - 48,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    gap: 16,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  triggerText: {
    fontSize: 16,
    color: '#0066cc',
  },
  actionButton: {
    backgroundColor: '#2B6B3F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  destructiveButton: {
    backgroundColor: '#dc2626',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  destructiveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});

// For backward compatibility, export Portal as a simple fragment
export const AlertDialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Overlay is now handled in the Modal
export const AlertDialogOverlay = () => null;
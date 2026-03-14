// // import { useToast } from "@/hooks/use-toast";
// // import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
// import { useToast } from "../../hooks/useToast";
// import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";

// export function Toaster() {
//   const { toasts } = useToast();

//   return (
//     <ToastProvider>
//       {toasts.map(function ({ id, title, description, action, ...props }) {
//         return (
//           <Toast key={id} {...props}>
//             <div className="grid gap-1">
//               {title && <ToastTitle>{title}</ToastTitle>}
//               {description && <ToastDescription>{description}</ToastDescription>}
//             </div>
//             {action}
//             <ToastClose />
//           </Toast>
//         );
//       })}
//       <ToastViewport />
//     </ToastProvider>
//   );
// }





import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useToast } from '../../hooks/useToast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, title, description, action, variant = 'default', duration = 3000, onClose }: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose(id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        variant === 'destructive' ? styles.destructiveToast : styles.defaultToast,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {title && <Text style={[styles.title, variant === 'destructive' && styles.destructiveText]}>{title}</Text>}
          {description && (
            <Text style={[styles.description, variant === 'destructive' && styles.destructiveText]}>
              {description}
            </Text>
          )}
        </View>
        {action && <View style={styles.actionContainer}>{action}</View>}
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={16} color={variant === 'destructive' ? '#fff' : '#666'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          action={toast.action}
          variant={toast.variant}
          duration={toast.duration}
          onClose={dismissToast}
        />
      ))}
    </View>
  );
}

// Toast Provider Component (if needed separately)
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

// Toast Viewport (wrapper for positioning)
export const ToastViewport = ({ children }: { children?: React.ReactNode }) => {
  return <>{children}</>;
};

// Individual Toast components
export const ToastTitle = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export const ToastDescription = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return <Text style={[styles.description, style]}>{children}</Text>;
};

export const ToastClose = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <X size={16} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  toast: {
    width: SCREEN_WIDTH - 32,
    maxWidth: 400,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultToast: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  destructiveToast: {
    backgroundColor: '#ef4444',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  destructiveText: {
    color: '#fff',
  },
  actionContainer: {
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
});
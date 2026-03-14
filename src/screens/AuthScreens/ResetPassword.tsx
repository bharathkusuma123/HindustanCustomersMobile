// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';

// export const ResetPassword = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { token } = route.params as { token: string };

//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [expired, setExpired] = useState(false);
//   const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 minutes

//   useEffect(() => {
//     if (secondsLeft <= 0) {
//       setExpired(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setSecondsLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [secondsLeft]);

//   const formatTime = (s: number) => {
//     const minutes = Math.floor(s / 60);
//     const seconds = s % 60;
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleReset = async () => {
//     if (password.length < 6) {
//       Alert.alert("Error", "Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_BASE_URL}/users/reset-password/${token}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword: password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.message?.includes("expired")) {
//           setExpired(true);
//           return;
//         }
//         throw new Error(data.message);
//       }

//       Alert.alert("Success", "Password updated successfully", [
//         { text: "OK", onPress: () => navigation.navigate('Login') }
//       ]);

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (expired) {
//     return (
//       <SafeAreaView className="flex-1 bg-muted/30">
//         <View className="flex-1 justify-center px-6">
//           <View className="bg-card rounded-2xl p-8 shadow-xl items-center">
//             <Image
//               source={require('../../../assets/Hindustan-logo.png')}
//               className="h-16 w-16 mb-6"
//               resizeMode="contain"
//             />

//             <Text className="text-xl font-bold text-center mb-2">
//               Reset link expired ⌛
//             </Text>

//             <Text className="text-muted-foreground text-center mb-6">
//               Your password reset link has expired. Please request a new one.
//             </Text>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPassword')}
//               className="bg-primary py-3 px-6 rounded-lg"
//             >
//               <Text className="text-white font-medium">Resend reset email</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1">
//       <View className="flex-1 relative">
//         {/* Background Image */}
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1567326619821-2664df9c48da?q=80&w=1400' }}
//           className="absolute w-full h-full"
//           resizeMode="cover"
//         />

//         {/* Dark Overlay */}
//         <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />

//         <View className="flex-1 justify-center px-6">
//           <View className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
//             <Image
//               source={require('../../../assets/Hindustan-logo.png')}
//               className="h-16 w-16 self-center mb-6"
//               resizeMode="contain"
//             />

//             <Text className="text-2xl font-bold text-white text-center mb-2">
//               Reset your password
//             </Text>

//             <Text className="text-white/70 text-center mb-2">
//               Enter a new secure password
//             </Text>

//             <Text className="text-[#f5b82e] text-center mb-6">
//               Link expires in ⏱ {formatTime(secondsLeft)}
//             </Text>

//             <View className="mb-6">
//               <Text className="text-white/80 mb-2">New Password</Text>
//               <View className="relative">
//                 <View className="absolute left-3 top-3 z-10">
//                   <Lock size={18} color="#fff" />
//                 </View>
//                 <TextInput
//                   value={password}
//                   onChangeText={setPassword}
//                   placeholder="Create new password"
//                   placeholderTextColor="#fff"
//                   secureTextEntry={!showPassword}
//                   className="pl-10 pr-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} color="#fff" />
//                   ) : (
//                     <Eye size={18} color="#fff" />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={handleReset}
//               disabled={loading}
//               className="bg-[#f5b82e] py-4 rounded-lg flex-row items-center justify-center"
//             >
//               {loading ? (
//                 <ActivityIndicator color="#000" />
//               ) : (
//                 <>
//                   <Text className="text-black font-semibold mr-2">
//                     Reset Password
//                   </Text>
//                   <ArrowRight size={18} color="#000" />
//                 </>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('Login')}
//               className="mt-4"
//             >
//               <Text className="text-white/70 text-center">
//                 Remember your password?{' '}
//                 <Text className="text-[#f5b82e] font-medium">Back to login</Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';

export const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params as { token: string };

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expired, setExpired] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = async () => {
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/users/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("expired")) {
          setExpired(true);
          return;
        }
        throw new Error(data.message);
      }

      Alert.alert("Success", "Password updated successfully", [
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]);

    } catch (err: any) {
      Alert.alert("Error", err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (expired) {
    return (
      <SafeAreaView style={styles.expiredContainer}>
        <View style={styles.expiredContent}>
          <View style={styles.expiredCard}>
            <Image
              source={require('../../../assets/Hindustan-logo.png')}
              style={styles.expiredLogo}
              resizeMode="contain"
            />

            <Text style={styles.expiredTitle}>
              Reset link expired ⌛
            </Text>

            <Text style={styles.expiredMessage}>
              Your password reset link has expired. Please request a new one.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.expiredButton}
            >
              <Text style={styles.expiredButtonText}>Resend reset email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <View style={styles.formCard}>
            <Image
              source={require('../../../assets/Hindustan-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              Reset your password
            </Text>

            <Text style={styles.subtitle}>
              Enter a new secure password
            </Text>

            <Text style={styles.timer}>
              Link expires in ⏱ {formatTime(secondsLeft)}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Lock size={18} color="#6b7280" />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create new password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  style={[styles.input, styles.inputWithRightIcon]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleReset}
              disabled={loading}
              style={styles.resetButton}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    Reset Password
                  </Text>
                  <ArrowRight size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.backLink}
            >
              <Text style={styles.backLinkText}>
                Remember your password?{' '}
                <Text style={styles.backLinkHighlight}>Back to login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
  },
  timer: {
    color: '#1f4d36',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 10,
  },
  input: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    color: '#1f2937',
    fontSize: 16,
  },
  inputWithRightIcon: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  resetButton: {
    backgroundColor: '#1f4d36',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  backLink: {
    marginTop: 16,
  },
  backLinkText: {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: 14,
  },
  backLinkHighlight: {
    color: '#1f4d36',
    fontWeight: '600',
  },
  expiredContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  expiredContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  expiredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  expiredLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 24,
  },
  expiredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1f2937',
  },
  expiredMessage: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
  },
  expiredButton: {
    backgroundColor: '#1f4d36',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  expiredButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResetPassword;
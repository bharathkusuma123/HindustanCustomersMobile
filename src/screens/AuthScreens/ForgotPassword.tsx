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
// import { useNavigation } from '@react-navigation/native';
// import { Button } from '../../components/ui/button';
// import { Mail, ArrowRight, RotateCw } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';

// export const ForgotPassword = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [cooldown, setCooldown] = useState(0);

//   useEffect(() => {
//     if (cooldown <= 0) return;

//     const timer = setInterval(() => {
//       setCooldown(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [cooldown]);

//   const sendLink = async () => {
//     if (!email) {
//       Alert.alert("Error", "Please enter your email");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setSent(true);
//       setCooldown(60);
//       Alert.alert("Success", "Reset link sent to your email");

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Failed to send reset link");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (sent) {
//     return (
//       <SafeAreaView className="flex-1 bg-muted/30">
//         <View className="flex-1 justify-center px-6">
//           <View className="bg-card rounded-2xl p-8 shadow-xl">
//             <Image
//               source={require('../../../assets/Hindustan-logo.png')}
//               className="h-16 w-16 self-center mb-6"
//               resizeMode="contain"
//             />

//             <Text className="text-xl font-bold text-center mb-4">
//               Check your email 📩
//             </Text>

//             <Text className="text-muted-foreground text-center mb-2">
//               We sent a password reset link to:
//             </Text>

//             <Text className="font-semibold text-center mb-4">{email}</Text>

//             <Text className="text-sm text-muted-foreground text-center mb-6">
//               Didn't receive it? Check spam folder.
//             </Text>

//             <TouchableOpacity
//               onPress={sendLink}
//               disabled={cooldown > 0 || loading}
//               className="border border-border rounded-lg py-3 mb-4"
//             >
//               <Text className="text-center">
//                 {cooldown > 0 
//                   ? `Resend in ${cooldown}s`
//                   : "Resend Email"
//                 }
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text className="text-primary text-center font-medium">
//                 Back to login
//               </Text>
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
//               Forgot password?
//             </Text>

//             <Text className="text-white/70 text-center mb-6">
//               Enter your registered email to receive reset link
//             </Text>

//             <View className="mb-6">
//               <Text className="text-white/80 mb-2">Email address</Text>
//               <View className="relative">
//                 <View className="absolute left-3 top-3 z-10">
//                   <Mail size={18} color="#fff" />
//                 </View>
//                 <TextInput
//                   value={email}
//                   onChangeText={setEmail}
//                   placeholder="Enter your email"
//                   placeholderTextColor="#fff"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={sendLink}
//               disabled={loading}
//               className="bg-[#f5b82e] py-4 rounded-lg flex-row items-center justify-center"
//             >
//               {loading ? (
//                 <ActivityIndicator color="#000" />
//               ) : (
//                 <>
//                   <Text className="text-black font-semibold mr-2">
//                     Send Reset Link
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
//                 Remember password?{' '}
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
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Mail, ArrowRight, RotateCw } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';

export const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const sendLink = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSent(true);
      setCooldown(60);
      Alert.alert("Success", "Reset link sent to your email");

    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.sentContainer}>
        <View style={styles.sentContent}>
          <View style={styles.sentCard}>
            <Image
              source={require('../../../assets/Hindustan-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.sentTitle}>
              Check your email 📩
            </Text>

            <Text style={styles.sentSubtitle}>
              We sent a password reset link to:
            </Text>

            <Text style={styles.sentEmail}>{email}</Text>

            <Text style={styles.sentHint}>
              Didn't receive it? Check spam folder.
            </Text>

            <TouchableOpacity
              onPress={sendLink}
              disabled={cooldown > 0 || loading}
              style={styles.resendButton}
            >
              <Text style={styles.resendButtonText}>
                {cooldown > 0 
                  ? `Resend in ${cooldown}s`
                  : "Resend Email"
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backToLogin}>
                Back to login
              </Text>
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
              Forgot password?
            </Text>

            <Text style={styles.subtitle}>
              Enter your registered email to receive reset link
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email address</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Mail size={18} color="#6b7280" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={sendLink}
              disabled={loading}
              style={styles.sendButton}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    Send Reset Link
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
                Remember password?{' '}
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
  sentContainer: {
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
    marginBottom: 24,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
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
    paddingLeft: 40,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    color: '#1f2937',
    fontSize: 16,
  },
  sendButton: {
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
  sentContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sentCard: {
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
  },
  sentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1f2937',
  },
  sentSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
  },
  sentEmail: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1f2937',
    fontSize: 16,
  },
  sentHint: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  resendButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  resendButtonText: {
    textAlign: 'center',
    color: '#1f2937',
    fontWeight: '500',
  },
  backToLogin: {
    color: '#1f4d36',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ForgotPassword;
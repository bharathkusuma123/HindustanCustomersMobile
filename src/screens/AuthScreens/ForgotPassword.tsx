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
        {/* Background Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1567326619821-2664df9c48da?q=80&w=1400' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Dark Overlay */}
        <View style={styles.overlay} />

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
                  <Mail size={18} color="#fff" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255,255,255,0.6)"
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
                <ActivityIndicator color="#000" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    Send Reset Link
                  </Text>
                  <ArrowRight size={18} color="#000" />
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
  },
  sentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1f4d36',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 32,
  },
  logo: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#f5b82e',
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
    color: '#000',
    fontWeight: '600',
    marginRight: 8,
  },
  backLink: {
    marginTop: 16,
  },
  backLinkText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  backLinkHighlight: {
    color: '#f5b82e',
    fontWeight: '500',
  },
  sentContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  sentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  sentSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  sentEmail: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  sentHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  resendButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  resendButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  backToLogin: {
    color: '#2B6B3F',
    textAlign: 'center',
    fontWeight: '500',
  },
});
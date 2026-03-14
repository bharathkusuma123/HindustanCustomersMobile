// import React, { useState } from 'react';
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
// import { Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';
// import * as SecureStore from 'expo-secure-store';

// export const Login = () => {
//   const navigation = useNavigation();
//   const { login } = useAuth();
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       Alert.alert("Error", "Please enter mobile number and password");
//       return;
//     }

//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!mobileRegex.test(mobile)) {
//       Alert.alert("Error", "Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           proprietor_mobile: mobile,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Save user data using auth context
//       await login(data.token, data.user);

//       const roleToUse = data.user.frontend_role || data.user.role;

//       Alert.alert("Success", "Login successful!", [
//         {
//           text: "OK",
//           onPress: async () => {
//             if (roleToUse === "BUYER") {
//               const checkResponse = await fetch(
//                 `${API_BASE_URL}/orders/buyers/${data.user.user_id}/has-orders`
//               );
//               const result = await checkResponse.json();
              
//               if (result.hasOrders) {
//                 navigation.navigate('BuyerDashboard');
//               } else {
//                 navigation.navigate('Products');
//               }
//             } else if (roleToUse === "SELLER" || roleToUse === "FARMER") {
//               navigation.navigate('SellerDashboard');
//             } else {
//               navigation.navigate('Index');
//             }
//           }
//         }
//       ]);

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//         {/* Content */}
//         <View className="flex-1 justify-center px-6">
//           <View className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
//             {/* Logo */}
//             <View className="items-center mb-6">
//               <Image
//                 source={require('../../../assets/Hindustan-logo.jpeg')}
//                 className="h-16 w-16"
//                 resizeMode="contain"
//               />
//               <Text className="text-xl font-bold text-[#f5b82e] mt-2">
//                 Hindustan Proteins
//               </Text>
//               <Text className="text-2xl font-bold text-white mt-4">Welcome back</Text>
//               <Text className="text-white/70">Sign in to continue trading</Text>
//             </View>

//             {/* Form */}
//             <View className="space-y-4">
//               {/* Mobile Input */}
//               <View>
//                 <Text className="text-white/80 mb-2">Mobile Number</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <Phone size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={mobile}
//                     onChangeText={setMobile}
//                     placeholder="Enter registered mobile number"
//                     placeholderTextColor="#fff"
//                     keyboardType="phone-pad"
//                     className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View>
//                 <View className="flex-row justify-between mb-2">
//                   <Text className="text-white/80">Password</Text>
//                   <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text className="text-[#f5b82e] text-sm">Forgot password?</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <Lock size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Enter your password"
//                     placeholderTextColor="#fff"
//                     secureTextEntry={!showPassword}
//                     className="pl-10 pr-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                   <TouchableOpacity
//                     onPress={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={18} color="#fff" />
//                     ) : (
//                       <Eye size={18} color="#fff" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Submit Button */}
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 disabled={loading}
//                 className="bg-[#f5b82e] py-4 rounded-lg flex-row items-center justify-center mt-4"
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#000" />
//                 ) : (
//                   <>
//                     <Text className="text-black font-semibold text-lg">Sign In</Text>
//                     <ArrowRight size={20} color="#000" className="ml-2" />
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Register Link */}
//             <View className="flex-row justify-center mt-6">
//               <Text className="text-white/70">Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                 <Text className="text-[#f5b82e] font-semibold">Register now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';

// export const Login = () => {
//   const navigation = useNavigation();
//   const { login } = useAuth();
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       Alert.alert("Error", "Please enter mobile number and password");
//       return;
//     }

//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!mobileRegex.test(mobile)) {
//       Alert.alert("Error", "Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           proprietor_mobile: mobile,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Save user data using auth context
//       await login(data.token, data.user);

//       const roleToUse = data.user.frontend_role || data.user.role;

//       // Navigate based on role
//       if (roleToUse === "BUYER") {
//         try {
//           const checkResponse = await fetch(
//             `${API_BASE_URL}/orders/buyers/${data.user.user_id}/has-orders`
//           );
//           const result = await checkResponse.json();
          
//           if (result.hasOrders) {
//             navigation.navigate('BuyerDashboard' as never);
//           } else {
//             navigation.navigate('Products' as never);
//           }
//         } catch (error) {
//           // If the check fails, default to Products
//           navigation.navigate('Products' as never);
//         }
//       } else if (roleToUse === "SELLER" || roleToUse === "FARMER") {
//         navigation.navigate('SellerDashboard' as never);
//       } else {
//         navigation.navigate('Products' as never);
//       }

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.contentContainer}>
//         {/* Background Image */}
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1567326619821-2664df9c48da?q=80&w=1400' }}
//           style={styles.backgroundImage}
//           resizeMode="cover"
//         />

//         {/* Dark Overlay */}
//         <View style={styles.overlay} />

//         {/* Content */}
//         <View style={styles.content}>
//           <View style={styles.card}>
//             {/* Logo */}
//             <View style={styles.logoContainer}>
//               <Image
//                 source={require('../../../assets/Hindustan-logo.jpeg')}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//               <Text style={styles.logoText}>
//                 Hindustan Proteins
//               </Text>
//               <Text style={styles.welcomeTitle}>Welcome back</Text>
//               <Text style={styles.welcomeSubtitle}>Sign in to continue trading</Text>
//             </View>

//             {/* Form */}
//             <View style={styles.form}>
//               {/* Mobile Input */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Mobile Number</Text>
//                 <View style={styles.inputWrapper}>
//                   <View style={styles.iconContainer}>
//                     <Phone size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={mobile}
//                     onChangeText={setMobile}
//                     placeholder="Enter registered mobile number"
//                     placeholderTextColor="rgba(255,255,255,0.6)"
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                     style={styles.input}
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View style={styles.inputGroup}>
//                 <View style={styles.passwordHeader}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
//                     <Text style={styles.forgotPassword}>Forgot password?</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.inputWrapper}>
//                   <View style={styles.iconContainer}>
//                     <Lock size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Enter your password"
//                     placeholderTextColor="rgba(255,255,255,0.6)"
//                     secureTextEntry={!showPassword}
//                     style={[styles.input]}
//                   />
//                   <TouchableOpacity
//                     onPress={() => setShowPassword(!showPassword)}
//                     style={styles.eyeIcon}
//                   >
//                     {showPassword ? (
//                       <EyeOff size={18} color="#fff" />
//                     ) : (
//                       <Eye size={18} color="#fff" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Submit Button */}
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 disabled={loading}
//                 style={styles.submitButton}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#000" />
//                 ) : (
//                   <View style={styles.buttonContent}>
//                     <Text style={styles.buttonText}>Sign In</Text>
//                     <ArrowRight size={20} color="#000" />
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Register Link */}
//             <View style={styles.registerContainer}>
//               <Text style={styles.registerText}>Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
//                 <Text style={styles.registerLink}>Register now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1f4d36',
//     opacity: 0.9,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     padding: 32,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   logo: {
//     width: 64,
//     height: 64,
//   },
//   logoText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#f5b82e',
//     marginTop: 8,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 16,
//   },
//   welcomeSubtitle: {
//     color: 'rgba(255,255,255,0.7)',
//   },
//   form: {
//     gap: 16,
//   },
//   inputGroup: {
//     marginBottom: 4,
//   },
//   inputLabel: {
//     color: 'rgba(255,255,255,0.8)',
//     marginBottom: 8,
//   },
//   passwordHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   forgotPassword: {
//     color: '#f5b82e',
//     fontSize: 14,
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   iconContainer: {
//     position: 'absolute',
//     left: 12,
//     top: 12,
//     zIndex: 10,
//   },
//   input: {
//     paddingLeft: 40,
//     paddingRight: 40,
//     padding: 12,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 8,
//     color: '#fff',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 12,
//     top: 12,
//   },
//   submitButton: {
//     backgroundColor: '#f5b82e',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#000',
//     fontWeight: '600',
//     fontSize: 18,
//     marginRight: 8,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   registerText: {
//     color: 'rgba(255,255,255,0.7)',
//   },
//   registerLink: {
//     color: '#f5b82e',
//     fontWeight: '600',
//   },
// });




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';
// import { useEffect, useRef } from 'react';
// export const Login = () => {
//   const navigation = useNavigation();
//   const { user, login: authLogin } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const navigationAttempted = useRef(false);

//   // Handle navigation when user state changes
//   useEffect(() => {
//     if (user && !navigationAttempted.current) {
//       navigationAttempted.current = true;
      
//       const roleToUse = user.frontend_role || user.role;
      
//       // Use CommonActions to reset the navigation stack
//       if (roleToUse === "BUYER") {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{ name: 'BuyerDashboard' }],
//           })
//         );
//       } else if (roleToUse === "SELLER" || roleToUse === "FARMER") {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{ name: 'SellerDashboard' }],
//           })
//         );
//       } else {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{ name: 'Products' }],
//           })
//         );
//       }
//     }
//   }, [user, navigation]);

//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       Alert.alert("Error", "Please enter mobile number and password");
//       return;
//     }

//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!mobileRegex.test(mobile)) {
//       Alert.alert("Error", "Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           proprietor_mobile: mobile,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Reset the navigation attempt flag
//       navigationAttempted.current = false;
      
//       // Save user data using auth context
//       await authLogin(data.token, data.user);

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.contentContainer}>
//         {/* Content */}
//         <View style={styles.content}>
//           <View style={styles.card}>
//             {/* Logo */}
//             <View style={styles.logoContainer}>
//               <Image
//                 source={require('../../../assets/Hindustan-logo.jpeg')}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//               <Text style={styles.logoText}>
//                 Hindustan Proteins
//               </Text>
//               <Text style={styles.welcomeTitle}>Welcome back</Text>
//               <Text style={styles.welcomeSubtitle}>Sign in to continue trading</Text>
//             </View>

//             {/* Form */}
//             <View style={styles.form}>
//               {/* Mobile Input */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Mobile Number</Text>
//                 <View style={styles.inputWrapper}>
//                   <View style={styles.iconContainer}>
//                     <Phone size={18} color="#6b7280" />
//                   </View>
//                   <TextInput
//                     value={mobile}
//                     onChangeText={setMobile}
//                     placeholder="Enter registered mobile number"
//                     placeholderTextColor="#9ca3af"
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                     style={styles.input}
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View style={styles.inputGroup}>
//                 <View style={styles.passwordHeader}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
//                     <Text style={styles.forgotPassword}>Forgot password?</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.inputWrapper}>
//                   <View style={styles.iconContainer}>
//                     <Lock size={18} color="#6b7280" />
//                   </View>
//                   <TextInput
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Enter your password"
//                     placeholderTextColor="#9ca3af"
//                     secureTextEntry={!showPassword}
//                     style={styles.input}
//                   />
//                   <TouchableOpacity
//                     onPress={() => setShowPassword(!showPassword)}
//                     style={styles.eyeIcon}
//                   >
//                     {showPassword ? (
//                       <EyeOff size={18} color="#6b7280" />
//                     ) : (
//                       <Eye size={18} color="#6b7280" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Submit Button */}
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 disabled={loading}
//                 style={styles.submitButton}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#ffffff" />
//                 ) : (
//                   <View style={styles.buttonContent}>
//                     <Text style={styles.buttonText}>Sign In</Text>
//                     <ArrowRight size={20} color="#ffffff" />
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Register Link */}
//             <View style={styles.registerContainer}>
//               <Text style={styles.registerText}>Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
//                 <Text style={styles.registerLink}>Register now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   contentContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   logoText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f4d36',
//     marginTop: 8,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginTop: 16,
//   },
//   welcomeSubtitle: {
//     color: '#6b7280',
//     fontSize: 16,
//   },
//   form: {
//     gap: 16,
//   },
//   inputGroup: {
//     marginBottom: 4,
//   },
//   inputLabel: {
//     color: '#374151',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   passwordHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   forgotPassword: {
//     color: '#1f4d36',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   iconContainer: {
//     position: 'absolute',
//     left: 12,
//     top: 12,
//     zIndex: 10,
//   },
//   input: {
//     paddingLeft: 40,
//     paddingRight: 40,
//     padding: 12,
//     backgroundColor: '#f9fafb',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 8,
//     color: '#1f2937',
//     fontSize: 16,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 12,
//     top: 12,
//   },
//   submitButton: {
//     backgroundColor: '#1f4d36',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: '600',
//     fontSize: 18,
//     marginRight: 8,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   registerText: {
//     color: '#6b7280',
//     fontSize: 14,
//   },
//   registerLink: {
//     color: '#1f4d36',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });

// export default Login;




import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

export const Login = () => {
  const navigation = useNavigation();
  const { user, login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigationAttempted = useRef(false);

  // Handle navigation when user state changes
  useEffect(() => {
    if (user && !navigationAttempted.current) {
      navigationAttempted.current = true;
      
      const roleToUse = user.frontend_role || user.role;
      
      setTimeout(() => {
        if (roleToUse === "BUYER") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'BuyerDashboard' }],
            })
          );
        } else if (roleToUse === "SELLER" || roleToUse === "FARMER") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SellerDashboard' }],
            })
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Products' }],
            })
          );
        }
      }, 100);
    }
  }, [user, navigation]);

  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert("Error", "Please enter mobile number and password");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proprietor_mobile: mobile,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token || !data.user) {
        throw new Error("Invalid response from server");
      }

      navigationAttempted.current = false;
      await authLogin(data.token, data.user);

    } catch (err: any) {
      console.log("Login error:", err);
      Alert.alert("Error", err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/Hindustan-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>Hindustan Proteins</Text>
              <Text style={styles.welcomeTitle}>Welcome Back!</Text>
              <Text style={styles.welcomeSubtitle}>Sign in to continue trading</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Mobile Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mobile Number *</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Phone size={18} color="#1f4d36" />
                  </View>
                  <TextInput
                    value={mobile}
                    onChangeText={setMobile}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.inputLabel}>Password *</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Lock size={18} color="#1f4d36" />
                  </View>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#1f4d36" />
                    ) : (
                      <Eye size={18} color="#1f4d36" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={styles.submitButton}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    {loading ? "Logging in..." : "Login"}
                  </Text>
                  {!loading && <ArrowRight size={20} color="#ffffff" />}
                </View>
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f4d36',
    marginTop: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  welcomeSubtitle: {
    color: '#6b7280',
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 4,
  },
  inputLabel: {
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  forgotPassword: {
    color: '#1f4d36',
    fontSize: 14,
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
    paddingRight: 40,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    color: '#1f2937',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  submitButton: {
    backgroundColor: '#1f4d36',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 18,
    marginRight: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#1f4d36',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Login;
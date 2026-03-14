// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Button } from '../../components/ui/button';
// import { Eye, EyeOff, Phone, Lock, Mail, MapPin, User, FileText } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';

// // List of Karnataka taluks
// const KARNATAKA_TALUKS = [
//   "Bangalore North", "Bangalore South", "Bangalore East", "Bangalore West", "Anekal",
//   "Devanahalli", "Doddaballapura", "Hosakote", "Nelamangala",
//   "Athani", "Bailhongal", "Belagavi", "Chikkodi", "Gokak", "Hukkeri", "Khanapur", "Raibag", "Ramdurg", "Saundatti",
//   "Heggadadevanakote", "Hunsur", "Krishnarajanagara", "Mysuru", "Nanjangud", "Piriyapatna", "T.Narsipur",
//   "Chiknayakanhalli", "Gubbi", "Koratagere", "Kunigal", "Madhugiri", "Pavagada", "Sira", "Tiptur", "Tumakuru", "Turuvekere",
//   "Hubballi", "Dharwad", "Kalghatgi", "Kundgol", "Navalgund",
//   "Bantwal", "Belthangady", "Mangaluru", "Puttur", "Sullia",
//   "Bagalkot", "Ballari", "Bidar", "Chamarajanagar", "Chikkamagaluru", "Chitradurga",
//   "Dakshina Kannada", "Davangere", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar",
//   "Koppal", "Mandya", "Raichur", "Ramanagara", "Shivamogga", "Udupi", "Uttara Kannada",
//   "Vijayapura", "Vijayanagara", "Yadgir"
// ];

// export const Register = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isCustomTaluk, setIsCustomTaluk] = useState(false);
//   const [formData, setFormData] = useState({
//     proprietor_name: "",
//     trading_name: "",
//     proprietor_mobile: "",
//     alternative_mobile: "",
//     email: "",
//     pan_number: "",
//     aadhar_number: "",
//     gst_number: "",
//     taluk: "",
//     address_line1: "",
//     address_line2: "",
//     pincode: "",
//     state: "",
//     district: "",
//     vehicle_type: "",
//     vehicle_count: "",
//     role: "BUYER",
//     user_type: "Proprietor",
//     password: "",
//   });

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const fetchPincodeDetails = async (pincode: string) => {
//     if (pincode.length !== 6) return;

//     try {
//       const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await res.json();

//       if (data[0].Status === "Success") {
//         const postOffice = data[0].PostOffice[0];
//         setFormData(prev => ({
//           ...prev,
//           state: postOffice.State,
//           district: postOffice.District,
//           taluk: postOffice.Block || postOffice.Name
//         }));
//       }
//     } catch (err) {
//       console.error("Pincode fetch failed");
//     }
//   };

//   const validateForm = () => {
//     const errors = [];

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       errors.push("Email is required");
//     } else if (!emailRegex.test(formData.email)) {
//       errors.push("Please enter a valid email address");
//     }

//     // GST validation for Seller
//     if (formData.role === "SELLER" && !formData.gst_number) {
//       errors.push("GST number is mandatory for Seller");
//     }

//     // Mobile validation
//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!mobileRegex.test(formData.proprietor_mobile)) {
//       errors.push("Please enter a valid 10-digit mobile number");
//     }

//     return errors;
//   };

//   const handleSubmit = async () => {
//     const errors = validateForm();
//     if (errors.length > 0) {
//       Alert.alert("Validation Error", errors.join("\n"));
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${API_BASE_URL}/users/add-user`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       Alert.alert(
//         "Success",
//         "Registration successful! Please verify your mobile number.",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               navigation.navigate('VerifyOtp', {
//                 mobile: formData.proprietor_mobile,
//                 userData: {
//                   role: formData.role,
//                   user_id: data.user_id,
//                 },
//                 fromRegistration: true
//               });
//             }
//           }
//         ]
//       );

//     } catch (err: any) {
//       Alert.alert("Error", err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView className="flex-1 relative">
//         {/* Background Image */}
//         <Image
//           source={{ uri: 'https://plus.unsplash.com/premium_photo-1661834559466-63eea5f1d858?q=80&w=1157' }}
//           className="absolute w-full h-full"
//           resizeMode="cover"
//         />

//         {/* Dark Overlay */}
//         <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />

//         {/* Content */}
//         <View className="p-6">
//           <View className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//             {/* Logo */}
//             <View className="items-center mb-6">
//               <Image
//                 source={require('../../../assets/Hindustan-logo.png')}
//                 className="h-16 w-16"
//                 resizeMode="contain"
//               />
//               <Text className="text-xl font-bold text-[#f5b82e] mt-2">
//                 Hindustan Proteins
//               </Text>
//               <Text className="text-2xl font-bold text-white mt-4">Create Account</Text>
//               <Text className="text-white/70">Start trading with us</Text>
//             </View>

//             {/* Form */}
//             <View className="space-y-4">
//               {/* Role Selection */}
//               <View>
//                 <Text className="text-white/80 mb-2">Register As *</Text>
//                 <View className="flex-row gap-3">
//                   {['BUYER', 'SELLER', 'FARMER'].map((role) => (
//                     <TouchableOpacity
//                       key={role}
//                       onPress={() => handleChange('role', role)}
//                       className={`flex-1 py-3 rounded-lg border ${
//                         formData.role === role
//                           ? 'bg-[#f5b82e] border-[#f5b82e]'
//                           : 'bg-white/10 border-white/20'
//                       }`}
//                     >
//                       <Text className={`text-center ${
//                         formData.role === role ? 'text-black' : 'text-white'
//                       }`}>
//                         {role}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>

//               {/* Proprietor Name */}
//               <View>
//                 <Text className="text-white/80 mb-2">Proprietor / Partner Name *</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <User size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={formData.proprietor_name}
//                     onChangeText={(text) => handleChange('proprietor_name', text)}
//                     placeholder="Enter full name"
//                     placeholderTextColor="#fff"
//                     className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* Trading Name */}
//               <View>
//                 <Text className="text-white/80 mb-2">Trading Name *</Text>
//                 <TextInput
//                   value={formData.trading_name}
//                   onChangeText={(text) => handleChange('trading_name', text)}
//                   placeholder="Enter business name"
//                   placeholderTextColor="#fff"
//                   className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//               </View>

//               {/* Mobile */}
//               <View>
//                 <Text className="text-white/80 mb-2">Mobile Number *</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <Phone size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={formData.proprietor_mobile}
//                     onChangeText={(text) => handleChange('proprietor_mobile', text)}
//                     placeholder="10-digit mobile number"
//                     placeholderTextColor="#fff"
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                     className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* Email */}
//               <View>
//                 <Text className="text-white/80 mb-2">Email Address *</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <Mail size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={formData.email}
//                     onChangeText={(text) => handleChange('email', text)}
//                     placeholder="Enter email address"
//                     placeholderTextColor="#fff"
//                     keyboardType="email-address"
//                     className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* Password */}
//               <View>
//                 <Text className="text-white/80 mb-2">Password *</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <Lock size={18} color="#fff" />
//                   </View>
//                   <TextInput
//                     value={formData.password}
//                     onChangeText={(text) => handleChange('password', text)}
//                     placeholder="Create password"
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

//               {/* PAN & Aadhar */}
//               <View className="flex-row gap-3">
//                 <View style={{ flex: 1 }}>
//                   <Text className="text-white/80 mb-2">PAN Number *</Text>
//                   <TextInput
//                     value={formData.pan_number}
//                     onChangeText={(text) => handleChange('pan_number', text)}
//                     placeholder="ABCDE1234F"
//                     placeholderTextColor="#fff"
//                     className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text className="text-white/80 mb-2">Aadhar Number *</Text>
//                   <TextInput
//                     value={formData.aadhar_number}
//                     onChangeText={(text) => handleChange('aadhar_number', text)}
//                     placeholder="12-digit Aadhar"
//                     placeholderTextColor="#fff"
//                     maxLength={12}
//                     className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* GST for Seller */}
//               {formData.role === "SELLER" && (
//                 <View>
//                   <Text className="text-white/80 mb-2">GST Number *</Text>
//                   <TextInput
//                     value={formData.gst_number}
//                     onChangeText={(text) => handleChange('gst_number', text)}
//                     placeholder="15-character GSTIN"
//                     placeholderTextColor="#fff"
//                     className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               )}

//               {/* Taluk for Seller/Farmer */}
//               {(formData.role === "SELLER" || formData.role === "FARMER") && (
//                 <View>
//                   <Text className="text-white/80 mb-2">Taluk *</Text>
//                   {!isCustomTaluk ? (
//                     <>
//                       <select
//                         value={formData.taluk}
//                         onChange={(e) => handleChange('taluk', e.target.value)}
//                         className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                       >
//                         <option value="">Select Taluk</option>
//                         {KARNATAKA_TALUKS.map((taluk) => (
//                           <option key={taluk} value={taluk}>{taluk}</option>
//                         ))}
//                         <option value="other">Enter custom taluk...</option>
//                       </select>
//                       <TouchableOpacity
//                         onPress={() => setIsCustomTaluk(true)}
//                         className="mt-2"
//                       >
//                         <Text className="text-[#f5b82e] text-sm">Can't find your taluk?</Text>
//                       </TouchableOpacity>
//                     </>
//                   ) : (
//                     <View>
//                       <TextInput
//                         value={formData.taluk}
//                         onChangeText={(text) => handleChange('taluk', text)}
//                         placeholder="Enter your taluk"
//                         placeholderTextColor="#fff"
//                         className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                       />
//                       <TouchableOpacity
//                         onPress={() => setIsCustomTaluk(false)}
//                         className="mt-2"
//                       >
//                         <Text className="text-[#f5b82e] text-sm">← Back to list</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               )}

//               {/* Address */}
//               <View>
//                 <Text className="text-white/80 mb-2">Address Line 1 *</Text>
//                 <TextInput
//                   value={formData.address_line1}
//                   onChangeText={(text) => handleChange('address_line1', text)}
//                   placeholder="House/Shop number, street"
//                   placeholderTextColor="#fff"
//                   className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//               </View>

//               <View>
//                 <Text className="text-white/80 mb-2">Address Line 2</Text>
//                 <TextInput
//                   value={formData.address_line2}
//                   onChangeText={(text) => handleChange('address_line2', text)}
//                   placeholder="Area, landmark (optional)"
//                   placeholderTextColor="#fff"
//                   className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//               </View>

//               {/* Pincode */}
//               <View>
//                 <Text className="text-white/80 mb-2">Pincode *</Text>
//                 <TextInput
//                   value={formData.pincode}
//                   onChangeText={(text) => {
//                     handleChange('pincode', text);
//                     fetchPincodeDetails(text);
//                   }}
//                   placeholder="6-digit pincode"
//                   placeholderTextColor="#fff"
//                   keyboardType="numeric"
//                   maxLength={6}
//                   className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                 />
//               </View>

//               {/* State & District (read-only) */}
//               <View className="flex-row gap-3">
//                 <View style={{ flex: 1 }}>
//                   <Text className="text-white/80 mb-2">State</Text>
//                   <TextInput
//                     value={formData.state}
//                     editable={false}
//                     className="p-3 bg-white/20 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text className="text-white/80 mb-2">District</Text>
//                   <TextInput
//                     value={formData.district}
//                     editable={false}
//                     className="p-3 bg-white/20 border border-white/20 rounded-lg text-white"
//                   />
//                 </View>
//               </View>

//               {/* Vehicle fields for Buyer */}
//               {formData.role === "BUYER" && (
//                 <>
//                   <View>
//                     <Text className="text-white/80 mb-2">Vehicle Type</Text>
//                     <select
//                       value={formData.vehicle_type}
//                       onChange={(e) => handleChange('vehicle_type', e.target.value)}
//                       className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                     >
//                       <option value="">Select vehicle type</option>
//                       <option value="Canter">Canter</option>
//                       <option value="Bolero">Bolero</option>
//                       <option value="Tata Ace">Tata Ace</option>
//                       <option value="Others">Others</option>
//                     </select>
//                   </View>

//                   <View>
//                     <Text className="text-white/80 mb-2">Number of Vehicles</Text>
//                     <TextInput
//                       value={formData.vehicle_count}
//                       onChangeText={(text) => handleChange('vehicle_count', text)}
//                       placeholder="e.g. 2"
//                       placeholderTextColor="#fff"
//                       keyboardType="numeric"
//                       className="p-3 bg-white/10 border border-white/20 rounded-lg text-white"
//                     />
//                   </View>
//                 </>
//               )}

//               {/* Submit Button */}
//               <TouchableOpacity
//                 onPress={handleSubmit}
//                 disabled={loading}
//                 className="bg-[#f5b82e] py-4 rounded-lg mt-6"
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#000" />
//                 ) : (
//                   <Text className="text-black font-semibold text-lg text-center">
//                     Create Account
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Login Link */}
//             <View className="flex-row justify-center mt-6">
//               <Text className="text-white/70">Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text className="text-[#f5b82e] font-semibold">Sign in</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };




import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Eye, EyeOff, Phone, Lock, Mail, MapPin, User, FileText } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';

// List of Karnataka taluks
const KARNATAKA_TALUKS = [
  "Bangalore North", "Bangalore South", "Bangalore East", "Bangalore West", "Anekal",
  "Devanahalli", "Doddaballapura", "Hosakote", "Nelamangala",
  "Athani", "Bailhongal", "Belagavi", "Chikkodi", "Gokak", "Hukkeri", "Khanapur", "Raibag", "Ramdurg", "Saundatti",
  "Heggadadevanakote", "Hunsur", "Krishnarajanagara", "Mysuru", "Nanjangud", "Piriyapatna", "T.Narsipur",
  "Chiknayakanhalli", "Gubbi", "Koratagere", "Kunigal", "Madhugiri", "Pavagada", "Sira", "Tiptur", "Tumakuru", "Turuvekere",
  "Hubballi", "Dharwad", "Kalghatgi", "Kundgol", "Navalgund",
  "Bantwal", "Belthangady", "Mangaluru", "Puttur", "Sullia",
  "Bagalkot", "Ballari", "Bidar", "Chamarajanagar", "Chikkamagaluru", "Chitradurga",
  "Dakshina Kannada", "Davangere", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar",
  "Koppal", "Mandya", "Raichur", "Ramanagara", "Shivamogga", "Udupi", "Uttara Kannada",
  "Vijayapura", "Vijayanagara", "Yadgir"
];

export const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCustomTaluk, setIsCustomTaluk] = useState(false);
  const [formData, setFormData] = useState({
    proprietor_name: "",
    trading_name: "",
    proprietor_mobile: "",
    alternative_mobile: "",
    email: "",
    pan_number: "",
    aadhar_number: "",
    gst_number: "",
    taluk: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    state: "",
    district: "",
    vehicle_type: "",
    vehicle_count: "",
    role: "BUYER",
    user_type: "Proprietor",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fetchPincodeDetails = async (pincode: string) => {
    if (pincode.length !== 6) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          state: postOffice.State,
          district: postOffice.District,
          taluk: postOffice.Block || postOffice.Name
        }));
      }
    } catch (err) {
      console.error("Pincode fetch failed");
    }
  };

  const validateForm = () => {
    const errors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.push("Email is required");
    } else if (!emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    // GST validation for Seller
    if (formData.role === "SELLER" && !formData.gst_number) {
      errors.push("GST number is mandatory for Seller");
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.proprietor_mobile)) {
      errors.push("Please enter a valid 10-digit mobile number");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"));
      return;
    }

    try {
      setLoading(true);
         console.log('API URL:', `${API_BASE_URL}/users/add-user`);
    console.log('Request Data:', JSON.stringify(formData, null, 2));

      const response = await fetch(`${API_BASE_URL}/users/add-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
        console.log('Response Status:', response.status);

      const data = await response.json();
         console.log('Response Data:', data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      Alert.alert(
        "Success",
        "Registration successful! Please verify your mobile number.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate('VerifyOtp', {
                mobile: formData.proprietor_mobile,
                userData: {
                  role: formData.role,
                  user_id: data.user_id,
                },
                fromRegistration: true
              });
            }
          }
        ]
      );

    } catch (err: any) {
          console.error('Full error:', err); // Log the complete error

      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Background Image */}
        <Image
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1661834559466-63eea5f1d858?q=80&w=1157' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Dark Overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/Hindustan-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>
                Hindustan Proteins
              </Text>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Start trading with us</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Role Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Register As *</Text>
                <View style={styles.roleContainer}>
                  {['BUYER', 'SELLER', 'FARMER'].map((role) => (
                    <TouchableOpacity
                      key={role}
                      onPress={() => handleChange('role', role)}
                      style={[
                        styles.roleButton,
                        formData.role === role && styles.roleButtonActive,
                      ]}
                    >
                      <Text style={[
                        styles.roleButtonText,
                        formData.role === role && styles.roleButtonTextActive,
                      ]}>
                        {role}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Proprietor Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Proprietor / Partner Name *</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <User size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={formData.proprietor_name}
                    onChangeText={(text) => handleChange('proprietor_name', text)}
                    placeholder="Enter full name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              {/* Trading Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Trading Name *</Text>
                <TextInput
                  value={formData.trading_name}
                  onChangeText={(text) => handleChange('trading_name', text)}
                  placeholder="Enter business name"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </View>

              {/* Mobile */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number *</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Phone size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={formData.proprietor_mobile}
                    onChangeText={(text) => handleChange('proprietor_mobile', text)}
                    placeholder="10-digit mobile number"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Mail size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    placeholder="Enter email address"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    keyboardType="email-address"
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password *</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Lock size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    placeholder="Create password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    secureTextEntry={!showPassword}
                    style={[styles.inputWithIcon, styles.inputWithRightIcon]}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#fff" />
                    ) : (
                      <Eye size={18} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* PAN & Aadhar */}
              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Text style={styles.label}>PAN Number *</Text>
                  <TextInput
                    value={formData.pan_number}
                    onChangeText={(text) => handleChange('pan_number', text)}
                    placeholder="ABCDE1234F"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.input}
                  />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.label}>Aadhar Number *</Text>
                  <TextInput
                    value={formData.aadhar_number}
                    onChangeText={(text) => handleChange('aadhar_number', text)}
                    placeholder="12-digit Aadhar"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    maxLength={12}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* GST for Seller */}
              {formData.role === "SELLER" && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>GST Number *</Text>
                  <TextInput
                    value={formData.gst_number}
                    onChangeText={(text) => handleChange('gst_number', text)}
                    placeholder="15-character GSTIN"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.input}
                  />
                </View>
              )}

              {/* Taluk for Seller/Farmer */}
              {(formData.role === "SELLER" || formData.role === "FARMER") && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Taluk *</Text>
                  {!isCustomTaluk ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          const currentIndex = KARNATAKA_TALUKS.indexOf(formData.taluk);
                          const nextIndex = (currentIndex + 1) % KARNATAKA_TALUKS.length;
                          handleChange('taluk', KARNATAKA_TALUKS[nextIndex]);
                        }}
                        style={styles.selectButton}
                      >
                        <Text style={styles.selectButtonText}>
                          {formData.taluk || "Select Taluk"}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setIsCustomTaluk(true)}
                        style={styles.customTalukLink}
                      >
                        <Text style={styles.customTalukLinkText}>Can't find your taluk?</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <View>
                      <TextInput
                        value={formData.taluk}
                        onChangeText={(text) => handleChange('taluk', text)}
                        placeholder="Enter your taluk"
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        style={styles.input}
                      />
                      <TouchableOpacity
                        onPress={() => setIsCustomTaluk(false)}
                        style={styles.customTalukLink}
                      >
                        <Text style={styles.customTalukLinkText}>← Back to list</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {/* Address */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address Line 1 *</Text>
                <TextInput
                  value={formData.address_line1}
                  onChangeText={(text) => handleChange('address_line1', text)}
                  placeholder="House/Shop number, street"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address Line 2</Text>
                <TextInput
                  value={formData.address_line2}
                  onChangeText={(text) => handleChange('address_line2', text)}
                  placeholder="Area, landmark (optional)"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </View>

              {/* Pincode */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pincode *</Text>
                <TextInput
                  value={formData.pincode}
                  onChangeText={(text) => {
                    handleChange('pincode', text);
                    fetchPincodeDetails(text);
                  }}
                  placeholder="6-digit pincode"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="numeric"
                  maxLength={6}
                  style={styles.input}
                />
              </View>

              {/* State & District (read-only) */}
              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Text style={styles.label}>State</Text>
                  <TextInput
                    value={formData.state}
                    editable={false}
                    style={[styles.input, styles.inputDisabled]}
                  />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.label}>District</Text>
                  <TextInput
                    value={formData.district}
                    editable={false}
                    style={[styles.input, styles.inputDisabled]}
                  />
                </View>
              </View>

              {/* Vehicle fields for Buyer */}
              {formData.role === "BUYER" && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Vehicle Type</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const types = ["", "Canter", "Bolero", "Tata Ace", "Others"];
                        const currentIndex = types.indexOf(formData.vehicle_type);
                        const nextIndex = (currentIndex + 1) % types.length;
                        handleChange('vehicle_type', types[nextIndex]);
                      }}
                      style={styles.selectButton}
                    >
                      <Text style={styles.selectButtonText}>
                        {formData.vehicle_type || "Select vehicle type"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Number of Vehicles</Text>
                    <TextInput
                      value={formData.vehicle_count}
                      onChangeText={(text) => handleChange('vehicle_count', text)}
                      placeholder="e.g. 2"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </View>
                </>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={styles.submitButton}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  content: {
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5b82e',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    color: '#fff',
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
  inputWithIcon: {
    paddingLeft: 40,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    color: '#fff',
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  roleButtonActive: {
    backgroundColor: '#f5b82e',
    borderColor: '#f5b82e',
  },
  roleButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  roleButtonTextActive: {
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  selectButton: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  selectButtonText: {
    color: '#fff',
  },
  customTalukLink: {
    marginTop: 8,
  },
  customTalukLinkText: {
    color: '#f5b82e',
    fontSize: 14,
  },
  inputDisabled: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    opacity: 0.7,
  },
  submitButton: {
    backgroundColor: '#f5b82e',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginLinkText: {
    color: 'rgba(255,255,255,0.7)',
  },
  loginLink: {
    color: '#f5b82e',
    fontWeight: '600',
  },
});
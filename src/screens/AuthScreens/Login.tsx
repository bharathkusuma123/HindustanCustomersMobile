import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

export const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      // Save user data using auth context
      await login(data.token, data.user);

      const roleToUse = data.user.frontend_role || data.user.role;

      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: async () => {
            if (roleToUse === "BUYER") {
              const checkResponse = await fetch(
                `${API_BASE_URL}/orders/buyers/${data.user.user_id}/has-orders`
              );
              const result = await checkResponse.json();
              
              if (result.hasOrders) {
                navigation.navigate('BuyerDashboard');
              } else {
                navigation.navigate('Products');
              }
            } else if (roleToUse === "SELLER" || roleToUse === "FARMER") {
              navigation.navigate('SellerDashboard');
            } else {
              navigation.navigate('Index');
            }
          }
        }
      ]);

    } catch (err: any) {
      Alert.alert("Error", err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 relative">
        {/* Background Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1567326619821-2664df9c48da?q=80&w=1400' }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />

        {/* Content */}
        <View className="flex-1 justify-center px-6">
          <View className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            {/* Logo */}
            <View className="items-center mb-6">
              <Image
                source={require('../../../assets/Hindustan-logo.jpeg')}
                className="h-16 w-16"
                resizeMode="contain"
              />
              <Text className="text-xl font-bold text-[#f5b82e] mt-2">
                Hindustan Proteins
              </Text>
              <Text className="text-2xl font-bold text-white mt-4">Welcome back</Text>
              <Text className="text-white/70">Sign in to continue trading</Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Mobile Input */}
              <View>
                <Text className="text-white/80 mb-2">Mobile Number</Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Phone size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={mobile}
                    onChangeText={setMobile}
                    placeholder="Enter registered mobile number"
                    placeholderTextColor="#fff"
                    keyboardType="phone-pad"
                    className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/80">Password</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text className="text-[#f5b82e] text-sm">Forgot password?</Text>
                  </TouchableOpacity>
                </View>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Lock size={18} color="#fff" />
                  </View>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#fff"
                    secureTextEntry={!showPassword}
                    className="pl-10 pr-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#fff" />
                    ) : (
                      <Eye size={18} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className="bg-[#f5b82e] py-4 rounded-lg flex-row items-center justify-center mt-4"
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <>
                    <Text className="text-black font-semibold text-lg">Sign In</Text>
                    <ArrowRight size={20} color="#000" className="ml-2" />
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-white/70">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-[#f5b82e] font-semibold">Register now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
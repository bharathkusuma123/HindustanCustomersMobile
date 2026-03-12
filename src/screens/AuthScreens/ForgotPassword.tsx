import React, { useState, useEffect } from 'react';
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
import { Button } from '../../components/ui/Button';
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
      <SafeAreaView className="flex-1 bg-muted/30">
        <View className="flex-1 justify-center px-6">
          <View className="bg-card rounded-2xl p-8 shadow-xl">
            <Image
              source={require('../../assets/Hindustan-logo.png')}
              className="h-16 w-16 self-center mb-6"
              resizeMode="contain"
            />

            <Text className="text-xl font-bold text-center mb-4">
              Check your email 📩
            </Text>

            <Text className="text-muted-foreground text-center mb-2">
              We sent a password reset link to:
            </Text>

            <Text className="font-semibold text-center mb-4">{email}</Text>

            <Text className="text-sm text-muted-foreground text-center mb-6">
              Didn't receive it? Check spam folder.
            </Text>

            <TouchableOpacity
              onPress={sendLink}
              disabled={cooldown > 0 || loading}
              className="border border-border rounded-lg py-3 mb-4"
            >
              <Text className="text-center">
                {cooldown > 0 
                  ? `Resend in ${cooldown}s`
                  : "Resend Email"
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary text-center font-medium">
                Back to login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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

        <View className="flex-1 justify-center px-6">
          <View className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <Image
              source={require('../../assets/Hindustan-logo.png')}
              className="h-16 w-16 self-center mb-6"
              resizeMode="contain"
            />

            <Text className="text-2xl font-bold text-white text-center mb-2">
              Forgot password?
            </Text>

            <Text className="text-white/70 text-center mb-6">
              Enter your registered email to receive reset link
            </Text>

            <View className="mb-6">
              <Text className="text-white/80 mb-2">Email address</Text>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <Mail size={18} color="#fff" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#fff"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="pl-10 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={sendLink}
              disabled={loading}
              className="bg-[#f5b82e] py-4 rounded-lg flex-row items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Text className="text-black font-semibold mr-2">
                    Send Reset Link
                  </Text>
                  <ArrowRight size={18} color="#000" />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="mt-4"
            >
              <Text className="text-white/70 text-center">
                Remember password?{' '}
                <Text className="text-[#f5b82e] font-medium">Back to login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
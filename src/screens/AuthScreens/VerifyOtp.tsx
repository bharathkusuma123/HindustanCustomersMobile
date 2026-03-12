import React, { useState, useEffect, useRef } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Phone, ArrowLeft, ArrowRight, Shield, CheckCircle } from 'lucide-react-native';
import * as SecureStore from 'expo-secure-store';

export const VerifyOtp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile, userData, fromRegistration } = route.params as any;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    const STATIC_OTP = "123456";

    try {
      setVerifying(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      if (otpString !== STATIC_OTP) {
        throw new Error("Invalid OTP. Please try again.");
      }

      // Save user data
      await SecureStore.setItemAsync('user', JSON.stringify(userData));

      setSuccess("OTP verified successfully! 🎉");

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      setResendTimer(30);
      setCanResend(false);
      setSuccess("OTP resent successfully!");

      // Start timer again
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="bg-card rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <View className="items-center mb-6">
            <Image
              source={require('../../assets/Hindustan-logo.png')}
              className="h-20 w-20"
              resizeMode="contain"
            />
          </View>

          <View className="items-center mb-8">
            <View className="bg-primary/10 p-4 rounded-full mb-4">
              <Shield size={32} color="#2B6B3F" />
            </View>
            <Text className="text-2xl font-bold text-foreground text-center">
              Verify Your Mobile
            </Text>
            <Text className="text-muted-foreground text-center mt-2">
              {fromRegistration 
                ? "Complete registration by verifying your mobile"
                : "Enter the 6-digit OTP sent to"
              }
            </Text>
            <View className="flex-row items-center mt-2">
              <Phone size={16} color="#666" />
              <Text className="font-semibold ml-2">+91 {mobile}</Text>
            </View>
          </View>

          {/* Error/Success Messages */}
          {error ? (
            <View className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-4">
              <Text className="text-destructive text-center">{error}</Text>
            </View>
          ) : null}

          {success ? (
            <View className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
              <View className="flex-row items-center justify-center">
                <CheckCircle size={16} color="#16a34a" />
                <Text className="text-green-700 ml-2">{success}</Text>
              </View>
            </View>
          ) : null}

          {/* OTP Inputs */}
          <View className="mb-6">
            <Text className="text-foreground mb-3">Enter OTP</Text>
            <View className="flex-row justify-center gap-2">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyDown(index, nativeEvent.key)}
                  keyboardType="numeric"
                  maxLength={1}
                  className="w-12 h-14 text-center text-xl font-semibold border border-border rounded-lg bg-background"
                  editable={!verifying && !loading}
                />
              ))}
            </View>
          </View>

          {/* Resend OTP */}
          <View className="items-center mb-6">
            {canResend ? (
              <TouchableOpacity onPress={handleResendOtp} disabled={loading}>
                <Text className="text-primary">Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-muted-foreground">
                Resend OTP in {resendTimer} seconds
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => navigation.navigate(fromRegistration ? 'Register' : 'Login')}
              className="flex-1 border border-border rounded-lg py-4 flex-row items-center justify-center"
              disabled={verifying}
            >
              <ArrowLeft size={18} color="#666" />
              <Text className="ml-2 text-foreground">
                {fromRegistration ? 'Back' : 'Back to Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleVerifyOtp}
              disabled={verifying}
              className="flex-1 bg-primary rounded-lg py-4 flex-row items-center justify-center"
            >
              {verifying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white font-semibold mr-2">Verify</Text>
                  <ArrowRight size={18} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Demo Note */}
          <View className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <Text className="text-blue-700 text-center">
              <Text className="font-bold">Demo:</Text> Use OTP: <Text className="font-bold">123456</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
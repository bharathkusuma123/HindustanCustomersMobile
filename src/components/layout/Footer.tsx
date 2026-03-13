import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Mail, Phone, MapPin } from 'lucide-react-native';

export const Footer = () => {
  return (
    <View className="relative overflow-hidden">
      {/* Background Image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1582661629051-43eadd614098?q=80&w=1170&auto=format&fit=crop' }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Dark Green Overlay */}
      <View className="absolute inset-0 bg-[#1f4d36]/90" />

      {/* Glow Effect */}
      <View className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#f5b82e]/20 blur-3xl" />

      {/* Content */}
      <ScrollView className="relative px-4 py-8">
        <View className="gap-8">
          {/* Brand */}
          <View className="space-y-4">
            <View className="flex-row items-center gap-3">
              <Image
                source={require('../../../assets/Hindustan-logo.png')}
                className="h-14 w-auto aspect-square"
                resizeMode="contain"
              />
              <Text className="text-xl font-bold text-white">
                Hindustan Proteins
              </Text>
            </View>
            <Text className="text-sm text-white/80 leading-relaxed">
              India’s trusted B2B platform for bulk poultry feed trading —
              connecting buyers, sellers and farmers with transparency.
            </Text>
          </View>

          {/* Quick Links */}
          <View className="space-y-4">
            <Text className="font-semibold tracking-wide text-white">Quick Links</Text>
            <View className="space-y-2">
              <Link href="/products" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Browse Products
              </Link>
              <Link href="/how-it-works" className="text-sm text-white/80 hover:text-[#f5b82e]">
                How It Works
              </Link>
              <Link href="/buyer/dashboard" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Buyer Dashboard
              </Link>
              <Link href="/seller/dashboard" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Seller Dashboard
              </Link>
            </View>
          </View>

          {/* For Business */}
          <View className="space-y-4">
            <Text className="font-semibold tracking-wide text-white">For Business</Text>
            <View className="space-y-2">
              <Link href="/register" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Register as Buyer
              </Link>
              <Link href="/register" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Become a Seller
              </Link>
              <Link href="/partners" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Partner with Us
              </Link>
              <Link href="/terms" className="text-sm text-white/80 hover:text-[#f5b82e]">
                Terms & Conditions
              </Link>
            </View>
          </View>

          {/* Contact */}
          <View className="space-y-4">
            <Text className="font-semibold tracking-wide text-white">Contact Us</Text>
            <View className="space-y-3">
              <View className="flex-row gap-2">
                <MapPin size={16} color="#f5b82e" style={{ marginTop: 2 }} />
                <Text className="text-sm text-white/80 flex-1">
                  No. 853, 1st Floor, Bhavani Nilaya, Near Presidency School, 
                  Banashankari 6th Stage, 1st Block, Bengaluru – 560098, India
                </Text>
              </View>

              <TouchableOpacity 
                className="flex-row items-center gap-2"
                onPress={() => Linking.openURL('tel:+919972763655')}
              >
                <Phone size={16} color="#f5b82e" />
                <Text className="text-sm text-white/80 hover:text-[#f5b82e]">
                  +91 9972763655
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="flex-row items-center gap-2"
                onPress={() => Linking.openURL('mailto:contact@hindustanproteins.com')}
              >
                <Mail size={16} color="#f5b82e" />
                <Text className="text-sm text-white/80 hover:text-[#f5b82e]">
                  contact@hindustanproteins.com
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="my-8 border-t border-white/15" />

        {/* Bottom Bar */}
        <View className="flex-col sm:flex-row items-center justify-between gap-3">
          <Text className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Hindustan Proteins. All rights reserved.
          </Text>
          <Text className="text-sm text-white/60 text-center">
            Designed by{' '}
            <Text 
              className="text-[#f5b82e] font-semibold"
              onPress={() => Linking.openURL('https://iiiqbets.com')}
            >
              iiiQbets
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
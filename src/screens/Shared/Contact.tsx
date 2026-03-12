import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

export const Contact = () => {
  const handleCall = () => {
    Linking.openURL('tel:+919972763655');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:contact@hindustanproteins.com');
  };

  const handleMap = () => {
    Linking.openURL('https://maps.google.com/?q=Bengaluru+560098');
  };

  return (
    <SafeAreaView className="flex-1 bg-muted/20">
      <Header />

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="relative h-64 overflow-hidden">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />
          
          <View className="absolute inset-0 justify-center px-6">
            <Badge className="mb-4 bg-[#f5b82e] self-start">Get in Touch</Badge>
            <Text className="text-4xl font-bold text-white">Contact Us</Text>
            <Text className="mt-2 text-white/80 text-lg">
              We're here to help with your poultry trading needs
            </Text>
          </View>
        </View>

        {/* Contact Cards */}
        <View className="px-4 py-12">
          <View className="gap-6">
            {/* Phone */}
            <TouchableOpacity onPress={handleCall}>
              <Card className="rounded-2xl">
                <Card.Content className="p-6 flex-row items-center">
                  <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
                    <Phone size={24} color="#f5b82e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-muted-foreground">Call Us</Text>
                    <Text className="text-lg font-semibold text-foreground">
                      +91 9972763655
                    </Text>
                    <Text className="text-xs text-muted-foreground mt-1">
                      Mon-Sat, 9am to 6pm
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity onPress={handleEmail}>
              <Card className="rounded-2xl">
                <Card.Content className="p-6 flex-row items-center">
                  <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
                    <Mail size={24} color="#f5b82e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-muted-foreground">Email Us</Text>
                    <Text className="text-lg font-semibold text-foreground">
                      contact@hindustanproteins.com
                    </Text>
                    <Text className="text-xs text-muted-foreground mt-1">
                      We reply within 24 hours
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            {/* Address */}
            <TouchableOpacity onPress={handleMap}>
              <Card className="rounded-2xl">
                <Card.Content className="p-6 flex-row items-center">
                  <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
                    <MapPin size={24} color="#f5b82e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-muted-foreground">Visit Us</Text>
                    <Text className="text-base font-semibold text-foreground">
                      No. 853, 1st Floor, Bhavani Nilaya,{'\n'}
                      Near Presidency School,{'\n'}
                      Banashankari 6th Stage, 1st Block,{'\n'}
                      Bengaluru – 560098, India
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Business Hours */}
          <Card className="rounded-2xl mt-6">
            <Card.Content className="p-6">
              <View className="flex-row items-center mb-4">
                <Clock size={20} color="#f5b82e" />
                <Text className="text-lg font-semibold ml-2">Business Hours</Text>
              </View>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Monday - Friday</Text>
                  <Text className="font-medium">9:00 AM - 6:00 PM</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Saturday</Text>
                  <Text className="font-medium">9:00 AM - 4:00 PM</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Sunday</Text>
                  <Text className="font-medium">Closed</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
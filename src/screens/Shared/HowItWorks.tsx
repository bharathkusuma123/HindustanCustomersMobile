import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  ShoppingCart,
  Upload,
  CheckCircle,
  Truck,
  Store,
  Leaf,
  ShieldCheck,
  BarChart3,
  Wallet,
} from 'lucide-react-native';

const steps = [
  {
    icon: Search,
    title: "Browse Verified Products",
    desc: "Explore quality poultry supplies listed only by approved sellers with transparent pricing.",
  },
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    desc: "Choose product type, weight range and quantity in a simple checkout flow.",
  },
  {
    icon: Upload,
    title: "Upload Payment Proof",
    desc: "Submit receipt or screenshot to instantly notify the seller.",
  },
  {
    icon: CheckCircle,
    title: "Order Confirmation",
    desc: "Seller verifies payment and confirms dispatch preparation.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Track delivery and Collect your products securely.",
  },
];

export const HowItWorks = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cardWidth = isTablet ? '31%' : '48%';

  return (
    <SafeAreaView className="flex-1 bg-muted/20">
      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View className="relative h-96 overflow-hidden">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />
          <View className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#f5b82e]/20 rounded-full blur-3xl" />

          <View className="absolute inset-0 justify-center px-6">
            <Badge className="mb-4 bg-[#f5b82e] self-start">
              How It Works
            </Badge>
            <Text className="text-4xl font-bold text-white leading-tight">
              Simple. Secure. Transparent{'\n'}Poultry Trading
            </Text>
            <Text className="mt-3 text-white/80 max-w-2xl text-base">
              Hindustan Proteins connects farmers, sellers, and buyers on one trusted
              digital marketplace for efficient poultry supply management.
            </Text>
          </View>
        </View>

        {/* PROCESS FLOW */}
        <View className="px-4 py-16">
          <Text className="text-3xl font-bold text-center mb-10 text-foreground">
            Your Order Journey
          </Text>

          <View className="flex-row flex-wrap gap-4 justify-center">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={i} style={{ width: cardWidth }} className="rounded-3xl">
                  <Card.Content className="p-6 items-center">
                    <View className="w-16 h-16 bg-[#f5b82e]/20 rounded-2xl items-center justify-center mb-4">
                      <Icon size={28} color="#1f4d36" />
                    </View>
                    <Text className="font-semibold text-base text-center mb-2">
                      {step.title}
                    </Text>
                    <Text className="text-muted-foreground text-xs text-center leading-relaxed">
                      {step.desc}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        </View>

        {/* ROLE VALUE - Horizontal Scroll for better mobile experience */}
        <View className="px-4 pb-16">
          <Text className="text-3xl font-bold text-center mb-10 text-foreground">
            Built For Every Participant
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {/* Sellers Card */}
            <Card className="w-72 rounded-3xl mr-4">
              <Card.Content className="p-8 items-center">
                <Store size={36} color="#2B6B3F" />
                <Text className="font-semibold text-xl mt-4 mb-2">Sellers</Text>
                <Text className="text-sm text-muted-foreground text-center">
                  List products, manage orders, approve payments, and grow your
                  poultry business digitally.
                </Text>
              </Card.Content>
            </Card>

            {/* Farmers Card */}
            <Card className="w-72 rounded-3xl mr-4">
              <Card.Content className="p-8 items-center">
                <Leaf size={36} color="#2B6B3F" />
                <Text className="font-semibold text-xl mt-4 mb-2">Farmers</Text>
                <Text className="text-sm text-muted-foreground text-center">
                  Access trusted poultry supplies and pricing without middlemen.
                </Text>
              </Card.Content>
            </Card>

            {/* Buyers Card */}
            <Card className="w-72 rounded-3xl">
              <Card.Content className="p-8 items-center">
                <ShoppingCart size={36} color="#2B6B3F" />
                <Text className="font-semibold text-xl mt-4 mb-2">Buyers</Text>
                <Text className="text-sm text-muted-foreground text-center">
                  Purchase confidently from verified sellers with real-time updates.
                </Text>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>

        {/* TRUST + PLATFORM POWER */}
        <View className="bg-white py-16 px-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="space-x-6"
          >
            <View className="w-64 items-center mr-6">
              <ShieldCheck size={40} color="#2B6B3F" />
              <Text className="font-semibold text-lg mt-3 mb-2">Verified Marketplace</Text>
              <Text className="text-sm text-muted-foreground text-center">
                Every seller is vetted to ensure quality, authenticity, and fair pricing.
              </Text>
            </View>

            <View className="w-64 items-center mr-6">
              <Wallet size={40} color="#2B6B3F" />
              <Text className="font-semibold text-lg mt-3 mb-2">Secure Transactions</Text>
              <Text className="text-sm text-muted-foreground text-center">
                Payment proof based system ensures transparency and fraud prevention.
              </Text>
            </View>

            <View className="w-64 items-center">
              <BarChart3 size={40} color="#2B6B3F" />
              <Text className="font-semibold text-lg mt-3 mb-2">Real-Time Tracking</Text>
              <Text className="text-sm text-muted-foreground text-center">
                Track order status from placement to delivery in one dashboard.
              </Text>
            </View>
          </ScrollView>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
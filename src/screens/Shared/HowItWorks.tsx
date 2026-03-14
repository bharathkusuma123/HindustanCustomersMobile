// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   useWindowDimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header } from '../../components/layout/Header';
// import { Footer } from '../../components/layout/Footer';
// import { Card } from '../../components/ui/card';
// import { Badge } from '../../components/ui/badge';
// import {
//   Search,
//   ShoppingCart,
//   Upload,
//   CheckCircle,
//   Truck,
//   Store,
//   Leaf,
//   ShieldCheck,
//   BarChart3,
//   Wallet,
// } from 'lucide-react-native';

// const steps = [
//   {
//     icon: Search,
//     title: "Browse Verified Products",
//     desc: "Explore quality poultry supplies listed only by approved sellers with transparent pricing.",
//   },
//   {
//     icon: ShoppingCart,
//     title: "Place Your Order",
//     desc: "Choose product type, weight range and quantity in a simple checkout flow.",
//   },
//   {
//     icon: Upload,
//     title: "Upload Payment Proof",
//     desc: "Submit receipt or screenshot to instantly notify the seller.",
//   },
//   {
//     icon: CheckCircle,
//     title: "Order Confirmation",
//     desc: "Seller verifies payment and confirms dispatch preparation.",
//   },
//   {
//     icon: Truck,
//     title: "Fast Delivery",
//     desc: "Track delivery and Collect your products securely.",
//   },
// ];

// export const HowItWorks = () => {
//   const { width } = useWindowDimensions();
//   const isTablet = width >= 768;
//   const cardWidth = isTablet ? '31%' : '48%';

//   return (
//     <SafeAreaView className="flex-1 bg-muted/20">
//       <Header />

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* HERO SECTION */}
//         <View className="relative h-96 overflow-hidden">
//           <Image
//             source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
//             className="absolute w-full h-full"
//             resizeMode="cover"
//           />
//           <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />
//           <View className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#f5b82e]/20 rounded-full blur-3xl" />

//           <View className="absolute inset-0 justify-center px-6">
//             <Badge className="mb-4 bg-[#f5b82e] self-start">
//               How It Works
//             </Badge>
//             <Text className="text-4xl font-bold text-white leading-tight">
//               Simple. Secure. Transparent{'\n'}Poultry Trading
//             </Text>
//             <Text className="mt-3 text-white/80 max-w-2xl text-base">
//               Hindustan Proteins connects farmers, sellers, and buyers on one trusted
//               digital marketplace for efficient poultry supply management.
//             </Text>
//           </View>
//         </View>

//         {/* PROCESS FLOW */}
//         <View className="px-4 py-16">
//           <Text className="text-3xl font-bold text-center mb-10 text-foreground">
//             Your Order Journey
//           </Text>

//           <View className="flex-row flex-wrap gap-4 justify-center">
//             {steps.map((step, i) => {
//               const Icon = step.icon;
//               return (
//                 <Card key={i} style={{ width: cardWidth }} className="rounded-3xl">
//                   <Card.Content className="p-6 items-center">
//                     <View className="w-16 h-16 bg-[#f5b82e]/20 rounded-2xl items-center justify-center mb-4">
//                       <Icon size={28} color="#1f4d36" />
//                     </View>
//                     <Text className="font-semibold text-base text-center mb-2">
//                       {step.title}
//                     </Text>
//                     <Text className="text-muted-foreground text-xs text-center leading-relaxed">
//                       {step.desc}
//                     </Text>
//                   </Card.Content>
//                 </Card>
//               );
//             })}
//           </View>
//         </View>

//         {/* ROLE VALUE - Horizontal Scroll for better mobile experience */}
//         <View className="px-4 pb-16">
//           <Text className="text-3xl font-bold text-center mb-10 text-foreground">
//             Built For Every Participant
//           </Text>

//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             className="space-x-4"
//           >
//             {/* Sellers Card */}
//             <Card className="w-72 rounded-3xl mr-4">
//               <Card.Content className="p-8 items-center">
//                 <Store size={36} color="#2B6B3F" />
//                 <Text className="font-semibold text-xl mt-4 mb-2">Sellers</Text>
//                 <Text className="text-sm text-muted-foreground text-center">
//                   List products, manage orders, approve payments, and grow your
//                   poultry business digitally.
//                 </Text>
//               </Card.Content>
//             </Card>

//             {/* Farmers Card */}
//             <Card className="w-72 rounded-3xl mr-4">
//               <Card.Content className="p-8 items-center">
//                 <Leaf size={36} color="#2B6B3F" />
//                 <Text className="font-semibold text-xl mt-4 mb-2">Farmers</Text>
//                 <Text className="text-sm text-muted-foreground text-center">
//                   Access trusted poultry supplies and pricing without middlemen.
//                 </Text>
//               </Card.Content>
//             </Card>

//             {/* Buyers Card */}
//             <Card className="w-72 rounded-3xl">
//               <Card.Content className="p-8 items-center">
//                 <ShoppingCart size={36} color="#2B6B3F" />
//                 <Text className="font-semibold text-xl mt-4 mb-2">Buyers</Text>
//                 <Text className="text-sm text-muted-foreground text-center">
//                   Purchase confidently from verified sellers with real-time updates.
//                 </Text>
//               </Card.Content>
//             </Card>
//           </ScrollView>
//         </View>

//         {/* TRUST + PLATFORM POWER */}
//         <View className="bg-white py-16 px-4">
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             className="space-x-6"
//           >
//             <View className="w-64 items-center mr-6">
//               <ShieldCheck size={40} color="#2B6B3F" />
//               <Text className="font-semibold text-lg mt-3 mb-2">Verified Marketplace</Text>
//               <Text className="text-sm text-muted-foreground text-center">
//                 Every seller is vetted to ensure quality, authenticity, and fair pricing.
//               </Text>
//             </View>

//             <View className="w-64 items-center mr-6">
//               <Wallet size={40} color="#2B6B3F" />
//               <Text className="font-semibold text-lg mt-3 mb-2">Secure Transactions</Text>
//               <Text className="text-sm text-muted-foreground text-center">
//                 Payment proof based system ensures transparency and fraud prevention.
//               </Text>
//             </View>

//             <View className="w-64 items-center">
//               <BarChart3 size={40} color="#2B6B3F" />
//               <Text className="font-semibold text-lg mt-3 mb-2">Real-Time Tracking</Text>
//               <Text className="text-sm text-muted-foreground text-center">
//                 Track order status from placement to delivery in one dashboard.
//               </Text>
//             </View>
//           </ScrollView>
//         </View>

//         <Footer />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };





import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
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
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroBlurCircle} />

          <View style={styles.heroContent}>
            <View style={styles.badgeWrapper}>
              <Badge>How It Works</Badge>
            </View>
            <Text style={styles.heroTitle}>
              Simple. Secure. Transparent{'\n'}Poultry Trading
            </Text>
            <Text style={styles.heroSubtitle}>
              Hindustan Proteins connects farmers, sellers, and buyers on one trusted
              digital marketplace for efficient poultry supply management.
            </Text>
          </View>
        </View>

        {/* PROCESS FLOW */}
        <View style={styles.processSection}>
          <Text style={styles.sectionTitle}>
            Your Order Journey
          </Text>

          <View style={styles.stepsContainer}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <View key={i} style={[styles.stepCard, { width: cardWidth }]}>
                  <View style={styles.stepCardContent}>
                    <View style={styles.iconContainer}>
                      <Icon size={28} color="#1f4d36" />
                    </View>
                    <Text style={styles.stepTitle}>
                      {step.title}
                    </Text>
                    <Text style={styles.stepDescription}>
                      {step.desc}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ROLE VALUE - Horizontal Scroll for better mobile experience */}
        <View style={styles.roleSection}>
          <Text style={styles.sectionTitle}>
            Built For Every Participant
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.roleScrollView}
          >
            {/* Sellers Card */}
            <View style={styles.roleCard}>
              <View style={styles.roleCardContent}>
                <Store size={36} color="#2B6B3F" />
                <Text style={styles.roleTitle}>Sellers</Text>
                <Text style={styles.roleDescription}>
                  List products, manage orders, approve payments, and grow your
                  poultry business digitally.
                </Text>
              </View>
            </View>

            {/* Farmers Card */}
            <View style={styles.roleCard}>
              <View style={styles.roleCardContent}>
                <Leaf size={36} color="#2B6B3F" />
                <Text style={styles.roleTitle}>Farmers</Text>
                <Text style={styles.roleDescription}>
                  Access trusted poultry supplies and pricing without middlemen.
                </Text>
              </View>
            </View>

            {/* Buyers Card */}
            <View style={styles.roleCard}>
              <View style={styles.roleCardContent}>
                <ShoppingCart size={36} color="#2B6B3F" />
                <Text style={styles.roleTitle}>Buyers</Text>
                <Text style={styles.roleDescription}>
                  Purchase confidently from verified sellers with real-time updates.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* TRUST + PLATFORM POWER */}
        <View style={styles.trustSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.trustScrollView}
          >
            <View style={styles.trustItem}>
              <ShieldCheck size={40} color="#2B6B3F" />
              <Text style={styles.trustTitle}>Verified Marketplace</Text>
              <Text style={styles.trustDescription}>
                Every seller is vetted to ensure quality, authenticity, and fair pricing.
              </Text>
            </View>

            <View style={styles.trustItem}>
              <Wallet size={40} color="#2B6B3F" />
              <Text style={styles.trustTitle}>Secure Transactions</Text>
              <Text style={styles.trustDescription}>
                Payment proof based system ensures transparency and fraud prevention.
              </Text>
            </View>

            <View style={styles.trustItem}>
              <BarChart3 size={40} color="#2B6B3F" />
              <Text style={styles.trustTitle}>Real-Time Tracking</Text>
              <Text style={styles.trustDescription}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 384,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1f4d36',
    opacity: 0.9,
  },
  heroBlurCircle: {
    position: 'absolute',
    bottom: -128,
    left: '50%',
    marginLeft: -160,
    width: 320,
    height: 320,
    backgroundColor: 'rgba(245, 184, 46, 0.2)',
    borderRadius: 160,
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  badgeWrapper: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 44,
  },
  heroSubtitle: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.8)',
    maxWidth: 672,
    fontSize: 16,
  },
  processSection: {
    paddingHorizontal: 16,
    paddingVertical: 64,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  stepCardContent: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(245, 184, 46, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepTitle: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  stepDescription: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  roleSection: {
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
  roleScrollView: {
    paddingHorizontal: 4,
  },
  roleCard: {
    width: 288,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  roleCardContent: {
    padding: 32,
    alignItems: 'center',
  },
  roleTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  trustSection: {
    backgroundColor: '#fff',
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
  trustScrollView: {
    paddingHorizontal: 4,
  },
  trustItem: {
    width: 256,
    marginRight: 24,
    alignItems: 'center',
  },
  trustTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  trustDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
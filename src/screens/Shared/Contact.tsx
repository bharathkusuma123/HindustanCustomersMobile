// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header } from '../../components/layout/Header';
// import { Footer } from '../../components/layout/Footer';
// import { Card } from '../../components/ui/card';
// import { Badge } from '../../components/ui/badge';
// import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

// export const Contact = () => {
//   const handleCall = () => {
//     Linking.openURL('tel:+919972763655');
//   };

//   const handleEmail = () => {
//     Linking.openURL('mailto:contact@hindustanproteins.com');
//   };

//   const handleMap = () => {
//     Linking.openURL('https://maps.google.com/?q=Bengaluru+560098');
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-muted/20">
//       <Header />

//       <ScrollView className="flex-1">
//         {/* Hero Section */}
//         <View className="relative h-64 overflow-hidden">
//           <Image
//             source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
//             className="absolute w-full h-full"
//             resizeMode="cover"
//           />
//           <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />
          
//           <View className="absolute inset-0 justify-center px-6">
//             <Badge className="mb-4 bg-[#f5b82e] self-start">Get in Touch</Badge>
//             <Text className="text-4xl font-bold text-white">Contact Us</Text>
//             <Text className="mt-2 text-white/80 text-lg">
//               We're here to help with your poultry trading needs
//             </Text>
//           </View>
//         </View>

//         {/* Contact Cards */}
//         <View className="px-4 py-12">
//           <View className="gap-6">
//             {/* Phone */}
//             <TouchableOpacity onPress={handleCall}>
//               <Card className="rounded-2xl">
//                 <Card.Content className="p-6 flex-row items-center">
//                   <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
//                     <Phone size={24} color="#f5b82e" />
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text className="text-sm text-muted-foreground">Call Us</Text>
//                     <Text className="text-lg font-semibold text-foreground">
//                       +91 9972763655
//                     </Text>
//                     <Text className="text-xs text-muted-foreground mt-1">
//                       Mon-Sat, 9am to 6pm
//                     </Text>
//                   </View>
//                 </Card.Content>
//               </Card>
//             </TouchableOpacity>

//             {/* Email */}
//             <TouchableOpacity onPress={handleEmail}>
//               <Card className="rounded-2xl">
//                 <Card.Content className="p-6 flex-row items-center">
//                   <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
//                     <Mail size={24} color="#f5b82e" />
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text className="text-sm text-muted-foreground">Email Us</Text>
//                     <Text className="text-lg font-semibold text-foreground">
//                       contact@hindustanproteins.com
//                     </Text>
//                     <Text className="text-xs text-muted-foreground mt-1">
//                       We reply within 24 hours
//                     </Text>
//                   </View>
//                 </Card.Content>
//               </Card>
//             </TouchableOpacity>

//             {/* Address */}
//             <TouchableOpacity onPress={handleMap}>
//               <Card className="rounded-2xl">
//                 <Card.Content className="p-6 flex-row items-center">
//                   <View className="w-12 h-12 bg-[#f5b82e]/20 rounded-full items-center justify-center mr-4">
//                     <MapPin size={24} color="#f5b82e" />
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text className="text-sm text-muted-foreground">Visit Us</Text>
//                     <Text className="text-base font-semibold text-foreground">
//                       No. 853, 1st Floor, Bhavani Nilaya,{'\n'}
//                       Near Presidency School,{'\n'}
//                       Banashankari 6th Stage, 1st Block,{'\n'}
//                       Bengaluru – 560098, India
//                     </Text>
//                   </View>
//                 </Card.Content>
//               </Card>
//             </TouchableOpacity>
//           </View>

//           {/* Business Hours */}
//           <Card className="rounded-2xl mt-6">
//             <Card.Content className="p-6">
//               <View className="flex-row items-center mb-4">
//                 <Clock size={20} color="#f5b82e" />
//                 <Text className="text-lg font-semibold ml-2">Business Hours</Text>
//               </View>
              
//               <View className="space-y-2">
//                 <View className="flex-row justify-between">
//                   <Text className="text-muted-foreground">Monday - Friday</Text>
//                   <Text className="font-medium">9:00 AM - 6:00 PM</Text>
//                 </View>
//                 <View className="flex-row justify-between">
//                   <Text className="text-muted-foreground">Saturday</Text>
//                   <Text className="font-medium">9:00 AM - 4:00 PM</Text>
//                 </View>
//                 <View className="flex-row justify-between">
//                   <Text className="text-muted-foreground">Sunday</Text>
//                   <Text className="font-medium">Closed</Text>
//                 </View>
//               </View>
//             </Card.Content>
//           </Card>
//         </View>

//         <Footer />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };




// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Linking,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header } from '../../components/layout/Header';
// import { Footer } from '../../components/layout/Footer';
// import { Card } from '../../components/ui/card';
// import { Badge } from '../../components/ui/badge';
// import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

// export const Contact = () => {
//   const handleCall = () => {
//     Linking.openURL('tel:+919972763655');
//   };

//   const handleEmail = () => {
//     Linking.openURL('mailto:contact@hindustanproteins.com');
//   };

//   const handleMap = () => {
//     Linking.openURL('https://maps.google.com/?q=Bengaluru+560098');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />

//       <ScrollView style={styles.scrollView}>
//         {/* Hero Section */}
//         <View style={styles.heroContainer}>
//           <Image
//             source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
//             style={styles.heroImage}
//             resizeMode="cover"
//           />
//           <View style={styles.heroOverlay} />
          
//           <View style={styles.heroContent}>
//             <View style={styles.badgeWrapper}>
//               <Badge>Get in Touch</Badge>
//             </View>
//             <Text style={styles.heroTitle}>Contact Us</Text>
//             <Text style={styles.heroSubtitle}>
//               We're here to help with your poultry trading needs
//             </Text>
//           </View>
//         </View>

//         {/* Contact Cards */}
//         <View style={styles.contactSection}>
//           <View style={styles.contactCards}>
//             {/* Phone */}
//             <TouchableOpacity onPress={handleCall} style={styles.contactItem}>
//               <View style={styles.contactCard}>
//                 <View style={styles.contactCardContent}>
//                   <View style={styles.iconCircle}>
//                     <Phone size={24} color="#f5b82e" />
//                   </View>
//                   <View style={styles.contactInfo}>
//                     <Text style={styles.contactLabel}>Call Us</Text>
//                     <Text style={styles.contactValue}>
//                       +91 9972763655
//                     </Text>
//                     <Text style={styles.contactHint}>
//                       Mon-Sat, 9am to 6pm
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Email */}
//             <TouchableOpacity onPress={handleEmail} style={styles.contactItem}>
//               <View style={styles.contactCard}>
//                 <View style={styles.contactCardContent}>
//                   <View style={styles.iconCircle}>
//                     <Mail size={24} color="#f5b82e" />
//                   </View>
//                   <View style={styles.contactInfo}>
//                     <Text style={styles.contactLabel}>Email Us</Text>
//                     <Text style={styles.contactValue}>
//                       contact@hindustanproteins.com
//                     </Text>
//                     <Text style={styles.contactHint}>
//                       We reply within 24 hours
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Address */}
//             <TouchableOpacity onPress={handleMap} style={styles.contactItem}>
//               <View style={styles.contactCard}>
//                 <View style={styles.contactCardContent}>
//                   <View style={styles.iconCircle}>
//                     <MapPin size={24} color="#f5b82e" />
//                   </View>
//                   <View style={styles.contactInfo}>
//                     <Text style={styles.contactLabel}>Visit Us</Text>
//                     <Text style={styles.contactAddress}>
//                       No. 853, 1st Floor, Bhavani Nilaya,
//                       Near Presidency School,
//                       Banashankari 6th Stage, 1st Block,
//                       Bengaluru – 560098, India
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>

//           {/* Business Hours */}
//           <View style={styles.hoursCard}>
//             <View style={styles.hoursCardContent}>
//               <View style={styles.hoursHeader}>
//                 <Clock size={20} color="#f5b82e" />
//                 <Text style={styles.hoursTitle}>Business Hours</Text>
//               </View>
              
//               <View style={styles.hoursList}>
//                 <View style={styles.hoursRow}>
//                   <Text style={styles.hoursDay}>Monday - Friday</Text>
//                   <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
//                 </View>
//                 <View style={styles.hoursRow}>
//                   <Text style={styles.hoursDay}>Saturday</Text>
//                   <Text style={styles.hoursTime}>9:00 AM - 4:00 PM</Text>
//                 </View>
//                 <View style={styles.hoursRow}>
//                   <Text style={styles.hoursDay}>Sunday</Text>
//                   <Text style={styles.hoursTime}>Closed</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         <Footer />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   heroContainer: {
//     height: 256,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   heroImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   heroOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1f4d36',
//     opacity: 0.9,
//   },
//   heroContent: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   badgeWrapper: {
//     marginBottom: 16,
//     alignSelf: 'flex-start',
//   },
//   heroTitle: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   heroSubtitle: {
//     marginTop: 8,
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 18,
//   },
//   contactSection: {
//     paddingHorizontal: 16,
//     paddingVertical: 48,
//   },
//   contactCards: {
//     gap: 24,
//   },
//   contactItem: {
//     marginBottom: 4,
//   },
//   contactCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     overflow: 'hidden',
//   },
//   contactCardContent: {
//     padding: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconCircle: {
//     width: 48,
//     height: 48,
//     backgroundColor: 'rgba(245, 184, 46, 0.2)',
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   contactInfo: {
//     flex: 1,
//   },
//   contactLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   contactValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   contactHint: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
//   contactAddress: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     lineHeight: 24,
//   },
//   hoursCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     overflow: 'hidden',
//     marginTop: 24,
//   },
//   hoursCardContent: {
//     padding: 24,
//   },
//   hoursHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   hoursTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#333',
//   },
//   hoursList: {
//     gap: 8,
//   },
//   hoursRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   hoursDay: {
//     color: '#666',
//   },
//   hoursTime: {
//     fontWeight: '500',
//     color: '#333',
//   },
// });





import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Phone, Mail, MapPin, Headphones, Briefcase, HelpCircle, Clock } from 'lucide-react-native';

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert('Error', 'Enter a valid email address');
      return false;
    }

    if (form.message.trim().length < 10) {
      Alert.alert('Error', 'Message should be at least 10 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('https://your-api-base-url.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        Alert.alert('Success', 'Message sent successfully!');
        setForm({ name: '', mobile: '', email: '', message: '' });
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:+919972763655');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@hindustanproteins.com');
  };

  const handleMap = () => {
    Linking.openURL('https://maps.google.com/?q=Bengaluru+560098');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170&auto=format&fit=crop' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.glowEffect} />
          
          <View style={styles.heroContent}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Support Center</Text>
            </View>
            <Text style={styles.heroTitle}>Contact Hindustan Proteins</Text>
            <Text style={styles.heroSubtitle}>
              Get help with orders, partnerships, payments and platform support
            </Text>
          </View>
        </View>

        {/* SUPPORT TYPES */}
        <View style={styles.supportTypesContainer}>
          <View style={styles.supportCard}>
            <View style={styles.supportCardContent}>
              <Headphones color="#f5b82e" size={32} />
              <Text style={styles.supportTitle}>Customer Support</Text>
              <Text style={styles.supportDesc}>Orders, payments & delivery help</Text>
            </View>
          </View>

          <View style={styles.supportCard}>
            <View style={styles.supportCardContent}>
              <Briefcase color="#f5b82e" size={32} />
              <Text style={styles.supportTitle}>Business Enquiry</Text>
              <Text style={styles.supportDesc}>Seller onboarding & partnerships</Text>
            </View>
          </View>

          <View style={styles.supportCard}>
            <View style={styles.supportCardContent}>
              <HelpCircle color="#f5b82e" size={32} />
              <Text style={styles.supportTitle}>General Questions</Text>
              <Text style={styles.supportDesc}>Platform usage guidance</Text>
            </View>
          </View>
        </View>

        {/* FORM + INFO */}
        <View style={styles.formInfoContainer}>
          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send a Message</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={(text) => {
                const value = text.replace(/[^a-zA-Z\s]/g, "");
                setForm({ ...form, name: value });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={10}
              value={form.mobile}
              onChangeText={(text) => {
                const value = text.replace(/\D/g, "");
                setForm({ ...form, mobile: value });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => setForm({...form, email: text})}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="How can we help you?"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={form.message}
              onChangeText={(text) => setForm({...form, message: text})}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info Card */}
          <View style={styles.infoCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1600&q=80' }}
              style={styles.infoBackgroundImage}
            />
            <View style={styles.infoOverlay} />
            <View style={styles.glowEffect} />
            
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Contact Information</Text>

              <TouchableOpacity onPress={handleCall} style={styles.infoRow}>
                <Phone color="#f5b82e" size={24} />
                <Text style={styles.infoText}>+91 9972763655</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEmail} style={styles.infoRow}>
                <Mail color="#f5b82e" size={24} />
                <Text style={styles.infoText}>support@hindustanproteins.com</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleMap} style={[styles.infoRow, styles.infoRowStart]}>
                <MapPin color="#f5b82e" size={24} style={styles.mapIcon} />
                <Text style={[styles.infoText, styles.addressText]}>
                  No. 853, 1st Floor, Bhavani Nilaya,{'\n'}
                  Near Presidency School, Banashankari 6th Stage,{'\n'}
                  1st Block, Bengaluru – 560098, India
                </Text>
              </TouchableOpacity>

              <View style={styles.infoRow}>
                <Clock color="#f5b82e" size={24} />
                <Text style={[styles.infoText, styles.hoursText]}>
                  Working Hours: Monday – Saturday (9AM – 7PM)
                </Text>
              </View>
            </View>
          </View>
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
    height: 280,
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
  glowEffect: {
    position: 'absolute',
    bottom: -80,
    left: '50%',
    transform: [{ translateX: -260 }],
    width: 520,
    height: 520,
    backgroundColor: '#f5b82e',
    opacity: 0.2,
    borderRadius: 260,
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  badgeContainer: {
    backgroundColor: '#f5b82e',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  badgeText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    maxWidth: 300,
  },
  supportTypesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 16,
  },
  supportCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  supportCardContent: {
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  supportDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  formInfoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    gap: 24,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 32,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#f5b82e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 400,
  },
  infoBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  infoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1f4d36',
    opacity: 0.9,
  },
  infoContent: {
    position: 'relative',
    padding: 32,
    gap: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoRowStart: {
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  addressText: {
    lineHeight: 24,
  },
  hoursText: {
    fontSize: 14,
    opacity: 0.7,
  },
  mapIcon: {
    marginTop: 2,
  },
});

export default Contact;
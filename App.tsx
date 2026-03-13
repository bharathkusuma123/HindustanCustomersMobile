import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { View, ActivityIndicator, LogBox, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Import Screens
// import { Index } from './src/screens/Index';
import { Products } from './src/screens/Shared/Products';
import { Login } from './src/screens/AuthScreens/Login';
import { Register } from './src/screens/AuthScreens/Register';
import { VerifyOtp } from './src/screens/AuthScreens/VerifyOtp';
import { ForgotPassword } from './src/screens/AuthScreens/ForgotPassword';
import { ResetPassword } from './src/screens/AuthScreens/ResetPassword';
import { Profile } from './src/screens/Shared/Profile';
import { HowItWorks } from './src/screens/Shared/HowItWorks';
import { Contact } from './src/screens/Shared/Contact';
import { NotFound } from './src/screens/NotFound';

// Buyer Screens
import { BuyerDashboard } from './src/screens/BuyerScreens/BuyerDashboard';
import { CreateOrder } from './src/screens/BuyerScreens/CreateOrder';
import { OrderDetails } from './src/screens/BuyerScreens/OrderDetails';

// Seller Screens
import { SellerDashboard } from './src/screens/SellerScreens/SellerDashboard';
import { AddProduct } from './src/screens/SellerScreens/AddProduct';
import { SellerOrderDetails } from './src/screens/SellerScreens/SellerOrderDetails';

// Import global styles
import './src/styles/global.css';

// Ignore specific warnings (optional)
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

// Loading screen while fonts load
const LoadingScreen = () => (
  <View className="flex-1 justify-center items-center bg-background">
    <ActivityIndicator size="large" color="#2B6B3F" />
    <Text className="mt-4 text-muted-foreground">Loading Hindustan Proteins...</Text>
  </View>
);

// Main Navigator with role-based routing
const AppNavigator = () => {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#faf7f2' }, // background color from your CSS
        animation: 'slide_from_right',
      }}
    >
      {!user ? (
        // Public Routes (Not Logged In)
        <>
          {/* <Stack.Screen name="Index" component={Index} /> */}
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      ) : userRole === 'BUYER' ? (
        // Protected Buyer Routes
        <>
          <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} />
          <Stack.Screen name="Contact" component={Contact} />
          {/* <Stack.Screen name="Index" component={Index} /> */}
        </>
      ) : (
        // Protected Seller/Farmer Routes
        <>
          <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="SellerOrderDetails" component={SellerOrderDetails} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} />
          <Stack.Screen name="Contact" component={Contact} />
          {/* <Stack.Screen name="Index" component={Index} /> */}
        </>
      )}
      
      {/* Catch-all 404 - Always available */}
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'PlusJakartaSans-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
          'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
          'PlusJakartaSans-SemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
          'PlusJakartaSans-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
          'PlusJakartaSans-ExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Still set loaded to true even if fonts fail (use system fonts as fallback)
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

// Import your screens (we'll create these)
import Index from '../screens/Index';
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';
import VerifyOtp from '../screens/AuthScreens/VerifyOtp';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import ResetPassword from '../screens/AuthScreens/ResetPassword';
import Products from '../screens/Shared/Products';
import Profile from '../screens/Shared/Profile';
import HowItWorks from '../screens/Shared/HowItWorks';
import Contact from '../screens/Shared/Contact';
import NotFound from '../screens/NotFound';

// Buyer Screens
import BuyerDashboard from '../screens/BuyerScreens/BuyerDashboard';
import CreateOrder from '../screens/BuyerScreens/CreateOrder';
import OrderDetails from '../screens/BuyerScreens/OrderDetails';

// Seller Screens
import SellerDashboard from '../screens/SellerScreens/SellerDashboard';
import AddProduct from '../screens/SellerScreens/AddProduct';
import SellerOrderDetails from '../screens/SellerScreens/SellerOrderDetails';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2B6B3F" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'hsl(45, 30%, 98%)' },
      }}
    >
      {!user ? (
        // Public Routes (Not Logged In)
        <>
          <Stack.Screen name="Index" component={Index} />
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
        </>
      )}
      
      {/* Catch-all 404 - Always available */}
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./src/context/AuthContext";

// Auth Screens
import { Login } from "./src/screens/AuthScreens/Login";
import { Register } from "./src/screens/AuthScreens/Register";
import { VerifyOtp } from "./src/screens/AuthScreens/VerifyOtp";
import { ForgotPassword } from "./src/screens/AuthScreens/ForgotPassword";
import { ResetPassword } from "./src/screens/AuthScreens/ResetPassword";

// Shared Screens
import { Profile } from "./src/screens/Shared/Profile";
import { NotFound } from "./src/screens/NotFound";

// Buyer Screens
import { BuyerDashboard } from "./src/screens/BuyerScreens/BuyerDashboard";
import { CreateOrder } from "./src/screens/BuyerScreens/CreateOrder";
import { OrderDetails } from "./src/screens/BuyerScreens/OrderDetails";

// Seller Screens
import { SellerDashboard } from "./src/screens/SellerScreens/SellerDashboard";
import { AddProduct } from "./src/screens/SellerScreens/AddProduct";
import { SellerOrderDetails } from "./src/screens/SellerScreens/SellerOrderDetails";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="auto" />

              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >

                {/* Public Screens */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />

                {/* Profile */}
                <Stack.Screen name="Profile" component={Profile} />

                {/* Buyer Screens */}
                <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
                <Stack.Screen name="CreateOrder" component={CreateOrder} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />

                {/* Seller Screens */}
                <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
                <Stack.Screen name="AddProduct" component={AddProduct} />
                <Stack.Screen name="SellerOrderDetails" component={SellerOrderDetails} />

                {/* 404 */}
                <Stack.Screen name="NotFound" component={NotFound} />

              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
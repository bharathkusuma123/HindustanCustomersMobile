import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Package, Info, Phone, User, LayoutDashboard } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

// Import screens
import { Products } from '@/screens/Shared/Products';
import { HowItWorks } from '@/screens/Shared/HowItWorks';
import { Contact } from '@/screens/Shared/Contact';
import { Profile } from '@/screens/Shared/Profile';

// Buyer Screens
import { BuyerDashboard } from '@/screens/BuyerScreens/BuyerDashboard';
import { CreateOrder } from '@/screens/BuyerScreens/CreateOrder';

// Seller Screens
import { SellerDashboard } from '@/screens/SellerScreens/SellerDashboard';
import { AddProduct } from '@/screens/SellerScreens/AddProduct';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2B6B3F',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          
          if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Products') {
            IconComponent = Package;
          } else if (route.name === 'HowItWorks') {
            IconComponent = Info;
          } else if (route.name === 'Contact') {
            IconComponent = Phone;
          } else if (route.name === 'Profile') {
            IconComponent = User;
          } else if (route.name === 'Dashboard') {
            IconComponent = LayoutDashboard;
          } else if (route.name === 'CreateOrder') {
            IconComponent = Package;
          } else if (route.name === 'AddProduct') {
            IconComponent = Package;
          }

          return IconComponent ? <IconComponent size={size} color={color} /> : null;
        },
      })}
    >
      {/* Home Tab - Always visible */}
      <Tab.Screen 
        name="Home" 
        component={Products} 
        options={{ 
          title: 'Home',
        }}
      />

      {/* Products Tab - Always visible */}
      <Tab.Screen 
        name="Products" 
        component={Products} 
        options={{ 
          title: 'Products',
        }}
      />

      {/* How It Works Tab - Always visible */}
      <Tab.Screen 
        name="HowItWorks" 
        component={HowItWorks} 
        options={{ 
          title: 'How It Works',
        }}
      />

      {/* Contact Tab - Always visible */}
      <Tab.Screen 
        name="Contact" 
        component={Contact} 
        options={{ 
          title: 'Contact',
        }}
      />

      {/* Conditional Tabs based on authentication and role */}
      {isAuthenticated ? (
        // Show Dashboard for authenticated users
        <>
          <Tab.Screen 
            name="Dashboard" 
            component={userRole === 'BUYER' ? BuyerDashboard : SellerDashboard}
            options={{ 
              title: 'Dashboard',
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{ 
              title: 'Profile',
            }}
          />
          
          {/* Role-specific action tabs */}
          {userRole === 'BUYER' && (
            <Tab.Screen 
              name="CreateOrder" 
              component={CreateOrder} 
              options={{ 
                title: 'New Order',
              }}
            />
          )}
          
          {userRole === 'SELLER' && (
            <Tab.Screen 
              name="AddProduct" 
              component={AddProduct} 
              options={{ 
                title: 'Add Product',
              }}
            />
          )}
        </>
      ) : (
        // Show Login/Register option for non-authenticated users
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{ 
            title: 'Sign In',
          }}
        />
      )}
    </Tab.Navigator>
  );
};
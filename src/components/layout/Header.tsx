import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation, usePathname } from 'expo-router';
import { Menu, X, User, LogOut, Bell, ChevronDown } from 'lucide-react-native';
import { API_BASE_URL, SERVER_BASE_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    if (!user) return;

    const loadNotifications = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/notifications/${user.user_id}`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications");
      }
    };

    loadNotifications();
  }, [user]);

  const dashboardPath = 
    user?.role === "SELLER" || user?.role === "FARMER"
      ? "/seller/dashboard"
      : user?.role === "BUYER"
      ? "/buyer/dashboard"
      : "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  const markAsRead = async (id: number) => {
    await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: "PATCH"
    });
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, is_read: 1 } : n
      )
    );
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const NotificationBell = () => (
    <TouchableOpacity
      onPress={() => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
          notifications.forEach(n => {
            if (!n.is_read) markAsRead(n.id);
          });
        }
      }}
      className="relative p-2 rounded-lg"
    >
      <Bell size={20} color="#666" />
      {unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1.5 min-w-[18px] h-[18px] items-center justify-center">
          <Text className="text-white text-xs font-bold">{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} className="bg-background/95 backdrop-blur border-b border-border/50">
      <View className="px-4 h-16 flex-row items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-row items-center gap-2">
          <Image
            source={require('@/assets/Hindustan-logo.png')}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-foreground">
            Hindustan <Text className="text-primary">Proteins</Text>
          </Text>
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <View className="hidden lg:flex-row items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium ${
                isActive(link.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              href={dashboardPath}
              className={`text-sm font-medium ${
                isActive(dashboardPath)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
        </View>

        {/* Right Section */}
        <View className="hidden lg:flex-row items-center gap-4">
          {user && <NotificationBell />}

          {!user ? (
            <View className="flex-row items-center gap-2">
              <Link href="/login" asChild>
                <TouchableOpacity className="px-4 py-2">
                  <Text className="text-foreground">Sign In</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/register" asChild>
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                  <Text className="text-primary-foreground">Register</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : (
            <View className="relative">
              <TouchableOpacity
                onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex-row items-center gap-2 px-3 py-2 rounded-lg"
              >
                <View className="h-8 w-8 rounded-full overflow-hidden bg-muted items-center justify-center">
                  {user?.profile_image ? (
                    <Image
                      source={{ uri: `${SERVER_BASE_URL}/uploads/${user.profile_image}` }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <User size={16} color="#666" />
                  )}
                </View>
                <Text className="text-sm font-medium max-w-[120px]" numberOfLines={1}>
                  {user.proprietor_name || "Account"}
                </Text>
                <View className={`px-2 py-0.5 rounded-full ${
                  user.role === "SELLER"
                    ? "bg-green-100"
                    : user.role === "FARMER"
                    ? "bg-amber-100"
                    : "bg-blue-100"
                }`}>
                  <Text className={`text-[10px] font-semibold ${
                    user.role === "SELLER"
                      ? "text-green-700"
                      : user.role === "FARMER"
                      ? "text-amber-700"
                      : "text-blue-700"
                  }`}>
                    {user.role === "SELLER" ? "Seller" : user.role === "FARMER" ? "FARMER" : "Buyer"}
                  </Text>
                </View>
                <ChevronDown size={16} color="#666" />
              </TouchableOpacity>

              {/* Profile Dropdown Modal */}
              <Modal
                visible={showProfileDropdown}
                transparent
                animationType="fade"
                onRequestClose={() => setShowProfileDropdown(false)}
              >
                <Pressable 
                  className="flex-1"
                  onPress={() => setShowProfileDropdown(false)}
                >
                  <View className="absolute right-4 top-16 w-48 bg-card rounded-xl border border-border shadow-soft">
                    <Link href="/profile" asChild>
                      <TouchableOpacity 
                        className="flex-row items-center gap-2 px-4 py-3"
                        onPress={() => setShowProfileDropdown(false)}
                      >
                        <User size={16} color="#666" />
                        <Text className="text-sm">Profile</Text>
                      </TouchableOpacity>
                    </Link>
                    <TouchableOpacity
                      onPress={handleLogout}
                      className="flex-row items-center gap-2 px-4 py-3"
                    >
                      <LogOut size={16} color="#dc2626" />
                      <Text className="text-sm text-red-600">Logout</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </Modal>
            </View>
          )}
        </View>

        {/* Mobile Menu Button */}
        <TouchableOpacity
          className="lg:hidden p-2"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
        </TouchableOpacity>
      </View>

      {/* Mobile Menu Modal */}
      <Modal
        visible={isMenuOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-row justify-end p-4">
            <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView className="px-4">
            {user && (
              <>
                <View className="pb-4 border-b border-border">
                  <Text className="font-semibold text-lg">{user.proprietor_name}</Text>
                  <Text className="text-xs text-muted-foreground capitalize">
                    {user.role?.toLowerCase()}
                  </Text>
                </View>

                {/* Mobile Notifications */}
                <View className="py-3 border-b border-border">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium">Notifications</Text>
                    <NotificationBell />
                  </View>
                </View>
              </>
            )}

            {/* Navigation Links */}
            <View className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="py-3 text-base text-muted-foreground"
                  onPress={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    href={dashboardPath}
                    className="py-3 text-base font-medium"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="py-3 text-base text-muted-foreground"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}

              {/* Auth Buttons */}
              {user ? (
                <TouchableOpacity
                  onPress={handleLogout}
                  className="py-3"
                >
                  <Text className="text-base text-red-600">Logout</Text>
                </TouchableOpacity>
              ) : (
                <View className="gap-2 pt-4">
                  <Link href="/login" asChild>
                    <TouchableOpacity 
                      className="border border-border rounded-lg py-3 items-center"
                      onPress={() => setIsMenuOpen(false)}
                    >
                      <Text className="text-foreground">Login</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/register" asChild>
                    <TouchableOpacity 
                      className="bg-primary rounded-lg py-3 items-center"
                      onPress={() => setIsMenuOpen(false)}
                    >
                      <Text className="text-primary-foreground">Register</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <Pressable 
          className="flex-1"
          onPress={() => setShowNotifications(false)}
        >
          <View className="absolute right-4 top-16 w-80 bg-card rounded-xl border border-border shadow-soft">
            <View className="px-4 py-2 border-b border-border">
              <Text className="font-semibold">Notifications</Text>
            </View>
            <ScrollView className="max-h-80">
              {notifications.length === 0 ? (
                <Text className="p-4 text-sm text-muted-foreground">
                  No notifications yet
                </Text>
              ) : (
                notifications.map(n => (
                  <View
                    key={n.id}
                    className={`px-4 py-3 border-b border-border ${
                      n.is_read ? "bg-background" : "bg-muted/40"
                    }`}
                  >
                    <View className="flex-row justify-between items-start">
                      <Text className="font-medium">{n.title}</Text>
                      <Text className="text-xs text-muted-foreground">
                        {formatDate(n.created_at)}
                      </Text>
                    </View>
                    <Text className="text-muted-foreground mt-1 text-sm">
                      {n.message}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Modal,
//   ScrollView,
//   Pressable,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link, useNavigation, usePathname } from 'expo-router';
// import { Menu, X, User, LogOut, Bell, ChevronDown } from 'lucide-react-native';
// import { API_BASE_URL, SERVER_BASE_URL } from '@/config/api';
// import { useAuth } from '@/context/AuthContext';
// import { formatDate } from '@/lib/utils';

// export const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   const unreadCount = notifications.filter(n => !n.is_read).length;

//   useEffect(() => {
//     if (!user) return;

//     const loadNotifications = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/notifications/${user.user_id}`);
//         const data = await res.json();
//         setNotifications(data);
//       } catch (err) {
//         console.error("Failed to load notifications");
//       }
//     };

//     loadNotifications();
//   }, [user]);

//   const dashboardPath = 
//     user?.role === "SELLER" || user?.role === "FARMER"
//       ? "/seller/dashboard"
//       : user?.role === "BUYER"
//       ? "/buyer/dashboard"
//       : "/";

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "How It Works", path: "/how-it-works" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isActive = (path: string) => pathname === path;

//   const markAsRead = async (id: number) => {
//     await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
//       method: "PATCH"
//     });
//     setNotifications(prev =>
//       prev.map(n =>
//         n.id === id ? { ...n, is_read: 1 } : n
//       )
//     );
//   };

//   const handleLogout = async () => {
//     await logout();
//     setIsMenuOpen(false);
//   };

//   const NotificationBell = () => (
//     <TouchableOpacity
//       onPress={() => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//           notifications.forEach(n => {
//             if (!n.is_read) markAsRead(n.id);
//           });
//         }
//       }}
//       className="relative p-2 rounded-lg"
//     >
//       <Bell size={20} color="#666" />
//       {unreadCount > 0 && (
//         <View className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1.5 min-w-[18px] h-[18px] items-center justify-center">
//           <Text className="text-white text-xs font-bold">{unreadCount}</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView edges={['top']} className="bg-background/95 backdrop-blur border-b border-border/50">
//       <View className="px-4 h-16 flex-row items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex-row items-center gap-2">
//           <Image
//             source={require('../../../assets/Hindustan-logo.png')}
//             className="w-12 h-12"
//             resizeMode="contain"
//           />
//           <Text className="text-xl font-bold text-foreground">
//             Hindustan <Text className="text-primary">Proteins</Text>
//           </Text>
//         </Link>

//         {/* Desktop Navigation (hidden on mobile) */}
//         <View className="hidden lg:flex-row items-center gap-10">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.path}
//               className={`text-sm font-medium ${
//                 isActive(link.path)
//                   ? "text-primary"
//                   : "text-muted-foreground"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {user && (
//             <Link
//               href={dashboardPath}
//               className={`text-sm font-medium ${
//                 isActive(dashboardPath)
//                   ? "text-primary"
//                   : "text-muted-foreground"
//               }`}
//             >
//               Dashboard
//             </Link>
//           )}
//         </View>

//         {/* Right Section */}
//         <View className="hidden lg:flex-row items-center gap-4">
//           {user && <NotificationBell />}

//           {!user ? (
//             <View className="flex-row items-center gap-2">
//               <Link href="/login" asChild>
//                 <TouchableOpacity className="px-4 py-2">
//                   <Text className="text-foreground">Sign In</Text>
//                 </TouchableOpacity>
//               </Link>
//               <Link href="/register" asChild>
//                 <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
//                   <Text className="text-primary-foreground">Register</Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
//           ) : (
//             <View className="relative">
//               <TouchableOpacity
//                 onPress={() => setShowProfileDropdown(!showProfileDropdown)}
//                 className="flex-row items-center gap-2 px-3 py-2 rounded-lg"
//               >
//                 <View className="h-8 w-8 rounded-full overflow-hidden bg-muted items-center justify-center">
//                   {user?.profile_image ? (
//                     <Image
//                       source={{ uri: `${SERVER_BASE_URL}/uploads/${user.profile_image}` }}
//                       className="h-full w-full"
//                       resizeMode="cover"
//                     />
//                   ) : (
//                     <User size={16} color="#666" />
//                   )}
//                 </View>
//                 <Text className="text-sm font-medium max-w-[120px]" numberOfLines={1}>
//                   {user.proprietor_name || "Account"}
//                 </Text>
//                 <View className={`px-2 py-0.5 rounded-full ${
//                   user.role === "SELLER"
//                     ? "bg-green-100"
//                     : user.role === "FARMER"
//                     ? "bg-amber-100"
//                     : "bg-blue-100"
//                 }`}>
//                   <Text className={`text-[10px] font-semibold ${
//                     user.role === "SELLER"
//                       ? "text-green-700"
//                       : user.role === "FARMER"
//                       ? "text-amber-700"
//                       : "text-blue-700"
//                   }`}>
//                     {user.role === "SELLER" ? "Seller" : user.role === "FARMER" ? "FARMER" : "Buyer"}
//                   </Text>
//                 </View>
//                 <ChevronDown size={16} color="#666" />
//               </TouchableOpacity>

//               {/* Profile Dropdown Modal */}
//               <Modal
//                 visible={showProfileDropdown}
//                 transparent
//                 animationType="fade"
//                 onRequestClose={() => setShowProfileDropdown(false)}
//               >
//                 <Pressable 
//                   className="flex-1"
//                   onPress={() => setShowProfileDropdown(false)}
//                 >
//                   <View className="absolute right-4 top-16 w-48 bg-card rounded-xl border border-border shadow-soft">
//                     <Link href="/profile" asChild>
//                       <TouchableOpacity 
//                         className="flex-row items-center gap-2 px-4 py-3"
//                         onPress={() => setShowProfileDropdown(false)}
//                       >
//                         <User size={16} color="#666" />
//                         <Text className="text-sm">Profile</Text>
//                       </TouchableOpacity>
//                     </Link>
//                     <TouchableOpacity
//                       onPress={handleLogout}
//                       className="flex-row items-center gap-2 px-4 py-3"
//                     >
//                       <LogOut size={16} color="#dc2626" />
//                       <Text className="text-sm text-red-600">Logout</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </Pressable>
//               </Modal>
//             </View>
//           )}
//         </View>

//         {/* Mobile Menu Button */}
//         <TouchableOpacity
//           className="lg:hidden p-2"
//           onPress={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
//         </TouchableOpacity>
//       </View>

//       {/* Mobile Menu Modal */}
//       <Modal
//         visible={isMenuOpen}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setIsMenuOpen(false)}
//       >
//         <SafeAreaView className="flex-1 bg-background">
//           <View className="flex-row justify-end p-4">
//             <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
//               <X size={24} color="#000" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView className="px-4">
//             {user && (
//               <>
//                 <View className="pb-4 border-b border-border">
//                   <Text className="font-semibold text-lg">{user.proprietor_name}</Text>
//                   <Text className="text-xs text-muted-foreground capitalize">
//                     {user.role?.toLowerCase()}
//                   </Text>
//                 </View>

//                 {/* Mobile Notifications */}
//                 <View className="py-3 border-b border-border">
//                   <View className="flex-row items-center justify-between">
//                     <Text className="font-medium">Notifications</Text>
//                     <NotificationBell />
//                   </View>
//                 </View>
//               </>
//             )}

//             {/* Navigation Links */}
//             <View className="py-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.path}
//                   className="py-3 text-base text-muted-foreground"
//                   onPress={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               {user && (
//                 <>
//                   <Link
//                     href={dashboardPath}
//                     className="py-3 text-base font-medium"
//                     onPress={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     href="/profile"
//                     className="py-3 text-base text-muted-foreground"
//                     onPress={() => setIsMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                 </>
//               )}

//               {/* Auth Buttons */}
//               {user ? (
//                 <TouchableOpacity
//                   onPress={handleLogout}
//                   className="py-3"
//                 >
//                   <Text className="text-base text-red-600">Logout</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View className="gap-2 pt-4">
//                   <Link href="/login" asChild>
//                     <TouchableOpacity 
//                       className="border border-border rounded-lg py-3 items-center"
//                       onPress={() => setIsMenuOpen(false)}
//                     >
//                       <Text className="text-foreground">Login</Text>
//                     </TouchableOpacity>
//                   </Link>
//                   <Link href="/register" asChild>
//                     <TouchableOpacity 
//                       className="bg-primary rounded-lg py-3 items-center"
//                       onPress={() => setIsMenuOpen(false)}
//                     >
//                       <Text className="text-primary-foreground">Register</Text>
//                     </TouchableOpacity>
//                   </Link>
//                 </View>
//               )}
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Modal>

//       {/* Notifications Modal */}
//       <Modal
//         visible={showNotifications}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowNotifications(false)}
//       >
//         <Pressable 
//           className="flex-1"
//           onPress={() => setShowNotifications(false)}
//         >
//           <View className="absolute right-4 top-16 w-80 bg-card rounded-xl border border-border shadow-soft">
//             <View className="px-4 py-2 border-b border-border">
//               <Text className="font-semibold">Notifications</Text>
//             </View>
//             <ScrollView className="max-h-80">
//               {notifications.length === 0 ? (
//                 <Text className="p-4 text-sm text-muted-foreground">
//                   No notifications yet
//                 </Text>
//               ) : (
//                 notifications.map(n => (
//                   <View
//                     key={n.id}
//                     className={`px-4 py-3 border-b border-border ${
//                       n.is_read ? "bg-background" : "bg-muted/40"
//                     }`}
//                   >
//                     <View className="flex-row justify-between items-start">
//                       <Text className="font-medium">{n.title}</Text>
//                       <Text className="text-xs text-muted-foreground">
//                         {formatDate(n.created_at)}
//                       </Text>
//                     </View>
//                     <Text className="text-muted-foreground mt-1 text-sm">
//                       {n.message}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </ScrollView>
//           </View>
//         </Pressable>
//       </Modal>
//     </SafeAreaView>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Modal,
//   ScrollView,
//   Pressable,
//   Linking,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link, useNavigation, usePathname } from 'expo-router';
// import { Menu, X, User, LogOut, Bell, ChevronDown } from 'lucide-react-native';
// import { API_BASE_URL, SERVER_BASE_URL } from '@/config/api';
// import { useAuth } from '@/context/AuthContext';
// import { formatDate } from '@/lib/utils';

// export const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   const unreadCount = notifications.filter(n => !n.is_read).length;

//   useEffect(() => {
//     if (!user) return;

//     const loadNotifications = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/notifications/${user.user_id}`);
//         const data = await res.json();
//         setNotifications(data);
//       } catch (err) {
//         console.error("Failed to load notifications");
//       }
//     };

//     loadNotifications();
//   }, [user]);

//   const dashboardPath = 
//     user?.role === "SELLER" || user?.role === "FARMER"
//       ? "/seller/dashboard"
//       : user?.role === "BUYER"
//       ? "/buyer/dashboard"
//       : "/";

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "How It Works", path: "/how-it-works" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isActive = (path: string) => pathname === path;

//   const markAsRead = async (id: number) => {
//     await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
//       method: "PATCH"
//     });
//     setNotifications(prev =>
//       prev.map(n =>
//         n.id === id ? { ...n, is_read: 1 } : n
//       )
//     );
//   };

//   const handleLogout = async () => {
//     await logout();
//     setIsMenuOpen(false);
//   };

//   const getRoleBadgeStyle = () => {
//     switch(user?.role) {
//       case "SELLER":
//         return { backgroundColor: '#dcfce7', color: '#15803d' };
//       case "FARMER":
//         return { backgroundColor: '#fef3c7', color: '#b45309' };
//       default:
//         return { backgroundColor: '#dbeafe', color: '#1d4ed8' };
//     }
//   };

//   const NotificationBell = () => (
//     <TouchableOpacity
//       onPress={() => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//           notifications.forEach(n => {
//             if (!n.is_read) markAsRead(n.id);
//           });
//         }
//       }}
//       style={styles.notificationBell}
//     >
//       <Bell size={20} color="#666" />
//       {unreadCount > 0 && (
//         <View style={styles.notificationBadge}>
//           <Text style={styles.notificationCount}>{unreadCount}</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView edges={['top']} style={styles.headerContainer}>
//       <View style={styles.headerContent}>
//         {/* Logo */}
//         <Link href="/" style={styles.logoLink}>
//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../../../assets/Hindustan-logo.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//             <Text style={styles.logoText}>
//               Hindustan <Text style={styles.logoHighlight}>Proteins</Text>
//             </Text>
//           </View>
//         </Link>

//         {/* Desktop Navigation (hidden on mobile) */}
//         <View style={styles.desktopNav}>
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.path}
//               style={[
//                 styles.navLink,
//                 isActive(link.path) && styles.navLinkActive
//               ]}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {user && (
//             <Link
//               href={dashboardPath}
//               style={[
//                 styles.navLink,
//                 isActive(dashboardPath) && styles.navLinkActive
//               ]}
//             >
//               Dashboard
//             </Link>
//           )}
//         </View>

//         {/* Right Section */}
//         <View style={styles.rightSection}>
//           {user && <NotificationBell />}

//           {!user ? (
//             <View style={styles.authButtons}>
//               <Link href="/login" asChild>
//                 <TouchableOpacity style={styles.loginButton}>
//                   <Text style={styles.loginButtonText}>Sign In</Text>
//                 </TouchableOpacity>
//               </Link>
//               <Link href="/register" asChild>
//                 <TouchableOpacity style={styles.registerButton}>
//                   <Text style={styles.registerButtonText}>Register</Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
//           ) : (
//             <View style={styles.profileContainer}>
//               <TouchableOpacity
//                 onPress={() => setShowProfileDropdown(!showProfileDropdown)}
//                 style={styles.profileButton}
//               >
//                 <View style={styles.avatar}>
//                   {user?.profile_image ? (
//                     <Image
//                       source={{ uri: `${SERVER_BASE_URL}/uploads/${user.profile_image}` }}
//                       style={styles.avatarImage}
//                       resizeMode="cover"
//                     />
//                   ) : (
//                     <User size={16} color="#666" />
//                   )}
//                 </View>
//                 <Text style={styles.userName} numberOfLines={1}>
//                   {user.proprietor_name || "Account"}
//                 </Text>
//                 <View style={[
//                   styles.roleBadge,
//                   { backgroundColor: getRoleBadgeStyle().backgroundColor }
//                 ]}>
//                   <Text style={[
//                     styles.roleBadgeText,
//                     { color: getRoleBadgeStyle().color }
//                   ]}>
//                     {user.role === "SELLER" ? "Seller" : user.role === "FARMER" ? "FARMER" : "Buyer"}
//                   </Text>
//                 </View>
//                 <ChevronDown size={16} color="#666" />
//               </TouchableOpacity>

//               {/* Profile Dropdown Modal */}
//               <Modal
//                 visible={showProfileDropdown}
//                 transparent
//                 animationType="fade"
//                 onRequestClose={() => setShowProfileDropdown(false)}
//               >
//                 <Pressable 
//                   style={styles.modalOverlay}
//                   onPress={() => setShowProfileDropdown(false)}
//                 >
//                   <View style={styles.dropdownMenu}>
//                     <Link href="/profile" asChild>
//                       <TouchableOpacity 
//                         style={styles.dropdownItem}
//                         onPress={() => setShowProfileDropdown(false)}
//                       >
//                         <User size={16} color="#666" />
//                         <Text style={styles.dropdownItemText}>Profile</Text>
//                       </TouchableOpacity>
//                     </Link>
//                     <TouchableOpacity
//                       onPress={handleLogout}
//                       style={styles.dropdownItem}
//                     >
//                       <LogOut size={16} color="#dc2626" />
//                       <Text style={styles.logoutText}>Logout</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </Pressable>
//               </Modal>
//             </View>
//           )}
//         </View>

//         {/* Mobile Menu Button */}
//         <TouchableOpacity
//           style={styles.menuButton}
//           onPress={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
//         </TouchableOpacity>
//       </View>

//       {/* Mobile Menu Modal */}
//       <Modal
//         visible={isMenuOpen}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setIsMenuOpen(false)}
//       >
//         <SafeAreaView style={styles.mobileMenuContainer}>
//           <View style={styles.mobileMenuHeader}>
//             <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
//               <X size={24} color="#000" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.mobileMenuContent}>
//             {user && (
//               <>
//                 <View style={styles.mobileUserInfo}>
//                   <Text style={styles.mobileUserName}>{user.proprietor_name}</Text>
//                   <Text style={styles.mobileUserRole}>
//                     {user.role?.toLowerCase()}
//                   </Text>
//                 </View>

//                 {/* Mobile Notifications */}
//                 <View style={styles.mobileNotifications}>
//                   <View style={styles.mobileNotificationsHeader}>
//                     <Text style={styles.mobileNotificationsTitle}>Notifications</Text>
//                     <NotificationBell />
//                   </View>
//                 </View>
//               </>
//             )}

//             {/* Navigation Links */}
//             <View style={styles.mobileNav}>
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.path}
//                   style={styles.mobileNavLink}
//                   onPress={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               {user && (
//                 <>
//                   <Link
//                     href={dashboardPath}
//                     style={styles.mobileNavLink}
//                     onPress={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     href="/profile"
//                     style={styles.mobileNavLink}
//                     onPress={() => setIsMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                 </>
//               )}

//               {/* Auth Buttons */}
//               {user ? (
//                 <TouchableOpacity
//                   onPress={handleLogout}
//                   style={styles.mobileLogoutButton}
//                 >
//                   <Text style={styles.mobileLogoutText}>Logout</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.mobileAuthButtons}>
//                   <Link href="/login" asChild>
//                     <TouchableOpacity 
//                       style={styles.mobileLoginButton}
//                       onPress={() => setIsMenuOpen(false)}
//                     >
//                       <Text style={styles.mobileLoginButtonText}>Login</Text>
//                     </TouchableOpacity>
//                   </Link>
//                   <Link href="/register" asChild>
//                     <TouchableOpacity 
//                       style={styles.mobileRegisterButton}
//                       onPress={() => setIsMenuOpen(false)}
//                     >
//                       <Text style={styles.mobileRegisterButtonText}>Register</Text>
//                     </TouchableOpacity>
//                   </Link>
//                 </View>
//               )}
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Modal>

//       {/* Notifications Modal */}
//       <Modal
//         visible={showNotifications}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowNotifications(false)}
//       >
//         <Pressable 
//           style={styles.modalOverlay}
//           onPress={() => setShowNotifications(false)}
//         >
//           <View style={styles.notificationsMenu}>
//             <View style={styles.notificationsHeader}>
//               <Text style={styles.notificationsTitle}>Notifications</Text>
//             </View>
//             <ScrollView style={styles.notificationsList}>
//               {notifications.length === 0 ? (
//                 <Text style={styles.emptyNotifications}>
//                   No notifications yet
//                 </Text>
//               ) : (
//                 notifications.map(n => (
//                   <View
//                     key={n.id}
//                     style={[
//                       styles.notificationItem,
//                       n.is_read ? styles.notificationRead : styles.notificationUnread
//                     ]}
//                   >
//                     <View style={styles.notificationItemHeader}>
//                       <Text style={styles.notificationItemTitle}>{n.title}</Text>
//                       <Text style={styles.notificationItemDate}>
//                         {formatDate(n.created_at)}
//                       </Text>
//                     </View>
//                     <Text style={styles.notificationItemMessage}>
//                       {n.message}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </ScrollView>
//           </View>
//         </Pressable>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(224,224,224,0.5)',
//   },
//   headerContent: {
//     paddingHorizontal: 16,
//     height: 64,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   logoLink: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   logoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   logo: {
//     width: 48,
//     height: 48,
//   },
//   logoText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   logoHighlight: {
//     color: '#2B6B3F',
//   },
//   desktopNav: {
//     display: 'none',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 40,
//   },
//   navLink: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#666',
//   },
//   navLinkActive: {
//     color: '#2B6B3F',
//   },
//   rightSection: {
//     display: 'none',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   authButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   loginButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   loginButtonText: {
//     color: '#333',
//   },
//   registerButton: {
//     backgroundColor: '#2B6B3F',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   registerButtonText: {
//     color: '#fff',
//   },
//   profileContainer: {
//     position: 'relative',
//   },
//   profileButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     overflow: 'hidden',
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarImage: {
//     width: '100%',
//     height: '100%',
//   },
//   userName: {
//     fontSize: 14,
//     fontWeight: '500',
//     maxWidth: 120,
//   },
//   roleBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 999,
//   },
//   roleBadgeText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   menuButton: {
//     padding: 8,
//   },
//   modalOverlay: {
//     flex: 1,
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     right: 16,
//     top: 64,
//     width: 192,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   dropdownItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   logoutText: {
//     fontSize: 14,
//     color: '#dc2626',
//   },
//   notificationBell: {
//     position: 'relative',
//     padding: 8,
//     borderRadius: 8,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#ef4444',
//     borderRadius: 999,
//     paddingHorizontal: 6,
//     minWidth: 18,
//     height: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   notificationCount: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   mobileMenuContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   mobileMenuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     padding: 16,
//   },
//   mobileMenuContent: {
//     paddingHorizontal: 16,
//   },
//   mobileUserInfo: {
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   mobileUserName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   mobileUserRole: {
//     fontSize: 12,
//     color: '#666',
//     textTransform: 'capitalize',
//   },
//   mobileNotifications: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   mobileNotificationsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   mobileNotificationsTitle: {
//     fontWeight: '500',
//     color: '#333',
//   },
//   mobileNav: {
//     paddingVertical: 16,
//   },
//   mobileNavLink: {
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#666',
//   },
//   mobileLogoutButton: {
//     paddingVertical: 12,
//   },
//   mobileLogoutText: {
//     fontSize: 16,
//     color: '#dc2626',
//   },
//   mobileAuthButtons: {
//     gap: 8,
//     paddingTop: 16,
//   },
//   mobileLoginButton: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   mobileLoginButtonText: {
//     color: '#333',
//   },
//   mobileRegisterButton: {
//     backgroundColor: '#2B6B3F',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   mobileRegisterButtonText: {
//     color: '#fff',
//   },
//   notificationsMenu: {
//     position: 'absolute',
//     right: 16,
//     top: 64,
//     width: 320,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   notificationsHeader: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   notificationsTitle: {
//     fontWeight: '600',
//     color: '#333',
//   },
//   notificationsList: {
//     maxHeight: 320,
//   },
//   emptyNotifications: {
//     padding: 16,
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   notificationItem: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   notificationRead: {
//     backgroundColor: '#fff',
//   },
//   notificationUnread: {
//     backgroundColor: '#f9f9f9',
//   },
//   notificationItemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   notificationItemTitle: {
//     fontWeight: '500',
//     color: '#333',
//   },
//   notificationItemDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   notificationItemMessage: {
//     color: '#666',
//     marginTop: 4,
//     fontSize: 14,
//   },
// });

// Add responsive styles for web
// if (typeof window !== 'undefined') {
//   const webStyles = StyleSheet.create({
//     desktopNav: {
//       '@media (min-width: 1024px)': {
//         display: 'flex',
//       },
//     },
//     rightSection: {
//       '@media (min-width: 1024px)': {
//         display: 'flex',
//       },
//     },
//     menuButton: {
//       '@media (min-width: 1024px)': {
//         display: 'none',
//       },
//     },
//   });
  
//   Object.assign(styles, webStyles);
// }






import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState('');

  // Get current route name
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routes = navigation.getState()?.routes;
      if (routes && routes.length > 0) {
        const currentRoute = routes[routes.length - 1];
        setCurrentRoute(currentRoute.name);
      }
    });
    
    return unsubscribe;
  }, [navigation]);

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

  const dashboardScreen = 
    user?.role === "SELLER" || user?.role === "FARMER"
      ? "SellerDashboard"
      : user?.role === "BUYER"
      ? "BuyerDashboard"
      : "Products";

  const navLinks = [
    { name: "Home", screen: "Products" },
    { name: "Products", screen: "Products" },
    { name: "How It Works", screen: "HowItWorks" },
    { name: "Contact", screen: "Contact" },
  ];

  const isActive = (screenName: string) => currentRoute === screenName;

  const markAsRead = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: "PATCH"
      });
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, is_read: 1 } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
    navigation.navigate('Products'); // Navigate to home after logout
  };

  const handleNavigation = (screenName: string) => {
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
    setShowNotifications(false);
    navigation.navigate(screenName as never);
  };

  const getRoleBadgeStyle = () => {
    switch(user?.role) {
      case "SELLER":
        return { backgroundColor: '#dcfce7', color: '#15803d' };
      case "FARMER":
        return { backgroundColor: '#fef3c7', color: '#b45309' };
      default:
        return { backgroundColor: '#dbeafe', color: '#1d4ed8' };
    }
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
      style={styles.notificationBell}
    >
      <Bell size={20} color="#666" />
      {unreadCount > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationCount}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <TouchableOpacity onPress={() => handleNavigation('Products')} style={styles.logoLink}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/Hindustan-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>
              Hindustan <Text style={styles.logoHighlight}>Proteins</Text>
            </Text>
          </View>
        </TouchableOpacity>

        {/* Desktop Navigation (hidden on mobile) */}
        <View style={styles.desktopNav}>
          {navLinks.map((link) => (
            <TouchableOpacity
              key={link.name}
              onPress={() => handleNavigation(link.screen)}
              style={[
                styles.navLink,
                isActive(link.screen) && styles.navLinkActive
              ]}
            >
              <Text style={[
                styles.navLinkText,
                isActive(link.screen) && styles.navLinkTextActive
              ]}>
                {link.name}
              </Text>
            </TouchableOpacity>
          ))}

          {user && (
            <TouchableOpacity
              onPress={() => handleNavigation(dashboardScreen)}
              style={[
                styles.navLink,
                isActive(dashboardScreen) && styles.navLinkActive
              ]}
            >
              <Text style={[
                styles.navLinkText,
                isActive(dashboardScreen) && styles.navLinkTextActive
              ]}>
                Dashboard
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {user && <NotificationBell />}

          {!user ? (
            <View style={styles.authButtons}>
              <TouchableOpacity 
                onPress={() => handleNavigation('Login')}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleNavigation('Register')}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                style={styles.profileButton}
              >
                <View style={styles.avatar}>
                  {user?.profile_image ? (
                    <Image
                      source={{ uri: `${SERVER_BASE_URL}/uploads/${user.profile_image}` }}
                      style={styles.avatarImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <User size={16} color="#666" />
                  )}
                </View>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.proprietor_name || "Account"}
                </Text>
                <View style={[
                  styles.roleBadge,
                  { backgroundColor: getRoleBadgeStyle().backgroundColor }
                ]}>
                  <Text style={[
                    styles.roleBadgeText,
                    { color: getRoleBadgeStyle().color }
                  ]}>
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
                  style={styles.modalOverlay}
                  onPress={() => setShowProfileDropdown(false)}
                >
                  <View style={styles.dropdownMenu}>
                    <TouchableOpacity 
                      style={styles.dropdownItem}
                      onPress={() => handleNavigation('Profile')}
                    >
                      <User size={16} color="#666" />
                      <Text style={styles.dropdownItemText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleLogout}
                      style={styles.dropdownItem}
                    >
                      <LogOut size={16} color="#dc2626" />
                      <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </Modal>
            </View>
          )}
        </View>

        {/* Mobile Menu Button */}
        <TouchableOpacity
          style={styles.menuButton}
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
        <SafeAreaView style={styles.mobileMenuContainer}>
          <View style={styles.mobileMenuHeader}>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.mobileMenuContent}>
            {user && (
              <>
                <View style={styles.mobileUserInfo}>
                  <Text style={styles.mobileUserName}>{user.proprietor_name}</Text>
                  <Text style={styles.mobileUserRole}>
                    {user.role?.toLowerCase()}
                  </Text>
                </View>

                {/* Mobile Notifications */}
                <View style={styles.mobileNotifications}>
                  <View style={styles.mobileNotificationsHeader}>
                    <Text style={styles.mobileNotificationsTitle}>Notifications</Text>
                    <NotificationBell />
                  </View>
                </View>
              </>
            )}

            {/* Navigation Links */}
            <View style={styles.mobileNav}>
              {navLinks.map((link) => (
                <TouchableOpacity
                  key={link.name}
                  onPress={() => handleNavigation(link.screen)}
                  style={styles.mobileNavLink}
                >
                  <Text style={styles.mobileNavLinkText}>{link.name}</Text>
                </TouchableOpacity>
              ))}

              {user && (
                <>
                  <TouchableOpacity
                    onPress={() => handleNavigation(dashboardScreen)}
                    style={styles.mobileNavLink}
                  >
                    <Text style={styles.mobileNavLinkText}>Dashboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNavigation('Profile')}
                    style={styles.mobileNavLink}
                  >
                    <Text style={styles.mobileNavLinkText}>Profile</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* Auth Buttons */}
              {user ? (
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.mobileLogoutButton}
                >
                  <Text style={styles.mobileLogoutText}>Logout</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.mobileAuthButtons}>
                  <TouchableOpacity 
                    onPress={() => handleNavigation('Login')}
                    style={styles.mobileLoginButton}
                  >
                    <Text style={styles.mobileLoginButtonText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleNavigation('Register')}
                    style={styles.mobileRegisterButton}
                  >
                    <Text style={styles.mobileRegisterButtonText}>Register</Text>
                  </TouchableOpacity>
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
          style={styles.modalOverlay}
          onPress={() => setShowNotifications(false)}
        >
          <View style={styles.notificationsMenu}>
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsTitle}>Notifications</Text>
            </View>
            <ScrollView style={styles.notificationsList}>
              {notifications.length === 0 ? (
                <Text style={styles.emptyNotifications}>
                  No notifications yet
                </Text>
              ) : (
                notifications.map(n => (
                  <View
                    key={n.id}
                    style={[
                      styles.notificationItem,
                      n.is_read ? styles.notificationRead : styles.notificationUnread
                    ]}
                  >
                    <View style={styles.notificationItemHeader}>
                      <Text style={styles.notificationItemTitle}>{n.title}</Text>
                      <Text style={styles.notificationItemDate}>
                        {formatDate(n.created_at)}
                      </Text>
                    </View>
                    <Text style={styles.notificationItemMessage}>
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


const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224,224,224,0.5)',
  },
  headerContent: {
    paddingHorizontal: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 48,
    height: 48,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoHighlight: {
    color: '#2B6B3F',
  },
  desktopNav: {
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  navLink: {
    padding: 8,
  },
  navLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  navLinkTextActive: {
    color: '#2B6B3F',
  },
  navLinkActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2B6B3F',
  },
  rightSection: {
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loginButtonText: {
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#2B6B3F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#fff',
  },
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    maxWidth: 120,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 16,
    top: 64,
    width: 192,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  logoutText: {
    fontSize: 14,
    color: '#dc2626',
  },
  notificationBell: {
    position: 'relative',
    padding: 8,
    borderRadius: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 999,
    paddingHorizontal: 6,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mobileMenuContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  mobileMenuContent: {
    paddingHorizontal: 16,
  },
  mobileUserInfo: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mobileUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mobileUserRole: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  mobileNotifications: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mobileNotificationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileNotificationsTitle: {
    fontWeight: '500',
    color: '#333',
  },
  mobileNav: {
    paddingVertical: 16,
  },
  mobileNavLink: {
    paddingVertical: 12,
  },
  mobileNavLinkText: {
    fontSize: 16,
    color: '#666',
  },
  mobileLogoutButton: {
    paddingVertical: 12,
  },
  mobileLogoutText: {
    fontSize: 16,
    color: '#dc2626',
  },
  mobileAuthButtons: {
    gap: 8,
    paddingTop: 16,
  },
  mobileLoginButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  mobileLoginButtonText: {
    color: '#333',
  },
  mobileRegisterButton: {
    backgroundColor: '#2B6B3F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  mobileRegisterButtonText: {
    color: '#fff',
  },
  notificationsMenu: {
    position: 'absolute',
    right: 16,
    top: 64,
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  notificationsTitle: {
    fontWeight: '600',
    color: '#333',
  },
  notificationsList: {
    maxHeight: 320,
  },
  emptyNotifications: {
    padding: 16,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  notificationRead: {
    backgroundColor: '#fff',
  },
  notificationUnread: {
    backgroundColor: '#f9f9f9',
  },
  notificationItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationItemTitle: {
    fontWeight: '500',
    color: '#333',
  },
  notificationItemDate: {
    fontSize: 12,
    color: '#666',
  },
  notificationItemMessage: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
});

// Add responsive styles for web
// if (typeof window !== 'undefined') {
//   const webStyles = {
//     desktopNav: {
//       display: 'flex',
//     },
//     rightSection: {
//       display: 'flex',
//     },
//     menuButton: {
//       display: 'none',
//     },
//   };
  
//   Object.assign(styles, webStyles);
// }
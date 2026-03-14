// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Header } from '../../components/layout/Header';
// import { Button } from '../../components/ui/button';
// import { Badge } from '../../components/ui/badge';
// import {
//   ShoppingCart,
//   Clock,
//   CheckCircle2,
//   Plus,
//   TrendingUp,
//   Calendar,
//   MapPin,
//   Search,
// } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';
// import { formatIndianDate } from '../../lib/utils';

// const statusStyles: Record<string, { label: string; variant: string }> = {
//   pending: { label: "Pending", variant: "secondary" },
//   confirmed: { label: "Confirmed", variant: "default" },
//   delivered: { label: "Delivered", variant: "default" },
//   rejected: { label: "Rejected", variant: "destructive" },
// };

// export const BuyerDashboard = () => {
//   const navigation = useNavigation();
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("all");
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/buyer/${user?.user_id}`);
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Orders fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tabs = [
//     { id: "all", label: "All Orders" },
//     { id: "pending", label: "Pending" },
//     { id: "confirmed", label: "Confirmed" },
//     { id: "rejected", label: "Rejected" },
//     { id: "delivered", label: "Delivered" },
//   ];

//   const activeOrders = orders.filter(
//     o => ["pending", "confirmed", "rejected"].includes(o.status)
//   ).length;

//   const pendingOrders = orders.filter(o => o.status === "pending").length;
//   const completedOrders = orders.filter(o => o.status === "delivered").length;

//   const thisMonthSpend = orders
//     .filter(o => {
//       const d = new Date(o.created_at);
//       const now = new Date();
//       return (
//         d.getMonth() === now.getMonth() &&
//         d.getFullYear() === now.getFullYear()
//       );
//     })
//     .reduce((sum, o) => sum + Number(o.total_amount), 0);

//   const stats = [
//     {
//       label: "Active Orders",
//       value: activeOrders,
//       icon: ShoppingCart,
//       color: "text-blue-600 bg-blue-100",
//     },
//     {
//       label: "Pending Confirmation",
//       value: pendingOrders,
//       icon: Clock,
//       color: "text-amber-600 bg-amber-100",
//     },
//     {
//       label: "Completed Orders",
//       value: completedOrders,
//       icon: CheckCircle2,
//       color: "text-emerald-600 bg-emerald-100",
//     },
//     {
//       label: "This Month Spend",
//       value: `₹${thisMonthSpend.toLocaleString()}`,
//       icon: TrendingUp,
//       color: "text-purple-600 bg-purple-100",
//     },
//   ];

//   const searchedOrders = orders.filter(order => {
//     const term = searchTerm.toLowerCase();
//     const searchableText = `
//       ${order.order_number}
//       ${order.bird_type}
//       ${order.weight_range}
//       ${order.taluk}
//       ${order.status}
//       ${order.quantity}
//       ${order.total_amount}
//     `.toLowerCase();
//     return searchableText.includes(term);
//   });

//   const filteredOrders =
//     activeTab === "all"
//       ? searchedOrders
//       : searchedOrders.filter(o => o.status === activeTab);

//   const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-muted/30">
//       <Header />
      
//       <ScrollView className="flex-1 px-4 py-6">
//         {/* Page Header */}
//         <View className="flex-row justify-between items-center mb-6">
//           <View>
//             <Text className="text-2xl font-bold text-foreground">Buyer Dashboard</Text>
//             <Text className="text-muted-foreground">Manage your orders</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('CreateOrder')}
//             className="bg-[#f5b82e] px-4 py-2 rounded-lg flex-row items-center"
//           >
//             <Plus size={16} color="#000" />
//             <Text className="text-black font-semibold ml-2">New Order</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Stats Grid */}
//         <View className="flex-row flex-wrap gap-4 mb-6">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <View key={stat.label} className="flex-1 min-w-[45%] bg-white rounded-xl border border-border p-4">
//                 <View className="flex-row justify-between">
//                   <View>
//                     <Text className="text-sm text-muted-foreground">{stat.label}</Text>
//                     <Text className="text-xl font-bold text-foreground mt-1">{stat.value}</Text>
//                   </View>
//                   <View className={`p-3 rounded-xl ${stat.color}`}>
//                     <Icon size={20} />
//                   </View>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Search */}
//         <View className="flex-row items-center gap-4 mb-4">
//           <View className="flex-1 relative">
//             <TextInput
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChangeText={(text) => {
//                 setSearchTerm(text);
//                 setCurrentPage(1);
//               }}
//               className="pl-10 pr-4 py-2 rounded-xl border border-border bg-white"
//             />
//             <Search size={16} color="#666" className="absolute left-3 top-3" />
//           </View>
//           <Text className="text-sm text-muted-foreground">
//             {filteredOrders.length} orders
//           </Text>
//         </View>

//         {/* Orders Section */}
//         <View className="bg-white rounded-xl border border-border overflow-hidden">
//           {/* Tabs */}
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-border p-4">
//             <View className="flex-row gap-2">
//               {tabs.map((tab) => (
//                 <TouchableOpacity
//                   key={tab.id}
//                   onPress={() => setActiveTab(tab.id)}
//                   className={`px-4 py-2 rounded-lg ${
//                     activeTab === tab.id ? 'bg-primary' : 'bg-transparent'
//                   }`}
//                 >
//                   <Text className={activeTab === tab.id ? 'text-primary-foreground' : 'text-muted-foreground'}>
//                     {tab.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>

//           {/* Orders List */}
//           {loading ? (
//             <View className="py-12 items-center">
//               <ActivityIndicator size="large" color="#2B6B3F" />
//             </View>
//           ) : (
//             <>
//               {paginatedOrders.map((order) => (
//                 <TouchableOpacity
//                   key={order.order_number}
//                   onPress={() => navigation.navigate('OrderDetails', { orderNumber: order.order_number })}
//                   className="p-4 border-b border-border"
//                 >
//                   <View className="flex-row items-center gap-3 mb-2">
//                     <Text className="text-sm font-mono text-muted-foreground">
//                       {order.order_number}
//                     </Text>
//                     <Badge variant={statusStyles[order.status]?.variant}>
//                       {statusStyles[order.status]?.label}
//                     </Badge>
//                   </View>

//                   <Text className="text-lg font-semibold mb-1">{order.bird_type}</Text>
                  
//                   <View className="flex-row flex-wrap gap-4">
//                     <Text className="text-sm text-muted-foreground">
//                       Weight: <Text className="font-semibold text-black">{order.weight_range}</Text>
//                     </Text>
//                     <Text className="text-sm text-muted-foreground">
//                       Qty: <Text className="font-semibold text-black">{order.quantity}</Text>
//                     </Text>
//                   </View>

//                   <View className="flex-row items-center justify-between mt-3">
//                     <View className="flex-row gap-4">
//                       <View className="flex-row items-center">
//                         <Calendar size={14} color="#666" />
//                         <Text className="text-xs text-muted-foreground ml-1">
//                           {formatIndianDate(order.created_at)}
//                         </Text>
//                       </View>
//                       <View className="flex-row items-center">
//                         <MapPin size={14} color="#666" />
//                         <Text className="text-xs text-muted-foreground ml-1">{order.taluk}</Text>
//                       </View>
//                     </View>
//                     <Text className="font-semibold text-[#1f4d36]">
//                       ₹{Number(order.total_amount).toLocaleString()}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}

//               {filteredOrders.length === 0 && (
//                 <View className="py-12 items-center">
//                   <Text className="text-muted-foreground">No orders found</Text>
//                 </View>
//               )}
//             </>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <View className="flex-row justify-center items-center gap-2 p-4 border-t">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={currentPage === 1}
//                 onPress={() => setCurrentPage(p => p - 1)}
//               >
//                 Prev
//               </Button>

//               <View className="flex-row gap-2">
//                 {[...Array(totalPages)].map((_, i) => (
//                   <TouchableOpacity
//                     key={i}
//                     onPress={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1 rounded ${
//                       currentPage === i + 1 ? 'bg-primary' : 'bg-transparent'
//                     }`}
//                   >
//                     <Text className={currentPage === i + 1 ? 'text-white' : 'text-muted-foreground'}>
//                       {i + 1}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={currentPage === totalPages}
//                 onPress={() => setCurrentPage(p => p + 1)}
//               >
//                 Next
//               </Button>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  Plus,
  TrendingUp,
  Calendar,
  MapPin,
  Search,
} from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { formatIndianDate } from '../../lib/utils';

const statusStyles: Record<string, { label: string; variant: string }> = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  delivered: { label: "Delivered", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export const BuyerDashboard = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/buyer/${user?.user_id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "rejected", label: "Rejected" },
    { id: "delivered", label: "Delivered" },
  ];

  const activeOrders = orders.filter(
    o => ["pending", "confirmed", "rejected"].includes(o.status)
  ).length;

  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const completedOrders = orders.filter(o => o.status === "delivered").length;

  const thisMonthSpend = orders
    .filter(o => {
      const d = new Date(o.created_at);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  const stats = [
    {
      label: "Active Orders",
      value: activeOrders,
      icon: ShoppingCart,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      label: "Pending Confirmation",
      value: pendingOrders,
      icon: Clock,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      icon: CheckCircle2,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      label: "This Month Spend",
      value: `₹${thisMonthSpend.toLocaleString()}`,
      icon: TrendingUp,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
  ];

  const searchedOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    const searchableText = `
      ${order.order_number}
      ${order.bird_type}
      ${order.weight_range}
      ${order.taluk}
      ${order.status}
      ${order.quantity}
      ${order.total_amount}
    `.toLowerCase();
    return searchableText.includes(term);
  });

  const filteredOrders =
    activeTab === "all"
      ? searchedOrders
      : searchedOrders.filter(o => o.status === activeTab);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollView}>
        {/* Page Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Buyer Dashboard</Text>
            <Text style={styles.subtitle}>Manage your orders</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateOrder')}
            style={styles.newOrderButton}
          >
            <Plus size={16} color="#000" />
            <Text style={styles.newOrderButtonText}>New Order</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                  <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                    <Icon size={20} color={stat.color} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Search orders..."
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                setCurrentPage(1);
              }}
              style={styles.searchInput}
            />
            <View style={styles.searchIcon}>
              <Search size={16} color="#666" />
            </View>
          </View>
          <Text style={styles.orderCount}>
            {filteredOrders.length} orders
          </Text>
        </View>

        {/* Orders Section */}
        <View style={styles.ordersSection}>
          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            <View style={styles.tabsContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={[
                    styles.tabButton,
                    activeTab === tab.id && styles.tabButtonActive
                  ]}
                >
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Orders List */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2B6B3F" />
            </View>
          ) : (
            <>
              {paginatedOrders.map((order) => (
                <TouchableOpacity
                  key={order.order_number}
                  onPress={() => navigation.navigate('OrderDetails', { orderNumber: order.order_number })}
                  style={styles.orderCard}
                >
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>
                      {order.order_number}
                    </Text>
                    <Badge variant={statusStyles[order.status]?.variant}>
                      {statusStyles[order.status]?.label}
                    </Badge>
                  </View>

                  <Text style={styles.birdType}>{order.bird_type}</Text>
                  
                  <View style={styles.orderDetails}>
                    <Text style={styles.detailText}>
                      Weight: <Text style={styles.detailValue}>{order.weight_range}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Qty: <Text style={styles.detailValue}>{order.quantity}</Text>
                    </Text>
                  </View>

                  <View style={styles.orderFooter}>
                    <View style={styles.footerLeft}>
                      <View style={styles.iconText}>
                        <Calendar size={14} color="#666" />
                        <Text style={styles.iconLabel}>
                          {formatIndianDate(order.created_at)}
                        </Text>
                      </View>
                      <View style={styles.iconText}>
                        <MapPin size={14} color="#666" />
                        <Text style={styles.iconLabel}>{order.taluk}</Text>
                      </View>
                    </View>
                    <Text style={styles.amount}>
                      ₹{Number(order.total_amount).toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {filteredOrders.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No orders found</Text>
                </View>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </Button>

              <View style={styles.pageNumbers}>
                {[...Array(totalPages)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setCurrentPage(i + 1)}
                    style={[
                      styles.pageNumber,
                      currentPage === i + 1 && styles.pageNumberActive
                    ]}
                  >
                    <Text style={[
                      styles.pageNumberText,
                      currentPage === i + 1 && styles.pageNumberTextActive
                    ]}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage(p => p + 1)}
              >
                Next
              </Button>
            </View>
          )}
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#666',
  },
  newOrderButton: {
    backgroundColor: '#f5b82e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newOrderButtonText: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statIcon: {
    padding: 12,
    borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  searchWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 10,
  },
  orderCount: {
    fontSize: 14,
    color: '#666',
  },
  ordersSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#2B6B3F',
  },
  tabText: {
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  orderCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#666',
  },
  birdType: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  orderDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  amount: {
    fontWeight: '600',
    color: '#1f4d36',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  pageNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  pageNumber: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  pageNumberActive: {
    backgroundColor: '#2B6B3F',
  },
  pageNumberText: {
    color: '#666',
  },
  pageNumberTextActive: {
    color: '#fff',
  },
});
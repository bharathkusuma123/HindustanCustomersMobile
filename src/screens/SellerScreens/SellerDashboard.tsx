// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Header } from '../../components/layout/Header';
// import { Button } from '../../components/ui/button';
// import { Badge } from '../../components/ui/badge';
// import {
//   Package,
//   Clock,
//   CheckCircle2,
//   TrendingUp,
//   Calendar,
//   MapPin,
//   Search,
//   Eye,
//   Check,
//   X,
// } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';
// import { formatIndianDate } from '../../lib/utils';

// const statusStyles: Record<string, { label: string; variant: string }> = {
//   pending: { label: "New Request", variant: "secondary" },
//   confirmed: { label: "Confirmed", variant: "default" },
//   dispatched: { label: "Dispatched", variant: "outline" },
//   delivered: { label: "Delivered", variant: "default" },
//   rejected: { label: "Rejected", variant: "destructive" },
// };

// export const SellerDashboard = () => {
//   const navigation = useNavigation();
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("all");
//   const [orders, setOrders] = useState<any[]>([]);
//   const [stats, setStats] = useState({
//     newRequests: 0,
//     activeOrders: 0,
//     completed: 0,
//     revenue: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/seller/${user?.user_id}`);
//       const data = await res.json();
      
//       if (Array.isArray(data)) {
//         setOrders(data);
//         setStats({
//           newRequests: data.filter(o => o.seller_status === "pending").length,
//           activeOrders: data.filter(o =>
//             o.seller_status === "accepted" && o.status !== "delivered"
//           ).length,
//           completed: data.filter(o => o.status === "delivered").length,
//           revenue: data
//             .filter(o => o.status === "delivered")
//             .reduce((s, o) => s + Number(o.total_amount || 0), 0),
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch orders");
//     }
//   };

//   const getSellerViewStatus = (order: any) => {
//     if (order.seller_status === "pending") return "pending";
//     if (order.seller_status === "rejected") return "rejected";
//     if (order.seller_status === "accepted") {
//       if (order.status === "delivered") return "delivered";
//       return "confirmed";
//     }
//     return null;
//   };

//   const tabs = [
//     { id: "all", label: "All" },
//     { id: "pending", label: "New Requests" },
//     { id: "confirmed", label: "Confirmed" },
//     { id: "delivered", label: "Delivered" },
//   ];

//   const filteredOrders =
//     activeTab === "all"
//       ? orders
//       : orders.filter(o => getSellerViewStatus(o) === activeTab);

//   const searchedOrders = filteredOrders.filter(order => {
//     const term = searchTerm.toLowerCase();
//     const searchable = `
//       ${order.order_number}
//       ${order.bird_type}
//       ${order.weight_range}
//       ${order.taluk}
//       ${order.quantity}
//       ${order.total_amount}
//     `.toLowerCase();
//     return searchable.includes(term);
//   });

//   const updateSellerAction = async (orderNumber: string, action: string) => {
//     try {
//       await fetch(`${API_BASE_URL}/orders/${orderNumber}/seller-action`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ action }),
//       });

//       setOrders(prev =>
//         prev.map(o =>
//           o.order_number === orderNumber
//             ? { ...o, seller_status: action }
//             : o
//         )
//       );

//       Alert.alert(
//         "Success",
//         action === "accepted" ? "Order accepted" : "Order rejected"
//       );
//     } catch (err) {
//       Alert.alert("Error", "Failed to update order");
//     }
//   };

//   const totalPages = Math.ceil(searchedOrders.length / ITEMS_PER_PAGE);
//   const paginatedOrders = searchedOrders.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const statItems = [
//     { label: "New Requests", value: stats.newRequests, icon: Clock, color: "text-amber-600 bg-amber-100" },
//     { label: "Active Orders", value: stats.activeOrders, icon: Package, color: "text-blue-600 bg-blue-100" },
//     { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
//     { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
//   ];

//   return (
//     <SafeAreaView className="flex-1 bg-muted/30">
//       <Header />

//       <ScrollView className="flex-1 px-4 py-6">
//         {/* Header */}
//         <View className="mb-6">
//           <Text className="text-2xl font-bold text-foreground">Seller Dashboard</Text>
//           <Text className="text-muted-foreground">Manage incoming requests</Text>
//         </View>

//         {/* Stats */}
//         <View className="flex-row flex-wrap gap-4 mb-6">
//           {statItems.map((stat, index) => {
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
//             {searchedOrders.length} orders
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
//                   onPress={() => {
//                     setActiveTab(tab.id);
//                     setCurrentPage(1);
//                   }}
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
//           {paginatedOrders.map((order: any) => {
//             const sellerView = getSellerViewStatus(order);
            
//             return (
//               <View key={order.order_number} className="p-4 border-b border-border">
//                 <View className="flex-row items-center gap-3 mb-2">
//                   <Text className="text-sm font-mono text-muted-foreground">
//                     {order.order_number}
//                   </Text>
//                   <Badge variant={statusStyles[sellerView]?.variant}>
//                     {statusStyles[sellerView]?.label}
//                   </Badge>
//                 </View>

//                 <Text className="text-lg font-semibold mb-2">{order.bird_type}</Text>

//                 <View className="flex-row flex-wrap gap-4 mb-3">
//                   <Text className="text-sm text-muted-foreground">
//                     Weight: <Text className="font-semibold text-black">{order.weight_range}</Text>
//                   </Text>
//                   <Text className="text-sm text-muted-foreground">
//                     Qty: <Text className="font-semibold text-black">{order.quantity}</Text>
//                   </Text>
//                   <Text className="text-sm text-muted-foreground">
//                     Vehicle: <Text className="font-semibold text-black">{order.vehicle_number}</Text>
//                   </Text>
//                 </View>

//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row gap-4">
//                     <View className="flex-row items-center">
//                       <Calendar size={14} color="#666" />
//                       <Text className="text-xs text-muted-foreground ml-1">
//                         {formatIndianDate(order.created_at)}
//                       </Text>
//                     </View>
//                     <View className="flex-row items-center">
//                       <MapPin size={14} color="#666" />
//                       <Text className="text-xs text-muted-foreground ml-1">{order.taluk}</Text>
//                     </View>
//                   </View>
//                   <Text className="font-semibold text-[#1f4d36]">
//                     ₹{Number(order.total_amount).toLocaleString()}
//                   </Text>
//                 </View>

//                 <View className="flex-row justify-end gap-2 mt-4">
//                   {order.seller_status === "pending" ? (
//                     <>
//                       <Button
//                         size="sm"
//                         className="flex-row items-center"
//                         onPress={() => updateSellerAction(order.order_number, "accepted")}
//                       >
//                         <Check size={16} color="#fff" />
//                         <Text className="ml-1 text-white">Accept</Text>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="flex-row items-center"
//                         onPress={() => updateSellerAction(order.order_number, "rejected")}
//                       >
//                         <X size={16} color="#666" />
//                         <Text className="ml-1">Reject</Text>
//                       </Button>
//                     </>
//                   ) : (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-row items-center"
//                       onPress={() => navigation.navigate('SellerOrderDetails', { orderNumber: order.order_number })}
//                     >
//                       <Eye size={16} color="#666" />
//                       <Text className="ml-1">View</Text>
//                     </Button>
//                   )}
//                 </View>
//               </View>
//             );
//           })}

//           {paginatedOrders.length === 0 && (
//             <View className="py-12 items-center">
//               <Text className="text-muted-foreground">No orders found</Text>
//             </View>
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
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  MapPin,
  Search,
  Eye,
  Check,
  X,
} from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { formatIndianDate } from '../../lib/utils';

const statusStyles: Record<string, { label: string; variant: string }> = {
  pending: { label: "New Request", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  dispatched: { label: "Dispatched", variant: "outline" },
  delivered: { label: "Delivered", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export const SellerDashboard = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    newRequests: 0,
    activeOrders: 0,
    completed: 0,
    revenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/seller/${user?.user_id}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setOrders(data);
        setStats({
          newRequests: data.filter(o => o.seller_status === "pending").length,
          activeOrders: data.filter(o =>
            o.seller_status === "accepted" && o.status !== "delivered"
          ).length,
          completed: data.filter(o => o.status === "delivered").length,
          revenue: data
            .filter(o => o.status === "delivered")
            .reduce((s, o) => s + Number(o.total_amount || 0), 0),
        });
      }
    } catch (err) {
      console.error("Failed to fetch orders");
    }
  };

  const getSellerViewStatus = (order: any) => {
    if (order.seller_status === "pending") return "pending";
    if (order.seller_status === "rejected") return "rejected";
    if (order.seller_status === "accepted") {
      if (order.status === "delivered") return "delivered";
      return "confirmed";
    }
    return null;
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "New Requests" },
    { id: "confirmed", label: "Confirmed" },
    { id: "delivered", label: "Delivered" },
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter(o => getSellerViewStatus(o) === activeTab);

  const searchedOrders = filteredOrders.filter(order => {
    const term = searchTerm.toLowerCase();
    const searchable = `
      ${order.order_number}
      ${order.bird_type}
      ${order.weight_range}
      ${order.taluk}
      ${order.quantity}
      ${order.total_amount}
    `.toLowerCase();
    return searchable.includes(term);
  });

  const updateSellerAction = async (orderNumber: string, action: string) => {
    try {
      await fetch(`${API_BASE_URL}/orders/${orderNumber}/seller-action`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      setOrders(prev =>
        prev.map(o =>
          o.order_number === orderNumber
            ? { ...o, seller_status: action }
            : o
        )
      );

      Alert.alert(
        "Success",
        action === "accepted" ? "Order accepted" : "Order rejected"
      );
    } catch (err) {
      Alert.alert("Error", "Failed to update order");
    }
  };

  const totalPages = Math.ceil(searchedOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = searchedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const statItems = [
    { label: "New Requests", value: stats.newRequests, icon: Clock, color: "#f59e0b", bgColor: "#fef3c7" },
    { label: "Active Orders", value: stats.activeOrders, icon: Package, color: "#3b82f6", bgColor: "#dbeafe" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "#10b981", bgColor: "#d1fae5" },
    { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "#8b5cf6", bgColor: "#ede9fe" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Seller Dashboard</Text>
          <Text style={styles.subtitle}>Manage incoming requests</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                  <View style={[styles.iconWrapper, { backgroundColor: stat.bgColor }]}>
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
            {searchedOrders.length} orders
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
                  onPress={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  style={[
                    styles.tabButton,
                    activeTab === tab.id && styles.activeTabButton
                  ]}
                >
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.activeTabText
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Orders List */}
          {paginatedOrders.map((order: any) => {
            const sellerView = getSellerViewStatus(order);
            
            return (
              <View key={order.order_number} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>
                    {order.order_number}
                  </Text>
                  <Badge variant={statusStyles[sellerView]?.variant}>
                    {statusStyles[sellerView]?.label}
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
                  <Text style={styles.detailText}>
                    Vehicle: <Text style={styles.detailValue}>{order.vehicle_number}</Text>
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

                <View style={styles.actionButtons}>
                  {order.seller_status === "pending" ? (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.acceptButton]}
                        onPress={() => updateSellerAction(order.order_number, "accepted")}
                      >
                        <Check size={16} color="#fff" />
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => updateSellerAction(order.order_number, "rejected")}
                      >
                        <X size={16} color="#666" />
                        <Text style={styles.rejectButtonText}>Reject</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => navigation.navigate('SellerOrderDetails', { orderNumber: order.order_number })}
                    >
                      <Eye size={16} color="#666" />
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

          {paginatedOrders.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(p => p - 1)}
              >
                <Text style={styles.paginationButtonText}>Prev</Text>
              </TouchableOpacity>

              <View style={styles.pageNumbers}>
                {[...Array(totalPages)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setCurrentPage(i + 1)}
                    style={[
                      styles.pageNumber,
                      currentPage === i + 1 && styles.activePageNumber
                    ]}
                  >
                    <Text style={[
                      styles.pageNumberText,
                      currentPage === i + 1 && styles.activePageNumberText
                    ]}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage(p => p + 1)}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
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
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
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
  iconWrapper: {
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
  activeTabButton: {
    backgroundColor: '#2B6B3F',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
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
    marginBottom: 16,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  acceptButton: {
    backgroundColor: '#2B6B3F',
  },
  acceptButtonText: {
    color: '#fff',
    marginLeft: 4,
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  rejectButtonText: {
    color: '#666',
    marginLeft: 4,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  viewButtonText: {
    color: '#666',
    marginLeft: 4,
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
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  paginationButtonText: {
    color: '#666',
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
  activePageNumber: {
    backgroundColor: '#2B6B3F',
  },
  pageNumberText: {
    color: '#666',
  },
  activePageNumberText: {
    color: '#fff',
  },
});
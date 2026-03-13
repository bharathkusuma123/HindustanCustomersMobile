import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
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
    { label: "New Requests", value: stats.newRequests, icon: Clock, color: "text-amber-600 bg-amber-100" },
    { label: "Active Orders", value: stats.activeOrders, icon: Package, color: "text-blue-600 bg-blue-100" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
    { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-muted/30">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground">Seller Dashboard</Text>
          <Text className="text-muted-foreground">Manage incoming requests</Text>
        </View>

        {/* Stats */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} className="flex-1 min-w-[45%] bg-white rounded-xl border border-border p-4">
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-sm text-muted-foreground">{stat.label}</Text>
                    <Text className="text-xl font-bold text-foreground mt-1">{stat.value}</Text>
                  </View>
                  <View className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon size={20} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Search */}
        <View className="flex-row items-center gap-4 mb-4">
          <View className="flex-1 relative">
            <TextInput
              placeholder="Search orders..."
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 rounded-xl border border-border bg-white"
            />
            <Search size={16} color="#666" className="absolute left-3 top-3" />
          </View>
          <Text className="text-sm text-muted-foreground">
            {searchedOrders.length} orders
          </Text>
        </View>

        {/* Orders Section */}
        <View className="bg-white rounded-xl border border-border overflow-hidden">
          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-border p-4">
            <View className="flex-row gap-2">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === tab.id ? 'bg-primary' : 'bg-transparent'
                  }`}
                >
                  <Text className={activeTab === tab.id ? 'text-primary-foreground' : 'text-muted-foreground'}>
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
              <View key={order.order_number} className="p-4 border-b border-border">
                <View className="flex-row items-center gap-3 mb-2">
                  <Text className="text-sm font-mono text-muted-foreground">
                    {order.order_number}
                  </Text>
                  <Badge variant={statusStyles[sellerView]?.variant}>
                    {statusStyles[sellerView]?.label}
                  </Badge>
                </View>

                <Text className="text-lg font-semibold mb-2">{order.bird_type}</Text>

                <View className="flex-row flex-wrap gap-4 mb-3">
                  <Text className="text-sm text-muted-foreground">
                    Weight: <Text className="font-semibold text-black">{order.weight_range}</Text>
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Qty: <Text className="font-semibold text-black">{order.quantity}</Text>
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Vehicle: <Text className="font-semibold text-black">{order.vehicle_number}</Text>
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row gap-4">
                    <View className="flex-row items-center">
                      <Calendar size={14} color="#666" />
                      <Text className="text-xs text-muted-foreground ml-1">
                        {formatIndianDate(order.created_at)}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <MapPin size={14} color="#666" />
                      <Text className="text-xs text-muted-foreground ml-1">{order.taluk}</Text>
                    </View>
                  </View>
                  <Text className="font-semibold text-[#1f4d36]">
                    ₹{Number(order.total_amount).toLocaleString()}
                  </Text>
                </View>

                <View className="flex-row justify-end gap-2 mt-4">
                  {order.seller_status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-row items-center"
                        onPress={() => updateSellerAction(order.order_number, "accepted")}
                      >
                        <Check size={16} color="#fff" />
                        <Text className="ml-1 text-white">Accept</Text>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-row items-center"
                        onPress={() => updateSellerAction(order.order_number, "rejected")}
                      >
                        <X size={16} color="#666" />
                        <Text className="ml-1">Reject</Text>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-row items-center"
                      onPress={() => navigation.navigate('SellerOrderDetails', { orderNumber: order.order_number })}
                    >
                      <Eye size={16} color="#666" />
                      <Text className="ml-1">View</Text>
                    </Button>
                  )}
                </View>
              </View>
            );
          })}

          {paginatedOrders.length === 0 && (
            <View className="py-12 items-center">
              <Text className="text-muted-foreground">No orders found</Text>
            </View>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <View className="flex-row justify-center items-center gap-2 p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </Button>

              <View className="flex-row gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? 'bg-primary' : 'bg-transparent'
                    }`}
                  >
                    <Text className={currentPage === i + 1 ? 'text-white' : 'text-muted-foreground'}>
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
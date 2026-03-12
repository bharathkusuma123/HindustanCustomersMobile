import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
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
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Pending Confirmation",
      value: pendingOrders,
      icon: Clock,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "This Month Spend",
      value: `₹${thisMonthSpend.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-purple-600 bg-purple-100",
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
    <SafeAreaView className="flex-1 bg-muted/30">
      <Header />
      
      <ScrollView className="flex-1 px-4 py-6">
        {/* Page Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-foreground">Buyer Dashboard</Text>
            <Text className="text-muted-foreground">Manage your orders</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateOrder')}
            className="bg-[#f5b82e] px-4 py-2 rounded-lg flex-row items-center"
          >
            <Plus size={16} color="#000" />
            <Text className="text-black font-semibold ml-2">New Order</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {stats.map((stat, index) => {
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
            {filteredOrders.length} orders
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
                  onPress={() => setActiveTab(tab.id)}
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
          {loading ? (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#2B6B3F" />
            </View>
          ) : (
            <>
              {paginatedOrders.map((order) => (
                <TouchableOpacity
                  key={order.order_number}
                  onPress={() => navigation.navigate('OrderDetails', { orderNumber: order.order_number })}
                  className="p-4 border-b border-border"
                >
                  <View className="flex-row items-center gap-3 mb-2">
                    <Text className="text-sm font-mono text-muted-foreground">
                      {order.order_number}
                    </Text>
                    <Badge variant={statusStyles[order.status]?.variant}>
                      {statusStyles[order.status]?.label}
                    </Badge>
                  </View>

                  <Text className="text-lg font-semibold mb-1">{order.bird_type}</Text>
                  
                  <View className="flex-row flex-wrap gap-4">
                    <Text className="text-sm text-muted-foreground">
                      Weight: <Text className="font-semibold text-black">{order.weight_range}</Text>
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      Qty: <Text className="font-semibold text-black">{order.quantity}</Text>
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between mt-3">
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
                </TouchableOpacity>
              ))}

              {filteredOrders.length === 0 && (
                <View className="py-12 items-center">
                  <Text className="text-muted-foreground">No orders found</Text>
                </View>
              )}
            </>
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
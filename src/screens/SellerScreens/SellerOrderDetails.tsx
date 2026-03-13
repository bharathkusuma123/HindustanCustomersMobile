import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Badge } from '../../components/ui/toaster';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Truck,
  Package,
  MapPin,
  Hash,
  Scale,
  IndianRupee,
  Calendar,
  User,
  Home,
  Phone,
} from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import DateTimePicker from '@react-native-community/datetimepicker';

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500 text-black",
  confirmed: "bg-emerald-600 text-white",
  dispatched: "bg-blue-600 text-white",
  delivered: "bg-green-700 text-white",
  rejected: "bg-red-600 text-white"
};

export const SellerOrderDetails = () => {
  const route = useRoute();
  const { orderNumber } = route.params as { orderNumber: string };
  const [order, setOrder] = useState<any>(null);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorMobile, setSupervisorMobile] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [orderNumber]);

  useEffect(() => {
    if (order) {
      setFarmName(order.farm_name || "");
      setFarmAddress(order.farm_address || "");
      setSupervisorName(order.supervisor_name || "");
      setSupervisorMobile(order.supervisor_mobile || "");
    }
  }, [order]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/details/${orderNumber}`);
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error("Failed to fetch order details");
    }
  };

  const schedulePickup = async () => {
    try {
      const formattedDate = pickupDate.toISOString().split('T')[0];
      const finalTime = `${pickupTime}`;

      await fetch(
        `${API_BASE_URL}/orders/${order.order_number}/schedule-pickup`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pickup_date: formattedDate,
            pickup_time: finalTime,
            farm_name: farmName,
            farm_address: farmAddress,
            supervisor_name: supervisorName,
            supervisor_mobile: supervisorMobile
          })
        }
      );

      setOrder({
        ...order,
        pickup_date: formattedDate,
        pickup_time: finalTime,
        pickup_status: "scheduled",
        farm_name: farmName,
        farm_address: farmAddress,
        supervisor_name: supervisorName,
        supervisor_mobile: supervisorMobile
      });

      Alert.alert("Success", "Pickup scheduled successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to schedule pickup");
    }
  };

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-muted/30">
        <Header />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2B6B3F" />
        </View>
      </SafeAreaView>
    );
  }

  const flowStage =
    order.status === "delivered" ? "delivered" :
    order.pickup_status === "picked_up" ? "picked_up" : 
    order.seller_status === "rejected" ? "seller_rejected" :
    order.pickup_status === "accepted" ? "pickup_accepted" :
    order.pickup_status === "scheduled" ? "scheduled" :
    order.pickup_status === "reschedule_requested" ? "reschedule_requested" :
    order.seller_status === "accepted" ? "seller_accepted" :
    order.seller_status === "pending" ? "seller_pending" :
    order.payment_status !== "approved" ? "waiting_payment" : null;

  return (
    <SafeAreaView className="flex-1 bg-muted/20">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] rounded-2xl p-6 mb-6">
          <Badge className="mb-3 bg-[#f5b82e] self-start">Order Details</Badge>
          <Text className="text-3xl font-bold text-white">Order Overview</Text>
          <Text className="text-white/80 mt-1">Complete order information</Text>
        </View>

        {/* Order Header Card */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <View className="flex-row justify-between items-center">
              <View>
                <View className="flex-row items-center">
                  <Hash size={16} color="#fff" />
                  <Text className="text-white/70 ml-1">Order Number</Text>
                </View>
                <Text className="text-2xl font-bold text-white mt-1">
                  {order.order_number}
                </Text>
              </View>
              <View className={`px-4 py-1 rounded-full ${statusStyles[order.status]}`}>
                <Text className="font-semibold capitalize">{order.status}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Buyer Info */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <View className="flex-row items-center mb-4">
              <User size={20} color="#f5b82e" />
              <Text className="text-white font-semibold ml-2">Buyer Information</Text>
            </View>

            <View className="space-y-3">
              <View className="flex-row">
                <Text className="text-white/70 w-32">Business Name</Text>
                <Text className="text-white flex-1">{order.trader_name}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-white/70 w-32">Buyer Name</Text>
                <Text className="text-white flex-1">{order.proprietor_name}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-white/70 w-32">Mobile</Text>
                <Text className="text-white flex-1">{order.proprietor_mobile}</Text>
              </View>
              {order.address_line1 && (
                <View className="flex-row">
                  <Text className="text-white/70 w-32">Address</Text>
                  <Text className="text-white flex-1">
                    {order.address_line1}
                    {order.address_line2 && `, ${order.address_line2}`}
                  </Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Product Details */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <View className="flex-row items-center mb-4">
              <Package size={20} color="#f5b82e" />
              <Text className="text-white font-semibold ml-2">Product Details</Text>
            </View>

            <View className="flex-row flex-wrap gap-4">
              <View className="w-1/2">
                <Text className="text-white/70">Product</Text>
                <Text className="text-white font-medium">{order.bird_type}</Text>
              </View>
              <View className="w-1/2">
                <Text className="text-white/70">Weight Range</Text>
                <View className="flex-row items-center">
                  <Scale size={16} color="#f5b82e" />
                  <Text className="text-white ml-1">{order.weight_range}</Text>
                </View>
              </View>
              <View className="w-1/2">
                <Text className="text-white/70">Quantity</Text>
                <Text className="text-white">{order.quantity}</Text>
              </View>
              <View className="w-1/2">
                <Text className="text-white/70">Total Amount</Text>
                <View className="flex-row items-center">
                  <IndianRupee size={16} color="#f5b82e" />
                  <Text className="text-white ml-1 font-bold">
                    {Number(order.total_amount).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Delivery Info */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <View className="flex-row items-center mb-4">
              <Truck size={20} color="#f5b82e" />
              <Text className="text-white font-semibold ml-2">Delivery Info</Text>
            </View>

            <View className="flex-row flex-wrap gap-4">
              <View className="w-1/2">
                <View className="flex-row items-center">
                  <MapPin size={16} color="#f5b82e" />
                  <Text className="text-white/70 ml-1">Taluk</Text>
                </View>
                <Text className="text-white">{order.taluk}</Text>
              </View>
              <View className="w-1/2">
                <Text className="text-white/70">Vehicle Number</Text>
                <Text className="text-white">{order.vehicle_number}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Flow Status Cards */}
        {flowStage === "waiting_payment" && (
          <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-amber-800">⏳ Waiting for payment verification</Text>
            </Card.Content>
          </Card>
        )}

        {flowStage === "seller_pending" && (
          <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-blue-700">📩 New order assigned — please accept</Text>
            </Card.Content>
          </Card>
        )}

        {flowStage === "seller_accepted" && !order.pickup_date && (
          <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
            <Card.Content className="p-6 space-y-4">
              <Text className="text-amber-800 font-medium">📅 Schedule pickup</Text>

              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="border rounded p-3 bg-white"
              >
                <Text>{pickupDate.toLocaleDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={pickupDate}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setPickupDate(selectedDate);
                  }}
                />
              )}

              {/* Time Input */}
              <TextInput
                placeholder="Pickup time (e.g., 10:00 AM)"
                value={pickupTime}
                onChangeText={setPickupTime}
                className="border rounded p-3 bg-white"
              />

              {/* Farm Details */}
              <TextInput
                placeholder="Farm/Poultry Name"
                value={farmName}
                onChangeText={setFarmName}
                className="border rounded p-3 bg-white"
              />

              <TextInput
                placeholder="Farm Address"
                value={farmAddress}
                onChangeText={setFarmAddress}
                className="border rounded p-3 bg-white"
                multiline
              />

              <TextInput
                placeholder="Supervisor Name"
                value={supervisorName}
                onChangeText={setSupervisorName}
                className="border rounded p-3 bg-white"
              />

              <TextInput
                placeholder="Supervisor Mobile"
                value={supervisorMobile}
                onChangeText={setSupervisorMobile}
                keyboardType="phone-pad"
                className="border rounded p-3 bg-white"
              />

              <Button
                onPress={schedulePickup}
                disabled={!pickupDate || !pickupTime}
              >
                Schedule Pickup
              </Button>
            </Card.Content>
          </Card>
        )}

        {flowStage === "scheduled" && (
          <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-blue-700 font-semibold mb-2">📅 Pickup Scheduled</Text>
              <Text className="text-blue-700">
                {new Date(order.pickup_date).toLocaleDateString("en-IN")}
                {order.pickup_time && ` at ${order.pickup_time}`}
              </Text>
            </Card.Content>
          </Card>
        )}

        {flowStage === "pickup_accepted" && (
          <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-blue-700 font-semibold mb-2">
                ✅ Buyer confirmed pickup date
              </Text>
              <Button
                onPress={async () => {
                  await fetch(
                    `${API_BASE_URL}/orders/${order.order_number}/accept-pickup`,
                    { method: "PATCH" }
                  );
                  setOrder({ ...order, pickup_status: "picked_up" });
                }}
              >
                Mark Pickup Completed
              </Button>
            </Card.Content>
          </Card>
        )}

        {flowStage === "delivered" && (
          <Card className="bg-green-50 border-l-4 border-green-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-green-700 font-semibold">📦 Order delivered successfully</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
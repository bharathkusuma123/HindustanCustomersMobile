import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Truck,
  Package,
  MapPin,
  Hash,
  Scale,
  Calendar,
} from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import * as DocumentPicker from 'expo-document-picker';

const statusStyles: Record<string, { label: string; variant: string; className: string }> = {
  pending: {
    label: "Pending",
    variant: "secondary",
    className: "bg-amber-100 text-amber-800"
  },
  confirmed: {
    label: "Confirmed",
    variant: "default",
    className: "bg-emerald-600 text-white"
  },
  delivered: {
    label: "Delivered",
    variant: "default",
    className: "bg-green-700 text-white"
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    className: "bg-red-600 text-white"
  }
};

export const OrderDetails = () => {
  const route = useRoute();
  const { orderNumber } = route.params as { orderNumber: string };
  const [order, setOrder] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [showRescheduleBox, setShowRescheduleBox] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderNumber]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/details/${orderNumber}`);
      const data = await res.json();
      setOrder({
        ...data,
        payment_status: data.payment_status || (data.payment_proof ? "uploaded" : "none"),
      });
    } catch (err) {
      console.error("Failed to fetch order details");
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (result.canceled) return;

      const file = result.assets[0];
      const formData = new FormData();
      formData.append('proof', {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      } as any);

      setUploading(true);
      const res = await fetch(
        `${API_BASE_URL}/orders/upload-proof/${order.order_number}`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
        Alert.alert("Success", "Payment proof uploaded");
      }
    } catch (err) {
      Alert.alert("Error", "Upload failed");
    } finally {
      setUploading(false);
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

  return (
    <SafeAreaView className="flex-1 bg-muted/20">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] rounded-2xl p-6 mb-6">
          <Badge className="mb-3 bg-[#f5b82e] self-start">Order Details</Badge>
          <Text className="text-3xl font-bold text-white">Track Your Order</Text>
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
              <Badge
                variant={statusStyles[order.status].variant}
                className={statusStyles[order.status].className}
              >
                {statusStyles[order.status].label}
              </Badge>
            </View>
          </Card.Content>
        </Card>

        {/* Product Card */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <Text className="text-lg font-semibold text-white mb-4">Product Details</Text>
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
                <View className="flex-row items-center">
                  <Package size={16} color="#f5b82e" />
                  <Text className="text-white ml-1">{order.quantity}</Text>
                </View>
              </View>
              <View className="w-1/2">
                <Text className="text-white/70">Total Amount</Text>
                <Text className="text-white font-bold">
                  ₹{Number(order.total_amount).toLocaleString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Delivery Card */}
        <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
          <Card.Content className="p-6">
            <Text className="text-lg font-semibold text-white mb-4">Delivery Info</Text>
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

        {/* Pickup Flow */}
        {order.pickup_status === "scheduled" && (
          <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-blue-700">
                📅 Pickup scheduled on{' '}
                <Text className="font-bold">
                  {new Date(order.pickup_date).toLocaleDateString("en-IN")}
                  {order.pickup_time && ` at ${order.pickup_time}`}
                </Text>
              </Text>

              {(order.farm_name || order.farm_address || order.supervisor_name) && (
                <View className="bg-white/50 p-3 rounded mt-3">
                  {order.farm_name && (
                    <Text><Text className="font-bold">Farm:</Text> {order.farm_name}</Text>
                  )}
                  {order.farm_address && (
                    <Text><Text className="font-bold">Address:</Text> {order.farm_address}</Text>
                  )}
                  {order.supervisor_name && (
                    <Text><Text className="font-bold">Supervisor:</Text> {order.supervisor_name}</Text>
                  )}
                  {order.supervisor_mobile && (
                    <Text><Text className="font-bold">Mobile:</Text> {order.supervisor_mobile}</Text>
                  )}
                </View>
              )}

              <View className="flex-row gap-3 mt-4">
                <Button
                  className="flex-1"
                  onPress={async () => {
                    await fetch(
                      `${API_BASE_URL}/orders/${order.order_number}/accept-pickup-date`,
                      { method: "PATCH" }
                    );
                    setOrder({ ...order, pickup_status: "accepted" });
                  }}
                >
                  Accept Date
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => setShowRescheduleBox(true)}
                >
                  Request New Date
                </Button>
              </View>

              {showRescheduleBox && (
                <View className="mt-4">
                  <TextInput
                    placeholder="Enter reason for reschedule..."
                    value={rescheduleReason}
                    onChangeText={setRescheduleReason}
                    className="border rounded p-2 mb-3"
                    multiline
                  />
                  <View className="flex-row gap-3">
                    <Button
                      variant="destructive"
                      disabled={!rescheduleReason}
                      onPress={async () => {
                        await fetch(
                          `${API_BASE_URL}/orders/${order.order_number}/request-reschedule`,
                          {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ reason: rescheduleReason })
                          }
                        );
                        setOrder({
                          ...order,
                          pickup_status: "reschedule_requested",
                          reschedule_reason: rescheduleReason
                        });
                        setShowRescheduleBox(false);
                        setRescheduleReason("");
                      }}
                    >
                      Submit Request
                    </Button>
                    <Button
                      variant="ghost"
                      onPress={() => {
                        setShowRescheduleBox(false);
                        setRescheduleReason("");
                      }}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Payment Upload */}
        {order.status !== "rejected" && 
         order.payment_status !== "approved" && 
         order.status === "pending" && (
          <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
            <Card.Content className="p-6">
              {order.payment_status === "none" && (
                <>
                  <Text className="text-amber-800 mb-4">⚠ Upload payment proof</Text>
                  <Button onPress={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Select File"}
                  </Button>
                </>
              )}
              {order.payment_status === "uploaded" && (
                <Text className="text-amber-800">📤 Waiting for admin approval</Text>
              )}
              {order.payment_status === "rejected" && (
                <>
                  <Text className="text-amber-800 mb-4">❌ Proof rejected — upload again</Text>
                  <Button onPress={handleUpload}>Select File</Button>
                </>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Delivered */}
        {order.status === "delivered" && (
          <Card className="bg-green-50 border-l-4 border-green-500 mb-4">
            <Card.Content className="p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-green-700 font-bold text-lg">
                  📦 Order delivered successfully
                </Text>
                {order.delivered_at && (
                  <Text className="text-green-600">
                    📅 {new Date(order.delivered_at).toLocaleDateString("en-IN")}
                  </Text>
                )}
              </View>

              {(order.farm_name || order.farm_address || order.supervisor_name) && (
                <View className="bg-white/70 p-4 rounded">
                  <Text className="font-bold mb-2">📍 Pickup Details</Text>
                  {order.farm_name && (
                    <Text><Text className="font-medium">Farm:</Text> {order.farm_name}</Text>
                  )}
                  {order.farm_address && (
                    <Text><Text className="font-medium">Address:</Text> {order.farm_address}</Text>
                  )}
                  {order.supervisor_name && (
                    <Text><Text className="font-medium">Supervisor:</Text> {order.supervisor_name}</Text>
                  )}
                  {order.supervisor_mobile && (
                    <Text><Text className="font-medium">Mobile:</Text> {order.supervisor_mobile}</Text>
                  )}
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Rejected */}
        {order.status === "rejected" && (
          <Card className="bg-red-50 border-l-4 border-red-500 mb-4">
            <Card.Content className="p-6">
              <Text className="text-red-700 font-bold mb-2">❌ Order Cancelled</Text>
              <Text className="text-red-600">
                This order has been rejected by Hindustan Proteins.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
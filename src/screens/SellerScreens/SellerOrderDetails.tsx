// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import { Header } from '../../components/layout/Header';
// import { Badge } from '../../components/ui/toaster';
// import { Card } from '../../components/ui/card';
// import { Button } from '../../components/ui/button';
// import {
//   Truck,
//   Package,
//   MapPin,
//   Hash,
//   Scale,
//   IndianRupee,
//   Calendar,
//   User,
//   Home,
//   Phone,
// } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const statusStyles: Record<string, string> = {
//   pending: "bg-amber-500 text-black",
//   confirmed: "bg-emerald-600 text-white",
//   dispatched: "bg-blue-600 text-white",
//   delivered: "bg-green-700 text-white",
//   rejected: "bg-red-600 text-white"
// };

// export const SellerOrderDetails = () => {
//   const route = useRoute();
//   const { orderNumber } = route.params as { orderNumber: string };
//   const [order, setOrder] = useState<any>(null);
//   const [pickupDate, setPickupDate] = useState(new Date());
//   const [pickupTime, setPickupTime] = useState("");
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [farmName, setFarmName] = useState("");
//   const [farmAddress, setFarmAddress] = useState("");
//   const [supervisorName, setSupervisorName] = useState("");
//   const [supervisorMobile, setSupervisorMobile] = useState("");

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderNumber]);

//   useEffect(() => {
//     if (order) {
//       setFarmName(order.farm_name || "");
//       setFarmAddress(order.farm_address || "");
//       setSupervisorName(order.supervisor_name || "");
//       setSupervisorMobile(order.supervisor_mobile || "");
//     }
//   }, [order]);

//   const fetchOrderDetails = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/details/${orderNumber}`);
//       const data = await res.json();
//       setOrder(data);
//     } catch (err) {
//       console.error("Failed to fetch order details");
//     }
//   };

//   const schedulePickup = async () => {
//     try {
//       const formattedDate = pickupDate.toISOString().split('T')[0];
//       const finalTime = `${pickupTime}`;

//       await fetch(
//         `${API_BASE_URL}/orders/${order.order_number}/schedule-pickup`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             pickup_date: formattedDate,
//             pickup_time: finalTime,
//             farm_name: farmName,
//             farm_address: farmAddress,
//             supervisor_name: supervisorName,
//             supervisor_mobile: supervisorMobile
//           })
//         }
//       );

//       setOrder({
//         ...order,
//         pickup_date: formattedDate,
//         pickup_time: finalTime,
//         pickup_status: "scheduled",
//         farm_name: farmName,
//         farm_address: farmAddress,
//         supervisor_name: supervisorName,
//         supervisor_mobile: supervisorMobile
//       });

//       Alert.alert("Success", "Pickup scheduled successfully");
//     } catch (err) {
//       Alert.alert("Error", "Failed to schedule pickup");
//     }
//   };

//   if (!order) {
//     return (
//       <SafeAreaView className="flex-1 bg-muted/30">
//         <Header />
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#2B6B3F" />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const flowStage =
//     order.status === "delivered" ? "delivered" :
//     order.pickup_status === "picked_up" ? "picked_up" : 
//     order.seller_status === "rejected" ? "seller_rejected" :
//     order.pickup_status === "accepted" ? "pickup_accepted" :
//     order.pickup_status === "scheduled" ? "scheduled" :
//     order.pickup_status === "reschedule_requested" ? "reschedule_requested" :
//     order.seller_status === "accepted" ? "seller_accepted" :
//     order.seller_status === "pending" ? "seller_pending" :
//     order.payment_status !== "approved" ? "waiting_payment" : null;

//   return (
//     <SafeAreaView className="flex-1 bg-muted/20">
//       <Header />

//       <ScrollView className="flex-1 px-4 py-6">
//         {/* Header */}
//         <View className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] rounded-2xl p-6 mb-6">
//           <Badge className="mb-3 bg-[#f5b82e] self-start">Order Details</Badge>
//           <Text className="text-3xl font-bold text-white">Order Overview</Text>
//           <Text className="text-white/80 mt-1">Complete order information</Text>
//         </View>

//         {/* Order Header Card */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <View className="flex-row justify-between items-center">
//               <View>
//                 <View className="flex-row items-center">
//                   <Hash size={16} color="#fff" />
//                   <Text className="text-white/70 ml-1">Order Number</Text>
//                 </View>
//                 <Text className="text-2xl font-bold text-white mt-1">
//                   {order.order_number}
//                 </Text>
//               </View>
//               <View className={`px-4 py-1 rounded-full ${statusStyles[order.status]}`}>
//                 <Text className="font-semibold capitalize">{order.status}</Text>
//               </View>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Buyer Info */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <View className="flex-row items-center mb-4">
//               <User size={20} color="#f5b82e" />
//               <Text className="text-white font-semibold ml-2">Buyer Information</Text>
//             </View>

//             <View className="space-y-3">
//               <View className="flex-row">
//                 <Text className="text-white/70 w-32">Business Name</Text>
//                 <Text className="text-white flex-1">{order.trader_name}</Text>
//               </View>
//               <View className="flex-row">
//                 <Text className="text-white/70 w-32">Buyer Name</Text>
//                 <Text className="text-white flex-1">{order.proprietor_name}</Text>
//               </View>
//               <View className="flex-row">
//                 <Text className="text-white/70 w-32">Mobile</Text>
//                 <Text className="text-white flex-1">{order.proprietor_mobile}</Text>
//               </View>
//               {order.address_line1 && (
//                 <View className="flex-row">
//                   <Text className="text-white/70 w-32">Address</Text>
//                   <Text className="text-white flex-1">
//                     {order.address_line1}
//                     {order.address_line2 && `, ${order.address_line2}`}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Product Details */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <View className="flex-row items-center mb-4">
//               <Package size={20} color="#f5b82e" />
//               <Text className="text-white font-semibold ml-2">Product Details</Text>
//             </View>

//             <View className="flex-row flex-wrap gap-4">
//               <View className="w-1/2">
//                 <Text className="text-white/70">Product</Text>
//                 <Text className="text-white font-medium">{order.bird_type}</Text>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-white/70">Weight Range</Text>
//                 <View className="flex-row items-center">
//                   <Scale size={16} color="#f5b82e" />
//                   <Text className="text-white ml-1">{order.weight_range}</Text>
//                 </View>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-white/70">Quantity</Text>
//                 <Text className="text-white">{order.quantity}</Text>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-white/70">Total Amount</Text>
//                 <View className="flex-row items-center">
//                   <IndianRupee size={16} color="#f5b82e" />
//                   <Text className="text-white ml-1 font-bold">
//                     {Number(order.total_amount).toLocaleString()}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Delivery Info */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <View className="flex-row items-center mb-4">
//               <Truck size={20} color="#f5b82e" />
//               <Text className="text-white font-semibold ml-2">Delivery Info</Text>
//             </View>

//             <View className="flex-row flex-wrap gap-4">
//               <View className="w-1/2">
//                 <View className="flex-row items-center">
//                   <MapPin size={16} color="#f5b82e" />
//                   <Text className="text-white/70 ml-1">Taluk</Text>
//                 </View>
//                 <Text className="text-white">{order.taluk}</Text>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-white/70">Vehicle Number</Text>
//                 <Text className="text-white">{order.vehicle_number}</Text>
//               </View>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Flow Status Cards */}
//         {flowStage === "waiting_payment" && (
//           <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-amber-800">⏳ Waiting for payment verification</Text>
//             </Card.Content>
//           </Card>
//         )}

//         {flowStage === "seller_pending" && (
//           <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-blue-700">📩 New order assigned — please accept</Text>
//             </Card.Content>
//           </Card>
//         )}

//         {flowStage === "seller_accepted" && !order.pickup_date && (
//           <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
//             <Card.Content className="p-6 space-y-4">
//               <Text className="text-amber-800 font-medium">📅 Schedule pickup</Text>

//               {/* Date Picker */}
//               <TouchableOpacity
//                 onPress={() => setShowDatePicker(true)}
//                 className="border rounded p-3 bg-white"
//               >
//                 <Text>{pickupDate.toLocaleDateString()}</Text>
//               </TouchableOpacity>

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={pickupDate}
//                   mode="date"
//                   onChange={(event, selectedDate) => {
//                     setShowDatePicker(false);
//                     if (selectedDate) setPickupDate(selectedDate);
//                   }}
//                 />
//               )}

//               {/* Time Input */}
//               <TextInput
//                 placeholder="Pickup time (e.g., 10:00 AM)"
//                 value={pickupTime}
//                 onChangeText={setPickupTime}
//                 className="border rounded p-3 bg-white"
//               />

//               {/* Farm Details */}
//               <TextInput
//                 placeholder="Farm/Poultry Name"
//                 value={farmName}
//                 onChangeText={setFarmName}
//                 className="border rounded p-3 bg-white"
//               />

//               <TextInput
//                 placeholder="Farm Address"
//                 value={farmAddress}
//                 onChangeText={setFarmAddress}
//                 className="border rounded p-3 bg-white"
//                 multiline
//               />

//               <TextInput
//                 placeholder="Supervisor Name"
//                 value={supervisorName}
//                 onChangeText={setSupervisorName}
//                 className="border rounded p-3 bg-white"
//               />

//               <TextInput
//                 placeholder="Supervisor Mobile"
//                 value={supervisorMobile}
//                 onChangeText={setSupervisorMobile}
//                 keyboardType="phone-pad"
//                 className="border rounded p-3 bg-white"
//               />

//               <Button
//                 onPress={schedulePickup}
//                 disabled={!pickupDate || !pickupTime}
//               >
//                 Schedule Pickup
//               </Button>
//             </Card.Content>
//           </Card>
//         )}

//         {flowStage === "scheduled" && (
//           <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-blue-700 font-semibold mb-2">📅 Pickup Scheduled</Text>
//               <Text className="text-blue-700">
//                 {new Date(order.pickup_date).toLocaleDateString("en-IN")}
//                 {order.pickup_time && ` at ${order.pickup_time}`}
//               </Text>
//             </Card.Content>
//           </Card>
//         )}

//         {flowStage === "pickup_accepted" && (
//           <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-blue-700 font-semibold mb-2">
//                 ✅ Buyer confirmed pickup date
//               </Text>
//               <Button
//                 onPress={async () => {
//                   await fetch(
//                     `${API_BASE_URL}/orders/${order.order_number}/accept-pickup`,
//                     { method: "PATCH" }
//                   );
//                   setOrder({ ...order, pickup_status: "picked_up" });
//                 }}
//               >
//                 Mark Pickup Completed
//               </Button>
//             </Card.Content>
//           </Card>
//         )}

//         {flowStage === "delivered" && (
//           <Card className="bg-green-50 border-l-4 border-green-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-green-700 font-semibold">📦 Order delivered successfully</Text>
//             </Card.Content>
//           </Card>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
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

const statusStyles: Record<string, { backgroundColor: string; color: string }> = {
  pending: { backgroundColor: '#f59e0b', color: '#000' },
  confirmed: { backgroundColor: '#059669', color: '#fff' },
  dispatched: { backgroundColor: '#2563eb', color: '#fff' },
  delivered: { backgroundColor: '#15803d', color: '#fff' },
  rejected: { backgroundColor: '#dc2626', color: '#fff' }
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
      <SafeAreaView style={styles.loadingContainer}>
        <Header />
        <View style={styles.loadingContent}>
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
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerGradient}>
          <View style={styles.badgeWrapper}>
            <Badge>Order Details</Badge>
          </View>
          <Text style={styles.headerTitle}>Order Overview</Text>
          <Text style={styles.headerSubtitle}>Complete order information</Text>
        </View>

        {/* Order Header Card */}
        <View style={styles.orderHeaderCard}>
          <View style={styles.cardContent}>
            <View style={styles.orderHeaderRow}>
              <View>
                <View style={styles.orderNumberRow}>
                  <Hash size={16} color="#fff" />
                  <Text style={styles.orderNumberLabel}>Order Number</Text>
                </View>
                <Text style={styles.orderNumber}>
                  {order.order_number}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: statusStyles[order.status]?.backgroundColor }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: statusStyles[order.status]?.color }
                ]}>
                  {order.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Buyer Info */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <User size={20} color="#f5b82e" />
              <Text style={styles.sectionTitle}>Buyer Information</Text>
            </View>

            <View style={styles.infoRows}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Business Name</Text>
                <Text style={styles.infoValue}>{order.trader_name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Buyer Name</Text>
                <Text style={styles.infoValue}>{order.proprietor_name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mobile</Text>
                <Text style={styles.infoValue}>{order.proprietor_mobile}</Text>
              </View>
              {order.address_line1 && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>
                    {order.address_line1}
                    {order.address_line2 && `, ${order.address_line2}`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <Package size={20} color="#f5b82e" />
              <Text style={styles.sectionTitle}>Product Details</Text>
            </View>

            <View style={styles.productGrid}>
              <View style={styles.productGridItem}>
                <Text style={styles.productLabel}>Product</Text>
                <Text style={styles.productValue}>{order.bird_type}</Text>
              </View>
              <View style={styles.productGridItem}>
                <Text style={styles.productLabel}>Weight Range</Text>
                <View style={styles.weightRow}>
                  <Scale size={16} color="#f5b82e" />
                  <Text style={styles.weightText}>{order.weight_range}</Text>
                </View>
              </View>
              <View style={styles.productGridItem}>
                <Text style={styles.productLabel}>Quantity</Text>
                <Text style={styles.productValue}>{order.quantity}</Text>
              </View>
              <View style={styles.productGridItem}>
                <Text style={styles.productLabel}>Total Amount</Text>
                <View style={styles.amountRow}>
                  <IndianRupee size={16} color="#f5b82e" />
                  <Text style={styles.amountText}>
                    {Number(order.total_amount).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <Truck size={20} color="#f5b82e" />
              <Text style={styles.sectionTitle}>Delivery Info</Text>
            </View>

            <View style={styles.deliveryGrid}>
              <View style={styles.deliveryGridItem}>
                <View style={styles.talukRow}>
                  <MapPin size={16} color="#f5b82e" />
                  <Text style={styles.talukLabel}>Taluk</Text>
                </View>
                <Text style={styles.talukValue}>{order.taluk}</Text>
              </View>
              <View style={styles.deliveryGridItem}>
                <Text style={styles.vehicleLabel}>Vehicle Number</Text>
                <Text style={styles.vehicleValue}>{order.vehicle_number}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Flow Status Cards */}
        {flowStage === "waiting_payment" && (
          <View style={styles.waitingPaymentCard}>
            <Text style={styles.waitingPaymentText}>⏳ Waiting for payment verification</Text>
          </View>
        )}

        {flowStage === "seller_pending" && (
          <View style={styles.sellerPendingCard}>
            <Text style={styles.sellerPendingText}>📩 New order assigned — please accept</Text>
          </View>
        )}

        {flowStage === "seller_accepted" && !order.pickup_date && (
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleTitle}>📅 Schedule pickup</Text>

              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
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
                style={styles.input}
              />

              {/* Farm Details */}
              <TextInput
                placeholder="Farm/Poultry Name"
                value={farmName}
                onChangeText={setFarmName}
                style={styles.input}
              />

              <TextInput
                placeholder="Farm Address"
                value={farmAddress}
                onChangeText={setFarmAddress}
                style={[styles.input, styles.textArea]}
                multiline
              />

              <TextInput
                placeholder="Supervisor Name"
                value={supervisorName}
                onChangeText={setSupervisorName}
                style={styles.input}
              />

              <TextInput
                placeholder="Supervisor Mobile"
                value={supervisorMobile}
                onChangeText={setSupervisorMobile}
                keyboardType="phone-pad"
                style={styles.input}
              />

              <Button
                onPress={schedulePickup}
                disabled={!pickupDate || !pickupTime}
              >
                Schedule Pickup
              </Button>
            </View>
          </View>
        )}

        {flowStage === "scheduled" && (
          <View style={styles.scheduledCard}>
            <View style={styles.scheduledContent}>
              <Text style={styles.scheduledTitle}>📅 Pickup Scheduled</Text>
              <Text style={styles.scheduledText}>
                {new Date(order.pickup_date).toLocaleDateString("en-IN")}
                {order.pickup_time && ` at ${order.pickup_time}`}
              </Text>
            </View>
          </View>
        )}

        {flowStage === "pickup_accepted" && (
          <View style={styles.pickupAcceptedCard}>
            <View style={styles.pickupAcceptedContent}>
              <Text style={styles.pickupAcceptedTitle}>
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
            </View>
          </View>
        )}

        {flowStage === "delivered" && (
          <View style={styles.deliveredCard}>
            <View style={styles.deliveredContent}>
              <Text style={styles.deliveredText}>📦 Order delivered successfully</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerGradient: {
    backgroundColor: '#1f4d36',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  badgeWrapper: {
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  orderHeaderCard: {
    backgroundColor: '#1f4d36',
    borderRadius: 12,
    marginBottom: 16,
  },
  cardContent: {
    padding: 24,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumberLabel: {
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  infoCard: {
    backgroundColor: '#1f4d36',
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  infoRows: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.7)',
    width: 120,
  },
  infoValue: {
    color: '#fff',
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productGridItem: {
    width: '45%',
  },
  productLabel: {
    color: 'rgba(255,255,255,0.7)',
  },
  productValue: {
    color: '#fff',
    fontWeight: '500',
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightText: {
    color: '#fff',
    marginLeft: 4,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  deliveryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  deliveryGridItem: {
    width: '45%',
  },
  talukRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  talukLabel: {
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  talukValue: {
    color: '#fff',
  },
  vehicleLabel: {
    color: 'rgba(255,255,255,0.7)',
  },
  vehicleValue: {
    color: '#fff',
  },
  waitingPaymentCard: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 16,
    padding: 24,
    borderRadius: 8,
  },
  waitingPaymentText: {
    color: '#b45309',
  },
  sellerPendingCard: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginBottom: 16,
    padding: 24,
    borderRadius: 8,
  },
  sellerPendingText: {
    color: '#1e40af',
  },
  scheduleCard: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 16,
    borderRadius: 8,
  },
  scheduleContent: {
    padding: 24,
    gap: 16,
  },
  scheduleTitle: {
    color: '#b45309',
    fontWeight: '500',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
  },
  scheduledCard: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginBottom: 16,
    borderRadius: 8,
  },
  scheduledContent: {
    padding: 24,
  },
  scheduledTitle: {
    color: '#1e40af',
    fontWeight: '600',
    marginBottom: 8,
  },
  scheduledText: {
    color: '#1e40af',
  },
  pickupAcceptedCard: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginBottom: 16,
    borderRadius: 8,
  },
  pickupAcceptedContent: {
    padding: 24,
    gap: 16,
  },
  pickupAcceptedTitle: {
    color: '#1e40af',
    fontWeight: '600',
    marginBottom: 8,
  },
  deliveredCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    marginBottom: 16,
    borderRadius: 8,
  },
  deliveredContent: {
    padding: 24,
  },
  deliveredText: {
    color: '#047857',
    fontWeight: '600',
  },
});
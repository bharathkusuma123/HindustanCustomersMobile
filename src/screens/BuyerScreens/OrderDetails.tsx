// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import { Header } from '../../components/layout/Header';
// import { Badge } from '../../components/ui/badge';
// import { Card } from '../../components/ui/card';
// import { Button } from '../../components/ui/button';
// import {
//   Truck,
//   Package,
//   MapPin,
//   Hash,
//   Scale,
//   Calendar,
// } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import * as DocumentPicker from 'expo-document-picker';

// const statusStyles: Record<string, { label: string; variant: string; className: string }> = {
//   pending: {
//     label: "Pending",
//     variant: "secondary",
//     className: "bg-amber-100 text-amber-800"
//   },
//   confirmed: {
//     label: "Confirmed",
//     variant: "default",
//     className: "bg-emerald-600 text-white"
//   },
//   delivered: {
//     label: "Delivered",
//     variant: "default",
//     className: "bg-green-700 text-white"
//   },
//   rejected: {
//     label: "Rejected",
//     variant: "destructive",
//     className: "bg-red-600 text-white"
//   }
// };

// export const OrderDetails = () => {
//   const route = useRoute();
//   const { orderNumber } = route.params as { orderNumber: string };
//   const [order, setOrder] = useState<any>(null);
//   const [uploading, setUploading] = useState(false);
//   const [rescheduleReason, setRescheduleReason] = useState("");
//   const [showRescheduleBox, setShowRescheduleBox] = useState(false);

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderNumber]);

//   const fetchOrderDetails = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/details/${orderNumber}`);
//       const data = await res.json();
//       setOrder({
//         ...data,
//         payment_status: data.payment_status || (data.payment_proof ? "uploaded" : "none"),
//       });
//     } catch (err) {
//       console.error("Failed to fetch order details");
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['image/*', 'application/pdf'],
//       });

//       if (result.canceled) return;

//       const file = result.assets[0];
//       const formData = new FormData();
//       formData.append('proof', {
//         uri: file.uri,
//         type: file.mimeType,
//         name: file.name,
//       } as any);

//       setUploading(true);
//       const res = await fetch(
//         `${API_BASE_URL}/orders/upload-proof/${order.order_number}`,
//         { method: "POST", body: formData }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setOrder(data.order);
//         Alert.alert("Success", "Payment proof uploaded");
//       }
//     } catch (err) {
//       Alert.alert("Error", "Upload failed");
//     } finally {
//       setUploading(false);
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

//   return (
//     <SafeAreaView className="flex-1 bg-muted/20">
//       <Header />

//       <ScrollView className="flex-1 px-4 py-6">
//         {/* Header */}
//         <View className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] rounded-2xl p-6 mb-6">
//           <Badge className="mb-3 bg-[#f5b82e] self-start">Order Details</Badge>
//           <Text className="text-3xl font-bold text-white">Track Your Order</Text>
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
//               <Badge
//                 variant={statusStyles[order.status].variant}
//                 className={statusStyles[order.status].className}
//               >
//                 {statusStyles[order.status].label}
//               </Badge>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Product Card */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <Text className="text-lg font-semibold text-white mb-4">Product Details</Text>
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
//                 <View className="flex-row items-center">
//                   <Package size={16} color="#f5b82e" />
//                   <Text className="text-white ml-1">{order.quantity}</Text>
//                 </View>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-white/70">Total Amount</Text>
//                 <Text className="text-white font-bold">
//                   ₹{Number(order.total_amount).toLocaleString()}
//                 </Text>
//               </View>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Delivery Card */}
//         <Card className="bg-gradient-to-br from-[#1f4d36] to-[#173b2a] mb-4">
//           <Card.Content className="p-6">
//             <Text className="text-lg font-semibold text-white mb-4">Delivery Info</Text>
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

//         {/* Pickup Flow */}
//         {order.pickup_status === "scheduled" && (
//           <Card className="bg-blue-50 border-l-4 border-blue-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-blue-700">
//                 📅 Pickup scheduled on{' '}
//                 <Text className="font-bold">
//                   {new Date(order.pickup_date).toLocaleDateString("en-IN")}
//                   {order.pickup_time && ` at ${order.pickup_time}`}
//                 </Text>
//               </Text>

//               {(order.farm_name || order.farm_address || order.supervisor_name) && (
//                 <View className="bg-white/50 p-3 rounded mt-3">
//                   {order.farm_name && (
//                     <Text><Text className="font-bold">Farm:</Text> {order.farm_name}</Text>
//                   )}
//                   {order.farm_address && (
//                     <Text><Text className="font-bold">Address:</Text> {order.farm_address}</Text>
//                   )}
//                   {order.supervisor_name && (
//                     <Text><Text className="font-bold">Supervisor:</Text> {order.supervisor_name}</Text>
//                   )}
//                   {order.supervisor_mobile && (
//                     <Text><Text className="font-bold">Mobile:</Text> {order.supervisor_mobile}</Text>
//                   )}
//                 </View>
//               )}

//               <View className="flex-row gap-3 mt-4">
//                 <Button
//                   className="flex-1"
//                   onPress={async () => {
//                     await fetch(
//                       `${API_BASE_URL}/orders/${order.order_number}/accept-pickup-date`,
//                       { method: "PATCH" }
//                     );
//                     setOrder({ ...order, pickup_status: "accepted" });
//                   }}
//                 >
//                   Accept Date
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex-1"
//                   onPress={() => setShowRescheduleBox(true)}
//                 >
//                   Request New Date
//                 </Button>
//               </View>

//               {showRescheduleBox && (
//                 <View className="mt-4">
//                   <TextInput
//                     placeholder="Enter reason for reschedule..."
//                     value={rescheduleReason}
//                     onChangeText={setRescheduleReason}
//                     className="border rounded p-2 mb-3"
//                     multiline
//                   />
//                   <View className="flex-row gap-3">
//                     <Button
//                       variant="destructive"
//                       disabled={!rescheduleReason}
//                       onPress={async () => {
//                         await fetch(
//                           `${API_BASE_URL}/orders/${order.order_number}/request-reschedule`,
//                           {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({ reason: rescheduleReason })
//                           }
//                         );
//                         setOrder({
//                           ...order,
//                           pickup_status: "reschedule_requested",
//                           reschedule_reason: rescheduleReason
//                         });
//                         setShowRescheduleBox(false);
//                         setRescheduleReason("");
//                       }}
//                     >
//                       Submit Request
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onPress={() => {
//                         setShowRescheduleBox(false);
//                         setRescheduleReason("");
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   </View>
//                 </View>
//               )}
//             </Card.Content>
//           </Card>
//         )}

//         {/* Payment Upload */}
//         {order.status !== "rejected" && 
//          order.payment_status !== "approved" && 
//          order.status === "pending" && (
//           <Card className="bg-amber-50 border-l-4 border-amber-500 mb-4">
//             <Card.Content className="p-6">
//               {order.payment_status === "none" && (
//                 <>
//                   <Text className="text-amber-800 mb-4">⚠ Upload payment proof</Text>
//                   <Button onPress={handleUpload} disabled={uploading}>
//                     {uploading ? "Uploading..." : "Select File"}
//                   </Button>
//                 </>
//               )}
//               {order.payment_status === "uploaded" && (
//                 <Text className="text-amber-800">📤 Waiting for admin approval</Text>
//               )}
//               {order.payment_status === "rejected" && (
//                 <>
//                   <Text className="text-amber-800 mb-4">❌ Proof rejected — upload again</Text>
//                   <Button onPress={handleUpload}>Select File</Button>
//                 </>
//               )}
//             </Card.Content>
//           </Card>
//         )}

//         {/* Delivered */}
//         {order.status === "delivered" && (
//           <Card className="bg-green-50 border-l-4 border-green-500 mb-4">
//             <Card.Content className="p-6">
//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-green-700 font-bold text-lg">
//                   📦 Order delivered successfully
//                 </Text>
//                 {order.delivered_at && (
//                   <Text className="text-green-600">
//                     📅 {new Date(order.delivered_at).toLocaleDateString("en-IN")}
//                   </Text>
//                 )}
//               </View>

//               {(order.farm_name || order.farm_address || order.supervisor_name) && (
//                 <View className="bg-white/70 p-4 rounded">
//                   <Text className="font-bold mb-2">📍 Pickup Details</Text>
//                   {order.farm_name && (
//                     <Text><Text className="font-medium">Farm:</Text> {order.farm_name}</Text>
//                   )}
//                   {order.farm_address && (
//                     <Text><Text className="font-medium">Address:</Text> {order.farm_address}</Text>
//                   )}
//                   {order.supervisor_name && (
//                     <Text><Text className="font-medium">Supervisor:</Text> {order.supervisor_name}</Text>
//                   )}
//                   {order.supervisor_mobile && (
//                     <Text><Text className="font-medium">Mobile:</Text> {order.supervisor_mobile}</Text>
//                   )}
//                 </View>
//               )}
//             </Card.Content>
//           </Card>
//         )}

//         {/* Rejected */}
//         {order.status === "rejected" && (
//           <Card className="bg-red-50 border-l-4 border-red-500 mb-4">
//             <Card.Content className="p-6">
//               <Text className="text-red-700 font-bold mb-2">❌ Order Cancelled</Text>
//               <Text className="text-red-600">
//                 This order has been rejected by Hindustan Proteins.
//               </Text>
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
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
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

const statusStyles: Record<string, { label: string; variant: string; colors: { bg: string; text: string } }> = {
  pending: {
    label: "Pending",
    variant: "secondary",
    colors: { bg: '#fef3c7', text: '#b45309' }
  },
  confirmed: {
    label: "Confirmed",
    variant: "default",
    colors: { bg: '#059669', text: '#fff' }
  },
  delivered: {
    label: "Delivered",
    variant: "default",
    colors: { bg: '#15803d', text: '#fff' }
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    colors: { bg: '#dc2626', text: '#fff' }
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
      <SafeAreaView style={styles.loadingContainer}>
        <Header />
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#2B6B3F" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerGradient}>
          <View style={styles.badgeWrapper}>
            <Badge>Order Details</Badge>
          </View>
          <Text style={styles.headerTitle}>Track Your Order</Text>
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
                { backgroundColor: statusStyles[order.status]?.colors.bg }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: statusStyles[order.status]?.colors.text }
                ]}>
                  {statusStyles[order.status]?.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Product Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Product Details</Text>
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
                <View style={styles.quantityRow}>
                  <Package size={16} color="#f5b82e" />
                  <Text style={styles.quantityText}>{order.quantity}</Text>
                </View>
              </View>
              <View style={styles.productGridItem}>
                <Text style={styles.productLabel}>Total Amount</Text>
                <Text style={styles.amountText}>
                  ₹{Number(order.total_amount).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Delivery Info</Text>
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

        {/* Pickup Flow */}
        {order.pickup_status === "scheduled" && (
          <View style={styles.pickupCard}>
            <View style={styles.pickupContent}>
              <Text style={styles.pickupText}>
                📅 Pickup scheduled on{' '}
                <Text style={styles.pickupBold}>
                  {new Date(order.pickup_date).toLocaleDateString("en-IN")}
                  {order.pickup_time && ` at ${order.pickup_time}`}
                </Text>
              </Text>

              {(order.farm_name || order.farm_address || order.supervisor_name) && (
                <View style={styles.pickupDetails}>
                  {order.farm_name && (
                    <Text style={styles.pickupDetail}>
                      <Text style={styles.pickupDetailBold}>Farm:</Text> {order.farm_name}
                    </Text>
                  )}
                  {order.farm_address && (
                    <Text style={styles.pickupDetail}>
                      <Text style={styles.pickupDetailBold}>Address:</Text> {order.farm_address}
                    </Text>
                  )}
                  {order.supervisor_name && (
                    <Text style={styles.pickupDetail}>
                      <Text style={styles.pickupDetailBold}>Supervisor:</Text> {order.supervisor_name}
                    </Text>
                  )}
                  {order.supervisor_mobile && (
                    <Text style={styles.pickupDetail}>
                      <Text style={styles.pickupDetailBold}>Mobile:</Text> {order.supervisor_mobile}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.pickupActions}>
                <Button
                  style={styles.flex1}
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
                  style={styles.flex1}
                  onPress={() => setShowRescheduleBox(true)}
                >
                  Request New Date
                </Button>
              </View>

              {showRescheduleBox && (
                <View style={styles.rescheduleBox}>
                  <TextInput
                    placeholder="Enter reason for reschedule..."
                    value={rescheduleReason}
                    onChangeText={setRescheduleReason}
                    style={styles.rescheduleInput}
                    multiline
                  />
                  <View style={styles.rescheduleActions}>
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
            </View>
          </View>
        )}

        {/* Payment Upload */}
        {order.status !== "rejected" && 
         order.payment_status !== "approved" && 
         order.status === "pending" && (
          <View style={styles.paymentCard}>
            <View style={styles.paymentContent}>
              {order.payment_status === "none" && (
                <>
                  <Text style={styles.paymentWarning}>⚠ Upload payment proof</Text>
                  <Button onPress={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Select File"}
                  </Button>
                </>
              )}
              {order.payment_status === "uploaded" && (
                <Text style={styles.paymentInfo}>📤 Waiting for admin approval</Text>
              )}
              {order.payment_status === "rejected" && (
                <>
                  <Text style={styles.paymentWarning}>❌ Proof rejected — upload again</Text>
                  <Button onPress={handleUpload}>Select File</Button>
                </>
              )}
            </View>
          </View>
        )}

        {/* Delivered */}
        {order.status === "delivered" && (
          <View style={styles.deliveredCard}>
            <View style={styles.deliveredContent}>
              <View style={styles.deliveredHeader}>
                <Text style={styles.deliveredTitle}>
                  📦 Order delivered successfully
                </Text>
                {order.delivered_at && (
                  <Text style={styles.deliveredDate}>
                    📅 {new Date(order.delivered_at).toLocaleDateString("en-IN")}
                  </Text>
                )}
              </View>

              {(order.farm_name || order.farm_address || order.supervisor_name) && (
                <View style={styles.deliveredDetails}>
                  <Text style={styles.deliveredDetailsTitle}>📍 Pickup Details</Text>
                  {order.farm_name && (
                    <Text style={styles.deliveredDetail}>
                      <Text style={styles.deliveredDetailBold}>Farm:</Text> {order.farm_name}
                    </Text>
                  )}
                  {order.farm_address && (
                    <Text style={styles.deliveredDetail}>
                      <Text style={styles.deliveredDetailBold}>Address:</Text> {order.farm_address}
                    </Text>
                  )}
                  {order.supervisor_name && (
                    <Text style={styles.deliveredDetail}>
                      <Text style={styles.deliveredDetailBold}>Supervisor:</Text> {order.supervisor_name}
                    </Text>
                  )}
                  {order.supervisor_mobile && (
                    <Text style={styles.deliveredDetail}>
                      <Text style={styles.deliveredDetailBold}>Mobile:</Text> {order.supervisor_mobile}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Rejected */}
        {order.status === "rejected" && (
          <View style={styles.rejectedCard}>
            <View style={styles.rejectedContent}>
              <Text style={styles.rejectedTitle}>❌ Order Cancelled</Text>
              <Text style={styles.rejectedMessage}>
                This order has been rejected by Hindustan Proteins.
              </Text>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    marginLeft: 4,
  },
  amountText: {
    color: '#fff',
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
  pickupCard: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginBottom: 16,
    borderRadius: 8,
  },
  pickupContent: {
    padding: 24,
  },
  pickupText: {
    color: '#1e40af',
  },
  pickupBold: {
    fontWeight: 'bold',
  },
  pickupDetails: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  pickupDetail: {
    color: '#333',
  },
  pickupDetailBold: {
    fontWeight: 'bold',
  },
  pickupActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  flex1: {
    flex: 1,
  },
  rescheduleBox: {
    marginTop: 16,
  },
  rescheduleInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  rescheduleActions: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentCard: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 16,
    borderRadius: 8,
  },
  paymentContent: {
    padding: 24,
  },
  paymentWarning: {
    color: '#b45309',
    marginBottom: 16,
  },
  paymentInfo: {
    color: '#b45309',
  },
  deliveredCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    marginBottom: 16,
    borderRadius: 8,
  },
  deliveredContent: {
    padding: 24,
  },
  deliveredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveredTitle: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deliveredDate: {
    color: '#166534',
  },
  deliveredDetails: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 16,
    borderRadius: 6,
  },
  deliveredDetailsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  deliveredDetail: {
    color: '#333',
  },
  deliveredDetailBold: {
    fontWeight: '500',
  },
  rejectedCard: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    marginBottom: 16,
    borderRadius: 8,
  },
  rejectedContent: {
    padding: 24,
  },
  rejectedTitle: {
    color: '#b91c1c',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  rejectedMessage: {
    color: '#b91c1c',
  },
});
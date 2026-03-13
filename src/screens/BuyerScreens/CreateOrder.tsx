import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Package, MapPin, Truck, IndianRupee, X, Plus } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

export const CreateOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const productFromNav = route.params || {};
  const isFromProduct = Boolean(productFromNav?.productId);

  const [taluks, setTaluks] = useState<string[]>([]);
  const [showTalukResults, setShowTalukResults] = useState(false);
  const [vehicles, setVehicles] = useState([""]);
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    traderName: user?.trading_name || "",
    proprietorName: user?.proprietor_name || "",
    proprietorNumber: user?.proprietor_mobile || "",
    productId: "",
    taluk: "",
    talukSearch: "",
    quantity: "1",
  });

  useEffect(() => {
    fetchProducts();
    fetchTaluks();
  }, []);

  useEffect(() => {
    if (isFromProduct && productFromNav) {
      setForm(prev => ({ ...prev, productId: productFromNav.productId }));
    }
  }, [isFromProduct, productFromNav]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  const fetchTaluks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/seller-taluks`);
      const data = await res.json();
      setTaluks(Array.isArray(data) ? data : []);
    } catch (err) {
      Alert.alert("Error", "Failed to load taluks");
    }
  };

  const activeProduct = isFromProduct
    ? productFromNav
    : products.find(p => p.id === Number(form.productId));

  const price = Number(activeProduct?.price || 0);
  const quantity = Number(form.quantity || 1);
  const totalAmount = price * quantity;

  const filteredTaluks = taluks.filter(t =>
    t?.toString().toLowerCase().includes(form.talukSearch.toLowerCase())
  );

  const handleSubmit = async () => {
    if (vehicles.every(v => !v.trim())) {
      Alert.alert("Error", "At least one vehicle number is required");
      return;
    }

    if (!activeProduct) {
      Alert.alert("Error", "Please select a product");
      return;
    }

    if (!form.taluk) {
      Alert.alert("Error", "Please select a taluk");
      return;
    }

    const payload = {
      buyer_id: user?.user_id,
      trader_name: form.traderName,
      proprietor_name: form.proprietorName,
      proprietor_mobile: form.proprietorNumber,
      vehicle_number: vehicles.filter(v => v.trim()).join(", "),
      product_id: isFromProduct ? productFromNav.productId : Number(form.productId),
      bird_type: activeProduct.name,
      weight_range: activeProduct.weight_range,
      taluk: form.taluk,
      quantity: quantity,
      price: price,
      total_amount: totalAmount,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Order failed");
        return;
      }

      Alert.alert("Success", `Order placed — ${data.order_number}`);
      setTimeout(() => {
        navigation.navigate('BuyerDashboard');
      }, 1200);
    } catch {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Badge className="mb-2 bg-[#f5b82e] self-start">
            {isFromProduct ? "Buy Now" : "New Order"}
          </Badge>
          <Text className="text-3xl font-bold text-foreground">Place Order</Text>
        </View>

        {/* Product Summary */}
        {activeProduct && (
          <View className="bg-gradient-to-r from-[#f5b82e] to-[#ffd666] rounded-2xl p-6 mb-6">
            <View className="flex-row justify-between items-center">
              <View>
                <View className="flex-row items-center">
                  <Package size={20} color="#000" />
                  <Text className="text-xl font-semibold text-black ml-2">
                    {activeProduct.name}
                  </Text>
                </View>
                <Text className="text-sm text-black/70 mt-1">
                  {activeProduct.weight_range}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-black/70">Price</Text>
                <Text className="text-3xl font-bold text-black">
                  ₹{price.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Form */}
        <View className="bg-card rounded-3xl border border-border p-6 space-y-6">
          {/* Trader Info */}
          <View>
            <Text className="text-lg font-semibold mb-4">Trader Information</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-sm text-muted-foreground mb-1">Trader Name</Text>
                <TextInput
                  value={form.traderName}
                  editable={false}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800 border border-gray-300"
                />
              </View>

              <View>
                <Text className="text-sm text-muted-foreground mb-1">Proprietor Name</Text>
                <TextInput
                  value={form.proprietorName}
                  editable={false}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800 border border-gray-300"
                />
              </View>

              <View>
                <Text className="text-sm text-muted-foreground mb-1">Mobile Number</Text>
                <TextInput
                  value={form.proprietorNumber}
                  editable={false}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800 border border-gray-300"
                />
              </View>
            </View>
          </View>

          {/* Vehicle Numbers */}
          <View>
            <Text className="text-lg font-semibold mb-4">Vehicle Numbers</Text>
            {vehicles.map((v, i) => (
              <View key={i} className="flex-row items-center gap-2 mb-2">
                <TextInput
                  value={v}
                  placeholder={`Vehicle ${i + 1} (KA01AB1234)`}
                  maxLength={10}
                  onChangeText={(text) => {
                    const value = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
                    const copy = [...vehicles];
                    copy[i] = value;
                    setVehicles(copy);
                  }}
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 border border-gray-300"
                />
                {vehicles.length > 1 && (
                  <TouchableOpacity
                    onPress={() => setVehicles(vehicles.filter((_, index) => index !== i))}
                    className="bg-red-500 p-3 rounded-xl"
                  >
                    <X size={16} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={() => setVehicles([...vehicles, ""])}
              className="flex-row items-center mt-2"
            >
              <Plus size={16} color="#f5b82e" />
              <Text className="text-[#f5b82e] ml-2">Add another vehicle</Text>
            </TouchableOpacity>
          </View>

          {/* Product Selection */}
          {!isFromProduct && (
            <View>
              <Text className="text-sm text-muted-foreground mb-1">Product Category</Text>
              <View className="border border-gray-300 rounded-xl overflow-hidden">
                <select
                  value={form.productId}
                  onChange={(e) => setForm({ ...form, productId: e.target.value })}
                  className="w-full p-3 bg-gray-50"
                >
                  <option value="">Select product</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.weight_range}
                    </option>
                  ))}
                </select>
              </View>
            </View>
          )}

          {/* Order Details */}
          <View>
            <Text className="text-lg font-semibold mb-4">Order Details</Text>
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-sm text-muted-foreground mb-1">Weight Range</Text>
                <TextInput
                  value={activeProduct?.weight_range || ""}
                  editable={false}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted-foreground mb-1">Quantity</Text>
                <TextInput
                  value={form.quantity}
                  onChangeText={(text) => setForm({ ...form, quantity: text })}
                  keyboardType="numeric"
                  className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-300"
                />
              </View>
            </View>
          </View>

          {/* Taluk Selection */}
          <View>
            <Text className="text-lg font-semibold mb-4">Delivery Location</Text>
            <View className="relative">
              <TextInput
                placeholder="Search taluk..."
                value={form.talukSearch}
                onChangeText={(text) => {
                  setForm({ ...form, talukSearch: text });
                  setShowTalukResults(true);
                }}
                className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-300 mb-2"
              />
              
              {showTalukResults && form.talukSearch && filteredTaluks.length > 0 && (
                <View className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-lg max-h-48 z-10">
                  <ScrollView>
                    {filteredTaluks.map(t => (
                      <TouchableOpacity
                        key={t}
                        onPress={() => {
                          setForm({ ...form, taluk: t, talukSearch: "" });
                          setShowTalukResults(false);
                        }}
                        className="px-4 py-2 border-b border-gray-100"
                      >
                        <Text>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View className="border border-gray-300 rounded-xl overflow-hidden">
                <select
                  value={form.taluk}
                  onChange={(e) => setForm({ ...form, taluk: e.target.value })}
                  className="w-full p-3 bg-gray-50"
                >
                  <option value="">Choose taluk</option>
                  {taluks.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </View>
            </View>
          </View>

          {/* Total Amount */}
          {activeProduct && (
            <View className="flex-row justify-between items-center bg-gray-50 rounded-2xl p-6 border border-[#f5b82e]">
              <Text className="text-gray-700 font-medium">Total Amount</Text>
              <Text className="text-3xl font-bold text-gray-800">
                ₹{totalAmount.toLocaleString()}
              </Text>
            </View>
          )}

          {/* Actions */}
          <View className="flex-row justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSubmit}
              className="bg-gradient-to-r from-[#f3b61f] to-[#e6a91a]"
            >
              <Text className="text-black font-semibold">Place Order</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
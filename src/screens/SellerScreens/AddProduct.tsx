import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Package,
  MapPin,
  IndianRupee,
  Layers,
  Pencil,
  Trash2,
  Search,
} from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

const initialFormState = {
  name: "",
  category: "",
  price: "",
  unit: "quintal",
  min_order: "",
  location: "",
  in_stock: true,
};

export const AddProduct = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [form, setForm] = useState(initialFormState);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/products/seller/${user?.user_id}?page=${page}&limit=${limit}&search=${search}`
      );
      const data = await res.json();
      setProducts(data.rows || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      seller_id: user?.user_id,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/products/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add product");
      }

      Alert.alert("Success", "Product added successfully");
      setForm(initialFormState);
      setPage(1);
      setSearch("");
      await fetchProducts();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Badge className="mb-3 self-start">Seller Panel</Badge>
          <Text className="text-3xl font-bold text-foreground">
            Add New <Text className="text-primary">Product</Text>
          </Text>
          <Text className="text-muted-foreground mt-1">
            List your product in the marketplace
          </Text>
        </View>

        {/* Form */}
        <View className="bg-card rounded-2xl border border-border p-6 mb-8">
          <Text className="text-xl font-bold mb-6">Product Details</Text>

          <View className="space-y-4">
            {/* Product Name */}
            <View>
              <Text className="text-sm font-medium mb-2">Product Name</Text>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <Package size={16} color="#666" />
                </View>
                <TextInput
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  placeholder="Premium Maize Dana"
                  className="pl-10 p-3 border border-border rounded-lg bg-background"
                />
              </View>
            </View>

            {/* Category */}
            <View>
              <Text className="text-sm font-medium mb-2">Category</Text>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <Layers size={16} color="#666" />
                </View>
                <TextInput
                  value={form.category}
                  onChangeText={(text) => setForm({ ...form, category: text })}
                  placeholder="Dana (Grains)"
                  className="pl-10 p-3 border border-border rounded-lg bg-background"
                />
              </View>
            </View>

            {/* Price & Min Order */}
            <View className="flex-row gap-4">
              <View style={{ flex: 1 }}>
                <Text className="text-sm font-medium mb-2">Price (per quintal)</Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <IndianRupee size={16} color="#666" />
                  </View>
                  <TextInput
                    value={form.price}
                    onChangeText={(text) => setForm({ ...form, price: text })}
                    placeholder="2200"
                    keyboardType="numeric"
                    className="pl-10 p-3 border border-border rounded-lg bg-background"
                  />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text className="text-sm font-medium mb-2">Min Order (quintals)</Text>
                <TextInput
                  value={form.min_order}
                  onChangeText={(text) => setForm({ ...form, min_order: text })}
                  placeholder="10"
                  keyboardType="numeric"
                  className="p-3 border border-border rounded-lg bg-background"
                />
              </View>
            </View>

            {/* Location */}
            <View>
              <Text className="text-sm font-medium mb-2">Location</Text>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <MapPin size={16} color="#666" />
                </View>
                <TextInput
                  value={form.location}
                  onChangeText={(text) => setForm({ ...form, location: text })}
                  placeholder="Pune, Maharashtra"
                  className="pl-10 p-3 border border-border rounded-lg bg-background"
                />
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onPress={() => navigation.goBack()}>
                Cancel
              </Button>
              <Button onPress={handleSubmit}>Publish Product</Button>
            </View>
          </View>
        </View>

        {/* Products Table */}
        <View>
          <Text className="text-2xl font-bold mb-4">
            Your <Text className="text-primary">Products</Text>
          </Text>

          {/* Search */}
          <View className="flex-row mb-4">
            <View className="flex-1 relative">
              <TextInput
                placeholder="Search products..."
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 rounded-lg border border-border bg-white"
              />
              <Search size={16} color="#666" className="absolute left-3 top-3" />
            </View>
          </View>

          {/* Table */}
          <View className="border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <View className="bg-muted/60 flex-row p-3">
              <Text className="flex-1 font-medium">Name</Text>
              <Text className="flex-1 font-medium">Category</Text>
              <Text className="w-20 font-medium">Price</Text>
              <Text className="w-20 font-medium text-center">Actions</Text>
            </View>

            {/* Rows */}
            {loading ? (
              <View className="p-6 items-center">
                <ActivityIndicator size="small" color="#2B6B3F" />
              </View>
            ) : (
              products.map((p) => (
                <View key={p.id} className="flex-row p-3 border-t border-border">
                  <Text className="flex-1">{p.name}</Text>
                  <Text className="flex-1">{p.category}</Text>
                  <Text className="w-20">₹{p.price}</Text>
                  <View className="w-20 flex-row justify-center gap-2">
                    <TouchableOpacity className="p-1">
                      <Pencil size={16} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1">
                      <Trash2 size={16} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {!loading && products.length === 0 && (
              <View className="p-8 items-center">
                <Package size={32} color="#666" />
                <Text className="text-muted-foreground mt-2">No products found</Text>
              </View>
            )}
          </View>

          {/* Pagination */}
          <View className="flex-row justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onPress={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page * limit >= total}
              onPress={() => setPage(page + 1)}
            >
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
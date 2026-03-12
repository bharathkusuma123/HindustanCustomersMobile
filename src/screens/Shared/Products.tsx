import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, Package, Wheat } from 'lucide-react-native';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

type Product = {
  id: number;
  name: string;
  weight_range: string;
  price: number;
  in_stock: number;
  created_at: string;
  seller_name?: string;
};

export const Products = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const isBuyer = user?.role === "BUYER";

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
    sortBy: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();

      const rows = Array.isArray(data?.rows)
        ? data.rows
        : Array.isArray(data)
        ? data
        : [];

      const sorted = [...rows].sort((a, b) => {
        const numA = Number(a.name.replace("BB", ""));
        const numB = Number(b.name.replace("BB", ""));
        return numA - numB;
      });

      setProducts(sorted);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.weight_range.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMin = !filters.minPrice || p.price >= Number(filters.minPrice);
      const matchesMax = !filters.maxPrice || p.price <= Number(filters.maxPrice);
      const matchesStock = !filters.inStockOnly || p.in_stock === 1;

      return matchesSearch && matchesMin && matchesMax && matchesStock;
    })
    .sort((a, b) => {
      if (filters.sortBy === "priceLow") return a.price - b.price;
      if (filters.sortBy === "priceHigh") return b.price - a.price;
      if (filters.sortBy === "latest")
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0;
    });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header />

      <ScrollView className="flex-1">
        {/* Hero Banner */}
        <View className="relative h-48 overflow-hidden">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538170989343-ce003278e1a3?q=80&w=1170' }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-br from-[#1f4d36]/90 to-[#173b2a]/90" />
          <View className="absolute inset-0 items-center justify-center">
            <Badge className="mb-2 bg-[#f5b82e] self-center">Verified Products</Badge>
            <Text className="text-3xl font-bold text-white">Poultry Catalog</Text>
          </View>
        </View>

        <View className="px-4 py-6">
          {/* Search */}
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1 relative">
              <TextInput
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="pl-10 pr-4 py-3 rounded-xl border border-border bg-white"
              />
              <Search size={16} color="#666" className="absolute left-3 top-4" />
            </View>
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              className="border border-border rounded-xl px-4 py-3 flex-row items-center"
            >
              <Filter size={16} color="#666" />
              <Text className="ml-2">Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          {showFilters && (
            <View className="mb-6 p-4 border rounded-xl bg-muted/40">
              <View className="flex-row gap-4 mb-4">
                <TextInput
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChangeText={(text) => setFilters({ ...filters, minPrice: text })}
                  keyboardType="numeric"
                  className="flex-1 p-3 border rounded-lg bg-white"
                />
                <TextInput
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChangeText={(text) => setFilters({ ...filters, maxPrice: text })}
                  keyboardType="numeric"
                  className="flex-1 p-3 border rounded-lg bg-white"
                />
              </View>

              <View className="flex-row items-center gap-4">
                <View className="flex-1">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full p-3 border rounded-lg bg-white"
                  >
                    <option value="">Sort by</option>
                    <option value="priceLow">Price ↑</option>
                    <option value="priceHigh">Price ↓</option>
                    <option value="latest">Latest</option>
                  </select>
                </View>
                <TouchableOpacity
                  onPress={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
                  className="flex-row items-center"
                >
                  <View className={`w-5 h-5 border rounded mr-2 ${filters.inStockOnly ? 'bg-primary' : 'bg-white'}`} />
                  <Text>In stock only</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Products Grid */}
          {loading ? (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#2B6B3F" />
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-4">
              {filteredProducts.map((product) => (
                <View key={product.id} className="w-[48%] bg-card rounded-2xl border border-border p-4">
                  <View className="flex-row justify-between mb-2">
                    <Badge variant={product.in_stock ? "default" : "secondary"}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <Wheat size={24} color="#f97316" />
                  </View>

                  <Text className="text-lg font-semibold">{product.name}</Text>
                  <Text className="text-sm text-muted-foreground mb-2">
                    {product.weight_range}
                  </Text>

                  {product.seller_name && (
                    <View className="flex-row items-center mb-3">
                      <Package size={14} color="#666" />
                      <Text className="text-xs text-muted-foreground ml-1">
                        {product.seller_name}
                      </Text>
                    </View>
                  )}

                  <View className="flex-row justify-between items-center pt-2 border-t">
                    <Text className="text-xl font-bold">₹{Number(product.price).toLocaleString()}</Text>
                    
                    {isBuyer && (
                      <TouchableOpacity
                        disabled={!product.in_stock}
                        onPress={() => 
                          navigation.navigate('CreateOrder', {
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            weight_range: product.weight_range,
                          })
                        }
                        className={`px-3 py-2 rounded-lg ${
                          product.in_stock ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <Text className={product.in_stock ? 'text-white' : 'text-gray-600'}>
                          Buy
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {!loading && filteredProducts.length === 0 && (
            <View className="py-12 items-center">
              <Text className="text-muted-foreground">No products found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};
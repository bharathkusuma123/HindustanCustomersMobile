// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { Header } from '../../components/layout/Header';
// import { Button } from '../../components/ui/button';
// import { Badge } from '../../components/ui/badge';
// import { Input } from '../../components/ui/input';
// import {
//   Package,
//   MapPin,
//   IndianRupee,
//   Layers,
//   Pencil,
//   Trash2,
//   Search,
// } from 'lucide-react-native';
// import { API_BASE_URL } from '../../config/api';
// import { useAuth } from '../../context/AuthContext';

// const initialFormState = {
//   name: "",
//   category: "",
//   price: "",
//   unit: "quintal",
//   min_order: "",
//   location: "",
//   in_stock: true,
// };

// export const AddProduct = () => {
//   const navigation = useNavigation();
//   const { user } = useAuth();
//   const [form, setForm] = useState(initialFormState);
//   const [products, setProducts] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const limit = 5;

//   useEffect(() => {
//     fetchProducts();
//   }, [page, search]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${API_BASE_URL}/products/seller/${user?.user_id}?page=${page}&limit=${limit}&search=${search}`
//       );
//       const data = await res.json();
//       setProducts(data.rows || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       seller_id: user?.user_id,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/products/add-product`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Failed to add product");
//       }

//       Alert.alert("Success", "Product added successfully");
//       setForm(initialFormState);
//       setPage(1);
//       setSearch("");
//       await fetchProducts();
//     } catch (err: any) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       <Header />

//       <ScrollView className="flex-1 px-4 py-6">
//         {/* Header */}
//         <View className="mb-6">
//           <Badge className="mb-3 self-start">Seller Panel</Badge>
//           <Text className="text-3xl font-bold text-foreground">
//             Add New <Text className="text-primary">Product</Text>
//           </Text>
//           <Text className="text-muted-foreground mt-1">
//             List your product in the marketplace
//           </Text>
//         </View>

//         {/* Form */}
//         <View className="bg-card rounded-2xl border border-border p-6 mb-8">
//           <Text className="text-xl font-bold mb-6">Product Details</Text>

//           <View className="space-y-4">
//             {/* Product Name */}
//             <View>
//               <Text className="text-sm font-medium mb-2">Product Name</Text>
//               <View className="relative">
//                 <View className="absolute left-3 top-3 z-10">
//                   <Package size={16} color="#666" />
//                 </View>
//                 <TextInput
//                   value={form.name}
//                   onChangeText={(text) => setForm({ ...form, name: text })}
//                   placeholder="Premium Maize Dana"
//                   className="pl-10 p-3 border border-border rounded-lg bg-background"
//                 />
//               </View>
//             </View>

//             {/* Category */}
//             <View>
//               <Text className="text-sm font-medium mb-2">Category</Text>
//               <View className="relative">
//                 <View className="absolute left-3 top-3 z-10">
//                   <Layers size={16} color="#666" />
//                 </View>
//                 <TextInput
//                   value={form.category}
//                   onChangeText={(text) => setForm({ ...form, category: text })}
//                   placeholder="Dana (Grains)"
//                   className="pl-10 p-3 border border-border rounded-lg bg-background"
//                 />
//               </View>
//             </View>

//             {/* Price & Min Order */}
//             <View className="flex-row gap-4">
//               <View style={{ flex: 1 }}>
//                 <Text className="text-sm font-medium mb-2">Price (per quintal)</Text>
//                 <View className="relative">
//                   <View className="absolute left-3 top-3 z-10">
//                     <IndianRupee size={16} color="#666" />
//                   </View>
//                   <TextInput
//                     value={form.price}
//                     onChangeText={(text) => setForm({ ...form, price: text })}
//                     placeholder="2200"
//                     keyboardType="numeric"
//                     className="pl-10 p-3 border border-border rounded-lg bg-background"
//                   />
//                 </View>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text className="text-sm font-medium mb-2">Min Order (quintals)</Text>
//                 <TextInput
//                   value={form.min_order}
//                   onChangeText={(text) => setForm({ ...form, min_order: text })}
//                   placeholder="10"
//                   keyboardType="numeric"
//                   className="p-3 border border-border rounded-lg bg-background"
//                 />
//               </View>
//             </View>

//             {/* Location */}
//             <View>
//               <Text className="text-sm font-medium mb-2">Location</Text>
//               <View className="relative">
//                 <View className="absolute left-3 top-3 z-10">
//                   <MapPin size={16} color="#666" />
//                 </View>
//                 <TextInput
//                   value={form.location}
//                   onChangeText={(text) => setForm({ ...form, location: text })}
//                   placeholder="Pune, Maharashtra"
//                   className="pl-10 p-3 border border-border rounded-lg bg-background"
//                 />
//               </View>
//             </View>

//             {/* Actions */}
//             <View className="flex-row justify-end gap-3 pt-4 border-t">
//               <Button variant="outline" onPress={() => navigation.goBack()}>
//                 Cancel
//               </Button>
//               <Button onPress={handleSubmit}>Publish Product</Button>
//             </View>
//           </View>
//         </View>

//         {/* Products Table */}
//         <View>
//           <Text className="text-2xl font-bold mb-4">
//             Your <Text className="text-primary">Products</Text>
//           </Text>

//           {/* Search */}
//           <View className="flex-row mb-4">
//             <View className="flex-1 relative">
//               <TextInput
//                 placeholder="Search products..."
//                 value={search}
//                 onChangeText={(text) => {
//                   setSearch(text);
//                   setPage(1);
//                 }}
//                 className="pl-10 pr-4 py-2 rounded-lg border border-border bg-white"
//               />
//               <Search size={16} color="#666" className="absolute left-3 top-3" />
//             </View>
//           </View>

//           {/* Table */}
//           <View className="border border-border rounded-lg overflow-hidden">
//             {/* Header */}
//             <View className="bg-muted/60 flex-row p-3">
//               <Text className="flex-1 font-medium">Name</Text>
//               <Text className="flex-1 font-medium">Category</Text>
//               <Text className="w-20 font-medium">Price</Text>
//               <Text className="w-20 font-medium text-center">Actions</Text>
//             </View>

//             {/* Rows */}
//             {loading ? (
//               <View className="p-6 items-center">
//                 <ActivityIndicator size="small" color="#2B6B3F" />
//               </View>
//             ) : (
//               products.map((p) => (
//                 <View key={p.id} className="flex-row p-3 border-t border-border">
//                   <Text className="flex-1">{p.name}</Text>
//                   <Text className="flex-1">{p.category}</Text>
//                   <Text className="w-20">₹{p.price}</Text>
//                   <View className="w-20 flex-row justify-center gap-2">
//                     <TouchableOpacity className="p-1">
//                       <Pencil size={16} color="#2563eb" />
//                     </TouchableOpacity>
//                     <TouchableOpacity className="p-1">
//                       <Trash2 size={16} color="#dc2626" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))
//             )}

//             {!loading && products.length === 0 && (
//               <View className="p-8 items-center">
//                 <Package size={32} color="#666" />
//                 <Text className="text-muted-foreground mt-2">No products found</Text>
//               </View>
//             )}
//           </View>

//           {/* Pagination */}
//           <View className="flex-row justify-end gap-2 mt-4">
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={page === 1}
//               onPress={() => setPage(page - 1)}
//             >
//               Prev
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={page * limit >= total}
//               onPress={() => setPage(page + 1)}
//             >
//               Next
//             </Button>
//           </View>
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
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
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
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.badgeWrapper}>
            <Badge>Seller Panel</Badge>
          </View>
          <Text style={styles.title}>
            Add New <Text style={styles.titleHighlight}>Product</Text>
          </Text>
          <Text style={styles.subtitle}>
            List your product in the marketplace
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Product Details</Text>

          <View style={styles.formContent}>
            {/* Product Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Product Name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Package size={16} color="#666" />
                </View>
                <TextInput
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  placeholder="Premium Maize Dana"
                  style={styles.inputWithIcon}
                />
              </View>
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Layers size={16} color="#666" />
                </View>
                <TextInput
                  value={form.category}
                  onChangeText={(text) => setForm({ ...form, category: text })}
                  placeholder="Dana (Grains)"
                  style={styles.inputWithIcon}
                />
              </View>
            </View>

            {/* Price & Min Order */}
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Price (per quintal)</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <IndianRupee size={16} color="#666" />
                  </View>
                  <TextInput
                    value={form.price}
                    onChangeText={(text) => setForm({ ...form, price: text })}
                    placeholder="2200"
                    keyboardType="numeric"
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              <View style={styles.flex1}>
                <Text style={styles.label}>Min Order (quintals)</Text>
                <TextInput
                  value={form.min_order}
                  onChangeText={(text) => setForm({ ...form, min_order: text })}
                  placeholder="10"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <MapPin size={16} color="#666" />
                </View>
                <TextInput
                  value={form.location}
                  onChangeText={(text) => setForm({ ...form, location: text })}
                  placeholder="Pune, Maharashtra"
                  style={styles.inputWithIcon}
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <Button variant="outline" onPress={() => navigation.goBack()}>
                Cancel
              </Button>
              <Button onPress={handleSubmit}>Publish Product</Button>
            </View>
          </View>
        </View>

        {/* Products Table */}
        <View>
          <Text style={styles.sectionTitle}>
            Your <Text style={styles.titleHighlight}>Products</Text>
          </Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                placeholder="Search products..."
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                  setPage(1);
                }}
                style={styles.searchInput}
              />
              <View style={styles.searchIcon}>
                <Search size={16} color="#666" />
              </View>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            {/* Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.flex1]}>Name</Text>
              <Text style={[styles.tableHeaderCell, styles.flex1]}>Category</Text>
              <Text style={[styles.tableHeaderCell, styles.w20]}>Price</Text>
              <Text style={[styles.tableHeaderCell, styles.w20, styles.textCenter]}>Actions</Text>
            </View>

            {/* Rows */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#2B6B3F" />
              </View>
            ) : (
              products.map((p) => (
                <View key={p.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.flex1]}>{p.name}</Text>
                  <Text style={[styles.tableCell, styles.flex1]}>{p.category}</Text>
                  <Text style={[styles.tableCell, styles.w20]}>₹{p.price}</Text>
                  <View style={[styles.actionCell, styles.w20]}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Pencil size={16} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Trash2 size={16} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {!loading && products.length === 0 && (
              <View style={styles.emptyContainer}>
                <Package size={32} color="#666" />
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            )}
          </View>

          {/* Pagination */}
          <View style={styles.paginationContainer}>
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
  badgeWrapper: {
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  titleHighlight: {
    color: '#2B6B3F',
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 24,
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  formContent: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 10,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  inputWithIcon: {
    paddingLeft: 40,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  w20: {
    width: 80,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    padding: 12,
  },
  tableHeaderCell: {
    fontWeight: '500',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tableCell: {
    color: '#333',
  },
  actionCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  textCenter: {
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    marginTop: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
});
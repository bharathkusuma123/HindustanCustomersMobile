import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit,
  X,
} from 'lucide-react-native';
import { API_BASE_URL, SERVER_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

export const Profile = () => {
  const navigation = useNavigation();
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [form, setForm] = useState({
    proprietor_name: "",
    proprietor_mobile: "",
    alternative_mobile: "",
    trader_name: "",
    pan_number: "",
    aadhar_number: "",
    gst_number: "",
    taluk: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    state: "",
    district: "",
    vehicle_type: "",
    vehicle_count: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        proprietor_name: user.proprietor_name || "",
        proprietor_mobile: user.proprietor_mobile || "",
        alternative_mobile: user.alternative_mobile || "",
        trader_name: user.trading_name || "",
        pan_number: user.pan_number || "",
        aadhar_number: user.aadhar_number || "",
        gst_number: user.gst_number || "",
        taluk: user.taluk || "",
        address_line1: user.address_line1 || "",
        address_line2: user.address_line2 || "",
        pincode: user.pincode || "",
        state: user.state || "",
        district: user.district || "",
        vehicle_type: user.vehicle_type || "",
        vehicle_count: user.vehicle_count || "",
      });
    }
  }, [user]);

  const handleAvatarUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const formData = new FormData();
        formData.append('avatar', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        } as any);

        const res = await fetch(
          `${API_BASE_URL}/users/upload-avatar/${user?.user_id}`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        updateUser({ ...user, profile_image: data.image });
        Alert.alert("Success", "Profile picture updated");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to upload image");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/users/${user?.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        Alert.alert("Error", "Update failed");
        return;
      }

      const updated = { ...user, ...form };
      updateUser(updated);
      setEditing(false);
      Alert.alert("Success", "Profile updated successfully");

    } catch {
      Alert.alert("Error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/change-password/${user?.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm)
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Password update failed");
        return;
      }

      Alert.alert("Success", "Password changed. Please login again.");
      setTimeout(async () => {
        await logout();
        navigation.navigate('Login');
      }, 1500);

    } catch {
      Alert.alert("Error", "Server error");
    }
  };

  if (!user) return null;

  const isBuyer = user.role === "BUYER";
  const isSeller = user.role === "SELLER" || user.role === "FARMER";
  
  const roleColor = 
    user.role === "SELLER" ? "bg-green-100 text-green-700" :
    user.role === "FARMER" ? "bg-amber-100 text-amber-700" :
    "bg-blue-100 text-blue-700";

  return (
    <SafeAreaView className="flex-1 bg-muted/20">
      <Header />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <Card.Content className="p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="relative">
                  <View className="h-20 w-20 rounded-full bg-primary/10 items-center justify-center overflow-hidden">
                    {user.profile_image ? (
                      <Image
                        source={{ uri: `${SERVER_BASE_URL}/uploads/${user.profile_image}` }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <User size={32} color="#2B6B3F" />
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={handleAvatarUpload}
                    className="absolute -bottom-1 -right-1 bg-[#f5b82e] p-2 rounded-full"
                  >
                    <Camera size={16} color="#000" />
                  </TouchableOpacity>
                </View>

                <View className="ml-4">
                  <Text className="text-xl font-bold">{user.proprietor_name}</Text>
                  <Text className="text-muted-foreground">Account Settings</Text>
                </View>
              </View>

              <Badge className={roleColor}>
                {user.role}
              </Badge>
            </View>
          </Card.Content>
        </Card>

        {/* Profile Form */}
        <Card className="mb-6">
          <Card.Content className="p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Personal Information</Text>
              {!editing ? (
                <TouchableOpacity onPress={() => setEditing(true)} className="flex-row items-center">
                  <Edit size={16} color="#666" />
                  <Text className="ml-2 text-primary">Edit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setEditing(false)} className="flex-row items-center">
                  <X size={16} color="#666" />
                  <Text className="ml-2 text-destructive">Cancel</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="space-y-4">
              {/* Full Name */}
              <View>
                <Text className="text-sm text-muted-foreground mb-1">Full Name</Text>
                <TextInput
                  value={form.proprietor_name}
                  onChangeText={(text) => setForm({ ...form, proprietor_name: text })}
                  editable={editing}
                  className={`p-3 border rounded-lg ${
                    editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </View>

              {/* Mobile */}
              <View>
                <Text className="text-sm text-muted-foreground mb-1">Mobile Number</Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Phone size={16} color="#666" />
                  </View>
                  <TextInput
                    value={form.proprietor_mobile}
                    onChangeText={(text) => setForm({ ...form, proprietor_mobile: text })}
                    editable={editing}
                    keyboardType="phone-pad"
                    className={`pl-10 p-3 border rounded-lg ${
                      editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </View>
              </View>

              {/* Business Name */}
              <View>
                <Text className="text-sm text-muted-foreground mb-1">Business Name</Text>
                <TextInput
                  value={form.trader_name}
                  onChangeText={(text) => setForm({ ...form, trader_name: text })}
                  editable={editing}
                  className={`p-3 border rounded-lg ${
                    editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </View>

              {/* Address */}
              <View>
                <Text className="text-sm text-muted-foreground mb-1">Address Line 1</Text>
                <TextInput
                  value={form.address_line1}
                  onChangeText={(text) => setForm({ ...form, address_line1: text })}
                  editable={editing}
                  multiline
                  className={`p-3 border rounded-lg ${
                    editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </View>

              {form.address_line2 && (
                <View>
                  <Text className="text-sm text-muted-foreground mb-1">Address Line 2</Text>
                  <TextInput
                    value={form.address_line2}
                    onChangeText={(text) => setForm({ ...form, address_line2: text })}
                    editable={editing}
                    className={`p-3 border rounded-lg ${
                      editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </View>
              )}

              {/* Pincode & Location */}
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground mb-1">Pincode</Text>
                  <TextInput
                    value={form.pincode}
                    onChangeText={(text) => setForm({ ...form, pincode: text })}
                    editable={editing}
                    keyboardType="numeric"
                    maxLength={6}
                    className={`p-3 border rounded-lg ${
                      editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground mb-1">Taluk</Text>
                  <TextInput
                    value={form.taluk}
                    onChangeText={(text) => setForm({ ...form, taluk: text })}
                    editable={editing}
                    className={`p-3 border rounded-lg ${
                      editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </View>
              </View>

              {isSeller && (
                <View>
                  <Text className="text-sm text-muted-foreground mb-1">GST Number</Text>
                  <TextInput
                    value={form.gst_number}
                    onChangeText={(text) => setForm({ ...form, gst_number: text })}
                    editable={editing}
                    className={`p-3 border rounded-lg ${
                      editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </View>
              )}

              {isBuyer && (
                <>
                  <View>
                    <Text className="text-sm text-muted-foreground mb-1">PAN Number</Text>
                    <TextInput
                      value={form.pan_number}
                      onChangeText={(text) => setForm({ ...form, pan_number: text })}
                      editable={editing}
                      className={`p-3 border rounded-lg ${
                        editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </View>

                  <View>
                    <Text className="text-sm text-muted-foreground mb-1">Aadhar Number</Text>
                    <TextInput
                      value={form.aadhar_number}
                      onChangeText={(text) => setForm({ ...form, aadhar_number: text })}
                      editable={editing}
                      className={`p-3 border rounded-lg ${
                        editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <Text className="text-sm text-muted-foreground mb-1">Vehicle Type</Text>
                      <TextInput
                        value={form.vehicle_type}
                        onChangeText={(text) => setForm({ ...form, vehicle_type: text })}
                        editable={editing}
                        className={`p-3 border rounded-lg ${
                          editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm text-muted-foreground mb-1">Vehicle Count</Text>
                      <TextInput
                        value={form.vehicle_count}
                        onChangeText={(text) => setForm({ ...form, vehicle_count: text })}
                        editable={editing}
                        keyboardType="numeric"
                        className={`p-3 border rounded-lg ${
                          editing ? 'bg-white border-border' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </View>
                  </View>
                </>
              )}

              {editing && (
                <TouchableOpacity
                  onPress={handleSave}
                  disabled={loading}
                  className="bg-primary py-3 rounded-lg flex-row items-center justify-center mt-4"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Save size={18} color="#fff" />
                      <Text className="text-white font-semibold ml-2">Save Changes</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Password Section */}
        <Card className="mb-6">
          <Card.Content className="p-6">
            <TouchableOpacity
              onPress={() => setShowPasswordSection(!showPasswordSection)}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <Lock size={20} color="#666" />
                <View className="ml-3">
                  <Text className="font-medium">Password</Text>
                  <Text className="text-sm text-muted-foreground">
                    Change your account password
                  </Text>
                </View>
              </View>
              <Text className="text-primary">
                {showPasswordSection ? 'Close' : 'Reset'}
              </Text>
            </TouchableOpacity>

            {showPasswordSection && (
              <View className="mt-4 pt-4 border-t space-y-4">
                {/* Current Password */}
                <View>
                  <Text className="text-sm text-muted-foreground mb-1">Current Password</Text>
                  <View className="relative">
                    <TextInput
                      value={passwordForm.currentPassword}
                      onChangeText={(text) => setPasswordForm({ ...passwordForm, currentPassword: text })}
                      secureTextEntry={!showPassword.current}
                      className="p-3 border border-border rounded-lg pr-10"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                      className="absolute right-3 top-3"
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* New Password */}
                <View>
                  <Text className="text-sm text-muted-foreground mb-1">New Password</Text>
                  <View className="relative">
                    <TextInput
                      value={passwordForm.newPassword}
                      onChangeText={(text) => setPasswordForm({ ...passwordForm, newPassword: text })}
                      secureTextEntry={!showPassword.new}
                      className="p-3 border border-border rounded-lg pr-10"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute right-3 top-3"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                <View>
                  <Text className="text-sm text-muted-foreground mb-1">Confirm Password</Text>
                  <View className="relative">
                    <TextInput
                      value={passwordForm.confirmPassword}
                      onChangeText={(text) => setPasswordForm({ ...passwordForm, confirmPassword: text })}
                      secureTextEntry={!showPassword.confirm}
                      className="p-3 border border-border rounded-lg pr-10"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                      className="absolute right-3 top-3"
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handlePasswordChange}
                  className="border border-border py-3 rounded-lg"
                >
                  <Text className="text-center text-foreground">Update Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="py-3"
        >
          <Text className="text-center text-muted-foreground">← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
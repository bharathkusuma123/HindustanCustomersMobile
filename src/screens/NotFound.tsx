import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export const NotFound = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    console.log("404 Error: User attempted to access non-existent route:", route.path);
  }, [route.path]);

  return (
    <SafeAreaView className="flex-1 bg-muted">
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center">
          {/* Large 404 Text */}
          <Text className="text-7xl font-bold text-foreground mb-4">404</Text>
          
          {/* Error Message */}
          <Text className="text-xl text-muted-foreground text-center mb-8">
            Oops! Page not found
          </Text>
          
          {/* Home Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Index' as never)}
            className="px-6 py-3"
          >
            <Text className="text-primary text-lg underline">
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
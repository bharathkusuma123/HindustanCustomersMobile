// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';

// export const NotFound = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   useEffect(() => {
//     console.log("404 Error: User attempted to access non-existent route:", route.path);
//   }, [route.path]);

//   return (
//     <SafeAreaView className="flex-1 bg-muted">
//       <View className="flex-1 items-center justify-center px-6">
//         <View className="items-center">
//           {/* Large 404 Text */}
//           <Text className="text-7xl font-bold text-foreground mb-4">404</Text>
          
//           {/* Error Message */}
//           <Text className="text-xl text-muted-foreground text-center mb-8">
//             Oops! Page not found
//           </Text>
          
//           {/* Home Button */}
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Index' as never)}
//             className="px-6 py-3"
//           >
//             <Text className="text-primary text-lg underline">
//               Return to Home
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };





import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.centerContent}>
          {/* Large 404 Text */}
          <Text style={styles.errorCode}>404</Text>
          
          {/* Error Message */}
          <Text style={styles.errorMessage}>
            Oops! Page not found
          </Text>
          
          {/* Home Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Index' as never)}
            style={styles.homeButton}
          >
            <Text style={styles.homeButtonText}>
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerContent: {
    alignItems: 'center',
  },
  errorCode: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  homeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  homeButtonText: {
    color: '#2B6B3F',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
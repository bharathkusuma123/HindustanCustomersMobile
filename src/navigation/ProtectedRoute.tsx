// import React from 'react';
// import { Navigate, useNavigation } from 'react-navigation';
// import { View, ActivityIndicator } from 'react-native';
// import { useAuth } from '../context/AuthContext';

// type Props = {
//   children: React.ReactNode;
//   allowedRoles?: ("SELLER" | "BUYER" | "FARMER" | "ADMIN")[];
// };

// export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-background">
//         <ActivityIndicator size="large" color="#2B6B3F" />
//       </View>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return <>{children}</>;
// };
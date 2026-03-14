// import React, { createContext, useContext, useEffect, useState } from "react";
// import * as SecureStore from "expo-secure-store";

// interface User {
//   user_id: number;
//   proprietor_name: string;
//   proprietor_mobile: string;
//   email: string;
//   trading_name: string;
//   role: string;
//   frontend_role?: string;
//   taluk?: string;
//   profile_image?: string | null;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   login: (token: string, user: User) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: any) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStoredAuth();
//   }, []);

//   const loadStoredAuth = async () => {
//     try {
//       const storedToken = await SecureStore.getItemAsync("auth_token");
//       const storedUser = await SecureStore.getItemAsync("auth_user");

//       if (storedToken && storedUser) {
//         setToken(storedToken);
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (err) {
//       console.log("Auth load error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (token: string, user: User) => {
//     try {
//       await SecureStore.setItemAsync("auth_token", token);
//       await SecureStore.setItemAsync("auth_user", JSON.stringify(user));

//       setToken(token);
//       setUser(user);
//     } catch (error) {
//       console.log("Login save error", error);
//     }
//   };

//   const logout = async () => {
//     await SecureStore.deleteItemAsync("auth_token");
//     await SecureStore.deleteItemAsync("auth_user");

//     setUser(null);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }

//   return context;
// };




import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';

interface User {
  user_id: number;
  proprietor_name: string;
  proprietor_mobile: string;
  email: string;
  trading_name: string;
  role: string;
  frontend_role?: string;
  taluk?: string;
  profile_image?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("auth_token");
      const storedUser = await SecureStore.getItemAsync("auth_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        try {
          // Safely parse the user data
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (parseError) {
          console.log("Error parsing stored user", parseError);
          // If parsing fails, clear the invalid data
          await SecureStore.deleteItemAsync("auth_user");
        }
      }
    } catch (err) {
      console.log("Auth load error", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, user: User) => {
    try {
      // Ensure token is a string
      const tokenString = String(token);
      
      // Ensure user is properly stringified
      const userString = JSON.stringify(user);
      
      // Validate that we're not storing empty values
      if (!tokenString || tokenString === 'undefined' || tokenString === 'null') {
        throw new Error('Invalid token');
      }
      
      if (!userString || userString === 'undefined' || userString === 'null') {
        throw new Error('Invalid user data');
      }

      await SecureStore.setItemAsync("auth_token", tokenString);
      await SecureStore.setItemAsync("auth_user", userString);

      setToken(token);
      setUser(user);
      
      console.log("Login successful - data stored"); // Debug log
    } catch (error) {
      console.log("Login save error", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("auth_token");
      await SecureStore.deleteItemAsync("auth_user");
    } catch (error) {
      console.log("Logout error", error);
    }

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
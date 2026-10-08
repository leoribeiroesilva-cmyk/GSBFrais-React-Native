// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* si un utilisateur est connecté , enregistrer Stack.Screen "Dashboard" */ }
      {/*sinon, enregistrer Stack.Screen "Login" */ }
      {user ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </AuthProvider>
  );
}
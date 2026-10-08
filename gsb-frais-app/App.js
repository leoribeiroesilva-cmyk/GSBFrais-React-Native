// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  const { user, sessionLoading } = useAuth();

  if (sessionLoading) {
    // renvoyer un écran d’attente avec le composant ActivityIndicator, comme dans DashboardScreen mais avec style={{ flex: 1 }}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      </View>
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
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
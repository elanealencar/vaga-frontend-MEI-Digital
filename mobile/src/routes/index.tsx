import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import { Service } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Form: { service: Service };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Serviços' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Contratar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

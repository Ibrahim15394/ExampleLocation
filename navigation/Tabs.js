import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Location from '../screens/location/Location';
import Maps from '../screens/Maps/Maps';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
    
       
      }}>
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Maps" component={Maps} />
    </Tab.Navigator>
  );
};
export default Tabs;

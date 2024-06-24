import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { Drawer } from "expo-router/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import Dashboard from ".";
import OnlineExams from "./OnlineExams";
import Logout from "./Logout";
import Profile from "./Profile";

export default function Layout() {
  const Drawer = createDrawerNavigator();
  return (
    // <NavigationContainer>
    <GestureHandlerRootView>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Online Exams" component={OnlineExams} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
      {/* </NavigationContainer> */}
    </GestureHandlerRootView>
  );
}

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";

const CustomDrawerContent = (props: any) => {
  const userData = useSelector((state: any) => state.auth.user);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* Your custom header */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Hello, {userData?.name}</Text>
        </View>
        {/* Standard drawer items */}
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CustomDrawerContent;

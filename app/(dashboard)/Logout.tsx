import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      await SecureStore.deleteItemAsync("authToken");
      router.push("/");
    };
    logout();
  }, []);
  return <></>;
};

export default Logout;

import { View } from "react-native";
import React from "react";
import { Text } from "@rneui/base";

const Dashboard = () => {
  return (
    <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 24 }}>
      <View
        style={{
          padding: 20,
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor: "#ddd",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text>Exams Appeared</Text>
          <Text>20</Text>
        </View>
        <View
          style={{ borderWidth: 1, borderStyle: "dashed", borderColor: "#222" }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text>Exams Passed</Text>
          <Text>10</Text>
        </View>
        <View
          style={{ borderWidth: 1, borderStyle: "dashed", borderColor: "#222" }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text>Exams Failed</Text>
          <Text>10</Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

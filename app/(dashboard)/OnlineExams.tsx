import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { router } from "expo-router";

const users = [
  {
    name: "Trade 1",
    status: "Completed",
    dateFrom: "21/06/2024 10:00 AM",
    dateTo: "21/06/2024 12:00 AM",
    totalAttempts: 10,
    attempted: 1,
    duration: "01:30:00",
  },
  {
    name: "Trade 2",
    status: "Completed",
    dateFrom: "21/06/2024 10:00 AM",
    dateTo: "21/06/2024 12:00 AM",
    totalAttempts: 10,
    attempted: 1,
    duration: "01:30:00",
  },
  {
    name: "Trade 3",
    status: "Available",
    dateFrom: "21/06/2024 10:00 AM",
    dateTo: "21/06/2024 12:00 AM",
    totalAttempts: 10,
    attempted: 1,
    duration: "01:30:00",
  },
];

type CardsComponentsProps = {};

const OnlineExams: React.FunctionComponent<CardsComponentsProps> = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {users.map((u, i) => {
            return (
              <Card key={i} containerStyle={{ borderRadius: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.title}>{u.name}</Text>
                  {u.status === "Completed" ? (
                    <Icon name="verified" color="#0CC" type="material" />
                  ) : (
                    <Icon
                      onPress={() => router.push("/(exam)")}
                      name="not-started"
                      color="#0CC"
                      type="material"
                      size={35}
                    />
                  )}
                </View>
                <Card.Divider />

                <View style={styles.user}>
                  <Text style={styles.key}>Date From: </Text>
                  <Text style={styles.value}>{u.dateFrom}</Text>
                </View>
                <View style={styles.user}>
                  <Text style={styles.key}>Date To: </Text>
                  <Text style={styles.value}>{u.dateTo}</Text>
                </View>
                <View style={styles.user}>
                  <Text style={styles.key}>Total Attempts: </Text>
                  <Text style={styles.value}>{u.totalAttempts}</Text>
                </View>
                <View style={styles.user}>
                  <Text style={styles.key}>Attempted: </Text>
                  <Text style={styles.value}>{u.attempted}</Text>
                </View>
                <View style={styles.user}>
                  <Text style={styles.key}>Duration: </Text>
                  <Text style={styles.value}>{u.duration}</Text>
                </View>
                <View style={styles.user}>
                  <Text style={styles.key}>Status: </Text>
                  <Text style={styles.value}>{u.status}</Text>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "900",
  },
  key: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "700",
  },
  value: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default OnlineExams;

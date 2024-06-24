// FullPageLoader.js
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const FullPageLoader = ({ visible, message }: any) => {
  return (
    <Modal
      transparent={true}
      animationType={"fade"}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
          {message && <Text style={styles.loadingMessage}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 200,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingMessage: {
    marginTop: 10,
    textAlign: "center",
  },
});

export default FullPageLoader;

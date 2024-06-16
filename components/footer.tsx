import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Link } from "expo-router";
import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Link href="/add" style={styles.addButton}>
        <TabBarIcon name="add" />
      </Link>
      <View style={styles.nav}>
        <Link href={"/"} style={styles.navButton}>
          <TabBarIcon name="alarm-outline" color={"#EAEAEC"} />
          <Text style={styles.navButtonText}>Alarm</Text>
        </Link>
        <Link href={"/settings"} style={styles.navButton}>
          <TabBarIcon name="settings-outline" color={"#EAEAEC"} />
          <Text style={styles.navButtonText}>Settings</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: "#1c1e26",
    position: "relative",
  },
  addButton: {
    backgroundColor: "#fbc02d",
    borderRadius: 25,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: -25,
  },
  addButtonText: {
    fontSize: 24,
    color: "white",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navButton: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  navButtonText: {
    color: "#EAEAEC",
  },
});
export default Footer;

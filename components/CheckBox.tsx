import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const CustomCheckbox: FC<any> = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.dark.text,
    marginRight: 5,
  },
  checked: {
    backgroundColor: Colors.light.tint,
  },
  label: {
    color: Colors.dark.text,
  },
});

export default CustomCheckbox;
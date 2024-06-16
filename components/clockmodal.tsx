import React, { useState } from "react";
import {
  View,
  Button,
  Modal,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../constants/Colors";
import { TabBarIcon } from "./navigation/TabBarIcon";
import CustomCheckbox from "./CheckBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useNavigation } from "expo-router";

interface ClockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ClockModal: React.FC<ClockModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"time">("time");
  const [show, setShow] = useState(false);
  const [force, setForce] = useState(false);
  const [title, setTitle] = useState("");

  const [days, setDays] = useState<any>({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const navigation = useNavigation();
  
  const handleToggleDay = (day: string | number) => {
    setDays((prevDays: { [x: string]: any }) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleConfirm = async () => {
    try {
      onConfirm(); // Trigger parent component to reload clocks
      let storedData = await AsyncStorage.getItem("Data");
      let JSONData = storedData ? JSON.parse(storedData) : [];

      let data = {
        id: JSONData.length,
        title: title,
        time: date,
        days: days,
        isEnabled: force,
      };
      console.log(data);
      JSONData.push(data);

      navigation.navigate("/");

      await AsyncStorage.setItem("Data", JSON.stringify(JSONData));
    } catch (error) {
      console.error("Error saving data:", error);
    }

    onClose(); // Close modal after confirming
  };

  const toggleForce = () => {
    setForce((prevState) => !prevState);
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
    setMode("time");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Alarm</Text>
            <Link href={"/dd"}>
              <Text style={styles.closeIcon}>
                <TabBarIcon name="close" />
              </Text>
            </Link>
          </View>
          <View>
            <View style={styles.inputGroup}>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
                placeholder="Enter alarm title"
                placeholderTextColor={Colors.dark.switchTrackColor}
              />
            </View>
            <View style={styles.timePickerContainer}>
              <Pressable onPress={showTimepicker}>
                <Button title="Select Time" onPress={showTimepicker} />
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={force}
                onValueChange={toggleForce}
                trackColor={{
                  false: Colors.dark.switchTrackColor,
                  true: Colors.light.switchTrackColor,
                }}
                thumbColor={Colors.light.switchThumbColor}
                ios_backgroundColor={Colors.dark.switchTrackColor}
              />
              <Text style={styles.modalText}>Force Wake Up</Text>
            </View>
            <View style={styles.daySelectionContainer}>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <CustomCheckbox
                  key={day}
                  label={day}
                  isChecked={days[day]}
                  onChange={() => handleToggleDay(day)}
                />
              ))}
            </View>
          </View>
          <View style={styles.confirmButtonContainer}>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: Colors.dark.background,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    color: Colors.dark.text,
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  timePickerContainer: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },
  confirmButtonContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalText: {
    color: Colors.dark.text,
  },
  daySelectionContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 10,
    display: "flex",
    gap: 15,
  },
  inputGroup: {
    width: "75%",
    maxWidth: 320,
    flexDirection: "column",
    zIndex: 2,
    margin: "auto",
  },
  input: {
    marginVertical: 15,
    color: "white",
    fontSize: 20,
    lineHeight: 20,
    height: 48,
    width: "100%",
    paddingVertical: 12.8,
    paddingHorizontal: 17,
    borderRadius: 8,
    backgroundColor: "#1c1e26",
  },
});

export default ClockModal;

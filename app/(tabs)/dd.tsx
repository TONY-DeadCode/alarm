import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Colors } from "../../constants/Colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Footer from "@/components/footer";

interface Alarm {
  id: number;
  title: string;
  time: string | number | Date;
  days: { [day: string]: boolean };
  isEnabled: boolean;
}

const AlarmScreen: React.FC = () => {
  const { getItem, setItem } = useAsyncStorage("Data");
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        let storedData = await getItem();
        if (!storedData) {
          storedData = "[]";
          await setItem(storedData);
        }
        setAlarms(JSON.parse(storedData) as Alarm[]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, []);

  const toggleSwitch = async (id: number) => {
    try {
      const storedData = await getItem();
      if (storedData) {
        const alarmsData = JSON.parse(storedData) as Alarm[];
        const updatedAlarms = alarmsData.map((alarm) =>
          alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
        );
        await setItem(JSON.stringify(updatedAlarms));
        setAlarms(updatedAlarms); // Update state with updated alarms
      }
    } catch (error) {
      console.error("Error toggling switch:", error);
    }
  };

  const days = (alarm: Alarm) => {
    const res: string[] = [];
    Object.keys(alarm.days).forEach((day) => {
      if (alarm.days[day]) {
        res.push(day.slice(0, 2));
      }
    });
    return res.length === 7 ? "everyday" : res.join(" ");
  };

  const time = (alarm: Alarm) => {
    const date = new Date(alarm.time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const type = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour to 12-hour format

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${type}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarm</Text>
      </View>
      <ScrollView style={styles.alarms}>
        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarm}>
            <View style={styles.alarmInfo}>
              <Text style={styles.alarmTitle}>{alarm.title}</Text>
              <Text style={styles.time}>{time(alarm)}</Text>
              <Text style={styles.days}>{days(alarm)}</Text>
            </View>
            <Switch
              value={alarm.isEnabled}
              onValueChange={() => toggleSwitch(alarm.id)}
              trackColor={{
                false: Colors.dark.switchTrackColor,
                true: Colors.light.switchTrackColor,
              }}
              thumbColor={Colors.light.switchThumbColor}
              ios_backgroundColor={Colors.dark.switchTrackColor}
            />
          </View>
        ))}
      </ScrollView>
      {/* Assuming Footer component is imported correctly */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.dark.cardBackground,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.dark.text,
  },
  alarms: {
    flex: 1,
    padding: 10,
  },
  alarm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark.cardBackground,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTitle: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  time: {
    fontSize: 24,
    color: Colors.dark.text,
  },
  days: {
    fontSize: 14,
    color: Colors.dark.icon,
  },
});

export default AlarmScreen;

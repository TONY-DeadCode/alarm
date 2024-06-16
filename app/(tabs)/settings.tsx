import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { Colors } from "../../constants/Colors";
import Footer from "@/components/footer";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const AboutScreen = () => {
  const {setItem}= useAsyncStorage("Data");

  const clear = () => {
    setItem("[]");
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About This App</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.paragraph}>
            This app is designed to help you manage your time efficiently and
            wake up refreshed. With customizable alarms and various features,
            you can ensure you never miss an important event or task.
          </Text>
          <Text style={styles.title}>About the Developers</Text>
          <Text style={styles.paragraph}>
            This app was created by DeadCode, a team of dedicated developers
            passionate about creating high-quality, user-friendly applications.
            Our mission is to improve your daily life through technology.
          </Text>
          {/* <Image
            style={styles.image}
            source={{ uri: "https://example.com/deadcode-logo.png" }}
          /> */}
          <Text style={styles.paragraph}>
            Follow us on social media to stay updated with our latest projects
            and updates. We appreciate your support and feedback!
          </Text>
        </View>
        <View
          style={{
            width: 125,
            margin: "auto",
          }}
        >
          <Button title="Clear Data" onPress={clear() as any} />
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    backgroundColor: Colors.light.tint,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: Colors.dark.text,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.dark.text,
    marginBottom: 10,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 15,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default AboutScreen;

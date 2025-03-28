import React, { useState, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { setUser } from "@/utils/userStore";
import { clearUser } from "@/utils/userStore";
import axios from "axios";

export default function HomeScreen() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { user } = useUser();

  const userInfo = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
    image: user?.imageUrl,
  };

  setUser(userInfo);

  const sendReq = async () => {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/users/googleAuth`,
      { user: userInfo },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  };

  useEffect(() => {
    sendReq();
    return () => console.log("HomeScreen unmounted");
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  const debugTouch = () => {
    Alert.alert("Button Pressed", "The logout button was pressed");
  };

  const handleSignOut = async () => {
    debugTouch();

    try {
      setIsSigningOut(true);

      setTimeout(async () => {
        try {
          await signOut();
          router.replace("/login");
        } catch (error) {
          Alert.alert(
            "Sign Out Error",
            "There was a problem signing out. Please try again."
          );
          setIsSigningOut(false);
        }
      }, 500);
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was a problem signing out. Please try again."
      );
      setIsSigningOut(false);
    } finally {
      clearUser();
    }
  };

  const navigateTo = (screen: any) => {
    router.push(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LifeStyle</Text>

        <TouchableOpacity
          onPress={() => handleSignOut()}
          style={[styles.logoutButton, { zIndex: 999 }]}
          activeOpacity={0.6}
          disabled={isSigningOut}
        >
          <View
            style={{ padding: 10, backgroundColor: "#f5f5f5", borderRadius: 8 }}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={isSigningOut ? "#ccc" : "#FF5A5F"}
            />
          </View>
          {isSigningOut ? (
            <Text style={styles.signingOutText}>Signing out...</Text>
          ) : (
            <Text style={styles.logoutText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome to LifeStyle!</Text>
          <Text style={styles.subText}>Your personal lifestyle companion</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="analytics-outline" size={28} color="#6C63FF" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubbles-outline" size={28} color="#6C63FF" />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={28} color="#6C63FF" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickLinks}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.linksGrid}>
            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => navigateTo("/dashboard")}
            >
              <Ionicons name="speedometer-outline" size={24} color="#6C63FF" />
              <Text style={styles.linkText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => navigateTo("/chat")}
            >
              <Ionicons name="chatbox-outline" size={24} color="#6C63FF" />
              <Text style={styles.linkText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => navigateTo("/profile")}
            >
              <Ionicons name="person-outline" size={24} color="#6C63FF" />
              <Text style={styles.linkText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#6C63FF" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/dashboard")}
        >
          <Ionicons name="speedometer-outline" size={24} color="#888" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/chat")}
        >
          <Ionicons name="chatbox-outline" size={24} color="#888" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/profile")}
        >
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  logoutButton: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  signingOutText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  logoutText: {
    fontSize: 12,
    color: "#FF5A5F",
    marginLeft: 4,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginVertical: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  quickLinks: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  linksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  linkCard: {
    width: "30%",
    backgroundColor: "#F9F9FF",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  linkText: {
    marginTop: 8,
    fontSize: 12,
    color: "#444",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
  },
  activeNavText: {
    color: "#6C63FF",
    fontWeight: "600",
  },
});

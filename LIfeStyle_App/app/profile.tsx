import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getUser } from "@/utils/userStore";
import { useAuth } from "@clerk/clerk-expo";
import { clearUser } from "@/utils/userStore";
import axios from "axios";

// Language options
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  // { code: "🇮🇳", name: "Hindi", flag: "🇮🇳" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = getUser();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          try {
            console.log("inside the handlesignout");
            setIsSigningOut(true);

            setTimeout(async () => {
              try {
                console.log("Attempting to sign out...");
                await signOut();
                console.log("Sign out successful");

                console.log("Navigating to login screen");
                router.replace("/login");
              } catch (error) {
                console.error("Error in delayed signOut:", error);
                Alert.alert(
                  "Sign Out Error",
                  "There was a problem signing out. Please try again."
                );
                setIsSigningOut(false);
              }
            }, 500);
          } catch (error) {
            console.error("Error in handleSignOut:", error);
            Alert.alert(
              "Sign Out Error",
              "There was a problem signing out. Please try again."
            );
            setIsSigningOut(false);
          } finally {
            clearUser();
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleLanguageChange = (langCode: string) => {
    setActiveLanguage(langCode);
    // In a real app, you would update the app's language context here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <LinearGradient
        colors={["#4C51BF", "#3182CE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.placeholderRight} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Photo & Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: user?.imageUrl
                  ? user.imageUrl
                  : "https://i.pravatar.cc/300",
              }}
              style={styles.profilePhoto}
            />
          </View>

          <Text style={styles.userName}>{user?.firstName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Language</Text>

          <View style={styles.languageOptionsContainer}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  activeLanguage === lang.code && styles.activeLanguageOption,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    activeLanguage === lang.code && styles.activeLanguageName,
                  ]}
                >
                  {lang.name}
                </Text>
                {activeLanguage === lang.code && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#4C51BF"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#4A5568"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#E2E8F0", true: "#CBD5E0" }}
              thumbColor={notificationsEnabled ? "#4C51BF" : "#A0AEC0"}
              ios_backgroundColor="#E2E8F0"
              onValueChange={() => setNotificationsEnabled((prev) => !prev)}
              value={notificationsEnabled}
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Feather
                name="help-circle"
                size={20}
                color="#4A5568"
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Feather
                name="info"
                size={20}
                color="#4A5568"
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#E53E3E"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    height: 60,
    width: "100%",
    elevation: 4,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholderRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  photoContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 18,
    overflow: "hidden",
  },
  editPhotoButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#EBF8FF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4C51BF",
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4C51BF",
  },
  settingsSection: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 16,
  },
  languageOptionsContainer: {
    flexDirection: "column",
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4F8",
  },
  activeLanguageOption: {
    backgroundColor: "#F7FAFC",
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: "#4A5568",
    flex: 1,
  },
  activeLanguageName: {
    fontWeight: "600",
    color: "#2D3748",
  },
  checkIcon: {
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4F8",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#4A5568",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4F8",
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: "#4A5568",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF5F5",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E53E3E",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#A0AEC0",
    marginBottom: 20,
  },
});

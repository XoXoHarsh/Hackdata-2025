import React, { useCallback, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     // Preloads the browser for Android devices to reduce authentication load time
//     void WebBrowser.warmUpAsync();
//     return () => {
//       // Cleanup: closes browser when component unmounts
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  // useWarmUpBrowser();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhone = useCallback(async () => {}, []);

  const handleGoogleSignIn = useCallback(async () => {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    setIsSubmitting(true);
    try {
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        const { name, email, photo } = user;
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log("error while logging in: ", error);
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            setShowMessage("User cancelled the login flow");
            break;
          case statusCodes.IN_PROGRESS:
            setShowMessage("Operation (e.g. sign in) is in progress already");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setShowMessage("Play services not available or outdated");
            break;
          default:
            setShowMessage("Some other error happened");
            break;
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [router]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "370044489989-lr9h0vmph28lh987pj480r666gu18dg5.apps.googleusercontent.com",
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.contentContainer}>
          {/* App Logo/Icon */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#5A67D8", "#3182CE"]}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>L</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>Welcome to Lifestyle</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          {/* Phone Number Input with Country Code */}
          {/* <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#A0AEC0"
            />
          </View> */}
          {/* Continue Button with Gradient */}
          {/* <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePhone}
          >
            <LinearGradient
              colors={["#4C51BF", "#3182CE"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.phoneButton}
            >
              <Text style={styles.phoneText}>Continue with Phone</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          {/* OR Divider */}
          {/* <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View> */}
          {/* Google Sign-In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
            // disabled={isInProgress}
          />
          ;{/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.textLink}>Terms of Service</Text> and{" "}
            <Text style={styles.textLink}>Privacy Policy</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#F7FAFC",
    overflow: "hidden",
  },
  countryCode: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#2D3748",
  },
  buttonContainer: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  phoneButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  googleButton: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
  },
  termsText: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 18,
  },
  textLink: {
    color: "#4C51BF",
    fontWeight: "500",
  },
});

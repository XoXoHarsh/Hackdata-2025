import { Link, Redirect } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { isSignedIn } = useAuth();

  // if (!isSignedIn) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/login">View Login</Link>
      <Link href="/dashboard">View dashboard</Link>
      <Link href="/profile">View profile</Link>
      <Link href="/chat">View chat</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

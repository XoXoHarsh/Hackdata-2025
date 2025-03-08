import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

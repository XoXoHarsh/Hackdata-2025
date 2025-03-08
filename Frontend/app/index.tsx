import { useEffect } from "react";
import { useRouter } from "expo-router";
import { InteractionManager } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      router.push("/(auth)");
    });

    return () => task.cancel();
  }, [router]);

  return null;
}

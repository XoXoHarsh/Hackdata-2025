import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

// Message type definition
interface Message {
  id: string;
  text: any;
  isUser: boolean;
  language: "en" | "hi";
  timestamp: Date;
}

// Language options
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  // { code: "hi", name: "Hindi", flag: "🇮🇳" },
];

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      isUser: false,
      language: "en",
      timestamp: new Date(),
    },
    // {
    //   id: "2",
    //   text: "kya hua bhai?",
    //   isUser: false,
    //   language: "es",
    //   timestamp: new Date(),
    // },
  ]);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "hi">("en");
  const flatListRef = useRef<FlatList>(null);

  // Mock AI response function
  const getAIResponse = async (userMessage: string, language: "en" | "hi") => {
    // In a real app, this would be an API call to your AI service
    console.log("called getAIResponse ", process.env.EXPO_PUBLIC_CHAT_SERVER);
    if (language === "en") {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_CHAT_SERVER}`,
        {
          message: userMessage,
        }
      );
      console.log("response is: >>>>>>>>>>>> ", response);
      return response.data.response;
    } else {
      return `namaste! "${userMessage}". or sb badhiya?`;
    }
  };

  const handleSend = useCallback(() => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      language: activeLanguage,
      timestamp: new Date(),
    };
    console.log("handleSend called >>>>>");

    // Clear input
    setMessage("");

    // Add to messages
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate AI response after a short delay
    // setTimeout(() => {
    //   const aiResponse: Message = {
    //     id: (Date.now() + 1).toString(),
    //     text: getAIResponse(message, activeLanguage),
    //     isUser: false,
    //     language: activeLanguage,
    //     timestamp: new Date(),
    //   };
    //   setMessages((prevMessages) => [...prevMessages, aiResponse]);

    //   // Scroll to bottom
    //   flatListRef.current?.scrollToEnd({ animated: true });
    // }, 1000);
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(message, activeLanguage),
      isUser: false,
      language: activeLanguage,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
  }, [message, activeLanguage]);

  const toggleLanguage = () => {
    setActiveLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {!item.isUser && (
          <View style={styles.aiAvatarContainer}>
            <LinearGradient
              colors={["#5A67D8", "#3182CE"]}
              style={styles.aiAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.aiAvatarText}>AI</Text>
            </LinearGradient>
          </View>
        )}
        <View
          style={[
            styles.messageContent,
            item.isUser ? styles.userMessageContent : styles.aiMessageContent,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.isUser ? styles.userMessageText : styles.aiMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    );
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
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <TouchableOpacity style={styles.languageToggle}>
            <Text style={styles.languageToggleText}>LS</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Language indicator banner */}
      {/* <View style={styles.languageBanner}>
        <Text style={styles.languageBannerText}>
          Currently chatting in:{" "}
          {activeLanguage === "en" ? "English 🇺🇸" : "Spanish 🇪🇸"}
        </Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.switchButton}>
          <Text style={styles.switchButtonText}>Switch</Text>
        </TouchableOpacity>
      </View> */}

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={
              activeLanguage === "en"
                ? "Type a message..."
                : "Yha message likho..."
            }
            placeholderTextColor="#A0AEC0"
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <LinearGradient
              colors={["#4C51BF", "#3182CE"]}
              style={styles.sendButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick language selectors */}
        <View style={styles.quickLanguages}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageChip,
                activeLanguage === lang.code && styles.activeLanguageChip,
              ]}
              onPress={() => setActiveLanguage(lang.code as "en" | "hi")}
            >
              <Text style={styles.languageChipText}>
                {lang.flag} {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAvoidingView>
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
  languageToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  languageToggleText: {
    fontSize: 16,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  aiBubble: {
    alignSelf: "flex-start",
  },
  aiAvatarContainer: {
    marginRight: 8,
    alignSelf: "flex-end",
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  aiAvatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  messageContent: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  userMessageContent: {
    backgroundColor: "#4C51BF",
    borderTopRightRadius: 4,
  },
  aiMessageContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  aiMessageText: {
    color: "#2D3748",
  },
  timestamp: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.5)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  languageFlag: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  languageBanner: {
    flexDirection: "row",
    backgroundColor: "#EBF4FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  languageBannerText: {
    fontSize: 14,
    color: "#4A5568",
  },
  switchButton: {
    backgroundColor: "#4C51BF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  switchButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: "#2D3748",
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLanguages: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  languageChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F7FAFC",
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeLanguageChip: {
    backgroundColor: "#EBF8FF",
    borderColor: "#4C51BF",
  },
  languageChipText: {
    fontSize: 14,
    color: "#4A5568",
  },
});

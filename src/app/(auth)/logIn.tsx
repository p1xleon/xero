import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../../components/ui/ThemedView";
import { ThemedText } from "../../components/ui/ThemedText";
import ThemedInput from "../../components/ui/ThemedInput";
import Button from "../../components/ui/Button";
import { logIn } from "../../services/auth/firebase";
import { Link, router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await logIn({ email, password });
      Alert.alert("Success", "User logged in successfully");
      router.replace('/(tabs)')
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView>
      <View style={styles.bottomContainer}>
        <ThemedText type="title">Login</ThemedText>
        <ThemedInput placeholder="Email" value={email} keyboardType="email-address" onChangeText={setEmail} />
        <ThemedInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
        <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
        <ThemedText style={{ textAlign: "center", marginVertical: 10 }}>
          Dont have an account?<ThemedText type="defaultSemiBold"><Link href='/signUp'> Sign up</Link></ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: 10,
    textAlign: "center",
  },
});

export default Login;

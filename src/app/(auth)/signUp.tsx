import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../../components/ui/ThemedView";
import { ThemedText } from "../../components/ui/ThemedText";
import ThemedInput from "../../components/ui/ThemedInput";
import Button from "../../components/ui/Button";
import { signUp } from "../../services/auth/firebase";
import { Link } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp({ email, password, displayName });
      Alert.alert("Success", "User signed up successfully");
    } catch (error: any) {
      Alert.alert("Signup faled", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView>
      <View style={styles.bottomContainer}>
        <ThemedText type="title">SignUp</ThemedText>
        <ThemedInput placeholder="Username" value={displayName} onChangeText={setDisplayName} />
        <ThemedInput placeholder="Email" value={email} keyboardType="email-address" onChangeText={setEmail} />
        <ThemedInput placeholder="Passowrd" value={password} secureTextEntry onChangeText={setPassword} />
        <Button title={loading ? "Signing Up..." : "Sign Up"} onPress={handleSignUp} />
        <ThemedText style={{ textAlign: "center", marginVertical: 10 }}>
          Already have an account?
          <ThemedText type="defaultSemiBold">
            <Link href="/logIn"> Login</Link>
          </ThemedText>
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
  },
});

export default SignUp;

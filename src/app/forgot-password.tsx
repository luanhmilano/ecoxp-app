import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../services/api';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!username.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      await apiService.resetPassword({
        username: username.trim(),
        password: newPassword
      })

      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conexão com o servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#6b1a82" />

      <View style={styles.headerRoxo}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Redefinir Senha</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.instructionText}>
          Insira seu nome de usuário e a nova senha para redefinir o acesso.
        </Text>

        <View style={styles.formContainer}>
          
          <View style={styles.inputWrapper}>
            <Ionicons name="person" size={20} color="#6b1a82" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="NOME DE USUÁRIO"
              placeholderTextColor="#6b1a82"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#6b1a82" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="NOVA SENHA"
              placeholderTextColor="#6b1a82"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#6b1a82" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CONFIRMAR SENHA"
              placeholderTextColor="#6b1a82"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ALTERAR SENHA</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ffe0',
  },
  headerRoxo: {
    backgroundColor: '#6b1a82',
    width: '100%',
    height: 100,
    borderBottomRightRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Belleza',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6b1a82',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#6b1a82',
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: '#6b1a82',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
});

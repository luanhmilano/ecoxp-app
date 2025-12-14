import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../providers/auth-provider';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function EmailForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

  const handleLogin = async () => {
    if (!usernameOrEmail.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      clearError();
      await login({ 
        usernameOrEmail: usernameOrEmail.trim(), 
        password 
      });

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Falha no Login', 
        error instanceof Error ? error.message : 'Ocorreu um erro durante o login'
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      )}
      
      <View style={styles.inputWrapper}>
        <Ionicons name="person" size={20} color="#6b1a82" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="NOME DE USUÁRIO"
          placeholderTextColor="#6b1a82"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="username"
          editable={!isLoading}
        />
      </View>
      
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed" size={20} color="#6b1a82" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="SENHA"
          placeholderTextColor="#6b1a82"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          editable={!isLoading}
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>ENTRAR</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotPasswordContainer}
        onPress={() => router.push('/forgot-password')}
        disabled={isLoading}
      >
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
    backgroundColor: 'transparent',
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
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#6b1a82',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 5,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#6b1a82',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
});
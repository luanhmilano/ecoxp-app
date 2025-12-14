import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../providers/auth-provider';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading, error, clearError } = useAuth();

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      clearError();
      await register({ 
        username: name.trim(), 
        email: email.trim(), 
        password 
      });
      
      Alert.alert(
        'Conta criada com sucesso!', 
        'Sua conta foi criada. Por favor, faça login para continuar.',
        [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              router.replace('/login');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Falha ao criar conta', 
        error instanceof Error ? error.message : 'Ocorreu um erro durante o registro'
      );
    }
  };

  const logo = require('./../../assets/images/ecoxp-logo.png');

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        
        <View style={styles.headerRoxo}>
          <Text style={styles.textoSignup}>Cadastro</Text>
        </View>

        <View style={styles.bodyContent}>
          <View style={styles.headerLogoArea}>
            <Image 
              style={styles.logo}
              source={logo}
            />
            <Text style={styles.subtitle}>Crie sua conta para começar</Text>
          </View>

          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={20} color="#6b1a82" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="NOME DE USUÁRIO"
                placeholderTextColor="#6b1a82"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail" size={20} color="#6b1a82" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="EMAIL"
                placeholderTextColor="#6b1a82"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
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

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" size={20} color="#6b1a82" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="CONFIRMAR SENHA"
                placeholderTextColor="#6b1a82"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.createButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.createButtonText}>
                {isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/login" asChild>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>JÁ TENHO CONTA</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.footerContainer}>
            <Link href="/help" asChild>
              <TouchableOpacity style={styles.helpButton}>
                <Ionicons name="help-circle-outline" size={20} color="#6b1a82" />
                <Text style={styles.helpText}>Precisa de Ajuda?</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#e9ffe0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerRoxo: {
    backgroundColor: '#6b1a82',
    width: '65%',
    height: 100,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  textoSignup: {
    color: '#fff',
    fontSize: 38,
    fontFamily: 'Belleza',
  },
  bodyContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerLogoArea: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: 16,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
  createButton: {
    backgroundColor: '#6b1a82',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#6b1a82',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: '#6b1a82',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  footerContainer: {
    alignItems: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },
  helpText: {
    color: '#6b1a82',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
  },
});

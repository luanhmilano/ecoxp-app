import { Link, Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import EmailForm from '../components/auth/email-form';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
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
          <Text style={styles.textoLogin}>Fazer Login</Text>
        </View>

        <View style={styles.bodyContent}>
          <View style={styles.headerLogoArea}>
            <Image 
              style={styles.logo}
              source={logo}
            />
          </View>

          <View style={styles.formContainer}>
            <EmailForm />

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <Link href="/signup" asChild>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>CADASTRE-SE</Text>
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
  textoLogin: {
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
    width: 180, 
    height: 180,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
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
  }
});
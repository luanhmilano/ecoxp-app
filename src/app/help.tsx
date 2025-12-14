import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, ScrollView, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HelpScreen() {
  const router = useRouter();

  const handlePress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Não é possível abrir a URL: ${url}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mascote = require('./../../assets/images/mascote.png');

  const contactInfo = {
    email: 'mailto:ecoxp.belem@gmail.com',
    instagram: 'https://www.instagram.com/ecoxpbelem',
    whatsapp: 'https://wa.me/559140028922',
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#6b1a82" />

      <View style={styles.headerRoxo}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Central de Ajuda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.contactList}>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress(contactInfo.email)}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="gmail" size={32} color="#EA4335" />
            </View>
            <Text style={styles.contactText}>ecoxp.belem@gmail.com</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress(contactInfo.instagram)}>
            <View style={styles.iconContainer}>
              <Ionicons name="logo-instagram" size={32} color="#E1306C" />
            </View>
            <Text style={styles.contactText}>@ecoxpbelem</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress(contactInfo.whatsapp)}>
            <View style={styles.iconContainer}>
              <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
            </View>
            <Text style={styles.contactText}>+ 55 (91) 4002-8922</Text>
          </TouchableOpacity>
          
          <View style={styles.separator} />

        </View>

        <View style={styles.footerArea}>
            <View style={styles.bubbleContainer}>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>
                  Atendimento em{'\n'}
                  horário comercial{'\n'}
                  8h às 18h{'\n'}
                  (dias úteis)
                </Text>
              </View>
              <View style={styles.bubbleArrow} />
            </View>

            <Image 
              source={mascote}
              style={styles.mascotImage}
              contentFit="contain"
            />
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
    fontSize: 28,
    fontFamily: 'Belleza',
  },
  content: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  contactList: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
    marginRight: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#A855BC',
    opacity: 0.3,
    width: '100%',
  },
  footerArea: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  mascotImage: {
    width: 200,
    height: 200,
    marginLeft: -50,
    marginTop: -50,
  },
  bubbleContainer: {
    alignItems: 'flex-start',
    marginLeft: 40,
    marginBottom: 10,
  },
  bubble: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6b1a82',
    borderRadius: 15,
    padding: 15,
    maxWidth: 200,
    zIndex: 2,
  },
  bubbleText: {
    color: '#6b1a82',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6b1a82',
    transform: [{ rotate: '55deg' }],
    marginLeft: 20,
    marginTop: -6,
  }
});
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

interface TeamMemberProps {
  name: string;
  role: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, icon, description }) => {
  return (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={32} color="#6b1a82" />
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{name}</Text>
          <Text style={styles.memberRole}>{role}</Text>
        </View>
      </View>
      <Text style={styles.memberDescription}>{description}</Text>
    </View>
  );
};

export default function AboutUsScreen() {
  const mascote = require('./../../../assets/images/mascote.png');

  const teamMembers = [
    {
      name: "Debora Santiago",
      role: "Tec. Desenvolvimento de Sistemas",
      icon: "code-working" as keyof typeof Ionicons.glyphMap,
      description: "19 anos."
    },
    {
      name: "Layne Souza",
      role: "Tec. Desenvolvimento de Sistemas", 
      icon: "code-working" as keyof typeof Ionicons.glyphMap,
      description: "18 anos."
    },
    {
      name: "Victor Leal",
      role: "Tec. Desenvolvimento de Sistemas", 
      icon: "code-working" as keyof typeof Ionicons.glyphMap,
      description: "19 anos."
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a82" />
      
      {/* Header Roxo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sobre Nós</Text>
        <Text style={styles.headerSubtitle}>Conheça a equipe EcoXP</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Nossa Missão</Text>
          <Text style={styles.introText}>
            Transformar a reciclagem em uma experiência divertida e recompensadora, 
            conectando pessoas em prol de um futuro mais sustentável através da tecnologia.
          </Text>
        </View>

        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Nossa Equipe</Text>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              icon={member.icon}
              description={member.description}
            />
          ))}
        </View>

        {/* Espaço para o mascote não sobrepor o conteúdo */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Mascote no canto inferior direito */}
      <View style={styles.mascotContainer}>
        <Image 
          source={mascote}
          style={styles.mascotImage}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ffe0',
  },
  header: {
    backgroundColor: '#6b1a82',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Belleza',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E1BEE7',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Espaço extra para o mascote
  },
  introSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  teamSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  memberCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1BEE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  memberRole: {
    fontSize: 14,
    color: '#6b1a82',
    fontWeight: '600',
  },
  memberDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 80,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: 20,
    right: -20,
    zIndex: 1,
  },
  mascotImage: {
    width: 120,
    height: 120,
  },
});
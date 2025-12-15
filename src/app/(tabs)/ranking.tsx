import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Mock de usuários para o ranking
const USUARIOS_RANKING = [
  { id: 1, nome: 'Dugol', xp: 850, posicao: 1 },
  { id: 2, nome: 'Javac', xp: 720, posicao: 2 },
  { id: 3, nome: 'Debs', xp: 650, posicao: 3 },
  { id: 4, nome: 'Caca', xp: 580, posicao: 4 },
  { id: 5, nome: 'Spolay', xp: 420, posicao: 5 },
  { id: 6, nome: 'Dudu', xp: 350, posicao: 6 },
];

// Função para determinar o ícone da posição
const getPositionIcon = (posicao: number) => {
  switch (posicao) {
    case 1: return { name: 'trophy' as const, color: '#FFD700' }; // Ouro
    case 2: return { name: 'medal' as const, color: '#C0C0C0' }; // Prata
    case 3: return { name: 'medal' as const, color: '#CD7F32' }; // Bronze
    default: return { name: 'person-circle' as const, color: '#999' };
  }
};

// Componente para cada item do ranking
const RankingItem = ({ usuario }: { usuario: typeof USUARIOS_RANKING[0] }) => {
  const icon = getPositionIcon(usuario.posicao);
  
  return (
    <View style={styles.rankingItem}>
      <View style={styles.positionContainer}>
        <Ionicons name={icon.name} size={24} color={icon.color} />
        <Text style={styles.positionText}>{usuario.posicao}º</Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{usuario.nome}</Text>
        <Text style={styles.userXp}>{usuario.xp} XP</Text>
      </View>
      
      <View style={styles.xpBadge}>
        <Text style={styles.xpBadgeText}>{usuario.xp}</Text>
      </View>
    </View>
  );
};

export default function RankingScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="trophy" size={28} color="#fff" />
          <Text style={styles.headerTitle}>Ranking</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Título da seção com mascote */}
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Image 
              source={require('../../../assets/images/mascote-trofeu.png')} 
              style={styles.mascoteTrofeu}
              resizeMode="contain"
            />
            <Text style={styles.sectionTitle}>Top Eco-Warriors</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Os maiores defensores do meio ambiente</Text>
        </View>

        {/* Pódio dos 3 primeiros */}
        <View style={styles.podiumContainer}>
          {USUARIOS_RANKING.slice(0, 3).map((usuario, index) => {
            const heights = [120, 100, 80]; // Alturas diferentes para simular pódio
            const positions = [1, 0, 2]; // Ordem de exibição: 2º, 1º, 3º
            const actualIndex = positions[index];
            const actualUser = USUARIOS_RANKING[actualIndex];
            const icon = getPositionIcon(actualUser.posicao);
            
            return (
              <View key={actualUser.id} style={[styles.podiumItem, { height: heights[actualIndex] }]}>
                <View style={styles.podiumUser}>
                  <Ionicons name={icon.name} size={32} color={icon.color} />
                  <Text style={styles.podiumName}>{actualUser.nome.split(' ')[0]}</Text>
                  <Text style={styles.podiumXp}>{actualUser.xp} XP</Text>
                </View>
                <View style={[styles.podiumBase, { backgroundColor: icon.color }]}>
                  <Text style={styles.podiumPosition}>{actualUser.posicao}º</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Lista completa do ranking */}
        <View style={styles.fullRankingContainer}>
          <Text style={styles.fullRankingTitle}>Classificação Completa</Text>
          {USUARIOS_RANKING.map((usuario) => (
            <RankingItem key={usuario.id} usuario={usuario} />
          ))}
        </View>

        {/* Estatísticas gerais */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estatísticas Gerais</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={24} color="#6b1a82" />
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Participantes</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={24} color="#43A047" />
              <Text style={styles.statNumber}>3,570</Text>
              <Text style={styles.statLabel}>XP Total</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="leaf" size={24} color="#2E7D32" />
              <Text style={styles.statNumber}>357</Text>
              <Text style={styles.statLabel}>Coletas</Text>
            </View>
          </View>
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
  
  // Header
  header: {
    backgroundColor: '#6b1a82',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Belleza'
  },

  // Content
  content: {
    flex: 1,
    padding: 20,
  },
  
  // Section Header
  sectionHeader: {
    marginBottom: 30,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  mascoteTrofeu: {
    width: 60,
    height: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },

  // Pódio
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 60,
    gap: 10,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumUser: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    minHeight: 80,
    justifyContent: 'center',
  },
  podiumName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  podiumXp: {
    fontSize: 10,
    color: '#666',
  },
  podiumBase: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podiumPosition: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Ranking completo
  fullRankingContainer: {
    marginBottom: 30,
  },
  fullRankingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  positionContainer: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 40,
  },
  positionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userXp: {
    fontSize: 12,
    color: '#666',
  },
  xpBadge: {
    backgroundColor: '#6b1a82',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Estatísticas
  statsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 50,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
import React from 'react';
import { StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/providers/auth-provider';

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              Alert.alert(
                'Logout Failed', 
                error instanceof Error ? error.message : 'An error occurred during logout'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedView style={styles.avatarContainer}>
            <Ionicons
              name="person-circle"
              size={80}
              color="#007AFF"
            />
          </ThemedView>
          <ThemedText type="title" style={styles.name}>
            {user?.username || 'User'}
          </ThemedText>
          <ThemedText style={styles.email}>
            {user?.email || 'user@example.com'}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.infoSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Account Information
            </ThemedText>
            
            <ThemedView style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#666" />
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.infoLabel}>Username</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {user?.username || 'Not available'}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color="#666" />
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.infoLabel}>Email</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {user?.email || 'Not available'}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#666" />
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.infoLabel}>Member since</ThemedText>
                <ThemedText style={styles.infoValue}>Not available</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Ionicons name="log-out" size={20} color="#fff" />
            <ThemedText style={styles.logoutButtonText}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  infoContainer: {
    flex: 1,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    gap: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
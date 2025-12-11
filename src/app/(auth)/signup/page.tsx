import colors from "@/constants/colors";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeArea = ({ children, style }: { children: React.ReactNode; style?: any }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, style]}>
            {children}
        </View>
    );
};

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        console.log('Signing up with:', { name, email, password });
    }

    return (
        <SafeArea style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.white} />
                    </Pressable>
                    <Text style={styles.logoText}>
                        Dev <Text style={{ color: colors.green }}>EcoXP</Text>
                    </Text>
                    <Text style={styles.slogan}>
                        Criar uma conta
                    </Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput
                            placeholder="Nome completo..."
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="Digite seu email..."
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            placeholder="Digite sua senha..."
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Pressable style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.zinc,
    },
    header: {
        backgroundColor: colors.zinc,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 0,
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 16,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    button: {
        backgroundColor: colors.green,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
        width: '100%',
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },    
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    }
});
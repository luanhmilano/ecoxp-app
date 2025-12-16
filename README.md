# EcoXP App

Uma aplicação inovadora focada em sustentabilidade e experiências ecológicas, desenvolvida com React Native e Expo.

## 📋 Descrição

O EcoXP App é uma plataforma que conecta usuários com práticas sustentáveis, oferecendo experiências ecológicas e promovendo a consciência ambiental através de tecnologia moderna. A aplicação possui sistema de autenticação, mapas interativos, gamificação e comunidade de usuários conscientes.

## 🌟 Funcionalidades

- 🌱 Rastreamento de atividades sustentáveis
- 📊 Dashboard de impacto ambiental
- 🏆 Sistema de gamificação eco-friendly
- 📍 Mapa de locais sustentáveis
- 👥 Comunidade de usuários conscientes
- 📈 Relatórios de progresso pessoal
- 🔐 Sistema de autenticação (login, cadastro, recuperação de senha)
- 📱 Interface responsiva com navegação por abas

## 🚀 Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **Expo Router** para navegação
- **Node.js** (backend)
- APIs de geolocalização
- Sistema de navegação por abas

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Rotas da aplicação
│   ├── (tabs)/            # Navegação por abas
│   ├── index.tsx          # Tela inicial
│   ├── login.tsx          # Tela de login
│   ├── signup.tsx         # Tela de cadastro
│   ├── forgot-password.tsx # Recuperação de senha
│   ├── map.tsx            # Mapa interativo
│   └── help.tsx           # Ajuda
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes de interface
│   └── auth/             # Componentes de autenticação
├── constants/            # Constantes da aplicação
├── hooks/                # Hooks customizados
├── providers/            # Provedores de contexto
└── services/             # Serviços e APIs
```

## 📦 Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI**: 
  ```bash
  npm install -g @expo/cli
  ```
- **Expo Go** no seu dispositivo móvel (App Store/Play Store)

### 1. Clone e Instale

```bash
git clone https://github.com/luanhmilano/ecoxp-app.git # Branch 'Proto' 
cd ecoxp-app
npm install
```

## 📱 Como Executar o App

### Executar no Dispositivo Móvel com Expo Go

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   expo start
   ```

2. **No seu dispositivo móvel:**
   - Instale o app **Expo Go** (App Store/Play Store)
   - Abra o Expo Go
   - **Android**: Escaneie o QR code diretamente
   - **iOS**: Use a câmera do iPhone para escanear o QR code

3. **Métodos alternativos de conexão:**
   ```bash
   # Modo túnel (caso não conecte na mesma rede)
   npm start -- --tunnel
   
   # Limpar cache
   npm start -- --clear
   ```

### Executar no Emulador/Simulador

#### Android Emulator
```bash
npm run android
# ou
expo run:android
```

#### iOS Simulator (apenas macOS)
```bash
npm run ios
# ou
expo run:ios
```

#### Navegador Web
```bash
npm run web
# ou
expo start --web
```

## 🔨 Build para Produção

### Usando EAS Build

1. **Configure o EAS:**
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. **Build para Android:**
   ```bash
   eas build --platform android
   ```

3. **Build para iOS:**
   ```bash
   eas build --platform ios
   ```

## ⚠️ Problemas Comuns e Soluções

### 1. Erro de Cache do Metro Bundler
**Problema**: Aplicação não reflete mudanças no código

**Solução**:
```bash
npm start -- --clear
# ou
expo r -c
```

### 2. Problemas de Conexão com Expo Go
**Problema**: Não consegue conectar o dispositivo ao servidor

**Soluções**:
- Certifique-se que dispositivo e computador estão na mesma rede Wi-Fi
- Use modo túnel: `npm start -- --tunnel`
- Verifique configurações de firewall
- Tente reiniciar o roteador

### 3. Erro "Module not found" ou dependências
**Problema**: Erros de módulos não encontrados

**Solução**:
```bash
rm -rf node_modules package-lock.json
npm install
# ou no Windows
rmdir /s node_modules
del package-lock.json
npm install
```

### 4. Erros de TypeScript
**Problema**: Falhas na compilação TypeScript

**Soluções**:
- Verifique o arquivo [tsconfig.json](tsconfig.json)
- Execute: `npx tsc --noEmit` para verificar erros
- Instale types necessários: `npm install @types/nome-do-pacote`

### 5. Problemas com Assets (Imagens/Fontes)
**Problema**: Assets não carregam

**Soluções**:
- Verifique se estão na pasta [assets/](assets/)
- Confirme imports corretos
- Execute `expo install expo-asset expo-font`

### 6. Erro de Permissões no Android
**Problema**: App não solicita permissões necessárias

**Solução**:
Verifique configurações no [app.json](app.json):
```json
{
  "expo": {
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "CAMERA"
      ]
    }
  }
}
```

### 7. Problemas de API/Backend
**Problema**: Não consegue conectar com APIs

**Soluções**:
- Verifique URLs de API no arquivo de configuração
- Use `http://10.0.2.2:3000` para Android Emulator
- Use `http://localhost:3000` para iOS Simulator
- Para dispositivo físico, use o IP da máquina

### 8. Erro "Expo CLI is not installed"
**Problema**: Expo CLI não reconhecido

**Solução**:
```bash
npm uninstall -g expo-cli
npm install -g @expo/cli
```

## 🧪 Comandos Úteis

```bash
# Desenvolvimento
npm start                    # Inicia servidor
npm run android             # Android emulator
npm run ios                 # iOS simulator
npm run web                 # Navegador

# Limpeza e Debug
expo r -c                   # Limpa cache
expo doctor                 # Diagnóstica problemas
expo install --fix          # Corrige dependências

# Build e Deploy
eas build --platform android
eas build --platform ios
eas submit --platform android
```

## 📱 Como Usar o App

1. **Primeiro Acesso:**
   - Faça cadastro em [signup.tsx](src/app/signup.tsx)
   - Complete seu perfil eco
   - Configure preferências

2. **Navegação Principal:**
   - Use as abas inferiores para navegar
   - Acesse o mapa em [map.tsx](src/app/map.tsx)
   - Consulte ajuda em [help.tsx](src/app/help.tsx)

3. **Funcionalidades:**
   - Explore atividades sustentáveis próximas
   - Registre suas ações verdes
   - Acompanhe progresso no dashboard
   - Participe da comunidade

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

Desenvolvido com 💚 pela equipe EcoXP
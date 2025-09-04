import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = async (path) => {
    if (isLoading) return; // evita múltiplos cliques
    setIsLoading(true);

    try {
      // aqui você pode já navegar
      router.push(path);
    } finally {
      // se quiser reabilitar após a navegação terminar, pode usar isso
      // mas se a outra tela fizer requisição, recomendo deixar a lógica lá
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#423101',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          },
          title: 'Menu Principal Sabores Mapa',
        }}
      />

      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={() => handleNavigation('/produto')}
      >
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={() => handleNavigation('/estoque')}
      >
        <Text style={styles.buttonText}>Adicionar Estoque</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={() => handleNavigation('/venda')}
      >
        <Text style={styles.buttonText}>Cadastrar Venda</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={() => handleNavigation('/get')}
      >
        <Text style={styles.buttonText}>Visualizar Produtos</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={() => handleNavigation('/delete')}
      >
        <Text style={styles.buttonText}>Deletar Produtos</Text>
      </Pressable>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#634900',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 500,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  button: {
    backgroundColor: '#7a6b40',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

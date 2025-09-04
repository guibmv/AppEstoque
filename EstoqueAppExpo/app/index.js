import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={
        { headerStyle: {
          backgroundColor: '#423101',   // cor do header
          shadowColor: '#000',        // cor da sombra (iOS)
          shadowOffset: { width: 0, height: 3 },  // deslocamento da sombra (iOS)
          shadowOpacity: 0.3,         // opacidade da sombra (iOS)
          shadowRadius: 4,            // raio da sombra (iOS)
          elevation: 5               // sombra no Android
        },
        title: 'Menu Principal Sabores Mapa' }} 
      />
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Pressable style={styles.button} onPress={() => router.push('/produto')}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/estoque')}>
        <Text style={styles.buttonText}>Adicionar Estoque</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/venda')}>
        <Text style={styles.buttonText}>Cadastrar Venda</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/get')}>
        <Text style={styles.buttonText}>Visualizar Produtos</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/delete')}>
        <Text style={styles.buttonText}>Deletar Produtos</Text>
      </Pressable>
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

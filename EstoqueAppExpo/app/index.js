import { View, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Minha Empresa</Text>

      <Button title="Cadastrar Produto" onPress={() => router.push('/produto')} />
      <Button title="Adicionar Estoque" onPress={() => router.push('/estoque')} />
      <Button title="Cadastrar Venda" onPress={() => router.push('/venda')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});

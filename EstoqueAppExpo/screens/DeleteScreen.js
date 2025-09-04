import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function DeleteScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // controla produto sendo excluído

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/produtos`);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para excluir produto
  const excluirProduto = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`${API_URL}/produtos/${id}`);
      Alert.alert('Sucesso', 'Produto excluído com sucesso!');
      fetchProdutos(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    } finally {
      setDeletingId(null);
    }
  };

  // Confirmação antes de excluir
  const confirmarExclusao = (id, nome) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Você tem certeza que deseja excluir o produto "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => excluirProduto(id) }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7a6b40" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Excluir Produtos',
        headerStyle: { backgroundColor: '#423101' },
        headerTintColor: '#fff',
      }} />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, deletingId === item._id && { opacity: 0.5 }]}
            onPress={() => (deletingId ? null : confirmarExclusao(item._id, item.nome))}
            disabled={!!deletingId}
          >
            {deletingId === item._id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.text}>Estoque: {item.estoque}</Text>
                <Text style={styles.text}>Preço: R$ {item.preco.toFixed(2)}</Text>
              </>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#634900',
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#7a6b40',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#f0f0f0',
  },
});

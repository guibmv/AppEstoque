import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function HomeScreen() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await axios.get(`${API_URL}/produtos`);
        setProdutos(res.data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nome} - R$ {item.preco.toFixed(2)}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 👈 fundo branco
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

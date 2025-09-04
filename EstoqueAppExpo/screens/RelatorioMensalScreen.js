import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Picker, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function RelatorioMensalScreen() {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);
  const [produtoMaisVendido, setProdutoMaisVendido] = useState(null);

  const anosDisponiveis = [2023, 2024, 2025]; // você pode gerar dinamicamente

  const meses = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 },
  ];

  const fetchVendasMensais = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/vendas/?ano=${ano}&mes=${mes}`);
      const dados = response.data;

      setVendas(dados);

      // Cálculo do faturamento total
      const total = dados.reduce((acc, item) => acc + item.totalVendido, 0);
      setFaturamentoTotal(total);

      // Produto mais vendido
      if (dados.length > 0) {
        const maisVendido = dados.reduce((prev, current) => 
          prev.quantidadeVendida > current.quantidadeVendida ? prev : current
        );
        setProdutoMaisVendido(maisVendido.produto.nome);
      } else {
        setProdutoMaisVendido(null);
      }

    } catch (error) {
      console.error('Erro ao buscar vendas mensais:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendasMensais();
  }, [ano, mes]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7a6b40" />
        <Text>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Relatório Mensal',
          headerStyle: { backgroundColor: '#423101' },
          headerTintColor: '#fff',
        }} 
      />

      {/* Filtros */}
      <View style={styles.filtros}>
        <Picker
          selectedValue={ano}
          style={styles.picker}
          onValueChange={(value) => setAno(value)}
        >
          {anosDisponiveis.map((a) => (
            <Picker.Item key={a} label={`${a}`} value={a} />
          ))}
        </Picker>

        <Picker
          selectedValue={mes}
          style={styles.picker}
          onValueChange={(value) => setMes(value)}
        >
          {meses.map((m) => (
            <Picker.Item key={m.value} label={m.label} value={m.value} />
          ))}
        </Picker>

        <Pressable style={styles.button} onPress={fetchVendasMensais}>
          <Text style={styles.buttonText}>Filtrar</Text>
        </Pressable>
      </View>

      {/* Faturamento e Produto Mais Vendido */}
      <View style={styles.resumo}>
        <Text style={styles.resumoText}>Faturamento Total: R$ {faturamentoTotal.toFixed(2)}</Text>
        {produtoMaisVendido && (
          <Text style={styles.resumoText}>Produto Mais Vendido: {produtoMaisVendido}</Text>
        )}
      </View>

      {/* Lista de produtos vendidos */}
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.produto._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.produto.nome}</Text>
            <Text style={styles.text}>Quantidade Vendida: {item.quantidadeVendida}</Text>
            <Text style={styles.text}>Total Vendido: R$ {item.totalVendido.toFixed(2)}</Text>
          </View>
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
  filtros: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    flex: 1,
    color: '#fff',
    backgroundColor: '#7a6b40',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#423101',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resumo: {
    marginBottom: 15,
  },
  resumoText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#7a6b40',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
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

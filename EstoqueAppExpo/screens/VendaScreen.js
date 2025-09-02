import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function VendaScreen() {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [total, setTotal] = useState('');

  const cadastrarVenda = async () => {
    if (!produtoId || !quantidade || !total) return Alert.alert('Erro', 'Preencha todos os campos');

    try {
      const res = await axios.post(`${API_URL}/vendas`, {
        produto: produtoId,
        quantidade: Number(quantidade),
        total: Number(total)
      });

      Alert.alert('Venda registrada');
      setProdutoId('');
      setQuantidade('');
      setTotal('');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível registrar a venda');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ID do Produto" value={produtoId} onChangeText={setProdutoId} />
      <TextInput style={styles.input} placeholder="Quantidade Vendida" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Total (R$)" value={total} onChangeText={setTotal} keyboardType="numeric" />
      <Button title="Finalizar Venda" onPress={cadastrarVenda} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }
});

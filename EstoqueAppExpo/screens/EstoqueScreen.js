import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function EstoqueScreen() {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const adicionarEstoque = async () => {
    if (!produtoId || !quantidade) return Alert.alert('Erro', 'Preencha produto ID e quantidade');

    try {
      const res = await axios.put(`${API_URL}/produtos`, {
        produto: produtoId,
        quantidade: Number(quantidade)
      });

      Alert.alert('Sucesso', 'Estoque atualizado');
      setProdutoId('');
      setQuantidade('');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar o estoque');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ID do Produto" value={produtoId} onChangeText={setProdutoId} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <Button title="Adicionar Estoque" onPress={adicionarEstoque} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }
});

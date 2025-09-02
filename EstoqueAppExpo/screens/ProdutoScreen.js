import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function ProdutoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const salvarProduto = async () => {
    if (!nome || !preco) return Alert.alert('Erro', 'Preencha nome e preço');

    try {
      const res = await axios.post(`${API_URL}/produtos`, {
        nome,
        descricao,
        preco: Number(preco),
        estoque: 0
      });

      Alert.alert('Sucesso', `Produto ${res.data.nome} salvo`);
      setNome('');
      setDescricao('');
      setPreco('');
      // opcional: navegar ou atualizar lista
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome do produto" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Button title="Salvar Produto" onPress={salvarProduto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }
});

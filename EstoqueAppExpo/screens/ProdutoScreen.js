import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function ProdutoScreen() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // novo estado para loading

  const salvarProduto = async () => {
    if (loading) return; // impede cliques múltiplos
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    if (!nome || !preco) {
      setMessage('Preencha nome e preço');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/produtos`, {
        nome,
        descricao,
        preco: Number(preco),
        estoque: 0,
      });

      setMessage(`Produto ${res.data.nome} salvo com sucesso!`);
      setIsSuccess(true);
      setNome('');
      setDescricao('');
      setPreco('');
    } catch (err) {
      console.error(err);
      setMessage('Não foi possível salvar o produto');
      setIsSuccess(false);
    } finally {
      setLoading(false);
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
          title: 'Cadastrar Produto',
        }}
      />

      {message ? (
        <View style={[styles.messageBox, isSuccess ? styles.successBox : styles.errorBox]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        placeholderTextColor="#ccc"
      />

      <Pressable
        style={[styles.button, loading && styles.disabledButton]}
        onPress={salvarProduto}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar Produto</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#634900',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderColor: '#7a6b40',
    width: '80%',
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
  messageBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
  },
  successBox: {
    backgroundColor: '#4CAF50',
  },
  errorBox: {
    backgroundColor: '#F44336',
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

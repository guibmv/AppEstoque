import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function EstoqueScreen() {
  const [isProductListVisible, setIsProductListVisible] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // carregando lista
  const [saving, setSaving] = useState(false); // carregando atualização de estoque
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/produtos`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Não foi possível carregar a lista de produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsProductListVisible(false);
  };

  const adicionarEstoque = async () => {
    if (saving) return; // evita múltiplos cliques
    setSaving(true);
    setMessage('');
    setIsSuccess(false);

    if (!selectedProduct || !quantidade) {
      setMessage('Selecione um produto e preencha a quantidade');
      setSaving(false);
      return;
    }

    try {
      const novoEstoque = (selectedProduct.estoque || 0) + Number(quantidade);

      await axios.put(`${API_URL}/produtos/${selectedProduct._id}/estoque`, {
        estoque: novoEstoque,
      });

      setMessage('Estoque atualizado com sucesso!');
      setIsSuccess(true);
      setQuantidade('');
      setSelectedProduct(null);
      setIsProductListVisible(true);

      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('Não foi possível atualizar o estoque');
      setIsSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  const renderProductItem = ({ item }) => (
    <Pressable style={styles.productItem} onPress={() => handleProductSelect(item)}>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productStock}>Estoque: {item.estoque || 0}</Text>
    </Pressable>
  );

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
          title: 'Adicionar Estoque',
        }}
      />

      {message ? (
        <View style={[styles.messageBox, isSuccess ? styles.successBox : styles.errorBox]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color="#7a6b40" />
      ) : isProductListVisible ? (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Produto Selecionado"
            value={selectedProduct?.nome}
            editable={false}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <Pressable
            style={[styles.button, saving && styles.disabledButton]}
            onPress={adicionarEstoque}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Adicionar Estoque</Text>
            )}
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => setIsProductListVisible(true)}>
            <Text style={styles.secondaryButtonText}>Voltar para a Lista</Text>
          </Pressable>
        </View>
      )}
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
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  productItem: {
    backgroundColor: '#7a6b40',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productStock: {
    color: '#f5f5f5',
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#7a6b40',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
  secondaryButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    borderColor: '#7a6b40',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#7a6b40',
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

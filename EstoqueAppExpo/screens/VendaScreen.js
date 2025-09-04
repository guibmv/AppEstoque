import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function VendaScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [total, setTotal] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProductListVisible, setIsProductListVisible] = useState(true);

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

  const cadastrarVenda = async () => {
    setMessage('');
    setIsSuccess(false);

    if (!selectedProduct || !quantidade || !total) {
      setMessage('Preencha todos os campos');
      return;
    }

    // validação do estoque
    if (Number(quantidade) > selectedProduct.estoque) {
      Alert.alert(
        'Estoque insuficiente',
        `O produto "${selectedProduct.nome}" possui apenas ${selectedProduct.estoque} unidades em estoque.`
      );
      return;
    }

    try {
      // registra a venda
      await axios.post(`${API_URL}/vendas`, {
        produto: selectedProduct._id,
        quantidade: Number(quantidade),
        total: Number(total)
      });

      // atualiza o estoque no backend (subtrai quantidade vendida)
      const novoEstoque = selectedProduct.estoque - Number(quantidade);
      await axios.put(`${API_URL}/produtos/${selectedProduct._id}/estoque`, {
        estoque: novoEstoque
      });

      setMessage('Venda registrada com sucesso!');
      setIsSuccess(true);

      // limpa os campos e volta para a lista
      setQuantidade('');
      setTotal('');
      setSelectedProduct(null);
      setIsProductListVisible(true);

      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('Não foi possível registrar a venda');
      setIsSuccess(false);
    }
  };

  const renderProductItem = ({ item }) => (
    <Pressable style={styles.productItem} onPress={() => handleProductSelect(item)}>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDesc}>{item.descricao}</Text>
      <Text style={styles.productPrice}>Preço: R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.productStock}>Estoque: {item.estoque || 0}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerStyle: {
          backgroundColor: '#423101',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5
        },
        title: 'Cadastrar Venda'
      }} />

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
            placeholder="Quantidade Vendida"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Total (R$)"
            value={total}
            onChangeText={setTotal}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <Pressable style={styles.button} onPress={cadastrarVenda}>
            <Text style={styles.buttonText}>Finalizar Venda</Text>
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
  productDesc: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    color: '#eee',
    fontSize: 14,
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

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function VisualizarScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/produtos`);
            setProducts(res.data);
            setMessage('');
        } catch (err) {
            console.error(err);
            setMessage('Não foi possível carregar a lista de produtos');
        } finally {
            setLoading(false);
        }
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.nome}</Text>
            <Text style={styles.productDetail}>Descrição: {item.descricao}</Text>
            <Text style={styles.productDetail}>Preço: R$ {item.preco.toFixed(2)}</Text>
            <Text style={styles.productDetail}>Estoque: {item.estoque || 0}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={
                {
                    headerStyle: {
                        backgroundColor: '#423101',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5
                    },
                    title: 'Visualizar Produtos'
                }
            } />

            {loading ? (
                <ActivityIndicator size="large" color="#7a6b40" />
            ) : message ? (
                <View style={[styles.messageBox, styles.errorBox]}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#634900',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: '100%',
        paddingTop: 10,
    },
    productItem: {
        backgroundColor: '#7a6b40',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
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
        marginBottom: 5,
    },
    productDetail: {
        color: '#f5f5f5',
        fontSize: 14,
    },
    messageBox: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '80%',
        textAlign: 'center',
    },
    errorBox: {
        backgroundColor: '#F44336',
    },
    messageText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

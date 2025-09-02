const cadastrarProduto = async () => {
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: produto,
        preco: Number(preco),
        categoria: categoria,
        estoque: Number(estoque)
      })
    });
    const data = await resposta.json();
    console.log('✅ Produto cadastrado:', data);
  } catch (erro) {
    console.error('❌ Erro ao cadastrar produto:', erro);
  }
};



192.168.0.198
Um aplicativo desenvolvido com a intenção de ajudar minha mãe com o controle de estoque e controle das suas vendas de marmita.
Minha mãe até então utilizava apenas uma agenda para controlar suas vendas e seu estoque de produtos, foi aí que decidi ajudá-la desenvolvendo um aplicativo para que ela possa controlar pelo seu celular o seu estoque e suas vendas.
O aplicativo utilizou as seguintes tecnologias para desenvolvimento...

Front-end
. React Native (Expo) → para criar o aplicativo mobile multiplataforma.
. Axios → para consumir a API do backend (fazer requisições HTTP).
. React Navigation (implícito, já que você tem várias telas) → para gerenciar a navegação entre telas.
. Componentes nativos do React Native (View, Text, TextInput, FlatList, Button, StyleSheet) → para montar a interface.

Back-end
. Node.js → ambiente de execução do JavaScript no servidor.
. Express → framework para criação da API REST (rotas de produtos, vendas e estoque).
. Mongoose → ODM para modelar e manipular os dados do MongoDB.
. MongoDB Atlas → banco de dados em nuvem para armazenar produtos, vendas e estoque.
. dotenv → para gerenciar variáveis de ambiente (ex: conexão do banco).
. cors → para permitir que o app mobile acesse a API sem bloqueios de CORS.

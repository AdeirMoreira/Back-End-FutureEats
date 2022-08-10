-- Active: 1654804493662@@35.226.146.116@3306@silveira-21814323-adeir-maia
CREATE TABLE FutureEats_User (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(255) NOT NULL UNIQUE,
    hashPassword VARCHAR(255) NOT NULL
);
CREATE TABLE FutureEats_Adress (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    CEP VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    neighbourhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    complement VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES FutureEats_User(id)
);
CREATE TABLE FutureEats_Restaurants (
    id VARCHAR(255) PRIMARY KEY,
    logoUrl TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    deliveryTime INT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    shipping INT NOT NULL
);
CREATE TABLE FutureEats_Products (
    restaurantId VARCHAR(255) NOT NULL,
    id VARCHAR(255) PRIMARY KEY,
    price INT NOT NULL,
    photoUrl TEXT NOT NULL,
    description TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES FutureEats_Restaurants(id)
);
CREATE TABLE FutureEats_Order (
    id VARCHAR(255) PRIMARY KEY,
    restaurantId VARCHAR(255) NOT NULL,
    restaurantName VARCHAR(255) NOT NULL,
    clientId VARCHAR(255) NOT NULL,
    createdAt BIGINT NOT NULL,
    expiresAt BIGINT NOT NULL,
    totalPrice INT NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES FutureEats_Restaurants(id),
    FOREIGN KEY (clientId) REFERENCES FutureEats_User(id)
    
);
INSERT INTO FutureEats_Restaurants (id, logoUrl, address, name, deliveryTime, description, category, shipping)
VALUES (
    '1',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fhabibs.jpg?alt=media&token=a30ea547-3a3b-4e80-b58e-b8dc976697de',
    'Rua das Margaridas, 110 - Jardim das Flores',
    'Habibs',
    60,
    "Habib's é uma rede de restaurantes de comida rápida brasileira especializada em culinária árabe, os restaurantes vendem mais de 600 milhões de esfirras por ano. A empresa emprega 22 mil colaboradores e tem 421 unidades distribuídas em mais de cem municípios em 20 unidades federativas.",
    'Árabe',
    6
),
(
    '2',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fmcdonalds.png?alt=media&token=87a0fc52-3b8d-4475-b3e4-6ff730356121',
    'Avenida dos Papagaios, 1350 - Sta. Efigênia',
    'McDonalds',
    15,
    "McDonald's Corporation é a maior cadeia mundial de restaurantes de fast food de hambúrguer, servindo cerca de 68 milhões de clientes por dia em 119 países através de 37 mil pontos de venda.",
    'Hamburguer', 
    19
),
(
    '4',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fbaciodilatte.png?alt=media&token=03839175-d9b3-4024-a516-5ce2cbfc6f30',
    'Travessa Junqueira de Melo, 315 - Marginal',
    'Sorveteria Bacio di Latte', 
    45,
    'Gelatos de raízes italianas feitos artesanalmente e com ingredientes de altíssima qualidade. Confira todos os nossos deliciosos sabores!',
    'Sorvetes',
    10
),
(
    '3',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fcantinamammaperrotta.jpg?alt=media&token=3a4e76b6-3d07-414b-8672-e624f5a10a76',
    'Rua Barão do Rio Branco, 98 - Centro',
    'Cantina Mamma Perrotta',
    20,
    'Restaurante Self Service e lanchonete localizado no Laboratório Nacional de Computação Científica',
    'Italiana',
    2
),
(
    '5',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Foutback.png?alt=media&token=6c3af525-e6f5-4f96-b5d5-a0ad6702a838',
    'Alameda dos Marsupiais, 505 - Humaitá',
    'Outback Steakhouse',
    20,
    'Inaugurado em 1988 nos Estados Unidos e chegou ao Brasil 9 anos depois. Hoje, o restaurante marca presença em 20 cidades em todo o país, com um estilo casual que vai fazer você se sentir no Outback Australiano',
    'Carnes',
    18  
),
(
    '6',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fsotero.jpg?alt=media&token=c8760cea-f8fc-4f66-b4b3-5c937beb8fe2',
    'Rua Dorival Caymmi, 149 - Alto dos Ibirás',
    'Sotero Cozinha Original',
    40,
    'Culinária baiana, como caldinho de sururu e acarajé, empório nordestino e bar com 400 rótulos de cachaça.', 
    'Baiana',
    4
),
(
    '7',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fbotecodeportal.jpg?alt=media&token=9b85ef89-0a4b-4390-84b1-858c1d3aafa1',
    'Avenida das Andorinhas, 333 - Sta. Efigênia',
    'Boteco de Portal',
    20,
    'O bar tem um cardápio recheado de petiscos que acompanham o chope para o bate-papo num ambiente agradável.Amigos e amigas, temos o prazer de convidar vocês para conhecer nosso espaço!',
    'Petiscos',
    18
),
(
    '8',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fchun-li.jpg?alt=media&token=363418d5-247a-4690-a048-e2633e1346b5',
    'Rua Visconde de Mauá, 990 - Centro',
    'Chun-Li',
    30,
    'Restaurante chinês com pratos típicos em diversos tamanhos, bebidas, ambiente moderno e opções para levar.',
    'Asiática',
    17
),
(
    '9',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fmexicanissimo.png?alt=media&token=c30a24af-4fce-47d8-9b9f-af7098e2dabe',
    'Largo dos Jaguarés, 12 - Nova Bragança',
    'Mexicaníssimo', 
    20,
    'Falar em Mexicaníssimo é falar em comer uma comida tradicional e original mexicana! Diferentemente dos restaurantes tex-mex, aqui você encontra um menu completo tradicionalmente mexicano e com opções para vegetarianos e veganos.',
    'Mexicana',
    3
),
(
    '10',
    'https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Ftadashii.png?alt=media&token=0e4b9b8c-3b6e-4a78-bd49-d3576657a342',
    'Travessa Reginaldo Pereira, 130 - Ibitinga',
    'Tadashii', 
    50,
    'Restaurante sofisticado busca o equilíbrio entre ingredientes que realçam a experiência da culinária japonesa.',
    'Asiática',
    13
);
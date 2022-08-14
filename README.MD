<p>
<a href="#sobre">Sobre</a> |
<a href="#imagens">Imagens</a> |
<a href="#tecnologia">Tecnologias</a> |
<a href="#link">Links</a> |
<a href="#documentação">Documentação</a> |
<a href="#postmam">Postmam</a> |
<a href="#features">Features</a> |
<a href="#modelo">Modelagem</a> |
<a href="#back">Rodando o back-end</a> |
<a href="#desenvolvedores">Desenvolvedores</a>
</p>

<h1 id="sobre">🍴 Back-End FutureEats</h1>

Esse é o Back-End do [FutureEats](https://github.com/AdeirMoreira/FutureEats), uma aplicação inspirada no app de delivery de comida UberEats desenvolvido durante o Bootcamp Full-Stack Labenu. A Api foi construida em **NodeJS** utilizando **TypeScript**, o FrameWork **ExpressJS** e o banco de dados **MySQL**, além de teste unitários com a lib **Jest**. O Projeto foi estruturado utilizando **PROGRAMAÇÃO ORIENTADA A OBJETOS(POO)** e princípios **S.O.L.I.D.**

<h2 id="imagens">📱 Imagens do site</h2>

![mockup - 2105 (4)](https://user-images.githubusercontent.com/98977257/169715748-729b6965-7e8b-48be-b60f-e9291bc91f46.png)
![mockup - 2105 (5)](https://user-images.githubusercontent.com/98977257/169719179-063fc092-cf64-4310-a4bb-bdc810348e74.png)

<h2 id="tecnologia">🛠 Tecnologias</h2>

- [NodeJS](https://nodejs.org/en/docs/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJS](http://expressjs.com/pt-br/)
- [Bcrpty](https://www.npmjs.com/package/bcrypt)
- [Uuid](https://www.npmjs.com/package/uuid)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Knex](https://knexjs.org/guide/)
- [Jest](https://jestjs.io/pt-BR/docs/api)
- [MySql](https://dev.mysql.com/doc/)

<h2 id="link">🔗 Links</h2>

- ### Link base da API https://futureeats-backend.herokuapp.com/
- ### Link da Página front-end https://cubo-itau-adeir.surge.sh/


<h2 id="documentação">📃 Documentação</h2>

- Na documentação você encontra todas informações sobre como usar cada endpoint da API. Você pode clicar em "Run in Postman" para testar os endpoints na versão web do postman.
- [Documentação](https://documenter.getpostman.com/view/20351643/VUjSGjLL)


<h2 id="postmam"> <img src="https://user-images.githubusercontent.com/98994187/182048033-f81fac19-1c26-45c0-96da-a5ffbc0defec.svg" height="20" width="20" alt="javascript logo"  /> Postmam</h2>

Voçê pode testar a API com Postman.
- O Postman é um API Client que facilita aos desenvolvedores criar, compartilhar, testar e documentar APIs. Isso é feito, permitindo aos usuários criar e salvar solicitações HTTP e HTTPs simples e complexas, bem como ler suas respostas.
- [Download do Postamam](https://www.postman.com/downloads/)
- [Download do arquivo JSON](https://github.com/future4code/silveira-Adeir-Maia/blob/rodada-cases-semana-(3)/Modulo-6/Semana-24/Cubo-Itau/Cubo-itau.postman_collection.json) para rodar as requições no seu Postmam.


<h2 id="features">✔️ Features</h2>

A API Possui endPoints para Login, cadastrar e editar usuários e endereço, ver todos os restaurantes, ver os produtos de um restaurante, fazer o pedido, ver o histórico de pedidos.

👤 Login
- [x] Login com email e senha
- [x] Autenticação por token Jsonwebtoken;


📝 Cadastro 
- [x] Cadastro de usuário e de endereço do usuário
- [x] Editar cadastro de usuário e endereço
- [x] Criptografia da senha do tipo hash com Bcrypt

🥡 Restaurante 
- [x] Ver todos os Restaurantes cadastrados
- [x] Ver todos os produtos de um restaurante

🛒 Pedidos
- [x] Registrar um pedido
- [x] Ver se há um pedido em andamento
- [x] Ver o histórico de pedidos do cliente logado 

<h2 id="modelo"> 🎲 Modelagem do banco de dados</h2>

O banco de dados é modelado com 5 entidades: User, Address, Restaurants, Products. Da seguinte forma

→ User - id, nome, email, cpf, hashPassword

→ Address - id, CEP, rua número, bairro, cidade, estado, complemento, id do usuário (chave estrangeira)

→ Restaurants - id, logoUrl, endereço, nome, tempo de entrega, descrição, categoria, taxa de entrega

→ Products - id, preço, fotoUrl, descrição, name, categoria, id do restaurante (chave estrangeira)

→ Pedidos - id, nome do restaurante, horário do pedido, horário da entrega, preço do pedido, id do restaurante(chave estrangeira), id do cliente(chave estrangeira) 

![DataBase Model](https://user-images.githubusercontent.com/98994187/184508625-1ed38e6e-45d9-4ca7-bdee-8c62f248c276.png)

<h2 id="back"> 🖥 Rodando o Back End (servidor)</h2>

### Pre-Requisitos

- Para rodar o projeto você vai precisar do [Node.JS](https://nodejs.org/en/download/),
- Uma instancia de um banco de dados MySQL
- Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Como instalar e Rodar
* Para baixar o projeto
```
1. git https://github.com/AdeirMoreira/Full_Stack-Grafico_de_Participacao.git
2. cd cd Full_Stack-Grafico_de_Participacao/back-end/
```
* Para instalar e rodar o projeto
```
3. npm install
4. npm dev
    ou
3. yarn install
4. yarn dev
```
* Para rodar os testes 
```
5. npm test
5. yarn test
```

Renomeie o arquivo ```.env.example```  para ```.env``` e preencha as variáveis com seus dados do banco de dados MySQL. É muito importante para a execução do servidor.

<h2 id="desenvolvedores">👨‍💻 Desenvolvedores</h2>
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Adeir Moreira</b></sub></a><br />   
</table>

<a href="#voltar">Voltar para o topo ⬆️</a>

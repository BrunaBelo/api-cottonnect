# api-cottonnect
CottonNect é um projeto desenvolvido como trabalho de conclusão de curso (TCC) .É uma aplicação web que posteriormente será convertida em formato PWA, que permite a doação de objetos entre usuários com a gratificação via moedas digitais, denominadas flocos de algodão, que simbolizam o ato de gratidão ao receber uma doação, de onde também deriva o nome da aplicação, em que é originado da junção das palavras Cotton (Algodão) e Connect (Conectar), trazendo o significado da aplicação ser uma comunidade de doações que une os indivíduos e os conecta pelos flocos de algodão, pois é por meio deles que as doações são possíveis.

As doações são adquiridas por um formato de leilão às cegas, onde os usuários dão lances aos objetos e no final do leilão, o sistema irá definir o ganhador. A escolha do modelo de leilão se deu pela quantificação do valor que o objeto possui para o usuário que demonstra interesse nele. Assim, segundo a análise do participante, ele irá definir o preço que julga mais justo para adquirir o produto e recompensar o doador sem a visualização dos lances dos adversários. Esta omissão evita influência na definição do valor do lance.

O projeto tem como justificativa principal a crescente evidência do impacto causado ao meio ambiente, originados das práticas sociais exercidas, como o ato de consumir. Desta forma, a intenção é estimular nos indivíduos de diferentes comunidades uma relação mais ampla de troca de produtos, fomentando a concepção do consumo consciente a fim de contribuir com a redução da degradação gradual do meio ambiente.

# Passos

- [Preparando o seu sistema operacional](#preparando-o-seu-sistema-operacional)
- [Configurando o seu repositório local](#configurando-o-seu-repositório-local)
- [Preparando o banco de dados](#preparando-o-banco-de-dados)
- [Usando a aplicação](#usando-a-aplicação)

## Preparando o seu sistema operacional
### Você precisára instalar as seguintes dependências: 
#### 1. Instalar o Node (https://nodejs.org/en/download/)
#### 2. Instalar o gerenciador de pacotes Yarn (https://classic.yarnpkg.com/en/docs/install#debian-stable)
#### 3. Docker e Docker Compose (https://docs.docker.com/get-docker/)

## Configurando o seu repositório local
### 1. Clonando o projeto
```bash
git clone git@github.com:BrunaBelo/api-cottonnect.git
cd api-cottonnect
```

Crie o arquivo das variáveis:

```bash
cp .env.exemple .env
cp .env.test.exemple .env.test
```
E configure as variaveis de ambiente necessárias

### Instalando as dependências
```bash
yarn install
```

### Start o docker para criar a database
```bash
docker-compose build
docker-compose up
```

### 3. Preparando o banco de dados
Configure as variaveis de ambiente no seu .env e .env-test com as credenciais do seu banco de dados

Rode as Migrations:
```bash
yarn typeorm migration:run
```

Crie as Seeds:
```bash
yarn run-seeds
```

### 4. Usando a aplicação
```bash
  localhost:3333
```

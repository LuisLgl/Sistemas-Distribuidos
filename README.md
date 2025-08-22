# Sistema de Cadastro de Livros - Trabalho de Sistemas Distribuídos

## Descrição do Projeto

Sistema web distribuído para cadastro e gerenciamento de livros, desenvolvido com arquitetura cliente-servidor utilizando Vue.js no frontend e Node.js/Express no backend, com persistência de dados no Supabase.

## Funcionalidades

- **Autenticação de Usuários**: Sistema de login com email e senha
- **CRUD Completo de Livros**:
  - Criar novos livros
  - Visualizar biblioteca pessoal
  - Editar informações dos livros
  - Excluir livros
- **Persistência de Dados**: Armazenamento em nuvem com Supabase

## Tecnologias Utilizadas

### Frontend
- **Vue 3** - Framework JavaScript progressivo
- **Vue Router** - Gerenciamento de rotas
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP para APIs
- **CSS3** - Estilização e design responsivo

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para API REST
- **CORS** - Middleware para cross-origin requests

### Banco de Dados & Autenticação
- **Supabase** - Plataforma backend-as-a-service
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security** - Políticas de segurança por usuário


## Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- Conta no [Supabase](https://supabase.com)
- npm ou yarn

### 1. Configuração do Backend

```bash
# Navegar para a pasta do servidor
cd server

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env com:
PORT=3001
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_anon_do_supabase

# Executar o servidor
npm start

# Para desenvolvimento com auto-reload
npm run dev
```

## Desenvolvedores

| Áurea Letícia Carvalho Macedo | (https://github.com/aureamcd) |
| Luís Gustavo Luz de Deus Ramos | (https://github.com/LuisLgl) |
| Viviany da Silva Araújo (https://github.com/VivySilva) |


## Licença
Este projeto foi desenvolvido para fins educacionais como parte do Trabalho 01 de Sistemas Distribuídos.

## Link do Vídeo

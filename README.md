# Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo veículo

**RN**
[X] - Não deve ser possível cadastrar dois veículos com a mesma placa.
[] - O carro deve ser cadastrado como disponível pro padrão.
[] - Somente usuários administradores podem cadastrar veículos.

# Listagem de carros

**RF**

- Deve ser possível listar todos os veículos disponíveis.
- Deve ser possível listar todos os carros disponiveis pelo nome da categoria
- Deve ser possível listar todos os carros disponiveis pelo nome da marca
- Deve ser possível listar todos os carros disponiveis pelo nome

**RN**
[] - O usuário não precisa estar logado no sistema para verificar os veículos.

# Cadastro de especificações no carro

**RF**

- Deve ser possível cadastrar uma especificação para um veículo.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**
[] - Não deve ser possível cadastrar uma especificação para um veículo não cadastrado.
[] - Não deve ser possível associar uma especificação já cadastrada em um veículo duas vezes.
[] - Somente usuários administradores podem cadastrar especificações.

# Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar as imagens do carro
- Deve ser possível listar todos os carros

**RNF**

- Utilizar o multer para upload dos arquivos

**RN**
[] - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[] - Somente usuários administradores podem cadastrar imagens.

# Aluguel de veículos

**RF**

- Deve ser possível cadastrar um aluguel

**RN**
[] - O Aluguel deve ter duração mínima de 24 horas.
[] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

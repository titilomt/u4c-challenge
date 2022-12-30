# Sistema de proteção veicular.

Nesse sistema existem clientes e terceiros. Os clientes podem criar uma conta inserindo informações básicas de cadastro.

## Usecases

### Premisas

- [ ] Todos os usuários(clientes e terceiros) precisam ter documentos associados as suas contas.

### Cliente

- [ ] Os clientes podem editar alguns dados cadastrados.
- [ ] Os clientes podem criar um evento de acidente, onde será possível informar o veículo envolvido no acidente e o(s) terceiro(s).
- [ ] Quando um houve o cadastro de um cliente que já foi envolvido como terceiro em um acidente, é preciso migrar o usuário para cliente sem perder o vínculo criado no acidente.

### Terceiros

- [ ] Os terceiros são cadastrados quando é criado um acidente, se não houver um registro prévio na base de dados.

---
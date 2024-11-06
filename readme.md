### **Sistema de Gerenciamento de Reservas de Espaços de Trabalho e Coworking**

- **Descrição**: Uma plataforma onde empresas e trabalhadores remotos podem agendar salas de reunião, mesas, e espaços compartilhados, integrando análise de ocupação e monitoramento de uso.

## 0. Middleware de autorização e Autenticação
> ## Sucesso

- [x] Config a duração do token (1 dia)
- [x] Middleware para validar a "role"
- [x] Colocar token nos headers
- [x] Validar requisição a partir da role do user

> ## Exceções

- [x] `403` se não for um usuário autorizado

## 1. Autenticação e Autorização

### Cadastro de Usuário e Administrador
> ## Sucesso

- [x] Recebe uma requisição `POST` em `/auth/sign-up`
- [x] Valida os campos `nome`, `email`, `senha` e `papel` (usuário ou administrador)
- [x] Salva o novo usuário no banco e retorna `201` com dados básicos do usuário (exceto senha)
- [x] Criptografa a senha antes de salvar no banco de dados

> ## Exceções

- [x] `400` se algum campo obrigatório estiver ausente
- [x] `400` se o `email` for inválido
- [x] `409` se o `email` já estiver cadastrado
- [x] `500` em caso de erro ao salvar no banco de dados

### Login de Usuário e Administrador
> ## Sucesso

- [x] Recebe uma requisição `POST` em `/auth/sign-in`
- [x] Valida `email` e `senha`
- [x] Autentica e gera um token `JWT` com permissões
- [x] Retorna `200` com o token

> ## Exceções

- [x] `400` se `email` ou `senha` estiverem ausentes ou inválidos
- [x] `401` se não houver correspondência com as credenciais fornecidas
- [x] `500` em caso de erro ao gerar o token

---

## 2. Cadastro e Gerenciamento de Espaços

### Criar Espaço
> ## Sucesso

- [x] Recebe uma requisição `POST` em `/space`
- [x] Verifica que o usuário é administrador
- [x] Valida dados do espaço: `nome`, `descrição`, `capacidade`, `categoria`, `tags` e etc...
- [x] Salva o espaço no banco
- [x] Retorna `201` com os dados do novo espaço

> ## Exceções

- [x] `403` se o usuário não for administrador
- [x] `400` se dados obrigatórios estiverem ausentes
- [x] `500` em caso de erro ao salvar no banco ou fazer upload de imagens

---

## 3. Busca e Filtro de Espaços Disponíveis

### Busca de Espaços
> ## Sucesso

- [x] Recebe uma requisição `GET` em `/api/spaces`
- [x] Aplica filtros: `data`, `capacidade`, `recursos`, `categoria`, e `tags`
- [x] Retorna `200` com a lista de espaços disponíveis

> ## Exceções

- [x] `400` se algum filtro estiver em formato inválido
- [x] `500` em caso de erro na busca de espaços no banco de dados

---

## 4. Sistema de Reserva

### Criar Reserva
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/reserve`
- [] Valida dados: `userID`, `spaceID`, `data`, `hora`, e `pagamento`
- [] Verifica se o espaço está disponível e cria a reserva
- [] Precisa estar autenticado como "MEMBER"

> ## Exceções

- [] `400` se algum dado estiver faltando ou incorreto
- [] `403` se o espaço já estiver reservado
- [] `402` se o pagamento não for concluído
- [] `500` em caso de erro ao salvar no banco de dados ou integrar com o gateway de pagamento

### Cancelamento de Reserva
> ## Sucesso

- [] Recebe uma requisição `DELETE` em `/api/cancel/:reservationID`
- [] Valida `reservationID` e verifica a possibilidade de cancelamento (ex.: 24h antes)
- [] Cancela a reserva e inicia o processo de reembolso
- [] Retorna `200` com confirmação de cancelamento
- [] Precisa estar autenticado como "MEMBER"
- [] Precisa ser o dono da reserva para fazer a ação

> ## Exceções

- [] `400` se o `reservationID` for inválido
- [] `403` se a reserva estiver fora do prazo de cancelamento
- [] `500` em caso de erro no banco de dados ou ao processar reembolso

---

## 5. Feedback e Avaliação de Espaços

### Avaliar Espaço
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/review`
- [] Valida dados: `reservationID`, `nota` e `feedback`
- [] Verifica se a reserva foi concluída e permite avaliação
- [] Retorna `201` com confirmação de avaliação salva
- [] Precisa estar autenticado como "MEMBER"
- [] Precisa ser o dono da reserva para fazer a ação

> ## Exceções

- [] `400` se dados obrigatórios estiverem ausentes
- [] `403` se a reserva ainda não estiver concluída ou já tiver avaliação
- [] `500` em caso de erro ao salvar avaliação

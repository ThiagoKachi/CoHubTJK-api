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

- [x] Recebe uma requisição `POST` em `/api/reservation`
- [x] Valida dados: `spaceId` e `date`
- [x] Verifica se o espaço está disponível e cria a reserva
- [x] Se não tiver nenhum token, não permite fazer reserva
- [x] Extrair o accountId dos headers
- [x] Precisa estar autenticado como "MEMBER"

> ## Exceções

- [x] `400` se algum dado estiver faltando ou incorreto
- [x] `403` se o espaço já estiver reservado
- [x] `500` em caso de erro ao salvar no banco de dados ou integrar com o gateway de pagamento

### Cancelamento de Reserva
> ## Sucesso

- [x] Recebe uma requisição `DELETE` em `/api/cancel/:reservationID`
- [x] Valida `reservationID` e verifica a possibilidade de cancelamento (ex.: 24h antes)
- [x] Precisa estar autenticado e ser o dono da reserva para fazer a ação
- [x] Cancela a reserva e altera o atributo canceled_at
- [x] Retorna `200` com confirmação de cancelamento

> ## Exceções

- [x] `400` se o `reservationID` for inválido
- [x] `403` se a reserva estiver fora do prazo de cancelamento
- [x] `500` em caso de erro no banco de dados ou ao processar reembolso

---

## 5. Feedback e Avaliação de Espaços

### Avaliar Espaço
> ## Sucesso

- [x] Recebe uma requisição `POST` em `/api/feedback`
- [x] Valida dados: `reservationId`, `spaceId`, `rating` e `feedback`
- [x] Verifica se a reserva foi concluída e permite avaliação
- [x] Retorna `201` com confirmação de avaliação salva
- [x] Precisa estar autenticado como "MEMBER"
- [x] Precisa ser o dono da reserva para fazer a ação

> ## Exceções

- [x] `400` se dados obrigatórios estiverem ausentes
- [x] `403` se a reserva ainda não estiver concluída ou já tiver avaliação
- [x] `500` em caso de erro ao salvar avaliação

 <!-- TODO:
  - Mais usuários no mesmo espaço (Convites, feedbacks e etc...)
  - Adicionar tabela de horários em cada espaço
  - Fazer regras dos horários na reserva e espaço
  -->

## Funcionalidade: Adicionar Múltiplos Usuários na Mesma Reserva

Para permitir que mais usuários sejam adicionados à mesma reserva, implementamos funcionalidades de convite e gestão de participantes. Isso possibilita que o usuário criador da reserva adicione colegas ou clientes e colete feedbacks sobre o espaço após o uso.

## 1. Convite de Usuários para uma Reserva

### Adicionar Participantes
#### Sucesso

- [x] Recebe uma requisição `POST` em `/api/reservations/:reservationId/invite`
- [x] Verifica se o usuário autenticado é o criador da reserva
- [x] Valida o campo `email` dos convidados
- [x] Envia convites por email para cada usuário convidado
- [x] Adiciona os usuários convidados à reserva no banco de dados
- [x] Retorna `204` com confirmação de que os convites foram enviados

#### Exceções

- [x] `400` se o `reservationID` ou `email` estiver em formato inválido
- [x] `403` se o usuário autenticado não for o criador da reserva
- [x] `409` se o usuário convidado já estiver na reserva
- [x] `500` em caso de erro ao enviar convites ou salvar dados no banco

---

## 2. Visualização de Participantes da Reserva

### Listar Participantes
#### Sucesso

- [x] Recebe uma requisição `GET` em `/api/reserve/:reservationID/participants`
- [x] Verifica se o usuário autenticado está na lista de participantes da reserva ou é o criador
- [x] Retorna `200` com a lista de participantes (nome e email)

#### Exceções

- [x] `403` se o usuário autenticado não for participante da reserva
- [x] `404` se a reserva não existir
- [x] `500` em caso de erro ao buscar dados no banco

---

## 3. Cancelamento de Participação na Reserva

### Cancelar Participação
#### Sucesso

- [] Recebe uma requisição `DELETE` em `/api/reserve/:reservationID/participant/:userID`
- [] Verifica se o usuário autenticado é o criador da reserva ou o próprio participante que deseja cancelar
- [] Remove o participante da lista de convidados para a reserva
- [] Retorna `200` com confirmação do cancelamento

#### Exceções

- [] `403` se o usuário autenticado não for o criador da reserva ou o participante em questão
- [] `404` se a reserva ou o participante não existirem
- [] `500` em caso de erro ao remover o participante do banco de dados

---

## 4. Feedback dos Participantes sobre o Espaço

### Envio de Feedback
#### Sucesso

- [] Recebe uma requisição `POST` em `/api/reserve/:reservationID/feedback`
- [] Verifica se o usuário autenticado participou da reserva concluída
- [] Valida os campos `nota` (1-5) e `comentário`
- [] Salva o feedback no banco e vincula ao espaço reservado
- [] Retorna `201` com confirmação do feedback

#### Exceções

- [] `400` se a `nota` ou `comentário` estiverem ausentes ou inválidos
- [] `403` se o usuário não for um participante da reserva
- [] `404` se a reserva não existir ou ainda estiver ativa
- [] `500` em caso de erro ao salvar feedback no banco

---

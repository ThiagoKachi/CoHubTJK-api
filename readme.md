### **Sistema de Gerenciamento de Reservas de Espaços de Trabalho e Coworking**

- **Descrição**: Uma plataforma onde empresas e trabalhadores remotos podem agendar salas de reunião, mesas, e espaços compartilhados, integrando análise de ocupação e monitoramento de uso.

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
- [] Aplica filtros: `data`, `capacidade`, `recursos`, `categoria`, e `tags`
- [] Retorna `200` com a lista de espaços disponíveis
- [] Config a duração do token (1 dia)

> ## Exceções

- [] `400` se algum filtro estiver em formato inválido
- [] `500` em caso de erro na busca de espaços no banco de dados

---

## 4. Sistema de Reserva e Pagamento

### Criar Reserva
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/reserve`
- [] Valida dados: `userID`, `spaceID`, `data`, `hora`, e `pagamento`
- [] Verifica se o espaço está disponível e cria a reserva
- [] Confirma pagamento e retorna `201` com a reserva e o recibo

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

> ## Exceções

- [] `400` se o `reservationID` for inválido
- [] `403` se a reserva estiver fora do prazo de cancelamento
- [] `500` em caso de erro no banco de dados ou ao processar reembolso

---

## 5. Notificações e Alertas

### Envio de Notificações de Lembrete
> ## Sucesso

- [] Cron dispara a rota `/api/notifications/reminder`
- [] Busca reservas próximas e envia lembretes por email
- [] Retorna `200` com o relatório de lembretes enviados

> ## Exceções

- [] `500` em caso de erro ao buscar reservas ou ao enviar notificações

---

## 6. Monitoramento e Controle de Ocupação

### Controle de Entrada via QR Code
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/entry`
- [] Valida dados `qrCode` e `reservationID`
- [] Autoriza a entrada e registra o acesso
- [] Retorna `200` com confirmação de entrada

> ## Exceções

- [] `401` se o `qrCode` não corresponder à reserva
- [] `403` se o usuário não estiver no horário de reserva
- [] `500` em caso de erro ao registrar o acesso

---

## 7. Feedback e Avaliação de Espaços

### Avaliar Espaço
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/review`
- [] Valida dados: `reservationID`, `nota` e `feedback`
- [] Verifica se a reserva foi concluída e permite avaliação
- [] Retorna `201` com confirmação de avaliação salva

> ## Exceções

- [] `400` se dados obrigatórios estiverem ausentes
- [] `403` se a reserva ainda não estiver concluída ou já tiver avaliação
- [] `500` em caso de erro ao salvar avaliação

---

## 8. Integração com Ferramentas de Produtividade

### Sincronizar com Calendário
> ## Sucesso

- [] Recebe uma requisição `POST` em `/api/calendar/sync`
- [] Verifica se o usuário autenticado deu permissão
- [] Sincroniza reserva com o calendário do usuário
- [] Retorna `200` com confirmação de sincronização

> ## Exceções

- [] `403` se o usuário não tiver permissão para sincronizar
- [] `500` em caso de erro ao integrar com a API do calendário

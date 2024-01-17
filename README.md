# FrontendChallenge

Neste teste, iremos desenvolver uma aplicação de agendamento de pagamento que inclui funcionalidades de login e CRUD. O sistema contará com recursos de paginação, filtro e ordenação de colunas, conforme especificado nos wireframes fornecidos. Para a obtenção dos dados, será utilizada a API disponibilizada pelo PicPay exclusivamente para o teste.

![Login](https://i.imgur.com/IHi0BMT.png)

![Dashboard](https://i.imgur.com/vU9hhJN.png)

## Tecnologias utilizadas

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.9.

A api utilizada foi gerada a partir do json-server [doc-v0](https://github.com/typicode/json-server/tree/v0)
optei por usar essa versão pois a mais atual ainda está em fase de alpha.

Também foram utilizadas as libs Bootstrap v.5.3.2, NGX Bootstrap e Angular Material.

Para os testes optei por usar [Jest](https://jestjs.io/pt-BR/)

## Instalação

Clone o projeto

Run `npm install -g json-server@0` para instalar a ultima versão estável da lib

Run `npm install` para instalar as dependencias do projeto

## Uso
No seu terminal favorito ou integrado. Run `npm run server` para iniciar o servidor instalado anteriormente

* o servidor irá iniciar na porta `3030`

Run `npm run start` para iniciar o app, ele irá iniciar na porta `4200`

Para fazer login utilize a unica conta disponível no arquivo `bd.json`

* login: teste@teste.com
* senha: teste

pronto! agora você já pode usar o sistema.

## Principais funcionalidades

### Geral

* O layout foi desenvolvido com base na identidade visual do PicPay, imaginando que seria uma agenda de pagamentos da empresa. Elementos como logotipo e cores foram extraídos do [site oficial](https://picpay.com/) 
* A experiência foi projetada para proporcionar eficácia em diferentes tamanhos de tela e dispositivos. No entanto, devido à natureza tabular, recomenda-se o uso em ambiente web para uma experiência otimizada.

### Login
  
* O usuário pode acessar a aplicação inserindo e-mail e senha previamente cadastrados:

  e-mail: teste@teste.com

  senha: teste

* Ao clicar no botão de ocultar/exibir senha, o usuário pode verificar se a senha foi digitada corretamente 

### Dashboard

Os usuários podem adicionar, listar, editar e deletar pagamentos.

**Create:** 

* A inclusão de um novo pagamento exige que sejam fornecidos o nome, título, data e valor correspondentes.
* No que diz respeito aos campos de data e valor, foi implementada uma lógica no código para que o front-end possa interpretar os valores provenientes da API de forma amigável, seguindo o formato DD/MM/AAAA para a data e R$ 0,00 para o valor.

**Read:**

* Por padrão, são exibidos 10 itens na lista ordenados por data de inclusão, com a opção de ajustar a quantidade de itens por página;
* A paginação permite navegar entre as páginas e selecionar a quantidade de itens exibidos por página;
* É possível buscar pelo nome do cliente, o input de busca não necessíta ser clicado pois foi implementado um debounce que faz a busca automaticamente;
* As colunas nome, título, data e valor podem ser ordenadas tanto de forma ascendente quanto decrescente.
* Os usuários podem filtrar pelo status de pagamento e range de datas

**Update:** 

* Os usuários podem editar os campos nome, título, data e valor e status.

**Delete:** 

* Para excluir um pagamento, é necessária a confirmação do usuário, evitando exclusões acidentais. Ela pode ser fechada clicando fora da modal, cancelando ou com a tecla Esc.


## Rodando testes unitários

Run `npm run test` ele irá rodar todos os testes criados, e já irá mostrar uma tabela no próprio terminal com o coverage.

Run `npm run test:coverage` você também pode testar dessa forma, assim quando o fizer irá atualizar o arquivo de coverage, que pode ser encontrado no diretorio
`./coverage/lcov-report/app/index.html`

Run `npm run test:watch` irá rodar os testes com hot reaload.

## Contato

Entre em contato para mais detalhes sobre este desenvolvimento

E-mail: joaomarcos70@outlook.com.br

[LinkedIn](https://www.linkedin.com/in/joaoalbuquerq/) | [GitHub](https://github.com/joaomarcos70)

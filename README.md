# FrontendChallenge

Neste teste, iremos desenvolver uma aplicação de agendamento de pagamento que inclui funcionalidades de login e CRUD. O sistema contará com recursos de paginação, filtro e ordenação de colunas, conforme especificado nos wireframes fornecidos. Para a obtenção dos dados, será utilizada a API disponibilizada pelo PicPay exclusivamente para o teste.

![Login](https://i.imgur.com/IHi0BMT.png)

![Dashboard](https://i.imgur.com/vU9hhJN.png)

## Tecnologias utilizadas

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.9.

Também foram utilizadas as libs Bootstrap v.5.3.2, NGX Bootstrap e Material.UI.


## Instalação

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Uso


## Principais funcionalidades


### Geral

* O layout foi desenvolvido com base na identidade visual do PicPay, imaginando que seria uma agenda de pagamentos da empresa. Elementos como logotipo, tipografia e cores foram extraídos do [site oficial](https://picpay.com/) 
* A experiência foi projetada para proporcionar eficácia em diferentes tamanhos de tela e dispositivos. No entanto, devido à natureza tabular, recomenda-se o uso em ambiente web para uma experiência otimizada.

### Login
  
* O usuário pode acessar a aplicação inserindo e-mail e senha previamente cadastrados:

  e-mail: usuario@gmail.com

  senha: usuario

* Ao clicar no botão de ocultar/exibir senha, o usuário pode verificar se a senha foi digitada corretamente 

### Dashboard

Os usuários podem adicionar, listar, editar e deletar pagamentos.

**Create:** 

* A inclusão de um novo pagamento exige que sejam fornecidos o nome, título, data e valor correspondentes.
* No que diz respeito aos campos de data e valor, foi implementada uma lógica no código para que o front-end possa interpretar os valores provenientes da API de forma amigável, seguindo o formato DD/MM/AAAA para a data e R$ 0,00 para o valor.

**Read:**

* Por padrão, são exibidos 10 itens na lista ordenados por data de inclusão, com a opção de ajustar a quantidade de itens por página;
* A paginação permite navegar entre as páginas e selecionar a quantidade de itens exibidos por página;
* É possível buscar pelo nome do cliente, mas é importante observar que com a API fornecida, a busca é realizada apenas se digitado o nome completo;
* As colunas nome, título, data e valor podem ser ordenadas tanto de forma ascendente quanto decrescente.
* Os usuários podem filtrar pelo status de pagamento

**Update:** 

* Os usuários podem editar os campos nome, título, data e valor.

**Delete:** 

* Para excluir um pagamento, é necessária a confirmação do usuário, evitando exclusões acidentais. Ela pode ser fechada clicando fora da modal, cancelando ou com a tecla Esc.


## Rodando testes unitários

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Contato

Entre em contato para mais detalhes sobre este desenvolvimento

E-mail: joaomarcos70@outlook.com.br

[LinkedIn](https://www.linkedin.com/in/joaoalbuquerq/) | [GitHub](https://github.com/joaomarcos70)

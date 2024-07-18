# Seja bem-vindo!

## Introdução
Esse é um projeto feito com base em uma prova para vaga de desenvolvedor Full-Stack na empresa Manager-Systems. Prova essa que pode ser encontrada no arquivo 'enunciado.pdf'.

O projeto foi feito a partir do conhecimento 0 (zero) em Angular. Ainda estou me aperfeiçoando, e aprendendo como implementar as melhores práticas com esse Framework e pretendo usar esse projeto para praticar mais num futuro próximo.

Obs: Tudo aplicado aqui (até dia 19/07/2024) foi fruto de um estudo teórico e prático de 3 dias. 

## A ideia do projeto
Uma aplicação web para gerenciamento e listagem de países.

## Requisitos técnicos da prova
1. Implementar um back-end em Java (v21), utilizando do Framework Spring(v3.1 ou posterior).
2. Implementar um front-end em Angular (v17 ou posterior).
3. Modelagem de dados conforme especificado no documento 'enunciado.pdf'.
4. Endpoint conforme solicitado no documento 'enunciado.pdf.
5. O back-end deve iniciar com alguns dados iniciais (conforme apresentado no documento).
6. Deve utilizar OpenApi para publicar a documentação da interface REST.
7. Disponibilizar navegação via Swagger-UI.
8. Utilizar banco de dados H2 ou HQSQL (utilizei o H2).
9. Persitência de dados via JPA utilizando SpringData.
10. Somente um usuário administrador tem o poder de adicionar, editar e deletar um país.

## Maior desafio da prova para mim?
- Lidar com um Framework que nunca utilizei anteriormente e entender como reutilizar componentes, como páginas de cadastro e edição juntas.

## Requisitos
1. JDK 21
2. Angular CLI
3. node/npm

## Rodando a aplicação:
1. Clone esse repositório para sua máquina.
2. Com um terminal aberto no diretório raiz do projeto, execute o comando 'cd front/', 'npm install' e após isso 'ng serve'.
3. Abra sua IDE de preferência (eu utilizei VSCode), e execute o back-end, presente no diretório 'core/'.
4. Acesse 'http://localhost:4200' e teste a aplicação.
5. Usuarios disponiveis: Login: admin, Senha: suporte; Login: convidado, Senha: manager. 

## Endereços disponiveis
- http://localhost:8080/h2 (H2 Database)
- http://localhost:8080/swagger-ui.html (OpenAPI - SwaggerUI)
- http://localhost:4200 (Front-end)

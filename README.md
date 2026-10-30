# Nexus-Dashboard | Dashboard de Produtividade e Clima

## Sobre o projeto

O **Nexus-Dashboard** é uma aplicação web interativa para organizar tarefas, acompanhar a produtividade e consultar o clima de qualquer cidade em um único painel.

Foi desenvolvido com **HTML5, CSS3 e JavaScript**, com foco em uma interface moderna, intuitiva e responsiva, sem necessidade de back-end.

## Funcionalidades

**Minhas tarefas**
- Adicionar tarefas com nome, data e horário (data e horário são opcionais).
- Tarefas organizadas automaticamente por data e horário.
- Marcar tarefas como concluídas ou pendentes e excluí-las.
- Filtrar a lista por **Todas**, **Pendentes** e **Concluídas**.
- Salvar as tarefas automaticamente no navegador (`localStorage`).

**Visão da produtividade**
- Percentual de conclusão em gráfico circular.
- Total de tarefas, concluídas e pendentes.
- Gráfico de barras de atividades, atualizado em tempo real.

**Clima**
- Pesquisa do clima de qualquer cidade (padrão: Porto Velho).
- Temperatura, descrição do tempo, sensação térmica, umidade e velocidade do vento.
- Previsão dos próximos 5 dias, com chance de chuva e temperaturas máxima e mínima.
- Dados fornecidos pela API gratuita [Open-Meteo](https://open-meteo.com/).

**Interface**
- Painel de resumo com tarefas, clima e data do dia.
- Alternância entre tema claro e escuro, com a preferência salva.
- Layout responsivo para computador e celular.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização, temas e responsividade |
| JavaScript ES6+ | Funcionalidades e interatividade |
| Fetch API | Requisições HTTP |
| Open-Meteo API | Clima atual e previsão |
| LocalStorage | Armazenamento local de tarefas e tema |
| Git e GitHub | Versionamento do projeto |

## Estrutura do projeto

```text
Nexus-Dashboard/
├── css/
│   └── style.css      # Estilos, tema claro/escuro e responsividade
├── js/
│   ├── main.js        # Tarefas, filtros, produtividade e tema
│   └── weather.js     # Clima e previsão (Open-Meteo)
├── index.html         # Página principal
├── LICENSE
├── README.md
└── .gitignore
```

## Como executar

1. Clone ou baixe o repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Execute o arquivo `index.html` utilizando o Live Server.
4. Acesse a aplicação pelo navegador.

**Observação:** É necessária uma conexão com a internet para consultar as informações meteorológicas.

## Como funciona

O sistema utiliza JavaScript para controlar as interações do usuário, atualizar os elementos da página e gerenciar as informações das tarefas.

As tarefas e a preferência de tema são armazenadas no navegador por meio do `localStorage`, permitindo que sejam recuperadas posteriormente no mesmo navegador.

A funcionalidade meteorológica utiliza a API pública Open-Meteo para buscar a cidade e consultar o clima atual e a previsão dos próximos dias.

A aplicação funciona diretamente no navegador, sem necessidade de um servidor back-end próprio.

## Objetivo acadêmico

O projeto foi desenvolvido para aplicar conhecimentos de programação client-side, incluindo estruturação de páginas, estilização, manipulação do DOM, armazenamento local, consumo de APIs e desenvolvimento de interfaces responsivas.

**Projeto:** Nexus-Dashboard  
**Disciplina:** Programação Client-side  
**Instituição:** SENAI — CEET Sebastião Camargo

---

**Nexus-Dashboard — Organização, produtividade e informações meteorológicas em um só lugar.**

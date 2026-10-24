# Nexus-Dashboard | Dashboard de Produtividade e Clima

## Sobre o projeto

O **Nexus-Dashboard** é uma aplicação web interativa desenvolvida para facilitar a organização de tarefas, o acompanhamento da produtividade e a consulta de informações meteorológicas em um único ambiente.

O projeto foi desenvolvido utilizando **HTML5, CSS3 e JavaScript**, com foco em uma interface moderna, intuitiva e responsiva.

Seu principal objetivo é oferecer uma ferramenta prática para o gerenciamento de atividades diárias, permitindo que o usuário organize compromissos, acompanhe tarefas, registre anotações e consulte o clima de diferentes cidades.

## Funcionalidades

**Gerenciamento de tarefas**
- Adicionar e excluir tarefas.
- Marcar atividades como concluídas.
- Definir prioridades e categorias.
- Estabelecer prazos.
- Filtrar tarefas pendentes e concluídas.
- Acompanhar indicadores de produtividade.

**Consulta meteorológica**
- Pesquisar o clima de diferentes cidades.
- Consultar temperatura e sensação térmica.
- Visualizar umidade e velocidade do vento.
- Obter informações por meio da API Open-Meteo.

**Organização pessoal**
- Criar e salvar anotações rápidas.
- Acompanhar o progresso das atividades.
- Armazenar informações localmente no navegador.

**Interface**
- Design moderno e responsivo.
- Alternância entre tema claro e escuro.
- Atualização dinâmica das informações.
- Organização visual para facilitar a navegação.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e responsividade |
| JavaScript ES6+ | Funcionalidades e interatividade |
| Fetch API | Requisições HTTP |
| Open-Meteo API | Informações meteorológicas |
| LocalStorage | Armazenamento local |
| Git e GitHub | Versionamento do projeto |

## Estrutura do projeto

```text
nexus-dashboard-main/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── weather.js
├── index.html
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

Os dados pessoais do dashboard são armazenados no navegador por meio do `localStorage`, permitindo que sejam recuperados posteriormente no mesmo navegador.

A funcionalidade meteorológica utiliza a API pública Open-Meteo para consultar informações climáticas de diferentes localidades.

A aplicação funciona diretamente no navegador, sem necessidade de um servidor back-end próprio.

## Objetivo acadêmico

O projeto foi desenvolvido para aplicar conhecimentos de programação client-side, incluindo estruturação de páginas, estilização, manipulação do DOM, armazenamento local, consumo de APIs e desenvolvimento de interfaces responsivas.

**Projeto:** Nexus-Dashboard  
**Disciplina:** Programação Client-side  
**Instituição:** SENAI — CEET Sebastião Camargo

---

**Nexus-Dashboard — Organização, produtividade e informações meteorológicas em um só lugar.**

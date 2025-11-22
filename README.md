# Buscador de Cards de Magic: The Gathering

Este é um projeto desenvolvido como parte da **Imersão Dev da Alura**, adaptado por Fagner Sousa. O objetivo é criar uma interface web interativa para buscar cards do famoso jogo _Magic: The Gathering_. A aplicação consome a API pública da Scryfall para obter informações detalhadas sobre os cards, como imagem, custo de mana, tipo e texto de regras.

## 🚀 Demonstração

<img width="1352" height="757" alt="Captura de tela de 2025-11-22 18-22-51" src="https://github.com/user-attachments/assets/dd313da3-6a16-486a-93b2-7680d72957e9" />

<img width="1352" height="757" alt="Captura de tela de 2025-11-22 18-22-41" src="https://github.com/user-attachments/assets/01ee5cb9-e7c9-47ad-9d5d-d1087d6ebfc0" />




## ✨ Funcionalidades Principais

- **Busca Dinâmica:** Pesquise cards pelo nome e veja os resultados em tempo real.
- **Autocompletar:** A barra de busca oferece sugestões de nomes de cards à medida que você digita, facilitando a pesquisa.
- **Exibição Detalhada:** Cada card exibido mostra sua imagem, nome, custo de mana (com símbolos), tipo e texto de regras (oracle text).
- **Interface Responsiva:** O layout se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência tanto em desktops quanto em dispositivos móveis.
- **Feedback ao Usuário:** Exibe um indicador de carregamento durante a busca e uma mensagem amigável caso nenhum card seja encontrado.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Para a estrutura semântica da página.
- **CSS3:** Para estilização, utilizando Flexbox, Media Queries e Variáveis CSS para um design moderno e responsivo.
- **JavaScript (ES6+):** Para a lógica da aplicação, manipulação do DOM e consumo da API com `fetch` e `async/await`.
- **Scryfall API:** Como fonte de dados para todas as informações dos cards de Magic.

## ⚙️ Como Executar o Projeto Localmente

Como este é um projeto puramente front-end, não há necessidade de um processo de build complexo.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd seu-repositorio
    ```

3.  **Abra o arquivo `index.html`** no seu navegador de preferência. E pronto!

## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma para separar a estrutura (HTML), a estilização (CSS) e a lógica (JavaScript):

```
buscador-magic-cards/
├── README.md
├── index.html
└── src/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## 🙏 Agradecimentos

- À **Alura** pela iniciativa da Imersão Dev.
- À comunidade da **Scryfall** por manter uma API tão completa e bem documentada.

# BJ-Wear | Confecção Têxtil, Camisetas Dry-Fit & Atacado Direto de Fábrica

> Plataforma web de alta performance desenvolvida para a **BJ-Wear**, confecção e oficina têxtil familiar com mais de 10 máquinas industriais em São Paulo. O projeto opera em modelo **Dual-Funnel**, integrando a venda no varejo via **Shopee** e a cotação no atacado e private label diretamente via **WhatsApp**.

---

## 🔗 Links Oficiais

- **Loja Oficial Shopee:** [shopee.com.br/brayanjoelmamani](https://shopee.com.br/brayanjoelmamani)
- **Produto em Destaque:** [Camiseta Dry Fit Masculina Treino Academia 100% Poliamida UV](https://shopee.com.br/Camiseta-Dry-Fit-Masculina-Treino-Academia-100-Poliamida-UV--i.1475257700.22099690319?extraParams=%7B%22display_model_id%22%3A229447618450%2C%22model_selection_logic%22%3A3%7D)
- **WhatsApp Comercial:** [+55 (11) 91326-7467](https://wa.me/5511913267467)
- **Hospedagem & Deploy:** [Vercel](https://bjwear.vercel.app)

---

## ⚡ Estrutura do Projeto

```
bjwear/
├── index.html                  # Landing Page Dual-Funnel
├── vercel.json                 # Configuração de Edge Caching e Rotas Vercel
├── robots.txt                  # Diretivas de indexação para buscadores
├── llms.txt                    # Documentação semântica para motores de IA (AEO/GEO)
├── styles/
│   ├── variables.css           # Tokens de design, cores, tipografia e espaçamentos
│   ├── components.css          # Botões, cards, calculadora B2B, tabela de medidas
│   └── main.css                # Layout responsivo e utilitários
├── scripts/
│   ├── quote-calculator.js     # Calculadora interativa de cotação com encoding wa.me
│   └── main.js                 # Galeria interativa, contadores e FAQ accordion
└── assets/
    └── images/                 # Fotos reais dos produtos e maquinário
```

---

## 🛠️ Tecnologias & Engenharia

- **Arquitetura Zero-Database:** HTML5 Semântico, CSS3 Moderno e Vanilla JavaScript modular.
- **Edge Deployment:** Vercel Edge Network (gru1 POP São Paulo) com TTFB < 50ms.
- **Dual-Funnel UX:** Separação entre comprador institucional B2B e consumidor unitário Shopee.
- **Schema.org JSON-LD:** Marcação estruturada completa para `LocalBusiness`, `ClothingStore` e `Product`.

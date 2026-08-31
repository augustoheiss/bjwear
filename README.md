# 🧵 BJ-Wear: Landing Page de Alta Conversão (B2B + D2C)

> Plataforma web de alta performance desenvolvida para a **BJ-Wear**, confecção familiar boliviana com mais de 10 máquinas industriais em São Paulo. O projeto opera em modelo **Dual-Funnel**, integrando a venda no varejo via **Shopee** e a cotação no atacado e private label diretamente via **WhatsApp**.

---

## 🌟 Principais Recursos

1. **Dual-Funnel Hero & Architecture:**
   - Canal Varejo: Direcionamento direto para a loja oficial na Shopee (Camiseta Dry Fit Masculina por R$ 29,90).
   - Canal Atacado B2B: Calculadora interativa de cotação com montagem automática de mensagem formatada para WhatsApp.
2. **Engenharia Têxtil & Inspeção de Tecido:**
   - Destaque das propriedades do Dry-Fit (secagem rápida, proteção UV50+, costura dupla galoneira, anti-pilling).
   - Macro zoom de textura têxtil demonstrando a respirabilidade do Honeycomb Mesh.
3. **Galeria de Produtos Interativa:**
   - Alternância fluida de fotos reais (`camisa-01.png` a `camisa-05.png`) com seletores de cor (Preto / Azul Marinho) e tamanhos (P ao GG).
4. **Telemetria Fabril:**
   - Contadores animados em tempo real: 10+ Máquinas Ativas, +15.000 Peças Entregues, 99.4% Pontualidade.
5. **AEO & SEO de Última Geração:**
   - Metatags Open Graph completas, Schema.org JSON-LD para `ClothingStore` e `Product`, além de `robots.txt` e `llms.txt` para motores de busca por IA (ChatGPT, Perplexity, Gemini).

---

## 📁 Estrutura de Pastas

```
BJ-Wear/
├── master-plan/                          # Documentos de arquitetura e pesquisas DeepResearch
│   ├── 01_master_plan_bj_wear.md
│   ├── 02_deep_research_prompts.md
│   ├── 03_skill_plugins_orchestration.md
│   └── DEEPRESEARCH-*.md
├── public/
│   ├── assets/
│   │   └── images/                       # Fotos dos produtos, tecidos e oficina
│   ├── robots.txt                        # Regras para buscadores e IA
│   └── llms.txt                          # Contexto semântico para AEO
├── styles/
│   ├── variables.css                     # Tokens de design e paleta de cores
│   ├── components.css                    # Botões, badges, calculadora, galeria
│   └── main.css                          # Layout responsivo e micro-animações
├── scripts/
│   ├── main.js                           # Galeria, contadores e acordeom FAQ
│   └── quote-calculator.js               # Calculador de cotação WhatsApp
├── index.html                            # Estrutura HTML5 semântica e acessível
├── vercel.json                           # Configuração de edge caching e segurança na Vercel
├── package.json                          # Scripts de execução local
└── README.md
```

---

## 🚀 Como Executar Localmente

Você pode abrir o arquivo `index.html` diretamente no navegador ou executar um servidor local ultrarrápido:

```bash
# Na pasta BJ-Wear:
npm run dev
```

Abra no navegador em: `http://localhost:3000`

---

## 🌐 Como Fazer Deploy na Vercel

O projeto está 100% pronto para deploy na **Vercel**:

### Opção 1: Pela Interface Web da Vercel
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório Git ou arraste a pasta `BJ-Wear`.
3. Defina o nome do projeto como `bjwear`.
4. Clique em **Deploy**.

### Opção 2: Pela CLI da Vercel
```bash
npx -y vercel --prod
```

### Apontamento de Domínio Próprio Futuro:
1. No painel da Vercel em *Settings -> Domains*, adicione o domínio (ex: `bjwear.com.br`).
2. No seu registrador de domínio (ex: Registro.br ou Cloudflare), configure os registros DNS indicados pela Vercel:
   - **Tipo A:** `76.76.21.21` (para `@`)
   - **Tipo CNAME:** `cname.vercel-dns.com` (para `www`)

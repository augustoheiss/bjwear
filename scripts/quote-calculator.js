/**
 * BJ-Wear B2B RFQ Calculator (agency-frontend-developer & agency-offer-lead-gen-strategist)
 * Dynamic quote estimation widget that constructs formatted WhatsApp click-to-chat links
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5511913267467'; // +55 11 91326-7467

  const state = {
    quantity: '50 unidades',
    quantityValue: 50,
    productType: 'Camiseta Dry-Fit Tradicional',
    fabric: 'Dry-Fit Poliamida 6.6 Premium UV',
    customization: 'Lisa (Sem Estampa)',
    segment: 'Atacado Direto de Fábrica'
  };

  // DOM Elements
  const quantityPills = document.querySelectorAll('[data-calc-quantity]');
  const productPills = document.querySelectorAll('[data-calc-product]');
  const fabricPills = document.querySelectorAll('[data-calc-fabric]');
  const customPills = document.querySelectorAll('[data-calc-custom]');
  
  const summaryQty = document.getElementById('summary-qty');
  const summaryProduct = document.getElementById('summary-product');
  const summaryFabric = document.getElementById('summary-fabric');
  const summaryCustom = document.getElementById('summary-custom');
  const summaryTier = document.getElementById('summary-tier');
  
  const tierCards = {
    1: document.getElementById('tier-card-1'),
    2: document.getElementById('tier-card-2'),
    3: document.getElementById('tier-card-3'),
    4: document.getElementById('tier-card-4')
  };

  const btnSendQuote = document.getElementById('btn-send-quote');

  function updateTierSelection(tierNum) {
    Object.values(tierCards).forEach(card => {
      if (card) card.classList.remove('selected');
    });
    if (tierCards[tierNum]) {
      tierCards[tierNum].classList.add('selected');
    }
  }

  function updateSummary() {
    if (summaryQty) summaryQty.textContent = state.quantity;
    if (summaryProduct) summaryProduct.textContent = state.productType;
    if (summaryFabric) summaryFabric.textContent = state.fabric;
    if (summaryCustom) summaryCustom.textContent = state.customization;

    // Determine scale discount tier
    if (summaryTier) {
      if (state.quantityValue >= 1000) {
        summaryTier.textContent = '🌟 Tier 4 • Distribuidor Nacional (Escala Máxima Fabril)';
        updateTierSelection(4);
      } else if (state.quantityValue >= 500) {
        summaryTier.textContent = '⚡ Tier 3 • Private Label & Marcas (Desconto 28%)';
        updateTierSelection(3);
      } else if (state.quantityValue >= 50) {
        summaryTier.textContent = '🔥 Tier 2 • Academias & Box (Desconto de Escala 16%)';
        updateTierSelection(2);
      } else {
        summaryTier.textContent = '📦 Tier 1 • Lote Inicial (Mínimo a partir de 20 un)';
        updateTierSelection(1);
      }
    }

    // Build formatted message
    const message = 
`Olá, equipe BJ-Wear! Vim pelo site e gostaria de solicitar um orçamento de confecção no atacado:

👕 *Produto:* ${state.productType}
📦 *Quantidade:* ${state.quantity}
🧵 *Tecido:* ${state.fabric}
🎨 *Personalização:* ${state.customization}
🏭 *Tipo de Pedido:* ${state.segment}

Poderiam me informar a estimativa de valores por peça e o prazo de produção? Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (btnSendQuote) {
      btnSendQuote.href = waUrl;
    }
  }

  function handlePillClick(group, stateKey, valueExtractor, valueNumExtractor) {
    group.forEach(pill => {
      pill.addEventListener('click', () => {
        group.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state[stateKey] = valueExtractor(pill);
        if (valueNumExtractor) {
          state.quantityValue = valueNumExtractor(pill);
        }
        updateSummary();
      });
    });
  }

  handlePillClick(
    quantityPills, 
    'quantity', 
    p => p.getAttribute('data-calc-quantity'),
    p => parseInt(p.getAttribute('data-val') || '50', 10)
  );

  handlePillClick(
    productPills, 
    'productType', 
    p => p.getAttribute('data-calc-product')
  );

  handlePillClick(
    fabricPills, 
    'fabric', 
    p => p.getAttribute('data-calc-fabric')
  );

  handlePillClick(
    customPills, 
    'customization', 
    p => p.getAttribute('data-calc-custom')
  );

  // Allow clicking on Tier cards directly
  Object.entries(tierCards).forEach(([tierKey, card]) => {
    if (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const valMap = { '1': 20, '2': 50, '3': 500, '4': 1000 };
        const targetVal = valMap[tierKey];
        const matchingPill = Array.from(quantityPills).find(p => parseInt(p.getAttribute('data-val'), 10) === targetVal);
        if (matchingPill) {
          matchingPill.click();
        }
      });
    }
  });

  // Initial render
  updateSummary();
});

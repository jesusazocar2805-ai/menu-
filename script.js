let cart = [];
let total = 0;

// Troca de Abas
function openCategory(categoryName) {
  const contents = document.querySelectorAll('.category-content');
  contents.forEach(content => content.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(categoryName).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Adicionar Item ao Carrinho
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartUI();
}

// Atualiza a Interface do Carrinho
function updateCartUI() {
  const cartList = document.getElementById('cart-items-list');
  const totalPriceElement = document.getElementById('total-price');

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-msg">Nenhum item adicionado ainda.</li>';
  } else {
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">X</button>`;
      cartList.appendChild(li);
    });
  }

  totalPriceElement.innerText = total.toFixed(2).replace('.', ',');
}

// Remover Item
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}

// Enviar Pedido para o WhatsApp
function sendOrder() {
  if (cart.length === 0) {
    alert('Adicione ao menos um item ao seu pedido!');
    return;
  }

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const referencia = document.getElementById('referencia').value;
  const complemento = document.getElementById('complemento').value;
  const obs = document.getElementById('obs').value;
  const saches = document.querySelector('input[name="saches"]:checked').value;

  if (!nome || !rua || !numero || !bairro) {
    alert('Por favor, preencha os campos obrigatórios de endereço e seu nome.');
    return;
  }

  // Formata os itens
  let itensTexto = cart.map(item => `- ${item.name} (R$ ${item.price.toFixed(2)})`).join('\n');

  // Formata a mensagem
  let message = `*NOVO PEDIDO - OFICIAL LANCHES*\n\n`;
  message += `*Itens:*\n${itensTexto}\n\n`;
  message += `*Total:* R$ ${total.toFixed(2)}\n`;
  message += `*Incluir Sachês?* ${saches}\n`;
  if (obs) message += `*Observações:* ${obs}\n`;
  
  message += `\n*Dados de Entrega:*\n`;
  message += `*Nome:* ${nome}\n`;
  message += `*Telefone:* ${telefone}\n`;
  message += `*Endereço:* ${rua}, Nº ${numero}\n`;
  message += `*Bairro:* ${bairro} - ${cidade}\n`;
  if (complemento) message += `*Complemento:* ${complemento}\n`;
  if (referencia) message += `*Ponto de Ref.:* ${referencia}\n`;

  // Número de destino (substitua pelo seu número com DDD)
  const phone = "5547997270710"; 
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}
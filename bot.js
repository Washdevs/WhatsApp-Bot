const venom = require("venom-bot");

// Chatbot logic
const chatbotResponses = {
  oi: "Olá! Tudo bem com você?",
  "como vai?": "Estou ótimo! E você?",
  "quem é você?": "Eu sou um bot criado para ajudar no WhatsApp!",
  "o que você faz?": "Posso responder perguntas simples e interagir com você.",
  default: "Desculpe, não entendi. Tente algo como 'oi' ou 'como vai?'."
};

// Função para obter a resposta do bot
const getChatbotResponse = (message) => {
  const lowerCaseMessage = message.toLowerCase();
  return chatbotResponses[lowerCaseMessage] || chatbotResponses.default;
};

// Verificar se o horário está dentro do intervalo especificado
const isNightTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  // Período da noite: das 20:00 às 06:30
  const isNight = hour >= 20 || hour < 6 || (hour === 6 && minutes < 30);
  return isNight;
};

// Iniciar o bot
venom
  .create({
    session: "meu-bot-session",
    multidevice: true, // Suporte a múltiplos dispositivos
    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox"] // Configurações para evitar problemas em servidores
  })
  .then((client) => start(client))
  .catch((error) => console.error("Erro ao iniciar o bot:", error));

function start(client) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      // Lógica baseada no horário
      if (isNightTime()) {
        // Resposta durante a noite
        await client.sendText(message.from, `Você disse: ${message.body}`);
      } else {
        // Resposta durante o dia com lógica adicional
        const response = getChatbotResponse(message.body);
        await client.sendText(message.from, response);
      }
    }
  });
}

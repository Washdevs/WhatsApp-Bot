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

// Iniciar o bot
venom
  .create({
    session: "meu-bot-session", // Nome da sessão
    multidevice: true, // Suporte a múltiplos dispositivos
    browserArgs: ["--no-sandbox"], // Argumentos para evitar problemas de permissões
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" // Caminho do executável do Chrome
  })
  .then((client) => start(client))
  .catch((error) => console.error("Erro ao iniciar o bot:", error));

function start(client) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      // Ignorar mensagens de grupos
      await client.sendText(message.from, `Você disse: ${message.body}`);
    }
  });
}

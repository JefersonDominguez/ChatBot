// Archivo: script.js
document.getElementById('send-button').addEventListener('click', handleUserMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') handleUserMessage();
});

function handleUserMessage() {
  const input = document.getElementById('user-input').value.trim();
  if (input === '') return;

  addMessage(input, 'user');
  document.getElementById('user-input').value = '';

  // Mostrar la animación de "escribiendo..."
  showTypingIndicator();

  // Procesar la entrada después de 2 segundos
  setTimeout(() => {
    if (isGreeting(input)) {
      respondWithGreeting();
    } else {
      processMathQuestion(input);
    }
    removeTypingIndicator();
  }, 2000);
}

function addMessage(message, type) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('message', `${type}-message`);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para detectar saludos
function isGreeting(input) {
  const greetings = ['hola', 'hi'];
  return greetings.includes(input.toLowerCase());
}

// Respuesta a saludos
function respondWithGreeting() {
  const greetingMessage = `¡Hola! 😊 Espero que estés teniendo un bonito día 🌞. Estoy aquí para ayudarte a resolver operaciones matemáticas como suma ➕, resta ➖, multiplicación ✖️, y división ➗.`;
  addMessage(greetingMessage, 'bot');
}

// Procesar operaciones matemáticas
function processMathQuestion(question) {
  try {
    // Evaluar la operación matemática
    const result = eval(question);
    if (!isFinite(result) || isNaN(result)) {
      addMessage('No entiendo esa operación. 😕', 'bot');
    } else {
      addMessage(`El resultado es: ${result}`, 'bot');
    }
  } catch (error) {
    addMessage('Por favor, ingresa una operación válida. 😕', 'bot');
  }
}

function showTypingIndicator() {
  const chatBox = document.getElementById('chat-box');
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
  typingDiv.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) typingIndicator.remove();
}

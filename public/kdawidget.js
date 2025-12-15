document.addEventListener("DOMContentLoaded", function () {
    const widgetHTML = `
      <div id="kda-widget" class="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
          <!-- Chat Window -->
          <div id="kda-chat-window" class="hidden bg-white w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden mb-4 border border-gray-100 flex flex-col transition-all duration-300 transform origin-bottom-right scale-95 opacity-0">

              <!-- Header -->
              <div class="bg-gray-900 p-4 flex justify-between items-center text-white">
                  <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <i class="fa-solid fa-robot text-sm"></i>
                      </div>
                      <div>
                          <h3 class="font-bold text-sm">Assistant Kadea</h3>
                          <p class="text-xs text-gray-400">En ligne</p>
                      </div>
                  </div>
                  <button id="kda-close-btn" class="text-gray-400 hover:text-white transition">
                      <i class="fa-solid fa-xmark"></i>
                  </button>
              </div>

              <!-- Messages Area -->
              <div id="kda-messages" class="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                  <!-- Message de bienvenue statique avec formatage appliqué manuellement pour l'exemple -->
                  <div class="self-start bg-white border border-gray-200 text-gray-700 rounded-2xl rounded-tl-none py-2 px-4 text-sm shadow-sm max-w-[85%]">
                      Bonjour ! 👋 Je suis l'assistant virtuel de Kadea.
                  </div>
              </div>

              <!-- Input Area -->
              <div class="p-3 bg-white border-t border-gray-100">
                  <form id="kda-form" class="flex gap-2">
                      <input type="text" id="kda-input" placeholder="Posez votre question..." class="flex-1 bg-gray-100 text-gray-800 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" autocomplete="off">
                      <button type="submit" class="bg-gray-900 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed">
                          <i class="fa-solid fa-paper-plane text-xs"></i>
                      </button>
                  </form>
              </div>
          </div>

          <!-- Toggle Button -->
          <button id="kda-toggle-btn" class="bg-gray-900 hover:bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 group">
              <i class="fa-solid fa-comment-dots text-xl group-hover:rotate-12 transition"></i>
          </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    const toggleBtn = document.getElementById('kda-toggle-btn');
    const closeBtn = document.getElementById('kda-close-btn');
    const chatWindow = document.getElementById('kda-chat-window');
    const form = document.getElementById('kda-form');
    const input = document.getElementById('kda-input');
    const messagesContainer = document.getElementById('kda-messages');
    const submitBtn = form.querySelector('button');

    const API_URL = '../api/chat.php'; 

    function toggleChat() {
        if (chatWindow.classList.contains('hidden')) {
            chatWindow.classList.remove('hidden');
            setTimeout(() => {
                chatWindow.classList.remove('scale-95', 'opacity-0');
            }, 10);
            input.focus();
        } else {
            chatWindow.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    
    function formatText(text) {
        // 1. D'abord convertir les retours à la ligne en <br>
        let formatted = text.replace(/\n/g, '<br>');

        // 2. Remplacer les doubles astérisques (**texte**) par du gras
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
        
        // 3. Remplacer aussi les simples astérisques (*texte*) par du gras
        formatted = formatted.replace(/\*(.*?)\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

        return formatted;
    }

    function addMessage(text, sender) {
        const isUser = sender === 'user';
        const div = document.createElement('div');
        
        div.className = isUser 
            ? 'self-end bg-gray-900 text-white rounded-2xl rounded-tr-none py-2 px-4 text-sm shadow-sm max-w-[85%]' 
            : 'self-start bg-white border border-gray-200 text-gray-700 rounded-2xl rounded-tl-none py-2 px-4 text-sm shadow-sm max-w-[85%]';
            
        if (isUser) {
            div.textContent = text; 
        } else {
            div.innerHTML = formatText(text);
        }

        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'self-start bg-white border border-gray-200 rounded-2xl rounded-tl-none py-3 px-4 shadow-sm w-16 flex items-center justify-center gap-1';
        div.innerHTML = `
            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        `;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        input.value = '';
        input.disabled = true;
        submitBtn.disabled = true;
        addTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            removeTypingIndicator();

            if (data.status === 'success') {
                addMessage(data.reply, 'bot');
            } else {
                addMessage("Oups, une erreur est survenue.", 'bot');
                console.error(data);
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage("Erreur de connexion au serveur.", 'bot');
            console.error(error);
        } finally {
            input.disabled = false;
            submitBtn.disabled = false;
            input.focus();
        }
    });
});

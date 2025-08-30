// Chat widget implementation
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    
    // Create chat widget HTML
    chatWidget.innerHTML = `
        <div id="chat-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div id="chat-button" style="width: 60px; height: 60px; background: linear-gradient(45deg, var(--neon-blue), var(--electric-purple)); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
                <i class="fas fa-comment" style="color: white; font-size: 24px;"></i>
            </div>
            <div id="chat-window" style="position: absolute; bottom: 70px; right: 0; width: 350px; height: 450px; background: rgba(15, 15, 35, 0.95); backdrop-filter: blur(10px); border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); display: none; flex-direction: column;">
                <div style="padding: 15px; background: rgba(10, 10, 26, 0.8); border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; color: white;">AfrixaAI Assistant</h3>
                    <button id="close-chat" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column;">
                    <div style="align-self: flex-start; background: rgba(255, 255, 255, 0.1); padding: 10px 15px; border-radius: 15px; margin-bottom: 10px; max-width: 80%;">
                        <p style="margin: 0;">Hello! I'm the AfrixaAI assistant. How can I help you today?</p>
                    </div>
                </div>
                <div id="typing-indicator" style="padding: 10px 15px; display: none;">
                    <div style="display: flex; align-items: center;">
                        <div style="width: 30px; height: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                            <i class="fas fa-robot" style="color: var(--neon-blue);"></i>
                        </div>
                        <div style="display: flex;">
                            <div style="width: 6px; height: 6px; background: var(--neon-blue); border-radius: 50%; margin: 0 2px; animation: typing 1s infinite;"></div>
                            <div style="width: 6px; height: 6px; background: var(--neon-blue); border-radius: 50%; margin: 0 2px; animation: typing 1s infinite 0.2s;"></div>
                            <div style="width: 6px; height: 6px; background: var(--neon-blue); border-radius: 50%; margin: 0 2px; animation: typing 1s infinite 0.4s;"></div>
                        </div>
                    </div>
                </div>
                <div style="padding: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <form id="chat-form" style="display: flex;">
                        <input type="text" id="chat-input" placeholder="Type your message..." style="flex: 1; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(15, 15, 35, 0.5); border-radius: 20px; color: white; margin-right: 10px;">
                        <button type="submit" style="background: linear-gradient(45deg, var(--neon-blue), var(--electric-purple)); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-paper-plane" style="color: white;"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <style>
            @keyframes typing {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
            }
        </style>
    `;
    
    // Chat widget functionality
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    
    chatButton.addEventListener('click', function() {
        chatWindow.style.display = 'flex';
    });
    
    closeChat.addEventListener('click', function() {
        chatWindow.style.display = 'none';
    });
    
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'block';
        
        try {
            // Send message to backend
            const response = await fetch('https://afrixaai-backend.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Hide typing indicator
            typingIndicator.style.display = 'none';
            
            // Process streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiResponse = '';
            
            // Create AI message element
            const messageElement = document.createElement('div');
            messageElement.style.alignSelf = 'flex-start';
            messageElement.style.background = 'rgba(255, 255, 255, 0.1)';
            messageElement.style.padding = '10px 15px';
            messageElement.style.borderRadius = '15px';
            messageElement.style.marginBottom = '10px';
            messageElement.style.maxWidth = '80%';
            
            const messageText = document.createElement('p');
            messageText.style.margin = '0';
            messageElement.appendChild(messageText);
            chatMessages.appendChild(messageElement);
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                aiResponse += chunk;
                messageText.textContent = aiResponse;
                
                // Auto-scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        } catch (error) {
            // Hide typing indicator
            typingIndicator.style.display = 'none';
            
            // Add error message
            addMessage('Sorry, I encountered an error. Please try again later.', 'ai');
            console.error('Error:', error);
        }
    });
    
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
        messageElement.style.background = sender === 'user' 
            ? 'linear-gradient(45deg, var(--neon-blue), var(--electric-purple))' 
            : 'rgba(255, 255, 255, 0.1)';
        messageElement.style.padding = '10px 15px';
        messageElement.style.borderRadius = '15px';
        messageElement.style.marginBottom = '10px';
        messageElement.style.maxWidth = '80%';
        
        const messageText = document.createElement('p');
        messageText.style.margin = '0';
        messageText.textContent = text;
        messageElement.appendChild(messageText);
        
        chatMessages.appendChild(messageElement);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
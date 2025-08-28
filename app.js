// Add this line at the VERY TOP of the file
const API_BASE_URL = "https://afrixaai-backend.onrender.com";

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const themeToggle = document.getElementById('theme-toggle');
const typingIndicator = document.getElementById('typing-indicator');

// Initialize theme from localStorage or default to dark
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-mode', 'light-mode');
        themeToggle.checked = false;
    } else {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeToggle.checked = true;
    }
}

// Toggle between dark and light themes
function toggleTheme() {
    if (themeToggle.checked) {
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    const messageText = document.createElement('p');
    messageText.textContent = content;
    
    const timestamp = document.createElement('div');
    timestamp.classList.add('message-timestamp');
    timestamp.textContent = getCurrentTime();
    
    messageContent.appendChild(messageText);
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// Get current time for timestamp
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

// Send message to API
async function sendMessageToAPI(message) {
    try {
        showTypingIndicator();
        
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        hideTypingIndicator();
        
        // Check if the response has the expected structure
        if (data.response) {
            addMessage(data.response, false);
        } else {
            throw new Error('Invalid response format from API');
        }
    } catch (error) {
        hideTypingIndicator();
        console.error('Error:', error);
        
        // Add error message to chat
        const errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
        addMessage(errorMessage, false);
    }
}

// Handle send message
function handleSendMessage() {
    const message = messageInput.value.trim();
    
    if (message) {
        // Add user message to chat
        addMessage(message, true);
        
        // Clear input
        messageInput.value = '';
        
        // Send to API
        sendMessageToAPI(message);
    }
}

// Event Listeners
sendButton.addEventListener('click', handleSendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

themeToggle.addEventListener('change', toggleTheme);

// Initialize the app
function initApp() {
    initTheme();
    messageInput.focus();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
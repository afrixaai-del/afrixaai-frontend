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
                    <h3 style="margin: 0; color: white;">AfrixaTech Assistant</h3>
                    <button id="close-chat" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column;">
                    <div style="align-self: flex-start; background: rgba(255, 255, 255, 0.1); padding: 10px 15px; border-radius: 15px; margin-bottom: 10px; max-width: 80%;">
                        <p style="margin: 0;">Hello! I'm the AfrixaTech professional assistant. How can I help you today?</p>
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
    
    // Enhanced quick responses with comprehensive coverage
    const quickResponses = {
        // ===== GREETINGS & BASIC =====
        'hello': 'Hello! Welcome to AfrixaAI. How can I help you with our digital solutions today?',
        'hi': 'Hi there! I\'m here to assist you with AfrixaAI\'s services. What can I help you with?',
        'hey': 'Hey! Welcome to AfrixaAI. How can I assist you with our professional services?',
        'good morning': 'Good morning! Ready to explore how AfrixaAI can transform your business today?',
        'good afternoon': 'Good afternoon! How can I help you with our digital solutions?',
        'good evening': 'Good evening! I\'m here to assist you with AfrixaAI\'s services. What do you need help with?',
        'how are you': 'I\'m functioning well, thank you! Ready to help you discover the best digital solutions.',
        'what\'s up': 'All systems operational! I\'m here to help you with AfrixaAI\'s services.',
        
        // ===== SERVICES =====
        'services': 'We offer website development, AI customer support, and premium hosting. See our Services page for details.',
        'what do you offer': 'We provide website development, AI support chatbots, and reliable hosting services.',
        'what can you do': 'We build websites, implement AI customer support, and provide hosting solutions.',
        'offerings': 'Our offerings include web development, AI integration, and hosting services.',
        
        // ===== WEBSITE DEVELOPMENT =====
        'website': 'We create responsive, SEO-optimized websites. Starting at ₦80,000 one-time.',
        'build website': 'Yes! We build custom websites. Basic sites start at ₦80,000.',
        'create website': 'We can create a professional website for you. Visit our Services section.',
        'web development': 'Our web development includes responsive design, SEO, and fast loading.',
        'make website': 'We can make a website for your business. Basic package: ₦80,000.',
        'website price': 'Website development starts at ₦80,000 for basic sites.',
        'website cost': 'Basic websites: ₦80,000 | Business websites: ₦180,000.',
        'how much website': 'Website pricing starts at ₦80,000. See Pricing page for details.',
        'ecommerce website': 'We build e-commerce websites with shopping cart and payment integration.',
        'online store': 'We create online stores with product management and secure payments.',
        
        // ===== AI SUPPORT =====
        'ai support': 'We provide 24/7 AI customer support with multilingual African language support.',
        'chatbot': 'Our AI chatbots handle customer inquiries 24/7 in multiple languages.',
        'customer support': 'We offer AI-powered customer support with instant responses.',
        'ai chatbot': 'Our AI chatbots understand African languages and cultural context.',
        'automated support': 'We provide automated AI support that works 24/7.',
        'ai price': 'AI support starts at ₦45,000/month for the Essential plan.',
        'ai cost': 'Essential AI: ₦45,000/mo | Professional: ₦95,000/mo | Enterprise: Custom.',
        'how much ai': 'AI support pricing starts at ₦45,000 per month.',
        'whatsapp integration': 'Our AI supports WhatsApp Business integration for customer service.',
        'multilingual support': 'Our AI supports multiple African languages including Yoruba, Swahili, Hausa.',
        
        // ===== HOSTING =====
        'hosting': 'We offer premium hosting with African servers, 99.9% uptime, free SSL.',
        'web hosting': 'Our hosting includes African server locations for faster loading.',
        'server': 'We provide hosting servers located in Africa for better performance.',
        'host my website': 'We can host your website on our African servers for better speed.',
        'hosting price': 'Hosting starts at ₦15,000/month for Starter plan.',
        'hosting cost': 'Starter: ₦15,000/mo | Business: ₦35,000/mo | Enterprise: ₦75,000/mo.',
        'how much hosting': 'Hosting plans start at ₦15,000 per month.',
        'server location': 'Our servers are located in Africa for faster local loading times.',
        'uptime': 'We guarantee 99.9% uptime for all our hosting plans.',
        'ssl certificate': 'Free SSL certificates included with all hosting plans.',
        
        // ===== PRICING =====
        'pricing': 'AI: from ₦45,000/mo | Websites: from ₦80,000 | Hosting: from ₦15,000/mo.',
        'prices': 'Check our Pricing page for detailed pricing across all services.',
        'how much': 'Prices vary by service. AI from ₦45k/mo, websites from ₦80k, hosting from ₦15k/mo.',
        'cost': 'Service costs: AI support from ₦45k/mo, web development from ₦80k, hosting from ₦15k/mo.',
        'price list': 'Visit our Pricing page for complete price list and plan details.',
        'cheap': 'We offer competitive pricing with quality service. Starter plans available.',
        'affordable': 'Our services are priced affordably for African businesses.',
        'discount': 'We offer 20% OFF on annual plans. Contact us for details.',
        'payment': 'We accept payments via Flutterwave with multiple African payment methods.',
        'currency': 'We support multiple currencies: Naira, USD, Euro, GBP, and African currencies.',
        
        // ===== PORTFOLIO =====
        'portfolio': 'We\'ve worked with Naija Kitchen, Safari Wonders, Jabali Coffee. See Portfolio.',
        'examples': 'View our portfolio examples on the Portfolio page with live demos.',
        'previous work': 'Check our previous work including e-commerce sites and AI implementations.',
        'demos': 'We have live demos available on our Portfolio page.',
        'clients': 'We serve clients across Africa in various industries.',
        'experience': 'We have experience with restaurants, tourism, retail, and more.',
        
        // ===== CONTACT =====
        'contact': 'Email: afrixaai@gmail.com | Phone: +234 808 163 4276 | Available 24/7.',
        'email': 'Our email: afrixaai@gmail.com for inquiries and support.',
        'phone': 'Call us at +234 808 163 4276 for immediate assistance.',
        'number': 'Contact number: +234 808 163 4276.',
        'address': 'We serve clients across Africa remotely.',
        'location': 'We work with businesses across Africa from our base in Nigeria.',
        'get in touch': 'You can reach us via email, phone, or the contact form on our website.',
        'support': 'We provide 24/7 support for all our clients.',
        
        // ===== ABOUT =====
        'about': 'AfrixaAI provides digital solutions specifically for African businesses.',
        'who are you': 'We are AfrixaAI, providing web development, AI support, and hosting for African businesses.',
        'company': 'We are AfrixaAI, focused on digital solutions for African market growth.',
        'story': 'We specialize in helping African businesses compete with world-class digital solutions.',
        'mission': 'Our mission is to provide affordable, high-quality digital solutions for African businesses.',
        'values': 'We value African expertise, rapid deployment, security, and dedicated support.',
        
        // ===== TECHNICAL =====
        'languages': 'Our AI supports Yoruba, Swahili, Hausa, Igbo, and other African languages.',
        'setup time': 'AI setup: 7 days (Essential), 48h (Professional), 24h (Enterprise). Websites: 10-14 days.',
        'how long': 'Setup times vary: AI 1-7 days, websites 10-14 days for basic sites.',
        'timeline': 'Typical timelines: AI support 1-7 days, website development 10-14 days.',
        'delivery time': 'We deliver AI solutions in 1-7 days, websites in 10-14 days typically.',
        'technology': 'We use modern technologies like Python, JavaScript, React, FastAPI, and AI models.',
        'tech stack': 'Our tech stack includes React.js, FastAPI, Python, and advanced AI models.',
        
        // ===== BUSINESS =====
        'business': 'We help African businesses grow with digital solutions.',
        'start business': 'We can help you establish your online presence with website and AI support.',
        'grow business': 'Our digital solutions help businesses attract more customers and improve service.',
        'african business': 'We specialize in solutions tailored for African business needs.',
        'small business': 'We have affordable solutions perfect for small businesses.',
        'enterprise': 'We offer enterprise solutions with custom pricing and features.',
        
        // ===== APPRECIATION =====
        'thank you': 'You\'re welcome! Is there anything else you\'d like to know about our services?',
        'thanks': 'Happy to help! Let me know if you need any other information.',
        'appreciate': 'Glad I could help! What else can I assist you with today?',
        'good job': 'Thank you! I\'m here to help you with all your digital solution needs.',
        'well done': 'Appreciate it! How else can I assist you with AfrixaAI services?',
        
        // ===== GENERAL =====
        'help': 'I can help you with information about our website development, AI support, and hosting services.',
        'information': 'I can provide information about our digital solutions and services.',
        'options': 'We offer website development, AI customer support, and hosting services.',
        'recommend': 'Based on your needs, I can recommend the right service package for you.',
        'consultation': 'We offer free consultations to discuss your specific business needs.',
        'free trial': 'Contact us to discuss trial options for our AI support services.',
        'guarantee': 'We offer 99.9% uptime guarantee on hosting and quality service assurance.',
        
        // ===== NEGATION =====
        'no': 'Okay, no problem. Is there something else I can help you with?',
        'not interested': 'Understood. Feel free to reach out if you need digital solutions in the future.',
        'maybe later': 'No problem! We\'ll be here when you\'re ready to discuss digital solutions.',
        'bye': 'Goodbye! Feel free to come back if you need help with digital solutions.',
        'goodbye': 'See you later! Contact us anytime for your digital solution needs.'
    };
    
    // Advanced matching function with keyword scoring
    function findQuickResponse(message) {
        const lowerMessage = message.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;
        
        // Exact matches first
        if (quickResponses[lowerMessage]) {
            return quickResponses[lowerMessage];
        }
        
        // Keyword scoring system
        for (const [keyword, response] of Object.entries(quickResponses)) {
            if (lowerMessage.includes(keyword)) {
                const score = keyword.length; // Longer keywords get higher score
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = response;
                }
            }
        }
        
        return bestMatch;
    }
    
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
        
        // Check for quick responses with advanced matching
        const quickResponse = findQuickResponse(message);
        
        if (quickResponse) {
            // Show brief typing indicator for realism
            typingIndicator.style.display = 'block';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage(quickResponse, 'ai');
            }, 500);
            return;
        }
        
        // Show typing indicator for API calls
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
                
                // Clean up the response
                let cleanedResponse = aiResponse
                    .replace(/\[.*?\]/g, '')
                    .replace(/\.n\//g, '')
                    .replace(/\\n/g, '\n')
                    .trim();
                
                messageText.textContent = cleanedResponse;
                
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
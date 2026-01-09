let chatState = 'welcome';

// THE BRAIN (Logic and Content)
function processLogic(trigger) {
    const lower = trigger.toLowerCase();
    
    // State Router
    if (lower.includes('menu') || lower.includes('start') || lower.includes('back')|| lower.includes('welcome')) {
        chatState = 'welcome';
    } else if (lower.includes('wedding')) {
        chatState = 'wedding_options';
    } else if (lower.includes('sizing') || lower.includes('fit') || lower.includes('measure')) {
        chatState = 'sizing_table';
    } else if (lower.includes('video') || lower.includes('watch') || lower.includes('making')) {
        chatState = 'videos';
    } else if (lower.includes('order') || lower.includes('buy')) {
        chatState = 'order';
    } else if (lower.includes('formal')) {
        chatState = 'bespoke';
    } else {
        chatState = 'fallback'; 
    }

    const responses = {
        'welcome': {
            text: "Namaste! Welcome to the Inuit Atelier. I am Arjun, your Lead Host.<br><br>How may I guide your luxury journey today?",
            btns: ["Wedding", "Formals", "Sizing and Fit"]
        },
        'wedding_options': {
            text: `<b>The Wedding Collection</b><br>
            1. <b>The Maharaja Patent Oxford</b><br>
            2. <b>The Heritage Hand-Patina Mojari</b><br>
            3. <b>The Royal Double Monk Strap</b><br>
            
            How would you like to proceed?`,
            btns: ["Watch Making Video", "Consult on Sizing", "Back to Menu"]
        },
        'bespoke': {
            text: `<b>The Formal Collection</b><br>
            1. <b>The Executive Wholecut Oxford</b><br>
            2. <b>The Signature Brogue Derby</b><br>
            
            How would you like to proceed?`,
            btns: ["Consult on Sizing", "Watch Making Video", "Back to Menu"]
        },
        'sizing_table': {
            text: `<b>Atelier Sizing Guide</b><br>Our shoes are hand-lasted for a superior fit. Refer to the table below for standard measurements.<br><br>
            <table class="size-table">
                <thead>
                    <tr>
                        <th>UK / India</th>
                        <th>EU Size</th>
                        <th>US Size</th>
                        <th>Foot Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>6</td><td>40</td><td>7</td><td>25.4 cm</td></tr>
                    <tr><td>7</td><td>41</td><td>8</td><td>26.2 cm</td></tr>
                    <tr><td>8</td><td>42</td><td>9</td><td>27.1 cm</td></tr>
                    <tr><td>9</td><td>43</td><td>10</td><td>27.9 cm</td></tr>
                    <tr><td>10</td><td>44</td><td>11</td><td>28.8 cm</td></tr>
                    <tr><td>11</td><td>45</td><td>12</td><td>29.6 cm</td></tr>
                </tbody>
            </table><br>
            <i>Note: Genuine leather stretches slightly to mold to your feet over 3 to 4 wears. If you are between sizes, we recommend choosing one size up.</i>`,
            btns: ["Place Order", "Watch Making Video", "Back to Menu"]
        },
        'videos': {
            text: "Observe the artistry behind the Inuit signature. Every pair is a result of 200 plus manual steps in our atelier.",
            btns: ["Consult on Sizing", "Back to Menu"],
            videos: [
                {title: 'The Hand Lasting', url: 'the hand sealing.mp4'}, 
                {title: 'The Mirror Shine', url: 'the mirror shine.mp4'} 
            ]
        },
        'order': {
            text: "Excellent choice. I have alerted our Styling Team. They will WhatsApp you shortly to finalize your leather choice and measurements for your bespoke pair.",
            btns: ["Back to Menu"]
        },
        'fallback': {
            text: "I apologize, but I didn't quite capture that. As a virtual host for Inuit Atelier, I can best assist you with our collections and sizing.<br><br><b>Please choose from the options below:</b>",
            btns: ["Wedding", "Formals", "Sizing and Fit", "Back to Menu"]
        }
    };

    const data = responses[chatState] || responses['fallback'];
    
    setTimeout(() => {
        addMessage(data.text, 'bot', data.videos);
        renderButtons(data.btns);
    }, 600);

}

// UI HANDLERS
function handleSend() {
    const input = document.getElementById('userInput');
    const val = input.value.trim();
    if (val) {
        addMessage(val, 'user');
        input.value = '';
        processLogic(val);
    }
}

function addMessage(text, side, videos = []) {
    const win = document.getElementById('chatWindow');
    const div = document.createElement('div');
    div.className = `msg ${side}-msg`;
    
    if(side === 'bot') {
        const avatar = `<img src="https://i.pravatar.cc/150?img=11" style="width:25px; border-radius:50%; margin-bottom:10px; display:block;">`;
        div.innerHTML = avatar + text;
    } else {
        div.innerHTML = text;
    }

    if (videos && videos.length > 0) {
    const vContainer = document.createElement('div');
    vContainer.style.display = "flex"; 
    vContainer.style.gap = "10px"; 
    vContainer.style.overflowX = "auto"; 
    vContainer.style.padding = "10px 0";

    videos.forEach((v, index) => {
        const videoId = `vid_${Date.now()}_${index}`; // Unique ID for each video
        // Inside the videos.forEach loop in script.js
        vContainer.innerHTML += `
        <div class="v-card" style="min-width: 220px; background: #fff; padding: 10px; border-radius: 12px; border: 1px solid #f0f0f0;">
            <h4 style="font-family: 'Playfair Display', serif; font-size: 13px; margin-bottom: 8px; color: #1A1A1A;">${v.title}</h4>
                <video id="${videoId}" style="width:100%; height:120px; border-radius:8px; background:black; object-fit: contain;">
            <source src="${v.url}" type="video/mp4">
            </video>
            <div class="video-controls">
                <button onclick="togglePlay('${videoId}')" class="vid-btn">Play</button>
                <button onclick="changeSpeed('${videoId}', 2.0)" class="vid-btn">Timelapse</button>
            </div>
        </div>`;
    });

    div.appendChild(vContainer);
}

    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
}

function renderButtons(list) {
    const area = document.getElementById('buttonArea');
    area.innerHTML = '';
    area.style.display = 'flex';
    area.style.gap = '10px';
    area.style.flexWrap = 'wrap';

    list.forEach(label => {
        const b = document.createElement('button');
        b.className = 'btn-choice';
        b.innerText = label;
        
        b.onclick = () => {
            addMessage(label, 'user');
            processLogic(label);
        };
        area.appendChild(b);
    });
}

// Check if input exists (prevents error on pages without the chat)
const userInputField = document.getElementById('userInput');
if (userInputField) {
    userInputField.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') handleSend(); 
    });
}

window.onload = () => { 
    if (document.getElementById('chatWindow')) processLogic('welcome'); 
};

// Refresh button logic
/// Locate the refresh button in the header and add the reset logic
const refreshBtn = document.getElementById('refreshChatBtn');
if (refreshBtn) {
    refreshBtn.onclick = () => {
    const win = document.getElementById('chatWindow');
    win.innerHTML = '<div class="date-divider">Today</div>';
    
    // Important: Reset the state variable and trigger the logic
    chatState = 'welcome';
    processLogic('welcome'); 
};
}
// Function to handle Play/Pause
function togglePlay(id) {
    const video = document.getElementById(id);
    const btn = event.target; // Gets the button that was clicked
    
    if (video.paused) {
        video.play();
        btn.innerText = "Pause";
    } else {
        video.pause();
        btn.innerText = "Play";
    }
}

// Function to handle Timelapse (Speed)
function changeSpeed(id, speed) {
    const video = document.getElementById(id);
    // If it's already fast, toggle back to normal, otherwise set to speed
    video.playbackRate = (video.playbackRate === speed) ? 1.0 : speed;
}
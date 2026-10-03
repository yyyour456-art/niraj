// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Typewriter Effect
const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Creator"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 120);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0; // Reset loop
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
}

// Start Typewriter
typingEffect();

// Scroll Animations (Fade-in & Slide-up)
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));
document.getElementById('tgForm').addEventListener('submit', function(e) {
    e.preventDefault(); // फॉर्म सबमिट होने पर पेज को रिफ्रेश होने से रोकेगा

    // फॉर्म का डेटा उठाना
    let name = document.getElementById('senderName').value;
    let email = document.getElementById('senderEmail').value;
    let message = document.getElementById('senderMessage').value;

    // अपना बोट टोकन और चैट आईडी यहाँ डालें
    let botToken = "8779812558:AAFhTyWdxBfXzBF-He9U_Ms-JrStes-ov9k"; 
    let chatId = "8411839754";

    // टेलीग्राम पर जाने वाला मैसेज का डिज़ाइन
    let text = `📩 New Message from Website\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

    // टेलीग्राम API का URL
    let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    // Fetch API से डेटा भेजना
    fetch(url)
        .then(response => {
            if(response.ok) {
                alert("मैसेज सफलतापूर्वक भेज दिया गया है!");
                document.getElementById('tgForm').reset(); // फॉर्म खाली कर देगा
            } else {
                alert("मैसेज भेजने में कोई दिक्कत हुई।");
            }
        })
        .catch(error => {
            alert("कुछ एरर आ गया!");
            console.error(error);
        });
});

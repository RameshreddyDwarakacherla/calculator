// Sound Effects
const sounds = {
    enabled: true,
    click: () => {
        if (!sounds.enabled) return;
        const audio = new Audio('data:audio/wav;base64,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');
        audio.volume = 0.1;
        audio.play().catch(() => {});
    }
};

// Memory storage
let memoryValue = 0;
let angleMode = 'DEG'; // or 'RAD'

class Calculator {
    constructor(displayElement, previousOperandElement) {
        this.displayElement = displayElement;
        this.previousOperandElement = previousOperandElement;
        this.clear();
        this.history = this.loadHistory();
        this.updateHistoryDisplay();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetDisplay = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentOperand = '';
            this.shouldResetDisplay = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '' && number === '.') {
            this.currentOperand = '0.';
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        const expression = `${prev} ${this.operation} ${current} = ${computation}`;
        this.addToHistory(expression);
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetDisplay = true;
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = current / 100;
        this.shouldResetDisplay = true;
    }

    // Scientific functions
    sqrt() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current < 0) {
            this.showError('Invalid input');
            return;
        }
        this.currentOperand = Math.sqrt(current);
        this.addToHistory(`√${current} = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    power() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.pow(current, 2);
        this.addToHistory(`${current}² = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    cube() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.pow(current, 3);
        this.addToHistory(`${current}³ = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    powerOf() {
        if (this.currentOperand === '') return;
        this.operation = '^';
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    sin() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        const radians = angleMode === 'DEG' ? current * Math.PI / 180 : current;
        this.currentOperand = Math.sin(radians);
        this.addToHistory(`sin(${current}) = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    cos() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        const radians = angleMode === 'DEG' ? current * Math.PI / 180 : current;
        this.currentOperand = Math.cos(radians);
        this.addToHistory(`cos(${current}) = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    tan() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        const radians = angleMode === 'DEG' ? current * Math.PI / 180 : current;
        this.currentOperand = Math.tan(radians);
        this.addToHistory(`tan(${current}) = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    ln() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showError('Invalid input');
            return;
        }
        this.currentOperand = Math.log(current);
        this.addToHistory(`ln(${current}) = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    log() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showError('Invalid input');
            return;
        }
        this.currentOperand = Math.log10(current);
        this.addToHistory(`log(${current}) = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    exp() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.exp(current);
        this.addToHistory(`e^${current} = ${this.currentOperand}`);
        this.shouldResetDisplay = true;
    }

    pi() {
        this.currentOperand = Math.PI;
        this.shouldResetDisplay = true;
    }

    e() {
        this.currentOperand = Math.E;
        this.shouldResetDisplay = true;
    }

    factorial() {
        const current = parseInt(this.currentOperand);
        if (isNaN(current) || current < 0 || current > 170) {
            this.showError('Invalid input');
            return;
        }
        let result = 1;
        for (let i = 2; i <= current; i++) {
            result *= i;
        }
        this.currentOperand = result;
        this.addToHistory(`${current}! = ${result}`);
        this.shouldResetDisplay = true;
    }

    random() {
        this.currentOperand = Math.random();
        this.shouldResetDisplay = true;
    }

    showError(message) {
        this.currentOperand = message;
        setTimeout(() => {
            this.clear();
            this.updateDisplay();
        }, 2000);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.displayElement.value = this.getDisplayNumber(this.currentOperand) || '0';
        
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
        
        this.animateDisplay();
    }

    animateDisplay() {
        this.displayElement.style.animation = 'none';
        setTimeout(() => {
            this.displayElement.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    }

    addToHistory(expression) {
        this.history.unshift(expression);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        return saved ? JSON.parse(saved) : [];
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 10px;">No history yet</div>';
            return;
        }
        
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = item;
            historyItem.addEventListener('click', () => {
                const result = item.split('=')[1].trim();
                this.currentOperand = result;
                this.updateDisplay();
            });
            historyList.appendChild(historyItem);
        });
    }
}

// Converter class
class Converter {
    constructor() {
        this.conversions = {
            length: {
                meter: 1,
                kilometer: 0.001,
                centimeter: 100,
                millimeter: 1000,
                mile: 0.000621371,
                yard: 1.09361,
                foot: 3.28084,
                inch: 39.3701
            },
            weight: {
                kilogram: 1,
                gram: 1000,
                milligram: 1000000,
                pound: 2.20462,
                ounce: 35.274,
                ton: 0.001
            },
            temperature: {
                celsius: 'base',
                fahrenheit: 'special',
                kelvin: 'special'
            },
            currency: {
                USD: 1,
                EUR: 0.92,
                GBP: 0.79,
                JPY: 149.50,
                INR: 83.12,
                AUD: 1.52,
                CAD: 1.36,
                CHF: 0.88
            }
        };
        
        this.currentType = 'length';
        this.setupConverter();
    }

    setupConverter() {
        this.updateUnits();
    }

    updateUnits() {
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        const units = Object.keys(this.conversions[this.currentType]);
        
        units.forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            fromUnit.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            toUnit.appendChild(option2);
        });
        
        if (units.length > 1) {
            toUnit.selectedIndex = 1;
        }
    }

    convert(value, from, to) {
        if (this.currentType === 'temperature') {
            return this.convertTemperature(value, from, to);
        }
        
        const baseValue = value / this.conversions[this.currentType][from];
        return baseValue * this.conversions[this.currentType][to];
    }

    convertTemperature(value, from, to) {
        let celsius;
        
        switch(from) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }
        
        switch(to) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9/5) + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
    }
}

// Particle animation
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 217, 255, 0.3)';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
const displayElement = document.getElementById('display');
const previousOperandElement = document.getElementById('previousOperand');
const calculator = new Calculator(displayElement, previousOperandElement);
const converter = new Converter();
const particleSystem = new ParticleSystem();

// Memory functions
function updateMemoryDisplay() {
    document.getElementById('memoryIndicator').textContent = `M: ${memoryValue.toFixed(2)}`;
}

document.querySelectorAll('[data-memory]').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.memory;
        const current = parseFloat(calculator.currentOperand) || 0;
        
        switch(action) {
            case 'store':
                memoryValue = current;
                break;
            case 'recall':
                calculator.currentOperand = memoryValue;
                calculator.updateDisplay();
                break;
            case 'clear':
                memoryValue = 0;
                break;
        }
        updateMemoryDisplay();
        sounds.click();
    });
});

// Angle mode toggle
document.getElementById('angleMode').addEventListener('click', () => {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    document.getElementById('angleMode').textContent = angleMode;
    sounds.click();
});

// Mode switching
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const mode = btn.dataset.mode;
        
        document.getElementById('basicMode').classList.add('hidden');
        document.getElementById('scientificMode').classList.add('hidden');
        document.getElementById('converterMode').classList.add('hidden');
        
        if (mode === 'basic') {
            document.getElementById('basicMode').classList.remove('hidden');
        } else if (mode === 'scientific') {
            document.getElementById('scientificMode').classList.remove('hidden');
        } else if (mode === 'converter') {
            document.getElementById('converterMode').classList.remove('hidden');
        }
        sounds.click();
    });
});

// Number buttons
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
        addButtonAnimation(button);
        sounds.click();
    });
});

// Operator buttons
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
        addButtonAnimation(button);
        sounds.click();
    });
});

// Action buttons
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        
        switch(action) {
            case 'clear':
                calculator.clear();
                break;
            case 'delete':
                calculator.delete();
                break;
            case 'equals':
                calculator.compute();
                break;
            case 'percent':
                calculator.percent();
                break;
        }
        
        calculator.updateDisplay();
        addButtonAnimation(button);
        sounds.click();
    });
});

// Scientific buttons
document.querySelectorAll('[data-scientific]').forEach(button => {
    button.addEventListener('click', () => {
        const func = button.dataset.scientific;
        calculator[func]();
        calculator.updateDisplay();
        addButtonAnimation(button);
        sounds.click();
    });
});

// Converter tabs
document.querySelectorAll('.converter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.converter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        converter.currentType = tab.dataset.converter;
        converter.updateUnits();
        
        document.getElementById('converterInput').value = '';
        document.getElementById('converterOutput').value = '';
        sounds.click();
    });
});

// Converter input
document.getElementById('converterInput').addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
        document.getElementById('converterOutput').value = '';
        return;
    }
    
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    
    const result = converter.convert(value, from, to);
    document.getElementById('converterOutput').value = result.toFixed(6);
});

// Converter unit change
document.getElementById('fromUnit').addEventListener('change', () => {
    const input = document.getElementById('converterInput');
    if (input.value) {
        input.dispatchEvent(new Event('input'));
    }
});

document.getElementById('toUnit').addEventListener('change', () => {
    const input = document.getElementById('converterInput');
    if (input.value) {
        input.dispatchEvent(new Event('input'));
    }
});

// Swap button
document.getElementById('swapBtn').addEventListener('click', () => {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const input = document.getElementById('converterInput');
    const output = document.getElementById('converterOutput');
    
    const tempValue = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempValue;
    
    const tempInput = input.value;
    input.value = output.value;
    output.value = tempInput;
    
    if (input.value) {
        input.dispatchEvent(new Event('input'));
    }
    sounds.click();
});

// Sound toggle
const soundBtn = document.getElementById('soundBtn');
soundBtn.addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    soundBtn.classList.toggle('active');
    sounds.click();
});

// Voice input
const voiceBtn = document.getElementById('voiceBtn');
let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        processVoiceCommand(transcript);
        voiceBtn.classList.remove('active');
    };
    
    recognition.onerror = () => {
        voiceBtn.classList.remove('active');
    };
    
    voiceBtn.addEventListener('click', () => {
        if (voiceBtn.classList.contains('active')) {
            recognition.stop();
            voiceBtn.classList.remove('active');
        } else {
            recognition.start();
            voiceBtn.classList.add('active');
        }
    });
} else {
    voiceBtn.style.display = 'none';
}

function processVoiceCommand(command) {
    const numbers = command.match(/\d+/g);
    
    if (command.includes('clear')) {
        calculator.clear();
        calculator.updateDisplay();
    } else if (command.includes('plus') || command.includes('add')) {
        if (numbers) calculator.appendNumber(numbers[0]);
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    } else if (command.includes('minus') || command.includes('subtract')) {
        if (numbers) calculator.appendNumber(numbers[0]);
        calculator.chooseOperation('-');
        calculator.updateDisplay();
    } else if (command.includes('times') || command.includes('multiply')) {
        if (numbers) calculator.appendNumber(numbers[0]);
        calculator.chooseOperation('*');
        calculator.updateDisplay();
    } else if (command.includes('divide')) {
        if (numbers) calculator.appendNumber(numbers[0]);
        calculator.chooseOperation('/');
        calculator.updateDisplay();
    } else if (command.includes('equals') || command.includes('calculate')) {
        calculator.compute();
        calculator.updateDisplay();
    } else if (numbers) {
        numbers.forEach(num => {
            for (let digit of num) {
                calculator.appendNumber(digit);
            }
        });
        calculator.updateDisplay();
    }
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
let isDarkTheme = true;

const savedTheme = localStorage.getItem('calculatorTheme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
    isDarkTheme = false;
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    isDarkTheme = !isDarkTheme;
    themeIcon.textContent = isDarkTheme ? '🌙' : '☀️';
    localStorage.setItem('calculatorTheme', isDarkTheme ? 'dark' : 'light');
    sounds.click();
});

// Clear history button
document.getElementById('clearHistory').addEventListener('click', () => {
    calculator.clearHistory();
    sounds.click();
});

// Real-time clock
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetimeDisplay').textContent = now.toLocaleString('en-US', options);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
        highlightButton(`[data-number="${e.key}"]`);
        sounds.click();
    }
    
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
        highlightButton(`[data-operator="${e.key}"]`);
        sounds.click();
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
        highlightButton('[data-action="equals"]');
        sounds.click();
    }
    
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
        highlightButton('[data-action="delete"]');
        sounds.click();
    }
    
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
        highlightButton('[data-action="clear"]');
        sounds.click();
    }
    
    if (e.key === '%') {
        calculator.percent();
        calculator.updateDisplay();
        highlightButton('[data-action="percent"]');
        sounds.click();
    }
});

// Button animation helper
function addButtonAnimation(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
}

// Keyboard highlight helper
function highlightButton(selector) {
    const button = document.querySelector(selector);
    if (button) {
        addButtonAnimation(button);
        button.style.boxShadow = '0 0 30px var(--hover-glow)';
        setTimeout(() => {
            button.style.boxShadow = '';
        }, 300);
    }
}

// Initialize display
calculator.updateDisplay();
updateMemoryDisplay();

// Add ripple effect on click
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

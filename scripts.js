/* ================= 0. GERÇEK EKRAN YÜKSEKLİĞİ ================= */
// Android Chrome'da PWA olarak açılan sayfa yenilendiğinde 100vh/100dvh birimleri sistem
// navigasyon çubuğunu da içerecek şekilde hesaplanabiliyor; sayfa gereksiz yere kaydırılabilir
// hale geliyor. Görünür alanın ölçülen yüksekliği --app-height olarak CSS'e aktarılır.
function updateAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}

updateAppHeight();
window.addEventListener('resize', updateAppHeight);
window.addEventListener('orientationchange', updateAppHeight);
// Geri/ileri önbelleğinden dönüşte ve yenileme sonrası geç gelen boyut değişiminde tekrar ölç
window.addEventListener('pageshow', updateAppHeight);
window.addEventListener('load', () => requestAnimationFrame(updateAppHeight));

/* ================= 1. SVG İKON KÜTÜPHANESİ ================= */
const SVG_ICONS = {
    soundOn: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    soundOff: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    heartFilled: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    heartEmpty: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.25"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    xCircle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    infoBook: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    target: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    map: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
    car: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    compass: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    food: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v20M6 2v20M12 2v20"/></svg>`,
    landmark: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    user: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    mountain: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`,
    factory: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4L2 20z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    motionOn: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    motionOff: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`
};

/* ================= 2b. GÜVENLİ YEREL DEPOLAMA (localStorage) ================= */
// localStorage bazı tarayıcı modlarında (ör. gizli mod veya kısıtlı çerezler)
// hata fırlatabilir. Bu yardımcılar uygulamanın çökmesini engeller.
function safeGetItem(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
    } catch (e) {
        return fallback;
    }
}

function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        /* Depolamaya yazılamıyor - sessizce yok say */
    }
}

function safeRemoveItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        /* Depolamadan silinemiyor - sessizce yok say */
    }
}

/* ================= 3. SES SİSTEMİ (Web Audio API) ================= */
let audioCtx = null;
let isMuted = safeGetItem('ilce_bilmece_muted') === 'true';

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(freq, type, duration, startTime = 0) {
    if (isMuted) return;
    initAudio();
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + startTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + startTime);
        osc.stop(audioCtx.currentTime + startTime + duration);
    } catch (e) {
        console.warn(e);
    }
}

function playCorrectSound() {
    playTone(523.25, 'sine', 0.15, 0);     // C5
    playTone(659.25, 'sine', 0.18, 0.08);  // E5
    playTone(783.99, 'sine', 0.25, 0.16);  // G5
}

function playWrongSound() {
    playTone(260, 'sawtooth', 0.18, 0);
    playTone(190, 'sawtooth', 0.25, 0.12);
}

function playTickSound() {
    playTone(880, 'sine', 0.05, 0);
}

function playFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, idx) => playTone(f, 'triangle', 0.35, idx * 0.1));
}

/* ================= 4. OYUN DURUMU (Game State) ================= */
let currentMode = 'classic'; // 'classic' | 'time' | 'regional' | 'daily'
let selectedRegion = 'all';
let score = 0; // 1'ER 1'ER İLERLER (DOĞRU SAYISI)

// Rekorlar moda göre (Bölgesel Mod'da ayrıca bölgeye göre) ayrı tutulur;
// 60 saniyelik skor ile can bazlı modların skorları birbiriyle yarışmaz.
const LEGACY_RECORD_KEY = 'ilce_record';

function getRecordKey(mode = currentMode, region = selectedRegion) {
    return mode === 'regional' ? `ilce_record_regional_${region}` : `ilce_record_${mode}`;
}

function loadRecord() {
    return parseInt(safeGetItem(getRecordKey(), '0'), 10) || 0;
}

// Önceki sürümlerdeki tek ortak rekor, Klasik Mod rekoru olarak taşınır
(function migrateLegacyRecord() {
    const legacy = safeGetItem(LEGACY_RECORD_KEY);
    if (legacy === null) return;
    if (safeGetItem(getRecordKey('classic')) === null) {
        safeSetItem(getRecordKey('classic'), legacy);
    }
    safeRemoveItem(LEGACY_RECORD_KEY);
})();

let record = loadRecord();
let gameStartRecord = record;
let recordCelebrated = false; // Konfeti ve ses sadece rekor kırıldığında 1 kez çalsın
let lives = 3;
let timeLeft = 60;
let timerInterval = null;
let isWaiting = false;
let isGameStarted = false;
let isAnswered = false; // Mevcut soru cevaplandı mı? (Oturum devamında tekrar cevaplanmasını engeller)
let autoNextTimeout = null; // Zamana karşı modunda otomatik soru geçişi zamanlayıcısı
const FIRST_RECORD_TARGET = 10; // Hiç rekor yokken hedeflenen ilk skor

let questionPool = [];
let currentQuestion = null;
let questionCounter = 0;
let correctCount = 0;
let wrongCount = 0;
let mistakesHistory = [];

// Jokers (başlangıç hakları; kalan haklar nokta göstergesiyle bu sayıya göre çizilir)
const JOKER_MAX = {
    fifty: 1,
    hint: 3,
    skip: 1
};
let jokers = { ...JOKER_MAX };
let usedClueTypesForQuestion = [];

/* ================= 5. SORU HAVUZU HAZIRLAMA ================= */
function buildQuestionPool() {
    const list = [];
    ilceler.forEach(ilObj => {
        const ilMeta = ilEkstraBilgiler[ilObj.il];
        const bolge = ilMeta ? ilMeta.bolge : "";

        // Bölgesel filtre
        if (currentMode === 'regional' && selectedRegion !== 'all' && bolge !== selectedRegion) {
            return;
        }

        ilObj.ilce.forEach(ilceAdi => {
            list.push({
                il: ilObj.il,
                ilce: ilceAdi,
                id: `${ilObj.il}_${ilceAdi}`,
                bolge: bolge
            });
        });
    });

    // Fisher-Yates Shuffle
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}
/* ================= 5b. SÜRÜKLENEN OTURUM (YARIM KALAN OYUNU SAKLAMA) ================= */
const SESSION_KEY = 'ilce_active_session';

function saveGameSession() {
    // Günün Bilmecesi kendi kaydını tutar (genel "Devam Et" oturumuna karışmaz)
    if (currentMode === 'daily') {
        saveDailyState();
        return;
    }
    if (!isGameStarted || (currentMode !== 'time' && lives <= 0)) return;
    try {
        // Süreli modda kalan süre, son tik yerine bitiş zamanından hesaplanır
        const remainingTime = (currentMode === 'time' && timerEndTime)
            ? Math.ceil(Math.max(0, timerEndTime - Date.now()) / 1000)
            : timeLeft;
        const optionButtons = Array.from(document.querySelectorAll('#options .option-btn'));
        const sessionData = {
            mode: currentMode,
            region: selectedRegion,
            score: score,
            lives: lives,
            timeLeft: remainingTime,
            questionCounter: questionCounter,
            correctCount: correctCount,
            wrongCount: wrongCount,
            mistakesHistory: mistakesHistory,
            jokers: jokers,
            pool: questionPool,
            currentQuestion: currentQuestion,
            answered: isAnswered,
            options: optionButtons.map(b => b.dataset.city),
            fiftyDisabled: optionButtons.filter(b => b.classList.contains('fifty-disabled')).map(b => b.dataset.city),
            clueHtml: document.getElementById('clue-box').innerHTML,
            usedClueTypes: usedClueTypesForQuestion,
            gameStartRecord: gameStartRecord,
            recordCelebrated: recordCelebrated,
            timestamp: Date.now()
        };
        safeSetItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {
        /* Sessizce geç */
    }
}

function clearGameSession() {
    safeRemoveItem(SESSION_KEY);
}

function getSavedGameSession() {
    const raw = safeGetItem(SESSION_KEY);
    if (!raw) return null;
    try {
        const data = JSON.parse(raw);
        if (data && Date.now() - data.timestamp < 24 * 60 * 60 * 1000 && data.pool && data.currentQuestion) {
            return data;
        }
    } catch (e) {
        return null;
    }
    return null;
}

function resumeGame() {
    const session = getSavedGameSession();
    if (!session) return;

    currentMode = session.mode;
    selectedRegion = session.region;
    score = session.score;
    lives = session.lives;
    timeLeft = Number.isFinite(session.timeLeft) ? session.timeLeft : 60;
    questionCounter = session.questionCounter;
    correctCount = session.correctCount;
    wrongCount = session.wrongCount;
    mistakesHistory = session.mistakesHistory || [];
    jokers = session.jokers || { ...JOKER_MAX };
    questionPool = session.pool || [];
    currentQuestion = session.currentQuestion;

    isGameStarted = true;
    isWaiting = false;
    clearTimeout(autoNextTimeout);

    // Rekor durumu oturumdan geri yüklenir; aksi halde bu oyunun skoru "önceki rekor" sayılır
    record = loadRecord();
    gameStartRecord = typeof session.gameStartRecord === 'number' ? session.gameStartRecord : record;
    recordCelebrated = !!session.recordCelebrated;

    const modeNameEl = document.getElementById('mode-active-name');
    const modeIconEl = document.getElementById('mode-active-icon');
    const mobileModeIconEl = document.getElementById('mobile-mode-icon');
    if (currentMode === 'time') {
        document.getElementById('extra-stat-label').innerText = 'Süre';
        document.getElementById('extra-stat-val').innerHTML = `<span class="timer-val" id="time-display">${timeLeft}s</span>`;
        modeNameEl.innerText = 'Zamana Karşı (60s)';
        modeIconEl.innerHTML = SVG_ICONS.clock;
        if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.clock;
        startTimer(timeLeft);
    } else {
        document.getElementById('extra-stat-label').innerText = 'Can';
        document.getElementById('extra-stat-val').innerHTML = `<span class="hearts-container" id="hearts-display"></span>`;
        updateHearts();
        if (currentMode === 'regional') {
            modeNameEl.innerText = selectedRegion === 'all' ? 'Bölgesel Mod: Tüm Bölgeler' : `Bölgesel Mod: ${selectedRegion}`;
            modeIconEl.innerHTML = SVG_ICONS.map;
            if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.map;
        } else {
            modeNameEl.innerText = 'Klasik Mod (3 Can)';
            modeIconEl.innerHTML = SVG_ICONS.shield;
            if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.shield;
        }
    }

    updateJokerButtons();
    setJokersEnabled(true);
    updateScoreBoard();

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // feedback-area'yı tekrar göster (oyun bittiğinde gizlenmiş olabilir)
    document.getElementById('feedback-area').style.display = '';

    // Kaydedilen soru zaten cevaplandıysa aynı soru tekrar sorulmaz, sıradakine geçilir
    if (session.answered) {
        showQuestion();
        return;
    }

    isAnswered = false;
    resetMaps();
    document.getElementById('next-btn-container').style.display = 'none';
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('district-info').style.display = 'none';

    // Kullanılan ipuçları geri yüklenir
    const clueBox = document.getElementById('clue-box');
    clueBox.innerHTML = session.clueHtml || '';
    clueBox.style.display = clueBox.innerHTML.trim() ? 'block' : 'none';
    usedClueTypesForQuestion = session.usedClueTypes || [];

    document.getElementById('question').innerHTML = `<span class="district-name">${currentQuestion.ilce}</span> ilçesi hangi ile bağlıdır?`;

    // Aynı şıklar ve %50 jokeriyle elenen şıklar geri yüklenir
    const savedOptions = Array.isArray(session.options) && session.options.length && session.options.includes(currentQuestion.il)
        ? session.options
        : generateOptions(currentQuestion);
    renderOptions(savedOptions, session.fiftyDisabled || []);

    saveGameSession();
}

// Şık butonlarını oluşturur (elenen şıklar devre dışı başlar)
function renderOptions(options, disabledCities = []) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach((cityName, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('type', 'button');
        btn.dataset.city = cityName;
        btn.setAttribute('aria-label', `${idx + 1}. seçenek: ${cityName}`);
        btn.innerHTML = `<span class="opt-key-badge kbd kbd-hint" aria-hidden="true">${idx + 1}</span><span class="opt-city-name">${cityName}</span>`;
        btn.onclick = () => checkAnswer(cityName, currentQuestion.il, currentQuestion.ilce, btn);
        if (disabledCities.includes(cityName)) {
            btn.classList.add('fifty-disabled');
            btn.disabled = true;
        }
        optionsContainer.appendChild(btn);
    });
}

// Sayfa kapanırken / arka plana atılırken güncel durum (özellikle kalan süre) kaydedilir
window.addEventListener('pagehide', saveGameSession);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveGameSession();
});


/* ================= 6. OYUNU HAZIRLAMA (BAŞLANGIÇ EKRANI) ================= */
function prepareGame(mode = 'classic', region = 'all') {
    currentMode = mode;
    selectedRegion = region;
    score = 0;
    questionCounter = 0;
    correctCount = 0;
    wrongCount = 0;
    mistakesHistory = [];
    isWaiting = false;
    isGameStarted = false;
    isAnswered = false;
    currentQuestion = null;

    record = loadRecord();
    gameStartRecord = record;
    recordCelebrated = false;

    clearInterval(timerInterval);
    clearTimeout(autoNextTimeout);
    timerEndTime = null;

    // Joker hakları sıfırlanır (İpucu hakkı: 3)
    jokers = { ...JOKER_MAX };
    usedClueTypesForQuestion = [];
    updateJokerButtons();
    setJokersEnabled(false);

    // Mod barını ve sayacı ayarla
    const modeNameEl = document.getElementById('mode-active-name');
    const modeIconEl = document.getElementById('mode-active-icon');
    const mobileModeIconEl = document.getElementById('mobile-mode-icon');
    const startTitleEl = document.getElementById('start-mode-title');
    const startDescEl = document.getElementById('start-mode-desc');

    document.body.dataset.mode = currentMode;
    document.querySelector('#start-game-btn span').innerText = 'Oyuna Başla';

    if (currentMode === 'daily') {
        prepareDailyScreen();
    } else if (currentMode === 'time') {
        timeLeft = 60;
        document.getElementById('extra-stat-label').innerText = 'Süre';
        document.getElementById('extra-stat-val').innerHTML = `<span class="timer-val" id="time-display">60s</span>`;
        modeNameEl.innerText = 'Zamana Karşı (60s)';
        modeIconEl.innerHTML = SVG_ICONS.clock;
        if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.clock;

        startTitleEl.innerText = 'Zamana Karşı Modu';
        startDescEl.innerText = 'Toplam 60 saniye süreniz var! Süre, aşağıdaki "Oyuna Başla" butonuna bastığınız anda başlar. Bakalım kaç ilçe bilebileceksin?';
    } else {
        lives = 3;
        document.getElementById('extra-stat-label').innerText = 'Can';
        document.getElementById('extra-stat-val').innerHTML = `<span class="hearts-container" id="hearts-display"></span>`;
        updateHearts();

        if (currentMode === 'regional') {
            if (selectedRegion === 'all') {
                modeNameEl.innerText = 'Bölgesel Mod: Tüm Bölgeler';
                modeIconEl.innerHTML = SVG_ICONS.map;
                if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.map;
                startTitleEl.innerText = 'Tüm Bölgeler';
                startDescEl.innerText = 'Rastgele bir bölgedeki illerin ilçelerini pekiştirmek için hazırlandı. 3 can hakkın var.';
            } else {
                modeNameEl.innerText = `Bölgesel Mod: ${selectedRegion}`;
                modeIconEl.innerHTML = SVG_ICONS.map;
                if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.map;
                startTitleEl.innerText = `${selectedRegion} Bölgesi`;
                startDescEl.innerText = `${selectedRegion} Bölgesi'ne bağlı illerin ilçelerini pekiştirmek için hazırlandı. 3 can hakkın var.`;
            }
        } else {
            modeNameEl.innerText = 'Klasik Mod (3 Can)';
            modeIconEl.innerHTML = SVG_ICONS.shield;
            if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.shield;
            startTitleEl.innerText = 'Klasik Mod';
            startDescEl.innerText = '3 can ve 5 joker hakkın var.\nİlçeleri doğru tahmin et ve en yüksek skora ulaş!';
        }
    }

    // Soru havuzunu oluştur ama gösterme (Günün Bilmecesi'nin havuzu başlarken kurulur)
    questionPool = currentMode === 'daily' ? [] : buildQuestionPool();
    resetMaps();

    // Mod seçici çubuğunun erişilebilirlik etiketi aktif moda göre güncellenir
    const modeSelectorBarEl = document.getElementById('mode-selector-btn');
    if (modeSelectorBarEl) {
        modeSelectorBarEl.setAttribute('aria-label', `Oyun modunu değiştir. Aktif mod: ${modeNameEl.innerText}.`);
    }

    updateScoreBoard();

    // Kaydedilmiş yarım kalan oturum kontrolü
    const resumeContainer = document.getElementById('resume-container');
    const resumeBtn = document.getElementById('resume-game-btn');
    const resumeText = document.getElementById('resume-btn-text');
    const savedSession = getSavedGameSession();

    if (savedSession && savedSession.score > 0 && savedSession.mode === currentMode && (currentMode !== 'regional' || savedSession.region === selectedRegion)) {
        if (resumeContainer && resumeText) {
            resumeText.innerText = `Devam Et (${savedSession.score} Puan)`;
            resumeContainer.style.display = 'block';
            resumeBtn.onclick = resumeGame;
        }
    } else if (resumeContainer) {
        resumeContainer.style.display = 'none';
    }

    // Ekranları ayarla: Başla kartı AÇIK, Quiz kartı KAPALI
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('quiz-screen').style.display = 'none';
}

/* "Oyuna Başla" butonuna basınca tetiklenir */
function startGame() {
    if (currentMode === 'daily') {
        startDailyGame();
        return;
    }
    clearGameSession(); // Yeni oyunda eski oturumu sıfırla
    isGameStarted = true;
    setJokersEnabled(true);

    // Havuz boşsa (örneğin daha önceki oturum havuzu boşalttıysa) yeniden kur
    if (!questionPool || questionPool.length === 0) {
        questionPool = buildQuestionPool();
    }

    // Başla ekranını gizle, soru ekranını aç
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // feedback-area'yı tekrar göster (oyun bittiğinde gizlenmiş olabilir)
    document.getElementById('feedback-area').style.display = '';

    // Süreli modda sayaç ŞİMDİ başlar!
    if (currentMode === 'time') {
        startTimer();
    }

    showQuestion();
}

document.getElementById('start-game-btn').onclick = startGame;

function setJokersEnabled(enabled) {
    const container = document.getElementById('jokers-section-container');
    if (container) {
        container.style.opacity = enabled ? '1' : '0.45';
        container.style.pointerEvents = enabled ? 'auto' : 'none';
    }
}

/* ================= 6b. ZAMANLAYICI (TIMESTAMP TABANLI HASSAS SAYAÇ) ================= */
// setInterval tek başına sekme arka plana atıldığında throttle edilir ve süre kayar.
// Timestamp tabanlı hesaplama ile her an geçen gerçek zaman ölçülür.
let timerEndTime = null;

function startTimer(duration = 60) {
    clearInterval(timerInterval);
    timeLeft = duration;
    timerEndTime = Date.now() + (duration * 1000);

    const updateTimerDisplay = () => {
        const timeEl = document.getElementById('time-display');
        if (timeEl) {
            timeEl.innerText = `${timeLeft}s`;
            if (timeLeft <= 10) {
                timeEl.classList.add('warning');
                playTickSound();
            } else {
                timeEl.classList.remove('warning');
            }
        }
    };

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        const remainingMs = Math.max(0, timerEndTime - Date.now());
        const newTimeLeft = Math.ceil(remainingMs / 1000);

        if (newTimeLeft !== timeLeft) {
            timeLeft = newTimeLeft;
            updateTimerDisplay();
        }

        if (remainingMs <= 0) {
            clearInterval(timerInterval);
            endGame('Süre Doldu!');
        }
    }, 200);
}

/* ================= 6b. SEÇENEK ÜRETİMİ & KARIŞTIRMA ================= */
// Fisher-Yates algoritması ile adil karıştırma (sort(()=>Math.random()-0.5) yanlıdır)
// rng: Günün Bilmecesi'nde herkese aynı sonucu veren tohumlu üreteç, diğer modlarda Math.random
function shuffleArray(arr, rng = Math.random) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

// Bir soru için 1 doğru + 3 yanlış il seçeneği üretir.
// ÖNEMLİ: Aynı ada sahip ilçesi bulunan başka bir il, ASLA yanlış şık olarak eklenmez
// (aksi halde sorunun birden fazla doğru cevabı olabilir).
// regional: Bölgesel Mod'da yanlış şıklar aynı bölgeden seçilir (Günün Bilmecesi'nde her zaman false)
function generateOptions(question, rng = Math.random, regional = currentMode === 'regional') {
    const options = [question.il];

    // Aday: doğru ilden farklı ve aynı adlı ilçeyi barındırmayan iller
    const isEligible = (ilObj) => ilObj.il !== question.il && !ilObj.ilce.includes(question.ilce);

    // Bölgesel modda yanlış seçenekler öncelikle AYNI bölgedeki illerden oluşur
    const questionRegion = question.bolge || (ilEkstraBilgiler[question.il] ? ilEkstraBilgiler[question.il].bolge : "");
    let candidatePool = ilceler;

    if (regional && questionRegion) {
        const regionalList = ilceler.filter(item => {
            const meta = ilEkstraBilgiler[item.il];
            return meta && meta.bolge === questionRegion;
        });
        if (regionalList.length >= 4) {
            candidatePool = regionalList;
        }
    }

    let pool = candidatePool.filter(isEligible);
    if (pool.length < 3) {
        // Nadir durum: bölgede yeterli uygun il yoksa genel havuzdan tamamla
        pool = ilceler.filter(isEligible);
    }

    shuffleArray(pool, rng);
    for (let i = 0; i < pool.length && options.length < 4; i++) {
        options.push(pool[i].il);
    }

    shuffleArray(options, rng);
    return options;
}

/* ================= 6c. GÜNÜN BİLMECESİ: SORU ÜRETİMİ ================= */
// Sunucu olmadan herkese aynı 10 soru: sorular ve şıklar, bulmaca numarasından tohumlanan
// bir rastgele sayı üreteciyle üretilir. Aynı numara her tarayıcıda aynı bulmacayı verir.
//
// Seçim yöntemi: 922 ilçe her "tur" için tohumlu olarak karıştırılır ve her gün sıradaki
// 10 ilçe sorulur. Böylece bir tur (~92 gün) boyunca hiçbir ilçe tekrar sorulmaz; tur
// bitince yeni tohumla yeni bir tur başlar. Üretim süresizdir (5 yıl ve sonrası hazırdır).
const DAILY_START_UTC = Date.UTC(2026, 9, 19); // 19.10.2026 = Günün Bilmecesi #1
const DAILY_QUESTION_COUNT = 10;
const DAILY_SEED = 0x1BCE2026;
const DAILY_TIME_ZONE = 'Europe/Istanbul';
const DAY_MS = 24 * 60 * 60 * 1000;

// Mulberry32: küçük, hızlı ve tüm tarayıcılarda aynı sonucu veren tohumlu üreteç
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Türkiye saatine göre bugünün tarihi (yeni bulmaca İstanbul'da gece yarısı açılır)
function getIstanbulDateParts(now = new Date()) {
    const parts = {};
    new Intl.DateTimeFormat('en-US', {
        timeZone: DAILY_TIME_ZONE, year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(now).forEach(p => { parts[p.type] = parseInt(p.value, 10); });
    return { year: parts.year, month: parts.month, day: parts.day };
}

function getDailyNumber(now = new Date()) {
    const { year, month, day } = getIstanbulDateParts(now);
    return Math.max(1, Math.round((Date.UTC(year, month - 1, day) - DAILY_START_UTC) / DAY_MS) + 1);
}

// Bulmaca numarasına karşılık gelen tarih (ör. "19 Ekim 2026")
function formatDailyDate(number) {
    return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
        .format(new Date(DAILY_START_UTC + (number - 1) * DAY_MS));
}

// Sonraki bulmacaya kalan süre (ms). Türkiye 2016'dan beri yıl boyu UTC+3 kullanır.
function msUntilNextDaily(now = new Date()) {
    const { year, month, day } = getIstanbulDateParts(now);
    return Date.UTC(year, month - 1, day + 1) - 3 * 60 * 60 * 1000 - now.getTime();
}

// Sabit sıralı ilçe listesi: veri setindeki dizilişten bağımsız olsun diye plaka ve ada göre
// (yerel ayara bağlı localeCompare yerine kod birimi karşılaştırmasıyla) sıralanır
let dailyDistrictList = null;
function getDailyDistrictList() {
    if (!dailyDistrictList) {
        dailyDistrictList = [];
        ilceler.forEach(ilObj => {
            const meta = ilEkstraBilgiler[ilObj.il];
            ilObj.ilce.forEach(ilceAdi => dailyDistrictList.push({
                il: ilObj.il,
                ilce: ilceAdi,
                id: `${ilObj.il}_${ilceAdi}`,
                bolge: meta ? meta.bolge : '',
                key: `${meta ? meta.plaka : '99'}|${ilceAdi}`
            }));
        });
        dailyDistrictList.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    }
    return dailyDistrictList;
}

function getDailyDaysPerCycle() {
    return Math.floor(getDailyDistrictList().length / DAILY_QUESTION_COUNT);
}

// Bir turun ham (düzeltilmemiş) karışık sırası
function getRawDailyCycle(cycle) {
    return shuffleArray([...getDailyDistrictList()], mulberry32(DAILY_SEED + cycle * 7919));
}

// Turun son günü ile bir sonraki turun ilk günü aynı ilçeyi içermesin diye, yeni turun
// ilk 10 ilçesinden önceki turun son gününde de geçenler turun ortasındakilerle yer değiştirir.
// Yer değiştirme yalnızca ilk gün ile ortadaki günler arasında olduğundan turun son günü
// hiç değişmez; bu yüzden önceki turun yalnızca ham sırası yeterlidir.
const dailyCycleCache = new Map();
function getDailyCycle(cycle) {
    if (dailyCycleCache.has(cycle)) return dailyCycleCache.get(cycle);
    const order = getRawDailyCycle(cycle);
    if (cycle > 0) {
        const days = getDailyDaysPerCycle();
        const prevLastDay = new Set(getRawDailyCycle(cycle - 1)
            .slice((days - 1) * DAILY_QUESTION_COUNT, days * DAILY_QUESTION_COUNT)
            .map(q => q.id));
        let swapIndex = Math.floor(days / 2) * DAILY_QUESTION_COUNT;
        for (let i = 0; i < DAILY_QUESTION_COUNT; i++) {
            if (!prevLastDay.has(order[i].id)) continue;
            while (prevLastDay.has(order[swapIndex].id)) swapIndex++;
            [order[i], order[swapIndex]] = [order[swapIndex], order[i]];
            swapIndex++;
        }
    }
    dailyCycleCache.set(cycle, order);
    return order;
}

// N numaralı bulmacanın 10 sorusu ve her sorunun sabit şıkları
function buildDailyPuzzle(number) {
    const days = getDailyDaysPerCycle();
    const dayIndex = number - 1;
    const cycle = Math.floor(dayIndex / days);
    const start = (dayIndex % days) * DAILY_QUESTION_COUNT;
    return getDailyCycle(cycle).slice(start, start + DAILY_QUESTION_COUNT).map((q, i) => ({
        il: q.il,
        ilce: q.ilce,
        id: q.id,
        bolge: q.bolge,
        options: generateOptions(q, mulberry32(DAILY_SEED ^ Math.imul(number, 1000003) ^ (i + 1)), false)
    }));
}

/* ================= 6d. GÜNÜN BİLMECESİ: OYUN DURUMU, İSTATİSTİK VE PAYLAŞIM ================= */
// Kurallar: herkese aynı 10 soru, can yok (10 sorunun hepsi cevaplanır), yalnızca İpucu jokeri
// (3 hak). Günde bir kez oynanır; sonuç ve istatistikler bu cihazda saklanır.
const DAILY_STATE_KEY = 'ilce_daily_state';
const DAILY_STATS_KEY = 'ilce_daily_stats';
const DAILY_JOKERS = { fifty: 0, hint: 3, skip: 0 };

let dailyNumber = null;
let dailyPuzzle = null;
let dailyState = null;        // { number, answers: [{ ilce, il, guessed, correct, hint }], jokers, elapsedMs, ... }
let dailySegmentStart = null; // Süre yalnızca soru ekrandayken ve cevaplanmamışken işler
let dailyCountdownTimer = null;

function loadStoredJSON(key) {
    try {
        const raw = safeGetItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function loadDailyState(number) {
    const state = loadStoredJSON(DAILY_STATE_KEY);
    return state && state.number === number && Array.isArray(state.answers) ? state : null;
}

function createDailyState(number) {
    return {
        number,
        answers: [],
        jokers: { ...DAILY_JOKERS },
        currentHint: false,   // Mevcut soruda ipucu kullanıldı mı?
        clueHtml: '',
        usedClueTypes: [],
        elapsedMs: 0,
        finished: false
    };
}

function saveDailyState() {
    if (!dailyState) return;
    if (!dailyState.finished && isGameStarted) {
        dailyState.jokers = { ...jokers };
        // Cevaplanmış sorunun ipucu saklanmaz (yenilemede sıradaki soruya taşınmasın)
        dailyState.clueHtml = isAnswered ? '' : document.getElementById('clue-box').innerHTML;
        dailyState.usedClueTypes = isAnswered ? [] : usedClueTypesForQuestion;
    }
    safeSetItem(DAILY_STATE_KEY, JSON.stringify(dailyState));
}

function startDailyClock() {
    if (currentMode === 'daily' && isGameStarted && !isAnswered && dailySegmentStart === null) {
        dailySegmentStart = Date.now();
    }
}

function stopDailyClock() {
    if (dailySegmentStart !== null && dailyState) {
        dailyState.elapsedMs += Date.now() - dailySegmentStart;
    }
    dailySegmentStart = null;
}

// Sekme arka plana atılınca süre durur, geri gelince devam eder
document.addEventListener('visibilitychange', () => {
    if (currentMode !== 'daily') return;
    if (document.visibilityState === 'hidden') {
        stopDailyClock();
        saveDailyState();
    } else {
        startDailyClock();
    }
});
window.addEventListener('pagehide', () => {
    if (currentMode !== 'daily') return;
    stopDailyClock();
    saveDailyState();
});

function loadDailyStats() {
    const stats = Object.assign(
        { played: 0, totalCorrect: 0, streak: 0, maxStreak: 0, lastNumber: 0, distribution: [] },
        loadStoredJSON(DAILY_STATS_KEY) || {}
    );
    for (let i = 0; i <= DAILY_QUESTION_COUNT; i++) stats.distribution[i] = stats.distribution[i] || 0;
    return stats;
}

// Seri, art arda oynanan günleri sayar; dün de oynanmadıysa sıfırdır
function getCurrentStreak(stats, today = getDailyNumber()) {
    return stats.lastNumber >= today - 1 ? stats.streak : 0;
}

function recordDailyResult(state) {
    const stats = loadDailyStats();
    if (stats.lastNumber >= state.number) return stats; // Aynı bulmaca iki kez sayılmaz
    const correct = state.answers.filter(a => a.correct).length;
    stats.played++;
    stats.totalCorrect += correct;
    stats.distribution[correct]++;
    stats.streak = stats.lastNumber === state.number - 1 ? stats.streak + 1 : 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.lastNumber = state.number;
    safeSetItem(DAILY_STATS_KEY, JSON.stringify(stats));
    return stats;
}

function dailySquare(answer) {
    if (!answer) return '⬜';
    if (!answer.correct) return '🟥';
    return answer.hint ? '🟨' : '🟩';
}

function formatDuration(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = String(total % 60).padStart(2, '0');
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

function getDailyShareUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    const base = canonical ? canonical.href : `${location.origin}${location.pathname}`;
    return `${base.split('?')[0]}?mod=gunluk`;
}

function buildDailyShareText(state = dailyState) {
    const squares = state.answers.map(dailySquare);
    const correct = state.answers.filter(a => a.correct).length;
    const streak = getCurrentStreak(loadDailyStats(), state.number);
    return [
        `İlçe Bilmece #${state.number} · ${correct}/${DAILY_QUESTION_COUNT}`,
        squares.slice(0, 5).join(''),
        squares.slice(5).join(''),
        `⏱ ${formatDuration(state.elapsedMs)} · 🔥 ${streak} günlük seri`,
        getDailyShareUrl()
    ].join('\n');
}

// Panoya kopyalama: Clipboard API yalnızca HTTPS/localhost'ta çalışır; file:// için eski yöntem
function copyTextFallback(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch (e) {
        ok = false;
    }
    area.remove();
    return ok;
}

function copyDailyResult(text) {
    const done = (ok) => showToast(ok ? 'Sonuç panoya kopyalandı' : 'Kopyalanamadı');
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => done(true)).catch(() => done(copyTextFallback(text)));
    } else {
        done(copyTextFallback(text));
    }
}

// Mobilde telefonun paylaşım menüsü, bilgisayarda panoya kopyalama
function shareDailyResult() {
    if (!dailyState || !dailyState.finished) return;
    const text = buildDailyShareText();
    const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (navigator.share && isTouch) {
        navigator.share({ text }).catch((err) => {
            if (!err || err.name !== 'AbortError') copyDailyResult(text);
        });
    } else {
        copyDailyResult(text);
    }
}

let toastTimer = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

// Kenar çubuğundaki 10 kare (cevaplandıkça renklenir)
function renderDailySquares() {
    const el = document.getElementById('daily-squares');
    if (!el || !dailyState) {
        if (el) el.innerHTML = '';
        return;
    }
    let html = '';
    for (let i = 0; i < DAILY_QUESTION_COUNT; i++) {
        const a = dailyState.answers[i];
        const cls = !a ? (i === dailyState.answers.length && isGameStarted ? 'is-current' : '') : !a.correct ? 'is-wrong' : a.hint ? 'is-hint' : 'is-correct';
        html += `<span class="daily-sq ${cls}"></span>`;
    }
    el.innerHTML = html;
    const correct = dailyState.answers.filter(a => a.correct).length;
    el.setAttribute('aria-label', `${dailyState.answers.length} soru cevaplandı, ${correct} doğru`);
}

// Başlangıç ekranı ve kenar çubuğu Günün Bilmecesi için hazırlanır
function prepareDailyScreen() {
    dailyNumber = getDailyNumber();
    dailyPuzzle = buildDailyPuzzle(dailyNumber);
    dailyState = loadDailyState(dailyNumber);

    const answers = dailyState ? dailyState.answers : [];
    lives = 3; // Günlük modda can kullanılmaz; önceki oyundan 0 kalmışsa akışı bozmasın
    correctCount = answers.filter(a => a.correct).length;
    wrongCount = answers.length - correctCount;
    score = correctCount;
    questionCounter = answers.length;
    mistakesHistory = answers.filter(a => !a.correct).map(a => ({ ilce: a.ilce, correct: a.il, guessed: a.guessed }));
    jokers = dailyState && dailyState.jokers ? { ...dailyState.jokers } : { ...DAILY_JOKERS };
    updateJokerButtons();

    document.getElementById('extra-stat-label').innerText = 'Sonuç';
    document.getElementById('extra-stat-val').innerHTML = '<span class="daily-squares" id="daily-squares" role="img"></span>';
    renderDailySquares();

    const modeName = `Günün Bilmecesi #${dailyNumber}`;
    document.getElementById('mode-active-name').innerText = modeName;
    document.getElementById('mode-active-icon').innerHTML = SVG_ICONS.calendar;
    const mobileModeIconEl = document.getElementById('mobile-mode-icon');
    if (mobileModeIconEl) mobileModeIconEl.innerHTML = SVG_ICONS.calendar;

    const dateText = formatDailyDate(dailyNumber);
    document.getElementById('start-mode-title').innerText = modeName;
    const startDescEl = document.getElementById('start-mode-desc');
    let buttonText = 'Oyuna Başla';
    if (dailyState && dailyState.finished) {
        startDescEl.innerText = `${dateText}\nBugünün bulmacasını tamamladın: ${correctCount}/${DAILY_QUESTION_COUNT} · ⏱ ${formatDuration(dailyState.elapsedMs)}\nYeni bulmaca her gün 00.00'da açılır.`;
        buttonText = 'Sonuçları Gör';
    } else if (answers.length > 0) {
        startDescEl.innerText = `${dateText}\nBugünün bulmacasını yarım bıraktın. Kaldığın yerden devam et!`;
        buttonText = `Devam Et (${answers.length}/${DAILY_QUESTION_COUNT})`;
    } else {
        startDescEl.innerText = `${dateText} · Herkese aynı ${DAILY_QUESTION_COUNT} soru!\nCan yok, tüm soruları cevapla. İpucu jokerini 3 kez kullanabilirsin; ipucuyla bilinen sorular sarı sayılır.`;
    }
    document.querySelector('#start-game-btn span').innerText = buttonText;
}

function startDailyGame() {
    if (dailyState && dailyState.finished) {
        openDailyResults();
        return;
    }
    if (!dailyState) dailyState = createDailyState(dailyNumber);

    // Yarım kalan sorunun ipuçları showQuestion() temizlemeden önce alınır
    const resumeClue = dailyState.clueHtml;
    const resumeClueTypes = dailyState.usedClueTypes || [];
    const resumeHint = dailyState.currentHint;

    isGameStarted = true;
    setJokersEnabled(true);
    questionPool = dailyPuzzle.slice(dailyState.answers.length).reverse(); // pop() sıradakini verir
    questionCounter = dailyState.answers.length;

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    document.getElementById('feedback-area').style.display = '';

    showQuestion();

    if (resumeClue && resumeClue.trim()) {
        const clueBox = document.getElementById('clue-box');
        clueBox.innerHTML = resumeClue;
        clueBox.style.display = 'block';
        usedClueTypesForQuestion = resumeClueTypes;
        dailyState.currentHint = resumeHint;
        saveDailyState();
    }
}

function finishDaily() {
    stopDailyClock();
    isGameStarted = false;
    isWaiting = true;
    dailyState.finished = true;
    dailyState.finishedAt = Date.now();
    saveDailyState();
    recordDailyResult(dailyState);

    const correct = dailyState.answers.filter(a => a.correct).length;
    prepareGame('daily');
    openDailyResults();
    if (correct === DAILY_QUESTION_COUNT) {
        triggerConfetti();
        playFanfare();
    }
}

function openDailyResults() {
    if (!dailyState) return;
    const stats = loadDailyStats();
    const answers = dailyState.answers;
    const correct = answers.filter(a => a.correct).length;

    document.getElementById('daily-modal-title').innerText = `Günün Bilmecesi #${dailyState.number}`;
    document.getElementById('daily-modal-date').innerText = formatDailyDate(dailyState.number);
    document.getElementById('daily-score').innerText = `${correct}/${DAILY_QUESTION_COUNT}`;
    document.getElementById('daily-time').innerText = `⏱ ${formatDuration(dailyState.elapsedMs)}`;

    const squaresEl = document.getElementById('daily-result-squares');
    squaresEl.innerHTML = answers.map(a =>
        `<span class="daily-result-sq ${!a.correct ? 'is-wrong' : a.hint ? 'is-hint' : 'is-correct'}" title="${a.ilce} → ${a.il}"></span>`
    ).join('');
    squaresEl.setAttribute('aria-label', `${correct} doğru, ${answers.filter(a => a.correct && a.hint).length} tanesi ipucuyla, ${answers.length - correct} yanlış`);

    document.getElementById('daily-stat-played').innerText = stats.played;
    document.getElementById('daily-stat-accuracy').innerText = stats.played
        ? `%${Math.round((stats.totalCorrect / (stats.played * DAILY_QUESTION_COUNT)) * 100)}` : '-';
    document.getElementById('daily-stat-streak').innerText = getCurrentStreak(stats, dailyState.number);
    document.getElementById('daily-stat-max').innerText = stats.maxStreak;

    // Skor dağılımı: 0-10 arası sütunlar; bugünkü skor vurgulanır
    const maxCount = Math.max(1, ...stats.distribution);
    let distHtml = '';
    for (let i = 0; i <= DAILY_QUESTION_COUNT; i++) {
        const count = stats.distribution[i] || 0;
        const pct = count ? Math.max(8, (count / maxCount) * 100) : 0;
        distHtml += `<div class="daily-dist-col${i === correct ? ' is-today' : ''}" title="${i} doğru: ${count} gün">
            <span class="daily-dist-count">${count || ''}</span>
            <span class="daily-dist-bar" style="height: ${pct}%"></span>
            <span class="daily-dist-label">${i}</span>
        </div>`;
    }
    document.getElementById('daily-distribution').innerHTML = distHtml;

    const wrongs = answers.filter(a => !a.correct);
    document.getElementById('daily-mistakes').innerHTML = wrongs.length
        ? wrongs.map(a => `<div class="review-item"><span class="review-district">${a.ilce}</span><div class="review-answers"><span class="review-wrong">${a.guessed}</span> ➔ <span class="review-correct">${a.il}</span></div></div>`).join('')
        : '<div style="color: var(--success); text-align: center; padding: 10px;">Hiç yanlış yok, tebrikler!</div>';

    const updateCountdown = () => {
        const modal = document.getElementById('daily-modal');
        if (modal.style.display !== 'flex') {
            clearInterval(dailyCountdownTimer);
            dailyCountdownTimer = null;
            return;
        }
        const ms = msUntilNextDaily();
        const h = Math.floor(ms / 3600000);
        const m = Math.floor((ms % 3600000) / 60000);
        const sec = Math.floor((ms % 60000) / 1000);
        document.getElementById('daily-countdown').innerText =
            [h, m, sec].map(v => String(v).padStart(2, '0')).join(':');
    };
    openModal('daily-modal');
    clearInterval(dailyCountdownTimer);
    updateCountdown();
    dailyCountdownTimer = setInterval(updateCountdown, 1000);
}

document.getElementById('daily-share-btn').onclick = shareDailyResult;
document.getElementById('daily-close-btn').onclick = () => closeModal('daily-modal');

/* ================= 7. SORU GÖSTERME (CLS-FREE) ================= */
function showQuestion() {
    if (currentMode === 'daily' && questionPool.length === 0) {
        finishDaily();
        return;
    }
    if (questionPool.length === 0 || (currentMode !== 'time' && lives <= 0)) {
        endGame(lives <= 0 ? 'Canların Tükendi!' : 'Tüm Soruları Tamamladın!');
        return;
    }

    isWaiting = false;
    isAnswered = false;
    currentQuestion = questionPool.pop();
    questionCounter++;

    // UI Temizliği (Feedback elemanlarını sıfırla)
    document.getElementById('next-btn-container').style.display = 'none';
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('district-info').style.display = 'none';
    document.getElementById('clue-box').style.display = 'none';
    document.getElementById('clue-box').innerHTML = '';
    usedClueTypesForQuestion = [];
    resetMaps();

    updateScoreBoard();

    // Soru metni
    document.getElementById('question').innerHTML = `<span class="district-name">${currentQuestion.ilce}</span> ilçesi hangi ile bağlıdır?`;

    // Seçenekleri hazırla (1 Doğru, 3 Yanlış) - Günün Bilmecesi'nde şıklar bulmacayla birlikte hazırdır
    renderOptions(currentQuestion.options || generateOptions(currentQuestion));

    if (currentMode === 'daily') {
        dailyState.currentHint = false;
        renderDailySquares();
        startDailyClock();
    }

    saveGameSession();
}

/* ================= 8. CEVAP KONTROLÜ (CLS-FREE) ================= */
function checkAnswer(selectedCity, correctCity, ilce, clickedBtn) {
    if (isWaiting || isAnswered) return;
    isWaiting = true;
    isAnswered = true;
    if (currentMode === 'daily') stopDailyClock();

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);

    const resultMessage = document.getElementById('result-message');
    const districtInfoDiv = document.getElementById('district-info');
    const isCorrect = selectedCity === correctCity;

    if (isCorrect) {
        correctCount++;
        score += 1; // 1'ER 1'ER ARTIŞ (KULLANICI İSTEĞİ)
        // Rekor yoksa ilk hedef (10) aşıldığında, varsa önceki rekor aşıldığında kutlanır
        // (Günün Bilmecesi'nde rekor yerine seri ve skor dağılımı tutulur)
        let isFirstRecordCelebration = false;
        if (currentMode !== 'daily') {
            const isNewRecord = score > (gameStartRecord > 0 ? gameStartRecord : FIRST_RECORD_TARGET);
            if (score > record) {
                record = score;
                safeSetItem(getRecordKey(), record);
            }
            isFirstRecordCelebration = isNewRecord && !recordCelebrated;
            if (isFirstRecordCelebration) {
                recordCelebrated = true;
                triggerConfetti();
                playFanfare();
            }
        }
        clickedBtn.classList.add('correct');
        resultMessage.innerHTML = `${SVG_ICONS.checkCircle} <span style="color: var(--success);">Tebrikler! Doğru Cevap.</span>`;
        if (!isFirstRecordCelebration) {
            playCorrectSound();
        }

        // Bilgi kartı kuralı: Doğru cevapta bilgi kartı GÖSTERİLMEZ!
        districtInfoDiv.style.display = 'none';

    } else {
        wrongCount++;
        clickedBtn.classList.add('incorrect');
        playWrongSound();

        // Doğru olanı yeşil göster
        allButtons.forEach(b => {
            if (b.dataset.city === correctCity) {
                b.classList.add('correct');
            }
        });

        resultMessage.innerHTML = `${SVG_ICONS.xCircle} <span style="color: var(--error);">Yanlış Cevap! Doğrusu: <strong>${correctCity}</strong></span>`;

        // Yanlış listesine ekle
        mistakesHistory.push({
            ilce: ilce,
            correct: correctCity,
            guessed: selectedCity
        });

        // Can azaltma (Klasik & Bölgesel Mod; Günün Bilmecesi'nde can yok)
        if (currentMode !== 'time' && currentMode !== 'daily') {
            lives--;
            updateHearts();
        }

        // Bilgi kartı kuralı: SADECE yanlış yanıt verildiğinde ve Zamana Karşı modu DIŞINDA gösterilir!
        if (currentMode !== 'time') {
            showDistrictInfo(correctCity, ilce);
        } else {
            districtInfoDiv.style.display = 'none';
        }
    }

    if (currentMode === 'daily') {
        dailyState.answers.push({ ilce, il: correctCity, guessed: selectedCity, correct: isCorrect, hint: !!dailyState.currentHint });
        dailyState.currentHint = false;
        renderDailySquares();
    }

    updateScoreBoard();
    showAnswerOnMaps(correctCity, isCorrect ? null : selectedCity, ilce);
    saveGameSession(); // Cevaplanmış durum kaydedilir (yenileyip aynı soruyu tekrar cevaplamayı engeller)

    // Geçiş Mantığı:
    if (currentMode === 'time') {
        // Zamana karşı modunda soru otomatik olarak değişir (bilgi kartı kesinlikle kapalı)
        districtInfoDiv.style.display = 'none';
        clearTimeout(autoNextTimeout);
        autoNextTimeout = setTimeout(() => {
            autoNextTimeout = null;
            if (isGameStarted && currentMode === 'time') showQuestion();
        }, 600);
    } else {
        // Klasik ve Bölgesel modda: Sonraki soru butonu yanıt şıklarının HEMEN ALTINDA görünür!
        const nextBtn = document.getElementById('next-btn');
        if (currentMode === 'daily' && questionPool.length === 0) {
            // Son soru: buton sonuç ekranını açar
            if (nextBtn) {
                nextBtn.innerHTML = `<span>Sonuçları Gör</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>`;
                nextBtn.classList.remove('game-over-btn');
            }
            document.getElementById('next-btn-container').style.display = 'block';
        } else if (lives > 0) {
            if (nextBtn) {
                nextBtn.innerHTML = `<span>Sonraki Soru</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>`;
                nextBtn.classList.remove('game-over-btn');
            }
            document.getElementById('next-btn-container').style.display = 'block';
        } else {
            // Canlar bittiğinde hemen oyun sonu açılmasın; buton "Oyunu Bitir" haline gelsin
            clearGameSession();
            if (nextBtn) {
                nextBtn.innerHTML = `<span>Oyunu Bitir</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>`;
                nextBtn.classList.add('game-over-btn');
            }
            document.getElementById('next-btn-container').style.display = 'block';
        }
    }
}

function showDistrictInfo(city, district) {
    const districtInfoDiv = document.getElementById('district-info');
    const meta = ilEkstraBilgiler[city];
    let infoText = `<p class="info-card-district"><strong>${district}</strong> ilçesi, ${city} iline bağlıdır.`;

    if (ilceBilgileri && ilceBilgileri[city] && ilceBilgileri[city][district]) {
        infoText += ` ${ilceBilgileri[city][district]}</p>`;
    }
    if (meta) {
        infoText += `<p><strong>${city}</strong> ise, ${meta.bolge} Bölgesi'nde yer alır ve ${meta.plaka} plaka numarasına sahiptir. ${meta.lezzet} ile tanınır. Ayrıca ${meta.unluler} bu kentten çıkan önemli isimlerdir. ${meta.mekan} ile ${meta.onemliYerler} kentin önemli mekanlarıdır. ${meta.cografya} gibi önemli coğrafi değerlere sahiptir. ${meta.ekonomi} ise kentin ekonomik gücünü oluşturur.</p>`;
    }

    districtInfoDiv.innerHTML = `
        <div class="info-card-header">
            ${SVG_ICONS.infoBook}
            <span>Bilgi Notu:</span>
        </div>
        <div>${infoText}</div>
    `;
    districtInfoDiv.style.display = 'block';
}

/* ================= 9. JOKERLER (GELİŞMİŞ GÖRSEL) ================= */
// 1. %50 Yarı Yarıya (Tek Kullanımlık)
document.getElementById('joker-fifty').onclick = function () {
    if (isWaiting || jokers.fifty <= 0 || !currentQuestion || !isGameStarted) return;
    jokers.fifty--;
    updateJokerButtons();

    const buttons = Array.from(document.querySelectorAll('.option-btn'));
    const wrongButtons = buttons.filter(b => {
        const city = b.dataset.city || b.querySelector('.opt-city-name')?.innerText || b.innerText.trim();
        return city !== currentQuestion.il;
    });

    // 2 yanlış şıkkı kapat
    shuffleArray(wrongButtons);
    wrongButtons.slice(0, 2).forEach(btn => {
        btn.classList.add('fifty-disabled');
        btn.disabled = true;
    });

    saveGameSession(); // Joker kullanımı kaydedilir (yenileyerek jokeri geri almayı engeller)
};

// 2. İpucu Jokeri (Zenginleştirilmiş & Spoiler İçermeyen İpuçları)
document.getElementById('joker-hint').onclick = function () {
    if (isWaiting || jokers.hint <= 0 || !currentQuestion || !isGameStarted) return;
    jokers.hint--;
    updateJokerButtons();
    if (currentMode === 'daily' && dailyState) dailyState.currentHint = true; // Paylaşımda 🟨

    const meta = ilEkstraBilgiler[currentQuestion.il];
    const clueBox = document.getElementById('clue-box');

    if (!meta) {
        clueBox.innerHTML = `
            <div class="clue-content">
                <span class="clue-icon">${SVG_ICONS.compass}</span>
                <div><strong>İpucu:</strong> Bu il Türkiye'nin köklü şehirlerindendir.</div>
            </div>
        `;
        clueBox.style.display = 'block';
        saveGameSession();
        return;
    }

    const availableClues = [];

    // 1. Ünlü Kişiler (Şarkıcı, Politikacı, Oyuncu, Yazar vb.)
    if (meta.unluler) {
        availableClues.push({
            type: 'unluler',
            icon: SVG_ICONS.user,
            title: 'Tanınmış İsimler',
            desc: `<strong>${meta.unluler}</strong> bu ilden çıkmış önemli isimlerdir.`
        });
    }

    // 2. Coğrafi Özellikler (Dağ, Akarsu, Göl, Ova vb.)
    if (meta.cografya) {
        availableClues.push({
            type: 'cografya',
            icon: SVG_ICONS.mountain,
            title: 'Önemli Coğrafi Değerler',
            desc: `<strong>${meta.cografya}</strong> öne çıkan coğrafi değerlerdir.`
        });
    }

    // 3. Ekonomi, Madenler, Tarım ve Sanayi
    if (meta.ekonomi) {
        availableClues.push({
            type: 'ekonomi',
            icon: SVG_ICONS.factory,
            title: 'Maden, Tarım ve Sanayi',
            desc: `<strong>${meta.ekonomi}</strong> kentin ekonomik yapısını oluşturur.`
        });
    }

    // 4. Önemli Yerler (Deniz, Plaj, Sınır Kapısı, Havalimanı, Üniversite vb.)
    if (meta.onemliYerler) {
        availableClues.push({
            type: 'onemliYerler',
            icon: SVG_ICONS.star,
            title: 'Önemli Noktalar & Tesisler',
            desc: `<strong>${meta.onemliYerler}</strong> bu ilde bulunan önemli yerlerdir.`
        });
    }

    // 5. Meşhur Lezzet
    if (meta.lezzet) {
        availableClues.push({
            type: 'lezzet',
            icon: SVG_ICONS.food,
            title: 'Meşhur Lezzet',
            desc: `<strong>${meta.lezzet}</strong> bu ilin meşhur ürünleridir.`
        });
    }

    // 6. Tarihi ve Turistik Mekan
    if (meta.mekan) {
        availableClues.push({
            type: 'mekan',
            icon: SVG_ICONS.landmark,
            title: 'Tarihi / Turistik Mekan',
            desc: `<strong>${meta.mekan}</strong> bu ilde yer alır.`
        });
    }

    // 7. Plaka Kodu
    if (meta.plaka) {
        availableClues.push({
            type: 'plaka',
            icon: SVG_ICONS.car,
            title: 'Plaka Kodu',
            desc: `Bu ilin plaka kodu <strong>${meta.plaka}</strong>'${plakaEki(meta.plaka)}.`
        });
    }

    // 8. Coğrafi Bölge
    if (meta.bolge && (currentMode !== 'regional' || selectedRegion === 'all')) {
        availableClues.push({
            type: 'bolge',
            icon: SVG_ICONS.compass,
            title: 'Coğrafi Bölge',
            desc: `Bu il <strong>${meta.bolge} Bölgesi</strong>'ndedir.`
        });
    }

    // 9. Komşu İller
    if (meta.komsular && meta.komsular.length) {
        availableClues.push({
            type: 'komsular',
            icon: SVG_ICONS.pin,
            title: 'Komşu İller',
            desc: `<strong>${shuffleArray([...meta.komsular]).slice(0, 3).join('</strong>, <strong>').replace(/, ([^,]*)$/, ' ve $1')}</strong> bu ilin komşu illerindendir.`
        });
    }

    // Henüz gösterilmemiş ipucu türlerini filtrele
    let unshownClues = availableClues.filter(c => !usedClueTypesForQuestion.includes(c.type));
    if (unshownClues.length === 0) {
        unshownClues = availableClues;
    }

    const chosen = unshownClues[Math.floor(Math.random() * unshownClues.length)];
    usedClueTypesForQuestion.push(chosen.type);

    const isFirst = clueBox.innerHTML.trim() === '';
    const clueHtml = `
        <div class="clue-content" style="${!isFirst ? 'margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(245, 158, 11, 0.35);' : ''}">
            <span class="clue-icon">${chosen.icon}</span>
            <div>${chosen.desc}</div>
        </div>
    `;

    if (isFirst) {
        clueBox.innerHTML = clueHtml;
    } else {
        clueBox.innerHTML += clueHtml;
    }
    clueBox.style.display = 'block';

    saveGameSession(); // Joker kullanımı ve gösterilen ipucu kaydedilir
};

// Plaka numarasına ses uyumuna uygun "-dir" eki getirir (ör. 06'dır, 34'tür, 10'dur)
function plakaEki(plaka) {
    const n = parseInt(plaka, 10);
    const birler = ['', 'dir', 'dir', 'tür', 'tür', 'tir', 'dır', 'dir', 'dir', 'dur'];
    const onlar = ['', 'dur', 'dir', 'dur', 'tır', 'dir', 'tır', 'tir', 'dir', 'dur'];
    if (!Number.isFinite(n) || n <= 0) return 'dir';
    return n % 10 !== 0 ? birler[n % 10] : onlar[Math.floor(n / 10) % 10];
}

// 3. Pas Geç (Cansız Yeni Soru)
document.getElementById('joker-skip').onclick = function () {
    if (isWaiting || jokers.skip <= 0 || !currentQuestion || !isGameStarted) return;
    jokers.skip--;
    updateJokerButtons();
    showQuestion();
};

function updateJokerButtons() {
    const fiftyBtn = document.getElementById('joker-fifty');
    const hintBtn = document.getElementById('joker-hint');
    const skipBtn = document.getElementById('joker-skip');

    renderJokerDots('fifty-badge', jokers.fifty, JOKER_MAX.fifty);
    renderJokerDots('hint-badge', jokers.hint, JOKER_MAX.hint);
    renderJokerDots('skip-badge', jokers.skip, JOKER_MAX.skip);

    fiftyBtn.disabled = jokers.fifty <= 0;
    hintBtn.disabled = jokers.hint <= 0;
    skipBtn.disabled = jokers.skip <= 0;
}

// Kalan joker hakkını dolu (kalan) ve boş (kullanılmış) noktalarla gösterir
function renderJokerDots(id, remaining, max) {
    const el = document.getElementById(id);
    if (!el) return;
    let html = '';
    for (let i = 0; i < max; i++) {
        html += `<span class="joker-dot${i < remaining ? '' : ' used'}"></span>`;
    }
    el.innerHTML = html;
    el.setAttribute('aria-label', `Kalan hak: ${remaining}`);
}

/* ================= 10. UI GÜNCELLEMELERİ ================= */
function updateScoreBoard() {
    document.getElementById('score').innerText = score;
    // Günün Bilmecesi'nde "Rekor" yerine günlük seri gösterilir
    const isDaily = currentMode === 'daily';
    document.getElementById('record-label').innerText = isDaily ? 'Seri' : 'Rekor';
    document.getElementById('record').innerText = isDaily ? getCurrentStreak(loadDailyStats(), dailyNumber || getDailyNumber()) : record;
    document.getElementById('progress-text').innerText = `${questionCounter}/${totalAvailableQuestions()}`;

    updateRecordProgressBar();
}

function updateRecordProgressBar() {
    const bar = document.getElementById('progress-bar');
    const marker = document.getElementById('record-marker');
    const markerBadge = document.getElementById('record-marker-badge');
    const statusIcon = document.getElementById('record-icon');
    const targetText = document.getElementById('record-target-text');
    const statusDetail = document.getElementById('record-progress-status');

    if (!bar || !marker) return;

    const prevRecord = gameStartRecord; // Bu oyuna başlandığındaki mevcut rekor

    if (prevRecord <= 0) {
        // Henüz hiç rekor yoksa (ilk oyun deneyimi)
        const baseTarget = FIRST_RECORD_TARGET;
        if (score < baseTarget) {
            const pct = (score / baseTarget) * 100;
            bar.style.width = `${pct}%`;
            bar.classList.remove('new-record-active');
            marker.style.display = 'none';
            if (statusIcon) statusIcon.innerHTML = SVG_ICONS.target;
            if (targetText) targetText.innerText = `${baseTarget} (İlk Rekor Hedefi)`;
            if (statusDetail) statusDetail.innerText = `${score} / ${baseTarget} (%${Math.round(pct)})`;
        } else if (score === baseTarget) {
            bar.style.width = '100%';
            bar.classList.remove('new-record-active');
            marker.style.display = 'none';
            if (statusIcon) statusIcon.innerHTML = SVG_ICONS.target;
            if (targetText) targetText.innerText = `${baseTarget} (Hedefe Ulaşıldı!)`;
            if (statusDetail) statusDetail.innerText = `${score} / ${baseTarget} (%100)`;
        } else {
            // İlk hedef 10 puan aşıldı -> Yeni rekor modu
            bar.style.width = '100%';
            bar.classList.add('new-record-active');
            const markerPct = Math.max(4, Math.min(96, (baseTarget / score) * 100));
            marker.style.display = 'block';
            marker.style.left = `${markerPct}%`;
            if (markerBadge) markerBadge.innerText = `İlk Hedef: ${baseTarget}`;
            if (statusIcon) statusIcon.innerText = '🔥';
            if (targetText) targetText.innerText = `YENİ REKOR! (${score})`;
            if (statusDetail) statusDetail.innerText = `+${score - baseTarget} puan önde`;
        }
    } else {
        // Mevcut rekor var
        if (score < prevRecord) {
            // Rekora ulaşılmaya çalışılıyor
            const pct = Math.min(100, (score / prevRecord) * 100);
            bar.style.width = `${pct}%`;
            bar.classList.remove('new-record-active');
            marker.style.display = 'none';
            if (statusIcon) statusIcon.innerHTML = SVG_ICONS.target;
            if (targetText) targetText.innerText = prevRecord;
            if (statusDetail) statusDetail.innerText = `${score} / ${prevRecord} (%${Math.round(pct)})`;
        } else if (score === prevRecord) {
            // Rekora ulaşıldı
            bar.style.width = '100%';
            bar.classList.remove('new-record-active');
            marker.style.display = 'none';
            if (statusIcon) statusIcon.innerHTML = SVG_ICONS.target;
            if (targetText) targetText.innerText = `${prevRecord} (Rekora Ulaşıldı!)`;
            if (statusDetail) statusDetail.innerText = `${score} / ${prevRecord} (%100)`;
        } else {
            // REKOR GEÇİLDİ!
            // Bar tamamen dolmuş olsun
            // Önceki rekor bara oranla gerilesin (prevRecord / score * 100%)
            bar.style.width = '100%';
            bar.classList.add('new-record-active');
            const markerPct = Math.max(3, Math.min(97, (prevRecord / score) * 100));
            marker.style.display = 'block';
            marker.style.left = `${markerPct}%`;
            if (markerBadge) markerBadge.innerText = `Önceki: ${prevRecord}`;
            if (statusIcon) statusIcon.innerText = '🔥';
            if (targetText) targetText.innerText = `YENİ REKOR! (${score})`;
            if (statusDetail) statusDetail.innerText = `+${score - prevRecord} fark`;
        }
    }
}

function totalAvailableQuestions() {
    if (currentMode === 'daily') return DAILY_QUESTION_COUNT;
    if (currentMode === 'regional' && selectedRegion !== 'all') {
        return ilceler.reduce((acc, il) => {
            const meta = ilEkstraBilgiler[il.il];
            return (meta && meta.bolge === selectedRegion) ? acc + il.ilce.length : acc;
        }, 0);
    }
    // Toplam ilçe sayısı veri setinden dinamik olarak hesaplanır (sabit değer kullanılmaz)
    return ilceler.reduce((acc, il) => acc + il.ilce.length, 0);
}

function updateHearts() {
    const heartsDisplay = document.getElementById('hearts-display');
    if (!heartsDisplay) return;
    let html = '';
    for (let i = 0; i < 3; i++) {
        html += (i < lives) ? SVG_ICONS.heartFilled : SVG_ICONS.heartEmpty;
    }
    heartsDisplay.innerHTML = html;
}

// Sonraki Soru / Oyunu Bitir Butonu Tıklaması
document.getElementById('next-btn').onclick = function () {
    if (currentMode !== 'time' && lives <= 0) {
        // Oyunu Bitir butonuna basıldığında feedback-area'yı gizle
        document.getElementById('feedback-area').style.display = 'none';
        endGame('Canların Tükendi!');
    } else {
        showQuestion();
    }
};

/* ================= 11. OYUN BİTİŞİ & ÖZET ================= */
function endGame(reason = 'Oyun Bitti!') {
    clearInterval(timerInterval);
    clearTimeout(autoNextTimeout);
    timerEndTime = null;
    isWaiting = true;
    isGameStarted = false;
    clearGameSession(); // Oyun bittiğinde aktif oturumu temizle

    // Başlangıç ekranındaki devam et butonunu ve durumunu gizle
    const resumeContainer = document.getElementById('resume-container');
    if (resumeContainer) {
        resumeContainer.style.display = 'none';
    }

    document.getElementById('gameover-title').innerText = reason;
    document.getElementById('final-correct').innerText = correctCount;
    document.getElementById('final-wrong').innerText = wrongCount;

    const totalAnswered = correctCount + wrongCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    document.getElementById('final-accuracy').innerText = `${accuracy}%`;

    // Yanlış cevaplar listesi
    const mistakesList = document.getElementById('mistakes-list');
    if (mistakesHistory.length === 0) {
        mistakesList.innerHTML = `<div style="color: var(--success); text-align: center; padding: 16px;">Tebrikler! Hiç yanlış yapmadınız!</div>`;
    } else {
        mistakesList.innerHTML = mistakesHistory.map(m => `
            <div class="review-item">
                <span class="review-district">${m.ilce}</span>
                <div class="review-answers">
                    <span class="review-wrong">${m.guessed}</span>
                    ➔ <span class="review-correct">${m.correct}</span>
                </div>
            </div>
        `).join('');
    }

    openModal('gameover-modal');
}

document.getElementById('restart-btn').onclick = function () {
    closeModal('gameover-modal');
    prepareGame(currentMode, selectedRegion);
};

/* ================= 12. MODALLAR VE ETKİLEŞİM ================= */
// Modal açılmadan önce odakta olan öğe (modal kapanınca odak ona geri verilir)
let lastFocusedBeforeModal = null;
const FOCUSABLE_SELECTOR = 'button:not([disabled]), [role="button"][tabindex="0"]:not([aria-disabled="true"]), a[href], input, select, textarea';

function getOpenModal() {
    return Array.from(document.querySelectorAll('.modal-overlay')).find(m => m.style.display === 'flex') || null;
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!getOpenModal()) lastFocusedBeforeModal = document.activeElement;
    modal.style.display = 'flex';
    modal.scrollTop = 0;
    // Odak, uzun pencerelerde alttaki butona kaydırıp üst içeriği gizlemesin
    const firstFocusable = modal.querySelector(FOCUSABLE_SELECTOR);
    if (firstFocusable) firstFocusable.focus({ preventScroll: true });
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal.style.display !== 'flex') return;
    modal.style.display = 'none';
    // Başka modal açılmadıysa odağı modal öncesindeki öğeye geri ver
    if (!getOpenModal() && lastFocusedBeforeModal && document.contains(lastFocusedBeforeModal)) {
        lastFocusedBeforeModal.focus();
        lastFocusedBeforeModal = null;
    }
}

// Açık modal içinde Tab ile odak döngüsü (odak modal dışına kaçmaz)
function trapModalFocus(e, modal) {
    const focusables = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) {
        e.preventDefault();
        return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!modal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

// Enter/Space tuşuna odaktaki bir buton zaten tepki veriyorsa genel kısayol devreye girmemeli
function isInteractiveTarget(target) {
    const el = target && target.closest && target.closest('button, a[href], input, select, textarea, [role="button"]');
    return !!el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
}

function changeModeFromGameOver() {
    closeModal('gameover-modal');
    openModal('mode-modal');
}

// Belirgin mod seçici barına tıklama + klavye desteği (Enter / Space)
const modeSelectorBar = document.getElementById('mode-selector-btn');
modeSelectorBar.onclick = () => openModal('mode-modal');
modeSelectorBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        openModal('mode-modal');
    }
});

// Mod kartları: Fare tıklaması ve klavye (Enter/Space) desteği
document.querySelectorAll('.mode-card:not(.disabled)').forEach(card => {
    const selectMode = () => {
        const mode = card.dataset.mode;
        closeModal('mode-modal');
        if (mode === 'regional') {
            openModal('region-modal');
        } else {
            prepareGame(mode);
        }
    };

    card.onclick = selectMode;
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            selectMode();
        }
    });
});

// Bölge seçimi butonları
document.querySelectorAll('.region-btn').forEach(btn => {
    btn.onclick = function () {
        const region = this.dataset.region;
        closeModal('region-modal');
        prepareGame('regional', region);
    };
});

// Modal ve mobil menü kapatma için ESC tuşu desteği
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal('mode-modal');
        closeModal('region-modal');
        closeModal('shortcuts-modal');
        closeModal('daily-modal');
        closeMobileDrawer();
    }
});

/* ================= 12b. OYNANIŞ KLAVYE KISAYOLLARI ================= */
// 1-4 tuşları: Şıkları seçer
// Enter / Space: Sonraki soruya geçer, oyunu başlatır veya tekrar oynatır
// M: Oyun modu seçim modalını açar (veya açıksa kapatır)
// ?: Klavye kısayolları penceresini açar (veya açıksa kapatır)
// Tab: Standart odak gezintisi (açık modal içinde odak döngüsü)
// 1-4 tuşları (Mod modalında): Oyun modunu seçer
// 1-8 tuşları (Bölge modalında): Coğrafi bölgeyi seçer
window.addEventListener('keydown', (e) => {
    const modeModal = document.getElementById('mode-modal');
    const regionModal = document.getElementById('region-modal');
    const gameoverModal = document.getElementById('gameover-modal');
    const shortcutsModal = document.getElementById('shortcuts-modal');
    const isActivationKey = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';
    const isModeKey = e.key === 'm' || e.key === 'M';

    // Açık modalda Tab ile odak modal içinde döner
    const openModalEl = getOpenModal();
    if (openModalEl && e.key === 'Tab') {
        trapModalFocus(e, openModalEl);
        return;
    }

    // Tarayıcı / sistem kısayollarına (Ctrl+W, Cmd+Q vb.) karışma
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Günün Bilmecesi sonuç penceresi: butonlar kendi tuşlarıyla çalışır (Esc ayrıca kapatır)
    if (openModalEl && openModalEl.id === 'daily-modal') return;

    // 0) Kısayollar penceresi: ? ile açılır / kapanır, açıkken diğer kısayollar çalışmaz
    if (shortcutsModal && shortcutsModal.style.display === 'flex') {
        if (e.key === '?') {
            e.preventDefault();
            closeModal('shortcuts-modal');
        }
        return;
    }
    if (e.key === '?' && !openModalEl) {
        e.preventDefault();
        openShortcutsModal();
        return;
    }

    // 1) Oyun Bitti Modalında Enter veya Space -> Tekrar Oyna (odakta başka bir buton yoksa)
    if (gameoverModal && gameoverModal.style.display === 'flex') {
        if (isActivationKey && !isInteractiveTarget(e.target)) {
            e.preventDefault();
            document.getElementById('restart-btn').click();
        }
        return;
    }

    // 2) Oyun Modu Seçimi Modalında 1-4 tuşları ile mod seçimi
    if (modeModal && modeModal.style.display === 'flex') {
        if (['1', '2', '3', '4'].includes(e.key)) {
            e.preventDefault();
            const activeCards = document.querySelectorAll('.mode-card:not(.disabled)');
            const idx = parseInt(e.key, 10) - 1;
            if (activeCards && activeCards[idx]) {
                activeCards[idx].click();
            }
            return;
        }
        // M tuşuna tekrar basılırsa mod modalını kapat
        if (isModeKey) {
            e.preventDefault();
            closeModal('mode-modal');
        }
        return;
    }

    // 3) Bölge Seçimi Modalında 1-8 tuşları ile bölge seçimi
    if (regionModal && regionModal.style.display === 'flex') {
        if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
            e.preventDefault();
            const regionButtons = document.querySelectorAll('.region-grid .region-btn');
            const idx = parseInt(e.key, 10) - 1;
            if (regionButtons && regionButtons[idx]) {
                regionButtons[idx].click();
            }
        }
        return;
    }

    // 4) M tuşuna basıldığında Mod Seçim Ekranını aç
    if (isModeKey) {
        e.preventDefault();
        openModal('mode-modal');
        return;
    }

    // 5) Başla ekranındayken Enter veya Space ile oyunu başlat veya devam et
    // (odakta bir buton varsa tarayıcının kendi davranışı korunur)
    const startScreen = document.getElementById('start-screen');
    if (startScreen && startScreen.style.display !== 'none') {
        if (isActivationKey && !isInteractiveTarget(e.target)) {
            e.preventDefault();
            const resumeContainer = document.getElementById('resume-container');
            const resumeBtn = document.getElementById('resume-game-btn');
            if (resumeContainer && resumeContainer.style.display !== 'none' && resumeBtn) {
                resumeBtn.click();
            } else {
                document.getElementById('start-game-btn').click();
            }
        }
        return;
    }

    // 6) Soru yanıtlanırken: 1-4 tuşları (şıklar) ve Q, W, E tuşları (jokerler)
    if (isGameStarted && !isWaiting) {
        if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            const buttons = document.querySelectorAll('#options .option-btn');
            if (buttons && buttons[idx] && !buttons[idx].disabled && !buttons[idx].classList.contains('fifty-disabled')) {
                e.preventDefault();
                buttons[idx].click();
            }
        } else {
            const keyLower = e.key.toLowerCase();
            if (keyLower === 'q') {
                const fiftyBtn = document.getElementById('joker-fifty');
                if (fiftyBtn && !fiftyBtn.disabled && jokers.fifty > 0) {
                    e.preventDefault();
                    fiftyBtn.click();
                }
            } else if (keyLower === 'w') {
                const hintBtn = document.getElementById('joker-hint');
                if (hintBtn && !hintBtn.disabled && jokers.hint > 0) {
                    e.preventDefault();
                    hintBtn.click();
                }
            } else if (keyLower === 'e') {
                const skipBtn = document.getElementById('joker-skip');
                if (skipBtn && !skipBtn.disabled && jokers.skip > 0) {
                    e.preventDefault();
                    skipBtn.click();
                }
            }
        }
    } else if (isGameStarted && isWaiting) {
        // Cevap verilmiş ve Sonraki Soru / Oyunu Bitir butonu ekrandaysa Enter veya Space ile geç
        if (isActivationKey && !isInteractiveTarget(e.target)) {
            const nextContainer = document.getElementById('next-btn-container');
            if (nextContainer && nextContainer.style.display !== 'none') {
                e.preventDefault();
                document.getElementById('next-btn').click();
            }
        }
    }
});

/* ================= 13. TEMA, SES VE HAREKET AYARLARI ================= */
// Tema Değiştirme
const themeBtn = document.getElementById('theme-btn');
const mobileThemeBtn = document.getElementById('mobile-theme-btn');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');

function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = theme === 'dark' ? SVG_ICONS.moon : SVG_ICONS.sun;
    if (themeBtn) themeBtn.innerHTML = icon;
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = icon;
}

const savedTheme = safeGetItem('ilce_theme', 'light');
updateThemeUI(savedTheme);

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    safeSetItem('ilce_theme', next);
    updateThemeUI(next);
}

if (themeBtn) themeBtn.onclick = toggleTheme;
if (mobileThemeBtn) mobileThemeBtn.onclick = toggleTheme;

// Ses Aç/Kapat
const soundBtn = document.getElementById('sound-btn');
const mobileSoundBtn = document.getElementById('mobile-sound-btn');
const mobileSoundIcon = document.getElementById('mobile-sound-icon');

function updateSoundUI(muted) {
    const icon = muted ? SVG_ICONS.soundOff : SVG_ICONS.soundOn;
    if (soundBtn) {
        soundBtn.innerHTML = icon;
        soundBtn.setAttribute('aria-pressed', String(muted));
    }
    if (mobileSoundIcon) mobileSoundIcon.innerHTML = icon;
}

updateSoundUI(isMuted);

function toggleSound() {
    isMuted = !isMuted;
    safeSetItem('ilce_bilmece_muted', isMuted);
    updateSoundUI(isMuted);
    if (!isMuted) initAudio();
}

if (soundBtn) soundBtn.onclick = toggleSound;
if (mobileSoundBtn) mobileSoundBtn.onclick = toggleSound;

// Hareket Efektleri Aç/Kapat (animasyonlar, konfeti, sarsılma)
const motionBtn = document.getElementById('motion-btn');
const mobileMotionBtn = document.getElementById('mobile-motion-btn');
const mobileMotionIcon = document.getElementById('mobile-motion-icon');
const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedMotion = safeGetItem('ilce_motion');
let motionOff = savedMotion === null ? prefersReducedMotion : savedMotion === 'off';

function applyMotionPreference() {
    document.documentElement.setAttribute('data-motion', motionOff ? 'off' : 'on');
    const icon = motionOff ? SVG_ICONS.motionOff : SVG_ICONS.motionOn;
    if (motionBtn) {
        motionBtn.innerHTML = icon;
        motionBtn.setAttribute('aria-pressed', String(motionOff));
    }
    if (mobileMotionIcon) mobileMotionIcon.innerHTML = icon;
}

function toggleMotion() {
    motionOff = !motionOff;
    safeSetItem('ilce_motion', motionOff ? 'off' : 'on');
    applyMotionPreference();
}

if (motionBtn) motionBtn.onclick = toggleMotion;
if (mobileMotionBtn) mobileMotionBtn.onclick = toggleMotion;

applyMotionPreference();

// Mobil Sağ Açılır Menü Kontrolü
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
const mobileDrawerClose = document.getElementById('mobile-drawer-close');

function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
}

if (mobileMenuToggle) mobileMenuToggle.onclick = openMobileDrawer;
if (mobileDrawerClose) mobileDrawerClose.onclick = closeMobileDrawer;
if (mobileDrawerBackdrop) mobileDrawerBackdrop.onclick = closeMobileDrawer;

// Klavye Kısayolları penceresi (başlık butonu ve mobil menü)
function openShortcutsModal() {
    closeMobileDrawer();
    openModal('shortcuts-modal');
}

const shortcutsBtn = document.getElementById('shortcuts-btn');
const mobileShortcutsBtn = document.getElementById('mobile-shortcuts-btn');
if (shortcutsBtn) shortcutsBtn.onclick = openShortcutsModal;
if (mobileShortcutsBtn) mobileShortcutsBtn.onclick = openShortcutsModal;

// Mobil Sol Bar: Oyun Modu Değiştirme Butonu
const mobileModeStatBtn = document.getElementById('mobile-mode-stat-btn');
if (mobileModeStatBtn) {
    mobileModeStatBtn.onclick = () => openModal('mode-modal');
}

/* ================= 14. CANVAS KONFETİ ================= */
function triggerConfetti() {
    // Hareket tercihi kapalıysa veya sistemde reduced-motion aktifse konfeti çalıştırılmaz
    const sysReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionOff || sysReducedMotion) return;
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'];

    for (let i = 0; i < 70; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: Math.random() * 6 + 3,
            d: Math.random() * 70,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleInc: Math.random() * 0.07 + 0.05,
            tiltAngle: 0,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12 - 3
        });
    }

    let animationFrame;
    let ticks = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();

            p.tiltAngle += p.tiltAngleInc;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;
            p.tilt = Math.sin(p.tiltAngle) * 12;
        });

        ticks++;
        if (ticks < 120) {
            animationFrame = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }

    draw();
}

/* ================= 15. HARİTALAR ================= */
// İller haritası açılışta yüklenir; ilçe haritası yalnızca cevap verildiğinde indirilir
// (soru gösterilirken indirmek, ağ isteğinde doğru cevabı ele verirdi).
// Haritalar fetch yerine <script> ile yüklenir: fetch, sayfa doğrudan dosyadan (file://)
// açıldığında tarayıcı tarafından engellenir. Her harita dosyası SVG'yi
// window.ilceBilmeceMaps[anahtar] olarak kaydeder.
const MAP_PANEL_GAP = 24;         // Oyun alanı ile panel arasındaki boşluk
const MAP_PANEL_MIN_WIDTH = 300;  // Sağda bundan dar alan kalırsa panel bilgi notunun altına iner
const MAP_PANEL_MAX_WIDTH = 540;
const MAP_PAGE_MARGIN = 16;

const mapPanel = document.getElementById('map-panel');
const provinceMapEl = document.getElementById('province-map');
const districtMapEl = document.getElementById('district-map');
const mapScriptRequests = {};
const DISTRICT_PLACEHOLDER = '<p class="map-placeholder">Yanıt verince doğru ilin ilçe haritası burada görünecek.</p>';
let mapAnswer = null; // { correct, guessed, ilce } - cevaptan sonra, sonraki soruya kadar dolu
let isMapSideLayout = false;

function getPlaka(il) {
    return ilEkstraBilgiler[il] ? ilEkstraBilgiler[il].plaka : null;
}

function escapeAttr(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Harita dosyasını <script> ile yükler; aynı harita için tek istek yapılır
function loadMapScript(key, src) {
    const maps = window.ilceBilmeceMaps || {};
    if (maps[key]) return Promise.resolve(maps[key]);
    if (!mapScriptRequests[key]) {
        mapScriptRequests[key] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => {
                const svg = (window.ilceBilmeceMaps || {})[key];
                svg ? resolve(svg) : reject(new Error(`Harita bulunamadı: ${key}`));
            };
            script.onerror = () => reject(new Error(`Harita yüklenemedi: ${src}`));
            document.head.appendChild(script);
        }).catch(err => {
            // Başarısız istek önbellekte kalmasın; sonraki denemede tekrar yüklensin
            delete mapScriptRequests[key];
            document.querySelectorAll(`script[src="${src}"]`).forEach(el => el.remove());
            throw err;
        });
    }
    return mapScriptRequests[key];
}

function loadProvinceMap() {
    loadMapScript('iller', 'maps/iller.js')
        .then(svg => {
            provinceMapEl.innerHTML = svg;
            applyProvinceHighlight();
        })
        .catch(() => {
            provinceMapEl.innerHTML = '<p class="map-placeholder">Harita yüklenemedi.</p>';
        });
}

function applyProvinceHighlight() {
    provinceMapEl.querySelectorAll('path.is-correct, path.is-wrong').forEach(p => p.classList.remove('is-correct', 'is-wrong'));
    const legend = document.getElementById('province-map-legend');
    if (!mapAnswer) {
        legend.innerHTML = '';
        provinceMapEl.setAttribute('aria-label', 'Türkiye illeri haritası');
        return;
    }
    const mark = (il, cls) => {
        const path = provinceMapEl.querySelector(`path[data-plaka="${getPlaka(il)}"]`);
        if (path) path.classList.add(cls);
    };
    mark(mapAnswer.correct, 'is-correct');
    let legendHtml = `<span class="map-legend-item"><span class="map-legend-dot correct"></span>${mapAnswer.correct}</span>`;
    let label = `Türkiye illeri haritası. Doğru il: ${mapAnswer.correct}`;
    if (mapAnswer.guessed) {
        mark(mapAnswer.guessed, 'is-wrong');
        legendHtml += `<span class="map-legend-item"><span class="map-legend-dot wrong"></span>${mapAnswer.guessed}</span>`;
        label += `. Senin seçimin: ${mapAnswer.guessed}`;
    }
    legend.innerHTML = legendHtml;
    provinceMapEl.setAttribute('aria-label', label);
}

function renderDistrictMap() {
    const title = document.getElementById('district-map-title');
    const legend = document.getElementById('district-map-legend');
    if (!mapAnswer) {
        title.innerText = 'İlçe Haritası';
        legend.innerHTML = '';
        districtMapEl.innerHTML = DISTRICT_PLACEHOLDER;
        districtMapEl.setAttribute('aria-label', 'İlçe haritası');
        return;
    }
    const { correct, ilce } = mapAnswer;
    const plaka = getPlaka(correct);
    title.innerText = `${correct} Haritası`;
    legend.innerHTML = `<span class="map-legend-item"><span class="map-legend-dot correct"></span>${ilce}</span>`;
    districtMapEl.setAttribute('aria-label', `${correct} ilçe haritası. Vurgulanan ilçe: ${ilce}`);

    const draw = (svg) => {
        // Bu arada başka bir soruya geçildiyse eski haritayı çizme
        if (!mapAnswer || mapAnswer.correct !== correct || mapAnswer.ilce !== ilce) return;
        districtMapEl.innerHTML = svg;
        const path = districtMapEl.querySelector(`path[data-ilce="${escapeAttr(ilce)}"]`);
        if (path) path.classList.add('is-correct');
    };

    if ((window.ilceBilmeceMaps || {})[plaka]) {
        draw(window.ilceBilmeceMaps[plaka]);
        return;
    }
    districtMapEl.innerHTML = '<p class="map-placeholder">İlçe haritası yükleniyor...</p>';
    loadMapScript(plaka, `maps/ilceler/${plaka}.js`)
        .then(draw)
        .catch(() => {
            if (mapAnswer && mapAnswer.correct === correct) {
                districtMapEl.innerHTML = '<p class="map-placeholder">İlçe haritası yüklenemedi (çevrimdışı olabilirsin).</p>';
            }
        });
}

// Cevap verildiğinde: doğru il yeşil, yanlış seçilen il kırmızı; ilçe haritasında sorulan ilçe yeşil
function showAnswerOnMaps(correctIl, guessedIl, ilce) {
    if (currentMode === 'time') return; // Zamana Karşı modunda haritalar gösterilmez
    mapAnswer = { correct: correctIl, guessed: guessedIl, ilce: ilce };
    applyProvinceHighlight();
    renderDistrictMap();
    updateMapPanel();
}

function resetMaps() {
    mapAnswer = null;
    applyProvinceHighlight();
    renderDistrictMap();
    updateMapPanel();
}

// Panelin yerini ve görünürlüğünü belirler:
// - Oyun alanının sağında yeterli boşluk varsa panel orada sürekli görünür (cevap öncesi nötr harita)
// - Yoksa bilgi notunun altına taşınır ve yalnızca cevaptan sonra görünür
// - Zamana Karşı modunda hiç görünmez
function updateMapPanel() {
    if (!mapPanel) return;
    const stage = document.getElementById('stage');
    const available = window.innerWidth - stage.getBoundingClientRect().right - MAP_PANEL_GAP - MAP_PAGE_MARGIN;
    isMapSideLayout = available >= MAP_PANEL_MIN_WIDTH;

    if (isMapSideLayout) {
        if (mapPanel.parentElement !== stage) stage.appendChild(mapPanel);
        mapPanel.style.width = `${Math.min(MAP_PANEL_MAX_WIDTH, available)}px`;
    } else {
        const districtInfo = document.getElementById('district-info');
        if (mapPanel.previousElementSibling !== districtInfo) districtInfo.after(mapPanel);
        mapPanel.style.width = '';
    }
    mapPanel.classList.toggle('is-side', isMapSideLayout);
    mapPanel.classList.toggle('is-inline', !isMapSideLayout);

    const visible = currentMode !== 'time' && (isMapSideLayout || !!mapAnswer);
    mapPanel.classList.toggle('is-visible', visible);
}

let mapResizeFrame = null;
window.addEventListener('resize', () => {
    if (mapResizeFrame) return;
    mapResizeFrame = requestAnimationFrame(() => {
        mapResizeFrame = null;
        updateMapPanel();
    });
});

loadProvinceMap();

if ('serviceWorker' in navigator) {
    let refreshing = false;
    // İlk ziyarette henüz kontrol eden bir SW yoktur; o durumda yenilemeye gerek yok
    const hadController = !!navigator.serviceWorker.controller;

    // Yeni Service Worker kontrolü ele aldığında (clients.claim ile) sayfayı otomatik 1 kez yenile
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (hadController && !refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });

    window.addEventListener('load', () => {
        // updateViaCache: 'none' eklendi -> sw.js dosyasının HTTP önbelleğinden okunmasını engeller
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
            .then((registration) => {
                // Sayfa açıldığında sunucudaki sw.js dosyasında değişiklik var mı anında kontrol et
                registration.update();
                // İlçe haritalarını çevrimdışı kullanım için arka planda önbelleğe al
                return navigator.serviceWorker.ready;
            })
            .then((registration) => {
                if (registration.active) {
                    registration.active.postMessage({ type: 'precache-maps' });
                }
            })
            .catch((err) => console.error('Service Worker kayıt hatası:', err));
    });
}

function initApp() {
    // Paylaşılan bağlantı (?mod=gunluk) doğrudan Günün Bilmecesi'ni açar
    const params = new URLSearchParams(window.location.search);
    prepareGame(params.get('mod') === 'gunluk' ? 'daily' : 'classic');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

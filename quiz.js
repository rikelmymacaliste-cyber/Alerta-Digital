/* ==========================================================================
   PORTAL ALERTA DIGITAL - quiz.js
   Quiz Interativo: 10 perguntas + pontuação + feedback + diagnóstico final
   ========================================================================== */

(function() {
    'use strict';

    // ----------------------------------------------------------------------
    // BANCO DE PERGUNTAS
    // ----------------------------------------------------------------------
    const questions = [
        {
            tag: 'CONCEITO',
            q: 'O que significa "fake news"?',
            options: [
                'Notícias engraçadas publicadas como piada',
                'Informações falsas apresentadas como se fossem verdadeiras',
                'Qualquer notícia com erro de digitação',
                'Notícias antigas que foram esquecidas'
            ],
            correct: 1,
            feedback: 'Fake news são informações falsas ou enganosas apresentadas como notícia legítima, com a intenção de enganar, manipular opiniões ou gerar lucro com cliques.'
        },
        {
            tag: 'IDENTIFICAÇÃO',
            q: 'Você recebe uma notícia bombástica num grupo de WhatsApp. Qual o primeiro passo?',
            options: [
                'Compartilhar imediatamente para alertar mais pessoas',
                'Acreditar — quem mandou geralmente é confiável',
                'Verificar a fonte e procurar a mesma notícia em sites conhecidos',
                'Ignorar completamente sem investigar'
            ],
            correct: 2,
            feedback: 'Antes de qualquer reação, verifique. Se a notícia for verdadeira e importante, vários veículos sérios estarão noticiando. A pressa para compartilhar é exatamente o que faz a desinformação se espalhar.'
        },
        {
            tag: 'TIPOS',
            q: 'O que é "clickbait"?',
            options: [
                'Um tipo de vírus de computador',
                'Notícia em outro idioma',
                'Título sensacionalista para atrair cliques sem entregar o que promete',
                'Anúncio publicitário'
            ],
            correct: 2,
            feedback: 'Clickbait ("isca de cliques") é a técnica de criar títulos exagerados ou enganosos para fazer você clicar, mesmo que o conteúdo seja muito menos interessante do que prometido.'
        },
        {
            tag: 'IMAGEM',
            q: 'Você vê uma foto chocante sendo compartilhada como atual. Como verificar a origem real?',
            options: [
                'Usar busca reversa de imagens (Google Imagens / TinEye)',
                'Ampliar a foto para ver detalhes',
                'Confiar em quem compartilhou',
                'Não tem como verificar'
            ],
            correct: 0,
            feedback: 'A busca reversa de imagens permite descobrir onde uma foto apareceu antes na internet. Muitas fake news usam imagens reais de outros eventos, anos ou lugares — mas a busca reversa expõe isso.'
        },
        {
            tag: 'CONTEXTO',
            q: 'Uma notícia tem fonte real, autor identificado e foi publicada por veículo conhecido. Pode confiar 100%?',
            options: [
                'Sim, com certeza',
                'Não, ainda assim vale comparar com outras fontes e verificar a data',
                'Só se concordar com sua opinião',
                'Depende do tema'
            ],
            correct: 1,
            feedback: 'Mesmo veículos sérios podem errar, atrasar correções ou ter editoriais tendenciosos. Comparar com outras fontes e verificar a data são hábitos saudáveis até para notícias aparentemente confiáveis.'
        },
        {
            tag: 'ALERTAS',
            q: 'Qual destes é um sinal forte de que uma notícia pode ser falsa?',
            options: [
                'Tem fotos coloridas',
                'Foi publicada hoje',
                'Título em CAIXA ALTA, com vários "!!!" e promessas absurdas',
                'Está em português'
            ],
            correct: 2,
            feedback: 'Notícias verdadeiras não precisam gritar. Manchetes em caixa alta, com excesso de pontuação, palavras como "URGENTE", "CHOCANTE", "BOMBA" e promessas exageradas são sinais clássicos de desinformação.'
        },
        {
            tag: 'IMPACTO',
            q: 'Qual NÃO é um possível impacto real das fake news?',
            options: [
                'Influenciar eleições e a democracia',
                'Causar pânico e linchamentos contra pessoas inocentes',
                'Atrapalhar campanhas de saúde pública',
                'Aumentar a velocidade da internet'
            ],
            correct: 3,
            feedback: 'As fake news não afetam infraestrutura técnica — mas afetam pessoas, eleições, saúde pública e segurança. Boatos online já causaram violência real contra inocentes, principalmente quando viralizam em grupos de mensagens.'
        },
        {
            tag: 'DEEPFAKE',
            q: 'O que é um "deepfake"?',
            options: [
                'Uma rede social nova',
                'Um tipo de criptomoeda',
                'Vídeo ou áudio manipulado por IA, fazendo a pessoa parecer dizer algo que nunca disse',
                'Um filtro do Instagram'
            ],
            correct: 2,
            feedback: 'Deepfakes usam inteligência artificial para criar vídeos/áudios falsos extremamente realistas. É uma das formas mais perigosas de desinformação atual — políticos, celebridades e pessoas comuns já tiveram falas inteiramente fabricadas viralizando.'
        },
        {
            tag: 'PRÁTICA',
            q: 'Você deve compartilhar uma notícia quando:',
            options: [
                'Concordar com o que ela diz',
                'For de um amigo de confiança',
                'Confirmou que é verdadeira em fontes confiáveis E o conteúdo é relevante',
                'Tiver muitos likes nas redes'
            ],
            correct: 2,
            feedback: 'Compartilhar é uma forma de endossar. Antes de fazer, sempre confira a veracidade em fontes sérias. Concordar com a mensagem ou confiar em quem mandou não substitui a verificação — todo mundo pode ser enganado.'
        },
        {
            tag: 'ATITUDE',
            q: 'Qual é a melhor postura geral diante de notícias na internet?',
            options: [
                'Acreditar em tudo para não perder informação',
                'Não acreditar em nada e ficar paranoico',
                'Manter pensamento crítico, verificar antes de compartilhar e checar várias fontes',
                'Só ler as manchetes'
            ],
            correct: 2,
            feedback: 'Pensamento crítico é o melhor antídoto contra fake news. Não significa duvidar de tudo cegamente — significa avaliar fontes, comparar informações e admitir incertezas. Verificar leva poucos minutos, mas evita semanas de prejuízo.'
        }
    ];

    // ----------------------------------------------------------------------
    // ESTADO DO QUIZ
    // ----------------------------------------------------------------------
    const state = {
        currentIndex: 0,
        score: 0,
        answered: false
    };

    // ----------------------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------------------
    const screens = {
        intro: document.getElementById('quizIntro'),
        questions: document.getElementById('quizQuestions'),
        result: document.getElementById('quizResult')
    };

    if (!screens.intro || !screens.questions || !screens.result) {
        // Não estamos na página do quiz, sai
        return;
    }

    const els = {
        startBtn: document.getElementById('startQuizBtn'),
        nextBtn: document.getElementById('nextBtn'),
        restartBtn: document.getElementById('restartBtn'),
        currentQ: document.getElementById('currentQ'),
        totalQ: document.getElementById('totalQ'),
        progressFill: document.getElementById('progressFill'),
        liveScore: document.getElementById('liveScore'),
        questionTag: document.getElementById('questionTag'),
        questionText: document.getElementById('questionText'),
        answersList: document.getElementById('answersList'),
        feedbackBox: document.getElementById('feedbackBox'),
        feedbackStatus: document.getElementById('feedbackStatus'),
        feedbackText: document.getElementById('feedbackText'),
        resultEyebrow: document.getElementById('resultEyebrow'),
        resultScore: document.getElementById('resultScore'),
        resultTitle: document.getElementById('resultTitle'),
        resultText: document.getElementById('resultText'),
        resultMeterFill: document.getElementById('resultMeterFill')
    };

    // ----------------------------------------------------------------------
    // FUNÇÕES
    // ----------------------------------------------------------------------

    function showScreen(name) {
        Object.keys(screens).forEach(k => {
            screens[k].hidden = (k !== name);
        });
    }

    function startQuiz() {
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        els.totalQ.textContent = questions.length;
        showScreen('questions');
        renderQuestion();
        // scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderQuestion() {
        const q = questions[state.currentIndex];
        state.answered = false;

        // Atualiza progresso
        els.currentQ.textContent = state.currentIndex + 1;
        els.liveScore.textContent = state.score;
        const progressPct = ((state.currentIndex) / questions.length) * 100;
        els.progressFill.style.width = progressPct + '%';

        // Atualiza pergunta
        els.questionTag.textContent = q.tag;
        els.questionText.textContent = q.q;

        // Esconde feedback
        els.feedbackBox.hidden = true;
        els.feedbackBox.classList.remove('correct');
        els.feedbackStatus.classList.remove('correct', 'wrong');

        // Renderiza alternativas
        els.answersList.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerHTML = `
                <span class="answer-letter">${letters[idx]}</span>
                <span class="answer-text">${opt}</span>
            `;
            btn.addEventListener('click', () => selectAnswer(idx, btn));
            els.answersList.appendChild(btn);
        });
    }

    function selectAnswer(selectedIdx, btnEl) {
        if (state.answered) return;
        state.answered = true;

        const q = questions[state.currentIndex];
        const correctIdx = q.correct;
        const allBtns = els.answersList.querySelectorAll('.answer-btn');

        // Desabilita todos
        allBtns.forEach((b, idx) => {
            b.classList.add('disabled');
            if (idx === correctIdx) {
                b.classList.add('correct');
            } else if (idx === selectedIdx && idx !== correctIdx) {
                b.classList.add('wrong');
            }
        });

        // Atualiza pontuação
        const isCorrect = (selectedIdx === correctIdx);
        if (isCorrect) {
            state.score++;
            els.liveScore.textContent = state.score;
        }

        // Mostra feedback
        els.feedbackBox.hidden = false;
        els.feedbackStatus.textContent = isCorrect
            ? '✓ Correto!'
            : '✗ Não foi dessa vez';
        els.feedbackStatus.classList.add(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) {
            els.feedbackBox.classList.add('correct');
        }
        els.feedbackText.textContent = q.feedback;

        // Atualiza texto do botão na última pergunta
        const isLast = (state.currentIndex === questions.length - 1);
        els.nextBtn.innerHTML = isLast
            ? 'Ver resultado <span class="btn-arrow">→</span>'
            : 'Próxima <span class="btn-arrow">→</span>';

        // Scroll suave até o feedback
        setTimeout(() => {
            els.feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    function nextQuestion() {
        state.currentIndex++;
        if (state.currentIndex >= questions.length) {
            showResult();
        } else {
            renderQuestion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function showResult() {
        showScreen('result');
        const score = state.score;
        const total = questions.length;
        const pct = (score / total) * 100;

        els.resultScore.textContent = score;

        // Diagnóstico baseado na pontuação
        let title, text, eyebrow;
        if (score <= 3) {
            eyebrow = 'INICIANTE';
            title = 'Tem espaço para crescer.';
            text = 'Você ainda está aprendendo a separar o joio do trigo. Tudo bem — todo mundo começa em algum lugar. Volte às páginas de Tipos e Como Identificar para fortalecer sua base.';
        } else if (score <= 6) {
            eyebrow = 'INTERMEDIÁRIO';
            title = 'Bom radar, mas dá para afinar.';
            text = 'Você já reconhece os principais sinais de alerta, mas algumas pegadinhas ainda passaram. Continue treinando o olhar — quanto mais você pratica, mais rápido identifica desinformação.';
        } else if (score <= 8) {
            eyebrow = 'AVANÇADO';
            title = 'Você sabe das coisas.';
            text = 'Sua capacidade de avaliar notícias está bem afinada. Você reconhece os padrões de desinformação e sabe verificar antes de acreditar. Já pode ajudar amigos e familiares a fazerem o mesmo.';
        } else {
            eyebrow = 'CAÇADOR DE FAKE NEWS';
            title = 'Mestre da verificação.';
            text = 'Excelente! Você domina os princípios do pensamento crítico aplicado à informação digital. Seu olhar treinado é uma defesa importante contra desinformação. Compartilhe o que sabe.';
        }

        els.resultEyebrow.textContent = eyebrow;
        els.resultTitle.textContent = title;
        els.resultText.textContent = text;

        // Anima a barra do medidor
        setTimeout(() => {
            els.resultMeterFill.style.width = pct + '%';
        }, 300);

        // Anima o número de pontuação
        animateScore(score);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function animateScore(target) {
        const duration = 1200;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            els.resultScore.textContent = Math.floor(target * eased);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                els.resultScore.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    function restartQuiz() {
        startQuiz();
    }

    // ----------------------------------------------------------------------
    // EVENT LISTENERS
    // ----------------------------------------------------------------------
    els.startBtn && els.startBtn.addEventListener('click', startQuiz);
    els.nextBtn && els.nextBtn.addEventListener('click', nextQuestion);
    els.restartBtn && els.restartBtn.addEventListener('click', restartQuiz);

    // Inicializa total
    if (els.totalQ) els.totalQ.textContent = questions.length;

})();

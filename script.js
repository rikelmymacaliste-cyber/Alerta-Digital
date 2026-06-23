/* ==========================================================================
   PORTAL ALERTA DIGITAL - script.js
   Funcionalidades gerais: data, menu mobile, animações, filtros, verificador
   ========================================================================== */

(function() {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. DATA NA STATUS BAR
    // ----------------------------------------------------------------------
    function updateDate() {
        const dateEl = document.getElementById('current-date');
        if (!dateEl) return;

        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();
        const hora = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');

        dateEl.textContent = `${dia}.${mes}.${ano} • ${hora}:${min}`;
    }
    updateDate();
    setInterval(updateDate, 60000); // atualiza a cada minuto

    // ----------------------------------------------------------------------
    // 2. MENU MOBILE (hambúrguer)
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        });

        // Fechar ao clicar em link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. CONTADORES ANIMADOS (estatísticas da home)
    // ----------------------------------------------------------------------
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        const duration = 1500; // ms
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easing: easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    // Inicia contadores quando aparecem na tela (Intersection Observer)
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    } else {
        // fallback: dispara direto
        counters.forEach(animateCounter);
    }

    // ----------------------------------------------------------------------
    // 4. FILTRO DE TIPOS (página tipos.html)
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const typeCards = document.querySelectorAll('.type-card');

    if (filterBtns.length && typeCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // Atualiza visual do botão ativo
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Mostra/esconde cards
                typeCards.forEach(card => {
                    const cat = card.dataset.category;
                    if (filter === 'all' || cat === filter || cat === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. VERIFICADOR DE NOTÍCIAS (simulado)
    // ----------------------------------------------------------------------
    const verifyBtn = document.getElementById('verifyBtn');
    const newsInput = document.getElementById('newsInput');
    const verifierResult = document.getElementById('verifierResult');

    if (verifyBtn && newsInput && verifierResult) {

        // Padrões suspeitos para análise simulada
        const suspiciousPatterns = [
            { regex: /!{2,}/, msg: 'Múltiplos pontos de exclamação — sinal clássico de sensacionalismo.' },
            { regex: /\b[A-ZÁÉÍÓÚ]{4,}\b/, msg: 'Palavras inteiras em CAIXA ALTA detectadas — comum em fake news.' },
            { regex: /\b(urgente|chocante|inacreditável|absurdo|exclusivo|bomba|escândalo)\b/i,
              msg: 'Termos sensacionalistas presentes (urgente, chocante, etc).' },
            { regex: /\b(milagros[ao]|cura|curar|elimina(?:m|r)?|garanti[ad][oa]?)\b/i,
              msg: 'Promessas absolutas ou milagrosas — desconfie sempre.' },
            { regex: /\b(ninguém te conta|escondem|não querem que|mídia esconde)\b/i,
              msg: 'Apelo a teorias conspiratórias — clássico padrão de desinformação.' },
            { regex: /\b(compartilh[ae]|repass[ae]|envi[ae] para|antes que apaguem)\b/i,
              msg: 'Apelo emocional para compartilhar imediatamente — alerta vermelho.' },
            { regex: /\b\d{2,}\s*(dias?|horas?|minutos?)\b/i,
              msg: 'Promessa de resultado em prazo específico — geralmente exagerada.' }
        ];

        function analyzeNews(text) {
            const found = [];
            suspiciousPatterns.forEach(p => {
                if (p.regex.test(text)) {
                    found.push(p.msg);
                }
            });
            return found;
        }

        function verify() {
            const text = newsInput.value.trim();

            if (!text) {
                verifierResult.hidden = false;
                verifierResult.innerHTML = `
                    <h4>⚠ Digite algo para analisar</h4>
                    <p style="color: var(--text-secondary);">
                        Cole um título de notícia para vermos quais sinais de alerta ele apresenta.
                    </p>
                `;
                return;
            }

            const flags = analyzeNews(text);

            if (flags.length === 0) {
                verifierResult.hidden = false;
                verifierResult.innerHTML = `
                    <h4 style="color: var(--color-truth);">✓ Nenhum sinal óbvio detectado</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        O título não apresenta os padrões mais comuns de fake news, mas
                        <strong style="color: var(--text-primary);">isso não garante que seja verdadeiro</strong>.
                        Continue verificando:
                    </p>
                    <ul>
                        <li>A fonte do site é confiável?</li>
                        <li>Existe autor identificado?</li>
                        <li>Outros veículos confirmam a informação?</li>
                        <li>Há fontes e dados específicos citados?</li>
                    </ul>
                `;
            } else {
                verifierResult.hidden = false;
                verifierResult.innerHTML = `
                    <h4>⚠ ${flags.length} sinal(is) de alerta detectado(s)</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        O texto apresenta padrões frequentemente associados a desinformação.
                        Recomenda-se <strong style="color: var(--text-primary);">verificação adicional</strong>
                        antes de acreditar ou compartilhar:
                    </p>
                    <ul>
                        ${flags.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--line-dark);
                              font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);
                              letter-spacing: 0.1em;">
                        ⓘ ESTA É UMA ANÁLISE EDUCATIVA E SIMULADA, NÃO UMA VERIFICAÇÃO REAL.
                    </p>
                `;
            }

            // scroll suave até o resultado
            verifierResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        verifyBtn.addEventListener('click', verify);
        newsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                verify();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. ANIMAÇÃO DOS CARDS DE TIPOS (entrada escalonada)
    // ----------------------------------------------------------------------
    const typeCardsForAnim = document.querySelectorAll('.type-card');
    if (typeCardsForAnim.length && 'IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = (idx * 0.08) + 's';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        typeCardsForAnim.forEach(card => cardObserver.observe(card));
    }

})();

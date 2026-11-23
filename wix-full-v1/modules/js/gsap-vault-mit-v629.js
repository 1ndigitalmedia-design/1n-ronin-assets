/*!
 * 1N Digital Media tasarım önizlemesi — GSAP Vault ücretsiz efektlerinden uyarlanmıştır:
 *   - Scroll Text Highlight  (free-gsap-effects/scroll-text-highlight/assets/script.js)
 *   - Image Clip Reveal      (free-gsap-effects/image-clip-reveal/assets/script.js)
 * Uyarlama: Lenis bölümleri kaldırıldı (ikinci kaydırma kütüphanesi yok), global değişkenler
 * (window.gsapContext, window.imageClipReveal) kaldırıldı, temizleme yalnızca bu efektlerin kendi
 * ScrollTrigger'larını kapatır (sayfadaki başka ScrollTrigger'lara dokunmaz). Zamanlama ve yumuşatma korundu.
 *
 * Orijinal lisans:
 * MIT License
 *
 * Copyright (c) 2026 GSAP Vault (gsapvault.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* ===== Scroll Text Highlight ===== */
/**
 * Scroll Text Highlight
 *
 * SplitText turns each highlighted block into a reversible reading sequence.
 * Every word holds two layers in one box: a faint ghost preview painted from
 * a data-mark attribute, and the real text, hidden until the reading front
 * arrives. A sharp orange-to-lime front lifts the active word, then leaves
 * completed words calm and dark. Optional progress and coordinate elements can follow
 * the same scrubbed ScrollTrigger.
 *
 * @plugins ScrollTrigger, SplitText
 * @techniques scrub, text-animation, scroll-highlight
 */

(function onReady(init) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(function initScrollTextHighlight() {
    const BLOCKS = '.scroll-highlight';

    /* A blocked CDN must leave the unsplit, fully readable statement alone. */
    if (typeof gsap === 'undefined'
        || typeof ScrollTrigger === 'undefined'
        || typeof SplitText === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ownTriggers = [];

    const splits = [];
    const STEP = 1;
    const EDGE = 0.16;
    const FLASH = 0.28;
    const SETTLE = 0.72;

    function numericAttribute(element, name, fallback) {
        const value = parseFloat(element.dataset[name]);
        return Number.isFinite(value) ? value : fallback;
    }

    function resolveColor(element, value) {
        const probe = document.createElement('span');
        probe.style.cssText = 'position:absolute;visibility:hidden;color:' + value;
        element.appendChild(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
    }

    function resolveElement(value, container) {
        if (!value) return null;
        try {
            return document.querySelector(value) || container.closest(value);
        } catch (error) {
            return null;
        }
    }

    /* The visible block is one word per element mid-animation, which reads as
       twenty-six fragments to a screen reader. Speak the sentence once from a
       hidden sibling and hide the fragments. */
    function announce(container) {
        if (container.previousElementSibling
            && container.previousElementSibling.hasAttribute('data-sh-sr')) return;
        const sr = document.createElement('p');
        sr.setAttribute('data-sh-sr', '');
        sr.textContent = container.textContent.replace(/\s+/g, ' ').trim();
        sr.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;'
            + 'padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);'
            + 'white-space:nowrap;';
        container.parentNode.insertBefore(sr, container);
        container.setAttribute('aria-hidden', 'true');
    }

    function unannounce() {
        document.querySelectorAll('[data-sh-sr]').forEach(function (node) {
            const block = node.nextElementSibling;
            if (block) block.removeAttribute('aria-hidden');
            node.remove();
        });
    }

    function buildBlock(container) {
        if (!container.isConnected) return;

        const CONFIG = {
            dim: numericAttribute(container, 'highlightDim', 0.16),
            accent: container.dataset.highlightAccent !== 'false',
            lift: numericAttribute(container, 'highlightLift', 7),
            scrub: container.dataset.highlightScrub === undefined
                ? true
                : (container.dataset.highlightScrub === 'true'
                    ? true
                    : numericAttribute(container, 'highlightScrub', true))
        };

        const trigger = resolveElement(container.dataset.highlightTrigger, container) || container;
        const progress = resolveElement(container.dataset.highlightProgress, container);
        const current = resolveElement(container.dataset.highlightCurrent, container);
        /* aria: 'none' — SplitText's default puts an aria-label on the block, and
           aria-label is prohibited on a <p> with no role. The readable sentence is
           carried by a visually hidden sibling instead, and the split words are
           taken out of the accessibility tree. */
        const split = new SplitText(container, { type: 'words', wordsClass: 'sh-word', aria: 'none' });
        splits.push(split);
        /* 1N v6.29: bağlantı içeren blokta metin erişilebilirlik ağacından gizlenmez (bağlantılar
           odaklanabilir ve okunabilir kalır); kelimeler visibility yerine yalnızca opacity ile gizlenir. */
        const inlineA11y = container.dataset.highlightA11y === 'inline';
        if (!inlineA11y) announce(container);

        const words = split.words;
        if (!words.length) return;

        /* Two layers, one box. The ghost preview is generated content painted
           from data-mark, so it is decoration with no text node; the real text
           moves into .sh-word__text and stays visibility:hidden until the
           front reads it, then crossfades in as the ghost fades out. */
        /* 1N uyarlaması (v6.14): her kelimenin kendi son rengi okunur; böylece metin içinde <span> ile
           işaretlenen çok az sayıda kelime soft marka yeşiliyle oturur, geri kalanı kırık açık gri kalır. */
        const finals = words.map(function (word) { return getComputedStyle(word).color; });
        const texts = words.map(function (word) {
            const text = document.createElement('span');
            text.className = 'sh-word__text';
            while (word.firstChild) {
                text.appendChild(word.firstChild);
            }
            word.appendChild(text);
            word.setAttribute('data-mark', text.textContent);
            return text;
        });

        const foreground = getComputedStyle(container).color;
        const accent = CONFIG.accent ? resolveColor(container, 'var(--accent)') : foreground;
        const edge = CONFIG.accent ? resolveColor(container, 'var(--highlight-edge, #ff6b35)') : foreground;
        const usesStageTrigger = trigger !== container;

        container.classList.add('is-reading');
        /* The ghost opacity rides a custom property, because a pseudo-element
           cannot be tweened directly. GSAP removes an inline custom property
           when it reverts a tween (every ScrollTrigger refresh does), so the
           unread value also lives on the block as --sh-dim and the ::before
           falls back to it. */
        container.style.setProperty('--sh-dim', String(CONFIG.dim));
        gsap.set(words, { y: CONFIG.lift });
        gsap.set(texts, { [inlineA11y ? 'opacity' : 'autoAlpha']: 0, color: function (i) { return finals[i] || foreground; } });
        if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
        if (current) current.textContent = '00 / ' + String(words.length).padStart(2, '0');

        const timeline = gsap.timeline({ defaults: { ease: 'none' } });

        words.forEach(function (word, index) {
            const at = index * STEP;
            const text = texts[index];
            timeline
                .fromTo(word, {
                    '--sh-ghost': CONFIG.dim
                }, {
                    '--sh-ghost': 0,
                    duration: EDGE
                }, at)
                .to(word, {
                    y: -CONFIG.lift * 0.45,
                    duration: EDGE
                }, at)
                .to(text, {
                    [inlineA11y ? 'opacity' : 'autoAlpha']: 1,
                    color: edge,
                    duration: EDGE
                }, at)
                .to(word, {
                    y: -CONFIG.lift,
                    duration: FLASH
                }, at + EDGE)
                .to(text, {
                    color: accent,
                    duration: FLASH
                }, at + EDGE)
                .to(word, {
                    y: 0,
                    duration: SETTLE
                }, at + EDGE + FLASH)
                .to(text, {
                    color: finals[index] || foreground,
                    duration: SETTLE
                }, at + EDGE + FLASH);
        });

        ownTriggers.push(ScrollTrigger.create({
            trigger: trigger,
            animation: timeline,
            start: usesStageTrigger ? 'top top' : 'top 80%',
            end: usesStageTrigger ? 'bottom bottom' : 'bottom 65%',
            scrub: CONFIG.scrub,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
                if (!container.isConnected) return;
                if (progress && progress.isConnected) {
                    gsap.set(progress, { scaleX: self.progress });
                }
                if (current && current.isConnected) {
                    const count = Math.min(words.length, Math.floor(self.progress * words.length));
                    current.textContent = String(count).padStart(2, '0')
                        + ' / ' + String(words.length).padStart(2, '0');
                }
            }
        }));
    }

    const ctx = gsap.context(function gsapContextCallback() {
        const mm = gsap.matchMedia();

        mm.add({
            isMotion: '(prefers-reduced-motion: no-preference)',
            isReduced: '(prefers-reduced-motion: reduce)'
        }, function (context) {
            let active = true;

            if (context.conditions.isReduced) {
                document.querySelectorAll(BLOCKS).forEach(function (block) {
                    gsap.set(block, { opacity: 1, clearProps: 'transform' });
                });
                return function () { active = false; };
            }

            document.documentElement.classList.add('has-scroll-highlight');
            document.fonts.ready.then(function () {
                if (!active) return;
                document.querySelectorAll(BLOCKS).forEach(buildBlock);
                ScrollTrigger.refresh();
            });

            return function cleanup() {
                active = false;
                document.documentElement.classList.remove('has-scroll-highlight');
                ownTriggers.forEach(function (scrollTrigger) {
                    scrollTrigger.kill();
                });
                ownTriggers.length = 0;
                splits.forEach(function (split) {
                    split.revert();
                });
                splits.length = 0;
                unannounce();
            };
        });
    });

    window.addEventListener('pagehide', function () { ctx.revert(); });
});


/* ===== Image Clip Reveal ===== */
/**
 * Image Clip Reveal
 *
 * A directional polygon aperture opens while the image settles from a
 * restrained scale. Optional caption, rule, and atmosphere elements follow.
 *
 * @plugins ScrollTrigger
 * @techniques scroll-reveal, image-reveal, clip-path, ken-burns
 */

gsap.registerPlugin(ScrollTrigger);

(function onReady(init) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(function initImageClipReveal() {
    /* Six points keep interpolation stable while the leading edge forms a
       narrow architectural wedge. Direction names retain the original API. */
    const CLOSED_CLIPS = {
        up: 'polygon(0% 100%, 42% 100%, 50% 94%, 58% 100%, 100% 100%, 0% 100%)',
        down: 'polygon(0% 0%, 42% 0%, 50% 6%, 58% 0%, 100% 0%, 0% 0%)',
        left: 'polygon(100% 0%, 100% 42%, 94% 50%, 100% 58%, 100% 100%, 100% 0%)',
        right: 'polygon(0% 0%, 0% 42%, 6% 50%, 0% 58%, 0% 100%, 0% 0%)'
    };
    const OPEN_CLIP = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)';
    const IMG_START_SCALE = 1.14;
    const timelines = [];
    const triggers = [];
    const handlers = new Map();

    function numberOr(value, fallback) {
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function readConfig(el, fallback) {
        fallback = fallback || {};
        const direction = el.dataset.revealDirection || fallback.direction || 'up';
        const onceAttr = el.dataset.revealOnce;

        return {
            direction: CLOSED_CLIPS[direction] ? direction : 'up',
            duration: numberOr(el.dataset.revealDuration, fallback.duration || 1.1),
            delay: numberOr(el.dataset.revealDelay, fallback.delay || 0),
            once: onceAttr !== undefined ? onceAttr !== 'false' : fallback.once !== false
        };
    }

    function registerTimeline(timeline) {
        timelines.push(timeline);
        if (timeline.scrollTrigger) triggers.push(timeline.scrollTrigger);
        return timeline;
    }

    function addReveal(timeline, wrapper, config, position) {
        const image = wrapper.querySelector('img');
        const figure = wrapper.closest('figure');
        const caption = figure && figure.querySelector('[data-reveal-caption]');
        const rule = caption && caption.querySelector('[data-reveal-rule]');
        const captionItems = caption
            ? gsap.utils.toArray('[data-reveal-copy]', caption)
            : [];
        const atmosphere = figure && figure.querySelector('[data-reveal-atmosphere]');
        const captionAt = position + config.delay + (config.duration * 0.72);

        timeline.fromTo(wrapper, {
            clipPath: CLOSED_CLIPS[config.direction]
        }, {
            clipPath: OPEN_CLIP,
            duration: config.duration,
            delay: config.delay,
            ease: 'expo.inOut'
        }, position);

        if (image) {
            timeline.fromTo(image, {
                scale: IMG_START_SCALE
            }, {
                scale: 1,
                duration: config.duration + 0.18,
                delay: config.delay,
                ease: 'power3.out'
            }, position);
        }

        if (atmosphere) {
            timeline.fromTo(atmosphere, {
                opacity: 0,
                scale: 0.84
            }, {
                opacity: 0.7,
                scale: 1,
                duration: config.duration * 0.9,
                ease: 'sine.out'
            }, position + config.delay + 0.12);
        }

        if (rule) {
            timeline.fromTo(rule, {
                scaleX: 0,
                transformOrigin: config.direction === 'left' ? 'right center' : 'left center'
            }, {
                scaleX: 1,
                duration: 0.65,
                ease: 'expo.out'
            }, captionAt);
        }

        if (captionItems.length) {
            timeline.fromTo(captionItems, {
                yPercent: 115,
                y: 0,
                opacity: 0
            }, {
                yPercent: 0,
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.07,
                ease: 'expo.out'
            }, captionAt + 0.08);
        }
    }

    function buildScrollTrigger(triggerEl, once) {
        const settings = {
            trigger: triggerEl,
            start: 'top 85%'
        };

        if (once) {
            settings.once = true;
        } else {
            settings.toggleActions = 'restart none none reset';
        }

        return settings;
    }

    const ctx = gsap.context(function gsapContextCallback() {
        const mm = gsap.matchMedia();

        mm.add({
            isMotion: '(prefers-reduced-motion: no-preference)',
            isReduced: '(prefers-reduced-motion: reduce)'
        }, function matchMediaCallback(context) {
            const { isMotion } = context.conditions;
            const wrappers = gsap.utils.toArray('[data-clip-reveal]');
            const groups = gsap.utils.toArray('[data-clip-reveal-group]');

            if (!isMotion) {
                gsap.set(wrappers, { clipPath: 'none' });
                wrappers.forEach(function showStatic(wrapper) {
                    const image = wrapper.querySelector('img');
                    const figure = wrapper.closest('figure');
                    if (image) gsap.set(image, { scale: 1 });
                    if (figure) {
                        gsap.set(figure.querySelectorAll('[data-reveal-caption], [data-reveal-copy], [data-reveal-rule]'), {
                            clearProps: 'all'
                        });
                        const atmosphere = figure.querySelector('[data-reveal-atmosphere]');
                        if (atmosphere) gsap.set(atmosphere, { opacity: 0.45, scale: 1 });
                    }
                });
                return;
            }


            groups.forEach(function initGroup(group) {
                const children = gsap.utils.toArray('[data-clip-reveal]', group);
                if (!children.length) return;

                const groupConfig = readConfig(group);
                const stagger = numberOr(group.dataset.revealStagger, 0.12);
                const timeline = registerTimeline(gsap.timeline({
                    scrollTrigger: buildScrollTrigger(group, groupConfig.once)
                }));

                children.forEach(function addChild(wrapper, index) {
                    addReveal(timeline, wrapper, readConfig(wrapper, groupConfig), index * stagger);
                });
            });

            wrappers.forEach(function initWrapper(wrapper) {
                if (wrapper.closest('[data-clip-reveal-group]')) return;
                const config = readConfig(wrapper);
                const timeline = registerTimeline(gsap.timeline({
                    scrollTrigger: buildScrollTrigger(wrapper, config.once)
                }));
                addReveal(timeline, wrapper, config, 0);
            });

            gsap.utils.toArray('[data-clip-replay]').forEach(function initReplay(button) {
                const handleReplay = function () {
                    timelines.forEach(function replayTimeline(timeline) {
                        if (timeline && timeline.scrollTrigger) timeline.restart(true);
                    });
                };
                button.addEventListener('click', handleReplay);
                handlers.set(button, handleReplay);
            });

            return function cleanupMotion() {
                handlers.forEach(function removeHandler(handler, element) {
                    element.removeEventListener('click', handler);
                });
                handlers.clear();
                triggers.forEach(function killTrigger(trigger) { trigger.kill(); });
                timelines.forEach(function killTimeline(timeline) { timeline.kill(); });
                triggers.length = 0;
                timelines.length = 0;
            };
        });
    });

    window.addEventListener('pagehide', function () { ctx.revert(); });
});

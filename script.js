document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // Intersection Observer for staggered fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = Array.from(document.querySelectorAll('.card'));
                const index = cards.indexOf(entry.target);
                const delay = index * 40;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initial setup and observe
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
    
    // Animated counters for stats
    const animateNumber = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                const suffix = element.dataset.suffix || '';
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                const suffix = element.dataset.suffix || '';
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    };
    
    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    const text = statNumber.textContent;
                    const value = parseFloat(text.replace(/[^0-9.]/g, ''));
                    const suffix = text.replace(/[0-9.]/g, '');
                    
                    statNumber.dataset.suffix = suffix;
                    statNumber.dataset.animated = 'true';
                    statNumber.textContent = '0' + suffix;
                    
                    setTimeout(() => {
                        animateNumber(statNumber, value);
                    }, 300);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-card').forEach(stat => {
        statObserver.observe(stat);
    });
    
    // Profile stat values animation
    const profileStatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach((value, index) => {
                    if (!value.dataset.animated) {
                        const text = value.textContent;
                        const numValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                        const suffix = text.replace(/[0-9.]/g, '');
                        
                        value.dataset.suffix = suffix;
                        value.dataset.animated = 'true';
                        value.textContent = '0' + suffix;
                        
                        setTimeout(() => {
                            animateNumber(value, numValue);
                        }, 300 + index * 100);
                    }
                });
                profileStatObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.profile').forEach(profile => {
        profileStatObserver.observe(profile);
    });
    
    // Ripple effect for clickable elements
    document.querySelectorAll('.work, .service:not(.threejs-service), .cta, .btn-primary, .btn-cta').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 700);
        });
    });
    
    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 100;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Calculate experience days from May 19, 2023
    function updateExperienceStats() {
        const startDate = new Date('2023-05-19');
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - startDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        
    // Animate GitHub contributions
        const contributionsElement = document.getElementById('contributions-count');
        if (contributionsElement) {
            contributionsElement.textContent = '0+';
            setTimeout(() => {
                const target = 350;
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        contributionsElement.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        contributionsElement.textContent = Math.floor(current) + '+';
                    }
                }, 16);
            }, 300);
        }
        
    // Animate experience days
        const experienceDaysElement = document.getElementById('experience-days');
        if (experienceDaysElement) {
            experienceDaysElement.textContent = '0+';
            setTimeout(() => {
                const duration = 2000;
                const start = 0;
                const increment = daysDifference / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= daysDifference) {
                        experienceDaysElement.textContent = daysDifference + '+';
                        clearInterval(timer);
                    } else {
                        experienceDaysElement.textContent = Math.floor(current) + '+';
                    }
                }, 16);
            }, 600); // Slightly delayed from contributions
        }
    }
    
    // Update experience stats when page loads
    updateExperienceStats();

    // Parallax effect on scroll for hero
    function updateExperienceDays() {
        const startDate = new Date('2023-05-19');
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - startDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        
        const experienceDaysElement = document.getElementById('experience-days');
        if (experienceDaysElement) {
            // Animate the number counting up
            animateNumber(experienceDaysElement, daysDifference);
        }
    }
    
    // Update experience days when page loads
    updateExperienceDays();

    // Parallax effect on scroll for hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const hero = document.querySelector('.hero');
                const scrolled = window.scrollY;
                const heroRect = hero.getBoundingClientRect();
                
                if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                    const opacity = Math.max(0.3, 1 - (scrolled / (window.innerHeight * 0.8)));
                    hero.style.opacity = opacity;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Update local time
    const updateTime = () => {
        const timeElement = document.getElementById('localTime');
        if (timeElement) {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            const timeString = now.toLocaleTimeString('en-US', options);
            timeElement.textContent = `IST ${timeString}`;
        }
    };
    
    // Update time immediately and every minute
    updateTime();
    setInterval(updateTime, 60000);
    // GitHub Latest Commit integration
    const GITHUB_USERNAME = 'aryansrao';

    const timeAgo = (dateString) => {
        if (!dateString) return 'just now';
        const then = new Date(dateString);
        const seconds = Math.floor((Date.now() - then.getTime()) / 1000);
        const intervals = [
            { label: 'yr', secs: 31536000 },
            { label: 'mo', secs: 2592000 },
            { label: 'd', secs: 86400 },
            { label: 'h', secs: 3600 },
            { label: 'm', secs: 60 },
            { label: 's', secs: 1 }
        ];
        for (const i of intervals) {
            const val = Math.floor(seconds / i.secs);
            if (val > 0) return `${val}${i.label} ago`;
        }
        return 'just now';
    };

    async function populateLatestGitHubCommit(username) {
        const repoEl = document.getElementById('gh-repo');
        const commitEl = document.getElementById('gh-commit');
        const timeEl = document.getElementById('gh-time');
        const linkEl = document.getElementById('gh-link');

        if (!repoEl || !commitEl || !timeEl || !linkEl) return;

        try {
            // Public events endpoint (no auth). Note: rate limited.
            const res = await fetch(`https://api.github.com/users/${username}/events/public`);
            if (!res.ok) throw new Error(`GitHub API ${res.status}`);
            const events = await res.json();

            // Find the most recent PushEvent that contains commits
            const push = events.find(ev => ev.type === 'PushEvent' && ev.payload && ev.payload.commits && ev.payload.commits.length > 0);
            if (!push) {
                repoEl.textContent = 'No recent push events';
                commitEl.textContent = 'No commits found in recent activity.';
                timeEl.textContent = '';
                linkEl.href = `https://github.com/${username}`;
                return;
            }

            const repoName = push.repo.name; // e.g., username/repo
            const commit = push.payload.commits[push.payload.commits.length - 1];
            const message = commit.message || '(no message)';
            const sha = commit.sha || (commit.url ? commit.url.split('/').pop() : '');

            repoEl.textContent = repoName;
            commitEl.textContent = message;
            timeEl.textContent = timeAgo(push.created_at);

            // Attempt to construct a commit URL. If payload provides url, convert API url to html url
            let commitUrl = '';
            if (commit.url) {
                // API URL like https://api.github.com/repos/user/repo/commits/<sha>
                commitUrl = commit.url.replace('api.github.com/repos', 'github.com').replace('/commits/', '/commit/');
            } else if (sha) {
                commitUrl = `https://github.com/${repoName}/commit/${sha}`;
            } else {
                commitUrl = `https://github.com/${repoName}`;
            }

            linkEl.href = commitUrl;
            linkEl.textContent = 'View Commit';
        } catch (err) {
            console.warn('GitHub card error', err);
            const repoEl = document.getElementById('gh-repo');
            const commitEl = document.getElementById('gh-commit');
            const linkEl = document.getElementById('gh-link');
            if (repoEl) repoEl.textContent = 'GitHub unavailable';
            if (commitEl) commitEl.textContent = 'Could not fetch latest commit — rate limited or offline.';
            if (linkEl) { linkEl.href = `https://github.com/${GITHUB_USERNAME}`; linkEl.textContent = 'View Profile'; }
        }
    }

    // Kick off fetch (non-blocking)
    populateLatestGitHubCommit(GITHUB_USERNAME);

    // Make Works CTA card open work.html when clicked (and keyboard accessible)
    document.querySelectorAll('.card.works-cta[data-href]').forEach(card => {
        const href = card.getAttribute('data-href');
        card.style.cursor = 'pointer';
        const openTarget = (e) => {
            // allow modifier keys to open in new tab naturally
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            window.location.href = href;
        };
        card.addEventListener('click', (e) => {
            // create subtle ripple similar to other clicks
            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = Math.max(rect.width, rect.height) * 2;
            const x = (e.clientX - rect.left) - size / 2;
            const y = (e.clientY - rect.top) - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
            // navigate after a tiny delay so ripple is visible
            setTimeout(() => openTarget(e), 80);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openTarget(e);
            }
        });
    });

    // Make Works CTA expand spaced letters on hover/focus for accessibility
    document.querySelectorAll('.card.works-cta').forEach(card => {
        const activate = () => card.classList.add('is-active');
        const deactivate = () => card.classList.remove('is-active');
        card.addEventListener('mouseenter', activate);
        card.addEventListener('mouseleave', deactivate);
        card.addEventListener('focus', activate, true);
        card.addEventListener('blur', deactivate, true);
    });

    // Work card click handling: open external links or show overlay for logos
    function createImageOverlay(src, alt = '', originImgEl = null) {
        const originRect = originImgEl ? originImgEl.getBoundingClientRect() : null;
        const backdrop = document.createElement('div');
        backdrop.className = 'work-image-overlay';
        backdrop.tabIndex = -1;
        document.body.appendChild(backdrop);
        const animImg = document.createElement('img');
        animImg.src = src;
        animImg.alt = alt;
        animImg.className = 'work-image-anim';
        document.body.appendChild(animImg);
        if (originRect) {
            animImg.style.left = originRect.left + 'px';
            animImg.style.top = originRect.top + 'px';
            animImg.style.width = originRect.width + 'px';
            animImg.style.height = originRect.height + 'px';
        } else {
            const vw = window.innerWidth; const vh = window.innerHeight;
            animImg.style.left = (vw/2 - 50) + 'px';
            animImg.style.top = (vh/2 - 50) + 'px';
            animImg.style.width = '100px';
            animImg.style.height = '100px';
        }
        const onImgReady = () => {
            const naturalW = animImg.naturalWidth || animImg.width;
            const naturalH = animImg.naturalHeight || animImg.height;
            const vw = window.innerWidth; const vh = window.innerHeight;
            const targetWidth = originRect ? originRect.width : Math.min(600, vw * 0.6);
            const targetHeight = originRect ? originRect.height : Math.min(400, vh * 0.6);
            const targetLeft = (vw - targetWidth) / 2;
            const targetTop = (vh - targetHeight) / 2;
            requestAnimationFrame(() => {
                animImg.style.left = targetLeft + 'px';
                animImg.style.top = targetTop + 'px';
                animImg.style.width = targetWidth + 'px';
                animImg.style.height = targetHeight + 'px';
                animImg.classList.add('centered');
            });
            const doExpand = () => {
                const maxScale = Math.min(vw / naturalW, vh / naturalH);
                const expandWidth = Math.round(naturalW * maxScale);
                const expandHeight = Math.round(naturalH * maxScale);
                const expandLeft = Math.round((vw - expandWidth) / 2);
                const expandTop = Math.round((vh - expandHeight) / 2);
                backdrop.classList.add('dimmed');
                animImg.classList.add('expanded');
                requestAnimationFrame(() => {
                    animImg.style.left = expandLeft + 'px';
                    animImg.style.top = expandTop + 'px';
                    animImg.style.width = expandWidth + 'px';
                    animImg.style.height = expandHeight + 'px';
                });
            };
            const expandTimeout = setTimeout(() => doExpand(), 700);
            function cleanup() {
                clearTimeout(expandTimeout);
                animImg.remove();
                backdrop.remove();
                document.removeEventListener('keydown', onKey);
            }
            function closeSequence() {
                const centeredLeft = (vw - targetWidth) / 2;
                const centeredTop = (vh - targetHeight) / 2;
                animImg.classList.remove('expanded');
                animImg.style.left = centeredLeft + 'px';
                animImg.style.top = centeredTop + 'px';
                animImg.style.width = targetWidth + 'px';
                animImg.style.height = targetHeight + 'px';
                backdrop.classList.remove('dimmed');
                setTimeout(() => {
                    if (originRect) {
                        animImg.style.left = originRect.left + 'px';
                        animImg.style.top = originRect.top + 'px';
                        animImg.style.width = originRect.width + 'px';
                        animImg.style.height = originRect.height + 'px';
                    }
                    setTimeout(() => cleanup(), 480);
                }, 420);
            }
            const onKey = (e) => { if (e.key === 'Escape') closeSequence(); };
            document.addEventListener('keydown', onKey);
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) closeSequence();
            });
            const closeBtn = document.createElement('button');
            closeBtn.className = 'work-image-close';
            closeBtn.type = 'button';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close image');
            backdrop.appendChild(closeBtn);
            closeBtn.addEventListener('click', closeSequence);
            animImg.addEventListener('dblclick', closeSequence);
        };
        if (animImg.complete && animImg.naturalWidth) {
            onImgReady();
        } else {
            animImg.onload = onImgReady;
            setTimeout(() => { if (!animImg.naturalWidth) onImgReady(); }, 800);
        }
        function cleanup() {
            clearTimeout(expandTimeout);
            animImg.remove();
            backdrop.remove();
            document.removeEventListener('keydown', onKey);
        }
        function closeSequence() {
            const origin = originRect;
            const centeredLeft = (vw - targetWidth) / 2;
            const centeredTop = (vh - targetHeight) / 2;
            animImg.classList.remove('expanded');
            animImg.style.left = centeredLeft + 'px';
            animImg.style.top = centeredTop + 'px';
            animImg.style.width = targetWidth + 'px';
            animImg.style.height = targetHeight + 'px';
            backdrop.classList.remove('dimmed');
            setTimeout(() => {
                if (origin) {
                    animImg.style.left = origin.left + 'px';
                    animImg.style.top = origin.top + 'px';
                    animImg.style.width = origin.width + 'px';
                    animImg.style.height = origin.height + 'px';
                }
                setTimeout(() => cleanup(), 480);
            }, 420);
        }
        const onKey = (e) => { if (e.key === 'Escape') closeSequence(); };
        document.addEventListener('keydown', onKey);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeSequence();
        });
        animImg.addEventListener('dblclick', closeSequence);
    }

    document.querySelectorAll('.card.work').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // if card has data-href, open it in a new tab
            const href = card.getAttribute('data-href');
            const overlaySrc = card.getAttribute('data-overlay-src');
            if (href) {
                // respect modifier keys
                if (e.metaKey || e.ctrlKey) {
                    window.open(href, '_blank');
                } else {
                    // open in same tab
                    window.open(href, '_blank', 'noopener');
                }
                return;
            }
            if (overlaySrc) {
                createImageOverlay(overlaySrc, card.querySelector('h3') ? card.querySelector('h3').textContent : '');
            }
        });
    });
});

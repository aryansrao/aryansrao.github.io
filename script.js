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
                // Try primary hero selector, fallback to work-hero. If neither exists, skip parallax.
                const hero = document.querySelector('.hero') || document.querySelector('.work-hero');
                if (!hero) { ticking = false; return; }

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

    // Tech Modal: data and handlers
    const techItems = [
        { id: 'python', name: 'Python', desc: 'High-level programming language known for simplicity and readability.', usage: 'When I need rapid prototyping, data analysis, or building ML/AI applications.', icon: 'https://cdn.simpleicons.org/python/FFFFFF' },
        { id: 'javascript', name: 'JavaScript', desc: 'Versatile programming language for web development.', usage: 'For all web development projects requiring interactivity and dynamic content.', icon: 'https://cdn.simpleicons.org/javascript/FFFFFF' },
        { id: 'nodejs', name: 'Node.js', desc: 'JavaScript runtime for server-side development.', usage: 'When building scalable backend services and real-time applications.', icon: 'https://cdn.simpleicons.org/nodedotjs/FFFFFF' },
        { id: 'react', name: 'React', desc: 'Component-driven UI library for building user interfaces.', usage: 'For complex, interactive web applications that need reusable UI components.', icon: 'https://cdn.simpleicons.org/react/FFFFFF' },
        { id: 'java', name: 'Java', desc: 'Object-oriented programming language for enterprise applications.', usage: 'For Android development and when enterprise-grade reliability is required.', icon: 'https://cdn.simpleicons.org/java/FFFFFF' },
        { id: 'cplusplus', name: 'C++', desc: 'High-performance systems programming language.', usage: 'When maximum performance and low-level control are critical requirements.', icon: 'https://cdn.simpleicons.org/cplusplus/FFFFFF' },
        { id: 'rust', name: 'Rust', desc: 'Systems programming language focused on safety and speed.', usage: 'For system-level programming where memory safety and performance matter most.', icon: 'https://cdn.simpleicons.org/rust/FFFFFF' },
        { id: 'c', name: 'C', desc: 'Low-level programming language for system programming.', usage: 'When working with embedded systems or when direct hardware control is needed.', icon: 'https://cdn.simpleicons.org/c/FFFFFF' },
        { id: 'html', name: 'HTML', desc: 'Standard markup language for creating web pages.', usage: 'The foundation of every web project I build.', icon: 'https://cdn.simpleicons.org/html5/FFFFFF' },
        { id: 'css', name: 'CSS', desc: 'Style sheet language for describing presentation of web documents.', usage: 'For creating beautiful, responsive, and accessible user interfaces.', icon: 'https://cdn.simpleicons.org/css/FFFFFF' },
        { id: 'arduino', name: 'Arduino', desc: 'Open-source electronics platform for prototyping.', usage: 'When exploring IoT projects and hardware prototyping.', icon: 'https://cdn.simpleicons.org/arduino/FFFFFF' },
        { id: 'git', name: 'Git', desc: 'Distributed version control system.', usage: 'Essential for all software development projects to track changes and collaborate.', icon: 'https://cdn.simpleicons.org/git/FFFFFF' },
        { id: 'nextjs', name: 'Next.js', desc: 'React framework for production web applications.', usage: 'For full-stack React applications needing SSR, SSG, or advanced routing.', icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
        { id: 'threejs', name: 'Three.js', desc: 'WebGL library for 3D in the browser.', usage: 'When adding interactive 3D visualizations and immersive web experiences.', icon: 'https://cdn.simpleicons.org/threedotjs/FFFFFF' },
        { id: 'figma', name: 'Figma', desc: 'Collaborative interface design tool.', usage: 'For designing user interfaces and creating design systems.', icon: 'https://cdn.simpleicons.org/figma/FFFFFF' },
        { id: 'blender', name: 'Blender', desc: 'Free and open-source 3D creation suite.', usage: 'When creating 3D models, animations, or visual effects for projects.', icon: 'https://cdn.simpleicons.org/blender/FFFFFF' },
        { id: 'adobe', name: 'Adobe Creative Suite', desc: 'Professional design and multimedia software suite.', usage: 'For advanced graphic design, video editing, and creative content production.', icon: 'https://cdn.simpleicons.org/adobe/FFFFFF' },
        { id: 'androidstudio', name: 'Android Studio', desc: 'Official IDE for Android application development.', usage: 'Whenever developing native Android applications.', icon: 'https://cdn.simpleicons.org/androidstudio/FFFFFF' },
        { id: 'xcode', name: 'Xcode', desc: 'Integrated development environment for macOS.', usage: 'For iOS and macOS application development.', icon: 'https://cdn.simpleicons.org/xcode/FFFFFF' },
        { id: 'firebase', name: 'Firebase', desc: 'Platform for building web and mobile applications.', usage: 'For quick backend setup, authentication, and real-time features.', icon: 'https://cdn.simpleicons.org/firebase/FFFFFF' },
        { id: 'mongodb', name: 'MongoDB', desc: 'NoSQL document database for modern applications.', usage: 'When flexible, schema-less data storage is needed for modern applications.', icon: 'https://cdn.simpleicons.org/mongodb/FFFFFF' },
        { id: 'supabase', name: 'Supabase', desc: 'Open-source Firebase alternative.', usage: 'For open-source backend solutions with real-time capabilities.', icon: 'https://cdn.simpleicons.org/supabase/FFFFFF' },
        { id: 'mysql', name: 'MySQL', desc: 'Popular open-source relational database.', usage: 'For traditional relational data storage and complex queries.', icon: 'https://cdn.simpleicons.org/mysql/FFFFFF' },
        { id: 'postgresql', name: 'PostgreSQL', desc: 'Advanced open-source relational database.', usage: 'When advanced SQL features and data integrity are crucial.', icon: 'https://cdn.simpleicons.org/postgresql/FFFFFF' },
        { id: 'cloudinary', name: 'Cloudinary', desc: 'Cloud-based image and video management platform.', usage: 'For efficient media storage, optimization, and delivery in web applications.', icon: 'https://cdn.simpleicons.org/cloudinary/FFFFFF' }
    ];

    const modal = document.getElementById('tech-modal');
    const modalContent = document.getElementById('tech-modal-content');
    const openBtn = document.querySelector('.tools-view-all');
    const closeBtn = modal ? modal.querySelector('.tech-modal-close') : null;

    function buildTechCards() {
        if (!modalContent) return;
        modalContent.innerHTML = '';
        techItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'tech-card';
            el.innerHTML = `<img src="${item.icon}" alt="${item.name} icon" style="width: 48px; height: 48px; margin-bottom: 0.5rem;"><h4>${item.name}</h4><p><strong>${item.desc}</strong><br>${item.usage}</p>`;
            modalContent.appendChild(el);
        });
    }

    function openModal() {
        if (!modal) return;
        buildTechCards();
        modal.setAttribute('aria-hidden', 'false');
        // move focus to close button
        setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 20);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (openBtn) openBtn.focus();
    }

    if (openBtn) openBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    // click on backdrop to close
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target && e.target.hasAttribute('data-close')) closeModal();
    });
    // ESC to close
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

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

        // Ensure variables are shared across helpers
        let expandTimeout = null;
        let naturalW = 0, naturalH = 0;
        let vw = window.innerWidth, vh = window.innerHeight;
        let targetWidth = 0, targetHeight = 0, targetLeft = 0, targetTop = 0;

        // Set initial rect (either origin or small centered box)
        if (originRect) {
            animImg.style.left = originRect.left + 'px';
            animImg.style.top = originRect.top + 'px';
            animImg.style.width = originRect.width + 'px';
            animImg.style.height = originRect.height + 'px';
        } else {
            const startW = 100, startH = 100;
            animImg.style.left = (vw / 2 - startW / 2) + 'px';
            animImg.style.top = (vh / 2 - startH / 2) + 'px';
            animImg.style.width = startW + 'px';
            animImg.style.height = startH + 'px';
        }

        const cleanup = () => {
            if (expandTimeout) clearTimeout(expandTimeout);
            backdrop.remove();
            animImg.remove();
            document.removeEventListener('keydown', onKey);
            backdrop.removeEventListener('click', onBackdropClick);
            animImg.removeEventListener('dblclick', onDblClick);
        };

        const closeSequence = () => {
            // compute centered small target for reversing
            vw = window.innerWidth; vh = window.innerHeight;
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
        };

        const onKey = (e) => { if (e.key === 'Escape') closeSequence(); };
        const onBackdropClick = (e) => { if (e.target === backdrop) closeSequence(); };
        const onDblClick = () => closeSequence();

        const onImgReady = () => {
            naturalW = animImg.naturalWidth || animImg.width || 600;
            naturalH = animImg.naturalHeight || animImg.height || 400;
            vw = window.innerWidth; vh = window.innerHeight;

            // initial target (centered modest size) before expansion
            targetWidth = originRect ? originRect.width : Math.min(600, Math.round(vw * 0.6));
            targetHeight = originRect ? originRect.height : Math.min(400, Math.round(vh * 0.6));
            targetLeft = Math.round((vw - targetWidth) / 2);
            targetTop = Math.round((vh - targetHeight) / 2);

            // move to centered target first
            requestAnimationFrame(() => {
                animImg.style.left = targetLeft + 'px';
                animImg.style.top = targetTop + 'px';
                animImg.style.width = targetWidth + 'px';
                animImg.style.height = targetHeight + 'px';
                animImg.classList.add('centered');
            });

            const doExpand = () => {
                vw = window.innerWidth; vh = window.innerHeight;
                const maxScale = Math.min(vw / naturalW, vh / naturalH, 1);
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

            expandTimeout = setTimeout(doExpand, 700);

            // wire up listeners
            document.addEventListener('keydown', onKey);
            backdrop.addEventListener('click', onBackdropClick);
            animImg.addEventListener('dblclick', onDblClick);

            // close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'work-image-close';
            closeBtn.type = 'button';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close image');
            backdrop.appendChild(closeBtn);
            closeBtn.addEventListener('click', closeSequence);
        };

        // start
        if (animImg.complete && animImg.naturalWidth) {
            onImgReady();
        } else {
            animImg.onload = onImgReady;
            // safety: if image doesn't load quickly, still proceed
            setTimeout(() => { if (!animImg.naturalWidth) onImgReady(); }, 800);
        }
    }

    document.querySelectorAll('.card.work').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // If this card is intentionally configured as a plain Three.js card (no-hover-overlay),
            // skip the image overlay behavior entirely.
            if (card.classList.contains('no-hover-overlay')) return;

            // if card has data-href, open it in a new tab
            const href = card.getAttribute('data-href');
            let overlaySrc = card.getAttribute('data-overlay-src');
            const imgEl = card.querySelector('img');

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

            // Fallback: if no explicit overlay src, use the card image src so clicking the card still opens the overlay
            if (!overlaySrc && imgEl) {
                overlaySrc = imgEl.getAttribute('src') || imgEl.src;
            }

            if (overlaySrc) {
                const titleEl = card.querySelector('h3');
                const altText = titleEl ? titleEl.textContent : (imgEl ? imgEl.alt : '');
                try {
                    console.debug('[work-click] overlaySrc:', overlaySrc, 'imgEl:', imgEl, 'alt:', altText);
                    createImageOverlay(overlaySrc, altText, imgEl);
                } catch (err) {
                    console.error('[work-click] createImageOverlay error:', err);
                }
            }
        });
    });
});

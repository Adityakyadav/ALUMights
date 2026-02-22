/* ============================================
   ALUMights — Utility Functions
   ============================================ */

const Utils = {
    /**
     * Generate initials from a name
     */
    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    },

    /**
     * Show a toast notification
     */
    showToast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${message}`;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    },

    /**
     * Time ago string
     */
    timeAgo(dateStr) {
        const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 }
        ];
        for (const i of intervals) {
            const count = Math.floor(seconds / i.seconds);
            if (count >= 1) return count === 1 ? `1 ${i.label} ago` : `${count} ${i.label}s ago`;
        }
        return 'just now';
    },

    /**
     * Format date to readable string
     */
    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    },

    /**
     * Generate a unique ID
     */
    uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Render the navbar HTML - reused across all pages
     */
    renderNavbar(activePage = '') {
        const user = Auth.getCurrentUser();
        const isLoggedIn = !!user;

        const navLinks = [
            { href: 'index.html', icon: 'fa-house', label: 'Home', id: 'home' },
            { href: 'directory.html', icon: 'fa-users', label: 'Directory', id: 'directory' },
            { href: 'events.html', icon: 'fa-calendar-days', label: 'Events', id: 'events' },
        ];

        const linksHTML = navLinks.map(l =>
            `<a href="${l.href}" class="${activePage === l.id ? 'active' : ''}" id="nav-${l.id}">
                <i class="fa-solid ${l.icon}"></i>
                <span>${l.label}</span>
            </a>`
        ).join('');

        const userHTML = isLoggedIn
            ? `<div class="user-dropdown">
                    <div class="nav-avatar" id="user-avatar-btn" title="${Utils.escapeHTML(user.fullName)}">${Utils.getInitials(user.fullName)}</div>
                    <div class="dropdown-menu" id="user-dropdown">
                        <div style="padding: 8px 12px; border-bottom: 1px solid var(--clr-border); margin-bottom: 4px;">
                            <div style="font-weight: 600; color: var(--clr-text-heading); font-size: 0.9rem;">${Utils.escapeHTML(user.fullName)}</div>
                            <div style="font-size: 0.75rem; color: var(--clr-text-dim);">@${Utils.escapeHTML(user.username)}</div>
                        </div>
                        <a href="profile.html"><i class="fa-solid fa-user"></i> My Profile</a>
                        <a href="directory.html"><i class="fa-solid fa-address-book"></i> Alumni Directory</a>
                        <div class="dropdown-divider"></div>
                        <button onclick="Auth.logout()"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</button>
                    </div>
                </div>`
            : `<div class="nav-auth-links">
                    <a href="login.html" class="btn btn-ghost">Sign In</a>
                    <a href="register.html" class="btn btn-primary btn-sm">Join Now</a>
                </div>`;

        return `
        <nav class="navbar">
            <div class="container">
                <a href="index.html" class="nav-brand">
                    <img src="images/logoHome.jpeg" alt="ALUMights Logo">
                    <span>ALUMights</span>
                </a>
                <div class="nav-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search alumni, colleges, events..." id="global-search">
                </div>
                <div class="nav-links">
                    ${linksHTML}
                </div>
                <div class="nav-user">
                    ${userHTML}
                </div>
            </div>
        </nav>`;
    },

    /**
     * Render the footer HTML
     */
    renderFooter() {
        return `
        <footer class="site-footer">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.html" class="nav-brand" style="margin-bottom: 4px;">
                        <img src="images/logoHome.jpeg" alt="ALUMights" style="height:32px; border-radius:4px;">
                        <span style="font-family:var(--ff-display); font-weight:700; font-size:1.25rem; font-style:italic; color:var(--clr-accent);">ALUMights</span>
                    </a>
                    <p>Connecting alumni across colleges and generations. Build your professional network, share experiences, and give back to your alma mater.</p>
                </div>
                <div class="footer-col">
                    <h4>Platform</h4>
                    <a href="index.html">Home Feed</a>
                    <a href="directory.html">Alumni Directory</a>
                    <a href="events.html">Events</a>
                    <a href="profile.html">My Profile</a>
                </div>
                <div class="footer-col">
                    <h4>Resources</h4>
                    <a href="#">Career Portal</a>
                    <a href="#">Mentorship Program</a>
                    <a href="#">Donation & Giving</a>
                    <a href="#">Help Center</a>
                </div>
                <div class="footer-col">
                    <h4>Connect</h4>
                    <a href="#">Contact Us</a>
                    <a href="#">Feedback</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; 2026 ALUMights — Team ARKKY. Smart India Hackathon.</span>
                <div class="footer-social">
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
        </footer>`;
    },

    /**
     * Initialize navbar and footer on the page
     */
    initPage(activePage = '') {
        // Insert navbar
        const navTarget = document.getElementById('navbar-mount');
        if (navTarget) navTarget.innerHTML = this.renderNavbar(activePage);

        // Insert footer
        const footTarget = document.getElementById('footer-mount');
        if (footTarget) footTarget.innerHTML = this.renderFooter();

        // Setup dropdown toggle
        const avatarBtn = document.getElementById('user-avatar-btn');
        const dropdown = document.getElementById('user-dropdown');
        if (avatarBtn && dropdown) {
            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
            document.addEventListener('click', () => dropdown.classList.remove('show'));
        }

        // Global search
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    window.location.href = `directory.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                }
            });
        }
    }
};

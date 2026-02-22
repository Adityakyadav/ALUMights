/* ============================================
   ALUMights — Authentication Module
   ============================================ */

const Auth = {
    STORAGE_KEY: 'alumights_users',
    SESSION_KEY: 'alumights_session',

    /**
     * Get all registered users
     */
    getUsers() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    /**
     * Save users array
     */
    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    /**
     * Register a new user
     * Returns { success, message }
     */
    register(data) {
        const { username, fullName, email, password, college, course, gradYear, bio } = data;

        // Validation
        if (!username || !fullName || !email || !password) {
            return { success: false, message: 'Please fill all required fields.' };
        }

        if (username.length < 3) {
            return { success: false, message: 'Username must be at least 3 characters.' };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters.' };
        }

        const users = this.getUsers();

        // Check for duplicates
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: 'Username already taken.' };
        }

        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'Email already registered.' };
        }

        // Create user
        const user = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            username: username.trim(),
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password: password, // In a real app, this would be hashed
            college: (college || '').trim(),
            course: (course || '').trim(),
            gradYear: gradYear || '',
            bio: (bio || '').trim(),
            joinedAt: new Date().toISOString(),
            connections: 0
        };

        users.push(user);
        this.saveUsers(users);

        return { success: true, message: 'Registration successful! Please log in.' };
    },

    /**
     * Log in a user
     * Returns { success, message }
     */
    login(username, password) {
        if (!username || !password) {
            return { success: false, message: 'Please enter both username and password.' };
        }

        const users = this.getUsers();
        const user = users.find(u =>
            (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase())
            && u.password === password
        );

        if (!user) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // Save session
        const session = { ...user };
        delete session.password;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return { success: true, message: 'Login successful!' };
    },

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Update current user profile
     */
    updateProfile(updates) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not logged in.' };

        const users = this.getUsers();
        const idx = users.findIndex(u => u.id === currentUser.id);
        if (idx === -1) return { success: false, message: 'User not found.' };

        // Apply updates (only allowed fields)
        const allowed = ['fullName', 'college', 'course', 'gradYear', 'bio'];
        for (const key of allowed) {
            if (updates[key] !== undefined) {
                users[idx][key] = updates[key];
            }
        }

        this.saveUsers(users);

        // Update session
        const session = { ...users[idx] };
        delete session.password;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return { success: true, message: 'Profile updated!' };
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!this.getCurrentUser();
    },

    /**
     * Logout
     */
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'login.html';
    },

    /**
     * Require auth — redirects to login if not logged in
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    /**
     * Seed sample users if empty
     */
    seedSampleUsers() {
        if (this.getUsers().length > 0) return;

        const sampleUsers = [
            { id: 'u1', username: 'aditya_yadav', fullName: 'Aditya Kumar Yadav', email: 'aditya@example.com', password: 'demo123', college: 'University of Delhi', course: 'B.Tech CSE', gradYear: '2028', bio: 'Computer Science student passionate about web development and AI.', joinedAt: '2024-06-15T10:00:00Z', connections: 42 },
            { id: 'u2', username: 'nishtha_nalin', fullName: 'Nishtha Nalin', email: 'nishtha@example.com', password: 'demo123', college: 'University of Delhi', course: 'B.Tech IT', gradYear: '2027', bio: 'Passionate about social impact and technology. Intern at Muskurahat Foundation.', joinedAt: '2024-07-20T10:00:00Z', connections: 35 },
            { id: 'u3', username: 'rishi_dwakar', fullName: 'Rishi Dwakar', email: 'rishi@example.com', password: 'demo123', college: 'MMMUT Gorakhpur', course: 'B.Tech IT', gradYear: '2028', bio: 'Tech enthusiast and problem solver. Love building innovative solutions.', joinedAt: '2024-08-10T10:00:00Z', connections: 28 },
            { id: 'u4', username: 'priya_sharma', fullName: 'Priya Sharma', email: 'priya@example.com', password: 'demo123', college: 'IIT Delhi', course: 'M.Tech AI', gradYear: '2025', bio: 'AI/ML researcher. Published multiple papers on deep learning architectures.', joinedAt: '2023-09-01T10:00:00Z', connections: 67 },
            { id: 'u5', username: 'rahul_verma', fullName: 'Rahul Verma', email: 'rahul@example.com', password: 'demo123', college: 'NSUT Delhi', course: 'B.Tech ECE', gradYear: '2026', bio: 'Electronics enthusiast turned full-stack developer. Open source contributor.', joinedAt: '2024-01-15T10:00:00Z', connections: 53 },
            { id: 'u6', username: 'sneha_gupta', fullName: 'Sneha Gupta', email: 'sneha@example.com', password: 'demo123', college: 'DTU Delhi', course: 'B.Tech CSE', gradYear: '2024', bio: 'Software Engineer at Google. DTU Gold Medalist 2024.', joinedAt: '2022-08-20T10:00:00Z', connections: 120 },
            { id: 'u7', username: 'arjun_patel', fullName: 'Arjun Patel', email: 'arjun@example.com', password: 'demo123', college: 'BITS Pilani', course: 'M.Sc. Physics', gradYear: '2023', bio: 'Quantum computing researcher at IBM. BITS alumnus.', joinedAt: '2021-06-10T10:00:00Z', connections: 89 },
            { id: 'u8', username: 'kavya_reddy', fullName: 'Kavya Reddy', email: 'kavya@example.com', password: 'demo123', college: 'NIT Trichy', course: 'B.Tech Mechanical', gradYear: '2025', bio: 'Mechanical engineer with a passion for sustainable energy solutions.', joinedAt: '2023-07-05T10:00:00Z', connections: 44 }
        ];

        this.saveUsers(sampleUsers);
    }
};

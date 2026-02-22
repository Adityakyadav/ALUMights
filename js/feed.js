/* ============================================
   ALUMights — Feed Module
   ============================================ */

const Feed = {
    STORAGE_KEY: 'alumights_posts',

    /**
     * Get all posts
     */
    getPosts() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    /**
     * Save posts
     */
    savePosts(posts) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
    },

    /**
     * Create a new post
     */
    createPost(content, imageUrl = '') {
        const user = Auth.getCurrentUser();
        if (!user) return null;

        const post = {
            id: Utils.uid(),
            authorId: user.id,
            authorName: user.fullName,
            authorUsername: user.username,
            authorCollege: user.college,
            content: content.trim(),
            imageUrl: imageUrl.trim(),
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        const posts = this.getPosts();
        posts.unshift(post);
        this.savePosts(posts);
        return post;
    },

    /**
     * Toggle like on a post
     */
    toggleLike(postId) {
        const user = Auth.getCurrentUser();
        if (!user) return false;

        const posts = this.getPosts();
        const post = posts.find(p => p.id === postId);
        if (!post) return false;

        const likeIdx = post.likes.indexOf(user.id);
        if (likeIdx > -1) {
            post.likes.splice(likeIdx, 1);
        } else {
            post.likes.push(user.id);
        }

        this.savePosts(posts);
        return true;
    },

    /**
     * Add a comment to a post
     */
    addComment(postId, text) {
        const user = Auth.getCurrentUser();
        if (!user || !text.trim()) return false;

        const posts = this.getPosts();
        const post = posts.find(p => p.id === postId);
        if (!post) return false;

        post.comments.push({
            id: Utils.uid(),
            authorId: user.id,
            authorName: user.fullName,
            text: text.trim(),
            createdAt: new Date().toISOString()
        });

        this.savePosts(posts);
        return true;
    },

    /**
     * Render a single post card
     */
    renderPost(post) {
        const user = Auth.getCurrentUser();
        const isLiked = user && post.likes.includes(user.id);
        const initials = Utils.getInitials(post.authorName);

        const imageHTML = post.imageUrl
            ? `<div class="post-image"><img src="${Utils.escapeHTML(post.imageUrl)}" alt="Post image" onerror="this.parentElement.style.display='none'"></div>`
            : '';

        const commentsHTML = post.comments.length > 0
            ? `<div class="post-comments">
                ${post.comments.slice(-3).map(c => `
                    <div class="comment">
                        <div class="avatar" style="width:28px;height:28px;font-size:0.65rem;">${Utils.getInitials(c.authorName)}</div>
                        <div class="comment-body">
                            <strong>${Utils.escapeHTML(c.authorName)}</strong>
                            <span>${Utils.escapeHTML(c.text)}</span>
                        </div>
                    </div>
                `).join('')}
               </div>`
            : '';

        return `
        <article class="post-card glass animate-in" data-post-id="${post.id}">
            <div class="post-header">
                <div class="avatar">${initials}</div>
                <div class="post-meta">
                    <h3 class="post-author">${Utils.escapeHTML(post.authorName)}</h3>
                    <span class="post-info">${Utils.escapeHTML(post.authorCollege || '')} · ${Utils.timeAgo(post.createdAt)}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${Utils.escapeHTML(post.content)}</p>
            </div>
            ${imageHTML}
            <div class="post-stats">
                <span>${post.likes.length} like${post.likes.length !== 1 ? 's' : ''}</span>
                <span>${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="post-actions">
                <button class="post-action-btn like-btn ${isLiked ? 'liked' : ''}" onclick="handleLike('${post.id}')">
                    <i class="fa-${isLiked ? 'solid' : 'regular'} fa-thumbs-up"></i>
                    <span>${isLiked ? 'Liked' : 'Like'}</span>
                </button>
                <button class="post-action-btn comment-toggle-btn" onclick="toggleCommentInput('${post.id}')">
                    <i class="fa-regular fa-comment"></i>
                    <span>Comment</span>
                </button>
            </div>
            ${commentsHTML}
            <div class="comment-input-section" id="comment-section-${post.id}" style="display:none;">
                <div class="comment-input-row">
                    <input type="text" class="form-control" placeholder="Write a comment..." id="comment-input-${post.id}" onkeydown="if(event.key==='Enter') handleComment('${post.id}')">
                    <button class="btn btn-primary btn-sm" onclick="handleComment('${post.id}')">Post</button>
                </div>
            </div>
        </article>`;
    },

    /**
     * Seed sample posts if none exist
     */
    seedSamplePosts() {
        if (this.getPosts().length > 0) return;

        const posts = [
            {
                id: 'p1', authorId: 'u1', authorName: 'Aditya Kumar Yadav', authorUsername: 'aditya_yadav',
                authorCollege: 'University of Delhi',
                content: "I'm happy to share that I've started my Bachelor of Technology - BTech in Computer Science and Engineering at University of Delhi (DU)! Excited to begin this new chapter and connect with fellow students and alumni. 🎓",
                imageUrl: '', likes: ['u2', 'u3', 'u4', 'u5'], comments: [
                    { id: 'c1', authorId: 'u2', authorName: 'Nishtha Nalin', text: 'Congratulations Aditya! Wishing you the best!', createdAt: '2024-07-10T12:00:00Z' }
                ], createdAt: '2024-07-08T10:00:00Z'
            },
            {
                id: 'p2', authorId: 'u2', authorName: 'Nishtha Nalin', authorUsername: 'nishtha_nalin',
                authorCollege: 'University of Delhi',
                content: "I'm delighted to announce that I've completed my internship with the Muskurahat Foundation! This incredible experience has not only expanded my knowledge but also equipped me with practical skills to tackle real-world challenges. Grateful for the mentorship and support! 🌟",
                imageUrl: '', likes: ['u1', 'u3', 'u6'], comments: [
                    { id: 'c2', authorId: 'u1', authorName: 'Aditya Kumar Yadav', text: 'Amazing work Nishtha! 🎉', createdAt: '2024-08-15T14:00:00Z' },
                    { id: 'c3', authorId: 'u6', authorName: 'Sneha Gupta', text: 'Great initiative. Keep growing!', createdAt: '2024-08-16T09:00:00Z' }
                ], createdAt: '2024-08-14T10:00:00Z'
            },
            {
                id: 'p3', authorId: 'u3', authorName: 'Rishi Dwakar', authorUsername: 'rishi_dwakar',
                authorCollege: 'MMMUT Gorakhpur',
                content: "I am thrilled to announce that I've officially embarked on an incredible new adventure — B.Tech in Information Technology at the prestigious Madan Mohan Malaviya University of Technology, Gorakhpur! Looking forward to the learning journey ahead. 🚀",
                imageUrl: '', likes: ['u1', 'u2', 'u4', 'u5', 'u7'], comments: [], createdAt: '2024-09-01T10:00:00Z'
            },
            {
                id: 'p4', authorId: 'u6', authorName: 'Sneha Gupta', authorUsername: 'sneha_gupta',
                authorCollege: 'DTU Delhi',
                content: "Thrilled to share that I've joined Google as a Software Engineer! The journey from DTU to Mountain View has been incredible. Special thanks to all my professors and fellow alumni who guided me. If you're preparing for tech interviews, feel free to reach out — happy to help! 💻",
                imageUrl: '', likes: ['u1', 'u2', 'u3', 'u4', 'u5', 'u7', 'u8'], comments: [
                    { id: 'c4', authorId: 'u4', authorName: 'Priya Sharma', text: 'So proud of you Sneha! DTU represent! 🎯', createdAt: '2024-09-10T10:00:00Z' },
                    { id: 'c5', authorId: 'u5', authorName: 'Rahul Verma', text: 'Absolute inspiration! Can I DM you for some tips?', createdAt: '2024-09-10T11:00:00Z' }
                ], createdAt: '2024-09-08T10:00:00Z'
            },
            {
                id: 'p5', authorId: 'u7', authorName: 'Arjun Patel', authorUsername: 'arjun_patel',
                authorCollege: 'BITS Pilani',
                content: "Just published my research paper on 'Quantum Error Correction using Topological Codes' in Nature Physics! This has been years of hard work at IBM Research. Grateful to my mentors at BITS who sparked my curiosity in quantum mechanics. The alumni network has been a great support system throughout. 🔬",
                imageUrl: '', likes: ['u4', 'u5', 'u6', 'u8'], comments: [
                    { id: 'c6', authorId: 'u4', authorName: 'Priya Sharma', text: 'Groundbreaking work Arjun! Would love to collaborate.', createdAt: '2024-10-05T15:00:00Z' }
                ], createdAt: '2024-10-02T10:00:00Z'
            },
            {
                id: 'p6', authorId: 'u4', authorName: 'Priya Sharma', authorUsername: 'priya_sharma',
                authorCollege: 'IIT Delhi',
                content: "Excited to announce that our lab at IIT Delhi has received a ₹2 Crore grant for our AI for Healthcare project! We're building ML models to detect early-stage diseases from medical imaging. Looking for talented alumni who want to contribute to this mission. 🏥🤖",
                imageUrl: '', likes: ['u1', 'u2', 'u3', 'u5', 'u6', 'u7', 'u8'], comments: [], createdAt: '2024-11-15T10:00:00Z'
            }
        ];

        this.savePosts(posts);
    }
};

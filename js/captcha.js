/* ============================================
   ALUMights — Captcha Module (Enhanced)
   ============================================ */

const Captcha = {
    currentCode: '',

    /**
     * Generate a random captcha string
     */
    generate(length = 5) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.currentCode = code;
        return code;
    },

    /**
     * Render captcha into a container element
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const code = this.generate();
        container.innerHTML = '';

        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 50;
        canvas.style.borderRadius = '8px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';

        const ctx = canvas.getContext('2d');

        // Background
        const grad = ctx.createLinearGradient(0, 0, 200, 50);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 200, 50);

        // Noise lines
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 200, Math.random() * 50);
            ctx.lineTo(Math.random() * 200, Math.random() * 50);
            ctx.strokeStyle = `rgba(${100 + Math.random() * 100}, ${100 + Math.random() * 100}, ${200 + Math.random() * 55}, 0.3)`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Noise dots
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(148, 163, 184, ${Math.random() * 0.3})`;
            ctx.fillRect(Math.random() * 200, Math.random() * 50, 2, 2);
        }

        // Draw characters
        const colors = ['#3b82f6', '#06b6d4', '#60a5fa', '#6366f1', '#22d3ee', '#818cf8'];
        for (let i = 0; i < code.length; i++) {
            ctx.save();
            ctx.font = `${22 + Math.random() * 8}px monospace`;
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.translate(30 + i * 32, 30 + Math.random() * 10);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(code[i], 0, 0);
            ctx.restore();
        }

        container.appendChild(canvas);
    },

    /**
     * Validate user input against captcha
     */
    validate(input) {
        return input === this.currentCode;
    }
};

const ticket = document.querySelector(".ticket");

if (ticket) {
    ticket.addEventListener("contextmenu", e => {
        e.preventDefault();
    });

    ticket.addEventListener("dragstart", e => {
        e.preventDefault();
    });
}

const canvases = document.querySelectorAll(".scratch");

canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");

    let scratching = false;
    let scratchCount = 0;
    let hasNavigated = false;

    function drawScratchSurface() {
        canvas.style.background = "transparent";

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#f2f2f2");
        gradient.addColorStop(0.45, "#bdbdbd");
        gradient.addColorStop(1, "#8b8b8b");

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Silver speckles
        for (let i = 0; i < 300; i++) {
            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        // Label text
ctx.save();

const label = canvas.dataset.label || "";

const fontSize = canvas.width * 0.12;

ctx.globalCompositeOperation = "source-over";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `bold ${fontSize}px Arial`;

ctx.fillStyle = "rgba(45,45,45,0.75)";
ctx.strokeStyle = "rgba(255,255,255,0.55)";
ctx.lineWidth = 2;

ctx.strokeText(
    label,
    canvas.width / 2,
    canvas.height / 2
);

ctx.fillText(
    label,
    canvas.width / 2,
    canvas.height / 2
);

ctx.restore();

    function goToPage() {
        if (hasNavigated) return;

        hasNavigated = true;

        const link = canvas.dataset.link;

        canvas.style.transition = "opacity 0.25s ease";
        canvas.style.opacity = "0";

        setTimeout(() => {
            if (link) {
                window.location.href = link;
            }
        }, 350);
    }

    function scratchAt(x, y) {
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();

        scratchCount++;

        if (scratchCount >= 8) {
            goToPage();
        }
    }

    drawScratchSurface();

    window.addEventListener("resize", drawScratchSurface);

    canvas.addEventListener("mousedown", e => {
        scratching = true;

        const rect = canvas.getBoundingClientRect();

        scratchAt(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    });

    window.addEventListener("mouseup", () => {
        scratching = false;
    });

    canvas.addEventListener("mousemove", e => {
        if (!scratching) return;

        const rect = canvas.getBoundingClientRect();

        scratchAt(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    });

    canvas.addEventListener("touchstart", e => {
        scratching = true;

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        scratchAt(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );
    });

    canvas.addEventListener("touchmove", e => {
        if (!scratching) return;

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        scratchAt(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
        scratching = false;
    });
});

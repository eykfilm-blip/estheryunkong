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

    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    const width = rect.width;
    const height = rect.height;

    const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
    );

    gradient.addColorStop(0, "#eeeeee");
    gradient.addColorStop(0.5, "#cfcfcf");
    gradient.addColorStop(1, "#aaaaaa");

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Label text only
    ctx.save();

    const label = canvas.dataset.label || "";
    const lines = label.split(" ");

    const fontSize = width * 0.2;
    const lineHeight = fontSize * 1.05;

    ctx.globalCompositeOperation = "source-over";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${fontSize}px Arial`;

    ctx.fillStyle = "rgba(15,15,15,0.95)";

    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;

        ctx.fillText(
            line,
            width / 2,
            y
        );
    });

    ctx.restore();
}

        // Label text only
        ctx.save();

        const label = canvas.dataset.label || "";

const lines = label.split(" ");
const fontSize = canvas.width * 0.18;
const lineHeight = fontSize * 1.05;

ctx.globalCompositeOperation = "source-over";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `900 ${fontSize}px Arial`;

ctx.fillStyle = "rgba(20,20,20,0.95)";
ctx.strokeStyle = "rgba(255,255,255,0.9)";
ctx.lineWidth = 3;

const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

lines.forEach((line, index) => {
    const y = startY + index * lineHeight;

    ctx.strokeText(
        line,
        canvas.width / 2,
        y
    );

    ctx.fillText(
        line,
        canvas.width / 2,
        y
    );
});

        ctx.restore();
    }

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

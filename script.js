const ticket = document.querySelector(".ticket");

if (ticket) {
    ticket.addEventListener("contextmenu", e => {
        e.preventDefault();
    });

    ticket.addEventListener("dragstart", e => {
        e.preventDefault();
    });
}

const links = {
    about: "films/",
    works: "about/",
    cv: "reel/"
};

const canvases = document.querySelectorAll(".scratch");

canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");
    let scratching = false;
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

        // Scratch text
        ctx.save();

        let lineOne = "SCRATCH";
        let lineTwo = "TO REVEAL";

        if (canvas.classList.contains("about")) {
            lineTwo = "TO FILMS";
        }

        if (canvas.classList.contains("works")) {
            lineTwo = "TO ABOUT";
        }

        if (canvas.classList.contains("cv")) {
            lineTwo = "TO REEL";
        }

        const fontSize = canvas.width * 0.11;

        ctx.globalCompositeOperation = "source-over";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `bold ${fontSize}px Arial`;

        ctx.fillStyle = "rgba(45,45,45,0.75)";
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 2;

        ctx.strokeText(
            lineOne,
            canvas.width / 2,
            canvas.height / 2 - fontSize * 0.45
        );

        ctx.fillText(
            lineOne,
            canvas.width / 2,
            canvas.height / 2 - fontSize * 0.45
        );

        ctx.strokeText(
            lineTwo,
            canvas.width / 2,
            canvas.height / 2 + fontSize * 0.65
        );

        ctx.fillText(
            lineTwo,
            canvas.width / 2,
            canvas.height / 2 + fontSize * 0.65
        );

        ctx.restore();
    }

    function scratchAt(x, y) {
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();

        checkRevealAmount();
    }

    function getScratchLink() {
        if (canvas.classList.contains("about")) {
            return links.about;
        }

        if (canvas.classList.contains("works")) {
            return links.works;
        }

        if (canvas.classList.contains("cv")) {
            return links.cv;
        }

        return null;
    }

    function checkRevealAmount() {
        if (hasNavigated) return;

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const pixels = imageData.data;
        let clearPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                clearPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const revealedAmount = clearPixels / totalPixels;

        if (revealedAmount > 0.45) {
            hasNavigated = true;

            canvas.style.transition = "opacity 0.3s ease";
            canvas.style.opacity = "0";

            const link = getScratchLink();

            setTimeout(() => {
                if (link) {
                    window.location.href = link;
                }
            }, 350);
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
});

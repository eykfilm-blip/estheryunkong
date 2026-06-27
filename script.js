const canvases = document.querySelectorAll(".scratch");

canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");

    function drawScratchSurface(){
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
        for(let i = 0; i < 300; i++){
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

        // Visible scratch text
        ctx.save();

        ctx.globalCompositeOperation = "source-over";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const fontSize = canvas.width * 0.12;
        ctx.font = `bold ${fontSize}px Arial`;

        ctx.fillStyle = "rgba(45,45,45,0.75)";
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = 2;

        ctx.strokeText(
            "SCRATCH",
            canvas.width / 2,
            canvas.height / 2 - fontSize * 0.45
        );

        ctx.fillText(
            "SCRATCH",
            canvas.width / 2,
            canvas.height / 2 - fontSize * 0.45
        );

        ctx.strokeText(
            "TO REVEAL",
            canvas.width / 2,
            canvas.height / 2 + fontSize * 0.65
        );

        ctx.fillText(
            "TO REVEAL",
            canvas.width / 2,
            canvas.height / 2 + fontSize * 0.65
        );

        ctx.restore();
    }

    drawScratchSurface();

    window.addEventListener("resize", drawScratchSurface);

    let scratching = false;

    function scratchAt(x, y){
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener("mousedown", () => {
        scratching = true;
    });

    window.addEventListener("mouseup", () => {
        scratching = false;
    });

    canvas.addEventListener("mousemove", e => {
        if(!scratching) return;

        const rect = canvas.getBoundingClientRect();

        scratchAt(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    });
});

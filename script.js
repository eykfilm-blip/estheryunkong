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

        gradient.addColorStop(0,"#f2f2f2");
        gradient.addColorStop(.45,"#bdbdbd");
        gradient.addColorStop(1,"#8b8b8b");

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Silver speckles
        for(let i = 0; i < 300; i++){

            ctx.fillStyle = "rgba(255,255,255,.18)";
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

        // Faint text
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#555";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `bold ${canvas.width * 0.13}px Arial`;

        ctx.fillText(
            "SCRATCH",
            canvas.width / 2,
            canvas.height / 2 - canvas.height * 0.08
        );

        ctx.fillText(
            "TO REVEAL",
            canvas.width / 2,
            canvas.height / 2 + canvas.height * 0.10
        );

        ctx.globalAlpha = 1;
    }

    drawScratchSurface();

    window.addEventListener("resize", drawScratchSurface);

    let scratching = false;

    canvas.addEventListener("mousedown", () => {
        scratching = true;
    });

    window.addEventListener("mouseup", () => {
        scratching = false;
    });

    canvas.addEventListener("mousemove", (e) => {

        if(!scratching) return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

    });

});

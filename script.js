const canvases = document.querySelectorAll(".scratch");

canvases.forEach(canvas => {

    const ctx = canvas.getContext("2d");

    function resizeCanvas(){

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Silver coating
        const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
        gradient.addColorStop(0,"#efefef");
        gradient.addColorStop(.5,"#bdbdbd");
        gradient.addColorStop(1,"#8b8b8b");

        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Speckles
        for(let i=0;i<250;i++){

            ctx.fillStyle="rgba(255,255,255,.15)";

            ctx.beginPath();

            ctx.arc(
                Math.random()*canvas.width,
                Math.random()*canvas.height,
                Math.random()*2,
                0,
                Math.PI*2
            );

            ctx.fill();
        }
    }

    resizeCanvas();

    window.addEventListener("resize",resizeCanvas);

    let scratching=false;

    canvas.addEventListener("mousedown",()=> scratching=true);
    window.addEventListener("mouseup",()=> scratching=false);

    canvas.addEventListener("mousemove",(e)=>{

        if(!scratching) return;

        const rect=canvas.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        ctx.globalCompositeOperation="destination-out";

        ctx.beginPath();
        ctx.arc(x,y,22,0,Math.PI*2);
        ctx.fill();
    });

});

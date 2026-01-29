(() => {
  const card = document.getElementById("card");

  const maxTilt = 10; 
  let raf = null;

  function onMove(e) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * maxTilt;
    const tiltY = (x - 0.5) * maxTilt;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(0)`;
    });
  }

  function resetTilt() {
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  }

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", resetTilt);


  card.addEventListener("click", (e) => {
    const spark = document.createElement("span");
    spark.className = "spark";
    const rect = card.getBoundingClientRect();
    spark.style.left = (e.clientX - rect.left) + "px";
    spark.style.top = (e.clientY - rect.top) + "px";
    card.appendChild(spark);
    setTimeout(() => spark.remove(), 500);
  });

  const style = document.createElement("style");
  style.textContent = `
    .shake{ animation: shake .16s linear 1; }
    @keyframes shake{
      0%{ transform: perspective(900px) translateX(0) translateY(0); }
      25%{ transform: perspective(900px) translateX(1px) translateY(-1px); }
      50%{ transform: perspective(900px) translateX(-1px) translateY(1px); }
      75%{ transform: perspective(900px) translateX(1px) translateY(1px); }
      100%{ transform: perspective(900px) translateX(0) translateY(0); }
    }
    .spark{
      position:absolute;
      width:10px;height:10px;
      border-radius:50%;
      background: rgba(255,0,51,.95);
      box-shadow: 0 0 18px rgba(255,0,51,.7), 0 0 50px rgba(255,0,51,.25);
      transform: translate(-50%, -50%);
      pointer-events:none;
      animation: pop .5s ease-out forwards;
    }
    @keyframes pop{
      0%{ opacity:1; transform: translate(-50%,-50%) scale(1); }
      100%{ opacity:0; transform: translate(-50%,-50%) scale(4); }
    }
  `;
  document.head.appendChild(style);
})();

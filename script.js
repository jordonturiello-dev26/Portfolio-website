document.addEventListener("DOMContentLoaded", () => {
    const text = "Hey World, I'm Jordon!";
    const speed = 120;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
         }
    }
    typeWriter();
});
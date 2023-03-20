document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("solar-system");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let scale = 1;
  let panX = 0;
  let panY = 0;

  class Planet {
    constructor(name, size, x, y, color, funFact) {
      this.name = name;
      this.size = size;
      this.x = x;
      this.y = y;
      this.color = color;
      this.funFact = funFact;
    }

    draw() {
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	  ctx.fillStyle = this.color;
	  ctx.fill();
	  ctx.closePath();

	  const fontSize = 14 / scale;
	  const funFactFontSize = 12 / scale;
	  const alpha = Math.min(1, 8 / fontSize);

	  ctx.font = `${fontSize}px 'Roboto Mono'`;
	  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
	  ctx.fillText(this.name, this.x + this.size + 5, this.y - this.size);

	  ctx.font = `${funFactFontSize}px 'Roboto Mono'`;
	  ctx.fillStyle = `rgba(204, 204, 204, ${alpha})`;
	  ctx.fillText(this.funFact, this.x + this.size + 5, this.y - this.size + 20);
	}
  }

  // Constants for distances in the solar system
  const AU = 1000; // Astronomical Units in pixels

  const planets = [
    new Planet("Sun", 109, canvas.width / 2, canvas.height / 2, "#ffd700", "The center of our solar system"),
    new Planet("Mercury", 0.38, canvas.width / 2 + 0.39 * AU, canvas.height / 2, "#8a817c", "Smallest planet in the solar system"),
    new Planet("Venus", 0.95, canvas.width / 2 + 0.72 * AU, canvas.height / 2, "#c18e4e", "Hottest planet in the solar system"),
    new Planet("Earth", 1, canvas.width / 2 + 1 * AU, canvas.height / 2, "#1f75fe", "Only known planet with life"),
    new Planet("Mars", 0.53, canvas.width / 2 + 1.52 * AU, canvas.height / 2, "#d9664a", "The Red Planet"),
    new Planet("Jupiter", 11.2, canvas.width / 2 + 5.20 * AU, canvas.height / 2, "#e6b06d", "Largest planet in the solar system"),
    new Planet("Saturn", 9.4, canvas.width / 2 + 9.58 * AU, canvas.height / 2, "#eac36e", "Known for its beautiful rings"),
    new Planet("Uranus", 4, canvas.width / 2 + 19.18 * AU, canvas.height / 2, "#8eb6e6", "Coldest planet in the solar system"),
    new Planet("Neptune", 3.9, canvas.width / 2 + 30.07 * AU, canvas.height / 2, "#2b63c2", "The windiest planet in the solar system"),
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
	ctx.translate(panX, panY);
    ctx.scale(scale, scale);

    planets.forEach((planet) => {
      planet.draw();
    });

    ctx.restore();

    requestAnimationFrame(draw);
  }

  draw();

  canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const scaleFactor = 1.1;
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  const worldMouseX = (cursorX - panX) / scale;
  const worldMouseY = (cursorY - panY) / scale;

  if (e.deltaY < 0) {
    scale *= scaleFactor;
  } else {
    scale /= scaleFactor;
  }

  panX = cursorX - worldMouseX * scale;
  panY = cursorY - worldMouseY * scale;
});




  let isPanning = false;
  let startX, startY;

  canvas.addEventListener("mousedown", (e) => {
    isPanning = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    panX += dx;
    panY += dy;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    isPanning = false;
  });

  canvas.addEventListener("mouseout", (e) => {
    isPanning = false;
  });
});


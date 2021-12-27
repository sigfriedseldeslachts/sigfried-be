const dots = [];
let canvas = null;
let ctx = null;
let start = 0;
let initalized = false;

const generateDot = () => {
  const dot = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    direction: Math.random() * Math.PI * 2,
    radius: Math.random() * 5,
    color: `rgba(255, 255, 255, 0.25)`
  };
  dots.push(dot);
};

const setupCanvas = (cvs) => {
  canvas = cvs;
  ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (initalized) {
    return;
  }

  // Set a listener for resize events
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let amount = 100;

  // If is a mobile device, only generate 50 dots
  if (window.innerWidth < 500) {
    amount = 50;
  }

  // If is a large screen, generate 100 dots
  if (window.innerWidth > 1500) {
    amount = 200;
  }

  // Generated x amount of dots
  for (let i = 0; i < amount; i++) {
    generateDot();
  }

  initalized = true;

  animate(0);
}

const drawDot = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    drawDot(ctx, dot.x, dot.y, dot.radius, dot.color);

    // Move the dot
    dot.x += Math.cos(dot.direction) * 0.5;
    dot.y += Math.sin(dot.direction) * 0.5;

    // Draw lines between dots
    for (let j = 0; j < dots.length; j++) {
      if (i == j) {
        continue;
      }

      // Get the distance between the dots
      const distance = Math.sqrt(Math.pow(dot.x - dots[j].x, 2) + Math.pow(dot.y - dots[j].y, 2));

      // If the distance is too far away, skip
      if (distance > 200) {
        continue;
      }

      // Calculate the opacity of the line
      const opacity = 1 - distance / 100;

      const otherDot = dots[j];
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(otherDot.x, otherDot.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
      ctx.stroke();
    }

    // If the dot is outside the canvas, change direction
    if ((dot.x < 0 || dot.x > canvas.width) || (dot.y < 0 || dot.y > canvas.height)) {
      dot.direction = Math.random() * Math.PI * 2;
    }
  }
}

const animate = (timestamp) => {
  const elapsed = timestamp - start;

  if (elapsed > 30) {
    start = timestamp;
    tick();
  }

  requestAnimationFrame(animate);
}

export {
  setupCanvas
}

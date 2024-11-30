const lines = [];
let amount = 250;
let canvas = null, ctx = null;
let initalized = false, stopped = false, rainbow = false;
let frameTime = 0.33, frameTimeThisLoop, lastLoop;

/**
 * Create a new random line
 * @param {Boolean} createOffset if it should create an offset so that it doesn't create a line straight away
 */
const generateLine = (createOffset = false) => {
  const r = 10;
  const deg = Math.random() * Math.PI * 2;
  const x = (canvas.width / 2) + (r * Math.cos(deg));
  const y = (canvas.height / 2) + (r * Math.sin(deg));

  // Angle is a straight line from the center of the circle
  const angle = Math.atan2(y - (canvas.height / 2), x - (canvas.width / 2));

  // Get a line width between 0.1 and 1.3 based on the speed of the line
  const width = Math.random() * 1.3 + 0.1;

  const line = {
    x, y, angle, width,
    length: 0,
    maxLength: Math.floor(Math.random() * (100 - 10)) + 10,
    speed: Math.random() * (170 - 15) + 15,
    color: createRandomColor(),
    offset: createOffset ? (Math.random() * (0.5 - 0.1) + 0.1) : 0, // So that the lines don't start at the same time in the beginning
  };

  lines.push(line);
};

/**
 * Creates a random color
 * @returns {String} a random color in rgba format
 */
const createRandomColor = () => {
  const a = Math.random();

  if (rainbow) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  return `rgba(255, 255, 255, ${a})`;
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

    // Clear the lines
    lines.length = 0;

    // Generate new lines
    for (let i = 0; i < amount; i++) {
      generateLine(true);
    }
  });

  // Generate lines
  for (let i = 0; i < amount; i++) {
    generateLine(true);
  }

  initalized = true;
  startAnimation();
}

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];

    if (line.offset > 0) {
      line.offset -= 0.02;
      continue;
    }

    const speed = 1 * line.speed * (frameTime / 1000);

    // Move the line
    line.x += Math.cos(line.angle) * speed;
    line.y += Math.sin(line.angle) * speed;

    // Grow the line until it reaches the max length
    if (line.length < line.maxLength) {
      line.length += 0.5;
    }

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + Math.cos(line.angle) * line.length, line.y + Math.sin(line.angle) * line.length);
    ctx.lineWidth = line.width;
    ctx.strokeStyle = line.color;
    ctx.stroke();

    // Check if the line is outside the canvas
    if (line.x < 0 || line.x > canvas.width || line.y < 0 || line.y > canvas.height) {
      lines.splice(i, 1);
      generateLine();
    }
  }

  const thisFrameTime = (frameTimeThisLoop = performance.now()) - lastLoop;
  frameTime += (thisFrameTime - frameTime) / 20;
  lastLoop = frameTimeThisLoop;
}

const animate = (timestamp) => {
  if (stopped) {
    return;
  }

  tick();

  requestAnimationFrame(animate);
}

const startAnimation = (canvas) => {
  if (!initalized) {
    return;
  }

  stopped = false;
  lastLoop = performance.now();

  requestAnimationFrame(animate);
}

const stopAnimation = () => {
  stopped = true;
}

const startRainbow = () => {
  rainbow = true;

  // Change the color of the lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].color = createRandomColor();
  }
}

let input = '';
window.addEventListener('load', function () {
  setupCanvas(document.getElementById('canvaslines'));
});

window.addEventListener('keypress', function (e) {
  const key = e.key.toLowerCase();

  // Check if the pressed key is the next one in the rainbow
  if (key === 'rainbow'.charAt(input.length)) {
    input += key;
  } else {
    input = '';
  }

  // Check if user typed "rainbow"
  if (input === 'rainbow') {
    startRainbow();
    input = '';
  }
});
const lines = [];
let amount = 250;
let canvas = null;
let ctx = null;
let start = 0;
let initalized = false;
let stopped = false;
let started = false;

const generateLine = () => {
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
    speed: Math.random() * 5 + 0.2,
    color: `rgb(255, 255, 255, ${Math.random()})`,
    flipped: false,
  };


  lines.push(line);
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
      generateLine();
    }
  });

  // Generate lines
  for (let i = 0; i < amount; i++) {
    generateLine();
  }

  initalized = true;
  stopped = false;
}

/**
 * Draws the line
 * @param line
 */
const drawLine = (line) => {
  ctx.beginPath();
  ctx.moveTo(line.x, line.y);
  ctx.lineTo(line.x + Math.cos(line.angle) * line.length, line.y + Math.sin(line.angle) * line.length);
  ctx.strokeStyle = line.color;
  ctx.lineWidth = line.width;
  ctx.stroke();
}

/**
 * Tick function
 * This is used normally to update the lines
 */
const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];

    // Move the line
    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;

    // Grow the line until it reaches the max length
    if (line.length < line.maxLength) {
      line.length += 0.5;
    }

    drawLine(line);

    // Check if the line is outside the canvas
    if (line.x < 0 || line.x > canvas.width || line.y < 0 || line.y > canvas.height) {
      lines.splice(i, 1);
      generateLine();
    }
  }
}

/**
 * Tick function for animation exit
 * This is used when leaving the page
 */
const tickExit = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];

    // Rotate the line 180 degrees if it's not flipped
    if (!line.flipped) {
      line.angle += Math.PI;
      line.flipped = true;
    }

    // Check if x or y are outside the canvas, if so keep decreasing the line length
    if (line.x < 0 || line.x > canvas.width || line.y < 0 || line.y > canvas.height) {
      line.length -= 0.5 * 60;
    } else {
      // Save the old x and y
      const oldX = line.x;
      const oldY = line.y;

      // Move the line
      line.x -= Math.cos(line.angle) * 60;
      line.y -= Math.sin(line.angle) * 60;

      // Get the distance between the old and new position
      const dx = oldX - line.x;
      const dy = oldY - line.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Add this distance to the line length
      line.length += distance;
    }

    // Draw line in the opposite direction
    drawLine(line);

    if (line.length <= 0) {
      lines.splice(i, 1);
    }
  }
}

const animate = (timestamp) => {
  if (stopped) {
    tickExit();
    requestAnimationFrame(animateExit);
    return;
  }

  if ((timestamp - start) > 30) {
    start = timestamp;
    tick();
  }

  requestAnimationFrame(animate);
}

const animateExit = (timestamp) => {
  if (lines.length <= 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  if ((timestamp - start) > 30) {
    start = timestamp;
    tickExit();
  }

  requestAnimationFrame(animateExit);
}

const startAnimation = () => {
  if (!initalized || started) {
    return;
  }

  // If there are no lines, generate some
  if (lines.length <= 0) {
    for (let i = 0; i < amount; i++) {
      generateLine();
    }
  }

  stopped = false;
  started = true;

  requestAnimationFrame(animate);
}

const stopAnimation = () => {
  stopped = true;
  started = false;
}

export {
  setupCanvas, startAnimation, stopAnimation
}

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let drawing = false;
  let currentColor = '#000000';
  let eraseMode = false;
  const brushSize = 10;

  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    if (eraseMode) {
      ctx.clearRect(
        e.offsetX - brushSize / 2,
        e.offsetY - brushSize / 2,
        brushSize,
        brushSize
      );
    } else {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => (drawing = false));
  canvas.addEventListener('mouseleave', () => (drawing = false));

  document.getElementById('colorPalette').addEventListener('click', (e) => {
    if (e.target.dataset.color) {
      currentColor = e.target.dataset.color;
      eraseMode = false;
    }
  });

  document.getElementById('customColor').addEventListener('input', (e) => {
    currentColor = e.target.value;
    eraseMode = false;
  });

  document.getElementById('eraseButton').addEventListener('click', () => {
    eraseMode = !eraseMode;
    if (eraseMode) {
      currentColor = '#FFFFFF';
      document.getElementById('eraseButton').classList.add('active');
    } else {
      document.getElementById('eraseButton').classList.remove('active');
    }
  });

  $('#clear').click(() => ctx.clearRect(0, 0, canvas.width, canvas.height));

  const saveButton = document.getElementById('saveButton');
  console.log(saveButton);

  saveButton.addEventListener('click', () => {
    console.log('Save clicked');
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

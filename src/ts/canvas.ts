export const canvas = document.createElement('canvas');
canvas.width = 2000;
canvas.height = 2000;

export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const preDrawBorder = (ctx: CanvasRenderingContext2D) => {
  // ctx.fillStyle = '#222222';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(100, 250, canvas.width - 200, canvas.height - 500);
};

export const addTextToCanvas = (i: number, text: string) => {
  ctx.fillStyle = '#00ff00';
  ctx.font = '30px monospace';
  const padding = 120;
  ctx.fillText(text, padding, 300 + (i * 30));
};

export const addText = (text: string) => {
  ctx.fillStyle = '#00ff00';
  ctx.font = '30px monospace';
  const padding = 100;
  ctx.fillText(text, padding, 400);
};

preDrawBorder(ctx);

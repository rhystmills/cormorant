export const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 800;

export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export const preDrawBorder = (ctx: CanvasRenderingContext2D) => {
  // ctx.fillStyle = '#222222';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);
};

export const addTextToCanvas = (text: string, i: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.font = '24px Space Mono, monospace';
  const padding = 120;
  ctx.fillText(text, padding, padding + 20 + (i * 30));
};

export const addText = (text: string) => {
  ctx.fillStyle = '#00ff00';
  ctx.font = '24px Space Mono, monospace';
  const padding = 120;
  ctx.fillText(text, padding, padding + 20);
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// preDrawBorder(ctx);

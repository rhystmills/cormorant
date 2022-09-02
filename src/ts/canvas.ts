import { View } from './view';

export const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 800;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export const preDrawBorder = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);
};

export const addTextToCanvas = (text: string, i: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.font = 'expanded 24px "Spline Sans Mono"';
  const padding = 120;
  ctx.fillText(text, padding, padding + 20 + (i * 30));
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const redrawCanvas = (ctx: CanvasRenderingContext2D, view: View) => {
  clearCanvas(ctx);
  view.getText().forEach((textRow: string, i: number) => {
    let thisRowText = textRow;
    if (i === view.getCommandLineRow()) { thisRowText += '_'; }
    addTextToCanvas(thisRowText, i);
  });
};

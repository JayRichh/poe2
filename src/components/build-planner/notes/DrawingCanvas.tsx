import { useRef, useEffect, useState } from "react";
import { Undo, Redo, Download } from "lucide-react";
import { Button } from "~/components/ui/Button";

interface DrawingCanvasProps {
  className?: string;
}

interface DrawingState {
  lines: { points: number[]; color: string; width: number }[];
  isDrawing: boolean;
  history: { lines: { points: number[]; color: string; width: number }[] }[];
  currentStep: number;
}

export function DrawingCanvas({ className = "" }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [drawing, setDrawing] = useState<DrawingState>({
    lines: [],
    isDrawing: false,
    history: [],
    currentStep: -1
  });

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawing(prev => ({
      ...prev,
      lines: [...prev.lines, { points: [x, y], color: selectedColor, width: lineWidth }],
      isDrawing: true
    }));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const currentLine = drawing.lines[drawing.lines.length - 1];
    currentLine.points.push(x, y);

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = currentLine.color;
      ctx.lineWidth = currentLine.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const points = currentLine.points;
      const lastIndex = points.length - 4;
      if (lastIndex >= 0) {
        ctx.beginPath();
        ctx.moveTo(points[lastIndex], points[lastIndex + 1]);
        ctx.lineTo(points[lastIndex + 2], points[lastIndex + 3]);
        ctx.stroke();
      }
    }

    setDrawing(prev => ({ ...prev, lines: [...prev.lines] }));
  };

  const stopDrawing = () => {
    setDrawing(prev => {
      const newHistory = [...prev.history.slice(0, prev.currentStep + 1), { lines: [...prev.lines] }];
      return {
        ...prev,
        isDrawing: false,
        history: newHistory,
        currentStep: newHistory.length - 1
      };
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDrawing({
        lines: [],
        isDrawing: false,
        history: [],
        currentStep: -1
      });
    }
  };

  const undo = () => {
    if (drawing.currentStep > 0) {
      setDrawing(prev => ({
        ...prev,
        lines: [...prev.history[prev.currentStep - 1].lines],
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const redo = () => {
    if (drawing.currentStep < drawing.history.length - 1) {
      setDrawing(prev => ({
        ...prev,
        lines: [...prev.history[prev.currentStep + 1].lines],
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'build-diagram.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawing.lines.forEach(line => {
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const points = line.points;
      for (let i = 0; i < points.length - 2; i += 2) {
        ctx.beginPath();
        ctx.moveTo(points[i], points[i + 1]);
        ctx.lineTo(points[i + 2], points[i + 3]);
        ctx.stroke();
      }
    });
  }, [drawing.lines]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8"
          />
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={drawing.currentStep <= 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={drawing.currentStep >= drawing.history.length - 1}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCanvas}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[400px] border border-border/50 rounded-lg bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

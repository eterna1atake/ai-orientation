import { SkillRadarPoint } from "@/domain/usecases";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const WIDTH = 320;
const HEIGHT = 280;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const MAX_R = 95;
const LABEL_R = 118;
const RINGS = [0.25, 0.5, 0.75, 1];

function angleAt(index: number, total: number) {
  return (Math.PI * 2 * index) / total - Math.PI / 2;
}

function pointAt(index: number, total: number, valuePercent: number) {
  const angle = angleAt(index, total);
  const r = (valuePercent / 100) * MAX_R;
  return { x: CENTER_X + r * Math.cos(angle), y: CENTER_Y + r * Math.sin(angle), angle };
}

function pointAtRadius(index: number, total: number, radius: number) {
  const angle = angleAt(index, total);
  return { x: CENTER_X + radius * Math.cos(angle), y: CENTER_Y + radius * Math.sin(angle), angle };
}

function polygonPoints(data: SkillRadarPoint[], key: "current" | "required") {
  return data.map((d, i) => pointAt(i, data.length, d[key])).map((p) => `${p.x},${p.y}`).join(" ");
}

export function SkillRadarChart({ data }: { data: SkillRadarPoint[] }) {
  const total = data.length;
  if (total === 0) return null;

  return (
    <Card>
      <SectionHeader title="Skill Radar" description="Current level vs. the level each category requires" />

      <div className="mx-auto max-w-[360px]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={Array.from({ length: total }, (_, i) => {
                const p = pointAt(i, total, ring * 100);
                return `${p.x},${p.y}`;
              }).join(" ")}
              fill="none"
              className="stroke-slate-200"
              strokeWidth={1}
            />
          ))}

          {data.map((d, i) => {
            const outer = pointAt(i, total, 100);
            return (
              <line
                key={d.category}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={outer.x}
                y2={outer.y}
                className="stroke-slate-200"
                strokeWidth={1}
              />
            );
          })}

          <polygon
            points={polygonPoints(data, "required")}
            fill="none"
            className="stroke-slate-400"
            strokeWidth={2}
            strokeDasharray="4 3"
          />

          <polygon points={polygonPoints(data, "current")} className="fill-indigo-500/10 stroke-indigo-600" strokeWidth={2} />

          {data.map((d, i) => {
            const p = pointAt(i, total, d.current);
            return (
              <circle key={d.category} cx={p.x} cy={p.y} r={4} className="fill-indigo-600 stroke-white" strokeWidth={2}>
                <title>
                  {d.category}: {d.current} current
                </title>
              </circle>
            );
          })}

          {data.map((d, i) => {
            const label = pointAtRadius(i, total, LABEL_R);
            const cosAngle = Math.cos(label.angle);
            const anchor = cosAngle > 0.3 ? "start" : cosAngle < -0.3 ? "end" : "middle";
            return (
              <text
                key={d.category}
                x={label.x}
                y={label.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="fill-slate-500 text-[9px] font-medium"
              >
                {d.category}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Current Level
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0 w-4 border-t-2 border-dashed border-slate-400" /> Required Level
        </span>
      </div>
    </Card>
  );
}

import { IdCard, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { Student } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";

export function ProfileHeaderCard({ student }: { student: Student }) {
  return (
    <Card>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-semibold text-white">
          {student.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h2 className="text-xl font-bold text-slate-900">{student.fullName}</h2>
            <span className="text-sm text-slate-400">&quot;{student.nickname}&quot;</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {student.major} · Year {student.year} · {student.faculty}
          </p>
          <p className="text-xs text-slate-400">{student.university}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="indigo">
              <IdCard className="h-3 w-3" /> {student.studentId}
            </Badge>
            <Badge tone="blue">
              <Briefcase className="h-3 w-3" /> {student.targetJob}
            </Badge>
            <Badge tone="green">
              <GraduationCap className="h-3 w-3" /> GPA {student.gpa.toFixed(2)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Code2 className="h-3.5 w-3.5" /> Current Project
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{student.currentProject.name}</p>
        <p className="mt-1 text-sm text-slate-500">{student.currentProject.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {student.currentProject.techStack.map((tech) => (
            <Badge key={tech} tone="slate">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

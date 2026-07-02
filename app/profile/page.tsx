"use client";

import { useStudentProfile } from "@/presentation/hooks/useStudentProfile";
import { ProfileHeaderCard } from "@/presentation/components/profile/ProfileHeaderCard";
import { AssessmentSnapshotCard } from "@/presentation/components/profile/AssessmentSnapshotCard";
import { SkillRadarChart } from "@/presentation/components/profile/SkillRadarChart";
import { ActivityHeatmap } from "@/presentation/components/profile/ActivityHeatmap";
import { AcademicProgressWidget } from "@/presentation/components/analytics/AcademicProgressWidget";

export default function ProfilePage() {
  const { student, academicRecord, radarData, activityWeeks, isLoading } = useStudentProfile();

  if (isLoading || !student || !academicRecord) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Student Profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          A full picture of Boss&apos;s academic identity, skills, and study activity
        </p>
      </div>

      <ProfileHeaderCard student={student} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AssessmentSnapshotCard profile={student.assessmentProfile} />
        <SkillRadarChart data={radarData} />
      </div>

      <AcademicProgressWidget record={academicRecord} />

      <ActivityHeatmap weeks={activityWeeks} />
    </div>
  );
}

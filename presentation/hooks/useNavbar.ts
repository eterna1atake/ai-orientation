"use client";

import { useEffect, useState } from "react";
import { Student } from "@/domain/entities";
import { fetchStudentProfile } from "@/data/repositories";

export function useNavbar() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchStudentProfile().then((data) => {
      if (isMounted) setStudent(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { student };
}

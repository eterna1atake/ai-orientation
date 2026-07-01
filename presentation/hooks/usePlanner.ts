"use client";

import { useEffect, useState } from "react";
import { StudyBlock } from "@/domain/entities";
import { fetchStudyBlocks } from "@/data/repositories";
import { groupBlocksByDay, toggleStudyBlockCompletion } from "@/domain/usecases";

export function usePlanner() {
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchStudyBlocks().then((data) => {
      if (!isMounted) return;
      setStudyBlocks(data);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleToggleBlock(blockId: string) {
    setStudyBlocks((prev) => toggleStudyBlockCompletion(prev, blockId));
  }

  return {
    blocksByDay: groupBlocksByDay(studyBlocks),
    isLoading,
    toggleBlockCompletion: handleToggleBlock,
  };
}

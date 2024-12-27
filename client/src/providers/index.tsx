import { useDetailResume } from "@/services/resume/getResume";
import { useArtboardStore } from "@/store/resumeStore";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

export const Providers = () => {
  const { id } = useParams();
  const { resume, loading, error } = useDetailResume(Number(id));
  const setResume = useArtboardStore((state) => state.setResume);

  useEffect(() => {
    if (resume) {
      setResume(resume);
    }
  }, [resume, loading, error, setResume]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading resume. Please try again later.</p>;
  }

  if (!resume) {
    return <p>No resume found.</p>;
  }

  return <Outlet />;
};

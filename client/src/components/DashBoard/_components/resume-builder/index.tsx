import { ChangeEvent, FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { Link} from "react-router-dom";
import { useResumes } from "@/services/resume/getResume";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ResumeBuilder = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slug, setSlug] = useState<string | null>(null);

  const { resumes, loading } = useResumes();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*    if (resumeTitle) {
        const res = postResume(resumeTitle);
        res.then((res) => {
          if (res?.status) {
            navigate(`/builder/${res?.data?.id}`);
          }
        });
      } else {
        toast({ description: "El campo es obligatorio" });
      } */
  };

  const onchangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  return (
    <div className="flex px-5 py-5 flex-wrap items-center  gap-4">
      <Card
        onClick={() => setOpenDialog(true)}
        className="h-80 w-64 rounded-xl flex items-center justify-center text-5xl hover:shadow-xl hover:scale-[1.1] text-gray-400"
      >
        <span className="h-[90%] w-[90%] bg-gray-100 flex items-center justify-center rounded-xl cursor-pointer">
          +
        </span>
      </Card>

      <Dialog open={openDialog}>
        <DialogContent className="flex w-full justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <DialogHeader>
              <DialogTitle className="font-bold text-xl">
                New title a Resume
              </DialogTitle>
              <Input
                type="text"
                id="resume-title"
                title="Title Resume"
                onChange={onchangeEvent}
              />
            </DialogHeader>
            <DialogFooter className="flex gap-4">
              <Button variant={"secondary"} disabled={loading} type="submit">
                {loading ? <LoaderCircle className=" animate-spin" /> : "Save"}
              </Button>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {loading ? (
        <>
          <Skeleton className="h-80 w-64 rounded-xl" />
          <Skeleton className="h-80 w-64 rounded-xl" />
          <Skeleton className="h-80 w-64 rounded-xl" />
        </>
      ) : (
        resumes?.map((resume) => (
          <Link to={`/resume/builder/${resume.id}`} key={resume.userId}>
            <Card className="h-80 w-64 rounded-xl flex items-center justify-center text-5xl hover:shadow-xl hover:scale-[1.1] text-gray-400">
              <span
                className="h-[90%] w-[90%] bg-gray-100 flex items-end justify-center rounded-xl px-4 py-2
            text-lg
            cursor-pointer"
              >
                {resume.title}
              </span>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default ResumeBuilder;

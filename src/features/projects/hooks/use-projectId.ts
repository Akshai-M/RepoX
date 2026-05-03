import { useParams } from "next/navigation";

/** Project id segment from the URL when on a `/projects/[projectId]/…` route; empty string elsewhere. */
export const useProjectId = () => {
  const params = useParams();
  const raw = params?.projectId;
  return typeof raw === "string" && raw.length > 0 ? raw : "";
};

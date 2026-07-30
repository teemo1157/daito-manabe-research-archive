import archiveJson from "@/public/data/archive.json";
import { ArchiveApp } from "./archive/ArchiveApp";
import type { ArchiveData } from "./archive/types";

export default function Home() {
  return <ArchiveApp data={archiveJson as ArchiveData} />;
}

export type Language = "zh" | "en";
export type ViewMode = "grid" | "list";

export type SourceRecord = {
  id: string;
  title: string;
  url: string;
  source_type: string;
  authority: string;
  accessed_at: string;
};

export type ArtworkRecord = {
  id: string;
  title_original: string;
  title_translation: {
    value: string;
    method: string;
    status: string;
  };
  dates: {
    work_year: string;
    published_at: string | null;
    version_year: string | null;
  };
  record_type: string;
  medium: string[];
  materials_technology: string[];
  dimensions: string | null;
  venues: string[];
  description: string;
  mechanism: string;
  themes: string[];
  official_url: string;
  completeness: string;
  review_status: string;
  sources: SourceRecord[];
  image: {
    path: string;
    width: number;
    height: number;
    kind: string;
    credit: string;
    rights_status: string;
    source_page_url: string;
  } | null;
};

export type ArchiveData = {
  schema_version: number;
  generated_at: string;
  artist: {
    native_name: string;
    international_name: string;
    official_website: string;
  };
  research_boundary: {
    statement: string;
    accessed_at: string;
    primary_domains: string[];
  };
  counts: {
    artworks: number;
    images: number;
    sources: number;
  };
  artworks: ArtworkRecord[];
};

export type Filters = {
  time: string;
  medium: string;
  mechanism: string;
  input: string;
  version: string;
};

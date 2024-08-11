// types/project.ts
export interface Project {
    id: string;
    title: string;
    content: string;
    slug: string;
    createdAt: string;
    imageUrl: string | null;
    author: {
      username: string;
    };
  }
  
  export interface ProjectsResponse {
    projects: Project[];
    nextCursor: number | null;
    totalCount: number;
  }
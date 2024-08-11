"use client";

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { format } from 'date-fns';
import { useAxiosWithPrivy } from '@/lib/axiosWithToken';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import ProjectDetailsSkeleton from '@/components/loader/ProjectDetailsSkelton';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface ProjectDetails {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  imageUrl: string;
  createdAt: string;
  author: {
    username: string;
    avatarUrl: string;
  };
}

export default function ProjectDetailsPage() {
  const axiosInstance = useAxiosWithPrivy();
  const params = useParams();
  const slug = params.slug as string;

  const fetchProjectDetails = async (): Promise<ProjectDetails> => {
    if (!slug) throw new Error('Slug is undefined');
    const { data } = await axiosInstance.get(`/projects/${slug}`);
    return data;
  };

  const { data: project, isLoading, error } = useQuery<ProjectDetails, Error>({
    queryKey: ['project', slug],
    queryFn: fetchProjectDetails,
    enabled: !!slug,
  });

  if (isLoading) return <ProjectDetailsSkeleton />;
  if (error) return <div className="text-center text-red-500 mt-8">Error loading project: {error.message}</div>;
  if (!project) return <div className="text-center mt-8">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-[400px]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
            <Badge variant={project.published ? "default" : "secondary"} className="text-sm">
              {project.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-6 space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={project.author.avatarUrl} alt={project.author.username} />
              <AvatarFallback>{project.author.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold flex items-center">
                <UserIcon size={16} className="mr-2" />
                {project.author.username}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <CalendarIcon size={16} className="mr-2" />
                {format(new Date(project.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p>{project.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
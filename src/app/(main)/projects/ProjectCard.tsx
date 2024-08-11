import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    content: string;
    imageUrl: string | null;
    author: {
      username: string;
    };
    createdAt: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="w-full h-full flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <Image
          src={project.imageUrl || '/placeholder-image.jpg'}
          alt={project.title}
          width={400}
          height={225}
          className="w-full aspect-video object-cover rounded-t-md"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-2 line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="text-sm mb-2">
          By {project.author.username}
        </CardDescription>
        <p className="text-sm line-clamp-3">{project.content}</p>
      </CardContent>
      <CardFooter className="p-4 text-xs text-gray-500">
        <span>Created: {project.createdAt}</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
"use client";

import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import LoadingCardGrid from '@/components/LoadingCardGrid';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAxiosWithPrivy } from '@/lib/axiosWithToken';

interface Project {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  imageUrl: string | null;
  author: {
    username: string;
  };
  // Add other project properties as needed
}

interface ProjectsResponse {
  projects: Project[];
  nextCursor: number | null;
  totalCount: number;
}

type QueryKey = ['publicProjects'];

const PublicProjectsList: React.FC = () => {
  const axiosInstance = useAxiosWithPrivy();

  const fetchPublicProjects = useCallback(
    async ({ pageParam = 1 }: QueryFunctionContext<QueryKey, number>): Promise<ProjectsResponse> => {
      try {
        const { data } = await axiosInstance.get(`/projects/public?page=${pageParam}&limit=9`);
        return data;
      } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects. Please try again later.');
      }
    },
    [axiosInstance]
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ProjectsResponse, Error, InfiniteData<ProjectsResponse>, QueryKey, number>({
    queryKey: ['publicProjects'],
    queryFn: fetchPublicProjects,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useIntersectionObserver(observerRef, handleObserver);

  if (status === 'pending') return <LoadingCardGrid count={10} />;
  if (status === 'error') return <p>Error loading projects: {error.message}</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.projects.map((project: Project) => (
              <Link href={`/projects/${project.slug}`} key={project.id} passHref>
                <ProjectCard
                  project={{
                    title: project.title,
                    content: project.content,
                    imageUrl: project.imageUrl,
                    author: project.author,
                    createdAt: format(new Date(project.createdAt), 'PPP'),
                  }}
                />
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={observerRef} />
      {isFetchingNextPage && <LoadingCardGrid count={3} />}
    </div>
  );
};

export default PublicProjectsList;
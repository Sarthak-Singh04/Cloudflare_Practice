import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useAxiosWithPrivy } from "@/lib/axiosWithToken";
import { useToast } from "@/components/ui/use-toast";
import { usePrivy } from "@privy-io/react-auth";

interface Project {
  id: string;
  content: string;
  createdAt: string;
  // Add other project fields as needed
}

interface ProjectsPage {
  projects: Project[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export function useSubmitProjectMutation() {
  const axiosWithPrivy = useAxiosWithPrivy();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = usePrivy();

  return useMutation<Project, Error, string>({
    mutationFn: async (content: string) => {
      const response = await axiosWithPrivy.post<Project>('/projects/public', { content });
      console.log('API Response:', response.data);  // Log the response
      return response.data;
    },
    onSuccess: async (newProject) => {
      console.log('New Project:', newProject);  // Log the new project

      // Update the cache for the "for-you" feed
      queryClient.setQueryData<ProjectsPage | undefined>(
        ["project-feed", "for-you"],
        (oldData) => {
          if (!oldData) return undefined;
        
          return {
            ...oldData,
            projects: [newProject, ...oldData.projects],
          };
        }
      );

      // Update the cache for the user's projects feed
      if (user?.id) {
        queryClient.setQueryData<ProjectsPage | undefined>(
          ["project-feed", "user-projects", user.id],
          (oldData) => {
            if (!oldData) return undefined;
            return {
              ...oldData,
              projects: [newProject, ...oldData.projects],
            };
          }
        );
      }

      // Invalidate and refetch
      await queryClient.invalidateQueries([""]);

      toast({
        description: "Project created successfully",
      });
    },
    onError(error) {
      console.error('Mutation error:', error);
      toast({
        variant: "destructive",
        description: "Failed to create project. Please try again.",
      });
    },
  });
}
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ProjectWithUser {
    id: string;
    content: string;
    createdAt: Date;
    user: {
      privyUserId: string;
      email: string | null;
      appleEmail: string | null;
      googleEmail: string | null;
      twitterUsername: string | null;
      walletAddress: string | null;
    };
  }
  
  interface ProjectProps {
    project: ProjectWithUser;
  }
  
  export function Project({ project }: ProjectProps) {
    const displayName = project.user.twitterUsername || 
                        project.user.email || 
                        project.user.appleEmail || 
                        project.user.googleEmail || 
                        project.user.walletAddress || 
                        'Anonymous';
  
    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div className="ml-3">
                <Link href={displayName}>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{displayName}</p>
                </Link>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{project.content}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
          <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            Like
          </button>
          <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Comment
          </button>
          <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Share
          </button>
        </div>
      </article>
    );
  }
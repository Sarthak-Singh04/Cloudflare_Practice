"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { useSubmitProjectMutation } from './ProjectMutation';
import { useToast } from '@/components/ui/use-toast';

const ProjectEditor = () => {
  const { authenticated } = usePrivy();
  const submitProjectMutation = useSubmitProjectMutation();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's your project idea?",
      }),
    ],
    content: '<p></p>',
  });

  const input = editor?.getText() || "";

  async function onSubmit() {
    if (!input.trim() || !authenticated) return;

    try {
      await submitProjectMutation.mutateAsync(input);
      editor?.commands.clearContent();
      toast({
        description: "Project created successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to submit project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again.",
        duration: 3000,
      });
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Create a Project</h2>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
          </div>
          <div className="flex-grow">
            <EditorContent editor={editor} className="w-full min-h-[100px] p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={!input.trim() || submitProjectMutation.isPending || !authenticated}
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {submitProjectMutation.isPending ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectEditor;
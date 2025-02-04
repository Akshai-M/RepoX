"use client";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { useCreateProject } from "../api/use-create-project";
import { type CreateProjectSchema, createProjectSchema } from "../schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useCreateProject();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
      image: "",
      accessToken: "",
    },
  });
  const onSubmit = (values: CreateProjectSchema) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
      workspaceId,
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
        },
      }
    );
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="size-full border-none shadow-none sm:bg-slate-800">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create new project</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter project name"
                        className="border border-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <FormField
                  control={form.control}
                  name="accessToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        <div className="flex items-center">
                          Access Token{" "}
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="text-muted-foreground">
                                <Info size={16} className="ml-2" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-900 text-slate-100 max-w-sm flex place-content-center">
                              <p className="text-sm">
                                Access token is a unique identifier that allows
                                you to access your repo data. You can generate
                                an access token from your github account
                                settings.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-blue-400">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="underline">
                                Steps to generate personal access token
                              </button>
                            </DialogTrigger>
                            <DialogContent className="size-[400px] sm:size-[600px] overflow-y-auto">
                              <DialogTitle>
                                Steps to generate personal access token from
                                Github
                              </DialogTitle>
                              <DialogDescription>
                                <p className="text-lg">
                                  Step 1. Go to your Github account settings.
                                </p>
                                <Image
                                  src="/step1.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <br />
                                <p className="text-lg">
                                  Step 2. Scroll to the bottom and Click on
                                  &quot;Developer settings&quot;.
                                </p>
                                <Image
                                  src="/step2.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <br />
                                <p className="text-lg">
                                  Step 3. Click on &quot;Personal access
                                  tokens&quot;. Choose Tokens(Classic)
                                </p>
                                <Image
                                  src="/step3.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <br />
                                <p className="text-lg">
                                  Step 4. Click on &quot;Generate new
                                  token&quot;. Enter the required information.
                                </p>
                                <Image
                                  src="/step4.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <br />
                                <p className="text-lg">
                                  Step 5. Define the scopes as shown in the
                                  image below.
                                </p>
                                <Image
                                  src="/scope1.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <Image
                                  src="/scope2.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                                <Image
                                  src={"/scope3.png"}
                                  alt="github token"
                                  width={600}
                                  height={400}
                                />
                                <br />
                                <p className="text-lg">
                                  Step 6. Copy the generated token and paste it
                                  here.
                                </p>
                                <Image
                                  src="/step6.png"
                                  alt="Github Token"
                                  width={600}
                                  height={400}
                                />
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter access token"
                          className="border border-slate-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            fill
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Project Icon"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Project Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPEG, PNG, SVG, or JPEG, max 1 mb
                        </p>
                        <input
                          hidden
                          type="file"
                          ref={inputRef}
                          disabled={isPending}
                          onChange={handleImageChange}
                          accept=".jpg, .jpeg, .png, .svg"
                        />
                        {field.value ? (
                          <Button
                            size="sm"
                            type="button"
                            variant="destructive"
                            className="w-fit mt-2"
                            disabled={isPending}
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) inputRef.current.value = "";
                            }}
                          >
                            Remove Icon
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            type="button"
                            variant="secondary"
                            className="w-fit mt-2"
                            disabled={isPending}
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Icon
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button disabled={isPending} type="submit" size="lg">
                Create project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

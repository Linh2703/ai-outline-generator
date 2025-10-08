import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import heroImage from "@/assets/hero-outline.jpg";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters").max(200, "Topic must be less than 200 characters"),
  tone: z.string().optional(),
  audience: z.string().max(100, "Audience must be less than 100 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function HeroSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    console.log("Generating outline for:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Outline generated successfully!");
      // In a real implementation, this would call the AI API
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text & Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                Free Blog Outline Generator – Create Article Outlines in Seconds
              </h1>
              <p className="text-lg text-muted-foreground lg:text-xl">
                Easily generate structured blog outlines with AI, optimized for readability and SEO.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-xl shadow-card border">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="topic">Blog Topic / Keyword *</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Enter the main topic or keyword for your blog post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="topic"
                  placeholder="e.g., How to start a blog in 2024"
                  {...register("topic")}
                  className={errors.topic ? "border-destructive" : ""}
                />
                {errors.topic && (
                  <p className="text-sm text-destructive">{errors.topic.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="tone">Tone of Writing</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Choose the tone that fits your audience</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select onValueChange={(value) => setValue("tone", value)}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Describe your target readers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="audience"
                  placeholder="e.g., Beginner bloggers, entrepreneurs"
                  {...register("audience")}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full transition-smooth hover:shadow-card-hover"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Outline
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <img
              src={heroImage}
              alt="Blog outline generator illustration"
              className="rounded-2xl shadow-card-hover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

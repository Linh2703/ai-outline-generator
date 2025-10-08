import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Lightbulb, FileText } from "lucide-react";

const tools = [
  {
    icon: Search,
    name: "Keyword Research Tool",
    description: "Find the best keywords for your content",
  },
  {
    icon: Lightbulb,
    name: "Blog Title Generator",
    description: "Create catchy, SEO-friendly blog titles",
  },
  {
    icon: FileText,
    name: "Meta Description Generator",
    description: "Generate perfect meta descriptions",
  },
];

export default function MoreTools() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
            More Tools Like This
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our other free content creation tools
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-smooth border cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <Icon className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="transition-smooth">
            Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

import { FileText, Settings, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Enter blog topic",
    description: "Type in your blog topic or keyword to get started",
  },
  {
    icon: Settings,
    title: "Choose tone/format",
    description: "Optionally select your preferred tone and target audience",
  },
  {
    icon: Sparkles,
    title: "Click Generate",
    description: "Get your structured outline in seconds, ready to use",
  },
];

export default function HowToUse() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
            How to Use Outline Generator Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional blog outlines in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-smooth border"
              >
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center space-y-4 pt-2">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

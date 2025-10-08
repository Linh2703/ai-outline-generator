import { Zap, Search, Globe, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast: Generate in seconds",
    description: "Get your blog outline instantly with AI-powered generation",
  },
  {
    icon: Search,
    title: "SEO-friendly outlines",
    description: "Outlines optimized for search engines and readability",
  },
  {
    icon: Globe,
    title: "Works for any niche",
    description: "Create outlines for any topic or industry",
  },
  {
    icon: Palette,
    title: "Customizable tone & audience",
    description: "Tailor your outline to match your brand voice",
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
            Why Use Outline Generator Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you create better content faster
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-smooth border group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

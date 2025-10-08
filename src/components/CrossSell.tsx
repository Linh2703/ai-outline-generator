import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, FileText } from "lucide-react";

export default function CrossSell() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground rounded-2xl p-8 lg:p-12 shadow-card-hover">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Try Our Full App for More Features
              </h2>
              <p className="text-lg opacity-90">
                Unlock advanced AI content features with Pareto App. Generate complete articles, optimize for SEO, and manage your entire content workflow in one place.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Full article generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span>Advanced SEO optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span>Content management tools</span>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="transition-smooth hover:shadow-card-hover"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-64 h-64 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-32 h-32 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

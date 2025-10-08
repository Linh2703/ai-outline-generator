import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Pareto Deals</h3>
            <p className="text-sm text-muted-foreground">
              Free AI-powered tools to help you create better content faster.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">Outline Generator</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Title Generator</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Keyword Research</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">About</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} Pareto Deals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

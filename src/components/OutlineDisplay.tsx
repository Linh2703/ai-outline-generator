import { Button } from "@/components/ui/button";
import { Copy, Download, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OutlineSection {
  section: string;
  heading: string;
  key_points: string[];
  suggested_word_count: number;
}

interface OutlineData {
  title_options: string[];
  introduction: string;
  sections: OutlineSection[];
  conclusion: string;
  suggestions?: string[];
}

interface OutlineDisplayProps {
  outline: OutlineData;
}

export default function OutlineDisplay({ outline }: OutlineDisplayProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async () => {
    const text = formatOutlineAsText(outline);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Outline copied to clipboard!");
      setCopiedSection("all");
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      toast.error("Failed to copy outline");
    }
  };

  const downloadAsText = () => {
    const text = formatOutlineAsText(outline);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-outline.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Outline downloaded!");
  };

  const downloadAsDocx = () => {
    // For a real implementation, you'd use a library like docx
    // For now, we'll just download as a formatted text file
    const text = formatOutlineAsText(outline);
    const blob = new Blob([text], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-outline.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Outline downloaded as .doc!");
  };

  return (
    <div className="mt-8 space-y-6 bg-card rounded-xl p-6 shadow-card border">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Your Blog Outline
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="transition-smooth"
          >
            {copiedSection === "all" ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            Copy Outline
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsText}
            className="transition-smooth"
          >
            <Download className="mr-2 h-4 w-4" />
            Download .txt
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsDocx}
            className="transition-smooth"
          >
            <Download className="mr-2 h-4 w-4" />
            Download .doc
          </Button>
        </div>
      </div>

      {/* Title Options */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-primary">Title Options</h4>
        <ul className="space-y-2">
          {outline.title_options.map((title, index) => (
            <li
              key={index}
              className="p-3 bg-accent/50 rounded-lg border border-accent"
            >
              {index + 1}. {title}
            </li>
          ))}
        </ul>
      </div>

      {/* Introduction */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-primary">Introduction</h4>
        <p className="p-3 bg-muted rounded-lg">{outline.introduction}</p>
      </div>

      {/* Sections Table */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-primary">Main Sections</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-3 text-left rounded-tl-lg">Section</th>
                <th className="p-3 text-left">Heading</th>
                <th className="p-3 text-left">Key Points</th>
                <th className="p-3 text-left rounded-tr-lg">Word Count</th>
              </tr>
            </thead>
            <tbody>
              {outline.sections.map((section, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-muted/30" : "bg-card"
                  } hover:bg-accent/20 transition-smooth`}
                >
                  <td className="p-3 font-medium">{section.section}</td>
                  <td className="p-3">{section.heading}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1">
                      {section.key_points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-center">
                    {section.suggested_word_count} words
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusion */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-primary">Conclusion</h4>
        <p className="p-3 bg-muted rounded-lg">{outline.conclusion}</p>
      </div>

      {/* Suggestions */}
      {outline.suggestions && outline.suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-primary">Additional Suggestions</h4>
          <ul className="space-y-2">
            {outline.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-3 bg-secondary/20 rounded-lg border border-secondary/30"
              >
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function formatOutlineAsText(outline: OutlineData): string {
  let text = "BLOG OUTLINE\n\n";
  
  text += "TITLE OPTIONS:\n";
  outline.title_options.forEach((title, i) => {
    text += `${i + 1}. ${title}\n`;
  });
  
  text += "\n\nINTRODUCTION:\n";
  text += `${outline.introduction}\n`;
  
  text += "\n\nMAIN SECTIONS:\n\n";
  outline.sections.forEach((section) => {
    text += `${section.section}: ${section.heading}\n`;
    text += "Key Points:\n";
    section.key_points.forEach((point) => {
      text += `  • ${point}\n`;
    });
    text += `Suggested Word Count: ${section.suggested_word_count} words\n\n`;
  });
  
  text += "CONCLUSION:\n";
  text += `${outline.conclusion}\n`;
  
  if (outline.suggestions && outline.suggestions.length > 0) {
    text += "\n\nADDITIONAL SUGGESTIONS:\n";
    outline.suggestions.forEach((suggestion) => {
      text += `• ${suggestion}\n`;
    });
  }
  
  return text;
}

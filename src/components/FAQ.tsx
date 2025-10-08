import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a blog outline generator?",
    answer: "A blog outline generator is an AI-powered tool that creates structured outlines for blog posts. It helps you organize your ideas, plan your content hierarchy, and ensure you cover all important points before writing.",
  },
  {
    question: "How to write a blog post outline with this tool?",
    answer: "Simply enter your blog topic or keyword, optionally select your preferred tone and target audience, then click Generate. The tool will create a comprehensive outline with suggested headings, subheadings, and key points to cover.",
  },
  {
    question: "Is this free outline generator SEO-friendly?",
    answer: "Yes! Our outline generator creates structures that are optimized for SEO, including proper heading hierarchy (H1, H2, H3), logical flow, and comprehensive topic coverage that search engines favor.",
  },
  {
    question: "Can I customize the generated article outline?",
    answer: "Absolutely! The generated outline is fully editable. You can copy it, download it in various formats (.txt, .docx), and modify it to perfectly match your needs and writing style.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
              FAQ – Outline Generator
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our blog outline generator
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card px-6 rounded-xl shadow-card border"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

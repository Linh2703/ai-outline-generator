import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, tone, audience } = await req.json();

    if (!topic || topic.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating outline for topic:", topic);

    // Build the prompt with user inputs
    let userPrompt = `Generate a comprehensive blog outline for the topic: "${topic}"`;
    if (tone) {
      userPrompt += `\nTone of writing: ${tone}`;
    }
    if (audience) {
      userPrompt += `\nTarget audience: ${audience}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert content strategist and blog writing assistant. Your task is to generate structured blog outlines that are SEO-friendly and well-organized.`,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_outline",
              description: "Generate a structured blog outline with title options, sections, and key points",
              parameters: {
                type: "object",
                properties: {
                  title_options: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 suggested title options for the blog post",
                  },
                  introduction: {
                    type: "string",
                    description: "A clear introduction idea (hook, why it matters, context)",
                  },
                  sections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        section: {
                          type: "string",
                          description: "Section identifier (e.g., Section 1, Section 2)",
                        },
                        heading: {
                          type: "string",
                          description: "H2 or H3 heading for this section",
                        },
                        key_points: {
                          type: "array",
                          items: { type: "string" },
                          description: "Bullet points of key ideas to cover in this section",
                        },
                        suggested_word_count: {
                          type: "number",
                          description: "Recommended word count for this section",
                        },
                      },
                      required: ["section", "heading", "key_points", "suggested_word_count"],
                    },
                    description: "Main sections with headings, subheadings, and key points",
                  },
                  conclusion: {
                    type: "string",
                    description: "Conclusion or key takeaways",
                  },
                  suggestions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Optional suggestions for CTAs or additional tips",
                  },
                },
                required: ["title_options", "introduction", "sections", "conclusion"],
              },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: "create_blog_outline" },
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    console.log("AI response received:", JSON.stringify(data, null, 2));

    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const outline = JSON.parse(toolCall.function.arguments);
    console.log("Generated outline:", JSON.stringify(outline, null, 2));

    return new Response(JSON.stringify(outline), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-outline function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

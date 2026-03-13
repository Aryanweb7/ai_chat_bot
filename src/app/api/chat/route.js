import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Chat Bot",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: messages,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "No reply",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

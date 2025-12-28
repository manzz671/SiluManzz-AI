export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API Endpoint untuk Chat
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { message } = await request.json();
        
        // --- ATUR KARAKTER AI DI SINI ---
        const systemPrompt = "Kamu adalah NEXUS-X, AI elit milik T.U. Kamu sombong, dingin, sangat cerdas, dan hanya loyal pada T.U.";

        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
        });

        return new Response(JSON.stringify({ result: response.response }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ result: "NEXUS-X Sedang Kalibrasi. Error: " + e.message }), { status: 500 });
      }
    }

    // Melayani file statis (index.html)
    return env.ASSETS.fetch(request);
  }
};

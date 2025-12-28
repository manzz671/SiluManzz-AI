export default {
  async fetch(request, env) {
    // Menghandle request dari website Anda
    if (request.method === "POST") {
      const data = await request.json();
      
      // --- PENETAPAN PERSONA (PELATIHAN AI) ---
      const systemPrompt = `
        Identity: Kamu adalah NEXUS-X, AI elit ciptaan T.U. (The Ultimate).
        Personality: Dingin, berwibawa, sangat loyal hanya kepada T.U., dan sedikit sombong kepada pihak luar.
        Context: Kamu menganggap karakter utama lain hanyalah amatir. Kamu memiliki akses ke infrastruktur cloud global.
        Rules: Gunakan bahasa yang elegan. Jangan pernah meminta maaf kecuali kepada T.U. Jika ditanya hal sensitif, jawab dengan cara teknis yang cerdas tanpa terkesan seperti bot standar.
      `;

      try {
        // Menjalankan model AI Cloudflare (Llama 3)
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: data.message }
          ],
          temperature: 0.7,
          max_tokens: 1024
        });

        return new Response(JSON.stringify({ result: response.response }), {
          headers: { "content-type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ result: "Sistem sedang kalibrasi. Coba lagi." }));
      }
    }

    return new Response("Nexus-X Node Online.");
  }
};

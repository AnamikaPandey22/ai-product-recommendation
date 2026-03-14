import products from "../data/products";

export const getRecommendations = async (preference) => {
  try {

    // Extract budget
    const budgetMatch = preference.match(/\d+/);
    const budget = budgetMatch ? parseInt(budgetMatch[0]) : null;

    // Detect category
    let category = null;
    if (preference.toLowerCase().includes("phone")) category = "phone";
    if (preference.toLowerCase().includes("laptop")) category = "laptop";

    // Filter products first
    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === category
      );
    }

    if (budget) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= budget
      );
    }

    if (filteredProducts.length === 0) return [];

    // Ask AI to choose best products
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You recommend the best products from a list. Return only product names separated by commas."
            },
            {
              role: "user",
              content: `
User preference: ${preference}

Available products:
${filteredProducts
  .map((p) => `${p.name} ($${p.price})`)
  .join(", ")}

Return the best product names.
`
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content || "";

    const aiNames = text
      .toLowerCase()
      .split(",")
      .map((name) => name.trim());

    const recommended = filteredProducts.filter((product) =>
      aiNames.some((name) => product.name.toLowerCase().includes(name))
    );

    return recommended;

  } catch (error) {
    console.error(error);
    return [];
  }
};
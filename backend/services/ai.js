const { OpenAI } = require("openai");

//Initialize OpenAI with your API Key from the .env file
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
*classifySeverity
*Uses an LLM to analyze the description of a neighborhood incident
*and return a label: "Low", "Moderate", or "Severe".
*/

async function classifySeverity(description) {
	const prompt = `
	Classify this neighborhood incident as "Low", "Moderate", or "Severe":
	"${description}"
	Only respond with one of the three labels.
	`;

	//Send prompt to OpenAI and await the result
	const res = await openai.chat.completions.create({
		messages: [{ role: "user", content: prompt }],
		model: "gpt-4", //Can also use  'gpt-3.5-turbo' if you're on free tier
	});

	//Return only the trimmed response
	return res.choices[0].message.content.trim();
}
	
module.exports = { classifySeverity };

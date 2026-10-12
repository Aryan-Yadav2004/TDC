import { env } from '../config/env.js';

export const aiService = {
  /**
   * Generates a personalized concierge email pitch for the customer introducing the candidate.
   */
  async generateIntroPitch({ customer, candidate, matchmakerName = 'Priya Sharma', tone = 'warm_concierge' }) {
    if (env.OPENAI_API_KEY) {
      try {
        const prompt = `
You are ${matchmakerName}, an elite, high-touch matchmaker at "The Date Crew" (TDC) in India.
Write a personalized, elegant, and compelling match introduction email pitch to your client:
Client: ${customer.first_name} ${customer.last_name} (${customer.age} yrs, ${customer.designation} at ${customer.company}, based in ${customer.city}).
Proposed Match: ${candidate.first_name} ${candidate.last_name} (${candidate.age} yrs, ${candidate.designation} at ${candidate.company}, college: ${candidate.college}, based in ${candidate.city}).
Candidate Bio: "${candidate.bio}"
Candidate Hobbies: ${candidate.interests ? candidate.interests.join(', ') : 'Travel, reading, coffee'}.
Diet: ${candidate.diet}, Kids: ${candidate.want_kids}, Pets: ${candidate.open_to_pets}.

Guidelines:
- Tone: ${tone === 'warm_concierge' ? 'Warm, discreet, emotionally intelligent, premium concierge' : 'Concise, professional, sophisticated'}.
- Do NOT use generic dating app clichés. Use genuine human warmth.
- Return a JSON object with two fields:
  "subject": a catchy, elegant subject line (e.g., "Thoughtful Introduction: Meet [First Name] ([Role])"),
  "body": the email text (with paragraphs, professional greeting and sign-off).
`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: env.OPENAI_MODEL,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: 'You are an elite matchmaker at The Date Crew. You respond in JSON.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return {
            subject: parsed.subject,
            body: parsed.body,
            provider: 'OpenAI GPT-4o'
          };
        }
      } catch (err) {
        console.warn('OpenAI API request failed, falling back to intelligent heuristic engine:', err.message);
      }
    }

    // High-Fidelity Heuristic Generation Engine
    return this.generateHeuristicPitch({ customer, candidate, matchmakerName, tone });
  },

  /**
   * Generates a refined heuristic intro pitch when OpenAI is offline or without an API key.
   */
  generateHeuristicPitch({ customer, candidate, matchmakerName, tone }) {
    const sharedInterests = (customer.interests || []).filter(i => (candidate.interests || []).includes(i));
    const sharedInterestText = sharedInterests.length > 0
      ? `You both share an unmistakable passion for ${sharedInterests.join(' and ')}.`
      : `Beyond the resume, what immediately stood out to me is how naturally your lifestyle rhythms complement each other.`;

    const locationText = customer.city === candidate.city
      ? `Both of you call ${customer.city} home, making it effortless to plan a low-pressure first coffee.`
      : `${candidate.first_name} is currently based in ${candidate.city} but is open to relocation for the right relationship.`;

    const subject = `Curated Introduction: Meet ${candidate.first_name} (${candidate.designation} at ${candidate.company})`;

    const body = `Hi ${customer.first_name},

I hope your week has been treating you well.

As I was reviewing profiles this week, one person immediately stood out for you. Her name is ${candidate.first_name} ${candidate.last_name}, and she is a ${candidate.designation} at ${candidate.company}. An alumnus of ${candidate.college}, she carries a wonderful balance of intellectual drive and warmth.

Here is what made me immediately think of you:
• Professional Alignment: Like you, ${candidate.first_name} is deeply invested in her craft while maintaining strong boundaries for personal passions and family.
• Lifestyle Harmony: ${sharedInterestText}
• Life Vision: On family and long-term values, she is looking for an intentional, partnership-first relationship with mutual emotional maturity.
• Geography: ${locationText}

Her personal note to us: "${candidate.bio}"

I believe a conversation between the two of you would be both refreshing and meaningful. Have a read through her profile and let me know if you would like me to curate an introduction this week.

Warmly,
${matchmakerName}
Senior Concierge Matchmaker | The Date Crew (TDC)`;

    return {
      subject,
      body,
      provider: 'TDC Algorithmic AI Engine'
    };
  },

  /**
   * Generates deep natural language reasoning explaining the match score.
   */
  async generateMatchReasoning({ customer, candidate, scoreBreakdown, strengths, watchouts }) {
    if (env.OPENAI_API_KEY) {
      try {
        const prompt = `
As a senior matchmaker at The Date Crew, provide an analytical match briefing between:
Client: ${customer.first_name} (${customer.gender}, ${customer.age} yrs, ${customer.designation} at ${customer.company}, City: ${customer.city}, Income: ₹${customer.income_lpa}LPA, Kids: ${customer.want_kids}, Diet: ${customer.diet})
Candidate: ${candidate.first_name} (${candidate.gender}, ${candidate.age} yrs, ${candidate.designation} at ${candidate.company}, City: ${candidate.city}, Income: ₹${candidate.income_lpa}LPA, Kids: ${candidate.want_kids}, Diet: ${candidate.diet})
Compatibility Breakdown: ${JSON.stringify(scoreBreakdown)}

Provide JSON with:
"executiveSummary": 2 sentences summarizing the core pairing thesis,
"keySynergies": array of 3 specific reasons,
"frictionPoints": array of 1-2 watchouts or areas to explore on date 1,
"conversationStarters": array of 3 thoughtful icebreaker topics tailored to both profiles.
`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: env.OPENAI_MODEL,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: 'You are an elite matchmaker analyst. Respond in JSON.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.6
          })
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return {
            ...parsed,
            provider: 'OpenAI GPT-4o'
          };
        }
      } catch (err) {
        console.warn('AI reasoning call failed, falling back to heuristic reasoning:', err.message);
      }
    }

    // High-Fidelity Heuristic Reasoning
    return {
      executiveSummary: `${candidate.first_name} and ${customer.first_name} exhibit an exceptional lifestyle and career synergy, combining high professional ambition with grounded family values.`,
      keySynergies: strengths.length > 0 ? strengths.slice(0, 3) : [
        `Strong career alignment in high-impact domains (${customer.company} and ${candidate.company}).`,
        `Complementary communication styles with aligned timeline for marriage.`,
        `Shared views on children and lifestyle balance.`
      ],
      frictionPoints: watchouts.length > 0 ? watchouts : [
        `Minor schedule coordination required given demanding executive workweeks.`
      ],
      conversationStarters: [
        `Ask about her journey from ${candidate.college} to leading projects at ${candidate.company}.`,
        `Compare notes on weekend rituals—from favorite indie coffee spots to favorite travel getaways.`,
        `Discuss how each of you balances intensive careers with personal creative outlets.`
      ],
      provider: 'TDC Algorithmic AI Engine'
    };
  }
};

import { clientRepository } from '../repositories/client.repository.js';
import { matchRepository } from '../repositories/match.repository.js';

export const matchingService = {
  /**
   * Evaluates compatibility between a customer and a candidate profile.
   * Implements strict gender-specific rules as mandated by TDC guidelines.
   */
  calculateCompatibility(customer, candidate) {
    const isMaleCustomer = customer.gender.toLowerCase() === 'male';

    let ageScore = 0;
    let incomeScore = 0;
    let heightScore = 0;
    let kidsScore = 0;
    let relocationScore = 0;
    let lifestyleScore = 0;
    let careerScore = 0;

    const strengths = [];
    const watchouts = [];

    // Calculate age gap (customer.age - candidate.age)
    const ageDiff = customer.age - candidate.age;

    // Calculate height diff (customer.height_cm - candidate.height_cm)
    const heightDiff = customer.height_cm - candidate.height_cm;

    if (isMaleCustomer) {
      // -------------------------------------------------------------
      // MALE CUSTOMER RULES:
      // 1. Younger women
      // 2. Earn less
      // 3. Shorter
      // 4. Matching views on children
      // -------------------------------------------------------------

      // 1. Age: candidate younger is preferred
      if (ageDiff >= 1 && ageDiff <= 5) {
        ageScore = 100;
        strengths.push(`${candidate.first_name} is ${ageDiff} years younger, in prime life-stage alignment.`);
      } else if (ageDiff > 5 && ageDiff <= 8) {
        ageScore = 85;
      } else if (ageDiff === 0) {
        ageScore = 75; // Peer age
      } else if (ageDiff < 0) {
        // Candidate is older than male client
        const penalty = Math.abs(ageDiff) * 20;
        ageScore = Math.max(20, 70 - penalty);
        watchouts.push(`Age variance: Candidate is ${Math.abs(ageDiff)} years older than client.`);
      } else {
        ageScore = 60;
      }

      // 2. Income: candidate earns less or equal
      if (candidate.income_lpa <= customer.income_lpa) {
        const ratio = candidate.income_lpa / Math.max(1, customer.income_lpa);
        if (ratio >= 0.5 && ratio <= 0.95) {
          incomeScore = 100;
          strengths.push(`Harmonious financial alignment (₹${candidate.income_lpa}L vs ₹${customer.income_lpa}L).`);
        } else {
          incomeScore = 90;
        }
      } else {
        // Candidate earns more than male client
        const excess = candidate.income_lpa - customer.income_lpa;
        incomeScore = Math.max(30, 80 - (excess * 2));
        watchouts.push(`Income delta: Candidate earns ₹${candidate.income_lpa} LPA vs client's ₹${customer.income_lpa} LPA.`);
      }

      // 3. Height: candidate shorter
      if (heightDiff >= 5 && heightDiff <= 25) {
        heightScore = 100;
        strengths.push(`Ideal physical compatibility (${customer.height_cm}cm vs ${candidate.height_cm}cm).`);
      } else if (heightDiff > 0 && heightDiff < 5) {
        heightScore = 80;
      } else if (heightDiff <= 0) {
        heightScore = Math.max(25, 60 - (Math.abs(heightDiff) * 8));
        watchouts.push(`Height difference: Candidate is ${Math.abs(heightDiff)}cm taller than client.`);
      } else {
        heightScore = 85;
      }

      // 4. Views on children: exact alignment
      if (customer.want_kids === candidate.want_kids) {
        kidsScore = 100;
        strengths.push(`Synchronized family outlook: Both say '${customer.want_kids}' to children.`);
      } else if (
        (customer.want_kids === 'Yes' && candidate.want_kids === 'Maybe') ||
        (customer.want_kids === 'Maybe' && candidate.want_kids === 'Yes')
      ) {
        kidsScore = 75;
      } else {
        kidsScore = 15;
        watchouts.push(`Conflicting views on children: Client wants '${customer.want_kids}', candidate wants '${candidate.want_kids}'.`);
      }

      // 5. Relocation & City
      if (customer.city === candidate.city) {
        relocationScore = 100;
        strengths.push(`Both based in ${customer.city} with zero relocation friction.`);
      } else if (candidate.open_to_relocate === 'Yes') {
        relocationScore = 90;
        strengths.push(`Candidate in ${candidate.city} is actively open to relocating.`);
      } else if (candidate.open_to_relocate === 'Maybe') {
        relocationScore = 70;
      } else {
        relocationScore = 40;
        watchouts.push(`Different cities (${customer.city} vs ${candidate.city}) with limited relocation willingness.`);
      }

      // 6. Lifestyle & Diet
      let dietMatch = 80;
      if (customer.diet === candidate.diet) {
        dietMatch = 100;
        strengths.push(`Shared dietary lifestyle (${customer.diet}).`);
      } else if (
        (customer.diet === 'Non-Vegetarian' && candidate.diet === 'Eggetarian') ||
        (customer.diet === 'Vegetarian' && candidate.diet === 'Jain')
      ) {
        dietMatch = 90;
      } else {
        dietMatch = 65;
      }

      let habitsMatch = 85;
      if (customer.smoking === 'Never' && candidate.smoking !== 'Never') {
        habitsMatch -= 25;
        watchouts.push(`Smoking habit divergence: Candidate smokes ${candidate.smoking.toLowerCase()}.`);
      }
      if (customer.open_to_pets === 'Yes' && candidate.open_to_pets === 'Yes') {
        habitsMatch += 15;
      }

      lifestyleScore = Math.min(100, Math.round((dietMatch + habitsMatch) / 2));

      // Weighted Total Score for Male Customer
      const totalScore = Math.round(
        (ageScore * 0.20) +
        (incomeScore * 0.20) +
        (heightScore * 0.15) +
        (kidsScore * 0.20) +
        (relocationScore * 0.15) +
        (lifestyleScore * 0.10)
      );

      return {
        totalScore,
        breakdown: {
          ageScore,
          incomeScore,
          heightScore,
          kidsScore,
          relocationScore,
          lifestyleScore
        },
        strengths,
        watchouts,
        matchTier: totalScore >= 85 ? 'High Potential Match' : (totalScore >= 72 ? 'Strong Synergy' : 'Moderate Match')
      };

    } else {
      // -------------------------------------------------------------
      // FEMALE CUSTOMER RULES:
      // Thoughtful multi-dimensional logic:
      // 1. Professional synergy & career trajectory
      // 2. Values & lifestyle (diet, habits, pets, family)
      // 3. Relocation & geographic synergy
      // 4. Family & kids outlook
      // 5. Height & age bracket (mature, taller)
      // -------------------------------------------------------------

      // 1. Career & Professional Synergy
      let careerPoints = 75;
      if (candidate.income_lpa >= customer.income_lpa) {
        careerPoints += 15;
        strengths.push(`Strong career momentum & financial parity (${candidate.designation} at ${candidate.company}).`);
      }
      const topColleges = ['IIT', 'BITS', 'IIM', 'SRCC', 'Stanford', 'Columbia', 'NUS'];
      if (topColleges.some(tc => candidate.college.includes(tc))) {
        careerPoints += 10;
        strengths.push(`Tier-1 academic pedigree (${candidate.college}).`);
      }
      careerScore = Math.min(100, careerPoints);

      // 2. Values & Lifestyle (diet, manglik, pets, smoking)
      let valuesPoints = 80;
      if (customer.diet === candidate.diet) {
        valuesPoints += 10;
        strengths.push(`Shared dietary values (${customer.diet}).`);
      }
      if (customer.smoking === 'Never' && candidate.smoking !== 'Never') {
        valuesPoints -= 30;
        watchouts.push(`Lifestyle mismatch: Candidate smokes ${candidate.smoking.toLowerCase()}.`);
      }
      if (customer.open_to_pets === candidate.open_to_pets && customer.open_to_pets === 'Yes') {
        valuesPoints += 10;
        strengths.push(`Both are passionate pet lovers.`);
      }
      if (customer.manglik !== 'Doesn\'t Matter' && customer.manglik === candidate.manglik) {
        valuesPoints += 10;
      }
      lifestyleScore = Math.min(100, Math.max(30, valuesPoints));

      // 3. Relocation & Geography
      if (customer.city === candidate.city) {
        relocationScore = 100;
        strengths.push(`Co-located in ${customer.city}.`);
      } else if (candidate.open_to_relocate === 'Yes' || customer.open_to_relocate === 'Yes') {
        relocationScore = 85;
      } else {
        relocationScore = 45;
        watchouts.push(`Geographic separation (${customer.city} vs ${candidate.city}) with limited relocation flexibility.`);
      }

      // 4. Family & Kids Outlook
      if (customer.want_kids === candidate.want_kids) {
        kidsScore = 100;
        strengths.push(`Aligned family and parenting vision ('${customer.want_kids}' to kids).`);
      } else if (
        (customer.want_kids === 'Yes' && candidate.want_kids === 'Maybe') ||
        (customer.want_kids === 'Maybe' && candidate.want_kids === 'Yes')
      ) {
        kidsScore = 75;
      } else {
        kidsScore = 20;
        watchouts.push(`Differing family timeline regarding children.`);
      }

      // 5. Height & Age Fit (male taller and peer/mature)
      // Height: Candidate taller than female customer
      if (candidate.height_cm >= customer.height_cm + 5) {
        heightScore = 100;
        strengths.push(`Comfortable height complementary fit (${candidate.height_cm}cm vs ${customer.height_cm}cm).`);
      } else if (candidate.height_cm >= customer.height_cm) {
        heightScore = 80;
      } else {
        heightScore = Math.max(30, 65 - (Math.abs(candidate.height_cm - customer.height_cm) * 5));
        watchouts.push(`Height fit: Candidate (${candidate.height_cm}cm) is shorter than client (${customer.height_cm}cm).`);
      }

      // Age: candidate same age or 1-4 years older is preferred
      const maleAgeAdvantage = candidate.age - customer.age;
      if (maleAgeAdvantage >= 0 && maleAgeAdvantage <= 4) {
        ageScore = 100;
        strengths.push(`Balanced peer age dynamic (${candidate.age} and ${customer.age}).`);
      } else if (maleAgeAdvantage > 4 && maleAgeAdvantage <= 7) {
        ageScore = 85;
      } else if (maleAgeAdvantage < 0) {
        ageScore = Math.max(40, 80 - (Math.abs(maleAgeAdvantage) * 15));
      } else {
        ageScore = 65;
      }

      // Weighted Total Score for Female Customer
      const totalScore = Math.round(
        (careerScore * 0.25) +
        (lifestyleScore * 0.20) +
        (relocationScore * 0.20) +
        (kidsScore * 0.20) +
        (((heightScore * 0.5) + (ageScore * 0.5)) * 0.15)
      );

      return {
        totalScore,
        breakdown: {
          careerScore,
          lifestyleScore,
          relocationScore,
          kidsScore,
          heightScore,
          ageScore
        },
        strengths,
        watchouts,
        matchTier: totalScore >= 85 ? 'High Potential Match' : (totalScore >= 72 ? 'Strong Synergy' : 'Moderate Match')
      };
    }
  },

  /**
   * Retrieves candidate pool and scores every single candidate in real time.
   */
  getRankedMatches(customerId, filters = {}) {
    const customer = clientRepository.findById(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const oppositeGender = customer.gender.toLowerCase() === 'male' ? 'female' : 'male';
    const candidates = clientRepository.findCandidatesForMatching(oppositeGender, customerId, filters);

    // Retrieve already assigned matches for this client
    const existingMatches = matchRepository.findByClient(customerId);
    const existingMap = new Map();
    existingMatches.forEach(m => {
      existingMap.set(m.candidate_id, m);
    });

    const ranked = candidates.map(candidate => {
      const evaluation = this.calculateCompatibility(customer, candidate);
      const existing = existingMap.get(candidate.id) || null;

      return {
        candidate,
        compatibilityScore: evaluation.totalScore,
        scoreBreakdown: evaluation.breakdown,
        matchTier: evaluation.matchTier,
        strengths: evaluation.strengths,
        watchouts: evaluation.watchouts,
        assignment: existing ? {
          id: existing.id,
          status: existing.status,
          sent_to_client_at: existing.sent_to_client_at,
          pitch_subject: existing.pitch_subject,
          pitch_body: existing.pitch_body
        } : null
      };
    });

    // Sort by compatibility score descending
    ranked.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    return {
      customer,
      totalCandidates: ranked.length,
      matches: ranked
    };
  }
};

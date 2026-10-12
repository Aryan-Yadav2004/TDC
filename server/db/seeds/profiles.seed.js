// 120+ Authentic Indian Professional Profiles across Bangalore, Mumbai, Delhi, Gurgaon, Hyderabad, Pune, London, Singapore, NYC.

const maleNames = [
  { first: 'Aarav', last: 'Mehta' },
  { first: 'Kabir', last: 'Singhania' },
  { first: 'Rohan', last: 'Kapoor' },
  { first: 'Aditya', last: 'Iyer' },
  { first: 'Vikram', last: 'Reddy' },
  { first: 'Siddharth', last: 'Malhotra' },
  { first: 'Arjun', last: 'Bansal' },
  { first: 'Varun', last: 'Nair' },
  { first: 'Kunal', last: 'Deshmukh' },
  { first: 'Dhruv', last: 'Chopra' },
  { first: 'Nikhil', last: 'Joshi' },
  { first: 'Tanmay', last: 'Bhatia' },
  { first: 'Rishabh', last: 'Agarwal' },
  { first: 'Pranav', last: 'Kulkarni' },
  { first: 'Samarth', last: 'Sethi' },
  { first: 'Dev', last: 'Mukherjee' },
  { first: 'Raghav', last: 'Garg' },
  { first: 'Tushar', last: 'Sarin' },
  { first: 'Yash', last: 'Venkatesh' },
  { first: 'Aman', last: 'Gupta' },
  { first: 'Karan', last: 'Bhasin' },
  { first: 'Gaurav', last: 'Trivedi' },
  { first: 'Abhimanyu', last: 'Rao' },
  { first: 'Jayant', last: 'Poddar' },
  { first: 'Harsh', last: 'Vardhan' },
  { first: 'Ayush', last: 'Saxena' },
  { first: 'Shashank', last: 'Patel' },
  { first: 'Rajat', last: 'Bhandari' },
  { first: 'Anand', last: 'Srinivasan' },
  { first: 'Saurabh', last: 'Mishra' },
  { first: 'Zorawar', last: 'Gill' },
  { first: 'Arman', last: 'Suri' },
  { first: 'Kartik', last: 'Somani' },
  { first: 'Neil', last: 'Mathur' },
  { first: 'Manish', last: 'Verma' },
  { first: 'Alok', last: 'Khurana' },
  { first: 'Chinmay', last: 'Hegde' },
  { first: 'Darshan', last: 'Modi' },
  { first: 'Tejas', last: 'Shah' },
  { first: 'Anirudh', last: 'Pillai' },
  { first: 'Tarun', last: 'Dhawan' },
  { first: 'Gautam', last: 'Bakshi' },
  { first: 'Krish', last: 'Dutta' },
  { first: 'Shubham', last: 'Jindal' },
  { first: 'Vivek', last: 'Menon' },
  { first: 'Akash', last: 'Khanna' },
  { first: 'Chaitanya', last: 'Babu' },
  { first: 'Mohit', last: 'Bhardwaj' },
  { first: 'Sumeet', last: 'Chhabra' },
  { first: 'Deepak', last: 'Rawat' },
  { first: 'Keshav', last: 'Goyal' },
  { first: 'Mayank', last: 'Mittal' },
  { first: 'Sunny', last: 'Ahluwalia' },
  { first: 'Sharad', last: 'Narayanan' },
  { first: 'Utsav', last: 'Rastogi' },
  { first: 'Angad', last: 'Walia' },
  { first: 'Bhavesh', last: 'Puri' },
  { first: 'Ishan', last: 'Chaturvedi' },
  { first: 'Hitesh', last: 'Lal' },
  { first: 'Farhan', last: 'Merchant' }
];

const femaleNames = [
  { first: 'Ananya', last: 'Roy' },
  { first: 'Meera', last: 'Kapoor' },
  { first: 'Tara', last: 'Nambiar' },
  { first: 'Rhea', last: 'Shenoy' },
  { first: 'Ishita', last: 'Agarwal' },
  { first: 'Tanvi', last: 'Deshmukh' },
  { first: 'Avani', last: 'Bhat' },
  { first: 'Diya', last: 'Chawla' },
  { first: 'Sanya', last: 'Malhotra' },
  { first: 'Kritika', last: 'Joshi' },
  { first: 'Pooja', last: 'Iyer' },
  { first: 'Shruti', last: 'Bansal' },
  { first: 'Natasha', last: 'Verma' },
  { first: 'Radhika', last: 'Sen' },
  { first: 'Simran', last: 'Ahluwalia' },
  { first: 'Aditi', last: 'Kulkarni' },
  { first: 'Trisha', last: 'Mukherjee' },
  { first: 'Rupali', last: 'Sethi' },
  { first: 'Sneha', last: 'Reddy' },
  { first: 'Kavya', last: 'Menon' },
  { first: 'Zoya', last: 'Alvi' },
  { first: 'Gauri', last: 'Sharma' },
  { first: 'Mallika', last: 'Singhal' },
  { first: 'Nandini', last: 'Trivedi' },
  { first: 'Aadhya', last: 'Garg' },
  { first: 'Parul', last: 'Bhardwaj' },
  { first: 'Bhavna', last: 'Saxena' },
  { first: 'Aarohi', last: 'Poddar' },
  { first: 'Shreya', last: 'Venkatesan' },
  { first: 'Vidhi', last: 'Shah' },
  { first: 'Lavanya', last: 'Pillai' },
  { first: 'Charu', last: 'Gupta' },
  { first: 'Natasha', last: 'Khanna' },
  { first: 'Gayatri', last: 'Patil' },
  { first: 'Sonam', last: 'Bhasin' },
  { first: 'Ritu', last: 'Bhandari' },
  { first: 'Maitreyi', last: 'Hegde' },
  { first: 'Ragini', last: 'Dhawan' },
  { first: 'Kareena', last: 'Suri' },
  { first: 'Anwesha', last: 'Dutta' },
  { first: 'Pragya', last: 'Jindal' },
  { first: 'Divya', last: 'Narayanan' },
  { first: 'Mansi', last: 'Chopra' },
  { first: 'Barkha', last: 'Dutt' },
  { first: 'Saumya', last: 'Bakshi' },
  { first: 'Esha', last: 'Somani' },
  { first: 'Tanya', last: 'Puri' },
  { first: 'Vandana', last: 'Chaturvedi' },
  { first: 'Akshata', last: 'Murthy' },
  { first: 'Nehal', last: 'Modi' },
  { first: 'Bhavika', last: 'Khurana' },
  { first: 'Alisha', last: 'Sarin' },
  { first: 'Kiran', last: 'Grewal' },
  { first: 'Namrata', last: 'Vohra' },
  { first: 'Rachita', last: 'Mittal' },
  { first: 'Smriti', last: 'Rastogi' },
  { first: 'Nirali', last: 'Thakkar' },
  { first: 'Jasleen', last: 'Kaur' },
  { first: 'Deepika', last: 'Mathur' },
  { first: 'Saloni', last: 'Merchant' }
];

const techCompanies = [
  { company: 'Google India', designations: ['Staff Software Engineer', 'Product Manager III', 'Engineering Manager'] },
  { company: 'Microsoft', designations: ['Principal Software Engineer', 'Senior Applied Scientist', 'Azure Cloud Architect'] },
  { company: 'CRED', designations: ['Lead Product Designer', 'Head of Growth Engineering', 'Staff Backend Engineer'] },
  { company: 'Zerodha', designations: ['Senior Systems Architect', 'Tech Lead - Trading Engine', 'Senior Quant Developer'] },
  { company: 'McKinsey & Company', designations: ['Engagement Manager', 'Associate Partner - Strategy', 'Senior Associate'] },
  { company: 'Boston Consulting Group (BCG)', designations: ['Project Leader', 'Consultant - Principal Track', 'Strategy Consultant'] },
  { company: 'Goldman Sachs', designations: ['Vice President - Asset Wealth Management', 'Quant Strategist', 'Associate - Investment Banking'] },
  { company: 'Swiggy', designations: ['Director of Product', 'Senior Engineering Manager', 'Principal Data Scientist'] },
  { company: 'Zomato / Blinkit', designations: ['AVP Supply Chain Ops', 'Lead Architect', 'Senior Product Lead'] },
  { company: 'Morgan Stanley', designations: ['Vice President - Equity Research', 'Senior Quantitative Analyst'] },
  { company: 'Amazon AWS', designations: ['Senior Solutions Architect', 'Senior Technical Program Manager'] },
  { company: 'Urban Company', designations: ['Category Lead - Premium Services', 'Lead Product Manager'] },
  { company: 'Uber Technologies', designations: ['Senior Staff Engineer', 'Senior Product Manager - Mobility'] },
  { company: 'Stealth AI Startup', designations: ['Co-Founder & CEO', 'Founding Engineer / CTO', 'Head of AI Research'] },
  { company: 'Bain & Company', designations: ['Case Team Leader', 'Manager - Private Equity Group'] },
  { company: 'Flipkart', designations: ['Principal Product Manager', 'Director of Engineering'] },
  { company: 'Apollo Hospitals / Fortis', designations: ['Consultant Radiologist', 'Chief Medical Registrar', 'Senior Cardiologist'] },
  { company: 'Khaitan & Co / Trilegal', designations: ['Partner - Corporate M&A', 'Principal Associate - Venture Financing'] }
];

const colleges = [
  { college: 'IIT Bombay', degrees: ['B.Tech Computer Science', 'B.Tech Electrical Engg', 'Dual Degree Mechanical'] },
  { college: 'IIT Delhi', degrees: ['B.Tech Computer Science', 'B.Tech Mathematics & Computing'] },
  { college: 'BITS Pilani', degrees: ['B.E. Computer Science', 'M.Sc Economics + B.E. CS'] },
  { college: 'IIT Madras', degrees: ['B.Tech Aeronautical', 'B.Tech Computer Science'] },
  { college: 'SRCC (Shri Ram College of Commerce)', degrees: ['B.Com (Hons)', 'B.A. (Hons) Economics'] },
  { college: 'St. Stephen’s College, Delhi', degrees: ['B.A. (Hons) Economics', 'B.Sc (Hons) Physics'] },
  { college: 'Lady Shri Ram College (LSR)', degrees: ['B.A. (Hons) Economics', 'B.A. (Hons) Psychology'] },
  { college: 'Ashoka University', degrees: ['B.Sc Computer Science & Philosophy', 'B.A. Political Economy'] },
  { college: 'National Law School of India (NLSIU)', degrees: ['B.A. LL.B. (Hons)'] },
  { college: 'All India Institute of Medical Sciences (AIIMS)', degrees: ['MBBS', 'MD General Medicine'] },
  { college: 'Stanford University', degrees: ['B.S. Symbolic Systems', 'M.S. Management Science & Engg'] },
  { college: 'Columbia University', degrees: ['B.A. Financial Economics', 'M.S. Data Science'] },
  { college: 'National University of Singapore (NUS)', degrees: ['B.Eng Computing', 'B.Sc Finance'] },
  { college: 'St. Xavier’s College, Mumbai', degrees: ['B.Sc Statistics & Economics', 'B.M.S. Management'] },
  { college: 'IIIT Hyderabad', degrees: ['B.Tech Computer Science & MS by Research'] }
];

const cities = [
  'Bangalore', 'Bangalore', 'Bangalore', // high weight
  'Mumbai', 'Mumbai', 'Mumbai',
  'Delhi NCR', 'Gurgaon',
  'Hyderabad', 'Pune',
  'London', 'Singapore', 'New York'
];

const maleAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80'
];

const femaleAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
];

const hobbiesList = [
  'Specialty Coffee Brewing', 'Trekking & Hiking', 'Tennis', 'Marathon Running',
  'Indie Cinema', 'Contemporary Art & Pottery', 'Bouldering', 'Scuba Diving',
  'Wine Tasting', 'Book Clubs & Non-Fiction', 'Vinyl Record Collecting',
  'Culinary Experimentation', 'Pilates & Yoga', 'Sailing', 'Formula 1 & Paddock'
];

const languagesPool = ['Hindi', 'English', 'Tamil', 'Telugu', 'Punjabi', 'Bengali', 'Gujarati', 'Marathi', 'Kannada', 'Malayalam', 'French', 'German'];

const religions = ['Hindu', 'Hindu', 'Hindu', 'Sikh', 'Jain', 'Christian', 'Agnostic / Spiritual'];
const castes = ['Brahmin', 'Khatri', 'Agarwal', 'Kayastha', 'Reddy', 'Nair', 'Baniya', 'Open to all'];

function getRandomItem(arr, indexModifier = 0) {
  return arr[(indexModifier) % arr.length];
}

export function generateProfilesSeed() {
  const profiles = [];
  const assignedMatchmakers = ['mm_priya_01', 'mm_rohit_02', 'mm_ananya_03', null];

  // Journey stage distribution
  const stages = [
    'actively_matching', 'actively_matching', 'actively_matching',
    'verified', 'verified',
    'first_date_arranged',
    'deep_talks',
    'onboarding',
    'on_hold',
    'success_matched'
  ];

  // Generate 60 Male Profiles
  maleNames.forEach((n, idx) => {
    const age = 27 + (idx % 10); // Ages 27 to 36
    const birthYear = 2026 - age;
    const birthMonth = String((idx % 12) + 1).padStart(2, '0');
    const birthDay = String((idx % 28) + 1).padStart(2, '0');
    const dob = `${birthYear}-${birthMonth}-${birthDay}`;

    const compInfo = getRandomItem(techCompanies, idx);
    const colInfo = getRandomItem(colleges, idx + 3);
    const city = getRandomItem(cities, idx);
    
    // Height between 172cm and 188cm
    const height_cm = 173 + (idx % 16);
    // Income between 32 LPA and 115 LPA
    const income_lpa = 35 + ((idx * 7) % 80);

    const languages = ['English', 'Hindi'];
    if (idx % 3 === 0) languages.push(getRandomItem(languagesPool, idx + 2));
    if (idx % 5 === 0) languages.push(getRandomItem(languagesPool, idx + 4));

    const interests = [
      getRandomItem(hobbiesList, idx),
      getRandomItem(hobbiesList, idx + 3),
      getRandomItem(hobbiesList, idx + 7)
    ];

    const kidsViews = ['Yes', 'Yes', 'Maybe', 'No'][idx % 4];
    const relocateViews = ['Yes', 'Maybe', 'No', 'Yes'][idx % 4];
    const petViews = ['Yes', 'Yes', 'Maybe', 'No'][idx % 4];
    const diets = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain', 'Vegan'][idx % 5];
    const drinks = ['Socially', 'Never', 'Socially', 'Regularly'][idx % 4];
    const smokes = ['Never', 'Never', 'Occasionally', 'Never'][idx % 4];
    const marital = idx === 12 || idx === 34 ? 'Divorced' : 'Never Married';

    const id = `client_m_${String(idx + 1).padStart(3, '0')}`;
    const matchmaker_id = idx < 45 ? assignedMatchmakers[idx % 3] : null;

    profiles.push({
      id,
      matchmaker_id,
      first_name: n.first,
      last_name: n.last,
      gender: 'male',
      dob,
      country: city === 'London' ? 'United Kingdom' : (city === 'Singapore' ? 'Singapore' : (city === 'New York' ? 'United States' : 'India')),
      city,
      height_cm,
      email: `${n.first.toLowerCase()}.${n.last.toLowerCase()}${idx + 10}@example.com`,
      phone: `+91 ${9820000000 + (idx * 11111)}`,
      college: colInfo.college,
      degree: getRandomItem(colInfo.degrees, idx),
      income_lpa,
      company: compInfo.company,
      designation: getRandomItem(compInfo.designations, idx),
      marital_status: marital,
      religion: getRandomItem(religions, idx),
      caste: getRandomItem(castes, idx),
      manglik: ['No', 'No', 'Partial / Anshik', 'Doesn\'t Matter'][idx % 4],
      diet: diets,
      drinking: drinks,
      smoking: smokes,
      want_kids: kidsViews,
      open_to_relocate: relocateViews,
      open_to_pets: petViews,
      siblings_count: (idx % 3),
      family_type: (idx % 4 === 0) ? 'Joint' : 'Nuclear',
      family_values: (idx % 3 === 0) ? 'Liberal' : 'Moderate',
      horoscope_match: (idx % 4 === 0) ? 'Preferred' : 'Not Necessary',
      bio: `Tech-minded professional with an eye for design and grounded lifestyle. Passionate about building impactful products, Sunday long runs, and deep conversations over pour-overs. Ready to settle down with someone ambitious and self-aware.`,
      profile_photo: maleAvatars[idx % maleAvatars.length],
      journey_stage: stages[idx % stages.length],
      is_verified: 1,
      languages,
      interests
    });
  });

  // Generate 60 Female Profiles
  femaleNames.forEach((n, idx) => {
    const age = 25 + (idx % 9); // Ages 25 to 33
    const birthYear = 2026 - age;
    const birthMonth = String((idx % 12) + 1).padStart(2, '0');
    const birthDay = String((idx % 28) + 1).padStart(2, '0');
    const dob = `${birthYear}-${birthMonth}-${birthDay}`;

    const compInfo = getRandomItem(techCompanies, idx + 5);
    const colInfo = getRandomItem(colleges, idx + 7);
    const city = getRandomItem(cities, idx + 2);
    
    // Height between 155cm and 172cm
    const height_cm = 156 + (idx % 16);
    // Income between 22 LPA and 95 LPA
    const income_lpa = 24 + ((idx * 6) % 65);

    const languages = ['English', 'Hindi'];
    if (idx % 2 === 0) languages.push(getRandomItem(languagesPool, idx + 1));
    if (idx % 4 === 0) languages.push(getRandomItem(languagesPool, idx + 3));

    const interests = [
      getRandomItem(hobbiesList, idx + 2),
      getRandomItem(hobbiesList, idx + 5),
      getRandomItem(hobbiesList, idx + 9)
    ];

    const kidsViews = ['Yes', 'Yes', 'Maybe', 'No'][idx % 4];
    const relocateViews = ['Yes', 'Yes', 'Maybe', 'No'][idx % 4];
    const petViews = ['Yes', 'Yes', 'Yes', 'Maybe'][idx % 4];
    const diets = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain', 'Vegan'][(idx + 2) % 5];
    const drinks = ['Socially', 'Never', 'Socially', 'Never'][idx % 4];
    const smokes = ['Never', 'Never', 'Never', 'Occasionally'][idx % 4];
    const marital = idx === 18 ? 'Divorced' : 'Never Married';

    const id = `client_f_${String(idx + 1).padStart(3, '0')}`;
    const matchmaker_id = idx < 45 ? assignedMatchmakers[(idx + 1) % 3] : null;

    profiles.push({
      id,
      matchmaker_id,
      first_name: n.first,
      last_name: n.last,
      gender: 'female',
      dob,
      country: city === 'London' ? 'United Kingdom' : (city === 'Singapore' ? 'Singapore' : (city === 'New York' ? 'United States' : 'India')),
      city,
      height_cm,
      email: `${n.first.toLowerCase()}.${n.last.toLowerCase()}${idx + 20}@example.com`,
      phone: `+91 ${9830000000 + (idx * 11111)}`,
      college: colInfo.college,
      degree: getRandomItem(colInfo.degrees, idx + 1),
      income_lpa,
      company: compInfo.company,
      designation: getRandomItem(compInfo.designations, idx + 1),
      marital_status: marital,
      religion: getRandomItem(religions, idx + 1),
      caste: getRandomItem(castes, idx + 1),
      manglik: ['No', 'No', 'No', 'Partial / Anshik'][idx % 4],
      diet: diets,
      drinking: drinks,
      smoking: smokes,
      want_kids: kidsViews,
      open_to_relocate: relocateViews,
      open_to_pets: petViews,
      siblings_count: (idx % 2),
      family_type: 'Nuclear',
      family_values: (idx % 2 === 0) ? 'Moderate' : 'Liberal',
      horoscope_match: (idx % 5 === 0) ? 'Preferred' : 'Not Necessary',
      bio: `Passionate leader in ${compInfo.company}, living between creative projects, weekend treks, and exploring new cuisines. Value mutual respect, emotional maturity, intellectual banter, and a shared zest for life. Looking for an intentional partnership.`,
      profile_photo: femaleAvatars[idx % femaleAvatars.length],
      journey_stage: stages[(idx + 3) % stages.length],
      is_verified: 1,
      languages,
      interests
    });
  });

  return profiles;
}

// ─── BE CAREFUL · Demo / Fictional Data ────────────────────────────────────
// All data is entirely fictional and for demonstration purposes only.

export interface Doctor {
  id: string
  name: string
  specialty: string
  qualification: string
  experience: number
  hospital: string
  location: string
  languages: string[]
  availability: string
  consultationFee: number
  rating: number
  reviewCount: number
  verified: boolean
  avatar: string
  about: string
  timings: string
  consultationTypes: string[]
}

export interface Disease {
  id: string
  name: string
  category: string
  overview: string
  symptoms: string[]
  causes: string[]
  riskFactors: string[]
  diagnosis: string[]
  treatments: string[]
  prevention: string[]
  complications: string[]
  relatedMedicines: string[]
  exercises: string[]
  icon: string
}

export interface Medicine {
  id: string
  genericName: string
  brandNames: string[]
  category: string
  uses: string
  precautions: string[]
  sideEffects: string[]
  interactions: string[]
  storage: string
  prescriptionRequired: boolean
  icon: string
}

export interface Exercise {
  id: string
  name: string
  category: string
  description: string
  benefits: string[]
  difficulty: 'Easy' | 'Moderate' | 'Advanced'
  duration: string
  precautions: string[]
  icon: string
  steps: string[]
}

export interface Appointment {
  id: string
  patientName: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'upcoming' | 'completed' | 'cancelled'
  reason: string
  queueNumber: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  bloodGroup: string
  contact: string
  email: string
  lastVisit: string
  condition: string
}

export interface Article {
  id: string
  title: string
  category: string
  excerpt: string
  readTime: string
  date: string
  author: string
  image: string
  tags: string[]
}

// ─── DOCTORS ───────────────────────────────────────────────────────────────
export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology), FACC',
    experience: 14,
    hospital: 'City Heart Institute',
    location: 'Karachi, Pakistan',
    languages: ['English', 'Urdu'],
    availability: 'Mon–Fri',
    consultationFee: 2500,
    rating: 4.9,
    reviewCount: 312,
    verified: true,
    avatar: '',
    about: 'Dr. Sarah Mitchell is a board-certified cardiologist with 14 years of experience in interventional cardiology and heart failure management.',
    timings: '9:00 AM – 5:00 PM',
    consultationTypes: ['In-Clinic', 'Video'],
  },
  {
    id: 'd2',
    name: 'Dr. Ahmed Raza',
    specialty: 'Neurologist',
    qualification: 'MBBS, FCPS (Neurology)',
    experience: 10,
    hospital: 'Neuroscience Center',
    location: 'Lahore, Pakistan',
    languages: ['Urdu', 'English'],
    availability: 'Tue–Sat',
    consultationFee: 2000,
    rating: 4.7,
    reviewCount: 198,
    verified: true,
    avatar: '',
    about: 'Dr. Ahmed Raza specializes in stroke management, epilepsy, and neurodegenerative disorders.',
    timings: '10:00 AM – 6:00 PM',
    consultationTypes: ['In-Clinic'],
  },
  {
    id: 'd3',
    name: 'Dr. Fatima Khan',
    specialty: 'Pediatrician',
    qualification: 'MBBS, MRCPCH',
    experience: 8,
    hospital: 'Children\'s Health Clinic',
    location: 'Islamabad, Pakistan',
    languages: ['Urdu', 'English', 'Punjabi'],
    availability: 'Mon–Sat',
    consultationFee: 1500,
    rating: 4.8,
    reviewCount: 420,
    verified: true,
    avatar: '',
    about: 'Dr. Fatima Khan provides comprehensive pediatric care from newborns to adolescents with a gentle, family-centered approach.',
    timings: '9:00 AM – 3:00 PM',
    consultationTypes: ['In-Clinic', 'Video'],
  },
  {
    id: 'd4',
    name: 'Dr. James Okonkwo',
    specialty: 'Orthopedic Surgeon',
    qualification: 'MBBS, MS (Orthopedics)',
    experience: 18,
    hospital: 'Bone & Joint Hospital',
    location: 'Karachi, Pakistan',
    languages: ['English', 'Urdu'],
    availability: 'Mon–Thu',
    consultationFee: 3000,
    rating: 4.6,
    reviewCount: 256,
    verified: true,
    avatar: '',
    about: 'Dr. James Okonkwo is a senior orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery.',
    timings: '8:00 AM – 2:00 PM',
    consultationTypes: ['In-Clinic'],
  },
  {
    id: 'd5',
    name: 'Dr. Ayesha Siddiqui',
    specialty: 'Dermatologist',
    qualification: 'MBBS, DDVL',
    experience: 6,
    hospital: 'SkinCare Clinic',
    location: 'Lahore, Pakistan',
    languages: ['Urdu', 'English'],
    availability: 'Mon–Fri',
    consultationFee: 1800,
    rating: 4.5,
    reviewCount: 178,
    verified: true,
    avatar: '',
    about: 'Dr. Ayesha Siddiqui specializes in medical and cosmetic dermatology including acne, eczema, and skin cancer screening.',
    timings: '11:00 AM – 7:00 PM',
    consultationTypes: ['In-Clinic', 'Video'],
  },
  {
    id: 'd6',
    name: 'Dr. Omar Sheikh',
    specialty: 'General Physician',
    qualification: 'MBBS, MRCP',
    experience: 12,
    hospital: 'MedCare General Hospital',
    location: 'Faisalabad, Pakistan',
    languages: ['Urdu', 'Punjabi', 'English'],
    availability: 'Mon–Sat',
    consultationFee: 1200,
    rating: 4.8,
    reviewCount: 534,
    verified: true,
    avatar: '',
    about: 'Dr. Omar Sheikh provides comprehensive general medicine services for adults with a focus on preventive healthcare.',
    timings: '8:00 AM – 8:00 PM',
    consultationTypes: ['In-Clinic', 'Video', 'Phone'],
  },
  {
    id: 'd7',
    name: 'Dr. Nadia Hussain',
    specialty: 'Gynecologist',
    qualification: 'MBBS, MRCOG',
    experience: 11,
    hospital: 'Women\'s Health Center',
    location: 'Karachi, Pakistan',
    languages: ['Urdu', 'English'],
    availability: 'Mon–Fri',
    consultationFee: 2200,
    rating: 4.9,
    reviewCount: 387,
    verified: true,
    avatar: '',
    about: 'Dr. Nadia Hussain is a specialist in women\'s reproductive health, antenatal care, and gynecological surgeries.',
    timings: '10:00 AM – 5:00 PM',
    consultationTypes: ['In-Clinic'],
  },
  {
    id: 'd8',
    name: 'Dr. Bilal Mahmood',
    specialty: 'Psychiatrist',
    qualification: 'MBBS, MRCPsych',
    experience: 9,
    hospital: 'Mind & Wellness Institute',
    location: 'Islamabad, Pakistan',
    languages: ['Urdu', 'English'],
    availability: 'Tue–Sat',
    consultationFee: 2800,
    rating: 4.7,
    reviewCount: 143,
    verified: true,
    avatar: '',
    about: 'Dr. Bilal Mahmood specializes in anxiety disorders, depression, bipolar disorder, and psychological well-being.',
    timings: '9:00 AM – 4:00 PM',
    consultationTypes: ['In-Clinic', 'Video'],
  },
]

// ─── DISEASES ───────────────────────────────────────────────────────────────
export const diseases: Disease[] = [
  {
    id: 'dis1',
    name: 'Hypertension',
    category: 'Cardiovascular',
    overview: 'Hypertension (high blood pressure) is a common condition where the long-term force of blood against artery walls is high enough to potentially cause health problems such as heart disease.',
    symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Flushing', 'Dizziness', 'Chest pain', 'Visual changes'],
    causes: ['Genetic factors', 'Unhealthy diet (high salt)', 'Physical inactivity', 'Obesity', 'Tobacco use', 'Excessive alcohol', 'Chronic stress'],
    riskFactors: ['Age over 65', 'Family history', 'Obesity', 'Sedentary lifestyle', 'High-sodium diet', 'Smoking'],
    diagnosis: ['Blood pressure measurement', 'Blood tests', 'Urine tests', 'ECG', 'Echocardiogram'],
    treatments: ['Lifestyle modifications', 'Antihypertensive medications', 'Regular monitoring', 'Dietary changes', 'Exercise program'],
    prevention: ['Maintain healthy weight', 'Exercise regularly', 'Reduce sodium intake', 'Limit alcohol', 'Quit smoking', 'Manage stress'],
    complications: ['Heart attack', 'Stroke', 'Kidney damage', 'Vision loss', 'Heart failure'],
    relatedMedicines: ['Amlodipine', 'Lisinopril', 'Losartan'],
    exercises: ['Walking', 'Breathing exercises', 'Swimming'],
    icon: '❤️',
  },
  {
    id: 'dis2',
    name: 'Type 2 Diabetes',
    category: 'Endocrine',
    overview: 'Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose). With type 2 diabetes, the body either doesn\'t produce enough insulin or doesn\'t use it well.',
    symptoms: ['Increased thirst', 'Frequent urination', 'Increased hunger', 'Unintended weight loss', 'Fatigue', 'Blurred vision', 'Slow-healing sores'],
    causes: ['Insulin resistance', 'Genetic predisposition', 'Excess body weight', 'Physical inactivity', 'Poor diet'],
    riskFactors: ['Overweight or obese', 'Physical inactivity', 'Family history', 'Age over 45', 'Prediabetes', 'High blood pressure'],
    diagnosis: ['Fasting blood glucose test', 'HbA1c test', 'Oral glucose tolerance test', 'Random blood sugar test'],
    treatments: ['Blood sugar monitoring', 'Healthy eating', 'Exercise', 'Oral medications', 'Insulin therapy'],
    prevention: ['Maintain healthy weight', 'Regular physical activity', 'Eat a balanced diet', 'Avoid excessive sugar', 'Regular health checkups'],
    complications: ['Heart and blood vessel disease', 'Nerve damage', 'Kidney disease', 'Eye damage', 'Foot damage'],
    relatedMedicines: ['Metformin', 'Glipizide', 'Insulin'],
    exercises: ['Walking', 'Cycling', 'Resistance training'],
    icon: '🩸',
  },
  {
    id: 'dis3',
    name: 'Asthma',
    category: 'Respiratory',
    overview: 'Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath.',
    symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Coughing', 'Trouble sleeping due to breathing difficulties'],
    causes: ['Airborne allergens', 'Respiratory infections', 'Physical activity', 'Cold air', 'Air pollutants', 'Certain medications'],
    riskFactors: ['Allergic conditions', 'Family history', 'Smoking', 'Being overweight', 'Exposure to occupational triggers'],
    diagnosis: ['Spirometry', 'Peak flow measurement', 'Methacholine challenge test', 'Allergy testing', 'Chest X-ray'],
    treatments: ['Long-term control medications', 'Quick-relief inhalers', 'Allergy treatments', 'Bronchial thermoplasty'],
    prevention: ['Identify and avoid triggers', 'Get vaccinated for flu', 'Monitor breathing', 'Follow medication plan'],
    complications: ['Sleep disturbances', 'Permanent narrowing of airways', 'Respiratory failure', 'Medication side effects'],
    relatedMedicines: ['Salbutamol inhaler', 'Beclomethasone', 'Montelukast'],
    exercises: ['Breathing exercises', 'Swimming', 'Yoga'],
    icon: '🫁',
  },
  {
    id: 'dis4',
    name: 'Depression',
    category: 'Mental Health',
    overview: 'Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think and behave.',
    symptoms: ['Persistent sadness', 'Loss of interest', 'Sleep disturbances', 'Fatigue', 'Difficulty concentrating', 'Feelings of worthlessness', 'Appetite changes'],
    causes: ['Brain chemistry imbalances', 'Hormonal changes', 'Inherited traits', 'Life events', 'Trauma', 'Chronic illness'],
    riskFactors: ['Family history', 'Trauma or stress', 'Other mental health conditions', 'Chronic illness', 'Substance misuse'],
    diagnosis: ['Physical exam', 'Lab tests', 'Psychiatric evaluation', 'DSM-5 criteria assessment'],
    treatments: ['Psychotherapy', 'Antidepressants', 'Brain stimulation therapies', 'Lifestyle changes', 'Support groups'],
    prevention: ['Stress management', 'Regular exercise', 'Strong social connections', 'Adequate sleep', 'Early treatment of symptoms'],
    complications: ['Suicidal thoughts', 'Physical health problems', 'Relationship difficulties', 'Work/school problems'],
    relatedMedicines: ['Sertraline', 'Fluoxetine', 'Escitalopram'],
    exercises: ['Walking', 'Yoga', 'Relaxation techniques'],
    icon: '🧠',
  },
  {
    id: 'dis5',
    name: 'Arthritis',
    category: 'Musculoskeletal',
    overview: 'Arthritis is inflammation of one or more joints, causing pain and stiffness that can worsen with age. The most common types are osteoarthritis and rheumatoid arthritis.',
    symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Redness', 'Decreased range of motion', 'Morning stiffness'],
    causes: ['Cartilage breakdown (osteoarthritis)', 'Immune system attacking joints (RA)', 'Age', 'Joint injury', 'Infection'],
    riskFactors: ['Older age', 'Female gender', 'Family history', 'Previous joint injury', 'Obesity'],
    diagnosis: ['Physical examination', 'Blood tests', 'X-rays', 'MRI scan', 'Joint fluid analysis'],
    treatments: ['Pain medications', 'Anti-inflammatory drugs', 'Physical therapy', 'Joint replacement surgery', 'Lifestyle changes'],
    prevention: ['Maintain healthy weight', 'Exercise regularly', 'Protect joints from injury', 'Quit smoking'],
    complications: ['Decreased mobility', 'Permanent joint damage', 'Cardiovascular complications', 'Depression'],
    relatedMedicines: ['Ibuprofen', 'Naproxen', 'Methotrexate'],
    exercises: ['Swimming', 'Stretching', 'Gentle yoga'],
    icon: '🦴',
  },
  {
    id: 'dis6',
    name: 'Migraine',
    category: 'Neurological',
    overview: 'A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It\'s often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.',
    symptoms: ['Severe headache', 'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 'Visual disturbances (aura)', 'Dizziness'],
    causes: ['Hormonal changes', 'Certain foods and drinks', 'Stress', 'Sensory stimuli', 'Sleep changes', 'Physical exertion'],
    riskFactors: ['Family history', 'Female gender', 'Hormonal changes', 'Age 30–40'],
    diagnosis: ['Neurological exam', 'MRI', 'CT scan', 'Headache diary review'],
    treatments: ['Pain-relieving medications', 'Preventive medications', 'Lifestyle changes', 'Relaxation techniques'],
    prevention: ['Identify and avoid triggers', 'Regular sleep schedule', 'Stay hydrated', 'Stress management', 'Regular exercise'],
    complications: ['Chronic migraine', 'Medication overuse headache', 'Stroke (rare)', 'Status migrainosus'],
    relatedMedicines: ['Sumatriptan', 'Topiramate', 'Amitriptyline'],
    exercises: ['Yoga', 'Relaxation exercises', 'Gentle walking'],
    icon: '🤕',
  },
  {
    id: 'dis7',
    name: 'Eczema',
    category: 'Dermatological',
    overview: 'Eczema (atopic dermatitis) is a condition that makes your skin red and itchy. It\'s common in children but can occur at any age. It tends to be long lasting and may flare periodically.',
    symptoms: ['Dry skin', 'Itching', 'Red patches', 'Small raised bumps', 'Thickened skin', 'Skin sensitivity', 'Scaly skin'],
    causes: ['Genetic factors', 'Environmental factors', 'Immune system dysfunction', 'Skin barrier dysfunction'],
    riskFactors: ['Family history of eczema', 'Allergies', 'Asthma', 'Living in cities or cold climates'],
    diagnosis: ['Physical examination', 'Patch testing', 'Skin biopsy', 'Allergy testing'],
    treatments: ['Moisturizers', 'Corticosteroid creams', 'Antihistamines', 'Immunosuppressants', 'Light therapy'],
    prevention: ['Moisturize regularly', 'Avoid known triggers', 'Use gentle soaps', 'Manage stress', 'Wear soft fabrics'],
    complications: ['Chronic itchy skin', 'Skin infections', 'Sleep problems', 'Depression and anxiety'],
    relatedMedicines: ['Hydrocortisone cream', 'Tacrolimus', 'Cetirizine'],
    exercises: ['Swimming (with care)', 'Yoga', 'Low-impact exercises'],
    icon: '🩹',
  },
  {
    id: 'dis8',
    name: 'GERD',
    category: 'Digestive',
    overview: 'Gastroesophageal reflux disease (GERD) occurs when stomach acid repeatedly flows back into the esophagus. This backwash (acid reflux) can irritate the lining of your esophagus.',
    symptoms: ['Heartburn', 'Acid regurgitation', 'Difficulty swallowing', 'Chest pain', 'Sensation of lump in throat', 'Chronic cough', 'Disrupted sleep'],
    causes: ['Weak lower esophageal sphincter', 'Hiatal hernia', 'Obesity', 'Pregnancy', 'Smoking', 'Delayed stomach emptying'],
    riskFactors: ['Obesity', 'Pregnancy', 'Smoking', 'Eating large meals', 'Lying down after eating', 'Certain medications'],
    diagnosis: ['Upper endoscopy', 'Ambulatory acid probe test', 'X-ray of upper digestive system', 'Esophageal manometry'],
    treatments: ['Lifestyle changes', 'Antacids', 'Proton pump inhibitors', 'H-2 receptor blockers', 'Surgery (severe cases)'],
    prevention: ['Maintain healthy weight', 'Avoid trigger foods', 'Eat smaller meals', 'Elevate head of bed', 'Quit smoking'],
    complications: ['Esophagitis', 'Esophageal stricture', 'Barrett\'s esophagus', 'Esophageal cancer'],
    relatedMedicines: ['Omeprazole', 'Ranitidine', 'Antacids'],
    exercises: ['Gentle walking after meals', 'Yoga', 'Posture exercises'],
    icon: '🫃',
  },
]

// ─── MEDICINES ──────────────────────────────────────────────────────────────
export const medicines: Medicine[] = [
  {
    id: 'm1',
    genericName: 'Paracetamol',
    brandNames: ['Tylenol', 'Panadol', 'Calpol'],
    category: 'Analgesic / Antipyretic',
    uses: 'Used to relieve mild to moderate pain (headache, backache, toothache, period pain) and to reduce fever.',
    precautions: ['Do not exceed recommended dose', 'Avoid with liver disease', 'Check for paracetamol in other combination products'],
    sideEffects: ['Nausea (rare)', 'Liver damage with overdose'],
    interactions: ['Warfarin (increased bleeding risk)', 'Alcohol (liver damage risk)'],
    storage: 'Store below 25°C away from moisture and direct sunlight.',
    prescriptionRequired: false,
    icon: '💊',
  },
  {
    id: 'm2',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Trimox'],
    category: 'Antibiotic (Penicillin)',
    uses: 'Used to treat bacterial infections including ear infections, chest infections, dental abscesses, and urinary tract infections.',
    precautions: ['Not effective against viral infections', 'Inform doctor of penicillin allergy', 'Complete the full course'],
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Allergic reactions'],
    interactions: ['Warfarin', 'Methotrexate', 'Combined contraceptives'],
    storage: 'Store at room temperature. Reconstituted suspension in refrigerator.',
    prescriptionRequired: true,
    icon: '💊',
  },
  {
    id: 'm3',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet', 'Glumetza'],
    category: 'Antidiabetic (Biguanide)',
    uses: 'First-line treatment for type 2 diabetes. Helps control blood sugar by decreasing glucose production in the liver and improving insulin sensitivity.',
    precautions: ['Monitor kidney function', 'Hold before contrast imaging procedures', 'Not for type 1 diabetes'],
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Vitamin B12 deficiency (long-term)'],
    interactions: ['Alcohol', 'Contrast dye', 'Certain diuretics'],
    storage: 'Store at room temperature away from moisture and heat.',
    prescriptionRequired: true,
    icon: '💉',
  },
  {
    id: 'm4',
    genericName: 'Amlodipine',
    brandNames: ['Norvasc', 'Istin'],
    category: 'Calcium Channel Blocker',
    uses: 'Used to treat high blood pressure (hypertension) and chest pain (angina). Helps relax and widen blood vessels.',
    precautions: ['Monitor blood pressure regularly', 'Do not stop suddenly', 'Caution in liver disease'],
    sideEffects: ['Ankle swelling', 'Flushing', 'Headache', 'Dizziness', 'Palpitations'],
    interactions: ['Simvastatin (increased muscle risk)', 'Cyclosporine', 'Grapefruit juice'],
    storage: 'Store at room temperature, protect from light.',
    prescriptionRequired: true,
    icon: '❤️',
  },
  {
    id: 'm5',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec'],
    category: 'Proton Pump Inhibitor',
    uses: 'Used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and conditions with excessive acid production.',
    precautions: ['Not for immediate heartburn relief', 'Long-term use monitor magnesium levels', 'May mask stomach cancer symptoms'],
    sideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Stomach pain', 'Low magnesium (long-term)'],
    interactions: ['Clopidogrel (reduced effectiveness)', 'Methotrexate', 'Digoxin'],
    storage: 'Store at room temperature in original container.',
    prescriptionRequired: false,
    icon: '🫃',
  },
  {
    id: 'm6',
    genericName: 'Sertraline',
    brandNames: ['Zoloft', 'Lustral'],
    category: 'SSRI Antidepressant',
    uses: 'Used to treat depression, panic disorder, obsessive-compulsive disorder, PTSD, social anxiety disorder, and premenstrual dysphoric disorder.',
    precautions: ['Not for children under 6', 'Monitor for suicidal thoughts initially', 'Taper off slowly when discontinuing'],
    sideEffects: ['Nausea', 'Diarrhea', 'Insomnia', 'Dizziness', 'Decreased libido', 'Dry mouth'],
    interactions: ['MAOIs (serious interaction)', 'Blood thinners', 'Other serotonergic drugs'],
    storage: 'Store at room temperature, protect from moisture.',
    prescriptionRequired: true,
    icon: '🧠',
  },
  {
    id: 'm7',
    genericName: 'Ibuprofen',
    brandNames: ['Nurofen', 'Advil', 'Brufen'],
    category: 'NSAID (Anti-inflammatory)',
    uses: 'Used to relieve pain, reduce inflammation, and lower fever. Effective for headaches, dental pain, period pain, back pain, and arthritis.',
    precautions: ['Take with food or milk', 'Avoid with stomach ulcers', 'Caution with kidney/heart conditions', 'Avoid in late pregnancy'],
    sideEffects: ['Stomach upset', 'Heartburn', 'Nausea', 'Dizziness', 'Increased blood pressure'],
    interactions: ['Aspirin', 'Blood pressure medications', 'Blood thinners', 'Lithium'],
    storage: 'Store at room temperature.',
    prescriptionRequired: false,
    icon: '💊',
  },
  {
    id: 'm8',
    genericName: 'Salbutamol',
    brandNames: ['Ventolin', 'ProAir', 'Proventil'],
    category: 'Bronchodilator (Beta-2 Agonist)',
    uses: 'Used to treat and prevent bronchospasm in conditions such as asthma and chronic obstructive pulmonary disease (COPD).',
    precautions: ['Follow inhaler technique carefully', 'Overuse can reduce effectiveness', 'Inform doctor of heart conditions'],
    sideEffects: ['Shakiness/tremor', 'Fast heartbeat', 'Headache', 'Dizziness', 'Muscle cramps'],
    interactions: ['Beta-blockers (opposing effects)', 'Digoxin', 'Diuretics'],
    storage: 'Store inhaler between 15–25°C. Do not freeze.',
    prescriptionRequired: true,
    icon: '🫁',
  },
]

// ─── EXERCISES ──────────────────────────────────────────────────────────────
export const exercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Brisk Walking',
    category: 'Walking',
    description: 'A moderate-intensity aerobic activity that involves walking at a faster pace than usual.',
    benefits: ['Improves cardiovascular health', 'Helps manage blood pressure', 'Aids weight management', 'Improves mood', 'Strengthens bones'],
    difficulty: 'Easy',
    duration: '30 minutes daily',
    precautions: ['Wear supportive shoes', 'Stay hydrated', 'Start slowly and gradually increase pace', 'Stop if you feel chest pain or dizziness'],
    icon: '🚶',
    steps: ['Begin with a 5-minute warm-up walk', 'Gradually increase pace to brisk walking', 'Maintain for 20–30 minutes', 'Cool down with 5 minutes of gentle walking', 'Stretch calf and thigh muscles afterward'],
  },
  {
    id: 'ex2',
    name: 'Diaphragmatic Breathing',
    category: 'Breathing exercises',
    description: 'A breathing technique that strengthens the diaphragm and promotes deep, efficient breathing patterns.',
    benefits: ['Reduces stress and anxiety', 'Helps with asthma management', 'Improves lung capacity', 'Promotes relaxation', 'Lowers blood pressure'],
    difficulty: 'Easy',
    duration: '10–15 minutes daily',
    precautions: ['Practice in a comfortable seated or lying position', 'Do not hyperventilate', 'Seek guidance if you have severe respiratory conditions'],
    icon: '🌬️',
    steps: ['Lie on your back or sit comfortably', 'Place one hand on chest, one on abdomen', 'Breathe in slowly through nose for 4 counts', 'Feel your abdomen rise, chest still', 'Exhale slowly through pursed lips for 6 counts', 'Repeat 5–10 times'],
  },
  {
    id: 'ex3',
    name: 'Yoga Sun Salutation',
    category: 'Mobility',
    description: 'A sequence of yoga poses performed in a flow that combines breathing with movement for full-body wellness.',
    benefits: ['Improves flexibility', 'Builds strength', 'Calms the mind', 'Improves posture', 'Boosts energy'],
    difficulty: 'Moderate',
    duration: '15–20 minutes',
    precautions: ['Not recommended immediately after surgery', 'Avoid in acute back pain', 'Consult a healthcare professional before starting if you have joint issues', 'Stop if you feel pain'],
    icon: '🧘',
    steps: ['Start in mountain pose (Tadasana)', 'Raise arms overhead (Urdhva Hastasana)', 'Forward fold (Uttanasana)', 'Step back to plank', 'Lower to floor (Chaturanga)', 'Cobra pose (Bhujangasana)', 'Downward dog (Adho Mukha)', 'Step forward and return to standing'],
  },
  {
    id: 'ex4',
    name: 'Seated Resistance Band Exercise',
    category: 'Strength & conditioning',
    description: 'Gentle resistance training performed in a seated position, suitable for older adults or those with mobility limitations.',
    benefits: ['Builds muscle strength', 'Improves joint stability', 'Suitable for arthritis', 'Low impact', 'Improves daily function'],
    difficulty: 'Easy',
    duration: '20 minutes, 3x per week',
    precautions: ['Use appropriate resistance band tension', 'Avoid if experiencing joint inflammation', 'Maintain proper posture', 'Stop if you experience pain'],
    icon: '💪',
    steps: ['Sit upright in a sturdy chair', 'Anchor band under feet for leg exercises', 'Perform bicep curls 10–15 repetitions', 'Shoulder press 10 repetitions', 'Seated row 10–15 repetitions', 'Rest 60 seconds between sets', 'Complete 2–3 sets'],
  },
  {
    id: 'ex5',
    name: 'Swimming',
    category: 'General fitness',
    description: 'A full-body low-impact aerobic exercise performed in water that is gentle on joints.',
    benefits: ['Full-body workout', 'Excellent for joint health', 'Improves cardiovascular fitness', 'Suitable for all fitness levels', 'Reduces stress'],
    difficulty: 'Moderate',
    duration: '30 minutes, 3–4x per week',
    precautions: ['Learn to swim safely first', 'Do not swim alone', 'Check pool hygiene', 'Consult doctor if you have open wounds or skin conditions'],
    icon: '🏊',
    steps: ['Warm up with gentle water movements', 'Practice freestyle or breaststroke', 'Swim continuously for 20 minutes', 'Incorporate rest periods if needed', 'Cool down with gentle floating or slow laps'],
  },
  {
    id: 'ex6',
    name: 'Progressive Muscle Relaxation',
    category: 'Relaxation',
    description: 'A relaxation technique involving tensing and then releasing each muscle group to reduce overall body tension.',
    benefits: ['Reduces anxiety', 'Improves sleep', 'Relieves muscle tension', 'Lowers stress hormones', 'Easy to learn'],
    difficulty: 'Easy',
    duration: '15–20 minutes',
    precautions: ['Avoid tensing painful or injured areas', 'Practice in quiet environment', 'Not a substitute for medical treatment'],
    icon: '😌',
    steps: ['Find a comfortable position (lying or seated)', 'Close eyes and breathe slowly', 'Starting with feet, tense muscles firmly for 5 seconds', 'Release tension and notice the relaxation for 15 seconds', 'Move upward through body: calves, thighs, abdomen, chest, arms, face', 'End with slow deep breaths'],
  },
]

// ─── APPOINTMENTS ───────────────────────────────────────────────────────────
export const appointments: Appointment[] = [
  { id: 'apt1', patientName: 'John Doe', doctorName: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', date: '2026-09-10', time: '10:00 AM', status: 'confirmed', reason: 'Blood pressure checkup', queueNumber: 'A-024' },
  { id: 'apt2', patientName: 'John Doe', doctorName: 'Dr. Omar Sheikh', specialty: 'General Physician', date: '2026-09-05', time: '2:00 PM', status: 'upcoming', reason: 'General checkup', queueNumber: 'B-007' },
  { id: 'apt3', patientName: 'John Doe', doctorName: 'Dr. Ahmed Raza', specialty: 'Neurologist', date: '2026-08-20', time: '11:00 AM', status: 'completed', reason: 'Migraine consultation', queueNumber: 'A-015' },
  { id: 'apt4', patientName: 'John Doe', doctorName: 'Dr. Fatima Khan', specialty: 'Pediatrician', date: '2026-08-05', time: '9:00 AM', status: 'completed', reason: 'Follow-up visit', queueNumber: 'C-003' },
  { id: 'apt5', patientName: 'John Doe', doctorName: 'Dr. Ayesha Siddiqui', specialty: 'Dermatologist', date: '2026-09-25', time: '3:00 PM', status: 'pending', reason: 'Skin rash assessment', queueNumber: 'D-012' },
]

// ─── PATIENTS ────────────────────────────────────────────────────────────────
export const patients: Patient[] = [
  { id: 'p1', name: 'John Doe',        age: 34, gender: 'Male',   bloodGroup: 'O+', contact: '0300-1234567', email: 'john@example.com',    lastVisit: '2026-09-03', condition: 'Hypertension' },
  { id: 'p2', name: 'Amina Malik',     age: 28, gender: 'Female', bloodGroup: 'A+', contact: '0301-9876543', email: 'amina@example.com',   lastVisit: '2026-09-01', condition: 'Type 2 Diabetes' },
  { id: 'p3', name: 'Tariq Hassan',    age: 52, gender: 'Male',   bloodGroup: 'B-', contact: '0302-5557891', email: 'tariq@example.com',   lastVisit: '2026-08-28', condition: 'Arthritis' },
  { id: 'p4', name: 'Sara Ahmed',      age: 22, gender: 'Female', bloodGroup: 'AB+', contact: '0303-1112233', email: 'sara@example.com',    lastVisit: '2026-08-25', condition: 'Asthma' },
  { id: 'p5', name: 'Usman Khan',      age: 45, gender: 'Male',   bloodGroup: 'O-', contact: '0304-4445566', email: 'usman@example.com',   lastVisit: '2026-09-02', condition: 'GERD' },
  { id: 'p6', name: 'Hina Qureshi',    age: 38, gender: 'Female', bloodGroup: 'A-', contact: '0305-7778899', email: 'hina@example.com',    lastVisit: '2026-09-04', condition: 'Depression' },
]

// ─── ARTICLES ────────────────────────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: 'art1',
    title: '10 Heart-Healthy Habits You Can Start Today',
    category: 'Prevention',
    excerpt: 'Simple lifestyle changes can dramatically reduce your risk of cardiovascular disease. Discover practical habits that protect your heart.',
    readTime: '5 min read',
    date: '2026-09-01',
    author: 'Dr. Sarah Mitchell',
    image: '',
    tags: ['Heart Health', 'Prevention', 'Lifestyle'],
  },
  {
    id: 'art2',
    title: 'Understanding Blood Sugar: A Complete Guide for Diabetics',
    category: 'Medical Education',
    excerpt: 'Managing blood sugar is central to living well with diabetes. This comprehensive guide explains what you need to know.',
    readTime: '8 min read',
    date: '2026-08-28',
    author: 'Dr. Omar Sheikh',
    image: '',
    tags: ['Diabetes', 'Blood Sugar', 'Health Management'],
  },
  {
    id: 'art3',
    title: 'The Mental Health Benefits of Regular Exercise',
    category: 'Mental Wellness',
    excerpt: 'Physical activity has profound effects on mental well-being. Learn how even moderate exercise can improve mood, reduce anxiety and depression.',
    readTime: '6 min read',
    date: '2026-08-20',
    author: 'Dr. Bilal Mahmood',
    image: '',
    tags: ['Mental Health', 'Exercise', 'Wellness'],
  },
  {
    id: 'art4',
    title: 'Nutrition Basics: Building a Balanced Diet',
    category: 'Nutrition',
    excerpt: 'Good nutrition is the foundation of good health. This guide covers the essential components of a balanced, health-supporting diet.',
    readTime: '7 min read',
    date: '2026-08-15',
    author: 'Health Team',
    image: '',
    tags: ['Nutrition', 'Diet', 'Health'],
  },
  {
    id: 'art5',
    title: 'Managing Stress in Modern Life',
    category: 'General Health',
    excerpt: 'Chronic stress affects nearly every aspect of health. Explore evidence-informed strategies for building resilience and managing stress effectively.',
    readTime: '5 min read',
    date: '2026-08-10',
    author: 'Dr. Bilal Mahmood',
    image: '',
    tags: ['Stress', 'Mental Health', 'Wellbeing'],
  },
  {
    id: 'art6',
    title: "Children's Health: Key Milestones and Warning Signs",
    category: "Children's Health",
    excerpt: 'Understanding developmental milestones helps parents support their child\'s growth. Know what to watch for and when to seek professional advice.',
    readTime: '6 min read',
    date: '2026-08-05',
    author: 'Dr. Fatima Khan',
    image: '',
    tags: ["Children's Health", 'Pediatrics', 'Development'],
  },
]

// ─── MEDICAL RECORDS ────────────────────────────────────────────────────────
export const medicalRecords = [
  { id: 'mr1', date: '2026-09-03', type: 'Doctor Visit',  title: 'Cardiology Consultation', doctor: 'Dr. Sarah Mitchell', notes: 'Blood pressure 140/90. Medication adjusted. Follow-up in 6 weeks.', attachments: 0 },
  { id: 'mr2', date: '2026-08-15', type: 'Lab Report',    title: 'Complete Blood Count',    doctor: 'Lab Services',        notes: 'All values within normal range. Hemoglobin 13.5 g/dL.',         attachments: 1 },
  { id: 'mr3', date: '2026-08-20', type: 'Prescription',  title: 'Amlodipine 5mg',          doctor: 'Dr. Sarah Mitchell', notes: 'Once daily in the morning. 30-day supply.',                      attachments: 1 },
  { id: 'mr4', date: '2026-07-10', type: 'Doctor Visit',  title: 'Neurology Consultation',  doctor: 'Dr. Ahmed Raza',      notes: 'Migraine management plan initiated. Sumatriptan prescribed.',     attachments: 0 },
  { id: 'mr5', date: '2026-06-25', type: 'Imaging',       title: 'Chest X-Ray',             doctor: 'Radiology Dept',      notes: 'No acute cardiopulmonary process identified.',                    attachments: 1 },
]

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
export const notificationsData = [
  { id: 'n1', type: 'appointment', title: 'Appointment Confirmed', message: 'Your appointment with Dr. Sarah Mitchell on Sep 10 at 10:00 AM is confirmed.', time: '2 hours ago', read: false },
  { id: 'n2', type: 'queue',       title: 'Queue Update',          message: 'You are next in the queue at City Heart Institute. Queue: A-024.',              time: '3 hours ago', read: false },
  { id: 'n3', type: 'message',     title: 'New Message',           message: 'Dr. Omar Sheikh sent you a message regarding your prescription.',               time: '5 hours ago', read: false },
  { id: 'n4', type: 'report',      title: 'Lab Report Ready',      message: 'Your Complete Blood Count report is now available to view.',                    time: '1 day ago',   read: true  },
  { id: 'n5', type: 'reminder',    title: 'Medication Reminder',   message: 'Remember to take your Amlodipine 5mg this morning.',                           time: '1 day ago',   read: true  },
]

// ─── MESSAGES ────────────────────────────────────────────────────────────────
export const messagesData = [
  {
    id: 'conv1',
    contact: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    lastMessage: 'Please continue the medication and monitor your blood pressure daily.',
    time: '10:30 AM',
    unread: 1,
    messages: [
      { id: 1, sender: 'doctor', text: 'Hello John, how have you been feeling since our last visit?', time: '10:00 AM' },
      { id: 2, sender: 'patient', text: 'Hello Doctor, I have been feeling much better. The blood pressure has stabilized.', time: '10:15 AM' },
      { id: 3, sender: 'doctor', text: 'That is great news! Please continue the medication and monitor your blood pressure daily.', time: '10:30 AM' },
    ],
  },
  {
    id: 'conv2',
    contact: 'Dr. Omar Sheikh',
    specialty: 'General Physician',
    lastMessage: 'I have updated your prescription. Please collect it from the pharmacy.',
    time: 'Yesterday',
    unread: 2,
    messages: [
      { id: 1, sender: 'doctor', text: 'Hi John, your blood test results have come back and everything looks normal.', time: 'Yesterday 2:00 PM' },
      { id: 2, sender: 'patient', text: 'Thank you Doctor! That is a relief.', time: 'Yesterday 2:30 PM' },
      { id: 3, sender: 'doctor', text: 'I have updated your prescription. Please collect it from the pharmacy.', time: 'Yesterday 3:00 PM' },
    ],
  },
]

// ─── QUEUE DATA ───────────────────────────────────────────────────────────────
export const queueData = {
  yourNumber: 'A-024',
  currentNumber: 'A-021',
  patientsAhead: 3,
  estimatedWait: '~15 minutes',
  doctor: 'Dr. Sarah Mitchell',
  clinic: 'City Heart Institute',
  status: 'waiting',
  totalInQueue: 12,
}

// ─── CHART DATA ───────────────────────────────────────────────────────────────
export const monthlyAppointmentsData = [
  { month: 'Jan', appointments: 3 },
  { month: 'Feb', appointments: 5 },
  { month: 'Mar', appointments: 2 },
  { month: 'Apr', appointments: 7 },
  { month: 'May', appointments: 4 },
  { month: 'Jun', appointments: 6 },
  { month: 'Jul', appointments: 8 },
  { month: 'Aug', appointments: 5 },
  { month: 'Sep', appointments: 3 },
]

export const appointmentStatusData = [
  { name: 'Completed',  value: 12, color: '#10b981' },
  { name: 'Upcoming',   value: 3,  color: '#2578ea' },
  { name: 'Pending',    value: 2,  color: '#f59e0b' },
  { name: 'Cancelled',  value: 1,  color: '#ef4444' },
]

export const adminUserGrowthData = [
  { month: 'Jan', patients: 120, doctors: 8  },
  { month: 'Feb', patients: 185, doctors: 12 },
  { month: 'Mar', patients: 240, doctors: 15 },
  { month: 'Apr', patients: 310, doctors: 18 },
  { month: 'May', patients: 398, doctors: 22 },
  { month: 'Jun', patients: 475, doctors: 26 },
  { month: 'Jul', patients: 560, doctors: 30 },
  { month: 'Aug', patients: 648, doctors: 34 },
  { month: 'Sep', patients: 720, doctors: 38 },
]

export const specialtiesData = [
  { specialty: 'Cardiology',   count: 8  },
  { specialty: 'General',      count: 15 },
  { specialty: 'Pediatrics',   count: 6  },
  { specialty: 'Orthopedics',  count: 5  },
  { specialty: 'Neurology',    count: 4  },
  { specialty: 'Dermatology',  count: 7  },
  { specialty: 'Psychiatry',   count: 3  },
]

export const diseaseCategories = [
  'All', 'Cardiovascular', 'Respiratory', 'Neurological', 'Digestive',
  'Endocrine', 'Musculoskeletal', 'Dermatological', 'Infectious',
  'Mental Health', 'Kidney & Urinary', 'Liver', 'Eye', 'ENT',
  "Women's Health", "Men's Health", "Children's Health", 'Oral Health',
  'Autoimmune', 'Genetic', 'Allergies', 'Common Illnesses',
]

export const medicineCategories = [
  'All', 'Analgesic / Antipyretic', 'Antibiotic', 'Antidiabetic',
  'Calcium Channel Blocker', 'Proton Pump Inhibitor', 'SSRI Antidepressant',
  'NSAID', 'Bronchodilator', 'Antihistamine', 'Antihypertensive',
]

export const exerciseCategories = [
  'All', 'Walking', 'Stretching', 'Mobility', 'Strength & conditioning',
  'Breathing exercises', 'General fitness', 'Posture', 'Relaxation', 'Healthy lifestyle',
]

export const doctorSpecialties = [
  'All', 'Cardiologist', 'General Physician', 'Neurologist', 'Pediatrician',
  'Orthopedic Surgeon', 'Dermatologist', 'Gynecologist', 'Psychiatrist',
  'ENT Specialist', 'Ophthalmologist', 'Urologist', 'Gastroenterologist',
]

export const symptoms = [
  'Headache', 'Fever', 'Cough', 'Shortness of breath', 'Chest pain',
  'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue', 'Dizziness',
  'Joint pain', 'Muscle ache', 'Rash', 'Itching', 'Swelling',
  'Sore throat', 'Runny nose', 'Abdominal pain', 'Back pain',
  'Blurred vision', 'Frequent urination', 'Excessive thirst',
  'Weight loss', 'Anxiety', 'Insomnia', 'Palpitations',
]

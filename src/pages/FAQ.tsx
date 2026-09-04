import Accordion from '../components/ui/Accordion'

const sections = [
  {
    title: 'Getting Started',
    items: [
      { question: 'What is BE CAREFUL?', answer: 'BE CAREFUL is an educational healthcare information and digital management platform. It helps patients find healthcare information, locate doctors, book appointments, track clinic queues, and manage their health records.' },
      { question: 'Is BE CAREFUL a medical service?', answer: 'No. BE CAREFUL is an educational and management platform. It does not provide medical diagnosis, treatment, or prescriptions. Always consult a qualified healthcare professional for medical concerns.' },
      { question: 'How do I create an account?', answer: 'Click "Create Patient Account" on the login page or from the home page. Fill in your name, email, phone, and password. Your account will be created instantly.' },
    ],
  },
  {
    title: 'Appointments & Queue',
    items: [
      { question: 'How do I book an appointment?', answer: 'Navigate to "Find Doctors" or "Appointments", select your desired doctor, choose a date and available time slot, enter your reason for visit, and confirm. A queue number will be assigned.' },
      { question: 'How does the patient queue work?', answer: 'Upon booking a confirmed appointment, you receive a queue number. You can track your real-time position from the Queue page or your Patient Dashboard.' },
      { question: 'Can I cancel an appointment?', answer: 'Yes. From your Appointments page, find the appointment and click Cancel. Cancellation policies may vary by clinic in a real implementation.' },
      { question: 'Can I reschedule?', answer: 'In a full implementation, rescheduling would be available. For this demo, you can cancel and re-book at a new time.' },
    ],
  },
  {
    title: 'Health Information',
    items: [
      { question: 'How accurate is the health information?', answer: 'All health information on BE CAREFUL is general educational content. It is not a substitute for professional medical advice, diagnosis, or treatment.' },
      { question: 'Can I use the Symptom Explorer to diagnose myself?', answer: 'No. The Symptom Explorer is an educational tool to help you understand general health information. It cannot and does not diagnose medical conditions. Always consult a healthcare professional for diagnosis.' },
      { question: 'Are the medicine details medically verified?', answer: 'Medicine information is general educational reference only. Always consult a doctor or pharmacist before taking any medication.' },
    ],
  },
  {
    title: 'Doctors & Verification',
    items: [
      { question: 'How do doctors join the platform?', answer: 'Doctors register through the Doctor Registration page and submit their credentials for verification. Accounts are reviewed before being listed.' },
      { question: 'Are the doctors real?', answer: 'This is a demonstration platform. All doctor profiles shown are fictional and created for demonstration purposes only.' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { question: 'Is my health data secure?', answer: 'This is a demonstration platform. Do not enter real personal health information. In a production implementation, industry-standard security measures would be implemented.' },
      { question: 'Who can see my records?', answer: 'In this demo, records are locally stored. A real implementation would require strict role-based access controls and security measures.' },
    ],
  },
]

export default function FAQ() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="page-header">
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle">Find answers to common questions about BE CAREFUL.</p>
      </div>

      {sections.map(section => (
        <div key={section.title}>
          <h2 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary-500 rounded-full" /> {section.title}
          </h2>
          <Accordion items={section.items} allowMultiple />
        </div>
      ))}

      <div className="card bg-primary-50 border-primary-100 text-center">
        <p className="font-semibold text-slate-800 mb-1">Still have questions?</p>
        <p className="text-sm text-slate-500 mb-4">Our support team is here to help.</p>
        <a href="/contact" className="btn-primary inline-flex text-sm py-2.5">Contact Support</a>
      </div>
    </div>
  )
}

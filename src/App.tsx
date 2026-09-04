import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import SplashScreen from './components/SplashScreen'
import Layout from './components/Layout'
import { ToastContainer } from './components/ui/Toast'

// Eager — needed before splash completes
import Home            from './pages/Home'
import PatientLogin    from './pages/auth/PatientLogin'
import PatientRegister from './pages/auth/PatientRegister'
import DoctorLogin     from './pages/auth/DoctorLogin'
import DoctorRegister  from './pages/auth/DoctorRegister'
import AdminLogin      from './pages/auth/AdminLogin'

// Lazy — loaded on demand
const PatientDashboard = lazy(() => import('./pages/dashboards/PatientDashboard'))
const DoctorDashboard  = lazy(() => import('./pages/dashboards/DoctorDashboard'))
const AdminDashboard   = lazy(() => import('./pages/dashboards/AdminDashboard'))
const Diseases         = lazy(() => import('./pages/Diseases'))
const DiseaseDetail    = lazy(() => import('./pages/DiseaseDetail'))
const Medicines        = lazy(() => import('./pages/Medicines'))
const MedicineDetail   = lazy(() => import('./pages/MedicineDetail'))
const Exercises        = lazy(() => import('./pages/Exercises'))
const ExerciseDetail   = lazy(() => import('./pages/ExerciseDetail'))
const ArticleDetail    = lazy(() => import('./pages/ArticleDetail'))
const Doctors          = lazy(() => import('./pages/Doctors'))
const DoctorProfile    = lazy(() => import('./pages/DoctorProfile'))
const Appointments     = lazy(() => import('./pages/Appointments'))
const Queue            = lazy(() => import('./pages/Queue'))
const MedicalRecords   = lazy(() => import('./pages/MedicalRecords'))
const Prescriptions    = lazy(() => import('./pages/Prescriptions'))
const HealthReports    = lazy(() => import('./pages/HealthReports'))
const Messages         = lazy(() => import('./pages/Messages'))
const Notifications    = lazy(() => import('./pages/Notifications'))
const Articles         = lazy(() => import('./pages/Articles'))
const FAQ              = lazy(() => import('./pages/FAQ'))
const Emergency        = lazy(() => import('./pages/Emergency'))
const SymptomExplorer  = lazy(() => import('./pages/SymptomExplorer'))
const Settings         = lazy(() => import('./pages/Settings'))
const Profile          = lazy(() => import('./pages/Profile'))
const About            = lazy(() => import('./pages/About'))
const Contact          = lazy(() => import('./pages/Contact'))

// Loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-3">
        <svg className="w-8 h-8 animate-spin text-primary-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-sm text-slate-400 font-medium">Loading…</p>
      </div>
    </div>
  )
}

// Inline static pages
function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="section-title">Privacy Policy</h1>
      <div className="card space-y-4 text-sm text-slate-600 leading-relaxed">
        <p><strong>Demo Platform Notice:</strong> BE CAREFUL is a demonstration platform. Do not submit real personal or health information.</p>
        <p>In a production environment this policy would cover data collection, usage, storage, sharing, user rights, and compliance with applicable privacy laws.</p>
      </div>
    </div>
  )
}

function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="section-title">Terms &amp; Conditions</h1>
      <div className="card space-y-4 text-sm text-slate-600 leading-relaxed">
        <p><strong>BE CAREFUL</strong> is an educational healthcare information and management platform.</p>
        <p>This platform does not provide medical diagnosis, treatment, or prescriptions. All health information is educational only.</p>
        <p>All data displayed is fictional and for demonstration purposes only.</p>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">🔍</span>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go to Home</a>
    </div>
  )
}

// Route guard
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />
  return <>{children}</>
}

// Shorthand to wrap a lazy page with Layout + Suspense
function LP({ element }: { element: React.ReactNode }) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </Layout>
  )
}

function LPGuard({ element, role }: { element: React.ReactNode; role?: string }) {
  return (
    <Layout>
      <ProtectedRoute requiredRole={role}>
        <Suspense fallback={<PageLoader />}>{element}</Suspense>
      </ProtectedRoute>
    </Layout>
  )
}

// App shell — shows splash then routes
function AppShell() {
  const { setIsLoading } = useApp()
  const [splashDone, setSplashDone] = useState(false)

  if (!splashDone) {
    return (
      <SplashScreen onComplete={() => { setSplashDone(true); setIsLoading(false) }} />
    )
  }

  return (
    <Routes>
      {/* Auth — no layout */}
      <Route path="/login"           element={<PatientLogin />} />
      <Route path="/register"        element={<PatientRegister />} />
      <Route path="/doctor/login"    element={<DoctorLogin />} />
      <Route path="/doctor/register" element={<DoctorRegister />} />
      <Route path="/admin/login"     element={<AdminLogin />} />

      {/* Full-width public pages */}
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />

      {/* Layout-wrapped routes */}
      <Route path="/privacy"  element={<LP element={<Privacy />} />} />
      <Route path="/terms"    element={<LP element={<Terms />} />} />

      <Route path="/diseases"           element={<LP element={<Diseases />} />} />
      <Route path="/diseases/:id"       element={<LP element={<DiseaseDetail />} />} />
      <Route path="/medicines"          element={<LP element={<Medicines />} />} />
      <Route path="/medicines/:id"      element={<LP element={<MedicineDetail />} />} />
      <Route path="/exercises"          element={<LP element={<Exercises />} />} />
      <Route path="/exercises/:id"      element={<LP element={<ExerciseDetail />} />} />
      <Route path="/doctors"            element={<LP element={<Doctors />} />} />
      <Route path="/doctors/:id"        element={<LP element={<DoctorProfile />} />} />
      <Route path="/appointments"       element={<LP element={<Appointments />} />} />
      <Route path="/queue"              element={<LP element={<Queue />} />} />
      <Route path="/articles"           element={<LP element={<Articles />} />} />
      <Route path="/articles/:id"       element={<LP element={<ArticleDetail />} />} />
      <Route path="/faq"                element={<LP element={<FAQ />} />} />
      <Route path="/emergency"          element={<LP element={<Emergency />} />} />
      <Route path="/symptoms"           element={<LP element={<SymptomExplorer />} />} />

      {/* Protected routes */}
      <Route path="/records"           element={<LPGuard element={<MedicalRecords />} />} />
      <Route path="/prescriptions"     element={<LPGuard element={<Prescriptions />} />} />
      <Route path="/reports"           element={<LPGuard element={<HealthReports />} />} />
      <Route path="/messages"          element={<LPGuard element={<Messages />} />} />
      <Route path="/notifications"     element={<LPGuard element={<Notifications />} />} />
      <Route path="/settings"          element={<LPGuard element={<Settings />} />} />
      <Route path="/profile"           element={<LPGuard element={<Profile />} />} />

      {/* Role-based dashboards */}
      <Route path="/patient/dashboard" element={<LPGuard element={<PatientDashboard />} role="patient" />} />
      <Route path="/doctor/dashboard"  element={<LPGuard element={<DoctorDashboard />}  role="doctor" />} />
      <Route path="/admin/dashboard"   element={<LPGuard element={<AdminDashboard />}   role="admin" />} />

      {/* 404 */}
      <Route path="*" element={<LP element={<NotFound />} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  )
}

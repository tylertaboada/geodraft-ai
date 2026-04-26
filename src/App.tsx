import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WorkflowSection from './components/WorkflowSection';
import ReportTool from './components/ReportTool';
import FeaturesSection from './components/FeaturesSection';
import ValueSection from './components/ValueSection';
import CtaFooter from './components/CtaFooter';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WorkflowSection />
        <ReportTool />
        <FeaturesSection />
        <ValueSection />
      </main>
      <CtaFooter />
    </div>
  );
}

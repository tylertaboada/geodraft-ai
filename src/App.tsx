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
    <div style={{ background: '#f7f6f3', minHeight: '100vh' }}>
      <Navbar />
      <main className="pt-14">
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
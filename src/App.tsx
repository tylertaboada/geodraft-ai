import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WorkflowSection from './components/WorkflowSection';
import ReportTool from './components/ReportTool';
import FeaturesSection from './components/FeaturesSection';
import ValueSection from './components/ValueSection';
import CtaFooter from './components/CtaFooter';

const StrataDivider = ({ flip = false }: { flip?: boolean }) => (
  <div
    style={{
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: flip ? 'scaleX(-1)' : undefined,
    }}
  >
    <svg
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '48px' }}
    >
      <path
        d="M0,24 C150,8 300,40 450,24 C600,8 750,40 900,24 C1050,8 1150,32 1200,24 L1200,48 L0,48 Z"
        fill="#ede9e3"
        opacity="0.6"
      />
      <path
        d="M0,32 C200,16 400,44 600,30 C800,16 1000,42 1200,28 L1200,48 L0,48 Z"
        fill="#e8e3dc"
        opacity="0.5"
      />
    </svg>
  </div>
);

export default function App() {
  return (
    <div style={{ background: '#f7f6f3', minHeight: '100vh' }}>
      <Navbar />
      <main className="pt-14">
        <div className="bg-topo">
          <Hero />
        </div>
        <StrataDivider />
        <div className="bg-grain depth-gradient">
          <ProblemSection />
        </div>
        <StrataDivider flip />
        <div className="depth-gradient">
          <WorkflowSection />
        </div>
        <StrataDivider />
        <div className="bg-grain depth-gradient">
          <ReportTool />
        </div>
        <StrataDivider flip />
        <div className="bg-topo">
          <FeaturesSection />
        </div>
        <StrataDivider />
        <div className="bg-grain">
          <ValueSection />
        </div>
        <StrataDivider flip />
      </main>
      <CtaFooter />
    </div>
  );
}

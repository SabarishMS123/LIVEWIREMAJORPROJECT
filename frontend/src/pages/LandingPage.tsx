import { Link } from 'react-router-dom';
import { Shield, Users, BarChart3, CheckCircle, ArrowRight, UserPlus, Building2 } from 'lucide-react';
import ecilogo from '../assets/ecilogo.png';

const LandingPage: React.FC = () => {
  const featureCards = [
    {
      icon: CheckCircle,
      title: 'Secure Voting',
      description: 'Role-based access, verified voter identity, and auditable election records.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Voter Management',
      description: 'Smooth voter registration, verification, and constituency-level management.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Building2,
      title: 'Party & Candidates',
      description: 'Manage party registration, candidate nomination, approval, and tracking.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: BarChart3,
      title: 'Real-time Results',
      description: 'Transparent result tracking with winner announcements and statistics.',
      color: 'from-orange-500 to-rose-500',
    },
  ];

  return (
    <div className="app-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-28 -right-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-white/70 p-3 shadow-xl lg:mx-0">
                <img src={ecilogo} alt="Election Commission logo" className="h-full w-full object-contain" />
              </div>
              <p className="mb-3 inline-flex rounded-full bg-blue-600/10 px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-600/15">
                Official Election Management Portal
              </p>
              <h1 className="section-title mb-5">
                Transparent elections with a beautiful digital experience.
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-slate-600 lg:mx-0">
                A secure, modern platform for voter registration, party management,
                candidate nomination, casting votes, and real-time result tracking.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link to="/login" className="primary-button">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Login
                </Link>
                <Link to="/register/voter" className="secondary-button">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register as Voter
                </Link>
                <Link to="/register/party" className="secondary-button">
                  <Building2 className="mr-2 h-5 w-5" />
                  Register Party
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20 blur-2xl" />
              <div className="glass-card relative rounded-[2rem] p-6">
                <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">Live Election Control</p>
                      <h2 className="text-2xl font-extrabold">EMS Dashboard</h2>
                    </div>
                    <Shield className="h-12 w-12 text-blue-100/80" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-xs text-blue-100">Voters</p>
                      <p className="text-2xl font-extrabold">Verified</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-xs text-blue-100">Candidates</p>
                      <p className="text-2xl font-extrabold">Managed</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-xs text-blue-100">Results</p>
                      <p className="text-2xl font-extrabold">Live</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-xs text-blue-100">Security</p>
                      <p className="text-2xl font-extrabold">Role-based</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-blue-600">Key Features</p>
            <h2 className="section-title">Built for a reliable election workflow</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <div
                key={feature.title}
                className="glass-card group rounded-3xl p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-extrabold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 glass-card rounded-[2rem] p-8 md:p-10">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-violet-600">How It Works</p>
            <h2 className="section-title">From registration to results in three steps</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Register',
                description: 'Register as a voter or political party with verified details.',
              },
              {
                step: '02',
                title: 'Verify',
                description: 'Complete email verification and RO approval for participation.',
              },
              {
                step: '03',
                title: 'Vote & Track',
                description: 'Cast votes securely and track transparent results in real time.',
              },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl bg-white/60 p-6 text-center ring-1 ring-white/70">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-extrabold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="mb-3 text-lg font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center text-sm font-medium text-slate-500">
          <p>&copy; 2024 Election Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

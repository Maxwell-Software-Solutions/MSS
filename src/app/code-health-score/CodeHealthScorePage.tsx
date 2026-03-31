'use client';

import { useState, type ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

interface Question {
  key: string;
  fallback: string;
  options: { label: string; fallback: string; score: number }[];
}

function getQuestions(ht: (key: string, fallback: string) => string): Question[] {
  return [
    {
      key: 'codeHealth.q1',
      fallback: 'What is your test coverage level?',
      options: [
        { label: ht('codeHealth.q1.o1', 'No tests'), fallback: 'No tests', score: 0 },
        { label: ht('codeHealth.q1.o2', 'Under 20%'), fallback: 'Under 20%', score: 1 },
        { label: ht('codeHealth.q1.o3', '20\u201360%'), fallback: '20\u201360%', score: 2 },
        { label: ht('codeHealth.q1.o4', '60\u201380%'), fallback: '60\u201380%', score: 3 },
        { label: ht('codeHealth.q1.o5', 'Above 80%'), fallback: 'Above 80%', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q2',
      fallback: 'How often do you deploy to production?',
      options: [
        { label: ht('codeHealth.q2.o1', 'Manual / ad-hoc'), fallback: 'Manual / ad-hoc', score: 0 },
        { label: ht('codeHealth.q2.o2', 'Monthly'), fallback: 'Monthly', score: 1 },
        { label: ht('codeHealth.q2.o3', 'Weekly'), fallback: 'Weekly', score: 2 },
        { label: ht('codeHealth.q2.o4', 'Daily'), fallback: 'Daily', score: 3 },
        { label: ht('codeHealth.q2.o5', 'Multiple times a day'), fallback: 'Multiple times a day', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q3',
      fallback: 'What is your average PR review time?',
      options: [
        { label: ht('codeHealth.q3.o1', 'Days or more'), fallback: 'Days or more', score: 0 },
        { label: ht('codeHealth.q3.o2', 'About 1 day'), fallback: 'About 1 day', score: 1 },
        { label: ht('codeHealth.q3.o3', 'A few hours'), fallback: 'A few hours', score: 2 },
        { label: ht('codeHealth.q3.o4', 'Under an hour'), fallback: 'Under an hour', score: 3 },
        { label: ht('codeHealth.q3.o5', 'Minutes'), fallback: 'Minutes', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q4',
      fallback: 'How often do you update dependencies?',
      options: [
        { label: ht('codeHealth.q4.o1', 'Never'), fallback: 'Never', score: 0 },
        { label: ht('codeHealth.q4.o2', 'Yearly or less'), fallback: 'Yearly or less', score: 1 },
        { label: ht('codeHealth.q4.o3', 'Quarterly'), fallback: 'Quarterly', score: 2 },
        { label: ht('codeHealth.q4.o4', 'Monthly'), fallback: 'Monthly', score: 3 },
        { label: ht('codeHealth.q4.o5', 'Automated / continuous'), fallback: 'Automated / continuous', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q5',
      fallback: 'How many production incidents per month?',
      options: [
        { label: ht('codeHealth.q5.o1', 'More than 5'), fallback: 'More than 5', score: 0 },
        { label: ht('codeHealth.q5.o2', '3\u20135'), fallback: '3\u20135', score: 1 },
        { label: ht('codeHealth.q5.o3', '1\u20132'), fallback: '1\u20132', score: 2 },
        { label: ht('codeHealth.q5.o4', 'Less than 1'), fallback: 'Less than 1', score: 3 },
        { label: ht('codeHealth.q5.o5', 'Near zero'), fallback: 'Near zero', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q6',
      fallback: 'How long does it take to onboard a new developer?',
      options: [
        { label: ht('codeHealth.q6.o1', 'Months'), fallback: 'Months', score: 0 },
        { label: ht('codeHealth.q6.o2', 'Several weeks'), fallback: 'Several weeks', score: 1 },
        { label: ht('codeHealth.q6.o3', 'About a week'), fallback: 'About a week', score: 2 },
        { label: ht('codeHealth.q6.o4', 'A few days'), fallback: 'A few days', score: 3 },
        { label: ht('codeHealth.q6.o5', '1 day or less'), fallback: '1 day or less', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q7',
      fallback: 'How many people understand the auth system?',
      options: [
        { label: ht('codeHealth.q7.o1', '1 person (bus factor)'), fallback: '1 person (bus factor)', score: 0 },
        { label: ht('codeHealth.q7.o2', '2\u20133 people'), fallback: '2\u20133 people', score: 1 },
        { label: ht('codeHealth.q7.o3', 'About half the team'), fallback: 'About half the team', score: 2 },
        { label: ht('codeHealth.q7.o4', 'Most of the team'), fallback: 'Most of the team', score: 3 },
        { label: ht('codeHealth.q7.o5', 'Everyone \u2014 it\u2019s well-documented'), fallback: 'Everyone \u2014 it\u2019s well-documented', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q8',
      fallback: 'Do you have a CI/CD pipeline?',
      options: [
        { label: ht('codeHealth.q8.o1', 'No \u2014 we deploy manually'), fallback: 'No \u2014 we deploy manually', score: 0 },
        { label: ht('codeHealth.q8.o2', 'Partial \u2014 CI only'), fallback: 'Partial \u2014 CI only', score: 1 },
        { label: ht('codeHealth.q8.o3', 'Full CI/CD, manual prod deploy'), fallback: 'Full CI/CD, manual prod deploy', score: 2 },
        { label: ht('codeHealth.q8.o4', 'Full CI/CD with staging'), fallback: 'Full CI/CD with staging', score: 3 },
        { label: ht('codeHealth.q8.o5', 'Full CI/CD with staging + canary/blue-green'), fallback: 'Full CI/CD with staging + canary/blue-green', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q9',
      fallback: 'What is your monitoring and alerting setup?',
      options: [
        { label: ht('codeHealth.q9.o1', 'None'), fallback: 'None', score: 0 },
        { label: ht('codeHealth.q9.o2', 'Basic uptime checks'), fallback: 'Basic uptime checks', score: 1 },
        { label: ht('codeHealth.q9.o3', 'Logs + basic alerts'), fallback: 'Logs + basic alerts', score: 2 },
        { label: ht('codeHealth.q9.o4', 'Comprehensive \u2014 metrics, logs, traces'), fallback: 'Comprehensive \u2014 metrics, logs, traces', score: 3 },
        { label: ht('codeHealth.q9.o5', 'Full observability with SLOs'), fallback: 'Full observability with SLOs', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q10',
      fallback: 'What is your database migration strategy?',
      options: [
        { label: ht('codeHealth.q10.o1', 'Manual SQL in production'), fallback: 'Manual SQL in production', score: 0 },
        { label: ht('codeHealth.q10.o2', 'Manual scripts'), fallback: 'Manual scripts', score: 1 },
        { label: ht('codeHealth.q10.o3', 'Versioned migrations'), fallback: 'Versioned migrations', score: 2 },
        { label: ht('codeHealth.q10.o4', 'Versioned + tested in CI'), fallback: 'Versioned + tested in CI', score: 3 },
        { label: ht('codeHealth.q10.o5', 'Fully automated + rollback support'), fallback: 'Fully automated + rollback support', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q11',
      fallback: 'What is the state of your API documentation?',
      options: [
        { label: ht('codeHealth.q11.o1', 'None'), fallback: 'None', score: 0 },
        { label: ht('codeHealth.q11.o2', 'Outdated or incomplete'), fallback: 'Outdated or incomplete', score: 1 },
        { label: ht('codeHealth.q11.o3', 'Partial \u2014 covers main endpoints'), fallback: 'Partial \u2014 covers main endpoints', score: 2 },
        { label: ht('codeHealth.q11.o4', 'Complete and maintained'), fallback: 'Complete and maintained', score: 3 },
        { label: ht('codeHealth.q11.o5', 'Auto-generated from code + examples'), fallback: 'Auto-generated from code + examples', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q12',
      fallback: 'How consistent is your error handling?',
      options: [
        { label: ht('codeHealth.q12.o1', 'Ad-hoc \u2014 no pattern'), fallback: 'Ad-hoc \u2014 no pattern', score: 0 },
        { label: ht('codeHealth.q12.o2', 'Inconsistent across codebase'), fallback: 'Inconsistent across codebase', score: 1 },
        { label: ht('codeHealth.q12.o3', 'Partially standardised'), fallback: 'Partially standardised', score: 2 },
        { label: ht('codeHealth.q12.o4', 'Standardised across most services'), fallback: 'Standardised across most services', score: 3 },
        { label: ht('codeHealth.q12.o5', 'Fully standardised with central logging'), fallback: 'Fully standardised with central logging', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q13',
      fallback: 'When was your last security audit?',
      options: [
        { label: ht('codeHealth.q13.o1', 'Never'), fallback: 'Never', score: 0 },
        { label: ht('codeHealth.q13.o2', 'Once, a while ago'), fallback: 'Once, a while ago', score: 1 },
        { label: ht('codeHealth.q13.o3', 'Over a year ago'), fallback: 'Over a year ago', score: 2 },
        { label: ht('codeHealth.q13.o4', 'Annually'), fallback: 'Annually', score: 3 },
        { label: ht('codeHealth.q13.o5', 'Continuous \u2014 automated scanning + periodic reviews'), fallback: 'Continuous \u2014 automated scanning + periodic reviews', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q14',
      fallback: 'How do you track technical debt?',
      options: [
        { label: ht('codeHealth.q14.o1', 'We don\u2019t'), fallback: 'We don\u2019t', score: 0 },
        { label: ht('codeHealth.q14.o2', 'Informal \u2014 people just know'), fallback: 'Informal \u2014 people just know', score: 1 },
        { label: ht('codeHealth.q14.o3', 'A backlog exists but is rarely prioritised'), fallback: 'A backlog exists but is rarely prioritised', score: 2 },
        { label: ht('codeHealth.q14.o4', 'Tracked in backlog with periodic cleanup'), fallback: 'Tracked in backlog with periodic cleanup', score: 3 },
        { label: ht('codeHealth.q14.o5', 'Scheduled debt sprints with measurable targets'), fallback: 'Scheduled debt sprints with measurable targets', score: 4 },
      ],
    },
    {
      key: 'codeHealth.q15',
      fallback: 'What does your code review process look like?',
      options: [
        { label: ht('codeHealth.q15.o1', 'No code reviews'), fallback: 'No code reviews', score: 0 },
        { label: ht('codeHealth.q15.o2', 'Optional / informal'), fallback: 'Optional / informal', score: 1 },
        { label: ht('codeHealth.q15.o3', 'Required but rubber-stamped'), fallback: 'Required but rubber-stamped', score: 2 },
        { label: ht('codeHealth.q15.o4', 'Required with meaningful feedback'), fallback: 'Required with meaningful feedback', score: 3 },
        { label: ht('codeHealth.q15.o5', 'Thorough \u2014 checklist, context, async-friendly'), fallback: 'Thorough \u2014 checklist, context, async-friendly', score: 4 },
      ],
    },
  ];
}

interface ScoreTier {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

function getScoreTier(score: number, ht: (key: string, fallback: string) => string): ScoreTier {
  if (score <= 15) {
    return {
      label: ht('codeHealth.tier.critical', 'Critical'),
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      description: ht('codeHealth.tier.critical.desc', 'Your codebase is a ticking time bomb. Critical risks across testing, deployment, and maintainability need urgent attention before they cause a major incident.'),
    };
  }
  if (score <= 30) {
    return {
      label: ht('codeHealth.tier.concerning', 'Concerning'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      description: ht('codeHealth.tier.concerning.desc', 'Significant risks that will slow you down. Your team is likely spending too much time fighting fires instead of shipping features. Targeted improvements can have a big impact.'),
    };
  }
  if (score <= 45) {
    return {
      label: ht('codeHealth.tier.healthy', 'Healthy'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      description: ht('codeHealth.tier.healthy.desc', 'Good foundation with room to improve. Your practices are solid in some areas but have gaps that could become problems at scale. A focused audit would help prioritise the next steps.'),
    };
  }
  return {
    label: ht('codeHealth.tier.excellent', 'Excellent'),
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: ht('codeHealth.tier.excellent.desc', 'Your engineering practices are strong. You have mature processes across testing, deployment, and observability. A professional review can help you go from good to exceptional.'),
  };
}

function getQuestionIndicatorColor(score: number): string {
  if (score <= 1) return 'bg-red-500';
  if (score === 2) return 'bg-yellow-500';
  return 'bg-green-500';
}

const CATEGORY_LABELS: Record<string, { en: string; lt: string }> = {
  'codeHealth.q1': { en: 'Test Coverage', lt: 'Test\u0173 apreptis' },
  'codeHealth.q2': { en: 'Deploy Frequency', lt: 'Diegimo da\u017Enumas' },
  'codeHealth.q3': { en: 'PR Review Time', lt: 'PR per\u017Ei\u016Bros laikas' },
  'codeHealth.q4': { en: 'Dependency Updates', lt: 'Priklausomybi\u0173 atnaujinimai' },
  'codeHealth.q5': { en: 'Production Incidents', lt: 'Gamybin\u0117s avarijos' },
  'codeHealth.q6': { en: 'Developer Onboarding', lt: 'K\u016Br\u0117jo \u012Fvedimas' },
  'codeHealth.q7': { en: 'Knowledge Sharing', lt: '\u017Dini\u0173 dalinimasis' },
  'codeHealth.q8': { en: 'CI/CD Pipeline', lt: 'CI/CD vamzdynas' },
  'codeHealth.q9': { en: 'Monitoring & Alerting', lt: 'Steb\u0117jimas ir \u012Fsp\u0117jimai' },
  'codeHealth.q10': { en: 'Database Migrations', lt: 'DB migracijos' },
  'codeHealth.q11': { en: 'API Documentation', lt: 'API dokumentacija' },
  'codeHealth.q12': { en: 'Error Handling', lt: 'Klaid\u0173 valdymas' },
  'codeHealth.q13': { en: 'Security Audits', lt: 'Saugumo auditas' },
  'codeHealth.q14': { en: 'Tech Debt Tracking', lt: 'Technin\u0117s skolos sekimas' },
  'codeHealth.q15': { en: 'Code Reviews', lt: 'Kodo per\u017Ei\u016Bros' },
};

export default function CodeHealthScorePage(): ReactElement | null {
  const ht = useHydratedTranslation();
  const questions = getQuestions(ht);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  function handleAnswer(questionIndex: number, score: number): void {
    const next = { ...answers, [questionIndex]: score };
    setAnswers(next);

    if (questionIndex < totalQuestions - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else if (Object.keys(next).length === totalQuestions) {
      setShowResults(true);
    }
  }

  function handleBack(): void {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleRestart(): void {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  }

  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const maxScore = totalQuestions * 4;
  const tier = getScoreTier(totalScore, ht);
  const question = questions[currentQuestion];

  if (showResults) {
    return (
      <>
        {/* Results Hero */}
        <header className="max-w-5xl mx-auto px-6 sm:px-10 pt-14 sm:pt-18 pb-6">
          <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
            {ht('codeHealth.results.eyebrow', 'Your Results')}
          </p>
          <h1
            className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]"
            suppressHydrationWarning
          >
            {ht('codeHealth.results.title', 'Code Health Score')}
          </h1>
        </header>

        {/* Score Card */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-10">
          <div className={`rounded-3xl border ${tier.borderColor} ${tier.bgColor} p-8 sm:p-12 text-center`}>
            <div className={`text-[clamp(56px,8vw,96px)] font-bold ${tier.color} leading-none`}>
              {totalScore}
              <span className="text-[clamp(20px,3vw,32px)] text-foreground/40 font-normal">/{maxScore}</span>
            </div>
            <div className={`inline-block mt-3 rounded-full px-4 py-1.5 text-sm font-semibold ${tier.color} ${tier.bgColor}`}>
              {tier.label}
            </div>
            <p className="mt-5 text-[15px] text-foreground/75 max-w-xl mx-auto leading-relaxed" suppressHydrationWarning>
              {tier.description}
            </p>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-10">
          <h2
            className="text-[clamp(20px,2vw,26px)] font-semibold leading-[1.25] tracking-tight mb-6"
            suppressHydrationWarning
          >
            {ht('codeHealth.results.breakdown', 'Score Breakdown')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {questions.map((q, i) => {
              const score = answers[i] ?? 0;
              const categoryLabel = CATEGORY_LABELS[q.key];
              const label = categoryLabel ? ht(`${q.key}.category`, categoryLabel.en) : q.fallback;
              return (
                <div key={i} className="flex items-center gap-3 bg-card/60 rounded-xl border border-border p-4">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getQuestionIndicatorColor(score)}`} />
                  <span className="text-[13px] text-foreground/75 flex-1 truncate">{label}</span>
                  <span className="text-[13px] font-semibold text-foreground/90">{score}/4</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-8 sm:p-12 text-center">
            <p className="text-[12px] font-bold uppercase tracking-widest text-accent/70 mb-3" suppressHydrationWarning>
              {ht('codeHealth.cta.eyebrow', 'Next step')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4" suppressHydrationWarning>
              {ht('codeHealth.cta.title', 'Want a professional deep-dive?')}
            </h2>
            <p className="text-[15px] text-foreground/70 max-w-xl mx-auto mb-6" suppressHydrationWarning>
              {ht(
                'codeHealth.cta.body',
                'Book a free 15-minute architecture review. We will look at your actual codebase and give you a prioritised action plan \u2014 no obligation.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="https://calendly.com/maxwellsoftwaresolutions/discovery"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
              >
                {ht('codeHealth.cta.button', 'Book a free architecture review')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <button
                onClick={handleRestart}
                className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
                suppressHydrationWarning
              >
                {ht('codeHealth.cta.retake', 'Retake the quiz')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!question) return null;

  return (
    <>
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 sm:px-10 pt-14 sm:pt-18 pb-6">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('codeHealth.eyebrow', 'Self-Assessment')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]"
          suppressHydrationWarning
        >
          {ht('codeHealth.headline', 'Code Health Score')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.65] text-[--muted]" suppressHydrationWarning>
          {ht(
            'codeHealth.subheadline',
            'Answer 15 quick questions about your engineering practices. Get an instant score with a breakdown across testing, deployment, security, and more.'
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {ht('codeHealth.badge.free', '2 minutes')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 text-foreground/75 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
            {ht('codeHealth.badge.questions', '15 questions')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 text-foreground/75 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
            {ht('codeHealth.badge.instant', 'Instant results')}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pb-2">
        <div className="flex items-center justify-between text-[12px] text-foreground/50 mb-2">
          <span suppressHydrationWarning>
            {ht('codeHealth.progress.question', 'Question')} {currentQuestion + 1} / {totalQuestions}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quiz Card */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
        <div className="rounded-3xl border border-border bg-card/80 p-8 sm:p-10 shadow-soft">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8" suppressHydrationWarning>
            {ht(question.key, question.fallback)}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = answers[currentQuestion] === option.score;
              return (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(currentQuestion, option.score)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                    isSelected
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-background hover:border-accent/40 hover:bg-accent/5 text-foreground/85'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-accent bg-accent' : 'border-foreground/25'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[14px]">{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="text-[14px] font-medium text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              suppressHydrationWarning
            >
              {ht('codeHealth.nav.back', '\u2190 Back')}
            </button>

            {answeredCount === totalQuestions && (
              <button
                onClick={() => setShowResults(true)}
                className="bg-accent text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                suppressHydrationWarning
              >
                {ht('codeHealth.nav.results', 'See my results')}
              </button>
            )}

            {currentQuestion < totalQuestions - 1 && answers[currentQuestion] !== undefined && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="text-[14px] font-medium text-accent hover:text-accent/80 transition-colors"
                suppressHydrationWarning
              >
                {ht('codeHealth.nav.next', 'Next \u2192')}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

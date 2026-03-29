'use client';

import type { ReactElement } from 'react';
import { BlogPostLayout, TableOfContents, ArticleSection, Alert } from '@/app/components/ui';

export default function TwoWeekSprintPost(): ReactElement {
  const tocItems = [
    { href: '#introduction', label: 'The appeal — and the scepticism' },
    { href: '#what-fits', label: 'What actually fits in 2 weeks' },
    { href: '#what-doesnt-fit', label: 'What does not fit — and why that matters' },
    { href: '#the-process', label: 'How a well-run sprint actually works' },
    { href: '#mss-approach', label: 'The MSS approach' },
    { href: '#conclusion', label: 'When to start one' },
  ];

  return (
    <BlogPostLayout
      title="What to Expect From a 2-Week Software Sprint (And When It Makes Sense)"
      date="2026-03-28"
      readTime="8 min read"
      category="Rapid Development"
      heroImage="/images/blog/tdd-hero.svg"
      heroAlt="Sprint planning board showing a focused 2-week delivery cycle"
    >
      <TableOfContents items={tocItems} />

      <ArticleSection id="introduction" title="The appeal — and the scepticism">
        <p>
          &ldquo;We need an MVP in two weeks&rdquo; is one of those requests that makes most developers nervous. The
          instinct is to negotiate: two weeks is not enough time, the scope is too vague, things will break, technical
          debt will pile up, you are setting everyone up for disappointment.
        </p>
        <p>
          That scepticism is often correct. But it is correct about poorly scoped sprints, not about the format itself.
          A two-week sprint done well — with a clear problem statement, a senior engineer who has done this before, and
          a genuine commitment to staying in scope — can produce something real and useful. The failure mode is not the
          timeline. It is ambiguity.
        </p>
        <p>
          This post is about what you can reasonably expect when a two-week sprint is scoped and executed properly,
          what you cannot expect, and how to tell whether your situation is a good fit.
        </p>
        <Alert variant="info">
          <strong>Context:</strong> This is based on running fixed-scope sprint engagements for founders, product
          teams, and engineering leaders — not internal scrum sprints within a larger team. The dynamics are different.
        </Alert>
      </ArticleSection>

      <ArticleSection id="what-fits" title="What actually fits in 2 weeks">
        <p>
          The constraint of two weeks forces a useful discipline: you cannot build everything, so you have to decide
          what matters most. That constraint is a feature, not a bug. It surfaces priority decisions that often go
          unresolved in open-ended engagements.
        </p>
        <p>The categories of work that fit well in a focused 2-week sprint:</p>
        <div className="space-y-4 my-6">
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Authentication and onboarding flows</h4>
            <p className="text-sm text-foreground/75">
              Registration, login, password reset, email verification, OAuth integrations. These are well-understood
              patterns with clear acceptance criteria. A senior engineer can implement them cleanly and thoroughly
              in a week, leaving time for testing and edge cases.
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">CRUD dashboards and admin interfaces</h4>
            <p className="text-sm text-foreground/75">
              Internal tools, content management screens, reporting dashboards with filtering and export. The scope
              is easy to define (here are the entities, here are the operations) and the delivery is concrete
              (you can see it and click it).
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Third-party integrations</h4>
            <p className="text-sm text-foreground/75">
              Stripe payments, Twilio notifications, HubSpot sync, Slack bots, webhook receivers, OpenAI wrappers.
              Integrations have clear contracts (the API docs) and clear done criteria (data flows end to end).
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Specific refactors and module rewrites</h4>
            <p className="text-sm text-foreground/75">
              &ldquo;Rewrite the billing module so it handles multiple currencies&rdquo; or &ldquo;break the monolith
              authentication logic into a separate service&rdquo; — when the scope is a specific module and the
              interface contract is clear, two weeks is achievable.
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Adding test coverage to a critical path</h4>
            <p className="text-sm text-foreground/75">
              &ldquo;Our checkout flow has no automated tests and we are afraid to touch it.&rdquo; A two-week sprint
              to instrument a specific high-risk area with meaningful test coverage — integration tests, not just unit
              tests — can dramatically reduce engineering anxiety.
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Data pipelines and ETL jobs</h4>
            <p className="text-sm text-foreground/75">
              Moving data between systems, normalising datasets, building scheduled reports. Bounded, logic-heavy,
              and testable. Good fit.
            </p>
          </div>
        </div>
        <p>
          The common thread: each of these has a clear start state, a clear end state, and a bounded surface area.
          That is the formula for a sprint that delivers.
        </p>
      </ArticleSection>

      <ArticleSection id="what-doesnt-fit" title="What does not fit — and why that matters">
        <p>
          Being direct about what does not work in a two-week sprint is as important as knowing what does. A sprint
          sold as the wrong solution creates resentment and bad outcomes.
        </p>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <strong>Platform rebuilds and full rewrites.</strong> If you want to replace your entire backend with a
            new architecture, that is a multi-month project. A sprint can take on one well-scoped module of that
            migration, but not the whole thing.
          </li>
          <li>
            <strong>Vague briefs.</strong> &ldquo;Build us an AI-powered something&rdquo; without specifics on data
            inputs, expected outputs, and success criteria is not a sprint brief, it is an exploration. Exploration
            is valuable but needs a different format.
          </li>
          <li>
            <strong>Dependent sprints that are not sequenced.</strong> If the feature you want to build depends on
            another system that is not yet ready, the sprint will stall waiting for dependencies to clear. These
            need to be surfaced in scoping.
          </li>
          <li>
            <strong>Work that requires deep domain knowledge the team has not transferred.</strong> Building a
            financial reconciliation engine requires understanding your reconciliation logic. If that knowledge lives
            only in someone&apos;s head and they are not available to answer questions during the sprint, the sprint
            will be slow.
          </li>
        </ul>
        <Alert variant="warning">
          <strong>The honest signal:</strong> If you cannot describe what &ldquo;done&rdquo; looks like in two
          sentences, the scope is not ready. That is not a failure — it means the right first step is a scoping
          session, not a sprint.
        </Alert>
      </ArticleSection>

      <ArticleSection id="the-process" title="How a well-run sprint actually works">
        <p>
          The difference between a sprint that delivers and one that disappoints is almost entirely in the setup and
          the communication discipline during the ten working days.
        </p>
        <p>
          A well-run external sprint follows this structure:
        </p>
        <ol className="list-decimal pl-6 space-y-4 my-4">
          <li>
            <strong>Discovery call (30 minutes, before any contract):</strong> The goal is fit assessment. We learn
            what you need built, you learn whether we are the right team to build it. If it is not a good fit, we
            say so here.
          </li>
          <li>
            <strong>Written scope document (within 24 hours of discovery):</strong> A concise description of what
            will be built, what is explicitly excluded, what &ldquo;done&rdquo; looks like, and what access and inputs
            we need from you. You review and confirm before we start.
          </li>
          <li>
            <strong>Day one setup:</strong> Repository access, environment setup, and a brief orientation call if the
            codebase is unfamiliar. Work starts on day one, not day three.
          </li>
          <li>
            <strong>Daily async updates:</strong> A written status note every day — what was built, what is blocked,
            what is planned tomorrow. No surprises. You always know where things stand without needing to interrupt
            with &ldquo;where are we?&rdquo; messages.
          </li>
          <li>
            <strong>Blocker protocol:</strong> If something blocks progress — an ambiguous requirement, a missing
            credential, an unexpected dependency — it gets flagged immediately with a proposed resolution. Nothing
            sits quietly broken.
          </li>
          <li>
            <strong>End-of-sprint demo:</strong> A live walkthrough of what was built, in the actual environment.
            Not a slide deck. The code is also handed over in full at this point.
          </li>
        </ol>
        <p>
          The communication structure is not bureaucracy — it is what makes a two-week sprint feel calm rather than
          chaotic. When both sides know what is happening, the sprint does not need constant check-ins to stay on track.
        </p>
      </ArticleSection>

      <ArticleSection id="mss-approach" title="The MSS approach">
        <p>
          Our Sprint-in-a-Box engagement is built around this process. The fixed price of €4,800 covers two weeks of
          focused delivery, the discovery and scoping session, daily updates, the demo and handoff call, and 30 days
          of post-sprint support for bugs or deployment questions.
        </p>
        <p>A few things we are deliberate about:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>We only start when scope is agreed in writing.</strong> This protects both sides. It means you
            know exactly what you are getting, and it means we can deliver confidently rather than chasing a moving
            brief.
          </li>
          <li>
            <strong>We scope conservatively.</strong> We would rather under-promise and over-deliver than commit to
            something we cannot finish and leave you disappointed. If we finish early, we use the time well.
          </li>
          <li>
            <strong>The code is yours.</strong> Full handoff, no lock-in, no ongoing dependency on us unless you
            choose it.
          </li>
          <li>
            <strong>Senior engineers do the work.</strong> Not juniors or trainees. The engineer on your sprint has
            done this many times before.
          </li>
        </ul>
        <Alert variant="success">
          <strong>The right expectation:</strong> A Sprint-in-a-Box is not a way to get cheap development. It is a
          way to get a specific, well-scoped piece of work done quickly, cleanly, and without the overhead of a
          full hiring or agency process.
        </Alert>
      </ArticleSection>

      <ArticleSection id="conclusion" title="When to start one">
        <p>
          A two-week sprint makes sense when you have something specific that needs building, you want it done by
          someone experienced, and you do not want to commit to a long engagement before you know the quality of the work.
        </p>
        <p>
          It also makes sense when your internal team is at capacity and you need to ship something in parallel. Or
          when you have a clear proof-of-concept you want to test before committing engineering headcount.
        </p>
        <p>
          The signal that it is the right time: you can write a two-sentence description of what you need built and
          what done looks like. If you can do that, a sprint can probably deliver it.
        </p>
        <div className="mt-8 bg-accent/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to start a sprint?</h3>
          <p className="text-foreground/70 mb-5 max-w-md mx-auto">
            Book a 30-minute discovery call. We will confirm fit, agree scope, and start the following Monday.
            Fixed price: €4,800.
          </p>
          <a
            href="/start-a-sprint"
            className="inline-block px-7 py-3 bg-accent text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Start your sprint — €4,800
          </a>
        </div>
      </ArticleSection>
    </BlogPostLayout>
  );
}

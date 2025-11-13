'use client';

import type { ReactElement } from 'react';
import { BlogPostLayout, TableOfContents, ArticleSection, Alert } from '@/app/components/ui';

export default function CICDPost(): ReactElement {
  const tocItems = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#fundamentals', label: 'CI/CD Fundamentals' },
    { href: '#pipeline-stages', label: 'Pipeline Stages' },
    { href: '#testing-strategy', label: 'Automated Testing Strategy' },
    { href: '#deployment-strategies', label: 'Deployment Strategies' },
    { href: '#infrastructure', label: 'Infrastructure as Code' },
    { href: '#security', label: 'Security in CI/CD' },
    { href: '#monitoring', label: 'Monitoring & Observability' },
    { href: '#best-practices', label: 'Best Practices' },
    { href: '#conclusion', label: 'Conclusion' },
  ];

  return (
    <BlogPostLayout
      title="Modern CI/CD Pipelines: Automating Your Software Delivery"
      date="December 22, 2024"
      readTime="11 min read"
      category="DevOps & Automation"
      heroImage="/images/blog/cicd-hero.svg"
      heroAlt="CI/CD pipeline diagram showing automated build, test, and deployment stages"
    >
      <TableOfContents items={tocItems} />

      <ArticleSection id="introduction" title="Introduction">
        <p>
          Continuous Integration and Continuous Delivery (CI/CD) has become the backbone of modern software
          development. Organizations with mature CI/CD practices deploy code 200x more frequently, recover from
          incidents 24x faster, and have 3x lower change failure rates according to the 2023 DORA State of DevOps
          Report.
        </p>
        <p>
          This guide covers building production-ready CI/CD pipelines that enable fast, reliable, and safe software
          delivery at scale.
        </p>
        <Alert variant="info">
          <strong>Foundation First:</strong> Before optimizing deployment frequency, ensure you have comprehensive
          automated testing. Fast deployments of buggy code just create fast failures.
        </Alert>
      </ArticleSection>

      <ArticleSection id="fundamentals" title="CI/CD Fundamentals">
        <p>Understanding the core concepts:</p>
        <div className="space-y-4 my-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Continuous Integration (CI)</h4>
            <p className="text-sm">
              Developers integrate code into a shared repository multiple times per day. Each integration triggers
              automated builds and tests to detect problems early.
            </p>
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              <li>Frequent code commits (at least daily)</li>
              <li>Automated build on every commit</li>
              <li>Fast-running automated test suite</li>
              <li>Immediate feedback on build status</li>
            </ul>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Continuous Delivery (CD)</h4>
            <p className="text-sm">
              Every code change that passes automated tests is automatically prepared for release to production. Manual
              approval gate before production deployment.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Continuous Deployment</h4>
            <p className="text-sm">
              Takes CD one step further—every change that passes all stages automatically deploys to production without
              human intervention.
            </p>
          </div>
        </div>
      </ArticleSection>

      <ArticleSection id="pipeline-stages" title="Pipeline Stages">
        <p>A robust CI/CD pipeline typically includes these stages:</p>
        <div className="bg-muted/50 p-6 rounded-lg my-6 font-mono text-sm">
          <pre>
            {`1. Source Control Trigger
   ↓
2. Build & Compile
   ↓
3. Unit Tests
   ↓
4. Static Analysis (Linting, Security Scanning)
   ↓
5. Integration Tests
   ↓
6. Build Artifacts (Docker images, binaries)
   ↓
7. Deploy to Staging
   ↓
8. E2E Tests & Performance Tests
   ↓
9. Manual Approval Gate (CD) or Automatic (Continuous Deployment)
   ↓
10. Production Deployment
   ↓
11. Smoke Tests & Health Checks
   ↓
12. Monitoring & Alerting`}
          </pre>
        </div>
        <Alert variant="success">
          <strong>Optimize for Speed:</strong> Parallelize independent stages. Run unit tests, linting, and security
          scans concurrently. Aim for &lt;10 minute feedback cycles.
        </Alert>
      </ArticleSection>

      <ArticleSection id="testing-strategy" title="Automated Testing Strategy">
        <p>The testing pyramid guides your test distribution:</p>
        <div className="bg-muted/50 p-6 rounded-lg my-6">
          <pre className="text-sm">
            {`        ┌───────────┐
        │    E2E    │  ← Few, slow, expensive
        ├───────────┤
        │Integration│  ← Moderate number
        ├───────────┤
        │   Unit    │  ← Many, fast, cheap
        └───────────┘`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Unit Tests (70%):</strong> Fast, isolated tests of individual functions/components. Run on every
            commit.
          </li>
          <li>
            <strong>Integration Tests (20%):</strong> Test interactions between components, databases, external APIs.
          </li>
          <li>
            <strong>E2E Tests (10%):</strong> Critical user flows through the entire system. Run before production
            deployment.
          </li>
        </ul>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold">Test Type</th>
                <th className="text-left p-3 font-semibold">When to Run</th>
                <th className="text-left p-3 font-semibold">Target Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3">Unit</td>
                <td className="p-3">Every commit</td>
                <td className="p-3">&lt; 2 minutes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3">Integration</td>
                <td className="p-3">Every commit</td>
                <td className="p-3">&lt; 5 minutes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3">E2E</td>
                <td className="p-3">Pre-staging/production</td>
                <td className="p-3">&lt; 15 minutes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3">Performance</td>
                <td className="p-3">Nightly/pre-release</td>
                <td className="p-3">Variable</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Alert variant="warning">
          <strong>Test Flakiness:</strong> Flaky tests that fail intermittently erode confidence and slow teams down.
          Quarantine flaky tests immediately and fix or remove them. Aim for &gt;99% test reliability.
        </Alert>
      </ArticleSection>

      <ArticleSection id="deployment-strategies" title="Deployment Strategies">
        <p>Choose the right deployment strategy for your risk tolerance:</p>
        <div className="space-y-4 my-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">1. Blue-Green Deployment</h4>
            <p className="text-sm mb-2">
              Maintain two identical production environments. Deploy to inactive environment, test, then switch traffic
              instantly.
            </p>
            <p className="text-sm">
              ✅ Instant rollback
              <br />
              ✅ Zero downtime
              <br />❌ Requires 2x infrastructure
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">2. Canary Deployment</h4>
            <p className="text-sm mb-2">
              Route small percentage of traffic to new version. Gradually increase if metrics look good.
            </p>
            <p className="text-sm">
              ✅ Low risk, gradual rollout
              <br />
              ✅ Real production validation
              <br />❌ Requires feature flags & traffic management
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">3. Rolling Deployment</h4>
            <p className="text-sm mb-2">
              Update instances one at a time or in small batches. Common in Kubernetes environments.
            </p>
            <p className="text-sm">
              ✅ Resource efficient
              <br />❌ Slower rollback
              <br />❌ Mixed versions during rollout
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">4. Feature Flags</h4>
            <p className="text-sm mb-2">Deploy code to production but keep features disabled until ready to release.</p>
            <p className="text-sm">
              ✅ Decouple deployment from release
              <br />
              ✅ A/B testing, gradual rollout
              <br />❌ Code complexity, flag management overhead
            </p>
          </div>
        </div>
        <Alert variant="info">
          <strong>Recommendation:</strong> Start with blue-green for simplicity. Add canary deployments for critical
          services. Feature flags for user-facing changes that need controlled rollout.
        </Alert>
      </ArticleSection>

      <ArticleSection id="infrastructure" title="Infrastructure as Code">
        <p>Manage infrastructure through version-controlled code:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Terraform:</strong> Multi-cloud infrastructure provisioning
          </li>
          <li>
            <strong>CloudFormation:</strong> AWS-native infrastructure management
          </li>
          <li>
            <strong>Pulumi:</strong> Infrastructure as code using familiar programming languages
          </li>
          <li>
            <strong>Ansible:</strong> Configuration management and automation
          </li>
          <li>
            <strong>Kubernetes Manifests:</strong> Declarative container orchestration
          </li>
        </ul>
        <div className="bg-muted/50 p-6 rounded-lg my-6 font-mono text-sm">
          <pre>
            {`# Example Terraform snippet
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.medium"
  
  tags = {
    Name = "web-server-\${var.environment}"
  }
}

# Apply changes with audit trail
terraform plan
terraform apply`}
          </pre>
        </div>
        <p>Benefits of Infrastructure as Code:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Version control for infrastructure changes</li>
          <li>Reproducible environments (dev, staging, production)</li>
          <li>Disaster recovery through code rebuild</li>
          <li>Code review for infrastructure changes</li>
          <li>Automated testing of infrastructure</li>
        </ul>
      </ArticleSection>

      <ArticleSection id="security" title="Security in CI/CD">
        <p>Security must be integrated throughout the pipeline (DevSecOps):</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Secret Management:</strong> Use HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault. Never
            commit secrets to version control.
          </li>
          <li>
            <strong>Dependency Scanning:</strong> Snyk, Dependabot, or GitHub Advanced Security to detect vulnerable
            dependencies.
          </li>
          <li>
            <strong>Static Application Security Testing (SAST):</strong> SonarQube, Checkmarx to find security flaws in
            code.
          </li>
          <li>
            <strong>Container Scanning:</strong> Trivy, Clair to scan Docker images for vulnerabilities.
          </li>
          <li>
            <strong>Dynamic Application Security Testing (DAST):</strong> OWASP ZAP for runtime vulnerability testing.
          </li>
          <li>
            <strong>Compliance as Code:</strong> Open Policy Agent (OPA) to enforce security policies.
          </li>
        </ul>
        <Alert variant="error">
          <strong>Security Gates:</strong> Block deployments if critical vulnerabilities are detected. Make security
          failures as visible as test failures. Shift left—find issues early in development, not production.
        </Alert>
      </ArticleSection>

      <ArticleSection id="monitoring" title="Monitoring & Observability">
        <p>CI/CD doesn&apos;t end at deployment. Monitor what you deploy:</p>
        <div className="space-y-4 my-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Metrics</h4>
            <p className="text-sm">
              Track deployment frequency, lead time, MTTR (Mean Time To Recovery), change failure rate. Use
              Prometheus, CloudWatch, Datadog.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Logging</h4>
            <p className="text-sm">
              Centralized logging with ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, or CloudWatch Logs.
              Structured logging for easier parsing.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Tracing</h4>
            <p className="text-sm">
              Distributed tracing for microservices with Jaeger, Zipkin, or AWS X-Ray. Understand request flows across
              services.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">Alerting</h4>
            <p className="text-sm">
              PagerDuty, Opsgenie for on-call rotations. Alert on actionable issues, not noise. Define SLOs (Service
              Level Objectives) and SLIs (Service Level Indicators).
            </p>
          </div>
        </div>
        <p>Key deployment metrics to track:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Deployment Frequency:</strong> How often you deploy to production
          </li>
          <li>
            <strong>Lead Time for Changes:</strong> Time from commit to production
          </li>
          <li>
            <strong>Change Failure Rate:</strong> % of deployments causing production incidents
          </li>
          <li>
            <strong>Mean Time to Recovery (MTTR):</strong> How quickly you recover from failures
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="best-practices" title="Best Practices">
        <p>Proven practices for production-ready CI/CD:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keep pipelines fast:</strong> Developers won&apos;t wait 30 minutes for feedback. Optimize for
            &lt;10 minute cycles.
          </li>
          <li>
            <strong>Fail fast:</strong> Run fastest tests first. Stop pipeline on first failure.
          </li>
          <li>
            <strong>Reproducible builds:</strong> Same code + same environment = same artifact every time
          </li>
          <li>
            <strong>Immutable artifacts:</strong> Build once, deploy many times (dev → staging → prod)
          </li>
          <li>
            <strong>Database migrations:</strong> Forward-compatible changes. Never break rollback capability.
          </li>
          <li>
            <strong>Rollback plan:</strong> Every deployment needs a tested rollback strategy
          </li>
          <li>
            <strong>GitOps:</strong> Git as single source of truth. All changes via pull requests.
          </li>
          <li>
            <strong>Progressive delivery:</strong> Combine feature flags, canary, and monitoring for safe rollouts
          </li>
          <li>
            <strong>Observability first:</strong> Deploy instrumentation before features
          </li>
        </ul>
        <Alert variant="success">
          <strong>Cultural Shift:</strong> CI/CD success requires cultural change, not just tools. Foster a culture of
          shared ownership, blameless postmortems, and continuous improvement.
        </Alert>
      </ArticleSection>

      <ArticleSection id="conclusion" title="Conclusion">
        <p>Modern CI/CD pipelines enable elite software delivery performance:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Deploy on-demand with confidence</li>
          <li>Catch issues early through comprehensive automation</li>
          <li>Reduce manual toil and human error</li>
          <li>Enable rapid innovation and experimentation</li>
          <li>Improve reliability through consistent, repeatable processes</li>
        </ul>
        <p>
          Building a mature CI/CD practice takes time. Start with basic automation and iterate. Measure DORA metrics
          (deployment frequency, lead time, MTTR, change failure rate) to track progress. The investment in automation
          pays exponential dividends in velocity and reliability.
        </p>
        <Alert variant="info">
          <strong>Next Steps:</strong> Audit your current deployment process. Identify the biggest manual bottleneck.
          Automate it this week. Then repeat. Small, incremental improvements compound into transformation.
        </Alert>
      </ArticleSection>
    </BlogPostLayout>
  );
}

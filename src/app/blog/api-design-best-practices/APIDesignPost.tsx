'use client';

import type { ReactElement } from 'react';
import { BlogPostLayout, TableOfContents, ArticleSection, Alert } from '@/app/components/ui';

export default function APIDesignPost(): ReactElement {
  const tocItems = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#rest-principles', label: 'RESTful Design Principles' },
    { href: '#resource-naming', label: 'Resource Naming Conventions' },
    { href: '#http-methods', label: 'HTTP Methods & Status Codes' },
    { href: '#versioning', label: 'API Versioning Strategies' },
    { href: '#documentation', label: 'Documentation Standards' },
    { href: '#security', label: 'Security Best Practices' },
    { href: '#performance', label: 'Performance & Scalability' },
    { href: '#conclusion', label: 'Conclusion' },
  ];

  return (
    <BlogPostLayout
      title="API Design Best Practices: Building RESTful APIs That Scale"
      date="December 20, 2024"
      readTime="10 min read"
      category="API Development"
      heroImage="/images/blog/api-design-hero.svg"
      heroAlt="API Design illustration showing RESTful endpoints and HTTP methods"
    >
      <TableOfContents items={tocItems} />

      <ArticleSection id="introduction" title="Introduction">
        <p>
          A well-designed API is the backbone of modern software systems. Whether you&apos;re building microservices,
          mobile apps, or third-party integrations, your API design choices impact scalability, maintainability, and
          developer experience.
        </p>
        <p>
          This guide covers essential principles and best practices for designing RESTful APIs that stand the test of
          time.
        </p>
        <Alert variant="info">
          <strong>Key Takeaway:</strong> Good API design prioritizes consistency, clarity, and backward compatibility.
          These principles reduce integration friction and long-term maintenance costs.
        </Alert>
      </ArticleSection>

      <ArticleSection id="rest-principles" title="RESTful Design Principles">
        <p>REST (Representational State Transfer) is built on six architectural constraints:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Client-Server:</strong> Separation of concerns between UI and data storage
          </li>
          <li>
            <strong>Stateless:</strong> Each request contains all information needed to process it
          </li>
          <li>
            <strong>Cacheable:</strong> Responses must define whether they can be cached
          </li>
          <li>
            <strong>Uniform Interface:</strong> Consistent resource identification and manipulation
          </li>
          <li>
            <strong>Layered System:</strong> Architecture organized in hierarchical layers
          </li>
          <li>
            <strong>Code-on-Demand (optional):</strong> Servers can extend client functionality
          </li>
        </ul>
        <p>
          Understanding these constraints helps you make informed trade-offs when designing your API architecture.
        </p>
      </ArticleSection>

      <ArticleSection id="resource-naming" title="Resource Naming Conventions">
        <p>Consistent naming conventions make your API intuitive and predictable:</p>
        <div className="bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-3">✅ Good Examples:</h4>
          <ul className="font-mono text-sm space-y-1">
            <li>GET /users</li>
            <li>GET /users/123</li>
            <li>POST /users</li>
            <li>GET /users/123/orders</li>
            <li>PATCH /users/123</li>
          </ul>
        </div>
        <div className="bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-3">❌ Avoid:</h4>
          <ul className="font-mono text-sm space-y-1">
            <li>GET /getUsers</li>
            <li>POST /user/create</li>
            <li>GET /users/123/getOrders</li>
            <li>DELETE /deleteUser/123</li>
          </ul>
        </div>
        <Alert variant="success">
          <strong>Best Practice:</strong> Use plural nouns for resources (/users, /orders), avoid verbs in URLs, and
          keep hierarchies shallow (maximum 2-3 levels deep).
        </Alert>
      </ArticleSection>

      <ArticleSection id="http-methods" title="HTTP Methods & Status Codes">
        <p>Proper use of HTTP methods and status codes creates a self-documenting API:</p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold">Method</th>
                <th className="text-left p-3 font-semibold">Purpose</th>
                <th className="text-left p-3 font-semibold">Success Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">GET</td>
                <td className="p-3">Retrieve resource(s)</td>
                <td className="p-3">200 OK</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">POST</td>
                <td className="p-3">Create new resource</td>
                <td className="p-3">201 Created</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">PUT</td>
                <td className="p-3">Replace entire resource</td>
                <td className="p-3">200 OK / 204 No Content</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">PATCH</td>
                <td className="p-3">Partial update</td>
                <td className="p-3">200 OK</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">DELETE</td>
                <td className="p-3">Remove resource</td>
                <td className="p-3">204 No Content</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Common error status codes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>400 Bad Request:</strong> Client sent invalid data
          </li>
          <li>
            <strong>401 Unauthorized:</strong> Authentication required
          </li>
          <li>
            <strong>403 Forbidden:</strong> Authenticated but not authorized
          </li>
          <li>
            <strong>404 Not Found:</strong> Resource doesn&apos;t exist
          </li>
          <li>
            <strong>409 Conflict:</strong> Request conflicts with current state
          </li>
          <li>
            <strong>422 Unprocessable Entity:</strong> Validation failed
          </li>
          <li>
            <strong>429 Too Many Requests:</strong> Rate limit exceeded
          </li>
          <li>
            <strong>500 Internal Server Error:</strong> Server-side error
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="versioning" title="API Versioning Strategies">
        <p>Planning for change is essential. Three common versioning approaches:</p>
        <div className="space-y-4 my-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">1. URL Path Versioning</h4>
            <code className="block font-mono text-sm">https://api.example.com/v1/users</code>
            <p className="mt-2 text-sm">
              ✅ Most explicit and discoverable
              <br />❌ Can lead to URL proliferation
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">2. Header Versioning</h4>
            <code className="block font-mono text-sm">Accept: application/vnd.example.v1+json</code>
            <p className="mt-2 text-sm">
              ✅ Clean URLs, follows HTTP standards
              <br />❌ Less visible, harder to test manually
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2">3. Query Parameter Versioning</h4>
            <code className="block font-mono text-sm">https://api.example.com/users?version=1</code>
            <p className="mt-2 text-sm">
              ✅ Simple to implement
              <br />❌ Can be overridden or ignored
            </p>
          </div>
        </div>
        <Alert variant="warning">
          <strong>Deprecation Policy:</strong> Communicate breaking changes early, maintain older versions for at least
          6-12 months, and provide clear migration guides.
        </Alert>
      </ArticleSection>

      <ArticleSection id="documentation" title="Documentation Standards">
        <p>Comprehensive documentation is non-negotiable for API adoption:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>OpenAPI/Swagger:</strong> Industry-standard specification format
          </li>
          <li>
            <strong>Interactive Docs:</strong> Let developers test endpoints directly (Swagger UI, Redoc)
          </li>
          <li>
            <strong>Code Examples:</strong> Provide samples in multiple languages
          </li>
          <li>
            <strong>Authentication Guide:</strong> Clear instructions for obtaining and using credentials
          </li>
          <li>
            <strong>Error Catalog:</strong> Document all error codes with explanations
          </li>
          <li>
            <strong>Rate Limits:</strong> Specify limits and how to handle 429 responses
          </li>
        </ul>
        <div className="bg-muted/50 p-6 rounded-lg my-6 font-mono text-sm">
          <pre>
            {`// Example error response format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    },
    "timestamp": "2024-12-20T10:30:00Z",
    "requestId": "req_abc123"
  }
}`}
          </pre>
        </div>
      </ArticleSection>

      <ArticleSection id="security" title="Security Best Practices">
        <p>Security must be built into your API from day one:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>HTTPS Only:</strong> Enforce TLS 1.2+ for all endpoints
          </li>
          <li>
            <strong>Authentication:</strong> Use OAuth 2.0 or JWT for token-based auth
          </li>
          <li>
            <strong>Authorization:</strong> Implement role-based access control (RBAC)
          </li>
          <li>
            <strong>Rate Limiting:</strong> Prevent abuse with per-user/IP limits
          </li>
          <li>
            <strong>Input Validation:</strong> Validate and sanitize all input data
          </li>
          <li>
            <strong>CORS:</strong> Configure Cross-Origin Resource Sharing properly
          </li>
          <li>
            <strong>API Keys:</strong> Never expose sensitive keys in URLs or logs
          </li>
          <li>
            <strong>Audit Logging:</strong> Track all access attempts and changes
          </li>
        </ul>
        <Alert variant="error">
          <strong>Security Warning:</strong> Never return sensitive data in error messages. Use generic errors for
          authentication failures to prevent user enumeration attacks.
        </Alert>
      </ArticleSection>

      <ArticleSection id="performance" title="Performance & Scalability">
        <p>Design your API to handle growth efficiently:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Pagination:</strong> Use cursor-based or offset pagination for large datasets
          </li>
          <li>
            <strong>Filtering & Sorting:</strong> Allow clients to request only what they need
          </li>
          <li>
            <strong>Compression:</strong> Enable gzip/brotli compression for responses
          </li>
          <li>
            <strong>Caching:</strong> Use ETag, Last-Modified, and Cache-Control headers
          </li>
          <li>
            <strong>Partial Responses:</strong> Support field selection (e.g., ?fields=id,name,email)
          </li>
          <li>
            <strong>Batch Operations:</strong> Allow bulk creates/updates where appropriate
          </li>
          <li>
            <strong>Async Processing:</strong> Use webhooks or polling for long-running operations
          </li>
        </ul>
        <div className="bg-muted/50 p-6 rounded-lg my-6 font-mono text-sm">
          <pre>
            {`// Pagination example
GET /users?limit=20&cursor=abc123

{
  "data": [...],
  "pagination": {
    "next_cursor": "xyz789",
    "has_more": true
  }
}`}
          </pre>
        </div>
      </ArticleSection>

      <ArticleSection id="conclusion" title="Conclusion">
        <p>
          Building a great API requires balancing multiple concerns: developer experience, performance, security, and
          long-term maintainability. By following these best practices, you create APIs that are:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Easy to understand and integrate</li>
          <li>Resilient to change and growth</li>
          <li>Secure by default</li>
          <li>Well-documented and discoverable</li>
        </ul>
        <p>
          Remember: your API is a product. Invest time in design, gather feedback early, and iterate based on real
          usage patterns. The upfront investment in thoughtful API design pays dividends in reduced support costs and
          faster integrations.
        </p>
        <Alert variant="success">
          <strong>Next Steps:</strong> Review your existing APIs against these principles. Identify one improvement to
          implement this week—whether it&apos;s better documentation, consistent error handling, or implementing
          versioning.
        </Alert>
      </ArticleSection>
    </BlogPostLayout>
  );
}

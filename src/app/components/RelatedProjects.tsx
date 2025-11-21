import Link from 'next/link';
import { getRelatedProjects } from '@/lib/seo/utils';

interface RelatedProjectsProps {
  currentSlug: string;
  limit?: number;
}

/**
 * Auto-generates related case study links
 *
 * Displays project showcases related to the current project based on:
 * - Industry match (+10 points)
 * - Technology overlap (+5 points per tech)
 *
 * @param currentSlug - Current project slug
 * @param limit - Maximum number of related projects (default: 3)
 *
 * @example
 * ```tsx
 * <RelatedProjects currentSlug="retail-platform" limit={2} />
 * ```
 */
export default function RelatedProjects({ currentSlug, limit = 3 }: RelatedProjectsProps) {
  const projects = getRelatedProjects(currentSlug, limit);

  if (projects.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-projects-heading">
      <h3 id="related-projects-heading" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
        Related Case Studies
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/project-showcase/${project.slug}`}
            className="group p-6 rounded-lg border border-border transition-colors hover:border-[var(--color-accent)]"
          >
            <h4
              className="font-semibold mb-2 group-hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-text)' }}
            >
              {project.title}
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.metrics.slice(0, 2).map((metric, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {metric}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

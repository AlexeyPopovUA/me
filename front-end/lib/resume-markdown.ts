import renderData from '@/app/resume/data/data';
import { content } from '@/app/configuration/content';
import { environment } from '@/app/configuration/environment';
import { buildMarkdownDocument } from '@/lib/markdown-export';
import { ensurePathSlash } from '@/lib/utils';

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

function formatExperience() {
  return renderData.experience
    .map((entry) => {
      const period = [entry.dateStart, entry.dateEnd || 'Present'].filter(Boolean).join(' – ');
      const positions = entry.positions
        .map((position) => {
          const positionPeriod = [position.dateStart, position.dateEnd || 'Present']
            .filter(Boolean)
            .join(' – ');
          const lines = [
            `### ${position.title}`,
            positionPeriod,
            position.positionDescription,
            position.description.length > 0 ? formatList(position.description) : '',
          ].filter(Boolean);

          return lines.join('\n\n');
        })
        .join('\n\n');

      const lines = [
        `## ${entry.company}`,
        period,
        entry.website,
        entry.description.length > 0 ? formatList(entry.description) : '',
        positions,
        entry.stack ? `**Stack:** ${entry.stack}` : '',
      ].filter(Boolean);

      return lines.join('\n\n');
    })
    .join('\n\n');
}

function formatEducation() {
  return renderData.education
    .map((entry) =>
      [`### ${entry.title}`, entry.company, entry.date, entry.description].filter(Boolean).join('\n')
    )
    .join('\n\n');
}

function formatCertificates() {
  return renderData.certificates
    .map((entry) =>
      [`- [${entry.title}](${entry.link}) — ${entry.company}, ${entry.date}`].join('\n')
    )
    .join('\n');
}

function formatOwnProjects() {
  return renderData.ownProjects
    .map((project) => {
      const links = project.links.map((link) => `- [${link.name}](${link.link})`).join('\n');
      return [`### ${project.name}`, project.description, links].filter(Boolean).join('\n\n');
    })
    .join('\n\n');
}

export function buildResumeMarkdown() {
  const { user, intro, contacts, skills } = renderData;
  const resumeUrl = `${environment.url}${ensurePathSlash('/resume')}`;

  const body = [
    `# ${user.name} ${user.surname}`,
    '',
    user.position,
    '',
    `- Website: [${user.Website.title}](${user.Website.url})`,
    `- LinkedIn: [${user.LinkedIn.title}](${user.LinkedIn.url})`,
    `- GitHub: [${user.GitHub.title}](${user.GitHub.url})`,
    `- Email: ${user.Email}`,
    `- Location: ${user.Address}`,
    `- Education: ${user.EducationLevel}`,
    '',
    `## ${intro.title}`,
    '',
    intro.description.join('\n\n'),
    '',
    '## Contact details',
    '',
    Object.entries(contacts)
      .map(([label, value]) => `- ${label}: ${value}`)
      .join('\n'),
    '',
    '## Skills',
    '',
    skills.map((skill) => `### ${skill.name}\n\n${skill.description}`).join('\n\n'),
    '',
    '## Experience',
    '',
    formatExperience(),
    '',
    '## Education',
    '',
    formatEducation(),
    '',
    '## Certificates',
    '',
    formatCertificates(),
    '',
    '## Own projects',
    '',
    formatOwnProjects(),
    '',
  ].join('\n');

  return buildMarkdownDocument({
    frontmatter: { title: `${content.authorName} — Resume` },
    body,
    siteUrl: environment.url,
    canonicalUrl: resumeUrl,
  });
}

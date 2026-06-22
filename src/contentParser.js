import portfolioRaw from '../portfolio-content.txt?raw';

const splitLines = (value = '') =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'));

const parseSections = (raw) => {
  const sections = {};
  let current = null;

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^\[(.+)]$/);
    if (match) {
      current = match[1];
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(trimmed);
  }

  return sections;
};

const parseKeyValues = (lines = []) =>
  lines.reduce((acc, line) => {
    const index = line.indexOf('=');
    if (index === -1) return acc;
    acc[line.slice(0, index).trim()] = line.slice(index + 1).trim();
    return acc;
  }, {});

const parsePipedList = (lines = [], keys = []) =>
  lines.map((line) => {
    const parts = line.split('|').map((part) => part.trim());
    return keys.reduce((acc, key, index) => {
      acc[key] = parts[index] || '';
      return acc;
    }, {});
  });

const parseServices = (lines = []) =>
  lines.map((line) => {
    const [title, items = ''] = line.split('|').map((part) => part.trim());
    return {
      title,
      items: items.split(';').map((item) => item.trim()).filter(Boolean),
    };
  });

const parseSkills = (lines = []) =>
  lines.map((line) => {
    const [category, items = ''] = line.split('|').map((part) => part.trim());
    return {
      category,
      items: items.split(';').map((item) => item.trim()).filter(Boolean),
    };
  });

const sections = parseSections(portfolioRaw);

export const portfolio = {
  profile: parseKeyValues(sections.profile),
  summary: (sections.summary || []).join(' '),
  education: parsePipedList(sections.education, ['school', 'degree', 'year']),
  experience: parsePipedList(sections.experience, ['role', 'location', 'period', 'highlights']).map((item) => ({
    ...item,
    highlights: splitLines(item.highlights.replaceAll(';', '\n')),
  })),
  projects: parsePipedList(sections.projects, ['name', 'industry', 'tech', 'role', 'status', 'url']).map((project) => ({
    ...project,
    stack: project.tech.split(',').map((item) => item.trim()).filter(Boolean),
  })),
  services: parseServices(sections.services),
  skillGroups: parseSkills(sections.skills),
  industries: splitLines((sections.industries || []).join('\n')),
};

export const rawPortfolioContent = portfolioRaw;

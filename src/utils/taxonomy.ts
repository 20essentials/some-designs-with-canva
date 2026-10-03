import { arrayCards } from '@/utils/data';

export type CategoryId =
  | 'all'
  | 'apps'
  | 'motion'
  | 'three-d'
  | 'type'
  | 'layout'
  | 'studies';

type Rule = {
  id: Exclude<CategoryId, 'all'>;
  label: string;
  test: RegExp;
};

/**
 * Ordered rules — first match wins. data.ts stays the source of truth;
 * these buckets are derived from the project titles so the archive can
 * be sliced without hand-maintaining a list that would drift.
 */
const RULES: Rule[] = [
  {
    id: 'apps',
    label: 'Apps',
    test: /\bapps?\b|\bapp:|plugin|maker|\bmockup|\bsplitter|distort|cutout|divider|outliner|upscaler|blender|reflection|clipping|\bmask\b|sudoku|maze|crosswords|jigsaw|word.?search|coloring|doodles|booklet|code qr|qr code|trace|cartoonify|sailor/i
  },
  {
    id: 'motion',
    label: 'Motion',
    test: /\bvideo|\banimation|animate|motion|transition|\bflup|\bflop|slider|typewriter|page turner|captions|split screen|\b404\b|\bover design\b|\bprac?tice\b|\bstory\b/i
  },
  {
    id: 'three-d',
    label: '3D',
    test: /3-?d|inflatable|\bwrap\b|glass|mecha|topograph|depth|warp|\bsoda\b/i
  },
  {
    id: 'type',
    label: 'Type',
    test: /\btype|\btext|letter|alphabet|quote|curve|codes|embroid|stroke|hollow|\bfont\b|\bcopy\b/i
  },
  {
    id: 'layout',
    label: 'Layout',
    test: /template|poster|banner|planner|calendar|collage|scrapbook|pattern|sticker|\bdoc\b|book|ebook|table|chart|flowchart|\bppt\b|presentation|slide|concept map|synoptic|web.?site|birthday|carousel|\bpaper\b|\btag\b/i
  }
];

export type Project = {
  title: string;
  href: string;
  image: string;
  id: string;
  category: CategoryId;
};

const bucket = (title: string): CategoryId =>
  RULES.find((rule) => rule.test.test(title))?.id ?? 'studies';

export const projects: Project[] = arrayCards.map((card) => ({
  title: card.title.trim(),
  href: card.canvaWeb,
  image: card.localImage,
  id: card.id,
  category: bucket(card.title)
}));

export const categories: { id: CategoryId; label: string; count: number }[] = [
  { id: 'all', label: 'Todo', count: projects.length },
  ...RULES.map(({ id, label }) => ({
    id,
    label,
    count: projects.filter((project) => project.category === id).length
  })),
  {
    id: 'studies',
    label: 'Sketches',
    count: projects.filter((project) => project.category === 'studies').length
  }
];
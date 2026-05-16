export const defaultSkinId = 'botanical';

export type Skin = {
  id: string;
  name: string;
};

export const skins: Skin[] = [
  { id: 'monochrome', name: 'Monochrome' },
  { id: 'bauhaus', name: 'Bauhaus' },
  { id: 'modern-dark', name: 'Modern Dark' },
  { id: 'newsprint', name: 'Newsprint' },
  { id: 'saas', name: 'SaaS' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'swiss', name: 'Swiss Minimalist' },
  { id: 'kinetic', name: 'Kinetic' },
  { id: 'flat', name: 'Flat Design' },
  { id: 'art-deco', name: 'Art Deco' },
  { id: 'material', name: 'Material Design' },
  { id: 'neo-brutalism', name: 'Neo Brutalism' },
  { id: 'bold-type', name: 'Bold Typography' },
  { id: 'academia', name: 'Academia' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
  { id: 'web3', name: 'Web3' },
  { id: 'playful-geometric', name: 'Playful Geometric' },
  { id: 'minimal-dark', name: 'Minimal Dark' },
  { id: 'clay', name: 'Claymorphism' },
  { id: 'professional', name: 'Professional' },
  { id: 'botanical', name: 'Botanical' },
  { id: 'vaporwave', name: 'Vaporwave' },
  { id: 'enterprise', name: 'Enterprise' },
  { id: 'sketch', name: 'Sketch' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'neumorphism', name: 'Neumorphism' },
  { id: 'organic', name: 'Organic' },
  { id: 'maximalism', name: 'Maximalism' },
  { id: 'retro', name: 'Retro' }
];

export function getRandomSkinId(currentSkinId: string) {
  const candidates = skins.filter((skin) => skin.id !== currentSkinId);
  const nextIndex = Math.floor(Math.random() * candidates.length);

  return candidates[nextIndex]?.id ?? defaultSkinId;
}

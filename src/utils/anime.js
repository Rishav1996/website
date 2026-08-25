import { animate, createTimeline, stagger, createDrawable, morphTo, spring } from 'animejs';

export { animate, createTimeline, stagger, createDrawable, morphTo, spring };

export const anime = (options = {}) => {
  if (options.timeline) {
    return createTimeline(options);
  }
  const { targets, ...rest } = options;
  return animate(targets, rest);
};

anime.timeline = (options = {}) => createTimeline(options);
anime.stagger = stagger;
anime.animate = animate;
anime.setDashoffset = (el) => {
  if (!el || !el.getTotalLength) return 0;
  return el.getTotalLength();
};

export default anime;

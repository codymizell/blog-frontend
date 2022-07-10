import bear from './avatars/bear.webp';
import cat from './avatars/cat.webp';
import chick from './avatars/chick.webp';
import dog from './avatars/dog.webp';
import frog from './avatars/frog.webp';
import koala from './avatars/koala.webp';
import monkey from './avatars/monkey.webp';
import tiger from './avatars/tiger.webp';
import wolf from './avatars/wolf.webp';

export const avatars = [
  bear,
  cat,
  chick,
  dog,
  frog,
  koala,
  monkey,
  tiger,
  wolf,
];

export const getRandomAvatar = () => {
  const index = Math.floor(Math.random() * avatars.length);
  return avatars[index];
};

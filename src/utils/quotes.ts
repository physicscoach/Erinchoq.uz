import { Quote } from '../types';

export const ANTI_LAZY_QUOTES: Quote[] = [
  {
    id: '1',
    textUz: 'Erinchoqqa eshik zanjirsiz, daryo kechuvsiz tuyuladi. Tur, zanjirni o‘zing buz!',
    textEn: 'To the lazy, doors seem locked, rivers uncrossable. Get up and unlock them yourself!',
    authorUz: 'Xalq maqoli',
    authorEn: 'Proverb',
    type: 'warning'
  },
  {
    id: '2',
    textUz: '“Ertaga boshlayman” degan odamlardan tashkil topgan ulkan qabriston bor. Sen bugun boshla!',
    textEn: 'There is a massive graveyard of dreams built on "I will start tomorrow." You start today!',
    authorUz: 'Erinchoq Antidoti',
    authorEn: 'Anti-Laziness Remedy',
    type: 'motivation'
  },
  {
    id: '3',
    textUz: 'Yotib dam olish shirin, lekin orzularingni boshqa birov amalga oshirayotganini ko‘rish achchiq.',
    textEn: 'Lying in bed is sweet, but watching someone else achieve your dreams is bitter.',
    authorUz: 'Haqiqat',
    authorEn: 'Cold Truth',
    type: 'funny'
  },
  {
    id: '4',
    textUz: 'Dangasalik — faol odamning sekin-asta zanglashi demakdir. O‘zingni zanglashdan asra!',
    textEn: 'Laziness is the slow rusting of an active mind. Protect yourself from rusting!',
    authorUz: 'Ibn Sino',
    authorEn: 'Avicenna',
    type: 'motivation'
  },
  {
    id: '5',
    textUz: 'Bugun dushanba yoki yakshanba bo‘lishining farqi yo‘q. Erinchoq uchun har kun — “ertaga”.',
    textEn: 'It doesn’t matter if it is Monday or Sunday. For the lazy, every day is "tomorrow".',
    authorUz: 'Kreativ ogohlantirish',
    authorEn: 'Creative Reminder',
    type: 'funny'
  },
  {
    id: '6',
    textUz: 'Dangasa odam har doim biror narsa boshlamoqchi bo‘ladi, lekin boshlashga mutloq kuch topolmaydi.',
    textEn: 'A lazy person is always planning to start something, but never finds the energy to actually do.',
    authorUz: 'Lao Szi',
    authorEn: 'Lao Tzu',
    type: 'warning'
  },
  {
    id: '7',
    textUz: 'Muvaffaqiyat — bu har kuni erinchoqlik ustidan qozonilgan mayda g‘alabalarning yig‘indisidir.',
    textEn: 'Success is the sum of small victories won over your own laziness every single day.',
    authorUz: 'Mahsuldorlik siri',
    authorEn: 'Productivity Secret',
    type: 'motivation'
  },
  {
    id: '8',
    textUz: 'Hech bo‘lmasa turing va u yoqdan bu yoqqa yuring. Harakat baribir dangasalikni qoraytiradi!',
    textEn: 'At least get up and walk around. Movement always dispels the lazy fog!',
    authorUz: 'Kichik maslahat',
    authorEn: 'Tiny Tip',
    type: 'funny'
  }
];

export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * ANTI_LAZY_QUOTES.length);
  return ANTI_LAZY_QUOTES[index];
}

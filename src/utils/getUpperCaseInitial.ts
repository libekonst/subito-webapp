export function toUpperCaseInitial(name?: string): string | undefined {
  if (!name) return;

  const initial = name.trimStart()[0];
  if (!initial) return;

  return normalizeLetter(initial).toUpperCase();
}
export function normalizeLetter(letter: string): string {
  const pairs: { [key: string]: string } = {
    Ά: 'Α',
    Έ: 'Ε',
    Ή: 'Η',
    Ί: 'Ι',
    Ό: 'Ο',
    Ύ: 'Υ',
    Ώ: 'Ω',
    Ϊ: 'Ι',
    ΐ: 'I',
    Ϋ: 'Υ',
    ΰ: 'Υ',
  };
  return pairs[letter] || letter;
}

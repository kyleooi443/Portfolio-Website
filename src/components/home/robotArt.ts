// Frames for the ASCII robot in PortraitRobot. Kept separate so the alignment can be tested.
export type Mood = 'idle' | 'wave' | 'dance';
export type Look = 'left' | 'center' | 'right';

const pupils: Record<Look, string> = { left: 'o  ', center: ' o ', right: '  o' };

// Every line is 21 characters so the art stays aligned in a monospace font.
export function drawRobot(tick: number, mood: Mood, look: Look): string[] {
  const blink = tick % 24 === 23;
  const eye = blink ? '[---]' : `[${pupils[look]}]`;
  const flip = (tick >> 1) % 2 === 1;
  const leftUp = mood === 'dance' && flip;
  const rightUp = (mood === 'wave' && !flip) || (mood === 'dance' && !flip);
  const rightSide = mood === 'wave' && flip;
  const arms = {
    hl: leftUp ? '  o ' : '    ',
    la: leftUp ? '   \\' : '   /',
    lb: leftUp ? '    ' : '  o ',
    hr: rightUp ? ' o  ' : '    ',
    ra: rightUp ? '/   ' : rightSide ? '--o ' : '\\   ',
    rb: rightUp || rightSide ? '    ' : ' o  ',
  };
  const art = [
    `         ${tick % 6 < 3 ? '(*)' : '(.)'}         `,
    '          |          ',
    '   .-------------.   ',
    `   | ${eye} ${eye} |   `,
    `   |     ${mood === 'idle' ? '---' : '\\_/'}     |   `,
    "   '-------------'   ",
    `${arms.hl}  ___| |___  ${arms.hr}`,
    `${arms.la}|  [=====]  |${arms.ra}`,
    `${arms.lb}|  [ <3  ]  |${arms.rb}`,
    '    |___________|    ',
    '      |_|   |_|      ',
    '     [__]   [__]     ',
  ];
  // Dancing shuffles one column left and right.
  return mood === 'dance' ? art.map((line) => (flip ? ` ${line.slice(0, -1)}` : line)) : art;
}

import assert from 'node:assert/strict';
import test from 'node:test';
import { drawRobot, type Look, type Mood } from '../src/components/home/robotArt';

test('every robot frame is a 12-line, 21-column grid so the ASCII art stays aligned', () => {
  for (const mood of ['idle', 'wave', 'dance'] as Mood[]) {
    for (const look of ['left', 'center', 'right'] as Look[]) {
      for (let tick = 0; tick < 48; tick++) {
        const frame = drawRobot(tick, mood, look);
        assert.equal(frame.length, 12);
        for (const line of frame) assert.equal(line.length, 21, `${mood}/${look}/${tick}: "${line}"`);
      }
    }
  }
});

test('the robot blinks once per cycle and only smiles when it has a mood', () => {
  assert.ok(drawRobot(23, 'idle', 'center')[3].includes('[---]'));
  assert.ok(drawRobot(0, 'idle', 'center')[3].includes('[ o ]'));
  assert.ok(drawRobot(0, 'idle', 'center')[4].includes('---'));
  assert.ok(drawRobot(0, 'wave', 'center')[4].includes('\\_/'));
});

import assert from 'node:assert';
import { toDurationDays } from './duration.js';
import formSchema from './schema.js';

const shift = (days) => {
  const d = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4 + days * 864e5);
  return d.toISOString().slice(0, 10);
};

const r = toDurationDays(shift(1));
assert.strictEqual(r, '1d', 'tomorrow -> 1d');
assert.strictEqual(toDurationDays(shift(45)), '45d', 'rounds up to whole days');
assert.strictEqual(toDurationDays(today0()), null, 'past date rejected');
assert.strictEqual(toDurationDays(''), null, 'empty rejected');
assert.strictEqual(toDurationDays('nonsense'), null, 'garbage rejected');

const ok = (d) => formSchema.safeParse({ url: 'https://example.com', alias: '', duration: d }).success;
assert.ok(ok('45d'), 'custom Nd passes schema');
assert.ok(ok('7d') && ok('3h') && ok(''), 'presets still pass');
assert.ok(!ok('45w'), 'outside the accepted set is rejected');

function today0() {
  return shift(0);
}

console.log('ok');

import fs from 'fs';

import { select } from '../src/xpath';

test('Can select nodes of a basic TCX stub', () => {
  const file = fs.readFileSync('test/examples/example.tcx', 'utf8');
  const xmldoc = new DOMParser().parseFromString(file, "text/xml");

  const activities = select(xmldoc, '//Activities');
  const trackpoints = select(xmldoc, '//Trackpoint');
  const nonexistent = select(xmldoc, '//Nonexistent');

  expect(activities.length).toBe(1);
  expect(trackpoints.length).toBe(3);
  expect(nonexistent.length).toBe(0);
});

test('Does not crash with invalid XPath expressions', () => {
  const file = fs.readFileSync('test/examples/example.tcx', 'utf8');
  const xmldoc = new DOMParser().parseFromString(file, "text/xml");

  const result = select(xmldoc, '//Activity/');

  expect(result.length).toBe(0);
});

test('Ignores namespaces', () => {
  const file = fs.readFileSync('test/examples/with-namespaces.tcx', 'utf8');
  const xmldoc = new DOMParser().parseFromString(file, "text/xml");

  const activities = select(xmldoc, '//Activities');

  expect(activities.length).toBe(1);
});

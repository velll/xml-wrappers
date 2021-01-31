import fs from 'fs';
import { children, firstChild } from '../src/children'

const xmlstring = fs.readFileSync('test/examples/mahogany-table.xml', 'utf8').toString();
const xmldoc = new DOMParser().parseFromString(xmlstring, "text/xml");

test('Can select child nodes', () => {
  const root = xmldoc.getElementsByTagName('Table')[0]

  const legNodes = children(root, 'Legs')

  expect(legNodes.length).toEqual(1);
  expect(children(legNodes[0], 'Leg').length).toEqual(4)
});

 test('Can find first child node', () => {
  const node = xmldoc.getElementsByTagName('Legs')[0]
  
  const firstLeg = firstChild(node, 'Leg')!

  expect(firstLeg).toBeDefined();
  expect(children(firstLeg, 'Stain').length).toBe(1);
  expect(children(firstLeg, 'Stain')[0].textContent).toEqual('Bright');
});

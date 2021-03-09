import { trace } from "./trace";

function select(xmldoc: Document, expression: string): Node[] {
  const resolver = nsResolver(xmldoc.documentElement);

  const lookupResult = evaluate(expression, xmldoc, resolver);

  trace('lookup result');
  trace(lookupResult);

  if (lookupResult instanceof XPathResult) {
    return lookupResultToArray(lookupResult);
  } else {
    trace('Xpath lookup: wrong type');
    trace(lookupResult);

    return [];
  }
}

function evaluate(expression: string, xmldoc: Document, resolver: Resolver) {
  try {
    const lookupResult = xmldoc.evaluate(
      expression,
      xmldoc,
      resolver,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null);

    return lookupResult;
  } catch(err) {
    return err;
  }
}

function lookupResultToArray(lookupResult: XPathResult) {
  const result = [];

  let nextNode = lookupResult.iterateNext();
  while(nextNode) {
    result.push(nextNode);
    nextNode = lookupResult.iterateNext();
  }

  return result;
}

// Dirty hack for namespaces in XPath
// https://stackoverflow.com/questions/40796231/how-does-xpath-deal-with-xml-namespaces
function nsResolver(element: any) {
  const resolver = element.ownerDocument.createNSResolver(element);
  const defaultNamespace = element.getAttribute('xmlns');

  return (prefix:any) => {
     return resolver.lookupNamespaceURI(prefix) || defaultNamespace;
  };
}

type Resolver = (ns: any) => any;

(window as any).evaluate = evaluate;

export { select };

function children(node: Node, name: string): Node[] {
  return Array.from(node.childNodes).filter(childNode => childNode.nodeName == name);
}

function firstChild(node: Node, name: string): Node | null {
  return children(node, name)[0];
}

export { children, firstChild };

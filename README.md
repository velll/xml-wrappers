# XML wrappers

A couple of wrappers for XML documents

## XPath

Instead of the nightmare that is [document.evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate) `select` returns a plain array of nodes.

```js
import { select } from 'xml-wrappers';

const nodes = select(xmldoc, "//Activity[@Sport='Running']")
```

Also does a fairly good job ignoring the xml namespaces for the most common usecases.

*Debug output is enabled with `_XML_WRAPPERS_TRACE_ENABLED_ = true`*
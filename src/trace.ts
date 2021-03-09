function traceEnabled() {
  return (window as any)._XML_WRAPPERS_TRACE_ENABLED_ == true;
}

function trace(payload: any) {
  if (traceEnabled()) {
    console.log(payload);
  }
}

export { trace };

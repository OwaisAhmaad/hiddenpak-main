export function serializeDoc(doc: any): any {
  if (!doc) return doc;
  if (Array.isArray(doc)) return doc.map(serializeDoc);
  const { _id, __v, ...rest } = doc;
  return { ...rest, id: _id?.toString() };
}

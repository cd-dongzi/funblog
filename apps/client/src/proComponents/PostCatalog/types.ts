export interface Catalog {
  node: Element;
  layer: number;
  text: string;
}
export interface PostCatalogItem {
  title: string;
  gap: number;
  node: Element;
  selected?: boolean;
}

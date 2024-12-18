import { TreeData } from '../components/TreeViewer/data';

declare global {
  interface Window {
    __TREE_DATA__: TreeData;
  }
}

export {};

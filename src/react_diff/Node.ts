
export interface INode {
  type: string;
  children: INode[] | null;
}

class ReactNode implements INode {
  type: string;
  children: INode[];
  
  constructor({ type }) {
    this.type = type;
    this.children = [];
  }

  addChild(child: INode) {
    this.children.push(child);
  }
}


export default ReactNode;
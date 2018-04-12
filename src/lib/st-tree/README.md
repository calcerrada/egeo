# Tree (Component)

   The tree is a component for representing information in a hierarchical way. It allows navigating between the different nodes and visualizing the parent-child relationships between nodes.

## Inputs

| Property               | Type     | Req   | Description                                                            | Default |
| ---------------------- | -------- | ----- | ---------------------------------------------------------------------- | ------- |
| collapseChildrenBranch | Boolean  | False | TRUE: Collapse all child nodes. FALSE: Only collapse the selected node | false   |
| node                   | StTree   | False | Current node (for recursion purpose)                                   |         |
| path                   | Number[] | False | Path inside the tree of current node                                   | []      |
| tree                   | StTree   | True  | Tree root node                                                         |         |

## Outputs

| Property   | Type        | Description                            |
| ---------- | ----------- | -------------------------------------- |
| selectNode | StTreeEvent | Notify any node selection              |
| toggleNode | StTreeEvent | Notify any node expansion or collapsed |

## Example


```html
<st-tree
      [tree]="treeA"
      (toogleNode)="onToogleNode($event)"
      (selectNode)="onSelectNode($event)">
</st-tree>
```

## Models

*Node of tree* (StTree)

```typescript
export class StNodeTree {
    name: string;
    icon: string;
    children?: StNodeTree[];
    expanded?: boolean;
    selected?: boolean;
}
```

*Object emited on changes* (StTreeEvent)

```typescript
export class StTreeEvent {
    node: StTreeNode;
    target: number[];
}
```


# Dropdown Menu (Component)

   This directive show a dropdown menu list in element that you attach

## Inputs

| Property         | Type                                          | Req   | Description                                                                                            | Default                          |
| ---------------- | --------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------ | -------------------------------- |
| active           | Boolean                                       | False | Show or hide list                                                                                      | false                            |
| items            | StDropDownMenuItem[] \| StDropDownMenuGroup[] | False | ] List of items or groups of them to show in menu                                                      | \[\                              |
| placement        | StPopPlacement                                | False | Possible positions of menu with respect element to attach                                              | StPopPlacement.BOTTOM_START      |
| emptyListMessage | String                                        | False | Message to show in case of empty list                                                                  | ''                               |
| selectedItem     | StDropDownMenuItem \| undefined               | False | Define selected item without passing as property                                                       | undefined                        |
| selectedItem     | StDropDownMenuItem \| undefined               | False | Define selected item without passing as property                                                       | undefined                        |
| styleSelected    | Boolean                                       | False | If true, move selected item to top in menu when open                                                   | true                             |
| moveSelected     | Boolean                                       | False | If true, apply class selected to selected item                                                         | true                             |
| offset           | StPopOffset                                   | False | For position with offset in x o y axis                                                                 | {x: 0 , y: 0}                    |
| visualMode       | StDropdownVisualMode                          | False | It is needed to specify the styles applied to the list.By default is displayed as a normal option list | StDropDownVisualMode.OPTION_LIST |

## Outputs

| Property | Type               | Description                            |
| -------- | ------------------ | -------------------------------------- |
| change   | StDropDownMenuItem | Event emitted when user select an item |

## Example


```html
<st-dropdown-menu [items]="list"
      [active]="show"
      (change)="onChange(event)">
    <button class="button button-primary"
          (click)="show = !show">Show menu</button>
</st-dropdown-menu>
```

## Models

*Menu items* (StDropDownMenuItem)

```typescript
export class StDropDownMenuItem {
    label: string;
    value: any;
    icon ? : string;
    selected ? : boolean;
    [key: string]: any; // To do model more extensible if any other component needs to send more data
}
```


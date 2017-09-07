# Changelog

## 4.0.0 (upcoming)

**Fixed bugs:**

* st-breadcrumbs: Fix qaTags
* st-dropdown: Fix qaTags

**Documentation:**

* Update license
* st-checkbox: added demo

**New features:**

* st-label: New component based on label native tag
* st-header: Menu notifies navigation

**Breaking changes:**

* st-header: Remove stHeaderBehavior directive because now it's unnecesary
* st-header: Change contentChangeOffset parameter by changeHeight
* st-header: Removed app name, now use a ng-content to define
* st-header: Removed user menu, now use a ng-content to define
* st-header: Removed company name input
* st-header: Remove disable parameter of menu and submenu model
* st-header: Models change of name
* st-header: Change general behaivor and design

**Fixed bugs:**

* st-page-title: Fix bug when page is refreshed, the editable page title is displayed wrong
* st-search: Send an empty search when the user presses the cross button

**Breaking changes:**

* st-input-adjustable: Rename directive 'StInputAdjustable' to st-input-adjustable

## 3.0.1 (September 01, 2017)

**Fixed bugs:**

* st-tree: Fix Failed to insert St-Tree Module provider missing
* st-tree: Fix selected from elements
* st-tree: Fix dbblick to elements for expand

## 3.0.0 (August 18, 2017)

**Fixed bugs:**

* st-two-list-selection: Fix when list is empty, height not showing correctly
* st-item-list: Add item list to egeo module
* st-dropdown: Fix inputs immutable
* st-switch: Change input id to <name>-input

**Breaking changes:**

* st-combobox: Renamed to st-select
* st-search: Remove searchOnlyOnClick and hasClearButton parameters
* st-breadcrumbs: Rename output event changeOption to select
* st-pop: Remove option to position in left or right
* st-pop: Remove input gpuAcceleration
* st-dropdown-menu: Remove option to position in left or right

**New features:**

* st-toggle-buttons: Add an optional id to the interface
* st-breadcrumbs: Add component st-breadcrumbs item, add Ng-Content option
* st-input: Add input value and output change
* st-form: Create a dynamic form with inputs
* st-form: Add switches to dynamic form
* update stratio-theme to 0.14.0

**Refactor:**

* st-pop: Remove popperjs library and implement our solution

## 2.5.0 (July 13, 2017)

**Fixed bugs:**

* Fix styles on st-input
* Fix styles on st-vertical-tabs
* Fix styles on st-horizontal-tabs

**New features:**

* New component st-items-list
* New component st-tree
* New component st-alerts
* Add number inputs and min/max validations

## 2.4.4 (July 13, 2017)

**Fixed bugs:**

* Add missing tslib dependency

## 2.4.3 (July 11, 2017)

**Fixed bugs:**

* Fix when resolve not found any translateable element and pass empty array to translate

## 2.4.2 (July 05, 2017)

**Fixed bugs:**

* Fix Search with autocomplete emit twice

## 2.4.1 (June 30, 2017)

**Fixed bugs:**

* Fix popper imports

## 2.4.0 (June 29, 2017)

**Fixed bugs:**

* Fix of left button position in page title
* Fix a wrong overflow of dropdown-menu items in firefox

**New features:**

* Create st-object-to-array pipe to iterate over an object in a template
* Add to dropdown-menu option to be always floating
* Add to dropdown-menu to resize update when resize the main window.
* New component st-tip
* New component st-help
* Add option to autocomplete in search

**Deprecated:**

* st-search: hasClearButton, that will be removed in a future release
* st-search: searchOnlyOnClick, that will be removed in a future release

## 2.3.2 (June 21, 2017)

* Fix st-comobobox validations

## 2.3.1 (June 19, 2017)

* Fix st-two-list styles
* Fix AoT compilation

## 2.3.0 (June 13, 2017)

* Bugfix st-switch component emits event twice
* New component st-combobox
* Add new feature in st-page-title: Editable Title

## 2.2.2 (June 06, 2017)

* Bugfix st-two-list remove min height
* Bugfix st-two-list no wrap long lines

## 2.2.1 (June 06, 2017)

* Bugfix st-switch add name as input

## 2.2.0 (June 05, 2017)

* Bugfix st-two-list dropdown
* Add style to st-two-list when select row
* Refactor decorators now all start by St
* Improvement in st-switch template
* Add st-pop component
* Allow Able or disable for columns singly

## 2.1.1 (May 29, 2017)

* Bugfix #148 and #248
* Add St-pop Component

## 2.1.0 (May 19, 2017)

* Add st-checkbox component
* Add st-two-list

## 2.0.2 (May 05, 2017)

* fix st-textarea borders

## 2.0.1 (May 04, 2017)

* fix st-textarea styles

## 2.0.0 (May 04, 2017)

* Update angular version to angular 4.1.0
* Refactor of build method
* Create textarea component
* Create form label component
* Create switch component
* Bugfix #212 (St-table): Allow to introduce a model with id and label as header item

## 1.5.0 (April 25, 2017)

* Extract theme of info-card
* Extract theme of input
* Extract theme of tab-box
* Extract theme of toggle-buttons
* Extract theme of tooltip
* Extract theme of vertical-tabs
* Extract theme of search
* Reduce bundle size
* Add Breadcrumbs component
* Create table component

## 1.4.1 (April 17, 2017)

* fix AOT bug with StRadio Component

## 1.4.0 (April 17, 2017)

* Add st-radio and st-radio-group components
* Add test to EgeoResolve
* Bugfix #144 and #77
* Update spinner styles to remove margins
* Increase test coverage in all components
* EgDeprecated decorator

## 1.3.3 (April 05, 2017)

* export all elements of stModalInterface

## 1.3.2 (April 05, 2017)

* fix infinite loop in modal close

## 1.3.1 (April 03, 2017)

* export stModalResponse

## 1.3.0 (April 03, 2017)

* st-modal and StModalService
* Add max-lenght validation on inputs
* Force to install some dependencies
* st-tab-box as stateless component
* Bugfix pagination

## 1.2.0 (March 17, 2017)

* Remove st-table from website
* Add test coverage 67% to st-input
* Add new search options (Live search and only emit on click)
* Separate library and website
* Add test to st-spinner
* Add test to st-tooltip
* Prepare for publish release

## 1.1.2 (March 09, 2017)

* Adapt to Nexus3

## 1.1.1 (March 08, 2017)

* Add max-width to header component

## 1.1.0 (March 06, 2017)

* Add isFocused parameter on input component to set the focus on the input
* Add distribution as AoT
* Add Required and CheckRequired decorators.
* Add search filter pipe
* Add EgeoUtils with some static common functions

## 1.0.0 (February 23, 2017)

* Modularize all components
* Add Button Clear in Search Component
* Add Value Input in Search Component
* Add optional Pre-title to Page Title Component
* Update color definitions
* Add util service for manage translations of complex objects
* Update fonts in sass for use body istead open-sans and heading instead brandon-grotesque
* Fix some problems with fonts
* Info Box now have a variable height and with that adapt to content and container
* Info Box now have two new inputs, height and with to fix height and with in pixels
* Added Pagination component
* Remove external padding in vertical tab component
* **BREAKING CHANGE:** Remove ng2-translate dependency
* **BREAKING CHANGE:** Now egeo is imported like this ```import { EgeoModule } from 'egeo';```
* **BREAKING CHANGE:** Output Search Component change of (onSearch) to (search)
* **BREAKING CHANGE:** Vertical menu now is called Vertical Tabs
* **BREAKING CHANGE:** Vertical menu now not emit active when active is set from outside
* **BREAKING CHANGE:** Vertical menu output change from changedOption to changeOption
* **AND ALL FIX OF VERSION 0.6.1**

## 0.6.1 (February 08, 2017)

* Prevent horizontal-tab wrong shown when zoom the browser
* Add qaTag in info-cards
* Fix broken spinner component

## 0.6.0 (February 06, 2017)

* Update colors with new values, possibility of getting in RGB format and documentation with RGB info.
* Add alpha channel to the egeo-get-color API.
* Apply complete design of sidebar in the documentation website.
* Review and update libraries.
* Fix Button event is launched when disabled.
* Remove PostCSS
* New dropdown menu component
* New dropdown component
* Rename old horizontal tabs to toggle buttons
* New horizontal tab component
* New Input component
* Generic class for manage events
* Solve minor bugs
* Add coverage reports
* Refactor Footer component for support internal url, logos and now with tests
* New Header component
* Add button to page title

## 0.5.0 (December 12, 2016)

* Change repository name for Egeo
* Fix bad URL imports in the new UI-Base Sass files.
* Separate font faces and fonts in a separate CSS and process
* Remove old implementations of egeo.ui.base and rewrite imports to the new /ui-base
* Fix linting errors
* Add PostCSS support
* Update to Angular 2.1.0 and Typescript 2.0.3 with types in npm
* Add radio menu component
* New component Title Page
* Total refactor of repository
* New search component
* New button component

## 0.4.0 (November 02, 2016)

* New horizontal tab component
* New tab box component
* Spinner in modificable list while input is undefined

## 0.3.0 (September 23, 2016)

* Spinner component
* Modificable List component
* Footer component
* Input component bugs and improvements
* Info card component
* Update to Angular2 final release
* Regular expression utils
+ Vertical menu component
* Close tooltip with click, keydown or mouse wheel

## 0.2.0 (September 21, 2016)

* Several components
* Update to Angular2-rc.6

## 0.1.0 (September 1, 2016)

* First iteration of egeo angular 2 components using Angular2-rc.5

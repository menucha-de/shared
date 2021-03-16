# Shared Components for UIs

## Installation

```BASH
npm install --save mica-shared
```

## Usage

Add `MicaSharedModule` to your list of module imports:

```JS
import { MicaSharedModule } from 'mica-shared';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MicaSharedModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

It's also necessary to add the following snippet to the assets array in your angular.json to use the images from this package:

```JS
{
  "glob": "**/*",
  "input": "./node_modules/mica-shared/assets/images",
  "output": "./assets/images"
}
```

Additionally you have to add the theme styles to your globals styles in your angular.json:

```JS
"styles": [
  "src/styles.scss",
  "node_modules/mica-shared/macio.scss"
],

```

All components have the `mica`-prefix.

## Components

## ActionButtonComponent

Button for multiple actions:

* Default action: Fired by left small button. Normally used to show further information below the button.
* Open action: Fired by button with label. Normally used to show a dialog with details.
* Further actions can be added through `ActionButtonItemComponent`. `<mica-action-button-item>`-Elements must be children of `<mica-action-button>` and have `class="action"`.

```HTML
<mica-action-button>
  <mica-action-button-item class="action"></mica-action-button-item><!-- Adds item -->
  <img class="icon"><!-- Adds image to button-->
</mica-action-button>
```

Adding an `<img class="icon">` within the `<mica-action-button>`-Element adds and image to the label. It can be styled and positioned as needed via CSS.

### Options

Property name | Type    | Default | Description
--------------|---------|---------|------------
`defaultIcon` | string  |         | Default icon for the button which opens the content section of the action button. Size: 32x32 px
`text`        | string  | empty   | Button label
`expandable`  | boolean | true    | If true the default button default button is visible
`unexciting`  | boolean | false   | If true the label text is grey colored
`checkable`   | boolean | false   | If true the default button is replaced by a checkbox
`checked`     | boolean | false   | Checked state

### Events

Event     | Payload | Description
----------|---------|------------
`default` | any     | Fired when left small button is clicked
`open`    | any     | Fired when button with label is clicked. Normally used to open a dialog, hence the name.
`check`   | boolean | Fired when checked state changes. Only possible if button is set to `checkable = true`.

---

## ActionButtonItemComponent

To be used in conjunction with `ActionButtonComponent`. Events can be added via the normal DOM Events like `click`.

### Options

Property name | Type    | Default | Description
--------------|---------|---------|------------
`label`       | string  | empty   | Action text label
`icon`        | string  | empty   | Path to icon file. Size 32x32 px
`disabled`    | boolean | false   | If true action is disabled. Text greyed out
---

## BigButtonComponent

Big Button for sections in MICA UI and Containers. Button has events for `leftClick` and `rightClick`.

```HTML
<mica-big-button label="Button" [smaller]="true" (leftClick)="onLeftClick()"></mica-big-button>
```

### Options

Property name | Type    | Default | Description
--------------|-------- |---------|------------
`name`        | string  | empty   | Unique name of a button. Can be used for different purposes, like routing, actions etc. Not visible in UI
`label`       | string  | empty   | Label text, shown under button.
`iconURL`     | string  | empty   | Path to an icon file. Size for bigger button: 178x178px, size for smaller button: 100x100 px.
`active`      | boolean | true    | True for yellow frame and background, false for gray frame and background.
`smaller`     | boolean | false   | Will make the button smaller, fitting more of them in a section. Used for containers.

### Events

Event        | Payload | Description
-------------|---------|------------
`leftClick`  | any     | Fired on click with left mouse button.
`rightClick` | any     | Fired on click with right mouse button
---

## CheckBoxComponent

To be used just like a plain HTML checkbox. Use `[(ngModel)]` or `[value]` assignment. Fires change event.

```HTML
<mica-checkbox [(ngModel)]="booleanValue"></mica-checkbox>
```

## DialogComponent

Dialog with title for detailed information or settings for an item. Has an accept button with customizable text and a close button.

Additional elements can be added to the titlebar

### Options

Property name | Type    | Default | Description
--------------|-------- |---------|------------
`title`       | string  | empty   | Title of the dialog
`okText`      | string  | empty   | Text of the OK button wich closes the dialog with CloseAction.OK
`smaller`     | boolean | true    | If true the background has a white opaque overlay.

### Events

Event   | Payload     | Description
--------|-------------|------------
`close` | CloseAction | `CloseAction.OK` if dialog was closed with OK/Accept button. `CloseAction.Cancel` if dialog was closed with cross/cancel.

## SectionFrameComponent

Frame for all pages. Messages can be shown using the broadcaster.

Property name | Type    | Default | Description
--------------|-------- |---------|------------
`caption`     | string  | empty   | Title of the page, only shown, when `showHeader = true`.
`showHeader`  | boolean | true    | If true page has a header like all containers on a MICA.

## SlideDownComponent

Component with header and content that is shown when clicking the expand button.

Property name | Type    | Default  | Description
--------------|-------- |----------|------------
`textOpen`    | string  | Expand   | Text for opening the content area
`textClose`   | string  | Collapse | Text for closing the content area
`showContent` | boolean | true     | If true content area is open

## TransportModule

The TransportModule is needed for all things around Subscribers/Subscriptions. To use this module you need to import it with a configuration:

```JS
const transportConfig: TransportConfig = {
  subscribers: {
    // prefix for the REST calls of
    // the subscribers API. Should be empty for new apps.
    restBaseUrl: '',
    // location, where the app must
    // navigate after closing the TransportDialog.
    routeParentUrl: 'main'
  },
  subscriptions: {
    // prefix for the REST calls of
    // the subscriptions API. This is highly app specific.
    restBaseUrl: 'custom/app/subscriptions',
    // location, where the app must
    // navigate to after closing the SubscriptionDialog.
    routeParentUrl: 'main'
  }
};

imports: [
...
  TransportModule.forRoot(transportConfig),
...
]
```

The next step is to import the routes into the app routing configuration, as children of the main route:

```JS
import { transportRoutes } from 'mica-shared';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent,
    children: [
      ...transportRoutes
    ],
  }
];
```

Now you can use the SubscribersComponent in your template:

```HTML
<mica-subscribers labelWidth="25em"></mica-subscribers>
```

And navigate to the subscription dialog:

```JS
this.router.navigate(['main', 'subscriptions', 'new']);
```

If there is a dynamic part in the url you can provide it as an optional parameter `suffix` to the baseUrl:

```JS
this.router.navigate(['main', 'subscriptions', 'new', { suffix: 'mysuffix' }]);
```

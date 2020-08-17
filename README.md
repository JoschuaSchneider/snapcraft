![Snapcraft Logo](https://snapcraft.netlify.com/icons/icon-48x48.png)

## [Snapcraft](https://snapcraft.netlify.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7ba0dd67-32ab-4e26-b9cb-18b4ec7d5dc9/deploy-status)](https://snapcraft.netlify.com)

This is a **first working prototype**.

Create beautiful Minecraft inventory Screenshots directly in your browser.
Select/Search items and place them in the virtual Inventory.

Supports custom Inventory sizes, and comes with common presets.

**[Give it a try!](https://snapcraft.netlify.com)**

**Example images**

![Crafting Recipe - Eye of Ender](https://snapcraft.netlify.com/snapcraft-snap.png)

![Hotbar](https://snapcraft.netlify.com/snapcraft-snap-inventory.png)

**What can I use this for?**

I had to create screenshots of crafting recipes for a tutorial site on some custom plugins.
It turns out that taking consistent screenshots of the Gameis not as easy as it seems.
Cropping and aligning them afterwards still introduced some visible differences in size and alignment.

This tool makes it easy to create any image of i.e. a crafting recipe and exporting it as an PNG image.
This is especially useful if you want to create animations of multiple recipes.

### Technology

Hosted on [Netlify](https://netlify.com)

- Gatsby + React
- react-select
- tailwindcss
- dom-to-image
- Item data from minecraft-data (MC Version 1.14)
- Unified item images

And a few more! This will be updated soon.

_Why Gatsby?_

In this early stage this is only a single page site.
But I have a few feature ideas that will be added soon, such as an editor for colored text (For use in configs and chat) based on a HTML like syntax.

### Report missing item images

Please use [this issue](https://github.com/JoschuaSchneider/snapcraft/issues/1) to report missing item images.

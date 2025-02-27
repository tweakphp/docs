# Custom Loaders

- [Introduction](#introduction)
- [Creating a Loader](#creating-a-loader)
  - [Constructor](#constructor)
  - [Name](#name)
  - [Version](#version)
- [Use the Loader](#use-the-loader)

## Introduction

TweakPHP supports custom loaders. You can create your own loader to boot up your application before tweaking the code.

## Creating a Loader

To create a loader, Go to the settings and click on the `Loaders` tab. Then add a new loader.

A loader is a PHP class in `TweakPHP\Client\Loaders` namespace that extends `TweakPHP\Client\Loaders\BaseLoader` class.

```php
<?php

namespace TweakPHP\Client\Loaders;

class MyCustomLoader extends BaseLoader
{
    /**
     * @param string $path is the root path of your project
     */
    public function __construct(string $path)
    {
        // your custom loader logic here
        // for example:
        // require $path.'/vendor/autoload.php';
    }

    public function name(): string
    {
        return 'Your app name';
    }

    public function version(): string
    {
        return 'Your app version';
    }
}
```

### Constructor

Booting your application up should be done in the constructor of the loader.

You can also extend your loader from existing loaders [here](https://github.com/tweakphp/client/tree/main/src/Loaders).

### Name

The `name` method can return your application's or loader's name. This will be shown in the status bar of the editor at the bottom right.

### Version

The `version` method can return your application's version. This will be shown in the status bar of the editor at the bottom right.

## Use the Loader

After creating the loader, Navigate to your project and from top toolbar select the loader you created. When you select a loader, it will automatically update the status bar to show the name and version that you returned in the loader.

If you run the code, the code inside the constructor of the loader will be executed first.
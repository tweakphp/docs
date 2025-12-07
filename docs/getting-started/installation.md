# Installation

- [MacOS](#macos)
    - [Homebrew](#homebrew)
    - [DMG File](#dmg-file)
- [Linux](#linux)
    - [Snap](#snap)
    - [AppImage](#appimage)
    - [Deb Package](#deb-package)
    - [RPM Package](#rpm-package)
    - [Arch Linux (AUR)](#arch-linux-aur)
- [Windows](#windows)

## MacOS

### Homebrew

```bash
brew install tweakphp/tap/tweakphp
```

### DMG File

Download the `.dmg` file from the [releases page](https://github.com/tweakphp/tweakphp/releases) and drag TweakPHP to your Applications folder.

::: info
Since TweakPHP is in beta and haven't been signed, You need to allow the app to be opened in the Privacy & Security.

Open the app and then navigate to `System Settings` > `Privacy & Security` and scroll down and find TweakPHP and click on `Open Anyway`
:::

## Linux

There are multiple ways to install TweakPHP on a Linux machine.

### Snap

```bash
snap install tweakphp
```

### AppImage

1. Download the `.AppImage` file from the [releases page](https://github.com/tweakphp/tweakphp/releases)
2. Make it executable: `chmod +x TweakPHP-*.AppImage`
3. Run the AppImage

### Deb Package

TweakPHP is also available as `.deb` package for `x64` only and you can download it from the [Github Releases](https://github.com/tweakphp/tweakphp/releases)

### RPM Package

Download the `.rpm` package from the [releases page](https://github.com/tweakphp/tweakphp/releases) and install it:

```bash
sudo rpm -i TweakPHP-*.rpm
```

### Arch Linux (AUR)

```bash
yay -S tweakphp-bin
```

or with any other AUR helper.

## Windows

Download the `.exe` installer from the [releases page](https://github.com/tweakphp/tweakphp/releases) and run it.
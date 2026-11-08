# Installation

- [Quick Install (macOS & Linux)](#quick-install-macos-linux)
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

## Quick Install (macOS & Linux)

Install the latest release from the terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/tweakphp/tweakphp/main/install.sh | bash
```

The script picks the best package for your system: the native `.deb`/`.rpm` on Debian/Fedora-based distros, the AppImage elsewhere (extracted automatically when `libfuse2` is missing), and the universal app bundle on macOS. Every download is verified against the release checksums.

Useful options:

```bash
install.sh --version 0.15.0   # install a specific version
install.sh --appimage         # force the AppImage method on Linux
install.sh --uninstall        # remove TweakPHP
```

Run it with `--help` for the full list.

## MacOS

### Homebrew

```bash
brew install tweakphp/tap/tweakphp
```

### DMG File

Download the `.dmg` file from the [releases page](https://github.com/tweakphp/tweakphp/releases) and drag TweakPHP to your Applications folder.

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

::: info
On Ubuntu 24.04+ AppImages need FUSE, which is no longer installed by default. Either install it (`sudo apt install libfuse2t64`), run the AppImage once with `--appimage-extract-and-run`, or use the [Quick Install](#quick-install-macos-linux) script, which installs without FUSE automatically.
:::

### Deb Package

TweakPHP is also available as `.deb` package for `x64` only and you can download it from the [Github Releases](https://github.com/tweakphp/tweakphp/releases)

### RPM Package

Download the `.rpm` package from the [releases page](https://github.com/tweakphp/tweakphp/releases) and install it:

```bash
sudo rpm -i TweakPHP-*.rpm
```

### Arch Linux (AUR)

```bash
yay -S tweakphp
```

or with any other AUR helper.

## Windows

Download the `.exe` installer from the [releases page](https://github.com/tweakphp/tweakphp/releases) and run it.

# Client Library

- [Introduction](#introduction)
- [Bundle](#bundle)
- [Loaders](#loaders)

## Introduction

TweakPHP uses its own client library written in PHP to load your PHP project and run code inside it. The library is availble on [Github](https://github.com/tweakphp/client).

## Bundle

Since TweakPHP supports any projects having PHP >= `7.4`, The library needs to be available on those PHP versions as well.

TweakPHP uses the [Box Project](https://github.com/box-project/box) to bundle the library into executable `phar` file. Therefore, We run the bundle on every PHP >= `7.4` and store it like `client-8.0.phar`.

These `phar` files will be also transfered to the app's project to be available on the installed machine.

## Loaders

The client library uses different loaders to load your project and bootstrap the app. 

Here are the list of the supported loaders:

- Laravel
- Symfony
- Wordpress
- Any composer project out of the box
- More loaders will come soon
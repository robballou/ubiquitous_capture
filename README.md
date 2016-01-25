# Ubiquitous Capture

To capture, collect, and share miscellany.

## General background

The idea of this project to create a server and components that will allow people to capture information from a variety of sources and use it in a way that helps them do things. Not very concrete, right?

First, let's look at collecting information... that might include things like:

- Social media messages (tweets, instragram, flickr, etc.)
- Links shared to services like pinboard or tracked directly
- Commits to public and private repos or other contribution tracking
- And also "arbitrary" data. Maybe home automation, other miscellaneous data.

Collecting the data stores it and exposes it to a storage plugin system. Perhaps some of the messages and filtered into date/time silos as well as stored in a more message based format.

Then create an API to make this shareable and usable in a variety of ways. Create visualizations or boil it down into a feed.

## Parts: Server

The Ubiquitous Capture (UC) server has two sides:

1. It accepts data which it "captures". The capture portion may have some default behavior but generally will be extended with plugins/modules/things to do the interesting stuff. Captured messages can filter into multiple workflows, which probably won't be part of the server per se.
2. Handles requests to use data. This will be interesting because we need to have plugin/module/thing endpoints. For example, if a message is saved into a time based store, we may need ask that store for information.

## Parts: plugins/modules/things

These are the things that do things with the messages that are captured. They could:

* Save things into a store.
* Manipulate messages into another form.
* Trigger webhooks/API calls, etc.

They also will need a way to make what they capture accessible, assuming that's part of their deal.

A challenge here will be figuring out how to pass messages into these and figure out if they want to do anything with it.

## Install

    npm install
    node index.js

Not really though... cause you need to create an SSL cert 👺

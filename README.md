You Tool Snippets
========

#Collection of useful snippets

## 1. Json File structure
```
{
    "snippet-name":{
        "author":     "Snippet Author",
        "version":    "Snippet Version",
        "description":"Snippet description",
        "background": ["background script list"],
        "content":    ["content script list"],
        "styles":     ["content style list"]
    },...
}
```

## 2. Description
### 2.1 Background scripts
will be executed in background and allow use chrome extension API.
### 2.2 Content scripts
will be injected in content page and allow modify page.
### 2.2 Content styles
will be injected in content page and allow modify page style.
### 2.4 Background and Content scripts communication
For communication between background and content script you ned to use:

+ In background script: [chrome sendMessage API](https://developer.chrome.com/extensions/messaging)
+ In content script: `document.addEventListener('onMessage', function(event){...})` method and look parameters in `event.details`

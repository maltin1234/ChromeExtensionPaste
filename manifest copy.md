{
    "name": "Context Menu Example",
    "version": "0.0.0.1",
    "manifest_version": 3,
    "description": "An example of a context menu with paste options.",
    "permissions": ["contextMenus"],
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["context.js"]
        }
    ],
    "action": {
        "default_popup": "menu.html"
    }
}

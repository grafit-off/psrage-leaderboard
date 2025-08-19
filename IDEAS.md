

### TODO:
* Split interfaces to own folders
* Add localization to local storage
* Add redux and migrate to redux
* Create more dumb components
* Split Features


### Ideas

Add Ongoing matches card to right sidebar

```typescript
fetch("https://open.faceit.com/data/v4/hubs/3b814eda-51a7-497b-8efd-18d039e8db49/matches?type=ongoing", {
  "headers": {
    "accept": "*/*",
    "authorization": "Bearer d0d492ad-df77-4356-a153-fc2cc8cd2ff4",
    "content-type": "application/json",
  },
  "body": null,
  "method": "GET",
});
```

Add past matches card to right sidebar
```typescript
fetch("https://open.faceit.com/data/v4/hubs/3b814eda-51a7-497b-8efd-18d039e8db49/matches?type=past", {
  "headers": {
    "accept": "*/*",
    "authorization": "Bearer d0d492ad-df77-4356-a153-fc2cc8cd2ff4",
    "content-type": "application/json",
  },
  "body": null,
  "method": "GET",
});
```

Add Hero of the match card

Add person page with extended stats for the hub



# Object.assign + pick
Picks properties from sources into target object.

## assignPick({target, model, sources})
`target` 
The target object — what to apply the sources’ properties to, which is returned after it is modified.

`model`
The properties you want to pick from sources.

`sources`
The source object(s) — objects containing the properties you want to apply.

## Usage
```javascript
const { assignPick } = require('object-assign-pick');
assignPick({
    target: {},
    model: { State: { Name: null }, PrivateIpAddress: null },
    sources: [
        { State: { Code: 0, Name: 'pending'}, PrivateIpAddress: '10.0.0.157', "InstanceType": "t2.micro" },
        { State: { Code: 1, Name: 'terminated'}, PrivateIpAddress: '10.0.0.157', "InstanceType": "t2.micro" }
    ]
});
// expected output: { State: { Name: 'terminated' }, PrivateIpAddress: '10.0.0.157' }
```

`model` can be omitted, in which case the shape of `target` is used to pick properties from sources. If there's is only one source object, then there's no need to enclose it in an array:
```javascript
assignPick({
    target: {host: 'default-host', port: 443},
    sources: {host: 'example.com'}
})
// expected output: { host: 'example.com', port: 443 }
```
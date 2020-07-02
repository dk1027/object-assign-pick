function assignPick({ target, model = toM(target), sources }) {
  if (!Array.isArray(sources)) sources = [sources];
  return _assignPick({ target, model, sources });
}

function _assignPick({ target, model, sources }) {
  for (let prop in model) {
    if (model[prop] == undefined) {
      let val = sources
        .filter((src) => src != null && src[prop] !== undefined)
        .reduce((res, src) => src[prop], undefined);
      if (val !== undefined) target[prop] = val;
    } else {
      let val = _assignPick({
        target: {},
        model: model[prop],
        sources: sources.map((src) => src[prop]).filter((v) => v != undefined),
      });
      if (Object.keys(val).length !== 0) target[prop] = val;
    }
  }
  return target;
}

// Use the object itself as a model
function toM(obj) {
  let model = {};
  for (let k of Object.keys(obj)) {
    if (typeof obj[k] === "object" && obj[k] !== null) {
      model[k] = toM(obj[k]);
    } else {
      model[k] = null;
    }
  }
  return model;
}

module.exports = { assignPick, toM };

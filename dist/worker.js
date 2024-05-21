self.onmessage = async function worker(e) {
  const func = e.data[0];
  const deps = e.data[1];
  let modules = {};
  await Promise.all(
    Object.keys(deps).map(async (key) => {
      const module = await import(deps[key]);
      modules = { ...modules, [key]: module };
      return Promise.resolve();
    })
  );

  const parse = function (str) {
    return JSON.parse(str, function (_, value) {
      let prefix;
      prefix = value.substring(0, 8);
      if (prefix === "function") {
        return eval("(" + value + ")");
      }
      if (prefix === "_NuFrRa_") {
        return eval(value.slice(8));
      }
      return value;
    });
  };

  parse(func)(modules).then((v) => {
    postMessage(v);
  });
};

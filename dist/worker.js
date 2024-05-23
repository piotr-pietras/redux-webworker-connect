"use strict";
self.onmessage = async function worker(e) {
    const func = e.data[0];
    // let modules = await import(`/* webpackChunkName: worker-deps */${import.meta.url}/worker-deps.js`);
    //@ts-ignore
    let modules = await import(`/src/worker.modules.js`);
    //@ts-ignore
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
    //@ts-ignore
    parse(func)(modules).then((v) => {
        postMessage(v);
    });
};

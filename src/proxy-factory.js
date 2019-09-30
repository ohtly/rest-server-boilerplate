
let mutableTarget;
let mutableHandler;

function setTarget(target) {
    if (!(target instanceof Object)) {
        throw new Error(`Target "${target}" is not an object`);
    }
    mutableTarget = target;
}

function setHandler(handler) {
    Object.keys(handler).forEach(key => {
        const value = handler[key];

        if (typeof value !== 'function') {
            throw new Error(`Trap "${key}: ${value}" is not a function`);
        }

        if (!Reflect[key]) {
            throw new Error(`Trap "${key}: ${value}" is not a valid trap`);
        }
    });
    mutableHandler = handler;
}

const proxyFactory = function () {
    setTarget(() => { });
    setHandler(Reflect);

    // Dynamically forward all the traps to the associated methods on the mutable handler
    const handler = new Proxy({}, {
        get(target, property) {
            return (...args) => mutableHandler[property].apply(null, [mutableTarget, ...args.slice(1)]);
        }
    });

    return {
        setTarget,
        setHandler,
        getTarget() {
            return mutableTarget;
        },
        getHandler() {
            return mutableHandler;
        },
        proxy: new Proxy(mutableTarget, handler)
    };
}

export default proxyFactory